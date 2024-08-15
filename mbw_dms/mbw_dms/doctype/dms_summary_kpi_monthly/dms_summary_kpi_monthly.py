# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from mbw_dms.api.common import (
    exception_handle,
    gen_response,
)
from frappe.utils import nowdate
import calendar

class DMSSummaryKPIMonthly(Document):
	pass


@frappe.whitelist(methods="GET")
def get_kpi_monthly():
    try:
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])
        start_date_str = f"{year:04d}-{month:02d}-01"
        last_day_of_month = calendar.monthrange(year, month)[1]
        end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
        start_date = frappe.utils.getdate(start_date_str)
        end_date = frappe.utils.getdate(end_date_str)
        
		# Lấy id của nhân viên
        user_name = frappe.get_value("Employee", {"user_id": frappe.session.user}, "name")
        
		# Lấy Kpi tháng
        monthly_summary = frappe.get_all(
				"DMS Summary KPI Monthly",
				filters={"thang": month, "nam": year, "nhan_vien_ban_hang": user_name},
				fields=["name", "nam", "thang", "nhan_vien_ban_hang", "doanh_thu_thang", "doanh_so_thang", "so_kh_vt_luot", "so_kh_moi", "so_don_hang"]
			)

		# Lấy Kpi nhân viên
        kpi_employee = frappe.get_all("DMS KPI",
                filters={"ngay_hieu_luc_tu": (">=", start_date), "ngay_hieu_luc_den": ("<=", end_date), "nhan_vien_ban_hang": user_name},
                fields=["so_kh_vt_luot", "so_kh_moi", "so_don_hang", "doanh_so", "doanh_thu"])
        
        kpi = None

		# Tính toán chỉ số KPI nếu có dữ liệu
        if monthly_summary and kpi_employee:
            kpi = {
                "doanh_thu": round(float(monthly_summary[0]["doanh_thu_thang"]/kpi_employee[0]["doanh_thu"]) * 100, 2),
                "doanh_so": round(float(monthly_summary[0]["doanh_so_thang"]/kpi_employee[0]["doanh_so"]) * 100, 2),
                "don_hang": round(float(monthly_summary[0]["so_don_hang"]/kpi_employee[0]["so_don_hang"]) * 100, 2),
                "vieng_tham": round(float(monthly_summary[0]["so_kh_vt_luot"]/kpi_employee[0]["so_kh_vt_luot"]) * 100, 2),
                "kh_moi": round(float(monthly_summary[0]["so_kh_moi"]/kpi_employee[0]["so_kh_moi"]) * 100, 2)
            }

        # Nếu không có dữ liệu, gán giá trị 0 cho tất cả các chỉ số KPI
        else:
            kpi = {
                "doanh_thu":0,
                "doanh_so": 0,
                "don_hang": 0,
                "vieng_tham": 0,
                "kh_moi": 0
            }
        return gen_response(200, "Thành công", kpi)
    except Exception as e:
        return exception_handle(e)
	