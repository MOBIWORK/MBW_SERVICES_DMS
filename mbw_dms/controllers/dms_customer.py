import frappe
from frappe.utils import nowdate
import pydash

def update_kpi_monthly(doc, method):
    # Lấy ngày tháng để truy xuất dữ liệu
    month = int(nowdate().split('-')[1])
    year = int(nowdate().split('-')[0])

    # Lấy id của nhân viên
    user_name = frappe.get_value("Employee", {"user_id": doc.owner}, "name")
    sales_team = frappe.get_value("DMS KPI", {"nhan_vien_ban_hang": user_name}, "nhom_ban_hang")

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name")

    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
        monthly_summary_doc.so_kh_moi += 1
        monthly_summary_doc.save(ignore_permissions=True)
    else:
        monthly_summary_doc = frappe.get_doc({
            "doctype": "DMS Summary KPI Monthly",
            "nam": year,
            "thang": month,
            "nhan_vien_ban_hang": user_name,
            "nhom_ban_hang": sales_team,
            "so_kh_moi": 1,
        }).insert(ignore_permissions=True)


def update_kpi_monthly_after_delete(doc, method):
    # Lấy ngày tháng để truy xuất dữ liệu
    month = int(nowdate().split('-')[1])
    year = int(nowdate().split('-')[0])

    # Lấy id của nhân viên
    user_name = frappe.get_value("Employee", {"user_id": doc.owner}, "name")

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": user_name}, "name")

    if existing_monthly_summary:
        monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
        monthly_summary_doc.so_kh_moi -= 1
        monthly_summary_doc.save(ignore_permissions=True)
    else:
        return

def update_location(doc,method=None):    
    if doc.customer_primary_address:
        address = frappe.get_doc("Address", {
            "name" : doc.customer_primary_address
        })
        link_dynamic = address.links
        if not bool(pydash.find(link_dynamic,lambda x: x.link_name == doc.name and x.link_doctype == "Customer")):
            address.append("links", {
                "link_doctype": "Customer",
                "link_name": doc.name
            })
            address.save()
            frappe.db.commit()
            
        elif doc.customer_location_primary != address.address_location :
            doc.customer_location_primary = address.address_location
            doc.save(ignore_permissions=True)

    elif bool(doc.customer_location_primary):
        doc.customer_location_primary = None
        doc.save(ignore_permissions=True)
    frappe.db.commit()
    pass

def create_customer_code(doc, method):
    # Tìm số thứ tự cao nhất hiện tại của customer_code và tăng lên 1
    if not doc.customer_code:
        latest_customer_code = frappe.db.sql("""
            SELECT customer_code 
            FROM `tabCustomer`
            WHERE customer_code LIKE 'KH%'
            ORDER BY customer_code DESC
            LIMIT 1
        """, as_dict=True)

        if latest_customer_code:
            latest_number = int(latest_customer_code[0]["customer_code"].replace("KH", ""))
        else:
            latest_number = 0

        new_number = latest_number + 1
        customer_code = f"KH{new_number:06d}"

        doc.customer_code = customer_code