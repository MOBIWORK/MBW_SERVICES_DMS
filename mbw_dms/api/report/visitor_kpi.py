import frappe
import json
from datetime import datetime
from mbw_dms.api.common import gen_response, exception_handle
from mbw_dms.api.validators import validate_filter

@frappe.whitelist(methods="GET")
def report_visitor_kpi(**res):
    try:
        from_date = validate_filter(type_check="timestamp_to_date",type="start",value=res.get("from_date"))
        to_date = validate_filter(type_check="timestamp_to_date",type="end",value=res.get("to_date"))
        page_size =  int(res.get("page_size", 20))
        page_number = int(res.get("page_number")) if res.get("page_number") and int(res.get("page_number")) >=1 else 1

        offset = (page_number - 1) * page_size

        query = f"sc.creation BETWEEN '{from_date}' AND '{to_date}'"

        sql =f"""
            WITH ImageCounts AS (
                SELECT 
                    sc.name AS checkin_name, 
                    COALESCE(COUNT(dci.url_image), 0) AS total_image
                FROM 
                    `tabSFA Checkin` sc
                LEFT JOIN 
                    `tabSFA Checkin Image` dci ON sc.name = dci.parent
                GROUP BY
                    sc.name
            )
            SELECT
                em.employee AS employee_code,
                em.employee_name,
                sk.nhom_ban_hang,
                sc.checkin_id AS checkin_note_id,
                UNIX_TIMESTAMP(sc.createddate) as create_time,
                CONCAT(
                    '[', 
                    GROUP_CONCAT(
                        CONCAT(
                            '{{',
                            '"customer_name":"', sc.kh_ten, '",',
                            '"checkin_giovao":"', sc.checkin_giovao, '",',
                            '"checkin_giora":"',  sc.checkin_giora, '",',
                            '"customer_donhang":"',    sk.so_don_hang, '",',
                            '"customer_doanhso":"', sk.doanh_so,'",',
                            '"customer_doanhthu":"',  sk.doanh_thu,'",',
                            '"customer_code":"', sc.kh_ma, '",', 
                            '"customer_khoangcach":"', sc.checkin_khoangcach, '",', 
                            '"total_image":"', COALESCE(ic.total_image, 0), '",',
                            '"checkin":"', DATE_FORMAT(sc.checkin_giovao, '%H:%i'), '",',
                            '"distance":"', COALESCE(sc.checkin_khoangcach, ''), '",', 
                            '"time_check":"', TIMESTAMPDIFF(MINUTE, sc.checkin_giovao, sc.checkin_giora) + TIMESTAMPDIFF(SECOND, sc.checkin_giovao, sc.checkin_giora)/60, '"'
                            '}}'
                        ) SEPARATOR ','
                    ),
                    ']'
                ) AS customers
            FROM `tabEmployee` em
            LEFT JOIN 
                `tabSFA Checkin` sc ON em.user_id = sc.createdbyemail
            LEFT JOIN 
                `tabSFA KPI` sk ON em.name = sk.nhan_vien_ban_hang
            LEFT JOIN 
                ImageCounts ic ON sc.name = ic.checkin_name
            WHERE {query}
            GROUP BY 
                employee_code,  DATE(sc.createddate)
            
            LIMIT {page_size} OFFSET {offset}
        """

        spl_count = f"""
            SELECT COUNT(*) as total
            FROM (
                SELECT 
                    em.employee AS employee_code,
                    DATE(sc.createddate)
                FROM `tabEmployee` em
                LEFT JOIN 
                    `tabSFA Checkin` sc ON em.user_id = sc.createdbyemail
                LEFT JOIN 
                    `tabSFA KPI` sk ON em.name = sk.nhan_vien_ban_hang
                
                WHERE {query}
                GROUP BY 
                    employee_code,  
                    DATE(sc.createddate)
            ) AS subquery
        """
        report = frappe.db.sql(sql, as_dict=True)
        count = frappe.db.sql(spl_count, as_dict=True)[0].get("total")
        for r in report:
            r['customers'] = json.loads(r['customers']) if r['customers'] else []
            r.update({"checkin_sang":0, "checkin_chieu":0})
            custom_data = r.get("customers")
            
            listCheckin_in = []
            listCheckin_out = []
            total_distance = 0
            total_donhang = 0
            total_anhchup = 0
            total_doanhso = 0
            total_doanhthu = 0
            for c in custom_data:

                #check in dau tien sang, cuoi chieu
                listCheckin_in.append(datetime.strptime(c.get("checkin_giovao"), "%Y-%m-%d %H:%M:%S.%f"))
                listCheckin_out.append(datetime.strptime(c.get("checkin_giora"), "%Y-%m-%d %H:%M:%S.%f"))

                #check in sang, chieu
                timeCheckIn = int( c.get("checkin").split(":")[0])
                if timeCheckIn < 12:
                    r.update({"checkin_sang": r.get("checkin_sang") + 1})
                else:
                    r.update({"checkin_chieu": r.get("checkin_chieu") + 1})

                #tong km di chuyen
                total_distance += float(c.get("distance")) if c.get("distance") else 0

                #tong don hang
                total_donhang += float(c.get("customer_donhang")) if c.get("customer_donhang") else 0

                #tong anh chup
                total_anhchup += int(c.get("total_image")) if c.get("total_image") else 0

                #tong danh so
                total_doanhso += float(c.get("customer_doanhso")) if c.get("customer_doanhso") else 0

                #tong doanh thu
                total_doanhthu += float(c.get("customer_doanhthu")) if c.get("customer_doanhthu") else 0
            
            r.update({"checkin_daungay": min(listCheckin_in)})
            r.update({"checkin_cuoingay": max(listCheckin_out)})
            r.update({"total_distance": total_distance})
            r.update({"total_donhang": total_donhang})
            r.update({"total_anhchup": total_anhchup})
            r.update({"total_doanhso": total_doanhso})
            r.update({"total_doanhthu": total_doanhthu})

           
        return gen_response(200, "Thành công", {"data": report, "total":count, "page_size": page_size, "page_number": page_number})

    except Exception as e:
        return exception_handle(e)
    
     