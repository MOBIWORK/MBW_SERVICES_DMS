import frappe
from frappe import _
from frappe.utils.password import update_password, check_password
from mbw_dms.api.common import gen_response, exception_handle

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
        dms_settinngs = frappe.get_doc("DMS Settings").as_dict()
        if dms_settinngs.get('ma_du_an'):
            projectID = dms_settinngs.get('ma_du_an')

        return gen_response(200, 'Thành công', {
            'Project ID': projectID
        })
    except Exception as e:
        return exception_handle(e)
    
# Lấy project ID và Object ID
@frappe.whitelist(methods='GET')
def get_project_object_id(employee_id):
    try:
        projectID = ''
        dms_settinngs = frappe.get_doc("DMS Settings").as_dict()
        if dms_settinngs.get('ma_du_an'):
            projectID = dms_settinngs.get('ma_du_an')

        objectId = ''
        user_name = frappe.db.get_list('Employee', filters={'user_id': employee_id}, fields=['object_id'])
        if user_name[0]['object_id'] is not None:
            objectId = user_name[0]['object_id']

        return gen_response(200, 'Thành công', {
            'Project ID': projectID,
            'Object ID': objectId
        })
    except Exception as e:
        return exception_handle(e)