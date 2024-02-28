# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class DMSInventory(Document):
	pass

DocName = "DMS Inventory"
def find(filters = {}, options = ["*"],page_length = 20, page =1,order = "name desc") :
	return frappe.db.get_list(DocName, filters=filters,fields= options, start=(page -1) * page_length,
    page_length=page_length,as_list=True)