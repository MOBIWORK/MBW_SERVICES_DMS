// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

frappe.query_reports["Báo cáo bán hàng"] = {
	"filters": [
		{
			fieldname: "from_date",
			label: __("From Date"),
			fieldtype: "Date",
			width: "80",
			reqd: 1,
			default: frappe.datetime.add_months(frappe.datetime.get_today(), -1),
		},
		{
			fieldname: "to_date",
			label: __("To Date"),
			fieldtype: "Date",
			width: "80",
			reqd: 1,
			default: frappe.datetime.get_today(),
		},
		{
			fieldname: "sales_invoice",
			label: __("Sales Invoice"),
			fieldtype: "Link",
			width: "80",
			options: "Sales Invoice",
			get_query: () => {
				return {
					filters: { docstatus: 1 },
				};
			},
		},
		{
			fieldname: "item",
			label: __("Item"),
			fieldtype: "Link",
			width: "80",
			options: "Item",
		},
		{
			fieldname: "brand",
			label: __("Brand"),
			fieldtype: "Link",
			width: "80",
			options: "Brand",
		},
		{
			fieldname: "customer",
			label: __("Customer"),
			fieldtype: "Link",
			width: "80",
			options: "Customer",
		},
		{
			fieldname: "sales_person",
			label: __("Sales Person"),
			fieldtype: "MultiSelectList",
			get_data: function (txt) {
				return frappe.db.get_link_options("Sales Person", txt, {
					employee: ["!=", ""]
				});
			},
		}
	]
};
