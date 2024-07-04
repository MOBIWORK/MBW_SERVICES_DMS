import frappe


@frappe.whitelist(methods="GET")
def checkin_report_info(**kwarg):
    from mbw_dms.mbw_dms.doctype.dms_checkin.dms_checkin import get_report
    return get_report(filters=kwarg)
