# Copyright (c) 2024, MBW Company
import frappe
import os
from frappe import _
from frappe.desk.doctype.global_search_settings.global_search_settings import (
	update_global_search_doctypes,
)

from frappe.desk.page.setup_wizard.setup_wizard import make_records
from erpnext.setup.setup_wizard.operations.install_fixtures import (
	make_records,
	update_selling_defaults,
	update_buying_defaults,
	add_uom_data,
	update_item_variant_settings,
	update_global_search_doctypes,
	read_lines
)

from erpnext.regional.address_template.setup import set_up_address_templates
from frappe import _

def install(country=None):
	records = [
		# ensure at least an empty Address Template exists for this Country
		{"doctype": "Address Template", "country": country},
		# item group
		{
			"doctype": "Item Group",
			"item_group_name": _("All Item Groups"),
			"is_group": 1,
			"parent_item_group": "",
		},
		{
			"doctype": "Item Group",
			"item_group_name": _("Products"),
			"is_group": 0,
			"parent_item_group": _("All Item Groups"),
			"show_in_website": 1,
		},
		{
			"doctype": "Item Group",
			"item_group_name": _("Raw Material"),
			"is_group": 0,
			"parent_item_group": _("All Item Groups"),
		},
		{
			"doctype": "Item Group",
			"item_group_name": _("Services"),
			"is_group": 0,
			"parent_item_group": _("All Item Groups"),
		},
		{
			"doctype": "Item Group",
			"item_group_name": _("Sub Assemblies"),
			"is_group": 0,
			"parent_item_group": _("All Item Groups"),
		},
		{
			"doctype": "Item Group",
			"item_group_name": _("Consumable"),
			"is_group": 0,
			"parent_item_group": _("All Item Groups"),
		},
		# Stock Entry Type
		{"doctype": "Stock Entry Type", "name": "Material Issue", "purpose": "Material Issue"},
		{"doctype": "Stock Entry Type", "name": "Material Receipt", "purpose": "Material Receipt"},
		{
			"doctype": "Stock Entry Type",
			"name": "Material Transfer",
			"purpose": "Material Transfer",
		},
		{"doctype": "Stock Entry Type", "name": "Manufacture", "purpose": "Manufacture"},
		{"doctype": "Stock Entry Type", "name": "Repack", "purpose": "Repack"},
		{
			"doctype": "Stock Entry Type",
			"name": "Send to Subcontractor",
			"purpose": "Send to Subcontractor",
		},
		{
			"doctype": "Stock Entry Type",
			"name": "Material Transfer for Manufacture",
			"purpose": "Material Transfer for Manufacture",
		},
		{
			"doctype": "Stock Entry Type",
			"name": "Material Consumption for Manufacture",
			"purpose": "Material Consumption for Manufacture",
		},
		# territory: with two default territories, one for home country and one named Rest of the World
		{
			"doctype": "Territory",
			"territory_name": _("Tất cả khu vực"),
			"is_group": 1,
			"name": _("Tất cả khu vực"),
			"parent_territory": "",
		},
		{
			"doctype": "Territory",
			"territory_name": country.replace("'", ""),
			"is_group": 0,
			"parent_territory": _("Tất cả khu vực"),
		},
		{
			"doctype": "Territory",
			"territory_name": _("Miền Bắc"),
			"is_group": 0,
			"parent_territory": _("Tất cả khu vực"),
		},
		{
			"doctype": "Territory",
			"territory_name": _("Miền Trung"),
			"is_group": 0,
			"parent_territory": _("Tất cả khu vực"),
		},
		{
			"doctype": "Territory",
			"territory_name": _("Miền Nam"),
			"is_group": 0,
			"parent_territory": _("Tất cả khu vực"),
		},
		# customer group
		{
			"doctype": "Customer Group",
			"customer_group_name": _("All Customer Groups"),
			"is_group": 1,
			"name": _("All Customer Groups"),
			"parent_customer_group": "",
		},
		{
			"doctype": "Customer Group",
			"customer_group_name": _("Individual"),
			"is_group": 0,
			"parent_customer_group": _("All Customer Groups"),
		},
		{
			"doctype": "Customer Group",
			"customer_group_name": _("Commercial"),
			"is_group": 0,
			"parent_customer_group": _("All Customer Groups"),
		},
		{
			"doctype": "Customer Group",
			"customer_group_name": _("Non Profit"),
			"is_group": 0,
			"parent_customer_group": _("All Customer Groups"),
		},
		{
			"doctype": "Customer Group",
			"customer_group_name": _("Government"),
			"is_group": 0,
			"parent_customer_group": _("All Customer Groups"),
		},
		# supplier group
		{
			"doctype": "Supplier Group",
			"supplier_group_name": _("All Supplier Groups"),
			"is_group": 1,
			"name": _("All Supplier Groups"),
			"parent_supplier_group": "",
		},
		{
			"doctype": "Supplier Group",
			"supplier_group_name": _("Services"),
			"is_group": 0,
			"parent_supplier_group": _("All Supplier Groups"),
		},
		{
			"doctype": "Supplier Group",
			"supplier_group_name": _("Local"),
			"is_group": 0,
			"parent_supplier_group": _("All Supplier Groups"),
		},
		{
			"doctype": "Supplier Group",
			"supplier_group_name": _("Raw Material"),
			"is_group": 0,
			"parent_supplier_group": _("All Supplier Groups"),
		},
		{
			"doctype": "Supplier Group",
			"supplier_group_name": _("Electrical"),
			"is_group": 0,
			"parent_supplier_group": _("All Supplier Groups"),
		},
		{
			"doctype": "Supplier Group",
			"supplier_group_name": _("Hardware"),
			"is_group": 0,
			"parent_supplier_group": _("All Supplier Groups"),
		},
		{
			"doctype": "Supplier Group",
			"supplier_group_name": _("Pharmaceutical"),
			"is_group": 0,
			"parent_supplier_group": _("All Supplier Groups"),
		},
		{
			"doctype": "Supplier Group",
			"supplier_group_name": _("Distributor"),
			"is_group": 0,
			"parent_supplier_group": _("All Supplier Groups"),
		},
		# Sales Person
		{
			"doctype": "Sales Person",
			"sales_person_name": _("Sales Team"),
			"is_group": 1,
			"parent_sales_person": "",
		},
		# Mode of Payment
		{
			"doctype": "Mode of Payment",
			"mode_of_payment": "Check" if country == "United States" else _("Cheque"),
			"type": "Bank",
		},
		{"doctype": "Mode of Payment", "mode_of_payment": _("Cash"), "type": "Cash"},
		{"doctype": "Mode of Payment", "mode_of_payment": _("Credit Card"), "type": "Bank"},
		{"doctype": "Mode of Payment", "mode_of_payment": _("Wire Transfer"), "type": "Bank"},
		{"doctype": "Mode of Payment", "mode_of_payment": _("Bank Draft"), "type": "Bank"},
		# Activity Type
		{"doctype": "Activity Type", "activity_type": _("Planning")},
		{"doctype": "Activity Type", "activity_type": _("Research")},
		{"doctype": "Activity Type", "activity_type": _("Proposal Writing")},
		{"doctype": "Activity Type", "activity_type": _("Execution")},
		{"doctype": "Activity Type", "activity_type": _("Communication")},
		{
			"doctype": "Item Attribute",
			"attribute_name": _("Size"),
			"item_attribute_values": [
				{"attribute_value": _("Extra Small"), "abbr": "XS"},
				{"attribute_value": _("Small"), "abbr": "S"},
				{"attribute_value": _("Medium"), "abbr": "M"},
				{"attribute_value": _("Large"), "abbr": "L"},
				{"attribute_value": _("Extra Large"), "abbr": "XL"},
			],
		},
		{
			"doctype": "Item Attribute",
			"attribute_name": _("Colour"),
			"item_attribute_values": [
				{"attribute_value": _("Red"), "abbr": "RED"},
				{"attribute_value": _("Green"), "abbr": "GRE"},
				{"attribute_value": _("Blue"), "abbr": "BLU"},
				{"attribute_value": _("Black"), "abbr": "BLA"},
				{"attribute_value": _("White"), "abbr": "WHI"},
			],
		},
		# Issue Priority
		{"doctype": "Issue Priority", "name": _("Low")},
		{"doctype": "Issue Priority", "name": _("Medium")},
		{"doctype": "Issue Priority", "name": _("High")},
		{"doctype": "Email Account", "email_id": "sales@example.com", "append_to": "Opportunity"},
		{"doctype": "Email Account", "email_id": "support@example.com", "append_to": "Issue"},
		{"doctype": "Party Type", "party_type": "Customer", "account_type": "Receivable"},
		{"doctype": "Party Type", "party_type": "Supplier", "account_type": "Payable"},
		{"doctype": "Party Type", "party_type": "Employee", "account_type": "Payable"},
		{"doctype": "Party Type", "party_type": "Shareholder", "account_type": "Payable"},
		{"doctype": "Opportunity Type", "name": _("Sales")},
		{"doctype": "Opportunity Type", "name": _("Support")},
		{"doctype": "Opportunity Type", "name": _("Maintenance")},
		{"doctype": "Project Type", "project_type": "Internal"},
		{"doctype": "Project Type", "project_type": "External"},
		{"doctype": "Project Type", "project_type": "Other"},
		{"doctype": "Print Heading", "print_heading": _("Credit Note")},
		{"doctype": "Print Heading", "print_heading": _("Debit Note")},
		# Share Management
		{"doctype": "Share Type", "title": _("Equity")},
		{"doctype": "Share Type", "title": _("Preference")},
		# Market Segments
		{"doctype": "Market Segment", "market_segment": _("Lower Income")},
		{"doctype": "Market Segment", "market_segment": _("Middle Income")},
		{"doctype": "Market Segment", "market_segment": _("Upper Income")},
		# Warehouse Type
		{"doctype": "Warehouse Type", "name": "Transit"},
		# DMS Industry
        {"doctype": "DMS Industry", "industry_name": _("Siêu thị mini, cửa hàng tiện lợi"), "type": "supermarket"},
		{"doctype": "DMS Industry", "industry_name": _("Siêu thị mẹ và bé"), "type": "mom_and_baby"},
		{"doctype": "DMS Industry", "industry_name": _("Hiệu thuốc bán lẻ"), "type": "pharma"},
		{"doctype": "DMS Industry", "industry_name": _("Cửa hàng thực phẩm"), "type": "grocery_store"},
		{"doctype": "DMS Industry", "industry_name": _("Cửa hàng trái cây"), "type": "fruit_store"},
		{"doctype": "DMS Industry", "industry_name": _("Cửa hàng thời trang cho trẻ em"), "type": "children_fashion_store"},
		{"doctype": "DMS Industry", "industry_name": _("Cửa hàng đồ chơi cho trẻ em"), "type": "children_toy_store"},
		{"doctype": "DMS Industry", "industry_name": _("Cửa hàng sữa và sản phẩm từ sữa"), "type": "milk"},
		{"doctype": "DMS Industry", "industry_name": _("Cửa hàng đồ gia dụng"), "type": "home_goods_store"},
		{"doctype": "DMS Industry", "industry_name": _("Hiệu sách"), "type": "bookstore"},
		{"doctype": "DMS Industry", "industry_name": _("Trung tâm ngoại ngữ"), "type": "foreign_language_center"},
		{"doctype": "DMS Industry", "industry_name": _("Kem và trà sữa"), "type": "cream_tea"},
		{"doctype": "DMS Industry", "industry_name": _("Cafe"), "type": "cafe"},
		{"doctype": "DMS Industry", "industry_name": _("Nhà hàng"), "type": "restaurant"},
		{"doctype": "DMS Industry", "industry_name": _("Quán ăn"), "type": "eatery"},
		{"doctype": "DMS Industry", "industry_name": _("Bia hơi, quán nhậu"), "type": "beer_pub"},
		{"doctype": "DMS Industry", "industry_name": _("Siêu thị thú cưng"), "type": "pet"},
		{"doctype": "DMS Industry", "industry_name": _("Cửa hàng cá cảnh"), "type": "aquarium_shop"},
		{"doctype": "DMS Industry", "industry_name": _("Cửa hàng chim cảnh"), "type": "bird_shop"},
		{"doctype": "DMS Industry", "industry_name": _("Phòng khám thú y"), "type": "veterinary_clinic"},
		{"doctype": "DMS Industry", "industry_name": _("Bệnh viện thú y"), "type": "veterinary_hospital"},
		{"doctype": "DMS Industry", "industry_name": _("Cửa hàng hóa mỹ phẩm"), "type": "cosmetics_store"},
		{"doctype": "DMS Industry", "industry_name": _("Phòng khám"), "type": "clinic"},
		{"doctype": "DMS Industry", "industry_name": _("Làm đẹp, spa"), "type": "spa_beauty"},
		{"doctype": "DMS Industry", "industry_name": _("Phòng tập GYM, Yoga, Fitness"), "type": "gym"},
		{"doctype": "Note", "title": _("Ghi chú khách hàng"), "public": 1},
		{"doctype": "Custom HTML Block","__newname": "DMS Router Web" ,"html": ('<h4 style="font-size:16px;font-weight: 600;">Chức năng chính</h4><div class="content" style="margin-bottom: 10px;"><a class="text" href="/mbw_desk/router-control">Quản lý tuyến</a></div><div class="content" style="margin-bottom: 10px;"><a class="text" href="/mbw_audit">Chấm điểm trưng bày</a></div><div class="content" style="margin-bottom: 10px;"><a class="text" href="/mbw_desk/customers-map">Bản đồ khách hàng</a></div><div class="content" style="margin-bottom: 10px;"><a class="text" href="/mbw_desk/employee-monitor">Giám sát viếng thăm khách hàng</a></div><div class="content" style="margin-bottom: 10px;"><a class="text" href="/mbw_desk/report-kpi">Giám sát thực hiện KPI (Nhân Viên)</a></div>')}
	]

	for doctype, title_field, filename in (
		("Designation", "designation_name", "designation.txt"),
		("Sales Stage", "stage_name", "sales_stage.txt"),
		("Industry Type", "industry", "industry_type.txt"),
		("Lead Source", "source_name", "lead_source.txt"),
		("Sales Partner Type", "sales_partner_type", "sales_partner_type.txt"),
	):
		records += [{"doctype": doctype, title_field: title} for title in read_lines(filename)]

	base_path = frappe.get_app_path("erpnext", "stock", "doctype")
	response = frappe.read_file(
		os.path.join(base_path, "delivery_trip/dispatch_notification_template.html")
	)

	records += [
		{
			"doctype": "Email Template",
			"name": _("Dispatch Notification"),
			"response": response,
			"subject": _("Your order is out for delivery!"),
			"owner": frappe.session.user,
		}
	]

	# Records for the Supplier Scorecard
	from erpnext.buying.doctype.supplier_scorecard.supplier_scorecard import make_default_records

	make_default_records()
	remove_base_record()
	make_records(records)
	set_up_address_templates(default_country=country)
	update_selling_defaults()
	update_buying_defaults()
	add_uom_data()
	update_item_variant_settings()
	update_global_search_doctypes()


def remove_base_record() :
	frappe.db.commit()
	frappe.db.sql(""" TRUNCATE TABLE tabTerritory """)