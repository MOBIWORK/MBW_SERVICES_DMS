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
        queryFilters = {"is_deleted": False}
        queryDoctype = DmsRouter.is_deleted == False
        if status:
            queryFilters['status'] = status
            queryDoctype =queryDoctype & DmsRouter.status == status
        if employee:
            queryFilters['employee'] = employee
            queryDoctype =queryDoctype & DmsRouter.employee == employee
        # list_router = frappe.db.get_list('DMS Router',filters=queryFilters,fields=['*', 'UNIX_TIMESTAMP(travel_date) as travel_date'], 
        #                                order_by='travel_date desc', 
        #                                start=page_size*(page_number-1), page_length=page_size,)
        list_router = (
            frappe.qb.from_(DmsRouter)
            .offset(page_size*(page_number-1))
            .limit(page_size)
            .where(queryDoctype)
            .select('*',UNIX_TIMESTAMP(DmsRouter.travel_date).as_("travel_date") ,)
            .run(as_dict = 1)
        )
        total = frappe.db.count('DMS Router',filters=queryFilters)
        gen_response(200,'',{
            "data": list_router,
            "total": total,
            "page_size": page_size,
            "page_number":page_number
        })
        return 
    except Exception as e: 
        exception_handel(e)