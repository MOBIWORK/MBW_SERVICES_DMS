# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from mbw_dms.api.common import (
    exception_handel,
    gen_response,
)
from frappe.utils import nowdate, today
import calendar
from collections import defaultdict 

class DMSKPI(Document):
	pass


# Báo cáo viếng thăm
@frappe.whitelist(methods='GET')
def visit_report():
	try:
		month = int(nowdate().split('-')[1])
		year = int(nowdate().split('-')[0])
		start_date_str = f'{year:04d}-{month:02d}-01'
		last_day_of_month = calendar.monthrange(year, month)[1]
		end_date_str = f'{year:04d}-{month:02d}-{last_day_of_month:02d}'
		start_date = frappe.utils.getdate(start_date_str)
		end_date = frappe.utils.getdate(end_date_str)

		# Lấy id của nhân viên
		user_name = frappe.get_value('Employee',{ 'user_id': frappe.session.user}, 'name')
        
		kpi = None

		# Lấy Kpi tháng
		monthly_summary = frappe.get_all(
				'DMS Summary KPI Monthly',
				filters={'thang': month, 'nam': year, 'nhan_vien_ban_hang': user_name},
				fields=['solan_vt_dungtuyen']
			)
		
		# Lấy Kpi nhân viên
		kpi_employee = frappe.get_all('DMS KPI',
                filters={'ngay_hieu_luc_tu': (">=", start_date), 'ngay_hieu_luc_den': ("<=", end_date), 'nhan_vien_ban_hang': user_name},
                fields=['so_kh_vt_luot'])
		
		if monthly_summary and kpi_employee:
			kpi = {
                'chi_tieu': kpi_employee[0]['so_kh_vt_luot'],
                'dat_duoc': monthly_summary[0]['solan_vt_dungtuyen'],
                'phan_tram_thuc_hien': round(float(monthly_summary[0]['solan_vt_dungtuyen'] / kpi_employee[0]['so_kh_vt_luot'] * 100), 2),
            }
		else:
			kpi = {
                'chi_tieu':0,
                'dat_duoc': 0,
                'phan_tram_thuc_hien': 0,
            }
		return gen_response(200, 'Thành công', kpi)
	except Exception as e:
		return exception_handel(e)

# Báo cáo doanh số
@frappe.whitelist(methods='GET')
def sales_report():
	try:
		todays = today()
		month = int(nowdate().split('-')[1])
		year = int(nowdate().split('-')[0])
		start_date_str = f'{year:04d}-{month:02d}-01'
		last_day_of_month = calendar.monthrange(year, month)[1]
		end_date_str = f'{year:04d}-{month:02d}-{last_day_of_month:02d}'
		start_date = frappe.utils.getdate(start_date_str)
		end_date = frappe.utils.getdate(end_date_str)

		# Lấy id của nhân viên
		user_name = frappe.get_value('Employee',{ 'user_id': frappe.session.user}, 'name')
		user_id = frappe.session.user
        
		kpi = None

		# Lấy Kpi tháng
		monthly_summary = frappe.get_all(
				'DMS Summary KPI Monthly',
				filters={'thang': month, 'nam': year, 'nhan_vien_ban_hang': user_name},
				fields=['doanh_so_thang']
			)
		# Lấy Kpi nhân viên
		kpi_employee = frappe.get_all('DMS KPI',
                filters={'ngay_hieu_luc_tu': (">=", start_date), 'ngay_hieu_luc_den': ("<=", end_date), 'nhan_vien_ban_hang': user_name},
                fields=['doanh_so'])
		
		if monthly_summary and kpi_employee:
			kpi = {
                'dat_duoc': float(monthly_summary[0]['doanh_so_thang']),
                'phan_tram_thuc_hien': round(float(monthly_summary[0]['doanh_so_thang'] / kpi_employee[0]['doanh_so'] * 100), 2),
            }
		else:
			kpi = {
                'dat_duoc': 0,
                'phan_tram_thuc_hien': 0,
            }
		# Lấy danh sách đơn hàng từ đầu tháng đến hiện tại
		sales_order = frappe.get_all(
			'Sales Order',
			filters={"transaction_date": (">=", start_date),
        			 "transaction_date": ("<=", todays),
        			 "docstatus": 1,
					 "owner": user_id},
			fields=['grand_total', 'transaction_date']
		)

		daily_totals = defaultdict(float)
		for order in sales_order:
			transaction_date = order.get("transaction_date")
			date_str = transaction_date.strftime("%Y-%m-%d")
			total = order.get("grand_total")
			daily_totals[date_str] += total

		# Tạo một danh sách để lưu trữ thông tin của các đơn bán hàng
		orders_list = []

		# Lặp qua từng mục trong daily_totals để tạo danh sách các đơn bán hàng
		for date, total in daily_totals.items():
			orders_list.append({"ngay": date, "doanh_so": total})

		return gen_response(200, 'Thành công', {
			"Kpi": kpi,
			"sales_invoice": orders_list
		})
	except Exception as e:
		return exception_handel(e)
	

# Báo cáo doanh thu nhân viên
@frappe.whitelist(methods='GET')
def invoices_report():
	try:
		todays = today()
		month = int(nowdate().split('-')[1])
		year = int(nowdate().split('-')[0])
		start_date_str = f'{year:04d}-{month:02d}-01'
		last_day_of_month = calendar.monthrange(year, month)[1]
		end_date_str = f'{year:04d}-{month:02d}-{last_day_of_month:02d}'
		start_date = frappe.utils.getdate(start_date_str)
		end_date = frappe.utils.getdate(end_date_str)

		# Lấy id của nhân viên
		user_name = frappe.get_value('Employee',{ 'user_id': frappe.session.user}, 'name')
		user_id = frappe.session.user
        
		kpi = None

		# Lấy Kpi tháng
		monthly_summary = frappe.get_all(
				'DMS Summary KPI Monthly',
				filters={'thang': month, 'nam': year, 'nhan_vien_ban_hang': user_name},
				fields=['doanh_thu_thang']
			)
		# Lấy Kpi nhân viên
		kpi_employee = frappe.get_all('DMS KPI',
                filters={'ngay_hieu_luc_tu': (">=", start_date), 'ngay_hieu_luc_den': ("<=", end_date), 'nhan_vien_ban_hang': user_name},
                fields=['doanh_thu'])
		
		if monthly_summary and kpi_employee:
			kpi = {
                'dat_duoc': float(monthly_summary[0]['doanh_thu_thang']),
                'phan_tram_thuc_hien': round(float(monthly_summary[0]['doanh_thu_thang'] / kpi_employee[0]['doanh_thu'] * 100), 2),
            }
		else:
			kpi = {
                'dat_duoc': 0,
                'phan_tram_thuc_hien': 0,
            }
		# Lấy danh sách hóa đơn từ đầu tháng đến hiện tại
		sales_invoice = frappe.get_all(
			'Sales Invoice',
			filters={"posting_date": (">=", start_date),
        			 "posting_date": ("<=", todays),
        			 "docstatus": 1,
					 "owner": user_id},
			fields=['grand_total', 'posting_date']
		)

		daily_totals = defaultdict(float)
		for order in sales_invoice:
			posting_date = order.get("posting_date")
			date_str = posting_date.strftime("%Y-%m-%d")
			total = order.get("grand_total")
			daily_totals[date_str] += total

		# Tạo một danh sách để lưu trữ thông tin của các hóa đơn bán hàng
		invoices_list = []

		# Lặp qua từng mục trong daily_totals để tạo danh sách các hóa đơn bán hàng
		for date, total in daily_totals.items():
			invoices_list.append({"ngay": date, "doanh_thu": total})

		# Trả về phản hồi bao gồm cả KPI và danh sách hóa đơn bán hàng
		return gen_response(200, 'Thành công', {
			"Kpi": kpi,
			"sales_invoice": invoices_list
		})
	except Exception as e:
		return exception_handel(e)