# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
import json
from frappe.model.document import Document
from pypika import CustomFunction

from mbw_dms.api.common import exception_handel, gen_response,get_language
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
        orderby_array = ['modified',"name","owner","idx", "channel_code","channel_name", "employee"]
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
            queryFilters['modified'] = ["between",[start_date,end_date]]
        if owner:
            queryFilters['owner'] = owner
        if creation:
            start_date = datetime.combine(creation, datetime.min.time())
            end_date = start_date + timedelta(days=1)
            queryFilters['creation'] = ["between",[start_date,end_date]]
        if router:
            router = router.split(';')
            queryFilters['name'] = ["in",router]
        if employee:
            queryFilters['employee'] = employee
        order_string = 'modified desc'
        if order_by and sort:
            order_string = f"{order_by} {sort}"
        print("queryFilters",queryFilters)
        list_router = frappe.db.get_list('DMS Router',filters=queryFilters,fields=['*', 'UNIX_TIMESTAMP(travel_date) as travel_date','UNIX_TIMESTAMP(creation) as creation','UNIX_TIMESTAMP(modified) as modified'], 
                                       order_by=order_string, 
                                       start=page_size*(page_number-1), page_length=page_size)
        
        total = len(frappe.db.get_list('DMS Router',filters=queryFilters))
        return gen_response(200,'',{
            "data": list_router,
            "total": total,
            "page_size": page_size,
            "page_number":page_number
        })
    except Exception as e: 
        exception_handel(e)


# chi tiet tuyen
@frappe.whitelist(methods='GET')
def get_router(id):
    try:
        name = validate_filter(type_check='require',value=id)
        
        queryFilters = {"is_deleted": 0,"name": name}
        
        routers = frappe.db.get_list(doctype='DMS Router',filters=queryFilters,fields=['*','customers'])
        router = None
        if len(routers) > 0 :
            Router = frappe.qb.DocType("DMS Router")
            RouterCustomer = frappe.qb.DocType("DMS Router Customer")
            customer = (frappe.qb.from_(Router)
                      .inner_join(RouterCustomer)
                      .on(Router.name == RouterCustomer.parent)
                      .where(Router.name == name)
                      .select(RouterCustomer.customer,RouterCustomer.customer_code,RouterCustomer.customer_name,RouterCustomer.display_address,
                              RouterCustomer.phone_number,RouterCustomer.frequency,RouterCustomer.long,RouterCustomer.lat
                              )                        
                      ).run(as_dict = 1)
            router = routers[0]
            router['customers'] = customer
        return gen_response(200,'',router)
    except Exception as e: 
        exception_handel(e)

# danh sach khach hang cham soc
@frappe.whitelist(methods="GET")
def get_customer_router(data):
    try:
        view_mode = validate_filter(value=data.get('view_mode'),type=['list','map'],type_check='enum') if data.get('view_mode') else 'list'
        # phan trang
        page_size =  int(data.get('page_size', 20))
        page_number = int(data.get('page_number') )if data.get('page_number') and int(data.get('page_number')) > 0 else 1
        #bo loc tuyen
        router = validate_filter(type_check='type',type=str,value=data.get('router')).split(";")  if data.get('router') else False
        status = data.get('status')
        #bo loc khach hang
        # tam bo qua bo loc khoang cach
        # distance = data.get('distance') if data.get('distance') else False
        order_by = data.get('order_by')
        birthday_from = validate_filter(type_check='timestamp',type='start',value=data.get('birthday_from')) if data.get('birthday_from') else False
        birthday_to =validate_filter(type_check='timestamp',type='end',value=data.get('birthday_to'))  if data.get('birthday_to') else False
        customer_group = data.get('customer_group')
        customer_type = data.get('customer_type')
        queryFilters = {"is_deleted": False}
        if router:
            queryFilters['channel_code'] = ["in",router]
        if status: 
            queryFilters['status'] = status
        #lay danh sach theo ngay
        from mbw_dms.api.common import weekday
        today= datetime.now()
        thu_trong_tuan, tuan_trong_thang = weekday(today)
        if view_mode == "map":
            queryFilters.update({"travel_date": ["between",["Không giới hạn",thu_trong_tuan]]})
            queryFilters.update({"frequency": ["like",tuan_trong_thang]})    
        list_router = frappe.db.get_list('DMS Router',filters=queryFilters, pluck='name',distinct=True)
        list_customer = []
        for router_name in list_router:
            detail_router = frappe.get_doc("DMS Router",{"name":router_name})
            customer = detail_router.get('customers')
            if view_mode == "map":
                customer = pydash.filter_(detail_router.get('customers'),lambda value: value.frequency.find(str(tuan_trong_thang)))
            list_customer += customer
        if order_by: 
            list_customer = sorted(list_customer, key= lambda x: x.customer_name.split(' ')[-1],reverse=True if order_by == 'desc' else False)
        list_customer_name = []
        for customer in list_customer:
            list_customer_name.append(customer.get('customer_code'))
        FiltersCustomer = {"customer_code": ["in",list_customer_name]}
        if birthday_from and birthday_to:
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
            fields_customer= [
            'name'
            ,'customer_code','customer_location_primary',
            "customer_primary_address"
            ]
            FiltersCustomer.update({"customer_location_primary": ["is", "set"]})
              
            detail_customer = frappe.db.get_list('Customer',filters= FiltersCustomer,fields=fields_customer)    
        for customer in detail_customer:
            customer['is_checkin'] = False
            checkin = frappe.db.get_value("DMS Checkin",{"kh_ma":customer.get('customer_code')})
            if checkin != None:
                customer['is_checkin'] = True
        total_customer= len(frappe.db.get_list('Customer',filters= FiltersCustomer))
        return gen_response(200,"", {
            "data": detail_customer,
            "total": total_customer,
            "page_size": page_size,
            "page_number": page_number
        })
    except Exception as e :
        exception_handel(e)


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
        if len(list_customer_codes) != len(list_customer): 
            message =  i18n.t('translate.some_data_not_in_database', locale=get_language()) 
        return gen_response(200,message, list_customer)
    except Exception as e :
        exception_handel(e)

#them tuyen
@frappe.whitelist(methods="POST")
def create_router(body):
    try:
        body = dict(body)
        if body['cmd'] :
            del body['cmd']
        field_validate= ["travel_date","status", "customers", "channel_code", "team_sale","channel_name","employee"]
        field_customers_validate = ["customer_code","customer_name","display_address","phone_number","customer","frequency","lat","long"]
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
        return gen_response(201,"",doc)
    except Exception as e:
        exception_handel(e)

#cap nhat tuyen
def update_router(body):
    try:
        body = dict(body)
        name = validate_filter(type_check='require',value=body.get('name'))
        if body['cmd'] :
            del body['cmd']
        field_validate= ["name","travel_date","status", "customers", "channel_code", "team_sale","channel_name","employee"]
        field_customers_validate = ["customer_code","customer_name","display_address","phone_number","customer","frequency","lat","long"]
        # check_validate fields
        for key_router,value in body.items():
            if isinstance(body[key_router], list):
                for customer in body[key_router]:
                    for key_cs in customer:
                        if key_cs not in field_customers_validate  :
                            return gen_response(406,f"Field {key_cs} not validate",None)
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
        exception_handel(e)

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
        
        frappe.db.sql(f"""
                UPDATE `tabDMS Router`
                SET {field_name} = {value}
                WHERE name IN {tuple(name) if len(tuple(name)) >1 else tuple(name[0])} ;        
                """)
        
        frappe.db.commit()

        update = frappe.db.get_list('DMS Router',
                                    filters={"name": ["in", name]},
                                    fields=['*', 'UNIX_TIMESTAMP(travel_date) as travel_date',
                                            'UNIX_TIMESTAMP(creation) as creation','UNIX_TIMESTAMP(modified) as modified'])
        return gen_response(200,"",update)
    except Exception as e:
        exception_handel(e)

# nhom ban hang
@frappe.whitelist(methods="GET")
def get_team_sale():
    try:
        data = frappe.db.get_list("Sales Person",{"is_group":1},["name", "parent_sales_person"])
        gen_response(200,"",data)
    except Exception as e:
        exception_handel(e)

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
        exception_handel(e)

# danh sách customer cho web
@frappe.whitelist(methods="GET")
def get_customer(filters):
    try:
        page_size =  int(filters.get('page_size', 20))
        page_number = int(filters.get('page_number')) if filters.get('page_number') and int(filters.get('page_number')) > 0 else 1
        customer_group = filters.get('customer_group')
        customer_type = filters.get('customer_type')
        customer_name = filters.get('customer_name')

        city = filters.get('city')
        district = filters.get('district')
        ward = filters.get('ward')
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
            queryFilters['name'] = ['in',list_customer]

        data = frappe.db.get_list(
            "Customer",
            queryFilters,
            ["name",'customer_code',"customer_name",'UNIX_TIMESTAMP(custom_birthday) as custom_birthday',
             "customer_location_primary","customer_type","customer_name",
             "customer_primary_address as display_address","mobile_no as phone_number"],
            start=page_size*(page_number-1), 
            page_length=page_size)
        
        for customer in data:
            customer["long"] = False
            customer["lat"] = False
            if customer['customer_location_primary'] :
                customer["long"] = json.loads(customer['customer_location_primary'] ).get('long')
                customer["lat"] =json.loads(customer['customer_location_primary'] ).get('lat')

        total = len(frappe.db.get_list(
            "Customer",
            queryFilters))
        return gen_response(200,"",{
            "data":data,
            "total": total,
            "page_size": page_size,
            "page_number": page_number
        })
    except Exception as e:
        exception_handel(e)


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
        list_router = frappe.db.get_list('DMS Router',fields=['name','channel_name',"channel_code"])
        return gen_response(200,'',list_router)
    except Exception as e: 
        exception_handel(e)

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
