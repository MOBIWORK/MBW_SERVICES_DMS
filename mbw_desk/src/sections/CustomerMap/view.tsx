import React, { useEffect, useRef, useState } from "react";
import { HeaderPage } from "../../components";
import { ModalView } from "./view_modal/view_modal";
import maplibregl from "maplibre-gl";
import { AxiosService } from "../../services/server";
import "./map_customer.css";
import MapConfigTree from "./mapConfig_tree";
import { Dropdown } from 'antd';

import { DownOutlined,CloseOutlined ,FileExcelOutlined,BackwardOutlined} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { TableCustom } from '../../components'
import * as ExcelJS from "exceljs";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { ARR_REGIONSTR } from "./view_modal/AppConst";
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
  const items: MenuProps['items'] = [
    {
      label: 'Đánh giá độ phủ đại lý',
      key: '1',
      onClick: () => {
        setOpen(true);
      }
    },
  ];
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: 'Tên đơn vị hành chính',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tỷ lệ độ phủ',
      dataIndex: 'ratio_coverage',
      key: 'ratio_coverage',
      render: (ratio) => `${ratio}%`, // Format hiển thị phần trăm
    },
  ];

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setMapHeight('80vh');
    setVisibleTable(false)
  }
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Sheet1");

    sheet.properties.defaultColWidth = 20;
    sheet.getColumn("A").width = 30;
    sheet.mergeCells("A2:J2");
    sheet.getCell("A2").value = "Bảng đánh giá độ phủ";
    sheet.getCell("A2").style = {
      font: { bold: true, name: "Times New Roman", size: 12 },
    };
    sheet.getCell("A2").alignment = { vertical: "middle", horizontal: "left" };
    let rowHeader = sheet.getRow(4);
    let rowHeader_Next = sheet.getRow(5);
    // Thêm dữ liệu cột
    let fieldsMerge = [
      { title: "Tên đơn vị hành chính", field: "name" },
      { title: "Tỷ lệ độ phủ", field: "ratio_coverage" },
    ];
    for (let i = 0; i < fieldsMerge.length; i++) {
      let cellStart = rowHeader.getCell(i + 1);
      let cellEnd = rowHeader_Next.getCell(i + 1);
      sheet.mergeCells(`${cellStart._address}:${cellEnd._address}`);
      rowHeader.getCell(i + 1).style = {
        font: { bold: true, name: "Times New Roman", size: 12, italic: true },
      };
      rowHeader.getCell(i + 1).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      rowHeader.getCell(i + 1).value = fieldsMerge[i].title;
    }
    for (let i = 0; i < dataSource.length; i++) {
      let rowStart = 6;
      let row = sheet.getRow(i + rowStart);
      let cellStart = 1;
      for (let j = 0; j < fieldsMerge.length; j++) {
        row.getCell(cellStart).style = {
          font: { name: "Times New Roman", size: 12, italic: true },
        };
        let valCell = "";
        valCell = dataSource[i][fieldsMerge[j].field];
        if (fieldsMerge[j].field == 'ratio_coverage') {
          valCell = valCell + '%'
        }
        row.getCell(cellStart).value = valCell;
        cellStart += 1;
      }
    }
    // sheet.columns = columns;

    // // Thêm dữ liệu từ bảng vào file Excel
    // resultProductCheck.forEach((row, index) => {
    //   sheet.addRow({
    //     product_code: row.product_code,
    //     product_name: row.product_name,
    //     product_count: row.product_count,
    //   });
    // });
    // Lưu file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    saveAsExcelFile(buffer, "report_");
  };
  const saveAsExcelFile = (buffer: any, fileName: string) => {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  };
  const [objItemCoverage, setObjItemCoverage] = useState<any>(null);
  const [dataSource, setDataSource] = useState([]);
  const [mapHeight, setMapHeight] = useState('74.5vh');
  const [visibleTable, setVisibleTable] = useState(false);
  
  const handleOk = async (data, configConverage) => {
    let sourceAndLayer = await renderLayerDistributorByAdministrative(data, configConverage);
    for (let source in sourceAndLayer.sources) {
      if (!map.current.getSource(source)) map.current.addSource(source, sourceAndLayer.sources[source]);
    }
    for (let i = 0; i < sourceAndLayer.layers.length; i++) {
      if (!map.current.getLayer(sourceAndLayer.layers[i].id)) map.current.addLayer(sourceAndLayer.layers[i]);
    }

    let propertySources = Object.getOwnPropertyNames(sourceAndLayer.sources);
    let mapConverage = {
      "id": propertySources[0],
      "label": "Bản đồ độ phủ khách hàng theo đơn vị hành chính",
      "sources": sourceAndLayer.sources,
      "layers": sourceAndLayer.layers,
      "visible": true,
      "legend": null
    }
    setObjItemCoverage(mapConverage);
    setDataSource(data)
    if(data.length == 1){
      setMapHeight('63vh');
    }else if(data.length == 2){
      setMapHeight('58vh');
    }else if(data.length == 3){
      setMapHeight('52vh');
    }
    else if(data.length == 4){
      setMapHeight('46vh');
    }else{
      setMapHeight('40vh');
    }
    setVisibleTable(true)
    setOpen(false);
  };
  const [apiKey, setApiKey] = useState("");
  const [mapConfig, setMapConfig] = useState<any[]>([]);
  const [lstCustomer, setLstCustomer] = useState<TypeCustomer[]>([]);
  const map = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    if (objItemCoverage != null) {
      setMapConfig(prevConfig => {
        const updatedConfig = prevConfig.map(item => {
          if (item.id === "map_analytic_converage") { 
            const existingItemIndex = item.children.findIndex(child => child.id === objItemCoverage.id);
            if (existingItemIndex !== -1) {
              item.children[existingItemIndex] = { ...objItemCoverage, key: objItemCoverage.id, title: objItemCoverage.label };
            } else {
              item.children.push({ ...objItemCoverage, key: objItemCoverage.id, title: objItemCoverage.label });
            }
          }
          return item;
        });
        addLayerIndustry(updatedConfig)
        return updatedConfig;
      });
    }
  }, [objItemCoverage]);

  const toggleLegend = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getConfigApi();
  }, []);
  useEffect(() => {
    if (apiKey != null && apiKey != "") {
      console.log(apiKey);
      renderMap();
    }
  }, [apiKey]);

  useEffect(() => {
    renderMapForCustomer()
  }, [lstCustomer]);

  const getConfigApi = async () => {
    let res = await AxiosService.get(
      "/api/method/mbw_dms.api.vgm.map_customer.get_config_api"
    );
    setApiKey(res.result);
  };
  const getConfigMap = async () => {
    let res = await AxiosService.get(
      "/api/method/mbw_dms.api.vgm.map_customer.get_config_map"
    );
    let objMapAnalyticCoverage = {
      "id": "map_analytic_converage",
      "group": true,
      "visible": false,
      "label": "Bản đồ độ phủ khách hàng",
      "children": []
    }
    if (res.result == null) res.result = [];
    res.result.push(objMapAnalyticCoverage);
    setMapConfig(res.result);
    localStorage.setItem('mapConfig',JSON.stringify(res.result))
    addLayerIndustry(res.result);
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
    console.log(apiKey);
    map.current = new maplibregl.Map({
      container: "map",
      center: [108.485, 16.449],
      zoom: 5.43,
    });
    let mapOSMNight = new ekmapplf.VectorBaseMap("OSM:Night", apiKey).addTo(
      map.current
    );
    var basemap = new ekmapplf.control.BaseMap({
      id: "basemap_control",
      baseLayers: [
        {
          id: "OSM:Night",
          title: "Bản đồ nền Đêm",
          thumbnail: "https://docs.ekgis.vn/assets/dem-map.png",
          width: "50px",
          height: "50px",
        },
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
      ],
    });
    map.current.addControl(basemap, "bottom-left");
    var lstCustomerCache = JSON.parse(JSON.stringify(lstCustomer))
    basemap.on("changeBaseLayer", async function (response) {
      // setMapConfig(mapConfigCache);
       setLstCustomer(lstCustomerCache);
       await new ekmapplf.VectorBaseMap(response.layer, apiKey).addTo(
         map.current
       ); 
       let mapConfigCache = JSON.parse(localStorage.getItem('mapConfig'))
          setTimeout(async () => {
            await addLayerIndustry(mapConfigCache);
              let arrSaveVisibleLayer =  JSON.parse(localStorage.getItem('arrSaveVisible'))       
              for(let i= 0; i< arrSaveVisibleLayer.length;i++){
                if(map.current.getLayer(arrSaveVisibleLayer[i].id)){
                  map.current.setLayoutProperty(arrSaveVisibleLayer[i].id, 'visibility', arrSaveVisibleLayer[i].visibility);
                }
              }
          },100)
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
    //ban do heatMap
    var isHeatMap = false;
    var cl = "icon_heatmap";
    var tl = "Bản đồ nhiệt phân bố khách hàng";
    let btnSwichMap = new ekmapplf.control.Button({
      className: "btn-ctl-group " + cl,
      icon: "",
      tooltip: tl,
    });
    btnSwichMap.on("click", (btn) => {
      isHeatMap = !isHeatMap;
      if (isHeatMap) {
        btn._div.className = btn._div.className.replaceAll(
          "icon_heatmap",
          "icon_clustermap"
        ); //Thay doi icon tu heat sang cluster
        btn._div.title = "Bản đồ cụm phân bố khách hàng";
      } else {
        btn._div.className = btn._div.className.replaceAll(
          "icon_clustermap",
          "icon_heatmap"
        ); //Thay doi icon cluster sang heat
        btn._div.title = "Bản đồ nhiệt phân bố khách hàng";
      }
      if (isHeatMap) {
        map.current.setLayoutProperty("customer_heat", "visibility", "visible");
        map.current.setLayoutProperty("customer_heat_icon", "visibility", "visible");
        map.current.setLayoutProperty("customer_heat_title", "visibility", "visible");
        map.current.setLayoutProperty("customer_clus-cluster", "visibility", "none");
        map.current.setLayoutProperty("customer_clus-cluster-count", "visibility", "none");
        map.current.setLayoutProperty("customer_clus-uncluster", "visibility", "none");
        map.current.setLayoutProperty("customer_clus-title", "visibility", "none");
      } else {
        map.current.setLayoutProperty("customer_heat", "visibility", "none");
        map.current.setLayoutProperty("customer_heat_icon", "visibility", "none");
        map.current.setLayoutProperty("customer_heat_title", "visibility", "none");
        map.current.setLayoutProperty("customer_clus-cluster", "visibility", "visible");
        map.current.setLayoutProperty("customer_clus-cluster-count", "visibility", "visible");
        map.current.setLayoutProperty("customer_clus-uncluster", "visibility", "visible");
        map.current.setLayoutProperty("customer_clus-title", "visibility", "visible");

      }
    })
    map.current.addControl(btn3D, "bottom-right");
    map.current.addControl(new maplibregl.FullscreenControl(), "top-right");
    map.current.addControl(btnSwichMap, "top-right");
    map.current.on("load", async () => {
      await getConfigMap();
      getLstCustomer();
      console.log(mapConfig);
   
    });
  };

  const renderClusterForCustomer = async (dataGeo) => {
    if (map.current.getSource('customer_clus')) {
      map.current.getSource('customer_clus').setData(dataGeo);
    } else {
      if (!map.current.getImage('marker-customer')) {
        const iconCustomer = await map.current.loadImage("https://files.ekgis.vn/sdks/tracking/assets/check-icon.png"); //https://sfademo.mbwcloud.com/files/check-icon.png
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
        },
        'layout': {
          'visibility': "visible"
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
  const renderHeatMapForCustomer = async (dataGeo) => {
    if (map.current.getSource('customer_heat')) {
      map.current.getSource('customer_heat').setData(dataGeo);
    } else {
      if (!map.current.getImage('marker-customer')) {
        const iconCustomer = await map.current.loadImage("public/assets/check-icon.png");
        map.current.addImage('marker-customer', iconCustomer.data);
      }
      map.current.addSource('customer_heat', {
        'type': 'geojson',
        'data': dataGeo
      });

      map.current.addLayer({
        'id': 'customer_heat',
        'type': 'heatmap',
        'source': 'customer_heat',
        'maxzoom': 14,
        'paint': {
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'mag'],
            0,
            0,
            6,
            1
          ],
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            1,
            9,
            3
          ],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(33,102,172,0)',
            0.2,
            'rgb(103,169,207)',
            0.4,
            'rgb(209,229,240)',
            0.6,
            'rgb(253,219,199)',
            0.8,
            'rgb(239,138,98)',
            1,
            'rgb(178,24,43)'
          ],
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            2,
            9,
            20
          ],
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7,
            1,
            14,
            0
          ]
        },
        'layout': {
          'visibility': "none"
        }
      });
      map.current.addLayer({
        'id': 'customer_heat_icon',
        'type': 'symbol',
        'source': "customer_heat",
        'minzoom': 14,
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
        'id': 'customer_heat_title',
        'type': 'symbol',
        'source': "customer_heat",
        'minzoom': 14,
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
      map.current.on('click', 'customer_heat_icon', function (e) {
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

  const renderMapForCustomer = async () => {
    let dataGeo = {
      'type': "FeatureCollection",
      'features': []
    }
    console.log(lstCustomer);
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
    await renderClusterForCustomer(dataGeo);
    renderHeatMapForCustomer(dataGeo);
  }

  const addLayerIndustry = async (configMap) => {
    configMap.forEach((group) => {
      //group
      if (group.group) {
        group.children.forEach((child) => {
          const sources = child.sources;
          const layers = child.layers;

          for (let propertySource in sources) {
            if (!map.current.getSource(propertySource)) {
              map.current.addSource(propertySource, sources[propertySource]);
            }
          }
          layers.forEach((layer) => {
            if (!map.current.getLayer(layer.id)) {
              map.current.addLayer(layer);
            }
            const visibility = child.visible ? 'visible' : 'none';
            map.current.setLayoutProperty(layer.id, 'visibility', visibility);
          });
        });
      } else {
        group.forEach((child) => {
          const sources = child.sources;
          const layers = child.layers;

          for (let propertySource in sources) {
            if (!map.current.getSource(propertySource)) {
              map.current.addSource(propertySource, sources[propertySource]);
            }
          }
          layers.forEach((layer) => {
            if (!map.current.getLayer(layer.id)) {
              map.current.addLayer(layer);
            }
            const visibility = child.visible ? 'visible' : 'none';
            map.current.setLayoutProperty(layer.id, 'visibility', visibility);
          });
        });

      }

    });

  };
  // Kiểm tra và thiết lập thuộc tính của lớp
  const handleCheck = (checkedKeys: React.Key[], dataObj: React.Key[]) => {
    let arrSaveVisible = [];
    mapConfig.forEach((group) => {
      group.children.forEach((child: any) => {
        const mapInfo = child;
        if (checkedKeys.includes(mapInfo.id)) {
          let layers = mapInfo.layers;
          for (let i = 0; i < layers.length; i++) {
            if (map.current.getLayer(layers[i].id)) {
              map.current.setLayoutProperty(layers[i].id, 'visibility', "visible");
              let objVisibleLayer={
                id:layers[i].id,
                visibility: "visible"
              }
              arrSaveVisible.push(objVisibleLayer)
            }
          }
        } else {
          let layers = mapInfo.layers;
          for (let i = 0; i < layers.length; i++) {
            if (map.current.getLayer(layers[i].id)) {
              map.current.setLayoutProperty(layers[i].id, 'visibility', "none");
              let objVisibleLayer={
                id:layers[i].id,
                visibility: "none"
              }
              arrSaveVisible.push(objVisibleLayer)
            }
          }
        }
      });
    });
    
    localStorage.setItem('arrSaveVisible',JSON.stringify(arrSaveVisible))
  };
  const changeOpacity = (sliderValues: any, selectedKeys: React.Key) => {

    if (!sliderValues) return
    console.log(sliderValues, selectedKeys);

    selectedKeys.forEach(key => {
      map.current.setPaintProperty(
        key,
        'raster-opacity',
        sliderValues
      )
    });
  }
  //moveLayers
  const handleMoveLayer = (layerIds: any, beforeIds: any) => {
    console.log(mapConfig);

    if (isParentId(layerIds)) {
      const layerChildIds = getChildLayerIds(mapConfig, [layerIds]);
      const beforeChildIds = getChildLayerIds(mapConfig, [beforeIds]);
      layerChildIds.forEach((layerChildId, index) => {
        const beforeChildId = beforeChildIds[index];
        map.current.moveLayer(layerChildId, beforeChildId);
      });
    } else {
      map.current.moveLayer(layerIds.toString(), beforeIds.toString());
    }
  };
  const isParentId = (id: any) => {
    const item = mapConfig.find((item) => item.id === id);
    return item && item.children && item.children.length > 0;
  };
  const getChildLayerIds = (config: any[], layerIds: string[]) => {
    const childIds: string[] = [];
    layerIds.forEach(id => {
      const item = config.find(item => item.id === id);
      if (item && item.children) {
        item.children.forEach(child => {
          childIds.push(child.id);
        });
      }
    });
    return childIds;
  };

  const renderLayerDistributorByAdministrative = async (objResult, objSetting) => {
    let arrRangeColor = ["rgb(254, 217, 118)", "rgb(254, 178, 76)", "rgb(253, 141, 60)", "rgb(252, 78, 42)", "rgb(227, 26, 28)", "rgb(177, 0, 38)"];
    let min = 0;
    let max = 100;
    let trungBinh = (max - min) / 6;
    let arrCode = [];
    let fill_color_province: any = ['case'];
    if (objSetting["type_area"] == "administrative_region") {
      let valueArea = JSON.parse(objSetting["value_area"]);
      let arrRegion = JSON.parse(ARR_REGIONSTR);
      for (let i = 0; i < valueArea.length; i++) {
        let ratio_distributor = objResult[i].ratio_coverage;
        for (let j = 0; j < arrRegion.length; j++) {
          if (arrRegion[j].code == valueArea[i]) {
            let arrProvince = arrRegion[j].arrProvince;
            for (let t = 0; t < arrProvince.length; t++) {
              arrCode.push(arrProvince[i].provinceid);
              fill_color_province.push(['==', ['get', 'code'], arrProvince[i].provinceid]);
              if (min <= ratio_distributor && ratio_distributor < (min + trungBinh)) {
                fill_color_province.push(arrRangeColor[0]);
              } else if ((min + trungBinh) <= ratio_distributor && ratio_distributor < (min + 2 * trungBinh)) {
                fill_color_province.push(arrRangeColor[1]);
              } else if ((min + 2 * trungBinh) <= ratio_distributor && ratio_distributor < (min + 3 * trungBinh)) {
                fill_color_province.push(arrRangeColor[2]);
              } else if ((min + 3 * trungBinh) <= ratio_distributor && ratio_distributor < (min + 4 * trungBinh)) {
                fill_color_province.push(arrRangeColor[3]);
              } else if ((min + 4 * trungBinh) <= ratio_distributor && ratio_distributor < (min + 5 * trungBinh)) {
                fill_color_province.push(arrRangeColor[4]);
              } else if ((min + 5 * trungBinh) <= ratio_distributor && ratio_distributor <= max) {
                fill_color_province.push(arrRangeColor[5]);
              }
            }
            break;
          }
        }
      }
    } else if (objSetting["type_area"] == "administrative_province" || objSetting["type_area"] == "administrative_district") {
      for (let i = 0; i < objResult.length; i++) {
        let ratio_distributor = objResult[i].ratio_coverage;
        arrCode.push(objResult[i].code);
        fill_color_province.push(['==', ['get', 'code'], objResult[i].code]);
        if (min <= ratio_distributor && ratio_distributor < (min + trungBinh)) {
          fill_color_province.push(arrRangeColor[0]);
        } else if ((min + trungBinh) <= ratio_distributor && ratio_distributor < (min + 2 * trungBinh)) {
          fill_color_province.push(arrRangeColor[1]);
        } else if ((min + 2 * trungBinh) <= ratio_distributor && ratio_distributor < (min + 3 * trungBinh)) {
          fill_color_province.push(arrRangeColor[2]);
        } else if ((min + 3 * trungBinh) <= ratio_distributor && ratio_distributor < (min + 4 * trungBinh)) {
          fill_color_province.push(arrRangeColor[3]);
        } else if ((min + 4 * trungBinh) <= ratio_distributor && ratio_distributor < (min + 5 * trungBinh)) {
          fill_color_province.push(arrRangeColor[4]);
        } else if ((min + 5 * trungBinh) <= ratio_distributor && ratio_distributor <= max) {
          fill_color_province.push(arrRangeColor[5]);
        }
      }
    }
    fill_color_province.push('#ded9f5');
    let sourceAndLayer = {
      'sources': {},
      'layers': []
    }
    let id = guid12();
    sourceAndLayer.sources[`s_${id}_bdm`] = {
      "maxzoom": 8,
      "type": "vector",
      "tiles": [
        "https://api.ekgis.vn/maps/bdm/2022/{z}/{x}/{y}.pbf?api_key=" + apiKey
      ]
    }
    sourceAndLayer.layers.push({
      "id": `l_${id}_bdm`,
      "type": "fill",
      "source": `s_${id}_bdm`,
      "source-layer": "bdm_polygon",
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-opacity": 0.7,
        "fill-color": arrCode.length > 0 ? fill_color_province : "rgba(33,102,172,0)"
      },
      "filter": ['in', 'code', ...arrCode]
    })
    sourceAndLayer.layers.push({
      "id": `l_${id}_bdm_line`,
      "type": "line",
      "source": `s_${id}_bdm`,
      "source-layer": "bdm_line",
      "minzoom": 3,
      "maxzoom": 23,
      "filter": [
        "all",
        [
          "in",
          "level",
          "2"
        ]
      ],
      "layout": {
        "visibility": 'visible'
      },
      "paint": {
        "line-opacity": {
          "stops": [
            [
              4,
              0
            ],
            [
              7,
              1
            ]
          ]
        },
        "line-color": "rgba(110, 110, 110, 1)",
        "line-dasharray": [
          5,
          2,
          5,
          2,
          0.8,
          2
        ],
        "line-width": {
          "stops": [
            [
              5,
              0.5
            ],
            [
              7,
              0.7
            ],
            [
              8,
              1
            ],
            [
              9,
              1.3
            ],
            [
              11,
              2
            ],
            [
              13,
              2.5
            ],
            [
              15,
              4
            ],
            [
              17,
              5
            ],
            [
              20,
              8
            ]
          ]
        }
      }
    })
    return sourceAndLayer;
  }

  const guid12 = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + s4();
  }

  return (
    <>
      <HeaderPage title="Bản đồ khách hàng" />
      <div
        id="map"
        style={{ width: "100%", height: mapHeight, borderTopRightRadius: '20px', borderTopLeftRadius: '20px' }}
      >
        <div className='ekmapplf_map-ananyltic'>
          <Dropdown.Button
            type="primary"
            icon={<DownOutlined />}
            menu={{ items }}
          >
            Công cụ phân tích
          </Dropdown.Button>

        </div>
        <div id='ekmapplf_tracking_legend' className='ekmapplf_tracking-map-legend'>
          <div className='ekmapplf_tracking-legend-title' onClick={toggleLegend}>
            <span className={`icon ${isOpen ? 'ekmapplf_tracking-icon-square-minus' : 'ekmapplf_tracking-icon-square-plus'}`} style={{ filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(187deg) brightness(105%) contrast(103%)' }}></span>
            <span style={{ marginLeft: '8px' }}>Danh sách bản đồ</span>
          </div>
          <div className={`ekmapplf_tracking-legend-body ${isOpen ? 'open' : ''}`} style={{ maxHeight: isOpen ? '250px' : '0', overflow: 'auto' }}>
            <MapConfigTree objCoverageItem={objItemCoverage} onCheck={handleCheck} onMoveLayer={handleMoveLayer} changeOpacity={changeOpacity} />
          </div>
        </div>

      </div>
      {visibleTable && (
        <div style={{ position: 'relative' }}>
          <TableCustom
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ y: 270 }}
          />
          <div onClick={handleClose} style={{ display: 'flex', position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>

            <CloseOutlined style={{ fontSize: '0.75rem' }} onClick={handleClose} /> </div>
          <div onClick={exportExcel} style={{ display: 'flex', position: 'absolute', top: '15px', right: '35px', cursor: 'pointer' }}>
            <FileExcelOutlined style={{ color: 'green', fontSize: '1.3rem' }} />
          </div>
        </div>


      )}

      <ModalView
        open={open}
        title="Đánh giá độ phủ"
        onCancel={handleCloseModal}
        onOk={handleOk}
        lstCustomer={lstCustomer}
        api={apiKey}>

      </ModalView>
    </>
  );
}

export default CustomerMapView;
