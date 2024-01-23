from math import sin, cos, sqrt, atan2
import json
import io
import frappe
from bs4 import BeautifulSoup
from frappe import _
from frappe.utils import cstr
import urllib.parse
import http.cookies
from datetime import datetime, timedelta
import base64
from frappe.core.doctype.file.utils import delete_file
from frappe.utils.file_manager import (
    save_file
)

from mbw_dms.api.file import (
    my_minio
)
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
from frappe.desk.query_report import (
    normalize_result, get_report_result, get_reference_report)
from frappe.core.utils import ljust_list
from pypika import Query, Table, Field, Order
import array
from frappe.client import validate_link
from datetime import datetime, timezone
import pytz

BASE_URL = frappe.utils.get_request_site_address()

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
        frappe.response["message"] = BeautifulSoup(
            str(message), features="lxml").get_text()
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
    emp_data = frappe.db.get_value(
        "Employee",
        {"user_id": user},
        fields,
        as_dict=1,
    )
    return emp_data


def get_language():
    lang_ = frappe.local.request.headers.get("Language")
    lang = "vi" if not lang_ else lang_

    return lang

def exception_handel(e):
    frappe.log_error(title="DMS Mobile App Error",
                     message=frappe.get_traceback())
    return gen_response(406, cstr(e))
    
    if hasattr(e, "http_status_code"):
        return gen_response(e.http_status_code, cstr(e))
    else:
        return gen_response(406, cstr(e))

def get_user_id():
    headers = frappe.local.request.headers.get("Authorization")
    usrPass = headers.split(" ")[1]
    str_b64Val = base64.b64decode(usrPass).decode('utf-8')
    list_key = str_b64Val.split(':')
    api_key = list_key[0]
    user_id = frappe.db.get_value('User', {"api_key": api_key},['name','email'],as_dict=1)
    return user_id

def get_employee_id():
    try:
        user_id = get_user_id()
        return get_employee_by_user(user_id).get("name")
    except:
        return ""
    
def validate_image(user_image):
    if user_image and "http" not in user_image:
        user_image = BASE_URL + user_image
    return user_image
    
def get_datetime_now():
    return datetime.now(pytz.timezone('Asia/Ho_Chi_Minh')).replace(tzinfo=None)

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

def post_image(name_image, faceimage, doc_type, doc_name):
    # save file and insert Doctype File
    file_name = name_image + "_" + str(datetime.now()) + "_.png"
    imgdata = base64.b64decode(faceimage)

    doc_file = save_file(file_name, imgdata, doc_type, doc_name,
                         folder=None, decode=False, is_private=0, df=None)

    # delete image copy
    path_file = "/files/" + file_name
    delete_file(path_file)
    file_url = BASE_URL + doc_file.get('file_url')
    return file_url

def add_text_to_image(file_name, imgdata, description):
    ## add text to image
    # save image
    doc_file = save_file(file_name, imgdata, "", "",
                     folder=None, decode=False, is_private=0, df=None)
    # Open an Image
    path_file = frappe.get_site_path('public') + doc_file.file_url                
    img = Image.open(path_file)
    # Call draw Method to add 2D graphics in an image
    I1 = ImageDraw.Draw(img)
    # Custom font style and font size
    myFont = ImageFont.truetype('FreeMono.ttf', 65)
    # Add Text to an image
    lines = []
    position = (10, 10)
    x, y = position
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
    print("lines",lines)
    for line in lines:
        I1.text((x, y), line, font=myFont, fill=font_color)
        y += myFont.getsize(line)[1]
    # get image base64
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    image_base64_new = base64.b64decode(base64.b64encode(buffered.getvalue()))
    
    # delete file
    frappe.delete_doc('File', doc_file.name)
    path_file = "/files/" + file_name
    delete_file(path_file)
    ##
    return image_base64_new

def upload_image_s3(image,description,folder_s3):
    settings = frappe.get_doc("MBW Employee Settings").as_dict()
    bucket_name_s3 = settings.get('bucket_name_s3')
    endpoint_s3 = settings.get('endpoint_s3')
    imgdata = base64.b64decode(image)
    bucket_domain =frappe.local.site.replace('.','-')
    file_name = "checkin_" + \
        "_" + str(datetime.now()) + ".png"

    if description:
        imgdata_new = add_text_to_image(file_name, imgdata, description)
    else:
        imgdata_new = imgdata
    
    # save file image s3
    object_name = f"{bucket_domain}/{folder_s3}/{file_name}"
    if not my_minio.bucket_exists(bucket_domain):
        my_minio.make_bucket(bucket_domain)
    my_minio.put_object(bucket_name=bucket_domain,
                        object_name=folder_s3, data=io.BytesIO(imgdata_new))

    # data response
    data = {}
    data["file_url"] = f"https://{endpoint_s3}/{bucket_name_s3}/{object_name}"
    data['status'] = True
    return data