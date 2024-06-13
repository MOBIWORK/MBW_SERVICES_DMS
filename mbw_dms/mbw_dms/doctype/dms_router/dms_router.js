// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

frappe.ui.form.on('DMS Router', {
	// refresh: function(frm) {

	// }
	onload: function(frm) {
		frm.set_query('team_sale',() =>{ 
			return {
				filters: {
					is_group:1
				}
			}
		})
	},
	validate: (frm) => {
		if(frm.is_new()) {
			frappe.call({
				method: 'frappe.client.get_list',
                args: {
                    doctype: 'DMS Router',
                    fields: ['name'],
                    filters: {
                        'channel_code': frm.doc.channel_code,
                        'employee': frm.doc.employee
                    }
                },
                callback: function(r) {
                    if (r.message.length > 0) {
                        frappe.msgprint(__(`A record with the same code ${frm.doc.channel_code} by ${frm.doc.employee} already exists`));
                        frappe.validated = false;
                    }
                }
			})
		}
	}
});
