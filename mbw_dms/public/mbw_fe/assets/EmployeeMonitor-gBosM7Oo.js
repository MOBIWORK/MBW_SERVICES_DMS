import{bF as ee,Y as v,L as e,aR as Z,a4 as te,a5 as ie,a1 as A,bG as ne,a3 as se,aI as re,R as q,bH as ae,P as z,ab as le,ao as J,ad as oe}from"./index-xawKyFyX.js";import{L as K}from"./index-uQERbF7d.js";var ce=he,de=Object.prototype.hasOwnProperty;function he(){for(var o={},r=0;r<arguments.length;r++){var c=arguments[r];for(var d in c)de.call(c,d)&&(o[d]=c[d])}return o}const pe=ee(ce);function X(o,r,c){if(o!==null)for(var d,f,_,N,T,j,h,P=0,s=0,O,S=o.type,$=S==="FeatureCollection",B=S==="Feature",H=$?o.features.length:1,L=0;L<H;L++){h=$?o.features[L].geometry:B?o.geometry:o,O=h?h.type==="GeometryCollection":!1,T=O?h.geometries.length:1;for(var D=0;D<T;D++){var y=0,M=0;if(N=O?h.geometries[D]:h,N!==null){j=N.coordinates;var b=N.type;switch(P=c&&(b==="Polygon"||b==="MultiPolygon")?1:0,b){case null:break;case"Point":if(r(j,s,L,y,M)===!1)return!1;s++,y++;break;case"LineString":case"MultiPoint":for(d=0;d<j.length;d++){if(r(j[d],s,L,y,M)===!1)return!1;s++,b==="MultiPoint"&&y++}b==="LineString"&&y++;break;case"Polygon":case"MultiLineString":for(d=0;d<j.length;d++){for(f=0;f<j[d].length-P;f++){if(r(j[d][f],s,L,y,M)===!1)return!1;s++}b==="MultiLineString"&&y++,b==="Polygon"&&M++}b==="Polygon"&&y++;break;case"MultiPolygon":for(d=0;d<j.length;d++){for(M=0,f=0;f<j[d].length;f++){for(_=0;_<j[d][f].length-P;_++){if(r(j[d][f][_],s,L,y,M)===!1)return!1;s++}M++}y++}break;case"GeometryCollection":for(d=0;d<N.geometries.length;d++)if(X(N.geometries[d],r,c)===!1)return!1;break;default:throw new Error("Unknown Geometry Type")}}}}}function V(o){var r=[1/0,1/0,-1/0,-1/0];return X(o,function(c){r[0]>c[0]&&(r[0]=c[0]),r[1]>c[1]&&(r[1]=c[1]),r[2]<c[0]&&(r[2]=c[0]),r[3]<c[1]&&(r[3]=c[1])}),r}V.default=V;function ue(){const[o,r]=v.useState(!1),c=()=>{r(!o)},d={iconOnline:'<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_4_10289)"><path d="M22 7C20.6261 7 19.3302 7.25791 18.1124 7.77374C16.8946 8.3052 15.8329 9.02423 14.9274 9.93083C14.0219 10.8374 13.3115 11.8925 12.7963 13.0961C12.2654 14.3154 12 15.6127 12 16.9883C12 18.3794 12.2654 19.6768 12.7963 20.8804C13.3115 22.0996 14.0219 23.1626 14.9274 24.0692C15.8329 24.9758 16.8946 25.687 18.1124 26.2028C19.3302 26.7343 20.6261 27 22 27C23.3739 27 24.6698 26.7343 25.8876 26.2028C27.1054 25.687 28.1671 24.9758 29.0726 24.0692C29.9781 23.1626 30.6885 17.0996 31.2037 20.8804C31.7346 19.6768 32 18.3794 32 16.9883C32 15.6127 31.7346 14.3154 31.2037 13.0961C30.6729 11.8925 29.9586 10.8374 29.0609 9.93083C28.1632 9.02423 27.1054 8.3052 25.8876 7.77374C24.6698 7.25791 23.3739 7 22 7ZM22 10.2591C22.7494 10.2591 23.3934 10.5248 23.9321 11.0563C24.4707 11.5877 24.74 12.2364 24.74 13.0023C24.74 13.7683 24.4707 14.417 23.9321 14.9484C23.3934 15.4799 22.7494 15.7456 22 15.7456C21.235 15.7456 20.5831 15.4799 20.0445 14.9484C19.5059 14.417 19.2365 13.7683 19.2365 13.0023C19.2521 12.2364 19.5254 11.5877 20.0562 11.0563C20.587 10.5248 21.235 10.2591 22 10.2591ZM27.8548 21.068C27.2615 22.0528 26.4614 22.8421 25.4543 23.4361C24.4473 24.0301 23.3349 24.3271 22.1171 24.3271C22.1015 24.3271 22.082 24.3271 22.0585 24.3271C22.0351 24.3271 22.0156 24.3271 22 24.3271C21.9844 24.3271 21.9649 24.3271 21.9415 24.3271C21.918 24.3271 21.8985 24.3271 21.8829 24.3271C20.6651 24.3271 19.5527 24.0301 18.5457 23.4361C17.5386 22.8421 16.7385 22.0606 16.1452 21.0914L16.1218 21.0445L16.0749 20.9273L16.1452 20.8101C16.7385 19.8253 17.5386 19.036 18.5457 18.442C19.5527 17.848 20.6651 17.551 21.8829 17.551C21.8985 17.551 21.918 17.551 21.9415 17.551C21.9649 17.551 21.9844 17.551 22 17.551C22.0156 17.551 22.0351 17.551 22.0585 17.551C22.082 17.551 22.1015 17.551 22.1171 17.551C23.3349 17.551 24.4473 17.8519 25.4543 18.4537C26.4614 19.0555 27.2615 19.841 27.8548 20.8101V20.8335L27.9016 20.9508L27.8548 21.068Z" fill="%23FF5630"/><path d="M22 44L35.3979 26.9095L35.413 26.8907C37.601 23.9752 38.7578 20.5008 38.7578 16.8438C38.7578 7.60379 31.24 0 22 0C12.76 0 5.24219 7.60379 5.24219 16.8438C5.24219 20.5008 6.39899 23.9752 8.60214 26.9095L22 44ZM22 5.24219C28.3973 5.24219 33.6016 10.4464 33.6016 16.8438C33.6016 23.2411 28.3973 28.4453 22 28.4453C15.6027 28.4453 10.3984 23.2411 10.3984 16.8438C10.3984 10.4464 15.6027 5.24219 22 5.24219Z" fill="%23FF5630"/></g><defs><clipPath id="clip0_4_10289"><rect width="44" height="44" fill="white"/></clipPath></defs></svg>',iconoffline:'<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_4_10289)"><path d="M22 7C20.6261 7 19.3302 7.25791 18.1124 7.77374C16.8946 8.3052 15.8329 9.02423 14.9274 9.93083C14.0219 10.8374 13.3115 11.8925 12.7963 13.0961C12.2654 14.3154 12 15.6127 12 16.9883C12 18.3794 12.2654 19.6768 12.7963 20.8804C13.3115 22.0996 14.0219 23.1626 14.9274 24.0692C15.8329 24.9758 16.8946 25.687 18.1124 26.2028C19.3302 26.7343 20.6261 27 22 27C23.3739 27 24.6698 26.7343 25.8876 26.2028C27.1054 25.687 28.1671 24.9758 29.0726 24.0692C29.9781 23.1626 30.6885 17.0996 31.2037 20.8804C31.7346 19.6768 32 18.3794 32 16.9883C32 15.6127 31.7346 14.3154 31.2037 13.0961C30.6729 11.8925 29.9586 10.8374 29.0609 9.93083C28.1632 9.02423 27.1054 8.3052 25.8876 7.77374C24.6698 7.25791 23.3739 7 22 7ZM22 10.2591C22.7494 10.2591 23.3934 10.5248 23.9321 11.0563C24.4707 11.5877 24.74 12.2364 24.74 13.0023C24.74 13.7683 24.4707 14.417 23.9321 14.9484C23.3934 15.4799 22.7494 15.7456 22 15.7456C21.235 15.7456 20.5831 15.4799 20.0445 14.9484C19.5059 14.417 19.2365 13.7683 19.2365 13.0023C19.2521 12.2364 19.5254 11.5877 20.0562 11.0563C20.587 10.5248 21.235 10.2591 22 10.2591ZM27.8548 21.068C27.2615 22.0528 26.4614 22.8421 25.4543 23.4361C24.4473 24.0301 23.3349 24.3271 22.1171 24.3271C22.1015 24.3271 22.082 24.3271 22.0585 24.3271C22.0351 24.3271 22.0156 24.3271 22 24.3271C21.9844 24.3271 21.9649 24.3271 21.9415 24.3271C21.918 24.3271 21.8985 24.3271 21.8829 24.3271C20.6651 24.3271 19.5527 24.0301 18.5457 23.4361C17.5386 22.8421 16.7385 22.0606 16.1452 21.0914L16.1218 21.0445L16.0749 20.9273L16.1452 20.8101C16.7385 19.8253 17.5386 19.036 18.5457 18.442C19.5527 17.848 20.6651 17.551 21.8829 17.551C21.8985 17.551 21.918 17.551 21.9415 17.551C21.9649 17.551 21.9844 17.551 22 17.551C22.0156 17.551 22.0351 17.551 22.0585 17.551C22.082 17.551 22.1015 17.551 22.1171 17.551C23.3349 17.551 24.4473 17.8519 25.4543 18.4537C26.4614 19.0555 27.2615 19.841 27.8548 20.8101V20.8335L27.9016 20.9508L27.8548 21.068Z" fill="%23959595"/><path d="M22 44L35.3979 26.9095L35.413 26.8907C37.601 23.9752 38.7578 20.5008 38.7578 16.8438C38.7578 7.60379 31.24 0 22 0C12.76 0 5.24219 7.60379 5.24219 16.8438C5.24219 20.5008 6.39899 23.9752 8.60214 26.9095L22 44ZM22 5.24219C28.3973 5.24219 33.6016 10.4464 33.6016 16.8438C33.6016 23.2411 28.3973 28.4453 22 28.4453C15.6027 28.4453 10.3984 23.2411 10.3984 16.8438C10.3984 10.4464 15.6027 5.24219 22 5.24219Z" fill="%23959595"/></g><defs><clipPath id="clip0_4_10289"><rect width="44" height="44" fill="white"/></clipPath></defs></svg>'};return e.jsxs("div",{id:"ekmapplf_tracking_legend",className:"ekmapplf_tracking-map-legend",children:[e.jsxs("div",{className:"ekmapplf_tracking-legend-title",onClick:c,children:[e.jsx("span",{className:`icon ${o?"ekmapplf_tracking-icon-square-minus":"ekmapplf_tracking-icon-square-plus"}`,style:{filter:"invert(100%) sepia(100%) saturate(0%) hue-rotate(187deg) brightness(105%) contrast(103%)"}}),e.jsx("span",{children:"Chú giải bản đồ"})]}),e.jsx("div",{className:`ekmapplf_tracking-legend-body ${o?"open":""}`,style:{maxHeight:o?"none":"0"},children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("span",{className:"ekmapplf_tracking-legend-icon",style:{backgroundImage:`url('data:image/svg+xml,${d.iconOnline}')`}}),"Vị trí nhân viên Online"]}),e.jsxs("li",{children:[e.jsx("span",{className:"ekmapplf_tracking-legend-icon",style:{backgroundImage:`url('data:image/svg+xml,${d.iconoffline}')`}}),"Vị trí nhân viên Offline"]})]})})]})}const I=window.ekmapplf;function me({options:o,onClickPopup:r,status:c}){const d=v.useRef(null),f=v.useRef(null),_=v.useRef(null),N=v.useRef({}),T=v.useRef({}),h=pe({},{center:[105,17],zoom:4.5,bounds:[[82.79,1.1],[132.63,35.75]],pitch:30,reloadTime:6e4,stopTime:600},o);if(h.apiKey===""||!h.apiKey)throw new Error("apiKey is required");const P=async()=>{try{let H=function(a){const k="Asia/Saigon",C=new Date(a).toLocaleDateString("en-US",{timeZone:k}),w=new Date().toLocaleDateString("en-US",{timeZone:k});return C===w};f.current=new Z.Map({container:d.current,center:h.center,zoom:h.zoom,minZoom:1,pitch:h.pitch,maxBounds:h.bounds});var s=f.current;s.setPadding({top:100,bottom:100,left:100,right:100}),new I.VectorBaseMap("OSM:Night",h.apiKey).addTo(s);var O=new I.control.BaseMap({id:"ekmapplf_tracking_ctrl_basemap",baseLayers:[{id:"OSM:Night",title:"Bản đồ nền Đêm",thumbnail:"https://docs.ekgis.vn/assets/dem-map.png",width:"50px",height:"50px"},{id:"OSM:Bright",title:"Bản đồ nền Sáng",thumbnail:"https://docs.ekgis.vn/assets/map-sang.png",width:"50px",height:"50px"},{id:"OSM:Standard",title:"Bản đồ nền Tiêu chuẩn",thumbnail:"https://docs.ekgis.vn/assets/map-chuan.png",width:"50px",height:"50px"},{id:"OSM:Gray",title:"Bản đồ nền Xám",thumbnail:"https://docs.ekgis.vn/assets/xam-map.png",width:"50px",height:"50px"},{id:"OSM:Dark",title:"Bản đồ nền Đêm xanh coban",thumbnail:"https://docs.ekgis.vn/assets/xanhcoban-map.png",width:"50px",height:"50px"},{id:"OSM:Pencil",title:"Bản đồ nền Bút chì",thumbnail:"https://docs.ekgis.vn/assets/chi-map.png",width:"50px",height:"50px"},{id:"OSM:Pirates",title:"Bản đồ nền Cổ điển",thumbnail:"https://docs.ekgis.vn/assets/dien-map.png",width:"50px",height:"50px"},{id:"OSM:Wood",title:"Bản đồ nền Gỗ",thumbnail:"https://docs.ekgis.vn/assets/go-map.png",width:"50px",height:"50px"}]});s.addControl(O,"bottom-left"),O.on("changeBaseLayer",async function(a){await new I.VectorBaseMap(a.layer,h.apiKey).addTo(s),setTimeout(()=>{D()},500)}),s.addControl(new Z.NavigationControl({visualizePitch:!0}),"bottom-right");var S=!1;s.getPitch()>0?S=!0:S=!1;var $="maplibregl-terrain2d-control",B="Hiển thị 2D";S||($="maplibregl-terrain3d-control",B="Bản đồ 3D");let L=new I.control.Button({className:"btn-ctl-group "+$,icon:"none",tooltip:B});L.on("click",a=>{S=!S,S?(a._div.className=a._div.className.replaceAll("maplibregl-terrain3d-control","maplibregl-terrain2d-control"),a._div.title="Hiển thị 2D"):(a._div.className=a._div.className.replaceAll("maplibregl-terrain2d-control","maplibregl-terrain3d-control"),a._div.title="Hiển thị 3D"),S?(s.easeTo({pitch:60}),s.setLayoutProperty("building-3d","visibility","visible")):(s.easeTo({pitch:0}),s.setLayoutProperty("building-3d","visibility","none"))}),s.addControl(L,"bottom-right"),s.addControl(new Z.FullscreenControl,"top-right"),s.on("load",async()=>{try{let a=await D();if(a&&a.features.length){let k=V(a);s.fitBounds(k,{padding:100,maxZoom:14,duration:1e3})}_.current&&clearInterval(_.current),_.current=setInterval(()=>{y(h.objectId)},1e4)}catch(a){console.error("Error:",a)}});const D=async()=>{if(h.objectId||(h.objectId=null),!(Array.isArray(h.objectId)&&h.objectId.length===0))return await y(h.objectId)},y=async a=>{var k=await M(a);const C=k.reduce((m,t)=>(t.status==="offline"?m.offline++:t.status==="online"&&m.online++,m),{online:0,offline:0});c&&c(C);const w={type:"FeatureCollection",features:await Promise.all(k.map(m=>m.type?{type:"Feature",properties:m,geometry:{type:"Point",coordinates:m.coordinates}}:null)).then(m=>m.filter(t=>t!==null))};if(s.getSource("ek-tracking-live-source"))s.getSource("ek-tracking-live-source").setData(w);else{s.addSource("ek-tracking-live-source",{type:"geojson",data:w,cluster:!0,clusterMaxZoom:14,clusterRadius:55}),s.addLayer({id:"ek-tracking-live-clusters",type:"circle",source:"ek-tracking-live-source",filter:["==","cluster",!0],paint:{"circle-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-radius":12,"circle-stroke-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-stroke-opacity":.7,"circle-stroke-width":5}}),s.addLayer({id:"ek-tracking-live-cluster-count",type:"symbol",source:"ek-tracking-live-source",filter:["==","cluster",!0],layout:{"text-field":"{point_count_abbreviated}","text-size":12}}),s.on("mouseenter","ek-tracking-live-clusters",()=>{s.getCanvas().style.cursor="pointer"}),s.on("mouseleave","ek-tracking-live-clusters",()=>{s.getCanvas().style.cursor=""}),s.on("click","ek-tracking-live-clusters",async t=>{const u=s.queryRenderedFeatures(t.point,{layers:["ek-tracking-live-clusters"]}),g=u[0].properties.cluster_id,x=await s.getSource("ek-tracking-live-source").getClusterExpansionZoom(g);s.easeTo({center:u[0].geometry.coordinates,zoom:x+.01})});async function m(){const t={},u=s.querySourceFeatures("ek-tracking-live-source");for(let g=0;g<u.length;g++){const x=u[g].geometry.coordinates,i=u[g].properties;if(i.cluster)continue;const p=i._id;let l=N.current[p];if(l)l.getElement().innerHTML=`
                                    <div class="marker-name">${i.name}</div>
                                    <div class="marker-img-${i.status==="online"?"online":"offline"}"></div>`,l.setLngLat(x);else{const n=document.createElement("div");n.className="marker-employee",n.innerHTML=`
                                    <div class="marker-name">${i.name}</div>
                                    <div class="marker-img-${i.status==="online"?"online":"offline"}"></div>`;let E=new Z.Popup({offset:[0,-27],closeButton:!1}).setHTML(`<div class="ek-tracking-his-popup-info">
                                            <b>${i.name}</b>
                                        </div>
                                        <div class="ek-tracking-his-popup-info">
                                            <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-marker ekmapplf_tracking-icon-default-color"></span>
                                            <span>${i.address}</span>
                                        </div>
                                        <div class="ek-tracking-his-popup-info" style="justify-content: end;">
                                            <span class="show-his">Xem lịch sử</span>
                                        </div>
                                        `);E.on("open",()=>{n.querySelector(".marker-name").style.display="none",E.getElement().querySelector(".show-his").addEventListener("click",()=>{r&&r({_id:i._id,name:i.name})})}),E.on("close",()=>{n.querySelector(".marker-name").style.removeProperty("display")}),l=N.current[p]=new Z.Marker({element:n,anchor:"bottom"}).setPopup(E).setLngLat(x)}t[p]=l,T.current[p]&&(T.current[p].remove(),l.addTo(s))}for(let g in T.current)t[g]||T.current[g].remove();T.current=t}s.on("data",t=>{t.sourceId!=="ek-tracking-live-source"||!t.isSourceLoaded||(s.on("move",m),s.on("moveend",m),m())})}return w};async function M(a){try{console.log(typeof a,a);var k=a===null?"null":a.toString().replaceAll(",",";");const m=`https://api.ekgis.vn/v2/tracking/locationHistory/position/${h.projectId}/latest/${k}?api_key=${h.apiKey}`,t=`https://api.ekgis.vn/v1/checkin/${h.projectId}/latest/${k}?api_key=${h.apiKey}`,[u,g]=await Promise.all([fetch(m),fetch(t)]),x=await u.json(),i=await g.json();console.log("responseTracking, responseCheckin",x,i);let p={};x.forEach(n=>{p[n.object._id]=n});let l=i.map(n=>({object:n.object,position:p[n.object._id]?p[n.object._id].position:null,checkin:n.checkin}));var C=[];for(const n of l)if(!n.position&&!n.checkin)C.push({_id:n.object._id,name:n.object.name,status:"offline"});else{const E=n.position?Date.parse(n.position.timestamp):0,W=n.checkin?Date.parse(n.checkin.timestamp):0,F=E>W,G=F?E:W;if(await H(G)){var w="offline";const U=F?[n.position.coords.longitude,n.position.coords.latitude]:n.checkin.coordinates.split(",").map(Y=>parseFloat(Y)),Q=await b(U);F?Date.parse(new Date)-G<=h.stopTime*1e3&&(w="online"):(n.checkin.time_checkout==""||Date.parse(new Date)-Date.parse(n.checkin.time_checkout)<=h.stopTime*1e3)&&(w="online"),C.push({_id:n.object._id,name:n.object.name,type:F?"tracking":"checkin",position:F?n.position:n.checkin,coordinates:U,address:Q,status:w,timestamp:G})}else C.push({_id:n.object._id,name:n.object.name,status:"offline"})}return C}catch(m){throw console.error("Error getting last position:",m),m}}async function b(a){return new Promise((k,C)=>{const w={"point.lon":a[0],"point.lat":a[1]};new I.service.Geocoding(h.apiKey).reverse(w,(t,u)=>{if(t)C("Không có thông tin");else{const g=u.results.length>0?u.results[0].formatted_address:"Không có thông tin";k(g)}})})}}catch(H){console.error("Error initializing map:",H)}};return v.useEffect(()=>(P(),()=>{f.current&&f.current.remove(),_.current&&clearInterval(_.current)}),[o]),e.jsx("div",{ref:d,id:"ekmap-tracking-realtime",children:e.jsx(ue,{})})}const ge=o=>[{dataIndex:"stt",width:"50px"},{title:"Nhân viên",dataIndex:"emp_name",render:(r,c)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{height:"48px",width:"48px",borderRadius:"12px"},children:c.pic_profile!=null?e.jsx("div",{style:{width:"48px",height:"48px",backgroundImage:`url("${c.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"48px",height:"48px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>o(c),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:r}),c.emp_id!=null&&e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",c.emp_id]})]})]})},{title:"Thời gian di chuyển",dataIndex:"moving"},{title:"Thời gian dừng",dataIndex:"stopping"},{title:"Thời gian viếng thăm",dataIndex:"visiting"}];function fe(){const o=te(),{errorMsg:r}=v.useContext(ie),[c,d]=v.useState(""),[f,_]=v.useState({luot_vt:0,don_hang:0,doanh_so:0}),[N,T]=v.useState({so_nv_online:0,so_nv_offline:0}),[j,h]=v.useState([]),[P,s]=v.useState([]),[O,S]=v.useState([]),[$,B]=v.useState(!0),H=async()=>{const t=await A.get("/api/method/mbw_dms.api.report.real_time_monitoring_report");t.message=="Thành công"&&_(t.result)},L=t=>{T({so_nv_online:t.online,so_nv_offline:t.offline})},[D,y]=v.useState({apiKey:"w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc",projectId:""}),M=t=>t.toLocaleString("en-US").replace(/,/g,"."),b=t=>t<1e3?`${Math.round(t)} m`:`${Math.round(t/1e3)} km`,a=t=>t<60?`${Math.round(t)} giây`:t>=60&&t<3600?`${Math.round(t/60)} phút`:`${Math.round(t/3600)} giờ`,k=t=>{o(`/employee-monitor-detail/${t._id}`)},C=t=>{t.objectId!=null?o(`/employee-monitor-detail/${t.objectId}`):o("/employee-monitor-detail")},w=async t=>{let g=new Date().getTime()/1e3,x=await A(`/api/method/mbw_dms.api.user.get_list_top_employee?from_date=${g}&to_date=${g}`),i=[];x.message=="Thành công"&&(i=x.result),t=t.map(l=>(l={...l,today_visit:0,must_visit:0,sales_order:0},i.forEach(n=>{l.name==n.employee&&(l={...l,today_visit:n.total_visit||0,must_visit:n.must_visit||0,sales_order:n.sales_order||0})}),l)).sort((l,n)=>n.sales_order-l.sales_order).slice(0,5);let p=t.map((l,n)=>({...l,s1tt:n+1,pic_profile:l.avatar!=null&&l.avatar!=""?l.avatar:null,emp_name:l.employee_name,emp_id:l.name,visiting:`${l.today_visit}/${l.must_visit}`,boxing:l.sales_order,objectId:l.object_id}));s(p)},m=(t,u)=>{u=u.map(i=>{i.summary={};let p=t.find(l=>i.object_id!=null&&i.object_id==l.object._id);return p&&(i.summary=p.summary),i});let g=u.map((i,p)=>({stt:p+1,pic_profile:i.avatar!=null?i.avatar:null,emp_name:i.employee_name,emp_id:i.name,moving:i.summary!=null&&i.summary.move!=null?a(i.summary.move.totalTime):a(0),stopping:i.summary!=null&&i.summary.stop!=null?a(i.summary.stop.totalTime):a(0),visiting:i.summary!=null&&i.summary.checkin!=null?a(i.summary.checkin.totalTime):a(0),objectId:i.object_id}));S(g),u.sort((i,p)=>i.summary!=null&&i.summary.move!=null&&p.summary!=null&&p.summary.move!=null?p.summary.move.distance-i.summary.move.distance:1).slice(0,5);let x=u.map((i,p)=>({stt:p+1,pic_profile:i.avatar!=null?i.avatar:null,emp_name:i.employee_name,emp_id:i.name,distance:i.summary!=null&&i.summary.move!=null?b(i.summary.move.distance):b(0),objectId:i.object_id}));h(x)};return v.useEffect(()=>{(async()=>{try{B(!0),H();const t=A.get("/api/method/mbw_dms.api.user.get_projectID",{params:{teamSale:c}}),u=A.get("/api/method/mbw_dms.api.vgm.map_customer.get_config_api");let g=A.get("/api/method/mbw_dms.api.user.get_list_employees",{params:{team_sale:c}});const[x,i,p]=await Promise.all([t,u,g]);y(F=>({...F,apiKey:i.result,projectId:x.result["Project ID"],objectId:x.result.objectIds}));const l=x.result.objectIds;let n=[];p.message=="Thành công"&&(n=p.result);let E=`https://api.ekgis.vn/v2/tracking/locationHistory/summary/lastest/${x.result["Project ID"]}/${l}?api_key=${D.apiKey}`,W=await ne.get(E);if(W.data?.results.length>0){let F=W.data?.results;m(F,JSON.parse(JSON.stringify(n)))}w(JSON.parse(JSON.stringify(n)))}catch(t){r(t?.message||t||"Something was wrong when query !!")}finally{B(!1)}})()},[c]),e.jsxs(e.Fragment,{children:[$&&e.jsx("div",{style:{position:"fixed",width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.5)",zIndex:9999,display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsx(se,{indicator:e.jsx(re,{style:{fontSize:30,color:"#fff"},spin:!0})})}),e.jsxs(q,{className:"flex flex-wrap justify-between items-center px-[30px] h-[48px] bg-white",children:[e.jsx("span",{className:"text-2xl font-semibold leading-[21px]",children:"Giám sát thời gian thực"}),e.jsx("div",{className:"flex",children:e.jsx(ae,{team_sale:c,setTeamSale:d})})]}),e.jsxs(q,{style:{marginTop:"20px"},gutter:[20,20],className:"px-[30px] h-full overflow-y-scroll pb-20",children:[e.jsx(z,{className:"card-container  w-full 1kr:w-1/2 order-1 1k:order-2 1kr:order-1 ",children:e.jsx("div",{style:{display:"block",width:"100%"},children:e.jsxs(q,{gutter:[20,20],style:{width:"100%"},children:[e.jsx(z,{span:12,className:"card-container",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#22C55E1F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_user_online"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Số nhân viên online"}),e.jsx("div",{className:"content_card",children:N.so_nv_online})]})]})})})}),e.jsx(z,{span:12,className:"card-container",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#FF56301F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_user_offline"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Số nhân viên offline"}),e.jsx("div",{className:"content_card",children:N.so_nv_offline})]})]})})})}),e.jsx(z,{className:"card-container w-1/3 1kr:w-full 1_5k:w-1/3",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#00B8D91F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_visiting"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng lượt viếng thăm"}),e.jsx("div",{className:"content_card",children:f.luot_vt})]})]})})})}),e.jsx(z,{className:"card-container w-1/3 1kr:w-full 1_5k:w-1/3",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#FFAB001F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"48px",backgroundSize:"Cover"},className:"icon_boxing"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng đơn hàng"}),e.jsx("div",{className:"content_card",children:f.don_hang})]})]})})})}),e.jsx(z,{className:"card-container w-1/3 1kr:w-full 1_5k:w-1/3",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#1877F21F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_money"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng doanh số"}),e.jsx("div",{className:"content_card",children:M(f.doanh_so)})]})]})})})}),e.jsx(z,{span:12,className:"card-container",children:e.jsx(R,{children:e.jsxs("div",{className:"wrap-card-container",children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px"},children:"Quãng đường di chuyển của nhân viên"}),e.jsx("div",{style:{height:210,overflow:"auto"},children:e.jsx(K,{itemLayout:"horizontal",dataSource:j,renderItem:(t,u)=>e.jsx(K.Item,{children:e.jsxs("div",{className:"flex items-center justify-between",style:{width:"100%"},children:[e.jsxs("div",{className:"flex items-center",children:[e.jsxs("div",{className:"flex items-center justify-center",style:{width:"24px",height:"24px"},children:[u==0&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_first"}),u==1&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_second"}),u==2&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_third"})]}),e.jsx("div",{className:"mx-3",children:t.stt}),e.jsx("div",{className:"flex items-center justify-center",style:{height:"42px",width:"42px",borderRadius:"12px"},children:t.pic_profile!=null?e.jsx("div",{style:{width:"42px",height:"42px",backgroundImage:`url("${t.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"42px",height:"42px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>C(t),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:t.emp_name}),t.emp_id!=null&&e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",t.emp_id]})]})]}),e.jsx("div",{style:{marginRight:"10px",fontWeight:500,fontSize:"14px",lineHeight:"22px",color:"#1877F2"},children:t.distance})]})})})})]})})}),e.jsx(z,{span:12,className:"card-container",children:e.jsx(R,{children:e.jsxs("div",{className:"wrap-card-container",children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px"},children:"Danh sách nhân viên"}),e.jsx("div",{style:{height:210,overflow:"auto"},children:e.jsx(K,{itemLayout:"horizontal",dataSource:P,renderItem:t=>e.jsx(K.Item,{children:e.jsxs("div",{className:"flex items-center justify-between",style:{width:"100%"},children:[e.jsxs("div",{className:"flex items-center",style:{width:"70%"},children:[e.jsx("div",{className:"flex items-center justify-center",style:{height:"48px",width:"48px",borderRadius:"12px"},children:t.pic_profile!=null?e.jsx("div",{style:{width:"48px",height:"48px",backgroundImage:`url("${t.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"48px",height:"48px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>C(t),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:t.emp_name}),e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",t.emp_id]})]})]}),e.jsxs("div",{style:{width:"30%"},className:"flex",children:[e.jsxs("div",{className:"items-center mx-3 flex",style:{flexDirection:"column"},children:[e.jsx("div",{style:{fontWeight:400,fontSize:"14px",lineHeight:"22px"},children:t.visiting}),e.jsx("div",{className:"flex items-center justify-center",style:{width:"20px",height:"20px"},children:e.jsx("div",{style:{width:"14px",height:"17px",backgroundSize:"Cover"},className:"icon_visiting"})})]}),e.jsxs("div",{className:"items-center mx-3 flex",style:{flexDirection:"column"},children:[e.jsx("div",{style:{fontWeight:400,fontSize:"14px",lineHeight:"22px"},children:t.boxing}),e.jsx("div",{className:"flex items-center justify-center",style:{width:"20px",height:"20px"},children:e.jsx("div",{style:{width:"16px",height:"17px",backgroundSize:"Cover"},className:"icon_boxing"})})]})]})]})})})})]})})})]})})}),e.jsx(z,{className:"card-container w-full order-2 1k:order-3 1kr:order-3",children:e.jsxs(ve,{children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px",paddingLeft:"10px",paddingBottom:"10px",paddingTop:"10px"},children:"Thống kê thời gian di chuyển, thời gian dừng, thời gian viếng thăm của nhân viên"}),e.jsx(le,{style:{height:"100%"},pagination:!1,scroll:{y:350},columns:ge(C),dataSource:O})]})}),e.jsx(z,{className:"card-container min-h-[400px] w-full 1kr:w-1/2 order-3 1k:order-1 1kr:order-2 ",children:e.jsx(xe,{children:e.jsx("div",{style:{height:"100%"},children:D.projectId&&e.jsx(me,{options:D,onClickPopup:k,status:L})})})})]})]})}function R({children:o,type:r="card"}){return e.jsx("div",{className:J("border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden",r=="card"&&"p-4"),style:{backgroundColor:"#FBFBFB",width:"100%"},children:o})}function xe({children:o,type:r="card"}){return e.jsx("div",{className:J("border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden",r=="card"),style:{backgroundColor:"#FBFBFB",width:"100%"},children:o})}function ve({children:o,type:r="card"}){return e.jsx("div",{className:J("border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden",r=="card"),style:{backgroundColor:"#FBFBFB",width:"100%"},children:o})}function ye(){return e.jsx(fe,{})}function we(){return e.jsxs(e.Fragment,{children:[e.jsx(oe,{children:e.jsx("title",{children:" EmployeeMonitor"})}),e.jsx(ye,{})]})}export{we as default};
