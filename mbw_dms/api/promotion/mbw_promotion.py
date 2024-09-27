import frappe
import json
from frappe.utils import nowdate
import pydash
#Get All Promotion By Fitler
@frappe.whitelist()
def get_list_promotion(**kwargs):
    filters = []
    customer = kwargs.get("customer")
    territory = kwargs.get("territory")
    list_item=kwargs.get("listItem")
    date = nowdate()
    # If list_Item is a string, convert it to a list using json.loads()
    if isinstance(list_item, str):
        list_item = json.loads(list_item)
          
    if customer:
        filters.append(f"cus.customer_code={frappe.db.escape(customer)}")
    if territory:
        filters.append(f"pro.territory={frappe.db.escape(territory)}")
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
        # Loại bỏ các trường không cần thiết
        for field in fields_to_remove:
            if field in promo:
                del promo[field]

        # Làm sạch JSON trong trường hợp chuỗi trả về không chính xác
        if 'products' in promo and isinstance(promo['products'], str):
            try:
                promo['products'] = json.loads(promo['products'])
            except json.JSONDecodeError:
                promo['products'] = []

    #Tính toán CTKM
    return apply_Promotion(list_item,list_promotions)
    
#Reset data truoc khi goi khuyen mai

#Caculate Promotion
def apply_Promotion(list_item=[],list_promotions=[]):
    for promtion in list_promotions:
        return caculate_promotion(list_item,promtion)
    
#Caculate Promotion
def caculate_promotion(list_item=[],promtion={}):
    if promtion.get("ptype_value")=="SP_SL_CKSP":
        ref=SP_SL_CKSP(list_item,promtion)
        return {"ptype_value":"SP_SL_CKSP","result":ref}

    

#"TuanBD Tổng tiền hàng - chiết khấu đơn hàng (%)"
def TIEN_CKDH():
    pass

#"TuanBD Tổng tiền hàng - tặng tiền"
def TIEN_TIEN():
    pass

#"TuanBD Tổng tiền hàng - tặng SP"
def TIEN_SP():
    pass

#"TungDA Mua sản phẩm - đạt số lượng - chiết khấu SP (%)"
def SP_SL_CKSP(list_Item=[],data_Promotion={}):
    list_Item_Return=[]
    getProductPromotion={}

    for item in list_Item:
        product = pydash.filter_(data_Promotion['products'], {'_id': item["item_code"]})
        #Sap xep san pham theo yeu cau
        product = pydash.sort_by(product, 'yeu_cau')
        product.reverse()
        #Ket qua khuyen mai dat duoc
        
        for prd in product:
            if bool(prd["yeu_cau_min"]) and prd["yeu_cau_min"]!=0:
                if item["qty"]>=prd["yeu_cau_min"] and item["uom"]==prd["don_vi_tinh"].get("choice_values"):
                    getProductPromotion=prd
                    break
            else:
                if item["qty"]>=prd["yeu_cau"] and item["uom"]==prd["don_vi_tinh"].get("choice_values"):
                    getProductPromotion=prd
                    break
        if bool(getProductPromotion):
            if item["qty"]>=getProductPromotion["yeu_cau"] and item["uom"]==getProductPromotion["don_vi_tinh"].get("choice_values"):
                chietKhau_promotion=item["amount"]*getProductPromotion["khuyen_mai"]/100
                item["discount_amount"]=chietKhau_promotion
    return list_Item

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



