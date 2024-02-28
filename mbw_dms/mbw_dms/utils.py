

from frappe import _, _dict

from mbw_dms.mbw_dms.doctype.dms_logs.dms_logs import create_log

def create_dms_log(**kwargs):
	return create_log(module_def="MBW DMS", **kwargs)

