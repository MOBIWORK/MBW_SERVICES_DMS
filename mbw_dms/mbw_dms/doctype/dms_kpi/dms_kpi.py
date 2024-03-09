# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from mbw_dms.api.common import (
    exception_handel,
    gen_response,
	get_value_child_doctype
)
from mbw_dms.api.validators import validate_filter_timestamp
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
import bson
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
					 "is_return": 0,
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
	

# Báo cáo doanh thu, đơn hàng cho Mobile
@frappe.whitelist(methods='GET')
def report_orders_invoices(customer_name):
	try:
		todays = today()
		month = int(nowdate().split('-')[1])
		year = int(nowdate().split('-')[0])
		start_date_str = f'{year:04d}-{month:02d}-01'
		start_date = frappe.utils.getdate(start_date_str)

		user_id = frappe.session.user
		data = {}
		data['ngay'] = todays

		# Lấy danh sách đơn hàng từ đầu tháng đến hiện tại
		sales_order = frappe.get_all(
			'Sales Order',
			filters={
					"transaction_date": (">=", start_date),
					"transaction_date": ("<=", todays),
					"customer_name": customer_name,
					"docstatus": 1,
					"owner": user_id
				},
			fields=['name']
		)
		data['so_don_trong_thang'] = len(sales_order)

		# Lấy danh sách hóa đơn từ đầu tháng đến hiện tại
		sales_invoice = frappe.get_all(
			'Sales Invoice',
			filters={
					"posting_date": (">=", start_date),
					"posting_date": ("<=", todays),
					"docstatus": 1,
					"customer_name": customer_name,
					"is_return": 0,
					"owner": user_id
				},
			fields=['grand_total', 'posting_date']
		)
		total_invoices = 0
		for i in sales_invoice:
			total_invoices += i['grand_total']
		
		data['doanh_thu_thang'] = total_invoices

		# Lấy tên người viếng thăm cuối cùng và đặt hàng lần cuối
		last_visit = frappe.get_list('DMS Checkin', filters={'kh_ten': customer_name}, limit=1, order_by="creation desc", fields=['owner', 'checkin_giovao'])
		if last_visit:
			user_checkin = frappe.get_value('Employee',{ 'user_id': last_visit[0].owner}, 'employee_name')
			data['nv_vieng_tham'] = user_checkin
			data['vieng_tham_cuoi'] = last_visit[0].checkin_giovao
		else:
			data['nv_vieng_tham'] = ''
			data['vieng_tham_cuoi'] = ''

		last_order = frappe.get_list('Sales Order', filters={'customer': customer_name, 'docstatus': 1}, limit=1, order_by="creation desc", fields=['owner', 'creation'])
		if last_order:
			user_order = frappe.get_value('Employee',{ 'user_id': last_order[0].owner}, 'employee_name')
			data['nv_dat_hang'] = user_order
			data['don_hang_cuoi'] = last_order[0].creation
		else:
			data['nv_dat_hang'] = ''
			data['don_hang_cuoi'] = ''

		return gen_response(200, 'Thành công', data)
	
	except Exception as e:
		return exception_handel(e)


# Báo cáo chi tiết viếng thăm
@frappe.whitelist(methods='GET')
def report_detail_visit(customer_name, **kwargs):
	try:
		from_date = validate_filter_timestamp('start')(kwargs.get('from_date')) if kwargs.get('from_date') else None
		to_date = validate_filter_timestamp('end')(kwargs.get('to_date')) if kwargs.get('to_date') else None
		user_id = frappe.session.user
		query_so = {}
		if from_date and to_date:
			query_so["transaction_date"] = ["between",[from_date,to_date]]
		query_so["customer_name"] = customer_name
		query_so["docstatus"] = 1
		query_so["owner"] = user_id
		data = {}

		# Lấy danh sách đơn hàng
		sales_order = frappe.get_all(
			'Sales Order',
			filters=query_so,
			fields=['name', 'transaction_date', 'grand_total']
		)
		data['so_don_trong_thang'] = len(sales_order)

		orders_list = []
		grand_totals = 0
		for i in sales_order:
			order_info = {
				'name': i.get('name'),
				'transaction_date': i.get('transaction_date'),
				'grand_total': i.get('grand_total')
			}
			orders_list.append(order_info)
			grand_totals += i['grand_total']

		data['so_tien_phai_tra'] = grand_totals
		data['danh_sach_don'] = orders_list

		# Tồn kho
		query_inv = {}
		if from_date and to_date:
			query_inv["transaction_date"] = ["between",[from_date,to_date]]
		query_so["customer_name"] = customer_name
		query_so["owner"] = user_id
		inventory = frappe.get_all(
			'DMS Inventory',
			filters=query_inv,
			fields=['name', 'creation']
		)
		for i in inventory:
			i['items'] = get_value_child_doctype('DMS Inventory', i['name'], 'items')

		return gen_response(200, 'Thành công', {
			"don_hang": data,
			"ton_kho": inventory
		})
	
	except Exception as e:
		return exception_handel(e)
	
# Kết quả đi tuyến
@frappe.whitelist(methods='GET')
def route_results(**kwargs):
	pass