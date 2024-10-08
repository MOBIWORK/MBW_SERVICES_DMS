import frappe
from mbw_dms.api.common import (
    gen_response,
    exception_handle,
    get_employee_id,
    get_user_id,
    get_employee_by_name,
    validate_image,
    get_base_url,
    get_value_child_doctype,
    get_all_parent_sales_persons
)
from mbw_dms.api.validators import validate_filter_timestamp
from datetime import datetime
from pypika import Order, CustomFunction
import json
import re

@frappe.whitelist(methods="GET")
def get_list_notification(**kwargs):
    try:
        employee_id = get_employee_id()
        start_time = kwargs.get("start_time")
        end_time = kwargs.get("end_time")

        page_size = kwargs.get('page_size', 20)
        page = 1 if not kwargs.get('page') or int(kwargs.get('page')) <= 0 else int(kwargs.get('page'))
        start = (page - 1) * page_size

        NoticeBoard = frappe.qb.DocType("DMS Notice Board")
        EmployeeJoin = frappe.qb.DocType('DMS Notice Board Employee')
        Employee = frappe.qb.DocType('Employee')
        UNIX_TIMESTAMP = CustomFunction('UNIX_TIMESTAMP', ['day'])
        
        query_code = (EmployeeJoin.employee == employee_id) | (NoticeBoard.apply_for == "All Employee")
        if start_time and end_time:
            start_day = validate_filter_timestamp(type='start')(start_time)
            end_day = validate_filter_timestamp(type='end')(end_time)
            query_code = query_code & (NoticeBoard.creation <= end_day) & (NoticeBoard.creation >= start_day)

        list_doc = (
            frappe.qb.from_(NoticeBoard)
            .left_join(EmployeeJoin)
            .on(NoticeBoard.name == EmployeeJoin.parent)
            .inner_join(Employee)
            .on(NoticeBoard.owner == Employee.user_id)
            .select(NoticeBoard.name, Employee.employee_name, Employee.image, NoticeBoard.notice_title, NoticeBoard.message, NoticeBoard.description, UNIX_TIMESTAMP(NoticeBoard.from_date).as_("from_date"), UNIX_TIMESTAMP(NoticeBoard.to_date).as_("to_date"), UNIX_TIMESTAMP(NoticeBoard.creation).as_('creation'), NoticeBoard.priority_level, NoticeBoard.employee_watched)
            .offset(start)
            .limit(page_size)
            .where(query_code)
            .orderby(NoticeBoard.creation, order=Order.desc)
        ).run(as_dict=True)

        for doc in list_doc:
            user_image = doc.get('image')
            doc['user_image'] = validate_image(user_image)

            employee_watched_json = doc.get('employee_watched')
            if employee_watched_json:
                employee_watched = json.loads(employee_watched_json)
                if not any(d['name'] == employee_id for d in employee_watched):
                    doc['is_watched'] = False
                else:
                    doc['is_watched'] = True
            else:
                doc['is_watched'] = False

            del doc['employee_watched']
            del doc['image']

        result = {
            "data": list_doc,
        }
        return gen_response(200, "Thành công", result)
    except Exception as e:
        exception_handle(e)


@frappe.whitelist(methods="GET")
def get_info_notification(**kwargs):
    try:
        employee_id = get_employee_id()
        name_doc = kwargs.get("name")

        NoticeBoard = frappe.qb.DocType("DMS Notice Board")
        FileDoc = frappe.qb.DocType("File")
        Employee = frappe.qb.DocType('Employee')
        UNIX_TIMESTAMP = CustomFunction('UNIX_TIMESTAMP', ['day'])
        Concat = CustomFunction('CONCAT', ['str_root', 'str_concat'])

        # get notification
        list_doc = (
            frappe.qb.from_(NoticeBoard)
            .inner_join(Employee)
            .on(NoticeBoard.owner == Employee.user_id)
            .select(NoticeBoard.name, NoticeBoard.notice_title, Employee.employee_name, Employee.image, NoticeBoard.message, NoticeBoard.description, UNIX_TIMESTAMP(NoticeBoard.from_date).as_("from_date"), UNIX_TIMESTAMP(NoticeBoard.to_date).as_("to_date"), NoticeBoard.priority_level, UNIX_TIMESTAMP(NoticeBoard.creation).as_('creation'), NoticeBoard.employee_watched)
            .where(NoticeBoard.name == name_doc)
            .limit(1)
        ).run(as_dict=True)

        # Check if the return notification exists
        if len(list_doc):
            info = list_doc[0]
            # handle adding viewed employees
            employee_watched_json = info.get('employee_watched')
            employee_watched = []
            if employee_watched_json:
                employee_watched = json.loads(employee_watched_json)

            # Check if the staff has seen it or not
            if not any(d['name'] == employee_id for d in employee_watched):
                employee_info = get_employee_by_name(
                    employee_id, ["name", "image", "employee_name"])

                employee_image = validate_image(employee_info.get('image'))

                employee_add = {
                    "name": employee_id,
                    "image": employee_image,
                    "employee_name": employee_info.get('employee_name')
                }
                employee_watched.append(employee_add)
                employee_watched_json = json.dumps(employee_watched)

                # Viewed employee updates for notifications
                doc = frappe.get_doc('DMS Notice Board', name_doc)
                doc.employee_watched = employee_watched_json
                doc.save(ignore_permissions=True)
                frappe.db.commit()

            info["employee_watched"] = employee_watched
            # handle returns the attached file
            info['files'] = (frappe.qb.from_(FileDoc)
                             .select(Concat(get_base_url(), FileDoc.file_url).as_("file_url"), FileDoc.name)
                             .where(FileDoc.attached_to_name == name_doc)
                             ).run(as_dict=True)

            user_image = info.get('image')
            info['user_image'] = validate_image(user_image)
            del info['image']

            return gen_response(200, "Thành công", info)
        else:
            return gen_response(404, "Không tồn tại tài liệu", list_doc)
    except Exception as e:
        exception_handle(e)


@frappe.whitelist(methods="GET")
def get_list_notification_system(**kwargs):
    try:
        user_id = get_user_id()
        start_time = kwargs.get("start_time")
        end_time = kwargs.get("end_time")

        page_size = 20 if not kwargs.get(
            'page_size') else int(kwargs.get('page_size'))
        page = 1 if not kwargs.get('page') or int(
            kwargs.get('page')) <= 0 else int(kwargs.get('page'))
        start = (page - 1) * page_size

        NotificationLog = frappe.qb.DocType("Notification Log")
        Employee = frappe.qb.DocType('Employee')
        UNIX_TIMESTAMP = CustomFunction('UNIX_TIMESTAMP', ['day'])
        
        query_code = (NotificationLog.for_user == user_id)
        if start_time and end_time:
            start_day = datetime.fromtimestamp(int(start_time))
            end_day = datetime.fromtimestamp(int(end_time))
            query_code = query_code & (NotificationLog.creation <= end_day) & (NotificationLog.creation >= start_day)

        list_doc = (
            frappe.qb.from_(NotificationLog)
            .inner_join(Employee)
            .on(NotificationLog.owner == Employee.user_id)
            .select(NotificationLog.subject, NotificationLog.document_type, NotificationLog.document_name, Employee.employee_name, Employee.image, UNIX_TIMESTAMP(NotificationLog.creation).as_('creation'), NotificationLog._seen)
            .offset(start)
            .limit(page_size)
            .where(query_code)
            .orderby(NotificationLog.creation, order=Order.desc)
        ).run(as_dict=True)
        for doc in list_doc:
            user_image = doc.get('image')
            doc['user_image'] = validate_image(user_image)

            employee_watched_json = doc.get('_seen')
            if employee_watched_json:
                employee_watched = json.loads(employee_watched_json)
                if user_id in employee_watched:
                    doc['is_watched'] = True
                else:
                    doc['is_watched'] = False
            else:
                doc['is_watched'] = False

            del doc['_seen']
            del doc['image']

        result = {
            "data": list_doc,
        }
        return gen_response(200, "Thành công", result)
    except Exception as e:
        exception_handle(e)


@frappe.whitelist(methods="GET")
def get_notifi(**kwargs):
    try:
        employee_id = get_employee_id()
        my_filter = {}
        data = []
        img_src_pattern = r'<img[^>]+src="([^">]+)"'
        from_date = validate_filter_timestamp(type='start')(kwargs.get('from_date')) if kwargs.get('from_date') else None
        to_date = validate_filter_timestamp(type='end')(kwargs.get('to_date')) if kwargs.get('to_date') else None
        page_size =  int(kwargs.get('page_size', 20))
        page_number = int(kwargs.get('page_number')) if kwargs.get('page_number') and int(kwargs.get('page_number')) >= 1 else 1
        name = kwargs.get('name')
        if name:
            my_filter['name'] = name
        if from_date and to_date:
            my_filter["date_checkin"] = ["between", [from_date, to_date]]
        elif from_date:
            my_filter["date_checkin"] = [">=",from_date]
        elif to_date:
            my_filter["date_checkin"] = ["<=", to_date]
        saleperson = frappe.get_value('Sales Person', {'employee': employee_id}, 'sales_person_name')
        notis =  frappe.get_all('DMS Notice Board', filters=my_filter, fields=['name', 'owner', 'notice_title', 'description', 'from_date', 'to_date', 'priority_level', 'apply_for', 'message', 'employee_watched'],
                                start=page_size*(page_number-1), page_length=page_size)
        for i in notis:
            if i.apply_for == 'All Employee':
                info_user = frappe.db.get_value("User", {"name": i.owner}, ['full_name', 'user_image'], as_dict=True)
                i['full_name'] = info_user.full_name
                i['user_image'] = validate_image(info_user.user_image)
                img_srcs = re.findall(img_src_pattern, i['message'])
                for img_src in img_srcs:
                    if img_src:
                        i['message'] = i['message'].replace(img_src,f"{validate_image(img_src)}")
                employee_watched_json = i.get('employee_watched')
                if employee_watched_json:
                    employee_watched = json.loads(employee_watched_json)
                    if not any(d['name'] == employee_id for d in employee_watched):
                        i['is_watched'] = False
                    else:
                        i['is_watched'] = True
                else:
                    i['is_watched'] = False
                del i['employee_watched']
                data.append(i)
            elif i.apply_for == 'Specific Salesteam':
                sale_team = get_value_child_doctype("DMS Notice Board", i['name'], 'salesteams')
                info_user = frappe.db.get_value("User", {"name": i.owner}, ['full_name', 'user_image'], as_dict=True)
                i['full_name'] = info_user.full_name
                i['user_image'] = validate_image(info_user.user_image)
                img_srcs = re.findall(img_src_pattern, i['message'])
                for img_src in img_srcs:
                    if img_src:
                        i['message'] = i['message'].replace(img_src,f"{validate_image(img_src)}")
                employee_watched_json = i.get('employee_watched')
                if employee_watched_json:
                    employee_watched = json.loads(employee_watched_json)
                    if not any(d['name'] == employee_id for d in employee_watched):
                        i['is_watched'] = False
                    else:
                        i['is_watched'] = True
                else:
                    i['is_watched'] = False
                del i['employee_watched']
                for salein in sale_team:
                    if salein.nhom_ban_hang in get_all_parent_sales_persons(saleperson):
                        if i not in data:
                            data.append(i)
        
        return gen_response(200, "Thành công", {
            "data": data,
            "page_number": page_number,
            "page_size": page_size
            })
    except Exception as e:
        exception_handle(e)


@frappe.whitelist(methods="GET")
def get_notifi_detail(**kwargs):
    try:
        employee_id = get_employee_id()
        data = []
        img_src_pattern = r'<img[^>]+src="([^">]+)"'
        name = kwargs.get('name')
        saleperson = frappe.get_value('Sales Person', {'employee': employee_id}, 'sales_person_name')
        notis =  frappe.get_all('DMS Notice Board', filters={'name': name}, fields=['name', 'owner', 'notice_title', 'description', 'from_date', 'to_date', 'priority_level', 'apply_for', 'message', 'employee_watched'],)
        for i in notis:
            if i.apply_for == 'All Employee':
                info_user = frappe.db.get_value("User", {"name": i.owner}, ['full_name', 'user_image'], as_dict=True)
                i['full_name'] = info_user.full_name
                i['user_image'] = validate_image(info_user.user_image)
                img_srcs = re.findall(img_src_pattern, i['message'])
                for img_src in img_srcs:
                    if img_src:
                        i['message'] = i['message'].replace(img_src,f"{validate_image(img_src)}")
                employee_watched_json = i.get('employee_watched')
                if employee_watched_json:
                    employee_watched = json.loads(employee_watched_json)
                    if not any(d['name'] == employee_id for d in employee_watched):
                        i['is_watched'] = True
                    else:
                        i['is_watched'] = True
                else:
                    i['is_watched'] = True
                data.append(i)
            elif i.apply_for == 'Specific Salesteam':
                sale_team = get_value_child_doctype("DMS Notice Board", i['name'], 'salesteams')
                info_user = frappe.db.get_value("User", {"name": i.owner}, ['full_name', 'user_image'], as_dict=True)
                i['full_name'] = info_user.full_name
                i['user_image'] = validate_image(info_user.user_image)
                img_srcs = re.findall(img_src_pattern, i['message'])
                for img_src in img_srcs:
                    if img_src:
                        i['message'] = i['message'].replace(img_src,f"{validate_image(img_src)}")
                employee_watched_json = i.get('employee_watched')
                if employee_watched_json:
                    employee_watched = json.loads(employee_watched_json)
                    if not any(d['name'] == employee_id for d in employee_watched):
                        i['is_watched'] = True
                    else:
                        i['is_watched'] = True
                else:
                    i['is_watched'] = True
                for salein in sale_team:
                    if salein.nhom_ban_hang in get_all_parent_sales_persons(saleperson):
                        if i not in data:
                            data.append(i)    
        
        if len(data):
            info = data[0]
            employee_watched_json = info.get('employee_watched')
            employee_watched = []
            if employee_watched_json:
                employee_watched = json.loads(employee_watched_json)
            if not any(d['name'] == employee_id for d in employee_watched):
                employee_info = get_employee_by_name(
                    employee_id, ["name", "image", "employee_name"])
                employee_image = validate_image(employee_info.get('image'))

                employee_add = {
                    "name": employee_id,
                    "image": employee_image,
                    "employee_name": employee_info.get('employee_name')
                }
                employee_watched.append(employee_add)
                employee_watched_json = json.dumps(employee_watched)

                # Viewed employee updates for notifications
                doc = frappe.get_doc('DMS Notice Board', name)
                doc.employee_watched = employee_watched_json
                doc.save(ignore_permissions=True)
                frappe.db.commit()

            info["employee_watched"] = employee_watched
            user_image = info.get('user_image')
            info['user_image'] = validate_image(user_image)
        
        else:
            return gen_response(404, "Không tồn tại tài liệu", data)
        return gen_response(200, "Thành công", {
            "data": info,
            })
    except Exception as e:
        exception_handle(e)