import frappe
from frappe import _

def execute(filters=None):
    # Khởi tạo tiêu đề các cột trong báo cáo
    columns = [
        {
            "label": _("Chọn"),
            "fieldname": "select_item",
            "fieldtype": "Check",
            "width": 70
        },
        {
            "label": _("Ngày giao DN"),
            "fieldname": "posting_date",
            "fieldtype": "Date",
            "width": 150
        },
    	{
            "label": _("Tên khách hàng"),
            "fieldname": "customer_name",
            "fieldtype": "Link",
            "options": "Customer",
            "width": 200
        },
        {
            "label": _("Mã SO"),
            "fieldname": "against_sales_order",
            "fieldtype": "Link",
            "options": "Sales Order",
            "width": 220
        },
        {
            "label": "Ngày đặt hàng",
            "fieldname": "transaction_date",
            "fieldtype": "Date",
            "width": 200,
            "name": "Ngày đặt hàng",
        },
        {
            "label": _("Số tiền"),
            "fieldname": "total",
            "fieldtype": "Currency",
            "width": 150
        },
        {
            "label": _("Thanh toán"),
            "fieldname": "trangthaithanhtoan",
            "fieldtype": "Data",
            "width": 200
        },
        {
            "label": _("Mã đơn DN"),
            "fieldname": "name",
            "fieldtype": "Link",
            "options": "Delivery Note",
            "width": 200
        }
    ]

    if filters.get("thanhtoan") == 1:
        filters["thanhtoan"] = 0
    
    # Xây dựng điều kiện tìm kiếm
    conditions = ""
    if filters.get("customer"):
        customer_filter = filters.get("customer")
        if isinstance(customer_filter, list):
            customer_placeholders = ', '.join(['%s'] * len(customer_filter))
            conditions += f" AND dn.customer_name IN ({customer_placeholders})"
        else:
            conditions += " AND dn.customer_name LIKE %s"
    if filters.get("selected_note") and filters.get("delivery_note"):
        deliverynote_filter = filters.get("delivery_note")
        if isinstance(deliverynote_filter, list):
            deliverynote = ', '.join(['%s'] * len(deliverynote_filter))
            conditions += f" AND dn.name IN ({deliverynote})"
    if filters.get("deliverynote"):
        conditions += " AND dn.name LIKE %s"
    if filters.get("thanhtoan") is not None:
        conditions += " AND dn.da_thanh_toan = %s"

    # Truy vấn dữ liệu từ bảng Sales Order và Delivery Note
    query = """
	SELECT 
	    dn.customer_name,
	    dni.against_sales_order,
	    dn.total,
	    CASE 
		WHEN dn.da_thanh_toan = 1 THEN 'Đã thanh toán' 
		ELSE 'Chưa thanh toán' 
	    END AS "trangthaithanhtoan", 
	    dn.name,
	    dn.posting_date
	FROM
	    `tabDelivery Note` dn
	JOIN
	    `tabDelivery Note Item` dni ON dn.name = dni.parent
        WHERE
            dn.docstatus = 1
            AND dn.posting_date BETWEEN %s AND %s
            {conditions}
        GROUP BY
	    dn.name
	ORDER BY
	    dn.posting_date DESC;
    """.format(conditions=conditions)

    # Xây dựng danh sách tham số
    params = [filters.get("from_date"), filters.get("to_date")]
    if filters.get("customer"):
        params.append("%" + filters.get("customer") + "%")
    if filters.get("deliverynote"):
        params.append("%" + filters.get("deliverynote") + "%")
    if filters.get("thanhtoan") is not None:
        params.append(int(filters.get("thanhtoan")))
    if filters.get("selected_note") and filters.get("delivery_note"):
        deliverynote_filter = filters.get("delivery_note")
        if isinstance(deliverynote_filter, list):
            params.extend(deliverynote_filter)
    data = frappe.db.sql(query, params, as_dict=True)
    
    # Bổ sung cột checkbox cho từng dòng trong dữ liệu
    for row in data:
        row['select_item'] = 0 # Checkbox không bị chọn mặc định và có thể chọn được
        sales_order = frappe.db.get_value("Sales Order", row['against_sales_order'],['transaction_date'])
        row['transaction_date'] = sales_order
    total_amount = sum([row['total'] for row in data])
    return columns, data
