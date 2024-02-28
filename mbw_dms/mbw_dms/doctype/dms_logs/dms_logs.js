// Copyright (c) 2024, FastWork and contributors
// For license information, please see license.txt

frappe.ui.form.on("DMS Logs", {
	refresh(frm) {
        if ( frm.doc.status=='Error'){
			frm.add_custom_button('Retry', function() {
                console.log("retry");
				frappe.call({
					method:"mbw_dms.mbw_dms.doctype.dms_logs.dms_logs.resync",
					args:{
						method:frm.doc.method,
						name: frm.doc.name,
						request_data: frm.doc.request_data
					},
					callback: function(r){
						frappe.msgprint(__("Reattempting to sync"))
					}
				})
			}).addClass('btn-primary');
		}
	},
});
