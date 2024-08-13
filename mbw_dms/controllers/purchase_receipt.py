import frappe


def auto_create_purchase_invoice_pe(doc, method):
    # Tự động tạo Purchase Invoice khi PR submit
    purchase_invoice = frappe.new_doc("Purchase Invoice")

    purchase_invoice.supplier = doc.supplier
    purchase_invoice.set_posting_time = 1
    purchase_invoice.posting_date = frappe.utils.nowdate()
    purchase_invoice.buying_price_list = doc.buying_price_list
    purchase_invoice.purchase_receipt = doc.name

    for i in doc.items:
        item_data = {
        "item_code": i.item_code,
        "item_name": i.item_name,
        "qty": i.qty,
        "rate": i.base_rate,
        "base_amount": i.base_amount
        }

    purchase_invoice.append("items", item_data)

    purchase_invoice.additional_discount_percentage = doc.additional_discount_percentage
    purchase_invoice.base_discount_amount = doc.base_discount_amount

    purchase_invoice.insert()
    purchase_invoice.submit()

    # Tự động tạo Paymwnt Entry khi PR submit
    linked_po = frappe.get_doc("Purchase Order", doc.purchase_order)

    if linked_po.da_thanh_toan:
        # Tạo Payment Entry
        payment_entry = frappe.get_doc({
            "doctype": "Payment Entry",
            "payment_type": "Pay",
            "reason": "",
            "posting_date": frappe.utils.nowdate(),
            "party_type": "Supplier",
            "party": linked_po.supplier,
            "mode_of_payment": "Bank",
            "paid_from": "1121 - Tiền Việt Nam - VT",
            "paid_to": " 331 - Phải trả cho người bán - VT",
            "paid_amount": linked_po.grand_total,
            "received_amount": linked_po.grand_total,
            "reference_no": linked_po.name,
            "reference_date": frappe.utils.nowdate(),
            "references": [
                {
                    "reference_doctype": "Purchase Order",
                    "reference_name": linked_po.name,
                    "due_date": frappe.utils.nowdate(),
                    "total_amount": linked_po.grand_total,
                    "outstanding_amount": linked_po.grand_total,
                    "allocated_amount": linked_po.grand_total
                }
            ]
        })

        payment_entry.insert()
        payment_entry.submit()