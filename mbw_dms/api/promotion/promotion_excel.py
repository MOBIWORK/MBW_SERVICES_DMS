from mbw_dms.helpers.make_excel import MakeExcelFile
import frappe
import pydash
import json
from io import BytesIO



class MakePromotionExcel(MakeExcelFile):
    header_row1=["Mã chương trình", "Tên chuơng trình", "Mã nhóm CTKM", "Mã khu vực","Mã nhóm KH","Mã loại KH","Từ ngày", "Đến ngày","Trạng thái"]
    header_row2=False
    field_row=["code", "name_promotion", "gpromotion", "territory","customer_group","customer_type","start_date", "end_date","status"]
    merge_header=[]
    type = {
        "SP_SL_CKSP": [
                    {"label":"Mã sản phẩm mua","value": "ma_san_pham"},
                    {"label":"ĐVT","value": "don_vi_tinh"},
                    {"label":"Số lượng","value": "qualityMax"},
                    {"label":"Số Lượng tối thiểu","value": "qualityMin"},
                    {"label":"Khuyến mãi chiết khấu","value": "khuyen_mai"}
                    ],
        "SP_SL_SP": [
                    {"label":"Mã sản phẩm mua","value": "ma_san_pham"},
                    {"label":"ĐVT","value": "don_vi_tinh"},
                    {"label":"Số lượng","value": "yeu_cau"},
                    {"label":"Sản phẩm khuyến mại","value": "spkm"}
                    ],
        "SP_SL_TIEN":  [
                    {"label":"Mã sản phẩm mua","value": "ma_san_pham"},
                    {"label":"ĐVT","value": "don_vi_tinh"},
                    {"label":"Số lượng","value": "yeu_cau"},
                    {"label":"Khuyến mãi tiền","value": "khuyen_mai"}
                    ],
        "SP_ST_CKSP": [
                    {"label":"Mã sản phẩm mua","value": "ma_san_pham"},
                    {"label":"ĐVT","value": "don_vi_tinh"},
                    {"label":"Số tiền","value": "yeu_cau"},
                    {"label":"Khuyến mãi chiết khấu","value": "khuyen_mai"}
                    ],
        "SP_ST_SP": [
                    {"label":"Mã sản phẩm mua","value": "ma_san_pham"},
                    {"label":"ĐVT","value": "don_vi_tinh"},
                    {"label":"Số tiền","value": "yeu_cau"},
                    {"label":"Sản phẩm khuyến mại","value": "spkm"}
                    ],
        "SP_ST_TIEN": [
                    {"label":"Mã sản phẩm mua","value": "ma_san_pham"},
                    {"label":"ĐVT","value": "don_vi_tinh"},
                    {"label":"Số tiền","value": "yeu_cau"},
                    {"label":"Khuyến mãi tiền","value": "khuyen_mai"}
                    ],
        "TIEN_CKDH": [
                    {"label":"Tổng tiền mua","value": "yeu_cau"},
                    {"label":"Khuyến mãi chiết khấu","value": "khuyen_mai"}
                    ],
        "TIEN_SP": [
                    {"label":"Tổng tiền mua","value": "yeu_cau"},
                    {"label":"Sản phẩm khuyến mại","value": "spkm"}
                    ],
        "TIEN_TIEN": [
                    {"label":"Tổng tiền mua","value": "yeu_cau"},
                    {"label":"Khuyến mãi tiền","value": "khuyen_mai"}
                    ]
    }
    def __init__(self,data=[],type_ctkm=""):
        self.type_ctkm = type_ctkm
        self.header_row1 += pydash.map_(self.type[type_ctkm],lambda x: x.get("label"))
        self.field_row += pydash.map_(self.type[type_ctkm],lambda x: x.get("value"))
        super().__init__("",self.header_row1,self.header_row2,self.field_row,self.merge_header,data)
    

    def make(self):
        self.create_header()
        self.create_content()
        xlsx_file = BytesIO()
        self.wb.save(xlsx_file)
        # # xử lý gửi excel - xóa trên server
        return xlsx_file
    
    def convert_product_data(self,product):
        print("in",self.type_ctkm, self.type_ctkm in ["SP_SL_SP","SP_ST_SP"])
        new_product = {}
        khuyen_mai = product["khuyen_mai"]
        if isinstance(khuyen_mai,list):
            khuyen_mai = pydash.map_(khuyen_mai,lambda x: f"{x.get('ma_san_pham')}/{x['don_vi_tinh']['viewData']}/{x.get('so_luong') if x.get('so_luong') != None else 0}")
        if self.type_ctkm == "SP_SL_CKSP":#1
            new_product = {
                "ma_san_pham": product["san_pham_mua"][0]["ma_san_pham"],
                "don_vi_tinh":product["san_pham_mua"][0]["don_vi_tinh"]["viewData"],
                "qualityMax":product["yeu_cau"]["qualityMax"],
                "qualityMin":product["yeu_cau"]["qualityMin"],
                "khuyen_mai":khuyen_mai
            }
        elif self.type_ctkm in ["SP_SL_SP","SP_ST_SP"]: #2, #5
            list_spkm = []
            for id_spkm,spkm in enumerate(khuyen_mai):
                km = {
                    "spkm":spkm
                }
                if id_spkm == 0 :
                    km.update({"ma_san_pham": product["ma_san_pham"],
                                "don_vi_tinh":product["don_vi_tinh"]["viewData"],
                                "yeu_cau":product["yeu_cau"]
                                })
                list_spkm.append(km)
            print("list_spkm",list_spkm)
            new_product = list_spkm
            
        elif self.type_ctkm in ["SP_SL_TIEN","SP_ST_CKSP","SP_ST_TIEN"]: #3,#4,#6
            new_product = {
                "ma_san_pham": product["ma_san_pham"],
                "don_vi_tinh":product["don_vi_tinh"]["viewData"],
                "yeu_cau":product["yeu_cau"],
                "khuyen_mai":product["khuyen_mai"]
            }
        elif self.type_ctkm == "TIEN_SP": #8
            list_spkm = []
            for id_spkm,spkm in enumerate(khuyen_mai):
                km = {
                    "spkm":spkm
                }
                if id_spkm == 0 :
                    km.update({"yeu_cau":product["yeu_cau"]})
                list_spkm.append(km)    
            new_product = list_spkm
        elif self.type_ctkm in ["TIEN_TIEN", "TIEN_CKDH"]: #9,#7
            new_product = {
                "yeu_cau":product["yeu_cau"],
                "khuyen_mai":product["khuyen_mai"]
            }
        if self.type_ctkm not in  ["SP_SL_CKSP","SP_SL_SP","SP_ST_SP","SP_SL_TIEN","SP_ST_CKSP","SP_ST_TIEN","TIEN_SP","TIEN_TIEN", "TIEN_CKDH"]:
            raise ValueError(f"Type CTKM {self.type_ctkm} chưa tồn tại")
        return new_product



    def convert_data(self):
        data = self.data
        newDataConvert= []
        for row_data in data:
            promotion_detail = frappe.get_doc("SFA Promotion",row_data.get("name")).as_dict()
            products = promotion_detail.get("products")
            products = json.loads(products) if products else []
            main_row = {**promotion_detail,
                                   "territory":",".join([tr.territory_name for tr in promotion_detail.get("territory",[])]),
                                   "customer_type":",".join([tr.name_customer_type for tr in promotion_detail.get("customer_type",[])]),
                                   "customer_group":",".join([tr.name_customer_group for tr in promotion_detail.get("customer_group",[])])}
            
            if len(products) > 0:
                for index_p,product in enumerate(products):
                    convert_product = self.convert_product_data(product)
                    if isinstance(convert_product, list):
                        for index_c,product_cv in enumerate(convert_product):
                            if index_p ==0 and index_c == 0:
                                main_row.update(product_cv)
                                newDataConvert.append(main_row)
                            else:
                                newDataConvert.append(product_cv)   
        self.data = newDataConvert