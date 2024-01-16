import frappe
from frappe import _
import json
from datetime import datetime
from pypika import  Order, CustomFunction

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    validate_image,
    get_report_doc
)
from mbw_dms.config_translate import i18n

#stock entry
@frappe.whitelist(methods='GET')
def list_stock_entry(**kwargs):
    kwargs=frappe._dict(kwargs)

    StockEntry = frappe.qb.DocType('Stock Entry')
    StockEntryDetail = frappe.qb.DocType('Stock Entry Detail')

    stocks = (frappe.qb.from_(StockEntry)
            .inner_join(StockEntryDetail)
            .on(StockEntry.name == StockEntryDetail.parent)
            .select("*").run(as_dict=True))

    return gen_response(200, 'Thành công', stocks)

# List warehouse
@frappe.whitelist(methods='GET')
def list_warehouse(**kwargs):
    try:
        list_warehouses = frappe.db.get_list('Warehouse', fields=["*"])
        gen_response(200, 'Thành công', list_warehouses)
    except Exception as e:
        return exception_handel(e)