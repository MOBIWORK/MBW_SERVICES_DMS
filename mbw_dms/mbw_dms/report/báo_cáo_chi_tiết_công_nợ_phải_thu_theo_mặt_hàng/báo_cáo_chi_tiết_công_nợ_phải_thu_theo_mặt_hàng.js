frappe.query_reports["Báo Cáo Chi Tiết Công Nợ Phải Thu Theo Mặt Hàng"] = {
    "filters": [
        {
            "fieldname": "date_based_on",
            "label": "Date Based On",
            "fieldtype": "Select",
            "options": "Posting Date\nDue Date",
            "default": "Posting Date",
            "reqd": 1,
            "hidden": 1,
        },
        {
            "fieldname": "company",
            "label": __("Company"),
            "fieldtype": "Link",
            "options": "Company",
            "reqd": 1
        },
        {
            "fieldname": "customer",
            "label": __("Customer"),
            "fieldtype": "Link",
            "options": "Customer",
            "reqd": 1
        },
        {
            "fieldname": "from_date",
            "label": __("From Date"),
            "fieldtype": "Date",
            "reqd": 1
        },
        {
            "fieldname": "to_date",
            "label": __("To Date"),
            "fieldtype": "Date",
            "reqd": 1
        },
        {
            "fieldname": "receivable_account",
            "label": __("Receivable Account"),
            "fieldtype": "Link",
            "options": "Account"
        }
    ],

    refresh: function (report) {

        const initializeFilters = () => {
            frappe.query_report.set_filter_value("date_based_on", "Posting Date");
            ["company", "customer", "from_date", "to_date", "receivable_account"].forEach(
                (field) => frappe.query_report.set_filter_value(field, "")
            );
        };
        initializeFilters();

        const hideEmptyState = () => {
            const emptyStates = document.querySelectorAll('.flex.justify-center.align-center.text-muted');

            emptyStates.forEach(el => {
                // Kiểm tra xem phần tử có chứa đoạn text "Nothing to show" không
                const isNothingToShow = el.textContent.includes("Nothing to show");
                if (isNothingToShow) {
                    el.style.display = "none";

                }
            });
        };
        hideEmptyState();

        // Thêm MutationObserver để theo dõi thay đổi DOM
        const observer = new MutationObserver(() => {
            hideEmptyState();
        });

        // Theo dõi toàn bộ document để kiểm tra thay đổi
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },
    onload: function (report) {
        // Thêm nút "In Báo Cáo"
        const actionButtons = document.querySelector('.page-actions');
        if (actionButtons) {
            const printButton = document.createElement('button');
            printButton.textContent = "In Báo Cáo";
            printButton.className = "btn btn-primary";
            printButton.onclick = function () {
                // Lấy phần HTML từ tiêu đề đến tổng cộng
                const reportContent = document.querySelector('.report-header').outerHTML +
                    document.querySelector('table').outerHTML;
                // Tạo một cửa sổ mới để in
                const printWindow = window.open('', '_blank');
                printWindow.document.open();
                printWindow.document.write(`
            <html>
                <head>
                    <title>Báo Cáo</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                            text-align: center;
                        }
                        .total-row {
                            font-weight: bold;
                            background-color: #f2f2f2;
                        }
                        /* Đảm bảo dòng không bị tách giữa các trang */
                        tr {
                            page-break-inside: avoid;
                        }
                        /* Nếu muốn nhóm cả tiêu đề nhóm và các dòng chi tiết */
                        tbody {
                        }
                    </style>
                </head>
                <body>
                    ${reportContent}
                </body>
            </html>
        `);
                printWindow.document.close();
                printWindow.print();
            };
            actionButtons.appendChild(printButton);
        }
    }
};