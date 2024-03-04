# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Address(Document):
	def on_update(self):
		frappe.msgprint("save")
	pass
