import frappe
import json
from frappe.utils import nowdate
import pydash

# Lấy ra danh sách các chương trình khuyến mại
@frappe.whitelist()
def get_list_promotion(**kwargs):
    filters = []
    customer = kwargs.get("customer")
    territory = kwargs.get("territory")
    list_item = kwargs.get("listItem")
    total_amount = float(kwargs.get("totalAmount"))
    date = nowdate()
    if isinstance(list_item, str):
        list_item = json.loads(list_item)
          
    if customer:
        filters.append(f"cus.customer_code = {frappe.db.escape(customer)}")
    if territory:
        filters.append(f"pro.territory = {frappe.db.escape(territory)}")
    filters.append(f"pro.start_date <= {frappe.db.escape(date)} AND pro.end_date >= {frappe.db.escape(date)}")
    
    where_conditions = " AND ".join(filters)

    sql_query = """
        SELECT pro.*
        FROM `tabMBW Promotion` pro
        LEFT JOIN `tabCustomer Promotion` cus ON cus.parent = pro.name
    """

    if where_conditions:
        sql_query += f" WHERE {where_conditions}"
    list_promotions = frappe.db.sql(sql_query, as_dict=True)

    # Loại bỏ các trường không mong muốn
    fields_to_remove = ["creation", "modified", "modified_by", "owner", "docstatus", "idx", "_user_tags", "_comments", "_assign", "_liked_by"]

    for promo in list_promotions:
        for field in fields_to_remove:
            if field in promo:
                del promo[field]

        # Làm sạch JSON trong trường hợp chuỗi trả về không chính xác
        if "products" in promo and isinstance(promo["products"], str):
            try:
                promo["products"] = json.loads(promo["products"])
            except json.JSONDecodeError:
                promo["products"] = []

    # Áp dụng CTKM
    return r(list_item, list_promotions, total_amount)
    
# Áp dụng CTKM
def apply_Promotion(list_item=[], list_promotions=[], total_amount=0):
    promtion_list = []

    for promtion in list_promotions:
        promo_result = caculate_promotion(list_item, promtion, total_amount)
  
        if bool(promo_result):
            promtion_list.append(promo_result)
    return promtion_list
    
# Caculate Promotion
def caculate_promotion(list_item=[], promtion={}, total_amount=0):
    if promtion.get("ptype_value") == "SP_SL_CKSP":
        ref = SP_SL_CKSP(list_item, promtion)
        if bool(ref):
            return {"ptype_value": "SP_SL_CKSP", "result": ref}
        else:
            return None
        
    elif promtion.get("ptype_value") == "TIEN_SP":
        ref = TIEN_SP(promtion,total_amount)
        if bool(ref):
            return {"ptype_value": "TIEN_SP", "result": ref}
        else:
            return None

    elif promtion.get("ptype_value") == "TIEN_TIEN":
        ref = TIEN_TIEN(promtion, total_amount)
        if bool(ref):
            return {"ptype_value": "TIEN_TIEN", "result": ref}
        else:
            return None
        
    elif promtion.get("ptype_value") == "TIEN_CKDH":
        ref = TIEN_CKDH(promtion, total_amount)
        if bool(ref):
            return {"ptype_value": "TIEN_CKDH", "result": ref}
        else:
            return None
# "Trinh Tổng tiền hàng - chiết khấu đơn hàng (%)"
def TIEN_CKDH(data_Promotion={}, tongTienhang = 0):
    product = sorted(data_Promotion["products"], key=lambda x: x["yeu_cau"], reverse=True)
    tien_km = 0
    for prd in product:
        if tongTienhang >= float(prd["yeu_cau"]):
            chietKhau_promotion = tongTienhang * float(prd["khuyen_mai"]) / 100
            break
    return chietKhau_promotion

# "Trinh Tổng tiền hàng - tặng tiền"
def TIEN_TIEN(data_Promotion={}, tongTienhang = 0):
    product = sorted(data_Promotion["products"], key=lambda x: x["yeu_cau"], reverse=True)
    boi_so = data_Promotion["multiple"]
    boi_so_cap = 1
    tien_km = 0
    for prd in product:
        if tongTienhang >= float(prd["yeu_cau"]):
            boi_so_cap = float(tongTienhang / float(prd["yeu_cau"]))
            tien_km = float(prd["khuyen_mai"])
            if boi_so:
                tien_km = tien_km * boi_so_cap
            break
    return tien_km


# "TuanBD Tổng tiền hàng - tặng SP"
def TIEN_SP(data_promotion={}, tongTienhang = 0):
    list_free_item=[]
    product = sorted(data_promotion["products"], key=lambda x: x["yeu_cau"], reverse=True)
    
    boi_so = data_promotion["multiple"]
    boi_so_cap = 1
    for prd in product:
        if tongTienhang >= prd["yeu_cau"]:
            if bool(boi_so):
                boi_so_cap = int(tongTienhang / prd["yeu_cau"])
            
            for item_km in prd["khuyen_mai"]:
                product_promo = {
                    "item_code": item_km["ma_san_pham"],
                    "item_name": item_km["ten_san_pham"],
                    "uom": item_km["don_vi_tinh"].get("choice_values"),
                    "qty": item_km["so_luong"] * boi_so_cap,
                    "rate": 0,
                    "amount": 0,
                    "is_free_item": True
                }
                list_free_item.append(product_promo)
            break
    return list_free_item
        

# "TungDA Mua sản phẩm - đạt số lượng - chiết khấu SP (%)"
def SP_SL_CKSP(list_item=[], data_promotion={}):
    getProductPromotion = {}

    for item in list_item:
        product = pydash.filter_(data_promotion["products"], {"_id": item["item_code"]})
        # Sắp xếp lại danh sách sản phẩm theo yêu cầu
        product = sorted(product, key=lambda x: x["yeu_cau"], reverse=True)
        # Kết quả khuyến mại đạt được
        for prd in product:
            if bool(prd["yeu_cau_min"]) and prd["yeu_cau_min"] != 0:
                if item["qty"] >= prd["yeu_cau_min"] and item["uom"] == prd["don_vi_tinh"].get("choice_values"):
                    getProductPromotion = prd
                    break
            else:
                if item["qty"] >= prd["yeu_cau"] and item["uom"] == prd["don_vi_tinh"].get("choice_values"):
                    getProductPromotion = prd
                    break
        if bool(getProductPromotion):
            if item["qty"] >= getProductPromotion["yeu_cau"] and item["uom"] == getProductPromotion["don_vi_tinh"].get("choice_values"):
                chietKhau_promotion = item["amount"] * getProductPromotion["khuyen_mai"] / 100
                item["discount_amount"] = chietKhau_promotion
    return list_item

#"TungDA Mua sản phẩm - đạt số tien - chiết khấu SP (%)"
def SP_ST_CKSP():
    pass

#"TungDA Mua sản phẩm - đạt số tiền - tặng sản phẩm"
def SP_ST_SP():
    pass

#"TungDA Mua sản phẩm - đạt số tiền - tặng tiền"
def SP_ST_TIEN():
    pass

#"TungDA Mua sản phẩm - đạt số luong - tặng tiền"
def SP_SL_TIEN():
    pass

#"TungDA Mua sản phẩm - đạt số lượng - tặng sản phẩm"
def SP_SL_SP():
    pass



