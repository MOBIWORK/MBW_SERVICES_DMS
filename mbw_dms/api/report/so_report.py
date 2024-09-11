import frappe
import re
from mbw_dms.api.common import gen_response ,exception_handle, get_child_values_doc, get_value_child_doctype
from mbw_dms.api.validators import validate_filter_timestamp

# Báo cáo tổng hợp đặt hàng
@frappe.whitelist(methods="GET")
def so_report(**kwargs):
    return handle_so_report(kwargs=kwargs)

def handle_so_report(kwargs):  
    try:
        is_excel = kwargs.get("is_excel")
        filters = []
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        sales_person = kwargs.get("sales_person")
        customer = kwargs.get("customer")
        territory = kwargs.get("territory")
        warehouse = kwargs.get("warehouse")
        company = kwargs.get("company")

        if from_date and to_date:
            filters.append(f"so.transaction_date BETWEEN '{from_date}' AND '{to_date}'")
        elif from_date:
            filters.append(f"so.transaction_date >= '{from_date}'")
        elif to_date:
            filters.append(f"so.transaction_date <= '{to_date}'")
        if customer:
            filters.append(f"so.customer = '{customer}'")
        if territory:
            filters.append(f"so.territory = '{territory}'")
        if warehouse:
            filters.append(f"so.set_warehouse = '{warehouse}'")
        if company:
            filters.append(f"so.company = '{company}'")
        if sales_person:
            filters.append(f"st.sales_person = '{sales_person}' AND st.created_by = 1")
        filters.append("so.docstatus = 1")
        where_conditions = " AND ".join(filters)

        field_items = ["name", "item_name", "item_code", "item_group", "brand", "rate", "qty", "amount", "discount_amount", "discount_percentage", "warehouse", "item_tax_rate", "uom"]
        totals = {
            "sum_total": 0,
            "sum_vat": 0,
            "sum_discount_amount": 0,
            "sum_grand_total": 0,
        }

        sql_query = """
            SELECT so.name, so.customer, so.territory, so.set_warehouse, UNIX_TIMESTAMP(so.transaction_date) as transaction_date, so.total, so.grand_total,
            so.company, so.discount_amount
            FROM `tabSales Order` so
            LEFT JOIN `tabSales Team` st ON so.name = st.parent 
        """
        
        if where_conditions:
            sql_query += " WHERE {}".format(where_conditions)
        sql_query += " ORDER BY so.transaction_date desc"
        if not is_excel: 
            sql_query += " LIMIT %s OFFSET %s"

        sql_query_count = """
            SELECT COUNT(*)
            FROM `tabSales Order` so
            LEFT JOIN `tabSales Team` st ON so.name = st.parent 
        """

        if where_conditions:
            sql_query_count += " WHERE {}".format(where_conditions)
        count_data = frappe.db.sql(sql_query_count, as_dict=1)
        so_count = count_data[0]["COUNT(*)"]

        limit = page_size
        offset = (page_number - 1) * limit
        if is_excel:
            sale_orders = frappe.db.sql(sql_query, as_dict=True)
        else: 
            sale_orders = frappe.db.sql(sql_query, (limit, offset), as_dict=True)
        for i in sale_orders:
            st = get_value_child_doctype("Sales Order", i["name"], "sales_team")
            i["sales_person"] = ""
            for j in st:
                if j.created_by == 1:
                    i["sales_person"] = j.sales_person 
            i["tax_amount"] = frappe.get_value("Sales Taxes and Charges", {"parent": i["name"]}, "tax_amount")
            i["items"] = get_child_values_doc(doctype="Sales Order", master_name=i["name"], fields_to_get=field_items, chil_name="items")
            for itemvat in i["items"]:
                item_tax_rate = itemvat.get("item_tax_rate")
                unit_price = float(itemvat.get("rate", 0.0))

                if item_tax_rate:
                    match = re.search(r':\s*([0-9.]+)', item_tax_rate)

                    if match:
                        itemvat["item_tax_rate"] = float(match.group(1))

                        try:
                            itemvat["item_tax_rate"] = float(match.group(1))
                        except ValueError:

                            itemvat["item_tax_rate"] = 0.0

                    else:
                        itemvat["item_tax_rate"] = 0.0

                else:
                    itemvat["item_tax_rate"] = 0.0

                money_vat = float(unit_price * float(itemvat["item_tax_rate"] / 100))

                itemvat["money_vat"] = money_vat
            totals["sum_total"] += i["total"]
            if i["tax_amount"]:
                totals["sum_vat"] += i["tax_amount"]
            totals["sum_discount_amount"] += i["discount_amount"]
            totals["sum_grand_total"] += i["grand_total"]

        if is_excel:
            return {
                "data": sale_orders,
                "sum": totals,
            }
        return gen_response(200, "Thành công", {
            "data": sale_orders,
            "sum": totals,
            "page_number": page_number,
            "page_size": page_size,
            "totals": so_count
        })
    except Exception as e:
        if is_excel:
            return {
                "data": [],
                "sum" : {}
            }
        return exception_handle(e)
# Báo cáo tổng hợp bán hàng
@frappe.whitelist(methods="GET")
def si_report(**kwargs):
    return handle_si_report(kwargs=kwargs)

def handle_si_report(kwargs):
    try:
        is_excel = kwargs.get("is_excel")
        filters = []
        from_date = validate_filter_timestamp(type="start")(kwargs.get("from_date")) if kwargs.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(kwargs.get("to_date")) if kwargs.get("to_date") else None
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        sales_person = kwargs.get("sales_person")
        customer = kwargs.get("customer")
        territory = kwargs.get("territory")
        warehouse = kwargs.get("warehouse")
        company = kwargs.get("company")

        if from_date and to_date:
            filters.append(f"si.posting_date BETWEEN '{from_date}' AND '{to_date}'")
        elif from_date:
            filters.append(f"si.posting_date >= '{from_date}'")
        elif to_date:
            filters.append(f"si.posting_date <= '{to_date}'")
        if customer:
            filters.append(f"si.customer = '{customer}'")
        if territory:
            filters.append(f"si.territory = '{territory}'")
        if warehouse:
            filters.append(f"si.set_warehouse = '{warehouse}'")
        if company:
            filters.append(f"si.company = '{company}'")
        if sales_person:
            filters.append(f"st.sales_person = '{sales_person}' AND st.created_by = 1")
        filters.append("si.docstatus = 1")
        where_conditions = " AND ".join(filters)

        field_items = ["name", "item_name", "item_code", "item_group", "brand", "rate", "qty", "amount", "discount_amount", "discount_percentage", "warehouse", "item_tax_rate", "uom"]
        totals = {
            "sum_total": 0,
            "sum_vat": 0,
            "sum_discount_amount": 0,
            "sum_grand_total": 0,
        }

        sql_query = """
            SELECT si.name, si.customer, si.territory, si.set_warehouse, UNIX_TIMESTAMP(si.posting_date) as posting_date, si.total, si.grand_total,
            si.company, si.discount_amount
            FROM `tabSales Invoice` si
            LEFT JOIN `tabSales Team` st ON si.name = st.parent 
        """
        
        if where_conditions:
            sql_query += " WHERE {}".format(where_conditions)
        
        sql_query += " ORDER BY si.posting_date desc"
        if not is_excel:
            sql_query += " LIMIT %s OFFSET %s"

        sql_query_count = """
            SELECT COUNT(*)
            FROM `tabSales Invoice` si
            LEFT JOIN `tabSales Team` st ON si.name = st.parent 
        """

        if where_conditions:
            sql_query_count += " WHERE {}".format(where_conditions)
        count_data = frappe.db.sql(sql_query_count, as_dict=1)
        si_count = count_data[0]['COUNT(*)']

        limit = page_size
        offset = (page_number - 1) * limit
        if is_excel:
            sale_invoices = frappe.db.sql(sql_query, as_dict=True)
        else: 
             sale_invoices = frappe.db.sql(sql_query, (limit, offset), as_dict=True)
        for i in sale_invoices:
            i["discount_amount"] = 0
            st = get_value_child_doctype("Sales Invoice", i["name"], "sales_team")
            i["sales_person"] = ""
            for j in st:
                if j.created_by == 1:
                    i["sales_person"] = j.sales_person
            i["tax_amount"] = frappe.get_value("Sales Taxes and Charges", {"parent": i["name"]}, "tax_amount")
            i["items"] = get_child_values_doc(doctype="Sales Invoice", master_name=i["name"], fields_to_get=field_items, chil_name="items")
            for itemvat in i["items"]:

                item_tax_rate = itemvat.get("item_tax_rate")

                unit_price = float(itemvat.get("rate", 0.0))

                if item_tax_rate:

                    match = re.search(r':\s*([0-9.]+)', item_tax_rate)

                    if match:

                        itemvat["item_tax_rate"] = float(match.group(1))

                        try:

                            itemvat["item_tax_rate"] = float(match.group(1))

                        except ValueError:

                            itemvat["item_tax_rate"] = 0.0

                    else:

                        itemvat["item_tax_rate"] = 0.0

                else:

                    itemvat["item_tax_rate"] = 0.0

                money_vat = float(unit_price * float(itemvat["item_tax_rate"] / 100))

                itemvat["money_vat"] = money_vat
            totals["sum_total"] += i["total"]
            if i["tax_amount"]:
                totals["sum_vat"] += i["tax_amount"]
            for j in i["items"]:
                i["discount_amount"] += j['discount_amount']
            totals["sum_discount_amount"] += i["discount_amount"]
            totals["sum_grand_total"] += i["grand_total"]

        if is_excel:
            return {
                "data": sale_invoices,
                "sum": totals,
            }
        return gen_response(200, "Thành công", {
            "data": sale_invoices,
            "sum": totals,
            "page_number": page_number,
            "page_size": page_size,
            "totals": si_count
        })
    except Exception as e:
        if is_excel:
            print("Lỗi khi lấy dứ liệu xuất excel===  ",e)
            return {
                "data": [],
                "sum": {}
            }
        return exception_handle(e)
    
@frappe.whitelist(methods="GET")
def list_company(**kwargs):
    try:
        filter_company = {}
        name = kwargs.get("name")
        if name:
            filter_company["name"] = ["like", f"%{name}%"]
        list_company = frappe.db.get_list("Company", filters=filter_company, fields=["name", "company_name"])
        return gen_response(200, "Thành công", list_company)
    except Exception as e:
        return exception_handle(e)
    
@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def employee_query(doctype, txt, searchfield, start, page_len, filters):
    from frappe.desk.reportview import get_filters_cond, get_match_cond
    from erpnext.controllers.queries import get_fields

    doctype = "Employee"
    conditions = []
    fields = get_fields(doctype, ["name", "employee_name", "user_id"])

    return frappe.db.sql(
        """select {fields} from `tabEmployee`
        where status in ('Active', 'Suspended')
            and docstatus < 2
            and ({key} like %(txt)s
                or employee_name like %(txt)s)
            {fcond} {mcond}
        order by
            (case when locate(%(_txt)s, name) > 0 then locate(%(_txt)s, name) else 99999 end),
            (case when locate(%(_txt)s, employee_name) > 0 then locate(%(_txt)s, employee_name) else 99999 end),
            idx desc,
            name, employee_name
        limit %(page_len)s offset %(start)s""".format(
            **{
                "fields": ", ".join(fields),
                "key": searchfield,
                "fcond": get_filters_cond(doctype, filters, conditions),
                "mcond": get_match_cond(doctype),
            }
        ),
        {"txt": "%%%s%%" % txt, "_txt": txt.replace("%", ""), "start": start, "page_len": page_len},
    )
