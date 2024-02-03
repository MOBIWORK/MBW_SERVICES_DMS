# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import nowdate
from dateutil.relativedelta import relativedelta
import calendar

class DMSKPINewCustomer(Document):
	def after_insert(doc):
		update_daily_summary(doc)
		update_monthly_summary(nowdate())

def update_daily_summary(source_doc):
	date_str = nowdate()
	daily_summary_doc = get_daily_summary(date_str)

	daily_summary_doc.total_new_customers += 1

	daily_summary_doc.save(ignore_permissions=True)

def get_daily_summary(date_str):
	existing_summary = frappe.get_all(
		'DMS Summary KPI Daily',
		filters={'date': date_str},
		fields=['name']
	)

	if existing_summary:
		return frappe.get_doc('DMS Summary KPI Daily', existing_summary[0]['name'])
	else:
		return create_daily_summary(date_str)

def create_daily_summary(date_str):
	return frappe.get_doc({
		'doctype': 'DMS Summary KPI Daily',
		'date': date_str,
		'total_sales': 0,
		'total_checkins': 0,
		'total_checkins_on_route': 0,
		'total_checkins_off_route': 0,
		'average_sale_per_checkin': 0,
		'total_new_customers': 0,
	})

def update_monthly_summary(date_str):
	# Lấy thông tin tháng và năm từ ngày hiện tại
    month = int(date_str.split('-')[1])
    year = int(date_str.split('-')[0])
	
    start_date_str = f'{year:04d}-{month:02d}-01'

    last_day_of_month = calendar.monthrange(year, month)[1]

    end_date_str = f'{year:04d}-{month:02d}-{last_day_of_month:02d}'

    start_date = frappe.utils.getdate(start_date_str)
    end_date = frappe.utils.getdate(end_date_str)
    # Lấy tất cả các bản ghi DMS Summary KPI Daily trong tháng và năm hiện tại
    daily_summaries = frappe.get_all(
        'DMS Summary KPI Daily',
        filters={
            'date': ['between', [start_date, end_date]]
        },
        fields=['*']
    )
	# Tính tổng total_sales từ tất cả các ngày trong tháng
    total_new_customers_in_month = sum([d['total_new_customers'] for d in daily_summaries]) if 'total_new_customers' in daily_summaries[0] else 0
    
    existing_monthly_summary = frappe.get_all(
        'DMS Summary KPI Monthly',
        filters={'month': month, 'year': year},
        fields=['name']
    )

    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc('DMS Summary KPI Monthly', existing_monthly_summary[0]['name'])
        monthly_summary_doc.total_new_customers = total_new_customers_in_month
        monthly_summary_doc.save(ignore_permissions=True)
    else:
        monthly_summary_doc = frappe.get_doc({
            'doctype': 'DMS Summary KPI Monthly',
            'month': month,
			'year': year,
            'total_new_customers': total_new_customers_in_month,
        })
        monthly_summary_doc.insert(ignore_permissions=True)