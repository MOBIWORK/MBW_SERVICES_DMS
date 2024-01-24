import frappe
from datetime import datetime
from frappe.utils.data import get_time
from mbw_dms.api.common import exception_handel, gen_response, get_language ,get_user_id,upload_image_s3
from mbw_dms.api.validators import (validate_datetime,validate_filter)
from mbw_dms.config_translate import i18n
import json

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
                created_date = validate_datetime(value)
                new_checkin.set(key, created_date)
            elif key == 'cmd':
                continue
            else:
                return gen_response(400, i18n.t('translate.invalid_field', locale=get_language()), {"key": key})
        
        new_checkin.insert()
        frappe.db.commit()
        return gen_response(200, "Thành công", {"name": new_checkin.kh_ma})
    except Exception as e:
        return exception_handel(e)
    

@frappe.whitelist(methods='POST')
def create_checkin_inventory(**body):
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
        return gen_response(200, "Thành công", {"name": doc.name})
    except Exception as e:
        return exception_handel(e)


@frappe.whitelist(methods='POST')
def create_checkin_image(**body):
    try:
        user = get_user_id()
        image =body.get('image')
        customer_name = body.get('customer_name')
        address = body.get('address')
        long = body.get('long')
        lat = body.get('lat')
        create_by =  user.get('name')
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
        rsUpload = upload_image_s3(image=image,description=description)
        gen_response(200,'',rsUpload) 
    except Exception as e:
        exception_handel(e)

# from frappe.model.naming import make_autoname
@frappe.whitelist(methods='PATCH')
def update_address_customer(**body):
    try:
        customer = validate_filter(type_check='require',value=body.get('customer'))
        city = validate_filter(type_check='require',value=body.get('city'))
        county = validate_filter(type_check='require',value=body.get('county'))
        country = validate_filter(type_check='require',value=body.get('country'))
        state = validate_filter(type_check='require',value=body.get('state'))
        address_line1 = validate_filter(type_check='require',value=body.get('address_line1'))
        long = validate_filter(type_check='require',value=body.get('long'))
        lat = validate_filter(type_check='require',value=body.get('lat'))
        address_location = json.dumps({"long": long,"lat":lat})

        customer_info = frappe.db.get_value(doctype="Customer",filters= {"name": customer},fieldname=['name','customer_primary_address',"customer_name"],as_dict=1)
        doc_customer = frappe.get_doc("Customer",body.get('customer'))
        doc_customer.customer_location_primary = address_location
        doc_customer.save()
        if customer_info:
            city_info = frappe.db.get_value(doctype="DMS Province",filters={"ten_tinh": ["like",f"%{city}%"]},fieldname=['ma_tinh'])
            district_info = frappe.db.get_value(doctype="DMS District",filters={"ten_huyen": ["like",f"%{county}%"]},fieldname=['ma_huyen'])
            ward_info = frappe.db.get_value(doctype="DMS Ward",filters={"ten_xa": ["like",f"%{state}%"]},fieldname=['name'])
            new_address = {
                    
                    "address_title": f"{address_line1}, {state}, {county}, {city}, {country}",
                    "address_line1":address_line1,                    
                    "state": ward_info,
                    "county": district_info,
                    "city": city_info,   
                    "address_location":address_location               
                }
            if customer_info.get("customer_primary_address"):
                # new_address.update({'name': f"{address_line1}, {state}, {county}, {city}"})
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
            gen_response(200,"",doc_address.get('address_title') )
            return
        else:
            gen_response(406,i18n.t('translate.not_found', locale=get_language()),False)             
        
    except Exception as e:
        exception_handel(e)