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
    def on_update(self):
        frappe.cache.delete_value('vn-province')

# Danh sánh tỉnh/thành phố
@frappe.whitelist(methods='GET')
def list_province():
    try:
        list_provinces = frappe.cache().get_value("vn-province")
        if list_provinces == None:
            list_provinces = frappe.db.get_list('DMS Province', fields=['name', 'ma_tinh', 'ten_tinh'], order_by='ma_tinh asc')
            frappe.cache().set_value("vn-province", list_provinces)
        return gen_response(200, 'Thành công', list_provinces)
    except Exception as e:
        return exception_handle(e)
    
@frappe.whitelist(methods="GET", allow_guest=True)
def get_name_city(name):
    return gen_response(200,"",frappe.db.get_value(doctype='DMS Province',filters={"name":name},fieldname=['ten_tinh']))

