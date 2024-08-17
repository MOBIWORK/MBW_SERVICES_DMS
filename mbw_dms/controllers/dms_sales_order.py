import frappe
from frappe.utils import nowdate
import calendar
from datetime import datetime

# Kiểm tra xem khách đã đặt hàng trước đó chưa
def existing_customer(customer_name=None, start_date=None, end_date=None, sales_person=None):
    filters = []
    filters.append(f"so.creation BETWEEN '{start_date}' AND '{start_date}'")
    filters.append(f"so.customer_name = '{customer_name}'")
    filters.append(f"st.sales_person = '{sales_person}'")
    filters.append(f"st.created_by = 1")
    
    where_conditions = " AND ".join(filters)

    sql_query = """
        SELECT so.name
        FROM `tabSales Order` so
        LEFT JOIN `tabSales Team` st ON so.name = st.parent
    """
    sql_query += " WHERE {}".format(where_conditions)

    existing_cus = frappe.db.sql(sql_query, as_dict=True)
    return existing_cus

# Cập nhật kpi tháng
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

    # Tính sản lượng (số sản phẩm/đơn) và sku(số mặt hàng/đơn) trong đơn hàng
    items = doc.items
    qty = {item.get("qty") for item in items}
    uom = {item.get("uom") for item in items}

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name")
    grand_totals = doc.grand_total
    cus_name = doc.customer
    existing_cus = existing_customer(customer_name=cus_name, start_date=start_date, end_date=end_date, sales_person=sales_person)

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


# Cập nhật kpi ngày
def update_kpi_daily(doc, method):
    # Lấy ngày tháng
    today = datetime.today().date()
    start_date = datetime.combine(today, datetime.min.time())
    end_date = datetime.combine(today, datetime.max.time())

    # Lấy id của nhân viên
    sales_person = None
    for i in doc.sales_team:
        if i.created_by == 1:
            sales_person = i.sales_person
    
    user_name = frappe.get_value("Sales Person", {"name": sales_person}, "employee")

    # Tính sản lượng (số sản phẩm/đơn) và sku(số mặt hàng/đơn) trong đơn hàng
    items = doc.items
    qty = {item.get("qty") for item in items}
    uom = {item.get("uom") for item in items}

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_daily_summary = frappe.get_value("DMS Summary KPI Daily", {"date": today, "nhan_vien_ban_hang": user_name}, "name")
    grand_totals = doc.grand_total
    cus_name = doc.customer
    existing_cus = existing_customer(customer_name=cus_name, start_date=start_date, end_date=end_date, sales_person=sales_person)

    total_uom = 0

    if existing_daily_summary:
        daily_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_daily_summary)
        if len(existing_cus) > 1:
            total_uom += len(uom)
            daily_summary_doc.so_don_hang += 1
            daily_summary_doc.doanh_so_thang += grand_totals
            daily_summary_doc.san_luong += sum(qty)
            daily_summary_doc.sku = round((float(total_uom) / (daily_summary_doc.so_don_hang)), 2) if daily_summary_doc.so_don_hang > 0 else 0
        else:
            total_uom += len(uom)
            daily_summary_doc.so_don_hang += 1
            daily_summary_doc.doanh_so_thang += grand_totals
            daily_summary_doc.so_kh_dat_hang += 1
            daily_summary_doc.san_luong += sum(qty)
            daily_summary_doc.sku = round((float(total_uom) / (daily_summary_doc.so_don_hang)), 2) if daily_summary_doc.so_don_hang > 0 else 0
        daily_summary_doc.save(ignore_permissions=True)
    else:
        daily_summary_doc = frappe.get_doc({
            "doctype": "DMS Summary KPI Daily",
            "date": today,
            "nhan_vien_ban_hang": user_name,
            "so_don_hang": 1,
            "doanh_so_thang": grand_totals,
            "so_kh_dat_hang": 1,
            "sku": len(uom),
            "san_luong": len(qty)
        }).insert(ignore_permissions=True)


# Cập nhật kpi tháng sau khi xóa bản ghi
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
    qty = {item.get("qty") for item in items}
    uom = {item.get("uom") for item in items}

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name")

    total_uom = 0
    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
        grand_totals = doc.grand_total
        cus_name = doc.customer
        existing_cus = existing_customer(customer_name=cus_name, start_date=start_date, end_date=end_date, sales_person=sales_person)

        if len(existing_cus) == 0:
            total_uom -= len(uom)
            monthly_summary_doc.so_don_hang -= 1
            monthly_summary_doc.doanh_so_thang -= grand_totals
            monthly_summary_doc.san_luong -= sum(qty)
            monthly_summary_doc.so_kh_dat_hang -= 1
            monthly_summary_doc.sku = round((float(total_uom) / (monthly_summary_doc.so_don_hang)), 2) if monthly_summary_doc.so_don_hang > 0 else 0
        else:
            monthly_summary_doc.so_don_hang -= 1
            monthly_summary_doc.doanh_so_thang -= grand_totals
            monthly_summary_doc.san_luong -= sum(qty)
            monthly_summary_doc.sku = round((float(total_uom) / (monthly_summary_doc.so_don_hang)), 2) if monthly_summary_doc.so_don_hang > 0 else 0
        monthly_summary_doc.save(ignore_permissions=True)
    else:
        return
    
# Cập nhật kpi ngày sau khi xóa bản ghi
def update_kpi_daily_on_cancel(doc, method):
    # Lấy ngày tháng
    today = datetime.today().date()
    start_date = datetime.combine(today, datetime.min.time())
    end_date = datetime.combine(today, datetime.max.time())

    # Lấy id của nhân viên
    sales_person = None
    for i in doc.sales_team:
        if i.created_by == 1:
            sales_person = i.sales_person
    
    user_name = frappe.get_value("Sales Person", {"name": sales_person}, "employee")

    # Tính sản lượng (số sản phẩm/đơn) và sku(số mặt hàng/đơn) trong đơn hàng
    items = doc.items
    qty = {item.get("qty") for item in items}
    uom = {item.get("uom") for item in items}

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_daily_summary = frappe.get_value("DMS Summary KPI Daily", {"date": today, "nhan_vien_ban_hang": user_name}, "name")
    grand_totals = doc.grand_total
    cus_name = doc.customer
    existing_cus = existing_customer(customer_name=cus_name, start_date=start_date, end_date=end_date, sales_person=sales_person)

    total_uom = 0
    if existing_daily_summary:
        daily_summary_doc = frappe.get_doc("DMS Summary KPI Daily", existing_daily_summary)
        grand_totals = doc.grand_total
        cus_name = doc.customer

        if len(existing_cus) == 0:
            total_uom -= len(uom)
            daily_summary_doc.so_don_hang -= 1
            daily_summary_doc.doanh_so_thang -= grand_totals
            daily_summary_doc.san_luong -= sum(qty)
            daily_summary_doc.so_kh_dat_hang -= 1
            daily_summary_doc.sku = round((float(total_uom) / (daily_summary_doc.so_don_hang)), 2) if daily_summary_doc.so_don_hang > 0 else 0
        else:
            daily_summary_doc.so_don_hang -= 1
            daily_summary_doc.doanh_so_thang -= grand_totals
            daily_summary_doc.san_luong -= sum(qty)
            daily_summary_doc.sku = round((float(total_uom) / (daily_summary_doc.so_don_hang)), 2) if daily_summary_doc.so_don_hang > 0 else 0
        daily_summary_doc.save(ignore_permissions=True)
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