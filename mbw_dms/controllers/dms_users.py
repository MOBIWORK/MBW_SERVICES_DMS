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

# Tạo mới ObjectID- hiện tại thì không cần nữa
def create_objid_employee(doc, method):
    if doc.employee:
        employee = frappe.get_doc("Employee",doc.employee).as_dict()
        projectId = frappe.get_doc("DMS Settings").ma_du_an
        if projectId is None:
            frappe.throw("Chưa có Project ID")
            return
        api_key = frappe.get_doc('DMS Settings').api_key
        api_url = f"{API_URL_TRACKING}/{projectId}/object"
        params = {"api_key": api_key}
        data_post = {
            "name": f"{employee.name}-{employee.employee_name}",
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
# cập nhật employee- ObjectID
def update_objid_employee(doc, method):
    employee = doc
    try:
        sale_person = frappe.get_doc("Sales Person",{"employee": employee.name}).as_dict()
        if sale_person and sale_person.object_id:
            projectId = frappe.get_doc("DMS Settings").ma_du_an
            if projectId is None:
                frappe.throw("Chưa có Project ID")
                return
            api_key = frappe.get_doc('DMS Settings').api_key
            api_url = f"{API_URL_TRACKING}/object/{sale_person.object_id}"
            params = {"api_key": api_key}
            data_post = {
                "name": f"{employee.name}-{employee.employee_name}",
                "type": "driver"
            }
            response = requests.put(api_url, params=params, json=data_post)
            if response.status_code == 200:
                pass
            else:
                frappe.msgprint(f"Lỗi khi gọi API cập nhật object ID: {response.status_code}")
                return
    except: 
        pass
