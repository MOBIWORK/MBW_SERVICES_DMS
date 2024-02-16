# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
)

class DMSProvince(Document):
	pass

# Danh sánh tỉnh/thành phố
@frappe.whitelist(methods='GET')
def list_province(**kwargs):
    try:
        list_provinces = frappe.db.get_list('DMS Province', fields=['name', 'ma_tinh', 'ten_tinh'], order_by='ma_tinh asc')
        return gen_response(200, 'Thành công', list_provinces)
    except Exception as e:
        return exception_handel(e)
    
@frappe.whitelist(methods="GET", allow_guest=True)
def get_name_city(name):
    return gen_response(200,"",frappe.db.get_value(doctype='DMS Province',filters={"name":name},fieldname=['ten_tinh']))

