# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters=None):
	columns = get_column()
	data = get_data(filters)
	return columns, data

def get_data(filters):
	query = f"""
	SELECT dn.name , dn.pick_list, dn.posting_date, dn.customer, idn.qty, idn.item_code, idn.item_name, idn.uom, stc.sales_person
	FROM `tabDelivery Note` dn
	JOIN `tabDelivery Note Item` idn ON dn.name = idn.parent
	LEFT JOIN `tabSales Team` stc ON stc.parent = dn.name
	WHERE  {get_filters(filters)}
	"""
	data_query = frappe.db.sql(query, filters, as_dict=True)
	data = []
	for item in data_query:
		if item.pick_list:
			itm = {
				"pick_list": item.pick_list,
				"posting_date": item.posting_date,
				"customer": item.customer,
				"item": item.item_code,
				"item_name": item.item_name,
				"uom": item.uom,
				"delivery_note": item.name,
				"qty": item.qty,
				"sales_person": item.sales_person,
			}
			pick_list = frappe.get_doc("Pick List", item.pick_list)
			itm["custom_shipper_name"] = pick_list.custom_shipper_name
			if filters.get("custom_shipper_name") and filters.get("custom_shipper_name") != pick_list.custom_shipper:
				continue
			data.append(itm)
	return data

def get_filters(filters):
	conditions = []
	if filters.get("from_date"):
		conditions.append("posting_date >= %(from_date)s")
	if filters.get("to_date"):
		conditions.append("posting_date <= %(to_date)s")
	if filters.get("item"):
		conditions.append("item_code = %(item)s")
	if filters.get("pick_list"):
		conditions.append("pick_list = %(pick_list)s")
	if filters.get("customer"):
		conditions.append("customer = %(customer)s")
	if filters.get("sales_person"):
		conditions.append("sales_person = %(sales_person)s")
	if filters.get("delivery_note"):
		conditions.append("dn.name = %(delivery_note)s")


	return " AND ".join(conditions) if conditions else "1=1"

def get_column():
	columns = [
		{
			"fieldname": "pick_list",
			"label": _("Pick List"),
			"fieldtype": "Link",
			"options": "Pick List"
		},
		{
			"fieldname": "custom_shipper_name",
			"label": _("Shipper"),
			"fieldtype": "Data",
		},
		{
			"fieldname": "delivery_note",
			"label": _("Delivery Note"),
			"fieldtype": "Link",
			"options": "Delivery Note"
		},
		{
			"fieldname": "posting_date",
			"label": _("Posting Date"),
			"fieldtype": "Date",
		},
		{
			"fieldname": "item",
			"label": _("Item"),
			"fieldtype": "Link",
			"options": "Item"
		},
		{
			"fieldname": "item_name",
			"label": _("Item Name"),
			"fieldtype": "Data"
		},
		{
			"fieldname": "customer",
			"label": _("Customer"),
			"fieldtype": "Link",
			"options": "Customer"
		},
		{
			"fieldname": "qty",
			"label": _("Quantity"),
			"fieldtype": "Float",
		},
		{
			"fieldname": "uom",
			"label": _("UOM"),
			"fieldtype": "Link",
			"options": "UOM"
		},
		{
			"fieldname": "sales_person",
			"label": _("Sales Person"),
			"fieldtype": "Link",
			"options": "Sales Person"
		},
	]
	return columns