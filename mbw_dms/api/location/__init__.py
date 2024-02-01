import frappe
from frappe import _

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    get_language,
)
from mbw_dms.api.validators import validate_not_none
from mbw_service_v2.utils import CONFIG_GEO_ADDRESS, CONFIG_GEO_LOCATION, OPTIMAL_ROUTER
import requests
import json
from mbw_dms.config_translate import i18n



# Danh sánh tỉnh/thành phố
@frappe.whitelist(methods='GET')
def list_province(**kwargs):
    try:
        list_provinces = frappe.db.get_list('DMS Province', fields=['name', 'ma_tinh', 'ten_tinh'], order_by='ma_tinh asc')
        gen_response(200, 'Thành công', list_provinces)
    except Exception as e:
        return exception_handel(e)
    

# Danh sách quận/huyện
@frappe.whitelist(methods='GET')
def list_district(ma_tinh):
    try:
        list_districts = frappe.db.get_list('DMS District', filters={'ma_tinh_thanh': validate_not_none(ma_tinh)}, fields=['name', 'ma_huyen', 'ten_huyen', 'ma_tinh_thanh'], order_by='ma_huyen asc')
        gen_response(200, 'Thành công', list_districts)
    except Exception as e:
        return exception_handel(e)
    

# Danh sách phường/xã
@frappe.whitelist(methods='GET')
def list_ward(ma_quan_huyen):
    try:
        list_wards = frappe.db.get_list('DMS Ward', filters={'ma_quan_huyen': validate_not_none(ma_quan_huyen)}, fields=['name', 'ma_xa', 'ten_xa', 'ma_quan_huyen'], order_by='ma_xa asc')
        gen_response(200, 'Thành công', list_wards)
    except Exception as e:
        return exception_handel(e) 
# toi uu tuyen
@frappe.whitelist(methods="GET", allow_guest=True)
def optimal_router(**kwargs):
    try:
        list_location = kwargs.get('locations')
        settings = frappe.db.get_singles_dict("MBW Employee Settings")
        geo_service = settings.get("geo_service")

        if geo_service == "Ekgis":
            key = settings.get("api_key_ekgis")
            url = f"{OPTIMAL_ROUTER.get('EKGIS')}/{list_location}?api_key={key}"
        else:
            key = settings.get("api_key_google")
            url = f"{OPTIMAL_ROUTER.get('GOOGLE')}/{list_location}?api_key={key}"

        if not key or not geo_service:
            return gen_response(400, i18n.t('translate.not_found_setting_map', locale=get_language()))

        # call geolocation
        response = requests.get(url)
        return gen_response(200, i18n.t('translate.successfully', locale=get_language()), json.loads(response.text))
    except Exception as e:
        return exception_handel(e)
