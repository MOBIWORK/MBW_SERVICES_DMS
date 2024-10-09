import frappe

# Thêm quy đổi theo thùng
def cal_qdtt(doc, method):
    items = doc.items
    for item in items:
        item_detail = frappe.get_doc("Item", item.item_code)
        quy_cach_thung = 0
        item_uom = None
        for uom in item_detail.uoms:
            if uom.custom_don_vi_dong_goi == 1:
                quy_cach_thung = uom.conversion_factor
                item_uom = uom.uom
        
        if item_uom: 
            if item.uom == item_uom:
                item.custom_quy_doi_theo_thung = item.qty
            else:
                item.custom_quy_doi_theo_thung = float(item.qty / quy_cach_thung)
        else:
            continue