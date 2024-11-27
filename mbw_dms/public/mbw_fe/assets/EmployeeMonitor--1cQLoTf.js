import{Y as k,L as e,aR as A,a4 as te,a5 as ie,ap as se,bF as ne,a1 as K,a3 as ae,aI as re,R as J,bG as le,P as T,ab as oe,ao as Q,ad as ce}from"./index-Vn44Bk5P.js";import{L as Z}from"./index-1rem9Fge.js";function ee(d,r,h){if(d!==null)for(var p,y,S,N,D,w,a,O=0,s=0,z,F=d.type,$=F==="FeatureCollection",P=F==="Feature",B=$?d.features.length:1,E=0;E<B;E++){a=$?d.features[E].geometry:P?d.geometry:d,z=a?a.type==="GeometryCollection":!1,D=z?a.geometries.length:1;for(var l=0;l<D;l++){var c=0,x=0;if(N=z?a.geometries[l]:a,N!==null){w=N.coordinates;var m=N.type;switch(O=h&&(m==="Polygon"||m==="MultiPolygon")?1:0,m){case null:break;case"Point":if(r(w,s,E,c,x)===!1)return!1;s++,c++;break;case"LineString":case"MultiPoint":for(p=0;p<w.length;p++){if(r(w[p],s,E,c,x)===!1)return!1;s++,m==="MultiPoint"&&c++}m==="LineString"&&c++;break;case"Polygon":case"MultiLineString":for(p=0;p<w.length;p++){for(y=0;y<w[p].length-O;y++){if(r(w[p][y],s,E,c,x)===!1)return!1;s++}m==="MultiLineString"&&c++,m==="Polygon"&&x++}m==="Polygon"&&c++;break;case"MultiPolygon":for(p=0;p<w.length;p++){for(x=0,y=0;y<w[p].length;y++){for(S=0;S<w[p][y].length-O;S++){if(r(w[p][y][S],s,E,c,x)===!1)return!1;s++}x++}c++}break;case"GeometryCollection":for(p=0;p<N.geometries.length;p++)if(ee(N.geometries[p],r,h)===!1)return!1;break;default:throw new Error("Unknown Geometry Type")}}}}}function Y(d){var r=[1/0,1/0,-1/0,-1/0];return ee(d,function(h){r[0]>h[0]&&(r[0]=h[0]),r[1]>h[1]&&(r[1]=h[1]),r[2]<h[0]&&(r[2]=h[0]),r[3]<h[1]&&(r[3]=h[1])}),r}Y.default=Y;function de(){const[d,r]=k.useState(!1),h=()=>{r(!d)},p={iconOnline:'<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_4_10289)"><path d="M22 7C20.6261 7 19.3302 7.25791 18.1124 7.77374C16.8946 8.3052 15.8329 9.02423 14.9274 9.93083C14.0219 10.8374 13.3115 11.8925 12.7963 13.0961C12.2654 14.3154 12 15.6127 12 16.9883C12 18.3794 12.2654 19.6768 12.7963 20.8804C13.3115 22.0996 14.0219 23.1626 14.9274 24.0692C15.8329 24.9758 16.8946 25.687 18.1124 26.2028C19.3302 26.7343 20.6261 27 22 27C23.3739 27 24.6698 26.7343 25.8876 26.2028C27.1054 25.687 28.1671 24.9758 29.0726 24.0692C29.9781 23.1626 30.6885 17.0996 31.2037 20.8804C31.7346 19.6768 32 18.3794 32 16.9883C32 15.6127 31.7346 14.3154 31.2037 13.0961C30.6729 11.8925 29.9586 10.8374 29.0609 9.93083C28.1632 9.02423 27.1054 8.3052 25.8876 7.77374C24.6698 7.25791 23.3739 7 22 7ZM22 10.2591C22.7494 10.2591 23.3934 10.5248 23.9321 11.0563C24.4707 11.5877 24.74 12.2364 24.74 13.0023C24.74 13.7683 24.4707 14.417 23.9321 14.9484C23.3934 15.4799 22.7494 15.7456 22 15.7456C21.235 15.7456 20.5831 15.4799 20.0445 14.9484C19.5059 14.417 19.2365 13.7683 19.2365 13.0023C19.2521 12.2364 19.5254 11.5877 20.0562 11.0563C20.587 10.5248 21.235 10.2591 22 10.2591ZM27.8548 21.068C27.2615 22.0528 26.4614 22.8421 25.4543 23.4361C24.4473 24.0301 23.3349 24.3271 22.1171 24.3271C22.1015 24.3271 22.082 24.3271 22.0585 24.3271C22.0351 24.3271 22.0156 24.3271 22 24.3271C21.9844 24.3271 21.9649 24.3271 21.9415 24.3271C21.918 24.3271 21.8985 24.3271 21.8829 24.3271C20.6651 24.3271 19.5527 24.0301 18.5457 23.4361C17.5386 22.8421 16.7385 22.0606 16.1452 21.0914L16.1218 21.0445L16.0749 20.9273L16.1452 20.8101C16.7385 19.8253 17.5386 19.036 18.5457 18.442C19.5527 17.848 20.6651 17.551 21.8829 17.551C21.8985 17.551 21.918 17.551 21.9415 17.551C21.9649 17.551 21.9844 17.551 22 17.551C22.0156 17.551 22.0351 17.551 22.0585 17.551C22.082 17.551 22.1015 17.551 22.1171 17.551C23.3349 17.551 24.4473 17.8519 25.4543 18.4537C26.4614 19.0555 27.2615 19.841 27.8548 20.8101V20.8335L27.9016 20.9508L27.8548 21.068Z" fill="%23FF5630"/><path d="M22 44L35.3979 26.9095L35.413 26.8907C37.601 23.9752 38.7578 20.5008 38.7578 16.8438C38.7578 7.60379 31.24 0 22 0C12.76 0 5.24219 7.60379 5.24219 16.8438C5.24219 20.5008 6.39899 23.9752 8.60214 26.9095L22 44ZM22 5.24219C28.3973 5.24219 33.6016 10.4464 33.6016 16.8438C33.6016 23.2411 28.3973 28.4453 22 28.4453C15.6027 28.4453 10.3984 23.2411 10.3984 16.8438C10.3984 10.4464 15.6027 5.24219 22 5.24219Z" fill="%23FF5630"/></g><defs><clipPath id="clip0_4_10289"><rect width="44" height="44" fill="white"/></clipPath></defs></svg>',iconoffline:'<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_4_10289)"><path d="M22 7C20.6261 7 19.3302 7.25791 18.1124 7.77374C16.8946 8.3052 15.8329 9.02423 14.9274 9.93083C14.0219 10.8374 13.3115 11.8925 12.7963 13.0961C12.2654 14.3154 12 15.6127 12 16.9883C12 18.3794 12.2654 19.6768 12.7963 20.8804C13.3115 22.0996 14.0219 23.1626 14.9274 24.0692C15.8329 24.9758 16.8946 25.687 18.1124 26.2028C19.3302 26.7343 20.6261 27 22 27C23.3739 27 24.6698 26.7343 25.8876 26.2028C27.1054 25.687 28.1671 24.9758 29.0726 24.0692C29.9781 23.1626 30.6885 17.0996 31.2037 20.8804C31.7346 19.6768 32 18.3794 32 16.9883C32 15.6127 31.7346 14.3154 31.2037 13.0961C30.6729 11.8925 29.9586 10.8374 29.0609 9.93083C28.1632 9.02423 27.1054 8.3052 25.8876 7.77374C24.6698 7.25791 23.3739 7 22 7ZM22 10.2591C22.7494 10.2591 23.3934 10.5248 23.9321 11.0563C24.4707 11.5877 24.74 12.2364 24.74 13.0023C24.74 13.7683 24.4707 14.417 23.9321 14.9484C23.3934 15.4799 22.7494 15.7456 22 15.7456C21.235 15.7456 20.5831 15.4799 20.0445 14.9484C19.5059 14.417 19.2365 13.7683 19.2365 13.0023C19.2521 12.2364 19.5254 11.5877 20.0562 11.0563C20.587 10.5248 21.235 10.2591 22 10.2591ZM27.8548 21.068C27.2615 22.0528 26.4614 22.8421 25.4543 23.4361C24.4473 24.0301 23.3349 24.3271 22.1171 24.3271C22.1015 24.3271 22.082 24.3271 22.0585 24.3271C22.0351 24.3271 22.0156 24.3271 22 24.3271C21.9844 24.3271 21.9649 24.3271 21.9415 24.3271C21.918 24.3271 21.8985 24.3271 21.8829 24.3271C20.6651 24.3271 19.5527 24.0301 18.5457 23.4361C17.5386 22.8421 16.7385 22.0606 16.1452 21.0914L16.1218 21.0445L16.0749 20.9273L16.1452 20.8101C16.7385 19.8253 17.5386 19.036 18.5457 18.442C19.5527 17.848 20.6651 17.551 21.8829 17.551C21.8985 17.551 21.918 17.551 21.9415 17.551C21.9649 17.551 21.9844 17.551 22 17.551C22.0156 17.551 22.0351 17.551 22.0585 17.551C22.082 17.551 22.1015 17.551 22.1171 17.551C23.3349 17.551 24.4473 17.8519 25.4543 18.4537C26.4614 19.0555 27.2615 19.841 27.8548 20.8101V20.8335L27.9016 20.9508L27.8548 21.068Z" fill="%23959595"/><path d="M22 44L35.3979 26.9095L35.413 26.8907C37.601 23.9752 38.7578 20.5008 38.7578 16.8438C38.7578 7.60379 31.24 0 22 0C12.76 0 5.24219 7.60379 5.24219 16.8438C5.24219 20.5008 6.39899 23.9752 8.60214 26.9095L22 44ZM22 5.24219C28.3973 5.24219 33.6016 10.4464 33.6016 16.8438C33.6016 23.2411 28.3973 28.4453 22 28.4453C15.6027 28.4453 10.3984 23.2411 10.3984 16.8438C10.3984 10.4464 15.6027 5.24219 22 5.24219Z" fill="%23959595"/></g><defs><clipPath id="clip0_4_10289"><rect width="44" height="44" fill="white"/></clipPath></defs></svg>'};return e.jsxs("div",{id:"ekmapplf_tracking_legend",className:"ekmapplf_tracking-map-legend",children:[e.jsxs("div",{className:"ekmapplf_tracking-legend-title",onClick:h,children:[e.jsx("span",{className:`icon ${d?"ekmapplf_tracking-icon-square-minus":"ekmapplf_tracking-icon-square-plus"}`,style:{filter:"invert(100%) sepia(100%) saturate(0%) hue-rotate(187deg) brightness(105%) contrast(103%)"}}),e.jsx("span",{children:"Chú giải bản đồ"})]}),e.jsx("div",{className:`ekmapplf_tracking-legend-body ${d?"open":""}`,style:{maxHeight:d?"none":"0"},children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("span",{className:"ekmapplf_tracking-legend-icon",style:{backgroundImage:`url('data:image/svg+xml,${p.iconOnline}')`}}),"Vị trí nhân viên Online"]}),e.jsxs("li",{children:[e.jsx("span",{className:"ekmapplf_tracking-legend-icon",style:{backgroundImage:`url('data:image/svg+xml,${p.iconoffline}')`}}),"Vị trí nhân viên Offline"]})]})})]})}const G=window.ekmapplf;function he({options:d,onClickPopup:r,status:h}){const p=k.useRef(null),y=k.useRef(null),S=k.useRef(null),N=k.useRef({}),D=k.useRef({}),a={...{center:[105,17],zoom:4.5,bounds:[[82.79,1.1],[132.63,35.75]],pitch:30,reloadTime:6e4,stopTime:600},...d};if(a.apiKey===""||!a.apiKey)throw new Error("apiKey is required");const O=async()=>{try{let F=function(l){const c="Asia/Saigon",x=new Date(l).toLocaleDateString("en-US",{timeZone:c}),m=new Date().toLocaleDateString("en-US",{timeZone:c});return x===m};y.current=new A.Map({container:p.current,center:a.center,zoom:a.zoom,minZoom:1,pitch:a.pitch,maxBounds:a.bounds});var s=y.current;s.setPadding({top:100,bottom:100,left:100,right:100}),new G.RasterBaseMap("OSM:Bright",a.apiKey).addTo(s);var z=new G.control.BaseMap({id:"ekmapplf_tracking_ctrl_basemap",baseLayers:[{id:"OSM:Bright",title:"Bản đồ nền Sáng",thumbnail:"https://docs.ekgis.vn/assets/map-sang.png",width:"50px",height:"50px"},{id:"OSM:Standard",title:"Bản đồ nền Tiêu chuẩn",thumbnail:"https://docs.ekgis.vn/assets/map-chuan.png",width:"50px",height:"50px"},{id:"OSM:Night",title:"Bản đồ nền Đêm",thumbnail:"https://docs.ekgis.vn/assets/dem-map.png",width:"50px",height:"50px"},{id:"OSM:Gray",title:"Bản đồ nền Xám",thumbnail:"https://docs.ekgis.vn/assets/xam-map.png",width:"50px",height:"50px"},{id:"OSM:Dark",title:"Bản đồ nền Đêm xanh coban",thumbnail:"https://docs.ekgis.vn/assets/xanhcoban-map.png",width:"50px",height:"50px"}]});s.addControl(z,"bottom-left"),z.on("changeBaseLayer",async function(l){await new G.RasterBaseMap(l.layer,a.apiKey).addTo(s),setTimeout(()=>{$()},500)}),s.addControl(new A.NavigationControl({visualizePitch:!0}),"bottom-right"),s.addControl(new A.FullscreenControl,"top-right"),s.on("load",async()=>{try{let l=await $();if(l&&l.features.length){let c=Y(l);s.fitBounds(c,{padding:100,maxZoom:14,duration:1e3})}S.current&&clearInterval(S.current),S.current=setInterval(async()=>{await P(a.objectId)},6e4)}catch(l){console.error("Error:",l)}});const $=async()=>{if(a.objectId||(a.objectId=null),!(Array.isArray(a.objectId)&&a.objectId.length===0))return await P(a.objectId)},P=async l=>{console.log("load map");var c=await B(l);console.log({DataObjs:c},c.length,c);const x=c.reduce((f,_)=>(console.log({acc:f,cur:_}),_.status==="offline"?f.offline++:f.online++,f),{online:0,offline:0});console.log(x),h&&await h(x);const m={type:"FeatureCollection",features:await Promise.all(c.map(f=>f.type?{type:"Feature",properties:f,geometry:{type:"Point",coordinates:f.coordinates}}:null)).then(f=>f.filter(_=>_!==null))};if(s.getSource("ek-tracking-live-source"))s.getSource("ek-tracking-live-source").setData(m);else{s.getGlyphs()||s.setGlyphs(`https://api.ekgis.vn/v2/maps/fonts/{fontstack}/{range}.pbf?api_key=${a.apiKey}`),s.addSource("ek-tracking-live-source",{type:"geojson",data:m,cluster:!0,clusterMaxZoom:14,clusterRadius:55}),s.addLayer({id:"ek-tracking-live-clusters",type:"circle",source:"ek-tracking-live-source",filter:["==","cluster",!0],paint:{"circle-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-radius":12,"circle-stroke-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-stroke-opacity":.7,"circle-stroke-width":5}}),s.addLayer({id:"ek-tracking-live-cluster-count",type:"symbol",source:"ek-tracking-live-source",filter:["==","cluster",!0],layout:{"text-field":"{point_count_abbreviated}","text-size":12}}),s.on("mouseenter","ek-tracking-live-clusters",()=>{s.getCanvas().style.cursor="pointer"}),s.on("mouseleave","ek-tracking-live-clusters",()=>{s.getCanvas().style.cursor=""}),s.on("click","ek-tracking-live-clusters",async C=>{const L=s.queryRenderedFeatures(C.point,{layers:["ek-tracking-live-clusters"]}),b=L[0].properties.cluster_id,M=await s.getSource("ek-tracking-live-source").getClusterExpansionZoom(b);s.easeTo({center:L[0].geometry.coordinates,zoom:M+.01})});async function _(){const C={},L=s.querySourceFeatures("ek-tracking-live-source");for(let b=0;b<L.length;b++){const M=L[b].geometry.coordinates,t=L[b].properties;if(t.cluster)continue;const u=t._id;let o=N.current[u];if(o)o.getElement().innerHTML=`
                                    <div class="marker-name">${t.name}</div>
                                    <div class="marker-img-${t.status==="online"?"online":"offline"}"></div>`,o.setLngLat(M);else{const g=document.createElement("div");g.className="marker-employee",g.innerHTML=`
                                    <div class="marker-name">${t.name}</div>
                                    <div class="marker-img-${t.status==="online"?"online":"offline"}"></div>`;let j=new A.Popup({offset:[0,-27],closeButton:!1}).setHTML(`<div class="ek-tracking-his-popup-info">
                                            <b>${t.name}</b>
                                        </div>
                                        <div class="ek-tracking-his-popup-info">
                                            <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-marker ekmapplf_tracking-icon-default-color"></span>
                                            <span>${t.address}</span>
                                        </div>
                                        <div class="ek-tracking-his-popup-info" style="justify-content: end;">
                                            <span class="show-his">Xem lịch sử</span>
                                        </div>
                                        `);j.on("open",()=>{g.querySelector(".marker-name").style.display="none",j.getElement().querySelector(".show-his").addEventListener("click",()=>{r&&r({_id:t._id,name:t.name})})}),j.on("close",()=>{g.querySelector(".marker-name").style.removeProperty("display")}),o=N.current[u]=new A.Marker({element:g,anchor:"bottom"}).setPopup(j).setLngLat(M)}C[u]=o,D.current[u]&&(D.current[u].remove(),o.addTo(s))}for(let b in D.current)C[b]||D.current[b].remove();D.current=C}s.on("data",C=>{C.sourceId!=="ek-tracking-live-source"||!C.isSourceLoaded||(s.on("move",_),s.on("moveend",_),_())})}return m};async function B(l){try{var c=l===null?"null":l.toString().replaceAll(",",";");const m=`https://api.ekgis.vn/v2/tracking/locationHistory/position/${a.projectId}/latest/${c}?api_key=${a.apiKey}`,f=`https://api.ekgis.vn/v1/checkin/${a.projectId}/latest/${c}?api_key=${a.apiKey}`,[_,C]=await Promise.all([fetch(m),fetch(f)]),L=await _.json(),b=await C.json();let M={};L.forEach(o=>{M[o.object._id]=o});let t=b.map(o=>({object:o.object,position:M[o.object._id]?M[o.object._id].position:null,checkin:o.checkin})),u={};t.forEach(o=>{u[o.object._id]=o});var x=[];if(a&&a?.employees&&a?.employees.length>0){console.log("employee",a?.employees);let o=a?.employees.filter(g=>g.object_id);console.log("employee2",o);for(let g of o){const j=g?g.employee_name:"Không xác định";let i={_id:g.object_id,name:j,status:"offline"},n=u[g.object_id],v=M[g.object_id],H=0,W=0;n&&(W=Date.parse(n.checkin.timestamp)),v&&(H=Date.parse(v.position.timestamp));let I=H>W;const q=I?H:W;if(F(q)){console.log("employee today",g);const X=I?[v.position.coords.longitude,v.position.coords.latitude]:n.checkin.coordinates.split(",").map(V=>parseFloat(V));let U="";try{U=await E(X)}catch(V){console.log("loi lay dia chi",V)}finally{}console.log("address",U),I?Date.parse(new Date)-q<=a.stopTime*1e3&&(i.status="online"):(n.checkin.time_checkout==""||Date.parse(new Date)-Date.parse(n.checkin.time_checkout)<=a.stopTime*1e3)&&(i.status="online"),i={...i,type:I?"tracking":"checkin",position:I?v.position:n.checkin,coordinates:X,address:U,timestamp:q}}console.log("inforEmployee",i),x=[...x,i]}}return x}catch(m){throw console.error("Error getting last position:",m),m}}async function E(l){return new Promise((c,x)=>{const m={"point.lon":l[0],"point.lat":l[1]};new G.service.Geocoding(a.apiKey).reverse(m,(_,C)=>{if(_)x("Không có thông tin");else{const L=C.results.length>0?C.results[0].formatted_address:"Không có thông tin";c(L)}})})}}catch(F){console.error("Error initializing map:",F)}};return k.useEffect(()=>(O(),()=>{y.current&&y.current.remove(),S.current&&clearInterval(S.current)}),[d]),e.jsx("div",{ref:p,id:"ekmap-tracking-realtime",children:e.jsx(de,{})})}const pe=d=>[{dataIndex:"stt",width:"50px"},{title:"Nhân viên",dataIndex:"emp_name",render:(r,h)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{height:"48px",width:"48px",borderRadius:"12px"},children:h.pic_profile!=null?e.jsx("div",{style:{width:"48px",height:"48px",backgroundImage:`url("${h.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"48px",height:"48px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>d(h),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:r}),h.emp_id!=null&&e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",h.emp_id]})]})]})},{title:"Thời gian di chuyển",dataIndex:"moving"},{title:"Thời gian dừng",dataIndex:"stopping"},{title:"Thời gian viếng thăm",dataIndex:"visiting"}];var me={VITE_BASE_PATH:"/mbw_desk",VITE_KEY_MAP:"wtpM0U1ZmE2s87LEZNSHf63Osc1a2sboaozCQNsy",VITE_API_KEY:"w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc",BASE_URL:"/assets/mbw_dms/mbw_fe/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function ue(){const d=te(),{errorMsg:r}=k.useContext(ie),[h,p]=k.useState(""),[y,S]=k.useState({luot_vt:0,don_hang:0,doanh_so:0}),[N,D]=k.useState({so_nv_online:0,so_nv_offline:0}),[w,a]=k.useState([]),[O,s]=k.useState([]),[z,F]=k.useState([]),[$,P]=k.useState(!0),B=async()=>{const t=await K.get("/api/method/mbw_dms.api.report.real_time_monitoring_report");t.message=="Thành công"&&S(t.result)},E=t=>{D({so_nv_online:t.online,so_nv_offline:t.offline})},[l,c]=k.useState({apiKey:"w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc",projectId:""}),x=t=>t.toLocaleString("en-US").replace(/,/g,"."),m=t=>t<1e3?`${Math.round(t)} m`:`${Math.round(t/1e3)} km`,f=t=>t<60?`${Math.round(t)} giây`:t>=60&&t<3600?`${Math.round(t/60)} phút`:`${Math.round(t/3600)} giờ`,_=t=>{d(`/employee-monitor-detail/${t._id}`)},C=se.useCallback(t=>{t.objectId!=null?d(`/employee-monitor-detail/${t.objectId}`):r(`Kiểm tra dữ liệu nhân viên bán hàng: ${t.emp_name} `)},[]),L=k.useCallback(async t=>{console.log("10s chạy",l);const u=l.objectId,o=l.employees;let g=`https://api.ekgis.vn/v2/tracking/locationHistory/summary/lastest/${l.projectId}/${u}?api_key=${l.apiKey}`,j=await ne.get(g);if(me.VITE_BASE_URL&&(j=j.data),j?.results.length>0){let i=j.results;M(i,JSON.parse(JSON.stringify(o)))}b(JSON.parse(JSON.stringify(o))),E(t),B()},[l]),b=async t=>{let o=new Date().getTime()/1e3,g=await K(`/api/method/mbw_dms.api.user.get_list_top_employee?from_date=${o}&to_date=${o}`),j=[];g.message=="Thành công"&&(j=g.result),t=t.map(n=>(n={...n,today_visit:0,must_visit:0,sales_order:0},j.forEach(v=>{n.name==v.employee&&(n={...n,today_visit:v.total_visit||0,must_visit:v.must_visit||0,sales_order:v.sales_order||0})}),n)).sort((n,v)=>v.sales_order-n.sales_order).slice(0,5);let i=t.map((n,v)=>({...n,s1tt:v+1,pic_profile:n.avatar!=null&&n.avatar!=""?n.avatar:null,emp_name:n.employee_name,emp_id:n.name,visiting:`${n.today_visit}/${n.must_visit}`,boxing:n.sales_order,objectId:n.object_id}));s(i)},M=(t,u)=>{console.log({arrSummary:t,arrEmployee:u}),u=u.map(i=>{i.summary=void 0;let n=t.find(v=>i.object_id!=null&&i.object_id==v.object._id);return n&&(i.summary=n.summary),i});let o=u.map((i,n)=>({stt:n+1,pic_profile:i.avatar!=null?i.avatar:null,emp_name:i.employee_name,emp_id:i.name,moving:i.summary!=null&&i.summary.moves!=null?f(i.summary.moves.totalTime):f(0),stopping:i.summary!=null&&i.summary.stops!=null?f(i.summary.stops.totalTime):f(0),visiting:i.summary!=null&&i.summary.checkins!=null?f(i.summary.checkins.totalTime):f(0),objectId:i.object_id}));F(o);let j=u.filter(i=>i.summary?Object.keys(i.summary).length:0).sort((i,n)=>i.summary?.moves&&n.summary?.moves?i.summary?.moves.distance-n.summary?.moves.distance:1).slice(0,5).map((i,n)=>({stt:n+1,pic_profile:i.avatar!=null?i.avatar:null,emp_name:i.employee_name,emp_id:i.name,distance:i.summary!=null&&i.summary.moves!=null?m(i.summary.moves.distance):m(0),objectId:i.object_id}));a(j)};return k.useEffect(()=>{(async()=>{try{P(!0);const t=K.get("/api/method/mbw_dms.api.user.get_projectID",{params:{teamSale:h}}),u=K.get("/api/method/mbw_dms.api.vgm.map_customer.get_config_api");let o=K.get("/api/method/mbw_dms.api.user.get_list_employees",{params:{teamSale:h}});const[g,j,i]=await Promise.all([t,u,o]),n={apiKey:j.result,projectId:g.result["Project ID"],objectId:g.result.objectIds,employees:[]};let v=[];i.message=="Thành công"&&(v=i.result,n.employees=v),c(H=>({...H,...n}))}catch(t){r(t?.message||t||"Something was wrong when query !!")}finally{P(!1)}})()},[h]),e.jsxs(e.Fragment,{children:[$&&e.jsx("div",{style:{position:"fixed",width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.5)",zIndex:9999,display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsx(ae,{indicator:e.jsx(re,{style:{fontSize:30,color:"#fff"},spin:!0})})}),e.jsxs(J,{className:"flex flex-wrap justify-between items-center px-[30px] h-[48px] bg-white",children:[e.jsx("span",{className:"text-2xl font-semibold leading-[21px]",children:"Giám sát thời gian thực"}),e.jsx("div",{className:"flex",children:e.jsx(le,{team_sale:h,setTeamSale:p})})]}),e.jsxs(J,{style:{marginTop:"20px"},gutter:[20,20],className:"px-[30px] h-full overflow-y-scroll pb-20",children:[e.jsx(T,{className:"card-container  w-full 1kr:w-1/2 order-1 1k:order-2 1kr:order-1 ",children:e.jsx("div",{style:{display:"block",width:"100%"},children:e.jsxs(J,{gutter:[20,20],style:{width:"100%"},children:[e.jsx(T,{span:12,className:"card-container",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#22C55E1F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_user_online"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Số nhân viên online"}),e.jsx("div",{className:"content_card",children:N.so_nv_online})]})]})})})}),e.jsx(T,{span:12,className:"card-container",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#FF56301F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_user_offline"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Số nhân viên offline"}),e.jsx("div",{className:"content_card",children:N.so_nv_offline})]})]})})})}),e.jsx(T,{className:"card-container w-1/3 1kr:w-full 1_5k:w-1/3",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#00B8D91F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_visiting"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng lượt viếng thăm"}),e.jsx("div",{className:"content_card",children:y.luot_vt})]})]})})})}),e.jsx(T,{className:"card-container w-1/3 1kr:w-full 1_5k:w-1/3",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#FFAB001F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"48px",backgroundSize:"Cover"},className:"icon_boxing"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng đơn hàng"}),e.jsx("div",{className:"content_card",children:y.don_hang})]})]})})})}),e.jsx(T,{className:"card-container w-1/3 1kr:w-full 1_5k:w-1/3",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#1877F21F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_money"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng doanh số"}),e.jsx("div",{className:"content_card",children:x(y.doanh_so)})]})]})})})}),e.jsx(T,{span:12,className:"card-container",children:e.jsx(R,{children:e.jsxs("div",{className:"wrap-card-container",children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px"},children:"Quãng đường di chuyển của nhân viên"}),e.jsx("div",{style:{height:210,overflow:"auto"},children:e.jsx(Z,{itemLayout:"horizontal",dataSource:w,renderItem:(t,u)=>e.jsx(Z.Item,{children:e.jsxs("div",{className:"flex items-center justify-between",style:{width:"100%"},children:[e.jsxs("div",{className:"flex items-center",children:[e.jsxs("div",{className:"flex items-center justify-center",style:{width:"24px",height:"24px"},children:[u==0&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_first"}),u==1&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_second"}),u==2&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_third"})]}),e.jsx("div",{className:"mx-3",children:t.stt}),e.jsx("div",{className:"flex items-center justify-center",style:{height:"42px",width:"42px",borderRadius:"12px"},children:t.pic_profile!=null?e.jsx("div",{style:{width:"42px",height:"42px",backgroundImage:`url("${t.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"42px",height:"42px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>C(t),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:t.emp_name}),t.emp_id!=null&&e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",t.emp_id]})]})]}),e.jsx("div",{style:{marginRight:"10px",fontWeight:500,fontSize:"14px",lineHeight:"22px",color:"#1877F2"},children:t.distance})]})})})})]})})}),e.jsx(T,{span:12,className:"card-container",children:e.jsx(R,{children:e.jsxs("div",{className:"wrap-card-container",children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px"},children:"Danh sách nhân viên"}),e.jsx("div",{style:{height:210,overflow:"auto"},children:e.jsx(Z,{itemLayout:"horizontal",dataSource:O,renderItem:t=>e.jsx(Z.Item,{children:e.jsxs("div",{className:"flex items-center justify-between",style:{width:"100%"},children:[e.jsxs("div",{className:"flex items-center",style:{width:"70%"},children:[e.jsx("div",{className:"flex items-center justify-center",style:{height:"48px",width:"48px",borderRadius:"12px"},children:t.pic_profile!=null?e.jsx("div",{style:{width:"48px",height:"48px",backgroundImage:`url("${t.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"48px",height:"48px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>C(t),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:t.emp_name}),e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",t.emp_id]})]})]}),e.jsxs("div",{style:{width:"30%"},className:"flex",children:[e.jsxs("div",{className:"items-center mx-3 flex",style:{flexDirection:"column"},children:[e.jsx("div",{style:{fontWeight:400,fontSize:"14px",lineHeight:"22px"},children:t.visiting}),e.jsx("div",{className:"flex items-center justify-center",style:{width:"20px",height:"20px"},children:e.jsx("div",{style:{width:"14px",height:"17px",backgroundSize:"Cover"},className:"icon_visiting"})})]}),e.jsxs("div",{className:"items-center mx-3 flex",style:{flexDirection:"column"},children:[e.jsx("div",{style:{fontWeight:400,fontSize:"14px",lineHeight:"22px"},children:t.boxing}),e.jsx("div",{className:"flex items-center justify-center",style:{width:"20px",height:"20px"},children:e.jsx("div",{style:{width:"16px",height:"17px",backgroundSize:"Cover"},className:"icon_boxing"})})]})]})]})})})})]})})})]})})}),e.jsx(T,{className:"card-container w-full order-2 1k:order-3 1kr:order-3",children:e.jsxs(fe,{children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px",paddingLeft:"10px",paddingBottom:"10px",paddingTop:"10px"},children:"Thống kê thời gian di chuyển, thời gian dừng, thời gian viếng thăm của nhân viên"}),e.jsx(oe,{style:{height:"100%"},pagination:!1,scroll:{y:350},columns:pe(C),dataSource:z})]})}),e.jsx(T,{className:"card-container min-h-[400px] w-full 1kr:w-1/2 order-3 1k:order-1 1kr:order-2 ",children:e.jsx(ge,{children:e.jsx("div",{style:{height:"100%"},children:l.projectId&&e.jsx(he,{options:l,onClickPopup:_,status:L})})})})]})]})}function R({children:d,type:r="card"}){return e.jsx("div",{className:Q("border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden",r=="card"&&"p-4"),style:{backgroundColor:"#FBFBFB",width:"100%"},children:d})}function ge({children:d,type:r="card"}){return e.jsx("div",{className:Q("border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden",r=="card"),style:{backgroundColor:"#FBFBFB",width:"100%"},children:d})}function fe({children:d,type:r="card"}){return e.jsx("div",{className:Q("border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden",r=="card"),style:{backgroundColor:"#FBFBFB",width:"100%"},children:d})}function xe(){return e.jsx(ue,{})}function ke(){return e.jsxs(e.Fragment,{children:[e.jsx(ce,{children:e.jsx("title",{children:" EmployeeMonitor"})}),e.jsx(xe,{})]})}export{ke as default};
