import frappe
from frappe.utils import nowdate
import calendar
from mbw_dms.api.common import qty_not_pricing_rule
import pydash
from datetime import datetime
def renderMonthYear(doc):
    transaction_date_time = doc.transaction_date
    if isinstance(transaction_date_time,str):
        transaction_date_time = datetime.strptime(transaction_date_time,"%Y-%m-%d")
    thang = transaction_date_time.month
    nam = transaction_date_time.year
    return thang,nam

# Kiểm tra xem khách đã đặt hàng trước đó chưa
def existing_customer(customer_name, start_date, end_date, sale_person,doc):
    
    existing_cus = frappe.get_all(
        "Sales Order",
        filters={
                "docstatus": 1,
                "creation": ["between", [start_date, end_date]], 
                "customer_name": customer_name,
                "sales_person": sale_person,
                "created_by" :1
                },
        fields=["name"]
    )
    import pydash
    existing_cus = pydash.filter_(existing_cus,lambda x: x.name != doc.name)
    return existing_cus

def update_kpi_monthly(doc, method):
    # Lấy ngày tháng để truy xuất dữ liệu
    month,year = renderMonthYear(doc)
    start_date_str = f"{year:04d}-{month:02d}-01"
    last_day_of_month = calendar.monthrange(year, month)[1]
    end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
    start_date = frappe.utils.getdate(start_date_str)
    end_date = frappe.utils.getdate(end_date_str)
    
    # Lấy id của nhân viên
    sales_person = []
    for i in doc.sales_team:
        if i.created_by == 1:
            sales_person.append(i)
    
    for sale in sales_person:
        handle_update_kpi_each_salePerson(sale,doc,month,year,start_date,end_date)



def update_kpi_monthly_on_cancel(doc, method):
    # Lấy ngày tháng để truy xuất dữ liệu
    month,year = renderMonthYear(doc)
    start_date_str = f"{year:04d}-{month:02d}-01"
    last_day_of_month = calendar.monthrange(year, month)[1]
    end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
    start_date = frappe.utils.getdate(start_date_str)
    end_date = frappe.utils.getdate(end_date_str)
    
    # Lấy id của nhân viên
    sales_person = []
    for i in doc.sales_team:
        if i.created_by == 1:
            sales_person.append(i)
    for sale in sales_person:
        handle_delete_kpi_each_salePerson(sale,doc,month,year,start_date,end_date) 



def update_kpi_monthly_after_delete(doc,method):
    # chỉ thay đổi kpi nếu xóa bản ghi đã submit
    if doc.docstatus == 1:
        update_kpi_monthly_on_cancel(doc,method)

        
def minus_not_nega(num,sub=1):
    num = int(num)
    if num <= 1 :
        return 0
    else:
        return num - sub if num >= sub else 0
    
def handle_update_kpi_each_salePerson(sales_info,doc,month,year,start_date,end_date):
    user_name = frappe.get_value("Sales Person", {"name": sales_info.sales_person}, "employee")
    sales_team = frappe.get_value("Sales Person", {"employee": user_name}, "parent_sales_person")

    # Tính sản lượng (số sản phẩm/đơn) và sku(số mặt hàng/đơn) trong đơn hàng(không km)
    items = doc.get("items")
    qty,uom = qty_not_pricing_rule(items)
    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name")
    grand_totals = doc.grand_total
    cus_name = doc.customer
    existing_cus_so = existing_customer(customer_name=cus_name, start_date=start_date, end_date=end_date, sale_person=sales_info.sales_person,doc=doc)
    doanh_so_thang =grand_totals*sales_info.allocated_percentage/100
    total_uom = 0
    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
        if len(existing_cus_so) <1:
            monthly_summary_doc.so_kh_dat_hang += 1
        total_uom += float(monthly_summary_doc.sku)*float(monthly_summary_doc.so_don_hang) + float(len(uom))
        monthly_summary_doc.so_don_hang += 1
        monthly_summary_doc.doanh_so_thang += doanh_so_thang
        monthly_summary_doc.san_luong += sum(qty)
        monthly_summary_doc.sku = (float(total_uom) / float(monthly_summary_doc.so_don_hang)) if monthly_summary_doc.so_don_hang > 0 else 0
        monthly_summary_doc.save(ignore_permissions=True)
    else:
        monthly_summary_doc = frappe.get_doc({
            "doctype": "DMS Summary KPI Monthly",
            "nam": year,
            "thang": month,
            "nhan_vien_ban_hang": user_name,
            "nhom_ban_hang": sales_team,
            "so_don_hang": 1,
            "doanh_so_thang": doanh_so_thang,
            "so_kh_dat_hang": 1,
            "sku": len(uom),
            "san_luong": len(qty)
        }).insert(ignore_permissions=True)


def handle_delete_kpi_each_salePerson(sales_info,doc,month,year,start_date,end_date):
    user_name = frappe.get_value("Sales Person", {"name": sales_info.sales_person}, "employee")

    # Lấy thông tin các mặt hàng (items) từ đơn hàng bị hủy
    itemsSI = doc.get("items")
    qty, uom = qty_not_pricing_rule(itemsSI)

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value(
        "DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name"
    )
    grand_totals = doc.grand_total * sales_info.allocated_percentage / 100

    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
        
        total_uom = float(monthly_summary_doc.sku) * float(monthly_summary_doc.so_don_hang) - len(uom)
        monthly_summary_doc.san_luong = max(0, monthly_summary_doc.san_luong - sum(qty))
        monthly_summary_doc.so_don_hang = max(0, monthly_summary_doc.so_don_hang - 1)
        monthly_summary_doc.sku = (
            (float(total_uom) / float(monthly_summary_doc.so_don_hang))
            if monthly_summary_doc.so_don_hang > 0
            else 0
        )
        monthly_summary_doc.doanh_so_thang = max(0, monthly_summary_doc.doanh_so_thang - grand_totals)

        # Lưu thay đổi
        monthly_summary_doc.save(ignore_permissions=True)

def update_kpi_monthly_after_delete(doc, method):
    # chỉ thay đổi kpi nếu xóa bản ghi đã submit
    if doc.docstatus == 1:
        update_kpi_monthly_on_cancel(doc, method)


def minus_not_nega(num, sub=1):
    num = int(num)
    if num <= 0 :
        return 0
    else:
        return num - sub


# Thêm quy đổi theo thùng
def cal_qdtt(doc, method):
    items = doc.items
    for item in items:
        item_detail = frappe.get_doc("Item", item.item_code)
        quy_cach_thung = 0
        item_uom = None
        for uom in item_detail.uoms:
            if uom.custom_don_vi_dong_goi == 1:
                quy_cach_thung = uom.conversion_factor
                item_uom = uom.uom
        
        if item_uom: 
            if item.uom == item_uom:
                item.custom_quy_doi_theo_thung = item.qty
            else:
                item.custom_quy_doi_theo_thung = float(item.qty / quy_cach_thung)
        else:
            continue

def create_mbw_itemscore_sales_order(doc, method):
    if (doc.status == "To Deliver and Bill" or doc.status == "To Deliver") and doc.custom_trạng_thái_giao_hàng != 'Chưa giao hàng':
        doc.custom_trạng_thái_giao_hàng = "Chưa giao hàng"
        doc.save()
    if doc.status == "Completed":
        from mbw_dms.mbw_dms.doctype.mbw_itemscore_saleorder.mbw_itemscore_saleorder import \
            create_ItemScore_SaleOrder

        create_ItemScore_SaleOrder(doc)
