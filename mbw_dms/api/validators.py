import re
from datetime import datetime


# Kiểm tra định dạng email truyền lên có đúng định dạng không
def validate_email(value):
    if not value:
        return value
    if len(value) > 50:
        raise ValueError(f"Email phải có độ dài từ nhỏ hơn 50 ký tự!")
    rule = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    if not rule.search(value):
        raise ValueError(f'Email {value} không đúng định dạng!')
    return value


# Kiểm tra định dạng số điện thoại truyền lên có đúng định dạng không
def validate_phone_number(value):
    if not value:
        raise ValueError('Vui lòng nhập số điện thoại!')
    rule = re.compile(r'(^[+0-9]{1,3})*([0-9]{10,11}$)')
    if not rule.search(value):
        raise ValueError('Số điện thoại %s không đúng định dạng!' % value)
    return value


# Kiểm tra trường bắt buộc có dữ liệu truyền lên không được để trống (required=True)
def validate_not_none(value):
    if not value:
        raise ValueError('Vui lòng nhập đầy đủ dữ liệu!')
    return value


# Kiểm tra trường date truyền lên
def validate_date(value):
    try:
        value = int(float(value))
        time = datetime.fromtimestamp(value)
        time = time.replace(hour=0, minute=0, second=0, microsecond=0)
        return str(time)
    except ValueError as e:
        raise Exception('Không đúng định dạng timestamp `%s`' % value)
    except:
        raise Exception('Không đúng định dạng timestamp `%s`' % value)


# Kiểm tra trường datetime truyền lên
def validate_datetime(value):
    try:
        value = int(float(value))
        time = datetime.fromtimestamp(value)
        time.strftime('%Y-%m-%d %H:%M:%S')
        return str(time).split('+')[0]
    except ValueError as e:
        raise Exception('Không đúng định dạng timestamp `%s`' % value)
    except:
        raise Exception('Không đúng định dạng timestamp `%s`' % value)


# Kiểm tra độ dài giá trị truyền lên có hợp lệ không
def validate_length(name='Giá trị', min=None, max=None):
    def validate(value):
        if min and max:
            if min <= len(value) <= max:
                return value
            raise ValueError(f"{name} phải có độ dài từ {min} đến {max} ký tự!")
        if min and min > len(value):
            raise ValueError(f"{name} phải có độ dài lớn hơn {min} ký tự!")
        if max and max < len(value):
            raise ValueError(f"{name} phải có độ dài nhỏ hơn {min} ký tự!")
        return value
    return validate


# Kiểm tra giá trị truyền lên có nằm trong các giá trị config không
def validate_choice(choice):
    if isinstance(choice, dict):
        choice = tuple(choice.keys())
    elif not isinstance(choice, tuple):
        choice = (choice,)

    def validate(value):
        if value not in choice:
            raise ValueError("Lựa chọn '%s' không hợp lệ. Giá trị hợp lệ: %s" % (value, choice))
        return value
    return validate


# Kiểm tra giá trị Boolean truyền lên
def validate_int_bool(number):
    try:
        if number == None or number == '':
            return None
        number = int(number)
        return bool(number)
    except:
        raise ValueError(f'Giá trị `{number}` không đúng định dạng. (Chỉ nhận giá trị 0, 1)')


# Kiểm tra định dạng timestamp truyền lên trong bộ lọc
def validate_filter_timestamp(type=None):
    def validate(value):
        try:
            value = float(value)
            if type == 'start':
                time = datetime.fromtimestamp(value).strftime('%Y-%m-%d') + ' 00:00:00'
            elif type == 'end':
                time = datetime.fromtimestamp(value).strftime('%Y-%m-%d') + ' 23:59:59'
            else:
                time = datetime.fromtimestamp(value)

            return time
        except ValueError as e:
            if value:
                raise Exception('%s không đúng định dạng timestamp' % value)
            else:
                raise Exception('Vui lòng điền đúng định dạng timestamp')
        except:
            if value:
                raise Exception('%s không phải là định dạng timestamp' % value)
            else:
                raise Exception('Vui lòng điền đúng định dạng timestamp')
    return validate


# Kiểm tra định dạng kiểu dữ liệu
def validate_type(type_value=None):
    def validate(value):
        if isinstance(value,type_value):
            return value
        else:
            raise Exception(f"{value} ont type : {type_value}")
    return validate
# Kiểm tra định dạng enum
def validate_enum(type_value=None):
    def validate(value):
        if value in type_value:
            return value
        else:
            raise Exception(f"{value} invalid")
    return validate
def validate_filter(type_check,type=None,value=None):
    validate = {
        "email": validate_email,
        "phone_number" :validate_phone_number,
        "require": validate_not_none,
        "date": validate_date,
        "datetime":validate_datetime,
        "length":validate_length(type),
        "choice":validate_choice,
        "boolean": validate_int_bool,
        "timestamp": validate_filter_timestamp(type),
        "type": validate_type(type),
        "enum": validate_enum(type)
    }

    return validate[type_check](value)