frappe.ui.form.on('Vehicle Log', {
    refresh: function(frm) {
        if (frm.doc.last_odometer && frm.doc.odometer) {
            frm.set_value('custom_daily_odometer_value', frm.doc.odometer - frm.doc.last_odometer);
        }
    },
    last_odometer: function(frm) {
        if (frm.doc.odometer) {
            frm.set_value('custom_daily_odometer_value', frm.doc.odometer - frm.doc.last_odometer);
        }
    },
    odometer: function(frm) {
        if (frm.doc.last_odometer) {
            frm.set_value('custom_daily_odometer_value', frm.doc.odometer - frm.doc.last_odometer);
        }
    }
});