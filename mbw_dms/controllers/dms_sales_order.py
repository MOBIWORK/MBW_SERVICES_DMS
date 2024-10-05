import frappe
from frappe import _
from frappe.utils import nowdate
import calendar
from erpnext.selling.doctype.sales_order.sales_order import make_sales_invoice
from mbw_dms.controllers.pick_list import number_to_vietnamese_words


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

    # Tính sản lượng (số sản phẩm/đơn) và sku(số mặt hàng/đơn) trong đơn hàng
    items = doc.items
    qty = {item.get("qty") for item in items}
    uom = {item.get("uom") for item in items}

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
    qty = {item.get("qty") for item in items}
    uom = {item.get("uom") for item in items}

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
    
def auto_create_si(doc, method):
    sales_invoice = make_sales_invoice(source_name=doc.name)
    sales_invoice.due_date = nowdate()
    sales_invoice.insert()

    frappe.msgprint(f"Sales Invoice {sales_invoice.name} đã được tạo thành công.")


# Kiểm tra projected_qty trong kho
def validate_projected_qty(doc, method):
    for i in doc.items:
        warehouse = i.warehouse
        projected_qty = frappe.db.get_value("Bin", {"item_code": i.item_code, "warehouse": warehouse}, "projected_qty")
        
        # Nếu projected_qty <= 0, báo lỗi
        if projected_qty is None or projected_qty <= 0 or i.qty > projected_qty:
            frappe.throw(_("Số lượng dự kiến ​​cho mặt hàng '{0}' trong '{1}' là {2} .Vui lòng nhập thêm hàng.")
                .format(i.item_name, warehouse, projected_qty)
            )

def calculate_so(doc, method):
    items = doc.items
    amount_before_discount = 0
    discount_total_amount = 0

    for item in items:
        item.custom_amount_before_discount = item.price_list_rate * item.qty
        item.custom_discount_on_total_amount = item.discount_amount * item.qty
        amount_before_discount += item.custom_amount_before_discount
        discount_total_amount += item.custom_discount_on_total_amount
    
    doc.custom_total_amount_before_discount = amount_before_discount
    doc.custom_product_discount_amount = discount_total_amount

    amount_in_words = number_to_vietnamese_words(doc.grand_total)
    if amount_in_words:
        doc.custom_grand_total_by_vietnamese = amount_in_words.capitalize() + " Việt Nam đồng"
    
    
# Áp dụng chiết khấu đồng thời
def apply_discounts_simultaneously(doc, method):
    pricing_rules = doc.pricing_rules
    
    if bool(pricing_rules):
        totals_discount = 0
        for rule in pricing_rules:
            pricing_rule = frappe.get_doc("Pricing Rule", rule.pricing_rule)
            is_simultaneously = pricing_rule.custom_la_khuyen_mai_dong_thoi
            if is_simultaneously == True:
                for item in doc.items:
                    if item.item_code == rule.item_code and item.uom == pricing_rule.custom_don_vi_tinh:
                        totals_discount += float(pricing_rule.custom_chiet_khau_bo_sung * item.qty)
        
        doc.discount_amount = totals_discount
        doc.save()