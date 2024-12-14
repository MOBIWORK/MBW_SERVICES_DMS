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
                                           fields=["name", "custom_trạng_thái_giao_hàng", "custom_số_lượng_đã_giao", "total_qty"])
            if delivery_note.custom_status_delivery_trip == "Chưa tạo phiếu giao hàng":
                delivery_note.custom_status_delivery_trip = "Đã tạo phiếu giao hàng"
                delivery_note.save()

                for sales_order in sales_orders:
                    if sales_order.custom_trạng_thái_giao_hàng == "Chưa giao hàng":
                        sales_order.custom_trạng_thái_giao_hàng = "Đang giao hàng"
                        frappe.db.set_value("Sales Order", sales_order.name, "custom_trạng_thái_giao_hàng", "Đang giao hàng")

            if d.visited == 1 and d.custom_updated_on_so == 0:
                for sales_order in sales_orders:
                    if sales_order.custom_trạng_thái_giao_hàng in ["Đang giao hàng", "Đã giao một phần"]:
                        for item in delivery_note.items:
                            if item.against_sales_order == sales_order.name:
                                qty_delivery = sales_order.custom_số_lượng_đã_giao if sales_order.custom_số_lượng_đã_giao else 0
                                qty_delivery += item.qty
                                sales_order.custom_số_lượng_đã_giao = qty_delivery
                                frappe.db.set_value("Sales Order", sales_order.name, "custom_số_lượng_đã_giao", qty_delivery)
                                if qty_delivery > 0 and qty_delivery < sales_order.total_qty:
                                    sales_order.custom_trạng_thái_giao_hàng = "Đã giao một phần"
                                    frappe.db.set_value("Sales Order", sales_order.name, "custom_trạng_thái_giao_hàng",
                                                    "Đã giao một phần")
                                elif qty_delivery > 0 and qty_delivery == sales_order.total_qty:
                                    sales_order.custom_trạng_thái_giao_hàng = "Đã giao đầy đủ"
                                    frappe.db.set_value("Sales Order", sales_order.name, "custom_trạng_thái_giao_hàng",
                                                        "Đã giao đầy đủ")
                d.custom_updated_on_so = 1
                frappe.db.set_value("Delivery Stop", d.name, "custom_updated_on_so", 1)
                if not delivery_note.custom_image or delivery_note.custom_image == "" or delivery_note.custom_image != d.custom_add_image:
                    delivery_note.custom_image = d.custom_add_image
                    delivery_note.save()
            if d.visited == 0 and d.custom_updated_on_so == 1:
                for sales_order in sales_orders:
                    if sales_order.custom_trạng_thái_giao_hàng in ["Đã giao đầy đủ", "Đã giao một phần"]:
                        for item in delivery_note.items:
                            if item.against_sales_order == sales_order.name:
                                qty_delivery = sales_order.custom_số_lượng_đã_giao - item.qty if sales_order.custom_số_lượng_đã_giao - item.qty > 0 else 0
                                sales_order.custom_số_lượng_đã_giao = qty_delivery
                                frappe.db.set_value("Sales Order", sales_order.name, "custom_số_lượng_đã_giao",
                                                    qty_delivery)
                                if qty_delivery > 0 and qty_delivery < sales_order.total_qty:
                                    frappe.db.set_value("Sales Order", sales_order.name, "custom_trạng_thái_giao_hàng",
                                                        "Đã giao một phần")
                                elif qty_delivery == 0:
                                    frappe.db.set_value("Sales Order", sales_order.name, "custom_trạng_thái_giao_hàng",
                                                        "Đang giao hàng")
                d.custom_updated_on_so = 0
                frappe.db.set_value("Delivery Stop", d.name, "custom_updated_on_so", 0)
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
                                           fields=["name", "custom_trạng_thái_giao_hàng", "custom_số_lượng_đã_giao", "total_qty"])
            if d.custom_updated_on_so == 1:
                for sales_order in sales_orders:
                    if sales_order.custom_trạng_thái_giao_hàng != "Chưa giao hàng":
                        for item in delivery_note.items:
                            if item.against_sales_order == sales_order.name:
                                qty_delivery = sales_order.custom_số_lượng_đã_giao - item.qty if sales_order.custom_số_lượng_đã_giao - item.qty > 0 else 0
                                sales_order.custom_số_lượng_đã_giao = qty_delivery
                                frappe.db.set_value("Sales Order", sales_order.name, "custom_số_lượng_đã_giao",
                                                    qty_delivery)
                                if qty_delivery > 0 and qty_delivery < sales_order.total_qty:
                                    frappe.db.set_value("Sales Order", sales_order.name, "custom_trạng_thái_giao_hàng",
                                                        "Đã giao một phần")
                                elif qty_delivery == 0:
                                    frappe.db.set_value("Sales Order", sales_order.name, "custom_trạng_thái_giao_hàng",
                                                        "Đang giao hàng")
                d.custom_updated_on_so = 0
                frappe.db.set_value("Delivery Stop", d.name, "custom_updated_on_so", 0)