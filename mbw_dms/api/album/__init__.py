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
from mbw_dms.api.validators import validate_not_none, validate_choice, validate_datetime, validate_date
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
def list_album_image(**kwargs):
    try:
        date_format = "%H:%M, %d-%m-%Y"
        my_filter = {}
        
        name = kwargs.get('album')
        customer_name = kwargs.get('customer_name')
        owner = kwargs.get('owner')
        sales_person_name = kwargs.get('sales_person_name')
        creation = kwargs.get('creation')
        if name:
            my_filter["name"] = ['like', f'%{name}%']
        if customer_name:
            my_filter["customer_name"] = ['like', f'%{customer_name}%']
        if owner:
            my_filter["owner"] = ['like', f'%{owner}%']
        if creation:
            # my_filter["creation"] = ['like', f'%{datetime.fromtimestamp(float(creation))}%']
            my_filter["creation"] = ['like', f'%{creation}%']
        if sales_person_name:
            my_filter1["sales_person_name"] = ['like', f'%{sales_person_name}%']
        album_image = frappe.db.get_list('DMS Album Image',filters=my_filter, fields=["name","creation", "owner", "album_id", "album_name", "checkin_id", "customer_id", "customer_name", "customer_code", "customer_long", "customer_lat", "image_url"])
        for albums in album_image:
            albums['detail_employee'] = frappe.db.get_all("Employee", {"user_id": albums.get('owner')}, ['name', 'first_name'])
            albums['info_customer'] = frappe.db.get_all("Customer", {"customer_code": albums.get('customer_code')}, ['customer_name','customer_type', 'customer_group'])
            albums['creation'] = (albums.get('creation')).strftime('%H:%M, %d-%m-%Y')
            # albums['creation'] = datetime.strptime(albums.get('creation'), date_format).timestamp()
            my_filter1 = {"employee": albums['detail_employee'][0].name , "is_group": 1}
            albums['person'] = frappe.db.get_all("Sales Person", filters=my_filter1, fields=["sales_person_name"])
        gen_response(200, "Thành công", album_image)
    except Exception as e:
        return exception_handel(e)
#backup
@frappe.whitelist(methods="GET")
def list_test(**kwargs):
    try:
        from pypika import Query, Table, functions as fn 
        name = kwargs.get('album')
        customer_name = kwargs.get('customer_name')
        owner = kwargs.get('owner')
        parent_sales_person = kwargs.get('parent_sales_person')
        creation = kwargs.get('creation')
        Employee = frappe.qb.DocType('Employee')
        Customer = frappe.qb.DocType('Customer')
        DMSAlbumImage = frappe.qb.DocType('DMS Album Image')
        SalesPerson = frappe.qb.DocType('Sales Person')
        query_code = (SalesPerson.enabled == 1) & (SalesPerson.is_group == 0)
        if creation:
            query_code = query_code & (fn.Date(DMSAlbumImage.creation) == datetime.fromtimestamp(int(creation)).date())
        if parent_sales_person:
            query_code = query_code & (SalesPerson.parent_sales_person == parent_sales_person)
        if customer_name:
            query_code = query_code & (Customer.customer_name == customer_name)
        if name:
            query_code = query_code & (DMSAlbumImage.album_name == name)
        print('========================= value: ',query_code)
        data = ( frappe.qb.from_(DMSAlbumImage)
                .inner_join(Employee)
                .on(DMSAlbumImage.owner == Employee.user_id)
                .inner_join(Customer)
                .on(Customer.customer_code == DMSAlbumImage.customer_code)
                .inner_join(SalesPerson)
                .on(SalesPerson.employee == Employee.name)
                .where(query_code)
                .select((DMSAlbumImage.name).as_("DMS_ID"), DMSAlbumImage.owner, 
                        DMSAlbumImage.creation, DMSAlbumImage.album_id, DMSAlbumImage.album_name, 
                        DMSAlbumImage.album_id, DMSAlbumImage.checkin_id,
                        DMSAlbumImage.customer_id, DMSAlbumImage.customer_name,
                        DMSAlbumImage.customer_code, DMSAlbumImage.customer_long,
                        DMSAlbumImage.customer_lat, DMSAlbumImage.image_url,
                        (Employee.name).as_("Eployee_ID"), Employee.first_name,
                        Customer.customer_name, Customer.customer_type, Customer.customer_group,
                        SalesPerson.parent_sales_person)
                .run(as_dict=True) )
        for datas in data:
            print(type(datas['creation']))
            datas['creation'] = (datas.get('creation')).strftime('%H:%M, %d-%m-%Y')
        return data
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