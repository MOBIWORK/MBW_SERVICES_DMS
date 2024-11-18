frappe.ui.form.on('Delivery Trip', {
    refresh: function(frm) {
        frm.doc.delivery_stops.forEach(row => {
            if (row.delivery_note) {
                frappe.db.get_doc('Delivery Note', row.delivery_note).then(doc => {
                    if (doc.items) {
                        const item_list = doc.items.map(item =>
                            `${item.item_code} (${item.item_name}): ${item.qty} ${item.uom}`
                        ).join('\n');
                        frappe.model.set_value(row.doctype, row.name, 'custom_items', item_list);
                        console.log(item_list)
                    }
                });
            }
        })
    }
})