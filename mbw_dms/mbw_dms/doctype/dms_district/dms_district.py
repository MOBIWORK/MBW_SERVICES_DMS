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

class DMSDistrict(Document):
	pass


# Danh sách quận/huyện
@frappe.whitelist(methods='GET')
def list_district(kwargs):
    try:
        list_districts = frappe.db.get_list('DMS District', filters={'ma_tinh_thanh': validate_not_none(kwargs.get('ma_tinh'),"mã tỉnh")}, fields=['name', 'ma_huyen', 'ten_huyen', 'ma_tinh_thanh'], order_by='ma_huyen asc')
        return gen_response(200, 'Thành công', list_districts)
    except Exception as e:
        return exception_handle(e)
    
@frappe.whitelist(methods="GET", allow_guest=True)
def get_name_district(name):
    return gen_response(200, "Thành công", frappe.db.get_value('DMS District', {"name": name}, 'ten_huyen'))