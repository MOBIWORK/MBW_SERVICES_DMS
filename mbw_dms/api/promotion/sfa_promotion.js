frappe.ui.form.on('Sales Order', {
    before_save: function(frm) {
        frm.set_value('ignore_pricing_rule', 1);
    },
   refresh: function(frm) {
        list_promotions = []
        if (frm.doc.docstatus == 0) {
            frm.add_custom_button(__('Get Promotion'), function() {

                // Gọi API để lấy danh sách khuyến mại và đặt dữ liệu cho bảng
                frappe.call({
                    method: 'mbw_dms.api.promotion.sfa_promotion.get_available_promotions',
                    args: {
                        listItem: frm.doc.items,
                        totalAmount: frm.doc.total,
                        customer: frm.doc.customer
                    },
                    callback: function(r) {
                        if (r.message && r.message.length > 0) {
                            // Lưu dữ liệu vào frm để sử dụng lại nếu cần
                            const data_promotion = r.message.map(promotion => ({
                                __checked: list_promotions && list_promotions.includes(promotion.name_promotion),
                                promotion_name: promotion.name_promotion,
                            }));
                            // Tạo dialog với bảng có checkbox
                            const promotion_dialog = new frappe.ui.Dialog({
                                title: __('List Promotions'),
                                fields: [
                                    {
                                        fieldname: 'promotions_table',
                                        fieldtype: 'Table',
                                        label: '',
                                        cannot_add_rows: true,
                                        cannot_delete_rows: true,
                                        fields: [
                                            {
                                                fieldtype: 'Link',
                                                fieldname: 'promotion_name',
                                                label: 'Promotion name',
                                                read_only: 1,
                                                in_list_view: true,
                                                options: 'SFA Promotion',
                                            }
                                        ]
                                    }
                                ],
                                primary_action_label: __('Apply'),
                                primary_action(values) {
                                    list_promotions = values.promotions_table
                                        .filter(promo => promo.__checked)
                                        .map(promo => promo.promotion_name);
                                    onClearPromotion(frm);
                                    promotion_dialog.hide();
                                }
                            });    
                            // Cập nhật bảng với dữ liệu mới
                            promotion_dialog.fields_dict.promotions_table.df.data = data_promotion;
                            promotion_dialog.fields_dict.promotions_table.refresh();
                            promotion_dialog.$wrapper.find('.grid-remove-rows, .grid-duplicate-rows, .btn-open-row').remove();
                            promotion_dialog.$wrapper.find('.data-row .col:empty').remove();
                           
                            // Hiển thị dialog
                            promotion_dialog.show();
                        } else {
                            frappe.msgprint(__('Không có khuyến mại nào khả dụng.'));
                        }
                    }
                });

            }).addClass('btn-primary');
        }
    }
});

// Tính toán khuyến mãi
function processAfterApplyPromotion(ptype_value, result, frm)
{
    // KM tặng sản phẩm
    if (ptype_value == "TIEN_SP" || ptype_value == "SP_SL_SP" || ptype_value == "SP_ST_SP") {
        add_items_to_form(result, frm);
    }

    else if (ptype_value == "SP_SL_TIEN" || ptype_value == "SP_ST_TIEN"){
        apply_discount_amount_to_items(result, frm);
    }
    
    else if (ptype_value == "SP_SL_CKSP" || ptype_value == "SP_ST_CKSP"){
        apply_discount_percent_to_items(result, frm);
    }

    // Tổng tiền hàng - Tiền 
    else if (ptype_value == "TIEN_TIEN") {
        frm.set_value("discount_amount", frm.doc.discount_amount + result);
    }

    else if (ptype_value == "TIEN_CKDH") {

        frm.set_value("discount_amount", frm.doc.discount_amount + total_amount * result /100);
       
    }
}


// Thêm sản phẩm khuyến mãi
function add_items_to_form(items, frm) {
  items.forEach(function(item) {
      let new_row = frm.add_child("items");
      new_row.item_code = item.item_code;
      new_row.item_name = item.item_name;
      new_row.delivery_date = frm.doc.delivery_date;
      new_row.qty = item.qty;
      new_row.uom = item.uom;
      new_row.rate = item.rate || 0;
      new_row.amount = item.amount || 0;
      new_row.is_free_item = item.is_free_item || 0;
  });
  frm.refresh_field("items");
}

// Thêm thống kê danh sách các CTKM đã đạt được
function add_promotionhasApply(allPromotion, frm)
{
    for(var i=0; i<allPromotion.length; i++)
    {
        if (!Array.isArray(allPromotion[i].product))
        {
            let new_row = frm.add_child("custom_promotions_apply");
            new_row.promotion_id = allPromotion[i].id;
            new_row.promotion_name = allPromotion[i].ten_khuyen_mai;
            new_row.promotion_code = allPromotion[i].code;
            new_row.promotional_amount = allPromotion[i].product.so_luong;
        }
        for(var j=0; j<allPromotion[i].product.length; j++)
            {
                let new_row = frm.add_child("custom_promotions_apply");
                new_row.promotion_id = allPromotion[i].id;
                new_row.promotion_name = allPromotion[i].ten_khuyen_mai;
                new_row.promotion_code = allPromotion[i].code;
                new_row.promotion_item_code = allPromotion[i].product[j].ma_san_pham;
                new_row.promotional_item_name = allPromotion[i].product[j].ten_san_pham;
                new_row.promotional_quantity = allPromotion[i].product[j].so_luong;
                new_row.promotional_amount = allPromotion[i].product[j].so_tien;
            }
    }
    
    frm.refresh_field("custom_promotions_apply");
}


function apply_discount_amount_to_items(result, frm) {
  result.forEach((promo_item) => {
      let filtered_item = frm.doc.items.find((item) => item.item_code === promo_item.item_code);
      
      if (filtered_item && promo_item.discount_amount > 0) {
          // Cập nhật discount_amount từ promo_item
          filtered_item.discount_amount = promo_item.discount_amount;

          // Kích hoạt sự kiện onchange cho trường discount_amount
          frm.script_manager.trigger("discount_amount", filtered_item.doctype, filtered_item.name);

          frm.refresh_field("items");
      }
  });

}
function apply_discount_percent_to_items(result, frm) {
    result.forEach((promo_item) => {
        let filtered_item = frm.doc.items.find((item) => item.item_code === promo_item.item_code);
        
        if (filtered_item && promo_item.discount_percentage > 0) {
            // Cập nhật discount_amount từ promo_item
            filtered_item.discount_percentage = promo_item.discount_percentage;

            // Kích hoạt sự kiện onchange cho trường discount_amount
            frm.script_manager.trigger("discount_percentage", filtered_item.doctype, filtered_item.name);

            frm.refresh_field("items");
        }
    });
  
}

function onClearPromotion(frm) {
  // Tắt khuyến mại của frappe
  frm.set_value("ignore_pricing_rule", 1);

  // Xóa hết các sản phẩm khuyến mại
  frm.doc.items = frm.doc.items.filter(function(item) {
      return item.rate > 0 || !item.is_free_item;
  });

  //Xóa các chương trình khuyến mại trước đó
  frm.doc.custom_promotions_apply = []

  //Xóa chương trình liên quan đến tổng tiền
  frm.set_value("discount_amount", 0);

  // Làm mới danh sách items sau khi xóa các sp khuyến mại
  frm.refresh_field("items");
  // Cập nhật lại giá sáu khi chạy khuyến mại
  update_item_prices_by_price_list(frm)
}

let total_amount = 0;
// Lấy khuyến mãi sản phẩm
function update_item_prices_by_price_list(frm) {
    total_amount = 0;
    let count_items = frm.doc.items.length
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
                    item.discount_amount = 0;
                    item.discount_percentage = r.message.discount_percentage;
                    total_amount += item.amount;
                    frm.set_value("total", total_amount);
                    refresh_field("items");
                    frm.refresh_field("total");
                    count_items = count_items - 1
                    if (count_items === 0) {
                        // Gọi một server-side method để lấy khuyến mãi
                        frappe.call({
                            method: "mbw_dms.api.promotion.sfa_promotion.get_list_promotion",
                            args: {
                                listItem: frm.doc.items,
                                listPromotions: list_promotions,
                                totalAmount: frm.doc.total
                            },
                            callback: function (r) {
                                if (Array.isArray(r.message)) {
                                    r.message.forEach(function (promotion) {
                                        processAfterApplyPromotion(promotion.ptype_value, promotion.result, frm);
                                    });
                                    if (r.message.length > 0)
                                    add_promotionhasApply(r.message[0].allPromotion, frm)
                                } else {
                                    // Trường hợp không phải danh sách
                                    processAfterApplyPromotion(r.message.ptype_value, r.message.result, frm);
                                }
                            }
                        });
                    }
                }
            },
        });
    });
}