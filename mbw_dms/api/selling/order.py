import frappe
from frappe import _
import json
from datetime import datetime
from pypika import  Order, CustomFunction

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    convert_timestamp
)
from mbw_dms.config_translate import i18n


@frappe.whitelist(allow_guest=True,methods='GET')
def get_list_sales_order(**filters):
    try:
        status = filters.get('status') if filters.get('status') else False
        from_date = float(filters.get('from_date')) if filters.get('from_date') else False
        to_date = float(filters.get('to_date') )if filters.get('to_date') else False
        page_size =  float(filters.get('page_size')) if filters.get('page_size') else 20
        page_number = float(filters.get('page_number') )if filters.get('page_number') and filters.get('page_number') <= 0 else 1
        query = {}
        if  from_date and to_date:
            from_date = datetime.fromtimestamp(from_date)
            to_date = datetime.fromtimestamp(to_date)
            query["delivery_date"] = ["between",[from_date,to_date]]
        if status:
            query['status'] = status
        sale_orders =frappe.db.get_list('Sales Order', 
                                       filters=query, 
                                       fields=['customer', 'name','address_display','UNIX_TIMESTAMP(po_date) as po_date','UNIX_TIMESTAMP(delivery_date) as delivery_date','status'], 
                                       order_by='delivery_date desc', 
                                       start=page_size*(page_number-1), page_length=page_size,
                                        )
        for sale_order in sale_orders :
            sale_order['custom_id'] = frappe.db.get_value("Customer",filters={'name': sale_order['customer']},fieldname=['customer_id'])
        total_order = len(frappe.db.get_list('Sales Order', filters=query))

        gen_response(200,'',{
            "data": sale_orders,
            "total": total_order,
            "page_size": page_size,
            "page_number":page_number
        })
        return 
    except Exception as e: 
        exception_handel(e)


@frappe.whitelist(methods='GET')
def get_sale_order(name):
    try:
        detail_sales_order = frappe.get_doc("Sales Order",name)
        # field_detail_sales = ['customer','customer_name','po_no',"address_display",'total','total_taxes_and_charges']
        # field_detail_items = ['customer','customer_name','po_no',"address_display"]
        # info_sales_order = {}
        # if detail_sales_order: 
        #     item_list = detail_sales_order.get('items')
        #     discount = detail_sales_order.get('payment_schedule')
        #     for key,value in detail_sales_order.items():
        #         if key in field_detail_sales:
        #             info_sales_order[key] = value
        gen_response(200,'',detail_sales_order)
        return
    except Exception as e: 
        exception_handel(e)

@frappe.whitelist(methods='POST')
def create_sale_order(**args):
    try:
        args = frappe._dict(args)
        new_order = frappe.new_doc('Sales Order')
        new_order.customer = args.customer
        new_order.delivery_date = convert_timestamp(float(args.delivery_date), is_datetime=False)
        new_order.append('items', {
            'item_code': args.item_code,
            'warehouse': args.warehouse,
            'qty': args.qty,
            'uom': args.uom,
        })

        new_order.insert(ignore_permissions=True)
        # frappe.db.commit()

        gen_response(200, 'Thành công',  {"name": new_order.name})
    except Exception as e:
        return exception_handel(e)