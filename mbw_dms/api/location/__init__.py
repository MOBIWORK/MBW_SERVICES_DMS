import frappe
from frappe import _

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
)

# Danh sánh tỉnh/thành phố
@frappe.whitelist(methods='GET')
def list_province(**kwargs):
    try:
        list_provinces = frappe.db.get_list('DMS Province', fields=['ma_tinh', 'ten_tinh'], order_by='ma_tinh asc')
        gen_response(200, 'Thành công', list_provinces)
    except Exception as e:
        return exception_handel(e)
    

# Danh sách quận/huyện
@frappe.whitelist(methods='GET')
def list_district(**kwargs):
    try:
        list_districts = ''
        ma_tinh = kwargs.get('ma_tinh_thanh')
        if ma_tinh:
            list_districts = frappe.db.get_list('DMS District', filters={'ma_tinh_thanh': ma_tinh}, fields=['ma_huyen', 'ten_huyen', 'ma_tinh_thanh'], order_by='ma_huyen asc')
        else:
            list_districts = frappe.db.get_list('DMS District', fields=['ma_huyen', 'ten_huyen', 'ma_tinh_thanh'], order_by='ma_huyen asc')
        gen_response(200, 'Thành công', list_districts)
    except Exception as e:
        return exception_handel(e)
    

# Danh sách phường/xã
@frappe.whitelist(methods='GET')
def list_ward(**kwargs):
    try:
        list_wards = {}
        ma_quan_huyen = kwargs.get('ma_quan_huyen')
        if ma_quan_huyen:
            list_wards = frappe.db.get_list('DMS Ward', filters={'ma_quan_huyen': ma_quan_huyen}, fields=['ma_xa', 'ten_xa', 'ma_quan_huyen'], order_by='ma_xa asc')
        else:
            list_wards = frappe.db.get_list('DMS Ward', fields=['ma_xa', 'ten_xa', 'ma_quan_huyen'], order_by='ma_xa asc')
        gen_response(200, 'Thành công', list_wards)
    except Exception as e:
        return exception_handel(e)