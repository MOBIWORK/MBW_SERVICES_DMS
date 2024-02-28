import frappe

@frappe.whitelist()
def get_kpi_monthly():
    from mbw_dms.mbw_dms.doctype.dms_summary_kpi_monthly.dms_summary_kpi_monthly import get_kpi_monthly
    return get_kpi_monthly()