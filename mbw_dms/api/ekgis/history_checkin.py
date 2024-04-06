import frappe
from mbw_dms.api.common import (
    exception_handle,
    gen_response,
)
from mbw_dms.api.ekgis.constant import API_URL
import requests

@frappe.whitelist(methods='GET')
def get_history_checkin(**kwargs):
    try:
        api_key = frappe.get_doc('DMS Settings').api_key
        projectId = frappe.get_doc('DMS Settings').ma_du_an
        user = frappe.db.get_list('Employee', filters={'user_id': frappe.session.user}, fields=['object_id'])
        if user:
            objectId = user[0]['object_id']
            params = {
                'api_key': api_key,
                'fromdate': kwargs.get('fromdate'),
                'todate': kwargs.get('todate')
            }
            url = f'{API_URL}/{projectId}/{objectId}'
            history_checkin = requests.get(url, params=params)
            if history_checkin.status_code == 200:
                return gen_response(200, 'Thành công', history_checkin.json())
            else:
                return gen_response(406, "Không lấy được lịch sử checkin")
    except Exception as e:
        return exception_handle(e)