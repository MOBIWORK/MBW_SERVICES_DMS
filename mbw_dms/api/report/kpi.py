import frappe

from mbw_dms.api.common import gen_response ,exception_handle
import calendar

# Báo cáo KPI web
@frappe.whitelist(methods='GET')
def kpi_report(**kwargs):
    try:
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >= 1 else 1
        employee = kwargs.get("employee")
        sales_team = kwargs.get("sales_team")
        month = int(kwargs.get("month"))
        year = int(kwargs.get("year"))
        start_date_str = f"{year:04d}-{month:02d}-01"
        last_day_of_month = calendar.monthrange(year, month)[1]
        end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
        start_date = frappe.utils.getdate(start_date_str)
        end_date = frappe.utils.getdate(end_date_str)
        
        filters = []

        if employee:
            filters.append(f"mo.nhan_vien_ban_hang='{employee}'")
        if sales_team:
            filters.append(f"kpi.nhom_ban_hang='{sales_team}'")
        if month:
            filters.append(f"mo.thang={month}")
        if year:
            filters.append(f"mo.nam={year}")
        filters.append("mo.nhan_vien_ban_hang IS NOT NULL")
        filters.append(f"kpi.ngay_hieu_luc_tu >= '{start_date}'")
        filters.append(f"kpi.ngay_hieu_luc_den <= '{end_date}'")
        where_condition = " AND ".join(filters)
        
        sql_query = """
            SELECT mo.nhan_vien_ban_hang, mo.nhom_ban_hang, mo.so_kh_vt_luot as th_vt, kpi.so_kh_vt_luot as kh_vt, mo.so_kh_vt_duynhat as th_vt_dn, kpi.so_kh_vt_duynhat as kh_vt_dn, mo.so_kh_dat_hang as th_dat_hang, kpi.so_kh_dathang as kh_dat_hang, mo.so_don_hang as th_don_hang, kpi.so_don_hang as kh_don_hang,
            mo.so_kh_moi as th_kh_moi, kpi.so_kh_moi as kh_kh_moi, mo.doanh_so_thang as th_doanh_so, kpi.doanh_so as kh_doanh_so, mo.doanh_thu_thang as th_doanh_thu, kpi.doanh_thu as kh_doanh_thu, mo.san_luong as th_san_lg, kpi.san_luong as kh_san_lg, mo.sku as th_sku, kpi.sku as kh_sku, mo.so_gio_lam_viec as th_so_gio_lam_viec, kpi.so_gio_lam_viec as kh_so_gio_lam_viec
            FROM `tabDMS KPI` kpi
            LEFT JOIN `tabDMS Summary KPI Monthly` mo ON kpi.nhan_vien_ban_hang = mo.nhan_vien_ban_hang
        """

        if where_condition:
            sql_query += " WHERE {}".format(where_condition)
        sql_query += " LIMIT %s OFFSET %s"
        
        limit = page_size
        offset = (page_number - 1) * limit
        data = frappe.db.sql(sql_query, (limit, offset), as_dict=True)
        sql_query_count = """
            SELECT COUNT(*)
            FROM `tabDMS Summary KPI Monthly` mo
            JOIN `tabDMS KPI` kpi ON mo.nhan_vien_ban_hang = kpi.nhan_vien_ban_hang
        """
        if where_condition:
            sql_query_count += " WHERE {}".format(where_condition)
        count_data = frappe.db.sql(sql_query_count, as_dict=True)

        totals = {
            "tong_kh_vt": 0,
            "tong_th_vt": 0,
            "tong_th_vt_dn": 0,
            "tong_kh_vt_dn": 0,
            "tong_th_dat_hang": 0,
            "tong_kh_dat_hang": 0,
            "tong_th_don_hang": 0,
            "tong_kh_don_hang": 0,
            "tong_th_kh_moi": 0,
            "tong_kh_kh_moi": 0,
            "tong_th_doanh_so": 0,
            "tong_kh_doanh_so": 0,
            "tong_th_doanh_thu": 0,
            "tong_kh_doanh_thu": 0,
            "tong_th_san_lg": 0,
            "tong_kh_san_lg": 0,
            "tong_th_sku": 0,
            "tong_kh_sku": 0,
            "tong_th_so_gio_lam_viec": 0,
            "tong_kh_so_gio_lam_viec": 0
        }
        for i in data:
            i["ten_nv"] =  frappe.get_value("Employee", {"name": i["nhan_vien_ban_hang"]}, "employee_name")

            i["tl_vt"] = 0
            if i["kh_vt"] != 0:
                i["tl_vt"] = round(i["th_vt"] / i["kh_vt"]*100, 2)

            i["tl_vt_dn"] = 0
            if i["kh_vt_dn"] != 0:
                i["tl_vt_dn"] = round(i["th_vt_dn"] / i["kh_vt_dn"]*100, 2)

            i["tl_dat_hang"] = 0
            if i["kh_dat_hang"] != 0:
                i["tl_dat_hang"] = round(i["th_dat_hang"] / i["kh_dat_hang"]*100, 2)

            i["tl_don_hang"] = 0
            if i["kh_don_hang"] != 0:
                i["tl_don_hang"] = round(i["th_don_hang"] / i["kh_don_hang"]*100, 2)

            i["tl_kh_moi"] = 0
            if i["kh_kh_moi"] != 0:
                i["tl_kh_moi"] = round(i["th_kh_moi"] / i["kh_kh_moi"]*100, 2)

            i["tl_doanh_so"] = 0
            if i["kh_doanh_so"] != 0:
                i["tl_doanh_so"] = round(i["th_doanh_so"] / i["kh_doanh_so"]*100, 2)

            i["tl_doanh_thu"] = 0
            if i["kh_doanh_thu"] != 0:
                i["tl_doanh_thu"] = round(i["th_doanh_thu"] / i["kh_doanh_thu"]*100, 2)

            i["tl_san_luong"] = 0
            if i["kh_san_lg"] != 0:
                i["tl_san_luong"] = round(i["th_san_lg"] / i["kh_san_lg"]*100, 2)

            i["tl_sku"] = 0
            if i["kh_sku"] != 0:
                i["tl_sku"] = round(i["th_sku"] / i["kh_sku"]*100, 2)

            i["tl_so_gio_lam_viec"] = 0
            if i["kh_so_gio_lam_viec"] != 0:
                i["tl_so_gio_lam_viec"] = round(i["th_so_gio_lam_viec"] / i["kh_so_gio_lam_viec"]*100, 2)

            # Sum
            totals["tong_kh_vt"] += i["kh_vt"]
            totals["tong_th_vt"] += i["th_vt"]
            totals["tong_th_vt_dn"] += i["th_vt_dn"]
            totals["tong_kh_vt_dn"] += i["kh_vt_dn"]
            totals["tong_th_dat_hang"] += i["th_dat_hang"]
            totals["tong_kh_dat_hang"] += i["kh_dat_hang"]
            totals["tong_th_don_hang"] += i["th_don_hang"]
            totals["tong_kh_don_hang"] += i["kh_don_hang"]
            totals["tong_th_kh_moi"] += i["th_kh_moi"]
            totals["tong_kh_kh_moi"] += i["kh_kh_moi"]
            totals["tong_th_doanh_so"] += i["th_doanh_so"]
            totals["tong_kh_doanh_so"] += i["kh_doanh_so"]
            totals["tong_th_doanh_thu"] += i["th_doanh_thu"]
            totals["tong_kh_doanh_thu"] += i["kh_doanh_thu"]
            totals["tong_th_san_lg"] += i["th_san_lg"]
            totals["tong_kh_san_lg"] += i["kh_san_lg"]
            totals["tong_th_sku"] += i["th_sku"]
            totals["tong_kh_sku"] += i["kh_sku"]
            totals["tong_th_so_gio_lam_viec"] += i["th_so_gio_lam_viec"]
            totals["tong_kh_so_gio_lam_viec"] += i["kh_so_gio_lam_viec"]

        return gen_response(200, "Thành công", {
            "data": data,
            "sum": totals,
            "page_number": page_number,
            "page_size": page_size,
            "totals": count_data[0]['COUNT(*)']
        })
    except Exception as e:
        return exception_handle(e)