# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _

from mbw_dms.api.common import (
    exception_handle,
    gen_response,
    validate_image,
    get_employee_id
)
from mbw_dms.api.validators import validate_not_none, validate_choice, validate_phone_number
from mbw_dms.api import configs

class DMSNoteType(Document):
	pass


#create type of problem
@frappe.whitelist(methods="POST")
def create_type_of_problem(kwargs):
    try:
        new_type_of_problem = frappe.new_doc('DMS Type of problem')
        new_type_of_problem.ma_loai_van_de = validate_not_none(kwargs.get('ma_loai_van_de'))
        new_type_of_problem.ten_loai_van_de = validate_not_none(kwargs.get('ten_loai_van_de'))

        new_type_of_problem.insert(ignore_permissions=True)

        return gen_response(201, "Tạo thành công", {"name": new_type_of_problem.name})
       
    except Exception as e:
        return exception_handle(e)
    

#create Problem Monitor
@frappe.whitelist(methods="POST")
def create_proble_monitor(kwargs):
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
        
        new_proble_monitor.insert(ignore_permissions=True)

        return gen_response(201, "Tạo thành công", {"name": new_proble_monitor.name})
    except Exception as e:
        return exception_handle(e)
    
@frappe.whitelist(methods="POST")
def create_note(kwargs):
    try:
        new_note = frappe.new_doc('Note')
        new_note.title = kwargs.get('title')
        new_note.content = validate_not_none(kwargs.get('content'))
        for email in kwargs.get("email"):
            new_note.append("seen_by", {
                "user": email
            })
        new_note.custom_checkin_id = validate_not_none(kwargs.get('custom_checkin_id'))
        new_note.public = 1
        new_note.insert(ignore_permissions=True) 
        return gen_response(201, "Tạo mới thành công", {"name": new_note.name})
    except Exception as e:
        return exception_handle(e)    
    
@frappe.whitelist(methods="GET")
def list_email(kwargs):
    try:
        employee_id = get_employee_id()
        sale_person_parent = frappe.db.get_value("Sales Person", {"employee": employee_id}, "parent_sales_person")
        print('========================= value: ', sale_person_parent, flush=True)
        employee_sale = frappe.db.get_value("Sales Person", {"sales_person_name": sale_person_parent}, 'employee')
        if employee_sale == None or employee_sale == "":
            return gen_response(406, "Chưa gán nhân viên!")
        info = frappe.get_all("Employee", filters={"name": employee_sale}, fields=['name', 'first_name', 'image', 'user_id', 'designation'])
        info[0].image = validate_image(info[0].image)
        return gen_response(200, "Thành công", {"data":info})
    except Exception as e:
        return exception_handle(e) 
    
#list note
@frappe.whitelist(methods="GET")
def list_note(kwargs):
    try:
        my_filter = {}
        name = kwargs.get('name')
        custom_checkin_id = kwargs.get('custom_checkin_id')
        if name:
            my_filter["name"] = ['like', f'%{name}%']
        if custom_checkin_id:
            my_filter["custom_checkin_id"] = ['like', f'%{custom_checkin_id}%']
        list_note = frappe.get_all('Note',filters=my_filter ,fields=["name", "title", "content", "creation","custom_checkin_id"])
        return gen_response(200, "Thành công", list_note)
    except Exception as e:
        return exception_handle(e)
    
#list note type
@frappe.whitelist(methods="GET")
def list_note_type():
    try:
        my_filter = {}
        list_note_type = frappe.db.get_all('DMS Note Type',filters=my_filter ,fields=["name", "ma_ghi_chu", "loai_ghi_chu"])
        return gen_response(200, "Thành công", list_note_type)
    except Exception as e:
        return exception_handle(e)