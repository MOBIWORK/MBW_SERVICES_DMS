import frappe
from mbw_dms.api.common import gen_response, exception_handle, get_value_child_doctype
from collections import defaultdict
from mbw_dms.api.validators import validate_filter_timestamp


@frappe.whitelist(methods="GET")
def report_prod_dbd(**res):
    try:
        from_date = validate_filter_timestamp(type="start")(res.get("from_date")) if res.get("from_date") else None
        to_date = validate_filter_timestamp(type="end")(res.get("to_date")) if res.get("to_date") else None
        page_size =  int(res.get("page_size", 20))
        page_number = int(res.get("page_number")) if res.get("page_number") and int(res.get("page_number")) >=1 else 1
        sales_team = res.get("sales_team")

        filters = "WHERE so.docstatus = 1"

        if sales_team:
            filters=f"{filters} AND nhom_ban_hang = '{sales_team}'"
        
        filters = f"{filters} AND so.creation BETWEEN '{from_date}' AND '{to_date}'"
        
        sql_query = f""" 
            SELECT so.total_qty, so.creation, st.sales_person , kpi.san_luong as kpi_san_luong , sp.parent_sales_person, so.name
            FROM `tabSales Order` so
            LEFT JOIN `tabSales Team` st ON so.name = st.parent 
            LEFT JOIN `tabSales Person` sp ON st.sales_person = sp.sales_person_name
            LEFT JOIN `tabDMS KPI` kpi ON sp.employee = kpi.nhan_vien_ban_hang
            {filters}
        """

        sql_query += " ORDER BY so.creation desc"
        sql_query += " LIMIT %s OFFSET %s"
        limit = page_size
        offset = (page_number - 1) * limit
        sale_orders = frappe.db.sql(sql_query, (limit, offset), as_dict=True)

        # Tạo một dictionary để lưu trữ các nhóm theo parent_sales_person và sales_person
        grouped_data = defaultdict(lambda: defaultdict(lambda: defaultdict(float)))

        # Lặp qua từng phần tử và kiểm tra sales_person khác None
        arr_filed = ["qty", "stock_uom", "uom", "conversion_factor", "amount", "item_name"]

        for item in sale_orders:
            if item['sales_person'] is not None:
                # Lấy ngày từ transaction_date
                date_value = item["creation"].day
                products = get_value_child_doctype("Sales Order", item["name"], "items", arr_filed)

                for prod in products:
                    # Nếu là SP khuyến mãi thì trừ đi số lượng SPKM
                    if(prod["amount"] == 0):
                        item["total_qty"] -= prod["qty"]
                        continue

                    # Chuyển đổi số lượng về số lượng của đơn vị tính quy chuẩn
                    if(prod["stock_uom"] != prod["uom"]):
                        item_uoms = get_value_child_doctype("Item", {"item_name":prod["item_name"]}, "uoms")
                        tile_dvt_phu = None

                        # Lấy hệ số quy đổi
                        for it in item_uoms:
                            if it["uom"] == prod["uom"]:
                                tile_dvt_phu = it["conversion_factor"]
                            if it["uom"] == prod["stock_uom"]:
                                tile_dvt_chinh = it["conversion_factor"]
                        if tile_dvt_phu is not None and tile_dvt_phu != 0:
                            tile_quydoi = tile_dvt_chinh / tile_dvt_phu
                        else: tile_quydoi = 1
                    
                        item["total_qty"] =  item["total_qty"] - prod["qty"] + (prod["qty"] * tile_quydoi )

                # Gộp vào danh sách dựa trên parent_sales_person và sales_person
                parent = item['parent_sales_person']
                sales_person = item['sales_person']
                
                # Cộng dồn total_qty vào ngày tương ứng cho sales_person đó
                grouped_data[parent][sales_person][date_value] += item['total_qty']

        # Tạo danh sách các object_data với định dạng group_name, sales_person và children (theo ngày)
        result = []
        for parent_sales_person, sales_persons in grouped_data.items():
            total_qty_by_month_all = 0
            total_qty_by_month = 0
            total_rest_all = 0
            total_qty_by_day = defaultdict(float)  # Dictionary lưu tổng total_qty theo từng ngày
            children = []
            total_kpi_month = 0
            
            for sales_person, day_totals in sales_persons.items():

                # Cộng dồn total_qty theo từng ngày cho group_name (cha)
                kpi_san_luong = next(children["kpi_san_luong"] for children in sale_orders if children["sales_person"] == sales_person and children["parent_sales_person"] == parent_sales_person)
                # Lấy kpi_san_luong từ dữ liệu gốc cho sales_person
                if kpi_san_luong is not None:
                    total_kpi_month += kpi_san_luong
                else:
                    kpi_san_luong = 0

                total_qty_day_by_day = 0
                for day, qty in day_totals.items():
                    total_qty_by_day[day] += qty
                    total_qty_day_by_day += qty
                
                total_qty_by_month = total_qty_day_by_day

                the_rest = kpi_san_luong - total_qty_day_by_day
                
                if the_rest < 0:
                    the_rest = 0
                total_rest_all += the_rest

                # Thêm vào children
                total_qty_by_month_all += total_qty_day_by_day

                children.append({
                    "the_rest": the_rest,
                    "total_qty_day_by_day":total_qty_day_by_day,
                    "total_qty_by_month": total_qty_by_month,
                    "sales_person": sales_person,
                    "total_qty_by_day": dict(day_totals),  # Chuyển defaultdict thành dict
                    "kpi_san_luong": kpi_san_luong
                })
                
            # Thêm tổng total_qty theo ngày vào object cha
            result.append({
                "total_rest_all": total_rest_all,
                "total_qty_by_month_all": total_qty_by_month_all,
                "total_kpi_month": total_kpi_month,
                "group_name": parent_sales_person,
                "total_qty_by_day": dict(total_qty_by_day),  # Tổng total_qty theo ngày cho group cha
                "children": children
            })

        return gen_response(200, "Thành công", {
            "data": result,
            "totals": len(result),
            "page_number": page_number,
            "page_size": page_size,
        })
    except Exception as e:
        return exception_handle(e)
    