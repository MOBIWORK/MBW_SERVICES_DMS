import frappe
from frappe import _

def check_duplicate_import(doc, method):
    existing = frappe.db.exists({
        'doctype': 'DMS Router',
        'channel_code': doc.channel_code,
        'employee': doc.employee
    })
    if existing:
        frappe.throw(_('Duplicate entry for channel code: {0} and employee: {1}').format(doc.channel_code, doc.employee))

# Thêm phương thức này vào class Doctype của bạn nếu cần
# class YourDoctypeName(Document):
#     def before_import(self):
#         check_duplicate_import(self)
