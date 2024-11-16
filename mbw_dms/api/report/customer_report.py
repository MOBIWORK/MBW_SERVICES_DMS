import frappe

from mbw_dms.api.common import gen_response ,exception_handle
from mbw_dms.api.validators import validate_filter_timestamp


@frappe.whitelist(methods="GET")
def customer_report(**kwargs):
    return handle_customer_report(kwargs=kwargs)
def handle_customer_report(kwargs):
    try:
        is_excel = kwargs.get("is_excel")
        filters = []
        page_size = int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >= 1 else 1
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None

        customer_type = kwargs.get("customer_type")
        customer_group = kwargs.get("customer_group")
        territory = kwargs.get("territory")
        sales_team = kwargs.get("sales_team")
        sales_person = kwargs.get("sales_person")

        if from_date and to_date:
            filters.append(f"cus.creation BETWEEN '{from_date}' AND '{to_date}'")
        elif from_date:
            filters.append(f"cus.creation >= '{from_date}'")
        elif to_date:
            filters.append(f"cus.creation <= '{to_date}'")
        if customer_type:
            filters.append(f"cus.customer_type='{customer_type}'")
        if customer_group:
            filters.append(f"cus.customer_group='{customer_group}'")
        if territory:
            filters.append(f"cus.territory='{territory}'")
        if sales_team:
            filters.append(f"cus.custom_sales_manager='{sales_team}'")
        if sales_person:
            filters.append(f"sp.name='{sales_person}'")

        where_conditions = " AND ".join(filters)
        sql_query = """
            SELECT cus.name as cus_id, cus.owner, UNIX_TIMESTAMP(cus.creation) as creation, cus.customer_name, cus.customer_code, cus.customer_type, cus.tax_id, cus.customer_group, cus.territory, cus.customer_primary_contact as contact, cus.customer_primary_address as address,
            cus.mobile_no as phone, cus.custom_sales_manager as sales_team, emp.name as sales_person_id, sp.name as sales_person
            FROM `tabCustomer` cus
            LEFT JOIN `tabEmployee` emp ON cus.owner = emp.user_id
            LEFT JOIN `tabSales Person` sp ON emp.name = sp.employee
        """
        if where_conditions:
            sql_query += " WHERE {}".format(where_conditions)
        if not is_excel:
            sql_query += " LIMIT %s OFFSET %s"

        sql_query_count = """
            SELECT COUNT(*)
            FROM `tabCustomer` cus
            LEFT JOIN `tabSales Team` st ON cus.name = st.parent
            LEFT JOIN `tabSales Person` sp ON st.sales_person = sp.name
        """
        if where_conditions:
            sql_query_count += " WHERE {}".format(where_conditions)
        count_customers = frappe.db.sql(sql_query_count, as_dict=1)
        
        limit = page_size
        offset = (page_number - 1) * limit
        if is_excel:
            list_customers = frappe.db.sql(sql_query, as_dict=True)
        else:    
            list_customers = frappe.db.sql(sql_query, (limit, offset), as_dict=True)
        totals = {
            "sum_checkin": 0,
            "sum_so": 0,
        }
        customer_count = 0

        if list_customers:
            for i in list_customers:
                # Số lần viếng thăm
                i["first_checkin"] = ""
                i["last_checkin"] = ""
                i["totals_checkin"] = frappe.db.count("DMS Checkin", {"kh_ten": i["cus_id"]})

                if i["totals_checkin"]:
                    totals["sum_checkin"] += i["totals_checkin"]

                first_checkin = frappe.db.get_all("DMS Checkin", filters={"kh_ten": i["cus_id"]}, order_by="creation asc", fields=["UNIX_TIMESTAMP(creation) as creation"], limit=1)
                last_checkin = frappe.db.get_all("DMS Checkin", filters={"kh_ten": i["cus_id"]}, order_by="creation desc", fields=["UNIX_TIMESTAMP(creation) as creation"], limit=1)
                if first_checkin:
                    i["first_checkin"] = first_checkin[0].creation
                if last_checkin:
                    i["last_checkin"] = last_checkin[0].creation

                # Nguồn
                i["source"] = ""

                # Số đơn hàng
                i["totals_so"] = frappe.db.count("Sales Order", {"customer_name": i["cus_id"]})
                if i["totals_so"]:
                    totals["sum_so"] += i["totals_so"]
                # Đơn hàng cuối
                i["last_sale_order"] = ""
                last_so = frappe.db.get_all("Sales Order", filters={"customer_name": i["cus_id"]}, order_by="creation desc", fields=["UNIX_TIMESTAMP(creation) as creation"], limit=1)
                if last_so:
                    i["last_sale_order"] = last_so[0].creation
        
            # Tổng số khách hàng
            customer_count = count_customers[0]["COUNT(*)"]
        if is_excel:
            return {
                "data": list_customers,
            }
        return gen_response(200, "Thành công", {
            "data": list_customers,
            "sum": totals,
            "totals_cus": customer_count,
            "page_number": page_number,
            "page_size": page_size,
        })
    
    except Exception as e:
        if is_excel:
            return {
                "data": [],
            }
        return exception_handle(e)