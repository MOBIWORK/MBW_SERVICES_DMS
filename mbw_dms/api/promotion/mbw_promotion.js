frappe.ui.form.on('Sales Order', {
    onload_post_render: function(frm) {
        frm.set_value('ignore_pricing_rule', 1);
    },
    refresh: function(frm) {
        // Chỉ hiển thị button khi tạo mới Sales Order
        if (frm.doc.docstatus == 0) {
            frm.add_custom_button(__('Get Promotion'), function() {
                onClearPromotion(frm); // Clear free items and set ignore pricing rule
                
            }).addClass('btn-primary');
        }
    }
});
function processAfterApplyPromotion(ptype_value, result, frm)
{
    if(ptype_value == "SP_SL_CKSP")
    {
        for(var i=0; i<result.length; i++)
        {
            let filtered_items = frm.doc.items.find(function(item) {
                return item.item_code === result[i].item_code;
            });
            if (filtered_items) {
                
                // Tính toán lại discount_amount dựa trên discount_amount km
                filtered_items.discount_amount = result[i].discount_amount;
                // Kích hoạt sự kiện onchange cho trường discount_amount
                frm.script_manager.trigger("discount_amount", filtered_items.doctype, filtered_items.name);

                // Refresh bảng items
                frm.refresh_field('items');
            }
        }
        
    }
}

function onClearPromotion(frm) {
    // Tắt khuyến mại của frappe
    frm.set_value("ignore_pricing_rule", 1);

    // Xóa hết các sản phẩm khuyến mại
    frm.doc.items = frm.doc.items.filter(function(item) {
        return item.rate > 0 || !item.is_free_item;
    });

    // Làm mới danh sách items sau khi xóa các sp khuyến mại
    frm.refresh_field("items");
    // Cập nhật lại giá sáu khi chạy khuyến mại
    update_item_prices_by_price_list(frm)
}

function update_item_prices_by_price_list(frm) {
    let total_amount = 0;
    frm.doc.items.forEach(function(item) {
        frappe.call({
            method: "erpnext.stock.get_item_details.get_item_details",
            args: {
                args: {
                    item_code: item.item_code,
                    serial_no: item.serial_no,
                    batch_no: item.batch_no,
                    set_warehouse: frm.doc.set_warehouse,
                    warehouse: item.warehouse,
                    customer: frm.doc.customer || frm.doc.party_name,
                    currency: frm.doc.currency,
                    conversion_rate: frm.doc.conversion_rate,
                    price_list: frm.doc.selling_price_list || frm.doc.buying_price_list,
                    price_list_currency: frm.doc.price_list_currency,
                    plc_conversion_rate: frm.doc.plc_conversion_rate,
                    company: frm.doc.company,
                    order_type: frm.doc.order_type,
                    ignore_pricing_rule: frm.doc.ignore_pricing_rule,
                    doctype: frm.doc.doctype,
                    name: frm.doc.name,
                    project: item.project || frm.doc.project,
                    qty: item.qty || 1,
                    net_rate: item.rate,
                    base_net_rate: item.base_net_rate,
                    stock_qty: item.stock_qty,
                    weight_per_unit: item.weight_per_unit,
                    uom: item.uom,
                    weight_uom: item.weight_uom,
                    stock_uom: item.stock_uom,
                    tax_category: frm.doc.tax_category,
                    item_tax_template: item.item_tax_template,
                    child_doctype: item.doctype,
                    child_docname: item.name,
                }
            },
            callback: function (r) {
                
                if (!r.exc) {
                    item.rate = r.message.price_list_rate;
                    item.amount = item.rate * item.qty;
                    total_amount += item.amount;
                    frm.set_value('total', total_amount);
                    refresh_field("items");
                    frm.refresh_field('total');
                    // Gọi một server-side method để lấy khuyến mãi
                    frappe.call({
                        method: 'mbw_dms.api.promotion.mbw_promotion.get_list_promotion',
                        args: {
                            listItem:frm.doc.items
                        },
                        callback: function(r) {
                            if (r.message) {
                                processAfterApplyPromotion(r.message.ptype_value,r.message.result,frm)
                            }
                        }
                    });
                }
            },
        });
    });
    
}