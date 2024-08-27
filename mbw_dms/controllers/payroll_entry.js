frappe.ui.form.on('Payroll Entry', {
    refresh: function(frm) {
        frm.add_custom_button(__('Đi đến Sổ đăng ký lương'), function() {
            var today = frappe.datetime.now_date();
            var end_date = frappe.datetime.add_months(today, 1);
            var salary_register_link = `/app/query-report/Salary Register?from_date=${today}&to_date=${end_date}&docstatus=Draft`;
            window.location.href = salary_register_link;
        });
    }
});
