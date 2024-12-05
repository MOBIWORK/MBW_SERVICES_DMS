

from frappe import _
import json

from mbw_dms.mbw_dms.doctype.dms_logs.dms_logs import create_log

def create_dms_log(**kwargs):
    request_data = kwargs.get("request_data")
    if isinstance(request_data, dict):
        request_data = json.dumps(request_data)
    
    response_data = kwargs.get("response_data")
    if isinstance(response_data, dict):
        response_data = json.dumps(response_data)
        
    return create_log(
        module_def="MBW DMS",
        make_new=True,
        status=kwargs.get("status"),
        message=kwargs.get("message"),
        request_data=request_data,
        response_data=response_data
    )

