import frappe

def create_si_and_pe(doc, method):
    # Tạo Sales Invoice khi DN submit
    sales_invoice = frappe.get_doc({
        "doctype": "Sales Invoice",
        "customer": doc.customer,
        "delivery_note": doc.name, 
        "set_posting_time": 1,
        "posting_date": frappe.utils.nowdate(),
        "due_date": frappe.utils.nowdate(),
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

    # Tạo payment entry khi DN submit
    if doc.da_thanh_toan:
        payment_entry = frappe.get_doc({
            "doctype": "Payment Entry",
            "payment_type": "Receive",
            "posting_date": frappe.utils.nowdate(),
            "reason": "Khách hàng thanh toán",
            "party_type": "Customer",
            "party": doc.customer,
            "mode_of_payment": "Bank",
            "paid_from": "131 - Phải thu của khách hàng - VT",
            "paid_to": "1121 - Tiền Việt Nam - VT",
            "paid_amount": sales_invoice.grand_total,
            "received_amount": sales_invoice.grand_total,
            "reference_no": sales_invoice.name,
            "reference_date": frappe.utils.nowdate(),
            "references": [
                {
                    "reference_doctype": "Sales Invoice",
                    "reference_name": sales_invoice.name,
                    "due_date": frappe.utils.nowdate(),
                    "total_amount": sales_invoice.grand_total,
                    "outstanding_amount": sales_invoice.grand_total,
                    "allocated_amount": sales_invoice.grand_total
                }
            ]
        })

        payment_entry.insert()
        payment_entry.submit()