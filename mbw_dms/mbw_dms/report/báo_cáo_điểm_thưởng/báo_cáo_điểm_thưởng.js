// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

frappe.query_reports["Báo cáo điểm thưởng"] = {
	filters: [
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
            fieldname: "sales_order",
            label: __("Đơn đặt hàng"),
            fieldtype: "Link",
            options: "Sales Order",
            width: "80",
        },
        {
            fieldname: "sales_person",
            label: __("Nhân viên"),
            fieldtype: "Link",
            width: "80",
            options: "Sales Person"
        },
        {
            fieldname: "company",
            label: __("Công ty"),
            fieldtype: "Link",
            width: "80",
            options: "Company",
            default: frappe.defaults.get_user_default("Company"),
        },
        {
            fieldname: "item_group",
            label: __("Nhóm mặt hàng"),
            fieldtype: "Link",
            width: "80",
            options: "Item Group"
        },
        {
            fieldname: "customer",
            label: __("Khách hàng"),
            fieldtype: "Link",
            width: "80",
            options: "Customer"
        },
	]
};
erpnext.utils.add_dimensions("Báo cáo điểm thưởng", 15);
