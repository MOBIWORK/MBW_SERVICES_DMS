import frappe
from frappe.utils import nowdate
from datetime import datetime

# Cập nhật kpi tháng
def update_kpi_monthly(doc, method):
    if doc.is_return == 0:
        # Lấy ngày tháng để truy xuất dữ liệu
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])

        # Lấy id của nhân viên
        sales_person = None
        for i in doc.sales_team:
            if i.created_by == 1:
                sales_person = i.sales_person
        
        user_name = frappe.get_value("Sales Person", {"name": sales_person}, "employee")
        sales_team = frappe.get_value("DMS KPI", {'nhan_vien_ban_hang': user_name}, "nhom_ban_hang")

        # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
        existing_monthly_summary = frappe.get_value(
            "DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name"
        )
        grand_totals = doc.grand_total

        if existing_monthly_summary:
            monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
            monthly_summary_doc.doanh_thu_thang += grand_totals
            monthly_summary_doc.save(ignore_permissions=True)
        else:
            monthly_summary_doc = frappe.get_doc({
                "doctype": "DMS Summary KPI Monthly",
                "nam": year,
                "thang": month,
                "nhan_vien_ban_hang": user_name,
                "nhom_ban_hang": sales_team,
                "doanh_thu_thang": grand_totals,
            })
            monthly_summary_doc.insert(ignore_permissions=True)

# Cập nhật kpi ngày
def update_kpi_daily(doc, method):
    if doc.is_return == 0:
        # Lấy ngày tháng
        today = datetime.today().date()

        # Lấy id của nhân viên
        sales_person = None
        for i in doc.sales_team:
            if i.created_by == 1:
                sales_person = i.sales_person
        
        user_name = frappe.get_value("Sales Person", {"name": sales_person}, "employee")

        # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
        existing_daily_summary = frappe.get_value(
            "DMS Summary KPI Daily", {"date": today, "nhan_vien_ban_hang": user_name}, "name"
        )
        grand_totals = doc.grand_total

        if existing_daily_summary:
            daily_summary_doc = frappe.get_doc("DMS Summary KPI Daily", existing_daily_summary)
            daily_summary_doc.doanh_thu_ngay += grand_totals
            daily_summary_doc.save(ignore_permissions=True)
        else:
            daily_summary_doc = frappe.get_doc({
                "doctype": "DMS Summary KPI Daily",
                "date": today,
                "nhan_vien_ban_hang": user_name,
                "doanh_thu_ngay": grand_totals,
            })
            daily_summary_doc.insert(ignore_permissions=True)


# Cập nhật kpi tháng sau khi xóa bản ghi
def update_kpi_monthly_on_cancel(doc, method):
    if doc.is_return == 0:
        # Lấy ngày tháng để truy xuất dữ liệu
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])
        
        # Lấy id của nhân viên
        sales_person = None
        for i in doc.sales_team:
            if i.created_by == 1:
                sales_person = i.sales_person
        
        user_name = frappe.get_value("Sales Person", {"name": sales_person}, "employee")

        # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
        existing_monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name")
        grand_totals = doc.grand_total
        if existing_monthly_summary:
            monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
            monthly_summary_doc.doanh_thu_thang -= grand_totals
            monthly_summary_doc.save(ignore_permissions=True)
        else:
            return
    
# Cập nhật kpi ngày sau khi xóa bản ghi
def update_kpi_daily_on_cancel(doc, method):
    if doc.is_return == 0:
        # Lấy ngày tháng
        today = datetime.today().date()

        # Lấy id của nhân viên
        sales_person = None
        for i in doc.sales_team:
            if i.created_by == 1:
                sales_person = i.sales_person
        
        user_name = frappe.get_value("Sales Person", {"name": sales_person}, "employee")

        # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
        existing_daily_summary = frappe.get_value(
            "DMS Summary KPI Daily", {"date": today, "nhan_vien_ban_hang": user_name}, "name"
        )
        grand_totals = doc.grand_total

        if existing_daily_summary:
            monthly_summary_doc = frappe.get_doc("DMS Summary KPI Daily", existing_daily_summary)
            monthly_summary_doc.doanh_thu_ngay -= grand_totals
            monthly_summary_doc.save(ignore_permissions=True)
        else:
            return
    
# Cập nhật nhân viên bán hàng
def update_sales_person(doc, method):
    if bool(doc.sales_team):
        sales_person = None
        for i in doc.sales_team:
            if i.created_by == 1:
                sales_person = i.sales_person
                doc.sales_person = sales_person
        
        if bool(sales_person):
            employee = frappe.get_value("Sales Person", {"name": sales_person}, "employee")
            doc.phone_number = frappe.get_value("Employee", {"name": employee}, "cell_number")
    else:
        pass