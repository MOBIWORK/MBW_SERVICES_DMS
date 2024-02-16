# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from mbw_dms.api.common import exception_handel, gen_response

class DMSConfigMobile(Document):
	pass

@frappe.whitelist(methods='GET')
def get_list_config_mobile(**kwargs):
    try:
        list_configs = frappe.get_doc('DMS Config Mobile', 'DMS Config Mobile')
        gen_response(200, 'Thành công', list_configs)
    except Exception as e:
        return exception_handel(e)
