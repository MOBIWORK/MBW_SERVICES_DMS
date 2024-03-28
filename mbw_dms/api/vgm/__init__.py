import frappe


@frappe.whitelist(allow_guest=True)
def get_info(**kwarg):
    field = ["customer_primary_address","customer_location_primary","customer_name","name"] 
    name = kwarg.get("name")
    if kwarg.get("field") :
        field = kwarg.get("field")
    
    data = frappe.db.get_value("Customer", name,field,as_dict=1)
    print(data)    
    return data