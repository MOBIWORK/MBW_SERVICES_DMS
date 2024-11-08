frappe.ui.form.on('Purchase Order', {
    refresh: function(frm) {
        if (frm.doc.name.includes("new-purchase-order") || frm.doc.status === "Draft") {
            frm.doc.items.forEach(item => {
                if (item.last_purchase_rate !== null && item.last_purchase_rate !== '') {
                    setTimeout(() => {
                        item.rate = item.last_purchase_rate;
                        item.amount = item.rate * item.qty;
                    }, 80);
                }
            })
            frm.refresh_field('items')
        }
    },

});

frappe.ui.form.on('Purchase Order Item', {
    item_code: function(frm, cdt, cdn) {
        let item = frappe.get_doc(cdt, cdn);
        frappe.model.with_doc('Item', item.item_code, function() {
            item.last_purchase_rate = frappe.model.get_value('Item', item.item_code, 'last_purchase_rate');

            if (item.last_purchase_rate) {
                setTimeout(() => {
                    frappe.model.set_value(cdt, cdn, 'rate', item.last_purchase_rate);
                }, 150);
                frm.refresh_field('items')
            }
        });
    }
});
