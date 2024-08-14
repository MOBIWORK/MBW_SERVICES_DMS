import frappe


# Tự động tạo Purchase Invoice khi PR submit
def auto_create_purchase_invoice(doc, method):
    purchase_invoice = frappe.new_doc("Purchase Invoice")

    purchase_invoice.supplier = doc.supplier
    purchase_invoice.posting_date = frappe.utils.nowdate()
    purchase_invoice.buying_price_list = doc.buying_price_list

    for i in doc.items:
        item_data = {
            "item_code": i.item_code,
            "item_name": i.item_name,
            "qty": i.qty,
            "rate": i.base_rate,
            "amount": i.base_amount,
            "purchase_receipt": doc.name
        }

    purchase_invoice.append("items", item_data)

    purchase_invoice.additional_discount_percentage = doc.additional_discount_percentage
    purchase_invoice.base_discount_amount = doc.base_discount_amount

    purchase_invoice.insert()
    purchase_invoice.submit()

    frappe.msgprint(f"Purchase Invoice {purchase_invoice.name} đã tạo thành công và liên kết đến Purchase Receipt {doc.name}.")

# Tự động tạo Payment Entry khi PR submit
def auto_create_pe(doc, method):
    if doc.da_thanh_toan:
        purchase_invoice = frappe.db.get_value(
            "Purchase Invoice Item",
            {"purchase_receipt": doc.name},
            "parent"
        )

        if not purchase_invoice:
            frappe.throw("Không tìm thấy Purchase Invoice được liên kết cho Purchase Receipt này.")
        supplier = doc.supplier
        # Lấy thông tin từ Purchase Invoice
        total_amount = frappe.db.get_value("Purchase Invoice", purchase_invoice, "grand_total")

        # Tạo Payment Entry
        payment_entry = frappe.get_doc({
            "doctype": "Payment Entry",
            "payment_type": "Pay",
            "reason": f"Thanh toán cho {supplier}",
            "posting_date": frappe.utils.nowdate(),
            "party_type": "Supplier",
            "party": supplier,
            "mode_of_payment": "Bank",
            "paid_from": "1121 - Tiền Việt Nam - VT",
            "paid_to": "331 - Phải trả cho người bán - VT",
            "paid_amount": total_amount,
            "received_amount": total_amount,
            "reference_no": purchase_invoice,
            "reference_date": frappe.utils.nowdate(),
            "references": [
                {
                    "reference_doctype": "Purchase Invoice",
                    "reference_name": purchase_invoice,
                    "due_date": frappe.utils.nowdate(),
                    "total_amount": total_amount,
                    "outstanding_amount": total_amount,
                    "allocated_amount": total_amount
                }
            ]
        })

        payment_entry.insert()
        payment_entry.submit()

        frappe.msgprint(f"Payment Entry {payment_entry.name} đã tạo thành công và liên kết đến Purchase Receipt {doc.name} và Purchase Invoice {purchase_invoice}.")