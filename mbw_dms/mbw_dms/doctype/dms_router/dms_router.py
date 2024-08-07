# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe import _
import json
from frappe.model.document import Document
from pypika import CustomFunction

from mbw_dms.api.common import exception_handle, gen_response,get_language,get_user_id,get_employee_by_user, time_now_utc,null_location,get_sales_group_child
from frappe.desk.reportview import get_filters_cond, get_match_cond
from erpnext.controllers.queries import get_fields
from mbw_dms.api.validators import validate_filter 
from mbw_dms.config_translate import i18n
from datetime import datetime,timedelta

import pydash
UNIX_TIMESTAMP = CustomFunction('UNIX_TIMESTAMP', ['day'])

class DMSRouter(Document):
	pass

# danh sach tuyen
@frappe.whitelist(methods='GET')
def get_list_router(filters):
    try:
        status = filters.get('status')
        employee = filters.get('employee')
        modified_by = filters.get('modified_by')
        modified = validate_filter(value=filters.get('modified'), type_check="timestamp") if filters.get('modified') else False
        owner = filters.get('owner')
        creation = validate_filter(value=filters.get('creation'), type_check='timestamp') if filters.get('creation') else False
        router = filters.get('router')
        page_size =  int(filters.get('page_size', 20))
        page_number = int(filters.get('page_number') )if filters.get('page_number') and int(filters.get('page_number')) > 0 else 1
        orderby_array = ['modified', "name", "owner", "idx", "channel_code", "channel_name", "employee"]
        order_by = validate_filter(value=filters.get('order_by'),type=orderby_array,type_check='enum') if filters.get('order_by') else False
        sort = validate_filter(value=filters.get('sort'),type=['desc','asc'], type_check="enum") if filters.get('sort') else False
        queryFilters = {"is_deleted": 0}
        if status:
            queryFilters['status'] = status
        if modified_by:
            queryFilters['modified_by'] = modified_by
        if modified:
            start_date = datetime.combine(modified, datetime.min.time())
            end_date = start_date + timedelta(days=1)
            queryFilters['modified'] = ["between", [start_date,end_date]]
        if owner:
            queryFilters['owner'] = owner
        if creation:
            start_date = datetime.combine(creation, datetime.min.time())
            end_date = start_date + timedelta(days=1)
            queryFilters['creation'] = ["between", [start_date,end_date]]
        if router:
            router = router.split(';')
            queryFilters['name'] = ["in", router]
        if employee:
            queryFilters['employee'] = employee
        order_string = 'modified desc'
        if order_by and sort: 
            order_string = f"{order_by} {sort}"
        list_router = frappe.db.get_list('DMS Router',filters=queryFilters,fields=['*', 'UNIX_TIMESTAMP(travel_date) as travel_date','UNIX_TIMESTAMP(creation) as creation','UNIX_TIMESTAMP(modified) as modified', "count(customers) as count_customers"], 
                                       order_by=order_string, 
                                       start=page_size*(page_number-1), page_length=page_size)
        for router in list_router:
            if router['employee']:
                router["employee_name"] = frappe.db.get_value("Employee", {"name": router['employee']}, ["employee_name"])
            list_customers = frappe.get_doc('DMS Router', router["name"]).customers
            router["count_customer"] = len(list_customers)
        total = len(frappe.db.get_list('DMS Router',filters=queryFilters))
        return gen_response(200,'',{
            "data": list_router,
            "total": total,
            "page_size": page_size,
            "page_number":page_number
        })
    except Exception as e: 
        exception_handle(e)


# chi tiet tuyen
@frappe.whitelist(methods='GET')
def get_router(id):
    try:
        name = validate_filter(type_check='require',value=id)
        return gen_response(200,'',frappe.get_doc('DMS Router',{"is_deleted": 0,"name": name}))
    except Exception as e: 
        exception_handle(e)

# danh sach khach hang cham soc
@frappe.whitelist(methods="GET")
def get_customer_router(data):
    try:     
        from pypika import Order
        user= get_user_id()
        # Cấu hình ngoại tuyến từ dms setting
        search_key = data.get("search_key")
        view_mode = validate_filter(value=data.get('view_mode'), type=['list','map'], type_check='enum') if data.get('view_mode') else 'list'

        # Phân trang
        page_size =  int(data.get('page_size', 20))
        page_number = int(data.get('page_number') ) if data.get('page_number') and int(data.get('page_number')) > 0 else 1

        # Bộ lọc tuyến
        router_filter = validate_filter(type_check='type', type=str, value=data.get('router')).split(";") if data.get('router') else False

        # Bộ lọc khách hàng
        order_by = data.get('order_by')
        birthday_from = validate_filter(type_check='timestamp', type='start', value=data.get('birthday_from')) if data.get('birthday_from') else False
        birthday_to = validate_filter(type_check='timestamp', type='end', value=data.get('birthday_to')) if data.get('birthday_to') else False
        customer_group = data.get('customer_group')
        customer_type = data.get('customer_type')
        ## trang thái viếng thăm
        checkin_status = validate_filter(type_check="enum",type=("all","is_checkin","not_checkin"),value=data.get("checkin_status") or "all",) 

        # Chỉ lấy những tuyến đang hoạt động
        queryFilters = {"is_deleted": 0, "status": "Active"}

        # Nếu là admin thì lấy tất cả tuyến hoạt động, nếu là nhân viên chỉ lấy nhân viên chăm sốc tuyến đấy
        user_id = get_user_id()
        if user_id.name != "Administrator":
            employee = get_employee_by_user(user = user_id.email)
            if not employee:
                return gen_response("404", _("Employee not registered"))
            queryFilters['employee'] = employee.name
        # Thêm bộ lọc tuyến
        if router_filter:
            queryFilters['channel_code'] = ["in", router_filter]
        # Lấy thứ hôm nay và tuần này
        from mbw_dms.api.common import weekday
        today= time_now_utc()
        thu_trong_tuan, tuan_trong_thang = weekday(today)

        # Dịch vụ lấy khách hàng hiển thị cho map: chỉu tuyến hôm nay và tuần này
        if view_mode == "map":
            queryFilters.update({"travel_date": ["in", ["Không giới hạn", thu_trong_tuan]]})
            queryFilters.update({"frequency": ["like", f"%{int(tuan_trong_thang)}%"]})  
         
        # Lấy danh sách tuyến theo bộ lọc tuyến
        list_routers = frappe.db.get_all('DMS Router', filters=queryFilters, fields=["channel_code", "name", "travel_date"], distinct=True)
        list_customer = []
        list_customer_in_route= []
        router_today = ""
        for router in list_routers:
            router_name = router.name
            detail_router = frappe.get_doc("DMS Router", {"name":router_name}).as_dict()
            customers = detail_router.get('customers')

            # Danh sách id khách hàng đúng tuyến
            if (router.travel_date == thu_trong_tuan or router.travel_date == "Không giới hạn"):
                if router.travel_date == thu_trong_tuan:
                    router_today = router.channel_code
                customer_in_router = pydash.filter_(customers, lambda value: (value.frequency.find(str(int(tuan_trong_thang))) != -1))    
                customer_in_router_name = pydash.map_(customer_in_router, lambda x:x.customer_code)
                list_customer_in_route += customer_in_router_name

            # Danh sách khách hàng hiển thị trên map
            if view_mode == "map":
                customers = pydash.filter_(customers, lambda value: (value.frequency.find(str(int(tuan_trong_thang))) != -1) and (detail_router.get("travel_date") == thu_trong_tuan or detail_router.get("travel_date") == "Không giới hạn") )          
            list_customer += customers

        # Chuyển mả,ng danh sách khách hàng về id
        list_customer_name = []
        for customer in list_customer:
            list_customer_name.append(customer.get('customer_code'))

        # Nếu truyền lên tuyến hôm nay thì chỉ trả về đúng tuyến
        if router_filter and router_today != "" and router_today == router_filter[0]:
            list_customer_name = list_customer_in_route

        # lấy ra ds khách hàng đã checkin        
        start_time,end_time=validate_filter(type_check="in_date",value=datetime.now().timestamp())
        list_checkin = frappe.db.get_all("DMS Checkin",{"kh_ma": ["in",list_customer_name],"creation": ["between",[start_time,end_time]], "createdbyemail":user.get("email")},["is_checkout","kh_ma"]) 
        list_checkin_code = pydash.map_(list_checkin,lambda x:x.kh_ma)
        if checkin_status == "is_checkin":
            list_customer_name = list_checkin_code
        elif checkin_status == "not_checkin":
            list_customer_name = pydash.filter_(list_customer_name,lambda x: x not in list_checkin_code)

        
        FiltersCustomer = {"customer_code": ["in", list_customer_name]}
        FiltersCustomer["disabled"] = 0

        if birthday_from and birthday_to:
            FiltersCustomer["birthday"] =["between",[birthday_from,birthday_to]]
        if customer_group:
            FiltersCustomer['customer_group'] =customer_group
        if customer_type:
            FiltersCustomer['customer_type'] =customer_type
        if search_key:
            FiltersCustomer['customer_name'] =["like",f"%{search_key}%"]

        fields_customer = [
            'name','customer_primary_address'
            ,'customer_code','customer_location_primary','mobile_no'
            ,'customer_name',"custom_birthday",
            "customer_type","customer_group"
            # ,'UNIX_TIMESTAMP(custom_birthday) as birthday'
            ]
        # filter sql
        from pypika import (Order,Query,Table)
        CustomerDoc = frappe.qb.DocType("Customer")
        def CustomerField(name):
            return CustomerDoc[name]
        FilterSQLCustomer = CustomerDoc.disabled.eq(0)
        if len(list_customer_name) >0:
            FilterSQLCustomer = CustomerDoc.customer_code.isin(list_customer_name) & FilterSQLCustomer
        if birthday_from and birthday_to:
            FilterSQLCustomer = FilterSQLCustomer & CustomerField("birthday").between(birthday_from,birthday_to)
        if customer_group:
            FilterSQLCustomer = FilterSQLCustomer & CustomerField("customer_group").eq(customer_group)
        if customer_type:
            FilterSQLCustomer = FilterSQLCustomer & CustomerField("customer_type").eq(customer_type)
        if search_key:
            FilterSQLCustomer = FilterSQLCustomer & CustomerField("customer_name").like(f"%{search_key}%")

        if(view_mode == 'list'):
            # detail_customer = frappe.db.get_all('Customer',
            #                                     filters= FiltersCustomer,
            #                                     fields=fields_customer, 
            #                                    order_by=sort,
            #                                    start=page_size*(page_number-1), 
            #                                    page_length=page_size,
            #                                    distinct=True,
            #                                    )
            # v2
            from pypika import CustomFunction
            UNIX_TIMESTAMP = CustomFunction('UNIX_TIMESTAMP', ['day'])
            detail_customer =( (frappe.qb.from_(CustomerDoc)
                               .select(*fields_customer,UNIX_TIMESTAMP(CustomerDoc.custom_birthday).as_("birthday") )
                               .where(FilterSQLCustomer)
                               .orderby("customer_name",order = frappe.qb.terms.Order.asc if order_by == "asc" else frappe.qb.terms.Order.desc)
                               .limit(page_size)
                               .offset(page_size*(page_number-1))
                               .distinct())
                                .run(as_dict=1)
                                ) if len(list_customer_name) >0 else []
        else:
            fields_customer= [
            'name'
            ,'customer_code','customer_location_primary',
            "customer_primary_address"
            ]
            FiltersCustomer.update({"customer_location_primary": ["is", "set"]})
            detail_customer = frappe.db.get_all('Customer',filters= FiltersCustomer,fields=fields_customer)    

        for customer in detail_customer:
            address_name = customer["customer_primary_address"]
            customer["customer_primary_address"]=frappe.db.get_value("Address",{"name": address_name},["address_title","address_line1","city","county","state"],as_dict=1)
            customer['is_checkin'] = False
            # start_time,end_time=validate_filter(type_check="in_date",value=datetime.now().timestamp())
            # checkin = frappe.db.get_value("DMS Checkin",{"kh_ma":customer.get('customer_code'),"creation": ["between",[start_time,end_time]]},["is_checkout"],as_dict=1)
            
            customer['is_checkin'] = customer["customer_code"] in list_checkin_code
            customer["is_route"] = False
            if customer.customer_code in list_customer_in_route:
                customer["is_route"] = True
        
        total_customer= len( frappe.db.get_all('Customer',filters= FiltersCustomer))
        for customer in detail_customer:
            customer.customer_location_primary = null_location(customer.customer_location_primary)

        return gen_response(200, "", {
            "data": detail_customer,
            "total": total_customer,
            "page_size": page_size,
            "page_number": page_number
        })
    except Exception as e :
        exception_handle(e)


def get_customers_import(data):
    try:
        list_customer_codes = data.get("customer_codes",[])
        if len(list_customer_codes) == 0: 
            return gen_response(500,i18n.t('translate.error', locale=get_language()) , []) 
        FiltersCustomer = {"customer_code": ["in",list_customer_codes]}
        fields_customer = [
            'name','customer_primary_address'
            ,'customer_code','customer_location_primary','mobile_no'
            ,'customer_name'
            ,'UNIX_TIMESTAMP(custom_birthday) as birthday'
            ]
        message= ""
        list_customer = frappe.db.get_list('Customer',filters= FiltersCustomer,fields=fields_customer) 
        list_codes = pydash.map_(list_customer,lambda x: x.customer_code)

        list_codes_not_in = pydash.filter_(list_customer_codes,lambda x: x not in list_codes )
        list_codes_not_in = ",".join(list_codes_not_in)
        status  =200     
        if len(list_customer_codes) != len(list_customer): 
            message =  _("Error: Some customer not found: ")+list_codes_not_in
            status = 500
        return gen_response(status,message, list_customer)
    except Exception as e :
        exception_handle(e)
#them tuyen
@frappe.whitelist(methods="POST")
def create_router(body):
    try:
        body = dict(body)
        if body['cmd'] :
            del body['cmd']
        is_has_travel_date = frappe.db.get_value("DMS Router",filters={
        "employee": body.get('employee'),
        "travel_date":body.get('travel_date'),
        "status": "Active",
        "is_deleted": 0
        })

        if body.get("travel_date") == "Không giới hạn":
            is_has_travel_date = False
        if is_has_travel_date:
            return gen_response(500,body.get('employee')+  _(" have Router in this weekday"))
        field_validate= ["travel_date","status", "customers", "channel_code", "team_sale", "channel_name", "employee"]
        field_customers_validate = ["customer_code", "customer_name", "display_address", "phone_number", "customer", "frequency", "lat", "long"]
        field_customers_validate_require = ["customer_code", "customer_name", "frequency"]

        # check_validate fields
        for key_router,value in body.items():
            if isinstance(body[key_router], list):
                for customer in body[key_router]:
                    customer_name = customer["customer_name"]
                    for key_cs in customer:
                        if key_cs not in field_customers_validate :
                            gen_response(406,f"Field {key_cs} not validate",None)
                            return 
                        if key_cs in field_customers_validate_require and not customer[key_cs]:
                            return gen_response(406,f"{customer_name}: Field {key_cs} not found",None)
            else:
                 if key_router not in field_validate :
                        gen_response(406,f"Field {key_router} not validate",None)
                        return
        body['doctype'] = "DMS Router"
        doc = frappe.get_doc(body)
        doc.save()
        return gen_response(201,"",doc)
    except Exception as e:
        exception_handle(e)

# cap nhat tuyen
def update_router(body):
    try:
        body = dict(body)
        name = validate_filter(type_check='require',value=body.get('name'))
        is_has_travel_date = frappe.db.get_value("DMS Router",{
            "employee": body.get('employee'),
            "travel_date":body.get('travel_date'),
            "status": "Active",
            "name": ["!=",name],
            "is_deleted": 0
        },
        ["travel_date"]
        )
        if body.get("travel_date") == "Không giới hạn":
            is_has_travel_date = False
        if is_has_travel_date:
            return gen_response(500,body.get('employee')+  _(" have Router in this weekday"))
        if body['cmd'] :
            del body['cmd']
        field_validate= ["name", "travel_date", "status", "customers", "channel_code", "team_sale", "channel_name", "employee"]
        field_customers_validate = ["customer_code", "customer_name", "display_address", "phone_number", "customer", "frequency", "lat", "long"]
        field_customers_validate_require = ["customer_code", "customer_name", "frequency"]
        # check_validate fields
        for key_router,value in body.items():
            if isinstance(body[key_router], list):
                for customer in body[key_router]:
                    customer_name = customer["customer_name"]

                    for key_cs in customer:
                        if key_cs not in field_customers_validate :
                            return gen_response(406,f"Field {key_cs} not validate",None)
                        if  key_cs in field_customers_validate_require and not customer[key_cs]:
                            return gen_response(406,f"{customer_name}: Field {key_cs} not found",None)
            else:
                 if key_router not in field_validate :
                        return gen_response(406,f"Field {key_router} not validate",None)
        # body['doctype'] = "DMS Router"
        doc = frappe.get_doc("DMS Router",name)
        for item,value in body.items():
            if(item == 'customers'):
                doc.set("customers", value)
            else :
                doc.set(item, value)
        doc.save(ignore_version=True)
        frappe.db.commit()
        return gen_response(201,"",doc)
    except Exception as e:
        exception_handle(e)

# cap nhat multi router
def update_routers(body):
    try:
        body = dict(body)
        name = validate_filter(type_check='require',value=body.get('name'))
        status = body.get("status")
        is_deleted = body.get("is_deleted")
        if not status and not is_deleted or ( status and is_deleted):
            return gen_response(406,"Choose action",[])
        if status :
            field_name = "status"
            value = f"'{status}'"
        elif is_deleted:
            field_name = "is_deleted"
            value = 1
        
        if not field_name or not value:
            return gen_response(406,"Choose action",[])
        if body['cmd'] :
            del body['cmd']

        if len(name) ==1 :
            frappe.db.set_value('DMS Router', name[0], {
                field_name: value,
            })
        else :
            name_arr = tuple(name)
            frappe.db.sql(f"""
                    UPDATE `tabDMS Router`
                    SET {field_name} = {value}
                    WHERE name IN {name_arr} ;        
                    """)
        
        frappe.db.commit()

        update = frappe.db.get_list('DMS Router',
                                    filters={"name": ["in", name]},
                                    fields=['*', 'UNIX_TIMESTAMP(travel_date) as travel_date',
                                            'UNIX_TIMESTAMP(creation) as creation','UNIX_TIMESTAMP(modified) as modified'])
        return gen_response(200, "", update)
    except Exception as e:
        exception_handle(e)

# nhom ban hang
@frappe.whitelist(methods="GET")
def get_team_sale():
    try:
        data = frappe.db.get_list("Sales Person",{"is_group":1},["name", "parent_sales_person"])
        gen_response(200,"",data)
    except Exception as e:
        exception_handle(e)

# lấy nhân viên theo teamsale
@frappe.whitelist(methods="GET")
def get_sale_person(data):
    try:
        from frappe.desk.reportview import (compress,execute)

        filters =  [['Sales Person', 'is_group', '=', 0]]
        team_sale = data.get('team_sale')
        key_search = data.get('key_search')
        if team_sale:
            filters.append(['Sales Person', 'parent_sales_person', '=', team_sale])
        if key_search:
            employees = frappe.db.get_list("Employee", filters={"employee_name": ["like", f"%{key_search}%"]},pluck ="name")
            if len(employees) > 0 :
                filters.append(['Sales Person', 'employee', 'in', employees])
        args = {'doctype': 'Sales Person'
                , 'fields': ['`tabSales Person`.`employee`','`tabSales Person`.`name`']
                , 'filters':filters
                , 'order_by': '`tabSales Person`.`modified` ASC'
                , 'start': '0'
                , 'page_length': '20'
                , 'group_by': '`tabSales Person`.`name`'
                , 'with_comment_count': 1
                , 'save_user_settings': True
                , 'strict': None}
        data = compress(execute(**args), args=args)
        employees = []
        if bool(data):
            for sales in data["values"] :
                if sales[0] :
                    employee = frappe.db.get_value("Employee",sales[0],['employee_name'])
                    employees.append({
                        "employee_code":sales[0],
                        "employee_name": employee 
                    })
        return employees
    except Exception as e:
        exception_handle(e)



# lấy nhân viên theo teamsale gồm cả quản lý
@frappe.whitelist(methods="GET")
def get_sale_person_v2(data) :
    team_sale = data.get('team_sale',"Sales Team")
    key_search = data.get('key_search')
    query = ""
    if key_search:
        employees = frappe.db.get_list("Employee", filters={"employee_name": ["like", f"%{key_search}%"]},pluck ="name")
        if len(employees) > 0 :
            
            employee_in = "','".join(employees)
            query = f"WHERE employee in ('{employee_in}')"
        else :
            return gen_response(200,"",[])
    sale =  get_sales_group_child(sale_person=team_sale,is_group=0,query=query)
    sale = pydash.filter_(sale ,lambda x: x.employee)
    sale = pydash.map_(sale, lambda x: {"employee_code":x.employee,"employee_name": x.employee_name,"sale_name": x.sales_person_name})
    return sale


# danh sách customer cho web
@frappe.whitelist(methods="GET")
def get_customer(filters):
    try:
        page_size =  int(filters.get('page_size', 20))
        page_number = int(filters.get('page_number')) if filters.get('page_number') and int(filters.get('page_number')) > 0 else 1
        customer_group = filters.get('customer_group')
        customer_type = filters.get('customer_type')
        customer_name = filters.get('customer_name')
        search_key = filters.get("search_key")
        teamSale = filters.get('teamSale')
        queryFilters = {}
        queryFilters2 = {}
        queryFilters["disabled"] = 0
        # queryFilters2["disabled"] = 0
        if not teamSale:
            return gen_response(500,_("Sale manager is invalid"),{})
        else:
            from mbw_dms.api.common import get_sales_group_child_v2
            list_sales = get_sales_group_child_v2(sale_person= teamSale)
            name_sale = pydash.map_(list_sales,lambda x:x.name)
            queryFilters["custom_sales_manager"] = ["in", name_sale]
            # queryFilters["custom_sales_manager"] =teamSale
            # queryFilters2["custom_sales_manager"] = teamSale
        city = filters.get('city')
        district = filters.get('district')
        ward = filters.get('ward')
        if customer_type:
            queryFilters['customer_type'] = customer_type
            # queryFilters2['customer_type'] = customer_type
        if customer_group:
            queryFilters['customer_group'] = customer_group
            # queryFilters2['customer_group'] = customer_group
        if customer_name:
            queryFilters['customer_name'] = ['like',f"%{customer_name}%"]
            # queryFilters2['customer_name'] = ['like',f"%{customer_name}%"]
        if search_key :
            queryFilters2['customer_name'] = ['like',f"%{search_key}%"]
            queryFilters2['customer_code'] = ['like',f"%{search_key}%"]
        

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
            queryFilters['name'] = ['in',list_customer]
        print(queryFilters,"-",queryFilters2)
        data = frappe.db.get_list(
            doctype = "Customer",
            filters = queryFilters,
            or_filters = queryFilters2,
            fields = ["name",'customer_code',"customer_name",'UNIX_TIMESTAMP(custom_birthday) as custom_birthday',
             "customer_location_primary", "customer_type", "customer_name",
             "customer_primary_address as display_address", "mobile_no as phone_number"],
            start=page_size*(page_number-1), 
            page_length=page_size)
        
        for customer in data:
            customer["long"] = False
            customer["lat"] = False
            if customer['customer_location_primary'] :
                customer["long"] = json.loads(customer['customer_location_primary'] ).get('long')
                customer["lat"] =json.loads(customer['customer_location_primary'] ).get('lat')

        total = len(frappe.db.get_list(
            doctype = "Customer",
            filters = queryFilters,
            or_filters = queryFilters2,))
        return gen_response(200,"",{
            "data":data,
            "total": total,
            "page_size": page_size,
            "page_number": page_number
        })
    except Exception as e:
        exception_handle(e)


# api test handle filter address
@frappe.whitelist(allow_guest=True)
def test_address(filters):
    city = filters.get('city')
    district = filters.get('district')
    ward = filters.get('ward')
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
        from mbw_dms.api.common import weekday
        thu_trong_tuan, week = weekday(datetime.now())
        filter  = {
            "frequency": ["like", f"%{int(week)}%"],
            "is_deleted":0,
            "status":"Active"
        }
        user_id = get_user_id()
        if user_id.name != "Administrator":
            employee = get_employee_by_user(user = user_id.email)
            if not employee:
                return gen_response("404", _("Employee not registered"))
            filter['employee'] = employee.name

        list_router = frappe.db.get_all('DMS Router',filters=filter,fields=['name','channel_name',"channel_code","travel_date"],distinct=True)
        for value in list_router:
            value["is_today"] = False

            if value["travel_date"] == thu_trong_tuan:
                value["is_today"] = True

        return gen_response(200,'',list_router)
    except Exception as e: 
        exception_handle(e)

# Router query
@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def router_query(doctype, txt, searchfield, start, page_len, filters):
	doctype = "DMS Router"
	conditions = []
	fields = get_fields(doctype, ["name", "channel_name","channel_code"])

	return frappe.db.sql(
		"""select {fields} from `tabDMS Router`
		where status in ('Active', 'Suspended')
			and docstatus < 2
			and ({key} like %(txt)s
				or channel_name like %(txt)s)
			{fcond} {mcond}
		order by
			(case when locate(%(_txt)s, name) > 0 then locate(%(_txt)s, name) else 99999 end),
			(case when locate(%(_txt)s, channel_name) > 0 then locate(%(_txt)s, channel_name) else 99999 end),
			idx desc,
			name, channel_name,channel_code
		limit %(page_len)s offset %(start)s""".format(
			**{
				"fields": ", ".join(fields),
				"key": searchfield,
				"fcond": get_filters_cond(doctype, filters, conditions),
				"mcond": get_match_cond(doctype),
			}
		),
		{"txt": "%%%s%%" % txt, "_txt": txt.replace("%", ""), "start": start, "page_len": page_len},
	)



# danh sach khach hang cham soc
@frappe.whitelist(methods="GET")
def get_customer_router_v2(data):
    try:     
        # print("=======================data::::",data)
        from pypika import Order
        user= get_user_id()
        # Cấu hình ngoại tuyến từ dms setting
        search_key = data.get("search_key")
        view_mode = validate_filter(value=data.get('view_mode'), type=['list','map'], type_check='enum') if data.get('view_mode') else 'list'

        # Phân trang
        page_size =  int(data.get('page_size', 20))
        page_number = int(data.get('page_number') ) if data.get('page_number') and int(data.get('page_number')) > 0 else 1

        # Bộ lọc tuyến
        router_filter = validate_filter(type_check='type', type=str, value=data.get('router')).split(";") if data.get('router') else False

        # Bộ lọc khách hàng
        order_by = data.get('order_by')
        birthday_from = validate_filter(type_check='timestamp', type='start', value=data.get('birthday_from')) if data.get('birthday_from') else False
        birthday_to = validate_filter(type_check='timestamp', type='end', value=data.get('birthday_to')) if data.get('birthday_to') else False
        customer_group = data.get('customer_group')
        customer_type = data.get('customer_type')
        lat=data.get("lat")
        long=data.get("long")
        ## trang thái viếng thăm
        checkin_status = validate_filter(type_check="enum",type=("all","is_checkin","not_checkin"),value=data.get("checkin_status") or "all",) 

        # Chỉ lấy những tuyến đang hoạt động
        queryFilters = {"is_deleted": 0, "status": "Active"}

        # Nếu là admin thì lấy tất cả tuyến hoạt động, nếu là nhân viên chỉ lấy nhân viên chăm sốc tuyến đấy
        user_id = get_user_id()
        if user_id.name != "Administrator":
            employee = get_employee_by_user(user = user_id.email)
            if not employee:
                return gen_response("404", _("Employee not registered"))
            queryFilters['employee'] = employee.name
        # Thêm bộ lọc tuyến
        if router_filter:
            queryFilters['channel_code'] = ["in", router_filter]
        # Lấy thứ hôm nay và tuần này
        from mbw_dms.api.common import weekday
        today= time_now_utc()
        thu_trong_tuan, tuan_trong_thang = weekday(today)

        # Dịch vụ lấy khách hàng hiển thị cho map: chỉu tuyến hôm nay và tuần này
        if view_mode == "map":
            queryFilters.update({"travel_date": ["in", ["Không giới hạn", thu_trong_tuan]]})
            queryFilters.update({"frequency": ["like", f"%{int(tuan_trong_thang)}%"]})  
         
        # Lấy danh sách tuyến theo bộ lọc tuyến
        list_routers = frappe.db.get_all('DMS Router', filters=queryFilters, fields=["channel_code", "name", "travel_date"], distinct=True)
        list_customer = []
        list_customer_in_route= []
        router_today = ""
        for router in list_routers:
            router_name = router.name
            detail_router = frappe.get_doc("DMS Router", {"name":router_name}).as_dict()
            customers = detail_router.get('customers')

            # Danh sách id khách hàng đúng tuyến
            if (router.travel_date == thu_trong_tuan or router.travel_date == "Không giới hạn"):
                if router.travel_date == thu_trong_tuan:
                    router_today = router.channel_code
                customer_in_router = pydash.filter_(customers, lambda value: (value.frequency.find(str(int(tuan_trong_thang))) != -1))    
                customer_in_router_name = pydash.map_(customer_in_router, lambda x:x.customer_code)
                list_customer_in_route += customer_in_router_name

            # Danh sách khách hàng hiển thị trên map
            if view_mode == "map":
                customers = pydash.filter_(customers, lambda value: (value.frequency.find(str(int(tuan_trong_thang))) != -1) and (detail_router.get("travel_date") == thu_trong_tuan or detail_router.get("travel_date") == "Không giới hạn") )          
            list_customer += customers

        # Chuyển mả,ng danh sách khách hàng về id
        list_customer_name = []
        for customer in list_customer:
            list_customer_name.append(customer.get('customer_code'))

        # Nếu truyền lên tuyến hôm nay thì chỉ trả về đúng tuyến
        if router_filter and router_today != "" and router_today == router_filter[0]:
            list_customer_name = list_customer_in_route

        # lấy ra ds khách hàng đã checkin        
        start_time,end_time=validate_filter(type_check="in_date",value=datetime.now().timestamp())
        list_checkin = frappe.db.get_all("DMS Checkin",{"kh_ma": ["in",list_customer_name],"creation": ["between",[start_time,end_time]], "createdbyemail":user.get("email")},["is_checkout","kh_ma"],distinct=True) 
        list_checkin_code = pydash.map_(list_checkin,lambda x:x.kh_ma)
        if checkin_status == "is_checkin":
            list_customer_name = list_checkin_code
        elif checkin_status == "not_checkin":
            list_customer_name = pydash.filter_(list_customer_name,lambda x: x not in list_checkin_code)

        #filter length
        FiltersCustomer = {"customer_code": ["in", list_customer_name]}
        FiltersCustomer["disabled"] = 0

        if birthday_from and birthday_to:
            FiltersCustomer["birthday"] =["between",[birthday_from,birthday_to]]
        if customer_group:
            FiltersCustomer['customer_group'] =customer_group
        if customer_type:
            FiltersCustomer['customer_type'] =customer_type
        if search_key:
            FiltersCustomer['customer_name'] =["like",f"%{search_key}%"]
        # filter query
        filters = "WHERE disabled = 0"
        if list_customer_name:
            customer_names = ", ".join(f"'{name}'" for name in list_customer_name)
            filters += f" AND customer_code IN ({customer_names})"
        if birthday_from and birthday_to:
            filters += f" AND birthday BETWEEN '{birthday_from}' AND '{birthday_to}'"
        
        if customer_group:
            filters += f" AND customer_group = '{customer_group}'"
        
        if customer_type:
            filters += f" AND customer_type = '{customer_type}'"
        
        if search_key:
            filters += f" AND customer_name LIKE '%{search_key}%'"
        field_order = data.get("field_order")
        order_by_field = "customer_name" 
        if field_order == 'distance'  and long and lat :
            order_by_field = "distance" 
        order_direction = "ASC" if order_by == "asc" else "DESC"
        query = f"""
            SELECT name, customer_primary_address, customer_code, customer_location_primary, mobile_no,
                customer_name, custom_birthday, customer_type, customer_group,
                UNIX_TIMESTAMP(custom_birthday) as birthday
            FROM `tabCustomer`
            {filters}
            ORDER BY {order_by_field} {order_direction}
            LIMIT {page_size} OFFSET {page_size * (page_number - 1)}
            """
        if long and lat :
            query = f"""
            SELECT name, customer_primary_address, customer_code, customer_location_primary, mobile_no,
                customer_name, custom_birthday, customer_type, customer_group,
                UNIX_TIMESTAMP(custom_birthday) as birthday,
                (6371000 * 2 * ASIN(SQRT(POWER(SIN(RADIANS({lat} - CAST(JSON_UNQUOTE(JSON_EXTRACT(customer_location_primary, '$.lat')) AS DECIMAL(9,6))) / 2), 2) + 
                COS(RADIANS({lat})) * COS(RADIANS(CAST(JSON_UNQUOTE(JSON_EXTRACT(customer_location_primary, '$.lat')) AS DECIMAL(9,6)))) * 
                POWER(SIN(RADIANS({long} - CAST(JSON_UNQUOTE(JSON_EXTRACT(customer_location_primary, '$.long')) AS DECIMAL(9,6))) / 2), 2)))) AS distance
            FROM `tabCustomer`
            {filters}
            ORDER BY {order_by_field} {order_direction}
            LIMIT {page_size} OFFSET {page_size * (page_number - 1)}
            """
        
        if(view_mode == 'list'):           

    # Thực thi truy vấn
            detail_customer = frappe.db.sql(query, as_dict=True) if len(list_customer_name) > 0 else []
            # print("len=========================",len(detail_customer))
        else:
            fields_customer= [
            'name'
            ,'customer_code','customer_location_primary',
            "customer_primary_address"
            ]
            FiltersCustomer.update({"customer_location_primary": ["is", "set"]})
            detail_customer = frappe.db.get_all('Customer',filters= filters,fields=fields_customer)    

        for customer in detail_customer:
            address_name = customer["customer_primary_address"]
            customer["customer_primary_address"]=frappe.db.get_value("Address",{"name": address_name},["address_title","address_line1","city","county","state"],as_dict=1)
            customer['is_checkin'] = False
            # start_time,end_time=validate_filter(type_check="in_date",value=datetime.now().timestamp())
            # checkin = frappe.db.get_value("DMS Checkin",{"kh_ma":customer.get('customer_code'),"creation": ["between",[start_time,end_time]]},["is_checkout"],as_dict=1)
            
            customer['is_checkin'] = customer["customer_code"] in list_checkin_code
            customer["is_route"] = False
            if customer.customer_code in list_customer_in_route:
                customer["is_route"] = True
        
        total_customer= len( frappe.db.get_all('Customer',filters= FiltersCustomer)) if len(list_customer_name) > 0 else 0
        for customer in detail_customer:
            customer.customer_location_primary = null_location(customer.customer_location_primary)
        
        return gen_response(200, _("Vị trí của bạn không xác định") if field_order =="distance" and long and lat else "", {
            "data": detail_customer,
            "total_checkin": len(list_checkin_code),
            "total": total_customer,
            "page_size": page_size,
            "page_number": page_number
        })
    except Exception as e :
        exception_handle(e)

