import frappe
from datetime import datetime
from frappe.utils.data import get_time
from mbw_dms.api.common import exception_handel, gen_response, convert_timestamp, get_language
from mbw_dms.config_translate import i18n

@frappe.whitelist(methods='POST')
def create_checkin(**kwargs):
    try:
        new_checkin = frappe.new_doc('DMS Checkin')

        normal_keys = [
            "kh_ma", "kh_ten", "kh_diachi", "kh_long", "kh_lat",
            "checkin_khoangcach", "checkin_trangthaicuahang", "checkin_donhang",
            "checkin_hinhanh", "checkin_long", "checkin_lat", "checkin_dochinhxac",
            "checkout_khoangcach", "checkinvalidate_khoangcachcheckin",
            "checkinvalidate_khoangcachcheckout", "createdbyemail", "createbyname", 
        ]
        datetime_keys = ["checkin_giovao", "checkin_giora", "checkin_pinvao", "checkin_pinra", "checkin_timegps"]
        date_keys = ["createddate", ]
        for key, value in kwargs.items():
            if key in normal_keys:
                new_checkin.set(key, value)
            elif key in datetime_keys:
                new_checkin.set(key, get_time(value) if value else '')
            elif key in date_keys:
                created_date = convert_timestamp(float(value), is_datetime=True)
                new_checkin.set(key, created_date)
            elif key == 'cmd':
                continue
            else:
                return gen_response(400, i18n.t('translate.invalid_field', locale=get_language()), {"key": key})
        
        new_checkin.insert()
        frappe.db.commit()
        return gen_response(200, "Checkin created successfully", {"name": new_checkin.name})
    except Exception as e:
        return exception_handel(e)