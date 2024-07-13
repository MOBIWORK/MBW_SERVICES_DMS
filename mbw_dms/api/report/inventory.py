import frappe
from datetime import datetime
from mbw_dms.mbw_dms.doctype.dms_inventory.dms_inventory import find

from mbw_dms.api.common import gen_response ,exception_handle
from frappe import _

# Báo cáo tồn kho
@frappe.whitelist(methods="GET",allow_guest=True)
def get_customer_inventory(**body):
    try:
        # phan trang
        page_size = int(body.get("page_size")) if body.get("page_size") and int(body.get("page_size")) >= 20 else 20
        page_number = int(body.get("page_number")) if body.get("page_number") and int(body.get("page_number")) >=1 else 1
        # san pham
        expire_from = body.get("expire_from")
        expire_to = body.get("expire_to")
        update_at_from = body.get("update_at_from")
        update_at_to = body.get("update_at_to")
        item_code = body.get("item_code")
        # lay theo don vi tinh sp
        unit_product = body.get("unit_product")
        # nhan vien
        employee_sale = body.get("employee_sale")
        # nang cao: so luong sp khach hang dang ton, tong gia tri cac sp dang ton
        qty_inven_from = body.get("qty_inven_from")
        qty_inven_to = body.get("qty_inven_to")
        total_from = body.get("total_from")
        total_to = body.get("total_to")

        # Bộ lọc khách hàng
        customer = body.get("customer")
        # lọc nhân viên
        employee = body.get("employee")
        message = ""
        # tao filter
        filters = {}
        if employee_sale:
            filters.update({"create_by": employee_sale})
        if item_code:
            filters.update({"item_code": item_code})
        if expire_from:
            expire_from = datetime.fromtimestamp(float(expire_from)).date()
            filters.update({"exp_time": [">=",expire_from]})
        if expire_to:
            expire_to = datetime.fromtimestamp(float(expire_to)).date()
            filters.update({"exp_time": ["<=",expire_to]})
        if expire_from and expire_to:
            filters.update({"exp_time": ["between",[expire_from,expire_to]]})
        if update_at_from:
            update_at_from = datetime.fromtimestamp(float(update_at_from)).date()
            filters.update({"update_at": [">=",update_at_from]})
        if update_at_to:
            update_at_to = datetime.fromtimestamp(float(update_at_to)).date()
            filters.update({"update_at": ["<=",update_at_to]})
        if update_at_from and update_at_to: 
            filters.update({"update_at": ["between",[update_at_from,update_at_to]]})
        if unit_product:
            filters.update({"item_unit" : unit_product})
        if qty_inven_from:
            filters.update({"total_qty": [">=", float(qty_inven_from)]})
        if qty_inven_to:
            filters.update({"total_qty": ["<=", float(qty_inven_to)]})
        # if qty_inven_from and qty_inven_to: 
        #     filters.update({"total_qty": ["between",[qty_inven_from,qty_inven_to]]})
        if total_from:
            filters.update({"total_cost": [">=", float(total_from)]})
        if total_to:
            filters.update({"total_cost": ["<=", float(total_to)]})
        # if total_from and total_to: 
        #     filters.update({"total_cost": ["between",[float(total_from),float(total_to)]]})
        if customer:
            customer_code = frappe.db.get_value("Customer",customer,["customer_code"],as_dict=1)
            if customer_code:                
                filters.update({"customer_code": customer_code.get("customer_code")})
            else :
                message= _("Custoemr not have Code")
        if employee:
           filters.update({"create_by": employee})
        print("filters",filters)
        return gen_response(200,message,find(filters=filters, page_length=page_size,page=page_number,data= {
            "expire_from" :expire_from,
            "expire_to":expire_to,
            "update_at_from" :update_at_from,
            "update_at_to":update_at_to,
            "item_unit": unit_product,
            "item_code": item_code
        }))
    except Exception as e:
        return exception_handle(e)