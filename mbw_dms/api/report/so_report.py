import frappe

from mbw_dms.api.common import gen_response ,exception_handel, get_child_values_doc
from mbw_dms.api.validators import validate_filter_timestamp

# Báo cáo tổng hợp đặt hàng
@frappe.whitelist(methods='GET')
def so_report(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type='start')(kwargs.get('from_date')) if kwargs.get('from_date') else None
        to_date = validate_filter_timestamp(type='end')(kwargs.get('to_date')) if kwargs.get('to_date') else None
        page_size =  int(kwargs.get('page_size', 20))
        page_number = int(kwargs.get('page_number')) if kwargs.get('page_number') and int(kwargs.get('page_number')) >=1 else 1

        if from_date and to_date:
            filters["creation"] = ["between",[from_date,to_date]]

        if kwargs.get('customer'):
            filters['customer'] = kwargs.get('customer ')
        if kwargs.get('territory'):
            filters['territory'] = kwargs.get('territory')
        if kwargs.get('warehouse'):
            filters['warehouse'] = kwargs.get('warehouse')
        if kwargs.get('company'):
            filters['company'] = kwargs.get('company')
        if kwargs.get('employee'):
            filters['owner '] = kwargs.get('employee')
        filters['docstatus'] = 1

        field_items = ['name', 'item_name', 'item_code', 'brand', 'rate', 'qty', 'amount', 'discount_amount', 'discount_percentage']
        totals = {
            'sum_total': 0,
            'sum_vat': 0,
            'sum_discount_amount': 0,
            'sum_grand_total': 0,
        }

        sale_orders =frappe.db.get_list('Sales Order', 
                                       filters=filters, 
                                       fields=['name', 'customer', 'territory', 'warehouse', 'transaction_date','total', 'grand_total', 'company', 'owner', 'discount_amount'], 
                                       order_by='transaction_date desc', 
                                       start=page_size*(page_number-1), page_length=page_size)
        for i in sale_orders:
            if i['owner'] == 'Administrator':
                i['employee'] = 'Administrator'
            else:
                i['employee'] = frappe.get_value('Employee', {'user_id': i['owner']}, 'employee_name')
            i['tax_amount'] = frappe.get_value('Sales Taxes and Charges', {'parent': i['name']}, 'tax_amount')
            i['items'] = get_child_values_doc(doctype='Sales Order', master_name=i['name'], fields_to_get=field_items, chil_name='items')
            totals['sum_total'] += i['total']
            totals['sum_vat'] += i['tax_amount']
            totals['sum_discount_amount'] += i['discount_amount']
            totals['sum_grand_total'] += i['grand_total']
        count_data = frappe.db.count('Sales Order', filters=filters)

        return gen_response(200, 'Thành công', {
            "data": sale_orders,
            "sum": totals,
            "page_number": page_number,
            "page_size": page_size,
            "totals": count_data
        })
    except Exception as e:
        return exception_handel(e)
    
# Báo cáo tổng hợp bán hàng
@frappe.whitelist(methods='GET')
def si_report(**kwargs):
    try:
        filters = {}
        from_date = validate_filter_timestamp(type='start')(kwargs.get('from_date')) if kwargs.get('from_date') else None
        to_date = validate_filter_timestamp(type='end')(kwargs.get('to_date')) if kwargs.get('to_date') else None
        page_size =  int(kwargs.get('page_size', 20))
        page_number = int(kwargs.get('page_number')) if kwargs.get('page_number') and int(kwargs.get('page_number')) >=1 else 1

        if from_date and to_date:
            filters["creation"] = ["between",[from_date,to_date]]

        if kwargs.get('customer'):
            filters['customer'] = kwargs.get('customer ')
        if kwargs.get('territory'):
            filters['territory'] = kwargs.get('territory')
        if kwargs.get('warehouse'):
            filters['warehouse'] = kwargs.get('warehouse')
        if kwargs.get('company'):
            filters['company'] = kwargs.get('company')
        if kwargs.get('employee'):
            filters['owner '] = kwargs.get('employee')
        filters['docstatus'] = 1

        field_items = ['name', 'item_name', 'item_code', 'brand', 'rate', 'qty', 'amount', 'discount_amount', 'discount_percentage']
        totals = {
            'sum_total': 0,
            'sum_vat': 0,
            'sum_discount_amount': 0,
            'sum_grand_total': 0,
        }

        sale_invoices =frappe.db.get_list('Sales Invoice', 
                                       filters=filters, 
                                       fields=['name', 'customer', 'territory', 'warehouse', 'posting_date','total', 'grand_total', 'company', 'owner', 'discount_amount'], 
                                       start=page_size*(page_number-1), page_length=page_size)
        for i in sale_invoices:
            if i['owner'] == 'Administrator':
                i['employee'] = 'Administrator'
            else:
                i['employee'] = frappe.get_value('Employee', {'user_id': i['owner']}, 'employee_name')
            i['tax_amount'] = frappe.get_value('Sales Taxes and Charges', {'parent': i['name']}, 'tax_amount')
            i['items'] = get_child_values_doc(doctype='Sales Invoice', master_name=i['name'], fields_to_get=field_items, chil_name='items')
            totals['sum_total'] += i['total']
            totals['sum_vat'] += i['tax_amount']
            totals['sum_discount_amount'] += i['discount_amount']
            totals['sum_grand_total'] += i['grand_total']
        count_data = frappe.db.count('Sales Invoice', filters=filters)

        return gen_response(200, 'Thành công', {
            "data": sale_invoices,
            "sum": totals,
            "page_number": page_number,
            "page_size": page_size,
            "totals": count_data
        })
    except Exception as e:
        return exception_handel(e)