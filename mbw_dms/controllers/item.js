frappe.ui.form.on("Item", {
    refresh: function(frm) {
        frm.fields_dict['uoms'].grid.wrapper.on('change', 'input[data-fieldname="custom_point_reward"]', function() {
            const updated_row = frm.selected_doc;
            if (updated_row.doctype === "UOM Conversion Detail") {
                const base_conversion_factor = updated_row.conversion_factor;
                const new_point_reward = updated_row.custom_point_reward;
                console.log("base ", base_conversion_factor, new_point_reward)
                frm.doc.uoms.forEach(row => {
                    if (row.uom !== updated_row.uom && base_conversion_factor) {
                        row.custom_point_reward = (new_point_reward * row.conversion_factor) / base_conversion_factor;
                    }
                });

                frm.refresh_field('uoms');
            }
        });
    }
})