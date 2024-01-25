import frappe
from frappe import _
import json
from datetime import datetime
from pypika import  Order, CustomFunction

from mbw_dms.api.common import (
    exception_handel,
    gen_response,
    validate_image,
    post_image
)
from mbw_dms.api.validators import validate_not_none
from mbw_dms.api.selling import configs
from mbw_dms.config_translate import i18n

#create Album Image
@frappe.whitelist(methods="POST")
def create_album_image(**kwargs):
    try:
        new_album_image = frappe.new_doc('DMS Album Image')
        new_album_image.id = kwargs.get('id')
        new_album_image.album_id = validate_not_none(kwargs.get('album_id'))
        new_album_image.album_name = validate_not_none(kwargs.get('album_name'))
        new_album_image.checkin_id = validate_not_none(kwargs.get('checkin_id'))
        new_album_image.customer_id = validate_not_none(kwargs.get('customer_id'))
        new_album_image.customer_name = validate_not_none(kwargs.get('customer_name'))
        new_album_image.customer_code = validate_not_none(kwargs.get('customer_code'))
        new_album_image.customer_long = validate_not_none(kwargs.get('customer_long'))
        new_album_image.customer_lat = validate_not_none(kwargs.get('customer_lat'))
        new_album_image.image_url = kwargs.get('image_url')


        return gen_response(201, "Tạo thành công", {"name": new_album_image.name})
       
    except Exception as e:
        return exception_handel(e)