import frappe

from mbw_dms.api.common import gen_response ,exception_handel, get_child_values_doc
from mbw_dms.api.validators import validate_filter_timestamp


@frappe.whitelist(methods='GET')
def customer_report(**kwargs):
    pass