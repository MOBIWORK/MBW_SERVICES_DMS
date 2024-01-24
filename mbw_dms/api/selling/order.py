import frappe
from frappe import _
from pypika import  Order, CustomFunction
UNIX_TIMESTAMP = CustomFunction('UNIX_TIMESTAMP', ['day'])
from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    get_language,
    get_value_child_doctype
)
from mbw_dms.api.validators import (
    validate_filter_timestamp,
    validate_date,
    validate_choice,
    validate_not_none
)
from mbw_dms.api.selling import configs
from mbw_dms.config_translate import i18n


@frappe.whitelist(allow_guest=True,methods='GET')
def get_list_sales_order(**filters):
    try:
        status = filters.get('status') if filters.get('status') else False
        from_date = validate_filter_timestamp('start')(filters.get('from_date')) if filters.get('from_date') else False
        to_date = validate_filter_timestamp('end')(filters.get('to_date')) if filters.get('to_date') else False
        page_size =  int(filters.get('page_size')) if filters.get('page_size') else 20
        page_number = int(filters.get('page_number')) if filters.get('page_number') and int(filters.get('page_number')) > 0 else 1
        print(page_size,page_number)
        query = {}
        if  from_date and to_date:
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
            field_detail_sales = ['total','grand_total','customer','customer_name','address_display',"delivery_date",'set_warehouse','taxes_and_charges','total_taxes_and_charges','apply_discount_on','additional_discount_percentage','discount_amount','contact_person','rounded_total']
            # field_detail_taxe  = ['tax_amount','rate','account_head','charge_type']
            field_detail_items = ['name', 'item_name','item_code','qty',"uom",'amount','discount_amount','discount_percentage']
            detail = (frappe.qb.from_(SalesOrder)
                    .inner_join(SalesOrderItem)
                    .on(SalesOrder.name == SalesOrderItem.parent)
                    
                    .inner_join(Customer)
                    .on(Customer.name == SalesOrder.customer)
                    .where(SalesOrder.name == data.get('name'))
                    .select(
                        Customer.customer_id
                        ,SalesOrder.customer,SalesOrder.customer_name,SalesOrder.address_display,UNIX_TIMESTAMP(SalesOrder.delivery_date).as_('delivery_date'),SalesOrder.set_warehouse,SalesOrder.total,SalesOrder.grand_total
                        ,SalesOrder.taxes_and_charges,SalesOrder.total_taxes_and_charges, SalesOrder.apply_discount_on, SalesOrder.additional_discount_percentage,SalesOrder.discount_amount,SalesOrder.contact_person,SalesOrder.rounded_total
                        ,SalesOrderItem.name, SalesOrderItem.item_name,SalesOrderItem.item_code,SalesOrderItem.qty, SalesOrderItem.uom,SalesOrderItem.amount,SalesOrderItem.discount_amount,SalesOrderItem.discount_percentage                        
                    )
                    ).run(as_dict =1)
            
            detail_taxes = (frappe.qb.from_(SalesOrder)
                            .inner_join(SalesOrderTaxes)
                            .on(SalesOrder.name == SalesOrderTaxes.parent)
                            .where(SalesOrder.name == data.get('name'))
                            .select(SalesOrderTaxes.tax_amount,SalesOrderTaxes.rate,SalesOrderTaxes.account_head,SalesOrderTaxes.charge_type,)
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
            if len(detail_taxes) > 0 :
                detail_order = {**detail_order,**detail_taxes[0]}

            gen_response(200,'',detail_order)
            return 
        else:
            gen_response(404,i18n.t('translate.not_found', locale=get_language()),[])
            return 
    except Exception as e: 
        exception_handel(e)

@frappe.whitelist(methods='POST')
def create_sale_order(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        new_order = frappe.new_doc('Sales Order')

        # Dữ liệu bắn lên để tạo sale order mới
        discount_percent = float(kwargs.get('additional_discount_percentage'))
        discount_amount = float(kwargs.get('discount_amount'))
        rate_taxes = float(kwargs.get('rate_taxes'))
        apply_discount_on = kwargs.get('apply_discount_on')
        taxes_and_charges = kwargs.get('taxes_and_charges') 

        new_order.customer = validate_not_none(kwargs.customer)                                         
        new_order.delivery_date = validate_date(kwargs.delivery_date)                                   # Ngày giao
        new_order.set_warehouse = validate_not_none(kwargs.get('set_warehouse'))                        # Kho hàng
        new_order.apply_discount_on = validate_choice(configs.discount_type)(apply_discount_on)         # Loại Chiết khấu
        new_order.additional_discount_percentage = discount_percent                                     # Phần trăm chiết khấu
        new_order.taxes_and_charges = taxes_and_charges                                                 # Tax
        new_order.append('taxes', get_value_child_doctype('Sales Taxes and Charges Template', taxes_and_charges, 'taxes')[0])
        items = kwargs.get('items')
        amount = 0
        for item_data in items:
            rate = float(item_data.get('rate'))
            discount_percentage = float(item_data.get('discount_percentage'))
            new_order.append('items', {
                'item_code': item_data.get('item_code'),
                'qty': item_data.get('qty'),
                'uom': item_data.get('uom'),
                'discount_percentage': discount_percentage,
            })
            amount += (rate - rate * discount_percentage /100) * float(item_data.get('qty'))   # Giá tổng sản phầm (X)

        # Check dữ liệu mobile bắn lên
        grand_total = 0     # Tổng tiền đơn hàng
        total_vat = 0       # Giá vat (VAT)

        # Nếu loại chiết khấu là Grand total
        if apply_discount_on == 'Grand Total':
            total_vat = rate_taxes * amount / 100          # VAT = %VAT * X
            if discount_percent != 0:
                discount_amount = discount_percent * (amount + total_vat) / 100     # CK = %CK * (VAT + X)
                grand_total = amount + total_vat - discount_amount         # total = X + VAT - Ck
            if discount_percent == 0:
                new_order.discount_amount = discount_amount
                grand_total = amount + total_vat - discount_amount

        # Nếu loại chiết khấu là Net total
        if apply_discount_on == 'Net Total':
            if discount_percent != 0:
                discount_amount = discount_percent * amount / 100
                total_vat = rate_taxes * (amount - discount_amount) / 100
                grand_total = amount + total_vat - discount_amount
            if discount_percent == 0:
                new_order.discount_amount = discount_amount
                total_vat = rate_taxes * (amount - discount_amount) / 100
                grand_total = amount + total_vat - discount_amount
        
        # So sánh với giá bên mobile tính toán
        if grand_total == float(kwargs.get('grand_total')):
            new_order.insert()
            frappe.db.commit()
            gen_response(200, 'Thành công',  {"name": new_order.name})
        else:
            return gen_response(400, i18n.t('translate.invalid_grand_total', locale=get_language()), {"grand_total": grand_total})
    except Exception as e:
        return exception_handel(e)

