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
        report.page.add_button(__('In dữ liệu'), function() {
            // Use frappe.ui.get_print_settings with a callback for printing
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
        }, 'Print');
        if (typeof XLSX === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
                script.onload = () => {
                    console.log('SheetJS loaded successfully');
                };
                script.onerror = () => {
                    frappe.msgprint(__('Failed to load Excel export library. Please try again later.'));
                };
                document.head.appendChild(script);
            }

        // Add "Export Excel" menu item
        report.page.add_menu_item(__('Export Excel'), function() {
            if (typeof XLSX === 'undefined') {
                frappe.msgprint(__('Excel export library is not loaded yet. Please wait and try again.'));
                return;
            }

            const headerElement = document.querySelector('.report-header');
            const tableElement = document.querySelector('table');
            if (!tableElement) {
                frappe.msgprint(__('No data available to export.'));
                return;
            }

            const headerText = headerElement ? headerElement.textContent.trim() : "Báo Cáo Chi Tiết Công Nợ Phải Thu Theo Mặt Hàng";
            const tableHeaders = Array.from(tableElement.querySelectorAll('th')).map(th => th.textContent.trim());
            const tableRows = Array.from(tableElement.querySelectorAll('tbody tr'));

            // Prepare Excel data and track merges
            const excelData = [
                [headerText], // Report title
                [],
                tableHeaders // Headers
            ];
            const merges = [
                { s: { r: 0, c: 0 }, e: { r: 0, c: tableHeaders.length - 1 } } // Merge title row
            ];

            let currentRow = 3; // Start after title, empty row, and headers
            tableRows.forEach(row => {
                const cells = Array.from(row.querySelectorAll('td'));
                const rowData = new Array(tableHeaders.length).fill("");
                let colIndex = 0;

                if (row.classList.contains('group-header')) {
                    rowData[0] = cells[0].textContent.trim(); // due_date
                    rowData[1] = cells[1].textContent.trim(); // voucher_no
                    merges.push({ s: { r: currentRow, c: 1 }, e: { r: currentRow, c: tableHeaders.length - 1 } });
                } else if (row.classList.contains('total-row')) {
                    const firstCellText = cells[0].textContent.trim();
                    if (firstCellText === 'Cộng') {
                        merges.push({ s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 3 } });
                        rowData[0] = "Cộng";
                        cells.slice(1).forEach((cell, i) => {
                            const value = cell.textContent.trim();
                            rowData[4 + i] = parseFloat(value.replace(/,/g, '')) || value;
                        });
                    } else if (firstCellText === 'Số dư:') {
                        merges.push({ s: { r: currentRow, c: 0 }, e: { r: currentRow, c: tableHeaders.length - 2 } });
                        rowData[0] = "Số dư:";
                        const balance = cells[1].textContent.trim();
                        rowData[tableHeaders.length - 1] = parseFloat(balance.replace(/,/g, '')) || balance;
                    } else if (firstCellText === 'Tổng cộng') {
                        merges.push({ s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 3 } });
                        rowData[0] = "Tổng cộng";
                        cells.slice(1).forEach((cell, i) => {
                            const value = cell.textContent.trim();
                            rowData[4 + i] = parseFloat(value.replace(/,/g, '')) || value;
                        });
                    }
                } else {
                    cells.forEach((cell, i) => {
                        const value = cell.textContent.trim();
                        if ([4, 5, 6, 7, 8, 9, 10, 11, 12].includes(i)) { // Numeric columns
                            rowData[i] = parseFloat(value.replace(/,/g, '')) || value;
                        } else {
                            rowData[i] = value;
                        }
                    });
                }

                excelData.push(rowData);
                currentRow++;
            });

            // Create workbook and worksheet
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(excelData);

            // Define styles
            const borderStyle = {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } }
            };

            const lightGrayFill = {
                patternType: "solid",
                fgColor: { rgb: "D3D3D3" }
            };

            const boldFont = {
                bold: true
            };

            const numberFormat = "#,##0";
            const rightAlign = { horizontal: "right" };
            const leftAlign = { horizontal: "left" };
            const centerAlign = { horizontal: "center" };

            // Apply styles to cells
            const range = XLSX.utils.decode_range(ws['!ref']);
            for (let row = range.s.r; row <= range.e.r; row++) {
                for (let col = range.s.c; col <= range.e.c; col++) {
                    const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
                    if (!ws[cellAddress]) {
                        ws[cellAddress] = { t: "s", v: "" };
                    }

                    // Set cell type for numbers
                    if (row > 2 && [4, 5, 6, 7, 8, 9, 10, 11, 12].includes(col) && typeof ws[cellAddress].v === "number") {
                        ws[cellAddress].t = "n"; // Set type to number
                    }

                    // Initialize cell style
                    const cellStyle = {
                        border: borderStyle,
                        alignment: row >= 2 && [4, 5, 6, 7, 8, 9, 10, 11, 12].includes(col) ? rightAlign : leftAlign
                    };

                    // Apply background color and bold for specific rows
                    if (row === 0) { // Title row
                        cellStyle.font = boldFont;
                        cellStyle.alignment = centerAlign;
                    } else if (row === 2) { // Header row
                        cellStyle.fill = lightGrayFill;
                        cellStyle.font = boldFont;
                        cellStyle.alignment = centerAlign;
                    } else if (excelData[row][0] === "Số dư:") { // Party balance row
                        cellStyle.font = boldFont;
                    } else if (excelData[row][0] === "Cộng" || excelData[row][0] === "Tổng cộng") { // Subtotal and grand total rows
                        cellStyle.fill = lightGrayFill;
                        cellStyle.font = boldFont;
                    } else if (row > 2 && tableRows[row - 3].classList.contains('group-header')) { // Group header
                        cellStyle.fill = lightGrayFill;
                        cellStyle.font = boldFont;
                    }

                    // Apply number formatting for numeric columns
                    if (row > 2 && [4, 5, 6, 7, 8, 9, 10, 11, 12].includes(col) && typeof ws[cellAddress].v === "number") {
                        cellStyle.numFmt = numberFormat;
                    }

                    ws[cellAddress].s = cellStyle;

                    // Debug logging
                    if (row === 2 && col === 0) {
                        console.log("Header cell style:", ws[cellAddress].s);
                    }
                }
            }

            // Apply merges
            ws['!merges'] = merges;

            // Adjust column widths
            const colWidths = tableHeaders.map((header, i) => ({
                wch: Math.max(header.length, ...(excelData.slice(2).map(row => String(row[i])?.length || 0))) + 2
            }));
            ws['!cols'] = colWidths;

            // Append worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, "Report");

            // Export the Excel file
            XLSX.writeFile(wb, "Bao_Cao_Chi_Tiet_Cong_No_Phai_Thu_Theo_Mat_Hang.xlsx");
        }, true);
    }
};