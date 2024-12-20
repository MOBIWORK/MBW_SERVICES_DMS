import frappe
from frappe import _
from mbw_dms.api.common import gen_response,exception_handle
from mbw_dms.api.validators import validate_filter_timestamp, validate_filter
import json
from frappe.desk.utils import provide_binary_file
from mbw_dms.api.promotion.promotion_excel import MakePromotionExcel


@frappe.whitelist(methods="POST")
def create_promotion(**body):
    try:
        normal_field = ["code", "name_promotion", "status", "territory", "promotion_type", "multiple", "ptype_name",
                        "customer_group", "ptype_value", "gtype_value", "customer_type", "gpromotion", "ctype_value", "gpromotion_prioritize",
                        "customers", "is_customer_application_type", "is_app", "is_archived", "banner", "description"]
        require_field = ["code", "name_promotion", "status", "ptype_value"]
        json_field = ["products"]
        date_field = ["start_date","end_date"]
        # Check required fields
        for key in require_field:
            if not body.get(key):
                return gen_response(400, f"{key} is required")
        
        # Check if code is unique
        code = body.get("code")
        if frappe.db.exists("SFA Promotion", {"code": code, "is_deleted": 0}):
            return gen_response(400, "Mã chương trình khuyến mãi đã tồn tại")
        message = "Thêm chương trình khuyến mãi thành công"
        newPromotion = frappe.new_doc("SFA Promotion")
        
        # Handle fields from body
        for key, value in body.items():
            if key in normal_field:
                if key == "multiple":
                    value = 1 if value else 0
                newPromotion.set(key, value)
            elif key in require_field:
                if not value:
                    return gen_response(400, f"{key} is required")
                else:
                    newPromotion.set(key, value)
            elif key in json_field:
                newPromotion.set(key, json.dumps(value))
            elif key in date_field:
                if key == "start_date":
                    value = validate_filter_timestamp("start")(value)
                else:
                    value = validate_filter_timestamp("end")(value)
                newPromotion.set(key, value)
        
        newPromotion.save()
        return gen_response(201, message, newPromotion.name)
    
    except Exception as e:
        print("Lỗi tạo form", e)
        exception_handle(e)

@frappe.whitelist(methods="PATCH")
def update_promotion(**body):
    try:
        name = validate_filter(type_check='require', value=body.get('name'))
        normal_field =["code", "name_promotion", "status", "territory", "promotion_type", "multiple", "ptype_name",
                        "customer_group", "ptype_value", "gtype_value", "customer_type", "gpromotion", "ctype_value", "gpromotion_prioritize",
                        "customers", "is_customer_application_type", "is_app", "is_archived", "banner", "description"]
        require_field = ["code", "name_promotion", "status", "ptype_value"]
        json_field = ["products"]
        date_field = ["start_date", "end_date"]
        
        newPromotion = frappe.get_doc("SFA Promotion", name)
        
        # Check required fields
        for key in require_field:
            if not body.get(key):
                return gen_response(400, f"{key} is required")

        # Check if code is unique (excluding the current document)
        code = body.get("code")
        if code and frappe.db.exists("SFA Promotion", {"code": code, "name": ["!=", name], "is_deleted": 0}):
            return gen_response(400, "Mã chương trình khuyến mãi đã tồn tại")
        
        # Handle fields from body
        for key, value in body.items():
            if key in normal_field:
                if key == "multiple":
                    value = 1 if value else 0
                newPromotion.set(key, value)
            elif key in require_field:
                if not value:
                    return gen_response(400, f"{key} is required")
                else:
                    newPromotion.set(key, value)
            elif key in json_field:
                newPromotion.set(key, json.dumps(value))
            elif key in date_field:
                if key == "start_date":
                    value = validate_filter_timestamp("start")(value)
                else:
                    value = validate_filter_timestamp("end")(value)
                newPromotion.set(key, value)
        
        newPromotion.save()
        return gen_response(201, newPromotion.name, True)
    
    except Exception as e:
        exception_handle(e)



@frappe.whitelist(methods="GET",allow_guest=True)
def export_promotion(**body):
    try:
        import pydash
        promotion_ids = body.get("promotion_ids", "")
        array_promo =  promotion_ids.split(";")

        if len(promotion_ids) == 0:
            return gen_response(400, _("No promotion is choosed"))
        
        list_promotion = frappe.db.get_all("SFA Promotion", {"name": ["in", array_promo]}, ["name", "ptype_value"])
        check_type_ctkm = {promo.get("ptype_value") for promo in list_promotion}
        if len(check_type_ctkm) > 1:
            return gen_response(400, _("Select just a promotion type !!"))
        
        check_type_ctkm = list(check_type_ctkm)
        excel = MakePromotionExcel(data=list_promotion, type_ctkm=check_type_ctkm[0])
        excel.addStartRowHeader(1)
        excel.addStartRowContent(2)
        excel_file = excel.make()

        return provide_binary_file("", "xlsx", excel_file.getvalue())
    
    except Exception as e:
        return exception_handle(e)