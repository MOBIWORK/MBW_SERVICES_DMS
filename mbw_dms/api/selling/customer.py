import frappe
from frappe import _
import json

from mbw_dms.api.common import (
    CommonHandle,
    exception_handle,
    gen_response,
    validate_image,
    post_image,
    get_value_child_doctype,
    routers_name_of_customer,
    customers_code_router,
    null_location,
    handle_address_customer
)

from mbw_dms.api.validators import (
    validate_date, 
    validate_phone_number, 
    validate_choice,
    validate_not_none,
    validate_filter_timestamp,
    validate_filter
)
from mbw_dms.api import configs
import pydash
from frappe.query_builder import DocType
from frappe.query_builder.functions import Count

# Danh sách khách hàng
@frappe.whitelist(methods="GET")
def list_customer(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        name = kwargs.get("name")
        search_key = kwargs.get("search_key")
        customer_type = kwargs.get("customer_type")
        customer_group = kwargs.get("customer_group")
        from_date = validate_filter_timestamp("start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp("end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        routers = routers_name_of_customer()
        if not routers or len(routers) == 0 :
            return gen_response(200, "", [])
        customers_name = customers_code_router(routersName=routers)

        CustomerDoc = DocType("Customer")
        page_size = int(kwargs.get("page_size", 20))
        page_number = 1 if not kwargs.get("page_number") or int(kwargs.get("page_number")) <= 0 else int(kwargs.get("page_number"))
        def CustomerField(name):
            return CustomerDoc[name]

        my_filter = (CustomerField("customer_code").isin(customers_name) & CustomerField("disabled").eq(0))
        if name:
            my_filter = (my_filter & CustomerField("name").eq(name))
        if customer_type:
            my_filter = (my_filter & CustomerField("customer_type").eq(customer_type))
        if customer_group:
            my_filter = (my_filter & CustomerField("customer_group").eq(customer_group))
        if search_key:
            my_filter = (my_filter & ( CustomerField("customer_name").like(f"%{search_key}%") | CustomerField("customer_code").like(f"%{search_key}%") ))
        if from_date and to_date:
            my_filter = (my_filter & CustomerField("custom_birthday").between(from_date,to_date))

        select_field = ["name", "customer_name", "customer_code","customer_type", 
                        "customer_group", "territory", "industry", "image", "website", 
                        "mobile_no", "customer_primary_address", "custom_birthday",
                        "customer_location_primary", "customer_details", "sfa_customer_type","sfa_sale_channel"]
        
        customers = (frappe.qb.from_(CustomerDoc)
                    .distinct()
                    .select(*select_field)
                    .where(my_filter)
                    .limit(page_size)
                    .offset(page_size*(page_number-1))
                    ).run(as_dict=True)
        
        record = frappe.qb.from_(CustomerDoc).where(my_filter).select(Count('*')).distinct().run(as_dict=True)

        for customer in customers:
            if customer.customer_location_primary == "":
                customer.customer_location_primary = None

            if customer["custom_birthday"] is not None:
                customer["custom_birthday"] = customer["custom_birthday"].strftime("%d/%m/%Y")
            customer["image"] = validate_image(customer.get("image"))
            customer["contact"] = get_contact(customer.get("name"))
            customer["address"] = get_customer_addresses(customer.get("name"))
            customer["cre_limid"] = frappe.db.get_all("Customer Credit Limit", {"parent" : customer.get("name")}, ["credit_limit"])

        return gen_response(200, "Thành công", {
            "data": customers,
            "page_number": page_number,
            "page_size": page_size,
            "total": record[0]['COUNT(*)']
        })
    except Exception as e:
        return exception_handle(e)
    

# Chi tiết khách hàng
@frappe.whitelist(methods="GET")
def customer_detail(name):
    try: 
        doc_customer = frappe.get_doc("Customer", name).as_dict()
        filter_cs = {"link_doctype": "Customer", "link_name": doc_customer.name}
        routers = routers_name_of_customer(more_filters={"customer_code": doc_customer.customer_code})
        address = frappe.db.get_all("Address", filters=filter_cs, fields = ["name", "address_title", "address_location", "is_primary_address", "is_shipping_address", "city", "county", "state", "address_line1"])
        contacts = frappe.db.get_all("Contact", filters=filter_cs, fields = ["name", "first_name", "last_name", "address", "phone", "mobile_no"])
        list_router_frequency = []
        if bool(routers):
            for name in routers:
                router = frappe.get_doc("DMS Router",name).as_dict()
                customers = router.customers
                this_customer = pydash.find(customers,lambda x: x.customer_code == doc_customer.customer_code)
                if this_customer:
                    list_router_frequency += [{"frequency": this_customer.frequency, "router_name": router.channel_name, "router_code": router.channel_code}]

        for contact in contacts: 
            address_contact = contact.address
            if address_contact:
                doc_address = frappe.db.get_value("Address", address_contact, ["city", "state", "county", "address_title", "address_line1"], as_dict=1)
                for key, value in doc_address.items() :
                    contact.update({
                        key:value
                    })

        doc_customer = pydash.pick_by(doc_customer, lambda value, key: key not in ["docstatus", "idx", "naming_series", "is_internal_customer", "language", "so_required", "dn_required", "is_frozen", "disabled", "doctype"])       
        doc_customer["address"] = address
        doc_customer["contacts"] = contacts
        doc_customer["routers"] = list_router_frequency
        doc_customer["customer_location_primary"] = null_location(doc_customer["customer_location_primary"])
        doc_customer["address"] = pydash.map_(address,lambda x: {**x, "primary": 1 if x.name == doc_customer.get("customer_primary_address") else 0})
        doc_customer["credit_limits"] = pydash.map_(doc_customer["credit_limits"], lambda x: x.credit_limit) if len(doc_customer["credit_limits"]) > 0 else[ 0 ] 

        if doc_customer["image"] and not doc_customer["image"].startswith("http"):
            from frappe.utils import get_url
            doc_customer["image"] = (get_url() +  doc_customer["image"]).replace(" ", "%20")
        for address_in in doc_customer["address"]:
            address_in.update({
                "address_location": null_location(address_in.get("address_location")) if address_in.get("address_location") is not None else None
            })
        doc_customer["contacts"] = pydash.map_(doc_customer["contacts"],lambda x: {**x, "primary": 1 if x.name == doc_customer.get("customer_primary_contact") else 0})
        return gen_response(200, "Thành công", doc_customer)
    except Exception as e:
        exception_handle(e)


# List customer type
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
        # Xử lý dữ liệu đầu vào
        kwargs = frappe._dict(kwargs)
        address = frappe._dict(kwargs.get("address", {}))
        contact = frappe._dict(kwargs.get("contact", {}))
        router_in = kwargs.get("router", [])
        
        phone_number = validate_phone_number(contact.get("phone", "")) if contact.get("phone") else ""
        json_location = json.dumps({"long": address.get("longitude"), "lat": address.get("latitude")}) if address.get("latitude") and address.get("longitude") else ""
        
        # Tạo mới khách hàng
        new_customer = frappe.new_doc("Customer")
        set_fields(new_customer, kwargs, ["customer_name"], required=True)
        set_fields(new_customer, kwargs, ["customer_details", "website", "customer_group", "territory", "sfa_customer_type", "sfa_sale_channel"])
        set_fields(new_customer, kwargs, ["custom_birthday"], date_fields=True)
        set_fields(new_customer, kwargs, ["customer_type"], choice_fields=configs.customer_type)
        
        user_id = frappe.session.user
        employee = frappe.db.get_value("Employee", {"user_id": user_id}, ["name", "company"], as_dict=True)
        new_customer.custom_sales_manager = frappe.get_value("Sales Person", {"employee": employee.name}, "parent_sales_person") if employee else ""
        new_customer.customer_location_primary = json_location

        new_customer.append("credit_limits", {
            "company": employee.company if employee else "",
            "credit_limit": kwargs.get("credit_limit"),
            "bypass_credit_limit_check": 1
        })
        new_customer.insert()

        # Xử lý địa chỉ khách hàng
        current_address = handle_address(address, json_location) if address.address_title else None
        
        # Xử lý contact khách hàng
        new_contact = handle_contact(contact, phone_number) if contact.get("first_name") else None
        
        # Xử lý thêm ảnh khách hàng
        if kwargs.get("image"):
            new_customer.image = post_image(name_image="", faceimage=kwargs.get("image"), doc_type="Customer", doc_name=new_customer.name)
            new_customer.save()

        # Thêm khách hàng vào tuyến
        if router_in and len(router_in) > 0:
            frappe.enqueue(update_customer_in_router, queue="short", is_async=True, enqueue_after_commit=True, customer=kwargs, routers=router_in, customer_code=new_customer.customer_code)

        # Liên kết khách hàng với địa chỉ và contact
        link_address_contact(new_customer, current_address, new_contact)

        frappe.db.commit()
        return gen_response(201, "Thành công", {"name": new_customer.name})

    except Exception as e:
        cleanup_on_failure(new_customer, current_address, new_contact)
        return exception_handle(e)

# Các hàm phụ trợ
def set_fields(doc, data, fields, required=False, date_fields=False, choice_fields=None):
    for field in fields:
        value = data.get(field)
        if required:
            value = validate_not_none(value)
        if date_fields:
            value = validate_date(value)
        if choice_fields:
            value = validate_choice(choice_fields)(value)
        doc.set(field, value)

def handle_address(address, location):
    address.address_location = location
    return handle_address_customer(address, {})

def handle_contact(contact, phone_number):
    new_contact = frappe.new_doc("Contact")
    set_fields(new_contact, contact, ["first_name", "address"])
    new_contact.is_primary_contact = 1
    new_contact.is_billing_contact = 1
    if phone_number:
        new_contact.append("phone_nos", {
            "phone": phone_number,
            "is_primary_phone": 1,
            "is_primary_mobile_no": 1
        })
    new_contact.insert()

    if contact.get("address_title") and contact.get("city"):
        link_cs_contact = {"link_doctype": new_contact.doctype, "link_name": new_contact.name}
        current_address_contact = handle_address_customer(contact, link_cs_contact)
        new_contact.address = current_address_contact.name if frappe.db.exists("Address", current_address_contact.name) else current_address_contact.address_title
        new_contact.save()
    return new_contact

def link_address_contact(customer, address, contact):
    if address:
        link_cs_address = {"link_doctype": customer.doctype, "link_name": customer.name}
        address.append("links", link_cs_address)
        address.save()
        customer.customer_primary_address = address.name if frappe.db.exists("Address", address.name) else address.address_title
        customer.save()
    if contact:
        link_cs_contact = {"link_doctype": customer.doctype, "link_name": customer.name}
        contact.append("links", link_cs_contact)
        contact.save()
        customer.customer_primary_contact = contact.name
        customer.save()

def cleanup_on_failure(new_customer, current_address, new_contact):
    try:
        if new_customer:
            frappe.delete_doc("Customer", new_customer.name, ignore_permissions=True)
        if current_address:
            frappe.delete_doc("Address", {"address_title": ["like", f"%{current_address.address_title}%"]}, ignore_permissions=True)
        if new_contact:
            if current_address_contact := frappe.get_doc("Address", current_address_contact.name):
                links = pydash.filter_(current_address_contact.get("links"), lambda x: not(x.get("link_doctype") == "Contact" and x.get("link_name") == new_contact.name))
                current_address_contact.set("links", links)
                current_address_contact.save()
                new_contact.address = None
                new_contact.save()
                frappe.delete_doc("Contact", new_contact.name)
                if not links:
                    frappe.delete_doc("Address", {"address_title": ["like", f"%{current_address_contact.address_title}%"]})
    except Exception as ex:
        print("Xử lí ngoại lệ thất bại:", ex)
    
    
# Chỉnh sửa khách hàng
@frappe.whitelist(methods="PUT")
def update_customer(**kwargs):
    try:
        name = kwargs.get("name")
        if frappe.db.exists("Customer", name, cache=True):
            customer = frappe.get_doc("Customer", name)            
            # Cập nhật các trường cơ bản của khách hàng
            fields = ["customer_code", "customer_name", "customer_group", "territory", "customer_details", "website", "customer_type","sfa_customer_type","sfa_sale_channel"]
            date_fields = ["custom_birthday"]
            for key, value in kwargs.items():
                if key in fields:
                    customer.set(key, value)
                elif key in date_fields and value != None:
                    custom_birthday = validate_date(value)
                    customer.set(key, custom_birthday)

            # Thay đổi ảnh
            if kwargs.get("image") and (not customer.image or customer.image != kwargs.get("image")):
                is_base64 = CommonHandle.check_base64(kwargs.get("image"))
                if is_base64:
                    customer.image = post_image(name_image="", faceimage=kwargs.get("image"), doc_type="Customer", doc_name=customer.name)
                else: 
                    customer.image = kwargs.get("image")
                customer.save()
            
            # Chỉnh sửa hạn mức công nợ
            if kwargs.get("credit_limits"):
                credit_limits = kwargs.get("credit_limits")
                customer.set("credit_limits", [{
                    "credit_limit": credit_limits[0],
                    "bypass_credit_limit_check": 1
                }])
                customer.save()
                
            # Cập nhật hoặc thêm mới địa chỉ
        if kwargs.get("address"):
            update_customer_addresses(customer, kwargs.get("address"), name)

        # Cập nhật hoặc thêm mới liên hệ
        if kwargs.get("contacts"):
            update_customer_contacts(customer, kwargs.get("contacts"), name)

            router_in = kwargs.get("router")
            if router_in and len(router_in) > 0:
                frappe.enqueue(update_customer_in_router, queue="short", is_async=True, enqueue_after_commit=True, customer=kwargs, routers=router_in, customer_code=new_customer.customer_code)
            
            customer.save()
            frappe.db.commit()
            return gen_response(200, "Cập nhật thông tin khách hàng thành công")
        else:
            return gen_response(406, f"Không tồn tại khách hàng {name}")
    except Exception as e:
        return exception_handle(e)

def update_customer_addresses(customer, addresses, customer_name):
    link_cs_address = {"link_doctype": "Customer", "link_name": customer_name}
    for address_data in addresses:
        if address_data.get("latitude") and address_data.get("longitude"):
            address_data["address_location"] = json.dumps({
                "long": address_data["longitude"],
                "lat": address_data["latitude"]
            })
        handle_address_customer(address_data, link_cs_address)

    primary_address = pydash.find(addresses, lambda x: x.get("primary") == 1)
    if primary_address:
        set_primary_address(customer, primary_address)

def set_primary_address(customer, address_data):
    address_id = address_data.get("name") or frappe.get_value(
        "Address", {"address_title": ["like", f"%{address_data['address_title']}%"]}, "name"
    )
    if address_id:
        customer.customer_primary_address = address_id
        customer.save()

def update_customer_contacts(customer, contacts, customer_name):
    for contact_data in contacts:
        if contact_data.get("city") and contact_data.get("address_line1"):
            address_data = {
                "address_title": contact_data["address_title"],
                "address_line1": contact_data["address_line1"],
                "city": contact_data["city"],
                "county": contact_data.get("county"),
                "state": contact_data.get("state")
            }
        else:
            address_data = {}

        contact = frappe.get_doc("Contact", contact_data.get("name")) if frappe.db.exists("Contact", contact_data.get("name")) else None
        if contact:
            unlink_and_delete_contact(contact, customer_name)

        new_contact = create_new_contact(contact_data, customer_name, address_data)
        
        if new_contact and pydash.find(contacts, lambda x: x.get("primary") == 1):
            customer.customer_primary_contact = new_contact.name
            customer.save()

def unlink_and_delete_contact(contact, customer_name):
    frappe.db.sql("""
        UPDATE `tabCustomer`
        SET customer_primary_contact=NULL, mobile_no=NULL, email_id=NULL
        WHERE name=%s AND customer_primary_contact=%s
    """, (customer_name, contact.name))
    frappe.db.delete("Address", contact.address)
    frappe.db.delete("Contact", contact.name)

def create_new_contact(contact_data, customer_name, address_data):
    new_contact = frappe.new_doc("Contact")
    new_contact.update({
        "first_name": contact_data.get("first_name"),
        "last_name": contact_data.get("last_name"),
        "is_primary_contact": contact_data.get("is_primary_contact", 0),
        "is_billing_contact": contact_data.get("is_billing_contact", 0)
    })
    if contact_data.get("phone"):
        new_contact.append("phone_nos", {"phone": contact_data["phone"], "is_primary_mobile_no": 1})

    new_contact.append("links", {"link_doctype": "Customer", "link_name": customer_name})
    new_contact.insert()

    if address_data:
        link_cs_address = {"link_doctype": "Contact", "link_name": new_contact.name}
        new_contact.address = handle_address_customer(address_data, link_cs_address)
        new_contact.save()

    return new_contact


# Danh sách lãnh thổ 
@frappe.whitelist(methods="GET")
def list_territory():
    try:
        territory = frappe.db.get_list("Territory", fields=["name", "territory_name"])
        return gen_response(200, "Thành công", territory)
    except Exception as e:
        return exception_handle(e)

# Lấy địa chỉ khách hàng
@frappe.whitelist(methods="GET")
def get_customer_addresses(customer_name):
    addresses = frappe.db.get_all("Address", filters={"link_name": customer_name},
        fields=["name", "address_line1", "address_line2", "city", "state", "is_primary_address", "is_shipping_address", "county"]
    )
    return gen_response(200, "Thành công", addresses)

# Lấy liên hệ khách hàng
@frappe.whitelist(methods="GET")
def get_contact(customer_name):
    contact = frappe.get_all("Contact",
        filters={"link_name": customer_name},
        fields=["name", "first_name", "phone", "is_primary_contact", "is_billing_contact"]
    )
    return gen_response(200, "Thành công", contact)

# Lấy danh sách tuyến khách hàng
@frappe.whitelist(methods="GET")
def list_router(customer_name):
    try:
        list_router = frappe.db.get_list("DMS Router", filters={"customer_name": customer_name}, fields=["*"])
        for i in list_router:
            i["customers"] = get_value_child_doctype("DMS Router", i["name"], "customers")
        return gen_response(200, "Thành công", list_router)
    except Exception as e:
        return exception_handle(e)
    
# Lấy danh sách nhân viên bán hàng
@frappe.whitelist(methods="GET")
def list_sale_person():
    try:
        sale_person = frappe.get_all("Sales Person", filters={"enabled": 1}, fields=["name", "sales_person_name"])
        return gen_response(200, "Thành công", sale_person)
    except Exception as e:
        return exception_handle(e)

# Lấy danh sách khách hàng có địa chỉ
@frappe.whitelist(methods="GET")
def get_customer_has_location(**kwargs):
    try:
        sql_query = """
            SELECT
                name, customer_name, customer_code, customer_type, customer_group, territory, 
                customer_primary_contact, customer_primary_address, customer_location_primary
            FROM
                tabCustomer
            WHERE
                customer_location_primary IS NOT NULL
        """

        list_customers = frappe.db.sql(sql_query, as_dict=True)
        return gen_response(200, "Thành công", list_customers)
    except Exception as e:
        return exception_handle(e)


@frappe.whitelist(methods="DELETE")
def remove_contact_address(**kwarg):
    try:
        customer = validate_filter(value=(kwarg.get("customer"), "customer"), type_check="require_field") 
        name = validate_filter(value=(kwarg.get("name"), "name"), type_check="require_field") 
        type_remove = validate_filter(value=(kwarg.get("type"), "type"), type_check="require_field") 
        final_type = validate_filter(value=type_remove, type_check="enum", type=["contact", "address"])
        doctype = {
            "contact": "Contact",
            "address": "Address"
        }

        if name:
            if final_type == "address":
                    frappe.db.sql("""
                        UPDATE `tabCustomer` 
                        SET customer_primary_address=NULL, primary_address=NULL 
                        WHERE name=%s AND customer_primary_address=%s
                    """, (customer, name))

            elif final_type == "contact":
                frappe.db.sql("""
                    UPDATE `tabCustomer` 
                    SET customer_primary_contact=NULL, mobile_no=NULL, email_id=NULL
                    WHERE name=%s AND customer_primary_contact=%s
                """, (customer, name))

                contact = frappe.get_doc("Contact", name)
                if contact.address:
                    frappe.db.delete("Address", contact.address)
        
            frappe.db.delete(doctype[final_type], name)
        return gen_response(200, "Thành công")
    except Exception as e :
        return exception_handle(e)


# Danh sách loại khách hàng-sfa_customer_type -linkto: DMS Customer Type
from mbw_dms.api.common import get_list_search
@frappe.whitelist()
def list_dms_cs_type():
    return gen_response(200, "Thành công", get_list_search(doctype="DMS Customer Type", reference_doctype="Customer", ignore_user_permissions=0, txt=""))


# Danh sách loại hình khách hàng - customer_type - Company/Individual/Proprietorship/Partnership
@frappe.whitelist(methods="GET")
def get_type_customer():
    try:
        customer_type = frappe.db.get_list("DMS Customer Type", fields=["name", "customer_type_id", "customer_type_name"])
        return gen_response(200, "Thành công", customer_type)
    except Exception as e:
        return exception_handle(e)
    

# Danh sách kênh-sfa_sale_channel - link to: DMS Sales Channel
@frappe.whitelist(methods="GET")
def get_channel():
    try:
        channel = frappe.db.get_list("DMS Sales Channel", fields=["name", "sales_channel_id", "sales_channel_name"])
        return gen_response(200, "Thành công", channel)
    except Exception as e:
        return exception_handle(e)


# Cập nhật khách hàng vào danh sách tuyến
def update_customer_in_router(customer={}, routers=[], customer_code=None):
    customer = frappe._dict(customer)
    if isinstance(customer.address, list):
        address = pydash.find( customer.address, lambda x:x.get("primary"))
    else:
        address = customer.address
    if isinstance(customer.contact, list):
        contact = pydash.find( customer.contact, lambda x:x.get("primary"))
    else:
        contact = customer.contact
    contact = frappe._dict(contact) if contact else False
    customer_router = {
        "customer_code": customer_code if bool(customer_code) else "",
        "customer_name": customer.customer_name or "",
        "display_address": customer.display_address or "",
        "phone_number":  contact.phone if contact else "",
        "frequency": customer.frequency or "",
        "long": address.get("longitude") if address else 0,
        "lat": address.get("latitude") if address else 0
    }

    list_router = frappe.db.get_all("DMS Router", {"name": ["in", routers]}, ["*"])
    if len(list_router) > 0 :
        for router in list_router:
            router_doc = frappe.get_doc("DMS Router", router.get("name"))
            cus_list = router_doc.get("customers") or []
            exist = pydash.find(cus_list, lambda x: x.customer_code == customer.customer_code)
            if exist:
                cus_list = pydash.map_(cus_list, lambda x: x.update(customer_router))
            else:
                cus_list.append(customer_router)    
            router_doc.set("customers", cus_list)   
            router_doc.save(ignore_permissions=True)    
    return
