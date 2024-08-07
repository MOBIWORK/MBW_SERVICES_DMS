# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
import json
class Address(Document):
	pass


def update_address(doc,method=None):
	for link in doc.links:
		if link.link_doctype == "Customer":
			customer = frappe.get_doc("Customer",{
				"name": link.link_name,
			})
			if customer and customer.customer_primary_address == doc.name :
				if customer.customer_location_primary != doc.address_location:
					customer.customer_location_primary = doc.address_location if (doc.address_location and json.loads(doc.address_location) and bool(json.loads(doc.address_location).get("long")) and bool(json.loads(doc.address_location).get("long"))) else None
					frappe.msgprint(f"update location for Customer : {link.link_name}", )
					customer.save(ignore_permissions = True)
	if doc.is_new() != False:
		current_address = frappe.db.exists("Address", doc.address_title)
		if not current_address:
			from  frappe.model.rename_doc import update_document_title
			update_document_title(doctype= "Address",
									docname= doc.name,
									name= doc.address_title,
									title= doc.address_title,
									enqueue= True,
									merge= 0,
									freeze= True,
									freeze_message= "Updating related fields..."
								)
	frappe.db.commit()
	pass