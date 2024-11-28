import math
import frappe
import json
from datetime import datetime,timedelta
from mbw_dms.api.common import gen_response, exception_handle,get_sales_group_child_v2
from mbw_dms.api.validators import validate_filter
import pydash
import requests
@frappe.whitelist(methods="GET")
def report_visitor_kpi(**res):
    try:
        from_date = validate_filter(type_check="timestamp_to_date",type="start",value=res.get("from_date"))
        to_date = validate_filter(type_check="timestamp_to_date",type="end",value=res.get("to_date"))
        page_size =  int(res.get("page_size", 20))
        page_number = int(res.get("page_number")) if res.get("page_number") and int(res.get("page_number")) >=1 else 1
        sales_team = res.get("sales_team")
        employee = res.get("employee")
        # territory= res.get("territory")
        # customer_group=res.get("customer_group")
        # customer_type= res.get("customer_type")
        date=  datetime.fromtimestamp(float(res.get("from_date")))
        start_date =date.replace(day=1)
        end_date = date.replace(month=date.month+1).replace(day=1) - timedelta(days=1)
        offset = (page_number - 1) * page_size

        filters = []

        if employee:
            filters.append(f"sk.nhan_vien_ban_hang = '{employee}'")
        if sales_team:
            sale_persons = get_sales_group_child_v2(sales_team)
            sales_p = "("+",".join(pydash.map_(sale_persons,lambda x: f"'{x.name}'"))+")"
            filters.append(f"sk.nhom_ban_hang in {sales_p}")

        filters.append(f"""
            sc.creation BETWEEN '{from_date}' AND '{to_date}'
            AND sk.ngay_hieu_luc_tu >= '{start_date}'
            AND sk.ngay_hieu_luc_den <= '{end_date}'
        """)
        where_condition = " AND ".join(filters)  if filters else "1=1"

        conditions = f""" AND si.posting_date BETWEEN '{from_date}' AND '{to_date}'"""
        if employee:
            conditions += f""" AND sp.employee = '{employee}'"""
        if sales_team:
            conditions += f""" AND sp.parent_sales_person = '{sales_team}'"""
        #query so don hang va doanh thu
        sql_sales_invoice = f"""
                    SELECT
                        sp.employee as employee,
                        SUM(si.grand_total) as doanh_thu,
                        COUNT(DISTINCT si.name) as so_don_hang,
                        si.posting_date as posting_date
                    FROM
                        `tabSales Invoice` si
                    JOIN `tabSales Person` sp ON si.custom_sale_person = sp.name
                    WHERE
                        si.docstatus = 1 {conditions}
                    GROUP BY
                        posting_date,
                        employee
                """

        sql = f"""
            WITH ImageCounts AS (
                SELECT 
                    sc.name AS checkin_name, 
                    COALESCE(COUNT(dci.url_image), 0) AS total_image
                FROM 
                    `tabDMS Checkin` sc
                LEFT JOIN 
                    `tabDMS Checkin Image` dci ON sc.name = dci.parent
                GROUP BY
                    sc.name
            )
            SELECT DISTINCT
                em.employee AS employee_code,
                em.employee_name,
                sk.nhom_ban_hang,
                sc.checkin_id AS checkin_note_id,
                em.user_id as user_id,
                em.name as name,
                UNIX_TIMESTAMP(sc.createddate) as create_time,
                CONCAT(
                    '[', 
                    GROUP_CONCAT(
                        DISTINCT CONCAT(
                            '{{',
                            '"customer_name":"', sc.kh_ten, '",',
                            '"checkin_giovao":"', sc.checkin_giovao, '",',
                            '"checkin_giora":"',  sc.checkin_giora, '",',
                            '"customer_doanhso":"', sk.doanh_so,'",',
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
                `tabDMS Checkin` sc ON em.user_id = sc.createdbyemail
            LEFT JOIN 
                `tabDMS KPI` sk ON em.name = sk.nhan_vien_ban_hang
            LEFT JOIN 
                ImageCounts ic ON sc.name = ic.checkin_name
            {f"WHERE {where_condition}" if where_condition else ""}
            GROUP BY 
                employee_code,  DATE(sc.createddate)
            ORDER BY 
                employee_code ASC, sc.checkin_giovao ASC
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
                    `tabDMS Checkin` sc ON em.user_id = sc.createdbyemail
                LEFT JOIN 
                    `tabDMS KPI` sk ON em.name = sk.nhan_vien_ban_hang
                
                {f"WHERE {where_condition}" if where_condition else ""}
                GROUP BY 
                    employee_code,  
                    DATE(sc.createddate)
            ) AS subquery
            """


        report = frappe.db.sql(sql, as_dict=True)
        count = frappe.db.sql(spl_count, as_dict=True)[0].get("total")
        sum_si = frappe.db.sql(sql_sales_invoice, as_dict=True)
        data={}
        #luu doanh thu va don hang theo key employee_code va date
        data_si={}
        for si in sum_si:
            if si.employee not in data_si:
                data_si[si.employee]={}
            date = str(si.posting_date)
            data_si[si.employee][date]={
                'doanh_thu': si.doanh_thu,
                'so_don_hang': si.so_don_hang,
            }
        #tinh total checkin sang chieu va tong doanh so
        for r in report:
            if r["customers"] != None:
                r["customers"] = json.loads(r["customers"]) if r["customers"] else []
                r.update({"checkin_sang": 0, "checkin_chieu": 0})
                custom_data = r.get("customers")
                
                listCheckin_in = []
                listCheckin_out = []
                total_distance = 0
                total_donhang = 0
                total_anhchup = 0
                total_doanhso = 0
                total_doanhthu = 0
                for c in custom_data:
                    # Check in đầu tiên sáng, cuối chiều
                    listCheckin_in.append(datetime.strptime(c.get("checkin_giovao"), "%Y-%m-%d %H:%M:%S.%f"))
                    listCheckin_out.append(datetime.strptime(c.get("checkin_giora"), "%Y-%m-%d %H:%M:%S.%f"))

                    # Check in sáng, chiều
                    timeCheckIn = int(c.get("checkin").split(":")[0])
                    if timeCheckIn < 12:
                        r.update({"checkin_sang": r.get("checkin_sang") + 1})
                    else:
                        r.update({"checkin_chieu": r.get("checkin_chieu") + 1})

                    # Tổng ảnh chụp
                    total_anhchup += int(c.get("total_image")) if c.get("total_image") else 0

                    # Tổng doanh số
                    total_doanhso = float(c.get("customer_doanhso")) if c.get("customer_doanhso") else 0
                
                r.update({"checkin_daungay": min(listCheckin_in) })
                r.update({"checkin_cuoingay": max(listCheckin_out)})
                r.update({"total_distance": total_distance})
                r.update({"total_donhang": total_donhang})
                r.update({"total_anhchup": total_anhchup})
                r.update({"total_doanhso": total_doanhso})
                r.update({"total_doanhthu": total_doanhthu})
            date = str(r["checkin_daungay"]).split(" ")[0]
            if r["employee_code"] not in data:
                data[r["employee_code"]] = {}
            data[r["employee_code"]][date] = r

        #goi api giam sat tinh so km vieng tham.
        projectID = ''
        api_key = ''
        dms_settinngs = frappe.get_doc("DMS Settings").as_dict()
        if dms_settinngs.get("ma_du_an"):
            projectID = dms_settinngs.get("ma_du_an")
            api_key = dms_settinngs.get("api_key")
        #voi moi employee trong data, lay object_id va lay log_history
        for d in data:
            object_id = frappe.db.get_value("Sales Person", {"employee": d}, "object_id")
            #Log lich su hoat dong tu from_date den to_date trong filters
            log_trips = get_report_api("history", projectID, object_id, api_key, from_date, to_date)
            if log_trips.get("details"):
                for log in log_trips.get("details"):
                    if log.get("type") == "start" or log.get("type") == "end":
                        continue
                    time = datetime.strptime(log.get("endTime"), "%Y-%m-%dT%H:%M:%S.%fZ") + timedelta(hours=7)
                    date = time.strftime("%Y-%m-%d")
                    if date in data[d]:
                        checkin_daungay = data[d][date]["checkin_daungay"]
                        checkin_cuoingay = data[d][date]["checkin_cuoingay"]
                        if checkin_daungay <= time <= checkin_cuoingay and log.get("type") == "move":
                            data[d][date]["total_distance"] = data[d][date]["total_distance"] + float(log.get("distance"))
                        #cap nhat doanh thu va so don hang theo key employee_code va date
                        if d in data_si and date in data_si[d]:
                            data[d][date]["total_donhang"] = data_si[d][date]['so_don_hang']
                            data[d][date]["total_doanhthu"] = data_si[d][date]['doanh_thu']

        report = [
            {**entry, "total_distance": entry["total_distance"] / 1000}
            for d in data for entry in data[d].values()
        ]
        return gen_response(200, "Thành công", {"data": report, "totals":count, "page_size": page_size, "page_number": page_number})

    except Exception as e:
        return exception_handle(e)
    
def get_report_api(type, projectID, objectID, api_key, from_date, to_date):
    from_date = datetime.strptime(from_date, "%Y-%m-%d %H:%M:%S")
    to_date = datetime.strptime(to_date, "%Y-%m-%d %H:%M:%S")
    #chuyen doi gio timezone vn -> quoc te
    from_time = (from_date - timedelta(days=1)).replace(hour=17, minute=0, second=0, microsecond=0).isoformat() + "Z"
    to_time = to_date.replace(hour=17, minute=0, second=0, microsecond=0).isoformat() + "Z"

    url = f"https://api.ekgis.vn/v2/reports/{type}/{projectID}/{objectID}?from_time={from_time}&to_time={to_time}&api_key={api_key}"

    payload = {}
    headers = {
		'Accept': '*/*',
		'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
		'Pragma': 'no-cache',
		'Sec-Fetch-Dest': 'empty',
		'Sec-Fetch-Mode': 'cors',
		'Sec-Fetch-Site': 'cross-site',
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
		'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Linux"'
	}

    response = requests.request("GET", url, headers=headers, data=payload)
    # print("response", response.text)
    return response.json()
