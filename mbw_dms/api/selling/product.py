import frappe
from frappe import _
import json
from datetime import datetime
from pypika import  Order, CustomFunction

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    validate_image
)
from mbw_dms.config_translate import i18n

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
                                   fields=["name", "item_code", "item_name", "item_group", "stock_uom","min_order_qty", "description", "brand", "country_of_origin", "image", "custom_industry"],
                                   start=page_size*(page_number-1), 
                                   page_length=page_size)
        count = len( frappe.db.get_list("Item",filters= my_filter,))
        for item in items:
            item['image'] = validate_image(item.get("image"))
            item['detail'] = frappe.db.get_value('Item Price', {"item_code" : item.get('item_code')}, ['uom', 'price_list_rate', 'valid_from', 'currency'],as_dict=1)
            item['unit'] = frappe.db.get_all("UOM Conversion Detail", {"parent" : item.get('name')}, ['uom', 'conversion_factor'])
            item['stock'] = frappe.db.get_all("Stock Entry Detail", {"item_code" : item.get('item_code')}, ['t_warehouse', 'qty'])
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