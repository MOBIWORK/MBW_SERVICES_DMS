import frappe
from frappe import _
import json
from datetime import datetime
from pypika import  Order, CustomFunction

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    validate_image,
    post_image,
)
from mbw_dms.api.validators import validate_not_none, validate_choice
from mbw_dms.api.selling import configs
from mbw_dms.config_translate import i18n

#create Album Image
@frappe.whitelist(methods="POST")
def create_album_image(**kwargs):
    try:
        new_album_image = frappe.new_doc('DMS Album Image')
        new_album_image.id = kwargs.get('id')
        new_album_image.album_id = validate_not_none(kwargs.get('album_id'))
        new_album_image.album_name = validate_not_none(kwargs.get('album_name'))
        new_album_image.checkin_id = validate_not_none(kwargs.get('checkin_id'))
        new_album_image.customer_code = validate_not_none(kwargs.get('customer_code'))
        new_album_image.customer_name = validate_not_none(kwargs.get('customer_name'))
        new_album_image.customer_code = validate_not_none(kwargs.get('customer_code'))
        new_album_image.customer_long = validate_not_none(kwargs.get('customer_long'))
        new_album_image.customer_lat = validate_not_none(kwargs.get('customer_lat'))
        new_album_image.image_url = kwargs.get('image_url')

        new_album_image.insert(ignore_permissions=True)
        return gen_response(201, "Tạo thành công", {"name": new_album_image.name})
       
    except Exception as e:
        return exception_handel(e)
    
#list 
@frappe.whitelist(methods="GET")
def list_album_image():
    try:
        album_image = frappe.db.get_list('DMS Album Image', fields=["name","creation", "owner", "album_id", "album_name", "checkin_id", "customer_id", "customer_name", "customer_code", "customer_long", "customer_lat", "image_url"])
        for albums in album_image:
            albums['detail_employee'] = frappe.db.get_all("Employee", {"user_id": albums.get('owner')}, ['name', 'first_name'])
        gen_response(200, "Thành công", album_image)
    except Exception as e:
        return exception_handel(e)
    
#create Album
@frappe.whitelist(methods="POST")
def create_album(**kwargs):
    try:
        new_album = frappe.new_doc('DMS Album')
        new_album.ma_album = kwargs.get('ma_album')
        new_album.ten_album = validate_not_none(kwargs.get('ten_album'))
        new_album.so_anh_toi_thieu = validate_not_none(kwargs.get('so_anh_toi_thieu'))
        new_album.trang_thai = validate_choice(configs.status_type)(kwargs.get('trang_thai'))

        new_album.insert(ignore_permissions=True)
        return gen_response(201, "Tạo thành công", {"name": new_album.name})
       
    except Exception as e:
        return exception_handel(e)
    
#list 
@frappe.whitelist(methods="GET")
def list_album():
    try:
        album_image = frappe.db.get_list('DMS Album', fields=["name", "ma_album", "ten_album", "so_anh_toi_thieu", "trang_thai"])
        gen_response(200, "Thành công", album_image)
    except Exception as e:
        return exception_handel(e)