# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters=None):
	columns = get_column()
	data = get_data(filters)
	return columns, data

def get_column():
	columns = [{"label": _("Date"), "fieldname": "date", "fieldtype": "Date", "width": 110},
			   {
				   "label": _("Sales Invoice"),
				   "fieldname": "sales_invoice",
				   "fieldtype": "Link",
				   "options": "Sales Invoice",
				   "width": 130,
			   },
			   {
				   "label": _("Sales Person"),
				   "fieldname": "sales_person",
				   "fieldtype": "Link",
				   "options": "Sales Person",
				   "width": 130,
			   },
			   {"label": _("Status"), "fieldname": "status", "fieldtype": "Data", "width": 100},
			   {
				   "label": _("Customer"),
				   "fieldname": "customer",
				   "fieldtype": "Link",
				   "options": "Customer",
				   "width": 130,
			   },
			   {
				   "label": _("Customer"),
				   "fieldname": "customer_name",
				   "fieldtype": "Link",
				   "options": "Customer",
				   "width": 130,
			   },
			   {
				   "label": _("Item Code"),
				   "fieldname": "item_code",
				   "fieldtype": "Link",
				   "options": "Item",
				   "width": 120,
			   },
			   {
				   "label": _("Item Name"),
				   "fieldname": "item_name",
				   "fieldtype": "Link",
				   "options": "Item",
				   "width": 100,
			   },
			   {
				   "label": _("Brand"),
				   "fieldname": "brand",
				   "fieldtype": "Link",
				   "options": "Brand",
				   "width": 100,
			   },
			   {
				   "label": _("Qty"),
				   "fieldname": "qty",
				   "fieldtype": "Float",
				   "width": 100,
				   "convertible": "qty",
			   },
			   {
				   "label": _("UOM"),
				   "fieldname": "uom",
				   "fieldtype": "Link",
				   "options": "UOM",
				   "width": 100,
			   },
			   {
				   "label": _("Amount"),
				   "fieldname": "amount",
				   "fieldtype": "Currency",
				   "width": 130,
				   "options": "Company:company:default_currency",
				   "convertible": "rate",
			   },
			   {
				   "label": _("Tổng số lít"),
				   "fieldname": "total_litres",
				   "fieldtype": "Float",
				   "width": 100,
			   },
			   {
				   "label": _("Company"),
				   "fieldname": "company",
				   "fieldtype": "Link",
				   "options": "Company",
				   "width": 150,
			   },
			   ]
	return columns

def get_data(filters):
	query = f"""SELECT si.name, si.posting_date, si.status, si.customer, si.customer_name, si.company, st.sales_person,
				sii.brand, sii.item_code, sii.item_name, sii.qty, sii.uom, sii.amount, sii.custom_total_litres_base_on_1_item
				FROM `tabSales Invoice` si
				JOIN `tabSales Invoice Item` sii ON sii.parent = si.name
				LEFT JOIN `tabSales Team` st ON si.name = st.parent
				WHERE si.docstatus = 1 {get_filters(filters)}"""
	data_list = frappe.db.sql(query, filters, as_dict=True)
	data = []
	for d in data_list:
		item = {"date": d.posting_date,
				"sales_invoice": d.name,
				"status": d.status,
				"customer": d.customer,
				"customer_name": d.customer_name,
				"item_code": d.item_code,
				"item_name": d.item_name,
				"qty": d.qty,
				"uom": d.uom,
				"amount": d.amount,
				"total_litres": d.custom_total_litres_base_on_1_item,
				"company": d.company,
				"brand": d.brand,
				"sales_person": d.sales_person,
				}
		data.append(item)
	return data

def get_filters(filters):
	conditions = ""
	if filters.get("from_date"):
		conditions += " AND si.posting_date >= %(from_date)s"
	if filters.get("to_date"):
		conditions += " AND si.posting_date <= %(to_date)s"
	if filters.get("customer"):
		conditions += " AND si.customer = %(customer)s"
	if filters.get("sales_invoice"):
		conditions += " AND si.name = %(sales_invoice)s"
	if filters.get("brand"):
		conditions += " AND sii.brand = %(brand)s"
	if filters.get("item"):
		conditions += " AND sii.item_code = %(item)s"
	if filters.get("sales_person"):
		conditions += " AND st.sales_person IN %(sales_person)s"
	return conditions