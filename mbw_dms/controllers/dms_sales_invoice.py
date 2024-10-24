import frappe
from frappe.utils import nowdate

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


def update_kpi_monthly_on_cancel(doc, method):
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

def update_kpi_monthly_after_delete(doc,method):
    # chỉ thay đổi kpi nếu xóa bản ghi đã submit
    if doc.docstatus == 1:
        update_kpi_monthly_on_cancel(doc,method)

def calculate_sI(doc, method):
    items = doc.items
    total_lits = 0

    for item in items:
        # Tính số lit
        lit_per_uom = frappe.get_value("Item", {"item_code": item.item_code}, "custom_so_lit_tren_1_don_vi")
        if item.uom == item.stock_uom:
            item.custom_litres_in_1_unit = lit_per_uom
        else:
            item.custom_litres_in_1_unit = lit_per_uom * item.conversion_factor
        item.custom_total_litres_base_on_1_item = item.custom_litres_in_1_unit * item.qty
        total_lits += item.custom_total_litres_base_on_1_item

    doc.custom_total_litres_in_order = total_lits