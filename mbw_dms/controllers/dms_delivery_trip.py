import frappe

def update_delivery_status_so(doc, method):
    if doc.status != "Draft" and doc.status != "Cancelled":
        for d in doc.delivery_stops:
            delivery_note = frappe.get_doc("Delivery Note", d.delivery_note)
            list_so = []
            for item in delivery_note.items:
                if item.against_sales_order not in list_so:
                    list_so.append(item.against_sales_order)
            if delivery_note.custom_status_delivery_trip == "Chưa tạo phiếu giao hàng":
                delivery_note.custom_status_delivery_trip = "Đã tạo phiếu giao hàng"
                delivery_note.save()
                for so in list_so:
                    sales_order = frappe.get_doc("Sales Order", so)
                    if sales_order.custom_trạng_thái_giao_hàng == "Chưa giao hàng":
                        sales_order.custom_trạng_thái_giao_hàng = "Đang giao hàng"
                        sales_order.save()

            if d.visited == 1:
                for so in list_so:
                    sales_order = frappe.get_doc("Sales Order", so)
                    if sales_order.custom_trạng_thái_giao_hàng == "Đang giao hàng":
                        sales_order.custom_trạng_thái_giao_hàng = "Đã giao hàng"
                        sales_order.save()
                if not delivery_note.custom_image or delivery_note.custom_image == "" or delivery_note.custom_image != d.custom_add_image:
                    delivery_note.custom_image = d.custom_add_image
                    delivery_note.save()
            if d.visited == 0:
                for so in list_so:
                    sales_order = frappe.get_doc("Sales Order", so)
                    if sales_order.custom_trạng_thái_giao_hàng == "Đã giao hàng":
                        sales_order.custom_trạng_thái_giao_hàng = "Đang giao hàng"
                        sales_order.save()
                if delivery_note.custom_image != None and delivery_note.custom_image != "":
                    delivery_note.custom_image = None
                    delivery_note.save()
    else:
        for d in doc.delivery_stops:
            delivery_note = frappe.get_doc("Delivery Note", d.delivery_note)
            if delivery_note.custom_status_delivery_trip == "Đã tạo phiếu giao hàng":
                delivery_note.custom_status_delivery_trip = "Chưa tạo phiếu giao hàng"
                delivery_note.save()
            list_so = []
            for item in delivery_note.items:
                if item.against_sales_order not in list_so:
                    list_so.append(item.against_sales_order)
            for so in list_so:
                sales_order = frappe.get_doc("Sales Order", so)
                if sales_order.custom_trạng_thái_giao_hàng == "Đang giao hàng":
                    sales_order.custom_trạng_thái_giao_hàng = "Chưa giao hàng"
                    sales_order.save()