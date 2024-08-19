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
    customers_code_router,
    null_location,
    CommonHandle,
    create_address,
    update_address,
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
from frappe.query_builder import (Field, DocType)
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
                                        "customer_location_primary", "customer_details","sfa_customer_type","sfa_sale_channel"]
        
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
        doc_customer = frappe.get_doc("Customer",name).as_dict()
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
        doc_customer["address"] = pydash.map_(address,lambda x: {**x,"primary": 1 if x.name == doc_customer.get("customer_primary_address") else 0})
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


# list customer type
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
        phone_number = ""
        address = kwargs.get("address")
        contact = kwargs.get("contact")
        router_in = kwargs.get("router")
        if contact and contact.get("phone"):
            phone_number = validate_phone_number(contact.get("phone"))
        json_location = ""
        if address.get("latitude") and address.get("longitude"):
            json_location = json.dumps({"long": address.get("longitude"), "lat": address.get("latitude")})
            
        # Tạo mới khách hàng
        new_customer = frappe.new_doc("Customer")
        required_fields = ["customer_code", "customer_name", "customer_group", "territory","sfa_customer_type","sfa_sale_channel"]
        normal_fields = ["customer_details", "website"]
        date_fields = ["custom_birthday"]
        choice_fields = ["customer_type"]
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
        employee_name = frappe.db.get_value("Employee", {"user_id": user_id}, ["name", "company"],as_dict=1)
        sale_person = frappe.get_value("Sales Person", {"employee": employee_name.name}, "parent_sales_person") if employee_name else ""
        new_customer.custom_sales_manager = sale_person

        new_customer.customer_location_primary = json_location

        new_customer.append("credit_limits", {
            "company": employee_name.company if employee_name else "",
            "credit_limit": kwargs.get("credit_limit"),
            "bypass_credit_limit_check": 1
        })
        new_customer.insert()
        # Tạo mới địa chỉ khách hàng
        if address and address.get("address_title"):
            new_address_cus = frappe.new_doc("Address")
            new_address_cus.address_title = address.get("address_title")
            new_address_cus.address_type = "Personal"
            new_address_cus.address_line1 = address.get("address_line1")
            new_address_cus.city = address.get("city")
            new_address_cus.county = address.get("county")
            new_address_cus.state = address.get("state")
            new_address_cus.is_shipping_address = address.get("is_shipping_address")
            new_address_cus.is_primary_address = address.get("is_primary_address")
            new_address_cus.address_location = json_location
            new_address_cus.append("links", {
                "link_doctype": new_customer.doctype,
                "link_name": new_customer.name,
            })
            new_address_cus.insert()
            new_customer.customer_primary_address = new_address_cus.name
            new_customer.save()

        # Tạo mới contact khách hàng
        if contact and contact.get("first_name"):
            new_contact = frappe.new_doc("Contact")
            contact_fields = ["first_name", "address_contact", "phone"]
            for key, value in contact.items():
                if key in contact_fields:
                    new_contact.set(key, value)

            new_contact.is_primary_contact = 1
            new_contact.is_billing_contact = 1

            new_contact.append("links", {
                "link_doctype": new_customer.doctype,
                "link_name": new_customer.name,
            })
            new_contact.append("phone_nos", {
                "phone": phone_number,
                "is_primary_phone":1,
                "is_primary_mobile_no":1
            })
            new_contact.insert()
            # Tạo mới địa chỉ contact
            new_address_contact = frappe.new_doc("Address")
            new_address_contact.address_title = contact.get("address_title")
            new_address_contact.address_type = contact.get("address_type")
            new_address_contact.address_line1 = contact.get("address_line1")
            new_address_contact.city = contact.get("city")
            new_address_contact.county = contact.get("county")
            new_address_contact.state = contact.get("state")
            new_address_contact.append("links", {
                "link_doctype": new_contact.doctype,
                "link_name": new_contact.name,
            })
            new_address_contact.insert()

            new_contact.address = new_address_contact.name
            new_contact.save()
            new_customer.customer_primary_contact = new_contact.name
            new_customer.save()

        # xử lý thêm ảnh khách hàng
        print(":new cus",new_customer)
        if kwargs.get("image"):
            new_customer.image = post_image(name_image='', faceimage=kwargs.get("image"), doc_type="Customer", doc_name=new_customer.name)
            new_customer.save()

        # Thêm khách hàng vào tuyến v1
        # if router_in and router_in.get("router_name"):
        #     router = frappe.get_doc("DMS Router", router_in.get("router_name"))
        #     router.append("customers", {
        #         "customer": new_customer.name,
        #         "customer_code": new_customer.customer_code,
        #         "customer_name": new_customer.customer_name,
        #         "display_address": new_customer.customer_primary_address,
        #         "frequency": router_in.get("frequency")
        #     })
        #     router.save()
        #thêm khách hàng vào tuyến v2
        if router_in and len(router_in)>0:
            frappe.enqueue(
                    update_customer_in_router,
                    queue="default",                        # one of short, default, long
                    timeout=None,                           # pass timeout manually
                    is_async=True,                         # if this is True, method is run in worker
                    now=False,                               # if this is True, method is run directly (not in a worker) 
                    job_name=None,                          # specify a job name
                    enqueue_after_commit=True,              # enqueue the job after the database commit is done at the end of the request
                    at_front=False,                         # put the job at the front of the queue
                    customer=kwargs,routers= router_in                             # kwargs are passed to the method as arguments
                )

        frappe.db.commit()
        return gen_response(201, "Thành công", {"name": new_customer.name})
    except Exception as e:
        if "new_customer" in locals() and new_customer is not None :
            frappe.delete_doc("Customer", new_customer.name,ignore_permissions=True)
        if "new_address_cus" in locals() and new_address_cus is not None:
            frappe.delete_doc("Address", new_address_cus.name,ignore_permissions=True)
        if "new_contact" in locals() and new_contact is not None :
            frappe.delete_doc("Contact", new_contact.name,ignore_permissions=True)
        if "new_address_contact" in locals() and new_address_contact is not None  :
            frappe.delete_doc("Contact", new_address_contact.name,ignore_permissions=True)
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
                # customer = frappe.get_doc("Customer", name)
                if is_base64:
                    customer.image = post_image(name_image="", faceimage=kwargs.get("image"), doc_type="Customer", doc_name=customer.name)
                else: 
                    customer.image = kwargs.get("image")
                customer.save()
            
            # Chỉnh sửa hạn mức công nợ
            if kwargs.get("credit_limits"):
                # customer = frappe.get_doc("Customer", name)
                credit_limits = kwargs.get("credit_limits")
                customer.set("credit_limits", [{
                    "credit_limit": credit_limits[0],
                    "bypass_credit_limit_check":1
                }])
                customer.save()
            # Cập nhật hoặc thêm mới địa chỉ
            if kwargs.get("address"):
                # customer = frappe.get_doc("Customer", name)
                link_cs_address = {
                    "link_doctype": "Customer",
                    "link_name": name
                }
                address_data_list = kwargs.get("address")
                if len(address_data_list) > 0:
                    json_location = ""
                    for address_data in address_data_list:
                        if address_data.get("latitude") and address_data.get("longitude"):
                            json_location = json.dumps({"long": address_data.get("longitude"), "lat": address_data.get("latitude")})
                        address_data["customer_location_primary"] =    json_location
                        #cũ
                        # current_address = update_address(address_data, link_cs_address, name, json_location)
                        #mới
                        current_address = handle_address_customer(address_data,link_cs_address)
                    address_data_primary = pydash.find(address_data_list,lambda x: x.get("primary") == 1)
                    if address_data_primary:
                        address_data_primary = frappe._dict(address_data_primary)
                        address_id = address_data_primary.get("name")
                        if address_id and frappe.db.exists("Address",address_id):
                            doc_address = frappe.get_doc("Address",address_id)
                        else:
                            doc_address = frappe.get_doc("Address",{"address_title":["like",f"%{address_data_primary.address_title}%"]})
                        try:
                            customer = frappe.get_doc("Customer", name)      
                            customer.set("customer_primary_address", doc_address.name)
                            customer.save()
                        except Exception as e:
                            print("error=====",e)

            # Cập nhật hoặc thêm mới liên hệ
            if kwargs.get("contacts"):
                contacts_data_list = kwargs.get("contacts")
                
                new_address = {}
                contact_data_update = {}
                if contacts_data_list:
                    contact_data = contacts_data_list[0]
                    contact_name = contact_data.get("name")
                    if frappe.db.exists("Contact", contact_name):
                        frappe.db.sql("""
                            UPDATE `tabCustomer` 
                            SET customer_primary_contact=NULL, mobile_no=NULL, email_id=NULL
                            WHERE name=%s AND customer_primary_contact=%s
                        """, (name, contact_name))

                        contact = frappe.get_doc("Contact", contact_name)
                        if contact.address:
                            frappe.db.delete("Address", contact.address)
                        frappe.db.delete("Contact", contact_name)
                    
                    if contact_data.get("city") and contact_data.get("address_line1"):
                        new_address = {
                            "address_title":contact_data.get("address_title"),
                            "address_line1": contact_data.get("address_line1"),
                            "city": contact_data.get("city"),
                            "county": contact_data.get("county"),
                            "state": contact_data.get("state"),
                            "address": contact_data.get("address")
                        }
                    
                    contact_data_update = {
                        "first_name": contact_data.get("first_name"),
                        "is_billing_contact": contact_data.get("is_billing_contact"),
                        "is_primary_contact": contact_data.get("is_primary_contact"),
                        "last_name": contact_data.get("last_name"),
                        "phone": contact_data.get("phone")
                    }

                    new_contact = frappe.new_doc("Contact")

                    if contact_data_update.get("phone"):
                        new_contact.append("phone_nos", {"phone": contact_data_update.get("phone") ,"is_primary_mobile_no": 1})

                    new_contact.update(contact_data_update)
                    new_contact.append("links", {
                        "link_doctype": "Customer",
                        "link_name": name
                    })
                    new_contact.insert()

                    if bool(new_address):
                        link_cs_address= {
                            "link_doctype": "Customer",
                            "link_name": name 
                        }
                        address_current = update_address(new_address, link_cs_address, name_cus=name, json_location=None)
                        new_contact.address = address_current.name
                        new_contact.save()

                    if contact_data_update.get("is_primary_contact") == 1 :
                        # customer = frappe.get_doc("Customer", name)
                        customer.set("customer_primary_contact", new_contact.name)
                        customer.save()

            # Chỉnh sửa tuyến
            # if kwargs.get("router"):
            #     routers_data = kwargs.get("router")
            #     router_name = routers_data.get("router_name")
            #     if router_name and frappe.db.exists("DMS Router Customer", {"parent": router_name, "customer_name": name}):
            #         router = frappe.get_doc("DMS Router Customer", {"parent": router_name, "customer_name": name})
            #         router.frequency = routers_data.get("frequency")
            #         router.save()
            # Chỉnh sửa tuyến v2
            print("here")
            router_in = kwargs.get("router")
            if router_in and len(router_in)>0:
                frappe.enqueue(
                    update_customer_in_router,
                    queue="default",                        # one of short, default, long
                    timeout=None,                           # pass timeout manually
                    is_async=True,                         # if this is True, method is run in worker
                    now=False,                               # if this is True, method is run directly (not in a worker) 
                    job_name=None,                          # specify a job name
                    enqueue_after_commit=True,              # enqueue the job after the database commit is done at the end of the request
                    at_front=False,                         # put the job at the front of the queue
                    customer=kwargs,routers= router_in                             # kwargs are passed to the method as arguments
                )
            
            # customer.save()
            frappe.db.commit()
            return gen_response(200, "Cập nhật thông tin khách hàng thành công")
        else:
            return gen_response(406, f"Không tồn tại khách hàng {name}")
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

# danh sách loại khách hàng-sfa_customer_type -linkto: DMS Customer Type
from mbw_dms.api.common import get_list_search
@frappe.whitelist()
def list_dms_cs_type():
    return gen_response(200,"",get_list_search(doctype="DMS Customer Type",reference_doctype="Customer",ignore_user_permissions=0,txt=""))


# danh sách loại hình khách hàng - customer_type - Company/Individual/Proprietorship/Partnership
#Danh sách Loại khách hàng
@frappe.whitelist(methods="GET")
def get_type_customer():
    try:
        customer_type = frappe.db.get_list('DMS Customer Type', fields=["name", "customer_type_id", "customer_type_name"])
        return gen_response(200, "Thành công", customer_type)
    except Exception as e:
        return exception_handle(e)
    
# danh sách kênh-sfa_sale_channel - link to: DMS Sales Channel
#Danh sách kênh khách hàng
@frappe.whitelist(methods="GET")
def get_channel():
    try:
        channel = frappe.db.get_list('DMS Sales Channel', fields=["name", "sales_channel_id", "sales_channel_name"])
        return gen_response(200, "Thành công", channel)
    except Exception as e:
        return exception_handle(e)

#cập nhật khách hàng vào danh sách tuyến
def update_customer_in_router(customer={},routers=[]):
    customer = frappe._dict(customer)
    if isinstance(customer.address, list):
        address = pydash.find( customer.address,lambda x:x.get("primary"))
    else:
        address = customer.address
    if isinstance(customer.contact, list):
        contact = pydash.find( customer.contact,lambda x:x.get("primary"))
    else:
        contact = customer.contact
    customer_router = {
        "customer_code": customer.customer_code or "",
        "customer_name": customer.customer_name or "",
        "display_address": customer.display_address or "",
        "phone_number":  contact.phone if contact else "",
        "frequency":customer.frequency or "",
        "long": address.get("longitude") if address else 0,
        "lat":address.get("latitude") if address else 0
    }
    list_router = frappe.db.get_all("DMS Router",{"name": ["in",routers]},["*"])
    for router in list_router:
        router_doc = frappe.get_doc("DMS Router",router.get("name"))
        cus_list = router_doc.get("customers") or []
        exist = pydash.find(cus_list,lambda x: x.customer_code == customer.customer_code)
        if exist:
            cus_list = pydash.map_(cus_list,lambda x: x.update(customer_router))
        else:
            cus_list.append(customer_router)    
        router_doc.set("customers",cus_list)   
        router_doc.save(ignore_permissions=True)    
    return
