// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

async function setAddressTitle(frm) {
	let city = frm.doc.city
	let county = frm.doc.county
	let ward = frm.doc.state
	let address_line1 = frm.doc.address_line1
	let address_title = new Array(5)
	let city_name = ""
	if(city) {
		let rs = await frappe.call({
			method: "mbw_dms.api.location.get_name_city",
			args: {
				name: city
			}
		})

		city_name = rs.result
		address_title[3] = rs.result
	}

	let county_name = ""
	if(county) {
		let rs_county = await frappe.call({
			method: "mbw_dms.api.location.get_name_district",
			args: {
				name: county
			}
		})
		county_name = rs_county.result
		address_title[2] = rs_county.result

	}

	let ward_name = ""
	if(ward) {
		let rs_ward = await frappe.call({
			method: "mbw_dms.api.location.get_name_ward",
			args: {
				name: ward
			}
		})
		address_title[1] = rs_ward.result
	}

	if(address_line1) {
		address_title[0] = address_line1

	}
	address_title[4] = frm.doc.country
	frm.set_value("address_title",address_title.toString())
}

async function setLocation(frm) {
	try {
		let rs = await frappe.call({
			method: "mbw_dms.api.helpers.geolocation.get_coordinates_location",
			args: {
				address: frm.doc.address_title
			}
		})
		const {lat,lng} = rs.result.results[0].geometry.location
		frm.set_value("address_location",JSON.stringify({lat,long:lng}))
		frm.set_value("custom_address_on_map",JSON.stringify([
			{
			  type: "Feature",
			  properties: {},
			  geometry: {
				type: "Point",
				coordinates: [lng,lat],
			  },
			},
		  ]) )
	} catch (error) {
		
	}
}

frappe.ui.form.on('Address', {
	refresh: function(frm) {
		frm.set_query('county', function() {
            return {
                filters: {
                    // Điều kiện bộ lọc tại đây, ví dụ: chỉ hiển thị khách hàng có địa chỉ ở thành phố Hanoi
                    "ma_tinh_thanh": frm.doc.city
                }
            };
        });
		frm.set_query('state', function() {
            return {
                filters: {
                    // Điều kiện bộ lọc tại đây, ví dụ: chỉ hiển thị khách hàng có địa chỉ ở thành phố Hanoi
                    "ma_quan_huyen": frm.doc.county
                }
            };
        });
	},
	city:async function(frm){
		await setAddressTitle(frm)
	},
	county: async function(frm){
		await setAddressTitle(frm)

	},
	state: async function(frm){
		await setAddressTitle(frm)

	},
	address_line1: async function(frm){
		await setAddressTitle(frm)

	},
	address_title: async function(frm) {
		await setLocation(frm)
	}
});
