import frappe

@frappe.whitelist()
def insert_fake_gps(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_fakegps.dms_fakegps import insert_fake_gps
    return insert_fake_gps(body=kwargs)