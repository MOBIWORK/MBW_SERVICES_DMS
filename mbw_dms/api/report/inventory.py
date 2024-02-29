import frappe
from datetime import datetime
from mbw_dms.mbw_dms.doctype.dms_inventory.dms_inventory import find

from mbw_dms.api.common import gen_response ,exception_handel


@frappe.whitelist(methods="GET")
def get_customer_inventory(**boby):
    try:
        #phan trang
        page_size = boby.get("page_size") if boby.get("page_size") and boby.get("page_size") >= 20 else 20
        page_number = boby.get("page_number") if boby.get("page_number") and boby.get("page_number") >=1 else 1
        #san pham
        expire_from = boby.get("expire_from")
        expire_to = boby.get("expire_to")
        ## lay theo don vi tinh sp
        unit_product = boby.get("unit_product")
        #nhan vien
        employee_sale = boby.get("employee_sale")
        # nang cao: so luong sp khach hang dang ton, tong gia tri cac sp dang ton
        qty_inven_from = boby.get("qty_inven_from")
        qty_inven_to = boby.get("qty_inven_to")
        total_from = boby.get("total_from")
        total_to = boby.get("total_to")
        #tao filter
        filters = {}
        if employee_sale:
            filters.update({"create_by": employee_sale})
        if expire_from:
            expire_from = datetime.fromtimestamp(float(expire_from)).date()
            filters.update({"exp_time": [">=",expire_from]})
        if expire_to:
            expire_to = datetime.fromtimestamp(float(expire_to)).date()
            filters.update({"exp_time": ["<=",expire_to]})
        if unit_product:
            filters.update({"item_unit" : unit_product})
        if qty_inven_from:
            filters.update({"total_qty": [">=", float(qty_inven_from)]})
        if qty_inven_to:
            filters.update({"total_qty": ["<=", float(qty_inven_to)]})
        if total_from:
            filters.update({"total_qty": [">=", float(total_from)]})
        if total_to:
            filters.update({"total_qty": ["<=", float(total_to)]})
        return gen_response(200,"",find(filters=filters, page_length=page_size,page=page_number,data= {
            "expire_from" :expire_from,
            "expire_to":expire_to,
            "item_unit": unit_product
        }))
    except Exception as e:
        print(e)
        return exception_handel(e)