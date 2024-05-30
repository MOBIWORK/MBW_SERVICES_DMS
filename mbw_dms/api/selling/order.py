import frappe
from frappe import _
from pypika import CustomFunction
UNIX_TIMESTAMP = CustomFunction('UNIX_TIMESTAMP', ['day'])
from mbw_dms.api.common import (
    exception_handle,
    gen_response,
    get_value_child_doctype,
)
from mbw_dms.api.validators import (
    validate_filter_timestamp,
    validate_date,
    validate_choice,
    validate_not_none
)
from mbw_dms.api import configs

# Lấy danh sách đơn hàng
@frappe.whitelist(allow_guest=True,methods='GET')
def get_list_sales_order(**filters):
    try:
        status = filters.get('status')
        from_date = validate_filter_timestamp('start')(filters.get('from_date')) if filters.get('from_date') else None
        to_date = validate_filter_timestamp('end')(filters.get('to_date')) if filters.get('to_date') else None
        page_size =  int(filters.get('page_size', 20))
        page_number = int(filters.get('page_number')) if filters.get('page_number') and int(filters.get('page_number')) > 0 else 1

        query = {}
        if from_date and to_date:
            query["creation"] = ["between",[from_date,to_date]]
        if status is not None and status != "All":
            query['status'] = validate_choice(configs.status_order)(status)
        if filters.get('customer_name'):
            query['customer_name'] = filters.get('customer_name')
        if filters.get('customer'):
            query['customer'] = filters.get('customer')
        if filters.get('name'):
            query['name'] = filters.get('name')
            
        sale_orders =frappe.db.get_list('Sales Order', 
                                       filters=query, 
                                       fields=['customer', 'customer_name', 'name',
                                               '(customer_address) as address_display',
                                               'UNIX_TIMESTAMP(po_date) as po_date',
                                               'UNIX_TIMESTAMP(delivery_date) as delivery_date',
                                               'UNIX_TIMESTAMP(creation) as creation','grand_total',
                                               'rounding_adjustment','rounded_total','status',
                                               "sales_person"], 
                                       order_by='delivery_date desc', 
                                       start=page_size*(page_number-1), 
                                       page_length=page_size,
                                       parent_doctype="Sales Order")
        for sale_order in sale_orders:
            sale_order['custom_id'] = frappe.db.get_value("Customer",filters={'name': sale_order['customer']},fieldname=['customer_code'])
        total_order = len(frappe.db.get_list('Sales Order', filters=query))

        return gen_response(200, "Thành công",{
            "data": sale_orders,
            "total": total_order,
            "page_size": page_size,
            "page_number": page_number
        })
    except Exception as e: 
        exception_handle(e)


# Chi tiết đơn hàng
@frappe.whitelist(methods='GET')
def get_sale_order(name):
    try:
        if frappe.db.exists("Sales Order", name, cache=True):
            SalesOrder = frappe.qb.DocType("Sales Order")
            Customer = frappe.qb.DocType("Customer")
            SalesOrderItem = frappe.qb.DocType("Sales Order Item")
            SalesOrderTaxes = frappe.qb.DocType("Sales Taxes and Charges")
            Employee = frappe.qb.DocType("Employee")

            # Lấy ra các trường trong đơn hàng
            field_detail_sales = ["total", "grand_total", "customer_code", "customer", "customer_name", "customer_address", "delivery_date", "set_warehouse", "total_taxes_and_charges", "apply_discount_on", "additional_discount_percentage", "discount_amount", "contact_person", "rounded_total", "status"]

            # Thực hiện join để lấy ra giá trị
            detail = (frappe.qb.from_(SalesOrder)
                    .inner_join(SalesOrderItem)
                    .on(SalesOrder.name == SalesOrderItem.parent)
                    
                    .inner_join(Customer)
                    .on(Customer.name == SalesOrder.customer)
                    .where(SalesOrder.name == name)
                    .select(
                        Customer.customer_code
                        ,SalesOrder.customer,SalesOrder.customer_name,SalesOrder.customer_address,UNIX_TIMESTAMP(SalesOrder.delivery_date).as_('delivery_date'),SalesOrder.set_warehouse,SalesOrder.total,SalesOrder.grand_total
                        ,SalesOrder.taxes_and_charges,SalesOrder.total_taxes_and_charges, SalesOrder.apply_discount_on, SalesOrder.additional_discount_percentage,SalesOrder.discount_amount,SalesOrder.contact_person, SalesOrder.status
                    )
                    ).run(as_dict =1)
            
            # Lấy ra giá trị tax
            detail_taxes = (frappe.qb.from_(SalesOrder)
                            .inner_join(SalesOrderTaxes)
                            .on(SalesOrder.name == SalesOrderTaxes.parent)
                            .where(SalesOrder.name == name)
                            .select(SalesOrderTaxes.tax_amount,SalesOrderTaxes.rate.as_('rate_tax'))
                            ).run(as_dict =1)
            
            # Lấy ra thông tin nhân viên bán hàng
            employee = (frappe.qb.from_(SalesOrder)
                            .inner_join(Employee)
                            .on(SalesOrder.owner == Employee.user_id)
                            .where(SalesOrder.name == name)
                            .select(Employee.employee_name, Employee.cell_number, Employee.current_address)
                            ).run(as_dict =1)
            
            # Lấy ra chi tiết đơn hàng
            detail_order = {"list_items": []}

            if len(detail) > 0:
                for key_item, value in detail[0].items() :
                    if key_item in field_detail_sales:                    
                        detail_order.setdefault(key_item,value)
                detail_order['list_items'] = get_items(master_doc='Sales Order', master_name=name)

            if len(detail_taxes) > 0 :
                detail_order = {**detail_order, **detail_taxes[0]}
            
            if len(employee) > 0:
                detail_order = {**detail_order, **employee[0]}

            return gen_response(200, "Thành công", detail_order)
        else:
            return gen_response(406, f"Không tồn tại đơn hàng {name}")
    except Exception as e: 
        exception_handle(e)

# Tạo mới đơn hàng
@frappe.whitelist(methods='POST')
def create_sale_order(**kwargs):
    # try:
        kwargs = frappe._dict(kwargs)
        new_order = frappe.new_doc('Sales Order')
        user_name = frappe.get_value('Employee',{ 'user_id': frappe.session.user}, 'name')
        sales_person = frappe.get_value('Sales Person', {'employee': user_name}, 'name')

        # Dữ liệu bắn lên để tạo sale order mới
        discount_percent = float(kwargs.get('additional_discount_percentage', 0))
        # discount_amount = float(kwargs.get('discount_amount', 0))
        # rate_taxes = float(kwargs.get('rate_taxes', 0))
        apply_discount_on = kwargs.get('apply_discount_on')

        new_order.customer = validate_not_none(kwargs.customer)     
        new_order.delivery_date = validate_date(kwargs.delivery_date)                                   # Ngày giao
        new_order.set_warehouse = validate_not_none(kwargs.get('set_warehouse'))                        # Kho hàng

        if apply_discount_on is not None:
            new_order.apply_discount_on = validate_choice(configs.discount_type)(apply_discount_on)         # Loại Chiết khấu
            new_order.additional_discount_percentage = discount_percent                                     # Phần trăm chiết khấu

        new_order.checkin_id = kwargs.get('checkin_id')

        # Thêm mới sales team
        new_order.append('sales_team', {
            'sales_person': sales_person,
            'allocated_percentage': 100,
            'created_by': 1
        })

        # Thêm mới items trong đơn hàng
        items = kwargs.get('items')
        account_heads = {}

        for item_data in items:
            rate = float(item_data.get('rate', 0))
            discount_percentage = float(item_data.get('discount_percentage', 0))
            item_tax_template = item_data.get('item_tax_template')
            tax_rate = float(item_data.get('item_tax_rate', 0))
            
            new_order.append('items', {
                'item_code': item_data.get('item_code'),
                'qty': item_data.get('qty'),
                'uom': item_data.get('uom'),
                'discount_percentage': discount_percentage,
                'item_tax_template': item_tax_template,
                'item_tax_rate': tax_rate
            })
            
            item_amount = (rate - rate * discount_percentage / 100) * float(item_data.get('qty'))
            tax_amount = item_amount * tax_rate / 100
            amount = item_amount + tax_amount 

            if item_tax_template:
                taxes = frappe.get_doc("Item Tax Template", item_tax_template)
                account_head = taxes.taxes[0].tax_type

                if account_head in account_heads:
                    # Cộng dồn giá trị nếu account_head đã tồn tại
                    account_heads[account_head]['tax_amount'] += tax_amount
                    account_heads[account_head]['total'] += amount
                else:
                    # Thêm mới nếu account_head chưa tồn tại
                    account_heads[account_head] = {
                        'charge_type': 'On Net Total',
                        'account_head': account_head,
                        'tax_amount': tax_amount,
                        'total': amount,
                        'rate': 0,
                        'description': 'VAT'
                    }
        if account_heads != {}:
            for tax in account_heads.values():
                new_order.append('taxes', tax)

        # Check dữ liệu mobile bắn lên
        # grand_total = 0     # Tổng tiền đơn hàng
        # discount_amount = 0

        # Nếu loại chiết khấu là Grand total
        # if apply_discount_on == 'Grand Total':
        #     if discount_percent != 0:
        #         discount_amount = discount_percent * amount / 100     # CK = %CK * (VAT + X)
        #         grand_total = amount - discount_amount         # total = X + VAT - Ck
        #     if discount_percent == 0:
        #         new_order.discount_amount = discount_amount
        #         grand_total = amount - discount_amount

        # # Nếu loại chiết khấu là Net total
        # if apply_discount_on == 'Net Total':
        #     if discount_percent != 0:
        #         discount_amount = discount_percent * amount / 100
        #         grand_total = amount - discount_amount
        #     if discount_percent == 0:
        #         new_order.discount_amount = discount_amount
        #         grand_total = amount - discount_amount

        # Nếu không truyền lên chiết khấu
        # if apply_discount_on is None:
        #     grand_total = amount
        
        # So sánh với giá bên mobile tính toán
        # if grand_total == float(kwargs.get('grand_total')):
        customer = frappe.get_doc('Customer', kwargs.customer)
        customer.has_sales_order = 1
        customer.save()
        
        new_order.insert()
        frappe.db.commit()
        return gen_response(201, "Thành công",  {"name": new_order.name})
        # else:
        #     return gen_response(400, "Tổng tiền chưa khớp với tính toán", {"grand_total": grand_total})
    # except Exception as e:
    #     return exception_handle(e)


# Áp dụng quy tắc đặt giá
@frappe.whitelist()
def pricing_rule(**kwargs):
    try:
        from erpnext.accounts.doctype.pricing_rule.pricing_rule import apply_pricing_rule
        pricing_rule = apply_pricing_rule(args=kwargs, doc=None)
        for i, child in enumerate(pricing_rule):
            if "item_code" not in child and i < len(kwargs["items"]):
                child["item_code"] = kwargs["items"][i]["item_code"]
        return gen_response(200, "Thành công", pricing_rule)
    except Exception as e:
        return exception_handle(e)


# Áp dụng bảng giá
@frappe.whitelist()
def price_list(**kwargs):
    try:
        from erpnext.stock.get_item_details import apply_price_list
        price_list = apply_price_list(args=kwargs, as_doc=False)
        for i, child in enumerate(price_list["children"]):
            if "item_code" not in child and i < len(kwargs["items"]):
                child["item_code"] = kwargs["items"][i]["item_code"]
        return gen_response(200, "Thành công", price_list)
    except Exception as e:
        return exception_handle(e)


# Tạo mới phiếu trả hàng
@frappe.whitelist(methods='POST')
def create_return_order(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        new_order = frappe.new_doc('Sales Invoice')
        is_return = 1
        update_billed_amount_in_delivery_note = 1
        user_name = frappe.get_value('Employee', { 'user_id': frappe.session.user}, 'name')
        sales_person = frappe.get_value('Sales Person', {'employee': user_name}, 'name')

        # Dữ liệu bắn lên để tạo sale order mới
        discount_percent = float(kwargs.get('additional_discount_percentage', 0))  # Chiết khấu theo % của đơn hàng
        # discount_amount = float(kwargs.get('discount_amount', 0))                  # Tổng tiền chiết khấu của đơn hàng
        # rate_taxes = float(kwargs.get('rate_taxes', 0))                            # Phần trăm thuế
        apply_discount_on = kwargs.get('apply_discount_on', 'Grand Total')         # Loại chiết khấu
        # taxes_and_charges = kwargs.get('taxes_and_charges')                        # Loại thuế

        new_order.customer = validate_not_none(kwargs.customer)                                         
        new_order.set_warehouse = validate_not_none(kwargs.get('set_warehouse'))                            # Kho hàng
        if apply_discount_on is not None:
            new_order.apply_discount_on = validate_choice(configs.discount_type)(apply_discount_on)         # Loại Chiết khấu
            new_order.additional_discount_percentage = discount_percent                                     # Phần trăm chiết khấu

        # if taxes_and_charges != "" and taxes_and_charges is not None:
        #     new_order.taxes_and_charges = taxes_and_charges                                                 # Tax
        #     new_order.append('taxes', get_value_child_doctype('Sales Taxes and Charges Template', taxes_and_charges, 'taxes')[0])

        new_order.checkin_id = kwargs.get('checkin_id')
        new_order.is_return = is_return
        new_order.update_billed_amount_in_delivery_note = update_billed_amount_in_delivery_note

        # Thêm mới sales team
        new_order.append('sales_team', {
            'sales_person': sales_person,
            'allocated_percentage': 100
        })

        # Thêm mới items trong đơn hàng
        items = kwargs.get('items')
        account_heads = {}

        for item_data in items:
            rate = float(item_data.get('rate'))   # Giá item
            discount_percentage = float(item_data.get('discount_percentage', 0))  # Phần trăn chiết khấu của item
            item_tax_template = item_data.get('item_tax_template')
            tax_rate = float(item_data.get('item_tax_rate', 0))

            new_order.append('items', {
                'item_code': item_data.get('item_code'),
                'qty': -item_data.get('qty'),
                'uom': item_data.get('uom'),
                'discount_percentage': discount_percentage,
                'item_tax_template': item_tax_template,
                'item_tax_rate': tax_rate
            })
            item_amount = (rate - rate * discount_percentage / 100) * float(-item_data.get('qty'))
            tax_amount = item_amount * tax_rate / 100
            amount = item_amount + tax_amount 

            if item_tax_template:
                taxes = frappe.get_doc("Item Tax Template", item_tax_template)
                account_head = taxes.taxes[0].tax_type

                if account_head in account_heads:
                    # Cộng dồn giá trị nếu account_head đã tồn tại
                    account_heads[account_head]['tax_amount'] += tax_amount
                    account_heads[account_head]['total'] += amount
                else:
                    # Thêm mới nếu account_head chưa tồn tại
                    account_heads[account_head] = {
                        'charge_type': 'On Net Total',
                        'account_head': account_head,
                        'tax_amount': tax_amount,
                        'total': amount,
                        'rate': 0,
                        'description': 'VAT'
                    }

        if account_heads != {}:
            for tax in account_heads.values():
                new_order.append('taxes', tax)

        # Check dữ liệu mobile bắn lên
        # grand_total = 0     # Tổng tiền đơn hàng
        # total_vat = 0       # Giá vat (VAT)
        # discount_amount = 0

        # Nếu loại chiết khấu là Grand total
        # if apply_discount_on == 'Grand Total':
        #     total_vat = rate_taxes * amount / 100          # VAT = %VAT * X
        #     if discount_percent != 0:
        #         discount_amount = discount_percent * (amount + total_vat) / 100     # CK = %CK * (VAT + X)
        #         grand_total = amount + total_vat - discount_amount         # total = X + VAT - Ck
        #     if discount_percent == 0:
        #         new_order.discount_amount = discount_amount
        #         grand_total = amount + total_vat - discount_amount

        # # Nếu loại chiết khấu là Net total
        # if apply_discount_on == 'Net Total':
        #     if discount_percent != 0:
        #         discount_amount = discount_percent * amount / 100
        #         total_vat = rate_taxes * (amount - discount_amount) / 100
        #         grand_total = amount + total_vat - discount_amount
        #     if discount_percent == 0:
        #         new_order.discount_amount = discount_amount
        #         total_vat = rate_taxes * (amount - discount_amount) / 100
        #         grand_total = amount + total_vat - discount_amount

        # # Nếu không truyền lên chiết khấu
        # if apply_discount_on is None:
        #     total_vat = rate_taxes * amount / 100          # VAT = %VAT * X
        #     grand_total = amount + total_vat
        
        # So sánh với giá bên mobile tính toán
        # if grand_total == float(kwargs.get('grand_total')):
        new_order.insert()
        frappe.db.commit()
        return gen_response(201, "Thành công", {"name": new_order.name})
        # else:
        #     return gen_response(400, "Tổng tiền chưa khớp với tính toán", {"grand_total": grand_total})
    except Exception as e:
        return exception_handle(e)

# Chỉnh sửa phiếu trả hàng
@frappe.whitelist(methods='PUT')
def edit_return_order(name, **kwargs):
    try:
        if frappe.db.exists("Sales Invoice", name, cache=True):
            order = frappe.get_doc('Sales Invoice', name)
            # Kiểm tra trạng thái của phiếu trả hàng có phải draft không
            if order.docstatus == 0:
                discount_percent = kwargs.get('additional_discount_percentage')
                discount_amount = kwargs.get('discount_amount')
                items = kwargs.get('items')
                if items:
                    for item_data in items:
                        discount_percentage = item_data.get('discount_percentage')
                        rate = item_data.get('rate')
                        uom = item_data.get('uom')
                        tax_rate = float(item_data.get('item_tax_rate', 0))
                        item_tax_template = item_data.get('item_tax_template')
                        # Số lượng sản phẩm không thể sửa về 0
                        qty = int(item_data.get('qty', 1))
                        if qty == 0:
                            return gen_response(400, 'Số lượng không thể bằng 0')
                        
                        # Kiểm tra xem sản phẩm đã tồn tại chưa, nếu chưa thì thêm mới
                        existing_item = next((item for item in order.items if item.item_code == item_data.get('item_code')), None)
                        if existing_item:
                            if qty:
                                existing_item.qty = -qty
                            if uom:
                                existing_item.uom = uom
                            if discount_percentage:
                                existing_item.discount_percentage = float(discount_percentage)
                            if rate:
                                existing_item.rate = float(rate)
                            if item_tax_template:
                                existing_item.item_tax_template = item_tax_template
                                existing_item.tax_rate = tax_rate
                        else:
                            order.append('items', {
                                'item_code': item_data.get('item_code'),
                                'qty': -qty,
                                'uom': item_data.get('uom'),
                                'rate': item_data.get('rate'),
                                'discount_percentage': discount_percentage if discount_percentage else 0,
                                'item_tax_template': item_tax_template,
                                'item_tax_rate': tax_rate
                            })

                # Trường hợp chỉnh sửa chiết khấu theo % 
                if discount_percent:
                    order.set('additional_discount_percentage', float(discount_percent))

                # Trường hợp chỉnh sửa chiết khấu theo giá
                if discount_amount:
                    order.set('discount_amount', float(discount_amount))

                order.save()
                return gen_response(200, "Cập nhật thành công")
            else:
                return gen_response(400, "Sửa đơn trả hàng không thành công")
        else:
            return gen_response(406, f"Không tồn tại {name}")
    except Exception as e:
        return exception_handle(e)

# Xóa phiếu trả hàng
@frappe.whitelist(methods='DELETE')
def delete_return_order(name, **kwargs):
    try:
        if frappe.db.exists("Sales Invoice", name, cache=True):
            return_order = frappe.get_doc('Sales Invoice',name)
            if return_order.docstatus == 0:
                frappe.delete_doc('Sales Invoice', name)
                return gen_response(200, "Thành công", [])
            else:
                return gen_response(400, "Xóa đơn trả hàng không thành công")
        else:
            return gen_response(406, f"Không tồn tại {name}")
    except Exception as e:
        exception_handle(e)

# Xóa items trong phiếu trả hàng
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
                return gen_response(200, "Thành công", [])
            else:
                return gen_response(400, "Sửa đơn trả hàng không thành công")
        else:
            return gen_response(406, f"Không tồn tại phiếu trả hàng {name_return_order}")
    except Exception as e:
        exception_handle(e)

# Chi tiết đơn hàng theo checkin_id
@frappe.whitelist(methods='GET')
def get_sale_order_by_checkin_id(doctype, **kwargs):
    try:
        checkin_id = kwargs.get('checkin_id')
        detail_sales_order = frappe.get_value(doctype, {'checkin_id': checkin_id}, 'name')
        if detail_sales_order:
            SalesOrder = frappe.qb.DocType(doctype)
            Customer = frappe.qb.DocType("Customer")
            SalesOrderTaxes = frappe.qb.DocType("Sales Taxes and Charges")
            field_detail_sales = []

            if doctype == "Sales Order":
                SalesOrderItem = frappe.qb.DocType("Sales Order Item")
                field_detail_sales = ['total','grand_total','customer','customer_name','address_display',"delivery_date",'set_warehouse','taxes_and_charges','total_taxes_and_charges','apply_discount_on','additional_discount_percentage','discount_amount','contact_person','rounded_total']
                detail = (frappe.qb.from_(SalesOrder)
                        .inner_join(SalesOrderItem)
                        .on(SalesOrder.name == SalesOrderItem.parent)
                        
                        .inner_join(Customer)
                        .on(Customer.name == SalesOrder.customer)
                        .where(SalesOrder.name == detail_sales_order)
                        .select(
                            Customer.customer_code
                            ,SalesOrder.customer,SalesOrder.customer_name,SalesOrder.address_display,UNIX_TIMESTAMP(SalesOrder.delivery_date).as_('delivery_date'),SalesOrder.set_warehouse,SalesOrder.total,SalesOrder.grand_total
                            ,SalesOrder.taxes_and_charges,SalesOrder.total_taxes_and_charges, SalesOrder.apply_discount_on, SalesOrder.additional_discount_percentage,SalesOrder.discount_amount,SalesOrder.contact_person,SalesOrder.rounded_total
                            ,SalesOrderItem.name, SalesOrderItem.item_name,SalesOrderItem.item_code,SalesOrderItem.qty, SalesOrderItem.uom,SalesOrderItem.amount,SalesOrderItem.discount_amount,SalesOrderItem.discount_percentage                        
                        )
                        ).run(as_dict =1)
                
            if doctype == "Sales Invoice":
                SalesOrderItem = frappe.qb.DocType("Sales Invoice Item")
                field_detail_sales = ['total','grand_total','customer','customer_name','address_display',"posting_date",'set_warehouse','taxes_and_charges','total_taxes_and_charges','apply_discount_on','additional_discount_percentage','discount_amount','contact_person','rounded_total']
                detail = (frappe.qb.from_(SalesOrder)
                        .inner_join(SalesOrderItem)
                        .on(SalesOrder.name == SalesOrderItem.parent)
                        
                        .inner_join(Customer)
                        .on(Customer.name == SalesOrder.customer)
                        .where(SalesOrder.name == detail_sales_order)
                        .select(
                            Customer.customer_code
                            ,SalesOrder.customer,SalesOrder.customer_name,SalesOrder.address_display,UNIX_TIMESTAMP(SalesOrder.posting_date).as_('posting_date'),SalesOrder.set_warehouse,SalesOrder.total,SalesOrder.grand_total
                            ,SalesOrder.taxes_and_charges,SalesOrder.total_taxes_and_charges, SalesOrder.apply_discount_on, SalesOrder.additional_discount_percentage,SalesOrder.discount_amount,SalesOrder.contact_person,SalesOrder.rounded_total
                            ,SalesOrderItem.name, SalesOrderItem.item_name,SalesOrderItem.item_code,SalesOrderItem.qty, SalesOrderItem.uom,SalesOrderItem.amount,SalesOrderItem.discount_amount,SalesOrderItem.discount_percentage                        
                        )
                        ).run(as_dict =1)
                
            detail_taxes = (frappe.qb.from_(SalesOrder)
                            .inner_join(SalesOrderTaxes)
                            .on(SalesOrder.name == SalesOrderTaxes.parent)
                            .where(SalesOrder.name == detail_sales_order)
                            .select(SalesOrderTaxes.tax_amount,SalesOrderTaxes.rate,SalesOrderTaxes.account_head,SalesOrderTaxes.charge_type,)
                            ).run(as_dict =1)
            
            detail_order = {"list_items": []}
            if len(detail) > 0 :
                for key_item, value in detail[0].items() :
                    if key_item in field_detail_sales:  
                        detail_order.setdefault(key_item,value)
                    detail_order['list_items'] = get_items(master_doc=doctype, master_name=detail_sales_order)

            if len(detail_taxes) > 0 :
                detail_order = {**detail_order, **detail_taxes[0]}

            return gen_response(200, "Thành công", detail_order)
        else:
            return gen_response(200, "Thành công", [])
    except Exception as e: 
        exception_handle(e)


def get_items(master_doc, master_name):
    if not master_name:
        return
    master_doc = frappe.get_doc(master_doc, master_name)

    items = master_doc.get('items')

    fields_to_get = ["name", "item_name", "item_code", "rate", "qty", "uom", "amount", "discount_amount", "discount_percentage", "is_free_item", "item_tax_template", "item_tax_rate"]
    result = []

    for item in items:
        item_dict = {}
        for fieldname in fields_to_get:
            item_dict[fieldname] = item.get(fieldname)
        result.append(item_dict)

    return result
