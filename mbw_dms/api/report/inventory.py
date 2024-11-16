import frappe
from datetime import datetime
from mbw_dms.mbw_dms.doctype.dms_inventory.dms_inventory import find, find_v2

from mbw_dms.api.common import gen_response, exception_handle, CommonHandle
from frappe import _

# Báo cáo tồn kho
@frappe.whitelist(methods="GET",allow_guest=True)
def get_customer_inventory(**body):
    try:
        # Phân trang
        page_size = int(body.get("page_size")) if body.get("page_size") and int(body.get("page_size")) >= 20 else 20
        page_number = int(body.get("page_number")) if body.get("page_number") and int(body.get("page_number")) >= 1 else 1

        # Sản phẩm
        expire_from = body.get("expire_from")
        expire_to = body.get("expire_to")
        update_at_from = body.get("update_at_from")
        update_at_to = body.get("update_at_to")
        item_code = body.get("item_code")

        # Lấy theo đơn vị tính sản phẩm
        unit_product = body.get("unit_product")

        # Nhân viên
        employee_sale = body.get("employee_sale")

        # Số lượng sp khách hàng đang tồn, tổng giá trị các sp đang tồn
        qty_inven_from = body.get("qty_inven_from")
        qty_inven_to = body.get("qty_inven_to")
        total_from = body.get("total_from")
        total_to = body.get("total_to")

        # Bộ lọc khách hàng
        customer = body.get("customer")
        message = ""
        query = ""

        # Tạo filter
        filters = []

        if employee_sale:
            filters.append(["create_by", "=", employee_sale])
            query = CommonHandle.buildQuery(query, f"di.create_by = '{employee_sale}'")

        if item_code:
            filters.append(["item_code", "=", item_code])
            query = CommonHandle.buildQuery(query, f"dii.item_code = '{item_code}'")

        if expire_from:
            expire_from = datetime.fromtimestamp(float(expire_from)).date()
            filters.append(["exp_time", ">=", expire_from])
            query = CommonHandle.buildQuery(query, f"dii.exp_time >= '{expire_from}'")

        if expire_to:
            expire_to = datetime.fromtimestamp(float(expire_to)).date()
            filters.append(["exp_time", "<=", expire_to])
            query = CommonHandle.buildQuery(query, f"dii.exp_time <= '{expire_to}'")
       
        if update_at_from:
            update_at_from = datetime.fromtimestamp(float(update_at_from)).date()
            filters.append(["update_at", ">=", update_at_from])
            query = CommonHandle.buildQuery(query, f"dii.update_at >= '{update_at_from}'")

        if update_at_to:
            update_at_to = datetime.fromtimestamp(float(update_at_to)).date()
            filters.append(["update_at", "<=", update_at_to])
            query = CommonHandle.buildQuery(query, f"dii.update_at <= '{update_at_to}'")
        
        if unit_product:
            filters.append(["item_unit", "=", unit_product])
            query = CommonHandle.buildQuery(query, f"dii.item_unit = '{unit_product}'")

        if qty_inven_from:
            filters.append(["total_qty", ">=", float(qty_inven_from)])
            query = CommonHandle.buildQuery(query, f"dii.total_qty >= '{qty_inven_from}'")

        if qty_inven_to:
            filters.append(["total_qty", "<=", float(qty_inven_to)])
            query = CommonHandle.buildQuery(query, f"dii.total_qty <= '{qty_inven_to}'")
        
        if total_from:
            filters.append(["total_cost", ">=", float(total_from)])
            query = CommonHandle.buildQuery(query, f"dii.total_cost >= '{total_from}'")

        if total_to:
            filters.append(["total_cost", "<=", float(total_to)])
            query = CommonHandle.buildQuery(query, f"dii.total_cost <= '{total_to}'")
       
        if customer:
            customer_code = frappe.db.get_value("Customer", customer, ["customer_code"], as_dict=1)
            if customer_code:                
                filters.append(["customer_code", "=", customer_code.get("customer_code")])
                customer = customer_code.get("customer_code")
                query = CommonHandle.buildQuery(query, f"di.customer_code = '{customer}'")
            else :
                message = _("Customer not have Code")
        options= ["*"]
        return gen_response(200, message, find_v2(where=query, page=page_number, page_length=page_size))

    except Exception as e:
        return exception_handle(e)