# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document



class MBW_ItemScore_SaleOrder(Document):
	def before_save(self):
		self.total_rewards_point = 0
		for item in self.items:
			self.total_rewards_point += item.point_reward
		sales_order = frappe.get_doc("Sales Order", self.sales_order)
		for person in sales_order.sales_team:
			self.sales_person = person.sales_person

def create_ItemScore_SaleOrder(sales_order):
	existing_record = frappe.db.exists("MBW_ItemScore_SaleOrder", {"sales_order": sales_order.name})
	if existing_record:
		record = frappe.get_doc("MBW_ItemScore_SaleOrder", {"sales_order": sales_order.name})
		record.delete()
	from frappe.model.mapper import get_mapped_doc
	doclist = get_mapped_doc("Sales Order",
							 sales_order.name,
							 {"Sales Order": {
								 "doctype": "MBW_ItemScore_SaleOrder",
								 "field_map": {
									 "name_series": "sales_order",
									 "transaction_date": "time"
								 },
								 "field_no_map": ["payment_terms_template"],
							 },
								 "Sales Order Item": {
									 "doctype": "MBW_ItemScore_Child",
									 "field_map": {
										 "name": "so_detail",
										 "parent": "sales_order",
									 },
									 "field_no_map": ["point_reward"],
								 }, })

	for item in doclist.items:
		itm = frappe.get_doc("Item", item.item_code)
		item.point_reward = itm.custom_point_reward * item.qty
	doclist.save()