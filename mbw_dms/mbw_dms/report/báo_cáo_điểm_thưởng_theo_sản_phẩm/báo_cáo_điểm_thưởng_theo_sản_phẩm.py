# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe import _

def execute(filters=None):
	columns = [
        {
            "fieldname": "item",
            "fieldtype": "Link",
            "label": "Item Code",
            "options": "Item",
            "width": 200,
        },
        {
            "fieldname": "item_name",
            "fieldtype": "Data",
            "label": "Item Name",
            "width": 200,
        },
        {
            "fieldname": "number_so",
            "fieldtype": "Float",
            "label": "Tổng số đơn hàng",
            "non_negative": 1,
        },
        {
            "fieldname": "number_item",
            "fieldtype": "Float",
            "label": "Tổng số sản phẩm đã bán",
            "non_negative": 1,
        },
        {
            "fieldname": "total_point",
            "fieldtype": "Float",
            "label": "Tổng số điểm thưởng",
            "non_negative": 1,
        },
    ]

	data=get_data(filters)
	return columns, data

def get_data(filters):

    list_data = frappe.db.sql(f"""
    SELECT  itc.item_code, itc.item_name, SUM(itc.qty) number_item,  SUM(itc.point_reward) total_point, COUNT(DISTINCT its.sales_order) number_so
    FROM `tabMBW_ItemScore_SaleOrder` its
    JOIN
	    `tabMBW_ItemScore_Child` itc ON its.name = itc.parent
	WHERE  {get_filters(filters)}
	GROUP BY itc.item_code
    """
    , filters, as_dict=1,)
    data = []
    for order in list_data:
        itm = {"item": order.item_code, "item_name": order.item_name}

        itm["number_so"] = order.number_so
        itm["number_item"] = order.number_item
        itm["total_point"] = order.total_point
        data.append(itm)
    return data

def get_filters(filters):
    conditions = []
    if filters.get("from_date"):
        conditions.append("time >= %(from_date)s")
    if filters.get("to_date"):
        conditions.append("time <= %(to_date)s")
    if filters.get("item"):
        conditions.append("item_code = %(item)s")
    if filters.get("item_group"):
        conditions.append("item_group = %(item_group)s")

    return " AND ".join(conditions) if conditions else "1=1"  # Ensure valid SQL if no filters
