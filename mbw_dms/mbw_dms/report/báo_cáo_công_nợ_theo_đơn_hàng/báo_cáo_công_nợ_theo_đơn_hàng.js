// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

let now = new Date();
frappe.query_reports["Báo cáo công nợ theo đơn hàng"] = {
	"filters": [
		{
			fieldname: "from_date",
			label: __("Từ ngày"),
			fieldtype: "Date",
			width: "80",
			reqd: 1,
			default: new Date(now.getFullYear(), now.getMonth(), 1),
		},
		{
			fieldname: "to_date",
			label: __("Đến ngày"),
			fieldtype: "Date",
			width: "80",
			reqd: 1,
			default: new Date(now.getFullYear(), now.getMonth() + 1, 0),
		},
		{
			fieldname: "customer",
			label: __("Khách hàng"),
			fieldtype: "Link",
			width: "80",
			options: "Customer"
		},
		{
			fieldname: "deliverynote",
			label: __("Mã đơn DN"),
			fieldtype: "Link",
			width: "80",
			options: "Delivery Note"
		},
		{
			fieldname: "thanhtoan",
			label: __("Thanh toán"),
			fieldtype: "Check"
		}
	]
};
