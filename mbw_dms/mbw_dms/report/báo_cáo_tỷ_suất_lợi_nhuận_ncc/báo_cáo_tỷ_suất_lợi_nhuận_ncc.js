// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.query_reports["Báo cáo tỷ suất lợi nhuận NCC"] = {
	filters: [
		{
			fieldname: "company",
			label: __("Company"),
			fieldtype: "Link",
			options: "Company",
			default: frappe.defaults.get_user_default("Company"),
			reqd: 1,
		},
		{
			fieldname: "from_date",
			label: __("From Date"),
			fieldtype: "Date",
			default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today(), true)[1],
			reqd: 1,
		},
		{
			fieldname: "to_date",
			label: __("To Date"),
			fieldtype: "Date",
			default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today(), true)[2],
			reqd: 1,
		},
		{
			fieldname: "sales_invoice",
			label: __("Sales Invoice"),
			fieldtype: "Link",
			options: "Sales Invoice",
		},
		{
			fieldname: "group_by",
			label: __("Group By"),
			fieldtype: "Select",
			options:
				"Invoice\nItem Code\nItem Group\nBrand\nWarehouse\nCustomer\nCustomer Group\nTerritory\nSales Person\nProject\nCost Center\nMonthly\nPayment Term",
			default: "Item Code",
		},
		{
			fieldname: "item_code",
			label: __("Item Code"),
			fieldtype: "Link",
			options: "Item",
			onchange: function () {
				frappe.query_report.set_filter_value("item_group", "");
			},
		},
		{
			fieldname: "item_group",
			label: __("Item Group"),
			fieldtype: "Link",
			options: "Item Group",
		},
		{
			fieldname: "sales_person",
			label: __("Sales Person"),
			fieldtype: "Link",
			options: "Sales Person",
		},
		{
			fieldname: "warehouse",
			label: __("Warehouse"),
			fieldtype: "Link",
			options: "Warehouse",
			get_query: function () {
				var company = frappe.query_report.get_filter_value("company");
				return {
					filters: [["Warehouse", "company", "=", company]],
				};
			},
		},
		{
			fieldname: "cost_center",
			label: __("Cost Center"),
			fieldtype: "MultiSelectList",
			get_data: function (txt) {
				return frappe.db.get_link_options("Cost Center", txt, {
					company: frappe.query_report.get_filter_value("company"),
				});
			},
		},
		{
			fieldname: "project",
			label: __("Project"),
			fieldtype: "MultiSelectList",
			get_data: function (txt) {
				return frappe.db.get_link_options("Project", txt, {
					company: frappe.query_report.get_filter_value("company"),
				});
			},
		},
		{
			fieldname: "brand",
			label: __("Brand"),
			fieldtype: "Link",
			options: "Brand"
		}
	],
	tree: true,
	name_field: "parent",
	parent_field: "parent_invoice",
	initial_depth: 3,
	formatter: function (value, row, column, data, default_formatter) {
		if (column.fieldname == "sales_invoice" && column.options == "Item" && data && data.indent == 0) {
			column._options = "Sales Invoice";
		} else {
			column._options = "";
		}
		value = default_formatter(value, row, column, data);

		if (data && (data.indent == 0.0 || (row[1] && row[1].content == "Total"))) {
			value = $(`<span>${value}</span>`);
			var $value = $(value).css("font-weight", "bold");
			value = $value.wrap("<p></p>").parent().html();
		}

		return value;
	},
	after_datatable_render: function(datatable) {
        // Remove the filter row
        $('.dt-row-filter').remove();
    }
};
erpnext.utils.add_dimensions("Báo cáo tỷ suất lợi nhuận NCC", 15);
