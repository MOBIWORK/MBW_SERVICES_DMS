// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

frappe.ui.form.on("DMS Album", {
  setup: function (frm) {
    frm.set_query("nhom_ban_hang", function () {
      return {
        filters: { is_group: 1 },
      };
    });
  },
});
