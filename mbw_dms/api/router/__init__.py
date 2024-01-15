import frappe
from frappe import _
import json
from datetime import datetime
from pypika import  Order, CustomFunction

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
)
from mbw_dms.config_translate import i18n
UNIX_TIMESTAMP = CustomFunction('UNIX_TIMESTAMP', ['day'])

@frappe.whitelist(methods='GET')
def get_list_router(**filters):
    try:
        status = filters.get('status') if filters.get('status') else False
        employee = filters.get('employee') if filters.get('employee') else False
        page_size =  int(filters.get('page_size')) if filters.get('page_size') else 20
        page_number = int(filters.get('page_number') )if filters.get('page_number') and int(filters.get('page_number')) <= 0 else 1
        DmsRouter = frappe.qb.DocType('DMS Router')
        queryFilters = {"is_deleted": 0}
        queryDoctype = DmsRouter.is_deleted == 0
        if status:
            queryFilters['status'] = status
            queryDoctype =queryDoctype & DmsRouter.status == status
        if employee:
            queryFilters['employee'] = employee
            queryDoctype =queryDoctype & DmsRouter.employee == employee
        list_router = frappe.db.get_list('DMS Router',filters=queryFilters,fields=['*', 'UNIX_TIMESTAMP(travel_date) as travel_date'], 
                                       order_by='travel_date desc', 
                                       start=page_size*(page_number-1), page_length=page_size)
        # list_router = (
        #     frappe.qb.from_(DmsRouter)
        #     .offset(page_size*(page_number-1))
        #     .limit(page_size)
        #     .where(queryDoctype)
        #     .select('*',UNIX_TIMESTAMP(DmsRouter.travel_date).as_("travel_date") ,)
        #     .run(as_dict = 1)
        # )
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
        # phan trang
        page_size =  int(data.get('page_size')) if data.get('page_size') else 20
        page_number = int(data.get('page_number') )if data.get('page_number') and int(data.get('page_number')) <= 0 else 1
        #bo loc tuyen
        router = data.get('router') if data.get('router') else False
        status = data.get('status') if data.get('status') else False
        #bo loc khach hang
        # tam bo qua bo loc khoang cach
        # distance = data.get('distance') if data.get('distance') else False
        order_by = data.get('order_by') if data.get('order_by') else False
        birthday_from = data.get('birthday_from') if data.get('birthday_from') else False
        birthday_to = data.get('birthday_to') if data.get('birthday_to') else False
        customer_group = data.get('customer_group') if data.get('customer_group') else False
        customer_type = data.get('customer_type') if data.get('customer_type') else False
        queryFilters = {"is_deleted": False}
        if router:
            queryFilters['name'] = router
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
            birthday_from = datetime.fromtimestamp(int(birthday_from))
            birthday_to = datetime.fromtimestamp(int(birthday_to))
            FiltersCustomer["birthday"] =["between",[birthday_from,birthday_to]]
        if customer_group:
            FiltersCustomer['customer_group'] =customer_group
        if customer_type:
            FiltersCustomer['customer_type'] =customer_group
        detail_customer = frappe.db.get_list('Customer',filters= FiltersCustomer,fields=['*'],start=page_size*(page_number-1), page_length=page_size)
        total_customer= len(frappe.db.get_list('Customer',filters= FiltersCustomer))
        gen_response(200,"", {
            "data": detail_customer,
            "total": total_customer,
            "page_size": page_size,
            "page_number": page_number
        })
    except Exception as e :
        exception_handel(e)