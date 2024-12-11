import frappe
from mbw_dms.api.common import (
    exception_handle,
    gen_response,
)
from mbw_dms.api.validators import validate_filter, validate_date
import json
from datetime import datetime, date

# Nhóm ctkm
@frappe.whitelist()
def get_list_group(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        my_filter = {'trang_thai': "Hoạt động"}
        name = kwargs.get("name")
        ten_nhom_ct = kwargs.get("ten_nhom_ct")
        page_size =  int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >=1 else 1
        if name:
            my_filter["name"] = ["like", f'%{name}%']
        if ten_nhom_ct:
            my_filter["ten_nhom_ct"] = ["like", f'%{ten_nhom_ct}%']
        group_promotion = frappe.db.get_list("SFA Group promotion", filters=my_filter, fields=['name', 'ten_nhom_ct'], start=page_size * (page_number - 1),
                                    page_length=page_size)
        total = len(frappe.db.get_list("SFA Group promotion", filters=my_filter))
        return gen_response(200, "Thành công", {
            "data": group_promotion,
            "totals": total,
            "page_size": page_size,
            "page_number": page_number
        })
    except Exception as e:
        return exception_handle(e)

# Xóa 1 hoặc nhiều bản ghi = update is_deleted
@frappe.whitelist(methods="PATCH")
def delete_multi(**body):
    try:
        # Lấy và validate giá trị name
        name = validate_filter(type_check='require', value=body.get('name'))
        
        is_deleted = body.get("is_deleted")
        status = body.get("status")

        # Nếu cả is_deleted và status đều không có
        if is_deleted is None and status is None:
            return gen_response(406, "Chọn hành động", [])

        # Các giá trị status hợp lệ
        valid_statuses = ["Hoạt động", "Khóa", "Chạy thử", "Chờ duyệt"]

        # Nếu có giá trị status, kiểm tra tính hợp lệ
        if status and status not in valid_statuses:
            return gen_response(406, "Trạng thái không hợp lệ", [])

        update_fields = {}
        if is_deleted is not None:
            message = "Xóa"
            update_fields["is_deleted"] = 1 if is_deleted else 0

        if status:
            message = "Cập nhật"
            update_fields["status"] = status

        name_count = len(name)

        # Cập nhật giá trị cho một hoặc nhiều bản ghi
        if name_count == 1:
            frappe.db.set_value('SFA Promotion', name[0], update_fields)
            affected_rows = 1
        else:
            name_arr = tuple(name)
            set_clauses = ", ".join([f"{field} = {frappe.db.escape(value)}" for field, value in update_fields.items()])

            # Cập nhật cả is_deleted và status nếu có
            frappe.db.sql(f"""
                UPDATE `tabSFA Promotion`
                SET {set_clauses}
                WHERE name IN {name_arr};
            """)
            affected_rows = name_count

        frappe.db.commit()
        return gen_response(200, f"{message} thành công {affected_rows} bản ghi", True)
    except Exception as e:
        exception_handle(e)

@frappe.whitelist(methods="GET")
def get_list_promotion(**kwargs):
    try:
        kwargs = frappe._dict(kwargs)
        start_time = kwargs.get("start_time")
        end_time = kwargs.get("end_time")
        name = kwargs.get("name")
        status = kwargs.get("status")
        name_promotion = kwargs.get("name_promotion")
        promotion_type = kwargs.get("promotion_type")
        ctype_name = kwargs.get("ctype_name")  # loại hình
        gtype_name = kwargs.get("gtype_name")  # nhóm
        territory = kwargs.get("territory")
        searchtext = kwargs.get("search_text")
        ptype_value = kwargs.get("ptype_value")
        page_size = int(kwargs.get("page_size", 20))
        page_number = int(kwargs.get("page_number")) if kwargs.get("page_number") and int(kwargs.get("page_number")) >= 1 else 1

        if start_time:
            start_day = validate_date(start_time)
        else:
            start_day = None
        if end_time:
            end_day = validate_date(end_time)
        else:
            end_day = None

        filters = []
        params = []

        if start_day and end_day:
            filters.append(f"(p.start_date <= %s AND p.end_date >= %s)")
            params.extend([end_day, start_day])
        elif start_day:
            filters.append(f"p.end_date >= %s")
            params.append(start_day)
        elif end_day:
            filters.append(f"p.start_date <= %s")
            params.append(end_day)
        if status:
            filters.append(f"p.status = %s")
            params.append(status)
        if name:
            filters.append(f"p.name = %s")
            params.append(name)
        if name_promotion:
            filters.append(f"p.name_promotion = %s")
            params.append(name_promotion)
        if promotion_type:
            filters.append(f"p.promotion_type = %s")
            params.append(promotion_type)
        if ctype_name:
            filters.append(f"stc.name_customer_type = %s")
            params.append(ctype_name)
        if ptype_value:
            filters.append(f"p.ptype_value = %s")
            params.append(ptype_value)
        if gtype_name:
            filters.append(f"scg.name_customer_group = %s")
            params.append(gtype_name)
        if territory:
            filters.append(f"sct.territory_name = %s")
            params.append(territory)
        if searchtext:
            filters.append(f"(p.code LIKE %s OR p.name_promotion LIKE %s)")
            params.extend([f"%{searchtext}%", f"%{searchtext}%"])

        filters.append("p.is_deleted = 0")
        where_conditions = " AND ".join(filters)

        count_query = f"""
            SELECT COUNT(DISTINCT p.name) as total
            FROM 
                `tabSFA Promotion` p
            LEFT JOIN 
                `tabSFA Customer Promotion` scp ON p.name = scp.parent
            LEFT JOIN 
                `tabSFA Type Customer` stc ON p.name = stc.parent
            LEFT JOIN 
                `tabSFA Customer Territory` sct ON p.name = sct.parent
            LEFT JOIN 
                `tabSFA Customer Group` scg ON p.name = scg.parent
        """

        if where_conditions:
            count_query += " WHERE {}".format(where_conditions)
        total_count = frappe.db.sql(count_query, params, as_dict=True)[0].get('total', 0)

        # Retrieve all results without pagination
        query = f"""
            SELECT 
                p.name, 
                p.status, 
                p.code, 
                p.name_promotion, 
                p.promotion_type,
                p.ptype_value,
                p.ptype_name, 
                p.multiple,
                p.description, 
                p.gpromotion_prioritize,
                p.gpromotion,
                p.start_date, 
                p.end_date,
                p.products,
                scp.customer_name, 
                scp.customer_code, 
                scp.sfa_customer_type, 
                scp.customer_group AS customergroup, 
                scp.display_address, 
                scp.phone_number,
                stc.customer_type, 
                stc.name_customer_type, 
                sct.territory, 
                sct.territory_name,
                scg.customer_group, 
                scg.name_customer_group
            FROM 
                `tabSFA Promotion` p
            LEFT JOIN 
                `tabSFA Customer Promotion` scp ON p.name = scp.parent
            LEFT JOIN 
                `tabSFA Type Customer` stc ON p.name = stc.parent
            LEFT JOIN 
                `tabSFA Customer Territory` sct ON p.name = sct.parent
            LEFT JOIN 
                `tabSFA Customer Group` scg ON p.name = scg.parent
        """

        if where_conditions:
            query += " WHERE {}".format(where_conditions)

        results = frappe.db.sql(query, params, as_dict=True)
        promotion_dict = {}
        for row in results:
            promotion_name = row['name']
            customer_obj = {
                'customer_name': row.get('customer_name'),
                'customer_code': row.get('customer_code'),
                'sfa_customer_type': row.get('sfa_customer_type'),
                'customer_group': row.get('customergroup'),
                'display_address': row.get('display_address'),
                'phone_number': row.get('phone_number')
            }
            if promotion_name not in promotion_dict:
                start_date_value = row.get('start_date', '')
                if isinstance(start_date_value, str) and start_date_value:
                    try:
                        start_date = int(datetime.strptime(start_date_value, '%Y/%m/%d').timestamp())
                    except ValueError:
                        start_date = None
                elif isinstance(start_date_value, date):
                    start_date = int(datetime.combine(start_date_value, datetime.min.time()).timestamp())
                else:
                    start_date = None

                end_date_value = row.get('end_date', '')
                if isinstance(end_date_value, str) and end_date_value:
                    try:
                        end_date = int(datetime.strptime(end_date_value, '%Y/%m/%d').timestamp())
                    except ValueError:
                        end_date = None
                elif isinstance(end_date_value, date):
                    end_date = int(datetime.combine(end_date_value, datetime.min.time()).timestamp())
                else:
                    end_date = None
                promotion_dict[promotion_name] = {
                    'name': row.get('name', ''),
                    'status': row.get('status', ''),
                    'code': row.get('code', ''),
                    'name_promotion': row.get('name_promotion', ''),
                    'promotion_type': row.get('promotion_type', ''),
                    'ptype_name': row.get('ptype_name', ''),
                    'description': row.get('description', ''),
                    'gpromotion_prioritize': row.get('gpromotion_prioritize', ''),
                    'gpromotion': row.get('gpromotion', ''),
                    'ptype_value': row.get('ptype_value', ''),
                    'multiple': row.get('multiple', ''),
                    'start_date': start_date,
                    'end_date': end_date,
                    'products': json.loads(row.get('products', '[]')) if isinstance(row.get('products', '[]'), str) else [],
                    'customers': [],
                    'territory': [],
                    'customer_type': [],
                    'customer_group': []
                }
            if customer_obj['customer_name']:  # Chỉ thêm khi có tên khách hàng
                if customer_obj not in promotion_dict[promotion_name]['customers']:
                    promotion_dict[promotion_name]['customers'].append(customer_obj)

            if row.get('territory'):
                if row['territory'] not in promotion_dict[promotion_name]['territory']:
                    promotion_dict[promotion_name]['territory'].append(row['territory'])

            if row.get('customer_type'):
                if row['customer_type'] not in promotion_dict[promotion_name]['customer_type']:
                    promotion_dict[promotion_name]['customer_type'].append(row['customer_type'])

            if row.get('customer_group'):
                if row['customer_group'] not in promotion_dict[promotion_name]['customer_group']:
                    promotion_dict[promotion_name]['customer_group'].append(row['customer_group'])
        
        for promotion in promotion_dict.values():
            if not promotion['customers']:
                promotion['customers'] = []
        promotion_list = list(promotion_dict.values())

        # Phân trang danh sách promotion_list
        start_index = (page_number - 1) * page_size
        end_index = start_index + page_size
        paginated_promotions = promotion_list[start_index:end_index]

        return gen_response(200, "Thành công", {
            "data": paginated_promotions,
            "totals": total_count,
            "page_size": page_size,
            "page_number": page_number
        })
    except Exception as e:
        return exception_handle(e)