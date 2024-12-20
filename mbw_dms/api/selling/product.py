import frappe
from frappe import _
import pydash
from mbw_dms.api.common import (
    exception_handle,
    gen_response,
    validate_image,
)
from frappe.utils import cint

# Danh sách sản phẩm
@frappe.whitelist(methods="GET")
def list_product(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        if not frappe.has_permission("Item"):
            frappe.throw(_("Không có quyền"), frappe.PermissionError)

        my_filter = {}
        name = kwargs.get("name")
        key_search = kwargs.get("key_search")
        customer = kwargs.get("customer")
        brand = kwargs.get("brand")
        custom_industry = kwargs.get("industry")
        item_group = kwargs.get("item_group")
        page_size = cint(kwargs.get("page_size", 20))
        page_number = cint(kwargs.get("page_number", 1))
        if page_number <= 0:
            page_number = 1
        warehouse = kwargs.get("warehouse")

        price_lisr_cg = None
        price_list = None
        if customer:
            customers = frappe.get_doc("Customer", customer)
            if customers.get("default_price_list"):
                price_list = customers.default_price_list
            else:
                price_lisr_cg = frappe.get_value("Customer Group", {"name": customers.customer_group}, "default_price_list")
                if price_lisr_cg:
                    price_list = price_lisr_cg
        filter_or = {}
        if name:
            my_filter["name"] = ["like", f'%{name}%']
        if key_search:
            filter_or["item_name"] = ["like", f'%{key_search}%']
            filter_or["item_code"] = ["like", f'%{key_search}%']
        if brand:
            my_filter["brand"] = ["like", f'%{brand}%']
        if custom_industry:
            my_filter["custom_industry"] = ["like", f'%{custom_industry}%']
        if item_group:
            my_filter["item_group"] = ["like", f'%{item_group}%']
        my_filter["is_sales_item"] = 1
        my_filter["disabled"] = 0

        items = frappe.db.get_list("Item", filters=my_filter,or_filters=filter_or,
                                    fields=["name", "item_code", "item_name", "item_group", 
                                            "stock_uom", "min_order_qty", "description",
                                            "brand", "country_of_origin", "image",
                                            "custom_industry", "end_of_life"],
                                    start=page_size * (page_number - 1),
                                    page_length=page_size)
        for item in items:
            item_doc = frappe.get_doc("Item", item.get("name"))
            barcodes = item_doc.barcodes
            images = item_doc.custom_images_item or []

            def return_fiel(value):
                return pydash.pick(value, "link_image")
            
            images_links = pydash.map_(images, return_fiel)
            # item["custom_images_item"] = images_links
            item["barcodes"] = barcodes[0].barcode if len(barcodes) > 0 else ""
            item["barcode_type"] = barcodes[0].barcode_type if len(barcodes) > 0 else ""

            if get_bin_item(warehouse, item.item_code, item.stock_uom):
                item["total_projected_qty"] = get_bin_item(warehouse, item.item_code, item.stock_uom)[0].projected_qty
            else:
                item["total_projected_qty"] = 0

        # Lấy danh sách các sản phẩm mà người dùng có quyền truy cập
        user = frappe.session.user
        list_items = frappe.db.get_list("Item", filters=my_filter, fields=["name", "item_group"])

        # Lấy danh sách các nhóm sản phẩm mà người dùng có quyền truy cập thông qua User Permissions
        user_permissions = frappe.defaults.get_user_permissions(user)
        permitted_item_groups = set()
        permitted_item = set()
        
        if "Item Group" in user_permissions or "Item" in user_permissions:
            if "Item Group" in user_permissions:
                permitted_item_groups = {perm.get("doc") for perm in user_permissions.get("Item Group")}
            if "Item" in user_permissions:
                permitted_item = {perm.get("doc") for perm in user_permissions.get("Item")}

            # Đếm số lượng sản phẩm thỏa mãn quyền truy cập và các bộ lọc
            permitted_items_count = 0
            for item in list_items:
                if item.get("item_group") in permitted_item_groups:
                    permitted_items_count += 1
                if item.get("name") in permitted_item:
                    permitted_items_count += 1
        else:
            permitted_items_count = len( frappe.db.get_list("Item", filters=my_filter,or_filters=filter_or,))

        data_item = []
        default_selling_price_list = frappe.get_doc("Selling Settings").selling_price_list
        for item in items:
            item["image"] = validate_image(item.get("image"))
            item["details"] = frappe.get_all("Item Price", filters={"item_code": item.get('item_code'), "price_list": price_list}, fields=["uom", "price_list", "price_list_rate", "valid_from", "currency"])
            if not price_list and not item["details"]:
                item_price_default = frappe.get_all("Item Price", filters={"item_code": item.get("item_code"), "price_list": default_selling_price_list}, fields=["uom", "price_list", "price_list_rate", "valid_from", "currency"])
                if item_price_default:
                    item["details"] = item_price_default
                else:
                    item["details"] = [{"price_list_rate": 0}]
            
            if price_list and not item["details"]:
                item["details"] = [{"price_list_rate": 0}]

            item["unit"] = frappe.db.get_all("UOM Conversion Detail", {"parent" : item.get("name")}, ["uom", "conversion_factor"])
            item["stock"] = frappe.db.get_all("Stock Entry Detail", {"item_code": item.get("item_code")}, ["t_warehouse", "qty"])
            item["item_tax_template"] = frappe.db.get_all("Item Tax", {"parent": item["name"]}, ["item_tax_template"])
            if item["item_tax_template"]:
                item["rate_tax_item"] = frappe.db.get_value("Item Tax Template Detail", {"parent": item["item_tax_template"][0].item_tax_template}, ["tax_rate"])
            else:
                item["rate_tax_item"] = 0
            if item["details"]:
                data_item.append(item)

        return gen_response(200, "Thành công", {
            "data": data_item,
            "total": permitted_items_count,
            "page_size": page_size,
            "page_number": page_number
        })

    except Exception as e:
        return exception_handle(e)


# Danh sách sản phẩm trưng bày
@frappe.whitelist(methods="GET")
def list_product_campaign(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        if not frappe.has_permission("Item"):
            frappe.throw(_("Không có quyền"), frappe.PermissionError)

        my_filter = {}
        filter_or = {}
        name = kwargs.get("name")
        key_search = kwargs.get("key_search")
        brand = kwargs.get("brand")
        custom_industry = kwargs.get("industry")
        item_group = kwargs.get("item_group")
        page_size =  cint(kwargs.get("page_size", 20))
        page_number = cint(kwargs.get("page_number", 1))
        if page_number <= 0:
            page_number = 1

        default_price_list = frappe.get_doc("Selling Settings").selling_price_list

        if name:
            my_filter["name"] = ["like", f'%{name}%']
        if key_search:
            filter_or["item_name"] = ["like", f'%{key_search}%']
            filter_or["item_code"] = ["like", f'%{key_search}%']
        if brand:
            my_filter["brand"] = ["like", f'%{brand}%']
        if custom_industry:
            my_filter["custom_industry"] = ["like", f'%{custom_industry}%']
        if item_group:
            my_filter["item_group"] = ["like", f'%{item_group}%']
        my_filter["is_sales_item"] = 1
        my_filter["disabled"] = 0

        items = frappe.db.get_list("Item",
                                    filters=my_filter, or_filters=filter_or,
                                    fields=["name", "item_code", "item_name", "item_group", 
                                            "stock_uom", "min_order_qty", "description",
                                            "brand", "country_of_origin", "image",
                                            "custom_industry", "end_of_life", "total_projected_qty"],
                                    start=page_size * (page_number - 1),
                                    page_length=page_size)
        
        for item in items:
            item_doc = frappe.get_doc("Item", item.get("name"))
            barcodes = item_doc.barcodes
            images = item_doc.custom_images_item or []
            def return_fiel(value):
                return pydash.pick(value, "link_image")
            
            images_links = pydash.map_(images, return_fiel)
            item["custom_images_item"] = images_links
            item["barcodes"] = barcodes[0].barcode if len(barcodes) > 0 else ""
            item["barcode_type"] = barcodes[0].barcode_type if len(barcodes) > 0 else ""

        # Lấy danh sách các sản phẩm mà người dùng có quyền truy cập
        user = frappe.session.user
        list_items = frappe.db.get_list("Item", filters=my_filter, fields=["name", "item_group"])

        # Lấy danh sách các nhóm sản phẩm mà người dùng có quyền truy cập thông qua User Permissions
        user_permissions = frappe.defaults.get_user_permissions(user)
        permitted_item_groups = set()
        permitted_item = set()
        
        if "Item Group" in user_permissions or "Item" in user_permissions:
            if "Item Group" in user_permissions:
                permitted_item_groups = {perm.get("doc") for perm in user_permissions.get("Item Group")}
            if "Item" in user_permissions:
                permitted_item = {perm.get("doc") for perm in user_permissions.get("Item")}

            # Đếm số lượng sản phẩm thỏa mãn quyền truy cập và các bộ lọc
            permitted_items_count = 0
            for item in list_items:
                if item.get("item_group") in permitted_item_groups:
                    permitted_items_count += 1
                if item.get("name") in permitted_item:
                    permitted_items_count += 1
        else:
            permitted_items_count = len(frappe.db.get_list("Item", filters=my_filter, or_filters=filter_or))

        data_item = []
        for item in items:
            item["image"] = validate_image(item.get("image"))
            item["details"] = frappe.get_all("Item Price", filters={"item_code": item.get("item_code"), "price_list": default_price_list}, fields=["uom", "price_list", "price_list_rate", "valid_from", "currency"])
            item["unit"] = frappe.db.get_all("UOM Conversion Detail", {"parent" : item.get("name")}, ["uom", "conversion_factor"])
            item["stock"] = frappe.db.get_all("Bin", {"item_code": item.get("item_code")}, ["warehouse as t_warehouse", "stock_uom", "projected_qty as qty"])
            data_item.append(item)

        return gen_response(200, "Thành công", {
            "data": data_item,
            "total": permitted_items_count,
            "page_size": page_size,
            "page_number": page_number
        })

    except Exception as e:
        return exception_handle(e)

      
#list brand
@frappe.whitelist(methods="GET")
def list_brand():
    try:
        brand = frappe.db.get_list("Brand", fields=["name", "brand", "description"])
        return gen_response(200, "Thành công", brand)
    except Exception as e:
        return exception_handle(e)
    
#list Industry
@frappe.whitelist(methods="GET")
def list_industry():
    try:
        industry = frappe.db.get_list("Industry Type", fields=["name", "industry"],ignore_permissions=True)
        return gen_response(200, "Thành công", industry)
    except Exception as e:
        return exception_handle(e)
    
#list item group
@frappe.whitelist(methods="GET")
def list_item_group():
    try:
        item_group = frappe.db.get_list("Item Group", fields=["name", "item_group_name", "parent_item_group"])
        return gen_response(200, "Thành công", item_group)
    except Exception as e:
        return exception_handle(e)
    
# List UOM
@frappe.whitelist(methods="GET")
def list_uom(**kwargs):
    try:
        kwargs=frappe._dict(kwargs)
        uom_filter = {}
        name = kwargs.get("name")
        if name:
            uom_filter["name"] = ["like", f"%{name}%"]
        list_uom = frappe.db.get_list("UOM", filters=uom_filter, fields=["name", "uom_name"])
        return gen_response(200, "Thành công", list_uom)
    except Exception as e:
        return exception_handle(e)
    
# List warehouse
@frappe.whitelist(methods="GET")
def list_warehouse(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        warehouse_filter = {}
        name = kwargs.get("name")
        company = kwargs.get("company")
        if name:
            warehouse_filter["name"] = ["like", f"%{name}%"]
        warehouse_filter["company"] = company
        list_warehouse = frappe.db.get_list("Warehouse", filters=warehouse_filter, fields=["name", "warehouse_name"])
        return gen_response(200, "Thành công", list_warehouse)
    except Exception as e:
        return exception_handle(e)
    
# List VAT
@frappe.whitelist(methods="GET")
def list_vat(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        title = kwargs.get("title") if kwargs.get("title") else ""
        company = kwargs.get("company") if kwargs.get("company") else ""
        Taxes = frappe.qb.DocType("Sales Taxes and Charges Template")
        TaxesCharges = frappe.qb.DocType("Sales Taxes and Charges")
        
        detail_taxes = (frappe.qb.from_(Taxes)
                            .inner_join(TaxesCharges)
                            .on(Taxes.name == TaxesCharges.parent)
                            .where(Taxes.name.like(f"%{title}%") and Taxes.company == company)
                            .select(Taxes.name, Taxes.title, TaxesCharges.account_head, TaxesCharges.rate, TaxesCharges.charge_type)
                            ).run(as_dict =1)
        return gen_response(200, "Thành công", detail_taxes)
    except Exception as e:
        return exception_handle(e)
    
def get_bin_item(warehouse, item_code, item_uom):
    bin = frappe.qb.DocType("Bin")
    query = (
		frappe.qb.from_(bin)
		.select(
			bin.projected_qty,
		)
		.orderby(bin.warehouse)
	)

    if warehouse:
        query = query.where(bin.warehouse == warehouse)

    if item_code:
        query = query.where(bin.item_code == item_code)
    if item_uom:
        query = query.where(bin.stock_uom == item_uom)
    bin_list = query.run(as_dict=True)

    return bin_list