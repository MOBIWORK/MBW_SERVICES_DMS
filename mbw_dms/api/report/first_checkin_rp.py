import frappe

from mbw_dms.api.common import gen_response, exception_handle
from mbw_dms.api.validators import validate_filter_timestamp

@frappe.whitelist(methods="GET")
def first_checkin_report(**kwargs):
    return handle_first_checkin_report(kwargs= kwargs)
def handle_first_checkin_report(kwargs):
    try:
        is_excel = kwargs.get("is_excel")
        filters = {}
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None

        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >= 1 else 1
        sales_team = kwargs.get("sales_team")
        sales_person = kwargs.get("sales_person")

        if sales_team:
            filters["sales_team"] = sales_team
        if sales_person:
            filters["sales_person"] = sales_person

        if from_date and to_date:
            filters["date_checkin"] = ["between", [from_date, to_date]]
        elif from_date:
            filters["date_checkin"] = [">=",from_date]
        elif to_date:
            filters["date_checkin"] = ["<=", to_date]
        if is_excel:
            data = frappe.db.get_all("DMS First Checkin Customer",
                                 filters=filters,
                                 fields=["sales_team", "employee_id", "sales_person", "customer_name", "customer_code", "customer_type", "customer_group", "contact_person", "phone",
                                         "tax_id", "territory", "address", "date_checkin"])
        else: 
            data = frappe.db.get_all("DMS First Checkin Customer",
                                 filters=filters,
                                 fields=["sales_team", "employee_id", "sales_person", "customer_name", "customer_code", "customer_type", "customer_group", "contact_person", "phone",
                                         "tax_id", "territory", "address", "date_checkin"],
                                 start=page_size*(page_number-1), page_length=page_size)
        totals = frappe.db.count("DMS First Checkin Customer", filters=filters)
        if is_excel:
            return {
                "data": data,
            }
        return gen_response(200, "Thành công", {
            "data": data,
            "totals": totals,
            "page_number": page_number,
            "page_size": page_size
        })
    
    except Exception as e:
        if is_excel:
            return {
                "data": []
            }
        return exception_handle(e)