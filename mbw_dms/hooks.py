from . import __version__ as app_version

app_name = "mbw_dms"
app_title = "MBW DMS"
app_publisher = "MBW"
app_description = "API MBW DMS"
app_email = "dev@mbw.vn"
app_license = "MIT"

setup_wizard_stages = "mbw_dms.setup_wizard.setup_wizard.get_setup_stages"
website_route_rules = [
	{
		"from_route": "/mbw_desk/<path:app_path>",
		"to_route": "mbw_desk",
	},
]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/mbw_dms/css/tailwind.css"
# app_include_js = "/assets/mbw_dms/js/mbw_dms.js"

# include js, css files in header of web template
# web_include_css = "/assets/mbw_dms/css/tailwind.css"
# web_include_js = "/assets/mbw_dms/js/mbw_dms.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "mbw_dms/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "mbw_dms.utils.jinja_methods",
#	"filters": "mbw_dms.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "mbw_dms.install.before_install"
# after_install = "mbw_dms.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "mbw_dms.uninstall.before_uninstall"
# after_uninstall = "mbw_dms.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "mbw_dms.utils.before_app_install"
# after_app_install = "mbw_dms.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "mbw_dms.utils.before_app_uninstall"
# after_app_uninstall = "mbw_dms.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "mbw_dms.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"mbw_dms.tasks.all"
#	],
#	"daily": [
#		"mbw_dms.tasks.daily"
#	],
#	"hourly": [
#		"mbw_dms.tasks.hourly"
#	],
#	"weekly": [
#		"mbw_dms.tasks.weekly"
#	],
#	"monthly": [
#		"mbw_dms.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "mbw_dms.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "mbw_dms.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "mbw_dms.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["mbw_dms.utils.before_request"]
# after_request = ["mbw_dms.utils.after_request"]

# Job Events
# ----------
# before_job = ["mbw_dms.utils.before_job"]
# after_job = ["mbw_dms.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"mbw_dms.auth.validate"
# ]

fixtures = [
    {
        "doctype": "Custom Field",
        "filters": [["module", "in", ("MBW DMS")]]
    },
    {
        "doctype": "Client Script",
        "filters": [["module", "in", ("MBW DMS")]]
    },
    {
        "doctype": "Server Script",
        "filters": [["module", "in", ("MBW DMS")]]
    },

]

doc_events = {
    "DMS KPI": {
        "before_insert": "mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi.validate_create_kpi"
    },
    "Address":{
        "on_update": "mbw_dms.mbw_dms.doctype.address.address.update_address"
    },
    "Customer": {
        "on_update": "mbw_dms.controllers.dms_customer.update_location",
        "after_insert": "mbw_dms.controllers.dms_customer.update_kpi_monthly",
        "after_delete": "mbw_dms.controllers.dms_customer.update_kpi_monthly_after_delete",
        "before_insert": "mbw_dms.controllers.dms_customer.create_customer_code"
    },
    "Sales Person": {
        "on_update": "mbw_dms.controllers.dms_sales_person.create_user_permission"
    },
    "Employee": {
        "after_insert": "mbw_dms.controllers.dms_users.create_objid_employee"
    },
    "Sales Invoice": {
        "on_submit": "mbw_dms.controllers.dms_sales_invoice.update_kpi_monthly",
        "on_cancel": "mbw_dms.controllers.dms_sales_invoice.update_kpi_monthly_on_cancel"
    },
    "Sales Order": {
        "on_submit": ["mbw_dms.controllers.dms_sales_order.update_kpi_monthly", "mbw_dms.controllers.dms_sales_order.auto_create_si"],
        "on_cancel": "mbw_dms.controllers.dms_sales_order.update_kpi_monthly_on_cancel"
    },
    "DMS Router": {
        "before_insert": "mbw_dms.controllers.dms_router.check_duplicate_import"
    },
    "Pick List": {
        "on_submit": "mbw_dms.controllers.pick_list.update_pick_list_to_si",
        "before_insert": "mbw_dms.controllers.pick_list.request_for_dn"
    },
    "Payment Entry": {
        "before_insert": "mbw_dms.controllers.pick_list.cal_customer_paid_pe"
    }
}

on_session_creation = [
    "mbw_dms.controllers.role_permissions.update_sales_roles_permissions"
]