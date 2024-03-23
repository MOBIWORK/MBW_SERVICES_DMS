# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from mbw_dms.api.common import (
    exception_handel,
    gen_response,
	get_value_child_doctype,
	current_month_week,
	get_child_values_doc
)
from mbw_dms.api.validators import validate_filter_timestamp
from frappe.utils import nowdate, today
import calendar
from collections import defaultdict 
import datetime

class DMSKPI(Document):
	pass


# Báo cáo kpi viếng thăm
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
def report_detail_visit(customer_name, kwargs):
	try:
		from_date = validate_filter_timestamp('start')(kwargs.get('from_date')) if kwargs.get('from_date') else None
		to_date = validate_filter_timestamp('end')(kwargs.get('to_date')) if kwargs.get('to_date') else None
		user_id = frappe.session.user
		query_so = {}
		if from_date and to_date:
			query_so["creation"] = ["between",[from_date,to_date]]
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
			query_inv["creation"] = ["between",[from_date,to_date]]
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
def router_results(kwargs):
	try:
		data = {}
		filters = {}
		from_date = validate_filter_timestamp(type='start')(kwargs.get('from_date')) if kwargs.get('from_date') else None
		to_date = validate_filter_timestamp(type='end')(kwargs.get('to_date')) if kwargs.get('to_date') else None
		user_id = frappe.session.user
		if from_date and to_date:
			filters["creation"] = ["between",[from_date,to_date]]
		filters['owner'] = user_id


		# Tổng doanh số trong ngày
		data['doanh_so'] = 0
		sales_order = frappe.get_all('Sales Order', filters={**filters, 'docstatus':1}, fields=['grand_total'])
		for i in sales_order:
			data['doanh_so'] += i['grand_total']

		# Dữ liệu viếng thăm
		data['vieng_tham_co_don'] = 0
		data['vieng_tham_ko_don'] = 0
		data['vieng_tham_co_anh'] = 0
		data['vieng_tham_ko_anh'] = 0
		data['vt_dung_tuyen'] = 0
		data['vt_ngoai_tuyen'] = 0

		data_checkin = frappe.get_all('DMS Checkin', filters=filters, fields=['name', 'kh_ten', 'checkin_donhang', 'checkin_dungtuyen'])
		list_customer = []
		for i in data_checkin:
			if i['kh_ten'] not in list_customer:
				list_customer.append(i['kh_ten'])
			i['checkin_hinhanh'] = get_value_child_doctype('DMS Checkin', i['name'], 'checkin_hinhanh')
			if i['checkin_donhang'] != 0:
				data['vieng_tham_co_don'] += 1
			if i['checkin_donhang'] == 0:
				data['vieng_tham_ko_don'] += 1
			if len(i['checkin_hinhanh']) != 0:
				data['vieng_tham_co_anh'] += 1
			if len(i['checkin_hinhanh']) == 0:
				data['vieng_tham_ko_anh'] += 1
			if i['checkin_dungtuyen'] == 0:
				data['vt_ngoai_tuyen'] += 1
			if i['checkin_dungtuyen'] == 1:
				data['vt_dung_tuyen'] += 1

		# Check số khách hàng phải viếng thăm theo tuyến
		# Lấy tuyến của nhân viên
		user_name = frappe.get_value('Employee', {'user_id': user_id}, 'name')
        # Lấy thứ của ngày
		days = datetime.date.today()
		date = days.weekday()
        # Chuyển đổi sang tên của ngày trong tuần
		date_in_week = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"]
		name_date = date_in_week[date]
		router_employee = frappe.get_all(
            'DMS Router',
            filters = {
                "employee": user_name,
				"travel_date": name_date
            },
            fields = ['name']
        )
		cus = 0
		if router_employee:
			for i in router_employee:
				i['customers'] = get_value_child_doctype('DMS Router', i['name'], 'customers')
				for a in i['customers']:
					fre = a['frequency']
					week_router = []
					frequency = fre.split(';')
					for i in frequency:
						week_router.append(int(i))
					current_week = current_month_week()
					if current_week in week_router:
						cus += 1
		data['so_kh_da_vt'] = len(list_customer)
		data['so_kh_phai_vt'] = cus
		
		return gen_response(200, 'Thành công', data)
	except Exception as e:
		return exception_handel(e)
	
# Báo cáo viếng thăm
@frappe.whitelist(methods='GET')
def checkin_report(kwargs):
	try:
		data = {}
		filters = {}
		from_date = validate_filter_timestamp(type='start')(kwargs.get('from_date')) if kwargs.get('from_date') else None
		to_date = validate_filter_timestamp(type='end')(kwargs.get('to_date')) if kwargs.get('to_date') else None
		user_id = frappe.session.user
		if from_date and to_date:
			filters["creation"] = ["between",[from_date,to_date]]
		filters['owner'] = user_id
		user_name = frappe.get_value('Employee', {'user_id': user_id}, 'name')

		# Tổng doanh thu trong ngày
		data['doanh_so'] = 0
		sales_order = frappe.get_all('Sales Invoice', filters={**filters, 'docstatus':1}, fields=['grand_total'])
		for i in sales_order:
			data['doanh_so'] += i['grand_total']

		data_checkin = frappe.get_all('DMS Checkin', filters=filters, fields=['name', 'kh_ten', 'kh_ma', 'checkin_giovao', 'checkin_giora', 'checkin_donhang', 'checkin_dungtuyen'])
		list_customer = []
		for i in data_checkin:
			if i['kh_ten'] not in list_customer:
				list_customer.append(i['kh_ten'])
			i['doanh_so'] = frappe.get_value('Sales Order', {'customer': i['kh_ten']}, 'grand_total')

		# Check số khách hàng phải viếng thăm theo tuyến
		# Lấy tuyến của nhân viên
		user_name = frappe.get_value('Employee', {'user_id': user_id}, 'name')
        # Lấy thứ của ngày
		days = datetime.date.today()
		date = days.weekday()
        # Chuyển đổi sang tên của ngày trong tuần
		date_in_week = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"]
		name_date = date_in_week[date]
		router_employee = frappe.get_all(
            'DMS Router',
            filters = {
                "employee": user_name,
				"travel_date": name_date
            },
            fields = ['name']
        )

		cus_not_checkin = 0
		if router_employee:
			for i in router_employee:
				i['customers'] = get_value_child_doctype('DMS Router', i['name'], 'customers')
				filtered_customers = []
				for a in i['customers']:
					fre = a['frequency']
					week_router = []
					frequency = fre.split(';')
					for i in frequency:
						week_router.append(int(i))
					current_week = current_month_week()
					if current_week in week_router:
						# data khách hàng chưa checkin
						if not frappe.db.exists('DMS Checkin', {'kh_ten': a['customer']}):
							cus_not_checkin += 1

							filtered_customer = a.copy()
							filtered_customer.pop('frequency', None)
							filtered_customer.pop('long', None)
							filtered_customer.pop('lat', None)
							filtered_customers.append(filtered_customer)
		
		data['so_kh_da_vt'] = len(list_customer)
		data['so_kh_chua_vt'] = cus_not_checkin

		return gen_response(200, 'Thành công', {
			"data": data,
			"has_checkin": data_checkin,
			"not_checkin": filtered_customers
		})
	except Exception as e:
		return exception_handel(e)

# Thống kê phiếu đặt hàng
@frappe.whitelist(methods="GET")
def order_statistics(kwargs):
	try:
		data = {}
		details = []
		detail_items = []
		filters = {}
		from_date = validate_filter_timestamp(type='start')(kwargs.get('from_date')) if kwargs.get('from_date') else None
		to_date = validate_filter_timestamp(type='end')(kwargs.get('to_date')) if kwargs.get('to_date') else None
		user_id = frappe.session.user
		if from_date and to_date:
			filters["creation"] = ["between",[from_date,to_date]]
		filters['owner'] = user_id

		field_items = ['item_name', 'qty', 'uom', 'amount']
		# Tổng hợp số khách hàng, số sản phẩm
		list_customer = []
		sales_order = frappe.get_all('Sales Order', filters={**filters, 'docstatus':1}, fields=['name', 'customer'])

		sum_qty = 0
		t_items = []
		for i in sales_order:
			if i['customer'] not in sales_order:
				list_customer.append(i['customer'])

			items = get_child_values_doc(doctype='Sales Order', master_name=i['name'], fields_to_get=field_items, chil_name='items')
			qty = [item.get('qty') for item in items]
			amount = [item.get('amount') for item in items]
			sum_qty += int(sum(qty))
			info_order = {
				'customer': i['customer'],
				'qty': sum(qty),
				'amount': sum(amount)
			}
			details.append(info_order)
			for item in items:
				detail_items.append(item)
				if item['item_name'] not in t_items:
					t_items.append(item['item_name'])

		data['total_customers'] = len(list_customer)
		data['total_items'] = len(t_items)
		data['total_qty'] = sum_qty

		return gen_response(200, 'Thành công', {
			"data": data,
			"details": details,
			"detail_items": detail_items
		})
	except Exception as e:
		return exception_handel(e)
	

# Báo cáo khách hàng mới
@frappe.whitelist(methods='GET')
def new_customer_report(kwargs):
	try:
		data = {}
		filters = {}
		from_date = validate_filter_timestamp(type='start')(kwargs.get('from_date')) if kwargs.get('from_date') else None
		to_date = validate_filter_timestamp(type='end')(kwargs.get('to_date')) if kwargs.get('to_date') else None
		user_id = frappe.session.user
		if from_date and to_date:
			filters["creation"] = ["between",[from_date,to_date]]
		filters['owner'] = user_id

		list_customers = frappe.db.get_all('Customer', filters=filters, fields=['name', 'customer_name', 'customer_type', 'customer_group', 'UNIX_TIMESTAMP(creation) as date_collection', 'customer_primary_address as address'])
		data['total_new_cus'] = frappe.db.count('Customer', filters=filters)

		return gen_response(200, 'Thành công', {
			"data": data,
			"list_customer": list_customers
		})
	except Exception as e:
		return exception_handel(e)