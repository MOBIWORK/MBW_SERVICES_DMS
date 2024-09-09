import frappe
from mbw_dms.api.validators import validate_filter
from mbw_dms.mbw_dms.doctype.dms_checkin.dms_checkin  import DMSCheckin
from mbw_dms.api.common import CommonHandle,exception_handle
# Tạo mới checkin
@frappe.whitelist()
def create_checkin(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_checkin.dms_checkin import create_checkin
    return create_checkin(kwargs=kwargs)

# Tạo mới checkin tồn kho
@frappe.whitelist()
def create_checkin_inventory(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_checkin.dms_checkin import create_checkin_inventory
    return create_checkin_inventory(body=kwargs)

@frappe.whitelist()
def create_checkin_image(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_checkin.dms_checkin import create_checkin_image
    return create_checkin_image(body=kwargs)

# Cập nhật địa chỉ khách hàng
@frappe.whitelist(methods="PATCH")
def update_address_customer(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_checkin.dms_checkin import update_address_customer_checkin
    return update_address_customer_checkin(body=kwargs)

@frappe.whitelist(methods="PATCH")
def update_address_customer_checkin(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_checkin.dms_checkin import update_address_customer_checkin
    checkin_id = validate_filter(type_check='require', value=kwargs.get('checkin_id'))
    new_body = {**kwargs,"checkin_id":checkin_id}
    return update_address_customer_checkin(body=new_body)

# cancel checkout
@frappe.whitelist()
def cancel_checkout(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_checkin.dms_checkin import cancel_checkout
    return cancel_checkout(data=kwargs)

@frappe.whitelist()
def list_inventory(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_checkin.dms_checkin import list_inventory
    return list_inventory(kwargs=kwargs)

# danh sách ghi chú chi tiết viếng thăm
@frappe.whitelist(methods="GET")
def checkin_notes(**rest):
    try:
        pass
    except Exception as e:
        return exception_handle(e) 