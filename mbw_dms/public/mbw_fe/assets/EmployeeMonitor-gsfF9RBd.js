import{W as h,L as e,aT as M,$ as Q,a1 as H,bB as X,bC as Y,aK as ee,R as L,Q as te,P as y,a4 as se,a8 as ie}from"./index-Fp4LXqz2.js";import{u as ne}from"./useDebount-xkOzAY48.js";import{e as ae,b as re,W as z,a as le,c as oe}from"./WrapperCard-LGk5K0QS.js";import{L as K}from"./index-eyRN9EHj.js";function ce(){const[x,j]=h.useState(!1),D=()=>{j(!x)},k={iconOnline:"https://files.ekgis.vn/sdks/tracking/assets/check-icon.png",iconOffline:"https://files.ekgis.vn/sdks/tracking/assets/offline-marker.png"};return e.jsxs("div",{id:"ekmapplf_tracking_legend",className:"ekmapplf_tracking-map-legend",children:[e.jsxs("div",{className:"ekmapplf_tracking-legend-title",onClick:D,children:[e.jsx("span",{className:`icon ${x?"ekmapplf_tracking-icon-square-minus":"ekmapplf_tracking-icon-square-plus"}`,style:{filter:"invert(100%) sepia(100%) saturate(0%) hue-rotate(187deg) brightness(105%) contrast(103%)"}}),e.jsx("span",{children:"Chú giải bản đồ"})]}),e.jsx("div",{className:`ekmapplf_tracking-legend-body ${x?"open":""}`,style:{maxHeight:x?"none":"0"},children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("span",{className:"ekmapplf_tracking-legend-icon",style:{backgroundImage:`url(${k.iconOnline})`}}),"Vị trí nhân viên Online"]}),e.jsxs("li",{children:[e.jsx("span",{className:"ekmapplf_tracking-legend-icon",style:{backgroundImage:`url(${k.iconOffline})`}}),"Vị trí nhân viên Offline"]})]})})]})}const R=window.ekmapplf;function de({options:x,onClickPopup:j,status:D}){const k=h.useRef(null),f=h.useRef(null),_=h.useRef(null),O=h.useRef({}),v=h.useRef({}),g=ae({},{center:[105,17],zoom:4.5,reloadTime:6e4,iconOnline:"https://files.ekgis.vn/sdks/tracking/assets/check-icon.png",iconOffline:"https://files.ekgis.vn/sdks/tracking/assets/offline-marker.png"},x),V=async()=>{try{f.current,f.current=new M.Map({container:k.current,center:g.center,zoom:g.zoom,minZoom:1,pitch:30});var a=f.current;a.setPadding({top:100,bottom:100,left:100,right:100}),new R.VectorBaseMap("OSM:Bright",g.apiKey).addTo(a);var I=new R.control.BaseMap({id:"ekmapplf_tracking_ctrl_basemap",baseLayers:[{id:"OSM:Bright",title:"Bản đồ nền Sáng",thumbnail:"https://docs.ekgis.vn/assets/map-sang.png",width:"50px",height:"50px"},{id:"OSM:Standard",title:"Bản đồ nền Tiêu chuẩn",thumbnail:"https://docs.ekgis.vn/assets/map-chuan.png",width:"50px",height:"50px"},{id:"OSM:Gray",title:"Bản đồ nền Xám",thumbnail:"https://docs.ekgis.vn/assets/xam-map.png",width:"50px",height:"50px"},{id:"OSM:Night",title:"Bản đồ nền Đêm",thumbnail:"https://docs.ekgis.vn/assets/dem-map.png",width:"50px",height:"50px"},{id:"OSM:Dark",title:"Bản đồ nền Đêm xanh coban",thumbnail:"https://docs.ekgis.vn/assets/xanhcoban-map.png",width:"50px",height:"50px"},{id:"OSM:Pencil",title:"Bản đồ nền Bút chì",thumbnail:"https://docs.ekgis.vn/assets/chi-map.png",width:"50px",height:"50px"},{id:"OSM:Pirates",title:"Bản đồ nền Cổ điển",thumbnail:"https://docs.ekgis.vn/assets/dien-map.png",width:"50px",height:"50px"},{id:"OSM:Wood",title:"Bản đồ nền Gỗ",thumbnail:"https://docs.ekgis.vn/assets/go-map.png",width:"50px",height:"50px"}]});a.addControl(I,"bottom-left"),I.on("changeBaseLayer",async function(l){await new R.VectorBaseMap(l.layer,g.apiKey).addTo(a),setTimeout(()=>{P()},500)}),a.addControl(new M.NavigationControl({visualizePitch:!0}),"bottom-right");var w=!1;a.getPitch()>0?w=!0:w=!1;var B="maplibregl-terrain2d-control",F="Hiển thị 2D";w||(B="maplibregl-terrain3d-control",F="Bản đồ 3D");let N=new R.control.Button({className:"btn-ctl-group "+B,icon:"none",tooltip:F});N.on("click",l=>{w=!w,w?(l._div.className=l._div.className.replaceAll("maplibregl-terrain3d-control","maplibregl-terrain2d-control"),l._div.title="Hiển thị 2D"):(l._div.className=l._div.className.replaceAll("maplibregl-terrain2d-control","maplibregl-terrain3d-control"),l._div.title="Hiển thị 3D"),w?(a.easeTo({pitch:60}),a.setLayoutProperty("building-3d","visibility","visible")):(a.easeTo({pitch:0}),a.setLayoutProperty("building-3d","visibility","none"))}),a.addControl(N,"bottom-right"),a.addControl(new M.FullscreenControl,"top-right"),a.on("load",async()=>{try{let l=await P();if(l.features.length){let b=re(l);a.fitBounds(b,{padding:100,maxZoom:14,duration:1e3})}_.current&&clearInterval(_.current),_.current=setInterval(()=>{A(g.objectId)},6e4)}catch(l){console.error("Error:",l)}});const P=async()=>{const l=async()=>{let b=`https://api.ekgis.vn/tracking/${g.projectId}/objects?api_key=${g.apiKey}`;return(await(await fetch(b)).json()).results.objects.map(T=>T._id)||[]};return g.objectId||(g.objectId=await l(g.projectId)),await A(g.objectId)},A=async l=>{if(!Array.isArray(l))return;const b=async d=>{try{let s=function(E){const q=new Date().setHours(0,0,0,0);return new Date(E).setHours(0,0,0,0)===q};const o=`https://api.ekgis.vn/v2/tracking/locationHistory/position/${g.projectId}/${d}/lastest?api_key=${g.apiKey}`,n=`https://api.ekgis.vn/v1/checkin/${g.projectId}/${d}/lastcheckin?api_key=${g.apiKey}`,i=await fetch(o),c=await fetch(n),m=await i.json(),r=await c.json();if(!m.position&&!r.length)return{_id:m.summary._id,name:m.summary.name,status:"offline"};const u=m.position?Date.parse(m.position.timestamp):0,G=r.length?Date.parse(r[0].timestamp):0,$=u>G;var p=$?u:G;if(s(p)){var t="offline";const E=$?[m.position.coords.longitude,m.position.coords.latitude]:r[0].coordinates.split(",").map(U=>parseFloat(U)),q=await W(E);return $?Date.parse(new Date)-p<=600*1e3&&(t="online"):(r[0].timestamp.time_checkout==""||Date.parse(new Date)-Date.parse(r[0].timestamp.time_checkout)<=600*1e3)&&(t="online"),{_id:m.summary._id,name:m.summary.name,type:$?"tracking":"checkin",position:$?m.position:r[0],coordinates:E,address:q,status:t,timestamp:p}}else return{_id:m.summary._id,name:m.summary.name,status:"offline"}}catch(s){throw console.error("Error getting last position:",s),s}};var S=await Promise.all(l.map(d=>b(d).catch(p=>null)));S=S.filter(d=>d!==null);const C=S.reduce((d,p)=>(p.status==="offline"?d.offline++:p.status==="online"&&d.online++,d),{offline:0,online:0});D(C);const T={type:"FeatureCollection",features:await Promise.all(S.map(d=>d.type?{type:"Feature",properties:d,geometry:{type:"Point",coordinates:d.coordinates}}:null)).then(d=>d.filter(p=>p!==null))};if(a.getSource("ek-tracking-live-source"))a.getSource("ek-tracking-live-source").setData(T);else{a.addSource("ek-tracking-live-source",{type:"geojson",data:T,cluster:!0,clusterMaxZoom:14,clusterRadius:55}),a.addLayer({id:"ek-tracking-live-clusters",type:"circle",source:"ek-tracking-live-source",filter:["==","cluster",!0],paint:{"circle-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-radius":12,"circle-stroke-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-stroke-opacity":.7,"circle-stroke-width":5}}),a.addLayer({id:"ek-tracking-live-cluster-count",type:"symbol",source:"ek-tracking-live-source",filter:["==","cluster",!0],layout:{"text-field":"{point_count_abbreviated}","text-size":12}}),a.on("mouseenter","ek-tracking-live-clusters",()=>{a.getCanvas().style.cursor="pointer"}),a.on("mouseleave","ek-tracking-live-clusters",()=>{a.getCanvas().style.cursor=""}),a.on("click","ek-tracking-live-clusters",async p=>{const t=a.queryRenderedFeatures(p.point,{layers:["ek-tracking-live-clusters"]}),s=t[0].properties.cluster_id,o=await a.getSource("ek-tracking-live-source").getClusterExpansionZoom(s);a.easeTo({center:t[0].geometry.coordinates,zoom:o+.01})});async function d(){const p={},t=a.querySourceFeatures("ek-tracking-live-source");for(let s=0;s<t.length;s++){const o=t[s].geometry.coordinates,n=t[s].properties;if(n.cluster)continue;const i=n._id;let c=O.current[i];if(c)c.getElement().innerHTML=`
                                    <div class="marker-name">${n.name}</div>
                                    <div class="marker-img-${n.status==="online"?"online":"offline"}"></div>`,c.setLngLat(o);else{const m=document.createElement("div");m.className="marker-employee",m.innerHTML=`
                                    <div class="marker-name">${n.name}</div>
                                    <div class="marker-img-${n.status==="online"?"online":"offline"}"></div>`;let r=new M.Popup({offset:[0,-27],closeButton:!1}).setHTML(`<div class="ek-tracking-his-popup-info">
                                            <b>${n.name}</b>
                                        </div>
                                        <div class="ek-tracking-his-popup-info">
                                            <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-marker ekmapplf_tracking-icon-default-color"></span>
                                            <span>${n.address}</span>
                                        </div>
                                        <div class="ek-tracking-his-popup-info" style="justify-content: end;">
                                            <span class="show-his">Xem lịch sử</span>
                                        </div>
                                        `);r.on("open",()=>{m.querySelector(".marker-name").style.display="none",r.getElement().querySelector(".show-his").addEventListener("click",()=>{j({_id:n._id,name:n.name})})}),r.on("close",()=>{m.querySelector(".marker-name").style.removeProperty("display")}),c=O.current[i]=new M.Marker({element:m,anchor:"bottom"}).setPopup(r).setLngLat(o)}p[i]=c,v.current[i]&&(v.current[i].remove(),c.addTo(a))}for(let s in v.current)p[s]||v.current[s].remove();v.current=p}a.on("data",p=>{p.sourceId!=="ek-tracking-live-source"||!p.isSourceLoaded||(a.on("move",d),a.on("moveend",d),d())})}return T},W=async l=>new Promise((b,S)=>{const C={"point.lon":l[0],"point.lat":l[1]};new R.service.Geocoding(g.apiKey).reverse(C,(d,p)=>{if(d)S("Không có thông tin");else{const t=p.results.length>0?p.results[0].formatted_address:"Không có thông tin";b(t)}})})}catch(N){console.error("Error initializing map:",N)}};return h.useEffect(()=>(V(),()=>{f.current&&f.current.remove(),_.current&&clearInterval(_.current)}),[x]),e.jsx("div",{ref:k,id:"ekmap-tracking-realtime",children:e.jsx(ce,{})})}var Z={VITE_BASE_PATH:"/mbw_desk",VITE_KEY_MAP:"wtpM0U1ZmE2s87LEZNSHf63Osc1a2sboaozCQNsy",VITE_API_KEY:"w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc",BASE_URL:"/assets/mbw_dms/mbw_fe/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function he(){const x=Q(),[j,D]=h.useState({luot_vt:0,don_hang:0,doanh_so:0}),[k,f]=h.useState({so_nv_online:0,so_nv_offline:0}),[_,O]=h.useState([]),[v,J]=h.useState([]),[g,V]=h.useState([]),[a,I]=h.useState(!0),w=async()=>{const t=await H.get("/api/method/mbw_dms.api.report.real_time_monitoring_report");t.message=="Thành công"&&D(t.result)},B=[{dataIndex:"stt",width:"50px"},{title:"Nhân viên",dataIndex:"emp_name",render:(t,s)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{height:"48px",width:"48px",borderRadius:"12px"},children:s.pic_profile!=null?e.jsx("div",{style:{width:"48px",height:"48px",backgroundImage:`url("${s.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"48px",height:"48px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>C(s),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:t}),s.emp_id!=null&&e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",s.emp_id]})]})]})},{title:"Thời gian di chuyển",dataIndex:"moving"},{title:"Thời gian dừng",dataIndex:"stopping"},{title:"Thời gian viếng thăm",dataIndex:"visiting"}],F=t=>{f({so_nv_online:t.online,so_nv_offline:t.offline})},[N,P]=h.useState({apiKey:"w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc",projectId:""}),A=t=>t.toLocaleString("en-US").replace(/,/g,"."),W=t=>t<1e3?`${Math.round(t)} m`:`${Math.round(t/1e3)} km`,l=t=>t<60?`${Math.round(t)} giây`:t>=60&&t<3600?`${Math.round(t/60)} phút`:`${Math.round(t/3600)} giờ`,b=t=>{x(`/employee-monitor-detail/${t._id}`)},S=()=>{x("/employee-monitor-detail")},C=t=>{t.objectId!=null?x(`/employee-monitor-detail/${t.objectId}`):x("/employee-monitor-detail")},T=(t,s)=>{for(let i=0;i<s.length;i++)for(let c=0;c<t.length;c++)if(s[i].object_id!=null&&s[i].object_id==t[c].object._id){s[i].summary=s[i].summary;break}else s[i].summary={};let o=s.sort((i,c)=>{if(i.summary!=null&&i.summary.move!=null&&c.summary!=null&&c.summary.move!=null)return c.summary.move.distance-i.summary.move.distance}),n=[];for(let i=0;i<o.length&&i!=5;i++)n.push({stt:i+1,pic_profile:o[i].avatar!=null?o[i].avatar:null,emp_name:o[i].employee_name,emp_id:o[i].name,distance:o[i].summary!=null&&o[i].summary.move!=null?W(o[i].summary.move.distance):W(0),objectId:o[i].object_id});console.log(n),O(n)},d=async t=>{let o=new Date().getTime()/1e3,n=await H(`/api/method/mbw_dms.api.user.get_list_top_employee?from_date=${o}&to_date=${o}`),i=[];n.message=="Thành công"&&(i=n.result);for(let r=0;r<t.length;r++)if(i.length>0)for(let u=0;u<i.length;u++)if(t[r].name==i[u].employee){t[r].today_visit=i[u].today_visit,t[r].must_visit=i[u].must_visit,t[r].sales_order=i[u].sales_order;break}else t[r].today_visit=0,t[r].must_visit=0,t[r].sales_order=0;else t[r].today_visit=0,t[r].must_visit=0,t[r].sales_order=0;console.log(t);let c=t.sort((r,u)=>u.sales_order-r.sales_order);console.log(c);let m=[];for(let r=0;r<c.length&&r!=5;r++){let u=c[r];m.push({s1tt:r+1,pic_profile:u.avatar!=null&&u.avatar!=""?u.avatar:null,emp_name:u.employee_name,emp_id:u.name,visiting:`${u.today_visit}/${u.must_visit}`,boxing:u.sales_order,objectId:u.object_id})}console.log(m),J(m)},p=(t,s)=>{for(let n=0;n<s.length;n++)for(let i=0;i<t.length;i++)if(s[n].object_id!=null&&s[n].object_id==t[i].object._id){s[n].summary=s[n].summary;break}else s[n].summary={};let o=[];for(let n=0;n<s.length;n++)o.push({stt:n+1,pic_profile:s[n].avatar!=null?s[n].avatar:null,emp_name:s[n].employee_name,emp_id:s[n].name,moving:s[n].summary!=null&&s[n].summary.move!=null?l(s[n].summary.move.totalTime):l(0),stopping:s[n].summary!=null&&s[n].summary.stop!=null?l(s[n].summary.stop.totalTime):l(0),visiting:s[n].summary!=null&&s[n].summary.checkin!=null?l(s[n].summary.checkin.totalTime):l(0),objectId:s[n].object_id});V(o)};return h.useEffect(()=>{(async()=>{I(!0),w();const t=await H.get("/api/method/mbw_dms.api.user.get_projectID");P(c=>({...c,projectId:t.result["Project ID"]}));let s=await H("/api/method/mbw_dms.api.user.get_list_employees"),o=[];s.message=="Thành công"&&(o=s.result),console.log(o);let n=`https://api.ekgis.vn/v2/tracking/locationHistory/summary/lastest/${t.result["Project ID"]}/null?api_key=${N.apiKey}`,i=await X.get(n);if(Z.VITE_BASE_URL&&(i=i.data),console.log("Realtime ",Z.VITE_BASE_URL),i?.results.length>0){let c=i?.results;T(c,JSON.parse(JSON.stringify(o))),p(c,JSON.parse(JSON.stringify(o)))}d(JSON.parse(JSON.stringify(o))),I(!1)})()},[]),e.jsxs(e.Fragment,{children:[a&&e.jsx("div",{style:{position:"fixed",width:"100%",height:"85%",backgroundColor:"rgba(0, 0, 0, 0.5)",zIndex:9999,display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsx(Y,{indicator:e.jsx(ee,{style:{fontSize:30,color:"#fff"},spin:!0})})}),e.jsxs(L,{className:"flex flex-wrap justify-between items-center px-0 pt-5",children:[e.jsx("div",{className:"flex justify-center items-center",children:e.jsx("span",{className:"text-2xl font-semibold leading-[21px]",children:"Giám sát thời gian thực"})}),e.jsx("div",{className:"flex",children:e.jsx(te,{onClick:S,children:"Xem dữ liệu lịch sử"})})]}),e.jsxs(L,{style:{marginTop:"20px"},gutter:5,children:[e.jsx(y,{span:12,className:"card-container",children:e.jsxs("div",{style:{display:"block",width:"100%"},children:[e.jsxs(L,{gutter:10,style:{width:"100%"},children:[e.jsx(y,{span:12,className:"card-container",children:e.jsx(z,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#22C55E1F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_user_online"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Số nhân viên online"}),e.jsx("div",{className:"content_card",children:k.so_nv_online})]})]})})})}),e.jsx(y,{span:12,className:"card-container",children:e.jsx(z,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#FF56301F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_user_offline"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Số nhân viên offline"}),e.jsx("div",{className:"content_card",children:k.so_nv_offline})]})]})})})})]}),e.jsxs(L,{gutter:10,style:{width:"100%",marginTop:"13px"},children:[e.jsx(y,{span:8,className:"card-container",children:e.jsx(z,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#00B8D91F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_visiting"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng lượt viếng thăm"}),e.jsx("div",{className:"content_card",children:j.luot_vt})]})]})})})}),e.jsx(y,{span:8,className:"card-container",children:e.jsx(z,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#FFAB001F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"48px",backgroundSize:"Cover"},className:"icon_boxing"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng đơn hàng"}),e.jsx("div",{className:"content_card",children:j.don_hang})]})]})})})}),e.jsx(y,{span:8,className:"card-container",children:e.jsx(z,{children:e.jsx("div",{className:"wrap-card-container",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex items-center justify-center",style:{width:"56px",height:"56px",backgroundColor:"#1877F21F",gap:"8px",borderRadius:"15px"},children:e.jsx("div",{style:{width:"44px",height:"44px",backgroundSize:"Cover"},className:"icon_money"})}),e.jsxs("div",{style:{marginLeft:"10px"},children:[e.jsx("div",{className:"title_card",children:"Tổng doanh số"}),e.jsx("div",{className:"content_card",children:A(j.doanh_so)})]})]})})})})]}),e.jsxs(L,{gutter:10,style:{width:"100%",marginTop:"13px"},children:[e.jsx(y,{span:12,className:"card-container",children:e.jsx(z,{children:e.jsxs("div",{className:"wrap-card-container",children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px"},children:"Quãng đường di chuyển của nhân viên"}),e.jsx("div",{style:{height:210,overflow:"auto"},children:e.jsx(K,{itemLayout:"horizontal",dataSource:_,renderItem:(t,s)=>e.jsx(K.Item,{children:e.jsxs("div",{className:"flex items-center justify-between",style:{width:"100%"},children:[e.jsxs("div",{className:"flex items-center",children:[e.jsxs("div",{className:"flex items-center justify-center",style:{width:"24px",height:"24px"},children:[s==0&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_first"}),s==1&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_second"}),s==2&&e.jsx("div",{style:{width:"24px",height:"24px",backgroundSize:"Cover"},className:"icon_third"})]}),e.jsx("div",{className:"mx-3",children:t.stt}),e.jsx("div",{className:"flex items-center justify-center",style:{height:"42px",width:"42px",borderRadius:"12px"},children:t.pic_profile!=null?e.jsx("div",{style:{width:"42px",height:"42px",backgroundImage:`url("${t.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"42px",height:"42px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>C(t),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:t.emp_name}),t.emp_id!=null&&e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",t.emp_id]})]})]}),e.jsx("div",{style:{marginRight:"10px",fontWeight:500,fontSize:"14px",lineHeight:"22px",color:"#1877F2"},children:t.distance})]})})})})]})})}),e.jsx(y,{span:12,className:"card-container",children:e.jsx(z,{children:e.jsxs("div",{className:"wrap-card-container",children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px"},children:"Danh sách nhân viên"}),e.jsx("div",{style:{height:210,overflow:"auto"},children:e.jsx(K,{itemLayout:"horizontal",dataSource:v,renderItem:t=>e.jsx(K.Item,{children:e.jsxs("div",{className:"flex items-center justify-between",style:{width:"100%"},children:[e.jsxs("div",{className:"flex items-center",style:{width:"70%"},children:[e.jsx("div",{className:"flex items-center justify-center",style:{height:"48px",width:"48px",borderRadius:"12px"},children:t.pic_profile!=null?e.jsx("div",{style:{width:"48px",height:"48px",backgroundImage:`url("${t.pic_profile}")`,backgroundSize:"Cover"}}):e.jsx("div",{style:{width:"48px",height:"48px",backgroundSize:"Cover"},className:"icon_user_default"})}),e.jsxs("div",{className:"mx-3",style:{cursor:"pointer"},onClick:()=>C(t),children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"21px"},children:t.emp_name}),e.jsxs("div",{style:{marginTop:"5px",fontWeight:400,fontSize:"12px",lineHeight:"21px"},children:["ID: ",t.emp_id]})]})]}),e.jsxs("div",{style:{width:"30%"},className:"flex",children:[e.jsxs("div",{className:"items-center mx-3 flex",style:{flexDirection:"column"},children:[e.jsx("div",{style:{fontWeight:400,fontSize:"14px",lineHeight:"22px"},children:t.visiting}),e.jsx("div",{className:"flex items-center justify-center",style:{width:"20px",height:"20px"},children:e.jsx("div",{style:{width:"14px",height:"17px",backgroundSize:"Cover"},className:"icon_visiting"})})]}),e.jsxs("div",{className:"items-center mx-3 flex",style:{flexDirection:"column"},children:[e.jsx("div",{style:{fontWeight:400,fontSize:"14px",lineHeight:"22px"},children:t.boxing}),e.jsx("div",{className:"flex items-center justify-center",style:{width:"20px",height:"20px"},children:e.jsx("div",{style:{width:"16px",height:"17px",backgroundSize:"Cover"},className:"icon_boxing"})})]})]})]})})})})]})})})]}),e.jsx(L,{gutter:10,style:{width:"100%",marginTop:"13px"},children:e.jsx(y,{span:24,className:"card-container",children:e.jsxs(le,{children:[e.jsx("div",{style:{fontWeight:500,fontSize:"14px",lineHeight:"28px",paddingLeft:"10px",paddingBottom:"10px",paddingTop:"10px"},children:"Thống kê thời gian di chuyển, thời gian dừng, thời gian viếng thăm của nhân viên"}),e.jsx(se,{style:{height:"100%"},pagination:!1,scroll:{y:350},columns:B,dataSource:g})]})})})]})}),e.jsx(y,{span:12,className:"card-container",children:e.jsx(oe,{children:e.jsx("div",{style:{height:"100%"},children:N.projectId&&e.jsx(de,{options:N,onClickPopup:b,status:F})})})})]})]})}function pe(){const[x,j]=h.useState([]);h.useState("");const[D,k]=h.useState("");h.useState(""),h.useState(""),h.useState(""),h.useState(""),h.useState("");let f=ne(D,500);return h.useEffect(()=>{(async()=>{let _=await H.get("/api/method/frappe.desk.search.search_link",{params:{txt:f,doctype:"Department",ignore_user_permissions:0,query:""}}),{message:O}=_;console.log("Customer Group",O),j(O.map(v=>({value:v.value.trim(),label:v.value.trim()})))})()},[f]),e.jsx(e.Fragment,{children:e.jsx(he,{})})}function fe(){return e.jsxs(e.Fragment,{children:[e.jsx(ie,{children:e.jsx("title",{children:" EmployeeMonitor"})}),e.jsx(pe,{})]})}export{fe as default};
