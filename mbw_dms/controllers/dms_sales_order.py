import frappe
from erpnext.accounts.report.accounts_receivable.accounts_receivable import ReceivablePayableReport
from frappe.utils import nowdate
import calendar
from mbw_dms.api.common import qty_not_pricing_rule
from datetime import datetime

# Kiểm tra xem khách đã đặt hàng trước đó chưa
def existing_customer(customer_name, start_date, end_date, current_user):
    existing_cus = frappe.get_all(
        "Sales Order",
        filters={
                "docstatus": 1,
                "creation": ("between", [start_date, end_date]), 
                "customer_name": customer_name, 
                "owner": current_user},
        fields=["name"]
    )
    return existing_cus

def update_kpi_monthly(doc, method):
    # Lấy ngày tháng để truy xuất dữ liệu
    month = int(nowdate().split('-')[1])
    year = int(nowdate().split('-')[0])
    start_date_str = f"{year:04d}-{month:02d}-01"
    last_day_of_month = calendar.monthrange(year, month)[1]
    end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
    start_date = frappe.utils.getdate(start_date_str)
    end_date = frappe.utils.getdate(end_date_str)
    
    # Lấy id của nhân viên
    sales_person = None
    for i in doc.sales_team:
        if i.created_by == 1:
            sales_person = i.sales_person
    
    user_name = frappe.get_value("Sales Person", {"name": sales_person}, "employee")
    sales_team = frappe.get_value("Sales Person", {"employee": user_name}, "parent_sales_person")

    # Tính sản lượng (số sản phẩm/đơn) và sku(số mặt hàng/đơn) trong đơn hàng(không km)
    items = doc.get("items")
    qty,uom = qty_not_pricing_rule(items)
    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name")
    grand_totals = doc.grand_total
    cus_name = doc.customer
    existing_cus = existing_customer(customer_name=cus_name, start_date=start_date, end_date=end_date, current_user=doc.owner)

    total_uom = 0
    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
        total_uom += monthly_summary_doc.sku*monthly_summary_doc.so_don_hang + len(uom)
        if len(existing_cus) > 1:
            # total_uom += len(uom)
            monthly_summary_doc.so_don_hang += 1
            monthly_summary_doc.doanh_so_thang += grand_totals
            monthly_summary_doc.san_luong += sum(qty)
            monthly_summary_doc.sku = (float(total_uom) / (monthly_summary_doc.so_don_hang))if monthly_summary_doc.so_don_hang > 0 else 0
        else:
            # total_uom += len(uom)
            monthly_summary_doc.so_don_hang += 1
            monthly_summary_doc.doanh_so_thang += grand_totals
            monthly_summary_doc.so_kh_dat_hang += 1
            monthly_summary_doc.san_luong += sum(qty)
            monthly_summary_doc.sku = (float(total_uom) / (monthly_summary_doc.so_don_hang)) if monthly_summary_doc.so_don_hang > 0 else 0
        monthly_summary_doc.save(ignore_permissions=True)
    else:
        monthly_summary_doc = frappe.get_doc({
            "doctype": "DMS Summary KPI Monthly",
            "nam": year,
            "thang": month,
            "nhan_vien_ban_hang": user_name,
            "nhom_ban_hang": sales_team,
            "so_don_hang": 1,
            "doanh_so_thang": grand_totals,
            "so_kh_dat_hang": 1,
            "sku": len(uom),
            "san_luong": len(qty)
        }).insert(ignore_permissions=True)


def update_kpi_monthly_on_cancel(doc, method):
    # Lấy ngày tháng để truy xuất dữ liệu
    month = int(nowdate().split('-')[1])
    year = int(nowdate().split('-')[0])
    start_date_str = f"{year:04d}-{month:02d}-01"
    last_day_of_month = calendar.monthrange(year, month)[1]
    end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
    start_date = frappe.utils.getdate(start_date_str)
    end_date = frappe.utils.getdate(end_date_str)
    
    # Lấy id của nhân viên
    sales_person = None
    for i in doc.sales_team:
        if i.created_by == 1:
            sales_person = i.sales_person
    
    user_name = frappe.get_value("Sales Person", {"name": sales_person}, "employee")

    items = doc.get("items")
    
    qty,uom = qty_not_pricing_rule(items)

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name")

    total_uom = 0
    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
        grand_totals = doc.grand_total
        cus_name = doc.customer
        existing_cus = existing_customer(customer_name=cus_name, start_date=start_date, end_date=end_date, current_user=doc.owner)

        if len(existing_cus) == 0:
            total_uom =  monthly_summary_doc.sku*monthly_summary_doc.so_don_hang -  len(uom)
            monthly_summary_doc.so_don_hang = minus_not_nega(monthly_summary_doc.so_don_hang)
            monthly_summary_doc.doanh_so_thang = minus_not_nega(monthly_summary_doc.doanh_so_thang, grand_totals)
            monthly_summary_doc.san_luong = minus_not_nega(monthly_summary_doc.san_luong, sum(qty))
            monthly_summary_doc.so_kh_dat_hang = minus_not_nega(monthly_summary_doc.so_kh_dat_hang)
            monthly_summary_doc.sku = (float(total_uom) / (monthly_summary_doc.so_don_hang)) if monthly_summary_doc.so_don_hang > 0 else 0
        else:
            monthly_summary_doc.so_don_hang = minus_not_nega(monthly_summary_doc.so_don_hang)
            monthly_summary_doc.doanh_so_thang = minus_not_nega(monthly_summary_doc.doanh_so_thang,grand_totals)
            monthly_summary_doc.san_luong = minus_not_nega(monthly_summary_doc.san_luong, sum(qty))
            monthly_summary_doc.sku = (float(total_uom) / (monthly_summary_doc.so_don_hang)) if monthly_summary_doc.so_don_hang > 0 else 0
        monthly_summary_doc.save(ignore_permissions=True)
    else:
        return



def update_kpi_monthly_after_delete(doc,method):
    # chỉ thay đổi kpi nếu xóa bản ghi đã submit
    if doc.docstatus == 1:
        update_kpi_monthly_on_cancel(doc,method)

        
def minus_not_nega(num,sub=1):
    num = int(num)
    if num <= 0 :
        return 0
    else:
        return num - sub

def calculate_so(doc, method):
    items = doc.items
    amount_before_discount = 0
    discount_total_amount = 0
    total_lits = 0

    for item in items:
        item.custom_amount_before_discount = item.price_list_rate * item.qty
        item.custom_discount_on_total_amount = item.discount_amount * item.qty
        amount_before_discount += item.custom_amount_before_discount
        discount_total_amount += item.custom_discount_on_total_amount

        # Tính số lit
        lit_per_uom = frappe.get_value("Item", {"item_code": item.item_code}, "custom_so_lit_tren_1_don_vi")
        if item.uom == item.stock_uom:
            item.custom_litres_in_1_unit = lit_per_uom
        else:
            item.custom_litres_in_1_unit = lit_per_uom * item.conversion_factor
        item.custom_total_litres_base_on_1_item = item.custom_litres_in_1_unit * item.qty
        total_lits += item.custom_total_litres_base_on_1_item

    doc.custom_total_litres_in_order = total_lits
    doc.custom_total_amount_before_discount = amount_before_discount
    doc.custom_product_discount_amount = discount_total_amount

    if isinstance(doc.delivery_date, str):
        # Chuyển đổi thành datetime trước, sau đó lấy date()
        delivery_date = datetime.strptime(doc.delivery_date, "%Y-%m-%d %H:%M:%S").date()
    else:
        delivery_date = doc.delivery_date
    
    # Gán giá trị sau khi chuyển đổi hoặc định dạng
    doc.custom_delivery_date_clone_for_print = delivery_date.strftime("%d/%m/%Y")
    
    # Tương tự cho transaction_date
    if isinstance(doc.transaction_date, str):
        # Chuyển đổi thành datetime trước, sau đó lấy date()
        transaction_date = datetime.strptime(doc.transaction_date, "%Y-%m-%d %H:%M:%S").date()
    else:
        transaction_date = doc.transaction_date
    
    doc.custom_date_clone_for_print = transaction_date.strftime("%d/%m/%Y")

    amount_in_words = number_to_vietnamese_words(doc.grand_total)
    if amount_in_words:
        doc.custom_grand_total_by_vietnamese = amount_in_words.capitalize() + " Việt Nam đồng"
    
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

def update_person_sales(doc, method):
    sales_person = doc.sales_team
    if sales_person and len(sales_person) == 1:
        doc.custom_sale_person = sales_person[0].sales_person

def update_account_debt(doc, method):
    args = {
        "account_type": "Receivable",
        "naming_by": ["Selling Settings", "cust_master_name"],
    }
    filters = {'company': doc.company,
               'report_date': nowdate(),
               'party_type': 'Customer',
               'party': [doc.customer],
               'ageing_based_on': 'Due Date',
               'range': '30, 60, 90, 120',
               'customer_group': [],
               'group_by_party': 1}
    data = ReceivablePayableReport(filters).run(args)
    if len(data) > 1 and len(data[1]) > 0:
        doc.custom_tong_no_cu = data[1][len(data[1]) - 1].get("outstanding")
