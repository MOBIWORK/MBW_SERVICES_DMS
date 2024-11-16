import frappe

# create Album Image
@frappe.whitelist()
def create_album_image(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_album.dms_album import create_album_image
    return create_album_image(kwargs=kwargs)

# List album Image
@frappe.whitelist()
def list_monitor_album(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_album.dms_album import list_monitor_album
    return list_monitor_album(kwargs=kwargs)

# Create Album
@frappe.whitelist()
def create_album(kwargs):
    from mbw_dms.mbw_dms.doctype.dms_album.dms_album import create_album
    return create_album(kwargs=kwargs)

# List 
@frappe.whitelist()
def list_album():
    from mbw_dms.mbw_dms.doctype.dms_album.dms_album import list_album
    return list_album()

@frappe.whitelist()
def list_album_name():
    from mbw_dms.mbw_dms.doctype.dms_album.dms_album import list_album_name
    return list_album_name()