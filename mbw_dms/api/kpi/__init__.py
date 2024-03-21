import frappe

@frappe.whitelist()
def get_kpi_monthly():
    from mbw_dms.mbw_dms.doctype.dms_summary_kpi_monthly.dms_summary_kpi_monthly import get_kpi_monthly
    return get_kpi_monthly()

@frappe.whitelist()
def visit_report():
    from mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi import visit_report
    return visit_report()

@frappe.whitelist()
def sales_report():
    from mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi import sales_report
    return sales_report()

@frappe.whitelist()
def invoices_report():
    from mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi import invoices_report
    return invoices_report()

@frappe.whitelist()
def report_visit_orders_invoices(customer_name):
    from mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi import report_orders_invoices
    return report_orders_invoices(customer_name=customer_name)

@frappe.whitelist()
def report_detail_visit(customer_name, **kwargs):
    from mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi import report_detail_visit
    return report_detail_visit(customer_name=customer_name, kwargs=kwargs)

@frappe.whitelist()
def router_results(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi import router_results
    return router_results(kwargs=kwargs)

@frappe.whitelist()
def checkin_report(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi import checkin_report
    return checkin_report(kwargs=kwargs)