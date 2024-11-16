import frappe
from frappe import _
from frappe.utils.password import update_password, check_password
from mbw_dms.api.common import gen_response, exception_handle, current_month_week, get_value_child_doctype, get_sales_group_child, get_user_id, get_employee_info
from mbw_dms.api.validators import validate_filter_timestamp
import datetime
import pydash


@frappe.whitelist(methods="PUT")
def change_password(user, current_password, new_password, new_pass_again):
    # Kiểm tra mật khẩu cũ của người dùng
    try:
        user = check_password(user, current_password)
    except frappe.AuthenticationError:
        return get_response(400, False, "Mật khẩu cũ không chính xác")

    # Kiểm tra mật khẩu mới không được rỗng
    if not new_password:
        return get_response(400, False, "Mật khẩu mới không được để trống")
    
    if not new_pass_again:
        return get_response(400, False, "Bạn phải nhập lại mật khẩu mới")
    
    if new_pass_again and new_password and new_password != new_pass_again:
        return get_response(400, False, "Mật khẩu nhập lại phải trùng mật khẩu mới")

    # Cập nhật mật khẩu mới
    update_password(user, new_password)

    return get_response(True, "Cập nhật thành công")

def get_response(http_status_code, status, message):
    frappe.response["http_status_code"] = http_status_code
    frappe.response["status"] = status
    frappe.response["message"] = message

# Lấy project ID
@frappe.whitelist(methods="GET")
def get_projectID(**kwargs):
    try:
        teamSale = kwargs.get("teamSale")
        projectID = ""
        projectID = frappe.cache().get_value("ProjectID")
        if projectID == None:
            dms_settinngs = frappe.get_doc("DMS Settings").as_dict()
            if dms_settinngs.get("ma_du_an"):
                projectID = dms_settinngs.get("ma_du_an")
                frappe.cache().set_value("ProjectID", projectID)

        account_user = get_user_id()
        company= ""
        if account_user.get("name") != "Administrator":
            employee_info = get_employee_info()
            if not employee_info:
                return gen_response(406, _("Tài khoản chưa phải nhân viên!"))
            company= employee_info.get("company")
            if not bool(company):
                return gen_response(406, _("Tài khoản quản lý chưa thuộc công ty nào!"))
        objectIds = None

        # thay logic sửa đoạn này
        if bool(teamSale):
            sales_person = get_sales_group_child(sale_person=teamSale, is_group=0)
            if bool(company):
                sales_person = pydash.filter_(sales_person, lambda x: x.get("company") == company)
            objectIds = pydash.map_(sales_person, lambda x: x.get("object_id"))
            objectIds = pydash.filter_(objectIds, lambda x: bool(x))
            if len(objectIds) == 0:
                return gen_response(406, _("Chưa có nhân viên bán hàng nào được đăng ký tracking!"))
            else:
                objectIds = ";".join(objectIds)

        return gen_response(200, "Thành công", {
            "Project ID": projectID,
            "objectIds":objectIds
        })
    
    except Exception as e:
        return exception_handle(e)

# Lấy project ID và Object ID
@frappe.whitelist(methods="GET")
def get_project_object_id(name):
    try:
        projectID = ""
        projectID = frappe.cache().get_value("ProjectID")
        if projectID == None:
            dms_settinngs = frappe.get_doc("DMS Settings").as_dict()
            if dms_settinngs.get("ma_du_an"):
                projectID = dms_settinngs.get("ma_du_an")
                frappe.cache().set_value("ProjectID", projectID)

        objectId = ""
        user_name = frappe.db.get_value("Employee", {"name": name}, "object_id")
        if user_name and user_name is not None:
            objectId = user_name

        return gen_response(200, "Thành công", {
            "Project ID": projectID,
            "Object ID": objectId
        })
    except Exception as e:
        return exception_handle(e)

# Lấy thông tin nhân viên từ Object ID
@frappe.whitelist(methods="GET")
def get_employee_info_by_objid(object_id):
    try:
        sale_person  = frappe.db.get_value("Sales Person",{"object_id": object_id},"employee")
        employee = frappe.db.get_value("Employee",sale_person, ["employee_name", "image as avatar", "name"],as_dict=1)
        if employee:
            return gen_response(200, "Thành công", employee)
        else:
            return gen_response(200, "Thành công", [])
    except Exception as e:
        return exception_handle(e)

@frappe.whitelist(methods="GET")
def get_list_employees(**kwargs):
    try:
        teamSale = kwargs.get("teamSale") if bool(kwargs.get("teamSale")) else "Sales Team"
        # Kiểm tả tài khoản quản lý
        account_user = get_user_id()
        company = ""
        if account_user.get("name") != "Administrator":
            employee_info = get_employee_info()
            if not employee_info:
                return gen_response(406, _("Tài khoản chưa phải nhân viên!"))
            company= employee_info.get("company")
            if not bool(company):
                return gen_response(406, _("Tài khoản quản lý chưa thuộc công ty nào!"))
            
        EmplDoc = frappe.qb.DocType("Employee")
        filters = EmplDoc.name.isnotnull()
        SPDoc = frappe.qb.DocType("Sales Person")

        employee_codes, employee_id_users = get_sales_group_child(sale_person=teamSale)
        employee_code_not_empt = pydash.filter_(employee_codes, lambda x: bool(x))
        filters = (filters) & EmplDoc.name.isin(employee_code_not_empt)

        if bool(company):
            filters = (filters) & EmplDoc.company == company
        
        query = (frappe.qb.from_(EmplDoc)
                     .left_join(SPDoc)
                     .on(EmplDoc.name == SPDoc.employee))
        if filters: 
            query = query.where(filters)
        employees = query.select(SPDoc.object_id, EmplDoc.employee_name, EmplDoc.image.as_("avatar"), EmplDoc.name, EmplDoc.user_id ).run(as_dict=1)
        gen_response(200, "Thành công", employees)

    except Exception as e:
        return exception_handle(e)


# Danh sách top 5 nhân viên SO
@frappe.whitelist(methods="GET")
def get_list_top_employee(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        list_employee = []
        employee = frappe.get_all("Employee", fields=["name", "user_id"])

        for i in employee:
            if i["name"] not in list_employee:
                list_employee.append(i["name"])

        days = datetime.date.today()
        date = days.weekday()
        # Chuyển đổi sang tên của ngày trong tuần
        date_in_week = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"]
        name_date = date_in_week[date]

        router_employee = frappe.get_all("DMS Router", 
            filters = {
                "employee": ("in", list_employee),
                "travel_date": name_date,
                "status": "Active"
            },
            fields = ["name", "employee"]
        )
        customer_set = set()
        for i in router_employee:
            emp = frappe.get_doc("Employee", {"name": i["employee"]}).as_dict()
            if from_date and to_date:
                filters["creation"] = ["between",[from_date,to_date]]
            if emp:
                filters["owner"] = emp.user_id

                i["employee_name"] = emp.employee_name
                i["employee_avatar"] = emp.image

            data_sales_order = frappe.get_all("Sales Order", filters=filters, fields=["name"])
            i["sales_order"] = len(data_sales_order)

            data_checkin = frappe.get_all("DMS Checkin", filters=filters, fields=["name", "kh_ten"])
            if data_checkin:
                for item in data_checkin:
                    kh_ten = item["kh_ten"]
                    customer_set.add(kh_ten)
                i["today_visit"] = len(customer_set)
            else:
                i["today_visit"] = 0
            
            customers = get_value_child_doctype("DMS Router", i["name"], "customers")
            cus = 0
            for a in customers:
                fre = a["frequency"]
                week_router = []
                if fre:
                    frequency = fre.split(";")
                    for j in frequency:
                        if bool(j):
                            week_router.append(int(j))
                current_week = current_month_week()
                if current_week in week_router:
                    cus += 1
            i["must_visit"] = cus
            i.pop("name")
        router_employee = sorted(router_employee, key=lambda x: x["sales_order"], reverse=True)
        if len(router_employee) > 5:
            router_employee = router_employee[:5]
        return gen_response(200, "Thành công", router_employee)
    except Exception as e:
        return exception_handle(e)