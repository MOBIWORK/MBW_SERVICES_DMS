import frappe

# danh sach tuyen
@frappe.whitelist()
def get_list_router(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import get_list_router
    return get_list_router(filters=kwargs)

# chi tiet tuyen
@frappe.whitelist()
def get_router(id):
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import get_router
    return get_router(id=id)

# danh sach khach hang cham soc
@frappe.whitelist()
def get_customer_router(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import get_customer_router_v2
    return get_customer_router_v2(data=kwargs)

#danh sach khach hang import
@frappe.whitelist(methods="POST")
def get_customer_import(**params):
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import get_customers_import
    return get_customers_import(data=params)

# them tuyen
@frappe.whitelist()
def create_router(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import create_router
    return create_router(body=kwargs)

#cap nhat tuyen
@frappe.whitelist(methods="PATCH")
def update_router(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import update_router
    return update_router(body=kwargs)

#cap nhat trang thai nhieu  tuyen
@frappe.whitelist(methods="PATCH")
def update_routers(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import update_routers
    return update_routers(body=kwargs)


# nhom ban hang
@frappe.whitelist()
def get_team_sale():
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import get_team_sale
    return get_team_sale()

@frappe.whitelist()
def get_sale_person(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import get_sale_person
    return get_sale_person(data=kwargs)

@frappe.whitelist()
def get_customer(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import get_customer
    return get_customer(filters=kwargs)

# api test handle filter address
@frappe.whitelist()
def test_address(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import test_address
    return test_address(filters=kwargs)

# get list router by frequency
@frappe.whitelist()
def get_all_router():
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import get_all_router
    return get_all_router()

# Router query
@frappe.whitelist()
def router_query(doctype, txt, searchfield, start, page_len, filters):
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import router_query
    return router_query(doctype=doctype, txt=txt, searchfield=searchfield, start=start, page_len=page_len, filters=filters)



@frappe.whitelist()
def test_distance(**location):
    long = location.get("long")
    lat = location.get("lat")

    query = """
    SELECT name,customer_name,
        (6371 * 2 * ASIN(SQRT(POWER(SIN((%(lat)s - CAST(JSON_UNQUOTE(JSON_EXTRACT(customer_location_primary, '$.lat')) AS DECIMAL(9,6))) * PI() / 180 / 2), 2) + 
            COS(%(lat)s * PI() / 180) * COS(CAST(JSON_UNQUOTE(JSON_EXTRACT(customer_location_primary, '$.lat')) AS DECIMAL(9,6)) * PI() / 180) * 
            POWER(SIN((%(long)s - CAST(JSON_UNQUOTE(JSON_EXTRACT(customer_location_primary, '$.long')) AS DECIMAL(9,6))) * PI() / 180 / 2), 2)))) AS distance
    FROM `tabCustomer`
    ORDER BY distance ASC
    LIMIT 20;
    """
    
    data = frappe.db.sql(query, {'lat': lat, 'long': long}, as_dict=True)
    return data


# danh sach khach hang cham soc
@frappe.whitelist()
def get_customer_router_v2(**kwargs):
    from mbw_dms.mbw_dms.doctype.dms_router.dms_router import get_customer_router_v2
    return get_customer_router_v2(data=kwargs)