# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from mbw_dms.api.validators import validate_not_none
import requests
from mbw_dms.api.common import exception_handle, gen_response
from mbw_dms.api.ekgis.constant import API_URL_TRACKING

class DMSSettings(Document):
    def on_update(self):
        frappe.cache.delete_value("website-config")
        frappe.cache.delete_value("ProjectID")
        
    @frappe.whitelist(methods='POST')
    def config_web(self):
        try:
            # Gửi yêu cầu POST đến API để lấy thông tin mới
            api_url = f"{API_URL_TRACKING}/project"
            data_post = {
                "name": validate_not_none(frappe.local.site),
            }
            params = {"api_key": self.api_key}
            response = requests.post(api_url, params=params, json=data_post)
            
            if response.status_code == 200:
                new_info = response.json()
                
                # Cập nhật trường ma_du_an với thông tin mới lấy được
                self.ma_du_an = new_info["results"].get("_id")
                self.save()
                
                frappe.msgprint("Thông tin đã được cập nhật thành công.")
            else:
                frappe.msgprint(f"Lỗi khi gọi API: {response.status_code}")
        except Exception as e:
            frappe.msgprint(f"Lỗi: {e}")


@frappe.whitelist(methods='GET')
def get_list_config():
    try:
        list_configs = None
        list_configs = frappe.cache().get_value("website-config")
        if list_configs == None:
            list_configs = frappe.get_doc("DMS Settings")
            frappe.cache().set_value("website-config", list_configs)
        
        if isinstance(list_configs, dict):
            list_configs.pop('config_map_by_vgm', None)
        elif hasattr(list_configs, 'config_map_by_vgm'):
            delattr(list_configs, 'config_map_by_vgm')
        return gen_response(200, "Thành công", list_configs)
    except Exception as e:
        return exception_handle(e)
