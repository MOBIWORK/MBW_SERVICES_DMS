import frappe
import datetime

from mbw_dms.api.common import gen_response ,exception_handel, get_value_child_doctype

# Báo cáo KPI
@frappe.whitelist(methods='GET')
def kpi_report(**kwargs):
    try:
        data = {}
        
        return gen_response(200, "Thành công", data)
    except Exception as e:
        return exception_handel(e)