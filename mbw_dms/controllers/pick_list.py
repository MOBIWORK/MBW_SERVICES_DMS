import frappe

def update_pick_pist_to_si(doc, method):
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
