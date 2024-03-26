import frappe
from frappe import _
from frappe.utils.password import update_password, check_password
from mbw_dms.api.common import gen_response

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
