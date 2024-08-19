import frappe
from frappe.utils import nowdate
import calendar


# Kiểm tra xem khách đã đặt hàng trước đó chưa
def existing_customer(customer_name, start_date, end_date, current_user):
    existing_cus = frappe.get_all(
        "Sales Order",
        filters={
                "docstatus": 1,
                "creation": ("between", [start_date, end_date]), 
                "customer_name": customer_name, 
                "owner": current_user},
        fields=["name"]
    )
    return existing_cus

def update_kpi_monthly(doc, method):
    # Lấy ngày tháng để truy xuất dữ liệu
    month = int(nowdate().split('-')[1])
    year = int(nowdate().split('-')[0])
    start_date_str = f"{year:04d}-{month:02d}-01"
    last_day_of_month = calendar.monthrange(year, month)[1]
    end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
    start_date = frappe.utils.getdate(start_date_str)
    end_date = frappe.utils.getdate(end_date_str)
    
    # Lấy id của nhân viên
    sales_person = None
    for i in doc.sales_team:
        if i.created_by == 1:
            sales_person = i.sales_person
    
    user_name = frappe.get_value("Sales Person", {"name": sales_person}, "employee")
    sales_team = frappe.get_value("DMS KPI", {"nhan_vien_ban_hang": user_name}, "nhom_ban_hang")

    # Tính sản lượng (số sản phẩm/đơn) và sku(số mặt hàng/đơn) trong đơn hàng(không km)
    items = doc.items
    qty,uom = qty_not_pricing_rule(items)
    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name")
    grand_totals = doc.grand_total
    cus_name = doc.customer
    existing_cus = existing_customer(customer_name=cus_name, start_date=start_date, end_date=end_date, current_user=doc.owner)

    total_uom = 0
    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
        if len(existing_cus) > 1:
            total_uom += len(uom)
            monthly_summary_doc.so_don_hang += 1
            monthly_summary_doc.doanh_so_thang += grand_totals
            monthly_summary_doc.san_luong += sum(qty)
            monthly_summary_doc.sku = round((float(total_uom) / (monthly_summary_doc.so_don_hang)), 2) if monthly_summary_doc.so_don_hang > 0 else 0
        else:
            total_uom += len(uom)
            monthly_summary_doc.so_don_hang += 1
            monthly_summary_doc.doanh_so_thang += grand_totals
            monthly_summary_doc.so_kh_dat_hang += 1
            monthly_summary_doc.san_luong += sum(qty)
            monthly_summary_doc.sku = round((float(total_uom) / (monthly_summary_doc.so_don_hang)), 2) if monthly_summary_doc.so_don_hang > 0 else 0
        monthly_summary_doc.save(ignore_permissions=True)
    else:
        monthly_summary_doc = frappe.get_doc({
            "doctype": "DMS Summary KPI Monthly",
            "nam": year,
            "thang": month,
            "nhan_vien_ban_hang": user_name,
            "nhom_ban_hang": sales_team,
            "so_don_hang": 1,
            "doanh_so_thang": grand_totals,
            "so_kh_dat_hang": 1,
            "sku": len(uom),
            "san_luong": len(qty)
        }).insert(ignore_permissions=True)


def update_kpi_monthly_on_cancel(doc, method):
    # Lấy ngày tháng để truy xuất dữ liệu
    month = int(nowdate().split('-')[1])
    year = int(nowdate().split('-')[0])
    start_date_str = f"{year:04d}-{month:02d}-01"
    last_day_of_month = calendar.monthrange(year, month)[1]
    end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
    start_date = frappe.utils.getdate(start_date_str)
    end_date = frappe.utils.getdate(end_date_str)
    
    # Lấy id của nhân viên
    sales_person = None
    for i in doc.sales_team:
        if i.created_by == 1:
            sales_person = i.sales_person
    
    user_name = frappe.get_value("Sales Person", {"name": sales_person}, "employee")

    items = doc.items
    qty,uom = qty_not_pricing_rule(items)

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name")

    total_uom = 0
    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
        grand_totals = doc.grand_total
        cus_name = doc.customer
        existing_cus = existing_customer(customer_name=cus_name, start_date=start_date, end_date=end_date, current_user=doc.owner)

        if len(existing_cus) == 0:
            total_uom -= len(uom)
            monthly_summary_doc.so_don_hang = minus_not_nega(monthly_summary_doc.so_don_hang)
            monthly_summary_doc.doanh_so_thang = minus_not_nega(monthly_summary_doc.doanh_so_thang, grand_totals)
            monthly_summary_doc.san_luong = minus_not_nega(monthly_summary_doc.san_luong, sum(qty))
            monthly_summary_doc.so_kh_dat_hang = minus_not_nega(monthly_summary_doc.so_kh_dat_hang)
            monthly_summary_doc.sku = round((float(total_uom) / (monthly_summary_doc.so_don_hang)), 2) if monthly_summary_doc.so_don_hang > 0 else 0
        else:
            monthly_summary_doc.so_don_hang = minus_not_nega(monthly_summary_doc.so_don_hang)
            monthly_summary_doc.doanh_so_thang = minus_not_nega(monthly_summary_doc.doanh_so_thang,grand_totals)
            monthly_summary_doc.san_luong = minus_not_nega(monthly_summary_doc.san_luong, sum(qty))
            monthly_summary_doc.sku = round((float(total_uom) / (monthly_summary_doc.so_don_hang)), 2) if monthly_summary_doc.so_don_hang > 0 else 0
        monthly_summary_doc.save(ignore_permissions=True)
    else:
        return


def minus_not_nega(num,sub=1):
    num = int(num)
    if num <= 0 :
        return 0
    else:
        return num - sub
    
import pydash
# sp khuyến mãi 1:có apply pricing role,2: giá = 0 
def qty_not_pricing_rule(items):
    total_item_price = pydash.filter(items, lambda x: x.amount > 0)
    total_qty = sum({item.get("qty") for item in total_item_price})
    total_uom = sum({item.get("uom") for item in total_item_price})

    return total_qty,total_uom