frappe.ui.form.on('Purchase Order', {

});

frappe.ui.form.on('Purchase Order Item', {
    item_code: async function(frm, cdt, cdn) {
        let item = frappe.get_doc(cdt, cdn);
        frappe.model.with_doc('Item', item.item_code, function() {
            item.last_purchase_rate = frappe.model.get_value('Item', item.item_code, 'last_purchase_rate');

            if (item.last_purchase_rate !== null && item.last_purchase_rate !== '' && item.last_purchase_rate > 0) {
                frappe.model.set_value(cdt, cdn, 'rate', item.last_purchase_rate);
                refresh_field("rate", cdn, "items");
            }
        });
    }

});
