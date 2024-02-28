import frappe
from mbw_dms.mbw_dms.doctype.dms_inventory import find

from mbw_dms.api.common import gen_response ,exception_handel


@frappe.whitelist(methods="GET")
def get_customer_inventory(**boby):
    try:
        #phan trang
        page_size = boby.get("page_size") if boby.get("page_size") or boby.get("page_size") >=20 else 20
        page_number = boby.get("page_number") if boby.get("page_number") or boby.get("page_number") >=1 else 1
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
        total_to = boby.get("total_to")\
        #tao filter
        filters = {}
        
    except Exception as e:
        return exception_handel(e)