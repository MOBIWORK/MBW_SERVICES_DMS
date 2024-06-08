import frappe
from mbw_dms.api.common import gen_response, exception_handle
from mbw_dms.api.validators import validate_filter_timestamp

@frappe.whitelist(methods="GET")
def report_web_visit(**kwargs):
    try:
        filters = []
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None

        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >= 1 else 1
        sales_team = kwargs.get("sales_team")
        sales_person = kwargs.get("sales_person")

        if from_date and to_date:
            filters["creation"] = ["between", [from_date, to_date]]
        elif from_date:
            filters["creation"] = [">=", from_date]
        elif to_date:
            filters["creation"] = ["<=", to_date]
        if sales_team:
            filters.append(f"sp.parent_sales_person='{sales_team}'")
        if sales_person:
            filters.append(f"st.sales_person='{sales_person}'")

        where_conditions = " AND ".join(filters)
        
        sql_query = """
            SELECT ck.
            FROM `tabDMS Checkin` ck
            JOIN 
        """

    except Exception as e:
        return exception_handle(e)