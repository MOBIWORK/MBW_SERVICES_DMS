# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt


import frappe
from frappe import _, msgprint, qb
from frappe.query_builder import Criterion

from erpnext import get_company_currency


def execute(filters=None):
	if not filters:
		filters = {}

	columns = get_columns(filters)
	entries = get_entries(filters)
	item_details = get_item_details()
	data = []

	company_currency = get_company_currency(filters.get("company"))

	for d in entries:
		data.append(
			[
                d.sales_person,
				d.total_base_net_amount,
			]
		)

	if data:
		total_row = [""] * len(data[0])
		data.append(total_row)
	chart_data = get_chart_data(data)
	return columns, data, None, chart_data


def get_columns(filters):

	columns = [
		{
			"label": _("Sales Person"),
			"options": "Sales Person",
			"fieldname": "sales_person",
			"fieldtype": "Link",
			"width": 200,
		},
		{
			"label": _("Amount"),
			"options": "currency",
			"fieldname": "amount",
			"fieldtype": "Currency",
			"width": 200,
		},
	]

	return columns


def get_entries(filters):
	date_field = "Sales Order" and "transaction_date" or "posting_date"
	conditions, values = get_conditions(filters, date_field)

	entries = frappe.db.sql(
		"""
			SELECT
			st.sales_person,
			SUM(
				CASE
					WHEN dt.status = "Closed" THEN (dt_item.base_net_rate * dt_item.qty * dt_item.conversion_factor)
					ELSE dt_item.base_net_amount
				END
			) AS total_base_net_amount,
			SUM(
				CASE
					WHEN dt.status = "Closed" THEN ((dt_item.base_net_rate * dt_item.qty * dt_item.conversion_factor) * st.allocated_percentage / 100)
					ELSE dt_item.base_net_amount * st.allocated_percentage / 100
				END
			) AS total_contribution_amt
		FROM
			`tabSales Order` dt
		JOIN
			`tabSales Order Item` dt_item ON dt.name = dt_item.parent
		JOIN
			`tabSales Team` st ON st.parent = dt.name AND st.parenttype = {}
		WHERE
			dt.docstatus = 1
			{} -- Replace with your dynamic conditions
		GROUP BY
			st.sales_person
		ORDER BY
    		total_base_net_amount DESC
		LIMIT {};
		""".format(
			"%s",
			conditions,
			filters["top_number"]
		),
		tuple(["Sales Order", *values]),
		as_dict=1,
	)

	return entries


def get_conditions(filters, date_field):
	conditions = [""]
	values = []
	if filters.get("from_date"):
		conditions.append(f"dt.{date_field}>=%s")
		values.append(filters["from_date"])

	if filters.get("to_date"):
		conditions.append(f"dt.{date_field}<=%s")
		values.append(filters["to_date"])

	items = get_items(filters)
	if items:
		conditions.append("dt_item.item_code in (%s)" % ", ".join(["%s"] * len(items)))
		values += items
	else:
		# return empty result, if no items are fetched after filtering on 'item group' and 'brand'
		conditions.append("dt_item.item_code = Null")

	return " and ".join(conditions), values


def get_items(filters):
	item = qb.DocType("Item")

	item_query_conditions = []
	if filters.get("item_group"):
		# Handle 'Parent' nodes as well.
		item_group = qb.DocType("Item Group")
		lft, rgt = frappe.db.get_all(
			"Item Group", filters={"name": filters.get("item_group")}, fields=["lft", "rgt"], as_list=True
		)[0]
		item_group_query = (
			qb.from_(item_group)
			.select(item_group.name)
			.where((item_group.lft >= lft) & (item_group.rgt <= rgt))
		)
		item_query_conditions.append(item.item_group.isin(item_group_query))
	if filters.get("brand"):
		item_query_conditions.append(item.brand == filters.get("brand"))

	items = qb.from_(item).select(item.name).where(Criterion.all(item_query_conditions)).run()
	return items


def get_item_details():
	item_details = {}
	for d in frappe.db.sql("""SELECT `name`, `item_group`, `brand` FROM `tabItem`""", as_dict=1):
		item_details.setdefault(d.name, d)

	return item_details

def get_chart_data(data):
	labels, datapoints = [], []

	for row in data:
		labels.append(row[0])
		datapoints.append(row[1])

	return {
		"data": {
			"labels": labels[:30],  # show max of 30 items in chart
			"datasets": [{"name": _("Total Sales Amount"), "values": datapoints[:30]}],
		},
		"type": "bar",
		"fieldtype": "Currency",
	}