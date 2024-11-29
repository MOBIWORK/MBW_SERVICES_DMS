// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

frappe.query_reports["Báo cáo Top doanh thu của nhân viên bán hàng"] = {
	filters: [
		{
			fieldname: "from_date",
			label: __("From Date"),
			fieldtype: "Date",
			default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today(), true)[1],
		},
		{
			fieldname: "to_date",
			label: __("To Date"),
			fieldtype: "Date",
			default: frappe.datetime.get_today(),
		},
		{
			fieldname: "company",
			label: __("Company"),
			fieldtype: "Link",
			options: "Company",
			default: frappe.defaults.get_user_default("Company"),
			reqd: 1,
		},
		{
			fieldname: "top_number",
			label: __("Top Number"),
			fieldtype: "Int",
			default: 10,
		},

	],
};
