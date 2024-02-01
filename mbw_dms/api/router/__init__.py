import frappe
from frappe import _
import json
from datetime import datetime
from pypika import  Order, CustomFunction

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    this_week,
)

from mbw_dms.api.validators import (
    validate_filter
)
from mbw_dms.config_translate import i18n
UNIX_TIMESTAMP = CustomFunction('UNIX_TIMESTAMP', ['day'])

@frappe.whitelist(methods='GET')
def get_list_router(**filters):
    try:

        status = filters.get('status') if filters.get('status') else False
        employee = filters.get('employee') if filters.get('employee') else False
        modified_by = filters.get('modified_by') if filters.get('modified_by') else False
        modified = validate_filter(value=filters.get('modified'), type_check="timestamp") if filters.get('modified') else False
        owner = filters.get('owner') if filters.get('owner') else False
        creation = validate_filter(value=filters.get('creation'), type_check='timestamp') if filters.get('creation') else False
        router = filters.get('router') if filters.get('router') else False
        page_size =  int(filters.get('page_size')) if filters.get('page_size') else 20
        page_number = int(filters.get('page_number') )if filters.get('page_number') and int(filters.get('page_number')) <= 0 else 1
        orderby_array = ['modified',"name","owner","idx", "channel_code","channel_name", "employee"]
        order_by = validate_filter(value=filters.get('order_by'),type=orderby_array,type_check='enum') if filters.get('order_by') else False
        sort = validate_filter(value=filters.get('sort'),type=['desc','asc'], type_check="enum") if filters.get('sort') else False
        queryFilters = {"is_deleted": 0}
        if status:
            queryFilters['status'] = status
        if modified_by:
            queryFilters['modified_by'] = modified_by
        if modified:
            queryFilters['modified'] = modified
        if owner:
            queryFilters['owner'] = owner
        if creation:
            queryFilters['creation'] = creation
        if router:
            router = router.split(';')
            queryFilters['name'] = ["in",router]
        if employee:
            queryFilters['employee'] = employee
        order_string = 'travel_date desc'
        if order_by and sort:
            order_string = f"{order_by} {sort}"
        print(queryFilters)
        list_router = frappe.db.get_list('DMS Router',filters=queryFilters,fields=['*', 'UNIX_TIMESTAMP(travel_date) as travel_date'], 
                                       order_by=order_string, 
                                       start=page_size*(page_number-1), page_length=page_size)
        
        total = len(frappe.db.get_list('DMS Router',filters=queryFilters))
        gen_response(200,'',{
            "data": list_router,
            "total": total,
            "page_size": page_size,
            "page_number":page_number
        })
        return 
    except Exception as e: 
        exception_handel(e)

@frappe.whitelist(methods="GET")
def get_customer_router(**data):
    try:
        view_mode = validate_filter(value=data.get('view_mode'),type=['list','map'],type_check='enum') if data.get('view_mode') else 'list'
        # phan trang
        page_size =  int(data.get('page_size')) if data.get('page_size') else 20
        page_number = int(data.get('page_number') )if data.get('page_number') and int(data.get('page_number')) <= 0 else 1
        #bo loc tuyen
        router = validate_filter(type_check='type',type=list,value=data.get('router'))  if data.get('router') else False
        status = data.get('status') if data.get('status') else False
        #bo loc khach hang
        # tam bo qua bo loc khoang cach
        # distance = data.get('distance') if data.get('distance') else False
        order_by = data.get('order_by') if data.get('order_by') else False
        birthday_from = validate_filter(type_check='timestamp',type='start',value=data.get('birthday_from')) if data.get('birthday_from') else False
        birthday_to =validate_filter(type_check='timestamp',type='end',value=data.get('birthday_to'))  if data.get('birthday_to') else False
        customer_group = data.get('customer_group') if data.get('customer_group') else False
        customer_type = data.get('customer_type') if data.get('customer_type') else False
        queryFilters = {"is_deleted": False}
        if router:
            queryFilters['name'] = ["in",router]
        if status: 
            queryFilters['status'] = status
        list_router = frappe.db.get_list('DMS Router',filters=queryFilters, pluck='name')
        list_customer = []
        for router_name in list_router:
            detail_router = frappe.get_doc("DMS Router",router_name)
            list_customer += detail_router.get('customers')
        if order_by: 
            list_customer = sorted(list_customer, key= lambda x: x.customer_name.split(' ')[-1],reverse=True if order_by == 'desc' else False)
        list_customer_name = []
        for customer in list_customer:
            list_customer_name.append(customer.get('customer'))
        FiltersCustomer = {"name": ["in",list_customer_name]}
        if birthday_from and birthday_to:
            # birthday_from = datetime.fromtimestamp(int(birthday_from))
            # birthday_to = datetime.fromtimestamp(int(birthday_to))
            FiltersCustomer["birthday"] =["between",[birthday_from,birthday_to]]
        if customer_group:
            FiltersCustomer['customer_group'] =customer_group
        if customer_type:
            FiltersCustomer['customer_type'] =customer_group
        fields_customer = [
            'name','customer_primary_address'
            ,'customer_code','customer_location_primary','mobile_no'
            ,'customer_name'
            ,'UNIX_TIMESTAMP(custom_birthday) as birthday'
            ]
        if(view_mode == 'list'):
            detail_customer = frappe.db.get_list('Customer',filters= FiltersCustomer,fields=fields_customer,start=page_size*(page_number-1), page_length=page_size)
        else:
            detail_customer = frappe.db.get_list('Customer',filters= FiltersCustomer,fields=fields_customer)        
        for customer in detail_customer:
            customer['is_checkin'] = False
            checkin = frappe.db.get_value("DMS Checkin",{"kh_ma":customer.get('customer_code')})
            if checkin != None:
                customer['is_checkin'] = True
        total_customer= len(frappe.db.get_list('Customer',filters= FiltersCustomer))
        gen_response(200,"", {
            "data": detail_customer,
            "total": total_customer,
            "page_size": page_size,
            "page_number": page_number
        })
    except Exception as e :
        exception_handel(e)

@frappe.whitelist(methods="POST")
def create_router(**body):
    try:
        body = dict(body)
        if body['cmd'] :
            del body['cmd']
        field_validate= ["travel_date","status", "customers", "channel_code", "team_sale","channel_name","employee"]
        field_customers_validate = ["customer_code","customer_name","display_address","phone_number","customer","frequency"]
        # check_validate fields
        for key_router,value in body.items():
            if isinstance(body[key_router], list):
                for customer in body[key_router]:
                    for key_cs in customer:
                        # if key_cs not in field_customers_validate or (key_cs in field_customers_validate and not customer[key_cs]) :
                        if key_cs not in field_customers_validate  :
                            gen_response(406,f"Field {key_cs} not validate",None)
                            return 
            else:
                #  if key_router not in field_validate or ( key_router in field_validate and not body[key_router] ) :
                 if key_router not in field_validate :
                        gen_response(406,f"Field {key_router} not validate",None)
                        return
        body['doctype'] = "DMS Router"
        doc = frappe.get_doc(body)
        doc.save()
        gen_response(201,"",doc)
    except Exception as e:
        exception_handel(e)

@frappe.whitelist(methods="GET")
def get_team_sale():
    try:
        data = frappe.db.get_list("Sales Person",{"is_group":1}, pluck='name')
        gen_response(200,"",data)
    except Exception as e:
        exception_handel(e)

@frappe.whitelist(methods="GET")
def get_customer(**filters):
    try:
        page_size =  int(filters.get('page_size')) if filters.get('page_size') else 20
        page_number = int(filters.get('page_number') )if filters.get('page_number') and int(filters.get('page_number')) <= 0 else 1
        customer_group = filters.get('customer_group') if filters.get('customer_group') else False
        customer_type = filters.get('customer_type') if filters.get('customer_type') else False 
        customer_name = filters.get('customer_name') if filters.get('customer_name') else False 

        city = filters.get('city') if filters.get('city') else False 
        district = filters.get('district') if filters.get('district') else False 
        ward = filters.get('ward') if filters.get('ward') else False 
        queryFilters = {}
        if customer_type:
            queryFilters['customer_type'] = customer_type
        if customer_group:
            queryFilters['customer_group'] = customer_group
        if customer_name:
            queryFilters['customer_name'] = ['like',f"%{customer_name}%"]

        if city or district or ward:
            Address = frappe.qb.DocType("Address")
            DynamicLink = frappe.qb.DocType("Dynamic Link")  
            queryAddress = DynamicLink.link_doctype == "Customer"   
            list_customer = []     
            if city:
                queryAddress = (Address.city == city)
            if district :
                queryAddress = queryAddress & (Address.county == district)
            if ward:
                queryAddress = queryAddress & (Address.address_line2 == ward)
            listCustomer = (frappe.qb.from_(Address)
                            .inner_join(DynamicLink)
                            .on(DynamicLink.parent == Address.name)
                            .where(queryAddress )
                            .select(DynamicLink.link_name)
                            ).run()
            for customers in listCustomer:
                list_customer += customers
            print('list_customer',list_customer)
            queryFilters['name'] = ['in',list_customer]

        data = frappe.db.get_list(
            "Customer",
            queryFilters,
            ["name",'customer_code',"customer_name",'UNIX_TIMESTAMP(custom_birthday) as custom_birthday',
             "location","customer_type","customer_name",
             "customer_primary_address as display_address","mobile_no as phone_number"],
            start=page_size*(page_number-1), 
            page_length=page_size)
        total = len(frappe.db.get_list(
            "Customer",
            queryFilters))
        gen_response(200,"",{
            "data":data,
            "total": total,
            "page_size": page_size,
            "page_number": page_number
        })
    except Exception as e:
        exception_handel(e)


# api test handle filter address
@frappe.whitelist(allow_guest=True)
def test_address(**filters) :
    city = filters.get('city') if filters.get('city') else False 
    district = filters.get('district') if filters.get('district') else False 
    ward = filters.get('ward') if filters.get('ward') else False 
    Address = frappe.qb.DocType("Address")
    DynamicLink = frappe.qb.DocType("Dynamic Link")  
    queryAddress = DynamicLink.link_doctype == "Customer"     
    if city:
        queryAddress = (Address.city == city)
    if district :
        queryAddress = queryAddress & (Address.county == district)
    if ward:
        queryAddress = queryAddress & (Address.address_line2 == ward)
    listCustomer = (frappe.qb.from_(Address)
                    .inner_join(DynamicLink)
                    .on(DynamicLink.parent == Address.name)
                    .where(queryAddress)
                    .select(DynamicLink.link_name)
                    ).run()
    return listCustomer

# get list router by frequency
@frappe.whitelist(methods='GET')
def get_all_router():
    try:
        list_router = frappe.db.get_list('DMS Router',fields=['name','channel_name'])
        gen_response(200,'',list_router)
        return 
    except Exception as e: 
        exception_handel(e)
