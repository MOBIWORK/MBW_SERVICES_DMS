import frappe


def execute():
    if not frappe.db.exists("Custom Field", "Vehicle Log-custom_daily_odometer_value"):
        frappe.get_doc({
            "allow_in_quick_entry": 0,
            "allow_on_submit": 1,
            "bold": 0,
            "collapsible": 0,
            "columns": 0,
            "default": "0",
            "docstatus": 0,
            "doctype": "Custom Field",
            "dt": "Vehicle Log",
            "fieldname": "custom_daily_odometer_value",
            "fieldtype": "Int",
            "hidden": 0,
            "hide_border": 0,
            "hide_days": 0,
            "hide_seconds": 0,
            "ignore_user_permissions": 0,
            "ignore_xss_filter": 0,
            "in_global_search": 0,
            "in_list_view": 0,
            "in_preview": 0,
            "in_standard_filter": 0,
            "insert_after": "last_odometer",
            "is_system_generated": 0,
            "is_virtual": 0,
            "label": "Daily Odometer Value",
            "length": 0,
            "modified": "2024-11-01 14:13:40.165731",
            "module": "MBW DMS",
            "name": "Vehicle Log-custom_daily_odometer_value",
            "no_copy": 0,
            "non_negative": 0,
            "permlevel": 0,
            "precision": "",
            "print_hide": 0,
            "print_hide_if_no_value": 0,
            "read_only": 1,
            "report_hide": 0,
            "reqd": 0,
            "search_index": 0,
            "show_dashboard": 0,
            "sort_options": 0,
            "translatable": 0,
            "unique": 0,
        }).insert()
        vehicle_log = frappe.get_all("Vehicle Log",
                                     fields=["name", "odometer", "last_odometer", "custom_daily_odometer_value"])[::-1]
        for vehicle in vehicle_log:
            frappe.db.set_value("Vehicle Log", vehicle.name, "custom_daily_odometer_value",
                                vehicle.odometer - vehicle.last_odometer)
        frappe.db.commit()
