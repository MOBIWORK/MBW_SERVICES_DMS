import { useEffect, useRef, useState } from "react";
import { HeaderPage } from "../../components";
import { ModalView } from "./view_modal/view_modal";
import maplibregl from "maplibre-gl";
import { AxiosService } from "../../services/server";
import "./map_customer.css";
import MapConfigTree from "./mapConfig_tree";
import { Dropdown } from 'antd';
import { DownOutlined,CloseOutlined ,FileExcelOutlined,BackwardOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {TableCustom} from '../../components'
import * as ExcelJS from "exceljs";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
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
        if(fieldsMerge[j].field == 'ratio_coverage'){
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
    saveAsExcelFile(buffer, "report_check_image");
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
  const [dataSource, setDataSource] = useState([]);
  const [mapHeight, setMapHeight] = useState('80vh');
  const [visibleTable, setVisibleTable] = useState(false);
  const handleOk = (data) => {
    setDataSource(data)
    setMapHeight('40vh');
    setVisibleTable(true)
    setOpen(false);
  };
  const [apiKey, setApiKey] = useState("");
  const [mapConfig, setMapConfig] = useState<any[]>([]);
  const [lstCustomer, setLstCustomer] = useState<TypeCustomer[]>([]);
  const map = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleLegend = () => {
    setIsOpen(!isOpen);
  };

  //movelayer
  // const toggleCustomerLayersVisibility = () => {
  //   const visibility = isOpenCheckBox ? "none" : "visible";
  //   map.current.getStyle().layers.forEach((layer) => {
  //     if (layer.id.includes("customer")) {
  //       map.current.setLayoutProperty(layer.id, "visibility", visibility);
  //     }
  //   });
  // };

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
    renderClusterMap();
  }, [lstCustomer]);
  useEffect(() => {
    if (mapConfig != null && mapConfig.length > 0) addLayerIndustry();
  }, [mapConfig]);

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
    setMapConfig(res.result);
  };
  const getLstCustomer = async () => {
    // let res = await AxiosService.get(
    //   "/api/method/mbw_dms.api.selling.customer.get_customer_has_location"
    // );
    // if (res.message == "Thành công") {
    //   setLstCustomer(res.result);
    // }
    let objRes = JSON.parse('{"message":"Thành công","result":[{"name":"A Lâm","customer_name":"A Lâm","customer_code":"BH0123111115","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":"A Lâm","customer_primary_address":"395 Xuân Đỉnh, phường Xuân Đỉnh, Từ Liêm, Hà Nội, Việt Nam-Billing","customer_location_primary":"{\\"lat\\":20.7894317,\\"long\\":105.70448}"},{"name":"A Phương","customer_name":"A Phương","customer_code":"BH0120235252","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":"A Phương-A Phương","customer_primary_address":"538 Xuân Đỉnh, phường Xuân Đỉnh, Tây Hồ, Hà Nội, Việt Nam-Billing","customer_location_primary":"{\\"lat\\":21.0763504,\\"long\\":105.7869008}"},{"name":"A thuật","customer_name":"A thuật","customer_code":"HN11402","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":null,"customer_primary_address":"Đình Vĩnh Xương Trung, Mỹ Thành, Mỹ Đức, Hà Nội-Billing","customer_location_primary":"{\\"lat\\":20.6903959,\\"long\\":105.7689993}"},{"name":"A Toản","customer_name":"A Toản","customer_code":"BH0050608072022","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":"A Toản","customer_primary_address":"408 Trần Cung, Cổ Nhuế 1, Cầu Giấy, Hà Nội, Việt Nam-Billing","customer_location_primary":"{\\"lat\\":21.0555955,\\"long\\":105.7855697}"},{"name":"Anh  Hạnh","customer_name":"Anh  Hạnh","customer_code":"BH0057110022023","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":"Anh  Hạnh","customer_primary_address":"440 Cổ Nhuế, Cổ Nhuế 2, Từ Liêm, Hà Nội, Vietnam-Billing","customer_location_primary":"{\\"lat\\":21.069679,\\"long\\":105.7781418}"},{"name":"Xuyến  ngũ","customer_name":"Xuyến  ngũ","customer_code":"HN9251","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":null,"customer_primary_address":"Huyện Ứng Hòa, Hà Nội, VNM-Billing-2","customer_location_primary":"{\\"lat\\":20.7192067,\\"long\\":105.8028217}"},{"name":"Yến  Hiệp","customer_name":"Yến  Hiệp","customer_code":"HN8847","customer_type":"Company","customer_group":"Khách lẻ","territory":"Thành phố Hà Nội","customer_primary_contact":null,"customer_primary_address":"Tảo Khê  tảo  Dương  văn  ứng  hòa hà Nội-Billing","customer_location_primary":"{\\"lat\\":20.7082736,\\"long\\":105.7821972}"}]}');
    console.log(objRes);
    setLstCustomer(objRes.result);
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
  const addLayerIndustry = (checkedKeys: React.Key[]) => {
    mapConfig.forEach((group) => {
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

  const handleCheck = (checkedKeys: React.Key[]) => {
    mapConfig.forEach((group) => {
      group.children.forEach((child: any) => {
        const layers = child.layers;

        layers.forEach((layer: any) => {
          const isVisible = checkedKeys.includes(layer.id);
          const visibility = isVisible ? 'visible' : 'none';
          map.current.setLayoutProperty(layer.id, 'visibility', visibility);
        });
      });
    });
  };
  //moveLayers
  const handleMoveLayer = (layerIds: any, beforeIds: any) => {
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

  return (
    <>
      <HeaderPage title="Bản đồ khách hàng" />
      <div
        id="map"
        style={{ width: "100%", height: mapHeight, borderTopRightRadius:'20px',borderTopLeftRadius:'20px' }}
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
            <span>Chú giải bản đồ</span>
          </div>
          <div className={`ekmapplf_tracking-legend-body ${isOpen ? 'open' : ''}`} style={{ maxHeight: isOpen ? '250px' : '0', overflow: 'auto' }}>
            <MapConfigTree onCheck={handleCheck} onMoveLayer={handleMoveLayer} />
          </div>
        </div>

      </div>
      {visibleTable && (
        <div style={{position:'relative'}}>
<TableCustom
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ y: 450 }}
      />
      <div  onClick={handleClose} style={{display:'flex',position:'absolute',top:'10px',right:'10px',cursor:'pointer'}}>
        
        <CloseOutlined style={{ fontSize: '0.75rem' }} onClick={handleClose} /> </div>
        <div onClick={exportExcel} style={{display:'flex',position:'absolute',top:'15px',right:'35px',cursor:'pointer'}}>
        <FileExcelOutlined style={{color:'green', fontSize: '1.3rem'}}/>
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
