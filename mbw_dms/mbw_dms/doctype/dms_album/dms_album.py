# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
)
from mbw_dms.api.validators import validate_not_none, validate_choice
from mbw_dms.api import configs

class DMSAlbum(Document):
	pass

#create Album Image
@frappe.whitelist(methods="POST")
def create_album_image(kwargs):
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

#list album Image
@frappe.whitelist(methods="GET")
def list_monitor_album(kwargs):
    try:
        name = kwargs.get('album')
        customer_name = kwargs.get('customer_name')
        team_sale = kwargs.get('team_sale')
        creation = kwargs.get('creation')
        employee = kwargs.get('employee')
        
        my_filter = {}
        if name:
            my_filter["name"] = ['like', f'%{name}%']
        if customer_name:
            my_filter["customer_name"] = ['like', f'%{customer_name}%']
        if employee:
            my_filter["employee"] = ['like', f'%{employee}%']
        if creation:
            my_filter["creation"] = ['like', f'%{creation}%']
        if team_sale:
            my_filter["team_sale"] = ['like', f'%{team_sale}%']
        album_image = frappe.db.get_list('DMS Album Image',filters=my_filter, fields=["name","creation", "owner", "album_id", "album_name", "checkin_id", "customer_id", "customer_name", "customer_code", "customer_long", "customer_lat", "image_url", "team_sale", "employee"])
        for albums in album_image:
            albums['creation'] = (albums.get('creation')).strftime('%H:%M, %d-%m-%Y')
            albums['employee'] = frappe.db.get_all("Employee", {"employee": albums.get('employee')}, ['name', 'first_name'])
            albums['customer_name'] = frappe.db.get_all("Customer", {"customer_code": albums.get('customer_code')}, ['customer_name','customer_type', 'customer_group'])
        return gen_response(200, "Thành công", album_image)
    except Exception as e:
        return exception_handel(e)


#create Album
@frappe.whitelist(methods="POST")
def create_album(kwargs):
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
