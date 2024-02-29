# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class DMSInventory(Document):
	pass

DocName = "DMS Inventory"
DocNameChild = "DMS Inventory Items"
Inventory = frappe.qb.DocType(DocName)
InventoryItem = frappe.qb.DocType(DocNameChild)
def find(filters = {}, options = ["*"],page_length = 20, page =1,order = "name desc",is_children = True) :
	results = frappe.db.get_list(DocName, filters=filters,fields= options, start=(page -1) * page_length,
    page_length=page_length,
	parent_doctype=DocName,
	join= {
		"DMS Inventory Items": "`DMS Inventory Items`.parent = `DMS Inventory`.name"
		}
	)

	if(is_children): 
		for inven in results:
			dataitem = (frappe.qb.from_(Inventory)
				.inner_join(InventoryItem)
				.on(Inventory.name == InventoryItem.parent)
				.where(Inventory.name == inven.get("name"))
				.select(InventoryItem.item_code,InventoryItem.item_name,InventoryItem.item_price
						,InventoryItem.item_unit,InventoryItem.update_at,InventoryItem.update_byname
						,InventoryItem.update_bycode,InventoryItem.quanity,InventoryItem.exp_time)
				).run(as_dict=1)
			inven["items"] = dataitem
	
	return results