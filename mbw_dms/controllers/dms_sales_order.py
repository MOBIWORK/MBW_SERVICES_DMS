import frappe
from erpnext.selling.doctype.sales_order.sales_order import SalesOrder
from frappe.utils import nowdate
import calendar

class DMSSalesOrder(SalesOrder):
    # Cập nhật KPI tháng sau khi submit đơn hàng
    def on_submit(self):
        self.update_kpi_monthly()

    # Kiểm tra xem khách đã đặt hàng trước đó chưa
    def existing_customer(self, customer_name, start_date, end_date, current_user):
        existing_cus = frappe.get_all(
            'Sales Order',
            filters={
                    "docstatus": 1,
                    "creation": (">=", start_date), 
                    "creation": ("<=", end_date), 
                    "customer": customer_name, 
                    "owner": current_user},
            fields=['name']
        )
        return existing_cus

    def update_kpi_monthly(self):
        # Lấy ngày tháng để truy xuất dữ liệu
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])
        start_date_str = f'{year:04d}-{month:02d}-01'
        last_day_of_month = calendar.monthrange(year, month)[1]
        end_date_str = f'{year:04d}-{month:02d}-{last_day_of_month:02d}'
        start_date = frappe.utils.getdate(start_date_str)
        end_date = frappe.utils.getdate(end_date_str)
        
        # Lấy id của nhân viên
        user_name = frappe.get_value('Employee',{ 'user_id': self.owner}, 'name')

        # Tính sản lượng (số sản phẩm/đơn) và sku(số mặt hàng/đơn) trong đơn hàng
        items = self.items
        qty = {item.get('qty') for item in items}
        uom = {item.get('uom') for item in items}

        # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
        existing_monthly_summary = frappe.get_all(
            'DMS Summary KPI Monthly',
            filters={'thang': month, 'nam': year, 'nhan_vien_ban_hang': user_name},
            fields=['name']
        )
        grand_totals = self.grand_total
        cus_name = self.customer
        existing_cus = self.existing_customer(customer_name=cus_name, start_date=start_date, end_date=end_date, current_user=self.owner)

        if existing_monthly_summary:
            monthly_summary_doc = frappe.get_doc('DMS Summary KPI Monthly', existing_monthly_summary[0]['name'])
            if len(existing_cus) > 1:
                monthly_summary_doc.so_don_hang += 1
                monthly_summary_doc.doanh_so_thang += grand_totals
                monthly_summary_doc.san_luong += sum(qty)
                monthly_summary_doc.sku += len(uom)
            else:
                monthly_summary_doc.so_don_hang += 1
                monthly_summary_doc.doanh_so_thang += grand_totals
                monthly_summary_doc.so_kh_dat_hang += 1
                monthly_summary_doc.san_luong += sum(qty)
                monthly_summary_doc.sku += len(uom)
            monthly_summary_doc.save(ignore_permissions=True)
        else:
            monthly_summary_doc = frappe.get_doc({
                'doctype': 'DMS Summary KPI Monthly',
                'nam': year,
                'thang': month,
                'nhan_vien_ban_hang': user_name,
                'so_don_hang': 1,
                'doanh_so_thang': grand_totals,
                'so_kh_dat_hang': 1
            })
            monthly_summary_doc.insert(ignore_permissions=True)

    # Cập nhật KPI tháng sau khi cancel đơn hàng
    def on_cancel(self):
        self.update_kpi_monthly_on_cancel()

    def update_kpi_monthly_on_cancel(self):
        # Lấy ngày tháng để truy xuất dữ liệu
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])
        start_date_str = f'{year:04d}-{month:02d}-01'
        last_day_of_month = calendar.monthrange(year, month)[1]
        end_date_str = f'{year:04d}-{month:02d}-{last_day_of_month:02d}'
        start_date = frappe.utils.getdate(start_date_str)
        end_date = frappe.utils.getdate(end_date_str)
        
        # Lấy id của nhân viên
        user_name = frappe.get_value('Employee',{ 'user_id': self.owner}, 'name')
        items = self.items
        qty = {item.get('qty') for item in items}
        uom = {item.get('uom') for item in items}

        # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
        existing_monthly_summary = frappe.get_all(
            'DMS Summary KPI Monthly',
            filters={'thang': month, 'nam': year, 'nhan_vien_ban_hang': user_name},
            fields=['name']
        )
        grand_totals = self.grand_total
        cus_name = self.customer
        existing_cus = self.existing_customer(customer_name=cus_name, start_date=start_date, end_date=end_date, current_user=self.owner)

        monthly_summary_doc = frappe.get_doc('DMS Summary KPI Monthly', existing_monthly_summary[0]['name'])
        if len(existing_cus) == 1:
            monthly_summary_doc.so_don_hang -= 1
            monthly_summary_doc.doanh_so_thang -= grand_totals
            monthly_summary_doc.san_luong -= sum(qty)
            monthly_summary_doc.so_kh_dat_hang -= 1
            monthly_summary_doc.sku -= len(uom)
        else:
            monthly_summary_doc.so_don_hang -= 1
            monthly_summary_doc.doanh_so_thang -= grand_totals
            monthly_summary_doc.san_luong -= sum(qty)
            monthly_summary_doc.sku -= len(uom)
        monthly_summary_doc.save(ignore_permissions=True)