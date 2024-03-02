frappe.pages["report-kpi-dms"].on_page_load = function (wrapper) {
  let report_kpi_dms = new Report_KPI_DMS(wrapper);
  $(wrapper).bind("show", () => {
    report_kpi_dms.show();
  });
};

class Report_KPI_DMS {
  constructor(wrapper) {
    this.page = frappe.ui.make_app_page({
      parent: wrapper,
      title: "Báo cáo KPI",
      single_column: true,
    });
    this.page.main.addClass("frappe-card");
    this.page.body.append('<div class="table-area"></div>');
    this.$content = $(this.page.body).find(".table-area");
	this.filters();
  }

  show() {
	this.refreshSync();
  }

refreshSync() {
	let month = this.fieldMonth.get_value();
	let year = this.fieldYear.get_value();
	let company = this.fieldCompany.get_value();
	// let view_mode = this.viewMode.get_value();
	let employee = this.fieldIdNvHr.get_value()
	let params = {month,year,company}
	this.$content.html(
		//   frappe.render_template("report_kpi_dms", {
		// 	list_sync: list_data,
		//   })
		  frappe.render_template("report_kpi_dms")
		);	
	// if(employee) {
	// 	params = {...params,employee}
	// }
	// frappe.call({
	// 	method: "frappe.desk.query_report.run",
	// 	args: {
	// 		report_name: "Salary Register",
	// 		filters: params,
	// 		ignore_prepared_report: false,
	// 		are_default_filters: false,
	// 		_: 1702882757634,
	// 	},
	// 	arguments:{},
	// 	callback: (res) => {
	// 	  if (!res.exc) {
	// 		let list_data = res?.message?.result ? res?.message?.result.slice(0, -1)  : []
	// 		// let list_total = res?.message?.result ? res?.message?.result.slice(-1)  : []
	// 		let isTotal = res?.message?.add_total_row
	// 		let list_total_new = {}
	// 		let field_not_total = ['rate_sell_out','rate_sell_in','positions','employee_name',"area_manager"]
	// 		let field_not_round = ['positions','employee_name',"area_manager","employee"]
	// 		if(isTotal) {
	// 			if (list_data.length > 0) {
	// 				for(let key in  list_data[0]) {
	// 					let value = 0
	// 					if(field_not_total.includes(key))
	// 						value = ''	
	// 					list_total_new[key] = value
	// 				}
	// 				list_total_new['employee_name'] = __('Total')
	// 				list_total_new['employee'] = '#'
	// 			}

	// 			list_data.forEach(dataEmployee=> {
	// 				for(let key_kpi in dataEmployee) {
	// 					if(!field_not_total.includes(key_kpi)){
	// 						list_total_new[key_kpi] += Number.parseFloat(dataEmployee[key_kpi])
	// 					}
	// 				}
	// 			})
	// 		}

	// 		list_data = list_data.map(employee_kpi => {
	// 			for(let key in employee_kpi) {
	// 				if(!field_not_round.includes(key)) {
	// 					employee_kpi[key] = typeof employee_kpi[key] == 'number'? employee_kpi[key].toFixed(2) : Number.parseFloat(employee_kpi[key]).toFixed(2)
	// 				}
	// 			}
	// 			console.log("employee_kpi",employee_kpi);
	// 			return employee_kpi
	// 		})
	// 		list_data = [...list_data,list_total_new]

	// 		this.$content.html(
	// 		//   frappe.render_template("report_kpi_dms", {
	// 		// 	list_sync: list_data,
	// 		//   })
	// 		  frappe.render_template("report_kpi_dms")
	// 		);
	// 	  } else {
	// 		frappe.msgprint({
	// 		  title: __("Error"),
	// 		  indicator: "red",
	// 		  message: __("Có lỗi xảy ra."),
	// 		});
	// 	  }
	// 	},
	//   });
}

filters() {
	this.btnSync = this.page.set_primary_action("Tìm kiếm", () => {
		let month = this.fieldMonth.get_value();
		let year = this.fieldYear.get_value();

		if (!month || !year) {
		frappe.msgprint({
			title: __("Cảnh báo"),
			indicator: "yellow",
			message: __("Vui lòng chọn đầy đủ thông tin."),
		});
		return false;
		}

		
		this.refreshSync();
	});

	this.btnFresh = this.page.set_secondary_action("Làm mới", () => {
		this.refreshFilters();
	});

	this.fieldMonth = this.page.add_field({
		label: "Tháng",
		fieldtype: "Select",
		fieldname: "month",
		options: [
			{ "value": 1, "label": "Tháng 1" },
			{ "value": 2, "label": "Tháng 2" },
			{ "value": 3, "label": "Tháng 3" },
			{ "value": 4, "label": "Tháng 4" },
			{ "value": 5, "label": "Tháng 5" },
			{ "value": 6, "label": "Tháng 6" },
			{ "value": 7, "label": "Tháng 7" },
			{ "value": 8, "label": "Tháng 8" },
			{ "value": 9, "label": "Tháng 9" },
			{ "value": 10, "label": "Tháng 10" },
			{ "value": 11, "label": "Tháng 11" },
			{ "value": 12, "label": "Tháng 12" },
		],
		// "default": frappe.datetime.str_to_obj(frappe.datetime.get_today()).getMonth() + 1,
		change: () => {
			this.refreshSync()
		},
	});

	this.fieldYear = this.page.add_field({
		label: "Năm",
		fieldtype: "Int",
		fieldname: "year",
		change: () => {
		},
	});	

	this.fieldCompany = this.page.add_field({
		label: "Company",
		fieldtype: "Data",
		fieldname: "company",
		"default": frappe.defaults.get_user_default("Company"),
		change: () => {
		},
	});	
	this.fieldIdNvHr = this.page.add_field({
		label: "Nhân viên",
		fieldtype: "Link",
		fieldname: "ds_nv",
		options: "Employee",
		change: async () => {
			this.refreshSync()
		},
	  });

	// this.viewMode = this.page.add_field({
	// 	"fieldname":"view_mode",
	// 	"label": __("View mode"),
	// 	"fieldtype": "Select",
	// 	"options": [
	// 		{
	// 			value: "em",
	// 			label: __("Employee Sale")
	// 		},
	// 		{
	// 			value: "ss",
	// 			label: __("Sales supervisor")
	// 		},
	// 		{
	// 			value: "asm",
	// 			label: __("Area Sales Manager")
	// 		}
	// 	],
	// 	"default": "em",
	// 	"reqd": 1,
	// 	change:() => {
	// 		this.refreshSync()
	// 	}
	// })

	let _this = this

}

refreshFilters() {
	this.fieldIdNvHr.set_value("");
	// this.viewMode.set_value("em");
  }

getDefaultValue() {
	
}

}