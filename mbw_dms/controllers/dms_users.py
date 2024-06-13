import frappe
from datetime import datetime
from mbw_dms.api.ekgis.constant import API_URL_TRACKING
import requests

def create_employee_and_sales_team(doc, method):
    # Tạo một bản ghi Employee mới
    if doc.birth_date and doc.gender:
        employee = frappe.new_doc("Employee")
        employee.first_name = doc.first_name
        employee.middle_name = doc.middle_name
        employee.last_name = doc.last_name
        employee.user_id = doc.name
        employee.date_of_birth = doc.birth_date
        employee.gender = doc.gender
        employee.date_of_joining = datetime.today()
        employee.status = "Active"
        employee.insert()

# Tạo mới ObjectID
def create_objid_employee(doc, method):
    projectId = frappe.get_doc("DMS Settings").ma_du_an
    if projectId is None:
        frappe.throw("Chưa có Project ID")
        return
    api_key = frappe.get_doc('DMS Settings').api_key
    api_url = f"{API_URL_TRACKING}/{projectId}/object"
    params = {"api_key": api_key}
    data_post = {
        "name": frappe.session.user,
        "type": "driver"
    }
    response = requests.post(api_url, params=params, json=data_post)
    if response.status_code == 200:
        new_info = response.json()
        doc.object_id = new_info["results"].get("_id")
        doc.save()
    else:
        frappe.msgprint(f"Lỗi khi gọi API tạo mới object ID: {response.status_code}")
        return
