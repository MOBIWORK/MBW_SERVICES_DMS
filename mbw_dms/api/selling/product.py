import frappe
from frappe import _
import pydash
from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    validate_image,
)

#list product
@frappe.whitelist(methods='GET')
def list_product(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        if not frappe.has_permission("Item"):
            frappe.throw(_("Không có quyền"), frappe.PermissionError)

        my_filter = {}
        name = kwargs.get('name')
        name_item = kwargs.get('item_name')
        brand = kwargs.get('brand')
        custom_industry = kwargs.get("industry")
        item_group = kwargs.get("item_group")
        page_size = kwargs.get('page_size', 20)
        page_number = 1 if not kwargs.get('page') or int(kwargs.get('page')) <= 0 else int(kwargs.get('page'))

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
                                   filters=my_filter,
                                   fields=[
                                            "name",
                                            "item_code", "item_name", "item_group", 
                                            "stock_uom", "min_order_qty", "description",
                                            "brand", "country_of_origin", "image",
                                            "custom_industry", "end_of_life"],
                                   start=page_size * (page_number - 1),
                                   page_length=page_size)
        for item in items:
            item_doc = frappe.get_doc("Item",item.get("name"))
            images = item_doc.custom_images_item or []
            def return_fiel(value):
                return pydash.pick(value,"link_image")
            images_links = pydash.map_(images,return_fiel)
            item["custom_images_item"] = images_links
        count = len(frappe.db.get_list("Item",filters=my_filter))
        for item in items:
            item['image'] = validate_image(item.get("image"))
            item['details'] = frappe.get_all("Item Price", filters={"item_code": item.get('item_code')}, fields=['uom', 'price_list_rate', 'valid_from', 'currency'])
            item['unit'] = frappe.db.get_all("UOM Conversion Detail", {"parent" : item.get('name')}, ['uom', 'conversion_factor'])
            item['stock'] = frappe.db.get_all("Stock Entry Detail", {"item_code": item.get('item_code')}, ['t_warehouse', 'qty'])

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
        return gen_response(200, "Thành công", brand)
    except Exception as e:
        return exception_handel(e)
    
#list Industry
@frappe.whitelist(methods="GET")
def list_industry():
    try:
        industry = frappe.db.get_list('Industry Type', fields=["name", "industry"],ignore_permissions=True)
        return gen_response(200, "Thành công", industry)
    except Exception as e:
        return exception_handel(e)
    
#list item group
@frappe.whitelist(methods="GET")
def list_item_group():
    try:
        item_group = frappe.db.get_list('Item Group', fields=["name", "item_group_name", "parent_item_group"])
        return gen_response(200, "Thành công", item_group)
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
        return gen_response(200, "Thành công", list_uom)
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
        return gen_response(200, 'Thành công', list_warehouse)
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
        return gen_response(200, 'Thành công', detail_taxes)
    except Exception as e:
        return exception_handel(e)
    