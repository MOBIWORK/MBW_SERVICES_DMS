import React, {
  useRef,
  useEffect,
  LegacyRef,
  useState,
  useCallback,
} from "react";
import maplibregl, { MapOptions } from "maplibre-gl";
import extend from "xtend";
import bbox from "@turf/bbox";
import "./map_realtime.css";
import MapLegend from "./maplegend_realtime";
import { functionType } from "@/types/dashboard";
import { employeeType } from "../mapEkgis/realtime/types";
import {
  connect,
  StringCodec,
} from "https://cdn.jsdelivr.net/npm/nats.ws@1.29.2/+esm";
// import { connect, StringCodec } from "nats";
import { message } from "antd";
import { isToday, reverseGeocode } from "@/util";
import { employeeFeatureType, TypeRealtimeEmployee } from "@/types/map";
interface RealtimeProp {
  options: any;
  onClickPopup: functionType;
  status: functionType;
  info: functionType;
}
const ekmapplf = window.ekmapplf;


function RealtimeMap({ options, onClickPopup, status, info }: RealtimeProp) {
  const sc = StringCodec();
  const [realtimeEmployee, setRealTimeEmployee] =
    useState<TypeRealtimeEmployee>();
  const mapContainer = useRef<any>(null);
  const [dataFeature,setDataFeature] = useState<employeeFeatureType[]>([])
  const map = useRef<any>(null);
  const realtimeSub = useRef<any>(null);
  const intervalIdRef = useRef<any>(null);

  const markers = useRef<any>({});
  const markersOnScreen = useRef<any>({});

  const defaultOptions = {
    center: [105, 17],
    zoom: 4.5,
    bounds: [
      [82.79, 1.1], // Southwest coordinates
      [132.63, 35.75], // Northeast coordinates
    ],
    pitch: 30,
    reloadTime: 60000,
    stopTime: 600,
  };
  const _options = { ...defaultOptions, ...options };
  if (_options.apiKey === "" || !_options.apiKey)
    throw new Error("apiKey is required");

  const initializeMap = async () => {
    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        center: _options.center,
        zoom: _options.zoom,
        minZoom: 1,
        pitch: _options.pitch,
        maxBounds: _options.bounds,
      } as MapOptions);

      var _map: any = map.current;
      // console.log(_map);
      _map.setPadding({ top: 100, bottom: 100, left: 100, right: 100 });

      new ekmapplf.RasterBaseMap("OSM:Bright", _options.apiKey).addTo(_map);
      // khởi tạo và add control base map
      var basemap = new ekmapplf.control.BaseMap({
        id: "ekmapplf_tracking_ctrl_basemap",
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
          {
            id: "OSM:Gray",
            title: "Bản đồ nền Xám",
            thumbnail: "https://docs.ekgis.vn/assets/xam-map.png",
            width: "50px",
            height: "50px",
          },
          {
            id: "OSM:Dark",
            title: "Bản đồ nền Đêm xanh coban",
            thumbnail: "https://docs.ekgis.vn/assets/xanhcoban-map.png",
            width: "50px",
            height: "50px",
          },
        ],
      });
      _map.addControl(basemap, "bottom-left");

      basemap.on("changeBaseLayer", async function (response: any) {
        await new ekmapplf.RasterBaseMap(response.layer, _options.apiKey).addTo(
          _map
        );
        setTimeout(() => {
          setMap();
        }, 500);
      });

      _map.addControl(
        new maplibregl.NavigationControl({ visualizePitch: true }),
        "bottom-right"
      );

      _map.addControl(new maplibregl.FullscreenControl(), "top-right");
      //end add control
      _map.on("load", async () => {
        try {
          let fc:any = await setMap();
          //focus
          if (fc && fc.features.length) {
            let bounds = bbox(fc);
            _map.fitBounds(bounds, {
              padding: 100,
              maxZoom: 14,
              duration: 1000,
            });
          }
          if (intervalIdRef.current) clearInterval(intervalIdRef.current);
          intervalIdRef.current = setInterval(async () => {
            await info();
            // await loadMap(_options.objectId);
          }, 30000);
        } catch (error) {
          console.error("Error:", error);
        }
      });

      // gọi qua loadmap
      const setMap = async () => {
        if (!_options.objectId) _options.objectId = null;
        if (Array.isArray(_options.objectId) && _options.objectId.length === 0)
          return;
        return await loadMap(_options.objectId);
      };

      // set số nv onl/off dash board, mark nhân viên lên bản đồ
      const loadMap = async (objectIds: any) => {
        // load map => gọi dịch vụ nhân viên onl/off
        var DataObjs = await getLastPos(objectIds);
        setDataFeature(DataObjs)
        // var DataObjs = await getLastPos(objectIds)

        // DataObjs = DataObjs.filter(item => item !== null)
        const statusCount = DataObjs.reduce(
          (acc, cur) => {
            console.log({ acc, cur });
            if (cur.status === "offline") {
              acc.offline++;
            } else {
              acc.online++;
            }
            return acc;
          },
          { online: 0, offline: 0 }
        );
        // set nhân viên onl/off
        if (status) await status(statusCount);

        // return FeatureCollection;
        await handleAddEmployeeToMap(DataObjs)
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };
  // xử lý trả về list nhân viên:onl/off, location
  const getLastPos = useCallback(
    async (objectIds: any) => {
      try {
        var str_ids =
          objectIds === null
            ? "null"
            : objectIds.toString().replaceAll(",", ";");
        const urlTracking = `https://api.ekgis.vn/v2/tracking/locationHistory/position/${_options.projectId}/latest/${str_ids}?api_key=${_options.apiKey}`;
        const urlCheckin = `https://api.ekgis.vn/v1/checkin/${_options.projectId}/latest/${str_ids}?api_key=${_options.apiKey}`;

        const [responseTracking, responseCheckin] = await Promise.all([
          fetch(urlTracking),
          fetch(urlCheckin),
        ]);

        // dữ liệu tracking cuối
        const DataTracking = await responseTracking.json();
        //dữ liệu checkin cuối
        const DataCheckin = await responseCheckin.json();

        
        let obj2Map: any = {};
        DataTracking.forEach((item: any) => {
          obj2Map[item.object._id] = item;
        });

        // hợp nhất dữ liệu tracking vào checkin
        let mergedArray = DataCheckin.map((item1: any) => ({
          object: item1.object,
          position: obj2Map[item1.object._id]
            ? obj2Map[item1.object._id].position
            : null,
          checkin: item1.checkin,
        }));

        let obj2Chckin: any = {};
        mergedArray.forEach((item_checkin: any) => {
          obj2Chckin[item_checkin.object._id] = item_checkin;
        });

        var results: any[] = [];
        if (_options && _options?.employees && _options?.employees.length > 0) {
        //   console.log("employee", _options?.employees);

          // lấy ds nhân viên có object id
          let employeeHasObjId = _options?.employees.filter(
            (employee: employeeType) => employee.object_id
          );
          
          for (let employee of employeeHasObjId) {
            const employee_name = employee
              ? employee.employee_name
              : "Không xác định";

            let inforEmployee: any = {
              _id: employee.object_id,
              name: employee_name, // name Nhân viên
              status: "offline",
            };

            let item_checkin = obj2Chckin[employee.object_id as string];
            let item_tracking = obj2Map[employee.object_id as string];
            // lấy bản ghi mới nhất để tính onl/off
            let endTimeTracking = 0;
            let endTimeCheckin = 0;
            if (item_checkin) {
              endTimeCheckin = Date.parse(item_checkin.checkin.timestamp);
            }
            if (item_tracking) {
              endTimeTracking = Date.parse(item_tracking.position.timestamp);
            }

            let isTracking = endTimeTracking > endTimeCheckin;
            const timestamp = isTracking ? endTimeTracking : endTimeCheckin;
            let today = isToday(timestamp);

            if (today) {
              console.log("employee today", employee);

              const coords = isTracking
                ? [
                    item_tracking.position.coords.longitude,
                    item_tracking.position.coords.latitude,
                  ]
                : item_checkin.checkin.coordinates
                    .split(",")
                    .map((coord: any) => parseFloat(coord));
              let address = "";
              try {
                address = await reverseGeocode(coords, ekmapplf, _options);
              } catch (error) {
                console.log("loi lay dia chi", error);
              }
              console.log("address", address);

              //>10p -> offl
              if (isTracking) {
                // là tracking so sánh timestamp
                if (
                  Date.parse(new Date()) - timestamp <=
                  _options.stopTime * 1000
                )
                  inforEmployee.status = "online";
              } else {
                //là checkin
                if (item_checkin.checkin.time_checkout == "")
                  inforEmployee.status = "online";
                else if (
                  Date.parse(new Date()) -
                    Date.parse(item_checkin.checkin.time_checkout) <=
                  _options.stopTime * 1000
                )
                  inforEmployee.status = "online";
              }

              inforEmployee = {
                ...inforEmployee, // name Nhân viên
                type: isTracking ? "tracking" : "checkin",
                position: isTracking
                  ? item_tracking.position
                  : item_checkin.checkin,
                coordinates: coords,
                address: address,
                timestamp: timestamp,
              };
            }

            results = [...results, inforEmployee];
          }
        }

        return results;
      } catch (error) {
        console.error("Error getting last position:", error);
        throw error;
      }
    },
    [_options]
  );


  // xử lý realtime vị trí
  const handleRealTimeFeature= useCallback((dataRealtime: TypeRealtimeEmployee)=> {
    setDataFeature((prev:employeeFeatureType[]) => {
        let employee_online =  _options.employees.find((employee:employeeType) => employee.object_id == dataRealtime.objectId)
        if(employee_online) {
            let employeeFeature:employeeFeatureType = {
                _id: employee_online.object_id,
                name: employee_online.employee_name || employee_online.name, // name Nhân viên
                status: "online",
                coordinates: [dataRealtime.longitude,dataRealtime.latitude],
                address: "",
                timestamp: dataRealtime.timestamp,
              }
              let findOld = prev?.find(empFeature => empFeature._id == employeeFeature._id)
              if(!findOld) {
                prev = [...prev,employeeFeature]
              }
              else {
                prev = prev.map((emp:employeeFeatureType) => {
                    if(emp._id == employeeFeature._id){
                        emp = employeeFeature
                    }
                    return emp
                } )
              }
        }

        return handleOnlOff(prev)
    })
  },[dataFeature,_options])

  const handleOnlOff = (listData:employeeFeatureType[]) => {
    return listData.map((emp:employeeFeatureType) => {
        if( Date.parse(new Date()) - emp.timestamp >= _options.stopTime * 100) {
            emp.status = "offline"
        }
        return emp
    })
  }
//   const  
  // hàm xử lý realtime nhận vào nhân viên realtime và mảng vị trí cuối
  async function handleAddEmployeeToMap(DataObjs:any) {
    if (map.current) {
      let _map: any = map.current;
      // let DataObjs = []
      // add nv vào bản đồ
      const FeatureCollection = {
        type: "FeatureCollection",
        features: await Promise.all(
          DataObjs.map((data:any) => {
            if (data.type) {
              return {
                type: "Feature",
                properties: data,
                geometry: {
                  type: "Point",
                  coordinates: data.coordinates,
                },
              };
            } else return null;
          })
        ).then((features) => features.filter((feature) => feature !== null)),
      };
      // console.log(FeatureCollection);

      if (_map.getSource(`ek-tracking-live-source`)) {
        _map.getSource(`ek-tracking-live-source`).setData(FeatureCollection);
      } else {
        let Glyphs = _map.getGlyphs();
        if (!Glyphs)
          _map.setGlyphs(
            `https://api.ekgis.vn/v2/maps/fonts/{fontstack}/{range}.pbf?api_key=${_options.apiKey}`
          );

        _map.addSource(`ek-tracking-live-source`, {
          type: "geojson",
          data: FeatureCollection,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 55,
        });

        //cluster
        _map.addLayer({
          id: `ek-tracking-live-clusters`,
          type: "circle",
          source: `ek-tracking-live-source`,
          // filter: ['has', 'point_count'],
          filter: ["==", "cluster", true],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#90D667",
              10,
              "#EFCD41",
              50,
              "#FF0012",
            ],
            "circle-radius": 12,
            "circle-stroke-color": [
              "step",
              ["get", "point_count"],
              "#90D667",
              10,
              "#EFCD41",
              50,
              "#FF0012",
            ],
            "circle-stroke-opacity": 0.7,
            "circle-stroke-width": 5,
          },
        });
        _map.addLayer({
          id: `ek-tracking-live-cluster-count`,
          type: "symbol",
          source: `ek-tracking-live-source`,
          // filter: ['has', 'point_count'],
          filter: ["==", "cluster", true],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-size": 12,
          },
        });

        _map.on("mouseenter", `ek-tracking-live-clusters`, () => {
          _map.getCanvas().style.cursor = "pointer";
        });
        _map.on("mouseleave", `ek-tracking-live-clusters`, () => {
          _map.getCanvas().style.cursor = "";
        });
        _map.on("click", `ek-tracking-live-clusters`, async (e:any) => {
          const features = _map.queryRenderedFeatures(e.point, {
            layers: [`ek-tracking-live-clusters`],
          });
          const clusterId = features[0].properties.cluster_id;
          const zoom = await _map
            .getSource(`ek-tracking-live-source`)
            .getClusterExpansionZoom(clusterId);
          _map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom + 0.01,
          });
        });

        _map.on("data", (e:any) => {
          if (e.sourceId !== `ek-tracking-live-source` || !e.isSourceLoaded)
            return;
          _map.on("move", updateMarkers);
          _map.on("moveend", updateMarkers);
          updateMarkers(_map);
        });
      }
    }
  }

  //uncluster
  async function updateMarkers(_map:any) {
    const newMarkers:{[key:string]:any} = {};
    const features = _map.querySourceFeatures(`ek-tracking-live-source`);
    for (let i = 0; i < features.length; i++) {
      const coords = features[i].geometry.coordinates;
      const props = features[i].properties;
      if (props.cluster) continue;
      const id = props._id;
      let marker = markers.current[id];

      if (marker) {
        marker.getElement().innerHTML = `
                                <div class="marker-name">${props.name}</div>
                                <div class="marker-img-${
                                  props.status === "online"
                                    ? "online"
                                    : "offline"
                                }"></div>`;
        marker.setLngLat(coords);
      } else {
        const el:any = document.createElement("div");
        el.className = "marker-employee";
        el.innerHTML = `
                                <div class="marker-name">${props.name}</div>
                                <div class="marker-img-${
                                  props.status === "online"
                                    ? "online"
                                    : "offline"
                                }"></div>`;
        let popup:any = new maplibregl.Popup({
          offset: [0, -27],
          closeButton: false,
        }).setHTML(
          `<div class="ek-tracking-his-popup-info">
                                        <b>${props.name}</b>
                                    </div>
                                    <div class="ek-tracking-his-popup-info">
                                        <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-marker ekmapplf_tracking-icon-default-color"></span>
                                        <span>${props.address}</span>
                                    </div>
                                    <div class="ek-tracking-his-popup-info" style="justify-content: end;">
                                        <span class="show-his">Xem lịch sử</span>
                                    </div>
                                    `
        );
        popup.on("open", () => {
          el.querySelector(".marker-name").style.display = "none";
          popup
            .getElement()
            .querySelector(".show-his")
            .addEventListener("click", () => {
              if (onClickPopup)
                onClickPopup({ _id: props._id, name: props.name });
            });
        });
        popup.on("close", () => {
          el.querySelector(".marker-name").style.removeProperty("display");
        });
        marker = markers.current[id] = new maplibregl.Marker({
          element: el,
          anchor: "bottom",
        })
          .setPopup(popup)
          .setLngLat(coords);
      }
      newMarkers[id] = marker;

      if (markersOnScreen.current[id]) {
        markersOnScreen.current[id].remove();
        marker.addTo(_map);
      }
    }

    for (let id in markersOnScreen.current) {
      if (!newMarkers[id]) markersOnScreen.current[id].remove();
    }
    markersOnScreen.current = newMarkers;
  }

  useEffect(() => {
    // connect và xử lý realtime
    let nc;
    (async () => {
      try {
        nc = await connect({
          servers: "wss://pubsub2.ekgis.vn:6069",
          user: "mobiwork",
          pass: "mbw@123",
        });
        // const sc = StringCodec();
        realtimeSub.current = nc.subscribe(
          `tracking_${_options.projectId}_latest.>`,
          {
            callback(err, m) {
              if (!err) {
                handleRealTimeFeature(JSON.parse(sc.decode(m.data)));                
              } else {
                console.error("loi sub", err);
              }
            },
            timeout: 3000,
          }
        );
      } catch (error) {
        console.log("Error", error);
      }
    })();
    initializeMap();

    return () => {
      if (map.current) map.current.remove();
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      if (realtimeSub.current) realtimeSub.current.unsubscribe();
      if (nc) nc.close();
    };
  }, [options]);

  useEffect(() => {
    handleAddEmployeeToMap(dataFeature)
  }, [dataFeature]);

  return (
    <div ref={mapContainer} id="ekmap-tracking-realtime">
      <MapLegend />
    </div>
  );
}

export default RealtimeMap;
