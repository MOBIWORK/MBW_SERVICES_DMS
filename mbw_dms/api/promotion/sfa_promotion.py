import frappe
import json
from frappe.utils import get_first_day,get_last_day,nowdate
import pydash
import copy
import operator
from mbw_dms.api.common import (
    exception_handle,
    gen_response,
)
from mbw_dms.api.validators import validate_filter_timestamp, validate_filter
from datetime import datetime, date
# Biến lữu trữ các trương trình khuyến mại và kết quả đáp ứng
objPromotionOder = []

# Biến lữu trữ các sản phẩm dùng để giảm trừ
objProductInPromotion = []

# Lấy ra danh sách các chương trình khuyến mại
@frappe.whitelist()
def get_list_promotion(**kwargs):
    
    filters = []
    customer = kwargs.get("customer")
    territory = kwargs.get("territory")
    list_item = kwargs.get("listItem")
    total_amount = float(kwargs.get("totalAmount"))
    list_pro = kwargs.get("listPromotions")
    date = nowdate()
    if isinstance(list_item, str):
        list_item = json.loads(list_item)
          
    if customer:
        filters.append(f"cus.customer_code = {frappe.db.escape(customer)}")
    if territory:
        filters.append(f"pro.territory = {frappe.db.escape(territory)}")
    filters.append("pro.is_deleted = False")
    filters.append(f"pro.start_date <= {frappe.db.escape(date)} AND pro.end_date >= {frappe.db.escape(date)}")
    filters.append("pro.status = 'Hoạt động'")
    where_conditions = " AND ".join(filters)

    sql_query = """
        SELECT pro.*
        FROM `tabSFA Promotion` pro
        LEFT JOIN `tabSFA Customer Promotion` cus ON cus.parent = pro.name
    """

    if where_conditions:
        sql_query += f" WHERE {where_conditions}"
    list_promotions = frappe.db.sql(sql_query, as_dict=True)

    # Loại bỏ các trường không mong muốn
    fields_to_remove = ["creation", "modified", "modified_by", "owner", "docstatus", "idx", "_user_tags", "_comments", "_assign", "_liked_by"]
    list_promotions = [promo for promo in list_promotions if promo.name_promotion in list_pro]
    
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
    return apply_Promotion(list_item, list_promotions, total_amount)
def validate_date(date_obj):
    # Chuyển đổi datetime.date thành chuỗi, sau đó thành timestamp
    return datetime.combine(date_obj, datetime.min.time()).strftime('%Y-%m-%d %H:%M:%S')

# Trả về danh sách các khuyến mại đang hoạt động
@frappe.whitelist()
def get_available_promotions(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        customer = kwargs.get("customer")
        customerData = frappe.get_doc("Customer", customer)
        status = 'Hoạt động'
        
        start_day = validate_date(get_first_day(nowdate()))
        end_day = validate_date(get_last_day(nowdate()))
      
        filters = []
        params = []

        if start_day and end_day:
            filters.append(f"(p.start_date <= %s AND p.end_date >= %s)")
            params.extend([end_day, start_day])
        elif start_day:
            filters.append(f"p.end_date >= %s")
            params.append(start_day)
        elif end_day:
            filters.append(f"p.start_date <= %s")
            params.append(end_day)
        if status:
            filters.append(f"p.status = %s")
            params.append(status)

        filters.append("p.is_deleted = 0")
        where_conditions = " AND ".join(filters)

        # Retrieve all results without pagination
        query = f"""
            SELECT 
                p.name, 
                p.status, 
                p.code, 
                p.name_promotion, 
                p.promotion_type,
                p.ptype_value,
                p.ptype_name, 
                p.multiple,
                p.description, 
                p.gpromotion_prioritize,
                p.gpromotion,
                p.start_date, 
                p.end_date,
                p.products,
                scp.customer_name, 
                scp.customer_code, 
                scp.sfa_customer_type, 
                scp.customer_group AS customergroup, 
                scp.display_address, 
                scp.phone_number,
                stc.customer_type, 
                stc.name_customer_type, 
                sct.territory, 
                sct.territory_name,
                scg.customer_group, 
                scg.name_customer_group
            FROM 
                `tabSFA Promotion` p
            LEFT JOIN 
                `tabSFA Customer Promotion` scp ON p.name = scp.parent
            LEFT JOIN 
                `tabSFA Type Customer` stc ON p.name = stc.parent
            LEFT JOIN 
                `tabSFA Customer Territory` sct ON p.name = sct.parent
            LEFT JOIN 
                `tabSFA Customer Group` scg ON p.name = scg.parent
        """

        if where_conditions:
            query += " WHERE {}".format(where_conditions)

        results = frappe.db.sql(query, params, as_dict=True)
        promotion_dict = {}
        for row in results:
            promotion_name = row['name']
            customer_obj = {
                'customer_name': row.get('customer_name'),
                'customer_code': row.get('customer_code'),
                'sfa_customer_type': row.get('sfa_customer_type'),
                'customer_group': row.get('customergroup'),
                'display_address': row.get('display_address'),
                'phone_number': row.get('phone_number')
            }
            if promotion_name not in promotion_dict:
                start_date_value = row.get('start_date', '')
                if isinstance(start_date_value, str) and start_date_value:
                    try:
                        start_date = int(datetime.strptime(start_date_value, '%Y/%m/%d').timestamp())
                    except ValueError:
                        start_date = None
                elif isinstance(start_date_value, date):
                    start_date = int(datetime.combine(start_date_value, datetime.min.time()).timestamp())
                else:
                    start_date = None

                end_date_value = row.get('end_date', '')
                if isinstance(end_date_value, str) and end_date_value:
                    try:
                        end_date = int(datetime.strptime(end_date_value, '%Y/%m/%d').timestamp())
                    except ValueError:
                        end_date = None
                elif isinstance(end_date_value, date):
                    end_date = int(datetime.combine(end_date_value, datetime.min.time()).timestamp())
                else:
                    end_date = None
                promotion_dict[promotion_name] = {
                    'name': row.get('name', ''),
                    'status': row.get('status', ''),
                    'code': row.get('code', ''),
                    'name_promotion': row.get('name_promotion', ''),
                    'promotion_type': row.get('promotion_type', ''),
                    'ptype_name': row.get('ptype_name', ''),
                    'description': row.get('description', ''),
                    'gpromotion_prioritize': row.get('gpromotion_prioritize', ''),
                    'gpromotion': row.get('gpromotion', ''),
                    'ptype_value': row.get('ptype_value', ''),
                    'multiple': row.get('multiple', ''),
                    'start_date': start_date,
                    'end_date': end_date,
                    'products': json.loads(row.get('products', '[]')) if isinstance(row.get('products', '[]'), str) else [],
                    'customers': [],
                    'territory': [],
                    'customer_type': [],
                    'customer_group': []
                }
            if customer_obj['customer_name']:  # Chỉ thêm khi có tên khách hàng
                if customer_obj not in promotion_dict[promotion_name]['customers']:
                    promotion_dict[promotion_name]['customers'].append(customer_obj)

            if row.get('territory'):
                if row['territory'] not in promotion_dict[promotion_name]['territory']:
                    promotion_dict[promotion_name]['territory'].append(row['territory'])

            if row.get('customer_type'):
                if row['customer_type'] not in promotion_dict[promotion_name]['customer_type']:
                    promotion_dict[promotion_name]['customer_type'].append(row['customer_type'])

            if row.get('customer_group'):
                if row['customer_group'] not in promotion_dict[promotion_name]['customer_group']:
                    promotion_dict[promotion_name]['customer_group'].append(row['customer_group'])
        
        for promotion in promotion_dict.values():
            if not promotion['customers']:
                promotion['customers'] = []
        promotion_list = list(promotion_dict.values())
        # Kiểm tra điều kiện trước khi hiển thị danh sách
        customerGroup=customerData.customer_group
        customerType=customerData.sfa_customer_type
        territory=customerData.territory
        list_promotions_Stage=[]
        # Kiểm tra điều kiện với khách hàng
        for pro in promotion_list:
            checkPro = check_customer_in_promotion(pro,customerData)
            if checkPro is True:
                list_promotions_Stage.append(pro)
        
        return list_promotions_Stage
    except Exception as e:
        return exception_handle(e)
    
# Áp dụng CTKM
def apply_Promotion(list_item=[], list_promotions=[], total_amount=0):
    global objProductInPromotion
    objProductInPromotion = [] 
    promtion_list = []
   
    list_promotions = sorted(list_promotions, key=operator.itemgetter('gpromotion_prioritize'))
    
    for promtion in list_promotions:
        #print('========================= value: ', promtion.code, flush=True)
        promo_result = caculate_promotion(list_item, promtion, total_amount)

        if bool(promo_result):
            promtion_list.append(promo_result)
    return promtion_list

# Kiểm tra nếu `scp_customer_codes` không phải là null hoặc không phải chuỗi rỗng
def check_customer_in_promotion(promotion, customerData):
    ref = False
    customer_code=customerData.customer_code
    customer_territory=customerData.territory
    customer_group=customerData.customer_group
    customer_type=customerData.sfa_customer_type
   
    if not promotion.get("customers"):
        # trường hợp CTKM cấu hình theo loại nhóm, khu vực
        if len(promotion.get("territory"))==0 and len(promotion.get("customer_group"))==0 and len(promotion.get("customer_type"))==0:
            ref = True
        if len(promotion.get("territory"))>0:
            if customer_territory in promotion.get("territory"):
                ref= True
        if len(promotion.get("customer_group"))>0:
            if customer_group in promotion.get("customer_group"):
                ref= True
        if len(promotion.get("customer_type"))>0:
            if customer_type in promotion.get("customer_type"):
                ref= True
    else:
         # Kiểm tra nếu customer_code có trong danh sách scp_customer_codes
        if any(customer["customer_code"] == customer_code for customer in promotion.get("customers", [])):
            ref = True
    
        
    return ref

# Tính toán khuyến mãi
def caculate_promotion(list_item=[], promtion={}, total_amount=0):
    if promtion.get("ptype_value") == "SP_SL_CKSP":
        ref = SP_SL_CKSP(list_item, promtion)
        if bool(ref):
            return {"ptype_value": "SP_SL_CKSP", "result": ref, "allPromotion": objPromotionOder}
        else:
            return None
    elif promtion.get("ptype_value") == "TIEN_SP":
        ref = TIEN_SP(promtion,total_amount)
        if bool(ref):
            return {"ptype_value": "TIEN_SP", "result": ref, "allPromotion": objPromotionOder}
        else:
            return None
    elif promtion.get("ptype_value") == "TIEN_TIEN":
        ref = TIEN_TIEN(promtion, total_amount)
        if bool(ref):
            return {"ptype_value": "TIEN_TIEN", "result": ref, "allPromotion": objPromotionOder}
        else:
            return None
    elif promtion.get("ptype_value") == "TIEN_CKDH":
        ref = TIEN_CKDH(promtion, total_amount)
        if bool(ref):
            return {"ptype_value": "TIEN_CKDH", "result": ref, "allPromotion": objPromotionOder}
        else:
            return None
    elif promtion.get("ptype_value") == "SP_SL_SP":
        ref = SP_SL_SP(list_item, promtion)
        if bool(ref):
            return {"ptype_value": "SP_SL_SP", "result": ref, "allPromotion": objPromotionOder}
        else:
            return None
    elif promtion.get("ptype_value") == "SP_ST_SP":
        ref = SP_ST_SP(list_item, promtion)
        if bool(ref):
            return {"ptype_value": "SP_ST_SP", "result": ref, "allPromotion": objPromotionOder}
        else:
            return None
    elif promtion.get("ptype_value") == "SP_ST_CKSP":
        ref = SP_ST_CKSP(list_item, promtion)
        if bool(ref):
            return {"ptype_value": "SP_ST_CKSP", "result": ref, "allPromotion": objPromotionOder}
        else:
            return None
    elif promtion.get("ptype_value") == "SP_ST_TIEN":
        ref = SP_ST_TIEN(list_item, promtion)
        if bool(ref):
            return {"ptype_value": "SP_ST_TIEN", "result": ref, "allPromotion": objPromotionOder}
        else:
            return None
        
    elif promtion.get("ptype_value") == "SP_SL_TIEN":
        ref = SP_SL_TIEN(list_item, promtion)
        if bool(ref):
            return {"ptype_value": "SP_SL_TIEN", "result": ref, "allPromotion": objPromotionOder}
        else:
            return None
    

# "Trinh" Tổng tiền hàng - chiết khấu đơn hàng (%)
def TIEN_CKDH(data_Promotion={}, tongTienhang=0):
    product = sorted(data_Promotion["products"], key=lambda x: x["yeu_cau"], reverse=True)
    tien_km = 0

    for prd in product:
        if tongTienhang >= float(prd["yeu_cau"]):
            tien_km = prd["khuyen_mai"]
            # Lưu kết qủa nhận được
            #save_promotionResult(data_Promotion, tien_km)
            break

    return tien_km


# "Trinh" Tổng tiền hàng - tặng tiền
def TIEN_TIEN(data_Promotion={}, tongTienhang=0):
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

            # Lưu kết qủa nhận được
            save_promotionResult(data_Promotion, tien_km, boi_so)
            break
        
    return tien_km


# "TuanBD" Tổng tiền hàng - tặng SP
def TIEN_SP(data_promotion={}, tongTienhang=0):
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
        

# "TungDA" Mua sản phẩm - đạt số lượng - chiết khấu SP (%)
def SP_SL_CKSP(list_item=[], data_promotion={}):
    getProductPromotion = {}

    for item in list_item:
        product = pydash.filter_(data_promotion["products"], {"_id": item["item_code"]})
        # Sắp xếp lại danh sách sản phẩm theo yêu cầu
        product = sorted(product, key=lambda x: x["yeu_cau"], reverse=True)

        # Chiết khấu hiện tại của sản phẩm
        current_discount = item["discount_amount"]
        # Kết quả khuyến mại đạt được
        for prd in product:
            if bool(prd["yeu_cau_min"]) and prd["yeu_cau_min"] != 0:
                if item["qty"] >= prd["yeu_cau_min"] and item["uom"] == prd["don_vi_tinh"].get("choice_values"):
                    getProductPromotion = prd
                    break
                else:
                    item["discount_percentage"] = 0
            else:
                if item["qty"] >= prd["yeu_cau"] and item["uom"] == prd["don_vi_tinh"].get("choice_values"):
                    getProductPromotion = prd
                    break
                else:
                    item["discount_percentage"] = 0

        if bool(getProductPromotion):
            if item["qty"] >= getProductPromotion["yeu_cau"] and item["uom"] == getProductPromotion["don_vi_tinh"].get("choice_values"):
                chietKhau_promotion = item["rate"] * getProductPromotion["khuyen_mai"] / 100
                getProductPromotion["chietKhau_promotion"] = chietKhau_promotion

                # Cộng giảm giá hiện tại với giảm giá khuyến mãi
                item["discount_amount"] = chietKhau_promotion + current_discount

                # Lưu kết quả khuyến mãi
                save_promotionResult(data_promotion, getProductPromotion, 1)
              
    
    return list_item


# "TuanBD" Mua sản phẩm - đạt số tiền - chiết khấu SP (%)
def SP_ST_CKSP(list_item=[], data_promotion={}):
    getProductPromotion = {}
    
    for item in list_item:
        # Sắp xếp lại danh sách sản phẩm theo yêu cầu
        product = pydash.filter_(data_promotion["products"], {"_id": item["item_code"]})
        product = sorted(product, key=lambda x: x["yeu_cau"], reverse=True)

        # Kết quả khuyến mại đạt được
        for prd in product:
            if item["base_amount"] >= prd["yeu_cau"] and item["uom"] == prd["don_vi_tinh"].get("choice_values"):
                getProductPromotion = prd
                break
            else:
                item["discount_percentage"] = 0

        if bool(getProductPromotion):
            if item["base_amount"] >= getProductPromotion["yeu_cau"] and item["uom"] == getProductPromotion["don_vi_tinh"].get("choice_values"):
                km_discount = getProductPromotion["khuyen_mai"]
                item["discount_percentage"] = km_discount
    return list_item


# "TuanBD" Mua sản phẩm - đạt số tiền - tặng sản phẩm
def SP_ST_SP(list_item=[], data_promotion={}):
    getProductPromotion = {}
    list_free_item=[]
    boi_so = data_promotion.get("multiple", False)

    for item in list_item:
        product = pydash.filter_(data_promotion.get("products", []), {"_id": item["item_code"]})
        product = sorted(data_promotion["products"], key=lambda x: x["yeu_cau"], reverse=True)

        for prd in product:
            if item["base_amount"] >= prd["yeu_cau"] and prd["don_vi_tinh"].get("choice_values"):
                getProductPromotion = prd
                break
        
        if bool(getProductPromotion):
            if item["base_amount"] >= prd["yeu_cau"] and prd["don_vi_tinh"].get("choice_values"):
                # Tính bội số
                boi_so_cap = int(item["base_amount"] / getProductPromotion["yeu_cau"]) if boi_so else 1

                # Thêm sản phẩm khuyến mãi
                list_free_item.extend(
                    {
                        "item_code": km["ma_san_pham"],
                        "item_name": km["ten_san_pham"],
                        "uom": km["don_vi_tinh"].get("choice_values"),
                        "qty": km["so_luong"] * boi_so_cap,
                        "rate": 0,
                        "amount": 0,
                        "is_free_item": True
                    }
                    for km in getProductPromotion["khuyen_mai"]
                )
                save_promotionResult(data_promotion, getProductPromotion, boi_so_cap)
    return list_free_item


# "TuanBD" Mua sản phẩm - đạt số tiền - tặng tiền
def SP_ST_TIEN(list_item=[], data_promotion={}):
    getProductPromotion = {}
    boi_so = data_promotion.get("multiple", False)
    boi_so_cap = 1
    
    for item in list_item:
        item_amount = item["price_list_rate"] * item["qty"]
        # Sắp xếp lại danh sách sản phẩm theo yêu cầu
        product = pydash.filter_(data_promotion["products"], {"_id": item["item_code"]})
        product = sorted(product, key=lambda x: x["yeu_cau"], reverse=True)

        # Kết quả khuyến mại đạt được
        for prd in product:
            if item_amount >= prd["yeu_cau"] and item["uom"] == prd["don_vi_tinh"].get("choice_values"):
                getProductPromotion = prd
                break
            else:
                item["discount_amount"] = 0

        if bool(getProductPromotion):
            if item_amount >= getProductPromotion["yeu_cau"] and item["uom"] == getProductPromotion["don_vi_tinh"].get("choice_values"):
                boi_so_cap = int(item_amount / getProductPromotion["yeu_cau"]) if boi_so else 1
                item["discount_amount"] = getProductPromotion["khuyen_mai"] * boi_so_cap

    return list_item


# "TuanBD" Mua sản phẩm - đạt số luong - tặng tiền
def SP_SL_TIEN(list_item=[], data_promotion={}):
    getProductPromotion = {}
    boi_so = data_promotion.get("multiple", False)

    for item in list_item:
        # Tìm sản phẩm khuyến mãi tương ứng với item
        product = pydash.filter_(data_promotion.get("products", []), {"_id": item["item_code"]})
        product = sorted(product, key=lambda x: x["yeu_cau"], reverse=True)
        
        for prd in product:
            if bool(prd["yeu_cau_min"]) and prd["yeu_cau_min"] != 0:
                if item["qty"] >= prd["yeu_cau_min"] and item["uom"] == prd["don_vi_tinh"].get("choice_values"):
                    getProductPromotion = prd
                    break
                else:
                    item["discount_amount"] = 0
            else:
                if item["qty"] >= prd["yeu_cau"] and item["uom"] == prd["don_vi_tinh"].get("choice_values"):
                    getProductPromotion = prd
                    break
                else:
                    item["discount_amount"] = 0

        if bool(getProductPromotion):
            if item["qty"] >= getProductPromotion["yeu_cau"] and item["uom"] == getProductPromotion["don_vi_tinh"].get("choice_values"):
                boi_so_cap = int(item["qty"] / getProductPromotion["yeu_cau"]) if boi_so else 1
                item["discount_amount"] = getProductPromotion["khuyen_mai"] * boi_so_cap
    
    return list_item


# "TuanBD" Mua sản phẩm - đạt số lượng - tặng sản phẩm
def SP_SL_SP(list_item=[], data_promotion={}):
    getProductPromotion = {}
    list_free_item = []
    boi_so = data_promotion.get("multiple", False)
    for item in list_item:
        # Tìm sản phẩm khuyến mãi tương ứng với item
        product = pydash.filter_(data_promotion.get("products", []), {"_id": item["item_code"]})
        product = sorted(product, key=lambda x: x["yeu_cau"], reverse=True)
        sl_pass=0
        dvt_pass=""
        so_luong=item["qty"]
        if data_promotion.get("gpromotion") is not None:
                sl_chan = next(
                    (product for product in objProductInPromotion if product["dvt"] == item["uom"] and product["idsp"] == item["item_code"]), 
                    None
                )
                if sl_chan is not None:
                    so_luong = sl_chan["sl_KhauTru"]
       
        for prd in product:
            if bool(prd["yeu_cau_min"]) and prd["yeu_cau_min"] != 0:
                if so_luong >= prd["yeu_cau_min"] and item["uom"] == prd["don_vi_tinh"].get("choice_values"):
                    sl_pass=so_luong
                    dvt_pass=prd["don_vi_tinh"]
                    getProductPromotion = prd
                    break
            else:
                if so_luong >= prd["yeu_cau"] and item["uom"] == prd["don_vi_tinh"].get("choice_values"):
                    sl_pass=so_luong
                    dvt_pass=prd["don_vi_tinh"]
                    getProductPromotion = prd
                    break

        if getProductPromotion:
            if so_luong >= getProductPromotion["yeu_cau"] and item["uom"] == getProductPromotion["don_vi_tinh"].get("choice_values"):
                # Tính bội số
                boi_so_cap = int(so_luong / getProductPromotion["yeu_cau"]) if boi_so else 1
                # Thêm sản phẩm khuyến mãi
                list_free_item.extend(
                    {
                        "item_code": km["ma_san_pham"],
                        "item_name": km["ten_san_pham"],
                        "uom": km["don_vi_tinh"].get("choice_values"),
                        "qty": km["so_luong"] * boi_so_cap,
                        "rate": 0,
                        "amount": 0,
                        "is_free_item": True
                    }
                    for km in getProductPromotion["khuyen_mai"]
                )
                save_promotionResult(data_promotion, getProductPromotion, boi_so_cap)
                # Luu so luong san pham da su dung KM
                On_Process_GiamTru(data_promotion,getProductPromotion,sl_pass,dvt_pass, boi_so_cap)
    return list_free_item


# Lưu trữ CTKM
def save_promotionResult(objDataKM, so_luong, boi_so):
    if objDataKM.ptype_value in ["TIEN_TIEN", "TIEN_CKDH"]:
        objRef = {"_id": "CKDH", "ma_san_pham": "", "ten_san_pham": "", "don_vi_tinh": "", "so_luong": so_luong}
        objKM = { "id": objDataKM.name, "ten_khuyen_mai": objDataKM.name_promotion, "ptype": objDataKM.ptype_value, "product": objRef }
        
        item_promotion = pydash.arrays.index_of(pydash.collections.map_(objPromotionOder, "id"), objDataKM.name)

        # If the item exists, update it
        if item_promotion >= 0:
            objPromotionOder[item_promotion] = objKM
        # If the item does not exist, append it
        else:
            objPromotionOder.append(objKM)

    elif objDataKM.ptype_value in ["SP_SL_CKSP", "SP_SL_TIEN", "SP_ST_TIEN", "SP_ST_CKSP"]:
        objRef = [{ "_id": "CKSP", "id_sp": so_luong["_id"], "ma_san_pham": so_luong["ma_san_pham"], "ten_san_pham": so_luong["ten_san_pham"], "don_vi_tinh": so_luong["don_vi_tinh"], "so_luong": 0,  "so_tien": so_luong["chietKhau_promotion"]}]
        
        objKM = { "id": objDataKM.name, "ten_khuyen_mai": objDataKM.name_promotion, "ptype": objDataKM.ptype_value, "product": objRef }

        item_promotion = pydash.arrays.index_of(pydash.collections.map_(objPromotionOder, "id"), objDataKM.name)
        # If the item exists, update it
        if item_promotion >= 0:
            objPromotionOder[item_promotion] = objKM
        # If the item does not exist, append it
        else:
            objPromotionOder.append(objKM)
        
    elif objDataKM.ptype_value in ["SP_SL_SP", "SP_ST_SP", "TIEN_SP"]:
        objProdProt = []
        productKM = copy.deepcopy(so_luong)  # Deep copy of so_luong
        
        for km in productKM["khuyen_mai"]:
            soluong = km["so_luong"]
            km["so_luong"] = soluong * boi_so
            objProdProt.append(km)
        
        objKM = {
            "id": objDataKM.name,
            "ten_khuyen_mai": objDataKM.name_promotion,
            "ptype": objDataKM.ptype_value,
            "product": objProdProt
        }
        objPromotionOder.append(objKM)
    
# Giảm trừ CTKM
def On_Process_GiamTru(dataKM,objKM, sl, dvt_pass, boi_so_cap):
    if dataKM.get("gpromotion") is not None:
            slCanGiamTru = float(sl) - (objKM["yeu_cau"] * boi_so_cap)
            hasExsit = False
            # Khởi tạo objPromotionHasApply bên ngoài điều kiện
            objPromotionHasApply = None
            for item in objProductInPromotion:
                if item["idsp"] == objKM["_id"] and item["dvt"] == objKM['don_vi_tinh']['choice_values']:
                    updateNum = max(item["sl_KhauTru"] - (objKM["yeu_cau"] * boi_so_cap), 0)
                    item["sl_KhauTru"] = updateNum
                    hasExsit = True
                    break
            if not hasExsit:
                objPromotionHasApply = {
                    "idsp": objKM["_id"],
                    "dvt": objKM['don_vi_tinh']['choice_values'],
                    "sl_Goc": sl,
                    "sl_KhauTru": slCanGiamTru,
                    "don_gia": sl,
                    "gttb": 0
                }
                objProductInPromotion.append(objPromotionHasApply)
            
            #     # Uncomment if needed
            #     # for item in objProductInPromotion:
            #     #     item["gttb"] = gttb

                


