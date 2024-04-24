# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt


import frappe
from frappe import _

from mbw_dms.controllers.dms_install_fixtures import install
from erpnext.setup.setup_wizard.setup_wizard import (
	fin,
	setup_company,
	setup_defaults,
	setup_demo
)

def get_setup_stages(args=None):
	if frappe.db.sql("select name from tabCompany"):
		stages = [
			{
				"status": _("Wrapping up"),
				"fail_msg": _("Failed to login"),
				"tasks": [{"fn": fin, "args": args, "fail_msg": _("Failed to login")}],
			}
		]
	else:
		stages = [
			{
				"status": _("Installing presets"),
				"fail_msg": _("Failed to install presets"),
				"tasks": [{"fn": stage_fixtures, "args": args, "fail_msg": _("Failed to install presets")}],
			},
			{
				"status": _("Setting up company"),
				"fail_msg": _("Failed to setup company"),
				"tasks": [{"fn": setup_company, "args": args, "fail_msg": _("Failed to setup company")}],
			},
			{
				"status": _("Setting defaults"),
				"fail_msg": "Failed to set defaults",
				"tasks": [
					{"fn": setup_defaults, "args": args, "fail_msg": _("Failed to setup defaults")},
				],
			},
			{
				"status": _("Wrapping up"),
				"fail_msg": _("Failed to login"),
				"tasks": [{"fn": fin, "args": args, "fail_msg": _("Failed to login")}],
			},
		]

	return stages


def stage_fixtures(args):
	install(args.get("country"))