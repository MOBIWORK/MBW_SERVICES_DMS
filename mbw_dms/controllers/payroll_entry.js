frappe.ui.form.on('Payroll Entry', {
    refresh: function(frm) {
        if (frm.doc.start_date && frm.doc.end_date) {
            frm.add_custom_button(__('Đi đến bảng lương'), function() {
                var from_date = frm.doc.start_date;
                var to_date = frm.doc.end_date;
                var salary_register_link = `/app/query-report/Salary%20Register?from_date=${from_date}&to_date=${to_date}&docstatus=Draft`;
                window.location.href = salary_register_link;
            });
        }
    }
});
