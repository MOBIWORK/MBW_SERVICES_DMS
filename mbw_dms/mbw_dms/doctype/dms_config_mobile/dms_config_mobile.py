# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from mbw_dms.api.common import exception_handel, gen_response

class DMSConfigMobile(Document):
    def on_update(self):
        frappe.cache.delete_value('website-config')

@frappe.whitelist(methods='GET')
def get_list_config_mobile():
    try:
        list_configs = frappe.cache.get_value("website-config")
        if list_configs == None:
            list_configs = frappe.get_doc('DMS Config Mobile', 'DMS Config Mobile')
            frappe.cache.set_value("website-config", list_configs)
        return gen_response(200, 'Thành công', list_configs)
    except Exception as e:
        return exception_handel(e)
