import frappe

from mbw_dms.api.common import gen_response, exception_handel
from mbw_dms.api.validators import validate_filter_timestamp

@frappe.whitelist(methods='GET')
def first_checkin_report(**kwargs):
    try:
        filters = {}
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
            filters['customer_type'] = customer_type
        if customer_group:
            filters['customer_group'] = customer_group
        if territory:
            filters['territory'] = territory
        if employee:
            filters['employee_name'] = employee
        if department:
            filters['department'] = department

        if from_date and to_date:
            filters["date_checkin"] = ["between", [from_date, to_date]]
        elif from_date:
            filters["date_checkin"] = [">=",from_date]
        elif to_date:
            filters["date_checkin"] = ["<=", to_date]

        data = frappe.db.get_all('DMS First Checkin Customer',
                                 filters=filters,
                                 fields=['department', 'employee_id', 'employee_name', 'customer_name', 'customer_code', 'customer_type', 'customer_group', 'contact_person', 'phone',
                                         'tax_id', 'territory', 'address', 'date_checkin'],
                                 start=page_size*(page_number-1), page_length=page_size)
        totals = frappe.db.count('DMS First Checkin Customer')

        return gen_response(200, 'Thành công', {
            "data": data,
            "totals": totals,
            "page_number": page_number,
            "page_size": page_size
        })
    except Exception as e:
        return exception_handel(e)