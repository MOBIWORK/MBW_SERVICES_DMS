import frappe
from frappe import _
from frappe.utils.password import update_password, check_password
from mbw_dms.api.common import gen_response, exception_handle, current_month_week, get_value_child_doctype
from mbw_dms.api.validators import validate_filter_timestamp
import datetime
from collections import defaultdict

@frappe.whitelist(methods='PUT')
def change_password(user, current_password, new_password):
    # Kiểm tra mật khẩu cũ của người dùng
    try:
        user = check_password(user, current_password)
    except frappe.AuthenticationError:
        return {"error": _("Mật khẩu cũ không chính xác")}

    # Kiểm tra mật khẩu mới không được rỗng
    if not new_password:
        return {"error": _("Mật khẩu mới không được để trống")}

    # Cập nhật mật khẩu mới
    update_password(user, new_password)

    return gen_response(200, "Cập nhật thành công")

# Lấy project ID
@frappe.whitelist(methods='GET')
def get_projectID(**kwargs):
    try:
        projectID = ''
        projectID = frappe.cache().get_value("ProjectID")
        if projectID == None:
            dms_settinngs = frappe.get_doc("DMS Settings").as_dict()
            if dms_settinngs.get('ma_du_an'):
                projectID = dms_settinngs.get('ma_du_an')
                frappe.cache().set_value("ProjectID", projectID)

        return gen_response(200, 'Thành công', {
            'Project ID': projectID
        })
    except Exception as e:
        return exception_handle(e)

# Lấy project ID và Object ID
@frappe.whitelist(methods='GET')
def get_project_object_id(name):
    try:
        projectID = ''
        projectID = frappe.cache().get_value("ProjectID")
        if projectID == None:
            dms_settinngs = frappe.get_doc("DMS Settings").as_dict()
            if dms_settinngs.get('ma_du_an'):
                projectID = dms_settinngs.get('ma_du_an')
                frappe.cache().set_value("ProjectID", projectID)

        objectId = ''
        user_name = frappe.db.get_list('Employee', filters={'name': name}, fields=['object_id'])
        if user_name and user_name[0]['object_id'] is not None:
            objectId = user_name[0]['object_id']

        return gen_response(200, 'Thành công', {
            'Project ID': projectID,
            'Object ID': objectId
        })
    except Exception as e:
        return exception_handle(e)

# Danh sách top 5 nhân viên 
@frappe.whitelist(methods='GET')
def get_list_top_employee(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type='start')(kwargs.get('from_date')) if kwargs.get('from_date') else None
        to_date = validate_filter_timestamp(type='end')(kwargs.get('to_date')) if kwargs.get('to_date') else None
        list_employee = []
        employee = frappe.get_all('Employee', fields=['name', 'user_id'])

        for i in employee:
            if i['name'] not in list_employee:
                list_employee.append(i['name'])

        days = datetime.date.today()
        date = days.weekday()
        # Chuyển đổi sang tên của ngày trong tuần
        date_in_week = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"]
        name_date = date_in_week[date]
        router_employee = frappe.get_all(
            'DMS Router', 
            filters = {
                'employee': ('in', list_employee),
                'travel_date': name_date
            },
            fields = ['name', 'employee']
        )

        customer_set = set()
        for i in router_employee:
            emp = frappe.get_doc('Employee', {'name': i['employee']}).as_dict()
            if from_date and to_date:
                filters["creation"] = ["between",[from_date,to_date]]
            if emp:
                filters['owner'] = emp.user_id

                i['employee_name'] = emp.employee_name
                i['employee_avatar'] = emp.image

            data_sales_order = frappe.get_all('Sales Order', filters=filters, fields=['name'])
            i['sales_order'] = len(data_sales_order)

            data_checkin = frappe.get_all('DMS Checkin', filters=filters, fields=['name', 'kh_ten'])
            if data_checkin:
                for item in data_checkin:
                    kh_ten = item['kh_ten']
                    customer_set.add(kh_ten)
                i['today_visit'] = len(customer_set)
            else:
                i['today_visit'] = 0
            
            customers = get_value_child_doctype('DMS Router', i['name'], 'customers')
            cus = 0
            for a in customers:
                fre = a['frequency']
                week_router = []
                frequency = fre.split(';')
                for j in frequency:
                    week_router.append(int(j))
                current_week = current_month_week()
                if current_week in week_router:
                    cus += 1
            i['must_visit'] = cus
            i.pop('name')

        router_employee = sorted(router_employee, key=lambda x: x['sales_order'], reverse=True)[:5]

        return gen_response(200, 'Thành công', router_employee)
    except Exception as e:
        return exception_handle(e)