import frappe

def add_customer(doc, event):
    if doc.custom_checkin_id:
        checkin_id = doc.custom_checkin_id
        chekin_info = frappe.get_value("DMS Checkin", {"checkin_id": checkin_id}, ["kh_ma", "kh_ten"], as_dict=1)
        doc.custom_customer = chekin_info.kh_ma
        doc.custom_customer_id = chekin_info.kh_ma
        doc.custom_customer_name = chekin_info.kh_ten
        doc.save()