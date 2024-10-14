// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

frappe.query_reports["Báo cáo điểm thưởng theo nhân viên"] = {
	"filters": [
		{
            fieldname: "from_date",
            label: __("Từ ngày"),
            fieldtype: "Date",
            width: "80",
            reqd: 1,
            default: frappe.datetime.add_months(frappe.datetime.get_today(), -1),
        },
        {
            fieldname: "to_date",
            label: __("Đến ngày"),
            fieldtype: "Date",
            width: "80",
            reqd: 1,
            default: frappe.datetime.add_months(frappe.datetime.get_today(), 0),
        },
        {
            fieldname: "sales_person",
            label: __("Nhân viên"),
            fieldtype: "Link",
            width: "80",
            options: "Sales Person"
        },
        {
            fieldname: "department",
            label: __("Phòng/ban"),
            fieldtype: "Link",
            width: "80",
            options: "Department"
        },
	]
};
