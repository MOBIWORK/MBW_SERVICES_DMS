import frappe
from erpnext.stock.doctype.purchase_receipt.purchase_receipt import make_purchase_invoice

# Tự động tạo Purchase Invoice khi PR submit
def auto_create_purchase_invoice(doc, method):
    purchase_invoice = make_purchase_invoice(source_name=doc.name)

    purchase_invoice.posting_date = frappe.utils.nowdate()

    purchase_invoice.insert()
    purchase_invoice.submit()

    frappe.msgprint(f"Purchase Invoice {purchase_invoice.name} đã tạo thành công và liên kết đến Purchase Receipt {doc.name}.")

    # Tạo Payment Entry
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
        total_amount = frappe.db.get_value("Purchase Invoice", purchase_invoice, "rounded_total")

        # Tạo Payment Entry
        payment_entry = frappe.get_doc({
            "doctype": "Payment Entry",
            "payment_type": "Pay",
            "reason": f"Thanh toán cho {supplier}",
            "posting_date": frappe.utils.nowdate(),
            "party_type": "Supplier",
            "party": supplier,
            "mode_of_payment": "Bank Draft",
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
        total_amount = frappe.db.get_value("Purchase Invoice", purchase_invoice, "rounded_total")

        # Tạo Payment Entry
        payment_entry = frappe.get_doc({
            "doctype": "Payment Entry",
            "payment_type": "Pay",
            "reason": f"Thanh toán cho {supplier}",
            "posting_date": frappe.utils.nowdate(),
            "party_type": "Supplier",
            "party": supplier,
            "mode_of_payment": "Bank Draft",
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