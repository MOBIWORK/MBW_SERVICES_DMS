import frappe
import datetime

from mbw_dms.api.common import gen_response ,exception_handle, get_value_child_doctype, validate_image
from collections import defaultdict

# Dữ liệu báo cáo tổng hợp
@frappe.whitelist(methods="GET")
def synthesis_report(**kwargs):
    try:
        data = {}
        data["doanh_so"] = 0
        data["tang_vs_hqua"] = 0
        data["don_hang"] = 0

        # Lấy ngày hôm nay và ngày hôm qua
        today = datetime.date.today()
        yesterday = today - datetime.timedelta(days=1)

        # Thiết lập khoảng thời gian ngày hôm qua
        from_date_yesterday = datetime.datetime.combine(yesterday, datetime.time.min)
        to_date_yesterday = datetime.datetime.combine(yesterday, datetime.time.max)

        # Thiết lập khoảng thời gian ngày hôm nay
        from_date_today = datetime.datetime.combine(today, datetime.time.min)
        to_date_today = datetime.datetime.combine(today, datetime.time.max)

        filter_yesterday = {"creation": ["between", [from_date_yesterday, to_date_yesterday]], "docstatus": 1}
        filter_today = {"creation": ["between", [from_date_today, to_date_today]]}

        # Lấy dữ liệu Sales Order cho hôm qua
        sales_orders_yesterday = frappe.get_all("Sales Order", filters=filter_yesterday, fields=["name", "grand_total"])

        # Lấy dữ liệu Sales Order cho hôm nay
        sales_orders_today = frappe.get_all("Sales Order", filters={**filter_today, "docstatus":1}, fields=["name", "grand_total", "customer", "creation"])

        data["so_san_pham"] = 0
        list_cus = []
        list_grand_total = []
        item_counts = defaultdict(int)
        top_item_list = []
        total_by_creation_time = defaultdict(float)

        for i in sales_orders_today:
            data["doanh_so"] += i["grand_total"]
            # Định dạng lại giờ, phút và giây theo định dạng %H
            creation_time = i["creation"].strftime("%H")
            total_by_creation_time[creation_time] += i["grand_total"]
            
            # Lấy số lượng khách hàng
            if i["customer"] not in list_cus:
                list_cus.append(i["customer"])

            # Lấy số sản phẩm
            i["items"] = get_value_child_doctype("Sales Order", i["name"], "items")
            for item in i["items"]:
                data["so_san_pham"] += item["qty"]
                item_counts[item["item_name"]] += item["amount"]

        # Doanh số
        list_grand_total = [{"doanh_so": total, "thoi_gian": time} for time, total in total_by_creation_time.items()]

        # Biểu đồ doanh số
        data["bieu_do_doanh_so"] = list_grand_total

        # Số người mua
        data["so_nguoi_mua"] = len(list_cus)    

        # Danh sách sản phẩm có doanh số cao nhất
        top_item_list = []
        for item_name, amount in item_counts.items():
            item_dict = {
                "ten_sp": item_name,
                "doanh_so": amount,
                "image": validate_image(frappe.get_value("Item", {'item_name': item_name}, "image"))
            }
            top_item_list.append(item_dict)
        top_item_list = sorted(top_item_list, key=lambda x: x["doanh_so"], reverse=True)[:5]
        data["ds_sp_doanh_so_cao"] = top_item_list
        
        # So sánh doanh số với ngày hôm qua
        total_yesterday = 0
        for i in sales_orders_yesterday:
            total_yesterday += i["grand_total"]
        if total_yesterday == 0:
            data["tang_vs_hqua"] = 100
        else:
            data["tang_vs_hqua"] = round(float(data["doanh_so"] / total_yesterday * 100 - 100), 2)

        # Số lượng đơn hàng    
        if sales_orders_today:
            data["don_hang"] = len(sales_orders_today)

        # Lấy dữ liệu viếng thăm
        data["luot_vt"] = 0
        data_checkin = frappe.get_all("DMS Checkin", filters=filter_today, fields=["name", "owner"])
        if data_checkin:
            data["luot_vt"] = len(data_checkin)
        data["ti_le_chuyen_doi"] = 0
        if data["luot_vt"] != 0:
            data["ti_le_chuyen_doi"] = round(float(data["don_hang"]/data["luot_vt"]*100), 2)

        # Lấy số nhân viên online
        data["so_nv_online"] = 0
        employee = []
        for i in data_checkin:
            if i["owner"] not in employee:
                employee.append(i["owner"])
        data["so_nv_online"] = len(employee)

        return gen_response(200, "Thành công", data)
    except Exception as e:
        return exception_handle(e)
    

# Báo cáo giám sát thời gian thực
@frappe.whitelist(methods="GET")
def real_time_monitoring_report(**kwargs):
    try:
        data = {}
        data["doanh_so"] = 0
        data["don_hang"] = 0
        data["luot_vt"] = 0
        today = datetime.date.today()

        # Thiết lập khoảng thời gian ngày hôm nay
        from_date_today = datetime.datetime.combine(today, datetime.time.min)
        to_date_today = datetime.datetime.combine(today, datetime.time.max)

        filter_today = {"creation": ["between", [from_date_today, to_date_today]]}

        # Lấy dữ liệu Sales Order cho hôm nay
        sales_orders_today = frappe.get_all("Sales Order", filters={**filter_today, "docstatus":1}, fields=["name", "grand_total", "customer", "creation"])

        for i in sales_orders_today:
            data["doanh_so"] += i["grand_total"]
        
        # Số lượng đơn hàng    
        if sales_orders_today:
            data["don_hang"] = len(sales_orders_today)

        # Lấy dữ liệu viếng thăm
        data_checkin = frappe.get_all("DMS Checkin", filters=filter_today, fields=["name", "owner","createbyname"])
        if data_checkin:
            data["luot_vt"] = len(data_checkin)

        # Lấy số nhân viên
        total_employee = frappe.db.count("Employee")

        # Lấy số nhân viên online, offline
        data["so_nv_online"] = 0
        employee = []
        for i in data_checkin:
            if i["owner"] not in employee:
                employee.append(i["createbyname"])
        data["so_nv_online"] = len(employee)
        data["so_nv_offline"] = total_employee - data["so_nv_online"]

        return gen_response(200, "Thành công", data)
    except Exception as e:
        return exception_handle(e)