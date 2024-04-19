import frappe

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
    from mbw_dms.mbw_dms.doctype.dms_checkin.dms_checkin import update_address_customer
    return update_address_customer(body=kwargs)

# cancel checkout
@frappe.whitelist()
def cancel_checkout(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_checkin.dms_checkin import cancel_checkout
    return cancel_checkout(data=kwargs)