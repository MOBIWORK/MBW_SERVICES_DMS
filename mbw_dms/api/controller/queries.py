
import json
from collections import defaultdict

import frappe
from frappe import scrub
from frappe.desk.reportview import get_filters_cond, get_match_cond
from frappe.utils import nowdate, unique

import erpnext
from erpnext.stock.get_item_details import _get_item_tax_template
from erpnext.controllers.queries import get_fields

@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def router_query(doctype, txt, searchfield, start, page_len, filters):
	doctype = "DMS Router"
	conditions = []
	fields = get_fields(doctype, ["name", "channel_name","channel_code"])

	return frappe.db.sql(
		"""select {fields} from `tabDMS Router`
		where status in ('Active', 'Suspended')
			and docstatus < 2
			and ({key} like %(txt)s
				or channel_name like %(txt)s)
			{fcond} {mcond}
		order by
			(case when locate(%(_txt)s, name) > 0 then locate(%(_txt)s, name) else 99999 end),
			(case when locate(%(_txt)s, channel_name) > 0 then locate(%(_txt)s, channel_name) else 99999 end),
			idx desc,
			name, channel_name,channel_code
		limit %(page_len)s offset %(start)s""".format(
			**{
				"fields": ", ".join(fields),
				"key": searchfield,
				"fcond": get_filters_cond(doctype, filters, conditions),
				"mcond": get_match_cond(doctype),
			}
		),
		{"txt": "%%%s%%" % txt, "_txt": txt.replace("%", ""), "start": start, "page_len": page_len},
	)

