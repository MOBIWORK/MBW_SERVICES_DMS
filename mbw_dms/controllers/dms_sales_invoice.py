import frappe
from frappe.utils import nowdate

def update_kpi_monthly(doc, method):
    # Lấy ngày tháng để truy xuất dữ liệu
    month = int(nowdate().split('-')[1])
    year = int(nowdate().split('-')[0])

    # Lấy id của nhân viên
    name_sal_order = doc.get('items')[0].sales_order
    employee = frappe.get_value('Sales Order', {'name': name_sal_order}, 'owner')
    user_name = frappe.get_value('Employee',{ 'user_id': employee}, 'name')
    sales_team = frappe.get_value("DMS KPI", {'nhan_vien_ban_hang': user_name}, "nhom_ban_hang")

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_all(
        'DMS Summary KPI Monthly',
        filters={'thang': month, 'nam': year, 'nhan_vien_ban_hang': user_name},
        fields=['name']
    )
    grand_totals = doc.grand_total

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


def update_kpi_monthly_on_cancel(doc, method):
    # Lấy ngày tháng để truy xuất dữ liệu
    month = int(nowdate().split('-')[1])
    year = int(nowdate().split('-')[0])
    
    # Lấy id của nhân viên
    name_sal_order = doc.get('items')[0].sales_order
    employee = frappe.get_value('Sales Order', {'name': name_sal_order}, 'owner')
    user_name = frappe.get_value('Employee',{ 'user_id': employee}, 'name')

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_all(
        'DMS Summary KPI Monthly',
        {'thang': month, 'nam': year, 'nhan_vien_ban_hang': user_name},
        'name'
    )
    grand_totals = doc.grand_total
    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc('DMS Summary KPI Monthly', existing_monthly_summary)
        monthly_summary_doc.doanh_thu_thang -= grand_totals
        monthly_summary_doc.save(ignore_permissions=True)
    else:
        return