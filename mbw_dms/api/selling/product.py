import frappe
from frappe import _

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    validate_image,
    get_value_child_doctype
)

#list product
@frappe.whitelist(methods='GET')
def list_product(**kwargs):
    try:
        kwargs=frappe._dict(kwargs)
        if not frappe.has_permission("Item"):
            frappe.throw(_("Not permitted"), frappe.PermissionError)
        my_filter = {}
        name = kwargs.get('name')
        name_item = kwargs.get('item_name')
        brand = kwargs.get('brand')
        custom_industry = kwargs.get("industry")
        item_group = kwargs.get("item_group")
        page_size = 20 if not kwargs.get(
            'page_size') else int(kwargs.get('page_size'))

        page_number = 1 if not kwargs.get('page') or int(
            kwargs.get('page')) <= 0 else int(kwargs.get('page'))
        if name:
            my_filter["name"] = ['like', f'%{name}%']
        if name_item:
            my_filter["item_name"] = ['like', f'%{name_item}%']
        if brand:
            my_filter["brand"] = ['like', f'%{brand}%']
        if custom_industry:
            my_filter["custom_industry"] = ['like', f'%{custom_industry}%']
        if item_group:
            my_filter["item_group"] = ['like', f'%{item_group}%']
        items = frappe.db.get_list("Item",
                                   filters= my_filter,
                                   fields=["name", "item_code", "item_name", "item_group", "stock_uom","min_order_qty", "description", "brand", "country_of_origin", "image", "custom_industry", "end_of_life"],
                                   start=page_size*(page_number-1), 
                                   page_length=page_size)
        count = len( frappe.db.get_list("Item",filters= my_filter,))
        for item in items:
            item['image'] = validate_image(item.get("image"))
            item['detail'] = frappe.db.get_value('Item Price', {"item_code" : item.get('item_code')}, ['uom', 'price_list_rate', 'valid_from', 'currency'],as_dict=1)
            item['unit'] = frappe.db.get_all("UOM Conversion Detail", {"parent" : item.get('name')}, ['uom', 'conversion_factor'])
            item['stock'] = frappe.db.get_all("Stock Entry Detail", {"item_code" : item.get('item_code')}, ['t_warehouse', 'qty'])
            item['discount_percentage'] = frappe.db.get_all("Pricing Rule", {"item_code": item.get('item_code')}, ['priority', 'discount_percentage'])
        return gen_response(200, 'Thành công', {
            "data": items,
            "total": count,
            "page_size": page_size,
            "page_number": page_number
        })
    except Exception as e:
        return exception_handel(e)
    
#list brand
@frappe.whitelist(methods="GET")
def list_brand():
    try:
        brand = frappe.db.get_list('Brand', fields=["name", "brand", "description"])
        gen_response(200, "Thành công", brand)
    except Exception as e:
        return exception_handel(e)
    
#list Industry
@frappe.whitelist(methods="GET")
def list_industry():
    try:
        industry = frappe.db.get_list('Industry Type', fields=["name", "industry"],ignore_permissions=True)
        gen_response(200, "Thành công", industry)
    except Exception as e:
        return exception_handel(e)
    
#list item group
@frappe.whitelist(methods="GET")
def list_item_group():
    try:
        item_group = frappe.db.get_list('Item Group', fields=["name", "item_group_name", "parent_item_group"])
        gen_response(200, "Thành công", item_group)
    except Exception as e:
        return exception_handel(e)
    
# List UOM
@frappe.whitelist(methods='GET')
def list_uom(**kwargs):
    try:
        kwargs=frappe._dict(kwargs)
        uom_filter = {}
        name = kwargs.get('name')
        if name:
            uom_filter["name"] = ['like', f'%{name}%']
        list_uom = frappe.db.get_list('UOM', filters=uom_filter, fields=['name', 'uom_name'])
        gen_response(200, "Thành công", list_uom)
    except Exception as e:
        return exception_handel(e)
    
# List warehouse
@frappe.whitelist(methods='GET')
def list_warehouse(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        warehouse_filter = {}
        name = kwargs.get('name')
        if name:
            warehouse_filter['name'] = ['like', f'%{name}%']
        list_warehouse = frappe.db.get_list('Warehouse', filters=warehouse_filter, fields=['name', 'warehouse_name'])
        gen_response(200, 'Thành công', list_warehouse)
    except Exception as e:
        return exception_handel(e)
    
# List VAT
@frappe.whitelist(methods='GET')
def list_vat(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        title = kwargs.get('title') if kwargs.get('title') else ''
        Taxes = frappe.qb.DocType("Sales Taxes and Charges Template")
        TaxesCharges = frappe.qb.DocType("Sales Taxes and Charges")
        detail_taxes = (frappe.qb.from_(Taxes)
                            .inner_join(TaxesCharges)
                            .on(Taxes.name == TaxesCharges.parent)
                            .where(Taxes.name.like(f"%{title}%"))
                            .select(Taxes.name, Taxes.title, TaxesCharges.account_head, TaxesCharges.rate, TaxesCharges.charge_type)
                            ).run(as_dict =1)
        gen_response(200, 'Thành công', detail_taxes)
    except Exception as e:
        return exception_handel(e)
    
@frappe.whitelist(methods='PUT')
def update_item(name, item_code, **kwargs):
    try:
        sales_order = frappe.get_doc('Sales Order', name)

        # Update items
        item_row = sales_order.get("items", {"item_code": item_code})
        for item in item_row:
            item.qty = kwargs.get("qty")
            item.uom = kwargs.get("uom")
        sales_order.save()
        gen_response(200, 'Thành công')
    except Exception as e:
        return exception_handel(e)
    
@frappe.whitelist(methods='DELETE')
def delete_item(name_order, name):
    try:
        frappe.delete_doc('Sales Order Item',name)
        gen_response(200, "ok",[])
    except Exception as e:
        exception_handel(e)

@frappe.whitelist(methods='GET')
def list_promotional_products(**kwargs):
    try:
        # promotional_products = frappe.db.get_list('Pricing Rule', fields=['name', 'title', 'apply_on', 'price_or_product_discount', 'warehouse', 'selling', 'buying', 'min_qty', 'max_qty', 'min_amt', 'max_amt', 'valid_from', 
        #                                                                   'company', 'currency', 'rate_or_discount', 'apply_discount_on', 'rate', 'discount_percentage', 'discount_amount'])
        promotional_products = frappe.db.get_list('Pricing Rule', fields=['*'])
        for i in promotional_products:
            i['items'] = get_value_child_doctype('Pricing Rule', i['name'], 'items')
        return gen_response(200, 'Thành công', promotional_products)
    except Exception as e:
        return exception_handel(e)
        