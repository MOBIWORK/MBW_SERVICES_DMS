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
	}
});
