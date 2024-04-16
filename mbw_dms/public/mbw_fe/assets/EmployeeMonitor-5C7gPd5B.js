import{W as m,L as e,aS as M,$ as Q,a0 as F,bz as X,bA as Y,aJ as ee,R as I,Q as te,P as k,a3 as ie,a7 as se}from"./index-KFiAzW5A.js";import{u as ne}from"./useDebount-6V6Hc5JI.js";import{e as ae,b as re,W as $,a as le,c as oe}from"./WrapperCard-SloMXeRb.js";import{L as V}from"./index-skr1mhBc.js";function ce(){const[f,_]=m.useState(!1),C=()=>{_(!f)},w={iconOnline:"https://files.ekgis.vn/sdks/tracking/assets/check-icon.png",iconOffline:"https://files.ekgis.vn/sdks/tracking/assets/offline-marker.png"};return e.jsxs("div",{id:"ekmapplf_tracking_legend",className:"ekmapplf_tracking-map-legend",children:[e.jsxs("div",{className:"ekmapplf_tracking-legend-title",onClick:C,children:[e.jsx("span",{className:`icon ${f?"ekmapplf_tracking-icon-square-minus":"ekmapplf_tracking-icon-square-plus"}`,style:{filter:"invert(100%) sepia(100%) saturate(0%) hue-rotate(187deg) brightness(105%) contrast(103%)"}}),e.jsx("span",{children:"Chú giải bản đồ"})]}),e.jsx("div",{className:`ekmapplf_tracking-legend-body ${f?"open":""}`,style:{maxHeight:f?"none":"0"},children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("span",{className:"ekmapplf_tracking-legend-icon",style:{backgroundImage:`url(${w.iconOnline})`}}),"Vị trí nhân viên Online"]}),e.jsxs("li",{children:[e.jsx("span",{className:"ekmapplf_tracking-legend-icon",style:{backgroundImage:`url(${w.iconOffline})`}}),"Vị trí nhân viên Offline"]})]})})]})}const P=window.ekmapplf;function de({options:f,onClickPopup:_,status:C}){const w=m.useRef(null),b=m.useRef(null),S=m.useRef(null),o=ae({},{center:[105,17],zoom:4.5,reloadTime:6e4,iconOnline:"https://files.ekgis.vn/sdks/tracking/assets/check-icon.png",iconOffline:"https://files.ekgis.vn/sdks/tracking/assets/offline-marker.png"},f);if(o.apiKey==""||!o.apiKey)throw new Error("Parameter apiKey not valid");if(o.projectId==""||!o.projectId)throw new Error("Parameter projectId not valid");if(o.objectId&&!Array.isArray(o.objectId))throw new Error("Parameter objectId not valid");return m.useEffect(()=>((async()=>{try{var G;b.current=new M.Map({container:w.current,center:o.center,zoom:o.zoom,minZoom:1,pitch:30});var a=b.current;const g=a.getContainer();a.setPadding({top:100,bottom:100,left:100,right:100}),new P.VectorBaseMap("OSM:Bright",o.apiKey).addTo(a);var H=new P.control.BaseMap({id:"ekmapplf_tracking_ctrl_basemap_"+g.id,baseLayers:[{id:"OSM:Bright",title:"Bản đồ nền Sáng",thumbnail:"https://docs.ekgis.vn/assets/map-sang.png",width:"50px",height:"50px"},{id:"OSM:Standard",title:"Bản đồ nền Tiêu chuẩn",thumbnail:"https://docs.ekgis.vn/assets/map-chuan.png",width:"50px",height:"50px"},{id:"OSM:Gray",title:"Bản đồ nền Xám",thumbnail:"https://docs.ekgis.vn/assets/xam-map.png",width:"50px",height:"50px"},{id:"OSM:Night",title:"Bản đồ nền Đêm",thumbnail:"https://docs.ekgis.vn/assets/dem-map.png",width:"50px",height:"50px"},{id:"OSM:Dark",title:"Bản đồ nền Đêm xanh coban",thumbnail:"https://docs.ekgis.vn/assets/xanhcoban-map.png",width:"50px",height:"50px"},{id:"OSM:Pencil",title:"Bản đồ nền Bút chì",thumbnail:"https://docs.ekgis.vn/assets/chi-map.png",width:"50px",height:"50px"},{id:"OSM:Pirates",title:"Bản đồ nền Cổ điển",thumbnail:"https://docs.ekgis.vn/assets/dien-map.png",width:"50px",height:"50px"},{id:"OSM:Wood",title:"Bản đồ nền Gỗ",thumbnail:"https://docs.ekgis.vn/assets/go-map.png",width:"50px",height:"50px"}]});a.addControl(H,"bottom-left"),H.on("changeBaseLayer",async function(c){await new P.VectorBaseMap(c.layer,o.apiKey).addTo(a),setTimeout(()=>{A()},500)}),a.addControl(new M.NavigationControl({visualizePitch:!0}),"bottom-right");var v=!1;a.getPitch()>0?v=!0:v=!1;var R="maplibregl-terrain2d-control",B="Hiển thị 2D";v||(R="maplibregl-terrain3d-control",B="Bản đồ 3D");let O=new P.control.Button({className:"btn-ctl-group "+R,icon:"none",tooltip:B});O.on("click",c=>{v=!v,v?(c._div.className=c._div.className.replaceAll("maplibregl-terrain3d-control","maplibregl-terrain2d-control"),c._div.title="Hiển thị 2D"):(c._div.className=c._div.className.replaceAll("maplibregl-terrain2d-control","maplibregl-terrain3d-control"),c._div.title="Hiển thị 3D"),v?(a.easeTo({pitch:60}),a.setLayoutProperty("building-3d","visibility","visible")):(a.easeTo({pitch:0}),a.setLayoutProperty("building-3d","visibility","none"))}),a.addControl(O,"bottom-right"),a.addControl(new M.FullscreenControl,"bottom-right"),a.on("load",async()=>{try{let c=await A(),y=re(c);y&&a.fitBounds(y,{padding:100,maxZoom:14,duration:1e3}),S.current&&clearInterval(S.current),S.current=setInterval(()=>{W(o.objectId)},6e4)}catch(c){console.error("Error:",c)}});const A=async()=>{const c=async()=>{let j=`https://api.ekgis.vn/tracking/${o.projectId}/objects?api_key=${o.apiKey}`;return(await(await fetch(j)).json()).results.objects.map(h=>h._id)||[]};let y=o.objectId?o.objectId:await c(o.projectId);return o.objectId=y,await W(o.objectId)},W=async c=>{if(!Array.isArray(c))return;const y=async h=>{try{let i=function(K){const J=new Date().setHours(0,0,0,0);return new Date(K).setHours(0,0,0,0)===J};const l=`https://api.ekgis.vn/v2/tracking/locationHistory/position/${o.projectId}/${h}/lastest?api_key=${o.apiKey}`,n=`https://api.ekgis.vn/v1/checkin/${o.projectId}/${h}/lastcheckin?api_key=${o.apiKey}`,s=await fetch(l),d=await fetch(n),u=await s.json(),r=await d.json();if(!u.position&&!r.length)return{_id:u.summary._id,name:u.summary.name,status:"offline"};const p=u.position?Date.parse(u.position.timestamp):0,D=r.length?Date.parse(r[0].timestamp):0,L=p>D;var x=L?p:D;if(i(x)){var t="offline";const K=L?[u.position.coords.longitude,u.position.coords.latitude]:r[0].coordinates.split(",").map(U=>parseFloat(U)),J=await E(K);return L?Date.parse(new Date)-x<=600*1e3&&(t="online"):((r[0].timestamp.time_checkout="")||Date.parse(new Date)-Date.parse(r[0].timestamp.time_checkout)<=600*1e3)&&(t="online"),{_id:u.summary._id,name:u.summary.name,type:L?"tracking":"checkin",position:L?u.position:r[0],coordinates:K,address:J,status:t,timestamp:x}}else return{_id:u.summary._id,name:u.summary.name,status:"offline"}}catch(i){throw console.error("Error getting last position:",i),i}};var j=await Promise.all(c.map(h=>y(h).catch(x=>null)));j=j.filter(h=>h!==null);const N=j.reduce((h,x)=>(x.status==="offline"?h.offline++:x.status==="online"&&h.online++,h),{offline:0,online:0});C(N);const T={type:"FeatureCollection",features:await Promise.all(j.map(h=>h.type?{type:"Feature",properties:h,geometry:{type:"Point",coordinates:h.coordinates}}:null)).then(h=>h.filter(x=>x!==null))};if(a.getSource(`ek-tracking-live-${g.id}-source`))a.getSource(`ek-tracking-live-${g.id}-source`).setData(T);else{a.addSource(`ek-tracking-live-${g.id}-source`,{type:"geojson",data:T,cluster:!0,clusterMaxZoom:14,clusterRadius:55}),a.addLayer({id:`ek-tracking-live-${g.id}-clusters`,type:"circle",source:`ek-tracking-live-${g.id}-source`,filter:["==","cluster",!0],paint:{"circle-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-radius":12,"circle-stroke-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-stroke-opacity":.7,"circle-stroke-width":5}}),a.addLayer({id:`ek-tracking-live-${g.id}-cluster-count`,type:"symbol",source:`ek-tracking-live-${g.id}-source`,filter:["==","cluster",!0],layout:{"text-field":"{point_count_abbreviated}","text-size":12}}),a.on("mouseenter",`ek-tracking-live-${g.id}-clusters`,()=>{a.getCanvas().style.cursor="pointer"}),a.on("mouseleave",`ek-tracking-live-${g.id}-clusters`,()=>{a.getCanvas().style.cursor=""}),a.on("click",`ek-tracking-live-${g.id}-clusters`,async i=>{const l=a.queryRenderedFeatures(i.point,{layers:[`ek-tracking-live-${g.id}-clusters`]}),n=l[0].properties.cluster_id,s=await a.getSource(`ek-tracking-live-${g.id}-source`).getClusterExpansionZoom(n);a.easeTo({center:l[0].geometry.coordinates,zoom:s+.01})});const h={};let x={};async function t(){const i={},l=a.querySourceFeatures(`ek-tracking-live-${g.id}-source`);for(let n=0;n<l.length;n++){const s=l[n].geometry.coordinates,d=l[n].properties;if(d.cluster)continue;const u=d._id;let r=h[u];if(!r){const p=document.createElement("div");p.className="marker-employee",p.innerHTML=`
                                        <div class="marker-name">${d.name}</div>
                                        <div class="marker-img-${d.status=="online"?"online":"offline"}"></div>`;let D=new M.Popup({offset:[0,-27],closeButton:!1}).setHTML(`<div class="ek-tracking-his-popup-info">
                                                <b>${d.name}</b>
                                            </div>
                                            <div class="ek-tracking-his-popup-info">
                                                <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-marker ekmapplf_tracking-icon-default-color"></span>
                                                <span>${d.address}</span>
                                            </div>
                                            <div class="ek-tracking-his-popup-info" style="justify-content: end;">
                                                <span class="show-his">Xem lịch sử</span>
                                            </div>
                                            `);D.on("open",()=>{p.querySelector(".marker-name").style.display="none",D.getElement().querySelector(".show-his").addEventListener("click",()=>{_({_id:d._id,name:d.name})})}),D.on("close",()=>{p.querySelector(".marker-name").style.removeProperty("display")}),r=h[u]=new M.Marker({element:p,anchor:"bottom"}).setPopup(D).setLngLat(s)}i[u]=r,x[u]&&r.addTo(a)}for(let n in x)i[n]||x[n].remove();x=i}a.on("data",i=>{i.sourceId!==`ek-tracking-live-${g.id}-source`||!i.isSourceLoaded||(a.on("move",t),a.on("moveend",t),t())})}return T},E=async c=>new Promise((y,j)=>{const N={"point.lon":c[0],"point.lat":c[1]};new P.service.Geocoding(o.apiKey).reverse(N,(h,x)=>{if(h)j("Không có thông tin");else{const t=x.results.length>0?x.results[0].formatted_address:"Không có thông tin";y(t)}})})}catch(g){console.error("Error initializing map:",g)}})(),()=>{b.current&&b.current.remove(),S.current&&clearInterval(S.current)}),[f]),e.jsx("div",{ref:w,id:"ekmap-tracking-realtime",children:e.jsx(ce,{})})}var Z={VITE_BASE_PATH:"/mbw_desk",VITE_KEY_MAP:"wtpM0U1ZmE2s87LEZNSHf63Osc1a2sboaozCQNsy",VITE_API_KEY:"w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc",BASE_URL:"/assets/mbw_dms/mbw_fe/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function pe(){const f=Q(),[_,C]=m.useState({luot_vt:0,don_hang:0,doanh_so:0}),[w,b]=m.useState({so_nv_online:0,so_nv_offline:0}),[S,z]=m.useState([]),[o,q]=m.useState([]),[G,a]=m.useState([]),[H,v]=m.useState(!0),R=async()=>{const t=await F.get("/api/method/mbw_dms.api.report.real_time_monitoring_report");t.message=="Thành công"&&C(t.result)},B=[{dataIndex:"stt",width:"50px"},{title:"Nhân viên",dataIndex:"emp_name",render:(t,i)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{height:"48px",width:"48px",borderRadius:"12px"},children:i.pic_profile!=null?e.jsx("div",{style:{width:"48px",height:"48px",backgroundImage:`url("${i.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"48px",height:"48px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>N(i),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:t}),i.emp_id!=null&&e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",i.emp_id]})]})]})},{title:"Thời gian di chuyển",dataIndex:"moving"},{title:"Thời gian dừng",dataIndex:"stopping"},{title:"Thời gian viếng thăm",dataIndex:"visiting"}],g=t=>{b({so_nv_online:t.online,so_nv_offline:t.offline})},[O,A]=m.useState({apiKey:"w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc",projectId:""}),W=t=>t.toLocaleString("en-US").replace(/,/g,"."),E=t=>t<1e3?`${Math.round(t)} m`:`${Math.round(t/1e3)} km`,c=t=>t<60?`${Math.round(t)} giây`:t>=60&&t<3600?`${Math.round(t/60)} phút`:`${Math.round(t/3600)} giờ`,y=t=>{f(`/employee-monitor-detail/${t._id}`)},j=()=>{f("/employee-monitor-detail/654c8a12d65d3e52f2d286de")},N=t=>{t.objectId!=null?f(`/employee-monitor-detail/${t.objectId}`):f("/employee-monitor-detail")},T=(t,i)=>{for(let s=0;s<i.length;s++)for(let d=0;d<t.length;d++)if(i[s].object_id!=null&&i[s].object_id==t[d].object._id){i[s].summary=i[s].summary;break}else i[s].summary={};let l=i.sort((s,d)=>{if(s.summary!=null&&s.summary.move!=null&&d.summary!=null&&d.summary.move!=null)return d.summary.move.distance-s.summary.move.distance}),n=[];for(let s=0;s<l.length&&s!=5;s++)n.push({stt:s+1,pic_profile:l[s].avatar!=null?l[s].avatar:null,emp_name:l[s].employee_name,emp_id:l[s].name,distance:l[s].summary!=null&&l[s].summary.move!=null?E(l[s].summary.move.distance):E(0),objectId:l[s].object_id});console.log(n),z(n)},h=async t=>{let l=new Date().getTime()/1e3,n=await F(`/api/method/mbw_dms.api.user.get_list_top_employee?from_date=${l}&to_date=${l}`),s=[];n.message=="Thành công"&&(s=n.result);for(let r=0;r<t.length;r++)if(s.length>0)for(let p=0;p<s.length;p++)if(t[r].name==s[p].employee){t[r].today_visit=s[p].today_visit,t[r].must_visit=s[p].must_visit,t[r].sales_order=s[p].sales_order;break}else t[r].today_visit=0,t[r].must_visit=0,t[r].sales_order=0;else t[r].today_visit=0,t[r].must_visit=0,t[r].sales_order=0;console.log(t);let d=t.sort((r,p)=>p.sales_order-r.sales_order);console.log(d);let u=[];for(let r=0;r<d.length&&r!=5;r++){let p=d[r];u.push({s1tt:r+1,pic_profile:p.avatar!=null&&p.avatar!=""?p.avatar:null,emp_name:p.employee_name,emp_id:p.name,visiting:`${p.today_visit}/${p.must_visit}`,boxing:p.sales_order,objectId:p.object_id})}console.log(u),q(u)},x=(t,i)=>{for(let n=0;n<i.length;n++)for(let s=0;s<t.length;s++)if(i[n].object_id!=null&&i[n].object_id==t[s].object._id){i[n].summary=i[n].summary;break}else i[n].summary={};let l=[];for(let n=0;n<i.length;n++)l.push({stt:n+1,pic_profile:i[n].avatar!=null?i[n].avatar:null,emp_name:i[n].employee_name,emp_id:i[n].name,moving:i[n].summary!=null&&i[n].summary.move!=null?c(i[n].summary.move.totalTime):c(0),stopping:i[n].summary!=null&&i[n].summary.stop!=null?c(i[n].summary.stop.totalTime):c(0),visiting:i[n].summary!=null&&i[n].summary.checkin!=null?c(i[n].summary.checkin.totalTime):c(0),objectId:i[n].object_id});a(l)};return m.useEffect(()=>{(async()=>{v(!0),R();const t=await F.get("/api/method/mbw_dms.api.user.get_projectID");A(d=>({...d,projectId:t.result["Project ID"]}));let i=await F("/api/method/mbw_dms.api.user.get_list_employees"),l=[];i.message=="Thành công"&&(l=i.result),console.log(l);let n=`https://api.ekgis.vn/v2/tracking/locationHistory/summary/lastest/${t.result["Project ID"]}/null?api_key=${O.apiKey}`,s=await X.get(n);if(Z.VITE_BASE_URL&&(s=s.data),console.log("Realtime ",Z.VITE_BASE_URL),s?.results.length>0){let d=s?.results;T(d,JSON.parse(JSON.stringify(l))),x(d,JSON.parse(JSON.stringify(l)))}h(JSON.parse(JSON.stringify(l))),v(!1)})()},[]),e.jsxs(e.Fragment,{children:[H&&e.jsx("div",{style:{position:"fixed",width:"100%",height:"85%",backgroundColor:"rgba(0, 0, 0, 0.5)",zIndex:9999,display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsx(Y,{indicator:e.jsx(ee,{style:{fontSize:30,color:"#fff"},spin:!0})})}),e.jsxs(I,{className:"flex flex-wrap justify-between items-center px-0 pt-5",children:[e.jsx("div",{className:"flex justify-center items-center",children:e.jsx("span",{className:"text-2xl font-semibold leading-[21px]",children:"Giám sát thời gian thực"})}),e.jsx("div",{className:"flex",children:e.jsx(te,{onClick:j,children:"Xem dữ liệu lịch sử"})})]}),e.jsxs(I,{style:{marginTop:"20px"},gutter:5,children:[e.jsx(k,{span:12,className:"card-container",children:e.jsxs("div",{style:{display:"block",width:"100%"},children:[e.jsxs(I,{gutter:10,style:{width:"100%"},children:[e.jsx(k,{span:12,className:"card-container",children:e.jsx($,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#22C55E1F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_user_online"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Số nhân viên online"}),e.jsx("div",{className:"content_card",children:w.so_nv_online})]})]})})})}),e.jsx(k,{span:12,className:"card-container",children:e.jsx($,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#FF56301F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_user_offline"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Số nhân viên offline"}),e.jsx("div",{className:"content_card",children:w.so_nv_offline})]})]})})})})]}),e.jsxs(I,{gutter:10,style:{width:"100%",marginTop:"13px"},children:[e.jsx(k,{span:8,className:"card-container",children:e.jsx($,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#00B8D91F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_visiting"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng lượt viếng thăm"}),e.jsx("div",{className:"content_card",children:_.luot_vt})]})]})})})}),e.jsx(k,{span:8,className:"card-container",children:e.jsx($,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#FFAB001F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"48px",backgroundSize:"Cover"},className:"icon_boxing"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng đơn hàng"}),e.jsx("div",{className:"content_card",children:_.don_hang})]})]})})})}),e.jsx(k,{span:8,className:"card-container",children:e.jsx($,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#1877F21F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_money"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng doanh số"}),e.jsx("div",{className:"content_card",children:W(_.doanh_so)})]})]})})})})]}),e.jsxs(I,{gutter:10,style:{width:"100%",marginTop:"13px"},children:[e.jsx(k,{span:12,className:"card-container",children:e.jsx($,{children:e.jsxs("div",{className:"wrap-card-container",children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px"},children:"Quãng đường di chuyển của nhân viên"}),e.jsx("div",{style:{height:210,overflow:"auto"},children:e.jsx(V,{itemLayout:"horizontal",dataSource:S,renderItem:(t,i)=>e.jsx(V.Item,{children:e.jsxs("div",{className:"flex items-center justify-between",style:{width:"100%"},children:[e.jsxs("div",{className:"flex items-center",children:[e.jsxs("div",{className:"flex items-center justify-center",style:{width:"24px",height:"24px"},children:[i==0&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_first"}),i==1&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_second"}),i==2&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_third"})]}),e.jsx("div",{className:"mx-3",children:t.stt}),e.jsx("div",{className:"flex items-center justify-center",style:{height:"42px",width:"42px",borderRadius:"12px"},children:t.pic_profile!=null?e.jsx("div",{style:{width:"42px",height:"42px",backgroundImage:`url("${t.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"42px",height:"42px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>N(t),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:t.emp_name}),t.emp_id!=null&&e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",t.emp_id]})]})]}),e.jsx("div",{style:{marginRight:"10px",fontWeight:500,fontSize:"14px",lineHeight:"22px",color:"#1877F2"},children:t.distance})]})})})})]})})}),e.jsx(k,{span:12,className:"card-container",children:e.jsx($,{children:e.jsxs("div",{className:"wrap-card-container",children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px"},children:"Danh sách nhân viên"}),e.jsx("div",{style:{height:210,overflow:"auto"},children:e.jsx(V,{itemLayout:"horizontal",dataSource:o,renderItem:t=>e.jsx(V.Item,{children:e.jsxs("div",{className:"flex items-center justify-between",style:{width:"100%"},children:[e.jsxs("div",{className:"flex items-center",style:{width:"70%"},children:[e.jsx("div",{className:"flex items-center justify-center",style:{height:"48px",width:"48px",borderRadius:"12px"},children:t.pic_profile!=null?e.jsx("div",{style:{width:"48px",height:"48px",backgroundImage:`url("${t.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"48px",height:"48px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>N(t),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:t.emp_name}),e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",t.emp_id]})]})]}),e.jsxs("div",{style:{width:"30%"},className:"flex",children:[e.jsxs("div",{className:"items-center mx-3 flex",style:{flexDirection:"column"},children:[e.jsx("div",{style:{fontWeight:400,fontSize:"14px",lineHeight:"22px"},children:t.visiting}),e.jsx("div",{className:"flex items-center justify-center",style:{width:"20px",height:"20px"},children:e.jsx("div",{style:{width:"14px",height:"17px",backgroundSize:"Cover"},className:"icon_visiting"})})]}),e.jsxs("div",{className:"items-center mx-3 flex",style:{flexDirection:"column"},children:[e.jsx("div",{style:{fontWeight:400,fontSize:"14px",lineHeight:"22px"},children:t.boxing}),e.jsx("div",{className:"flex items-center justify-center",style:{width:"20px",height:"20px"},children:e.jsx("div",{style:{width:"16px",height:"17px",backgroundSize:"Cover"},className:"icon_boxing"})})]})]})]})})})})]})})})]}),e.jsx(I,{gutter:10,style:{width:"100%",marginTop:"13px"},children:e.jsx(k,{span:24,className:"card-container",children:e.jsxs(le,{children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px",paddingLeft:"10px",paddingBottom:"10px",paddingTop:"10px"},children:"Thống kê thời gian di chuyển, thời gian dừng, thời gian viếng thăm của nhân viên"}),e.jsx(ie,{style:{height:"100%"},pagination:!1,scroll:{y:350},columns:B,dataSource:G})]})})})]})}),e.jsx(k,{span:12,className:"card-container",children:e.jsx(oe,{children:e.jsx("div",{style:{height:"100%"},children:O.projectId&&e.jsx(de,{options:O,onClickPopup:y,status:g})})})})]})]})}function he(){const[f,_]=m.useState([]);m.useState("");const[C,w]=m.useState("");m.useState(""),m.useState(""),m.useState(""),m.useState(""),m.useState("");let b=ne(C,500);return m.useEffect(()=>{(async()=>{let S=await F.get("/api/method/frappe.desk.search.search_link",{params:{txt:b,doctype:"Department",ignore_user_permissions:0,query:""}}),{message:z}=S;console.log("Customer Group",z),_(z.map(o=>({value:o.value.trim(),label:o.value.trim()})))})()},[b]),e.jsx(e.Fragment,{children:e.jsx(pe,{})})}function fe(){return e.jsxs(e.Fragment,{children:[e.jsx(se,{children:e.jsx("title",{children:" EmployeeMonitor"})}),e.jsx(he,{})]})}export{fe as default};
