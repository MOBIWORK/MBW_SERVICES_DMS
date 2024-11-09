import frappe
from frappe.utils import flt

@frappe.whitelist()
def get_metrics(start_date, end_date):
    # Lấy doanh thu
    revenue = frappe.db.sql("""
        SELECT SUM(paid_amount) 
        FROM `tabPayment Entry`
        WHERE payment_type = 'Receive' AND posting_date BETWEEN %s AND %s
    """, (start_date, end_date))[0][0] or 0

    # Lấy tổng vốn
    total_cost = frappe.db.sql("""
        SELECT SUM(pe.paid_amount)
        FROM `tabPayment Entry` AS pe
        JOIN `tabPayment Entry Reference` AS per ON per.parent = pe.name
        WHERE pe.payment_type = 'Pay'
            AND pe.posting_date BETWEEN %s AND %s
            AND per.reference_doctype = 'Purchase Invoice'
    """, (start_date, end_date))[0][0] or 0

    # Lấy trả hàng
    returns = abs(frappe.db.sql("""
        SELECT SUM(grand_total)
        FROM `tabSales Invoice`
        WHERE status = 'Return' AND posting_date BETWEEN %s AND %s
    """, (start_date, end_date))[0][0] or 0)

    # Lấy lương
    salary = frappe.db.sql("""
        SELECT SUM(paid_amount)
        FROM `tabPayment Entry`
        WHERE payment_type = 'Pay' AND custom_purpose = 'Trả lương' AND posting_date BETWEEN %s AND %s
    """, (start_date, end_date))[0][0] or 0

    # Lấy chi phí khác
    others = frappe.db.sql("""
        SELECT SUM(paid_amount)
        FROM `tabPayment Entry`
        WHERE payment_type = 'Pay' AND custom_purpose = 'Khác' AND posting_date BETWEEN %s AND %s
    """, (start_date, end_date))[0][0] or 0

    # Tính lợi nhuận gộp và lợi nhuận ròng
    gross_profit = ((revenue - total_cost) * 100) / revenue if revenue else 0
    net_profit = ((revenue - (total_cost + returns + salary + others)) * 100) / revenue if revenue else 0

    return {
        "revenue": flt(revenue),
        "total_cost": flt(total_cost),
        "returns": flt(returns),
        "salary": flt(salary),
        "others": flt(others),
        "gross_profit": gross_profit,
        "net_profit": net_profit
    }
