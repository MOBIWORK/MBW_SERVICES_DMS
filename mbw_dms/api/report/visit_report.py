import frappe
from mbw_dms.api.common import gen_response, exception_handle
from mbw_dms.api.validators import validate_filter_timestamp
from mbw_dms.api.configs import day_name_translation
import datetime

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
            filters.append(f"ck.creation BETWEEN '{from_date}' AND '{to_date}'")
        elif from_date:
            filters.append(f"ck.creation >= '{from_date}'")
        elif to_date:
            filters.append(f"ck.creation <= '{to_date}'")
        if sales_team:
            filters.append(f"sp.parent_sales_person='{sales_team}'")
        if sales_person:
            filters.append(f"sp.name='{sales_person}'")

        where_conditions = " AND ".join(filters)
        
        sql_query = """
            SELECT sp.employee as sales_person_id, sp.name as sales_person_name, sp.parent_sales_person, UNIX_TIMESTAMP(ck.creation) as date
            FROM `tabDMS Checkin` ck
            JOIN `tabCustomer` cus ON ck.kh_ten = cus.name
            JOIN `tabSales Person` sp ON ck.createbyname = sp.employee
            JOIN `tabAttendance` att ON att.employee = sp.employee
        """

        if where_conditions:
            sql_query += " WHERE {}".format(where_conditions)
        sql_query += " LIMIT %s OFFSET %s"

        limit = page_size
        offset = (page_number - 1) * limit
        list_visits = frappe.db.sql(sql_query, (limit, offset), as_dict=True)
        for i in list_visits:
            date = datetime.datetime.fromtimestamp(i["date"])
            day = date.strftime("%A")
            day_of_week = day_name_translation[day]
            i["day_of_week"] = day_of_week

        return gen_response(200, "Thành công", list_visits)
    except Exception as e:
        return exception_handle(e)