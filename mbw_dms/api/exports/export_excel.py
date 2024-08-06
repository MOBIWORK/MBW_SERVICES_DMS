import frappe
from mbw_dms.api.common import (
    gen_response,exception_handle
)
from frappe import  _
import importlib
from mbw_dms.api.exports.constant import template_header
from openpyxl import Workbook
from io import BytesIO
import os
from frappe.desk.utils import provide_binary_file
from mbw_dms.api.exports.make_excel import MakeExcel
import json
@frappe.whitelist(methods="GET")
def export_excel(**kwarg):
    report_type  = kwarg.get("report_type","")
    filter = kwarg.get("data_filter")
    if bool(report_type) == False:
        return gen_response(500,_("Link is require"))
    if bool(filter) == False:
        return gen_response(500,_("Time is require"))
    filter = json.loads(filter)
    link = template_header[report_type]
    data = []
    try:
        parts = link.split(".")
        function_name = parts[-1]
        module = ".".join(parts[:-1])
        module = importlib.import_module(module)
        # Lấy hàm từ module
        function_to_call = getattr(module, function_name)
        data = function_to_call({**filter,"is_excel": True})
        print("data===================",data)
        #xử lý tạo excel
        create_xlsx = MakeExcel(report_type,data,filter.get("month"),filter.get("year"))
        xlsx_file = create_xlsx.make()
        # # xử lý gửi excel - xóa trên server        
        # os.remove(xlsx_file)
        return provide_binary_file("", "xlsx", xlsx_file.getvalue())
    except Exception as e: 
        print("error when call link:::::::::::: ",e)
        exception_handle(e)