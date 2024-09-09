import frappe
from erpnext.stock.doctype.pick_list.pick_list import create_delivery_note
import frappe.utils

def update_pick_list_to_si(doc, method):
    # Tự động tạo delivery note
    delivery_notes = []
    delivery_note = create_delivery_note(source_name=doc.name)
    delivery_notes.append({'name': delivery_note.name})

    # Submit dn
    for dn in delivery_notes:
        dn_doc = frappe.get_doc("Delivery Note", dn["name"])
        if dn_doc.docstatus == 0:
            dn_doc.submit()

    # Tự động tạo si và payment entry
    item_locations = doc.locations
    sales_order_list = []
    for item in item_locations:
        if item.sales_order not in sales_order_list:
            sales_order_list.append(item.sales_order)

    shipper_phone = None
    if doc.custom_shipper:
        shipper_phone = frappe.get_value("Employee", {"name": doc.custom_shipper}, "cell_number")

    for so in sales_order_list:
        si = frappe.db.get_value("Sales Invoice Item", {"sales_order": so}, "parent")

        if si:
            sales_invoice = frappe.get_doc("Sales Invoice", {"name": si})
            sales_invoice.custom_pick_list = doc.name
            sales_invoice.custom_shipper = doc.custom_shipper_name
            sales_invoice.custom_sdt_shipper = shipper_phone
            sales_invoice.save()
            sales_invoice.submit()

            payment_entry = frappe.get_doc({
                "doctype": "Payment Entry",
                "payment_type": "Receive",
                "posting_date": frappe.utils.nowdate(),
                "party_type": "Customer",
                "party": sales_invoice.customer,
                "contact_person": sales_invoice.contact_person,
                "mode_of_payment": "Cash",
                "paid_from": "1388 - Phải thu khác - NVTB",
                "paid_to": "1111 - Tiền Việt Nam - NVTB",
                "paid_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "rounded_total"),
                "received_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "rounded_total"),
                "reference_no": sales_invoice.name,
                "reference_date": frappe.utils.nowdate(),
                "references": [
                    {
                        "reference_doctype": "Sales Invoice",
                        "reference_name": sales_invoice.name,
                        "due_date": frappe.utils.nowdate(),
                        "total_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "rounded_total"),
                        "outstanding_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "rounded_total"),
                        "allocated_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "rounded_total")
                    }
                ]
            })

            # Insert and submit the Payment Entry
            payment_entry.insert()
            payment_entry.submit()

            frappe.msgprint(f"Sales Invoice {sales_invoice.name} và Payment Entry {payment_entry.name} đã được tạo và duyệt thành công.")

# Convert số thành chữ 
def number_to_vietnamese_words(number):
    vietnamese_words = {
        0: "không", 1: "một", 2: "hai", 3: "ba", 4: "bốn", 5: "năm", 6: "sáu", 7: "bảy", 8: "tám", 9: "chín"
    }

    suffixes = ["", "nghìn", "triệu", "tỷ"]
    result = ""

    # Chỉ xử lý phần nguyên, bỏ qua phần thập phân
    integer_part = int(number)

    # Chuyển đổi phần nguyên
    index = 0
    while integer_part > 0:
        part = integer_part % 1000
        part_string = ""

        hundreds = part // 100
        tens = (part % 100) // 10
        ones = part % 10

        if hundreds > 0:
            part_string += vietnamese_words[hundreds] + " trăm "

        if tens == 1:
            part_string += "mười "
            if ones == 5:
                part_string += "lăm"
            elif ones > 0:
                part_string += vietnamese_words[ones]
        elif tens > 1:
            part_string += vietnamese_words[tens] + " mươi "
            if ones == 1:
                part_string += "mốt"
            elif ones == 5:
                part_string += "lăm"
            elif ones > 0:
                part_string += vietnamese_words[ones]
        elif ones > 0:
            part_string += vietnamese_words[ones]

        if part_string:
            result = part_string.strip() + " " + suffixes[index] + " " + result.strip()

        integer_part = integer_part // 1000
        index += 1

    return result.strip() if result else "không"

# Tính toán các trường custom field trong pick list
def request_for_dn(doc, method):
    # Tính các trường round_total, discount_amount
    total_discount = 0
    round_total = 0
    for so in doc.custom_so_list:
        total_discount += so.discount_amount
        round_total += so.rounded_total

    doc.custom_total_discount_on_order = total_discount
    doc.custom_round_total = round_total

    amount_in_words = number_to_vietnamese_words(round_total)
    if amount_in_words:
        # Thêm chữ "Việt Nam đồng"
        doc.custom_in_word_vietnamese = amount_in_words.capitalize() + " Việt Nam đồng"

    # Tính Request for Delivery Note
    item_locations = doc.locations
    list_items = []

    # Lấy danh sách các item_code duy nhất
    for item in item_locations:
        if item.item_code not in list_items:
            list_items.append(item.item_code)

    # Xử lý từng item_code
    for item_code in list_items:
        item_name = None
        total_discount_on_total_amount = 0
        total_amount_before_discount = 0
        item_uom = None
        item_stock_uom = None
        total_qty = 0
        uom_cf = 0

        # Duyệt qua tất cả các mục trong bảng locations có cùng item_code
        for i in item_locations:
            if i.item_code == item_code:
                item_name = i.item_name
                # Lấy thông tin UOM
                item = frappe.get_doc("Item", {"name": i.item_code})
                for uom in item.uoms:
                    if uom.don_vi_dong_goi == 1:
                        uom_cf = uom.conversion_factor
                        item_uom = uom.uom

                # Cộng dồn giá trị của các trường cần thiết
                total_amount_before_discount += i.custom_amount_before_discount
                total_discount_on_total_amount += i.custom_discount_on_total_amount
                if uom_cf != 0:
                    total_qty += float(i.stock_qty / uom_cf)
                
                item_stock_uom = i.stock_uom

        # Tạo dữ liệu để thêm vào bảng con
        item_data = {
            "item_code": item_code,
            "item_name": item_name,
            "qty": total_qty,
            "stock_qty": total_qty * uom_cf,
            "uom": item_uom,
            "stock_uom": item_stock_uom,
            "uom_conversion_factor": uom_cf,
            "custom_discount_on_total": total_discount_on_total_amount,
            "custom_amount_before_discount": total_amount_before_discount
        }
        
        # Thêm dòng vào bảng con custom_request_for_delivery_note
        doc.append("custom_request_for_delivery_note", item_data)

    total_discount_on_total_amount_so = 0
    total_amount_before_discount_so = 0
    for i in doc.custom_request_for_delivery_note:
        total_discount_on_total_amount_so += i.custom_discount_on_total
        total_amount_before_discount_so += i.custom_amount_before_discount

    doc.custom_amount_before_discount = total_amount_before_discount_so
    doc.custom_discount_on_product = total_discount_on_total_amount_so
