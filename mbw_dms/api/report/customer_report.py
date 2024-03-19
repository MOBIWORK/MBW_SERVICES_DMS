import frappe

from mbw_dms.api.common import gen_response ,exception_handel


@frappe.whitelist(methods='GET')
def customer_report(**kwargs):
    try:
        filters = {}
        page_size =  int(kwargs.get('page_size', 20))
        page_number = int(kwargs.get('page_number')) if kwargs.get('page_number') and int(kwargs.get('page_number')) >=1 else 1

        if kwargs.get('customer_type'):
            filters['custpmer_type'] = kwargs.get('customer_type')
        if kwargs.get('customer_group'):
            filters['custpmer_group'] = kwargs.get('customer_group')
        if kwargs.get('territory'):
            filters['territory'] = kwargs.get('territory')
        if kwargs.get('has_sales_order'):
            filters['has_sales_order'] = kwargs.get('has_sales_order')

        list_customers = frappe.db.get_list('Customer', 
                                       filters=filters, 
                                       fields=["name", "owner", "creation", "customer_name", "customer_code", "customer_type", "tax_id", "customer_group", "territory", "customer_primary_contact", "customer_primary_address", "mobile_no"], 
                                       start=page_size*(page_number-1), page_length=page_size)
        for i in list_customers:
            # Phòng/nhóm
            i['sales_team'] = frappe.get_value('Sales Team', {'parent': i['name']}, 'sales_person')
            # Nhân viên
            if i['owner'] == 'Administrator':
                i['employee'] = [{
                    'name': 'Administrator',
                    'employee_name': 'Administrator'
                }]
            else:
                i['employee'] = frappe.db.get_all('Employee', filters={'user_id': i['owner']}, fields=['name', 'employee_name'])

            # Số lần viếng thăm
            i['first_checkin'] = ''
            i['last_checkin'] = ''
            i['totals_checkin'] = frappe.db.count('DMS Checkin', {'kh_ten': i['name']})
            first_checkin = frappe.db.get_all('DMS Checkin', filters={'kh_ten': i['name']}, order_by='creation asc', fields=['UNIX_TIMESTAMP(creation) as creation'], limit=1)
            last_checkin = frappe.db.get_all('DMS Checkin', filters={'kh_ten': i['name']}, order_by='creation desc', fields=['UNIX_TIMESTAMP(creation) as creation'], limit=1)
            if first_checkin:
                i['first_checkin'] = first_checkin[0].creation
            if last_checkin:
                i['last_checkin'] = last_checkin[0].creation

            # Nguồn
            i['source'] = ''

            # Số đơn hàng
            i['totals_so'] = frappe.db.count('Sales Order', {'customer_name': i['name']})
            # Đơn hàng cuối
            i['last_sale_order'] = ''
            last_so = frappe.db.get_all('Sales Order', filters={'customer_name': i['name']}, order_by='creation desc', fields=['UNIX_TIMESTAMP(creation) as creation'], limit=1)
            if last_so:
                i['last_sale_order'] = last_so[0].creation
        
        # Tổng số khách hàng
        customer_count = frappe.db.count('Customer')

        return gen_response(200, 'Thành công', {
            "data": list_customers,
            "totals": customer_count,
            "page_number": page_number,
            "page_size": page_size,
        })
    except Exception as e:
        return exception_handel(e)