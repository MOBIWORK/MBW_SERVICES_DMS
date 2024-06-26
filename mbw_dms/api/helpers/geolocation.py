import frappe
import requests
from mbw_dms.api.common import (
    gen_response,
    get_language,
    exception_handle
)
import json
from mbw_dms.config_translate import i18n
from frappe import _

@frappe.whitelist(methods="GET", allow_guest=True)
def get_address_location(**kwargs):
    try:
        lat = kwargs.get('lat')
        lon = kwargs.get('lon')
        settings = frappe.db.get_singles_dict("DMS Settings")

        key = settings.get("api_key")
        url = f"https://api.ekgis.vn/v1/place/geocode/reverse/address?latlng={lat},{lon}&gg=1&api_key={key}"
        if not key:
            return gen_response(400, _("Not found setting key map"))

        # call geolocation
        response = requests.get(url)
        return gen_response(200, _("Successfully"), json.loads(response.text))
    except Exception as e:
        return exception_handle(e)


@frappe.whitelist(allow_guest=True)
def get_coordinates_location(**kwargs):
    try:
        address = kwargs.get("address")
        settings = frappe.db.get_singles_dict("DMS Settings")

        key = settings.get("api_key")
        url = f"https://api.ekgis.vn/v1/place/geocode/forward?address={address}&gg=1&api_key={key}"
        if not key :
            return gen_response(400, _("Not found setting key map"))

        response = requests.get(url)
        return gen_response(200, _("Successfully"), json.loads(response.text))
    except Exception as e:
        return exception_handle(e)
