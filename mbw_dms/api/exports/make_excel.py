import frappe
from frappe import _
from io import BytesIO
from mbw_dms.api.common import ( get_employee_info,gen_response)
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
wb = Workbook()
ws = wb.active

name_report = {
    "Report KPI":"Báo cáo KPI"
}

columnReport = {
    "Report KPI" : {
        "column" : {
            "main_columns": ["STT", "Mã nhân viên","Nhân viên", "Nhóm bán hàng","Số khách hàng viếng thăm","","", "Số khách hàng viếng thăm duy nhất","","", "Số khách đặt hàng","","","Số khách hàng thêm mới","","","Số đơn hàng","","", "Doang số (VNĐ)","","","Doang thu (VNĐ)","","", "Sản Lượng","","","SKU","","", "Số giờ làm việc""","",],
            "sub_column": ["","","","","KH","TH","TL(%)","KH","TH","TL(%)","KH","TH","TL(%)","KH","TH","TL(%)","KH","TH","TL(%)","KH","TH","TL(%)","KH","TH","TL(%)","KH","TH","TL(%)","KH","TH","TL(%)","KH","TH","TL(%)",],
        },
        "col_span": ["A9:A11", "B9:B11", "C9:C11", "D9:D11","E9:G10","H9:J10","K9:M10","N9:P10","Q9:S10","T9:V10","W9:Y10","Z9:AB10","AC9:AE10","AF9:AH10"],
        # "col_span": ["A9:A10", "B9:B10", "C9:C10", "D9:D10","E9:G9","H9:J9","K9:M9","N9:P9","Q9:S9","T9:V9","W9:Y9","Z9:AB9","AC9:AE9","AF9:AH9"],
        "show_data": ["nhan_vien_ban_hang","ten_nv","nhom_ban_hang","kh_vt","th_vt","tl_vt","kh_vt_dn","th_vt_dn","tl_vt_dn","kh_dat_hang","th_dat_hang","tl_dat_hang","kh_kh_moi","th_kh_moi","tl_kh_moi","kh_don_hang","th_don_hang","tl_don_hang","kh_doanh_so","th_doanh_so","tl_don_hang","kh_doanh_thu","th_doanh_thu","tl_doanh_thu","kh_san_lg","th_san_lg","tl_san_luong","kh_sku","th_sku","tl_sku","kh_so_gio_lam_viec","th_so_gio_lam_viec","tl_so_gio_lam_viec"],
        "footer" : ["","","","","tong_kh_vt","tong_th_vt","","tong_kh_vt_dn","tong_th_vt_dn","","tong_kh_dat_hang","tong_th_dat_hang","","tong_kh_kh_moi","tong_th_kh_moi","","tong_kh_don_hang","tong_th_don_hang","","tong_kh_doanh_so","tong_th_doanh_so","","tong_kh_doanh_thu","tong_th_doanh_thu","","tong_kh_san_lg","tong_th_san_lg","","tong_kh_sku","tong_th_sku","","tong_kh_so_gio_lam_viec","tong_th_so_gio_lam_viec",""],
        "column_widths" : {
                            "A": 5, "B": 15, "C": 25, "D": 35,
                            "E": 10, "F": 10, "G": 10, "H": 10,
                            "I": 10, "J": 10, "K": 10, "L": 10,
                            "M": 10, "N": 10, "O": 10, "P": 10,
                            "Q": 10, "R": 10, "S": 10, "T": 10,
                            "U": 10, "V": 10, "W": 10, "X": 10,
                            "Y": 10, "Z": 10, "AA": 10, "AB": 10,
                            "AC": 10, "AD": 10, "AE": 10, "AF": 10,
                            "AG": 10, "AH": 10
                        }
    }
}
class MakeExcel :
    # Định dạng chung
    header_fill = PatternFill(start_color="FFC000", end_color="FFC000", fill_type="solid")
    header_tableFill = PatternFill(start_color="46ea46", end_color="46ea46", fill_type="solid")
    bold_font = Font(bold=True)
    center_alignment = Alignment(horizontal="center")
    # Font and alignment settings
    title_font = Font(bold=True, size=14)
    subtitle_font = Font(italic=True, size=10)
    header_font = Font(size=11, bold=False, color="5C6B82")  # Define a custom font color
    bold_font = Font(size=11, bold=True, color="000000")  # Bold font for subheaders
    center_alignment = Alignment(horizontal="center", vertical="center")  # Center alignment
    left_alignment = Alignment(horizontal="left", vertical="center")  # Left alignment
    border_style = Border(
        left=Side(style='thin', color='000000'),
        right=Side(style='thin', color='000000'),
        top=Side(style='thin', color='000000'),
        bottom=Side(style='thin', color='000000')
    ) 

    def __init__(self,report_type,data,month,year):
        self.month = month
        self.year = year
        self.report_type = report_type
        self.data_content = data.get("data")
        self.data_footer = data.get("sum")
        self.description_data = []
        self.org_info(report_type)
        print("self.description_data",self.description_data)
    # lấy thông tin tổ chức 
    def org_info(self,report_type):
        if len(self.description_data) == 0 :
            employee_info = get_employee_info()
            if employee_info != "":
                employee_info = frappe._dict(employee_info)
                if not employee_info.company :
                    gen_response(500,_("Accout not in any company!"))
                company_info = frappe.db.get_value("Company",employee_info.company,["name","phone_no"],as_dict=1)
                address = frappe.db.get_all(doctype= "Address",filters= {"link_doctype": "Company", "link_name" : employee_info.company},fields=["*"])
                address_title = address[0].address_title if len(address) >0 else ""
                self.description_data = [
                    ["", employee_info.company, "", "", "", ""],
                    ["", f"Điện thoại: {company_info.phone_no}", "", "", "", ""],
                    ["", f"Địa chỉ: {address_title}", "", "", "", ""],
                    ["", "", "", "", "", ""],
                    ["", name_report[report_type], "", "", "", ""],
                    ["", f"Tháng: {self.month} - Năm: {self.year} ", "", "", "", ""]
                ]
        return self
    #tạo bảng report hoàn chỉnh
    def make(self):
        self.make_description_header()
        self.make_header()
        if len(self.data_content) > 0:
            self.make_table()
        self.make_footer()
        xlsx_file = BytesIO()
        wb.save(xlsx_file)
        # # xử lý gửi excel - xóa trên server
        return xlsx_file

    # tạo phần tiêu đề report
    def make_description_header(self):
        merge = ['B1:F1','B2:F2','B3:F3','B5:F5',"B6:F6","B7:F7"]
        # Populate the worksheet with data
        for row in self.description_data :
            ws.append(row)
        # Merge cells for styling as in the image
        for mer in merge:
            ws.merge_cells(mer)
        ws['B1'].font = self.bold_font
        ws['B1'].alignment = self.center_alignment
        ws['B1'].fill = self.header_fill

        ws['B5'].font = self.title_font
        ws['B5'].alignment = self.center_alignment

        ws['B6'].font = self.subtitle_font
        ws['B6'].alignment = self.center_alignment

        ws['B7'].font = self.subtitle_font
        ws['B7'].alignment = self.center_alignment
        # Định dạng chiều rộng cột
        column_widths = columnReport[self.report_type]["column_widths"] 
        for col, width in column_widths.items():
            ws.column_dimensions[col].width = width
        
        return self
    
    # tạo header bảng
    def make_header(self):
        headers_row1 = columnReport[self.report_type]["column"]["main_columns"]
        headers_row2 = columnReport[self.report_type]["column"]["sub_column"]
        col_span = columnReport[self.report_type]["col_span"]
        for mg in col_span:
            try:
                ws.unmerge_cells(mg)
            except :
                print("not merge")
        # điền title header
        # Điền các giá trị tiêu đề cho hàng đầu tiên bằng vòng lặp
        for col_idx, header in enumerate(headers_row1, start=1):
            cell = ws.cell(row=9, column=col_idx, value=header)
            #áp dụng style
            cell.font = self.bold_font
            cell.alignment = self.center_alignment
            cell.border = self.border_style
            cell.fill = self.header_tableFill

        # Fill in the header values for the second row using a loop
        for col_idx, header in enumerate(headers_row2, start=1):
            cell = ws.cell(row=11, column=col_idx, value=header)
            #áp dụng style
            cell.font = self.bold_font  # Use bold font for the subheader
            cell.alignment = self.center_alignment
            cell.border = self.border_style
            cell.fill = self.header_tableFill
        # # gom các cột cha với các cột con
        for mg in col_span:
            ws.merge_cells(mg)
        return self

    # tạo nội dung bảng
    def make_table(self):
        sort_list = columnReport[self.report_type]["show_data"]
        # print("sort_list",sort_list)
        # Add the data to the worksheet
        start_row = 12
        # phải xem lại
        for row_idx, row_data in enumerate(self.data_content, start=start_row):
            cell = ws.cell(row=row_idx, column=1, value=row_idx-11)
            cell.alignment = self.center_alignment
            cell.border = self.border_style
            for col_idx, value in enumerate(sort_list, start=2):
                cell = ws.cell(row=row_idx, column=col_idx, value=row_data.get(value) or 0)
                cell.alignment = self.left_alignment if col_idx <= 4 else self.center_alignment
                cell.border = self.border_style
        
        return self
    def make_footer(self):
        sort_footer = columnReport[self.report_type]["footer"]
        start_row = len(self.data_content) + 12
        # for row_idx, row_data in enumerate(self.data_footer, start=start_row):
        
        for col_idx, value in enumerate(sort_footer, start=1):
            # if col_idx == 1:
            #     cell = ws.cell(row=row_idx, column=col_idx, value=row_idx)
            #     cell.alignment = self.center_alignment
            # else:
            cell = ws.cell(row=start_row, column=col_idx, value=self.data_footer.get(value))
            cell.alignment = self.left_alignment if col_idx <= 4 else self.center_alignment
            cell.border = self.border_style
        cell = ws.cell(row=start_row, column=2, value="Tổng")
        cell.alignment = self.center_alignment
        cell.border = self.border_style
        return self
    

