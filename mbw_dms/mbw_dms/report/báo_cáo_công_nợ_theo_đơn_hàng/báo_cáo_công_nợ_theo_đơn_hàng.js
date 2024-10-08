let now = new Date();
let checkedCheckboxes = {};
let Total = 0
let arraydDeliveryNote = [];
// Custom remove function to remove elements from the array
Array.prototype.remove = function(value) {
    let index = this.indexOf(value);
    if (index !== -1) {
        this.splice(index, 1);
    }
};
frappe.query_reports["Báo cáo công nợ theo đơn hàng"] = {
    "filters": [
        {
            fieldname: "from_date",
            label: __("Từ ngày"),
            fieldtype: "Date",
            width: "80",
            reqd: 1,
            default: new Date(now.getFullYear(), now.getMonth(), 1),
        },
        {
            fieldname: "to_date",
            label: __("Đến ngày"),
            fieldtype: "Date",
            width: "80",
            reqd: 1,
            default: new Date(now.getFullYear(), now.getMonth() + 1, 0),
        },
        {
            fieldname: "customer",
            label: __("Khách hàng"),
            fieldtype: "Link",
            width: "80",
            options: "Customer"
        },
        {
            fieldname: "deliverynote",
            label: __("Mã đơn DN"),
            fieldtype: "Link",
            width: "80",
            options: "Delivery Note"
        },
        {
            fieldname: "thanhtoan",
            label: __("Chưa Thanh toán"),
            fieldtype: "Check"
        }
    ],

    // This runs when the report page is loaded
    "onload": function(report) {
        // Add a Print button to the report page
        report.page.add_button(__('In dữ liệu'), function() {
            // Use frappe.ui.get_print_settings with a callback for printing
            frappe.ui.get_print_settings(false, (print_settings) => {
                // Call the print function after getting the settings
                print_report(report, print_settings);
            });
        }, 'Print');
    },

    "after_datatable_render": function(report) {
        $('.dt-row-filter').remove();
        // Function to enable checkboxes
        function enableCheckboxes() {
            $(".datatable").find('input[type="checkbox"]').each(function() {
                $(this).val($(this).closest('.dt-cell').attr("data-row-index"));

                $(this).prop('disabled', false);  // Enable checkbox
                $(this).removeClass('disabled-deselected');  // Remove any class indicating disabled state
                
                // Set checkbox state based on previously stored values
                if (checkedCheckboxes[$(this).val()]) {
                    $(this).prop('checked', true);
                }

                $(this).off('click').on('click', function() {
                    // Handle the click event
                    if ($(this).is(':checked')) {
                        checkedCheckboxes[$(this).val()] = true;
                        let ma_dh = $(this).closest('.dt-row').find("a[data-doctype='Delivery Note']").html()
                        arraydDeliveryNote.push($(this).closest('.dt-row').find("a[data-doctype='Delivery Note']").html());
                        Total += report.datamanager.data[$(this).val()].total

                    } else {
                        delete checkedCheckboxes[$(this).val()];
                        arraydDeliveryNote.remove($(this).closest('.dt-row').find("a[data-doctype='Delivery Note']").html());
                        Total -= report.datamanager.data[$(this).val()].total
                    }
                });
            });

        }

        // Enable checkboxes initially after rendering the datatable
        enableCheckboxes();

        // Add a scroll event listener to enable checkboxes while scrolling
        $(".datatable").find('.dt-scrollable').on('scroll', function() {
            enableCheckboxes();
        });
    }
};

// Print report function
function print_report(report, print_settings) {
    let columns = report.get_visible_columns ? report.get_visible_columns() : [];
    let filtered_data = report.data.filter(row => {
        return arraydDeliveryNote.includes(row.name);
    });
    filtered_data.push({
        against_sales_order: null,
        customer_name: "Tổng tiền",
        name: null,
        "posting_date": null,
        "select_item": null,
        "total": Total,
        "trangthaithanhtoan": null
    })
    frappe.render_grid({
        title: "Báo cáo công nợ theo đơn hàng",
        subtitle: "Báo cáo công nợ theo đơn hàng",
        print_settings: print_settings,
        columns: columns,
        data: filtered_data,
        can_use_smaller_font: 1,
    });
}
