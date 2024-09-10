# Copyright (c) 2024, MBW and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from pypika import CustomFunction
from datetime import datetime
import pydash
from frappe import _
from mbw_dms.api.common  import CommonHandle
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

def handle_filter_find_v2(body):
	# phan trang
	is_excel = body.get("is_excel")

	page_size = int(body.get("page_size")) if body.get("page_size") and int(body.get("page_size")) >= 20 else 20
	page_number = int(body.get("page_number")) if body.get("page_number") and int(body.get("page_number")) >=1 else 1
	# san pham
	expire_from = body.get("expire_from")
	expire_to = body.get("expire_to")
	update_at_from = body.get("update_at_from")
	update_at_to = body.get("update_at_to")
	item_code = body.get("item_code")
	# lay theo don vi tinh sp
	unit_product = body.get("unit_product")
	# nhan vien
	employee_sale = body.get("employee_sale")
	# nang cao: so luong sp khach hang dang ton, tong gia tri cac sp dang ton
	qty_inven_from = body.get("qty_inven_from")
	qty_inven_to = body.get("qty_inven_to")
	total_from = body.get("total_from")
	total_to = body.get("total_to")

	# Bộ lọc khách hàng
	customer = body.get("customer")
	# lọc nhân viên
	message = ""
	# tao filter
	filters = []
	# filter v2
	query = ""
	if employee_sale:
		filters.append(["create_by","=",employee_sale])
		query = CommonHandle.buildQuery(query,f"di.create_by = '{employee_sale}'")
	if item_code:
		filters.append(["item_code","=" ,item_code])
		query = CommonHandle.buildQuery(query,f"dii.item_code = '{item_code}'")
	if expire_from:
		expire_from = datetime.fromtimestamp(float(expire_from)).date()
		filters.append(["exp_time",">=",expire_from])
		query = CommonHandle.buildQuery(query,f"dii.exp_time >= '{expire_from}'")
	if expire_to:
		expire_to = datetime.fromtimestamp(float(expire_to)).date()
		filters.append(["exp_time","<=",expire_to])
		query = CommonHandle.buildQuery(query,f"dii.exp_time <= '{expire_to}'")
	# if expire_from and expire_to:
	#     filters.append(["exp_time","between",[expire_from,expire_to]])
	if update_at_from:
		update_at_from = datetime.fromtimestamp(float(update_at_from)).date()
		filters.append(["update_at",">=",update_at_from])
		query = CommonHandle.buildQuery(query,f"dii.update_at >= '{update_at_from}'")
	if update_at_to:
		update_at_to = datetime.fromtimestamp(float(update_at_to)).date()
		filters.append(["update_at","<=",update_at_to])
		query = CommonHandle.buildQuery(query,f"dii.update_at <= '{update_at_to}'")
	# if update_at_from and update_at_to: 
	#     filters.append(["update_at","between",[update_at_from,update_at_to]])
	if unit_product:
		filters.append(["item_unit","=" ,unit_product])
		query = CommonHandle.buildQuery(query,f"dii.item_unit = '{unit_product}'")
	if qty_inven_from:
		filters.append(["total_qty",">=", float(qty_inven_from)])
		query = CommonHandle.buildQuery(query,f"dii.total_qty >= '{qty_inven_from}'")
	if qty_inven_to:
		filters.append(["total_qty","<=", float(qty_inven_to)])
		query = CommonHandle.buildQuery(query,f"dii.total_qty <= '{qty_inven_to}'")
	# if qty_inven_from and qty_inven_to: 
	#     filters.append(["total_qty": ["between",[qty_inven_from,qty_inven_to]]])
	if total_from:
		filters.append(["total_cost",">=", float(total_from)])
		query = CommonHandle.buildQuery(query,f"dii.total_cost >= '{total_from}'")
	if total_to:
		filters.append(["total_cost","<=", float(total_to)])
		query = CommonHandle.buildQuery(query,f"dii.total_cost <= '{total_to}'")
	# if total_from and total_to: 
	#     filters.append(["total_cost": ["between",[float(total_from),float(total_to)]]])
	if customer:
		customer_code = frappe.db.get_value("Customer",customer,["customer_code"],as_dict=1)
		if customer_code:                
			filters.append(["customer_code","=", customer_code.get("customer_code")])
			customer = customer_code.get("customer_code")
			query = CommonHandle.buildQuery(query,f"di.customer_code = '{customer}'")
		else :
			message= _("Customer not have Code")
	options= ["*"]
	return find_v2(where=query,page=page_number,page_length=page_size,is_excel=is_excel)

def find_v2(where,page_length = 20, page =1,order_by = "modified desc",is_excel  = False):
	offset = (page -1) * page_length
	paging = "" if is_excel else f"WHERE row_num > {offset} AND row_num <= {offset} + {page_length};"
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
		{paging}
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