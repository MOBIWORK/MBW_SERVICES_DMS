import{L as e,bA as ie,Y as k,aP as V,N as ne,R as I,P as j,O as E,a2 as A,a4 as se,a1 as K,bB as re,a3 as ae,aG as le,a7 as oe,a9 as ce,am as U,ab as de}from"./index-bbfgcYFL.js";import{D as he}from"./index-7aCo8_mP.js";import{L as G}from"./index-t2vXla24.js";const pe=()=>e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M11.6602 17.5C11.6081 17.5 11.5527 17.4935 11.4941 17.4805C11.4355 17.4674 11.3802 17.4544 11.3281 17.4414L7.98828 15.957C7.84505 15.8919 7.72786 15.791 7.63672 15.6543C7.54557 15.5176 7.5 15.3646 7.5 15.1953V10.6445L1.95312 3.86719C1.88802 3.80208 1.83919 3.72396 1.80664 3.63281C1.77409 3.54167 1.75781 3.44401 1.75781 3.33984C1.75781 3.10547 1.83919 2.9069 2.00195 2.74414C2.16471 2.58138 2.36328 2.5 2.59766 2.5H17.4023C17.6367 2.5 17.8353 2.58138 17.998 2.74414C18.1608 2.9069 18.2422 3.10547 18.2422 3.33984C18.2422 3.44401 18.2259 3.54167 18.1934 3.63281C18.1608 3.72396 18.112 3.80208 18.0469 3.86719L12.5 10.6445V16.6797C12.5 16.901 12.4186 17.0931 12.2559 17.2559C12.0931 17.4186 11.8945 17.5 11.6602 17.5ZM9.16016 14.6484L10.8398 15.3906V10.3516C10.8398 10.2474 10.8561 10.1497 10.8887 10.0586C10.9212 9.96745 10.9635 9.88932 11.0156 9.82422L15.6445 4.17969H4.35547L8.98438 9.82422C9.03646 9.88932 9.07878 9.96745 9.11133 10.0586C9.14388 10.1497 9.16016 10.2474 9.16016 10.3516V14.6484Z",fill:"#637381"})});var ue=ge,me=Object.prototype.hasOwnProperty;function ge(){for(var u={},l=0;l<arguments.length;l++){var g=arguments[l];for(var o in g)me.call(g,o)&&(u[o]=g[o])}return u}const fe=ie(ue);function X(u,l,g){if(u!==null)for(var o,x,N,M,T,C,c,P=0,a=0,O,S=u.type,B=S==="FeatureCollection",H=S==="Feature",z=B?u.features.length:1,_=0;_<z;_++){c=B?u.features[_].geometry:H?u.geometry:u,O=c?c.type==="GeometryCollection":!1,T=O?c.geometries.length:1;for(var F=0;F<T;F++){var v=0,y=0;if(M=O?c.geometries[F]:c,M!==null){C=M.coordinates;var L=M.type;switch(P=g&&(L==="Polygon"||L==="MultiPolygon")?1:0,L){case null:break;case"Point":if(l(C,a,_,v,y)===!1)return!1;a++,v++;break;case"LineString":case"MultiPoint":for(o=0;o<C.length;o++){if(l(C[o],a,_,v,y)===!1)return!1;a++,L==="MultiPoint"&&v++}L==="LineString"&&v++;break;case"Polygon":case"MultiLineString":for(o=0;o<C.length;o++){for(x=0;x<C[o].length-P;x++){if(l(C[o][x],a,_,v,y)===!1)return!1;a++}L==="MultiLineString"&&v++,L==="Polygon"&&y++}L==="Polygon"&&v++;break;case"MultiPolygon":for(o=0;o<C.length;o++){for(y=0,x=0;x<C[o].length;x++){for(N=0;N<C[o][x].length-P;N++){if(l(C[o][x][N],a,_,v,y)===!1)return!1;a++}y++}v++}break;case"GeometryCollection":for(o=0;o<M.geometries.length;o++)if(X(M.geometries[o],l,g)===!1)return!1;break;default:throw new Error("Unknown Geometry Type")}}}}}function J(u){var l=[1/0,1/0,-1/0,-1/0];return X(u,function(g){l[0]>g[0]&&(l[0]=g[0]),l[1]>g[1]&&(l[1]=g[1]),l[2]<g[0]&&(l[2]=g[0]),l[3]<g[1]&&(l[3]=g[1])}),l}J.default=J;function xe(){const[u,l]=k.useState(!1),g=()=>{l(!u)},o={iconOnline:'<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_4_10289)"><path d="M22 7C20.6261 7 19.3302 7.25791 18.1124 7.77374C16.8946 8.3052 15.8329 9.02423 14.9274 9.93083C14.0219 10.8374 13.3115 11.8925 12.7963 13.0961C12.2654 14.3154 12 15.6127 12 16.9883C12 18.3794 12.2654 19.6768 12.7963 20.8804C13.3115 22.0996 14.0219 23.1626 14.9274 24.0692C15.8329 24.9758 16.8946 25.687 18.1124 26.2028C19.3302 26.7343 20.6261 27 22 27C23.3739 27 24.6698 26.7343 25.8876 26.2028C27.1054 25.687 28.1671 24.9758 29.0726 24.0692C29.9781 23.1626 30.6885 17.0996 31.2037 20.8804C31.7346 19.6768 32 18.3794 32 16.9883C32 15.6127 31.7346 14.3154 31.2037 13.0961C30.6729 11.8925 29.9586 10.8374 29.0609 9.93083C28.1632 9.02423 27.1054 8.3052 25.8876 7.77374C24.6698 7.25791 23.3739 7 22 7ZM22 10.2591C22.7494 10.2591 23.3934 10.5248 23.9321 11.0563C24.4707 11.5877 24.74 12.2364 24.74 13.0023C24.74 13.7683 24.4707 14.417 23.9321 14.9484C23.3934 15.4799 22.7494 15.7456 22 15.7456C21.235 15.7456 20.5831 15.4799 20.0445 14.9484C19.5059 14.417 19.2365 13.7683 19.2365 13.0023C19.2521 12.2364 19.5254 11.5877 20.0562 11.0563C20.587 10.5248 21.235 10.2591 22 10.2591ZM27.8548 21.068C27.2615 22.0528 26.4614 22.8421 25.4543 23.4361C24.4473 24.0301 23.3349 24.3271 22.1171 24.3271C22.1015 24.3271 22.082 24.3271 22.0585 24.3271C22.0351 24.3271 22.0156 24.3271 22 24.3271C21.9844 24.3271 21.9649 24.3271 21.9415 24.3271C21.918 24.3271 21.8985 24.3271 21.8829 24.3271C20.6651 24.3271 19.5527 24.0301 18.5457 23.4361C17.5386 22.8421 16.7385 22.0606 16.1452 21.0914L16.1218 21.0445L16.0749 20.9273L16.1452 20.8101C16.7385 19.8253 17.5386 19.036 18.5457 18.442C19.5527 17.848 20.6651 17.551 21.8829 17.551C21.8985 17.551 21.918 17.551 21.9415 17.551C21.9649 17.551 21.9844 17.551 22 17.551C22.0156 17.551 22.0351 17.551 22.0585 17.551C22.082 17.551 22.1015 17.551 22.1171 17.551C23.3349 17.551 24.4473 17.8519 25.4543 18.4537C26.4614 19.0555 27.2615 19.841 27.8548 20.8101V20.8335L27.9016 20.9508L27.8548 21.068Z" fill="%23FF5630"/><path d="M22 44L35.3979 26.9095L35.413 26.8907C37.601 23.9752 38.7578 20.5008 38.7578 16.8438C38.7578 7.60379 31.24 0 22 0C12.76 0 5.24219 7.60379 5.24219 16.8438C5.24219 20.5008 6.39899 23.9752 8.60214 26.9095L22 44ZM22 5.24219C28.3973 5.24219 33.6016 10.4464 33.6016 16.8438C33.6016 23.2411 28.3973 28.4453 22 28.4453C15.6027 28.4453 10.3984 23.2411 10.3984 16.8438C10.3984 10.4464 15.6027 5.24219 22 5.24219Z" fill="%23FF5630"/></g><defs><clipPath id="clip0_4_10289"><rect width="44" height="44" fill="white"/></clipPath></defs></svg>',iconoffline:'<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_4_10289)"><path d="M22 7C20.6261 7 19.3302 7.25791 18.1124 7.77374C16.8946 8.3052 15.8329 9.02423 14.9274 9.93083C14.0219 10.8374 13.3115 11.8925 12.7963 13.0961C12.2654 14.3154 12 15.6127 12 16.9883C12 18.3794 12.2654 19.6768 12.7963 20.8804C13.3115 22.0996 14.0219 23.1626 14.9274 24.0692C15.8329 24.9758 16.8946 25.687 18.1124 26.2028C19.3302 26.7343 20.6261 27 22 27C23.3739 27 24.6698 26.7343 25.8876 26.2028C27.1054 25.687 28.1671 24.9758 29.0726 24.0692C29.9781 23.1626 30.6885 17.0996 31.2037 20.8804C31.7346 19.6768 32 18.3794 32 16.9883C32 15.6127 31.7346 14.3154 31.2037 13.0961C30.6729 11.8925 29.9586 10.8374 29.0609 9.93083C28.1632 9.02423 27.1054 8.3052 25.8876 7.77374C24.6698 7.25791 23.3739 7 22 7ZM22 10.2591C22.7494 10.2591 23.3934 10.5248 23.9321 11.0563C24.4707 11.5877 24.74 12.2364 24.74 13.0023C24.74 13.7683 24.4707 14.417 23.9321 14.9484C23.3934 15.4799 22.7494 15.7456 22 15.7456C21.235 15.7456 20.5831 15.4799 20.0445 14.9484C19.5059 14.417 19.2365 13.7683 19.2365 13.0023C19.2521 12.2364 19.5254 11.5877 20.0562 11.0563C20.587 10.5248 21.235 10.2591 22 10.2591ZM27.8548 21.068C27.2615 22.0528 26.4614 22.8421 25.4543 23.4361C24.4473 24.0301 23.3349 24.3271 22.1171 24.3271C22.1015 24.3271 22.082 24.3271 22.0585 24.3271C22.0351 24.3271 22.0156 24.3271 22 24.3271C21.9844 24.3271 21.9649 24.3271 21.9415 24.3271C21.918 24.3271 21.8985 24.3271 21.8829 24.3271C20.6651 24.3271 19.5527 24.0301 18.5457 23.4361C17.5386 22.8421 16.7385 22.0606 16.1452 21.0914L16.1218 21.0445L16.0749 20.9273L16.1452 20.8101C16.7385 19.8253 17.5386 19.036 18.5457 18.442C19.5527 17.848 20.6651 17.551 21.8829 17.551C21.8985 17.551 21.918 17.551 21.9415 17.551C21.9649 17.551 21.9844 17.551 22 17.551C22.0156 17.551 22.0351 17.551 22.0585 17.551C22.082 17.551 22.1015 17.551 22.1171 17.551C23.3349 17.551 24.4473 17.8519 25.4543 18.4537C26.4614 19.0555 27.2615 19.841 27.8548 20.8101V20.8335L27.9016 20.9508L27.8548 21.068Z" fill="%23959595"/><path d="M22 44L35.3979 26.9095L35.413 26.8907C37.601 23.9752 38.7578 20.5008 38.7578 16.8438C38.7578 7.60379 31.24 0 22 0C12.76 0 5.24219 7.60379 5.24219 16.8438C5.24219 20.5008 6.39899 23.9752 8.60214 26.9095L22 44ZM22 5.24219C28.3973 5.24219 33.6016 10.4464 33.6016 16.8438C33.6016 23.2411 28.3973 28.4453 22 28.4453C15.6027 28.4453 10.3984 23.2411 10.3984 16.8438C10.3984 10.4464 15.6027 5.24219 22 5.24219Z" fill="%23959595"/></g><defs><clipPath id="clip0_4_10289"><rect width="44" height="44" fill="white"/></clipPath></defs></svg>'};return e.jsxs("div",{id:"ekmapplf_tracking_legend",className:"ekmapplf_tracking-map-legend",children:[e.jsxs("div",{className:"ekmapplf_tracking-legend-title",onClick:g,children:[e.jsx("span",{className:`icon ${u?"ekmapplf_tracking-icon-square-minus":"ekmapplf_tracking-icon-square-plus"}`,style:{filter:"invert(100%) sepia(100%) saturate(0%) hue-rotate(187deg) brightness(105%) contrast(103%)"}}),e.jsx("span",{children:"Chú giải bản đồ"})]}),e.jsx("div",{className:`ekmapplf_tracking-legend-body ${u?"open":""}`,style:{maxHeight:u?"none":"0"},children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("span",{className:"ekmapplf_tracking-legend-icon",style:{backgroundImage:`url('data:image/svg+xml,${o.iconOnline}')`}}),"Vị trí nhân viên Online"]}),e.jsxs("li",{children:[e.jsx("span",{className:"ekmapplf_tracking-legend-icon",style:{backgroundImage:`url('data:image/svg+xml,${o.iconoffline}')`}}),"Vị trí nhân viên Offline"]})]})})]})}const W=window.ekmapplf;function ve({options:u,onClickPopup:l,status:g}){const o=k.useRef(null),x=k.useRef(null),N=k.useRef(null),M=k.useRef({}),T=k.useRef({}),c=fe({},{center:[105,17],zoom:4.5,bounds:[[82.79,1.1],[132.63,35.75]],pitch:30,reloadTime:6e4,stopTime:600},u);if(c.apiKey===""||!c.apiKey)throw new Error("apiKey is required");const P=async()=>{try{let z=function(d){const w="Asia/Saigon",D=new Date(d).toLocaleDateString("en-US",{timeZone:w}),b=new Date().toLocaleDateString("en-US",{timeZone:w});return D===b};x.current=new V.Map({container:o.current,center:c.center,zoom:c.zoom,minZoom:1,pitch:c.pitch,maxBounds:c.bounds});var a=x.current;a.setPadding({top:100,bottom:100,left:100,right:100}),new W.VectorBaseMap("OSM:Night",c.apiKey).addTo(a);var O=new W.control.BaseMap({id:"ekmapplf_tracking_ctrl_basemap",baseLayers:[{id:"OSM:Night",title:"Bản đồ nền Đêm",thumbnail:"https://docs.ekgis.vn/assets/dem-map.png",width:"50px",height:"50px"},{id:"OSM:Bright",title:"Bản đồ nền Sáng",thumbnail:"https://docs.ekgis.vn/assets/map-sang.png",width:"50px",height:"50px"},{id:"OSM:Standard",title:"Bản đồ nền Tiêu chuẩn",thumbnail:"https://docs.ekgis.vn/assets/map-chuan.png",width:"50px",height:"50px"},{id:"OSM:Gray",title:"Bản đồ nền Xám",thumbnail:"https://docs.ekgis.vn/assets/xam-map.png",width:"50px",height:"50px"},{id:"OSM:Dark",title:"Bản đồ nền Đêm xanh coban",thumbnail:"https://docs.ekgis.vn/assets/xanhcoban-map.png",width:"50px",height:"50px"},{id:"OSM:Pencil",title:"Bản đồ nền Bút chì",thumbnail:"https://docs.ekgis.vn/assets/chi-map.png",width:"50px",height:"50px"},{id:"OSM:Pirates",title:"Bản đồ nền Cổ điển",thumbnail:"https://docs.ekgis.vn/assets/dien-map.png",width:"50px",height:"50px"},{id:"OSM:Wood",title:"Bản đồ nền Gỗ",thumbnail:"https://docs.ekgis.vn/assets/go-map.png",width:"50px",height:"50px"}]});a.addControl(O,"bottom-left"),O.on("changeBaseLayer",async function(d){await new W.VectorBaseMap(d.layer,c.apiKey).addTo(a),setTimeout(()=>{F()},500)}),a.addControl(new V.NavigationControl({visualizePitch:!0}),"bottom-right");var S=!1;a.getPitch()>0?S=!0:S=!1;var B="maplibregl-terrain2d-control",H="Hiển thị 2D";S||(B="maplibregl-terrain3d-control",H="Bản đồ 3D");let _=new W.control.Button({className:"btn-ctl-group "+B,icon:"none",tooltip:H});_.on("click",d=>{S=!S,S?(d._div.className=d._div.className.replaceAll("maplibregl-terrain3d-control","maplibregl-terrain2d-control"),d._div.title="Hiển thị 2D"):(d._div.className=d._div.className.replaceAll("maplibregl-terrain2d-control","maplibregl-terrain3d-control"),d._div.title="Hiển thị 3D"),S?(a.easeTo({pitch:60}),a.setLayoutProperty("building-3d","visibility","visible")):(a.easeTo({pitch:0}),a.setLayoutProperty("building-3d","visibility","none"))}),a.addControl(_,"bottom-right"),a.addControl(new V.FullscreenControl,"top-right"),a.on("load",async()=>{try{let d=await F();if(d&&d.features.length){let w=J(d);a.fitBounds(w,{padding:100,maxZoom:14,duration:1e3})}N.current&&clearInterval(N.current),N.current=setInterval(()=>{v(c.objectId)},1e4)}catch(d){console.error("Error:",d)}});const F=async()=>{if(c.objectId||(c.objectId=null),!(Array.isArray(c.objectId)&&c.objectId.length===0))return await v(c.objectId)},v=async d=>{var w=await y(d);const D=w.reduce((t,i)=>(i.status==="offline"?t.offline++:i.status==="online"&&t.online++,t),{online:0,offline:0});g&&g(D);const b={type:"FeatureCollection",features:await Promise.all(w.map(t=>t.type?{type:"Feature",properties:t,geometry:{type:"Point",coordinates:t.coordinates}}:null)).then(t=>t.filter(i=>i!==null))};if(a.getSource("ek-tracking-live-source"))a.getSource("ek-tracking-live-source").setData(b);else{a.addSource("ek-tracking-live-source",{type:"geojson",data:b,cluster:!0,clusterMaxZoom:14,clusterRadius:55}),a.addLayer({id:"ek-tracking-live-clusters",type:"circle",source:"ek-tracking-live-source",filter:["==","cluster",!0],paint:{"circle-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-radius":12,"circle-stroke-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-stroke-opacity":.7,"circle-stroke-width":5}}),a.addLayer({id:"ek-tracking-live-cluster-count",type:"symbol",source:"ek-tracking-live-source",filter:["==","cluster",!0],layout:{"text-field":"{point_count_abbreviated}","text-size":12}}),a.on("mouseenter","ek-tracking-live-clusters",()=>{a.getCanvas().style.cursor="pointer"}),a.on("mouseleave","ek-tracking-live-clusters",()=>{a.getCanvas().style.cursor=""}),a.on("click","ek-tracking-live-clusters",async i=>{const h=a.queryRenderedFeatures(i.point,{layers:["ek-tracking-live-clusters"]}),s=h[0].properties.cluster_id,r=await a.getSource("ek-tracking-live-source").getClusterExpansionZoom(s);a.easeTo({center:h[0].geometry.coordinates,zoom:r+.01})});async function t(){const i={},h=a.querySourceFeatures("ek-tracking-live-source");for(let s=0;s<h.length;s++){const r=h[s].geometry.coordinates,p=h[s].properties;if(p.cluster)continue;const f=p._id;let m=M.current[f];if(m)m.getElement().innerHTML=`
                                    <div class="marker-name">${p.name}</div>
                                    <div class="marker-img-${p.status==="online"?"online":"offline"}"></div>`,m.setLngLat(r);else{const n=document.createElement("div");n.className="marker-employee",n.innerHTML=`
                                    <div class="marker-name">${p.name}</div>
                                    <div class="marker-img-${p.status==="online"?"online":"offline"}"></div>`;let $=new V.Popup({offset:[0,-27],closeButton:!1}).setHTML(`<div class="ek-tracking-his-popup-info">
                                            <b>${p.name}</b>
                                        </div>
                                        <div class="ek-tracking-his-popup-info">
                                            <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-marker ekmapplf_tracking-icon-default-color"></span>
                                            <span>${p.address}</span>
                                        </div>
                                        <div class="ek-tracking-his-popup-info" style="justify-content: end;">
                                            <span class="show-his">Xem lịch sử</span>
                                        </div>
                                        `);$.on("open",()=>{n.querySelector(".marker-name").style.display="none",$.getElement().querySelector(".show-his").addEventListener("click",()=>{l&&l({_id:p._id,name:p.name})})}),$.on("close",()=>{n.querySelector(".marker-name").style.removeProperty("display")}),m=M.current[f]=new V.Marker({element:n,anchor:"bottom"}).setPopup($).setLngLat(r)}i[f]=m,T.current[f]&&(T.current[f].remove(),m.addTo(a))}for(let s in T.current)i[s]||T.current[s].remove();T.current=i}a.on("data",i=>{i.sourceId!=="ek-tracking-live-source"||!i.isSourceLoaded||(a.on("move",t),a.on("moveend",t),t())})}return b};async function y(d){try{console.log(typeof d,d);var w=d===null?"null":d.toString().replaceAll(",",";");const t=`https://api.ekgis.vn/v2/tracking/locationHistory/position/${c.projectId}/latest/${w}?api_key=${c.apiKey}`,i=`https://api.ekgis.vn/v1/checkin/${c.projectId}/latest/${w}?api_key=${c.apiKey}`,[h,s]=await Promise.all([fetch(t),fetch(i)]),r=await h.json(),p=await s.json();console.log("responseTracking, responseCheckin",r,p);let f={};r.forEach(n=>{f[n.object._id]=n});let m=p.map(n=>({object:n.object,position:f[n.object._id]?f[n.object._id].position:null,checkin:n.checkin}));var D=[];for(const n of m)if(!n.position&&!n.checkin)D.push({_id:n.object._id,name:n.object.name,status:"offline"});else{const $=n.position?Date.parse(n.position.timestamp):0,Y=n.checkin?Date.parse(n.checkin.timestamp):0,Z=$>Y,q=Z?$:Y;if(await z(q)){var b="offline";const Q=Z?[n.position.coords.longitude,n.position.coords.latitude]:n.checkin.coordinates.split(",").map(te=>parseFloat(te)),ee=await L(Q);Z?Date.parse(new Date)-q<=c.stopTime*1e3&&(b="online"):(n.checkin.time_checkout==""||Date.parse(new Date)-Date.parse(n.checkin.time_checkout)<=c.stopTime*1e3)&&(b="online"),D.push({_id:n.object._id,name:n.object.name,type:Z?"tracking":"checkin",position:Z?n.position:n.checkin,coordinates:Q,address:ee,status:b,timestamp:q})}else D.push({_id:n.object._id,name:n.object.name,status:"offline"})}return D}catch(t){throw console.error("Error getting last position:",t),t}}async function L(d){return new Promise((w,D)=>{const b={"point.lon":d[0],"point.lat":d[1]};new W.service.Geocoding(c.apiKey).reverse(b,(i,h)=>{if(i)D("Không có thông tin");else{const s=h.results.length>0?h.results[0].formatted_address:"Không có thông tin";w(s)}})})}}catch(z){console.error("Error initializing map:",z)}};return k.useEffect(()=>(P(),()=>{x.current&&x.current.remove(),N.current&&clearInterval(N.current)}),[u]),e.jsx("div",{ref:o,id:"ekmap-tracking-realtime",children:e.jsx(xe,{})})}function ye(){return e.jsxs(ne,{layout:"vertical",className:"w-[500px] text-[12px]",children:[e.jsxs(I,{gutter:16,children:[e.jsx(j,{span:12,children:e.jsx(E,{label:"Phòng ban",children:e.jsx(A,{})})}),e.jsx(j,{span:12,children:e.jsx(E,{label:"Sắp xếp",children:e.jsx(A,{})})})]}),e.jsxs(I,{gutter:16,children:[e.jsx(j,{span:12,children:e.jsx(E,{label:"Chỉ tiêu",children:e.jsx(A,{})})}),e.jsx(j,{span:12,children:e.jsx(E,{label:"Đơn hàng",children:e.jsx(A,{})})})]}),e.jsxs(I,{gutter:16,children:[e.jsx(j,{span:12,children:e.jsx(E,{label:"Viếng thăm",children:e.jsx(A,{})})}),e.jsx(j,{span:12,children:e.jsx(E,{label:"Chỉ tiêu theo ngày",children:e.jsx(A,{})})})]})]})}var je={VITE_BASE_PATH:"/mbw_desk",VITE_KEY_MAP:"wtpM0U1ZmE2s87LEZNSHf63Osc1a2sboaozCQNsy",VITE_API_KEY:"w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc",BASE_URL:"/assets/mbw_dms/mbw_fe/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function ke(){const u=se(),[l,g]=k.useState({luot_vt:0,don_hang:0,doanh_so:0}),[o,x]=k.useState({so_nv_online:0,so_nv_offline:0}),[N,M]=k.useState([]),[T,C]=k.useState([]),[c,P]=k.useState([]),[a,O]=k.useState(!0),S=async()=>{const t=await K.get("/api/method/mbw_dms.api.report.real_time_monitoring_report");t.message=="Thành công"&&g(t.result)},B=[{dataIndex:"stt",width:"50px"},{title:"Nhân viên",dataIndex:"emp_name",render:(t,i)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{height:"48px",width:"48px",borderRadius:"12px"},children:i.pic_profile!=null?e.jsx("div",{style:{width:"48px",height:"48px",backgroundImage:`url("${i.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"48px",height:"48px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>d(i),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:t}),i.emp_id!=null&&e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",i.emp_id]})]})]})},{title:"Thời gian di chuyển",dataIndex:"moving"},{title:"Thời gian dừng",dataIndex:"stopping"},{title:"Thời gian viếng thăm",dataIndex:"visiting"}],H=t=>{x({so_nv_online:t.online,so_nv_offline:t.offline})},[z,_]=k.useState({apiKey:"w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc",projectId:""}),F=t=>t.toLocaleString("en-US").replace(/,/g,"."),v=t=>t<1e3?`${Math.round(t)} m`:`${Math.round(t/1e3)} km`,y=t=>t<60?`${Math.round(t)} giây`:t>=60&&t<3600?`${Math.round(t/60)} phút`:`${Math.round(t/3600)} giờ`,L=t=>{u(`/employee-monitor-detail/${t._id}`)},d=t=>{t.objectId!=null?u(`/employee-monitor-detail/${t.objectId}`):u("/employee-monitor-detail")},w=(t,i)=>{for(let r=0;r<i.length;r++)for(let p=0;p<t.length;p++)if(i[r].object_id!=null&&i[r].object_id==t[p].object._id){i[r].summary=t[p].summary;break}else i[r].summary={};let h=i.sort((r,p)=>{if(r.summary!=null&&r.summary.move!=null&&p.summary!=null&&p.summary.move!=null)return p.summary.move.distance-r.summary.move.distance}),s=[];for(let r=0;r<h.length&&r!=5;r++)s.push({stt:r+1,pic_profile:h[r].avatar!=null?h[r].avatar:null,emp_name:h[r].employee_name,emp_id:h[r].name,distance:h[r].summary!=null&&h[r].summary.move!=null?v(h[r].summary.move.distance):v(0),objectId:h[r].object_id});M(s)},D=async t=>{let h=new Date().getTime()/1e3,s=await K(`/api/method/mbw_dms.api.user.get_list_top_employee?from_date=${h}&to_date=${h}`),r=[];s.message=="Thành công"&&(r=s.result);for(let m=0;m<t.length;m++)if(r.length>0)for(let n=0;n<r.length;n++)if(t[m].name==r[n].employee){t[m].today_visit=r[n].today_visit,t[m].must_visit=r[n].must_visit,t[m].sales_order=r[n].sales_order;break}else t[m].today_visit=0,t[m].must_visit=0,t[m].sales_order=0;else t[m].today_visit=0,t[m].must_visit=0,t[m].sales_order=0;let p=t.sort((m,n)=>n.sales_order-m.sales_order),f=[];for(let m=0;m<p.length&&m!=5;m++){let n=p[m];f.push({s1tt:m+1,pic_profile:n.avatar!=null&&n.avatar!=""?n.avatar:null,emp_name:n.employee_name,emp_id:n.name,visiting:`${n.today_visit}/${n.must_visit}`,boxing:n.sales_order,objectId:n.object_id})}C(f)},b=(t,i)=>{for(let s=0;s<i.length;s++)for(let r=0;r<t.length;r++)if(i[s].object_id!=null&&i[s].object_id==t[r].object._id){i[s].summary=i[s].summary;break}else i[s].summary={};let h=[];for(let s=0;s<i.length;s++)h.push({stt:s+1,pic_profile:i[s].avatar!=null?i[s].avatar:null,emp_name:i[s].employee_name,emp_id:i[s].name,moving:i[s].summary!=null&&i[s].summary.move!=null?y(i[s].summary.move.totalTime):y(0),stopping:i[s].summary!=null&&i[s].summary.stop!=null?y(i[s].summary.stop.totalTime):y(0),visiting:i[s].summary!=null&&i[s].summary.checkin!=null?y(i[s].summary.checkin.totalTime):y(0),objectId:i[s].object_id});P(h)};return k.useEffect(()=>{(async()=>{O(!0),S();const t=await K.get("/api/method/mbw_dms.api.user.get_projectID");_(f=>({...f,projectId:t.result["Project ID"]}));const i=await K.get("/api/method/mbw_dms.api.vgm.map_customer.get_config_api");_(f=>({...f,apiKey:i.result}));let h=await K("/api/method/mbw_dms.api.user.get_list_employees"),s=[];h.message=="Thành công"&&(s=h.result);let r=`https://api.ekgis.vn/v2/tracking/locationHistory/summary/lastest/${t.result["Project ID"]}/null?api_key=${z.apiKey}`,p=await re.get(r);if(je.VITE_BASE_URL&&(p=p.data),p?.results.length>0){let f=p?.results;w(f,JSON.parse(JSON.stringify(s))),b(f,JSON.parse(JSON.stringify(s)))}D(JSON.parse(JSON.stringify(s))),O(!1)})()},[]),e.jsxs(e.Fragment,{children:[a&&e.jsx("div",{style:{position:"fixed",width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.5)",zIndex:9999,display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsx(ae,{indicator:e.jsx(le,{style:{fontSize:30,color:"#fff"},spin:!0})})}),e.jsxs(I,{className:"flex flex-wrap justify-between items-center px-[30px] h-[48px] bg-white",children:[e.jsx("span",{className:"text-2xl font-semibold leading-[21px]",children:"Giám sát thời gian thực"}),e.jsx("div",{className:"flex",children:e.jsx(oe,{trigger:["click"],dropdownRender:()=>e.jsx(he,{title:"Bộ lọc",children:e.jsx(ye,{})}),children:e.jsxs("div",{className:"flex items-center justify-between border border-solid rounded-lg border-[#ccc] px-2 py-1 cursor-pointer",onClick:()=>{},children:[e.jsx(pe,{})," Bộ lọc"]})})})]}),e.jsxs(I,{style:{marginTop:"20px"},gutter:[20,20],className:"px-[30px] h-full overflow-y-scroll pb-20",children:[e.jsx(j,{className:"card-container  w-full 1kr:w-1/2 order-1 1k:order-2 1kr:order-1 ",children:e.jsx("div",{style:{display:"block",width:"100%"},children:e.jsxs(I,{gutter:[20,20],style:{width:"100%"},children:[e.jsx(j,{span:12,className:"card-container",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#22C55E1F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_user_online"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Số nhân viên online"}),e.jsx("div",{className:"content_card",children:o.so_nv_online})]})]})})})}),e.jsx(j,{span:12,className:"card-container",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#FF56301F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_user_offline"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Số nhân viên offline"}),e.jsx("div",{className:"content_card",children:o.so_nv_offline})]})]})})})}),e.jsx(j,{className:"card-container w-1/3 1kr:w-full 1_5k:w-1/3",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#00B8D91F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_visiting"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng lượt viếng thăm"}),e.jsx("div",{className:"content_card",children:l.luot_vt})]})]})})})}),e.jsx(j,{className:"card-container w-1/3 1kr:w-full 1_5k:w-1/3",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#FFAB001F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"48px",backgroundSize:"Cover"},className:"icon_boxing"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng đơn hàng"}),e.jsx("div",{className:"content_card",children:l.don_hang})]})]})})})}),e.jsx(j,{className:"card-container w-1/3 1kr:w-full 1_5k:w-1/3",children:e.jsx(R,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#1877F21F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_money"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng doanh số"}),e.jsx("div",{className:"content_card",children:F(l.doanh_so)})]})]})})})}),e.jsx(j,{span:12,className:"card-container",children:e.jsx(R,{children:e.jsxs("div",{className:"wrap-card-container",children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px"},children:"Quãng đường di chuyển của nhân viên"}),e.jsx("div",{style:{height:210,overflow:"auto"},children:e.jsx(G,{itemLayout:"horizontal",dataSource:N,renderItem:(t,i)=>e.jsx(G.Item,{children:e.jsxs("div",{className:"flex items-center justify-between",style:{width:"100%"},children:[e.jsxs("div",{className:"flex items-center",children:[e.jsxs("div",{className:"flex items-center justify-center",style:{width:"24px",height:"24px"},children:[i==0&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_first"}),i==1&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_second"}),i==2&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_third"})]}),e.jsx("div",{className:"mx-3",children:t.stt}),e.jsx("div",{className:"flex items-center justify-center",style:{height:"42px",width:"42px",borderRadius:"12px"},children:t.pic_profile!=null?e.jsx("div",{style:{width:"42px",height:"42px",backgroundImage:`url("${t.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"42px",height:"42px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>d(t),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:t.emp_name}),t.emp_id!=null&&e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",t.emp_id]})]})]}),e.jsx("div",{style:{marginRight:"10px",fontWeight:500,fontSize:"14px",lineHeight:"22px",color:"#1877F2"},children:t.distance})]})})})})]})})}),e.jsx(j,{span:12,className:"card-container",children:e.jsx(R,{children:e.jsxs("div",{className:"wrap-card-container",children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px"},children:"Danh sách nhân viên"}),e.jsx("div",{style:{height:210,overflow:"auto"},children:e.jsx(G,{itemLayout:"horizontal",dataSource:T,renderItem:t=>e.jsx(G.Item,{children:e.jsxs("div",{className:"flex items-center justify-between",style:{width:"100%"},children:[e.jsxs("div",{className:"flex items-center",style:{width:"70%"},children:[e.jsx("div",{className:"flex items-center justify-center",style:{height:"48px",width:"48px",borderRadius:"12px"},children:t.pic_profile!=null?e.jsx("div",{style:{width:"48px",height:"48px",backgroundImage:`url("${t.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"48px",height:"48px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>d(t),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:t.emp_name}),e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",t.emp_id]})]})]}),e.jsxs("div",{style:{width:"30%"},className:"flex",children:[e.jsxs("div",{className:"items-center mx-3 flex",style:{flexDirection:"column"},children:[e.jsx("div",{style:{fontWeight:400,fontSize:"14px",lineHeight:"22px"},children:t.visiting}),e.jsx("div",{className:"flex items-center justify-center",style:{width:"20px",height:"20px"},children:e.jsx("div",{style:{width:"14px",height:"17px",backgroundSize:"Cover"},className:"icon_visiting"})})]}),e.jsxs("div",{className:"items-center mx-3 flex",style:{flexDirection:"column"},children:[e.jsx("div",{style:{fontWeight:400,fontSize:"14px",lineHeight:"22px"},children:t.boxing}),e.jsx("div",{className:"flex items-center justify-center",style:{width:"20px",height:"20px"},children:e.jsx("div",{style:{width:"16px",height:"17px",backgroundSize:"Cover"},className:"icon_boxing"})})]})]})]})})})})]})})})]})})}),e.jsx(j,{className:"card-container w-full order-2 1k:order-3 1kr:order-3",children:e.jsxs(we,{children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px",paddingLeft:"10px",paddingBottom:"10px",paddingTop:"10px"},children:"Thống kê thời gian di chuyển, thời gian dừng, thời gian viếng thăm của nhân viên"}),e.jsx(ce,{style:{height:"100%"},pagination:!1,scroll:{y:350},columns:B,dataSource:c})]})}),e.jsx(j,{className:"card-container min-h-[400px] w-full 1kr:w-1/2 order-3 1k:order-1 1kr:order-2 ",children:e.jsx(Ce,{children:e.jsx("div",{style:{height:"100%"},children:z.projectId&&e.jsx(ve,{options:z,onClickPopup:L,status:H})})})})]})]})}function R({children:u,type:l="card"}){return e.jsx("div",{className:U("border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden",l=="card"&&"p-4"),style:{backgroundColor:"#FBFBFB",width:"100%"},children:u})}function Ce({children:u,type:l="card"}){return e.jsx("div",{className:U("border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden",l=="card"),style:{backgroundColor:"#FBFBFB",width:"100%"},children:u})}function we({children:u,type:l="card"}){return e.jsx("div",{className:U("border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden",l=="card"),style:{backgroundColor:"#FBFBFB",width:"100%"},children:u})}function be(){return e.jsx(ke,{})}function De(){return e.jsxs(e.Fragment,{children:[e.jsx(de,{children:e.jsx("title",{children:" EmployeeMonitor"})}),e.jsx(be,{})]})}export{De as default};
