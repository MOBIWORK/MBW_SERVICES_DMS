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

@frappe.whitelist()
def order_statistics(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi import order_statistics
    return order_statistics(kwargs=kwargs)

@frappe.whitelist()
def new_customer_report(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi import new_customer_report
    return new_customer_report(kwargs=kwargs)

@frappe.whitelist()
def kpi_targets(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi import kpi_targets
    return kpi_targets(kwargs=kwargs)

@frappe.whitelist()
def customer_not_order(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi import customer_not_order
    return customer_not_order(kwargs=kwargs)

@frappe.whitelist()
def receivable_summary_report(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_kpi.dms_kpi import get_accounts_receivable_report
    return get_accounts_receivable_report(kwargs=kwargs)