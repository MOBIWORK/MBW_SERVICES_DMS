import frappe
from mbw_dms.api.common import exception_handel, gen_response


@frappe.whitelist(methods='GET')
def get_list_config_mobile(**kwargs):
    try:
        list_configs = frappe.db.get_list('DMS Config Mobile', fields=["name", "config_name", "vt_ngoaituyen", "kb_vitringoaisaiso", "saiso_chophep_kb_vitringoaisaiso", "checkout_ngoaisaiso", "saiso_chophep_checkout_ngoaisaiso", "tgcheckin_toithieu", "batbuoc_kiemton", "batbuoc_chupanh", "soluong_album", "soluong_anh", "batbuoc_ghichu"])
        gen_response(200, '', list_configs)
        return
    except Exception as e:
        return exception_handel(e)

@frappe.whitelist(methods='GET')
def get_config_mobile_detail(name, **kwargs):
    try:
        config_mobile = frappe.get_doc("DMS Config Mobile", name)
        gen_response(200, '', config_mobile)
        return
    except Exception as e:
        return exception_handel(e)