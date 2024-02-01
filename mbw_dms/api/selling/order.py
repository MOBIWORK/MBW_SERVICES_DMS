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
            for item in detail :
                items_list = {}
                for key_item, value in item.items() :
                    if key_item in field_detail_sales:                    
                        detail_order.setdefault(key_item,value)
                    elif key_item in field_detail_items:
                        items_list[key_item] = value
                detail_order['list_items'].append(items_list)
            if len(detail_taxes) > 0 :
                detail_order = {**detail_order,**detail_taxes[0]}

            gen_response(200,'',detail_order)
            return 
        else:
            gen_response(404,i18n.t('translate.not_found', locale=get_language()),[])
            return 
    except Exception as e: 
        exception_handel(e)

# Tạo mới đơn hàng
@frappe.whitelist(methods='POST')
def create_sale_order(**kwargs):
    try:
        from erpnext.accounts.party import get_party_details
        kwargs = frappe._dict(kwargs)
        new_order = frappe.new_doc('Sales Order')

        # Dữ liệu bắn lên để tạo sale order mới
        discount_percent = float(kwargs.get('additional_discount_percentage', 0))
        discount_amount = float(kwargs.get('discount_amount', 0))
        rate_taxes = float(kwargs.get('rate_taxes', 0))
        apply_discount_on = kwargs.get('apply_discount_on')
        taxes_and_charges = kwargs.get('taxes_and_charges') if kwargs.get('taxes_and_charges') else None

        new_order.customer = validate_not_none(kwargs.customer)                                         
        new_order.delivery_date = validate_date(kwargs.delivery_date)                                   # Ngày giao
        new_order.set_warehouse = validate_not_none(kwargs.get('set_warehouse'))                        # Kho hàng
        new_order.apply_discount_on = validate_choice(configs.discount_type)(apply_discount_on)         # Loại Chiết khấu
        new_order.additional_discount_percentage = discount_percent                                     # Phần trăm chiết khấu
        if taxes_and_charges is not None:
            new_order.taxes_and_charges = taxes_and_charges                                                 # Tax
            new_order.append('taxes', get_value_child_doctype('Sales Taxes and Charges Template', taxes_and_charges, 'taxes')[0])
        new_order.checkin_id = kwargs.get('checkin_id')
        sales_team = get_party_details(party=kwargs.get('customer'), party_type='Customer', price_list='Standard Selling', posting_date=kwargs.get('delivery_date'), fetch_payment_terms_template=1, currency='VND',
                              company=kwargs.get('company'), doctype='Sales Order')
        if sales_team.get('sales_team') != []:
            new_order.append('sales_team', sales_team['sales_team'][0])
        items = kwargs.get('items')
        amount = 0
        for item_data in items:
            rate = float(item_data.get('rate', 0))
            discount_percentage = float(item_data.get('discount_percentage', 0))

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

# Áp dụng quy tắc đặt giá
@frappe.whitelist()
def pricing_rule(**kwargs):
    try:
        from erpnext.accounts.doctype.pricing_rule.pricing_rule import apply_pricing_rule
        pricing_rule = apply_pricing_rule(args=kwargs, doc=None)
        for i, child in enumerate(pricing_rule):
            if "item_code" not in child and i < len(kwargs["items"]):
                child["item_code"] = kwargs["items"][i]["item_code"]
        gen_response(200, 'Thành công', pricing_rule)
    except Exception as e:
        return exception_handel(e)

# Áp dụng bảng giá
@frappe.whitelist()
def price_list(**kwargs):
    try:
        from erpnext.stock.get_item_details import apply_price_list
        price_list = apply_price_list(args=kwargs, as_doc=False)
        for i, child in enumerate(price_list["children"]):
            if "item_code" not in child and i < len(kwargs["items"]):
                child["item_code"] = kwargs["items"][i]["item_code"]
        gen_response(200, 'Thành công', price_list)
    except Exception as e:
        return exception_handel(e)

# Tạo mới phiếu trả hàng
@frappe.whitelist(methods='POST')
def create_return_order(**kwargs):
    try:
        from erpnext.accounts.party import get_party_details
        kwargs = frappe._dict(kwargs)
        new_order = frappe.new_doc('Sales Invoice')

        # Dữ liệu bắn lên để tạo sale order mới
        discount_percent = float(kwargs.get('additional_discount_percentage'))
        discount_amount = float(kwargs.get('discount_amount'))
        rate_taxes = float(kwargs.get('rate_taxes'))
        apply_discount_on = kwargs.get('apply_discount_on')
        taxes_and_charges = kwargs.get('taxes_and_charges') 

        new_order.customer = validate_not_none(kwargs.customer)                                         
        new_order.set_warehouse = validate_not_none(kwargs.get('set_warehouse'))                        # Kho hàng
        new_order.apply_discount_on = validate_choice(configs.discount_type)(apply_discount_on)         # Loại Chiết khấu
        new_order.additional_discount_percentage = discount_percent                                     # Phần trăm chiết khấu
        new_order.taxes_and_charges = taxes_and_charges                                                 # Tax
        new_order.append('taxes', get_value_child_doctype('Sales Taxes and Charges Template', taxes_and_charges, 'taxes')[0])
        new_order.checkin_id = kwargs.get('checkin_id')
        new_order.is_return = kwargs.get('is_return')
        new_order.update_billed_amount_in_delivery_note = kwargs.get('update_billed_amount_in_delivery_note')
        sales_team = get_party_details(party=kwargs.get('customer'), party_type='Customer', price_list='Standard Selling', posting_date=kwargs.get('delivery_date'), fetch_payment_terms_template=1, currency='VND',
                              company=kwargs.get('company'), doctype='Sales Order')
        if sales_team.get('sales_team') != []:
            new_order.append('sales_team', sales_team['sales_team'][0])
        items = kwargs.get('items')
        amount = 0
        for item_data in items:
            rate = float(item_data.get('rate'))
            discount_percentage = float(item_data.get('discount_percentage'))
            new_order.append('items', {
                'item_code': item_data.get('item_code'),
                'qty': -item_data.get('qty'),
                'uom': item_data.get('uom'),
                'discount_percentage': discount_percentage,
            })
            amount += (rate - rate * discount_percentage /100) * float(-item_data.get('qty'))  # Giá tổng sản phầm (X)

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

# Chỉnh sửa phiếu trả hàng
@frappe.whitelist(methods='PUT')
def edit_return_order(name, **kwargs):
    try:
        if frappe.db.exists("Sales Invoice", name, cache=True):
            order = frappe.get_doc('Sales Invoice', name)
            if order.docstatus == 0:
                taxes_and_charges = kwargs.get('taxes_and_charges')
                discount_percent = kwargs.get('additional_discount_percentage')
                discount_amount = kwargs.get('discount_amount')
                items = kwargs.get('items')
                if items:
                    for item_data in items:
                        discount_percentage = float(item_data.get('discount_percentage')) if item_data.get('discount_percentage') is not None else None
                        qty = int(item_data.get('qty')) if item_data.get('qty') is not None else 1
                        if qty == 0:
                            return gen_response(400, 'Số lượng không thể bằng 0')
                        existing_item = next((item for item in order.items if item.item_code == item_data.get('item_code')), None)
                        if existing_item:
                            if qty is not None:
                                existing_item.qty = -qty
                            existing_item.uom = item_data.get('uom')
                            if discount_percentage is not None:
                                existing_item.discount_percentage = discount_percentage
                            existing_item.rate = item_data.get('rate')
                        else:
                            order.append('items', {
                                'item_code': item_data.get('item_code'),
                                'qty': -qty,
                                'uom': item_data.get('uom'),
                                'rate': item_data.get('rate'),
                                'discount_percentage': discount_percentage if discount_percentage is not None else 0
                            })
                if taxes_and_charges:
                    order.set('taxes', [])
                    order.taxes_and_charges = taxes_and_charges  
                    order.append('taxes', get_value_child_doctype('Sales Taxes and Charges Template', taxes_and_charges, 'taxes')[0])
                if discount_percent:
                    order.set('additional_discount_percentage', float(discount_percent))
                if discount_amount:
                    order.set('discount_amount', float(discount_amount))
                order.save()
                gen_response(200, 'Cập nhật thành công')
            else:
                return gen_response(400, i18n.t('translate.invalid_edit_return_order', locale=get_language()))
        else:
            return gen_response(406, f"Không tồn tại {name}")
    except Exception as e:
        return exception_handel(e)

# Xóa phiếu trả hàng
@frappe.whitelist(methods='DELETE')
def delete_return_order(name, **kwargs):
    try:
        if frappe.db.exists("Sales Invoice", name, cache=True):
            return_order = frappe.get_doc('Sales Invoice',name)
            if return_order.docstatus == 0:
                frappe.delete_doc('Sales Invoice', name)
                gen_response(200, "Thành công", [])
            else:
                return gen_response(400, i18n.t('translate.invalid_delete_return_order', locale=get_language()))
        else:
            return gen_response(406, f"Không tồn tại {name}")
    except Exception as e:
        exception_handel(e)


@frappe.whitelist(methods='DELETE')
def delete_item(name_return_order, item_code):
    try:
        # Kiểm tra xem đơn hàng có tồn tại không
        if frappe.db.exists("Sales Invoice", name_return_order, cache=True):
            
            # Lấy đối tượng đơn hàng
            return_order = frappe.get_doc('Sales Invoice',name_return_order)

            # Kiểm tra xem đơn hàng có ở trạng thái "Draft" không
            if return_order.docstatus == 0:

                # Kiểm tra xem sản phẩm cần xóa có tồn tại không
                if not any(item.get("item_code") == item_code for item in return_order.items):
                    return gen_response(406, f"Sản phẩm {item_code} không tồn tại trong đơn hàng")
                
                # Xóa sản phẩm từ danh sách items
                return_order.items = [item for item in return_order.items if item.get("item_code") != item_code]
                return_order.save()
                return gen_response(200, 'Thành công', [])
            else:
                return gen_response(400, i18n.t('translate.invalid_edit_return_order', locale=get_language()))
        else:
            return gen_response(406, f"Không tồn tại phiếu trả hàng {name_return_order}")
    except Exception as e:
        exception_handel(e)

# Chi tiết đơn hàng theo checkin_id
@frappe.whitelist(methods='GET')
def get_sale_order_by_checkin_id(**data):
    try:
        checkin_id = data.get('checkin_id')
        detail_sales_order = frappe.db.get_list("Sales Order", filters={"checkin_id": checkin_id}, fields=['name'])
        if detail_sales_order:
            SalesOrder = frappe.qb.DocType("Sales Order")
            Customer = frappe.qb.DocType("Customer")
            SalesOrderItem = frappe.qb.DocType("Sales Order Item")
            SalesOrderTaxes = frappe.qb.DocType("Sales Taxes and Charges")
            field_detail_sales = ['total','grand_total','customer','customer_name','address_display',"delivery_date",'set_warehouse','taxes_and_charges','total_taxes_and_charges','apply_discount_on','additional_discount_percentage','discount_amount','contact_person','rounded_total']
            field_detail_items = ['name', 'item_name','item_code','qty',"uom",'amount','discount_amount','discount_percentage']
            detail = (frappe.qb.from_(SalesOrder)
                    .inner_join(SalesOrderItem)
                    .on(SalesOrder.name == SalesOrderItem.parent)
                    
                    .inner_join(Customer)
                    .on(Customer.name == SalesOrder.customer)
                    .where(SalesOrder.name == detail_sales_order[0].get('name'))
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
                            .where(SalesOrder.name == detail_sales_order[0].get('name'))
                            .select(SalesOrderTaxes.tax_amount,SalesOrderTaxes.rate,SalesOrderTaxes.account_head,SalesOrderTaxes.charge_type,)
                            ).run(as_dict =1)
            detail_order = {"list_items": []}
            for item in detail :
                items_list = {}
                for key_item, value in item.items() :
                    if key_item in field_detail_sales:                    
                        detail_order.setdefault(key_item,value)
                    elif key_item in field_detail_items:
                        items_list[key_item] = value
                detail_order['list_items'].append(items_list)
            if len(detail_taxes) > 0 :
                detail_order = {**detail_order,**detail_taxes[0]}

            gen_response(200,'',detail_order)
            return 
        else:
            gen_response(404,i18n.t('translate.not_found', locale=get_language()),[])
            return 
    except Exception as e: 
        exception_handel(e)