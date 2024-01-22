import frappe
from frappe import _
import json
from datetime import datetime
from pypika import  Order, CustomFunction

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    validate_image,
    post_image
)
from mbw_dms.api.validators import (
    validate_date, 
    validate_phone_number, 
    validate_choice,
    validate_not_none
)
from mbw_dms.api.selling import configs
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
                                fields=["name", "customer_name","customer_id","customer_type", "customer_group", "territory", "industry", "image", "customer_primary_contact", "customer_primary_address", "custom_birthday", "customer_details"],
                                start=page_size*(page_number-1), 
                                page_length=page_size)
                                
        record = frappe.db.count('Customer', filters= my_filter)

        for customer in customers:
            if customer['custom_birthday'] is not None:
                customer['custom_birthday'] = datetime.combine(customer['custom_birthday'], datetime.min.time()).timestamp()
            customer['image'] = validate_image(customer.get("image"))
            customer['contact'] = frappe.db.get_value('Contact', {"name" : customer.get('customer_primary_contact')}, ['first_name', "phone"],as_dict=1)
            customer['address'] = frappe.db.get_value('Address', {"name" : customer.get('customer_primary_address')}, ['address_line1', 'phone'],as_dict=1)
            customer['cre_limid'] = frappe.db.get_all("Customer Credit Limit", {"parent" : customer.get('name')}, ['credit_limit'])
        
        return gen_response(200, "ok", {
            "data": customers,
            "page_number": page_number,
            "page_size": page_size,
            "total": record
        })
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
    
#delete customer
@frappe.whitelist(methods="DELETE")
def delete_customer(name):
    try:

        frappe.delete_doc('Customer',name)
        gen_response(200, "ok",[])
    except Exception as e:
        exception_handel(e)

#create customer
@frappe.whitelist(methods="POST")
def create_customer(**kwargs):
    try:
        # Check dữ liệu đầu vào
        phone_number = validate_phone_number(kwargs.get('phone'))

        # Tạo mới khách hàng
        new_customer = frappe.new_doc('Customer')
        required_fields = ['customer_name', 'customer_id', 'customer_group', 'territory']
        normal_fields = ['customer_details', 'website']
        date_fields = ['custom_birthday']
        choice_fields = ['customer_type']
        for key, value in kwargs.items():
            if key in normal_fields:
                new_customer.set(key, value)
            elif key in required_fields:
                required = validate_not_none(value)
                new_customer.set(key, required)
            elif key in date_fields:
                custom_birthday = validate_date(value)
                new_customer.set(key, custom_birthday)
            elif key in choice_fields:
                customer_type = validate_choice(configs.customer_type)(value)
                new_customer.set(key, customer_type)
        new_customer.device_id = json.dumps({"longitude": kwargs.get(
                "longitude"), "latitude": kwargs.get("latitude")})

        new_customer.append('credit_limits', {
            'company': kwargs.get('company'),
            'credit_limit': kwargs.get('credit_limit')
        })
        new_customer.insert()

        # Tạo mới địa chỉ khách hàng
        new_address_cus = frappe.new_doc('Address')
        new_address_cus.address_title = kwargs.get('address_title_cus')
        new_address_cus.address_type = kwargs.get('address_type_cus')
        new_address_cus.address_line1 = kwargs.get('detail_address_cus')
        new_address_cus.address_line2 = kwargs.get('ward_cus')
        new_address_cus.city = kwargs.get('district_cus')
        new_address_cus.state = kwargs.get('province_cus')
        new_address_cus.is_shipping_address = kwargs.get('is_shipping_address')
        new_address_cus.is_primary_address = kwargs.get('is_primary_address')
        new_address_cus.append('links', {
            'link_doctype': new_customer.doctype,
            'link_name': new_customer.name,
        })
        new_address_cus.insert()

        # Tạo mới contact khách hàng
        new_contact = frappe.new_doc('Contact')
        contact_fields = ['first_name', "address_contact"]
        for key, value in kwargs.items():
            if key in contact_fields:
                new_contact.set(key, value)

        new_contact.append('links', {
            'link_doctype': new_customer.doctype,
            'link_name': new_customer.name,
        })
        new_contact.append('phone_nos', {
            'phone': phone_number
        })

        # Tạo mới địa chỉ contact
        new_address_contact = frappe.new_doc('Address')
        new_address_contact.address_title = kwargs.get('adr_title_contact')
        new_address_contact.address_type = kwargs.get('adr_type_contact')
        new_address_contact.address_line1 = kwargs.get('detail_adr_contact')
        new_address_contact.address_line2 = kwargs.get('ward_contact')
        new_address_contact.city = kwargs.get('district_contact')
        new_address_contact.state = kwargs.get('province_contact')
        new_address_contact.append('links', {
            'link_doctype': new_customer.doctype,
            'link_name': new_customer.name,
        })
        new_address_contact.insert()

        new_contact.address = new_address_contact.name
        new_contact.insert()

        # Thêm primary_contact, primary_address và cập nhật ảnh đại diện của khách hàng
        new_customer.customer_primary_contact = new_contact.name
        new_customer.customer_primary_address = new_address_cus.name
        new_customer.image = post_image(name_image=kwargs.get('name_image'), faceimage=kwargs.get('faceimage'), doc_type='Customer', doc_name=new_customer.name)
        new_customer.save()

        # Thêm tuyến khách hàng
        router = frappe.get_doc('DMS Router', kwargs.get('router_name'))
        router.append('customers', {
            'customer': new_customer.name,
            'customer_id': new_customer.customer_id,
            'customer_name': new_customer.customer_name,
            'display_address': new_customer.customer_primary_address,
            'frequency': kwargs.get('frequency')
        })
        router.save()

        frappe.db.commit()
        return gen_response(200, 'Thành công', {"name": new_customer.name})
    except Exception as e:
        return exception_handel(e)
    

#list 
@frappe.whitelist(methods="GET")
def list_territory():
    try:
        territory = frappe.db.get_list('Territory', fields=["name", "territory_name"])
        gen_response(200, "Thành công", territory)
    except Exception as e:
        return exception_handel(e)