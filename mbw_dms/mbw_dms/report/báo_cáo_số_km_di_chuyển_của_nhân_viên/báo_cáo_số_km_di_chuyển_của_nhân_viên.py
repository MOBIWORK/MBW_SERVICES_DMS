# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt
import frappe
from frappe import _
import requests
from datetime import datetime, timedelta
import math


def execute(filters=None):
	columns = [
		{
			"label": _("Mã nhân viên"),
			"fieldname": "employee",
			"fieldtype": "Link",
			"options": "Employee",
			"width": 150
		},
		{
			"label": _("Tên nhân viên"),
			"fieldname": "employee_name",
			"fieldtype": "Data",
			"width": 150
		},
		{
			"label": _("Ngày"),
			"fieldname": "date",
			"fieldtype": "Date",
			"width": 150
		},
		{
			"label": _("Nhóm bán hàng"),
			"fieldname": "sales_team",
			"fieldtype": "Link",
			"options": "Sales Person",
			"width": 150
		},
		{
			"label": _("Quãng đường di chuyển"),
			"fieldname": "count_km",
			"fieldtype": "Data",
			"width": 150
		},
		{
			"label": _("Thời gian di chuyển"),
			"fieldname": "count_time",
			"fieldtype": "Data",
			"width": 150
		},
		{
			"label": _("Tốc độ trung bình"),
			"fieldname": "average_speed",
			"fieldtype": "Data",
			"width": 150
		},
		{
			"label": _("Số lần dừng"),
			"fieldname": "count_stop",
			"fieldtype": "Data",
			"width": 150
		},
		{
			"label": _("Thời gian dừng"),
			"fieldname": "time_stop",
			"fieldtype": "Data",
			"width": 150
		},
		{
			"label": _("Số lần viếng thăm"),
			"fieldname": "count_visitor",
			"fieldtype": "Data",
			"width": 150
		},
		{
			"label": _("Thời gian viếng thăm"),
			"fieldname": "time_visitor",
			"fieldtype": "Data",
			"width": 150
		},
	]
	data = get_data(filters)
	return columns, data

def get_data(filters):
	projectID = ''
	api_key = ''
	data = []
	dms_settinngs = frappe.get_doc("DMS Settings").as_dict()
	if dms_settinngs.get("ma_du_an"):
		projectID = dms_settinngs.get("ma_du_an")
		api_key = dms_settinngs.get("api_key")
	list_employee = frappe.get_list("Sales Person", fields=["name", 'employee', 'sales_person_name', 'parent_sales_person', "object_id"],
									filters = get_filters(filters))
	total = {
		"employee": "Total",
		"count_km": 0,
		"count_time": 0,
		"count_stop": 0,
		"average_speed": 0,
		"count_visitor": 0,
		"time_visitor": 0,
		"time_stop": 0,
	}
	for employee in list_employee:
		if employee.employee and employee.employee != "":
			log_trips = get_report_api("history", projectID, employee.object_id, api_key, filters)

			if filters.get("total_days") == 1:
				item = {
					"employee": employee.employee,
					"employee_name": employee.sales_person_name,
					"sales_team": employee.parent_sales_person,
					"date": '',
					"count_km": 0,
					"count_time": 0,
					"count_stop": 0,
					"average_speed": 0,
					"count_visitor": 0,
					"time_visitor": 0,
					"time_stop": 0,
				}
				if log_trips.get("summary"):
					log = log_trips.get("summary")
					item["count_km"] = chuyen_doi_don_vi(log.get("moves").get("distance"), "km")
					item["count_time"] = chuyen_doi_don_vi(log.get("moves").get("totalTime"), "time")
					item["average_speed"] = chuyen_doi_don_vi(log.get("moves").get("avgSpeed"), "speed")
					item["count_visitor"] = log.get("checkins").get("count")
					item["count_stop"] = log.get("stops").get("count")
					item["time_stop"] = chuyen_doi_don_vi(log.get("stops").get("totalTime"), "time")
					item["time_visitor"] = chuyen_doi_don_vi(log.get("checkins").get("totalTime"), "time")
					data.append(item)
					total["count_km"] += log.get("moves").get("distance")
					total["count_time"] += log.get("moves").get("totalTime")
					total["count_stop"] += log.get("stops").get("count")
					total["count_visitor"] += log.get("checkins").get("count")
					total["time_visitor"] += log.get("checkins").get("totalTime")
					total["time_stop"] += log.get("stops").get("totalTime")
			else:
				if log_trips.get("details"):
					from_time = datetime.strptime(filters.get("from_date"), "%Y-%m-%d")
					from_time = (from_time - timedelta(days=1)).replace(hour=17, minute=0, second=0, microsecond=0)
					end_time = datetime.strptime(filters.get("to_date"), "%Y-%m-%d")
					end_time = end_time.replace(hour=17, minute=0, second=0, microsecond=0)
					items = {}
					while from_time < end_time:
						to_time = from_time + timedelta(days=1)
						item = {
							"employee": employee.employee,
							"employee_name": employee.sales_person_name,
							"sales_team": employee.parent_sales_person,
							"date": to_time,
							"count_km": 0,
							"count_time": 0,
							"count_stop": 0,
							"average_speed": 0,
							"count_visitor": 0,
							"time_visitor": 0,
							"time_stop": 0,
						}
						items[to_time] = item
						from_time = to_time
					for log in log_trips.get("details"):
						if log.get("type") == "start" or log.get("type") == "end":
							continue
						time = datetime.strptime(log.get("endTime"), "%Y-%m-%dT%H:%M:%S.%fZ")
						to_time = time.replace(hour=17, minute=0, second=0, microsecond=0)
						if time < to_time:
							time = to_time
						else:
							time = to_time + timedelta(days=1)
						if log.get("type") == "move":
							items[time]["count_km"] += float(log.get("distance"))
							items[time]["count_time"] += float(log.get("duration"))
						if log.get("type") == "checkin":
							items[time]["count_visitor"] += 1
							items[time]["time_visitor"] += float(log.get("duration"))
						if log.get("type") == "stop":
							items[time]["count_stop"] += 1
							items[time]["time_stop"] += float(log.get("duration"))
					for item in items:
						total["count_km"] += items[item]["count_km"]
						total["count_time"] += items[item]["count_time"]
						total["count_stop"] += items[item]["count_stop"]
						total["count_visitor"] += items[item]["count_visitor"]
						total["time_visitor"] += items[item]["time_visitor"]
						total["time_stop"] += items[item]["time_stop"]
						items[item]["average_speed"] = chuyen_doi_don_vi(round(items[item]["count_km"] / items[item]["count_time"], 2), "speed") if items[item]["count_time"]>0 else 0
						items[item]["count_km"] = chuyen_doi_don_vi(items[item]["count_km"], "km")
						items[item]["count_time"] = chuyen_doi_don_vi(items[item]["count_time"], "time")
						items[item]["time_stop"] = chuyen_doi_don_vi(items[item]["time_stop"], "time")
						items[item]["time_visitor"] = chuyen_doi_don_vi(items[item]["time_visitor"], "time")
						data.append(items[item])
	total["average_speed"] = chuyen_doi_don_vi(round(total["count_km"] /total["count_time"], 2), "speed") if total["count_time"]>0 else 0
	total["count_km"] = chuyen_doi_don_vi(total["count_km"], "km")
	total["count_time"] = chuyen_doi_don_vi(total["count_time"], "time")
	total["time_stop"] = chuyen_doi_don_vi(total["time_stop"], "time")
	total["time_visitor"] = chuyen_doi_don_vi(total["time_visitor"], "time")
	data.append(total)
	return data

def chuyen_doi_don_vi(number, don_vi):
	number = float(number)
	if don_vi == "km":
		ans = str(math.ceil(number / 100) / 10) + " km"
		return ans
	if don_vi == "time":
		ans = ""
		mm = math.ceil(number/60)

		if mm < 60 and mm > 0:
			ans = str(mm) + " phút "
		elif mm >= 60:
			hh = int(mm / 60)
			ans = str(hh) + " giờ "
			mm = mm - hh * 60
			if mm > 0:
				ans += str(mm) + " phút "
		return ans
	if don_vi == "speed":
		ans = str(round(number * 3.6)) + " km/h"
		return ans


def get_report_api(type, projectID, objectID, api_key, filters):
	from_time = datetime.strptime(filters.get("from_date"), "%Y-%m-%d")
	from_time = (from_time - timedelta(days=1)).replace(hour=17, minute=0, second=0, microsecond=0).isoformat() + "Z"
	to_time = datetime.strptime(filters.get("to_date"), "%Y-%m-%d")
	to_time = to_time.replace(hour=17, minute=0, second=0, microsecond=0).isoformat() + "Z"

	url = f"https://api.ekgis.vn/v2/reports/{type}/{projectID}/{objectID}?from_time={from_time}&to_time={to_time}&api_key={api_key}"

	payload = {}
	headers = {
		'Accept': '*/*',
		'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
		'Pragma': 'no-cache',
		'Sec-Fetch-Dest': 'empty',
		'Sec-Fetch-Mode': 'cors',
		'Sec-Fetch-Site': 'cross-site',
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
		'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Linux"'
	}

	response = requests.request("GET", url, headers=headers, data=payload)
	# print("response", response.text)
	return response.json()

def get_filters(filters):
	conditions = {}
	if filters.get("sales_team"):
		conditions["parent_sales_person"] = filters.get("sales_team")
	if filters.get("employee"):
		conditions["employee"] = filters.get("employee")
	return conditions