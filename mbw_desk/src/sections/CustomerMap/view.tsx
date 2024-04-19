import { useEffect, useRef, useState } from "react";
import { HeaderPage } from "../../components";
import maplibregl from "maplibre-gl";
import { AxiosService } from "../../services/server";
import "./map_customer.css";
import { Checkbox } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

declare var ekmapplf: any;

interface TypeCustomer {
  name: string;
  customer_name: string;
  customer_code: string;
  customer_type: string;
  customer_group: string;
  territory: string;
  customer_primary_contact: string | null;
  customer_primary_address: string | null;
  customer_location_primary: string;
}

function CustomerMapView() {
  const [apiKey, setApiKey] = useState("");
  const [mapConfig, setMapConfig] = useState([]);
  const [lstCustomer, setLstCustomer] = useState<TypeCustomer[]>([]);
  const map = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLayers, setIsOpenLayers] = useState(
    Array(mapConfig.length).fill(false)
  );
  const [isOpenChildLayers, setIsOpenChildLayers] = useState(mapConfig.map(item => Array(item.children.length).fill(false)));

  const [isOpenCheckBox, setIsOpenCheckBox] = useState(true);
  const [defaultCheckboxStates, setDefaultCheckboxStates] = useState([]);

  const toggleLegend = () => {
    setIsOpen(!isOpen);
  };
  const toggleLegendlayers = (index: any) => {
    const newIsOpenLayers = [...isOpenLayers];
    newIsOpenLayers[index] = !newIsOpenLayers[index];
    setIsOpenLayers(newIsOpenLayers);
  };
  const toggleChildLayers = (childIndex:any) => {
    const updatedOpenChildLayers = [...isOpenChildLayers];
    updatedOpenChildLayers[childIndex] = !updatedOpenChildLayers[childIndex];
    setIsOpenChildLayers(updatedOpenChildLayers);
  };
  
  const toggleLegendCheckbox = () => {
    setIsOpenCheckBox(!isOpenCheckBox);
    toggleCustomerLayersVisibility();
  };

  const toggleCustomerLayersVisibility = () => {
    const visibility = isOpenCheckBox ? "none" : "visible";
    map.current.getStyle().layers.forEach((layer) => {
      if (layer.id.includes("customer")) {
        map.current.setLayoutProperty(layer.id, "visibility", visibility);
      }
    });
  };

  useEffect(() => {
    getConfigApi();
  }, []);
  useEffect(() => {
    if (apiKey != null && apiKey != "") {
      renderMap();
    }
  }, [apiKey]);

  useEffect(() => {
    renderClusterMap();
  }, [lstCustomer]);
  useEffect(() => {
    // addLayerIndustry();
  }, [mapConfig]);

  const getConfigApi = async () => {
    let res = await AxiosService.get(
      "/api/method/mbw_dms.api.vgm.map_customer.get_config_api"
    );
    setApiKey(res.result);
  };
  const getConfigMap = async () => {
    let res = await AxiosService.get(
      "/api/method/mbw_dms.api.vgm.map_customer.get_config_map?type_industry=fertilizer_store"
    );
    //let configMap = [];
    let configMapTem = [
      {
        'id': "fertilizer_store",
        'group': true,
        'label': "Cửa hàng phân bón",
        'visible': true,
        'children': [
          {
            "id": "fertilizer_store_symbol",
            "label": "Cửa hàng phân bón",
            "sources": {
              "vector_fertilizer_store": {
                "maxzoom": 14,
                "type": "vector",
                "tiles": [
                  "https://api.ekgis.vn/datasetquery/fertilizer_store/vector/tile/{z}/{x}/{y}.pdf?api_key=MVmxkcu8F2QYTuL3hWiNfzsLhUsdGBsFmqaDTnuX"
                ]
              }
            },
            "layers": [
              {
                "id": "vector_fertilizer_store",
                "type": "circle",
                "source": "vector_fertilizer_store",
                "source-layer": "hits",
                "minzoom": 4,
                "paint": {
                  "circle-color": "blue",
                  "circle-radius": 4
                }
              },
              {
                "id": "vector_fertilizer_store_label",
                "type": "symbol",
                "source": "vector_fertilizer_store",
                "source-layer": "hits",
                "minzoom": 12,
                "layout": {
                  "text-anchor": "top",
                  "text-field": "{name}",
                  "text-font": [
                    "Roboto Medium"
                  ],
                  "text-max-width": 9,
                  "text-padding": 2,
                  "text-size": {
                    "stops": [
                      [
                        17,
                        13
                      ],
                      [
                        20,
                        14
                      ]
                    ]
                  },
                  "visibility": "visible",
                  "text-offset": [
                    0,
                    1
                  ]
                },
                "paint": {
                  "text-color": "blue",
                  "text-halo-blur": 0.5,
                  "text-halo-color": "#ffffff",
                  "text-halo-width": 1
                }
              }
            ],
            "visible": false,
            "type": "symbol",
            "legend": null
          }, {
            "id": "fertilizer_store_heatmap",
            'label': "Cửa hàng tap hoa",
            "sources": {
              "vector_fertilizer_store": {
                "maxzoom": 14,
                "type": "vector",
                "tiles": [
                  "https://api.ekgis.vn/datasetquery/fertilizer_store/vector/tile/{z}/{x}/{y}.pdf?api_key=MVmxkcu8F2QYTuL3hWiNfzsLhUsdGBsFmqaDTnuX"
                ]
              },
              "fertilizer_store_heatmap": {
                "maxzoom": 14,
                "type": "vector",
                "tiles": [
                  "https://api.ekgis.vn/datasetquery/fertilizer_store/heatmap/tile/{z}/{x}/{y}.pdf?api_key=MVmxkcu8F2QYTuL3hWiNfzsLhUsdGBsFmqaDTnuX"
                ]
              }
            },
            "layers": [
              {
                "id": "heatmap_fertilizer_store_heatmap",
                "type": "heatmap",
                "source": "fertilizer_store_heatmap",
                "source-layer": "aggs",
                "minzoom": 4,
                "maxzoom": 14,
                "paint": {
                  "heatmap-weight": [
                    "get",
                    "_count"
                  ],
                  "heatmap-intensity": [
                    "interpolate",
                    [
                      "linear"
                    ],
                    [
                      "zoom"
                    ],
                    0,
                    1,
                    9,
                    3
                  ],
                  "heatmap-radius": [
                    "interpolate",
                    [
                      "linear"
                    ],
                    [
                      "zoom"
                    ],
                    4,
                    3,
                    9,
                    4
                  ],
                  "heatmap-color": [
                    "interpolate",
                    [
                      "linear"
                    ],
                    [
                      "heatmap-density"
                    ],
                    0,
                    "rgba(0, 0, 255, 0)",
                    0.1,
                    "rgb(65, 105, 225)",
                    0.28,
                    "rgb(0, 256, 256)",
                    0.45999999999999999,
                    "rgb(0, 256, 0)",
                    0.64,
                    "rgb(256, 256, 0)",
                    0.82,
                    "rgb(256, 0, 0)"
                  ],
                  "heatmap-opacity": 0.7
                }
              }, {
                "id": "vector_fertilizer_store",
                "type": "circle",
                "source": "vector_fertilizer_store",
                "source-layer": "hits",
                "minzoom": 14,
                "paint": {
                  "circle-color": "blue",
                  "circle-radius": 4
                }
              },
              {
                "id": "vector_fertilizer_store_label",
                "type": "symbol",
                "source": "vector_fertilizer_store",
                "source-layer": "hits",
                "minzoom": 14,
                "layout": {
                  "text-anchor": "top",
                  "text-field": "{name}",
                  "text-font": [
                    "Roboto Medium"
                  ],
                  "text-max-width": 9,
                  "text-padding": 2,
                  "text-size": {
                    "stops": [
                      [
                        17,
                        13
                      ],
                      [
                        20,
                        14
                      ]
                    ]
                  },
                  "visibility": "visible",
                  "text-offset": [
                    0,
                    1
                  ]
                },
                "paint": {
                  "text-color": "blue",
                  "text-halo-blur": 0.5,
                  "text-halo-color": "#ffffff",
                  "text-halo-width": 1
                }
              }
            ],
            "visible": false,
            "type": "heatmap",
            "legend": null
          }
        ]
      }, {
        'id': "demographic",
        'group': true,
        'visible': false,
        'label': "Quy hoạch đất đai",
        'children': [
          {
            'id': "landuse_raster",
            'label': "Quy hoạch sử dụng đất",
            'sources': {
              "landuse_raster": {
                "type": "raster",
                "tileSize": 256,
                "maxzoom": 16,
                "tiles": [
                  "https://api.ekgis.vn/v2/maps/raster/landuse/{z}/{x}/{y}.png?api_key=MVmxkcu8F2QYTuL3hWiNfzsLhUsdGBsFmqaDTnuX"
                ]
              }
            },
            'layers': [
              {
                "id": "landuse_raster",
                "type": "raster",
                "source": "landuse_raster",
                "maxzoom": 22,
                "paint": {
                  "raster-opacity": 0.5
                }
              }
            ],
            "visible": false,
            "legend": "https://bandobatdongsan.ekgis.vn/assets/image/QHSDD_legend.png"
          },
          {
            'id': "zoning_raster",
            'label': "Bản đồ Quy hoạch xây dựng cấp quy hoạch phân khu",
            'sources': {
              "zoning_raster": {
                "type": "raster",
                "tileSize": 256,
                "maxzoom": 16,
                "tiles": [
                  "https://api.ekgis.vn/v2/maps/raster/zoning/{z}/{x}/{y}.png?api_key=MVmxkcu8F2QYTuL3hWiNfzsLhUsdGBsFmqaDTnuX"
                ]
              }
            },
            'layers': [
              {
                "id": "zoning_raster",
                "type": "raster",
                "source": "zoning_raster",
                "maxzoom": 22,
                "paint": {
                  "raster-opacity": 0.5
                }
              }
            ],
            "visible": false,
            "legend": "https://bandobatdongsan.ekgis.vn/assets/image/QHPK_legend.png"
          }
        ]
      }
    ]
    // configMapTem.unshift({
    //   'id': "customer",
    //   'group': false,
    //   'label': "Vị trí khách hàng",
    //   'visible': true,
    //   'children': [],
    //   // 'legend': "/public/check-icon.png"
    // });
    setMapConfig(configMapTem);
    // setMapConfig(res.result);
  };
  const getLstCustomer = async () => {
    let res = await AxiosService.get(
      "/api/method/mbw_dms.api.selling.customer.get_customer_has_location"
    );
    if (res.message == "Thành công") {
      setLstCustomer(res.result);
    }
    // let objRes = JSON.parse('{"message":"Thành công","result":[{"name":"A Lâm","customer_name":"A Lâm","customer_code":"BH0123111115","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":"A Lâm","customer_primary_address":"395 Xuân Đỉnh, phường Xuân Đỉnh, Từ Liêm, Hà Nội, Việt Nam-Billing","customer_location_primary":"{\\"lat\\":20.7894317,\\"long\\":105.70448}"},{"name":"A Phương","customer_name":"A Phương","customer_code":"BH0120235252","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":"A Phương-A Phương","customer_primary_address":"538 Xuân Đỉnh, phường Xuân Đỉnh, Tây Hồ, Hà Nội, Việt Nam-Billing","customer_location_primary":"{\\"lat\\":21.0763504,\\"long\\":105.7869008}"},{"name":"A thuật","customer_name":"A thuật","customer_code":"HN11402","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":null,"customer_primary_address":"Đình Vĩnh Xương Trung, Mỹ Thành, Mỹ Đức, Hà Nội-Billing","customer_location_primary":"{\\"lat\\":20.6903959,\\"long\\":105.7689993}"},{"name":"A Toản","customer_name":"A Toản","customer_code":"BH0050608072022","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":"A Toản","customer_primary_address":"408 Trần Cung, Cổ Nhuế 1, Cầu Giấy, Hà Nội, Việt Nam-Billing","customer_location_primary":"{\\"lat\\":21.0555955,\\"long\\":105.7855697}"},{"name":"Anh  Hạnh","customer_name":"Anh  Hạnh","customer_code":"BH0057110022023","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":"Anh  Hạnh","customer_primary_address":"440 Cổ Nhuế, Cổ Nhuế 2, Từ Liêm, Hà Nội, Vietnam-Billing","customer_location_primary":"{\\"lat\\":21.069679,\\"long\\":105.7781418}"},{"name":"Xuyến  ngũ","customer_name":"Xuyến  ngũ","customer_code":"HN9251","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":null,"customer_primary_address":"Huyện Ứng Hòa, Hà Nội, VNM-Billing-2","customer_location_primary":"{\\"lat\\":20.7192067,\\"long\\":105.8028217}"},{"name":"Yến  Hiệp","customer_name":"Yến  Hiệp","customer_code":"HN8847","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":null,"customer_primary_address":"Tảo Khê  tảo  Dương  văn  ứng  hòa hà Nội-Billing","customer_location_primary":"{\\"lat\\":20.7082736,\\"long\\":105.7821972}"}]}');
    // console.log(objRes);
    // setLstCustomer(objRes.result);
  };
  const renderMap = () => {
    map.current = new maplibregl.Map({
      container: "map",
      center: [108.485, 16.449],
      zoom: 5.43,
    });
    let mapOSMBright = new ekmapplf.VectorBaseMap("OSM:Bright", apiKey).addTo(
      map.current
    );
    var basemap = new ekmapplf.control.BaseMap({
      id: "basemap_control",
      baseLayers: [
        {
          id: "OSM:Bright",
          title: "Bản đồ nền Sáng",
          thumbnail: "https://docs.ekgis.vn/assets/map-sang.png",
          width: "50px",
          height: "50px",
        },
        {
          id: "OSM:Standard",
          title: "Bản đồ nền Tiêu chuẩn",
          thumbnail: "https://docs.ekgis.vn/assets/map-chuan.png",
          width: "50px",
          height: "50px",
        },
        {
          id: "OSM:Night",
          title: "Bản đồ nền Đêm",
          thumbnail: "https://docs.ekgis.vn/assets/dem-map.png",
          width: "50px",
          height: "50px",
        },
      ],
    });
    map.current.addControl(basemap, "bottom-left");
    basemap.on("changeBaseLayer", async function (response) {
      await new ekmapplf.VectorBaseMap(response.layer, apiKey).addTo(
        map.current
      );
    });
    map.current.addControl(
      new maplibregl.NavigationControl({ visualizePitch: true }),
      "bottom-right"
    );
    var is3DMap = false;
    if (map.current.getPitch() > 0) is3DMap = true;
    else is3DMap = false;
    var cl = "maplibregl-terrain2d-control";
    var tl = "Hiển thị 2D";
    if (!is3DMap) {
      cl = "maplibregl-terrain3d-control";
      tl = "Bản đồ 3D";
    }
    let btn3D = new ekmapplf.control.Button({
      className: "btn-ctl-group " + cl,
      icon: "none",
      tooltip: tl,
    });
    btn3D.on("click", (btn) => {
      is3DMap = !is3DMap;
      if (is3DMap) {
        btn._div.className = btn._div.className.replaceAll(
          "maplibregl-terrain3d-control",
          "maplibregl-terrain2d-control"
        );
        btn._div.title = "Hiển thị 2D";
      } else {
        btn._div.className = btn._div.className.replaceAll(
          "maplibregl-terrain2d-control",
          "maplibregl-terrain3d-control"
        );
        btn._div.title = "Hiển thị 3D";
      }
      if (is3DMap) {
        map.current.easeTo({ pitch: 60 });
        map.current.setLayoutProperty("building-3d", "visibility", "visible");
      } else {
        map.current.easeTo({ pitch: 0 });
        map.current.setLayoutProperty("building-3d", "visibility", "none");
      }
    });
    map.current.addControl(btn3D, "bottom-right");
    map.current.addControl(new maplibregl.FullscreenControl(), "top-right");
    map.current.on("load", async () => {
      await getConfigMap();
      getLstCustomer();
    });
  };
  const renderClusterMap = async () => {
    let dataGeo = {
      'type': "FeatureCollection",
      'features': []
    }
    for (let i = 0; i < lstCustomer.length; i++) {
      let lngLat = JSON.parse(lstCustomer[i].customer_location_primary)
      let feature = {
        'type': "Feature",
        'geometry': {
          'type': "Point",
          'coordinates': [lngLat.long, lngLat.lat]
        },
        'properties': lstCustomer[i]
      }
      dataGeo.features.push(feature);
    }
    if (map.current == null) return;
    if (!map.current.isStyleLoaded()) return;
    if (map.current.getSource('customer_clus')) {
      map.current.getSource('customer_clus').setData(dataGeo);
    } else {
      if (!map.current.getImage('marker-customer')) {
        const iconCustomer = await map.current.loadImage("https://sfademo.mbwcloud.com/files/check-icon.png"); //https://sfademo.mbwcloud.com/files/check-icon.png
        map.current.addImage('marker-customer', iconCustomer.data);
      }
      map.current.addSource('customer_clus', {
        'type': "geojson",
        'data': dataGeo,
        'cluster': true,
        'clusterRadius': 12
      })
      map.current.addLayer({
        'id': 'customer_clus-cluster',
        'type': 'circle',
        'source': "customer_clus",
        'maxzoom': 16,
        'filter': ['has', 'point_count'],
        'paint': {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#90D667',
            10,
            '#EFCD41',
            50,
            '#FF0012'
          ],
          'circle-radius': 12,
          'circle-stroke-color': [
            'step',
            ['get', 'point_count'],
            '#90D667',
            10,
            '#EFCD41',
            50,
            '#FF0012'
          ],
          'circle-stroke-opacity': 0.7,
          'circle-stroke-width': 5
        }
      });
      map.current.addLayer({
        id: 'customer_clus-cluster-count',
        type: 'symbol',
        'source': "customer_clus",
        'filter': ['has', 'point_count'],
        'layout': {
          'text-field': '{point_count}', 'text-size': 12
        }
      });
      map.current.on('mouseenter', `customer_clus-uncluster`, () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', `customer_clus-uncluster`, () => {
        map.current.getCanvas().style.cursor = '';
      });
      map.current.on('click', `customer_clus-cluster`, async (e) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: [`customer_clus-cluster`]
        });
        const clusterId = features[0].properties.cluster_id;
        const zoom = await map.current.getSource(`customer_clus-cluster`).getClusterExpansionZoom(clusterId);
        map.current.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom + 0.01,
        });
      });
      map.current.addLayer({
        'id': 'customer_clus-uncluster',
        'type': 'symbol',
        'source': "customer_clus",
        'filter': ['!', ['has', 'point_count']],
        'layout': {
          'icon-image': 'marker-customer',
          'icon-allow-overlap': true,
          'icon-size': {
            'stops': [
              [15, 0.7],
              [18, 1]
            ]
          }
        }
      });
      map.current.addLayer({
        'id': 'customer_clus-title',
        'type': 'symbol',
        'source': "customer_clus",
        'filter': ['!', ['has', 'point_count']],
        'layout': {
          'text-field': ['get', 'customer_name'],
          'text-font': ["Roboto Medium"],
          'text-size': {
            'stops': [
              [12, 10],
              [13, 11],
              [14, 11],
              [15, 11.5],
              [16, 12.5],
              [20, 16]
            ]
          },
          'text-anchor': "top",
          'text-max-width': 9,
          'text-offset': [0, 1.5],
          'text-padding': 5
        },
        'paint': {
          'text-color': "#ff5532",
          'text-halo-color': "#ffffff",
          'text-halo-width': 1,
          'text-halo-blur': 0.5
        }
      });
      map.current.on('click', 'customer_clus-uncluster', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var properties = e.features[0].properties;
        var popupContent = `
            <div class="customer-popup-info">
                <b>${properties.customer_name}</b>
            </div>
        `;
        if (properties.customer_primary_address != null && properties.customer_primary_address != "") {
          popupContent += `
            <div class="customer-popup-info">
                <span class="customer-popup-icon customer-icon-marker customer-icon-default-color"></span>
                <span>${properties.customer_primary_address}</span>
            </div>`;
        }
        if (properties.customer_primary_contact != null && properties.customer_primary_contact != "") {
          popupContent += `
            <div class="customer-popup-info">
                <span class="customer-popup-icon customer-icon-phone customer-icon-default-color"></span>
                <span>${properties.customer_primary_contact}</span>
            </div>`;
        }
        new maplibregl.Popup()
          .setLngLat(coordinates)
          .setHTML(popupContent)
          .addTo(map.current);
      });
    }
  }
  const addLayerIndustry = () => {
    console.log(mapConfig, 'mapConfig');

    mapConfig.forEach((config) => {
      const sources = config.sources;
      const layers = config.layers;

      for (let propertySource in sources) {
        if (!map.current.getSource(propertySource)) {
          map.current.addSource(propertySource, sources[propertySource]);
        }
      }

      layers.forEach((layer) => {
        // Kiểm tra xem layer đã tồn tại trên bản đồ chưa
        if (!map.current.getLayer(layer.id)) {
          map.current.addLayer(layer);
        }
      });

      const visibility = config.visible ? "visible" : "none";
      layers.forEach((layer) => {
        map.current.setLayoutProperty(layer.id, "visibility", visibility);
      });
    });
  };

  const handleCheckboxChange = (index: any) => {
    const newCheckboxStates = [...defaultCheckboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setDefaultCheckboxStates(newCheckboxStates);
    mapConfig.forEach((config, i) => {
      const layers = config.layers;
      const visibility = newCheckboxStates[i] ? "visible" : "none";
      layers.forEach((layer) => {
        map.current.setLayoutProperty(layer.id, "visibility", visibility);
      });
    });
  };
  useEffect(() => {
    setDefaultCheckboxStates(mapConfig.map((item) => item.visible));
  }, [mapConfig]);

  const [items, setItems] = useState([
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
    { id: "3", content: "Item 3" },
  ]);
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setItems(reorderedItems);
  };
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(mapConfig);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setMapConfig(reorderedItems);
    reorderedItems.forEach((config, index) => {
      config.layers.forEach((layer) => {
        // Sử dụng moveLayer để di chuyển lớp layer
        const beforeId = reorderedItems[index + 1] ? reorderedItems[index + 1].layers[0].id : undefined;
        map.current.moveLayer(layer.id, beforeId);
      });
    });
    const newCheckboxStates = reorderedItems.map((item) => item.visible);
    setDefaultCheckboxStates(newCheckboxStates);
  };
  return (
    <>
      <HeaderPage title="Bản đồ khách hàng" />
      <div
        id="map"
        style={{ width: "100%", height: "80vh", borderRadius: "20px" }}
      >
        <div
          id="ekmapplf_tracking_legend"
          className="ekmapplf_tracking-map-legend"
        >
          <div
            className="ekmapplf_tracking-legend-title"
            onClick={toggleLegend}
          >
            <span
              className={`icon ${isOpen
                ? "ekmapplf_tracking-icon-square-minus"
                : "ekmapplf_tracking-icon-square-plus"
                }`}
              style={{
                filter:
                  "invert(100%) sepia(100%) saturate(0%) hue-rotate(187deg) brightness(105%) contrast(103%)",
              }}
            ></span>
            <span>Chú giải bản đồ</span>
          </div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div
              className={`ekmapplf_tracking-legend-body ${isOpen ? "open" : ""
                }`}
              style={{ maxHeight: isOpen ? "none" : "0" }}
            >
              <Droppable droppableId="droppable-list-map">
                {(provided: any) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    <li>
                      <Checkbox
                        checked={isOpenCheckBox}
                        onChange={toggleLegendCheckbox}
                      />
                      <span
                        className="ekmapplf_tracking-legend-icon"
                        style={{ backgroundImage: `url('/checking.png')` }}
                      ></span>
                      Vị trí khách hàng
                    </li>
                    {mapConfig.map((item, index) => {

                      return (
                        <div>
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided: any) => (
                              <li key={index} ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                <span>
                                  <Checkbox
                                  // checked={defaultCheckboxStates[index]}
                                  // onChange={() => handleCheckboxChange(index)}
                                  />
                                </span>
                                <div
                                  className="ekmapplf_tracking-legend-title-layers"
                                  onClick={() => toggleLegendlayers(index)}
                                >
                                  <span
                                    className={`icon ${isOpenLayers[index]
                                      ? "ekmapplf_tracking-icon-square-minus"
                                      : "ekmapplf_tracking-icon-square-plus"
                                      }`}
                                    style={{ filter: "brightness(0%)" }}
                                  ></span>
                                </div>
                                <span>{item.label}</span>
                              </li>
                            )}
                          </Draggable>

                          <DragDropContext onDragEnd={onDragEnd}>
                            <div
                              className={`ekmapplf_tracking-legend-body ${isOpenLayers[index] ? "open" : ""
                                }`}
                              style={{
                                maxHeight: isOpenLayers[index] ? "none" : "0",
                                marginLeft: "36px",
                              }}
                            >
                              <Droppable droppableId="droppable-list">
                                {(provided: any) => (
                                  <ul
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    {item.children.map((child, childIndex) => (
                                      <Draggable
                                        key={child.id}
                                        draggableId={child.id}
                                        index={childIndex}
                                      >
                                        {(provided: any) => (

                                          <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <span>
                                              <Checkbox
                                              // checked={defaultCheckboxStates[index]}
                                              // onChange={() => handleCheckboxChange(index)}
                                              />
                                            </span>
                                            <div
                                              className="ekmapplf_tracking-legend-title-layers"
                                              onClick={() => toggleChildLayers( childIndex)}
                                            >
                                              <span
                                                className={`icon ${isOpenChildLayers[childIndex]
                                                  ? "ekmapplf_tracking-icon-square-minus"
                                                  : "ekmapplf_tracking-icon-square-plus"
                                                  }`}
                                                style={{ filter: "brightness(0%)" }}
                                              ></span>
                                            </div>
                                            <span>{child.label}</span>
                                          </li>
                                        )}
                                      </Draggable>

                                    ))}
                                    <DragDropContext onDragEnd={onDragEnd}>
                                      <div
                                        className={`ekmapplf_tracking-legend-body ${isOpenChildLayers[index] ? "open" : ""
                                          }`}
                                        style={{
                                          maxHeight: isOpenChildLayers[index] ? "none" : "0",
                                          marginLeft: "36px",
                                        }}
                                      >
                                        <Droppable droppableId="droppable-list">
                                          {(provided: any) => (
                                            <ul
                                              {...provided.droppableProps}
                                              ref={provided.innerRef}
                                            >
                                              {items.map((item, index) => (
                                                <Draggable
                                                  key={item.id}
                                                  draggableId={item.id}
                                                  index={index}
                                                >
                                                  {(provided: any) => (
                                                    <li
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                    >
                                                      <span>{item.content}</span>
                                                    </li>
                                                  )}
                                                </Draggable>
                                              ))}
                                              {provided.placeholder}
                                            </ul>
                                          )}
                                        </Droppable>
                                      </div>
                                    </DragDropContext>
                                    {provided.placeholder}
                                  </ul>
                                )}
                              </Droppable>
                            </div>
                          </DragDropContext>
                        </div>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
}

export default CustomerMapView;
