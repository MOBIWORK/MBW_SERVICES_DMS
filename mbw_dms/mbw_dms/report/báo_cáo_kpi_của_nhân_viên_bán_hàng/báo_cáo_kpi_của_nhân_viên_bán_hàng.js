// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

frappe.query_reports["Báo cáo KPI của nhân viên bán hàng"] = {
	filters: [
		{
            fieldname: "from_date",
            label: __("From Date"),
            fieldtype: "Date",
            default: frappe.datetime.add_months(frappe.datetime.get_today(), -1),
            reqd: 1
        },
        {
            fieldname: "to_date",
            label: __("To Date"),
            fieldtype: "Date",
            default: frappe.datetime.get_today(),
            reqd: 1
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
		},
        {
            fieldname: "customer",
            label: __("Customer"),
            fieldtype: "Link",
            options: "Customer"
        },
	],
};
