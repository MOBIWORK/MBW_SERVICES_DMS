# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe import _

def execute(filters=None):
    if not filters:
        filters = {}

    columns = get_columns()
    data = get_sales_invoices(filters)
    
    # Tính tổng số lít và tổng tiền
    total_liters = sum(d["total_liters"] for d in data)
    grand_total = sum(d["grand_total"] for d in data)

    # Thêm dòng tổng vào cuối dữ liệu
    data.append({
        "sales_invoice": _("Totals"),
        "total_liters": total_liters,
        "grand_total": grand_total
    })

    return columns, data

def get_columns():
    return [
        {"label": _("Sales Invoice"), "fieldname": "sales_invoice", "fieldtype": "Link", "options": "Sales Invoice", "width": 200},
        {"label": _("Posting Date"), "fieldname": "posting_date", "fieldtype": "Date", "width": 150},
        {"label": _("Sales Person"), "fieldname": "sales_person", "fieldtype": "Data", "width": 200},
        {"label": _("Customer Name"), "fieldname": "customer_name", "fieldtype": "Data", "width": 200},
        {"label": _("Total Liters"), "fieldname": "total_liters", "fieldtype": "Float", "width": 150},
        {"label": _("Grand Total"), "fieldname": "grand_total", "fieldtype": "Currency", "options": "currency", "width": 150},
    ]

def get_sales_invoices(filters):
    conditions = build_conditions(filters)

    query = f"""
        SELECT
            si.name as sales_invoice,
            si.custom_sale_person as sales_person,
            si.customer_name as customer_name,
            si.custom_total_litres_in_order as total_liters,
            si.grand_total as grand_total,
            si.posting_date as posting_date
        FROM
            `tabSales Invoice` si
        WHERE
            si.docstatus = 1 {conditions}
        GROUP BY
            si.name
        ORDER BY
            si.posting_date DESC
    """

    return frappe.db.sql(query, filters, as_dict=True)

def build_conditions(filters):
    conditions = ""

    if filters.get("sales_person"):
        conditions += " AND si.custom_sale_person = %(sales_person)s"

    if filters.get("from_date"):
        conditions += " AND si.posting_date >= %(from_date)s"

    if filters.get("to_date"):
        conditions += " AND si.posting_date <= %(to_date)s"

    if filters.get("customer"):
        conditions += " AND si.customer = %(customer)s"

    return conditions
