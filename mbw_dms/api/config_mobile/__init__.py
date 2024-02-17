import frappe

# Config Mobile
@frappe.whitelist()
def get_list_config_mobile():
    from mbw_dms.mbw_dms.doctype.dms_config_mobile.dms_config_mobile import get_list_config_mobile
    return get_list_config_mobile()