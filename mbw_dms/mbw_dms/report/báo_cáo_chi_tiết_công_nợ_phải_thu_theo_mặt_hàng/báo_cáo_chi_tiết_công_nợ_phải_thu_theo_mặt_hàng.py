import frappe
from collections import defaultdict
from frappe.utils.jinja import get_jenv

def execute(filters=None):
    # Thiết lập bộ lọc mặc định

    # Thêm bộ lọc định dạng tiền tệ vào Jinja
    get_jenv().filters["format_currency"] = format_currency

    # Render HTML với dữ liệu
    html = frappe.render_template(
        "templates/reports/chi_tiet_cong_no_phai_thu.html",
        {"filters": filters, "data": get_data(filters)}
    )

    # Không trả về cột và dữ liệu
    return [], None, html, None, None, 1

def get_data(filters):
    """
    Lấy và xử lý dữ liệu từ cơ sở dữ liệu
    """
    # Xây dựng điều kiện SQL
    conditions = get_conditions(filters)

    # Truy vấn dữ liệu từ cơ sở dữ liệu
    query = f"""
        SELECT 
            si.posting_date, 
            si.due_date, 
            si.name AS voucher_no, 
            si.customer AS party, 
            sii.item_name, 
            sii.uom, 
            sii.income_account AS receivable_account,
            COALESCE(sii.qty, 0) AS qty, 
            COALESCE(sii.rate, 0) AS rate, 
            COALESCE(sii.amount, 0) AS amount, 
            COALESCE(sii.discount_amount, 0) AS discount_detail, 
            COALESCE(si.discount_amount, 0) AS order_discount, 
            COALESCE(si.paid_amount, 0) AS paid_amount, 
            COALESCE(si.outstanding_amount, 0) AS balance
        FROM 
            `tabSales Invoice` si
        JOIN 
            `tabSales Invoice Item` sii ON si.name = sii.parent
        WHERE 
            si.docstatus = 1
            AND {conditions}
        ORDER BY 
            si.name ASC, sii.item_name ASC
    """
    raw_data = frappe.db.sql(query, filters, as_dict=True)

    # Nhóm dữ liệu theo voucher_no
    grouped_data = defaultdict(list)
    for row in raw_data:
        grouped_data[row["voucher_no"]].append(row)

    final_data = []

    grand_totals = {
        "qty": 0,
        "amount": 0,
        "discount_detail": 0,
        "order_discount": 0,
        "paid_amount": 0,
        "balance": 0
    }

    for voucher_no, rows in grouped_data.items():
        # Tính tổng cho từng nhóm
        group_totals = {
            "qty": sum(row.get("qty", 0) for row in rows),
            "amount": sum(row.get("amount", 0) for row in rows),
            "discount_detail": sum(row.get("discount_detail", 0) for row in rows),
            "order_discount": rows[0].get("order_discount", 0),
            "paid_amount": sum(row.get("paid_amount", 0) for row in rows),
            "balance": rows[0].get("balance", 0)
        }

        # Cập nhật Grand Total
        for key in grand_totals:
            grand_totals[key] += group_totals[key]

        # Thêm dòng tiêu đề nhóm - Group Header
        final_data.append({
            "is_group_header": True,
            "voucher_no": voucher_no,
            "posting_date": rows[0].get("posting_date"),
            "due_date": rows[0].get("due_date"),
            "party": rows[0].get("party")
        })

        # Chi tiết từng bản ghi
        for row in rows:
            final_data.append({
                "posting_date": row.get("posting_date"),
                "due_date": row.get("due_date"),
                "voucher_no": row.get("voucher_no"),
                "party": row.get("party"),
                "item_name": row.get("item_name"),
                "uom": row.get("uom"),
                "qty": row.get("qty", 0),
                "rate": format_currency(row.get("rate", 0)),
                "amount": format_currency(row.get("amount", 0)),
                "discount_detail": format_currency(row.get("discount_detail", 0)),
                "order_discount": "",
                "paid_amount": format_currency(row.get("paid_amount", 0)),
                "balance": "",
                "receivable_account": row.get("receivable_account")
            })

        # Dòng tổng cộng cho nhóm - Group Total
        final_data.append({
            "is_total_row": True,
            "qty": format_currency(group_totals["qty"]),
            "amount": format_currency(group_totals["amount"]),
            "discount_detail": format_currency(group_totals["discount_detail"]),
            "order_discount": format_currency(group_totals["order_discount"]),
            "paid_amount": format_currency(group_totals["paid_amount"]),
            "balance": format_currency(group_totals["balance"])
        })

    # Dòng tổng cộng cuối cùng - Grand Total
    final_data.append({
        "is_grand_total_row": True,
        "total_qty": format_currency(grand_totals["qty"]),
        "total_amount": format_currency(grand_totals["amount"]),
        "total_discount_detail": format_currency(grand_totals["discount_detail"]),
        "total_order_discount": format_currency(grand_totals["order_discount"]),
        "total_paid": format_currency(grand_totals["paid_amount"]),
        "total_balance": format_currency(grand_totals["balance"])
    })

    return final_data

def format_currency(value):
    """
    Đổi giá trị số thành định dạng VND.
    """
    try:
        return "{:,.0f}".format(value).replace(",", ".")
    except (ValueError, TypeError):
        return "0"

def get_conditions(filters):
    """
    Tạo điều kiện SQL dựa trên bộ lọc.
    """
    conditions = []
    condition_map = {
        "company": "si.company = %(company)s",
        "customer": "si.customer = %(customer)s",
        "receivable_account": "si.debit_to = %(receivable_account)s"
    }

    if filters.get("from_date") and filters.get("to_date"):
        conditions.append("si.posting_date BETWEEN %(from_date)s AND %(to_date)s")

    for key, condition in condition_map.items():
        if filters.get(key):
            conditions.append(condition)

    return " AND ".join(conditions)