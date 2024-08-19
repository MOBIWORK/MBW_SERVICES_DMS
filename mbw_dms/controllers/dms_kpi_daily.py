import frappe
from frappe.utils import nowdate
import calendar

def existing_kpi_daily(start_date, end_date, current_user):
        kpi_daily = None

        kpi_daily = frappe.get_all(
            "DMS Summary KPI Daily",
            filters={"date": ("between", [start_date, end_date]),
                     "nhan_vien_ban_hang": current_user},
            fields=["name"]
        )
        return kpi_daily

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
    user_name = frappe.get_value("Employee", {"user_id": frappe.session.user}, "name")

    # Kiểm tra xem khách hàng đã thực hiện checkin trong tháng này hay chưa
    kpi_daily = existing_kpi_daily(start_date=start_date, end_date=end_date, current_user=user_name)

    # Kiểm tra đã tồn tại bản ghi KPI của tháng này chưa
    existing_monthly_summary = frappe.get_value("DMS Summary KPI Monthly", {"thang": month, "nam": year, "nhan_vien_ban_hang": doc.n}, "name")
    sales_team = frappe.get_value("DMS KPI", {"nhan_vien_ban_hang": user_name}, "nhom_ban_hang")

    so_kh_vt_luot = 0
    so_kh_vt_duynhat = 0
    so_gio_lam_viec = 0
    solan_vt_dungtuyen = 0
    solan_vt_ngoaituyen = 0

    if kpi_daily:
        for i in kpi_daily:
            so_kh_vt_luot += i.so_kh_vt_luot
            so_kh_vt_duynhat += i.so_kh_vt_duynhat
            so_gio_lam_viec += i.so_gio_lam_viec
            solan_vt_dungtuyen += i.solan_vt_dungtuyen
            solan_vt_ngoaituyen += i.solan_vt_ngoaituyen
        if existing_monthly_summary:
            monthly_summary_doc = frappe.get_doc("DMS Summary KPI Monthly", existing_monthly_summary)
            monthly_summary_doc.so_kh_vt_luot = so_kh_vt_luot
            monthly_summary_doc.so_kh_vt_duynhat = so_kh_vt_duynhat
            monthly_summary_doc.so_gio_lam_viec = so_gio_lam_viec
            monthly_summary_doc.solan_vt_dungtuyen = solan_vt_dungtuyen
            monthly_summary_doc.solan_vt_ngoaituyen = solan_vt_ngoaituyen
        else:
            monthly_summary_doc = frappe.get_doc({
                "doctype": "DMS Summary KPI Monthly",
                "nam": year,
                "thang": month,
                "nhan_vien_ban_hang": user_name,
                "nhom_ban_hang": sales_team,
                "so_kh_vt_luot": so_kh_vt_luot,
                "so_kh_vt_duynhat": so_kh_vt_duynhat,
                "solan_vt_dungtuyen": so_kh_vt_duynhat,
                "solan_vt_ngoaituyen": solan_vt_ngoaituyen,
                "so_gio_lam_viec": so_gio_lam_viec
            })
            monthly_summary_doc.insert(ignore_permissions=True)

def existing_kpi_daily(start_date, end_date, current_user):
        kpi_daily = None

        kpi_daily = frappe.get_all(
            "DMS Summary KPI Daily",
            filters={"date": ("between", [start_date, end_date]),
                     "nhan_vien_ban_hang": current_user},
            fields=["name"]
        )
        return kpi_daily