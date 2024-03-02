import frappe
from frappe import _
from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    get_language,
    ArrayMethod
)
from mbw_dms.utils import OPTIMAL_ROUTER
import requests
import json
from mbw_dms.config_translate import i18n

# toi uu tuyen
@frappe.whitelist(methods="POST", allow_guest=True)
def optimal_router(**kwargs):
    try:
        list_location = kwargs.get('locations',[])
        if len(list_location) <=1:
            return gen_response(200,"",list_location)
        settings = frappe.db.get_singles_dict("DMS Settings")
        select_service = settings.get("select_service")
        company_long = float(settings["company_long"])
        company_lat = float(settings["company_lat"])
        key = settings.get("api_key")
        url = f"{OPTIMAL_ROUTER.get('EKGIS')}?api_key={key}"

        if not key:
            return gen_response(400, i18n.t('translate.not_found_setting_map', locale=get_language()))
        if not bool(company_long) or not bool(company_lat):
            return gen_response(500,"Config company location",[])
        jobs = []
        vehicles = [
            {
                "id":1,
                "profile": "driving-car",
                "start":[company_long, company_lat],
            }
        ]
        for location in list_location :
            jobs.append({
                    "id": location["id"],
                    "location":[location["long"], location["lat"]]
                })
       
        data = {
            "jobs": jobs,
            "vehicles": vehicles
        }
        response = requests.post(url,headers={'Content-Type': 'application/json'},data=json.dumps(data))
        data_return  =  json.loads(response.text)
        if data_return.get("error"):
            return gen_response(500,data_return.get("error"),[])
        steps = data_return.get("routes")[0]["steps"] 
        steps_array_optimal = ArrayMethod(steps).filter(lambda x: x.get("type") == "job")
        def callback_map(value):
            return value.get("id")
        map_ids = ArrayMethod(steps_array_optimal).toMap(callback_map)
        optimal_arr = []
        for id in map_ids: 
            id_location = ArrayMethod(list_location).find(lambda x:  x.get("id") == id)
            optimal_arr.append(id_location)

        return gen_response(200, i18n.t('translate.successfully', locale=get_language()), optimal_arr)
    except Exception as e:
        return exception_handel(e)