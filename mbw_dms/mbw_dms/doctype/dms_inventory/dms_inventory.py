# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from pypika import CustomFunction
from datetime import datetime
import pydash
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
	fieldChil = [ "name",
			  	"item_code",
				"item_name",
				"item_unit",
				"item_price",
				"quanity",
				"exp_time",
				"update_at",
				"update_byname",
				"update_bycode"]
	if(is_children): 
		for inven in results:
			dataitem = frappe.get_doc("DMS Inventory",inven.get("name"))
			items = []
			if dataitem :
				items = dataitem.get("items")
			def filterFunction(value) :
				filters_product = True
				if  data.get("data").get("item_unit"):
					filters_product = filters_product & (value.item_unit ==  data.get("data").get("item_unit"))
				if  data.get("data").get("item_code"):
					filters_product = filters_product & (value.item_code ==  data.get("data").get("item_code"))
				if data.get("data").get("expire_from"):
					filters_product = filters_product & (value.exp_time >=  data.get("data").get("expire_from"))
				if  data.get("data").get("expire_to"):
					filters_product = filters_product & (value.exp_time <=  data.get("data").get("expire_to"))
				if data.get("data").get("update_at_from"):
					filters_product = filters_product & (value.exp_time >=  data.get("data").get("update_at_from"))
				if  data.get("data").get("update_at_to"):
					filters_product = filters_product & (value.exp_time <=  data.get("data").get("update_at_to"))
				return filters_product
			items = pydash.filter_(items,filterFunction)
			def chooseField(value) :
				new_value =  pydash.pick(value,fieldChil)
				new_value["exp_time"] =datetime.combine(new_value["exp_time"], datetime.min.time()).timestamp()
				new_value["update_at"] = datetime.combine(new_value["update_at"], datetime.min.time()).timestamp()
				return new_value
			items = pydash.map_(items,chooseField)
			inven["items"] = items
			inven["create_time"] = inven["create_time"].timestamp()
	
	return results