from datetime import datetime

import frappe
from collections import defaultdict
from frappe.utils.jinja import get_jenv
from erpnext.accounts.utils import get_balance_on

def execute(filters=None):
    """ Thực thi báo cáo và render HTML """
    get_jenv().filters["format_currency"] = format_currency

    html = frappe.render_template(
        "templates/reports/chi_tiet_cong_no_phai_thu.html",
        {"filters": filters, "data": get_data(filters)}
    )

    # Trả về 5 giá trị như mặc định, trong đó html là nội dung HTML render sẵn
    return [], None, html, None, None, 1

def get_data(filters):
    """ Lấy và xử lý dữ liệu từ database """
    conditions = get_conditions(filters)
    total_party_balance = get_balance_on(party_type="Customer", party=filters.get("customer"))
    query = f"""
        SELECT 
            si.posting_date, 
            si.due_date, 
            si.name AS voucher_no, 
            sii.item_name, 
            sii.uom, 
            sii.income_account AS receivable_account,
            si.total_taxes_and_charges AS total_taxes,
            si.grand_total,
            si.custom_deductions_amount AS deductions,
            COALESCE(sii.qty, 0) AS qty, 
            COALESCE(sii.rate, 0) AS rate, 
            COALESCE(sii.amount, 0) AS amount, 
            COALESCE(sii.discount_amount, 0) AS discount_detail, 
            COALESCE(si.discount_amount, 0) AS order_discount, 
            COALESCE(
                (
                    SELECT SUM(per.allocated_amount) 
                    FROM `tabPayment Entry` pe
                    JOIN `tabPayment Entry Reference` per ON pe.name = per.parent
                    WHERE per.reference_name = si.name AND per.docstatus < 2 
                ), 
                0
            ) AS paid_amount, 
            COALESCE(
                (
                    SELECT SUM(ped.amount)
                    FROM `tabPayment Entry Deduction` ped
                    WHERE ped.parent IN (
                        SELECT pe.name
                        FROM `tabPayment Entry` pe
                        JOIN `tabPayment Entry Reference` per ON pe.name = per.parent
                        WHERE per.reference_name = si.name
                    )
                ),
                0
            ) AS deduction_amount,
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
    grouped_data = defaultdict(list)
    for row in raw_data:
        grouped_data[row["voucher_no"]].append(row)

    # Các biến để tính tổng cộng cuối cùng
    grand_totals = {
        "qty": 0,
        "amount_before_discount": 0,
        "amount_after_discount": 0,
        "detail_discount": 0,
        "order_discount": 0,
        "receivable_amount": 0,
        "paid_amount": 0,
        "balance": 0,
        "deduction_amount": 0,
        "total_taxes": 0
    }

    final_data = []
    final_data.append({
        "is_party_balance": True,
        "balance": format_currency(total_party_balance)
    })
    for voucher_no, rows in grouped_data.items():
        print(rows[0])
        # Tính tổng cho từng hóa đơn (group)
        group_totals = {
            "qty": 0,
            "amount_before_discount": 0,
            "amount_after_discount": 0,
            "detail_discount": 0,
            # Với chiết khấu đơn hàng, chỉ lấy giá trị 1 lần từ dòng đầu tiên của hóa đơn
            "order_discount": rows[0].get("order_discount", 0),
            # Với chiết khấu giảm trừ, cũng chỉ lấy 1 lần từ dòng đầu tiên
            "deduction_amount": rows[0].get("deductions", 0),
            "receivable_amount": 0,
            "paid_amount": 0,
            "balance": 0,
            "total_taxes": 0
        }

        # Thêm dòng tiêu đề nhóm
        final_data.append({
            "is_group_header": True,
            "voucher_no": voucher_no,
            "posting_date": rows[0].get("posting_date").strftime("%d-%m-%Y"),
            "due_date": rows[0].get("posting_date").strftime("%d-%m-%Y"),
        })

        paid_amount_invoice = rows[0].get("paid_amount", 0)
        balance_invoice = rows[0].get("balance", 0)

        for row in rows:
            qty = row.get("qty", 0)
            # Đơn giá sau chiết khấu
            unit_price_after_discount = row.get("rate", 0)

            # Chi tiết chiết khấu của dòng
            detail_discount = row.get("discount_detail", 0) if row.get("discount_detail", 0) > 0 else 0

            # Đơn giá trước chiết khấu = đơn giá sau CK + chi tiết CK
            unit_price_before_discount = unit_price_after_discount + detail_discount

            # Thành tiền sau chiết khấu (đã được tính từ ERP)
            amount_after_discount = row.get("amount", 0)

            # Thành tiền trước chiết khấu = đơn giá trước CK * số lượng
            amount_before_discount = unit_price_before_discount * qty

            # Chiết khấu đơn hàng chỉ lấy giá trị từ dòng đầu tiên
            order_discount = group_totals["order_discount"]

            # Số phải thu lấy từ balance của hóa đơn
            receivable_amount = row.get("balance", 0)

            paid_amount = row.get("paid_amount", 0)
            balance = row.get("balance", 0)
            # Lấy giá trị posting_date
            posting_date = row.get("posting_date")

            formatted_date = posting_date.strftime("%d-%m-%Y")
            final_data.append({
                "posting_date": formatted_date,
                "due_date": formatted_date,
                "voucher_no": row.get("voucher_no"),
                "item_name": row.get("item_name"),
                "receivable_account": row.get("receivable_account"),
                "uom": row.get("uom"),
                "qty": format_currency(qty),
                "unit_price_before_discount": format_currency(unit_price_before_discount),
                "unit_price_after_discount": format_currency(unit_price_after_discount),
                "amount_before_discount": format_currency(amount_before_discount),
                "amount_after_discount": format_currency(amount_after_discount),
                "detail_discount": format_currency(detail_discount),
                "order_discount": format_currency(order_discount),
                "receivable_amount": "",
                "deduction_amount": "",
                "paid_amount": "",
                "balance": "",
                "total_taxes": ""
            })
            group_totals["total_taxes"] = rows[0].get("total_taxes", 0)
            # Cộng dồn group_totals (chỉ cộng các trường tính theo dòng)
            group_totals["qty"] += qty
            group_totals["amount_before_discount"] += amount_before_discount
            group_totals["amount_after_discount"] += amount_after_discount
            group_totals["detail_discount"] += detail_discount
            # order_discount và deduction_amount không cộng dồn vì chỉ lấy 1 lần cho mỗi hóa đơn
            group_totals["receivable_amount"] = (
                group_totals["amount_after_discount"] - group_totals["order_discount"] + group_totals["total_taxes"]
            )
            group_totals["paid_amount"] = paid_amount_invoice
            group_totals["balance"] = balance_invoice

        # Sau khi duyệt xong các dòng, thêm dòng "Cộng" cho group
        final_data.append({
            "is_total_row": True,
            "qty": format_currency(group_totals["qty"]),
            "amount_before_discount": format_currency(group_totals["amount_before_discount"]),
            "amount_after_discount": format_currency(group_totals["amount_after_discount"]),
            "detail_discount": format_currency(group_totals["detail_discount"]),
            "order_discount": format_currency(group_totals["order_discount"]),
            "receivable_amount": format_currency(group_totals["receivable_amount"]),
            "deduction_amount": format_currency(group_totals["deduction_amount"]),
            "paid_amount": format_currency(group_totals["paid_amount"] - group_totals["deduction_amount"]),
            "balance": format_currency(group_totals["balance"])    ,
            "total_taxes": format_currency(rows[0].get("total_taxes", 0)),
        })

        # Cộng dồn vào grand_totals
        for key in grand_totals:
            grand_totals[key] += group_totals[key]

    # Thêm dòng "Tổng cộng" cuối bảng, bao gồm cả tổng chiết khấu giảm trừ
    final_data.append({
        "is_grand_total_row": True,
        "total_qty": format_currency(grand_totals["qty"]),
        "total_amount_before_discount": format_currency(grand_totals["amount_before_discount"]),
        "total_amount_after_discount": format_currency(grand_totals["amount_after_discount"]),
        "total_detail_discount": format_currency(grand_totals["detail_discount"]),
        "total_order_discount": format_currency(grand_totals["order_discount"]),
        "total_receivable_amount": format_currency(grand_totals["receivable_amount"]),
        "total_deduction_amount": format_currency(grand_totals["deduction_amount"]),
        "total_paid": format_currency(grand_totals["paid_amount"]),
        "total_balance": format_currency(total_party_balance),
        "total_taxes": format_currency(grand_totals["total_taxes"])
    })
    final_data[0]["balance"] = format_currency(total_party_balance - grand_totals["balance"])
    return final_data

def format_currency(value):
    """ Định dạng tiền tệ VND """
    try:
        return "{:,.0f}".format(value).replace(",", ".")
    except (ValueError, TypeError):
        return "0"

def get_conditions(filters):
    """ Tạo điều kiện SQL từ bộ lọc """
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
