frappe.ui.form.on('Address', {
	refresh: function(frm) {
		if (frm.doc.address_location.length !== 0) {
			let location = JSON.parse(frm.doc.address_location);
			let lng = location.long
			let lat = location.lat
			try {
				frm.set_value("custom_address_on_map", JSON.stringify([
					{
						type: "Feature",
						properties: {},
						geometry: {
							type: "Point",
							coordinates: [lng, lat],
						},
					},
				]))
			}catch (error) {

			}
		}
	},
    custom_address_on_map:async function(frm){
		let address_on_map =  JSON.parse(frm.doc.custom_address_on_map);
		if (address_on_map.features.length > 0) {
			let feature = address_on_map.features[address_on_map.features.length - 1];
			let lon = feature.geometry.coordinates[0];
			let lat = feature.geometry.coordinates[1];
			frm.set_value("address_location",JSON.stringify({lat,long:lon}))
		}
	},
	address_location:async function(frm){
		let location = JSON.parse(frm.doc.address_location);
		let lng = location.long
		let lat = location.lat
		try {
			frm.set_value("custom_address_on_map", JSON.stringify([
				{
					type: "Feature",
					properties: {},
					geometry: {
						type: "Point",
						coordinates: [lng, lat],
					},
				},
			]))
		} catch (error) {

		}
	}
});
