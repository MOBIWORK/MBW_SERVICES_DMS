import frappe

# Config Mobile
@frappe.whitelist()
def get_list_config():
    from mbw_dms.mbw_dms.doctype.dms_settings.dms_settings import get_list_config
    return get_list_config()