import frappe

def update_sales_roles_permissions():
    # Lấy tất cả các doctype bắt đầu bằng "DMS"
    dms_doctypes = frappe.get_all("DocType", filters={"name": ["like", "DMS%"]})
    # Lấy tất cả các doctype bắt đầu bằng "VGM"
    vgm_doctypes = frappe.get_all("DocType", filters={"name": ["like", "VGM%"]})
    
    # Lấy vai trò "Sales User" và "Sales Manager"
    sales_user_role = frappe.get_value("Role", filters={"role_name": "Sales User"})
    sales_manager_role = frappe.get_value("Role", filters={"role_name": "Sales Manager"})
    
    if sales_user_role and sales_manager_role:
        # Cập nhật quyền cho các doctype bắt đầu bằng "DMS"
        for doctype in dms_doctypes:
            doctype_name = doctype.get("name")
            update_permissions(doctype_name, sales_user_role, sales_manager_role)
        
        # Cập nhật quyền cho các doctype bắt đầu bằng "VGM"
        for doctype in vgm_doctypes:
            doctype_name = doctype.get("name")
            update_permissions(doctype_name, sales_user_role, sales_manager_role)

def update_permissions(doctype_name, sales_user_role, sales_manager_role):
    # Kiểm tra quyền cho vai trò "Sales User"
    existing_sales_user_perms = frappe.get_all("Custom DocPerm", filters={"parent": doctype_name, "role": sales_user_role})
    # Kiểm tra quyền cho vai trò "Sales Manager"
    existing_sales_manager_perms = frappe.get_all("Custom DocPerm", filters={"parent": doctype_name, "role": sales_manager_role})

    # Nếu không có quyền tồn tại, thì tạo mới quyền
    if not existing_sales_user_perms:
    # Cập nhật quyền cho vai trò "Sales User"
        frappe.get_doc({
            "doctype": "Custom DocPerm",
            "parent": doctype_name,
            "role": sales_user_role,
            "read": 1,
            "write": 1,
        }).insert(ignore_permissions=True)
    
    if not existing_sales_manager_perms:
        # Cập nhật quyền cho vai trò "Sales Manager"
        frappe.get_doc({
            "doctype": "Custom DocPerm",
            "parent": doctype_name,
            "role": sales_manager_role,
            "read": 1,
            "write": 1,
        }).insert(ignore_permissions=True)