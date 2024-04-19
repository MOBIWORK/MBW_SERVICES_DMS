import frappe
import pydash

@frappe.whitelist(allow_guest=True)
def get_info(**kwarg):
    field = ["customer_primary_address","customer_location_primary","customer_name","name"] 
    name = kwarg.get("name")
    if kwarg.get("field") :
        field = kwarg.get("field")
    
    data = frappe.db.get_value("Customer", name,field,as_dict=1)
    print(data)    
    return data

@frappe.whitelist(allow_guest=True)
def get_setting_industrys():
    list_industrys = frappe.get_doc("DMS Settings").as_dict().industrys
    list_industrys_name = pydash.map_(list_industrys,lambda x:x.ngang_hang)
    return list_industrys_name