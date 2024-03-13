import frappe
from erpnext.selling.doctype.customer.customer import Customer
from frappe.utils import nowdate

class DMSCustomer(Customer):
    def after_insert(self):
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

        if existing_monthly_summary:
            monthly_summary_doc = frappe.get_doc('DMS Summary KPI Monthly', existing_monthly_summary[0]['name'])
            monthly_summary_doc.so_kh_moi += 1
            monthly_summary_doc.save(ignore_permissions=True)
        else:
            monthly_summary_doc = frappe.get_doc({
                'doctype': 'DMS Summary KPI Monthly',
                'nam': year,
                'thang': month,
                'nhan_vien_ban_hang': user_name,
                'nhom_ban_hang': sales_team,
                'so_kh_moi': 1,
            })
            monthly_summary_doc.insert(ignore_permissions=True)

    def after_delete(self):
        self.update_kpi_monthly_after_delete()

    def update_kpi_monthly_after_delete(self):
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
        if existing_monthly_summary:
            monthly_summary_doc = frappe.get_doc('DMS Summary KPI Monthly', existing_monthly_summary[0]['name'])
            monthly_summary_doc.so_kh_moi -= 1
            monthly_summary_doc.save(ignore_permissions=True)
        else:
            return



def update_location(doc,method=None):    
    if doc.customer_primary_address:
        address = frappe.get_doc("Address", {
            "name" : doc.customer_primary_address
        })
        if address:
            doc.customer_location_primary = address.address_location
            frappe.msgprint('update location')
    pass