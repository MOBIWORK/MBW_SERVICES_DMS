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
            "fieldname": "sales_order",
            "fieldtype": "Link",
            "label": "Sales Order",
            "options": "Sales Order",
            "width": 200
        },
        {
            "fieldname": "customer",
            "fieldtype": "Link",
            "label": "Customer",
            "options": "Customer",
            "width": 200
        },
        {
            "fieldname": "item",
            "fieldtype": "Link",
            "label": "Item",
            "options": "Item",
            "width": 200
        },
        {
            "fieldname": "qty",
            "fieldtype": "Float",
            "label": "Quantity",
            "non_negative": 1,
        },
        {
            "fieldname": "point_per_unit",
            "fieldtype": "Float",
            "label": "Point per Unit",
            "non_negative": 1,
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
    SELECT its.sales_order, its.customer, its.sales_person, itc.item_code, itc.item_name, itc.qty, itc.point_per_unit, itc.point_reward
    FROM `tabMBW_ItemScore_SaleOrder` its
    JOIN
	    `tabMBW_ItemScore_Child` itc ON its.name = itc.parent
	WHERE  {get_filters(filters)}
    """
    , filters, as_dict=1,)
    data = []
    for order in list_data:
        itm = {"sales_order": order.sales_order,
               "customer": order.customer,
               "sales_person": order.sales_person,}

        itm["item"] = order.item_code
        itm["qty"] = order.qty
        itm["point_per_unit"] = order.point_per_unit
        itm["total_point"] = order.point_reward
        data.append(itm)
    return data

def get_filters(filters):
    conditions = []
    if filters.get("from_date"):
        conditions.append("time >= %(from_date)s")
    if filters.get("to_date"):
        conditions.append("time <= %(to_date)s")
    if filters.get("sales_order"):
        conditions.append("sales_order = %(sales_order)s")
    if filters.get("customer"):
        conditions.append("customer = %(customer)s")
    if filters.get("sales_person"):
        conditions.append("sales_person = %(sales_person)s")
    if filters.get("item_group"):
        conditions.append("item_group = %(item_group)s")

    return " AND ".join(conditions) if conditions else "1=1"  # Ensure valid SQL if no filters
