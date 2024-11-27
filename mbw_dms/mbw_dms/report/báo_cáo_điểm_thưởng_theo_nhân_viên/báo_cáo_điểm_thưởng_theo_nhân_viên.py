# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe import _

def execute(filters=None):
	columns = [
        {
            "fieldname": "sales_person",
            "fieldtype": "Link",
            "label": "Sales Person",
            "options": "Sales Person",
            "width": 200
        },
        {
            "fieldname": "number_so",
            "fieldtype": "Int",
            "label": "Number of SO",
            "width": 200
        },
        {
            "fieldname": "number_item",
            "fieldtype": "Int",
            "label": "Number of Item",
            "width": 200
        },
        {
            "fieldname": "total_point",
            "fieldtype": "Float",
            "label": "Total Point",
            "non_negative": 1,
        },
    ]

	data=get_data(filters)
	return columns, data

def get_data(filters):

    list_data = frappe.db.sql(f"""
    SELECT its.sales_person,SUM(itc.qty) number_item, SUM(itc.point_reward) total_point, COUNT(DISTINCT its.sales_order) number_so
    FROM `tabMBW_ItemScore_SaleOrder` its
    JOIN
	    `tabMBW_ItemScore_Child` itc ON its.name = itc.parent
	WHERE  {get_filters(filters)}
	GROUP BY its.sales_person
    """
    , filters, as_dict=1,)
    data = []
    for order in list_data:
        department = None
        try:
            sales_person = frappe.get_doc("Sales Person", order.sales_person)
            department = sales_person.department
        except Exception:
            frappe.clear_messages()
        itm = {"sales_person": order.sales_person}
        itm["number_so"] = order.number_so
        itm["number_item"] = order.number_item
        itm["total_point"] = order.total_point
        if filters.get("department") and filters.get("department") != "All Departments" and (filters.get("department") != department or not department):
            print(department)
            continue
        data.append(itm)
    return data

def get_filters(filters):
    conditions = []
    if filters.get("from_date"):
        conditions.append("time >= %(from_date)s")
    if filters.get("to_date"):
        conditions.append("time <= %(to_date)s")
    if filters.get("sales_person"):
        conditions.append("sales_person = %(sales_person)s")
    return " AND ".join(conditions) if conditions else ""  # Ensure valid SQL if no filters
