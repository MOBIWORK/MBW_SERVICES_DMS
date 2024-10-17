import frappe
from frappe.utils import nowdate

def update_kpi_monthly(doc, method):
    if doc.is_return == 0:
        # Lấy ngày tháng để truy xuất dữ liệu
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])

        # Lấy id của nhân viên
        sales_person = []
        for i in doc.sales_team:
            if i.created_by == 1:
                sales_person.append(i)
        
        for sale in sales_person:
            handle_update_kpi_monthly(sale,doc,month,year)


def update_kpi_monthly_on_cancel(doc, method):
    # Lấy ngày tháng để truy xuất dữ liệu
    month = int(nowdate().split('-')[1])
    year = int(nowdate().split('-')[0])
    
    # Lấy id của nhân viên
    sales_person = []
    for i in doc.sales_team:
        if i.created_by == 1:
            sales_person.append(i)
    
    for sale in sales_person:
        handle_update_kpi_monthly_on_cancel(sale,doc,month,year)
    
    

def update_kpi_monthly_after_delete(doc,method):
    # chỉ thay đổi kpi nếu xóa bản ghi đã submit
    if doc.docstatus == 1:
        update_kpi_monthly_on_cancel(doc,method)


def handle_update_kpi_monthly(sales_info,doc,month,year):
    user_name = frappe.get_value("Sales Person", {"name": sales_info.sales_person}, "employee")
    sales_team = frappe.get_value("DMS KPI", {'nhan_vien_ban_hang': user_name}, "nhom_ban_hang")

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value(
        "DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name"
    )
    grand_totals = doc.grand_total*sales_info.allocated_percentage/100

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


def handle_update_kpi_monthly_on_cancel(sales_info,doc,month,year):
    user_name = frappe.get_value("Sales Person", {"name": sales_info.sales_person}, "employee")

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name")
    grand_totals = doc.grand_total*sales_info.allocated_percentage/100
    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
        monthly_summary_doc.doanh_thu_thang -= grand_totals
        monthly_summary_doc.save(ignore_permissions=True)
    else:
        return