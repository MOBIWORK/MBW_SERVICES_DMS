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


@frappe.whitelist(methods='GET')
def get_list_sales_order(**filters):
    try:
        status = filters.get('status') if filters.get('status') else False
        from_date = float(filters.get('from_date')) if filters.get('from_date') else False
        to_date = float(filters.get('to_date') )if filters.get('to_date') else False
        page_size =  float(filters.get('page_size')) if filters.get('page_size') else 20
        page_number = float(filters.get('page_number') )if filters.get('page_number') or filters.get('page_number') <= 0 else 1
        if not from_date or not to_date:
            gen_response(406,"from_date or to_date not found",{})
            return
        from_date = datetime.fromtimestamp(from_date)
        to_date = datetime.fromtimestamp(to_date)
        query = {"delivery_date": ["between",[from_date,to_date]]}
        if status:
            query['status'] = status
        sale_orders =frappe.db.get_list('Sales Order', 
                                       filters=query, 
                                       fields=['customer', 'name','address_display','po_date','delivery_date','status'], 
                                       order_by='delivery_date desc', 
                                       start=page_size*(page_number-1), page_length=page_size,
                                        )
        for sale_order in sale_orders :
            print("sale_order",sale_order)
            sale_order['po_date'] = datetime.combine(sale_order['po_date'], datetime.min.time()).timestamp()
            sale_order['delivery_date'] = datetime.combine(sale_order['delivery_date'], datetime.min.time()).timestamp()
            sale_order['custom_id'] = frappe.db.get_value("Customer",filters={'name': sale_order['customer']},fieldname=['customer_id'])
        total_order = frappe.db.count("Sales Order", filters= query)

        gen_response(200,'',{
            "data": sale_orders,
            "total": total_order,
            "page_size": page_size,
            "page_number":page_number
        })
        return 
    except Exception as e: 
        exception_handel(e)