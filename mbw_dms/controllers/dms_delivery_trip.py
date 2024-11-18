import frappe

def update_delivery_status_so(doc, method):
    if doc.status != "Draft" and doc.status != "Cancelled":
        for d in doc.delivery_stops:
            delivery_note = frappe.get_doc("Delivery Note", d.delivery_note)
            list_so = []
            for item in delivery_note.items:
                if item.against_sales_order not in list_so:
                    list_so.append(item.against_sales_order)
            sales_orders = frappe.get_list("Sales Order", filters={"name": ["in", list_so]},
                                           fields=["name", "custom_trạng_thái_giao_hàng"])
            if delivery_note.custom_status_delivery_trip == "Chưa tạo phiếu giao hàng":
                delivery_note.custom_status_delivery_trip = "Đã tạo phiếu giao hàng"
                delivery_note.save()

                for sales_order in sales_orders:
                    if sales_order.custom_trạng_thái_giao_hàng == "Chưa giao hàng":
                        sales_order.custom_trạng_thái_giao_hàng = "Đang giao hàng"
                        frappe.db.set_value("Sales Order", sales_order.name, "custom_trạng_thái_giao_hàng", "Đang giao hàng")

            if d.visited == 1:
                for sales_order in sales_orders:
                    if sales_order.custom_trạng_thái_giao_hàng == "Đang giao hàng":
                        frappe.db.set_value("Sales Order", sales_order.name, "custom_trạng_thái_giao_hàng", "Đã giao hàng")
                if not delivery_note.custom_image or delivery_note.custom_image == "" or delivery_note.custom_image != d.custom_add_image:
                    delivery_note.custom_image = d.custom_add_image
                    delivery_note.save()
            if d.visited == 0:
                for sales_order in sales_orders:
                    if sales_order.custom_trạng_thái_giao_hàng == "Đã giao hàng":
                        frappe.db.set_value("Sales Order", sales_order.name, "custom_trạng_thái_giao_hàng", "Đang giao hàng")
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
            sales_orders = frappe.get_list("Sales Order", filters={"name": ["in", list_so]},
                                           fields=["name", "custom_trạng_thái_giao_hàng"])
            for sales_order in sales_orders:
                if sales_order.custom_trạng_thái_giao_hàng == "Đang giao hàng":
                    frappe.db.set_value("Sales Order", sales_order.name, "custom_trạng_thái_giao_hàng", "Chưa giao hàng")