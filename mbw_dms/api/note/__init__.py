import frappe
from frappe import _
import json
from datetime import datetime
from pypika import  Order, CustomFunction

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    validate_image,
    post_image
)
from mbw_dms.api.validators import validate_not_none, validate_choice, validate_phone_number
from mbw_dms.api.selling import configs
from mbw_dms.config_translate import i18n

#create type of problem
@frappe.whitelist(methods="POST")
def create_type_of_problem(**kwargs):
    try:
        new_type_of_problem = frappe.new_doc('DMS Type of problem')
        new_type_of_problem.ma_loai_van_de = validate_not_none(kwargs.get('ma_loai_van_de'))
        new_type_of_problem.ten_loai_van_de = validate_not_none(kwargs.get('ten_loai_van_de'))

        new_type_of_problem.insert()

        return gen_response(201, "Tạo thành công", {"name": new_type_of_problem.name})
       
    except Exception as e:
        return exception_handel(e)
    

#create Problem Monitor
@frappe.whitelist(methods="POST")
def create_proble_monitor(**kwargs):
    try:
        new_proble_monitor = frappe.new_doc('DMS Problem Monitor')
        
        new_proble_monitor.ma_van_de = validate_not_none(kwargs.get('ma_van_de'))
        
        new_proble_monitor.loai_van_de = validate_not_none(kwargs.get('loai_van_de'))
        new_proble_monitor.noi_dung = validate_not_none(kwargs.get('noi_dung'))
        new_proble_monitor.trang_thai = validate_choice(configs.status_type)(kwargs.get('trang_thai'))
        new_proble_monitor.ma_khach_hang = validate_not_none(kwargs.get('ma_khach_hang'))
        new_proble_monitor.ten_khach_hang = validate_not_none(kwargs.get('ten_khach_hang'))
        new_proble_monitor.dia_chi = validate_not_none(kwargs.get('dia_chi'))
        new_proble_monitor.so_dien_thoai = validate_phone_number(kwargs.get('so_dien_thoai'))
        
        new_proble_monitor.insert()

        return gen_response(201, "Tạo thành công", {"name": new_proble_monitor.name})
    except Exception as e:
        return exception_handel(e)