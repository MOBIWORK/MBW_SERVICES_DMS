import frappe
from frappe.utils import nowdate
from mbw_dms.api.common import getConnection,qty_not_pricing_rule,minus_not_nega

from datetime import datetime

def renderMonthYear(doc):
    SO_connect = getConnection(doc=doc,link_doctype="Sales Order")
    if len(SO_connect) > 0 :
        SO_doc = frappe.get_doc('Sales Order',SO_connect[0]).as_dict()

        creation_time = SO_doc.creation
    else:
        creation_time = doc.creation
    print("create creation_time",creation_time)
    if isinstance(creation_time,str):
        creation_time = datetime.strptime(creation_time,"%Y-%m-%d %H:%M:%S.%f")
    thang = creation_time.month
    nam = creation_time.year
    return thang,nam


def update_kpi_monthly(doc, method):
    if doc.is_return == 0:
        # Lấy ngày tháng để truy xuất dữ liệu
        month,year = renderMonthYear(doc)

        # Lấy id của nhân viên
        sales_person = []
        for i in doc.sales_team:
            if i.created_by == 1:
                sales_person.append(i)
        
        for sale in sales_person:
            handle_update_kpi_monthly(sale,doc,month,year)



def update_kpi_monthly_on_cancel(doc, method):
    # Lấy ngày tháng để truy xuất dữ liệu
    # month = int(doc.get("nam"))
    # year = int(doc.get("thang"))
    month,year = renderMonthYear(doc)
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
    itemsSI = doc.get("items")
    qty,uom = qty_not_pricing_rule(itemsSI,"item_name")
    total_uomSI =len(uom)
    # check connect SO
    SOs  = getConnection(doc,"Sales Order")
    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value(
        "DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name"
    )

    grand_totals = doc.grand_total*sales_info.allocated_percentage/100
    if doc.is_return and grand_totals > 0:
        grand_totals = -grand_totals
    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
        if doc.is_return:
            monthly_summary_doc.doanh_thu_thang -= abs(grand_totals)
            # if len(SOs) >0:
            #     total_uom = float(monthly_summary_doc.sku)*float(monthly_summary_doc.so_don_hang) - total_uomSI
            #     monthly_summary_doc.san_luong = minus_not_nega(monthly_summary_doc.san_luong, sum(qty))
            #     monthly_summary_doc.sku = (float(total_uom) / float(monthly_summary_doc.so_don_hang)) if monthly_summary_doc.so_don_hang > 0 else 0
        # monthly_summary_doc.doanh_thu_thang += grand_totals
        else :
            monthly_summary_doc.doanh_thu_thang += abs(grand_totals)
            # total_uom = float(monthly_summary_doc.sku)*float(monthly_summary_doc.so_don_hang) + total_uomSI
            # monthly_summary_doc.san_luong = minus_not_nega(monthly_summary_doc.san_luong, sum(qty))
            # monthly_summary_doc.sku = (float(total_uom) / float(monthly_summary_doc.so_don_hang)) if monthly_summary_doc.so_don_hang > 0 else 0
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
    itemsSI = doc.get("items")
    qty,uom = qty_not_pricing_rule(itemsSI,"item_name")
    total_uomSI =len(uom)
    # check connect SO
    SOs  = getConnection(doc,"Sales Order")
    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name")
    grand_totals = doc.grand_total*sales_info.allocated_percentage/100
    # if doc.is_return and grand_totals > 0:
    #     grand_totals = -grand_totals
    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
        if doc.is_return:
            monthly_summary_doc.doanh_thu_thang += abs(grand_totals)
        if len(SOs) >0 and doc.is_return:
            total_uom = float(monthly_summary_doc.sku)*float(monthly_summary_doc.so_don_hang) + total_uomSI
            monthly_summary_doc.san_luong += sum(qty)
            monthly_summary_doc.sku = (float(total_uom) / float(monthly_summary_doc.so_don_hang)) if monthly_summary_doc.so_don_hang > 0 else 0
        monthly_summary_doc.save(ignore_permissions=True)
    else:
        return