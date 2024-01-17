import frappe
from frappe import _
import json
from datetime import datetime
from pypika import  Order, CustomFunction
UNIX_TIMESTAMP = CustomFunction('UNIX_TIMESTAMP', ['day'])
from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    convert_timestamp,
    get_language,

)
from mbw_dms.config_translate import i18n

from pypika import Query, Table, Field

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
        page_size =  int(filters.get('page_size')) if filters.get('page_size') else 20
        page_number = int(filters.get('page_number')) if filters.get('page_number') and int(filters.get('page_number')) > 0 else 1
        print(page_size,page_number)
        query = {}
        if  from_date and to_date:
            from_date = datetime.fromtimestamp(from_date)
            to_date = datetime.fromtimestamp(to_date)
            query["delivery_date"] = ["between",[from_date,to_date]]
        if status:
            query['status'] = status
        sale_orders =frappe.db.get_list('Sales Order', 
                                       filters=query, 
                                       fields=['customer', 'name','address_display','UNIX_TIMESTAMP(po_date) as po_date','UNIX_TIMESTAMP(delivery_date) as delivery_date','grand_total','rounding_adjustment','rounded_total','status'], 
                                       order_by='delivery_date desc', 
                                       start=page_size*(page_number-1)*page_size, page_length=page_size,
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
def get_sale_order(**data):
    try:
        detail_sales_order = frappe.get_doc("Sales Order",data.get("name"))
        if detail_sales_order:
            SalesOrder = frappe.qb.DocType("Sales Order")
            Customer = frappe.qb.DocType("Customer")
            SalesOrderItem = frappe.qb.DocType("Sales Order Item")
            SalesOrderTaxes = frappe.qb.DocType("Sales Taxes and Charges")
            field_detail_sales = ['tax_amount','rate','account_head','charge_type','total','grand_total','customer','customer_name','address_display',"delivery_date",'set_warehouse','taxes_and_charges','total_taxes_and_charges','apply_discount_on','additional_discount_percentage','discount_amount','contact_person','rounded_total']
            # field_detail_taxe  = ['tax_amount','rate','account_head','charge_type']
            field_detail_items = ['item_name','item_code','qty',"uom",'amount','discount_amount','discount_percentage']
            detail = (frappe.qb.from_(SalesOrder)
                    .inner_join(SalesOrderItem)
                    .on(SalesOrder.name == SalesOrderItem.parent)
                    .inner_join(SalesOrderTaxes)
                    .on(SalesOrder.name == SalesOrderTaxes.parent)
                    .inner_join(Customer)
                    .on(Customer.name == SalesOrder.customer)
                    .where(SalesOrder.name == data.get('name'))
                    .select(
                        Customer.customer_id
                        ,SalesOrder.customer,SalesOrder.customer_name,SalesOrder.address_display,UNIX_TIMESTAMP(SalesOrder.delivery_date).as_('delivery_date'),SalesOrder.set_warehouse,SalesOrder.total,SalesOrder.grand_total
                        ,SalesOrder.taxes_and_charges,SalesOrder.total_taxes_and_charges, SalesOrder.apply_discount_on, SalesOrder.additional_discount_percentage,SalesOrder.discount_amount,SalesOrder.contact_person,SalesOrder.rounded_total
                        , SalesOrderItem.item_name,SalesOrderItem.item_code,SalesOrderItem.qty, SalesOrderItem.uom,SalesOrderItem.amount,SalesOrderItem.discount_amount,SalesOrderItem.discount_percentage
                        ,SalesOrderTaxes.tax_amount,SalesOrderTaxes.rate,SalesOrderTaxes.account_head,SalesOrderTaxes.charge_type,
                    )
                    ).run(as_dict =1)
            detail_order = {"list_items": []}
            taxes = []
            for item in detail :
                items_list = {}
                taxes_list = {}
                for key_item, value in item.items() :
                    if key_item in field_detail_sales:                    
                        detail_order.setdefault(key_item,value)
                    elif key_item in field_detail_items:
                        items_list[key_item] = value
                    # elif key_item in field_detail_taxe:
                    #     taxes_list[key_item] = value
                detail_order['list_items'].append(items_list)
                # taxes.append(taxes_list)
            # for taxe in taxes:

            gen_response(200,'',detail_order)
            return 
        else:
            gen_response(404,i18n.t('translate.not_found', locale=get_language()),[])
            return 
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