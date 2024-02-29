# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from pypika import CustomFunction
from datetime import datetime
UNIX_TIMESTAMP = CustomFunction('UNIX_TIMESTAMP', ['day'])
class DMSInventory(Document):
	pass

DocName = "DMS Inventory"
DocNameChild = "DMS Inventory Items"
Inventory = frappe.qb.DocType(DocName)
InventoryItem = frappe.qb.DocType(DocNameChild)
def find(filters = {}, options = ["*"],page_length = 20, page =1,order = "name desc",is_children = True,**data) :
	results = frappe.db.get_list(DocName, filters=filters,fields= options, start=(page -1) * page_length,
    page_length=page_length,
	parent_doctype=DocName
	)	
	if(is_children): 
		for inven in results:
			filters_product = (Inventory.name == inven.get("name")) 
			if  data.get("data").get("item_unit"):
				filters_product = filters_product & (InventoryItem.item_unit ==  data.get("data").get("item_unit"))
			if data.get("data").get("expire_from"):
				filters_product = filters_product & (InventoryItem.exp_time >=  data.get("data").get("expire_from"))
			if  data.get("data").get("expire_to"):
				filters_product = filters_product & (InventoryItem.exp_time <=  data.get("data").get("expire_to"))
			# print("filters_product",(Inventory.name == inven.get("name")) & (InventoryItem.item_unit == data.get("item_unit")))
			dataitem = (frappe.qb.from_(InventoryItem)
				.inner_join(Inventory)
				.on(Inventory.name == InventoryItem.parent)
				.where(filters_product)
				.select(InventoryItem.item_code,InventoryItem.item_name,InventoryItem.item_price
						,InventoryItem.item_unit,UNIX_TIMESTAMP(InventoryItem.update_at).as_('update_at'),InventoryItem.update_byname
						,InventoryItem.update_bycode,InventoryItem.quanity,UNIX_TIMESTAMP(InventoryItem.exp_time).as_('exp_time'))
				).run(as_dict=1)
			inven["items"] = dataitem
			inven["create_time"] = inven["create_time"].timestamp()
	
	return results