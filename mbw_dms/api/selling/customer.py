import frappe
from frappe import _
import json
from datetime import datetime
from pypika import  Order, CustomFunction

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    validate_image
)
from mbw_dms.config_translate import i18n

#list customer
@frappe.whitelist(methods='GET')
def list_customer(**kwargs):
    try:
        date_format = '%Y/%m/%d'
        kwargs = frappe._dict(kwargs)
        name = kwargs.get('name')
        customer_name = kwargs.get('customer_name')
        customer_type = kwargs.get('customer_type')
        customer_group = kwargs.get('customer_group')
        from_date = kwargs.get('from_date')
        to_date = kwargs.get('to_date')
        my_filter = {}

        page_size = 20 if not kwargs.get(
            'page_size') else int(kwargs.get('page_size'))

        page_number = 1 if not kwargs.get('page') or int(
            kwargs.get('page')) <= 0 else int(kwargs.get('page'))
        # custom_birthday = int(kwargs.get('custom_birthday'))
        if name:
            my_filter["name"] = ['like', f'%{name}%']
        if customer_name:
            my_filter["customer_name"] = ['like', f'%{customer_name}%']
        if customer_type:
            my_filter["customer_type"] = ['like', f'%{customer_type}%']
        if customer_group:
            my_filter["customer_group"] = ['like', f'%{customer_group}%']
        if from_date and to_date:
            from_date = datetime.fromtimestamp(int(from_date))
            to_date = datetime.fromtimestamp(int(to_date))
            my_filter["custom_birthday"] = ['between', [from_date, to_date]]
        customers = frappe.db.get_list("Customer",
                                filters= my_filter,
                                fields=["name", "customer_name","customer_type", "customer_group", "territory", "industry", "image", "customer_primary_contact", "customer_primary_address", "custom_birthday", "customer_details"],
                                start=page_size*(page_number-1), 
                                page_length=page_size)
                                
        record = frappe.db.count('Customer', filters= my_filter)

        for customer in customers:
            
            customer['custom_birthday'] = datetime.combine(customer['custom_birthday'], datetime.min.time()).timestamp()
            customer['image'] = validate_image(customer.get("image"))
            customer['contact'] = frappe.db.get_value('Contact', {"name" : customer.get('customer_primary_contact')}, ['first_name'],as_dict=1)
            customer['address'] = frappe.db.get_value('Address', {"name" : customer.get('customer_primary_address')}, ['address_line1', 'phone'],as_dict=1)
            customer['cre_limid'] = frappe.db.get_all("Customer Credit Limit", {"parent" : customer.get('name')}, ['credit_limit'])
        
        return {
            "data": customers,
            "page_number": page_number,
            "page_size": page_size,
            "total": record
        }
    except Exception as e:
        return exception_handel(e)
    

#list customer type Company Individual
@frappe.whitelist(methods="GET")
def list_customer_type():
    try:
        brand = frappe.db.get_list('Customer Group', fields=["name", "customer_group_name"])
        gen_response(200, "Thành công", brand)
    except Exception as e:
        return exception_handel(e)