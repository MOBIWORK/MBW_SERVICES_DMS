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
def find(filters = {},filters_or={}, options = ["*"],page_length = 20, page =1,order_by = "modified desc",is_children = True,**data) :
	start = (page -1) * page_length
	results = frappe.db.get_list(DocName, filters=filters,or_filters=filters_or,fields= options,order_by=order_by, start=start,page_length=page_length,distinct=True)	
	fieldChil = [ "name",
			  	"item_code",
				"item_name",
				"item_unit",
				"item_price",
				"quantity",
				"total_cost",
				"exp_time",
				"update_at",
				"update_byname",
				"update_bycode"]
	if(is_children): 
		for inven in results:
			dataitem = frappe.get_doc("DMS Inventory",inven.get("name"))
			employee = frappe.get_value("Employee",inven.get("create_by"),["employee_name"])
			
			items = []
			if dataitem :
				items = dataitem.get("items")
			def filterFunction(value) :
				filters_product = True
				if  data.get("data").get("item_unit"):
					print("unit filter",value.item_unit, "==" , data.get("data").get("item_unit"),(value.item_unit ==  data.get("data").get("item_unit")))
					if value.item_unit:
						filters_product = filters_product & (value.item_unit ==  data.get("data").get("item_unit"))
					else:
						filters_product = filters_product & False
				if  data.get("data").get("item_code"):
					if value.item_code:
						filters_product = filters_product & (value.item_code ==  data.get("data").get("item_code"))
					else:
						filters_product = filters_product & False
				if data.get("data").get("expire_from"):
						if value.exp_time:
							filters_product = filters_product & (value.exp_time >=  data.get("data").get("expire_from"))
						else:
							filters_product = filters_product & True
				if  data.get("data").get("expire_to"):
					if value.exp_time:
						filters_product = filters_product & (value.exp_time <=  data.get("data").get("expire_to"))
					else:
						filters_product = filters_product & True
				# có bộ lọc thời gian cập nhật thì chỉ lấy những item có trhoiwf gian cập nhật
				if value.update_at and (data.get("data").get("update_at_from") or data.get("data").get("update_at_to") ):
					if data.get("data").get("update_at_from"):
						filters_product = filters_product & (value.update_at >= data.get("data").get("update_at_from"))
					if  data.get("data").get("update_at_to"):
						filters_product = filters_product & (value.update_at <=  data.get("data").get("update_at_to") )
				# không có bộ lọc thì lấy tât cả
				elif not (data.get("data").get("update_at_from") and data.get("data").get("update_at_to") ):
					return filters_product& True
				# ko có thời gian mà có bộ lọc thì ko lấy
				else :
					return filters_product &False
				return filters_product
			items = pydash.filter_(items,filterFunction)
			def chooseField(value) :
				new_value =  pydash.pick(value,fieldChil)
				new_value["employee_name"] = employee
				if new_value["exp_time"]:
					new_value["exp_time"] = datetime.combine(new_value["exp_time"], datetime.min.time()).timestamp()
				if new_value.get('update_at'):
					new_value["update_at"] = datetime.combine(new_value["update_at"], datetime.min.time()).timestamp()
				return new_value
			items = pydash.map_(items,chooseField)
			inven["items"] = items
			inven["create_time"] = inven["create_time"].timestamp()
			# items["employee_name"] = employee
	
	count = len(frappe.db.get_list(DocName, filters=filters,distinct=True))
	return {
		"data": results,
		"total": count,
		"page_number": page,
		"page_size": page_length
		}

def find_v2(where,page_length = 20, page =1,order_by = "modified desc",**data):
	offset = (page -1) * page_length
	query = f"""
    WITH NumberedGroups AS (
        SELECT 
            di.*,
            CONCAT(
                '[',
                GROUP_CONCAT(
                    CONCAT(
                       '{{"item_code":"', IFNULL(dii.item_code, ''), '",',
                            '"item_name":"', IFNULL(dii.item_name, ''), '",',
                            '"item_price":"', IFNULL(dii.item_price, ''), '",',
								'"item_unit":"', IFNULL(dii.item_unit, ''), '",',
								'"update_at":"', IFNULL(UNIX_TIMESTAMP(dii.update_at), ''), '",',
								'"update_byname":"', IFNULL(dii.update_byname, ''), '",',
								'"update_bycode":"', IFNULL(dii.update_bycode, ''), '",',
								'"quantity":"', IFNULL(dii.quantity, ''), '",',
								'"exp_time":"', IFNULL(UNIX_TIMESTAMP(dii.exp_time), '') , '"}}'
							) SEPARATOR ','
					),
					']'
				) AS items,
				ROW_NUMBER() OVER (ORDER BY di.modified) AS row_num
			FROM 
				`tabDMS Inventory` di
			LEFT JOIN 
				`tabDMS Inventory Items` dii
			ON 
				di.name = dii.parent
			{where}
			GROUP BY 
				di.customer_code
			ORDER BY 
				{order_by}
		)
		SELECT *
		FROM NumberedGroups
		WHERE row_num > {offset} AND row_num <= {offset} + {page_length};
	"""

	results = frappe.db.sql(query,as_dict=1)
	query2 = f"""
			WITH NumberedGroups AS (
        SELECT 
            di.*,
            CONCAT(
                '[',
                GROUP_CONCAT(
                    CONCAT(
                       '{{"item_code":"', IFNULL(dii.item_code, ''), '",',
                            '"item_name":"', IFNULL(dii.item_name, ''), '",',
                            '"item_price":"', IFNULL(dii.item_price, ''), '",',
								'"item_unit":"', IFNULL(dii.item_unit, ''), '",',
								'"update_at":"', IFNULL(UNIX_TIMESTAMP(dii.update_at), ''), '",',
								'"update_byname":"', IFNULL(dii.update_byname, ''), '",',
								'"update_bycode":"', IFNULL(dii.update_bycode, ''), '",',
								'"quantity":"', IFNULL(dii.quantity, ''), '",',
								'"exp_time":"', IFNULL(UNIX_TIMESTAMP(dii.exp_time), '') , '"}}'
							) SEPARATOR ','
					),
					']'
				) AS items,
				ROW_NUMBER() OVER (ORDER BY di.modified) AS row_num
			FROM 
				`tabDMS Inventory` di
			LEFT JOIN 
				`tabDMS Inventory Items` dii
			ON 
				di.name = dii.parent
			{where}
			GROUP BY 
				di.customer_code
			ORDER BY 
				{order_by}
		)
		SELECT COUNT(name) 
		FROM NumberedGroups
		"""
	lenRs = frappe.db.sql(query2,as_dict=1)[0]["COUNT(name)"]
	for row in results:
		import json
		row['items'] = json.loads(row['items']) if row['items'] else []
	return {
		"data": results,
		"total": lenRs,
		"page_number": page,
		"page_size": page_length
		}