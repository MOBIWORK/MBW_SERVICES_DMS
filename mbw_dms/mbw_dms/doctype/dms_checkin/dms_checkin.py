# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe import  _
from frappe.model.document import Document
import datetime
from frappe.utils.data import get_time
from mbw_dms.api.common import (
    exception_handle, gen_response,
    get_language, get_user_id, upload_image_s3, get_value_child_doctype, 
    time_now_utc,null_location,create_address, create_address_current
)
from mbw_dms.api.validators import validate_datetime, validate_filter
from mbw_dms.mbw_dms.utils import create_dms_log
from mbw_dms.config_translate import i18n
import json
from frappe.utils import nowdate
import calendar
from mbw_dms.api.ekgis.constant import API_URL, API_URL_TRACKING
import pydash
from frappe.utils import cint
class DMSCheckin(Document):
    def after_insert(self):
        self.update_kpi_monthly()
        self.send_data_to_ekgis()
        self.check_router()
        self.update_data_first_checkin()

    def after_delete(self):
        self.update_kpi_monthly_after_delete()

    def existing_checkin(self, kh_ma, start_date, end_date, current_user):
        existing_checkin = frappe.get_all(
            "DMS Checkin",
            filters={"creation": (">=", start_date), 
                     "creation": ("<=", end_date), 
                     "kh_ma": kh_ma, 
                     "owner": current_user},
            fields=["name"]
        )
        return existing_checkin

    def update_kpi_monthly(self):
        # Lấy ngày tháng để truy xuất dữ liệu
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])
        start_date_str = f"{year:04d}-{month:02d}-01"
        last_day_of_month = calendar.monthrange(year, month)[1]
        end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
        start_date = frappe.utils.getdate(start_date_str)
        end_date = frappe.utils.getdate(end_date_str)

        # Lấy id của nhân viên
        user_id = frappe.session.user
        user_name = frappe.get_value("Employee", {"user_id": user_id}, "name")
        # Lấy tuyến của nhân viên
        router_employee = frappe.get_all("DMS Router", filters = {"employee": user_name}, fields = ["travel_date"])
        list_travel_date = [router["travel_date"] for router in router_employee]

        # Lấy thứ của ngày
        days = datetime.date.today()
        date = days.weekday()
        # Chuyển đổi sang tên của ngày trong tuần
        date_in_week = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"]
        name_date = date_in_week[date]

        # Kiểm tra xem khách hàng đã thực hiện checkin trong tháng này hay chưa
        kh_ma = self.kh_ma
        exists_checkin = self.existing_checkin(kh_ma=kh_ma, start_date=start_date, end_date=end_date, current_user=user_id)

        # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
        existing_monthly_summary = frappe.get_value(
            "DMS Summary KPI Monthly",
            {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name},
            "name"
        )
        sales_team = frappe.get_value("DMS KPI", {"nhan_vien_ban_hang": user_name}, "nhom_ban_hang")

        if len(exists_checkin) > 1:
            if existing_monthly_summary:
                monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary[0]["name"])
                monthly_summary_doc.so_kh_vt_luot += 1
                monthly_summary_doc.so_kh_vt_duynhat -= 1
                if name_date in list_travel_date:
                    monthly_summary_doc.solan_vt_dungtuyen += 1
                else:
                    monthly_summary_doc.solan_vt_ngoaituyen += 1
                monthly_summary_doc.save(ignore_permissions=True)
            else:
                monthly_summary_doc = frappe.get_doc({
                    "doctype": "DMS Summary KPI Monthly",
                    "nam": year,
                    "thang": month,
                    "nhan_vien_ban_hang": user_name,
                    "nhom_ban_hang": sales_team,
                    "so_kh_vt_luot": 1,
                    "solan_vt_dungtuyen": 1 if name_date in list_travel_date else 0,
                    "solan_vt_ngoaituyen": 1 if name_date not in list_travel_date else 0
                })
                monthly_summary_doc.insert(ignore_permissions=True)
        else:
            if existing_monthly_summary:
                monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary[0]["name"])
                monthly_summary_doc.so_kh_vt_luot += 1
                monthly_summary_doc.so_kh_vt_duynhat += 1
                if name_date in list_travel_date:
                    monthly_summary_doc.solan_vt_dungtuyen += 1
                else:
                    monthly_summary_doc.solan_vt_ngoaituyen += 1
                monthly_summary_doc.save(ignore_permissions=True)
            else:
                monthly_summary_doc = frappe.get_doc({
                    "doctype": "DMS Summary KPI Monthly",
                    "nam": year,
                    "thang": month,
                    "nhan_vien_ban_hang": user_name,
                    "nhom_ban_hang": sales_team,
                    "so_kh_vt_luot": 1,
                    "so_kh_vt_duynhat": 1,
                    "solan_vt_dungtuyen": 1 if name_date in list_travel_date else 0,
                    "solan_vt_ngoaituyen": 1 if name_date not in list_travel_date else 0
                })
                monthly_summary_doc.insert(ignore_permissions=True)

    def update_kpi_monthly_after_delete(self):
        # Lấy ngày tháng để truy xuất dữ liệu
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])
        start_date_str = f"{year:04d}-{month:02d}-01"
        last_day_of_month = calendar.monthrange(year, month)[1]
        end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
        start_date = frappe.utils.getdate(start_date_str)
        end_date = frappe.utils.getdate(end_date_str)

        # Lấy id của nhân viên
        user_id = frappe.session.user
        user_name = frappe.get_value("Employee", {"user_id": user_id}, "name")
        # Lấy tuyến của nhân viên
        router_employee = frappe.get_all("DMS Router", filters = {"employee": user_name}, fields = ["travel_date"])
        list_travel_date = [router["travel_date"] for router in router_employee]

        # Lấy thứ của ngày
        days = datetime.date.today()
        date = days.weekday()
        # Chuyển đổi sang tên của ngày trong tuần
        date_in_week = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"]
        name_date = date_in_week[date]

        # Kiểm tra xem khách hàng đã thực hiện checkin trong tháng này hay chưa
        kh_ma = self.kh_ma
        exists_checkin = self.existing_checkin(kh_ma=kh_ma, start_date=start_date, end_date=end_date, current_user=user_id)

        # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
        existing_monthly_summary = frappe.get_value(
            "DMS Summary KPI Monthly",
            {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name},
            "name"
        )

        if len(exists_checkin) > 1:
            if existing_monthly_summary:
                monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
                monthly_summary_doc.so_kh_vt_luot -= 1
                if name_date in list_travel_date:
                    monthly_summary_doc.solan_vt_dungtuyen -= 1
                else:
                    monthly_summary_doc.solan_vt_ngoaituyen -= 1
                monthly_summary_doc.save(ignore_permissions=True)
        else:
            if existing_monthly_summary:
                monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
                monthly_summary_doc.so_kh_vt_luot -= 1
                monthly_summary_doc.so_kh_vt_duynhat -= 1
                if name_date in list_travel_date:
                    monthly_summary_doc.solan_vt_dungtuyen -= 1
                else:
                    monthly_summary_doc.solan_vt_ngoaituyen -= 1
                monthly_summary_doc.save(ignore_permissions=True)

    def send_data_to_ekgis(self):
        frappe.enqueue(
            "mbw_dms.mbw_dms.doctype.dms_checkin.dms_checkin.send_checkin_to_ekgis",
            queue="default",                        # one of short, default, long
            timeout=None,                           # pass timeout manually
            is_async=True,                         # if this is True, method is run in worker
            now=False,                               # if this is True, method is run directly (not in a worker) 
            job_name=None,                          # specify a job name
            enqueue_after_commit=True,              # enqueue the job after the database commit is done at the end of the request
            at_front=False,                         # put the job at the front of the queue
            doc=self,                               # kwargs are passed to the method as arguments
        )

    def check_router(self):
        # Lấy tuyến của nhân viên
        user_id = frappe.session.user
        user_name = frappe.get_value("Employee", {"user_id": user_id}, "name")
        # Lấy thứ của ngày
        date_cre = datetime.datetime.strptime(self.creation, "%Y-%m-%d %H:%M:%S.%f")
        date = date_cre.weekday()
        # Chuyển đổi sang tên của ngày trong tuần
        date_in_week = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"]
        name_date = date_in_week[date]
        router_employee = frappe.get_all(
            "DMS Router",
            filters = {
                "employee": user_name,
				"travel_date": name_date
            },
            fields = ["name"]
        )
        if router_employee:
            for i in router_employee:
                i["customers"] = get_value_child_doctype("DMS Router", i["name"], "customers")
                for a in i["customers"]:
                    if self.kh_ten == a["customer"]:
                        self.checkin_dungtuyen = 1
                        self.save()

    def update_data_first_checkin(self):
        new_data = frappe.new_doc("DMS First Checkin Customer")
        customer_name = self.kh_ten
        existing_checkin = frappe.get_all("DMS Checkin", filters={"kh_ten": customer_name}, fields=["name"])

        if len(existing_checkin) == 1:
            if frappe.db.exists("Employee", {"user_id": self.owner}):
                employee = frappe.get_doc("Employee", {"user_id": self.owner}).as_dict()
                new_data.department = employee.department
                new_data.employee_id = employee.name
                new_data.employee_name = employee.employee_name

            cus = frappe.get_doc("Customer", {"customer_name": customer_name}).as_dict()
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
@frappe.whitelist(methods="POST")
def create_checkin(kwargs):
    try:
        print("checkout",kwargs)
        new_checkin = frappe.new_doc("DMS Checkin")

        normal_keys = [
            "kh_ma", "kh_ten", "kh_diachi", "kh_long", "kh_lat",
            "checkin_khoangcach", "checkin_trangthaicuahang", "checkin_donhang",
            "checkin_long", "checkin_lat", "checkin_dochinhxac",
            "checkout_khoangcach", "checkinvalidate_khoangcachcheckin",
            "checkinvalidate_khoangcachcheckout", "createdbyemail","checkin_id","checkin_dungtuyen",
            "is_check_inventory","is_route"
        ]
        int_key = [ "checkin_pinvao", "checkin_pinra"]
        datetime_keys = ["checkin_timegps"]
        date_keys = ["checkin_giovao", "checkin_giora"]
        for key, value in kwargs.items():
            if key in normal_keys:
                if key == "is_route":
                    new_checkin.set("checkin_dungtuyen", value)
                else:
                    new_checkin.set(key, value)
            if key in int_key:
                new_checkin.set(key,int( value))
            elif key in datetime_keys:
                new_checkin.set(key, get_time(value) if value else "")
            elif key in date_keys:
                created_date = validate_datetime(value)
                new_checkin.set(key, created_date)

        if kwargs.get("checkin_giora"):
            new_checkin.set("is_checkout", 1)
        images = kwargs.get("listImage")
        if images: 
            for image in images:
                new_checkin.append("checkin_hinhanh",{
                    "url_image":image
                })
        user_id = frappe.session.user
        employee_id = frappe.get_value("Employee", {"user_id": user_id}, "name")
        new_checkin.createbyname = employee_id

        employee = get_user_id()
        new_checkin.set("createbyname", employee.get("full_name"))
        new_checkin.set("createdbyemail", employee.get("email"))
        address = ""
        try:
            settings = frappe.db.get_singles_dict("DMS Settings")
            lat = kwargs.get("checkin_lat")
            lon = kwargs.get("checkin_long")
            if lat and lon: 
                key = settings.get("api_key")
                url = f"https://api.ekgis.vn/v1/place/geocode/reverse/address?latlng={lat},{lon}&gg=1&api_key={key}"
                if not key:
                    return gen_response(400, _("Not found setting key map"))

                # call geolocation
                response = requests.get(url)
                address = json.loads(response.text).get("results")
                print("address",address)
        except Exception as e:
            print("Lỗi lấy địa chỉ",e)
            address = ""
        new_checkin.set("checkin_address", address,"\n")
        print("new_checkin",new_checkin.as_dict())
        try:
            # validate_fields(new_checkin.as_dict())
            new_checkin.insert(ignore_permissions=True)
        except Exception as e:
            print("loi insert::::::::::::::",e)
        frappe.db.commit()
        return gen_response(201, "Thành công", {"name": new_checkin.name})
    
    except Exception as e:
        return exception_handle(e)


# Tạo mới checkin tồn kho
@frappe.whitelist(methods="POST")
def create_checkin_inventory(body):
    try:
        employee = frappe.get_doc("Employee", {"user_id": frappe.session.user})
        normal_keys = [
            "customer_code", "customer_name", "customer_type", "checkin_id"
        ]
        del body["cmd"]
        doc = frappe.new_doc("DMS Inventory")
        doc.set("create_by", employee.get("name"))

        for key, value in body.items():
            if key in normal_keys:
                doc.set(key, validate_filter(type_check="require_field", value=(value,key)))
            else:
                doc.set(key,value)
        items = body.get("inventory_items")

        for item in items:
            if isinstance(item, dict):
            # Validate and handle exp_time as timestamp
                if "exp_time" in item and item.get("exp_time"): 
                    item["exp_time"] = validate_filter(type_check="date", value=item["exp_time"])

                # Calculate total cost
                if 'quantity' in item and 'item_price' in item:
                    item['total_cost'] = item['quantity'] * item['item_price']
                item_info =frappe.db.get_value("Item",item.get("item_code"),["item_name"], as_dict=1)
                item["item_name"]=item_info.item_name if item_info else ""
            item["update_bycode"] = employee.get("name")
            item["update_byname"] = employee.get("fullname")
            item["update_at"] = time_now_utc().date()
            doc.append("items", item)
            
        doc.insert()
        frappe.db.commit()

        return gen_response(201, "Thành công", {"name": doc.name})
    except Exception as e:
        return exception_handle(e)


@frappe.whitelist(methods="POST")
def create_checkin_image(body):
    try:
        user = get_user_id()
        image = validate_filter(value=(body.get("image"), "image"), type_check="require_field")
        album_id = validate_filter(value=(body.get("album_id"), "album id"), type_check="require_field")
        album_name = validate_filter(type_check="require_field", value=(body.get("album_name"), "album name"))
        checkin_id = validate_filter(type_check="require_field", value=(body.get("checkin_id"), "checkin id"))
        customer_id = validate_filter(type_check="require_field", value=(body.get("customer_id"), "customer id"))
        customer_code = validate_filter(type_check="require_field", value=(body.get("customer_code"),"customer code"))
        customer_name = validate_filter(type_check="require_field", value=(body.get("customer_name"), "customer name"))

        address = body.get("address")
        long = validate_filter(type_check="require_field", value=(body.get("long"), "long"))
        lat = validate_filter(type_check="require_field", value=(body.get("lat"), "lat"))

        create_by = user.get("name")
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
            description += f"cDMSreate: {create_time}\\n"
        description= description.rstrip('\\n')
        try:
            rsUpload = upload_image_s3(image=image,description=description)
            image_push = {
                "doctype": "DMS Album Image",
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
            return gen_response(201, "", rsUpload) 
        except :
            return gen_response(200, "", {
                "status": False,
                "file_url" : None
            })
    except Exception as e:
        exception_handle(e)

# Cập nhật địa chỉ khách hàng
def update_address_customer(body):
    try:
        customer = validate_filter(type_check="require", value=body.get("customer"))
        checkin_id = validate_filter(type_check="require", value=body.get("checkin_id"))        
        long = validate_filter(type_check="require", value=body.get("long"))
        lat = validate_filter(type_check="require", value=body.get("lat"))
        address_location = null_location(json.dumps({"long": long, "lat": lat}))
        customer_info = frappe.db.get_value(doctype="Customer", filters= {"name": customer}, fieldname=["name", "customer_primary_address", "customer_name"], as_dict=1)
        
        if customer_info:
            # chuyển data từ mobile về dạng địa chỉ
            city = validate_filter(type_check="require", value=body.get("city"))
            county = body.get("county")
            state =body.get("state")
            address_line1 = validate_filter(type_check="require", value=body.get("address_line1"))
            city_info = frappe.db.get_value(doctype="DMS Province", filters={"ten_tinh": ["like", f"%{city}%"]}, fieldname=["ma_tinh"])
            if county:
                district_info = frappe.db.get_value(doctype="DMS District", filters={"ten_huyen": ["like", f"%{county}%"]}, fieldname=["ma_huyen"])
            if state:
                ward_info = frappe.db.get_value(doctype="DMS Ward", filters={"ten_xa": ["like", f"%{state}%"]}, fieldname=["ma_xa"])
            if not bool(city_info) : 
                return gen_response(404,_("Couldn't find city"), {})
            
            new_address = {
                    "address_title": f"{address_line1}, {state}, {county}, {city}",
                    "address_line1": address_line1, 
                    "city": city_info,   
                    "address_location":address_location       
                }
            address_title = f"{city}"
            if district_info:
                new_address.update({
                    "county": district_info,
                })
                address_title = f"{county}, " + address_title
            if ward_info:
                new_address.update({
                    "state": ward_info,
                })
                address_title = f"{state}, " + address_title
            address_title = f"{address_line1}, " + address_title
            new_address.update({"address_title": address_title})
            link_cs_address = {
                        "link_doctype": "Customer",
                        "link_name":customer,
                        "link_title": checkin_id
                    }
            
            curent_address  = create_address(new_address=new_address, link_cs_address=link_cs_address)
            doc_customer = frappe.get_doc("Customer", body.get("customer"))
            if doc_customer.get("customer_primary_address") != curent_address.get("name") :
                doc_customer.customer_primary_address = curent_address.get("name")
                doc_customer.save()
           
            frappe.db.commit()
            return gen_response(200, "Thành công", curent_address.get("name") )
        else:
            return gen_response(406, _("Không tồn tại khách hàng"), {})             
        
    except Exception as e:
        exception_handle(e)


# Cập nhật địa chỉ khách hàng
def update_address_customer_checkin(body):
    try:
        customer = validate_filter(type_check="require", value=body.get("customer"))
        checkin_id = body.get("checkin_id")        
        long = validate_filter(type_check="require", value=body.get("long"))
        lat = validate_filter(type_check="require", value=body.get("lat"))
        address_location = null_location(json.dumps({"long": long, "lat": lat}))
        customer_info = frappe.db.get_value(doctype="Customer", filters= {"name": customer}, fieldname=["name", "customer_primary_address", "customer_name"], as_dict=1)
        city = validate_filter(type_check="require", value = body.get("city"))
        county =validate_filter(type_check="require", value= body.get("county"))
        country = body.get("country")
        state =validate_filter(type_check="require", value=body.get("state"))
        address_line1 = body.get("address_line1")
        
        link_cs_address = {
                        "link_doctype": "Customer",
                        "link_name":customer                        
                    }
        if checkin_id :
            link_cs_address.update({"link_title": checkin_id})
        address_return = ""
        
        if customer_info:
            # không truyền lên địa chỉ
            if not bool(city) and not bool(address_line1):
                doc_customer = frappe.get_doc("Customer", body.get("customer"))
                if not bool(customer_info.get("customer_primary_address")):
                    doc_customer.customer_location_primary = address_location
                    doc_customer.save()
                else:
                    address_current = create_address_current(customer_info.get("customer_primary_address"),address_location,link_cs_address)
                    if address_current:
                        address_return = address_current.get("name")
                    else:
                        doc_customer.customer_location_primary = address_location
                        doc_customer.save()
                frappe.db.commit()

            # truyền lên địa chỉ thiếu trường
            elif not bool(city) or not bool(address_line1) :
                not_have = ""
                if not bool(city):
                    not_have += "Thành phố"
                if not bool(address_line1):
                    not_have = not_have + "và Địa chỉ chi tiết" if len(not_have)>1 else " Địa chỉ chi tiết"
                
                return gen_response(500,_(f"Vui lòng nhâp {not_have}"),{})
            # truyền lên đầy đủ:
            else:
                new_address = {
                        "address_title": "",
                        "address_line1":address_line1, 
                        "city": city.get("code"),   
                        "address_location":address_location,
                        "checkin_id ":checkin_id         
                    }
                # if country:
                #     new_address.update({"country":country})

                city_name = city.get("name")
                address_title = f"{city_name}"
                if county:
                    new_address.update({
                        "county": county.get("code"),
                    })
                    county_name = county.get("name")
                    address_title = f"{county_name}, " +address_title
                if state:
                    new_address.update({
                        "state": state.get("code"),
                    })
                    state_name =state.get("name")
                    address_title = f"{state_name}, " +address_title
                address_title = f"{address_line1}, " +address_title
                new_address.update({"address_title":address_title})    
                curent_address  = create_address(new_address=new_address, link_cs_address=link_cs_address)

                if customer_info.get("customer_primary_address") != curent_address.get("name") :
                    doc_customer = frappe.get_doc("Customer", body.get("customer"))
                    doc_customer.customer_primary_address = curent_address.get("name")        
                    doc_customer.save()
                    frappe.db.commit()
                address_return = address_title
            frappe.clear_cache()
            return gen_response(200, "Thành công", address_return)
        else:
            return gen_response(406, _("Không tồn tại khách hàng"), {})             
        
    except Exception as e:
        exception_handle(e)



# cancel checkout
@frappe.whitelist(methods="DELETE")
def cancel_checkout(data):
    try:
        gen_response(200,i18n.t("translate.successfully", locale=get_language()), [])
        checkin_id = data.get("checkin_id")
        customer_id = data.get("customer_id")
        # Xóa đơn hàng
        frappe.db.delete("Sales Order", {"checkin_id": checkin_id})
        # Xóa phiếu trả hàng
        frappe.db.delete("Sales Invoice", {"checkin_id": checkin_id})
        # Xóa album ảnh
        frappe.db.delete("DMS Album Image", {"checkin_id": checkin_id})
        # Xóa check tồn kho
        frappe.db.delete("DMS Inventory", {"checkin_id": checkin_id})
        address = frappe.db.get_all("Address", {"link_title": checkin_id}, ["name"])

        if len(address)>0:
            address = address[0]
            address = frappe.get_doc("Address",address.get("name"))
            links = address.links
            find_not_cs = pydash.filter_(links, lambda cs:cs.get("link_title") != checkin_id)
            address.set("links",find_not_cs)
            address.save()
            customer = frappe.get_doc("Customer",customer_id)
            customer.set("customer_primary_address",None)
            customer.set("customer_location_primary",None)
            customer.save(ignore_permissions = True)
        frappe.db.commit()
        # xoá địa chỉ
        return gen_response(200,"",{})
    except Exception as e :
        exception_handle(e)


def send_checkin_to_ekgis(doc):
    try:
        # Tạo mới ObjectID
        projectId = frappe.get_doc("DMS Settings").ma_du_an
        if projectId is None:
            frappe.throw("Chưa có Project ID")
            return
        api_key = frappe.get_doc("DMS Settings").api_key
        api_url = f"{API_URL_TRACKING}/{projectId}/object"
        params = {"api_key": api_key}
        data_post = {
            "name": frappe.session.user,
            "type": "driver"
        }
        objectId = ""
        user_name = frappe.db.get_list("Employee", filters={"user_id": frappe.session.user}, fields=["name", "object_id"])
        if user_name and user_name[0]["object_id"] is not None:
            objectId = user_name[0]["object_id"]
        else:
            response = requests.post(api_url, params=params, json=data_post)
            employee = frappe.get_doc("Employee", user_name[0]["name"])
            if response.status_code == 200:
                new_info = response.json()
                employee.object_id = new_info["results"].get("_id")
                employee.save()
                objectId = new_info["results"].get("_id")
            else:
                frappe.msgprint(f"Lỗi khi gọi API tạo mới object ID: {response.status_code}")
                return
            
        # Tích hợp dữ liệu checkin vào ekgis
        api_url_checkin=f"{API_URL}/{projectId}/{objectId}"
        ext = {"customer_name": doc.kh_ten, "address": doc.kh_diachi}
        json_object = json.dumps(ext)
        import pytz
        data_checkin = {
            "projectid":projectId,
            "objectid": objectId,
            "uuid": "",
            "lng": doc.kh_long,
            "lat": doc.kh_lat,
            "coordinates": "",
            "activity": "checkin",
            "battery_checkin": doc.checkin_pinvao,
            "battery_checkout": doc.checkin_pinra,
            "accuracy": doc.checkin_dochinhxac,
            "time_checkin": pytz.timezone("Asia/Ho_Chi_Minh").localize(doc.checkin_giovao).astimezone(pytz.utc),
            "time_checkout": "",
            "ext": json_object,
            "createddate":pytz.timezone("Asia/Ho_Chi_Minh").localize(doc.createddate).astimezone(pytz.utc),
            "timestamp": ""
        }
        response_checkin = requests.post(api_url_checkin, params=params, json=data_checkin)

        if response_checkin.status_code == 200:
                create_dms_log(status="Success")
        else:
            create_dms_log(status="Error", message=f"Lỗi khi gọi API checkin: {response_checkin.status_code}")
    
    except Exception as e:
        create_dms_log(status="Error", exception=e, rollback=True)
import requests

@frappe.whitelist(methods="GET")
def list_inventory(kwargs):
    try:
        checkin_id = kwargs.get("checkin_id")
        inventory = frappe.db.get_all("DMS Inventory", filters={"checkin_id": checkin_id} ,fields=["name", "checkin_id"])
        for i in inventory:
            i["items"] = get_value_child_doctype("DMS Inventory", i["name"], "items")
        return gen_response(200, "Thành công", inventory)
    except Exception as e:
        return exception_handle(e)
    


def get_report(filters={}):
    try:

        from_date = validate_filter(type_check="timestamp_to_date",type="start",value=filters.get("from_date"))
        to_date = validate_filter(type_check="timestamp_to_date",type="end",value=filters.get("to_date"))
        employee = filters.get("employee")
        sale_group = filters.get("sale_group")
        customer_type = filters.get("customer_type")
        customer_group = filters.get("customer_group")
        territory = filters.get("territory")
        page_size =  cint(filters.get("page_size", 20))
        page_number = cint(filters.get("page_number", 1))
        offset= page_size*(page_number-1)
        where = "WHERE createdbyemail IS NOT NULL AND is_checkout = 1"
        if sale_group:
            query_sale= f"""
            WITH RECURSIVE Tree AS (
            SELECT 
                sales_person_name,
                parent_sales_person,
                name,
                employee,
                is_group
            FROM 
                `tabSales Person`
            WHERE 
                name = '{sale_group}'

            UNION ALL

            SELECT 
                child.sales_person_name,
                child.parent_sales_person,
                child.name,
                child.employee,
                child.is_group
            FROM 
                `tabSales Person` child
            INNER JOIN Tree parent ON parent.name = child.parent_sales_person
        )

        SELECT * FROM Tree
        WHERE is_group = 0;
            """
            sales_person = frappe.db.sql(query_sale,as_dict=1)
            employee_codes = pydash.map_(sales_person,lambda x: x.employee)
            employee_id_users = frappe.db.get_all("Employee",filters={"name": ["in",employee_codes]},fields=["user_id"])
            employee_id_users = pydash.map_(employee_id_users,lambda x: x.user_id)
            employees =  ", ".join(f"'{user_id}'" for user_id in employee_id_users)
            where = f"{where} AND dc.createdbyemail in ({employees})"
        if employee:
            employee_info = frappe.db.get_value("Employee",employee,["user_id"],as_dict=1)
            where = f"{where} AND dc.createdbyemail = '{employee_info.user_id}'"
        if territory:
            employee_info = frappe.db.get_all("Customer",{"territory":territory},["customer_code"])
            customer_code_list = pydash.map_(employee_info,lambda x :x.customer_code)
            customers = ", ".join(f"'{customer_code}'" for customer_code in customer_code_list)
            where = f"{where} AND dc.kh_ma IN ({customers})"
        if customer_group:
            customers_list = frappe.db.get_all("Customer",{"customer_group":customer_group},["customer_code"])
            customer_code_list = pydash.map_(customers_list,lambda x :x.customer_code)
            customers = ", ".join(f"'{customer_code}'" for customer_code in customer_code_list)
            where = f"{where} AND dc.kh_ma IN ({customers})"
        if customer_type:
            customers_list = frappe.db.get_all("Customer",{"customer_type":customer_type},["customer_code"])
            customer_code_list = pydash.map_(customers_list,lambda x :x.customer_code)
            customers = ", ".join(f"'{customer_code}'" for customer_code in customer_code_list)
            where = f"{where} AND dc.kh_ma IN ({customers})"
        if from_date:
            where =  f"{where} AND dc.createddate >= '{from_date}'"
        if to_date:
            where =  f"{where} AND dc.createddate <= '{to_date}'"
        query = f"""

            WITH ImageCounts AS (
                SELECT 
                    dc.name AS checkin_name, 
                    COALESCE(COUNT(dci.url_image), 0) AS total_image
                FROM 
                    `tabDMS Checkin` dc
                LEFT JOIN 
                    `tabDMS Checkin Image` dci ON dc.name = dci.parent
                GROUP BY
                    dc.name
            ),

            
            NumberedGroups AS (SELECT 
                dc.createdbyemail AS employee_id, 
                dc.name, 
                dc.createbyname AS employee_name, 
                UNIX_TIMESTAMP(dc.createddate) as create_time,
                te.name AS employee_code,
                sp.parent_sales_person AS sale_group,
                SUM(TIMESTAMPDIFF(MINUTE, dc.checkin_giovao, dc.checkin_giora)) as total_time,
                TIMESTAMPDIFF(MINUTE, MIN(dc.checkin_giovao), MAX(dc.checkin_giora)) as total_work,
                CONCAT(
                    '[', 
                    GROUP_CONCAT(
                        CONCAT(
                            '{{"customer_name":"', dc.kh_ten, '",',
                            '"customer_code":"', dc.kh_ma, '",', 
                            '"customer_address":"', dc.kh_diachi, '",', 
                            '"checkin_address":"', dc.checkin_address, '",', 
                            '"customer_type":"', COALESCE( cs.customer_type,'') , '",', 
                            '"customer_group":"',COALESCE( cs.customer_group,''), '",', 
                            '"customer_sdt":"', COALESCE(cs.mobile_no,''), '",', 
                            '"customer_contact":"', COALESCE(  cs.customer_primary_contact,'') , '",', 
                            '"checkin":"',DATE_FORMAT(dc.checkin_giovao, '%H:%i'), '",', 
                            '"checkout":"',DATE_FORMAT(dc.checkin_giora, '%H:%i') , '",', 
                            '"distance":"', dc.checkin_khoangcach, '",', 
                            '"is_router":"', dc.checkin_dungtuyen, '",', 
                            '"total_image":"',  COALESCE(ic.total_image, 0), '",', 
                            '"is_check_inventory":"', dc.is_check_inventory, '",', 
                            '"is_order":"', IF(dc.checkin_donhang IS NOT NULL AND dc.checkin_donhang != '', True, False), '",', 
                            '"time_check":"', TIMESTAMPDIFF(MINUTE, dc.checkin_giovao, dc.checkin_giora), '"}}'
                        ) SEPARATOR ','
                    ),
                    ']'
                ) AS customers,
                ROW_NUMBER() OVER (ORDER BY dc.createddate) AS row_num
            FROM 
                `tabDMS Checkin` dc
            LEFT JOIN ImageCounts ic
            ON
                dc.name = ic.checkin_name
            LEFT JOIN`tabCustomer` cs
            ON 
                dc.kh_ma = cs.customer_code
            LEFT JOIN `tabEmployee` te
            ON
                te.user_id = dc.createdbyemail
            LEFT JOIN `tabSales Person` sp
            ON
                sp.employee = te.name
            {where}
            GROUP BY 
                employee_code,  DATE(dc.createddate)
            )
            
            SELECT *
            FROM NumberedGroups
            WHERE row_num > {offset} AND row_num <= {offset} + {page_size};
        """

        report = frappe.db.sql(query, as_dict=1)
        for row in report:
            row['customers'] = json.loads(row['customers']) if row['customers'] else []
        query2 = f"""
            SELECT COUNT(*) AS number_of_groups FROM (SELECT 
                te.name AS employee_code,
                DATE(dc.createddate) AS creation_date,
                COUNT(*) AS total_records
            FROM 
                `tabDMS Checkin` dc
            INNER JOIN `tabCustomer` cs ON dc.kh_ma = cs.customer_code
            LEFT JOIN `tabEmployee` te ON te.user_id = dc.createdbyemail
            RIGHT JOIN `tabSales Person` sp ON sp.employee = te.name
            {where}
            GROUP BY 
                te.name, DATE(dc.createddate))  AS grouped_counts
            """
        total = frappe.db.sql(query2,as_dict=1)
        return gen_response(200,"",{
            "data": report,
            "total": total[0].number_of_groups,
            "page_size": page_size,
            "page_number": page_number
        })
    except Exception as e:
        return exception_handle(e)
    
def validate_fields(data):
    field_descriptions = {
        "kh_ma": "Data",
        "kh_ten": "Data",
        "kh_diachi": "Data",
        "kh_long": "Float",
        "kh_lat": "Float",
        "checkin_giovao": "Datetime",
        "checkin_giora": "Datetime",
        "checkin_pinvao": "Int",
        "checkin_pinra": "Int",
        "checkin_khoangcach": "Float",
        "checkin_trangthaicuahang": "Check",
        "checkin_donhang": "Data",
        "checkin_hinhanh": "Table",
        "checkin_long": "Float",
        "checkin_lat": "Float",
        "checkin_address": "Data",
        "checkin_timegps": "Time",
        "checkin_dochinhxac": "Float",
        "checkout_khoangcach": "Float",
        "checkinvalidate_khoangcachcheckin": "Float",
        "checkinvalidate_khoangcachcheckout": "Float",
        "createddate": "Datetime",
        "createdbyemail": "Data",
        "createbyname": "Data",
        "checkin_id": "Data",
        "checkin_dungtuyen": "Check",
        "is_checkout": "Check",
        "is_check_inventory": "Check"
    }

    for field, field_type in field_descriptions.items():
        value = data.get(field)
        try:
            if field_type == "Float":
                float(value)
            elif field_type == "Int":
                int(value)
            # elif field_type == "Datetime":
            #     datetime.strptime(value, "%Y-%m-%d %H:%M:%S")
            # elif field_type == "Time":
            #     datetime.strptime(value, "%H:%M:%S").time()
            elif field_type == "Check":
                assert value in [0, 1]
            # Data and Table can be left as they are string or list
            print(f"{field}: {value} (Valid)")
        except (ValueError, TypeError, AssertionError) as e:
            print(f"Error in field {field}: {value} ({e})")