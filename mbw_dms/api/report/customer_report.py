import frappe

from mbw_dms.api.common import gen_response ,exception_handel, get_child_values_doc


@frappe.whitelist(methods='GET')
def customer_report(**kwargs):
    try:
        filters = {}
        page_size =  int(kwargs.get('page_size', 20))
        page_number = int(kwargs.get('page_number')) if kwargs.get('page_number') and int(kwargs.get('page_number')) >=1 else 1
        if kwargs.get('customer_type'):
            filters['custpmer_type'] = kwargs.get('customer_type')
        if kwargs.get('customer_group'):
            filters['custpmer_group'] = kwargs.get('customer_group')
        if kwargs.get('territory'):
            filters['territory'] = kwargs.get('territory')

        list_customers = frappe.db.get_list('Customer', 
                                       filters=filters, 
                                       fields=["name", "customer_name","customer_code","customer_type", "customer_group", "territory", "industry", "image","website", "customer_primary_contact", "customer_primary_address", "customer_details"], 
                                       start=page_size*(page_number-1), page_length=page_size)

        customer_count = frappe.db.count('Customer')
        return gen_response(200, 'Thành công', {
            "data": list_customers,
            "totals": customer_count,
            "page_number": page_number,
            "page_size": page_size,
        })
    except Exception as e:
        return exception_handel(e)