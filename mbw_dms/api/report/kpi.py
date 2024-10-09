import frappe

from mbw_dms.api.common import gen_response, exception_handle, get_child_values_doc,get_value_child_doctype
from mbw_dms.api.validators import validate_filter_timestamp
import calendar
import math
# Báo cáo KPI web- lưới tổng quan
@frappe.whitelist(methods='GET')
def kpi_report(**kwargs):

    from mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi import report
    return report(kwargs=kwargs)

# Chi tiết lượt viếng thăm
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
        fields = ["name", "kh_ma", "kh_ten", "kh_diachi","checkin_address", "checkin_giovao", "checkin_khoangcach"]
        dms_setting = frappe.get_single("DMS Settings").as_dict()
    
        data = frappe.get_all("DMS Checkin", filters=filters, fields=fields,order_by="kh_ma asc", start=page_size*(page_number-1), page_length=page_size)
        if dms_setting.kb_vitringoaisaiso and dms_setting.checkout_ngoaisaiso:
            for checkin in data :
                checkin["kh_diachi"] = checkin["checkin_address"] if not bool(checkin["kh_diachi"]) else checkin["kh_diachi"]
        else:
            for checkin in data :
                checkin["kh_diachi"] = checkin["checkin_address"]
        totals = frappe.db.count("DMS Checkin", filters=filters)
        return gen_response(200, "Thành công", {
            "data": data,
            "totals": totals,
            "page_number": page_number,
            "page_size": page_size,
        })
    
    except Exception as e:
        return exception_handle(e)
    
# Chi tiết số kh viếng thăm
@frappe.whitelist(methods="GET")
def kpi_only_visit_detail(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size = int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")
        user_id = None
        if employee:
            user_id = frappe.get_value("Employee", {"name": employee}, "user_id")

        if from_date and to_date:
            filters["creation"] = ["between", [from_date, to_date]]
        if employee:
            filters["createdbyemail"] = user_id
        fields = ["name", "kh_ma", "kh_ten", "kh_diachi","checkin_address", "checkin_giovao", "checkin_khoangcach"]
        dms_setting = frappe.get_single("DMS Settings").as_dict()
        all_data = frappe.db.get_all("DMS Checkin", filters=filters, fields=fields,order_by="kh_ma asc",start=  (page_number -1 )* page_size,page_length = page_size)
        if dms_setting.kb_vitringoaisaiso and dms_setting.checkout_ngoaisaiso:
            for checkin in all_data :
                checkin["kh_diachi"] = checkin["checkin_address"] if not bool(checkin["kh_diachi"]) else checkin["kh_diachi"]
        else:
            for checkin in all_data :
                checkin["kh_diachi"] = checkin["checkin_address"]
        unique_data_count =  frappe.db.count("DMS Checkin", filters=filters)
        return_data = {}
        for checkin in all_data: 
            return_data.setdefault(checkin.get("kh_ma"),[])
            return_data[checkin.get("kh_ma")].append(checkin)

        return_data2 = []
        for checkin_ma,value in return_data.items():
            return_data2 += value
        return gen_response(200, "Thành công", {
            "data": return_data2,
            "totals": unique_data_count,
            "page_number": page_number,
            "page_size": page_size,
        })

    except Exception as e:
        return exception_handle(e)

    
# Chi tiết số kh đặt hàng
@frappe.whitelist(methods='GET')
def kpi_cus_so_detail(**kwargs):
    try:
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")
        sales_person = frappe.get_value("Sales Person", {"employee": employee}, "name")

        filters = f"WHERE so.docstatus = 1 AND st.sales_person = '{sales_person}' AND st.created_by = 1 "
        if from_date and to_date:
            filters = f"{filters} AND so.creation BETWEEN '{from_date}' AND '{to_date}'"
        elif from_date:
            filters = f"{filters} AND so.creation >= '{from_date}'"
        elif to_date:
            filters = f"{filters} AND so.creation <= '{to_date}'"
         # Phân trang dữ liệu
        start_idx = page_size * (page_number - 1)

        sql_total = f"""
            SELECT COUNT(DISTINCT so.name) as total
            FROM `tabSales Order` so
            LEFT JOIN `tabCustomer` cus ON so.customer = cus.name
            LEFT JOIN `tabSales Team` st ON so.name = st.parent
            {filters}
            ORDER BY cus.customer_code ASC
        """

        sql_query = f"""
            SELECT cus.customer_code, so.customer, so.customer_address, so.name as so_name, UNIX_TIMESTAMP(so.transaction_date) as trans_date, so.grand_total
            FROM `tabSales Order` so
            LEFT JOIN `tabCustomer` cus ON so.customer = cus.name
            LEFT JOIN `tabSales Team` st ON so.name = st.parent
            {filters}
            ORDER BY cus.customer_code ASC
            LIMIT {page_size}
            OFFSET {start_idx}
        """
        all_sales_orders = frappe.db.sql(sql_query, as_dict=True)

        totals = frappe.db.sql(sql_total, as_dict=True)
        
        

        return gen_response(200, "Thành công", {
            "data": all_sales_orders,
            "totals": totals[0].total,
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
        totals = frappe.db.count("Customer", filters=filters)

        return gen_response(200, "Thành công", {
            "data": data,
            "totals": totals,
            "page_number": page_number,
            "page_size": page_size,
        })
        
    except Exception as e:
        return exception_handle(e)
    
@frappe.whitelist(methods='GET')
def kpi_total_so_detail(**kwargs):
    try:
        #mới
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")
        sales_person = frappe.get_value("Sales Person", {"employee": employee}, "name")

        filters = f"WHERE so.docstatus = 1 AND st.sales_person = '{sales_person}' AND st.created_by = 1 "
        if from_date and to_date:
            filters = f"{filters} AND so.creation BETWEEN '{from_date}' AND '{to_date}'"
        elif from_date:
            filters = f"{filters} AND so.creation >= '{from_date}'"
        elif to_date:
            filters = f"{filters} AND so.creation <= '{to_date}'"
         # Phân trang dữ liệu
        start_idx = page_size * (page_number - 1)

        sql_total = f"""
            SELECT COUNT(DISTINCT so.name) as total
            FROM `tabSales Order` so
            LEFT JOIN `tabCustomer` cus ON so.customer = cus.name
            LEFT JOIN `tabSales Team` st ON so.name = st.parent
            {filters}
            ORDER BY cus.customer_code ASC
        """

        sql_query = f"""
            SELECT so.name, so.customer, UNIX_TIMESTAMP(so.creation) as collec_date, so.grand_total,so.status,so.docstatus
            FROM `tabSales Order` so
            LEFT JOIN `tabCustomer` cus ON so.customer = cus.name
            LEFT JOIN `tabSales Team` st ON so.name = st.parent
            {filters}
            ORDER BY cus.customer_code ASC
            LIMIT {page_size}
            OFFSET {start_idx}
        """
        all_sales_orders = frappe.db.sql(sql_query, as_dict=True)

        totals = frappe.db.sql(sql_total, as_dict=True)
        
        

        return gen_response(200, "Thành công", {
            "data": all_sales_orders,
            "totals": totals[0].total,
            "page_number": page_number,
            "page_size": page_size,
        })

    except Exception as e:
        return exception_handle(e)
    

# Kpi doanh số chi tiết
@frappe.whitelist(methods="GET")
def kpi_so_amount_detail(**kwargs):
    try:
        #mới
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")
        sales_person = frappe.get_value("Sales Person", {"employee": employee}, "name")

        filters = f"WHERE so.docstatus = 1 AND st.sales_person = '{sales_person}' AND st.created_by = 1 "
        if from_date and to_date:
            filters = f"{filters} AND so.creation BETWEEN '{from_date}' AND '{to_date}'"
        elif from_date:
            filters = f"{filters} AND so.creation >= '{from_date}'"
        elif to_date:
            filters = f"{filters} AND so.creation <= '{to_date}'"
         # Phân trang dữ liệu
        start_idx = page_size * (page_number - 1)

        sql_total = f"""
            SELECT COUNT(DISTINCT so.name) as total
            FROM `tabSales Order` so
            LEFT JOIN `tabCustomer` cus ON so.customer = cus.name
            LEFT JOIN `tabSales Team` st ON so.name = st.parent
            {filters}
            ORDER BY cus.customer_code ASC
        """

        sql_query = f"""
            SELECT DISTINCT so.name, so.customer, UNIX_TIMESTAMP(so.creation) as collec_date, so.grand_total,st.allocated_percentage
            FROM `tabSales Order` so
            LEFT JOIN `tabCustomer` cus ON so.customer = cus.name
            LEFT JOIN `tabSales Team` st ON so.name = st.parent
            {filters}
            ORDER BY cus.customer_code ASC
            LIMIT {page_size}
            OFFSET {start_idx}
        """
        all_sales_orders = frappe.db.sql(sql_query, as_dict=True)
        for sale_order in all_sales_orders:
            sale_order["grand_total"] = float(sale_order["grand_total"])*float(sale_order["allocated_percentage"])/100
        totals = frappe.db.sql(sql_total, as_dict=True)
        
        

        return gen_response(200, "Thành công", {
            "data": all_sales_orders,
            "totals": totals[0].total,
            "page_number": page_number,
            "page_size": page_size,
        })
    except Exception as e:
        return exception_handle(e)
    
# Kpi doanh thu chi tiết
@frappe.whitelist(methods='GET')
def kpi_si_amount_detail(**kwargs):
    try:
        #mới

        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")
        sales_person = frappe.get_value("Sales Person", {"employee": employee}, "name")

        filters = f"WHERE si.docstatus = 1 AND st.sales_person = '{sales_person}' AND st.created_by = 1 "
        if from_date and to_date:
            filters = f"{filters} AND si.creation BETWEEN '{from_date}' AND '{to_date}'"
        elif from_date:
            filters = f"{filters} AND si.creation >= '{from_date}'"
        elif to_date:
            filters = f"{filters} AND si.creation <= '{to_date}'"
         # Phân trang dữ liệu
        start_idx = page_size * (page_number - 1)

        sql_total = f"""
            SELECT COUNT(DISTINCT si.name) as total
            FROM `tabSales Invoice` si
            LEFT JOIN `tabCustomer` cus ON si.customer = cus.name
            LEFT JOIN `tabSales Team` st ON si.name = st.parent
            {filters}
            ORDER BY cus.customer_code ASC
        """

        sql_query = f"""
            SELECT si.name, si.customer, UNIX_TIMESTAMP(si.creation) as collec_date, si.grand_total
            FROM `tabSales Invoice` si
            LEFT JOIN `tabCustomer` cus ON si.customer = cus.name
            LEFT JOIN `tabSales Team` st ON si.name = st.parent
            {filters}
            ORDER BY cus.customer_code ASC
            LIMIT {page_size}
            OFFSET {start_idx}
        """
        all_sales_orders = frappe.db.sql(sql_query, as_dict=True)

        totals = frappe.db.sql(sql_total, as_dict=True)
        
        

        return gen_response(200, "Thành công", {
            "data": all_sales_orders,
            "totals": totals[0].total,
            "page_number": page_number,
            "page_size": page_size,
        })
    except Exception as e:
        return exception_handle(e)


# Sản lượng chi tiết
@frappe.whitelist(methods="GET")
def kpi_so_qty_detail(**kwargs):
    try:
        #mới
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        employee = kwargs.get("employee")
        sales_person = frappe.get_value("Sales Person", {"employee": employee}, "name")

        filters = f"WHERE so.docstatus = 1 AND st.sales_person = '{sales_person}' AND st.created_by = 1 "
        if from_date and to_date:
            filters = f"{filters} AND so.creation BETWEEN '{from_date}' AND '{to_date}'"
        elif from_date:
            filters = f"{filters} AND so.creation >= '{from_date}'"
        elif to_date:
            filters = f"{filters} AND so.creation <= '{to_date}'"
         # Phân trang dữ liệu
        start_idx = page_size * (page_number - 1)

        sql_total = f"""
            SELECT COUNT(DISTINCT so.name) as total
            FROM `tabSales Order` so
            LEFT JOIN `tabCustomer` cus ON so.customer = cus.name
            LEFT JOIN `tabSales Team` st ON so.name = st.parent
            {filters}
            ORDER BY cus.customer_code ASC
        """

        sql_query = f"""
            SELECT 
                so.name, so.customer, UNIX_TIMESTAMP(so.creation) as collec_date
            FROM `tabSales Order` so
            LEFT JOIN `tabCustomer` cus ON so.customer = cus.name
            LEFT JOIN `tabSales Team` st ON so.name = st.parent
            {filters}
            ORDER BY cus.customer_code ASC
            LIMIT {page_size}
            OFFSET {start_idx}
        """
        all_sales_orders = frappe.db.sql(sql_query, as_dict=True)

        totals = frappe.db.sql(sql_total, as_dict=True)
        
        from mbw_dms.api.common import qty_not_pricing_rule
        for i in all_sales_orders:
            so = frappe.get_doc("Sales Order", i.name).as_dict()
            items = so.get("items")
            qty,uom = qty_not_pricing_rule(items)
            i["total_qty"] = sum(qty)

        return gen_response(200, "Thành công", {
            "data": all_sales_orders,
            "totals": totals[0].total,
            "page_number": page_number,
            "page_size": page_size,
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
        filters["docstatus"] =1

        if from_date and to_date:
            filters["creation"] = ["between", [from_date, to_date]]

        sales_orders = frappe.get_all("Sales Order", filters=filters, fields=["name", "customer", "UNIX_TIMESTAMP(creation) as create_date"], start=page_size*(page_number-1), page_length=page_size)
        totals = frappe.db.count("Sales Order", filters=filters)

        for i in sales_orders:
            so = frappe.get_doc("Sales Order", i.name)
            items = so.items
            from mbw_dms.api.common import qty_not_pricing_rule
            qty,uom = qty_not_pricing_rule(items)
            total_sku = len(uom)
            i["totak_sku"] = total_sku

        return gen_response(200, "Thành công", {
            "data": sales_orders,
            "totals": totals,
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

        data = frappe.get_all("DMS Checkin", filters=filters, fields=["name", "kh_ma", "kh_ten", "kh_diachi", "UNIX_TIMESTAMP(createddate) as create_date", "checkin_giovao", "checkin_giora"], start=page_size*(page_number-1), page_length=page_size)
        totals = frappe.db.count("DMS Checkin", filters=filters)
        for i in data:
            i["so_gio_lam"] = i["checkin_giora"] - i["checkin_giovao"]

        return gen_response(200, "Thành công", {
            "data": data,
            "totals": totals,
            "page_number": page_number,
            "page_size": page_size
        })
    except Exception as e:
        return exception_handle(e)




@frappe.whitelist(methods='GET')
def analisis_kpi(**res): 
    try:
        is_excel = res.get("is_excel", False)
        page_size =  int(res.get("page_size", 20))
        page_number = int(res.get("page_number")) if res.get("page_number") and int(res.get("page_number")) >= 1 else 1
        employee = res.get("employee")
        sales_team = res.get("sales_team")
        month = int(res.get("month")) if res.get("month") else None
        year = int(res.get("year"))  if res.get("year") else None
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
        
        # Lấy dữ liệu số khách hàng của nv từ bảng tuyến
        sql_query_router = """
            SELECT name as id, employee FROM `tabDMS Router`
        """
        data_router = frappe.db.sql(sql_query_router, as_dict=True)
        obj_nv = {}
        for n in data_router:
            if obj_nv.get(n["employee"]) is None:
                obj_nv[n["employee"]] = []

            list_customers =frappe.get_doc('DMS Router',{"is_deleted": 0,"name": n["id"]}).get("customers")

            for c in list_customers:
                if c.get("customer_code") not in obj_nv[n["employee"]]:
                    obj_nv[n["employee"]].append(c.get("customer_code"))

        # Lấy dữ liệu từ bảng DMS KPI
        sql_query = """
            SELECT nhom_ban_hang,
            CONCAT(
                '[',
                GROUP_CONCAT(
                    CONCAT(
                        '{"ten_nv":"', nhan_vien_ban_hang,
                        '", "kh_vt":', so_kh_vt_luot,
                        ', "kh_vt_dn":', so_kh_vt_duynhat,
                        ', "kh_dat_hang":', so_kh_dathang,
                        ', "kh_don_hang":', so_don_hang,
                        ', "kh_kh_moi":', so_kh_moi,
                        ', "kh_doanh_so":', doanh_so,
                        ', "kh_doanh_thu":', doanh_thu,
                        ', "kh_san_lg":', san_luong,
                        ', "kh_sku":', sku,
                        ', "kh_so_gio_lam_viec":', so_gio_lam_viec,
                        '}'
                    )
                ),
                ']'
            ) AS children
            FROM `tabDMS KPI`
        """
        if where_condition:
            sql_query += " WHERE {}".format(where_condition)
        sql_query += " GROUP BY nhom_ban_hang"

        if is_excel:
            data = frappe.db.sql(sql_query, as_dict=True)
        else: 
            sql_query += " LIMIT %s OFFSET %s"
            limit = page_size
            offset = (page_number - 1) * limit
            data = frappe.db.sql(sql_query, (limit, offset), as_dict=True)
        
        sql_sku_count = """
            SELECT COUNT(*)
            FROM `tabItem`
        """
        total_sku = frappe.db.sql(sql_sku_count, as_dict=True)
        total_sku = frappe.parse_json(total_sku[0]["COUNT(*)"])

        sql_query_donhang = """
            SELECT so.name as name_order, customer as customer_code, customer_name
            FROM `tabSales Order` so
            LEFT JOIN `tabSales Team` st ON so.name = st.parent 
            WHERE so.transaction_date BETWEEN %s AND %s
        """

        sale_orders = frappe.db.sql(sql_query_donhang,(start_date_str, end_date_str) ,as_dict=1)

        field_items = ["name", "item_name", "item_code"]
        obj_emp = {}

        for i in sale_orders:
            st = get_value_child_doctype("Sales Order", i["name_order"], "sales_team")

            items = get_child_values_doc(doctype="Sales Order", master_name=i["name_order"], fields_to_get=field_items, chil_name="items")
            if len(st) != 0:
                for j in st:
                    if j.created_by == 0:
                        sql_emp = """
                            SELECT sales_person_name, employee 
                            FROM `tabSales Person` sp
                            WHERE sp.sales_person_name = %s
                        """
                        emp = frappe.db.sql(sql_emp, (j.sales_person), as_dict=True)

                        if obj_emp.get(emp[0]["employee"]) is None:
                            obj_emp[emp[0]["employee"]] = {"totalOrder": 0, "total_sku": 0, "customer": {}}
                        if obj_emp.get(emp[0]["employee"]) is not None:
                            obj_emp[emp[0]["employee"]]["totalOrder"] += 1
                            obj_emp[emp[0]["employee"]]["total_sku"] += len(items)
                            
                            if obj_emp[emp[0]["employee"]]["customer"].get(i["customer_code"]) is None:
                                obj_emp[emp[0]["employee"]]["customer"][i["customer_code"]] = 1

        print("=================data", data)
       
        for i in data:
            i["children"] = frappe.parse_json(i["children"])
            i["total_kh_vt"] = 0
            i["total_th_vt"] = 0
            i["total_tl_vt"] = 0
            i["total_kh_vt_dn"] = 0
            i["total_th_vt_dn"] = 0
            i["total_tl_vt_dn"] = 0
            i["total_kh_don_hang"] = 0
            i["total_th_don_hang"] = 0
            i["total_tl_don_hang"] = 0
            i["total_kh_doanh_so"] = 0
            i["total_th_doanh_so"] = 0
            i["total_tl_doanh_so"] = 0
            i["total_kh_doanh_thu"] = 0
            i["total_th_doanh_thu"] = 0
            i["total_tl_doanh_thu"] = 0
            i["total_kh_san_lg"] = 0
            i["total_th_san_lg"] = 0
            i["total_tl_san_lg"] = 0
            i["total_kh_sku"] = 0
            i["total_th_sku"] = 0
            i["total_tl_sku"] = 0
            i["total_tl_donhang_thanhcong"] = 0
            i["total_tong_khach_hang"] = 0
            i["total_tl_sku_thanhcong"] = 0
            i["total_kh_dat_hang"] = 0
            i["total_th_dat_hang"] = 0
            i["total_tl_dat_hang"] = 0
            i["total_kh_kh_moi"] = 0
            i["total_th_kh_moi"] = 0
            i["total_tl_kh_moi"] = 0

            i["total_khach_hang_vt"] = 0
            i["total_binh_quan_sku_dh"] = 0
            i["total_binh_quan_sku_kh"] = 0
            i["total_sku_dh"] = 0
            i["total_sku_kh"] = 0
            for r in i["children"]:
                emp = r["ten_nv"]
                if emp in obj_emp:
                    if obj_emp[emp]["totalOrder"] != 0:
                        r["sku_dh"] = math.floor((obj_emp[emp]["total_sku"]/obj_emp[emp]["totalOrder"]) * 1000)/1000
                    else :
                        r["sku_dh"] = 0
                    i["total_sku_dh"] += r["sku_dh"]
                    
                    total_customer = len(obj_emp[emp]["customer"])
                    if total_customer != 0:
                        r["sku_kh"] = obj_emp[emp]["total_sku"]/total_customer
                    else: 
                        r["sku_kh"] = 0

                    i["total_sku_kh"] += r["sku_kh"]
                # kpi nhan vien ban hang
                kpi_month = frappe.db.sql(f"""
                    SELECT 
                        so_kh_vt_luot as th_vt, 
                        kh_vt as th_vt_dn, 
                        so_kh_dat_hang as th_dat_hang, 
                        so_don_hang as th_don_hang, 
                        so_kh_moi as th_kh_moi,
                        doanh_so_thang as th_doanh_so, 
                        doanh_thu_thang as th_doanh_thu,
                        san_luong as th_san_lg, 
                        sku as th_sku
                    FROM `tabDMS Summary KPI Monthly`
                    WHERE 
                        nhan_vien_ban_hang = '{emp}'
                        AND thang = '{month}'
                        AND nam = '{year}'
                """, as_dict=True)
                r["kpi_month"] = []
                if bool(kpi_month):
                    r["kpi_month"] = kpi_month[0]
                
            
                r["tl_vt"] = 0
                r["tl_vt_dn"] = 0
                r["tl_dat_hang"] = 0
                r["tl_don_hang"] = 0
                r["tl_kh_moi"] = 0
                r["tl_doanh_so"] = 0
                r["tl_doanh_thu"] = 0
                r["tl_san_luong"] = 0
                r["tl_so_gio_lam_viec"] = 0
                r["tl_sku"] = 0
                r["tl_donhang_thanhcong"] = 0
                r["tl_sku_thanhcong"] = 0
                r["tong_khach_hang"] = 0
                r["binh_quan_sku_kh"] = 0
                r["binh_quan_sku_dh"] = 0
                r["khach_hang_vt"] = 0
                if emp in obj_nv:
                    r["tong_khach_hang"] = len(obj_nv[emp])
                
                i["total_kh_vt"] += r["kh_vt"]
                i["total_kh_vt_dn"] += r["kh_vt_dn"]
                i["total_kh_don_hang"] += r["kh_don_hang"]
                i["total_kh_doanh_so"] += r["kh_doanh_so"]
                i["total_kh_doanh_thu"] += r["kh_doanh_thu"]
                i["total_kh_san_lg"] += r["kh_san_lg"]
                i["total_kh_sku"] += r["kh_sku"]
                i["total_tong_khach_hang"] += r["tong_khach_hang"]
                i["total_kh_dat_hang"] += r["kh_dat_hang"]
                i["total_kh_kh_moi"] += r["kh_kh_moi"]
                if bool(r["kpi_month"]):
                    if r["kpi_month"]["th_vt_dn"] is not None:
                        number_vt_dn = len(r["kpi_month"]["th_vt_dn"].split(";"))
                    else :
                        number_vt_dn = 0
                    r["kpi_month"]["th_vt_dn"] = number_vt_dn
                    if r["kh_vt"] != 0:
                        r["tl_vt"] = round(r["kpi_month"]["th_vt"] / r["kh_vt"]*100, 2)
                        i["total_th_vt"] += r["kpi_month"]["th_vt"]
                        r["tl_donhang_thanhcong"] =  round(r["kh_don_hang"]/ r["kh_vt"]*100, 2)

                    if r["kh_vt_dn"] != 0:
                        r["tl_vt_dn"] = round(number_vt_dn / r["kh_vt_dn"]*100, 2)
                        i["total_th_vt_dn"] += number_vt_dn
                        r["khach_hang_vt"] = number_vt_dn
                        i["total_khach_hang_vt"] += r["khach_hang_vt"]
                    if r["kh_dat_hang"] != 0:
                        r["tl_dat_hang"] = round(r["kpi_month"]["th_dat_hang"] / r["kh_dat_hang"]*100, 2)
                        i["total_th_dat_hang"] += r["kpi_month"]["th_dat_hang"]


                    if r["kh_don_hang"] != 0:
                        r["tl_don_hang"] = round(r["kpi_month"]["th_don_hang"] / r["kh_don_hang"]*100, 2)
                        i["total_th_don_hang"] += r["kpi_month"]["th_don_hang"]

                    if r["kh_kh_moi"] != 0:
                        r["tl_kh_moi"] = round(r["kpi_month"]["th_kh_moi"] / r["kh_kh_moi"]*100, 2)
                        i["total_th_kh_moi"] += r["kpi_month"]["th_kh_moi"]
                    if r["kh_doanh_so"] != 0:
                        r["tl_doanh_so"] = round(r["kpi_month"]["th_doanh_so"] / r["kh_doanh_so"]*100, 2)
                        i["total_th_doanh_so"] += r["kpi_month"]["th_doanh_so"]

                    if r["kh_doanh_thu"] != 0:
                        r["tl_doanh_thu"] = round(r["kpi_month"]["th_doanh_thu"] / r["kh_doanh_thu"]*100, 2)
                        i["total_th_doanh_thu"] += r["kpi_month"]["th_doanh_thu"]

                    if r["kh_san_lg"] != 0:
                        r["tl_san_luong"] = round(r["kpi_month"]["th_san_lg"] / r["kh_san_lg"]*100, 2)
                        i["total_th_san_lg"] += r["kpi_month"]["th_san_lg"]

                    if r["kh_sku"] != 0:
                        r["tl_sku"] = round(r["kpi_month"]["th_sku"] / r["kh_sku"]*100, 2)
                        i["total_th_sku"] += r["kpi_month"]["th_sku"]
                    if total_sku != 0:
                        r["tl_sku_thanhcong"] = round(r["kpi_month"]["th_sku"] / total_sku *100, 2)

                
                
            if i["total_kh_vt"] != 0:
                i["total_tl_vt"] = round((i["total_th_vt"] /   i["total_kh_vt"])*100, 2)
            if  i["total_kh_vt_dn"] != 0:
                i["total_tl_vt_dn"] = round(i["total_th_vt_dn"] / i["total_kh_vt_dn"]*100, 2)
            if i["total_kh_don_hang"] != 0:
                i["total_tl_don_hang"] = round(i["total_th_don_hang"] / i["total_kh_don_hang"]*100, 2)
            if i["total_kh_doanh_so"] != 0:
                i["total_tl_doanh_so"] = round(i["total_th_doanh_so"] / i["total_kh_doanh_so"]*100, 2)
            if i["total_kh_doanh_thu"] != 0:
                i["total_tl_doanh_thu"] = round(i["total_th_doanh_thu"] / i["total_kh_doanh_thu"]*100, 2)
            if i["total_kh_san_lg"] != 0:
                i["total_tl_san_lg"] = round(i["total_th_san_lg"] / i["total_kh_san_lg"]*100, 2)
            if i["total_kh_sku"] != 0:
                i["total_tl_sku"] = round(i["total_th_sku"] / i["total_kh_sku"]*100, 2)
            if i["total_kh_dat_hang"] != 0:
                i["total_tl_dat_hang"] = round(i["total_th_dat_hang"] / i["total_kh_dat_hang"]*100, 2)
            if i["total_kh_kh_moi"] != 0:
                i["total_tl_kh_moi"] = round(i["total_th_kh_moi"] / i["total_kh_kh_moi"]*100, 2)

            if len(i["children"]) != 0:
                i["total_tl_donhang_thanhcong"] = round(sum([r["tl_donhang_thanhcong"] for r in i["children"]])/len(i["children"]), 2)
                i["total_tl_sku_thanhcong"] = round(sum([r["tl_sku_thanhcong"] for r in i["children"]])/len(i["children"]), 2)

        # sql_query_count = """
        #     SELECT COUNT(*)
        #     FROM `tabDMS KPI`
        # """
        # if where_condition:
        #     sql_query_count += " WHERE {}".format(where_condition)
        # count_data = frappe.db.sql(sql_query_count, as_dict=True)

        return gen_response(200, "Thành công", {
                "data": data,
                "total_sku": total_sku,
                # "totals": totals,
                "page_number": page_number,
                "page_size": page_size,
            })
    except Exception as e:
        return exception_handle(e)
