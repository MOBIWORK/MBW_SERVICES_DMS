import frappe 

#create type of problem
@frappe.whitelist()
def create_type_of_problem(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_note_type.dms_note_type import create_type_of_problem
    return create_type_of_problem(kwargs=kwargs)

# create Problem Monitor
@frappe.whitelist()
def create_proble_monitor(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_note_type.dms_note_type import create_proble_monitor
    return create_proble_monitor(kwargs=kwargs)

@frappe.whitelist()
def create_note(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_note_type.dms_note_type import create_note
    return create_note(kwargs=kwargs)

@frappe.whitelist()
def list_email(kwargs):
    from mbw_dms.mbw_dms.doctype.dms_note_type.dms_note_type import list_email
    return list_email(kwargs=kwargs)

#list note
@frappe.whitelist()
def list_note(kwargs):
    from mbw_dms.mbw_dms.doctype.dms_note_type.dms_note_type import list_note
    return list_note(kwargs=kwargs)

#list note type
@frappe.whitelist()
def list_note_type():
    from mbw_dms.mbw_dms.doctype.dms_note_type.dms_note_type import list_note_type
    return list_note_type()