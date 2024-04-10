import frappe

@frappe.whitelist(allow_guest=True,methods="GET")
def get_dms_setting():
    api_key =  frappe.get_doc("DMS Settings").as_dict().api_key
    return api_key