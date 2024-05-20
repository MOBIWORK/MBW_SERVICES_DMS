import frappe
from frappe import _
import json

from mbw_dms.api.common import (
    exception_handle,
    gen_response,
    validate_image,
    post_image,
    get_value_child_doctype,
    routers_name_of_customer,
    customers_code_router
)
from mbw_dms.api.validators import (
    validate_date, 
    validate_phone_number, 
    validate_choice,
    validate_not_none,
    validate_filter_timestamp
)
from mbw_dms.api import configs
import pydash


# Danh sách khách hàng
@frappe.whitelist(methods='GET')
def list_customer(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        name = kwargs.get('name')
        customer_name = kwargs.get('customer_name')
        customer_type = kwargs.get('customer_type')
        customer_group = kwargs.get('customer_group')
        from_date = validate_filter_timestamp('start')(kwargs.get('from_date')) if kwargs.get('from_date') else None
        to_date = validate_filter_timestamp('end')(kwargs.get('to_date')) if kwargs.get('to_date') else None
        routers = routers_name_of_customer()
        if not routers or len(routers) == 0 :
            return gen_response(200, "", [])
        customers_name = customers_code_router(routersName=routers)
        my_filter = {
            "customer_code": ["in", customers_name]
        }

        page_size = int(kwargs.get('page_size', 20))
        page_number = 1 if not kwargs.get('page') or int(kwargs.get('page')) <= 0 else int(kwargs.get('page'))
        if name:
            my_filter["name"] = ["like", f"%{name}%"]
        if customer_name:
            my_filter["customer_name"] = ["like", f"%{customer_name}%"]
        if customer_type:
            my_filter["customer_type"] = ["like", f"%{customer_type}%"]
        if customer_group:
            my_filter["customer_group"] = ["like", f"%{customer_group}%"]
        if from_date and to_date:
            my_filter["custom_birthday"] = ["between", [from_date, to_date]]

        customers = frappe.db.get_all("Customer",
                                filters=my_filter,
                                fields=["name", "customer_name",
                                        "customer_code","customer_type", 
                                        "customer_group", "territory",
                                        "industry", "image","website", 
                                        "mobile_no as contacts", "customer_primary_address",
                                        "custom_birthday","customer_location_primary",
                                        "customer_details"],
                                start=page_size*(page_number-1), 
                                page_length=page_size)
                                
        record = len(frappe.db.get_all("Customer", filters=my_filter))

        for customer in customers:
            if customer.customer_location_primary == "":
                customer.customer_location_primary = None

            if customer['custom_birthday'] is not None:
                customer['custom_birthday'] = customer['custom_birthday'].strftime("%d/%m/%Y")
            customer['image'] = validate_image(customer.get("image"))
            customer['contact'] = get_contact(customer.get("name"))
            customer['address'] = get_customer_addresses(customer.get("name"))
            customer['cre_limid'] = frappe.db.get_all("Customer Credit Limit", {"parent" : customer.get('name')}, ['credit_limit'])
        return gen_response(200, "Thành công", {
            "data": customers,
            "page_number": page_number,
            "page_size": page_size,
            "total": record
        })
    except Exception as e:
        return exception_handle(e)
    

# Chi tiết khách hàng
@frappe.whitelist(methods="GET")
def customer_detail(name):
    try: 
        doc_customer = frappe.get_doc("Customer",name).as_dict()
        routers = routers_name_of_customer(more_filters={"customer_code": doc_customer.customer_code})
        address = frappe.db.get_all("Address",{"link_doctype": "Customer","link_name": doc_customer.name},["address_title","address_location","is_primary_address","is_shipping_address"])
        contacts = frappe.db.get_all("Contact",{"link_doctype": "Customer","link_name": doc_customer.name},["first_name","last_name","address","phone"])
        list_router_frequency = []
        for name in routers:
            router = frappe.get_doc("DMS Router",name).as_dict()
            customers = router.customers
            this_customer = pydash.find(customers,lambda x: x.customer_code == doc_customer.customer_code)
            if this_customer:
                list_router_frequency += [{"frequency":this_customer.frequency,"router_name": router.channel_name,"router_code": router.channel_code}]
        doc_customer = pydash.pick_by(doc_customer,lambda value,key: key not in [ "docstatus","idx", "naming_series", "is_internal_customer","language","so_required","dn_required","is_frozen","disabled", "doctype",])       
        doc_customer["address"] = address
        doc_customer["contacts"] = contacts
        doc_customer["routers"] = list_router_frequency

        return gen_response(200, "", doc_customer)
    except Exception as e:
        exception_handle(e)


# list customer type Company Individual
@frappe.whitelist(methods="GET")
def list_customer_type():
    try:
        brand = frappe.db.get_list("Customer Group", fields=["name", "customer_group_name"])
        return gen_response(200, "Thành công", brand)
    except Exception as e:
        return exception_handle(e)
    
# Xóa khách hàng
@frappe.whitelist(methods="DELETE")
def delete_customer(name):
    try:
        if frappe.db.exists("Customer", {"name": name}):
            frappe.delete_doc("Customer", name)
            return gen_response(200, "Thành công", [])
        else:
            return gen_response(400, f"Không tồn tại khách hàng {name}")
    except Exception as e:
        exception_handle(e)

# Thêm mới khách hàng
@frappe.whitelist(methods="POST")
def create_customer(**kwargs):
    try:
        # Check dữ liệu đầu vào
        phone_number = ''
        address = kwargs.get('address')
        contact = kwargs.get('contact')
        router_in = kwargs.get('router')
        if contact and contact.get('phone'):
            phone_number = validate_phone_number(contact.get('phone'))
        json_location = ""
        if address.get("latitude") and address.get("longitude"):
            json_location = json.dumps({"long": kwargs.get("longitude"), "lat": kwargs.get("latitude")})
            
        # Tạo mới khách hàng
        new_customer = frappe.new_doc('Customer')
        required_fields = ['customer_code', 'customer_name', 'customer_group', 'territory']
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
        
        user_id = frappe.session.user
        employee_name = frappe.get_value('Employee', {'user_id': user_id}, 'name')
        sale_person = frappe.get_value('Sales Person', {'employee': employee_name}, 'parent_sales_person')
        new_customer.custom_sales_manager = sale_person

        new_customer.customer_location_primary = json_location

        new_customer.append('credit_limits', {
            'company': kwargs.get('company'),
            'credit_limit': kwargs.get('credit_limit')
        })
        new_customer.insert()

        # Tạo mới địa chỉ khách hàng
        if address and address.get('address_title'):
            new_address_cus = frappe.new_doc('Address')
            new_address_cus.address_title = address.get('address_title')
            new_address_cus.address_type = "Personal"
            new_address_cus.address_line1 = address.get('address_line1')
            new_address_cus.city = address.get('city')
            new_address_cus.county = address.get('county')
            new_address_cus.state = address.get('state')
            new_address_cus.is_shipping_address = address.get('is_shipping_address')
            new_address_cus.is_primary_address = address.get('is_primary_address')
            new_address_cus.address_location = json_location
            new_address_cus.append('links', {
                'link_doctype': new_customer.doctype,
                'link_name': new_customer.name,
            })
            new_address_cus.insert()
            new_customer.customer_primary_address = new_address_cus.name
            new_customer.save()

        # Tạo mới contact khách hàng
        if contact and contact.get('first_name'):
            new_contact = frappe.new_doc('Contact')
            contact_fields = ['first_name', "address_contact","phone"]
            for key, value in contact.items():
                if key in contact_fields:
                    new_contact.set(key, value)
            new_contact.is_primary_contact = 1
            new_contact.is_billing_contact = 1

            new_contact.append('links', {
                'link_doctype': new_customer.doctype,
                'link_name': new_customer.name,
            })
            new_contact.append('phone_nos', {
                'phone': phone_number
            })
            new_contact.insert()
            # Tạo mới địa chỉ contact
            new_address_contact = frappe.new_doc('Address')
            new_address_contact.address_title = contact.get('address_title')
            new_address_contact.address_type = contact.get('address_type')
            new_address_contact.address_line1 = contact.get('address_line1')
            new_address_contact.city = contact.get('city')
            new_address_contact.county = contact.get('county')
            new_address_contact.state = contact.get('state')
            new_address_contact.append('links', {
                'link_doctype': new_contact.doctype,
                'link_name': new_contact.name,
            })
            new_address_contact.insert()

            new_contact.address = new_address_contact.name
            new_contact.save()
            new_customer.customer_primary_contact = new_contact.name
            new_customer.save()

        # xử lý thêm ảnh khách hàng
        if kwargs.get('image'):
            new_customer.image = post_image(name_image='', faceimage=kwargs.get('image'), doc_type='Customer', doc_name=new_customer.name)
            new_customer.save()

        # Thêm khách hàng vào tuyến 
        if router_in and router_in.get('router_name'):
            router = frappe.get_doc('DMS Router', router_in.get('router_name'))
            router.append('customers', {
                'customer': new_customer.name,
                'customer_code': new_customer.customer_code,
                'customer_name': new_customer.customer_name,
                'display_address': new_customer.customer_primary_address,
                'frequency': router_in.get('frequency')
            })
            router.save()

        frappe.db.commit()
        return gen_response(201, "Thành công", {"name": new_customer.name})
    except Exception as e:
        if new_customer:
            frappe.db.delete("Customer",new_customer.name)
        if new_address_cus:
            frappe.db.delete("Address",new_address_cus.name)
        if new_contact:
            frappe.db.delete("Contact",new_contact.name)
        if new_address_contact:
            frappe.db.delete("Contact",new_address_contact.name)
        return exception_handle(e)
    
# Danh sách lãnh thổ 
@frappe.whitelist(methods="GET")
def list_territory():
    try:
        territory = frappe.db.get_list('Territory', fields=["name", "territory_name"])
        return gen_response(200, "Thành công", territory)
    except Exception as e:
        return exception_handle(e)
    
# Chỉnh sửa khách hàng
@frappe.whitelist(methods="PUT")
def update_customer(name, **kwargs):
    try:
        if frappe.db.exists("Customer", name, cache=True):
            customers = frappe.get_doc('Customer', name)
            for field, value in dict(kwargs).items():
                setattr(customers, field, value)
            customers.save()
            return gen_response(200, "Cập nhật thành công")
        else:
            return gen_response(406, f"Không tồn tại {name}")
    except Exception as e:
        return exception_handle(e)

# Lấy địa chỉ khách hàng
@frappe.whitelist(methods="GET")
def get_customer_addresses(customer_name):
    addresses = frappe.db.get_all(
        "Address",
        filters={"link_name": customer_name},
        fields=["name", "address_line1", "address_line2", "city", "state", "is_primary_address", "is_shipping_address", "county"]
    )
    return gen_response(200, "Thành công", addresses)

# Lấy liên hệ khách hàng
@frappe.whitelist(methods="GET")
def get_contact(customer_name):
    contact = frappe.get_all(
        "Contact",
        filters={"link_name": customer_name},
        fields=['name','first_name', "phone", "is_primary_contact", "is_billing_contact"]
    )
    return gen_response(200, "Thành công", contact)

# Lấy danh sách tuyến khách hàng
@frappe.whitelist(methods='GET')
def list_router(customer_name):
    try:
        list_router = frappe.db.get_list('DMS Router', filters={'customer_name': customer_name}, fields=['*'])
        for i in list_router:
            i['customers'] = get_value_child_doctype('DMS Router', i['name'], 'customers')
        return gen_response(200, "Thành công", list_router)
    except Exception as e:
        return exception_handle(e)
    
# Lấy danh sách nhân viên bán hàng
@frappe.whitelist(methods='GET')
def list_sale_person():
    try:
        sale_person = frappe.get_list(
        "Sales Person",
        filters={"enabled": 1},
        fields=['name','sales_person_name']
        )
        return gen_response(200, "Thành công", sale_person)
    except Exception as e:
        return exception_handle(e)

# Lấy danh sách khách hàng có địa chỉ
@frappe.whitelist(methods='GET')
def get_customer_has_location(**kwargs):
    try:
        sql_query = """
            SELECT
                name, customer_name, customer_code, customer_type, customer_group, territory, customer_primary_contact, customer_primary_address, customer_location_primary
            FROM
                tabCustomer
            WHERE
                customer_location_primary IS NOT NULL
        """

        list_customers = frappe.db.sql(sql_query, as_dict=True)
        return gen_response(200, "Thành công", list_customers)
    except Exception as e:
        return exception_handle(e)