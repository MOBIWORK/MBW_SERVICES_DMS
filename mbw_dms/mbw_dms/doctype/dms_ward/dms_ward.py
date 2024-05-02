# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _

from mbw_dms.api.common import (
    exception_handle,
    gen_response,
)
from mbw_dms.api.validators import validate_not_none

class DMSWard(Document):
	pass


# Danh sách phường/xã
@frappe.whitelist(methods='GET')
def list_ward(kwargs):
    try:
        list_wards = frappe.db.get_list('DMS Ward', filters={'ma_quan_huyen': validate_not_none(kwargs.get('ma_quan_huyen'))}, fields=['name', 'ma_xa', 'ten_xa', 'ma_quan_huyen'], order_by='ma_xa asc')
        return gen_response(200, 'Thành công', list_wards)
    except Exception as e:
        return exception_handle(e) 
    
# Lấy id phường xã
@frappe.whitelist(methods='GET')
def get_id_ward(kwargs):
    try:
        ward_name = kwargs.get("ward_name")
        ward_id = frappe.get_value("DMS Ward", {"ten_xa": ["like", f"%{ward_name}%"]}, "name")
        return gen_response(200, "Thành công", {"ward_id": ward_id})
    except Exception as e:
        return exception_handle(e)
    
@frappe.whitelist(methods="GET", allow_guest=True)
def get_name_ward(name):
    return gen_response(200, "Thành công", frappe.db.get_value('DMS Ward', {"name": name}, 'ten_xa'))