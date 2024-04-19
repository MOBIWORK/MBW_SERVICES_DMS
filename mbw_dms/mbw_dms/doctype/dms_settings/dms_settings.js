// Copyright (c) 2024, MBW and contributors
// For license information, please see license.txt

function setDefaultViewMap(frm) {
  // set view map
  let map = frm.get_field("company_on_map").map;
  let longitude = frm.doc.company_long || 109.358;
  let latitude = frm.doc.company_lat || 15.961;
  map.setView([latitude, longitude], 5);
}

function setFieldValue(frm, latitude = 0, longitude = 0, address) {
  frm.set_value("company_long", longitude);
  frm.set_value("company_lat", latitude);
  frm.set_value("address_company", address);
}
frappe.ui.form.on("DMS Settings", {
  onload(frm) {
    if (frm.doc.ma_du_an) {
      frm.fields_dict.lay_thong_tin.$wrapper.hide();
    }
  },

  async lay_thong_tin(frm) {
    await frm.call("config_web");
    frm.reload_doc();
  },

  refresh: function (frm) {
    setDefaultViewMap(frm);
  },

  company_on_map: async function (frm) {
    let mapdata_point = JSON.parse(frm.doc.company_on_map)?.features;
    if (mapdata_point) {
      let last_point = mapdata_point[mapdata_point.length - 1];
      if (last_point && last_point.geometry.type == "Point") {
        let lat = last_point.geometry.coordinates[1];
        let lon = last_point.geometry.coordinates[0];
        let address = "";
        try {
          let rs = await frappe.call({
            type: "GET",
            method: "mbw_dms.api.helpers.geolocation.get_address_location",
            args: {
              lat: lat,
              lon: lon,
            },
          });
          address = rs.result.results;
        } catch (error) {
          frappe.msgprint({
            title: __("Error"),
            indicator: "red",
            message: __(xhr.responseJSON.message),
          });
        }
        frm.set_value("company_on_map", JSON.stringify([last_point]));
        setFieldValue(frm, lat, lon, address);
      } else {
        setDefaultViewMap(frm);
        setFieldValue(frm);
      }
    }
  },
  address_company: async function (frm) {
    frm.fields_dict.address_company.$input.on("blur", async function () {
      let address_text = frm.doc.address_company;
      try {
        let rs = await frappe.call({
          type: "GET",
          method: "mbw_dms.api.helpers.geolocation.get_coordinates_location",
          args: {
            address: address_text,
          },
        });
        console.log(rs.result.results);
        if (rs.result.results) {
          let {
            geometry: {
              location: { lat, lng },
            },
          } = rs.result.results[0];
          frm.set_value(
            "company_on_map",
            JSON.stringify([
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: [lng, lat],
                },
              },
            ])
          );
        }
      } catch (error) {
        console.log("address error", error);
      }
    });
  },
});
