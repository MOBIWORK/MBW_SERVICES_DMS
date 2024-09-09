import json
import io
import frappe
from bs4 import BeautifulSoup
from frappe import _
from frappe.utils import cstr
from datetime import datetime
import base64
from frappe.core.doctype.file.utils import delete_file
from frappe.utils.file_manager import save_file

from mbw_dms.api.file import create_my_minio
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
from frappe.desk.query_report import get_reference_report 
from datetime import datetime
import pytz
import pydash


def get_base_url() :

    if frappe.local.request.headers.get('X-Forwarded-Proto', 'http') == 'https':
        scheme = 'https'
    else:
        scheme = 'http'
    return f"{scheme}://{frappe.local.request.host}"





class CommonHandle() :
    @staticmethod
    def time_now_utc():
        now_utc = datetime.now(pytz.utc)
        hcm_timezone = pytz.timezone("Asia/Ho_Chi_Minh")
        time_now = now_utc.astimezone(hcm_timezone)
        return time_now
    @staticmethod
    def get_employee_by_user(user, fields=["name"]):
        if isinstance(fields, str):
            fields = [fields]
        emp_data = frappe.db.get_value("Employee", {"user_id": user}, fields, as_dict=1)
        return emp_data
    
    @staticmethod
    def get_user_id():
        
        headers = frappe.local.request.headers.get("Authorization")
        usrPass = headers.split(" ")[1]
        str_b64Val = base64.b64decode(usrPass).decode("utf-8")
        list_key = str_b64Val.split(':')
        api_key = list_key[0]
        user_id = frappe.db.get_value("User", {"api_key": api_key},["name", "email", "full_name"],as_dict=1)
        return user_id
    @staticmethod
    def get_employee_id():
        try:
            user_id = get_user_id()
            return get_employee_by_user(user_id.get("name")).get("name")
        except:
            return ""

def time_now_utc():
    now_utc = datetime.now(pytz.utc)
    hcm_timezone = pytz.timezone("Asia/Ho_Chi_Minh")
    time_now = now_utc.astimezone(hcm_timezone)
    return time_now

def convert_utc_time(timestamp:float):
    dt = datetime.fromtimestamp(timestamp)
    hcm_timezone = pytz.timezone("Asia/Ho_Chi_Minh")         # Xác định múi giờ của 'Asia/Ho_Chi_Minh'
    dt_hcm = dt.replace(tzinfo=hcm_timezone)        # Áp dụng múi giờ 'Asia/Ho_Chi_Minh' cho đối tượng datetime
    return dt_hcm

def this_week() :
    today = datetime.now()
    # Lấy số tuần trong năm
    week_number = int(today.strftime("%U")) +1
    week  = week_number % 5 if week_number % 5 != 0 or week_number % 5 != 1 else 1
    return week


# return definition
def gen_response(status, message, result=[]):
    frappe.response["http_status_code"] = status
    if status == 500:
        frappe.response["message"] = BeautifulSoup(str(message), features="lxml").get_text()
    else:
        frappe.response["message"] = message
    frappe.response["result"] = result

# export employee key
def generate_key(user):
    user_details = frappe.get_doc("User", user)
    api_secret = api_key = ""
    if not user_details.api_key and not user_details.api_secret:
        api_secret = frappe.generate_hash(length=15)
        # if api key is not set generate api key
        api_key = frappe.generate_hash(length=15)
        user_details.api_key = api_key
        user_details.api_secret = api_secret
        user_details.save(ignore_permissions=True)
    else:
        api_secret = user_details.get_password("api_secret")
        api_key = user_details.get("api_key")
    return {"api_secret": api_secret, "api_key": api_key}


def get_employee_by_user(user, fields=["name"]):
    if isinstance(fields, str):
        fields = [fields]
    emp_data = frappe.db.get_value("Employee", {"user_id": user}, fields, as_dict=1)
    return emp_data


def get_language():
    lang_ = frappe.local.request.headers.get("Language")
    lang = "vi" if not lang_ else lang_

    return lang

def exception_handle(e):
    frappe.log_error(title="DMS Mobile App Error", message=frappe.get_traceback())
    return gen_response(406, cstr(e),{})

def routers_name_of_customer(router=False, thisWeek = False, view_mode="list", more_filters=False):
    queryFilters = {"is_deleted": 0, "status": "Active"}
    user_id = get_user_id()

    if user_id.name != "Administrator":
        employee = get_employee_by_user(user = user_id.email)
        if not employee:
            return gen_response("404", _("Employee not registered"))
        queryFilters["employee"] = employee.name

    if router:
        queryFilters["channel_code"] = ["in", router]
   
    # lay danh sach theo ngay
    if thisWeek or view_mode == "map":
        from mbw_dms.api.common import weekday
        today= datetime.now()
        thu_trong_tuan, tuan_trong_thang = weekday(today)
        queryFilters.update({"travel_date": ["between", ["Không giới hạn", thu_trong_tuan]]})
        queryFilters.update({"frequency": ["like", tuan_trong_thang]})  

    if more_filters:
        queryFilters.update(more_filters)
    list_router = frappe.db.get_all("DMS Router", filters=queryFilters, pluck="name", distinct=True)
    return list_router

def customers_code_router(router=False, routersName=[], thisWeek = False, view_mode="list"):
    list_customer = []
    for router_name in routersName:
        detail_router = frappe.get_doc("DMS Router", {"name": router_name}).as_dict()
        customer = detail_router.get("customers")
        if view_mode == "map" or (router and not thisWeek):
            from mbw_dms.api.common import weekday
            today= datetime.now()
            thu_trong_tuan, tuan_trong_thang = weekday(today)
            customer = pydash.filter_(detail_router.get("customers"),lambda value: (value.frequency.find(str(int(tuan_trong_thang))) != -1))
        list_customer += customer

    list_customer_name = []
    for customer in list_customer:
        list_customer_name.append(customer.get("customer_code"))   
    return list_customer_name 


def get_user_id():
    id = frappe.get_user().doc.name
    if not id:
        headers = frappe.local.request.headers.get("Authorization")
        usrPass = headers.split(" ")[1]
        str_b64Val = base64.b64decode(usrPass).decode("utf-8")
        list_key = str_b64Val.split(':')
        api_key = list_key[0]
        user_id = frappe.db.get_value("User", {"api_key": api_key},["name", "email", "full_name"],as_dict=1)
    else :
        user_id = frappe.db.get_value("User", {"name": id},["name", "email", "full_name"],as_dict=1)
    return user_id

def get_employee_id():
    try:
        user_id = get_user_id()
        return get_employee_by_user(user_id.get("name")).get("name")
    except:
        return ""

def get_employee_info():
    try:
        user_id = get_user_id()
        return get_employee_by_user(user_id.get("email"), ["name", "user_id", "employee_name", "company"])
    except Exception as e:
        print("lỗi lấy thông tin nhân viên",e)
        return ""

def get_employee_by_name(name, fields=["name"]):
    if isinstance(fields, str):
        fields = [fields]
    emp_data = frappe.db.get_value("Employee", {"name": name}, fields, as_dict=1)
    return emp_data


def validate_image(user_image):
    if user_image and "http" not in user_image:
        user_image = get_base_url() + user_image
    return user_image
    
def get_datetime_now():
    return datetime.now(pytz.timezone("Asia/Ho_Chi_Minh")).replace(tzinfo=None)

# Get employee reports
def get_report_doc(report_name):
    doc = frappe.get_doc("Report", report_name)
    doc.custom_columns = []
    doc.custom_filters = []

    if doc.report_type == "Custom Report":
        custom_report_doc = doc
        doc = get_reference_report(doc)
        doc.custom_report = report_name
        if custom_report_doc.json:
            data = json.loads(custom_report_doc.json)
            if data:
                doc.custom_columns = data.get("columns")
                doc.custom_filters = data.get("filters")
        doc.is_custom_report = True

    if not doc.is_permitted():
        gen_response(403, "You don't have access to Report " + report_name, [])

    if not frappe.has_permission(doc.ref_doctype, "report"):
        gen_response(403, "You don't have permission", [])
    return doc


def null_location(location):
    if location == "" or not bool(location):
        location = None
    else:
        if not json.loads(location).get("long") or not json.loads(location).get("lat"):
            location = None
    return location

def update_address(new_address, link_cs_address, name_cus, json_location):
    try:
        field_not_in = ["longitude", "latitude", "address_location", "address"]
        if new_address.get("name"):
            name_add = new_address.get("name")
            if bool(name_cus):
                frappe.db.sql("""
                        UPDATE `tabCustomer` 
                        SET customer_primary_address=NULL, primary_address=NULL, customer_location_primary=NULL
                        WHERE name=%s AND customer_primary_address LIKE %s
                    """, (name_cus, f"{name_add}%"))
            
            frappe.db.delete("Address", name_add)

        new_address_doc = frappe.new_doc("Address")
        for key, value in new_address.items():
            if key not in field_not_in:
                setattr(new_address_doc, key, value)

        if link_cs_address:
            new_address_doc.append("links", link_cs_address)

        new_address_doc.address_location = json_location
        new_address_doc.save()
        current_address_cs = new_address_doc

        frappe.db.commit()
        return current_address_cs
    
    except Exception as e :
        raise TypeError(e)

def create_address(new_address, link_cs_address) :
    try: 
        field_not_in = ["primary", "address_title", "name"]
        address_title = new_address.get("address_title")
        filter = {}
        if address_title: 
            filter = {"address_title": ["like", f"{address_title}%"]}
        if new_address.get("name"):
            filter = {"name": new_address.get("name")}
        
        current_address_cs = None
        
        if frappe.db.exists("Address", filter):
            current_address_cs = frappe.db.get_value("Address", filter, ["name", "address_location"], as_dict=1)
        if current_address_cs:
            current_address_cs = frappe.get_doc("Address", current_address_cs.get("name"))
            
            for key, value in new_address.items():
                if key not in field_not_in:
                    current_address_cs.set(key, value)    
            current_address_cs.address_location = new_address.get("address_location")

            if bool(link_cs_address):
                links = current_address_cs.links
                find_cs = pydash.filter_(links, lambda cs: cs.get("link_doctype") ==  link_cs_address.get("link_doctype") and cs.get("link_name") != link_cs_address.get("link_name"))
                find_cs.append(link_cs_address)
                current_address_cs.set("links", find_cs) 
            current_address_cs.save()

        else:
            new_address_doc = frappe.new_doc("Address")
            for key, value in new_address.items():
                setattr(new_address_doc, key, value)
            if link_cs_address:
                new_address_doc.append("links", link_cs_address)
            new_address_doc.save()
            current_address_cs = new_address_doc

        frappe.db.commit()
        return current_address_cs
    
    except Exception as e :
        raise TypeError(e)


def create_address_current(address_title, new_location, link_cs_address) :
    current_address = frappe.db.get_value("Address", {"name": ["like",f"{address_title}%"]}, ["name", "address_location"], as_dict=1)
    if current_address:
        current_address_cs = frappe.get_doc("Address", current_address.get("name"))
        current_address_cs.address_location = new_location
        if link_cs_address:
            links = current_address_cs.links
            find_cs = pydash.filter_(links, lambda cs: cs.get("link_doctype") ==  link_cs_address.get("link_doctype") and cs.get("link_name") != link_cs_address.get("link_name"))
            find_cs.append(link_cs_address)
            current_address_cs.set("links", find_cs)        
        current_address_cs.save()
    else:
        new_address_doc = frappe.new_doc("Address")
        new_address = handle_address(address_title)
        if new_address:
            for key,value in new_address.items():
                setattr(new_address_doc, key, value)
            if link_cs_address:
                new_address_doc.append("links", link_cs_address)
            new_address_doc.save()
            current_address_cs = new_address_doc
        else :
            current_address_cs = False
    return current_address_cs


def try_c(cb):
    try:
        ra= cb
        return ra
    except Exception as e:
        print("=========11111111111111111111111111",e)
#xử lý thêm mới/cập nhật địa chỉ
def handle_address_customer(address_info,link_to_customer):
    try:
        key_info = ["address_title","address_type","address_line1","city","county","state","is_primary_address","is_shipping_address","address_location"]
        address_info = frappe._dict(address_info)
        id_address = address_info.name if address_info.name and address_info.name != "" else False
        exit_address_title = frappe.db.exists("Address",{"address_title": ["like",f"%{address_info.address_title}%"],"name": ["!=",id_address]})
        if id_address and frappe.db.exists("Address",id_address):
            doc_address =frappe.get_doc("Address",id_address)
            #kiểm tra đã tồn tại address muốn đối sang chưa
            if exit_address_title: 
                for key,value in address_info.items():
                    if key in key_info:
                        doc_address.set(key,value)
                links = doc_address.get("links")
                if len(link_to_customer) >0 :
                    links = pydash.filter_(links,lambda x:x.get("link_doctype") != link_to_customer.get("link_doctype") and x.get("link_name") != link_to_customer.get("link_name"))
                #xóa khách ở địa chỉ cũ nếu có nhiều khách , xóa luôn địa chỉ nếu chỉ có 1 khách liên kết
                doc_address.set("links",links)
                doc_address.save()
                curent_address = frappe.get_doc("Address",{"address_title": ["like",f"%{address_info.address_title}%"]})
                if len(link_to_customer) >0 :
                    curent_address.append("links",link_to_customer)
                curent_address.save()
                frappe.db.commit()
                return curent_address
            else:
                for key,value in address_info.items():
                    if key in key_info:
                        doc_address.set(key,value)
                doc_address.save()
                frappe.db.commit()
                return doc_address
        else:
            if exit_address_title: 
                curent_address = frappe.get_doc("Address",{"address_title": ["like",f"%{address_info.address_title}%"]})
                for key,value in address_info.items():
                    if key in key_info:
                        curent_address.set(key,value)
                if len(link_to_customer) >0 :
                    curent_address.append("links",link_to_customer)
                curent_address.save()
                frappe.db.commit()
                return curent_address
            else:
                new_address = frappe.new_doc("Address")
                for key,value in address_info.items():
                    if key in key_info:
                        new_address.set(key,value)
                if len(link_to_customer) >0 :
                    new_address.append("links",link_to_customer)
                new_address.insert()
                frappe.db.commit()
                return new_address
    except Exception as e :
        return None        

def handle_address(address_title) : 
    address_oop = {"address_title": address_title}
    arr_address = address_title.split(",")
    arr_address = pydash.map_(arr_address, lambda x : x.strip())
    lenAdd = len(arr_address)
    if len == 1:
        return False
    elif len == 2:
        address_oop.update({               
                        "address_line1": arr_address[0], 
                        "city": arr_address[1],  
                    })
    elif len == 3:
        address_oop.update({               
                        "address_line1": arr_address[0], 
                        "county": arr_address[1],
                        "city": arr_address[2],  
                    })
    elif len == 4:
        address_oop.update({               
                        "address_line1": arr_address[0], 
                        "state": arr_address[1],
                        "county": arr_address[2],
                        "city": arr_address[3],  
                    })
    else :
        address_oop.update({               
                        "state": arr_address[len-3],
                        "county": arr_address[len-2],
                        "city": arr_address[len-1],  
                    })
        address_line1 = ",".join(arr_address[:-3])
        address_oop.update({
            "address_line1": address_line1,
        })
    city_info = frappe.db.get_value(doctype="DMS Province", filters={"ten_tinh": ["like", f"%{address_oop.city}%"]}, fieldname=["ma_tinh"])
    if not city_info:
        return False
    else:
        address_oop.update({"city": city_info,})

    if address_oop.county:
        district_info = frappe.db.get_value(doctype="DMS District", filters={"ten_huyen": ["like", f"%{address_oop.county}%"]}, fieldname=["ma_huyen"])
        if district_info :
             address_oop.update({"county": district_info,})
        else:
            del address_oop["county"]                   
     
    if address_oop.state:
        ward_info = frappe.db.get_value(doctype="DMS Ward", filters={"ten_xa": ["like", f"%{address_oop.state}%"]}, fieldname=["ma_xa"])
        if ward_info:
            address_oop.update({"state": ward_info,})
        else:
            del address_oop["state"]
    return address_oop

def post_image(name_image, faceimage, doc_type, doc_name):
    try: 
        # save file and insert Doctype File
        file_name = name_image + "_"+ str(datetime.now()) + "_.png"
        imgdata = base64.b64decode(faceimage)
        doc_file = save_file(file_name, faceimage, doc_type, doc_name, folder=None, decode=True, is_private=0, df=None)

        # delete image copy
        path_file = "/files/" + file_name
        delete_file(path_file)
        file_url = get_base_url() + doc_file.get('file_url')
        return file_url
    except Exception as e:
        print("error update image",e)
        raise ValueError(e)

def add_text_to_image(file_name, imgdata, description):
    # add text to image
    # save image
    doc_file = save_file(file_name, imgdata, "", "", folder=None, decode=False, is_private=0, df=None)

    # Open an Image
    path_file = frappe.get_site_path("public") + doc_file.file_url                
    img = Image.open(path_file)

    # Call draw Method to add 2D graphics in an image
    I1 = ImageDraw.Draw(img)

    # Custom font style and font size
    font_size = 15
    myFont = ImageFont.truetype("FreeMono.ttf", font_size)

    # Add Text to an image
    lines = []
    position = (10, 10)
    x, y = position
    image_width, image_height = img.size
    max_width = img.width - 2 * (x + y)
    font_color = (255, 0, 0)

    for line in description.split("\\n"):
        # Split line into words
        words = line.split()
        current_line = words[0]
        for word in words[1:]:
            # Check if adding the next word exceeds max_width
            if I1.textbbox(xy=(x,y),text=current_line + " " + word, font=myFont)[0] <= max_width:
                current_line += " " + word
            else:
                lines.append(current_line)
                current_line = word
        
        lines.append(current_line)
    for line in lines:
        I1.text((x, y), line, font=myFont, fill=font_color)
        y += font_size

    # get image base64
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    image_base64_new = base64.b64decode(base64.b64encode(buffered.getvalue()))
    
    # delete file
    frappe.delete_doc("File", doc_file.name)
    path_file = "/files/" + file_name
    delete_file(path_file)
    return image_base64_new

def upload_image_s3(image,description):
    settings = frappe.get_doc("DMS Settings").as_dict()
    bucket_name_s3 = settings.get('bucket_name_s3')
    # bucket_name_s3 = "mbw-dms"
    endpoint_s3 = settings.get('endpoint_s3')
    imgdata = base64.b64decode(image)
    bucket_domain = frappe.local.site.replace('.','-')
    file_name = "checkin_" + \
        "_" + str(datetime.now()).replace(" ","_") + ".png"
    
    if description:
        imgdata_new = add_text_to_image(file_name, imgdata, description)
    else:
        imgdata_new = imgdata
    
    # save file image s3
    object_name = f"{bucket_name_s3}/{bucket_domain}/{file_name}"
    # if not my_minio.bucket_exists(bucket_domain):
    #     my_minio.make_bucket(bucket_domain)
    try:    
        create_my_minio('DMS Settings').put_object(bucket_name=bucket_name_s3, object_name=f"{bucket_domain}/{file_name}", data=io.BytesIO(imgdata_new))
    except Exception as e:
        print(e)

    # data response
    data = {}
    data["file_url"] = f"https://{endpoint_s3}/{object_name}"
    data["status"] = True
    return data

# Lấy ra các field của doctype con
def get_value_child_doctype(master_doctype, master_name, name_field):
	if not master_name:
		return
	from frappe.model import child_table_fields, default_fields

	filed_master = frappe.get_doc(master_doctype, master_name)

	field_child = []
	for i, child in enumerate(filed_master.get(name_field)):
		child = child.as_dict()

        # Xóa các trường không cần thiết
		for fieldname in default_fields + child_table_fields:
			if fieldname in child:
				del child[fieldname]

		field_child.append(child)

	return field_child


class ArrayMethod():
    def __init__(self, data=[]):
      self.main = data
    
    def find(self, callback):
        for value in self.main :
            if callback(value):
                return value
    def filter(self, callback):
        array = []
        for value in self.main :
            if callback(value):
                array.append(value)
        return array
    
    def toMap(self, callback):
        array = []
        for value in self.main:
            value = callback(value)
            array.append(value)
        return array
    
def weekday(time:datetime):
    first_week_month = time.replace(day=1)
    W_first = float(first_week_month.strftime("%W"))
    listngay = ("Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7")
    anh_xa_ngay_sang_so = {
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6,
        "Sunday": 0
    }
    thu_trong_tuan = listngay[anh_xa_ngay_sang_so[time.strftime("%A")]]
    w = float(time.strftime("%W"))
    tuan =(w - W_first) + 1 if (w - W_first) + 1 <5 else 1
    return thu_trong_tuan, tuan


# Tính tuần hiện tại của tháng
def current_month_week():
    today = datetime.today()
    # Lấy ngày đầu tiên của tháng
    first_day_of_month = today.replace(day=1)
    # Tính toán số ngày đã trôi qua từ đầu tháng
    passed_days = (today - first_day_of_month).days
    # Tính toán tuần hiện tại của tháng
    current_week = passed_days // 7 + 1
    return current_week
    

def get_child_values_doc(doctype, master_name, fields_to_get, chil_name):
    if not master_name:
        return
    master_doc = frappe.get_doc(doctype, master_name)

    chil_values = master_doc.get(chil_name)

    result = []

    for item in chil_values:
        item_dict = {}
        for fieldname in fields_to_get:
            item_dict[fieldname] = item.get(fieldname)
        result.append(item_dict)

    return result


# Lấy sales person cha từ sales person con
def get_all_parent_sales_persons(sales_person):
    parent_sales_persons = []
    parent = frappe.get_value("Sales Person", sales_person, "parent_sales_person")

    while parent:
        is_group = frappe.get_value("Sales Person", parent, "is_group")
        if is_group == 1:
            parent_sales_persons.append(parent)
        parent = frappe.get_value("Sales Person", parent, "parent_sales_person")

    return parent_sales_persons




# lấy con tất cả các con nhóm bán hàng của nhân viên
def get_sales_group_child(sale_person = "Sales Team",is_group=1,query=""):
    query_sale= f"""
        WITH RECURSIVE Tree AS (
        SELECT 
            sp.sales_person_name,
            sp.parent_sales_person,
            sp.name,
            sp.employee,
            sp.is_group,
            em.employee_name
        FROM 
            `tabSales Person` sp
        LEFT JOIN `tabEmployee` em
        ON sp.employee = em.name
        WHERE 
            sp.name = '{sale_person}'
        UNION ALL

        SELECT 
            child.sales_person_name,
            child.parent_sales_person,
            child.name,
            child.employee,
            child.is_group,
            em.employee_name
        FROM 
            `tabSales Person` child
        LEFT JOIN `tabEmployee` em
        ON child.employee = em.name
        INNER JOIN Tree parent ON parent.name = child.parent_sales_person
    )

        SELECT * FROM Tree
        {query}
        """
    
    sales_persons = frappe.db.sql(query_sale,as_dict=1)
    if is_group == 1:
        employee_codes = pydash.map_(sales_persons,lambda x: x.employee)
        employee_id_users = frappe.db.get_all("Employee",filters={"name": ["in",employee_codes]},fields=["user_id"])
        employee_id_users = pydash.map_(employee_id_users,lambda x: x.user_id)
        return employee_codes,employee_id_users
    else:
        return  sales_persons
# lấy con tất cả các con nhóm bán hàng của nhân viên
def get_sales_group_child_v2(sale_person = "Sales Team",obj="all",get_employee=False):
    query=""
    if obj == 1:
        query = "WHERE is_group = '1'"
    elif obj == 0:
        query = "WHERE is_group = '0'"
    query_sale= f"""
        WITH RECURSIVE Tree AS (
        SELECT 
            sp.sales_person_name,
            sp.parent_sales_person,
            sp.name,
            sp.employee,
            sp.is_group,
            em.employee_name
        FROM 
            `tabSales Person` sp
        LEFT JOIN `tabEmployee` em
        ON sp.employee = em.name
        WHERE 
            sp.name = '{sale_person}'
        UNION ALL

        SELECT 
            child.sales_person_name,
            child.parent_sales_person,
            child.name,
            child.employee,
            child.is_group,
            em.employee_name
        FROM 
            `tabSales Person` child
        LEFT JOIN `tabEmployee` em
        ON child.employee = em.name
        INNER JOIN Tree parent ON parent.name = child.parent_sales_person
    )

        SELECT * FROM Tree
        {query}
        """
    # danh sách sale person theo bộ lọc
    sales_persons = frappe.db.sql(query_sale,as_dict=1)
    #lấy tất cả thông tin sale team theo bộ lọc
    sales_info = sales_persons
    if get_employee:
        # mã nhân viên trong sanh sách
        employee_codes = pydash.map_(sales_persons,lambda x: x.employee)
        employee_codes = pydash.filter_(employee_codes,lambda x: bool(x))
        employee_id_users = frappe.db.get_all("Employee",filters={"name": ["in",employee_codes]},fields=["user_id","name"])
        # employee_id_users = pydash.map_(employee_id_users,lambda x: x.user_id)
        for sale_p in sales_persons:
            employee_info= {}
            if sale_p.get("employee"):
                employee_info = pydash.find(employee_id_users,lambda x: x.name == sale_p.get("employee") )
            sale_p.update({
                "employee_info":employee_info
            })

    return sales_persons
CommonHandle.create_address = staticmethod(create_address)

CommonHandle.get_employee_info = staticmethod(get_employee_info)

CommonHandle.get_user_id = staticmethod(get_user_id)

def test_box(cb):
    try:
        cb()
    except SyntaxError as e:
        print(f"Syntax error detected: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

CommonHandle.test_box = staticmethod(test_box)
import base64
def check_base64(sb):
    try:
        # Kiểm tra nếu đầu vào là chuỗi byte, nếu không thì chuyển đổi
        if isinstance(sb, str):
            sb_bytes = sb.encode('ascii')
        else:
            sb_bytes = sb

        # Giải mã chuỗi base64
        base64.b64decode(sb_bytes)
        
        # Kiểm tra xem chuỗi có hợp lệ (không thừa ký tự) không
        return base64.b64encode(base64.b64decode(sb_bytes)).decode('ascii') == sb
    except Exception:
        return False
CommonHandle.check_base64 = staticmethod(check_base64)




def buildQuery(query,condition):
    if query == "":
        query = f"WHERE {condition}"
    else:
        query = f"{query} AND {condition}"
    return query

CommonHandle.buildQuery = staticmethod(buildQuery)
from frappe.permissions import has_permission
from frappe.utils import cint
def get_list_search(
        doctype: str,
	    txt: str,
        start: int = 0,
	    page_length: int = 10,
        reference_doctype: str | None = None,
	    ignore_user_permissions: bool = False,
) :
    try:
        start = cint(start)
        #lấy metadata của doctype
        meta = frappe.get_meta(doctype)
    
        filters = []
        or_filters = []
        # dựng tìm kiếm 
        if txt:
            field_types = {
                "Data",
                "Text",
                "Small Text",
                "Long Text",
                "Link",
                "Select",
                "Read Only",
                "Text Editor",
            }
            search_fields = ["name"]
            # kiểm tra field: title field
            if meta.title_field:
                search_fields.append(meta.title_field)
            # kiểm tra field: search field
            if meta.search_fields:
                search_fields.extend(meta.get_search_fields())
            print("search_fields============",search_fields)
            for f in search_fields:
                fmeta = meta.get_field(f.strip())
                # nếu không có doc cha
                if not meta.translated_doctype and (f == "name" or (fmeta and fmeta.fieldtype in field_types)):
                    or_filters.append([doctype, f.strip(), "like", f"%{txt}%"])

        if meta.get("fields", {"fieldname": "enabled", "fieldtype": "Check"}):
            filters.append([doctype, "enabled", "=", 1])
        if meta.get("fields", {"fieldname": "disabled", "fieldtype": "Check"}):
            filters.append([doctype, "disabled", "!=", 1])
        # trả về 1 danh sách các search field
        from frappe.desk.search import get_std_fields_list,get_order_by
        fields = get_std_fields_list(meta, "name")
        formatted_fields = [f"`tab{meta.name}`.`{f.strip()}`" for f in fields]
        # thêm truy vấn title sau tên
        if meta.show_title_field_in_link and meta.title_field:
            formatted_fields.insert(1, f"`tab{meta.name}`.{meta.title_field} as `label`")
        # lấy order
        order_by_based_on_meta = get_order_by(doctype, meta)
        # `idx` is number of times a document is referred, check link_count.py
        order_by = f"`tab{doctype}`.idx desc, {order_by_based_on_meta}"

        # làm sạch chuỗi truy vấn: loại bỏ sql injection
        if not meta.translated_doctype:
            _txt = frappe.db.escape((txt or "").replace("%", "").replace("@", ""))
		    # xếp các dco ra kết quả tìm kiếm trước , null sau
            _relevance = f"(1 / nullif(locate({_txt}, `tab{doctype}`.`name`), 0))"
            formatted_fields.append(f"""{_relevance} as `_relevance`""")
            # Since we are sorting by alias postgres needs to know number of column we are sorting
            if frappe.db.db_type == "mariadb":
                order_by = f"ifnull(_relevance, -9999) desc, {order_by}"
            elif frappe.db.db_type == "postgres":
                # Since we are sorting by alias postgres needs to know number of column we are sorting
                order_by = f"{len(formatted_fields)} desc nulls last, {order_by}"
        
        ignore_permissions = doctype == "DocType" or (
            cint(ignore_user_permissions)
            and has_permission(
                doctype,
                ptype="select" if frappe.only_has_select_perm(doctype) else "read",
                parent_doctype=reference_doctype,
            )
        )

        values = frappe.get_list(
            doctype,
            filters=filters,
            fields=formatted_fields,
            or_filters=or_filters,
            limit_start=start,
            limit_page_length=None if meta.translated_doctype else page_length,
            order_by=order_by,
            ignore_permissions=ignore_permissions,
            reference_doctype=reference_doctype,
            as_list=True,
            strict=False,
        )
        print("values",values)
        # import thư viện xử lý biểu thức chính quy
        import re
        if meta.translated_doctype:
		# Filtering the values array so that query is included in very element
            values = (
                result
                for result in values
                if any(
                    re.search(f"{re.escape(txt)}.*", _(cstr(value)) or "", re.IGNORECASE)
                    for value in result.values() 
                )
            )

        # Sorting the values array so that relevant results always come first
        # This will first bring elements on top in which query is a prefix of element
        # Then it will bring the rest of the elements and sort them in lexicographical order
        from frappe.desk.search import relevance_sorter
        values = sorted(values, key=lambda x: relevance_sorter(x, txt, False))

        # remove _relevance from results
        if not meta.translated_doctype:
             values = [r[:-1] for r in values]          

        return values
    except Exception as e: 
        print("error search====",e)
        return []