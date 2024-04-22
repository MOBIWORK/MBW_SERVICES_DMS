import frappe

def create_user_permission(doc, method=None):
    data = doc.as_dict()
    if doc.sales_manager:
        user_permission = frappe.new_doc("User Permission")
        allow = "Sales Person"
        for i in data.sales_manager:
            user_id = frappe.get_value("Employee", {"name": i.employee}, "user_id")
            if not frappe.db.exists("User Permission", {"user": user_id, "allow": allow, "for_value": doc.name}):
                user_permission.user = user_id
                user_permission.allow = allow
                user_permission.for_value = doc.name
                user_permission.insert()
        
        # Tạo phân quyền cho danh sách sales person cha
        list_parent_sp = get_all_parent_sales_persons(sales_person=doc.name)
        if list_parent_sp:
            user_permission_pr = frappe.new_doc("User Permission")
            for i in list_parent_sp:
                sales_team = frappe.get_doc("Sales Person", i).as_dict()
                for sale_mng in sales_team.sales_manager:
                    u_id = frappe.get_value("Employee", {"name": sale_mng.employee}, "user_id")
                    if not frappe.db.exists("User Permission", {"user": u_id, "allow": allow, "for_value": doc.name}):
                        user_permission_pr.user = u_id
                        user_permission_pr.allow = allow
                        user_permission_pr.for_value = doc.name
                        user_permission_pr.insert()
        else:
            pass
    else:
        return

# Tìm danh sách sales person cha
def get_all_parent_sales_persons(sales_person):
    parent_sales_persons = []
    parent = frappe.get_value("Sales Person", sales_person, "parent_sales_person")

    while parent:
        is_group = frappe.get_value("Sales Person", parent, "is_group")
        if is_group == 1:
            parent_sales_persons.append(parent)
        parent = frappe.get_value("Sales Person", parent, "parent_sales_person")

    return parent_sales_persons