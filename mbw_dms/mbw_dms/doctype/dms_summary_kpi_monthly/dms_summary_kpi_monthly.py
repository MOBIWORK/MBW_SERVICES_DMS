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
    def on_update(self):
        self.update_vt_salary()

    def update_vt_salary(self):
          month = int(self.thang)
          year = int(self.nam)
          start_date_str = f"{year:04d}-{month:02d}-01"
          last_day_of_month = calendar.monthrange(year, month)[1]
          end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
          start_date = frappe.utils.getdate(start_date_str)
          end_date = frappe.utils.getdate(end_date_str)

          # Lấy id của nhân viên
          user_name = self.nhan_vien_ban_hang
          employee_name = frappe.get_value("Employee", {"name": user_name}, "employee_name")
          
		  # Lấy Kpi nhân viên
          kpi_employee = frappe.get_value("DMS KPI",
                {"ngay_hieu_luc_tu": (">=", start_date), "ngay_hieu_luc_den": ("<=", end_date), "nhan_vien_ban_hang": user_name},
                "doanh_thu")
          
          if frappe.db.exists("VT Salary", {"month": month, "year": year, "employee": user_name}):
            vt_salary = frappe.get_doc("VT Salary", {"month": month, "year": year, "employee": user_name})
            if kpi_employee:
                vt_salary.doanh_thu = self.doanh_thu_thang
                vt_salary.pt_thuong_doanh_thu = self.doanh_thu_thang / kpi_employee * 100
                if float(vt_salary.pt_thuong_doanh_thu) >= 100:
                    vt_salary.thuong_doanh_thu = 4800000
                elif 80 <= float(vt_salary.pt_thuong_doanh_thu) < 90:
                    vt_salary.thuong_doanh_thu = 3000000
                elif 90 <= float(vt_salary.pt_thuong_doanh_thu) < 100:
                    vt_salary.thuong_doanh_thu = 4000000
                else:
                    vt_salary.thuong_doanh_thu = 0
            vt_salary.save()

          else:
            if kpi_employee:
                pt_thuong_doanh_thu = self.doanh_thu_thang / kpi_employee * 100

                if float(pt_thuong_doanh_thu) >= 100:
                    thuong_doanh_thu = 4800000
                elif 80 <= float(pt_thuong_doanh_thu) < 90:
                    thuong_doanh_thu = 3000000
                elif 90 <= float(pt_thuong_doanh_thu) < 100:
                    thuong_doanh_thu = 4000000
                else:
                    thuong_doanh_thu = 0

                vt_salary = frappe.get_doc({
                    "doctype": "VT Salary",
                    "employee": user_name,
                    "employee_name": employee_name,
                    "year": year,
                    "month": month,
                    "doanh_thu": self.doanh_thu_thang,
                    "pt_thuong_doanh_thu": pt_thuong_doanh_thu,
                    "thuong_doanh_thu": thuong_doanh_thu
                })
                vt_salary.insert()


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