// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

frappe.query_reports["Báo cáo Xuất Hàng"] = {
	"filters": [
		{
			fieldname: "delivery_note",
			label: __("Delivery Note"),
			fieldtype: "Link",
			options: "Delivery Note",
			get_query: function() {
                return {
                    filters: {
                        "pick_list": ["is", "set"]
                    }
                };
            }
		},
		{
			fieldname: "pick_list",
			label: __("Pick List"),
			fieldtype: "Link",
			options: "Pick List",
			get_query: function() {
                return {
                    filters: {
                        "docstatus": 1,
                    }
                };
            }
		},
		{
			fieldname: "sales_person",
			label: __("Sales Person"),
			fieldtype: "Link",
			options: "Sales Person"
		},
		{
			fieldname: "custom_shipper_name",
			label: __("Shipper"),
			fieldtype: "Link",
			options: "Employee"
		},
		{
			fieldname: "from_date",
			label: __("From Date"),
			fieldtype: "Date",
			default: frappe.datetime.add_months(frappe.datetime.get_today(), -1),
			reqd: 1,
		},
		{
			fieldname: "to_date",
			label: __("To Date"),
			fieldtype: "Date",
			default: frappe.datetime.get_today(),
			reqd: 1,
		},
		{
			fieldname: "customer",
			label: __("Customer"),
			fieldtype: "Link",
			options: "Customer"
		},
		{
			fieldname: "item",
			label: __("Item"),
			fieldtype: "Link",
			options: "Item"
		}

	]
};
