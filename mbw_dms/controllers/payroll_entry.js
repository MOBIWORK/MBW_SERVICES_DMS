frappe.ui.form.on('Payroll Entry', {
    refresh: function(frm) {
        frm.add_custom_button(__('Đi đến bảng lương'), function() {
            var from_date = frm.doc.start_date;
            var to_date = frm.doc.end_date;
            var salary_register_link = `/app/query-report/Bảng%20lương?from_date=${from_date}&to_date=${to_date}&docstatus=Draft`;
            window.location.href = salary_register_link;
        });
    }
});
