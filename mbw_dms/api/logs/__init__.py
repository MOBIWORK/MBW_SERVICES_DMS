import frappe
from mbw_dms.api.common import gen_response

@frappe.whitelist(methods="POST")
def write_log(**kwagr):
    fields_in = ["orgid", "user", "api", "screen", "detail"]
    new_logs = frappe.new_doc("DMS Error Logs")
    
    for key,value in kwagr.items():
        if key in fields_in:
            new_logs.set(key,value)
    new_logs.save()

    return gen_response(200, "", {})
