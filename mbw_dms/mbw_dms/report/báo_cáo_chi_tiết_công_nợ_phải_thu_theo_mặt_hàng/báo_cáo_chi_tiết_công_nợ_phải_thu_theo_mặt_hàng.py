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

from collections import defaultdict
from operator import itemgetter

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
                    SELECT SUM(jea.credit_in_account_currency) 
                    FROM `tabJournal Entry` je
                    JOIN `tabJournal Entry Account` jea ON je.name = jea.parent
                    WHERE jea.reference_name = si.name AND je.docstatus = 1
                ), 
                0
            ) AS je_paid_amount, 
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

    # Tạo danh sách tạm để lưu các nhóm (group) cùng với posting_date
    grouped_entries = []
    for voucher_no, rows in grouped_data.items():
        group_data = []
        # Thêm dòng tiêu đề nhóm
        group_data.append({
            "is_group_header": True,
            "voucher_no": voucher_no + " (Hóa đơn)",
            "posting_date": rows[0].get("posting_date").strftime("%d-%m-%Y"),
            "due_date": rows[0].get("posting_date").strftime("%d-%m-%Y"),
            "raw_posting_date": rows[0].get("posting_date")  # Lưu ngày gốc để sắp xếp
        })

        paid_amount_invoice = rows[0].get("paid_amount", 0) + rows[0].get("je_paid_amount", 0)
        balance_invoice = rows[0].get("balance", 0)
        group_totals = {
            "qty": 0,
            "amount_before_discount": 0,
            "amount_after_discount": 0,
            "detail_discount": 0,
            "order_discount": rows[0].get("order_discount", 0),
            "deduction_amount": rows[0].get("deductions", 0),
            "receivable_amount": 0,
            "paid_amount": 0,
            "balance": 0,
            "total_taxes": rows[0].get("total_taxes", 0)
        }

        for row in rows:
            qty = row.get("qty", 0)
            unit_price_after_discount = row.get("rate", 0)
            detail_discount = row.get("discount_detail", 0) if row.get("discount_detail", 0) > 0 else 0
            unit_price_before_discount = unit_price_after_discount + detail_discount
            amount_after_discount = row.get("amount", 0)
            amount_before_discount = unit_price_before_discount * qty
            order_discount = group_totals["order_discount"]
            receivable_amount = row.get("balance", 0)
            row.update({"paid_amount": row.get("paid_amount", 0) + row.get("je_paid_amount", 0)})
            paid_amount = row.get("paid_amount", 0)
            balance = row.get("balance", 0)
            posting_date = row.get("posting_date")
            formatted_date = posting_date.strftime("%d-%m-%Y")

            group_data.append({
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
                "order_discount": "",
                "receivable_amount": "",
                "deduction_amount": "",
                "paid_amount": "",
                "balance": "",
                "total_taxes": ""
            })
            group_totals["qty"] += qty
            group_totals["amount_before_discount"] += amount_before_discount
            group_totals["amount_after_discount"] += amount_after_discount
            group_totals["detail_discount"] += detail_discount
            group_totals["receivable_amount"] = (
                group_totals["amount_after_discount"] - group_totals["order_discount"] + group_totals["total_taxes"]
            )
            group_totals["paid_amount"] = paid_amount_invoice
            group_totals["balance"] = balance_invoice

        group_data.append({
            "is_total_row": True,
            "qty": format_currency(group_totals["qty"]),
            "amount_before_discount": format_currency(group_totals["amount_before_discount"]),
            "amount_after_discount": format_currency(group_totals["amount_after_discount"]),
            "detail_discount": format_currency(group_totals["detail_discount"]),
            "order_discount": format_currency(group_totals["order_discount"]),
            "receivable_amount": format_currency(group_totals["receivable_amount"]),
            "deduction_amount": format_currency(group_totals["deduction_amount"]),
            "paid_amount": format_currency(group_totals["paid_amount"] - group_totals["deduction_amount"]),
            "balance": format_currency(group_totals["balance"]),
            "total_taxes": format_currency(group_totals["total_taxes"])
        })

        # Cộng dồn vào grand_totals
        for key in grand_totals:
            grand_totals[key] += group_totals[key]

        grouped_entries.append({
            "posting_date": rows[0].get("posting_date"),
            "data": group_data
        })

    # Xử lý dữ liệu từ get_data_jp
    result = get_data_jp(filters)
    for item in result:
        group_data = []
        group_totals = {
            "qty": 0,
            "amount_before_discount": 0,
            "amount_after_discount": 0,
            "detail_discount": 0,
            "order_discount": item.get("order_discount", 0),
            "deduction_amount": item.get("deductions", 0),
            "receivable_amount": 0,
            "paid_amount": 0,
            "balance": 0,
            "total_taxes": 0
        }
        group_data.append({
            "is_group_header": True,
            "voucher_no": item.name + " (Bút toán)",
            "posting_date": item.get("posting_date").strftime("%d-%m-%Y"),
            "due_date": item.get("posting_date").strftime("%d-%m-%Y"),
            "raw_posting_date": item.get("posting_date")  # Lưu ngày gốc để sắp xếp
        })
        group_totals["amount_before_discount"] += item.get("total_amount", 0)
        group_totals["amount_after_discount"] += item.get("total_amount", 0)
        group_totals["receivable_amount"] += item.get("total_amount", 0)
        group_totals["paid_amount"] += item.get("paid_amount", 0)
        group_totals["balance"] += item.get("outstanding_amount", 0)
        group_data.append({
            "is_total_row": True,
            "qty": format_currency(0),
            "amount_before_discount": format_currency(item.get("total_amount", 0)),
            "amount_after_discount": format_currency(item.get("total_amount", 0)),
            "detail_discount": format_currency(group_totals["detail_discount"]),
            "order_discount": format_currency(group_totals["order_discount"]),
            "receivable_amount": format_currency(item.get("total_amount", 0)),
            "deduction_amount": format_currency(group_totals["deduction_amount"]),
            "paid_amount": format_currency(item.get("paid_amount", 0)),
            "balance": format_currency(item.get("outstanding_amount", 0)),
            "total_taxes": format_currency(0),
        })
        for key in grand_totals:
            grand_totals[key] += group_totals[key]

        grouped_entries.append({
            "posting_date": item.get("posting_date"),
            "data": group_data
        })

    # Sắp xếp các nhóm theo posting_date
    grouped_entries.sort(key=itemgetter("posting_date"))

    # Ghép lại final_data từ các nhóm đã sắp xếp
    for entry in grouped_entries:
        final_data.extend(entry["data"])

    # Thêm dòng "Tổng cộng" cuối bảng
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

def get_data_jp(filters):
    query = """
        SELECT 
            jea.reference_name AS invoice_no,
            jea.party,
            jea.party_type,
            je.name,
            je.posting_date,
            je.cheque_no AS future_ref,
            SUM(COALESCE(per.allocated_amount, 0)) AS paid_amount,
            jea.debit AS total_amount,
            (jea.debit - SUM(COALESCE(per.allocated_amount, 0))) AS outstanding_amount
        FROM 
            `tabJournal Entry` je
        INNER JOIN 
            `tabJournal Entry Account` jea ON jea.parent = je.name
        INNER JOIN 
            `tabPayment Entry Reference` per ON per.reference_doctype = 'Journal Entry' 
            AND per.reference_name = je.name
        INNER JOIN 
            `tabPayment Entry` pe ON pe.name = per.parent
            AND pe.party = jea.party
        WHERE 
            je.docstatus = 1
            AND je.posting_date BETWEEN %(from_date)s AND %(to_date)s
            AND jea.party = %(customer)s
        GROUP BY 
            je.name, jea.reference_name, jea.party, jea.party_type, je.posting_date, je.cheque_no, jea.debit
    """

    # Thực thi truy vấn
    result = frappe.db.sql(query, {
        "from_date": filters.from_date,
        "to_date": filters.to_date,
        "customer": filters.customer
    }, as_dict=True)
    print(result)
    return result