import frappe

from mbw_dms.api.common import gen_response, exception_handel
from mbw_dms.api.validators import validate_filter_timestamp

@frappe.whitelist(methods='GET')
def first_checkin_report(**kwargs):
    try:
        filters = [ ]
        from_date = validate_filter_timestamp(type='start')(kwargs.get('from_date')) if kwargs.get('from_date') else None
        to_date = validate_filter_timestamp(type='end')(kwargs.get('to_date')) if kwargs.get('to_date') else None

        page_size =  int(kwargs.get('page_size', 20))
        page_number = int(kwargs.get('page_number')) if kwargs.get('page_number') and int(kwargs.get('page_number')) >= 1 else 1
        department = kwargs.get('department')
        employee = kwargs.get('employee')
        customer_type = kwargs.get('customer_type')
        customer_group = kwargs.get('customer_group')
        territory = kwargs.get('territory')
        if customer_type:
            filters.append(f"cus.customer_type='{customer_type}'")
        if customer_group:
            filters.append(f"cus.customer_group='{customer_group}'")
        if territory:
            filters.append(f"cus.territory='{territory}'")
        if employee:
            filters.append(f"em.employee_name='{employee}'")
        if department:
            filters.append(f"em.department='{department}'")

        if from_date and to_date:
            filters.append(f"cus.creation BETWEEN '{from_date}' AND '{to_date}'")
        elif from_date:
            filters.append(f"cus.creation >= '{from_date}'")
        elif to_date:
            filters.append(f"cus.creation <= '{to_date}'")
        where_conditions = " AND ".join(filters)

        sql_query = """
            SELECT cus.name as cus_id, cus.owner, cus.creation, cus.customer_name, cus.customer_code, cus.customer_type, cus.tax_id, cus.customer_group, cus.territory, cus.customer_primary_contact as contact, cus.customer_primary_address as address,
            cus.mobile_no as phone, em.name as employee_id, em.employee_name, em.department
            FROM `tabCustomer` cus
            JOIN `tabEmployee` em ON cus.owner = em.user_id
        """

        if where_conditions:
            sql_query += " WHERE {}".format(where_conditions)
        sql_query += " LIMIT %s OFFSET %s"

        limit = page_size
        offset = (page_number - 1) * page_size

        data = frappe.db.sql(sql_query, (limit, offset), as_dict=True)

        sql_count = """
            
        """

        return gen_response(200, 'Thành công', {
            "data": data,
            "totals": '',
            "page_number": page_number,
            "page_size": page_size
        })
    except Exception as e:
        return exception_handel(e)