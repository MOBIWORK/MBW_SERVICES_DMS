# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe import  _
from frappe.model.document import Document
import datetime
from frappe.utils.data import get_time
from mbw_dms.api.common import exception_handle, gen_response, get_language, get_user_id, upload_image_s3, post_image, get_employee_info, get_value_child_doctype
from mbw_dms.api.validators import validate_datetime, validate_filter
from mbw_dms.mbw_dms.utils import create_dms_log
from mbw_dms.config_translate import i18n
import json
from frappe.utils import nowdate
import calendar
from mbw_dms.api.ekgis.constant import API_URL, API_URL_TRACKING

class DMSCheckin(Document):
    def after_insert(self):
        self.update_kpi_monthly()
        self.send_data_to_ekgis()
        self.check_router()
        self.update_data_first_checkin()

    def existing_checkin(self, kh_ma, start_date, end_date, current_user):
        existing_checkin = frappe.get_all(
            'DMS Checkin',
            filters={"creation": (">=", start_date), 
                     "creation": ("<=", end_date), 
                     "kh_ma": kh_ma, 
                     "owner": current_user},
            fields=['name']
        )
        return existing_checkin

    def update_kpi_monthly(self):
        # Lấy ngày tháng để truy xuất dữ liệu
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])
        start_date_str = f'{year:04d}-{month:02d}-01'
        last_day_of_month = calendar.monthrange(year, month)[1]
        end_date_str = f'{year:04d}-{month:02d}-{last_day_of_month:02d}'
        start_date = frappe.utils.getdate(start_date_str)
        end_date = frappe.utils.getdate(end_date_str)

        # Lấy id của nhân viên
        user_id = frappe.session.user
        user_name = frappe.get_value('Employee', {'user_id': user_id}, 'name')
        # Lấy tuyến của nhân viên
        router_employee = frappe.get_all(
            'DMS Router',
            filters = {
                "employee": user_name
            },
            fields = ['travel_date']
        )
        list_travel_date = [router['travel_date'] for router in router_employee]
        days = datetime.date.today()
        # Lấy thứ của ngày
        date = days.weekday()
        # Chuyển đổi sang tên của ngày trong tuần
        date_in_week = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"]
        name_date = date_in_week[date]

        # Kiểm tra xem khách hàng đã thực hiện checkin trong tháng này hay chưa
        kh_ma = self.kh_ma
        exists_checkin = self.existing_checkin(kh_ma=kh_ma, start_date=start_date, end_date=end_date, current_user=user_id)

        # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
        existing_monthly_summary = frappe.get_all(
            'DMS Summary KPI Monthly',
            filters={'thang': month, 'nam': year, 'nhan_vien_ban_hang': user_name},
            fields=['name']
        )
        sales_team = frappe.get_value("DMS KPI", {'nhan_vien_ban_hang': user_name}, "nhom_ban_hang")

        if len(exists_checkin) > 1:
            if existing_monthly_summary:
                monthly_summary_doc = frappe.get_doc('DMS Summary KPI Monthly', existing_monthly_summary[0]['name'])
                monthly_summary_doc.so_kh_vt_luot += 1
                if name_date in list_travel_date:
                    monthly_summary_doc.solan_vt_dungtuyen += 1
                else:
                    monthly_summary_doc.solan_vt_ngoaituyen += 1
                monthly_summary_doc.save(ignore_permissions=True)
            else:
                monthly_summary_doc = frappe.get_doc({
                    'doctype': 'DMS Summary KPI Monthly',
                    'nam': year,
                    'thang': month,
                    'nhan_vien_ban_hang': user_name,
                    'nhom_ban_hang': sales_team,
                    'so_kh_vt_luot': 1,
                    'solan_vt_dungtuyen': 1 if name_date in list_travel_date else 0,
                    'solan_vt_ngoaituyen': 1 if name_date not in list_travel_date else 0
                })
                monthly_summary_doc.insert(ignore_permissions=True)
        else:
            if existing_monthly_summary:
                monthly_summary_doc = frappe.get_doc('DMS Summary KPI Monthly', existing_monthly_summary[0]['name'])
                monthly_summary_doc.so_kh_vt_luot += 1
                monthly_summary_doc.so_kh_vt_duynhat += 1
                if name_date in list_travel_date:
                    monthly_summary_doc.solan_vt_dungtuyen += 1
                else:
                    monthly_summary_doc.solan_vt_ngoaituyen += 1
                monthly_summary_doc.save(ignore_permissions=True)
            else:
                monthly_summary_doc = frappe.get_doc({
                    'doctype': 'DMS Summary KPI Monthly',
                    'nam': year,
                    'thang': month,
                    'nhan_vien_ban_hang': user_name,
                    'nhom_ban_hang': sales_team,
                    'so_kh_vt_luot': 1,
                    'so_kh_vt_duynhat': 1,
                    'solan_vt_dungtuyen': 1 if name_date in list_travel_date else 0,
                    'solan_vt_ngoaituyen': 1 if name_date not in list_travel_date else 0
                })
                monthly_summary_doc.insert(ignore_permissions=True)

    def send_data_to_ekgis(self):
        try:
            # Tạo mới ObjectID
            projectId = frappe.get_doc('DMS Settings').ma_du_an
            if projectId is None:
                frappe.throw("Chưa có Project ID")
                return
            api_key = frappe.get_doc('DMS Settings').api_key
            api_url = f'{API_URL_TRACKING}/{projectId}/object'
            params = {"api_key": api_key}
            data_post = {
                'name': frappe.session.user,
                'type': 'driver'
            }
            objectId = ''
            user_name = frappe.db.get_list('Employee', filters={'user_id': frappe.session.user}, fields=['name', 'object_id'])
            if user_name and user_name[0]['object_id'] is not None:
                objectId = user_name[0]['object_id']
            else:
                response = requests.post(api_url, params=params, json=data_post)
                employee = frappe.get_doc('Employee', user_name[0]['name'])
                if response.status_code == 200:
                    new_info = response.json()
                    employee.object_id = new_info['results'].get('_id')
                    employee.save()
                    objectId = new_info['results'].get('_id')
                else:
                    frappe.msgprint(f"Lỗi khi gọi API tạo mới object ID: {response.status_code}")
                    return
                
            # Tích hợp dữ liệu checkin vào ekgis
            api_url_checkin=f'{API_URL}/{projectId}/{objectId}'
            ext = {"customer_name": self.kh_ten, "address": self.kh_diachi}
            json_object = json.dumps(ext)

            data_checkin = {
                "projectid":projectId,
                "objectid": objectId,
                "uuid": "",
                "lng": self.kh_long,
                "lat": self.kh_lat,
                "coordinates": "",
                "activity": "checkin",
                "battery_checkin": self.checkin_pinvao,
                "battery_checkout": self.checkin_pinra,
                "accuracy": self.checkin_dochinhxac,
                "time_checkin": self.checkin_giovao,
                "time_checkout": "",
                "ext": json_object,
                "createddate": self.createddate,
                "timestamp": ""
            }
            response_checkin = requests.post(api_url_checkin, params=params, json=data_checkin)

            if response_checkin.status_code == 200:
                    create_dms_log(status="Success")
            else:
                create_dms_log(status="Error", message=f"Lỗi khi gọi API checkin: {response_checkin.status_code}")
        
        except Exception as e:
            create_dms_log(status="Error", exception=e, rollback=True)

    def check_router(self):
        # Lấy tuyến của nhân viên
        user_id = frappe.session.user
        user_name = frappe.get_value('Employee',{ 'user_id': user_id}, 'name')
        # Lấy thứ của ngày
        date_cre = datetime.datetime.strptime(self.creation, '%Y-%m-%d %H:%M:%S.%f')
        date = date_cre.weekday()
        # Chuyển đổi sang tên của ngày trong tuần
        date_in_week = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"]
        name_date = date_in_week[date]
        router_employee = frappe.get_all(
            'DMS Router',
            filters = {
                "employee": user_name,
				"travel_date": name_date
            },
            fields = ['name']
        )
        if router_employee:
            for i in router_employee:
                i['customers'] = get_value_child_doctype('DMS Router', i['name'], 'customers')
                for a in i['customers']:
                    if self.kh_ten == a['customer']:
                        self.checkin_dungtuyen = 1
                        self.save()

    def update_data_first_checkin(self):
        new_data = frappe.new_doc('DMS First Checkin Customer')
        customer_name = self.kh_ten
        existing_checkin = frappe.get_all('DMS Checkin', filters={"kh_ten": customer_name}, fields=['name'])
        if len(existing_checkin) == 1:
            if frappe.db.exists('Employee', {'user_id': self.owner}):
                employee = frappe.get_doc('Employee', {'user_id': self.owner}).as_dict()
                new_data.department = employee.department
                new_data.employee_id = employee.name
                new_data.employee_name = employee.employee_name
            cus = frappe.get_doc('Customer', {'customer_name': customer_name}).as_dict()
            new_data.customer_name = customer_name
            new_data.customer_id = cus.customer_code
            new_data.customer_type = cus.customer_type
            new_data.customer_group = cus.customer_group
            new_data.tax_id = cus.tax_id
            new_data.phone = cus.mobile_no
            new_data.address = cus.customer_primary_address
            new_data.contact_person = cus.customer_primary_contact
            new_data.territory = cus.territory
            new_data.date_checkin = self.createddate
            new_data.insert()
            frappe.db.commit()
        else:
            return


# Tạo mới checkin
@frappe.whitelist(methods='POST')
def create_checkin(kwargs):
    try:
        new_checkin = frappe.new_doc('DMS Checkin')

        normal_keys = [
            "kh_ma", "kh_ten", "kh_diachi", "kh_long", "kh_lat",
            "checkin_khoangcach", "checkin_trangthaicuahang", "checkin_donhang",
            "checkin_long", "checkin_lat", "checkin_dochinhxac", "checkin_pinvao", "checkin_pinra",
            "checkout_khoangcach", "checkinvalidate_khoangcachcheckin",
            "checkinvalidate_khoangcachcheckout", "createdbyemail", "createbyname", 
        ]
        datetime_keys = ["checkin_timegps"]
        date_keys = ["createddate", "checkin_giovao", "checkin_giora"]
        for key, value in kwargs.items():
            if key in normal_keys:
                new_checkin.set(key, value)
            elif key in datetime_keys:
                new_checkin.set(key, get_time(value) if value else '')
            elif key in date_keys:
                created_date = validate_datetime(value)
                new_checkin.set(key, created_date)
        new_checkin.insert(ignore_permissions=True)
        frappe.db.commit()
        return gen_response(201, "Thành công", {"name": new_checkin.name})
    except Exception as e:
        return exception_handle(e)


# Tạo mới checkin tồn kho
@frappe.whitelist(methods='POST')
def create_checkin_inventory(body):
    try:
        user = get_user_id()
        normal_keys = [
            "customer_code", "customer_name", "customer_type", "customer_address"
        ]
        del body['cmd']
        for key, value in body.items():
            if key in normal_keys:
                validate_filter(type_check='require',value=value)
        items = body.get('inventory_items')
        for item in items:
            item['exp_time'] = validate_filter(type_check='date',value=item['exp_time'])
            item['total_cost'] = item['quantity'] * item['item_price']
        body['doctype'] = "DMS Inventory"
        body['create_by'] = user.get('name')
        body['items'] = items
        doc = frappe.get_doc(body)
        doc.save()
        frappe.db.commit()
        return gen_response(201, "Thành công", {"name": doc.name})
    except Exception as e:
        return exception_handle(e)


@frappe.whitelist(methods='POST')
def create_checkin_image(body):
    try:
        user = get_user_id()
        image = validate_filter(value=(body.get('image'),"image"),type_check='require_field')
        album_id = validate_filter(value = (body.get('album_id'),"album id"),type_check='require_field')
        album_name = validate_filter(type_check='require_field',value=(body.get('album_name'),"album name"))
        checkin_id = validate_filter(type_check='require_field',value=(body.get('checkin_id'),"checkin id"))
        customer_id = validate_filter(type_check='require_field',value=(body.get('customer_id'),"customer id"))
        customer_code = validate_filter(type_check='require_field',value=(body.get('customer_code'),"customer code"))
        customer_name = validate_filter(type_check='require_field',value=(body.get('customer_name'), "customer name"))
        address = body.get('address')
        long = validate_filter(type_check='require_field',value=(body.get('long'),"long"))
        lat = validate_filter(type_check='require_field',value=(body.get('lat'),"lat"))
        create_by = user.get('name')
        create_time = datetime.datetime.now()
        description = ''
        if customer_name:
            description += customer_name + '\\n'
        if address:
            description += address + '\\n'
        if long and lat:
            description += f"long:{long} lat:{lat}\\n"
        if create_by:
            description += f"create: {create_by}\\n"
        if create_time:
            description += f"create: {create_time}\\n"
        description= description.rstrip('\\n')
        try:
            rsUpload = upload_image_s3(image=image,description=description)
            image_push = {
                "doctype": 'DMS Album Image',
                "album_id":album_id,
                "album_name": album_name,
                "checkin_id": checkin_id,
                "customer_id": customer_id,
                "customer_name":customer_name,
                "customer_code" : customer_code,
                "customer_long":long,
                "customer_lat":lat,
                "image_url":rsUpload.get("file_url"),

            }
            new_album_image = frappe.get_doc(image_push)
            new_album_image.save()
            frappe.db.commit()
            return gen_response(201,'',rsUpload) 
        except :
            return gen_response(200,"", {
                "status": False,
                "file_url" : None
            })
    except Exception as e:
        exception_handle(e)

# Cập nhật địa chỉ khách hàng
@frappe.whitelist()
def update_address_customer(body):
    try:
        customer = validate_filter(type_check='require',value=body.get('customer'))
        city = validate_filter(type_check='require',value=body.get('city'))
        county = validate_filter(type_check='require',value=body.get('county'))
        state = validate_filter(type_check='require',value=body.get('state'))
        address_line1 = validate_filter(type_check='require',value=body.get('address_line1'))
        long = validate_filter(type_check='require',value=body.get('long'))
        lat = validate_filter(type_check='require',value=body.get('lat'))
        address_location = json.dumps({"long": long,"lat":lat})

        customer_info = frappe.db.get_value(doctype="Customer",filters= {"name": customer},fieldname=['name','customer_primary_address',"customer_name"],as_dict=1)
        doc_customer = frappe.get_doc("Customer",body.get('customer'))
        doc_customer.customer_location_primary = address_location
        doc_customer.primary_address = f"{address_line1}<br>{address_line1}<br>\n{county}\n<br>{city}<br>\n"
        doc_customer.save()
        if customer_info:
            city_info = frappe.db.get_value(doctype="DMS Province",filters={"ten_tinh": ["like",f"%{city}%"]},fieldname=['ma_tinh'])
            district_info = frappe.db.get_value(doctype="DMS District",filters={"ten_huyen": ["like",f"%{county}%"]},fieldname=['ma_huyen'])
            ward_info = frappe.db.get_value(doctype="DMS Ward",filters={"ten_xa": ["like",f"%{state}%"]},fieldname=['name'])
            if not city_info : 
                return gen_response(404,_("Couldn't find city"))
            new_address = {
                    "address_title": f"{address_line1}, {state}, {county}, {city}",
                    "address_line1":address_line1,                    
                    "state": ward_info,
                    "county": district_info,
                    "city": city_info,   
                    "address_location":address_location               
                }
            if customer_info.get("customer_primary_address"):
                doc_address = frappe.get_doc("Address",customer_info.get("customer_primary_address"))
                for key,value in new_address.items():
                    setattr(doc_address,key,value)
                doc_address.save()
                
            else: 
                new_address.update({  
                    "doctype": "Address",                  
                     "links": [{
                        "link_doctype": "Customer",
                        "link_name":customer,
                        "link_title": customer_info.get("customer_name")
                    }],
                    "address_type": "Billing"
                })
                doc_address = frappe.get_doc(new_address)
                doc_address.save()
                setattr(doc_customer,"customer_primary_address",doc_address.get('name'))
                doc_customer.save()
            
            frappe.db.commit()
            return gen_response(200,"",doc_address.get('address_title') )
        else:
            return gen_response(406,i18n.t('translate.not_found', locale=get_language()),False)             
        
    except Exception as e:
        exception_handle(e)

# cancel checkout
@frappe.whitelist(methods="DELETE")
def cancel_checkout(data):
    try:
        gen_response(200,i18n.t("translate.successfully",locale=get_language()),[])
        checkin_id = data.get('checkin_id')
        #xoa don hang
        frappe.db.delete("Sales Order",{"checkin_id":checkin_id})
        #xoa tra hang
        frappe.db.delete("Sales Invoice",{"checkin_id":checkin_id})
        #xoa album anh
        frappe.db.delete("DMS Album Image",{"checkin_id":checkin_id})
        return
    except Exception as e :
        exception_handle(e)

import requests

def create_checkin_ek(doc, method=None):
    objectId = ""
    projectId = ""
    api_checkin = f"https://api.ekgis.vn/v1/checkin/{projectId}/{objectId}"
    data_checkin = {
                "projectid":projectId,
                "objectid": projectId,
                "lng": doc.checkin_long,
                "lat": doc.checkin_lat,
                "accuracy": doc.checkin_dochinhxac,
                "battery_checkin": 0,
                "battery_checkout": 0
                }
    if doc.checkin_giovao and not doc.checkin_giora:
        data_checkin.update({"activity": "checkin"})
        data_checkin.update({"time_checkin" : doc.checkin_giovao})
    if doc.checkin_giovao and doc.checkin_giora:
        data_checkin.update({"activity": "checkout"})
        data_checkin.update({"time_checkin": doc.checkin_giora})
    requests.post(url = api_checkin,data= data_checkin)

    