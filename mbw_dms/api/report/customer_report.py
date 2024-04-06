import frappe

from mbw_dms.api.common import gen_response ,exception_handle


@frappe.whitelist(methods='GET')
def customer_report(**kwargs):
    try:
        filters = []
        page_size =  int(kwargs.get('page_size', 20))
        page_number = int(kwargs.get('page_number')) if kwargs.get('page_number') and int(kwargs.get('page_number')) >=1 else 1
        customer_type = kwargs.get('customer_type')
        customer_group = kwargs.get('customer_group')
        territory = kwargs.get('territory')
        has_sales_order = kwargs.get('has_sales_order')
        employee = kwargs.get('employee')
        department = kwargs.get('department')

        if customer_type:
            filters.append(f"cus.customer_type='{customer_type}'")
        if customer_group:
            filters.append(f"cus.customer_group='{customer_group}'")
        if territory:
            filters.append(f"cus.territory='{territory}'")
        if has_sales_order:
            filters.append(f"cus.has_sales_order={has_sales_order}")
        if employee:
            filters.append(f"em.employee_name='{employee}'")
        if department:
            filters.append(f"em.department='{department}'")

        where_conditions = " AND ".join(filters)

        sql_query = """
            SELECT cus.name as cus_id, cus.owner, UNIX_TIMESTAMP(cus.creation) as creation, cus.customer_name, cus.customer_code, cus.customer_type, cus.tax_id, cus.customer_group, cus.territory, cus.customer_primary_contact as contact, cus.customer_primary_address as address,
            cus.mobile_no as phone, em.name as employee_id, em.employee_name, em.department
            FROM `tabCustomer` cus
            JOIN `tabEmployee` em ON cus.owner = em.user_id
        """
        if where_conditions:
            sql_query += " WHERE {}".format(where_conditions)
        sql_query += " LIMIT %s OFFSET %s"

        limit = page_size
        offset = (page_number - 1) * limit
        list_customers = frappe.db.sql(sql_query, (limit, offset), as_dict=True)

        totals = {
            'sum_checkin': 0,
            'sum_so': 0,
        }
        if list_customers:
            for i in list_customers:
                # Số lần viếng thăm
                i['first_checkin'] = ''
                i['last_checkin'] = ''
                i['totals_checkin'] = frappe.db.count('DMS Checkin', {'kh_ten': i['cus_id']})
                if i['totals_checkin']:
                    totals['sum_checkin'] += i['totals_checkin']
                first_checkin = frappe.db.get_all('DMS Checkin', filters={'kh_ten': i['cus_id']}, order_by='creation asc', fields=['UNIX_TIMESTAMP(creation) as creation'], limit=1)
                last_checkin = frappe.db.get_all('DMS Checkin', filters={'kh_ten': i['cus_id']}, order_by='creation desc', fields=['UNIX_TIMESTAMP(creation) as creation'], limit=1)
                if first_checkin:
                    i['first_checkin'] = first_checkin[0].creation
                if last_checkin:
                    i['last_checkin'] = last_checkin[0].creation

                # Nguồn
                i['source'] = ''

                # Số đơn hàng
                i['totals_so'] = frappe.db.count('Sales Order', {'customer_name': i['cus_id']})
                if i['totals_so']:
                    totals['sum_so'] += i['totals_so']
                # Đơn hàng cuối
                i['last_sale_order'] = ''
                last_so = frappe.db.get_all('Sales Order', filters={'customer_name': i['cus_id']}, order_by='creation desc', fields=['UNIX_TIMESTAMP(creation) as creation'], limit=1)
                if last_so:
                    i['last_sale_order'] = last_so[0].creation
        
        # Tổng số khách hàng
        sql_count = """
            SELECT COUNT(*)
            FROM `tabCustomer` cus
            JOIN `tabEmployee` em ON cus.owner = em.user_id
        """
        customer_count = frappe.db.sql(sql_count, as_dict=True)

        return gen_response(200, 'Thành công', {
            "data": list_customers,
            "totals_cus": customer_count[0]['COUNT(*)'],
            "sum": totals,
            "page_number": page_number,
            "page_size": page_size,
        })
    except Exception as e:
        return exception_handle(e)