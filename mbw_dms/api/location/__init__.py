import frappe

# Danh sánh tỉnh/thành phố
@frappe.whitelist()
def list_province(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_province.dms_province import list_province
    return list_province()

@frappe.whitelist()
def get_name_city(name):
    from mbw_dms.mbw_dms.doctype.dms_province.dms_province import get_name_city
    return get_name_city(name=name)

# Danh sách quận/huyện
@frappe.whitelist()
def list_district(ma_tinh):
    from mbw_dms.mbw_dms.doctype.dms_district.dms_district import list_district
    return list_district(ma_tinh=ma_tinh)

@frappe.whitelist()
def get_name_district(name):
    from mbw_dms.mbw_dms.doctype.dms_district.dms_district import get_name_district
    return get_name_district(name=name)

# Danh sách phường/xã
@frappe.whitelist()
def list_ward(ma_quan_huyen):
    from mbw_dms.mbw_dms.doctype.dms_ward.dms_ward import list_ward
    return list_ward(ma_quan_huyen=ma_quan_huyen)

@frappe.whitelist()
def get_name_ward(name):
    from mbw_dms.mbw_dms.doctype.dms_ward.dms_ward import get_name_ward
    return get_name_ward(name=name)