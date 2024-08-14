import frappe

def auto_create_si(doc, method):
    # Tạo Sales Invoice khi DN submit
    sales_invoice = frappe.get_doc({
        "doctype": "Sales Invoice",
        "customer": doc.customer,
        "delivery_note": doc.name, 
        "posting_date": frappe.utils.nowdate(),
        "due_date": frappe.utils.add_days(frappe.utils.nowdate(), 30),
        "items": []
    })

    for item in doc.items:
        sales_invoice.append("items", {
            "item_code": item.item_code,
            "qty": item.qty,
            "rate": item.rate,
            "amount": item.amount,
            "delivery_note": doc.name 
        })

    sales_invoice.insert()
    sales_invoice.submit()

    frappe.msgprint(f"Sales Invoice {sales_invoice.name} đã được tạo và duyệt thành công.")

def auto_create_payment_entry(doc, method):
    # Kiểm tra nếu đã tích "Đã thanh toán" và chưa có Payment Entry
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
            "mode_of_payment": "Bank",
            "paid_from": "131 - Phải thu của khách hàng - VT",
            "paid_to": "1121 - Tiền Việt Nam - VT",
            "paid_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "grand_total"),
            "received_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "grand_total"),
            "reference_no": sales_invoice,
            "reference_date": frappe.utils.nowdate(),
            "references": [
                {
                    "reference_doctype": "Sales Invoice",
                    "reference_name": sales_invoice,
                    "due_date": frappe.utils.nowdate(),
                    "total_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "grand_total"),
                    "outstanding_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "grand_total"),
                    "allocated_amount": frappe.db.get_value("Sales Invoice", sales_invoice, "grand_total")
                }
            ]
        })

        # Insert and submit the Payment Entry
        payment_entry.insert()
        payment_entry.submit()

        frappe.msgprint(f"Payment Entry {payment_entry.name} đã được tạo và duyệt thành công.")