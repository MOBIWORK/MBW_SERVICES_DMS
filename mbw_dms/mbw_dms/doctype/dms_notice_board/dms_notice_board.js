// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

// frappe.ui.form.on("DMS Notice Board", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on("DMS Notice Board", {
    setup: function (frm) {
      frm.set_query("salesteams", function () {
        return {
          filters: { is_group: 1 },
        };
      });
    },
  });
