# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import datetime
from frappe.utils.data import get_time
from mbw_dms.api.common import exception_handel, gen_response, get_language, get_user_id, upload_image_s3, post_image, get_employee_info
from mbw_dms.api.validators import validate_datetime, validate_filter
from mbw_dms.config_translate import i18n
import json
from frappe.utils import nowdate
import calendar

class DMSCheckin(Document):
    def after_insert(self):
        self.update_kpi_monthly()

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
        current_user = get_employee_info()
        # Lấy tuyến của nhân viên
        router_employee = frappe.get_all(
            'DMS Router',
            filters = {
                "employee": current_user['name']
            },
            fields = ['travel_date']
        )
        list_travel_date = [router['travel_date'] for router in router_employee]
        days = datetime.date.today()
        # Lấy thứ của ngày
        date = days.weekday()
        # Chuyển đổi sang tên của ngày trong tuần
        date_in_week = ["Thứ 2", "Thứ 2", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"]
        name_date = date_in_week[date]

        # Kiểm tra xem khách hàng đã thực hiện checkin trong tháng này hay chưa
        kh_ma = self.kh_ma
        exists_checkin = self.existing_checkin(kh_ma=kh_ma, start_date=start_date, end_date=end_date, current_user=current_user['user_id'])

        # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
        existing_monthly_summary = frappe.get_all(
            'DMS Summary KPI Monthly',
            filters={'thang': month, 'nam': year, 'nhan_vien_ban_hang': current_user['name']},
            fields=['name']
        )

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
                    'nhan_vien_ban_hang': current_user['name'],
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
                    'nhan_vien_ban_hang': current_user['name'],
                    'so_kh_vt_luot': 1,
                    'so_kh_vt_duynhat': 1,
                    'solan_vt_dungtuyen': 1 if name_date in list_travel_date else 0,
                    'solan_vt_ngoaituyen': 1 if name_date not in list_travel_date else 0
                })
                monthly_summary_doc.insert(ignore_permissions=True)

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
        datetime_keys = ["checkin_giovao", "checkin_giora", "checkin_timegps"]
        date_keys = ["createddate", ]
        for key, value in kwargs.items():
            if key in normal_keys:
                new_checkin.set(key, value)
            elif key in datetime_keys:
                new_checkin.set(key, get_time(value) if value else '')
            elif key in date_keys:
                created_date = validate_datetime(value)
                new_checkin.set(key, created_date)
        new_checkin.insert()
        frappe.db.commit()
        return gen_response(201, "Thành công", {"name": new_checkin.name})
    except Exception as e:
        return exception_handel(e)
    
    
# Thêm ảnh checkin
@frappe.whitelist(methods='PUT')
def add_checkin_image(name_checkin, kwargs):
    try:
        if frappe.db.exists('DMS Checkin', name_checkin, cache=True):
            checkin = frappe.get_doc('DMS Checkin', name_checkin)
            checkin.append('checkin_hinhanh', {
                'url_image': post_image(name_image='', faceimage=kwargs.get('faceimage'), doc_type='DMS Checkin', doc_name=name_checkin)
            })
            checkin.checkin_id = name_checkin
            checkin.save()
            return gen_response(201, 'Successful', [])
        else:
            return gen_response(406, f"Không tồn tại check in {name_checkin}")
    except Exception as e:
        return exception_handel(e)

# Tạo mới checkin tồn kho
@frappe.whitelist(methods='POST')
def create_checkin_inventory(body):
    try:
        user = get_user_id()
        normal_keys = [
            "inventory_cus_name", "inventory_cus_id", "inventory_customer_name"
            , "inventory_cus_address", "inventory_items"
        ]
        del body['cmd']
        for key, value in body.items():
            if key in normal_keys:
                validate_filter(type_check='require',value=value)
        items = body.get('inventory_items')
        for item in items:
            item['exp_time'] = validate_filter(type_check='date',value=item['exp_time'])
        body['doctype'] = "DMS Inventory"
        body['create_by'] = user.get('name')
        body['inventory_items'] = items
        doc = frappe.get_doc(body)
        doc.save()
        frappe.db.commit()
        return gen_response(201, "Thành công", {"name": doc.name})
    except Exception as e:
        return exception_handel(e)


@frappe.whitelist(methods='POST')
def create_checkin_image(body):
    try:
        user = get_user_id()
        image = validate_filter(value=body.get('image'),type_check='require')
        album_id = validate_filter(value = body.get('album_id'),type_check='require')
        album_name = validate_filter(type_check='require',value=body.get('album_name'))
        checkin_id = validate_filter(type_check='require',value=body.get('checkin_id'))
        customer_id = validate_filter(type_check='require',value=body.get('customer_id'))
        customer_code = validate_filter(type_check='require',value=body.get('customer_code'))
        customer_name = validate_filter(type_check='require',value=body.get('customer_name'))
        address = body.get('address')
        long = validate_filter(type_check='require',value=body.get('long'))
        lat = validate_filter(type_check='require',value=body.get('lat'))
        create_by = user.get('name')
        create_time = datetime.now()
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
        exception_handel(e)

# Cập nhật địa chỉ khách hàng
@frappe.whitelist(methods='PATCH')
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
        exception_handel(e)

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
        exception_handel(e)