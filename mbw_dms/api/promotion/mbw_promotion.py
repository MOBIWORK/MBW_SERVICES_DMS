import frappe
import json
from frappe.utils import nowdate

def get_list_promotion(**kwargs):
    filters = []
    customer = kwargs.get("customer")
    territory = kwargs.get("territory")
    date = nowdate()

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

    return list_promotions
