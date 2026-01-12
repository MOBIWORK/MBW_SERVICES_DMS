import frappe

def calculate_dn(doc, method):
    items = doc.items
    total_lits = 0

    for item in items:
        # Tính số lit
        lit_per_uom = frappe.get_value("Item", {"item_code": item.item_code}, "custom_so_lit_tren_1_don_vi")
        if item.uom == item.stock_uom:
            item.custom_litres_in_1_unit = lit_per_uom
        else:
            item.custom_litres_in_1_unit = lit_per_uom * item.conversion_factor
        item.custom_total_litres_base_on_1_item = item.custom_litres_in_1_unit * item.qty
        total_lits += item.custom_total_litres_base_on_1_item

    doc.total_litres_in_order = total_lits