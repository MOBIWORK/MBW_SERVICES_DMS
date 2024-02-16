import frappe
from frappe import _

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    get_language,
)
from mbw_service_v2.utils import OPTIMAL_ROUTER
import requests
import json
from mbw_dms.config_translate import i18n

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