import frappe

def add_sales_roles_permissions(doc, method):
    doctype = doc.doctype
    print('========================= value: ', doctype, flush=True)
    # Kiểm tra xem vai trò "Sales User" có tồn tại không
    sales_user_role = frappe.get_all("Role", filters={"role_name": "Sales User"})
    if sales_user_role:
        sales_user_role = sales_user_role[0] 
        add_permissions(sales_user_role, doctype)

    # Kiểm tra xem vai trò "Sales Manager" có tồn tại không
    sales_manager_role = frappe.get_all("Role", filters={"role_name": "Sales Manager"})
    if sales_manager_role:
        sales_manager_role = sales_manager_role[0]
        add_permissions(sales_manager_role, doctype)

def add_permissions(role, doctype):
    # Lấy tất cả quyền cho vai trò
    permissions = frappe.get_all("Custom DocPerm", filters={"role": role["name"]})
    
    # Kiểm tra xem đã có quyền cho doctype mới chưa
    if not any(perm.get("parent") == doctype for perm in permissions):
        # Tạo mới quyền cho doctype mới
        frappe.get_doc({
            "doctype": "Custom DocPerm",
            "parent": doctype,
            "role": role["name"],
            "select": 1,
            "create": 1,
            "email": 1,
            "export": 1,
            "read": 1,
            "delete": 1,
            "report": 1,
            "share": 1,
            "write": 1,
            "print": 1,
            "import": 0
        }).insert(ignore_permissions=True)