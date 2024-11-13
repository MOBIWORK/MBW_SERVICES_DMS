// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

frappe.query_reports["Báo cáo số km di chuyển của nhân viên"] = {
	"filters": [
		{
            fieldname: "from_date",
            label: __("From Date"),
            fieldtype: "Date",
            default: frappe.datetime.add_days(frappe.datetime.get_today(), -1),
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
			fieldname: "sales_team",
            label: __("Nhóm bán hàng"),
            fieldtype: "Link",
			options: "Sales Person",
		},
		{
            fieldname: "employee",
            label: __("Employee"),
            fieldtype: "Link",
            options: "Employee"
        },
        {
            fieldname: "total_days",
            label: __("Tính tổng theo khoảng thời gian"),
            fieldtype: "Check",
            default: 1
        }
	]
};
