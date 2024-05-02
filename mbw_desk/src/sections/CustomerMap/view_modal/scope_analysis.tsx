import React, { useState, useEffect, useRef } from "react";
import { AxiosService } from "../../../services/server";
import { Col, Row } from "antd";
import { RadiusUpleftOutlined } from "@ant-design/icons";
import { ARR_REGIONSTR } from "./AppConst";
import { Flex, Segmented, Form, Select } from "antd";
import maplibregl from "maplibre-gl";
import classNames from 'classnames';
import "./style.css";
declare var ekmapplf: any;
export function ScopeAnalysis({ form, onResult, scopeResult,api }) {
  const [selectedOption, setSelectedOption] = useState("hanhchinh");
  const handleOptionChange = (value) => {
    setSelectedOption(value); // Cập nhật giá trị hiện tại của Segmented khi thay đổi lựa chọn
  };
  const [mapConfig, setMapConfig] = useState([]);
  // const [apiKey, setApiKey] = useState("");
  const [selectRegion, setSelectRegion] = useState([]);
  const [arrTinh, setArrTinh] = useState([]);
  const [selectTinh, setSelectTinh] = useState([]);
  const [arrHuyen, setArrHuyen] = useState([]);
  const [selectHuyen, setSelectHuyen] = useState([]);
  const arr_region = JSON.parse(ARR_REGIONSTR).map((item) => {
    return {
      ...item,
      value: item.code,
      label: item.name,
    };
  });
  arr_region.unshift({
    value: 'all',
    label: 'Cả nước',
  });
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "" ).toLowerCase().includes(input.toLowerCase());
  const filterOptionTinhHuyen = (
    input: string,
    option?: { label: string; value: string }
  ) => {
    // Nếu không có option hoặc option không có giá trị value, trả về false
    if (!option || !option.value) {
      return false;
    }
  
    // Lấy label từ option hoặc trả về chuỗi rỗng nếu không có label
    const label = option.label ?? "";
    
    // Chuyển đổi label và input thành chữ thường để so sánh không phân biệt hoa thường
    const normalizedLabel = label.toLowerCase();
    const normalizedInput = input.toLowerCase();
  
    // Kiểm tra xem label có chứa input không
    return normalizedLabel.includes(normalizedInput);
  };

  useEffect(() => {
    if(scopeResult){
      let modifiedTinh = []
      if(scopeResult.region){
        setSelectRegion(scopeResult.region)
        const filteredArr = arr_region.filter((item) => {
          if(scopeResult.region.includes('all')){
            let value = ['1','2','3','4','5','6','7']
            return value.includes(item.value);
          }else{
            return scopeResult.region.includes(item.value);
          }
         
        });
        
        for(let i = 0; i < filteredArr.length; i++) {
           let obj = {
             label: <span>{filteredArr[i].label}</span>,
             title: filteredArr[i].label,
             options : filteredArr[i].arrProvince.map((item) => ({
                 ...item,
                 value: item.provinceid, // Thay đổi trường value thành item.code
                 label: item.name, // Thay đổi trường label thành item.name
               }))
           }
           modifiedTinh.push(obj)
        }
        setArrTinh(modifiedTinh);
       }
      if(scopeResult.tinh){
        getarrTinh(scopeResult.tinh,modifiedTinh)
      }
     
      setSelectHuyen(scopeResult.huyen)
    }
  }, []);
  useEffect(() => {
    setSelectTinh([])
    form.setFieldValue('tinh', "")
  }, [selectRegion])
  const onChangeKhuvuc = (value) => {
    setArrTinh([]);
    setSelectTinh([])
    // setSelectHuyen([])
    if(value.includes('all')){
      map.current.flyTo({
        center: [107.9426393217799, 16.92300264959944],
        zoom: 5,
      });
       value = ['1','2','3','4','5','6','7']
    }
   const filteredArr = arr_region.filter((item) => {
        return value.includes(item.value);
      });
   if(value.includes('all')){

   }else{
    const filteredRegion = arr_region.filter((item) => item.value === value);
    if (filteredRegion.length > 0) {
      if (filteredRegion[0].bbox != null) {
        let bboxSplit = filteredRegion[0].bbox.split(",");
        let bbox = [
        [Number(bboxSplit[0]), Number(bboxSplit[1])],
        [Number(bboxSplit[2]), Number(bboxSplit[3])],
      ];
      map.current.fitBounds(bbox);
      }
    }
   }
  let modifiedTinh = []
     for(let i = 0; i < filteredArr.length; i++) {
        let obj = {
          label: <span>{filteredArr[i].label}</span>,
          title: filteredArr[i].label,
          options : filteredArr[i].arrProvince.map((item) => ({
              ...item,
              value: item.provinceid, // Thay đổi trường value thành item.code
              label: item.name, // Thay đổi trường label thành item.name
            }))
        }
        modifiedTinh.push(obj)
     }
     setArrTinh(modifiedTinh);
   setSelectRegion(value)
   onResultChange()
  
  };

  const onChangeTinh = async (value) => {
    let filteredItems = [];
    // Duyệt qua từng phần tử trong mảng arrTinh
    for (let i = 0; i < arrTinh.length; i++) {
      // Lọc các phần tử trong mảng options của phần tử arrTinh[i]
      let filteredArr = arrTinh[i].options.filter((item) => {
        // Kiểm tra xem giá trị item.value có nằm trong mảng value không
        return value.includes(item.value);
      });
    
      // Thêm các phần tử đã lọc vào mảng kết quả filteredItems
      filteredItems.push(...filteredArr);
    }
    for(let i = 0; i < arrTinh.length; i ++){
        const filteredProvince = arrTinh[i].options.filter((item) => item.value === value);
        if (filteredProvince.length > 0) {
          if (filteredProvince[0].bbox != null) {
            let bboxSplit = filteredProvince[0].bbox.split(",");
            let bbox = [
              [Number(bboxSplit[0]), Number(bboxSplit[1])],
              [Number(bboxSplit[2]), Number(bboxSplit[3])],
            ];
            map.current.fitBounds(bbox);
          }
        }
      }
    setSelectTinh(value)
    form.setFieldValue('tinh', value)
    onResultChange()
  };
  // const onChangeHuyen = (value) => {
  //   if(selectHuyen.length > value.length){

  //   }else{
  //     for(let i = 0; i < arrHuyen.length; i ++){
  //       const filteredHuyen = arrHuyen[i].options.filter((item) => item.value === value[value.length - 1]);
  //       if (filteredHuyen.length > 0) {
  //         if (filteredHuyen[0].bbox != null) {
  //           let bboxSplit = filteredHuyen[0].bbox.split(",");
  //           let bbox = [
  //             [Number(bboxSplit[0]), Number(bboxSplit[1])],
  //             [Number(bboxSplit[2]), Number(bboxSplit[3])],
  //           ];
  //           map.current.fitBounds(bbox);
  //         }
  //       }
  //     }
   
  //   }
  //   setSelectHuyen(value);
  //   onResultChange()
  // };
  const onResultChange = () => {
      let obj = {
        region: selectRegion,
        tinh : selectTinh,
        huyen:selectHuyen
      }
      onResult(obj)
  }
  // const getConfigApi = async () => {
  //   let res = await AxiosService.get(
  //     "/api/method/mbw_dms.api.vgm.map_customer.get_config_api"
  //   );
  //   setApiKey(res.result);
  // };
  const getarrTinh= async (result,arrTinh) => {
    setSelectTinh(result)
    let filteredItems = [];
    let modifiedHuyen = []
    
    // Duyệt qua từng phần tử trong mảng arrTinh
    for (let i = 0; i < arrTinh.length; i++) {
      // Lọc các phần tử trong mảng options của phần tử arrTinh[i]
      let filteredArr = arrTinh[i].options.filter((item) => {
        // Kiểm tra xem giá trị item.value có nằm trong mảng value không
        return result.includes(item.value);
      });
    
      // Thêm các phần tử đã lọc vào mảng kết quả filteredItems
      filteredItems.push(...filteredArr);
    }
    for(let i = 0; i < filteredItems.length;i++){
      let obj = {
        label: <span>{filteredItems[i].label}</span>,
        title: filteredItems[i].label,
        options : []
      }
     let urlAPI_district = `https://api.ekgis.vn/data/administrative/province/${filteredItems[i].value}/district?api_key=${api}`;
     let response = await fetch(urlAPI_district);
     
     const data = await response.json();
     if (data && data.length > 0) {
      obj.options = data.map((item) => ({
        ...item,
        value: item.districtid, // Thay đổi trường value thành item.code
        label: item.name, // Thay đổi trường label thành item.name
      }));
     }
      modifiedHuyen.push(obj)
    }
    setArrHuyen(modifiedHuyen)
    
  };
  const map = useRef(null);
  const renderMap = () => {
    map.current = new maplibregl.Map({
      container: "map_cf",
      center: [108.485, 16.449],
      zoom: 5.43,
    });
    let mapOSMBright = new ekmapplf.VectorBaseMap("OSM:Bright", api).addTo(
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
      await new ekmapplf.VectorBaseMap(response.layer, api).addTo(
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
    // map.current.on("load", async () => {
    //   await getConfigMap();
    // });
  };
  // useEffect(() => {
  //   getConfigApi();
  // }, []);
  useEffect(() => {
    if (api != null && api != "") {
      renderMap();
    }
  }, [api]);
  useEffect(() => {
    //if (mapConfig != null && mapConfig.length > 0) addLayerIndustry();
  }, [mapConfig]);
  const [controlAdministrative, setControlAdministrative] =
    useState("hanhchinh");

  const onChangeControlArea = (value) => {
    setControlAdministrative(value);
    // Thực hiện các hành động khi thay đổi khu vực kiểm soát
  };
  return (
    <>
      <Row>
        <Col span={12} style={{ paddingRight: "10px" }}>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
            }}
          >
            <div
              className={classNames('flex', 'flex-col', 'justify-between', 'h-full', 'me-3','ele_control_area', {
                // Chỉ thêm class ele_control_area khi controlAdministrative khác 'hanhchinh'
                'ele_control_area_active': controlAdministrative === 'vungbao', // Thêm class ele_control_area_active khi controlAdministrative là 'hanhchinh'
              })}
              onClick={() => onChangeControlArea("vungbao")}
            >
              <div className="flex-grow flex flex-col items-center justify-center ele_control_area_icon">
                <RadiusUpleftOutlined style={{ fontSize: "2rem" }} />
              </div>
              <div className="text-gray-700 text-center ele_control_area_text">
                a. Theo vùng bao nhỏ nhất
              </div>
            </div>
            <div
      className={classNames('flex', 'flex-col', 'justify-between', 'h-full', 'me-3','ele_control_area', {
        // Chỉ thêm class ele_control_area khi controlAdministrative khác 'hanhchinh'
        'ele_control_area_active': controlAdministrative === 'hanhchinh', // Thêm class ele_control_area_active khi controlAdministrative là 'hanhchinh'
      })}
      onClick={() => onChangeControlArea('hanhchinh')} // Khi click vào, set controlAdministrative thành 'hanhchinh'
    >
              <div className="flex-grow flex flex-col items-center justify-center ele_control_area_icon">
                <svg
                  className="custom-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M302.8 312C334.9 271.9 408 174.6 408 120C408 53.7 354.3 0 288 0S168 53.7 168 120c0 54.6 73.1 151.9 105.2 192c7.7 9.6 22 9.6 29.6 0zM416 503l144.9-58c9.1-3.6 15.1-12.5 15.1-22.3V152c0-17-17.1-28.6-32.9-22.3l-116 46.4c-.5 1.2-1 2.5-1.5 3.7c-2.9 6.8-6.1 13.7-9.6 20.6V503zM15.1 187.3C6 191 0 199.8 0 209.6V480.4c0 17 17.1 28.6 32.9 22.3L160 451.8V200.4c-3.5-6.9-6.7-13.8-9.6-20.6c-5.6-13.2-10.4-27.4-12.8-41.5l-122.6 49zM384 255c-20.5 31.3-42.3 59.6-56.2 77c-20.5 25.6-59.1 25.6-79.6 0c-13.9-17.4-35.7-45.7-56.2-77V449.4l192 54.9V255z" />
                </svg>
              </div>
              <div className="text-gray-700 text-center ele_control_area_text">
                b. Theo đơn vị hành chính
              </div>
            </div>
          </div> */}

          {/* <Flex
            gap="small"
            align="flex-start"
            vertical
            style={{ width: "100%" }}
          >
            <Segmented
              style={{ width: "100%", justifyContent: "space-between" }}
              onChange={handleOptionChange}
              options={[
                {
                  label: (
                    <div style={{ padding: 4 }}>
                      <RadiusUpleftOutlined style={{ fontSize: "2rem" }} />
                      <div>Theo vùng bao nhỏ nhất </div>
                    </div>
                  ),
                  value: "user1",
                },
                {
                  label: (
                    <div style={{ padding: 4 }}>
                      <svg
                        className="custom-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M302.8 312C334.9 271.9 408 174.6 408 120C408 53.7 354.3 0 288 0S168 53.7 168 120c0 54.6 73.1 151.9 105.2 192c7.7 9.6 22 9.6 29.6 0zM416 503l144.9-58c9.1-3.6 15.1-12.5 15.1-22.3V152c0-17-17.1-28.6-32.9-22.3l-116 46.4c-.5 1.2-1 2.5-1.5 3.7c-2.9 6.8-6.1 13.7-9.6 20.6V503zM15.1 187.3C6 191 0 199.8 0 209.6V480.4c0 17 17.1 28.6 32.9 22.3L160 451.8V200.4c-3.5-6.9-6.7-13.8-9.6-20.6c-5.6-13.2-10.4-27.4-12.8-41.5l-122.6 49zM384 255c-20.5 31.3-42.3 59.6-56.2 77c-20.5 25.6-59.1 25.6-79.6 0c-13.9-17.4-35.7-45.7-56.2-77V449.4l192 54.9V255z" />
                      </svg>
                      <div>Theo đơn vị hành chính</div>
                    </div>
                  ),
                  value: "user2",
                },
              ]}
            />
          </Flex> */}
          {controlAdministrative === "vungbao" && (
            <div style={{ lineHeight: "20px", textAlign: "left", height:'320px' }}>
              <p
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                  color: "#0a743e",
                }}
              >
                Xác định khu vực đánh giá theo vùng bao đóng đại lý phân phối
              </p>
            </div>
          )}

          {controlAdministrative === "hanhchinh" && (
            <div style={{ lineHeight: "20px", textAlign: "left" ,paddingLeft:'10px',height:'320px'}}>
              <p
                style={{
                  padding: "10px 0px 10px 0px",
                  fontWeight: "bold",
                  color: "#0a743e",
                }}
              >
                Xác định giới hạn khu vực bằng đơn vị hành chính các cấp tỉnh,
                huyện
              </p>
             
                <Form.Item label="Khu vực" name="khuvuc">
                  <Select
                    // mode="multiple"
                    showSearch
                    value={selectRegion}
                    placeholder="Chọn khu vực"
                    onChange={onChangeKhuvuc}
                    options={arr_region}
                    filterOption={filterOption}
                  ></Select>
                </Form.Item>
                <Form.Item label="Đơn vị hành chính cấp tỉnh" name="tinh">
                  <Select
                    // mode="multiple"
                    showSearch
                    optionFilterProp="children"
                    placeholder="Chọn khu vực hành chính cấp tỉnh/thành phố"
                    value={selectTinh}
                    onChange={onChangeTinh}
                    options={arrTinh}
                    filterOption={filterOptionTinhHuyen}
                  ></Select>
                </Form.Item>
                {/* <Form.Item label="Đơn vị hành chính cấp huyện" name="huyen">
                  <Select
                    mode="multiple"
                    showSearch
                    placeholder="Chọn khu vực hành chính cấp quận/huyện"
                    onChange={onChangeHuyen}
                    value={selectHuyen}
                    options={arrHuyen}
                    filterOption={filterOptionTinhHuyen}
                  ></Select>
                </Form.Item> */}
             
            </div>
          )}
        </Col>
        <Col span={12}>
          <div id="map_cf" style={{ width: "100%", height: "100%" }}></div>
        </Col>
      </Row>
    </>
  );
}
