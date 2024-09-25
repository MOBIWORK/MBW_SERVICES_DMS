import frappe
from mbw_dms.api.common import get_all_parent_sales_persons
from mbw_dms.api.ekgis.constant import API_URL_TRACKING
import requests

def update(doc, method=None):
    previous_doc = doc.get_doc_before_save()
    data = doc.as_dict()
    #tạo object id
    if doc.employee and not doc.object_id:
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
    # cập nhật object id   
    if doc.employee and doc.employee != previous_doc.employee and not previous_doc.employee:
        employee = frappe.get_doc("Employee",doc.employee).as_dict()
        projectId = frappe.get_doc("DMS Settings").ma_du_an
        if projectId is None:
            frappe.throw("Chưa có Project ID")
            return
        api_key = frappe.get_doc('DMS Settings').api_key
        api_url = f"{API_URL_TRACKING}/object/{doc.object_id}"
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
        
    #xóa objectid khi sales person không được gán
    if not doc.employee:
        delete_employee(doc,method)


    if doc.sales_manager:
        user_permission = frappe.new_doc("User Permission")
        allow = "Sales Person"
        for i in data.sales_manager:
            user_id = frappe.get_value("Employee", {"name": i.employee}, "user_id")
            if not frappe.db.exists("User Permission", {"user": user_id, "allow": allow, "for_value": doc.name}):
                user_permission.user = user_id
                user_permission.allow = allow
                user_permission.for_value = doc.name
                user_permission.insert()
        
        # Tạo phân quyền cho danh sách sales person cha
        list_parent_sp = get_all_parent_sales_persons(sales_person=doc.name)
        if list_parent_sp:
            user_permission_pr = frappe.new_doc("User Permission")
            for i in list_parent_sp:
                sales_team = frappe.get_doc("Sales Person", i).as_dict()
                for sale_mng in sales_team.sales_manager:
                    u_id = frappe.get_value("Employee", {"name": sale_mng.employee}, "user_id")
                    if not frappe.db.exists("User Permission", {"user": u_id, "allow": allow, "for_value": doc.name}):
                        user_permission_pr.user = u_id
                        user_permission_pr.allow = allow
                        user_permission_pr.for_value = doc.name
                        user_permission_pr.insert()
        else:
            pass
    else:
        return
    
def delete_employee(doc,method=None):
    if not doc.employee and doc.object_id:
        projectId = frappe.get_doc("DMS Settings").ma_du_an
        if projectId is None:
            frappe.throw("Chưa có Project ID")
            return
        api_key = frappe.get_doc('DMS Settings').api_key
        api_url = f"{API_URL_TRACKING}/object/{doc.object_id}"
        params = {"api_key": api_key}
        response = requests.delete(api_url, params=params)
        if response.status_code == 200:
            doc.object_id=None
            doc.save()
            pass
        else:
            frappe.msgprint(f"Lỗi khi gọi API xóa object ID: {response.status_code}")
            return