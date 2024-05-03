# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _

from mbw_dms.api.common import (
    exception_handle,
    gen_response,
)

class DMSProvince(Document):
    pass

# Danh sánh tỉnh/thành phố
@frappe.whitelist(methods='GET')
def list_province():
    try:
        list_provinces = frappe.db.get_list('DMS Province', fields=['name', 'ma_tinh', 'ten_tinh'], order_by='ma_tinh asc')
        return gen_response(200, "Thành công", list_provinces)
    except Exception as e:
        return exception_handle(e)
    
# Lấy id tỉnh thành
@frappe.whitelist(methods='GET')
def get_id_location(kwargs):
    try:
        province_name = kwargs.get("province_name")
        province_id = frappe.get_value("DMS Province", {"ten_tinh": ["like", f"%{province_name}%"]}, "name")

        district_name = kwargs.get("district_name")
        district_id = frappe.get_value("DMS District", {"ten_huyen": ["like", f"%{district_name}%"]}, "name")

        ward_name = kwargs.get("ward_name")
        ward_id = frappe.get_value("DMS Ward", {"ten_xa": ["like", f"%{ward_name}%"]}, "name")

        return gen_response(200, "Thành công", {
            "province_id": province_id,
            "district_id": district_id,
            "ward_id": ward_id    
        })
    except Exception as e:
        return exception_handle(e)
    
@frappe.whitelist(methods="GET", allow_guest=True)
def get_name_city(name):
    return gen_response(200, "Thành công", frappe.db.get_value('DMS Province', {"name": name}, 'ten_tinh'))

