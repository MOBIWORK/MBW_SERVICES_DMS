import frappe
from erpnext.accounts.doctype.sales_invoice.sales_invoice import SalesInvoice
from frappe.utils import nowdate

class DMSSalesInvoice(SalesInvoice):
    # Cập nhật KPI tháng sau khi submit đơn hàng
    def on_submit(self):
        self.update_kpi_monthly()

    def update_kpi_monthly(self):
        # Lấy ngày tháng để truy xuất dữ liệu
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])

        # Lấy id của nhân viên
        user_name = frappe.get_value('Employee',{ 'user_id': self.owner}, 'name')
        sales_team = frappe.get_value("DMS KPI", {'nhan_vien_ban_hang': user_name}, "nhom_ban_hang")

        # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
        existing_monthly_summary = frappe.get_all(
            'DMS Summary KPI Monthly',
            filters={'thang': month, 'nam': year, 'nhan_vien_ban_hang': user_name},
            fields=['name']
        )
        grand_totals = self.grand_total

        if existing_monthly_summary:
            monthly_summary_doc = frappe.get_doc('DMS Summary KPI Monthly', existing_monthly_summary[0]['name'])
            monthly_summary_doc.doanh_thu_thang += grand_totals
            monthly_summary_doc.save(ignore_permissions=True)
        else:
            monthly_summary_doc = frappe.get_doc({
                'doctype': 'DMS Summary KPI Monthly',
                'nam': year,
                'thang': month,
                'nhan_vien_ban_hang': user_name,
                'nhom_ban_hang': sales_team,
                'doanh_thu_thang': grand_totals,
            })
            monthly_summary_doc.insert(ignore_permissions=True)

    # Cập nhật KPI tháng sau khi cancel đơn hàng
    def on_cancel(self):
        self.update_kpi_monthly_on_cancel()

    def update_kpi_monthly_on_cancel(self):
        # Lấy ngày tháng để truy xuất dữ liệu
        month = int(nowdate().split('-')[1])
        year = int(nowdate().split('-')[0])
        
        # Lấy id của nhân viên
        user_name = frappe.get_value('Employee',{ 'user_id': self.owner}, 'name')

        # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
        existing_monthly_summary = frappe.get_all(
            'DMS Summary KPI Monthly',
            filters={'thang': month, 'nam': year, 'nhan_vien_ban_hang': user_name},
            fields=['name']
        )
        grand_totals = self.grand_total
        if existing_monthly_summary:
            monthly_summary_doc = frappe.get_doc('DMS Summary KPI Monthly', existing_monthly_summary[0]['name'])
            monthly_summary_doc.doanh_thu_thang -= grand_totals
            monthly_summary_doc.save(ignore_permissions=True)
        else:
            return