import frappe
from mbw_service_v2.utils import CONFIG_GEO_ADDRESS, CONFIG_GEO_LOCATION
import requests
from mbw_dms.api.common import (
    gen_response,
    get_language,
    exception_handel
)
import json
from mbw_dms.config_translate import i18n


@frappe.whitelist(methods="GET", allow_guest=True)
def get_name_city(name):
    return gen_response(200,"",frappe.db.get_value(doctype='DMS Province',filters={"name":name},fieldname=['ten_tinh']))

@frappe.whitelist(methods="GET", allow_guest=True)
def get_name_district(name):
    return gen_response(200,"",frappe.db.get_value(doctype='DMS District',filters={"name":name},fieldname=['ten_huyen']))

@frappe.whitelist(methods="GET", allow_guest=True)
def get_name_ward(name):
    return gen_response(200,"",frappe.db.get_value(doctype='DMS Ward',filters={"name":name},fieldname=['ten_xa']))