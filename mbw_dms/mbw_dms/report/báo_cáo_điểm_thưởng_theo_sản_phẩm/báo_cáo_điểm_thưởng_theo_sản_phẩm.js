// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

frappe.query_reports["Báo cáo điểm thưởng theo sản phẩm"] = {
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
            default: frappe.datetime.add_months(frappe.datetime.get_today()),
        },
        {
            fieldname: "item_group",
            label: __("Nhóm mặt hàng"),
            fieldtype: "Link",
            width: "80",
            options: "Item Group"
        },
        {
            fieldname: "item",
            label: __("Sản phẩm"),
            fieldtype: "Link",
            width: "80",
            options: "Item"
        },
	]
};
