import frappe
from erpnext.stock.doctype.delivery_note.delivery_note import make_sales_invoice

def auto_create_si(doc, method):
    sales_invoice = make_sales_invoice(source_name=doc.name)

    sales_invoice.due_date = frappe.utils.nowdate()
    
    sales_invoice.insert()
    sales_invoice.submit()

    frappe.msgprint(f"Sales Invoice {sales_invoice.name} đã được tạo và duyệt thành công.")

    if doc.da_thanh_toan:
        # Tìm Sales Invoice liên kết với Delivery Note
        sales_invoice = frappe.db.get_value("Sales Invoice Item", {"delivery_note": doc.name}, "parent")
        
        if not sales_invoice:
            frappe.throw("Không tìm thấy Sales Invoice liên kết với Delivery Note này.")

        # Tạo Payment Entry
        payment_entry = frappe.get_doc({
            "doctype": "Payment Entry",
            "payment_type": "Receive",
            "posting_date": frappe.utils.nowdate(),
            "party_type": "Customer",
            "reason": "Khách hàng thanh toán",
            "party": doc.customer,
            "mode_of_payment": "Bank Draft",
            "paid_from": "131 - Phải thu của khách hàng - VT",
            "paid_to": "1121 - Tiền Việt Nam - VT",
            "paid_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "rounded_total"),
            "received_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "rounded_total"),
            "reference_no": sales_invoice,
            "reference_date": frappe.utils.nowdate(),
            "references": [
                {
                    "reference_doctype": "Sales Invoice",
                    "reference_name": sales_invoice,
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

        frappe.msgprint(f"Payment Entry {payment_entry.name} đã được tạo và duyệt thành công.")

# Kiểm tra nếu đã tích "Đã thanh toán" và chưa có Payment Entry
def auto_create_pe(doc, method):
    if doc.da_thanh_toan:
        # Tìm Sales Invoice liên kết với Delivery Note
        sales_invoice = frappe.db.get_value("Sales Invoice Item", {"delivery_note": doc.name}, "parent")
        
        if not sales_invoice:
            frappe.throw("Không tìm thấy Sales Invoice liên kết với Delivery Note này.")

        # Tạo Payment Entry
        payment_entry = frappe.get_doc({
            "doctype": "Payment Entry",
            "payment_type": "Receive",
            "posting_date": frappe.utils.nowdate(),
            "party_type": "Customer",
            "reason": "Khách hàng thanh toán",
            "party": doc.customer,
            "mode_of_payment": "Bank Draft",
            "paid_from": "131 - Phải thu của khách hàng - VT",
            "paid_to": "1121 - Tiền Việt Nam - VT",
            "paid_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "rounded_total"),
            "received_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "rounded_total"),
            "reference_no": sales_invoice,
            "reference_date": frappe.utils.nowdate(),
            "references": [
                {
                    "reference_doctype": "Sales Invoice",
                    "reference_name": sales_invoice,
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

        frappe.msgprint(f"Payment Entry {payment_entry.name} đã được tạo và duyệt thành công.")