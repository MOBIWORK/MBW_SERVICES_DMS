import frappe
from datetime import datetime

def create_employee_and_sales_team(doc, method):
    # Tạo một bản ghi Employee mới
    employee = frappe.new_doc("Employee")
    employee.first_name = doc.first_name
    employee.middle_name = doc.middle_name
    employee.last_name = doc.last_name
    employee.user_id = doc.name
    employee.date_of_birth = doc.birth_date
    employee.gender = doc.gender
    employee.date_of_joining = datetime.today()
    employee.status = "Active"
    employee.insert()

    # Tạo một Sales Person mới
    sales_person = frappe.new_doc("Sales Person")
    sales_person.sales_person_name = employee.employee_name
    sales_person.employee = employee.name
    sales_person.is_group = 1
    sales_person.insert()
        
