import frappe
from mbw_dms.api.common import getConnection
@frappe.whitelist(allow_guest=True)
def checkMeta():
    return getConnection(doc=frappe.get_doc("Sales Invoice","ACC-SINV-2024-00183"),link_doctype="Sales Order")