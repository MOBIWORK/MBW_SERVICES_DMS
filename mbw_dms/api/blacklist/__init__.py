import frappe
from frappe import _
import json
from datetime import datetime
from pypika import  Order, CustomFunction

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    this_week,
)

from mbw_dms.api.validators import (
    validate_filter
)
from mbw_dms.config_translate import i18n
UNIX_TIMESTAMP = CustomFunction('UNIX_TIMESTAMP', ['day'])

@frappe.whitelist(methods='POST')
def insert_fake_gps(**body):
    try:
        id_user = validate_filter(value=body.get('id_user'),type_check="require")
        user_code = validate_filter(value=body.get('user_code'),type_check="require")
        datetime_fake = validate_filter(value=body.get('datetime_fake'),type_check="require")
        location_fake = validate_filter(value=body.get('location_fake'),type_check="require")
        list_app = validate_filter(value=body.get('list_app'),type_check="require")
        datetime_fake = validate_filter(value=datetime_fake,type_check="timestamp")
        field_valid = ["id_user","user_code","datetime_fake","location_fake","list_app"]
        convert_body = {}
        for key,value in body.items():
            if key in field_valid :
                if key == "datetime_fake":
                    convert_body['date_fake'] = datetime_fake.date()
                    convert_body['time_fake'] = datetime_fake.time()
                elif key == "location_fake":
                    convert_body['location_fake'] = json.dumps(location_fake)
                else:
                    convert_body[key] = value
        new_fake = frappe.get_doc({
            "doctype": "DMS FakeGPS",
            **convert_body
        })
        new_fake.save()
        frappe.db.commit()
        gen_response(200,"",{
            "name": new_fake.name
        })
    except Exception as e:
        exception_handel(e)