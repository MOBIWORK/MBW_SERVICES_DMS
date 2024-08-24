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
from mbw_dms.api.exports.make_excel import (MakeExcel,MakeExcelCheckin,MakeExcelCustomer,MakeExcelCustomerCheckin,MakeExcelInventory,MakeExcelKpi,MakeExcelOrder,MakeExcelSell)
from mbw_dms.api.validators import validate_filter

import json
@frappe.whitelist(methods="GET")
def export_excel(**kwarg):
    report_type  = validate_filter(
        value= kwarg.get("report_type",""),
        type_check="enum",type=[ "Report KPI","Report Inventory","Report Checkin",
                                "Report Sell","Report Order","Report Customer",
                                "Report Customer Checkin"])  
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
        print({**filter,"is_excel": True},data)
        #xử lý tạo excel theo từng trường hợp
        if report_type == "Report KPI":
            create_xlsx = MakeExcelKpi(report_type,data,filter.get("month"),filter.get("year"))
        elif report_type == "Report Checkin":
            create_xlsx = MakeExcelCheckin(report_type,data,filter.get("from_date"),filter.get("to_date"))
        elif report_type == "Report Inventory":
            create_xlsx = MakeExcelInventory(report_type,data,filter.get("update_at_from") or "",filter.get("update_at_to") or "",filter.get("team_sale") if filter.get("team_sale") else "Tất cả" )
        elif report_type == "Report Sell":
            create_xlsx = MakeExcelSell(report_type,data,filter.get("from_date"),filter.get("to_date"))
        elif report_type == "Report Order":
            create_xlsx = MakeExcelOrder(report_type,data,filter.get("from_date"),filter.get("to_date"))
        elif report_type == "Report Customer":
            create_xlsx = MakeExcelCustomer(report_type,data,filter.get("month"),filter.get("year"))
        elif report_type == "Report Customer Checkin":
            create_xlsx = MakeExcelCustomerCheckin(report_type,data,filter.get("month"),filter.get("year"))
        else:
            return gen_response(500,_("Kiểu báo cáo không hợp lệ!!!!"))
        xlsx_file = create_xlsx.make()
        # # xử lý gửi excel - xóa trên server        
        # os.remove(xlsx_file)
        return provide_binary_file("", "xlsx", xlsx_file.getvalue())
    except Exception as e: 
        print("error when call link:::::::::::: ",e)
        exception_handle(e)