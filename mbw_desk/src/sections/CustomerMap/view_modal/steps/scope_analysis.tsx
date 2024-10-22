import React, { useState, useEffect, useRef } from "react";
import { AxiosService } from "../../../../services/server";
import { Col, Row } from "antd";
import { RadiusUpleftOutlined } from "@ant-design/icons";
import { ARR_REGIONSTR } from "../data/AppConst";
import { Flex, Segmented, Form, Select } from "antd";
import maplibregl, { MapOptions } from "maplibre-gl";
import classNames from 'classnames';
import "./style.css";
import { arr_region } from "../data";
declare var ekmapplf: any;
export function ScopeAnalysis({ form, onResult, scopeResult,api }) {
  const map = useRef<any>(null);
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
  const [bbox, setBbox] = useState("");


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
    setBbox('')
  }, [selectRegion])


  const onChangeKhuvuc = (value) => {
    setArrTinh([]);
    setSelectTinh([])
    let bbox1 = [];
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
        bbox1 = [
        [Number(bboxSplit[0]), Number(bboxSplit[1])],
        [Number(bboxSplit[2]), Number(bboxSplit[3])],
      ];
      map.current.fitBounds(bbox1);
      setBbox(JSON.stringify(bbox))
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
   onResultChange(JSON.stringify(bbox1))
  
  };

  const onChangeTinh = async (value) => {
    let filteredItems = [];
    let bbox1 = []
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
            bbox1 = [
              [Number(bboxSplit[0]), Number(bboxSplit[1])],
              [Number(bboxSplit[2]), Number(bboxSplit[3])],
            ];
            map.current.fitBounds(bbox1);
            setBbox(JSON.stringify(bbox))
          }
        }
      }
    setSelectTinh(value)
    form.setFieldValue('tinh', value)
    onResultChange(JSON.stringify(bbox1))
  };

  const onResultChange = (bbox1) => {
      let obj = {
        region: selectRegion,
        tinh : selectTinh,
        huyen:selectHuyen, 
        bbox : bbox1
      }
      onResult(obj)
  }


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


  const renderMap = () => {
    map.current = new maplibregl.Map({
      container: "map_cf",
      center: [108.485, 16.449],
      zoom: 5.43,
    } as MapOptions);
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
        </Col>
        <Col span={12}>
          <div id="map_cf" style={{ width: "100%", height: "100%" }}></div>
        </Col>
      </Row>
    </>
  );
}
