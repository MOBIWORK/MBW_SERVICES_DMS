import frappe
from frappe import _
import json
from datetime import datetime
from pypika import  Order, CustomFunction

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    validate_image
)
from mbw_dms.config_translate import i18n

#stock entry
@frappe.whitelist(methods='GET')
def list_stock_entry(**kwargs):
    kwargs=frappe._dict(kwargs)

    stock_entry = frappe.db.get_list("Stock Entry",
                                   fields=["name"],
                                )
    return gen_response(200, 'Thành công', {
            "data": stock_entry,
    })