# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from mbw_dms.api.validators import validate_filter_timestamp
from frappe.utils import nowdate, today
import calendar
from collections import defaultdict 
import datetime
from mbw_dms.api.common import (
    exception_handle,
    gen_response,
    get_value_child_doctype,
    current_month_week,
    get_child_values_doc
)
import pydash
class DMSKPI(Document):
    pass

def validate_create_kpi(doc, method):
    month = int(nowdate().split('-')[1])
    year = int(nowdate().split('-')[0])
    start_date_str = f"{year:04d}-{month:02d}-01"
    last_day_of_month = calendar.monthrange(year, month)[1]
    end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
    start_date = frappe.utils.getdate(start_date_str)
    end_date = frappe.utils.getdate(end_date_str)
    
    if frappe.db.exists("DMS KPI", {"ngay_hieu_luc_tu": (">=", start_date), "ngay_hieu_luc_den": ("<=", end_date), "nhan_vien_ban_hang": doc.nhan_vien_ban_hang}):
        raise frappe.msgprint("Chỉ được tạo 1 bản KPI cho nhân viên trong 1 tháng")


# Báo cáo kpi viếng thăm
@frappe.whitelist(methods="GET")
def visit_report():
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
        
        kpi = {}

        # Lấy Kpi tháng vt lượt
        monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "so_kh_vt_luot")
        # Lấy Kpi nhân viên vt
        kpi_employee = frappe.get_value("DMS KPI", {"ngay_hieu_luc_tu": (">=", start_date), "ngay_hieu_luc_den": ("<=", end_date), "nhan_vien_ban_hang": user_name}, "so_kh_vt_luot")
        
        if monthly_summary and kpi_employee:
            kpi = {
                "chi_tieu": kpi_employee,
                "dat_duoc": monthly_summary,
                "phan_tram_thuc_hien": round(float(monthly_summary / kpi_employee * 100), 2),
            }

        elif monthly_summary and not kpi_employee:
            kpi = {
                "chi_tieu": 0,
                "dat_duoc": monthly_summary,
                "phan_tram_thuc_hien": 100,
            }
        
        else:
            return gen_response(200, "Thành công", kpi)
        
        return gen_response(200, "Thành công", kpi)
    except Exception as e:
        return exception_handle(e)
    

# Báo cáo doanh số
@frappe.whitelist(methods="GET")
def sales_report():
    try:
        todays = today()
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])
        start_date_str = f"{year:04d}-{month:02d}-01"
        last_day_of_month = calendar.monthrange(year, month)[1]
        end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
        start_date = frappe.utils.getdate(start_date_str)
        end_date = frappe.utils.getdate(end_date_str)

        # Lấy id của nhân viên
        user_id = frappe.session.user
        employee = frappe.get_value("Employee", {"user_id": user_id}, "name")
        sales_per = frappe.get_value("Sales Person", {"employee": employee}, "name")
        
        kpi = {}

        # Lấy Kpi tháng
        monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": employee}, "doanh_so_thang")
        
        # Lấy Kpi nhân viên
        kpi_employee = frappe.get_value("DMS KPI", {"ngay_hieu_luc_tu": (">=", start_date), "ngay_hieu_luc_den": ("<=", end_date), "nhan_vien_ban_hang": employee}, "doanh_so")
        
        # Tạo một danh sách để lưu trữ thông tin của các đơn bán hàng
        orders_list = []
        if monthly_summary and kpi_employee:
            kpi = {
                "dat_duoc": float(monthly_summary),
                "phan_tram_thuc_hien": round(float(monthly_summary / kpi_employee * 100), 2),
            }

            # Lấy danh sách đơn hàng từ đầu tháng đến hiện tại
            sales_order = frappe.get_all("Sales Order",
                filters={"transaction_date": ("between", [start_date,todays]), "docstatus": 1},
                fields=["name", "grand_total", "transaction_date"]
            )

            daily_totals = defaultdict(float)
            for order in sales_order:
                st = get_value_child_doctype("Sales Order", order["name"], "sales_team")
                for j in st:
                    if j.sales_person == sales_per and j.created_by == 1:
                        transaction_date = order.get("transaction_date")
                        date_str = transaction_date.strftime("%Y-%m-%d")
                        total = order.get("grand_total")
                        daily_totals[date_str] += total

            # Lặp qua từng mục trong daily_totals để tạo danh sách các đơn bán hàng
            for date, total in daily_totals.items():
                orders_list.append({"ngay": date, "doanh_so": total})

        elif monthly_summary and not kpi_employee:
            kpi = {
                "dat_duoc": float(monthly_summary),
                "phan_tram_thuc_hien": 100,
            }
        
        else:
            return gen_response(200, "Thành công", {
                "kpi": {},
                "sales_order": []
            })

        return gen_response(200, "Thành công", {
            "kpi": kpi,
            "sales_order": orders_list
        })
    except Exception as e:
        return exception_handle(e)


# Báo cáo doanh thu nhân viên
@frappe.whitelist(methods="GET")
def invoices_report():
    try:
        todays = today()
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])
        start_date_str = f"{year:04d}-{month:02d}-01"
        last_day_of_month = calendar.monthrange(year, month)[1]
        end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
        start_date = frappe.utils.getdate(start_date_str)
        end_date = frappe.utils.getdate(end_date_str)

        # Lấy id của nhân viên
        user_id = frappe.session.user
        employee = frappe.get_value("Employee", {"user_id": user_id}, "name")
        sales_per = frappe.get_value("Sales Person", {"employee": employee}, "name")
        
        kpi = {}
        # Tạo một danh sách để lưu trữ thông tin của các hóa đơn bán hàng
        invoices_list = []

        # Lấy Kpi tháng
        monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": employee}, "doanh_thu_thang")
        
        # Lấy Kpi nhân viên
        kpi_employee = frappe.get_value("DMS KPI", {"ngay_hieu_luc_tu": (">=", start_date), "ngay_hieu_luc_den": ("<=", end_date), "nhan_vien_ban_hang": employee}, "doanh_thu")
        
        if monthly_summary and kpi_employee:
            kpi = {
                "dat_duoc": float(monthly_summary),
                "phan_tram_thuc_hien": round(float(monthly_summary / kpi_employee * 100), 2),
            }

            # Lấy danh sách hóa đơn từ đầu tháng đến hiện tại
            sales_invoice = frappe.get_all("Sales Invoice",
                filters={"posting_date": ("between", [start_date, todays]), "docstatus": 1, "is_return": 0,},
                fields=["name", "grand_total", "posting_date"]
            )

            daily_totals = defaultdict(float)
            for invoice in sales_invoice:
                st = get_value_child_doctype("Sales Invoice", invoice["name"], "sales_team")
                for j in st:
                    if j.sales_person == sales_per and j.created_by == 1:
                        posting_date = invoice.get("posting_date")
                        date_str = posting_date.strftime("%Y-%m-%d")
                        total = invoice.get("grand_total")
                        daily_totals[date_str] += total

            # Lặp qua từng mục trong daily_totals để tạo danh sách các hóa đơn bán hàng
            for date, total in daily_totals.items():
                invoices_list.append({"ngay": date, "doanh_thu": total})

        elif monthly_summary and not kpi_employee:
            kpi = {
                "dat_duoc": float(monthly_summary),
                "phan_tram_thuc_hien": 100,
            }

        else:
            return gen_response(200, "Thành công", {
                "kpi": kpi,
                "sales_invoice": invoices_list
            })

        # Trả về phản hồi bao gồm cả KPI và danh sách hóa đơn bán hàng
        return gen_response(200, "Thành công", {
            "kpi": kpi,
            "sales_invoice": invoices_list
        })
    except Exception as e:
        return exception_handle(e)
    

# Báo cáo doanh thu, đơn hàng cho Mobile
@frappe.whitelist(methods="GET")
def report_orders_invoices(customer_name):
    try:
        todays = today()
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])
        start_date_str = f"{year:04d}-{month:02d}-01"
        start_date = frappe.utils.getdate(start_date_str)

        user_id = frappe.session.user
        employee = frappe.get_value("Employee", {"user_id": user_id}, "name")
        sales_per = frappe.get_value("Sales Person", {"employee": employee}, "name")

        data = {}
        data["ngay"] = todays

        # Lấy danh sách đơn hàng từ đầu tháng đến hiện tại
        sales_order = frappe.get_all("Sales Order",
            filters={"transaction_date": ("between", [start_date, todays]), "customer_name": customer_name, "docstatus": 1},
            fields=["name"]
        )

        orders = 0
        for i in sales_order:
            st = get_value_child_doctype("Sales Order", i["name"], "sales_team")
            for j in st:
                if j.sales_person == sales_per and j.created_by == 1:
                    orders += 1
        data["so_don_trong_thang"] = orders

        # Lấy danh sách hóa đơn từ đầu tháng đến hiện tại
        sales_invoice = frappe.get_all("Sales Invoice",
            filters={"posting_date": ("between", [start_date, todays]), "docstatus": 1, "customer_name": customer_name, "is_return": 0},
            fields=["name", "grand_total", "posting_date"]
        )

        total_invoices = 0
        for i in sales_invoice:
            st = get_value_child_doctype("Sales Invoice", i["name"], "sales_team")
            for j in st:
                if j.sales_person == sales_per and j.created_by == 1:
                    total_invoices += i["grand_total"]
        
        data["doanh_thu_thang"] = total_invoices

        # Lấy tên người viếng thăm cuối cùng và đặt hàng lần cuối
        last_visit = frappe.get_list("DMS Checkin", filters={"kh_ten": customer_name}, limit=1, order_by="creation desc", fields=["owner", "checkin_giovao"])

        if last_visit:
            user_checkin = frappe.get_value("Employee", {"user_id": last_visit[0].owner}, "employee_name")
            data["nv_vieng_tham"] = user_checkin
            data["vieng_tham_cuoi"] = last_visit[0].checkin_giovao
        else:
            data["nv_vieng_tham"] = ""
            data["vieng_tham_cuoi"] = ""

        last_order = frappe.get_list("Sales Order", filters={"customer": customer_name, "docstatus": 1}, limit=1, order_by="creation desc", fields=["owner", "creation"])
        if last_order:
            user_order = frappe.get_value("Employee", {"user_id": last_order[0].owner}, "employee_name")
            data["nv_dat_hang"] = user_order
            data["don_hang_cuoi"] = last_order[0].creation
        else:
            data["nv_dat_hang"] = ""
            data["don_hang_cuoi"] = ""

        return gen_response(200, "Thành công", data)
    
    except Exception as e:
        return exception_handle(e)


# Báo cáo chi tiết viếng thăm
@frappe.whitelist(methods="GET")
def report_detail_visit(customer_name, kwargs):
    try:
        from_date = validate_filter_timestamp("start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp("end")(kwargs.get("to_date")) if kwargs.get("to_date") else None

        user_id = frappe.session.user
        employee = frappe.get_value("Employee", {"user_id": user_id}, "name")
        sales_per = frappe.get_value("Sales Person", {"employee": employee}, "name")
        
        query_so = {}
        if from_date and to_date:
            query_so["creation"] = ["between", [from_date,to_date]]
        elif from_date:
            query_so["creation"] = [">=", from_date]
        elif to_date:
            query_so["creation"] = ["<=", to_date]
        query_so["customer_name"] = customer_name
        query_so["docstatus"] = ["!=", 2]
        data = {}

        # Lấy danh sách đơn hàng
        sales_order = frappe.get_all("Sales Order", filters=query_so, fields=["name", "transaction_date", "grand_total"])

        orders_list = []
        grand_totals = 0
        for i in sales_order:
            st = get_value_child_doctype("Sales Order", i["name"], "sales_team")
            for j in st:
                if j.sales_person == sales_per and j.created_by == 1 and i["name"] not in orders_list:
                    order_info = {
                        "name": i.get("name"),
                        "transaction_date": i.get("transaction_date"),
                        "grand_total": i.get("grand_total")
                    }
                    orders_list.append(order_info)
                    grand_totals += i["grand_total"]

        data["so_don_trong_thang"] = len(orders_list)
        data["so_tien_phai_tra"] = grand_totals
        data["danh_sach_don"] = orders_list

        # Tồn kho
        query_inv = {}
        if from_date and to_date:
            query_inv["creation"] = ["between", [from_date,to_date]]
        elif from_date:
            query_inv["creation"] = [">=", from_date]
        elif to_date:
            query_inv["creation"] = ["<=", to_date]
        query_inv["customer_name"] = customer_name
        query_inv["owner"] = user_id

        inventory = frappe.get_all("DMS Inventory", filters=query_inv, fields=["name", "creation"])
        for i in inventory:
            i["items"] = get_value_child_doctype("DMS Inventory", i["name"], "items")

        # Công nợ

        query_si = {}
        if from_date and to_date:
            query_si["creation"] = ["between", [from_date,to_date]]
        elif from_date:
            query_si["creation"] = [">=", from_date]
        elif to_date:
            query_si["creation"] = ["<=", to_date]
        query_si["customer_name"] = customer_name
        query_si["docstatus"] = 1

        total_sum_si = 0
        si = frappe.db.get_all("Sales Invoice", filters={"docstatus": 1, "customer_name": customer_name}, fields=["name", "grand_total"])
        for i in si:
            st = get_value_child_doctype("Sales Invoice", i["name"], "sales_team")
            for j in st:
                if j.sales_person == sales_per and j.created_by == 1:
                    total_sum_si += i["grand_total"]

        sales_invoice = frappe.get_all("Sales Invoice", filters=query_si, fields=["name", "posting_date", "grand_total"])

        grouped_data = {}
        total_si_fil = 0
        for invoice in sales_invoice:
            st = get_value_child_doctype("Sales Invoice", invoice["name"], "sales_team")
            for j in st:
                if j.sales_person == sales_per and j.created_by == 1:
                    total_si_fil += invoice["grand_total"]
                    posting_date = invoice["posting_date"]
                    if posting_date not in grouped_data:
                        grouped_data[posting_date] = {
                            "invoices": [],
                            "total_grand_total": 0
                        }
                    grouped_data[posting_date]["invoices"].append(invoice)
                    grouped_data[posting_date]["total_grand_total"] += invoice["grand_total"]

        # Chuyển đổi dữ liệu thành danh sách
        receivable_details = []
        for posting_date, details in grouped_data.items():
            receivable_details.append({
                "posting_date": posting_date,
                "details": details["invoices"],
                "total_grand_total": details["total_grand_total"]
            })
        
        receivable_summary = {
            "tong_cong_no": total_sum_si,
            "cong_no_den_ngay": total_si_fil
        }

        return gen_response(200, "Thành công", {
            "don_hang": data,
            "ton_kho": inventory,
            "cong_no": receivable_summary,
            "cong_no_chi_tiet": receivable_details
        })
    
    except Exception as e:
        return exception_handle(e)
    
# Kết quả đi tuyến
@frappe.whitelist(methods="GET")
def router_results(kwargs):
    try:
        data = {}
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        if from_date and to_date:
            filters["creation"] = ["between", [from_date,to_date]]
        elif from_date:
            filters["creation"] = [">=", from_date]
        elif to_date:
            filters["creation"] = ["<=", to_date]

        user_id = frappe.session.user
        employee = frappe.get_value("Employee", {"user_id": user_id}, "name")
        sales_per = frappe.get_value("Sales Person", {"employee": employee}, "name")

        # Tổng doanh số trong ngày
        data["doanh_so"] = 0
        sales_order = frappe.get_all("Sales Order", filters={**filters, "docstatus": 1}, fields=["name", "grand_total"])
        for i in sales_order:
            st = get_value_child_doctype("Sales Order", i["name"], "sales_team")
            for j in st:
                if j.sales_person == sales_per and j.created_by == 1:
                    data["doanh_so"] += i["grand_total"]

        # Dữ liệu viếng thăm
        data["vieng_tham_co_don"] = 0
        data["vieng_tham_ko_don"] = 0
        data["vieng_tham_co_anh"] = 0
        data["vieng_tham_ko_anh"] = 0
        data["vt_dung_tuyen"] = 0
        data["vt_ngoai_tuyen"] = 0

        data_checkin = frappe.get_all("DMS Checkin", filters={**filters, "owner": user_id}, fields=["name", "kh_ten", "checkin_donhang", "checkin_dungtuyen"])
        list_customer = []
        for i in data_checkin:
            if i["kh_ten"] not in list_customer:
                list_customer.append(i['kh_ten'])
            checkin_hinhanh = get_value_child_doctype("DMS Checkin", i["name"], "checkin_hinhanh")
            if i["checkin_donhang"] != 0:
                data['vieng_tham_co_don'] += 1
            if i["checkin_donhang"] == 0:
                data["vieng_tham_ko_don"] += 1
            if len(checkin_hinhanh) != 0:
                data["vieng_tham_co_anh"] += 1
            if len(checkin_hinhanh) == 0:
                data["vieng_tham_ko_anh"] += 1
            if i["checkin_dungtuyen"] == 0:
                data["vt_ngoai_tuyen"] += 1
            if i["checkin_dungtuyen"] == 1:
                data["vt_dung_tuyen"] += 1

        # Check số khách hàng phải viếng thăm theo tuyến
        # Lấy thứ của ngày
        days = datetime.date.today()
        date = days.weekday()
        # Chuyển đổi sang tên của ngày trong tuần
        date_in_week = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"]
        name_date = date_in_week[date]
        router_employee = frappe.get_all("DMS Router", filters={"employee": employee, "travel_date": name_date}, fields=["name"])

        cus = 0
        if router_employee:
            for i in router_employee:
                customers = get_value_child_doctype("DMS Router", i["name"], "customers")
                for a in customers:
                    fre = a["frequency"]
                    week_router = []
                    frequency = fre.split(';')
                    for i in frequency:
                        week_router.append(int(i))
                    current_week = current_month_week()
                    if current_week in week_router:
                        cus += 1

        data["so_kh_da_vt"] = len(list_customer)
        data["so_kh_phai_vt"] = cus
        
        return gen_response(200, "Thành công", data)
    except Exception as e:
        return exception_handle(e)
    

# Báo cáo viếng thăm
@frappe.whitelist(methods="GET")
def checkin_report(kwargs):
    try:
        data = {}
        filters = {}

        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None

        user_id = frappe.session.user
        employee = frappe.get_value("Employee", {"user_id": user_id}, "name")
        sales_per = frappe.get_value("Sales Person", {"employee": employee}, "name")

        if from_date and to_date:
            filters["creation"] = ["between", [from_date,to_date]]
        elif from_date:
            filters["creation"] = [">=", from_date]
        elif to_date:
            filters["creation"] = ["<=", to_date]

        # Tổng doanh thu trong ngày
        data["doanh_so"] = 0
        sales_invoice = frappe.get_all("Sales Invoice", filters={**filters, "docstatus": 1}, fields=["name", "grand_total"])
        if sales_invoice:
            for i in sales_invoice:
                st = get_value_child_doctype("Sales Invoice", i["name"], "sales_team")
                for j in st:
                    if j.sales_person == sales_per and j.created_by == 1:
                        data["doanh_so"] += i["grand_total"]

        data_checkin = frappe.get_all("DMS Checkin", filters={**filters, "owner": user_id}, fields=["name", "kh_ten", "kh_ma", "checkin_giovao", "checkin_giora", "checkin_donhang", "checkin_dungtuyen"])
        list_customer = []

        if data_checkin:
            for i in data_checkin:
                i["checkin_hinhanh"] = 0
                checkin_image = get_value_child_doctype("DMS Checkin", i["name"], "checkin_hinhanh")
                if checkin_image:
                    i["checkin_hinhanh"] = len(checkin_image)
                if i["kh_ten"] not in list_customer:
                    list_customer.append(i["kh_ten"])
                i["doanh_so"] = frappe.get_value("Sales Order", {"customer": i["kh_ten"]}, "grand_total")

        # Check số khách hàng phải viếng thăm theo tuyến
        # Lấy tuyến của nhân viên
        user_name = frappe.get_value("Employee", {"user_id": user_id}, "name")
        # Lấy thứ của ngày
        days = datetime.date.today()
        date = days.weekday()
        # Chuyển đổi sang tên của ngày trong tuần
        date_in_week = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"]
        name_date = date_in_week[date]

        router_employee = frappe.get_all("DMS Router", filters={"employee": user_name, "travel_date": name_date}, fields=["name"])

        cus_not_checkin = 0
        filtered_customers = []
        if router_employee:
            for i in router_employee:
                customers = get_value_child_doctype("DMS Router", i["name"], "customers")
                for a in customers:
                    fre = a["frequency"]
                    week_router = []
                    frequency = fre.split(';')
                    for i in frequency:
                        week_router.append(int(i))
                    current_week = current_month_week()
                    if current_week in week_router:
                        # data khách hàng chưa checkin
                        if not frappe.db.exists("DMS Checkin", {"kh_ten": a["customer"]}):
                            cus_not_checkin += 1

                            filtered_customer = a.copy()
                            filtered_customer.pop("frequency", None)
                            filtered_customer.pop("long", None)
                            filtered_customer.pop("lat", None)
                            filtered_customers.append(filtered_customer)
        
        data["so_kh_da_vt"] = len(list_customer)
        data["so_kh_chua_vt"] = cus_not_checkin

        return gen_response(200, "Thành công", {
            "data": data,
            "has_checkin": data_checkin,
            "not_checkin": filtered_customers
        })
    except Exception as e:
        return exception_handle(e)


# Thống kê phiếu đặt hàng
@frappe.whitelist(methods="GET")
def order_statistics(kwargs):
    try:
        data = {}
        details = []
        detail_items = []
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None

        user_id = frappe.session.user
        employee = frappe.get_value("Employee", {"user_id": user_id}, "name")
        sales_per = frappe.get_value("Sales Person", {"employee": employee}, "name")

        if from_date and to_date:
            filters["creation"] = ["between", [from_date, to_date]]
        elif from_date:
            filters["creation"] = [">=", from_date]
        elif to_date:
            filters["creation"] = ["<=", to_date]

        field_items = ["item_name", "item_code", "rate", "qty", "uom", "amount"]
        # Tổng hợp số khách hàng, số sản phẩm
        list_customer = []
        sales_order = frappe.get_all("Sales Order", filters={**filters, "docstatus": 1}, fields=["name", "customer"])

        sum_qty = 0
        sum_amount = 0
        t_items = []
        for i in sales_order:
            st = get_value_child_doctype("Sales Order", i["name"], "sales_team")
            for j in st:
                if j.sales_person == sales_per and j.created_by == 1:
                    if i["customer"] not in sales_order:
                        list_customer.append(i["customer"])
                    customer_code = frappe.get_value("Customer", {"name": i["customer"]}, "customer_code")

                    items = get_child_values_doc(doctype="Sales Order", master_name=i["name"], fields_to_get=field_items, chil_name="items")
                    qty = [item.get("qty") for item in items]
                    amount = [item.get("amount") for item in items]
                    sum_amount += sum(amount)
                    sum_qty += int(sum(qty))

                    info_order = {
                        "customer": i["customer"],
                        "customer_code": customer_code,
                        "qty": sum(qty),
                        "amount": sum(amount)
                    }

                    details.append(info_order)
                    for item in items:
                        detail_items.append(item)
                        if item["item_name"] not in t_items:
                            t_items.append(item["item_name"])

        data["total_customers"] = len(list_customer)
        data["total_items"] = len(t_items)
        data["total_qty"] = sum_qty
        data["sum_amount"] = sum_amount

        return gen_response(200, "Thành công", {
            "data": data,
            "details": details,
            "detail_items": detail_items
        })
    except Exception as e:
        return exception_handle(e)
    

# Báo cáo khách hàng mới
@frappe.whitelist(methods="GET")
def new_customer_report(kwargs):
    try:
        data = {}
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        
        if from_date and to_date:
            filters["creation"] = ["between", [from_date,to_date]]
        elif from_date:
            filters["creation"] = [">=", from_date]
        elif to_date:
            filters["creation"] = ["<=", to_date]

        user_id = frappe.session.user
        filters["owner"] = user_id

        list_customers = frappe.get_all("Customer", filters=filters, fields=["name", "customer_name", "customer_code", "customer_type", "customer_group", "UNIX_TIMESTAMP(creation) as date_collection", "customer_primary_address as address"])
        data["total_new_cus"] = frappe.db.count("Customer", filters=filters)

        return gen_response(200, "Thành công", {
            "data": data,
            "list_customer": list_customers
        })
    except Exception as e:
        return exception_handle(e)


# Chỉ tiêu KPI
@frappe.whitelist(methods="GET")
def kpi_targets(kwargs):
    try:
        month = int(kwargs.get("month"))
        year = int(kwargs.get("year"))
        start_date_str = f"{year:04d}-{month:02d}-01"
        last_day_of_month = calendar.monthrange(year, month)[1]
        end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
        start_date = frappe.utils.getdate(start_date_str)
        end_date = frappe.utils.getdate(end_date_str)

        today = datetime.datetime.now().date()
        first_day = today.replace(day=1)

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
        
        # Tính toán chỉ số KPI nếu có dữ liệu
        kpi = None
        if monthly_summary and kpi_employee:
            kpi = {
                "so_ngay_thuc_hien": (today - first_day).days + 1 if datetime.datetime.now().month == month else last_day_of_month,
                "th_doanh_thu": monthly_summary[0]["doanh_thu_thang"],
                "kh_doanh_thu": kpi_employee[0]["doanh_thu"],
                "cl_doanh_thu": kpi_employee[0]["doanh_thu"] - monthly_summary[0]["doanh_thu_thang"],
                "th_doanh_so": monthly_summary[0]["doanh_so_thang"],
                "kh_doanh_so": kpi_employee[0]["doanh_so"],
                "cl_doanh_so": kpi_employee[0]["doanh_so"] - monthly_summary[0]["doanh_so_thang"],
                "th_don_hang": monthly_summary[0]["so_don_hang"],
                "kh_don_hang": kpi_employee[0]["so_don_hang"],
                "cl_don_hang": kpi_employee[0]["so_don_hang"] - monthly_summary[0]['so_don_hang'],
                "th_vieng_tham": monthly_summary[0]["so_kh_vt_luot"],
                "kh_vieng_tham": kpi_employee[0]["so_kh_vt_luot"],
                "cl_vieng_tham": kpi_employee[0]["so_kh_vt_luot"] - monthly_summary[0]["so_kh_vt_luot"],
                "th_kh_moi": monthly_summary[0]["so_kh_moi"],
                "kh_kh_moi": kpi_employee[0]["so_kh_moi"],
                "cl_kh_moi": kpi_employee[0]["so_kh_moi"] - monthly_summary[0]["so_kh_moi"],
                "ti_le_doanh_thu": round(float(monthly_summary[0]["doanh_thu_thang"] / kpi_employee[0]["doanh_thu"]) * 100, 2),
                "ti_le_doanh_so": round(float(monthly_summary[0]["doanh_so_thang"] / kpi_employee[0]["doanh_so"]) * 100, 2),
                "ti_le_don_hang": round(float(monthly_summary[0]["so_don_hang"] / kpi_employee[0]["so_don_hang"]) * 100, 2),
                "ti_le_vieng_tham": round(float(monthly_summary[0]["so_kh_vt_luot"] / kpi_employee[0]["so_kh_vt_luot"]) * 100, 2),
                "ti_le_kh_moi": round(float(monthly_summary[0]["so_kh_moi"] / kpi_employee[0]["so_kh_moi"]) * 100, 2)
            }

        # Nếu không có dữ liệu, gán giá trị 0 cho tất cả các chỉ số KPI
        else:
            kpi = {
                "so_ngay_thuc_hien": 0,
                "th_doanh_thu":0,
                "kh_doanh_thu": 0,
                "cl_doanh_thu": 0,
                "th_doanh_so": 0,
                "kh_doanh_so": 0,
                "cl_doanh_so": 0,
                "th_don_hang": 0,
                "kh_don_hang": 0,
                "cl_don_hang": 0,
                "th_vieng_tham": 0,
                "kh_vieng_tham": 0,
                "cl_vieng_tham": 0,
                "th_kh_moi": 0,
                "kh_kh_moi": 0,
                "cl_kh_moi": 0,
                "ti_le_doanh_thu": 0,
                "ti_le_doanh_so": 0,
                "ti_le_don_hang": 0,
                "ti_le_vieng_tham": 0,
                "ti_le_kh_moi": 0
            }
        return gen_response(200, "Thành công", kpi)
    except Exception as e:
        return exception_handle(e)


# Khách hàng chưa phát sinh đơn
@frappe.whitelist(methods="GET")
def customer_not_order(kwargs):
    try:
        date = int(kwargs.get("date"))
        from_date = validate_filter_timestamp(type="start")(date)
        to_date = validate_filter_timestamp(type="end")(date)

        # Lấy tuyến của nhân viên
        user_id = frappe.session.user
        user_name = frappe.get_value("Employee", {"user_id": user_id}, "name")

        # Lấy thứ của ngày
        date_cre = datetime.datetime.fromtimestamp(date)
        date = date_cre.weekday()

        # Chuyển đổi sang tên của ngày trong tuần
        date_in_week = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"]
        name_date = date_in_week[date]

        router_employee = frappe.get_value("DMS Router", {"employee": user_name, "travel_date": name_date}, "name")
        list_cus_not_order = []
        total_customers = 0

        if router_employee:
            customers = get_value_child_doctype("DMS Router", router_employee, "customers")
            for i in customers:
                if not frappe.db.exists("Sales Order", {"customer_name": i["customer"], "creation": ("between", [from_date, to_date])}):
                    transaction_date = frappe.get_all("Sales Order", filters={"customer_name": i["customer"]}, order_by="transaction_date desc", fields=["transaction_date"])
                    info = {
                        "ten_kh": i["customer_name"],
                        "ma_kh": i["customer_code"],
                        "dia_chi": i["display_address"],
                        "ngay_dat_hang_cuoi": transaction_date[0].transaction_date if transaction_date else None,
                        "so_ngay_chua_dat_hang": (date_cre.date() - transaction_date[0].transaction_date).days + 1 if transaction_date else 0
                    }
                    total_customers += 1
                    list_cus_not_order.append(info)

        return gen_response(200, "Thành công", {
            "total_customers": total_customers,
            "details": list_cus_not_order
        })
        
    except Exception as e:
        return exception_handle(e)
    

# Báo cáo công nợ khách hàng
@frappe.whitelist(methods="GET")
def receivable_summary_report(**kwargs):
    try:
        filters = []
        filter_inv = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None

        user_id = frappe.session.user
        employee = frappe.get_value("Employee", {"user_id": user_id}, "name")
        sales_per = frappe.get_value("Sales Person", {"employee": employee}, "name")

        invoice = []

        if from_date and to_date:
            filter_inv["posting_date"] = ["between", [from_date,to_date]]
        filter_inv["docstatus"] = 1
        list_invoices = frappe.get_all("Sales Invoice", filters=filter_inv, fields=["name"])

        for i in list_invoices:
            st = get_value_child_doctype("Sales Invoice", i["name"], "sales_team")
            for j in st:
                if j.sales_person == sales_per and j.created_by == 1 and i["name"] not in invoice:
                    invoice.append(i["name"])
        invoice_str = ", ".join(["'" + inv + "'" for inv in invoice])

        if invoice_str != "":
            filters.append(f"inv.name IN ({invoice_str})")
        filters.append("inv.docstatus=1")

        where_conditions = " AND ".join(filters)

        sql_query = f"""
            SELECT
                inv.customer_name,
                SUM(inv.outstanding_amount) AS total_due,
                cus.customer_code,
                cus.customer_primary_contact,
                cus.mobile_no,
                cus.customer_type,
                cus.customer_group,
                COALESCE(SUM(pe.paid_amount), 0) AS total_paid
            FROM
                `tabSales Invoice` inv
            JOIN `tabCustomer` cus ON cus.name = inv.customer
            LEFT JOIN `tabPayment Entry` pe ON pe.party_name = inv.customer_name
            WHERE
                {where_conditions}
            GROUP BY
                inv.customer_name
        """
        customers_invoice = frappe.db.sql(sql_query, as_dict=True)

        total_dues = 0
        total_paids = 0
        remaining = 0

        # Lấy tổng số tiền đã trả của từng khách hàng
        for cus_inv in customers_invoice:
            total_dues += cus_inv["total_due"]
            total_paids += cus_inv["total_paid"]
            cus_inv["remaining"] = cus_inv["total_due"] - cus_inv["total_paid"]
        remaining = total_dues - total_paids

        return gen_response(200, "Thành công", {
            "total_dues": total_dues,
            "total_paids": total_paids,
            "remaining": remaining,
            "customers": customers_invoice
            })
    except Exception as e:
        return exception_handle(e)
    


# report

def report(kwargs):
    try:
        is_excel = kwargs.get("is_excel", False)
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >= 1 else 1
        employee = kwargs.get("employee")
        sales_team = kwargs.get("sales_team")
        month = int(kwargs.get("month")) if kwargs.get("month") else None
        year = int(kwargs.get("year"))  if kwargs.get("year") else None
        start_date = None
        end_date = None
        if month and year:
            start_date_str = f"{year:04d}-{month:02d}-01"
            last_day_of_month = calendar.monthrange(year, month)[1]
            end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
            start_date = frappe.utils.getdate(start_date_str)
            end_date = frappe.utils.getdate(end_date_str)
        
        filters = []

        if employee:
            filters.append(f"nhan_vien_ban_hang = '{employee}'")
        if sales_team:
            filters.append(f"nhom_ban_hang = '{sales_team}'")
        if bool(start_date):
            filters.append(f"ngay_hieu_luc_tu >= '{start_date}'")
        if bool(end_date):
            filters.append(f"ngay_hieu_luc_den <= '{end_date}'")
        where_condition = " AND ".join(filters)
        
        sql_query = """
            SELECT nhan_vien_ban_hang, nhom_ban_hang, so_kh_vt_luot as kh_vt, so_kh_vt_duynhat as kh_vt_dn, so_kh_dathang as kh_dat_hang, so_don_hang as kh_don_hang,
            so_kh_moi as kh_kh_moi, doanh_so as kh_doanh_so, doanh_thu as kh_doanh_thu, san_luong as kh_san_lg, sku as kh_sku, so_gio_lam_viec as kh_so_gio_lam_viec
            FROM `tabDMS KPI`
        """
        if where_condition:
            sql_query += " WHERE {}".format(where_condition)
        if is_excel:
            data = frappe.db.sql(sql_query, as_dict=True)
        else: 
            sql_query += " LIMIT %s OFFSET %s"
            limit = page_size
            offset = (page_number - 1) * limit
            data = frappe.db.sql(sql_query, (limit, offset), as_dict=True)
        
        for i in data:
            emp = i.nhan_vien_ban_hang
            # kpi nhan vien ban hang
            kpi_month = frappe.db.sql(f"""
                SELECT so_kh_vt_luot as th_vt, so_kh_vt_duynhat as th_vt_dn, so_kh_dat_hang as th_dat_hang, so_don_hang as th_don_hang, so_kh_moi as th_kh_moi,
                doanh_so_thang as th_doanh_so, doanh_thu_thang as th_doanh_thu, san_luong as th_san_lg, sku as th_sku, so_gio_lam_viec as th_so_gio_lam_viec
                FROM `tabDMS Summary KPI Monthly`
                WHERE 
                    nhan_vien_ban_hang = '{emp}'
                    AND thang = '{month}'
                    AND nam = '{year}'
            """, as_dict=True)

            i["kpi_month"] = []
            if bool(kpi_month):
                i["kpi_month"] = kpi_month

        sql_query_count = """
            SELECT COUNT(*)
            FROM `tabDMS KPI`
        """
        if where_condition:
            sql_query_count += " WHERE {}".format(where_condition)
        count_data = frappe.db.sql(sql_query_count, as_dict=True)

        totals = {
            "tong_kh_vt": 0,
            "tong_th_vt": 0,
            "tong_th_vt_dn": 0,
            "tong_kh_vt_dn": 0,
            "tong_th_dat_hang": 0,
            "tong_kh_dat_hang": 0,
            "tong_th_don_hang": 0,
            "tong_kh_don_hang": 0,
            "tong_th_kh_moi": 0,
            "tong_kh_kh_moi": 0,
            "tong_th_doanh_so": 0,
            "tong_kh_doanh_so": 0,
            "tong_th_doanh_thu": 0,
            "tong_kh_doanh_thu": 0,
            "tong_th_san_lg": 0,
            "tong_kh_san_lg": 0,
            "tong_th_sku": 0,
            "tong_kh_sku": 0,
            "tong_th_so_gio_lam_viec": 0,
            "tong_kh_so_gio_lam_viec": 0
        }
        for i in data:
            i["ten_nv"] =  frappe.get_value("Employee", {"name": i["nhan_vien_ban_hang"]}, "employee_name")
            
            i["tl_vt"] = 0
            i["tl_vt_dn"] = 0
            i["tl_dat_hang"] = 0
            i["tl_don_hang"] = 0
            i["tl_kh_moi"] = 0
            i["tl_doanh_so"] = 0
            i["tl_doanh_thu"] = 0
            i["tl_san_luong"] = 0
            i["tl_so_gio_lam_viec"] = 0
            i["tl_sku"] = 0
            
            if bool(i["kpi_month"]):
                if i["kh_vt"] != 0:
                    i["tl_vt"] = round(i["kpi_month"][0]["th_vt"] / i["kh_vt"]*100, 2)

                if i["kh_vt_dn"] != 0:
                    i["tl_vt_dn"] = round(i["kpi_month"][0]["th_vt_dn"] / i["kh_vt_dn"]*100, 2)

                if i["kh_dat_hang"] != 0:
                    i["tl_dat_hang"] = round(i["kpi_month"][0]["th_dat_hang"] / i["kh_dat_hang"]*100, 2)

                if i["kh_don_hang"] != 0:
                    i["tl_don_hang"] = round(i["kpi_month"][0]["th_don_hang"] / i["kh_don_hang"]*100, 2)

                if i["kh_kh_moi"] != 0:
                    i["tl_kh_moi"] = round(i["kpi_month"][0]["th_kh_moi"] / i["kh_kh_moi"]*100, 2)

                if i["kh_doanh_so"] != 0:
                    i["tl_doanh_so"] = round(i["kpi_month"][0]["th_doanh_so"] / i["kh_doanh_so"]*100, 2)

                if i["kh_doanh_thu"] != 0:
                    i["tl_doanh_thu"] = round(i["kpi_month"][0]["th_doanh_thu"] / i["kh_doanh_thu"]*100, 2)

                if i["kh_san_lg"] != 0:
                    i["tl_san_luong"] = round(i["kpi_month"][0]["th_san_lg"] / i["kh_san_lg"]*100, 2)

                if i["kh_sku"] != 0:
                    i["tl_sku"] = round(i["kpi_month"][0]["th_sku"] / i["kh_sku"]*100, 2)

                if i["kh_so_gio_lam_viec"] != 0:
                    i["tl_so_gio_lam_viec"] = round(i["kpi_month"][0]["th_so_gio_lam_viec"] / i["kh_so_gio_lam_viec"]*100, 2)

                totals["tong_th_vt"] += i["kpi_month"][0]["th_vt"]
                totals["tong_th_vt_dn"] += i["kpi_month"][0]["th_vt_dn"]
                totals["tong_th_dat_hang"] += i["kpi_month"][0]["th_dat_hang"]
                totals["tong_th_don_hang"] += i["kpi_month"][0]["th_don_hang"]
                totals["tong_th_kh_moi"] += i["kpi_month"][0]["th_kh_moi"]
                totals["tong_th_doanh_so"] += i["kpi_month"][0]["th_doanh_so"]
                totals["tong_th_doanh_thu"] += i["kpi_month"][0]["th_doanh_thu"]
                totals["tong_th_san_lg"] += i["kpi_month"][0]["th_san_lg"]
                totals["tong_th_sku"] += i["kpi_month"][0]["th_sku"]
                totals["tong_th_so_gio_lam_viec"] += i["kpi_month"][0]["th_so_gio_lam_viec"]
                
                
            # Sum
            totals["tong_kh_vt"] += i["kh_vt"]
            totals["tong_kh_vt_dn"] += i["kh_vt_dn"]
            totals["tong_kh_dat_hang"] += i["kh_dat_hang"]
            totals["tong_kh_don_hang"] += i["kh_don_hang"]
            totals["tong_kh_kh_moi"] += i["kh_kh_moi"]
            totals["tong_kh_doanh_so"] += i["kh_doanh_so"]
            totals["tong_kh_doanh_thu"] += i["kh_doanh_thu"]
            totals["tong_kh_san_lg"] += i["kh_san_lg"]
            totals["tong_kh_sku"] += i["kh_sku"]
            totals["tong_kh_so_gio_lam_viec"] += i["kh_so_gio_lam_viec"]
        if is_excel: 
            print(data)
            for x in data :
                if len(x.get("kpi_month")) > 0 :
                    for key,value in x.get("kpi_month")[0].items():
                        x.update({key:value})
            return {
                "data":data,
                "sum": totals,
            }
        else:
            return gen_response(200, "Thành công", {
                "data": data,
                "sum": totals,
                "page_number": page_number,
                "page_size": page_size,
                "totals": count_data[0]['COUNT(*)']
            })
    except Exception as e:
        return exception_handle(e)
    