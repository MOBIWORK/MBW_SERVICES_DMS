import frappe
from frappe import _

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
)
from mbw_dms.api.validators import validate_not_none
# Danh sánh tỉnh/thành phố
@frappe.whitelist(methods='GET')
def list_province(**kwargs):
    try:
        list_provinces = frappe.db.get_list('DMS Province', fields=['name', 'ma_tinh', 'ten_tinh'], order_by='ma_tinh asc')
        gen_response(200, 'Thành công', list_provinces)
    except Exception as e:
        return exception_handel(e)
    

# Danh sách quận/huyện
@frappe.whitelist(methods='GET')
def list_district(ma_tinh):
    try:
        list_districts = frappe.db.get_list('DMS District', filters={'ma_tinh_thanh': validate_not_none(ma_tinh)}, fields=['name', 'ma_huyen', 'ten_huyen', 'ma_tinh_thanh'], order_by='ma_huyen asc')
        gen_response(200, 'Thành công', list_districts)
    except Exception as e:
        return exception_handel(e)
    

# Danh sách phường/xã
@frappe.whitelist(methods='GET')
def list_ward(ma_quan_huyen):
    try:
        list_wards = frappe.db.get_list('DMS Ward', filters={'ma_quan_huyen': validate_not_none(ma_quan_huyen)}, fields=['name', 'ma_xa', 'ten_xa', 'ma_quan_huyen'], order_by='ma_xa asc')
        gen_response(200, 'Thành công', list_wards)
    except Exception as e:
        return exception_handel(e)