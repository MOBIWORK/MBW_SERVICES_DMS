import frappe

from mbw_dms.api.common import gen_response, exception_handle
from mbw_dms.api.validators import validate_filter_timestamp
import calendar

# Báo cáo KPI web
@frappe.whitelist(methods='GET')
def kpi_report(**kwargs):
    try:
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >= 1 else 1
        employee = kwargs.get("employee")
        sales_team = kwargs.get("sales_team")
        month = int(kwargs.get("month")) if kwargs.get("month") else None
        year = int(kwargs.get("year"))  if kwargs.get("year") else None
        start_date = None
        end_date = None
        if month and year:
            start_date_str = f"{year:04d}-{month:02d}-01"
            last_day_of_month = calendar.monthrange(year, month)[1]
            end_date_str = f"{year:04d}-{month:02d}-{last_day_of_month:02d}"
            start_date = frappe.utils.getdate(start_date_str)
            end_date = frappe.utils.getdate(end_date_str)
        
        filters = []

        if employee:
            filters.append(f"nhan_vien_ban_hang = '{employee}'")
        if sales_team:
            filters.append(f"nhom_ban_hang = '{sales_team}'")
        if bool(start_date):
            filters.append(f"ngay_hieu_luc_tu >= '{start_date}'")
        if bool(end_date):
            filters.append(f"ngay_hieu_luc_den <= '{end_date}'")
        where_condition = " AND ".join(filters)
        
        sql_query = """
            SELECT nhan_vien_ban_hang, nhom_ban_hang, so_kh_vt_luot as kh_vt, so_kh_vt_duynhat as kh_vt_dn, so_kh_dathang as kh_dat_hang, so_don_hang as kh_don_hang,
            so_kh_moi as kh_kh_moi, doanh_so as kh_doanh_so, doanh_thu as kh_doanh_thu, san_luong as kh_san_lg, sku as kh_sku, so_gio_lam_viec as kh_so_gio_lam_viec
            FROM `tabDMS KPI`
        """
        if where_condition:
            sql_query += " WHERE {}".format(where_condition)
        sql_query += " LIMIT %s OFFSET %s"
        limit = page_size
        offset = (page_number - 1) * limit
        data = frappe.db.sql(sql_query, (limit, offset), as_dict=True)
        for i in data:
            emp = i.nhan_vien_ban_hang
            kpi_month = frappe.db.sql(f"""
                SELECT so_kh_vt_luot as th_vt, so_kh_vt_duynhat as th_vt_dn, so_kh_dat_hang as th_dat_hang, so_don_hang as th_don_hang, so_kh_moi as th_kh_moi,
                doanh_so_thang as th_doanh_so, doanh_thu_thang as th_doanh_thu, san_luong as th_san_lg, sku as th_sku, so_gio_lam_viec as th_so_gio_lam_viec
                FROM `tabDMS Summary KPI Monthly`
                WHERE 
                    nhan_vien_ban_hang = '{emp}'
                    AND thang = '{month}'
                    AND nam = '{year}'
            """, as_dict=True)

            i["kpi_month"] = []
            if bool(kpi_month):
                i["kpi_month"] = kpi_month

        sql_query_count = """
            SELECT COUNT(*)
            FROM `tabDMS KPI`
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
            i["tl_vt_dn"] = 0
            i["tl_dat_hang"] = 0
            i["tl_don_hang"] = 0
            i["tl_kh_moi"] = 0
            i["tl_doanh_so"] = 0
            i["tl_doanh_thu"] = 0
            i["tl_san_luong"] = 0
            i["tl_so_gio_lam_viec"] = 0
            i["tl_sku"] = 0

            if bool(i["kpi_month"]):
                if i["kh_vt"] != 0:
                    i["tl_vt"] = round(i["kpi_month"][0]["th_vt"] / i["kh_vt"]*100, 2)

                if i["kh_vt_dn"] != 0:
                    i["tl_vt_dn"] = round(i["kpi_month"][0]["th_vt_dn"] / i["kh_vt_dn"]*100, 2)

                if i["kh_dat_hang"] != 0:
                    i["tl_dat_hang"] = round(i["kpi_month"][0]["th_dat_hang"] / i["kh_dat_hang"]*100, 2)

                if i["kh_don_hang"] != 0:
                    i["tl_don_hang"] = round(i["kpi_month"][0]["th_don_hang"] / i["kh_don_hang"]*100, 2)

                if i["kh_kh_moi"] != 0:
                    i["tl_kh_moi"] = round(i["kpi_month"][0]["th_kh_moi"] / i["kh_kh_moi"]*100, 2)

                if i["kh_doanh_so"] != 0:
                    i["tl_doanh_so"] = round(i["kpi_month"][0]["th_doanh_so"] / i["kh_doanh_so"]*100, 2)

                if i["kh_doanh_thu"] != 0:
                    i["tl_doanh_thu"] = round(i["kpi_month"][0]["th_doanh_thu"] / i["kh_doanh_thu"]*100, 2)

                if i["kh_san_lg"] != 0:
                    i["tl_san_luong"] = round(i["kpi_month"][0]["th_san_lg"] / i["kh_san_lg"]*100, 2)

                if i["kh_sku"] != 0:
                    i["tl_sku"] = round(i["kpi_month"][0]["th_sku"] / i["kh_sku"]*100, 2)

                if i["kh_so_gio_lam_viec"] != 0:
                    i["tl_so_gio_lam_viec"] = round(i["kpi_month"][0]["th_so_gio_lam_viec"] / i["kh_so_gio_lam_viec"]*100, 2)

                totals["tong_th_vt"] += i["kpi_month"][0]["th_vt"]
                totals["tong_th_vt_dn"] += i["kpi_month"][0]["th_vt_dn"]
                totals["tong_th_dat_hang"] += i["kpi_month"][0]["th_dat_hang"]
                totals["tong_th_don_hang"] += i["kpi_month"][0]["th_don_hang"]
                totals["tong_th_kh_moi"] += i["kpi_month"][0]["th_kh_moi"]
                totals["tong_th_doanh_so"] += i["kpi_month"][0]["th_doanh_so"]
                totals["tong_th_doanh_thu"] += i["kpi_month"][0]["th_doanh_thu"]
                totals["tong_th_san_lg"] += i["kpi_month"][0]["th_san_lg"]
                totals["tong_th_sku"] += i["kpi_month"][0]["th_sku"]
                totals["tong_th_so_gio_lam_viec"] += i["kpi_month"][0]["th_so_gio_lam_viec"]
                
            # Sum
            totals["tong_kh_vt"] += i["kh_vt"]
            totals["tong_kh_vt_dn"] += i["kh_vt_dn"]
            totals["tong_kh_dat_hang"] += i["kh_dat_hang"]
            totals["tong_kh_don_hang"] += i["kh_don_hang"]
            totals["tong_kh_kh_moi"] += i["kh_kh_moi"]
            totals["tong_kh_doanh_so"] += i["kh_doanh_so"]
            totals["tong_kh_doanh_thu"] += i["kh_doanh_thu"]
            totals["tong_kh_san_lg"] += i["kh_san_lg"]
            totals["tong_kh_sku"] += i["kh_sku"]
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
    

# Chi tiết viếng thăm
@frappe.whitelist(methods="GET")
def kpi_visit_detail(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")
        user_id = None
        if employee:
            user_id = frappe.get_value("Employee", {"name": employee}, "user_id")

        if from_date and to_date:
            filters["creation"] = ["between", [from_date, to_date]]
        if employee:
            filters["createdbyemail"] = user_id
        
        data = frappe.get_all("DMS Checkin", filters=filters, fields=["kh_ma", "kh_ten", "kh_diachi", "checkin_giovao", "checkin_khoangcach"], start=page_size*(page_number-1), page_length=page_size)
        return gen_response(200, "Thành công", {
            "data": data,
            "page_number": page_number,
            "page_size": page_size,
        })
    
    except Exception as e:
        return exception_handle(e)
    
# Chi tiết số kh viếng thăm duy nhất
@frappe.whitelist(methods="GET")
def kpi_only_visit_detail(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")
        user_id = None
        if employee:
            user_id = frappe.get_value("Employee", {"name": employee}, "user_id")

        if from_date and to_date:
            filters["creation"] = ["between", [from_date, to_date]]
        if employee:
            filters["createdbyemail"] = user_id
        
        data = frappe.get_all("DMS Checkin", filters=filters, fields=["kh_ma", "kh_ten", "kh_diachi", "checkin_giovao", "checkin_khoangcach"], start=page_size*(page_number-1), page_length=page_size)

        kh_ma_count = {}
        for i in data:
            kh_ma = i["kh_ma"]
            if kh_ma in kh_ma_count:
                kh_ma_count[kh_ma] += 1
            else:
                kh_ma_count[kh_ma] = 1

        unique_data = [i for i in data if kh_ma_count[i["kh_ma"]] == 1]

        return gen_response(200, "Thành công", {
            "data": unique_data,
            "page_number": page_number,
            "page_size": page_size,
        })

    except Exception as e:
        return exception_handle(e)
    
# Chi tiết số kh đặt hàng
@frappe.whitelist(methods='GET')
def kpi_cus_so_detail(**kwargs):
    try:
        filters = []
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")

        user_id = None
        if employee:
            user_id = frappe.get_value("Employee", {"name": employee}, "user_id")

        if from_date and to_date:
            filters.append(f"so.creation BETWEEN '{from_date}' AND '{to_date}'")
        elif from_date:
            filters.append(f"so.creation >= '{from_date}'")
        elif to_date:
            filters.append(f"so.creation <= '{to_date}'")

        filters.append(f"so.owner = '{user_id}'")
        where_condition = " AND ".join(filters)

        sql_query = """
            SELECT cus.customer_code, so.customer, so.customer_address, so.name as so_name, UNIX_TIMESTAMP(so.transaction_date) as trans_date, so.grand_total
            FROM `tabSales Order` so
            LEFT JOIN `tabCustomer` cus ON so.customer = cus.name
        """

        if where_condition:
            sql_query += " WHERE {}".format(where_condition)
        sql_query += " LIMIT %s OFFSET %s"
        limit = page_size
        offset = (page_number - 1) * limit

        data = frappe.db.sql(sql_query, (limit, offset), as_dict=True)
        return gen_response(200, "Thành công", {
            "data": data,
            "page_number": page_number,
            "page_size": page_size,
        })
    
    except Exception as e:
        return exception_handle(e)
    

# Chi tiết số kh thêm mới
@frappe.whitelist(methods='GET')
def kpi_new_cus_detail(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")

        user_id = None
        if employee:
            user_id = frappe.get_value("Employee", {"name": employee}, "user_id")
        
        filters["owner"] = user_id

        if from_date and to_date:
            filters["creation"] = ["between", [from_date, to_date]]

        data = frappe.get_all("Customer", filters=filters, fields=["customer_code", "customer_name", "customer_primary_address", "mobile_no", "UNIX_TIMESTAMP(creation) as collection_date"], start=page_size*(page_number-1), page_length=page_size)
        return gen_response(200, "Thành công", {
            "data": data,
            "page_number": page_number,
            "page_size": page_size,
        })
        
    except Exception as e:
        return exception_handle(e)
    
@frappe.whitelist(methods='GET')
def kpi_total_so_detail(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")

        user_id = None
        if employee:
            user_id = frappe.get_value("Employee", {"name": employee}, "user_id")
        
        filters["owner"] = user_id
        if from_date and to_date:
            filters["creation"] = ["between", [from_date, to_date]]

        data = frappe.get_all("Sales Order", filters=filters, fields=["name", "customer_name", "status", "UNIX_TIMESTAMP(creation) as pos_date"], start=page_size*(page_number-1), page_length=page_size)
        return gen_response(200, "Thành công", {
            "data": data,
            "page_number": page_number,
            "page_size": page_size,
        })

    except Exception as e:
        return exception_handle(e)
    

# Kpi doanh số chi tiết
@frappe.whitelist(methods="GET")
def kpi_so_amount_detail(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")
        user_id = None
        if employee:
            user_id = frappe.get_value("Employee", {"name": employee}, "user_id")
        filters["owner"] = user_id

        if from_date and to_date:
            filters["creation"] = ["between", [from_date, to_date]]

        data = frappe.get_all("Sales Order", filters=filters, fields=["name", "customer", "UNIX_TIMESTAMP(creation) as collec_date", "grand_total"], start=page_size*(page_number-1), page_length=page_size)
        return gen_response(200, "Thành công", {
            "data": data,
            "page_size": page_size,
            "page_number": page_number 
        })
    except Exception as e:
        return exception_handle(e)
    
# Kpi doanh thu chi tiết
@frappe.whitelist(methods='GET')
def kpi_si_amount_detail(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")
        sales_person = frappe.get_value("Sales Person", {"employee": employee}, "name")

        if from_date and to_date:
            filters["creation"] = ["between", [from_date, to_date]]

        sales_invoices = frappe.get_all("Sales Invoice", filters=filters, fields=["name", "customer", "UNIX_TIMESTAMP(creation) as collec_date", "grand_total"], start=page_size*(page_number-1), page_length=page_size)
        data = []
        for i in sales_invoices:
            si = frappe.get_doc("Sales Invoice", i.name)
            for st in si.sales_team:
                if st.created_by == 1 and st.sales_person == sales_person:
                    data.append(i)
        return gen_response(200, "Thành công", {
            "data": data,
            "page_size": page_size,
            "page_number": page_number 
        })
    except Exception as e:
        return exception_handle(e)

# Sản lượng chi tiết
@frappe.whitelist(methods="GET")
def kpi_so_qty_detail(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")
        user_id = None
        if employee:
            user_id = frappe.get_value("Employee", {"name": employee}, "user_id")
        filters["owner"] = user_id

        if from_date and to_date:
            filters["creation"] = ["between", [from_date, to_date]]

        sales_orders = frappe.get_all("Sales Order", filters=filters, fields=["name", "customer", "UNIX_TIMESTAMP(creation) as create_date"], start=page_size*(page_number-1), page_length=page_size)

        total_qty = 0
        for i in sales_orders:
            so = frappe.get_doc("Sales Order", i.name)
            for item in so.items:
                total_qty += item.qty
            i["total_qty"] = total_qty

        return gen_response(200, "Thành công", {
            "data": sales_orders,
            "page_size": page_size,
            "page_number": page_number
        }) 

    except Exception as e:
        return exception_handle(e)
    
# sku chi tiết
@frappe.whitelist(methods="GET")
def kpi_so_sku_detail(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")
        user_id = None
        if employee:
            user_id = frappe.get_value("Employee", {"name": employee}, "user_id")
        filters["owner"] = user_id

        if from_date and to_date:
            filters["creation"] = ["between", [from_date, to_date]]

        sales_orders = frappe.get_all("Sales Order", filters=filters, fields=["name", "customer", "UNIX_TIMESTAMP(creation) as create_date"], start=page_size*(page_number-1), page_length=page_size)

        for i in sales_orders:
            so = frappe.get_doc("Sales Order", i.name)
            items = so.items
            uom = {item.get("uom") for item in items}
            total_sku = len(uom)
            i["totak_sku"] = total_sku

        return gen_response(200, "Thành công", {
            "data": sales_orders,
            "page_size": page_size,
            "page_number": page_number
        })

    except Exception as e:
        return exception_handle(e)
    
# Số giờ làm chi tiết
@frappe.whitelist(methods="GET")
def kpi_time_work_detail(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")
        user_id = None
        if employee:
            user_id = frappe.get_value("Employee", {"name": employee}, "user_id")
        filters["createdbyemail"] = user_id

        if from_date and to_date:
            filters["creation"] = ["between", [from_date, to_date]]

        data = frappe.get_all("DMS Checkin", filters=filters, fields=["kh_ma", "kh_ten", "kh_diachi", "UNIX_TIMESTAMP(createddate) as create_date", "checkin_giovao", "checkin_giora"], start=page_size*(page_number-1), page_length=page_size)
        for i in data:
            i["so_gio_lam"] = i["checkin_giora"] - i["checkin_giovao"]

        return gen_response(200, "Thành công", {
            "data": data,
            "page_number": page_number,
            "page_size": page_size
        })
    except Exception as e:
        return exception_handle(e)