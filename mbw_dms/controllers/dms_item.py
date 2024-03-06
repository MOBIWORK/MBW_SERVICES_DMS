import frappe
from erpnext.stock.doctype.item.item import Item,get_asset_naming_series
import pydash
class DMS_Item(Item):
    def onload(self):
        self.set_onload("stock_exists", self.stock_ledger_created())
        self.set_onload("asset_naming_series", get_asset_naming_series())
        self.custom_test_preview = f"{'<strong>hello</strong>'}"





        