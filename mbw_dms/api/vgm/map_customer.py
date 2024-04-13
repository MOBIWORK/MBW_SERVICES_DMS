import frappe
from mbw_dms.api.common import (
    exception_handle,
    gen_response,
)
import json

@frappe.whitelist(methods='GET')
def get_config_api():
    try:
        api_key = frappe.get_doc('DMS Settings').api_key
        return gen_response(200, 'Thành công', api_key)
    except Exception as e:
        return gen_response(500, "Error")

@frappe.whitelist(methods='GET')
def get_config_map(**kwargs):
    try:
        type_industry = frappe.form_dict.get('type_industry')
        config_map_str = frappe.get_doc('DMS Settings').config_map_by_industry
        config_map = json.loads(config_map_str) if config_map_str else {}
        config_map_by_industry = config_map.get(type_industry, [])
        return gen_response(200, 'Thành công', config_map_by_industry)
    except Exception as e:
        return gen_response(500, "Error", str(e))
    