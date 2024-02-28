// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

frappe.ui.form.on('DMS Settings', {
	async lay_thong_tin(frm) {
		await frm.call('config_web');
		frm.reload_doc();
	},
});
