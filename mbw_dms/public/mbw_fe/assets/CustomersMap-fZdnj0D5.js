import{W as o,L as a,cy as M,a1 as S,aT as f}from"./index-g2Kbz0hi.js";import{H as E}from"./header-page-T-DN2hMW.js";const j=({mapConfig:u,onCheck:h})=>{const[m,y]=o.useState([]),[p,_]=o.useState([]),[e,d]=o.useState([]),[x,v]=o.useState(!0),g=c=>c.map(t=>({title:t.label,key:t.id,children:t.children?g(t.children):void 0})),b=g(u),k=c=>{console.log("onExpand",c),y(c),v(!1)},C=c=>{_(c),h(c)},w=(c,t)=>{console.log("onSelect",t),d(c)};return a.jsx(M,{checkable:!0,onExpand:k,expandedKeys:m,autoExpandParent:x,onCheck:C,checkedKeys:p,onSelect:w,selectedKeys:e,treeData:b})};function D(){const[u,h]=o.useState(""),[m,y]=o.useState([]),[p,_]=o.useState([]),e=o.useRef(null),[d,x]=o.useState(!1),v=()=>{x(!d)};o.useEffect(()=>{g()},[]),o.useEffect(()=>{u!=null&&u!=""&&C()},[u]),o.useEffect(()=>{w()},[p]),o.useEffect(()=>{},[m]);const g=async()=>{let t=await S.get("/api/method/mbw_dms.api.vgm.map_customer.get_config_api");h(t.result)},b=async()=>{let t=await S.get("/api/method/mbw_dms.api.vgm.map_customer.get_config_map");y(t.result)},k=async()=>{let t=await S.get("/api/method/mbw_dms.api.selling.customer.get_customer_has_location");t.message=="Thành công"&&_(t.result)},C=()=>{console.log(u),e.current=new f.Map({container:"map",center:[108.485,16.449],zoom:5.43}),new ekmapplf.VectorBaseMap("OSM:Bright",u).addTo(e.current);var t=new ekmapplf.control.BaseMap({id:"basemap_control",baseLayers:[{id:"OSM:Bright",title:"Bản đồ nền Sáng",thumbnail:"https://docs.ekgis.vn/assets/map-sang.png",width:"50px",height:"50px"},{id:"OSM:Standard",title:"Bản đồ nền Tiêu chuẩn",thumbnail:"https://docs.ekgis.vn/assets/map-chuan.png",width:"50px",height:"50px"},{id:"OSM:Night",title:"Bản đồ nền Đêm",thumbnail:"https://docs.ekgis.vn/assets/dem-map.png",width:"50px",height:"50px"}]});e.current.addControl(t,"bottom-left"),t.on("changeBaseLayer",async function(l){await new ekmapplf.VectorBaseMap(l.layer,u).addTo(e.current)}),e.current.addControl(new f.NavigationControl({visualizePitch:!0}),"bottom-right");var r=!1;e.current.getPitch()>0?r=!0:r=!1;var n="maplibregl-terrain2d-control",s="Hiển thị 2D";r||(n="maplibregl-terrain3d-control",s="Bản đồ 3D");let i=new ekmapplf.control.Button({className:"btn-ctl-group "+n,icon:"none",tooltip:s});i.on("click",l=>{r=!r,r?(l._div.className=l._div.className.replaceAll("maplibregl-terrain3d-control","maplibregl-terrain2d-control"),l._div.title="Hiển thị 2D"):(l._div.className=l._div.className.replaceAll("maplibregl-terrain2d-control","maplibregl-terrain3d-control"),l._div.title="Hiển thị 3D"),r?(e.current.easeTo({pitch:60}),e.current.setLayoutProperty("building-3d","visibility","visible")):(e.current.easeTo({pitch:0}),e.current.setLayoutProperty("building-3d","visibility","none"))}),e.current.addControl(i,"bottom-right"),e.current.addControl(new f.FullscreenControl,"top-right"),e.current.on("load",async()=>{await b(),k()})},w=async()=>{let t={type:"FeatureCollection",features:[]};for(let r=0;r<p.length;r++){let n=JSON.parse(p[r].customer_location_primary),s={type:"Feature",geometry:{type:"Point",coordinates:[n.long,n.lat]},properties:p[r]};t.features.push(s)}if(e.current!=null&&e.current.isStyleLoaded())if(e.current.getSource("customer_clus"))e.current.getSource("customer_clus").setData(t);else{if(!e.current.getImage("marker-customer")){const r=await e.current.loadImage("https://sfademo.mbwcloud.com/files/check-icon.png");e.current.addImage("marker-customer",r.data)}e.current.addSource("customer_clus",{type:"geojson",data:t,cluster:!0,clusterRadius:12}),e.current.addLayer({id:"customer_clus-cluster",type:"circle",source:"customer_clus",maxzoom:16,filter:["has","point_count"],paint:{"circle-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-radius":12,"circle-stroke-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-stroke-opacity":.7,"circle-stroke-width":5}}),e.current.addLayer({id:"customer_clus-cluster-count",type:"symbol",source:"customer_clus",filter:["has","point_count"],layout:{"text-field":"{point_count}","text-size":12}}),e.current.on("mouseenter","customer_clus-uncluster",()=>{e.current.getCanvas().style.cursor="pointer"}),e.current.on("mouseleave","customer_clus-uncluster",()=>{e.current.getCanvas().style.cursor=""}),e.current.on("click","customer_clus-cluster",async r=>{const n=e.current.queryRenderedFeatures(r.point,{layers:["customer_clus-cluster"]}),s=n[0].properties.cluster_id,i=await e.current.getSource("customer_clus-cluster").getClusterExpansionZoom(s);e.current.easeTo({center:n[0].geometry.coordinates,zoom:i+.01})}),e.current.addLayer({id:"customer_clus-uncluster",type:"symbol",source:"customer_clus",filter:["!",["has","point_count"]],layout:{"icon-image":"marker-customer","icon-allow-overlap":!0,"icon-size":{stops:[[15,.7],[18,1]]}}}),e.current.addLayer({id:"customer_clus-title",type:"symbol",source:"customer_clus",filter:["!",["has","point_count"]],layout:{"text-field":["get","customer_name"],"text-font":["Roboto Medium"],"text-size":{stops:[[12,10],[13,11],[14,11],[15,11.5],[16,12.5],[20,16]]},"text-anchor":"top","text-max-width":9,"text-offset":[0,1.5],"text-padding":5},paint:{"text-color":"#ff5532","text-halo-color":"#ffffff","text-halo-width":1,"text-halo-blur":.5}}),e.current.on("click","customer_clus-uncluster",function(r){var n=r.features[0].geometry.coordinates.slice(),s=r.features[0].properties,i=`
            <div class="customer-popup-info">
                <b>${s.customer_name}</b>
            </div>
        `;s.customer_primary_address!=null&&s.customer_primary_address!=""&&(i+=`
            <div class="customer-popup-info">
                <span class="customer-popup-icon customer-icon-marker customer-icon-default-color"></span>
                <span>${s.customer_primary_address}</span>
            </div>`),s.customer_primary_contact!=null&&s.customer_primary_contact!=""&&(i+=`
            <div class="customer-popup-info">
                <span class="customer-popup-icon customer-icon-phone customer-icon-default-color"></span>
                <span>${s.customer_primary_contact}</span>
            </div>`),new f.Popup().setLngLat(n).setHTML(i).addTo(e.current)})}},c=t=>{m.forEach(r=>{r.children.forEach(n=>{n.layers.forEach(i=>{const L=t.includes(i.id)?"visible":"none";e.current.setLayoutProperty(i.id,"visibility",L)})})})};return a.jsxs(a.Fragment,{children:[a.jsx(E,{title:"Bản đồ khách hàng"}),a.jsx("div",{id:"map",style:{width:"100%",height:"80vh",borderRadius:"20px"},children:a.jsxs("div",{id:"ekmapplf_tracking_legend",className:"ekmapplf_tracking-map-legend",children:[a.jsxs("div",{className:"ekmapplf_tracking-legend-title",onClick:v,children:[a.jsx("span",{className:`icon ${d?"ekmapplf_tracking-icon-square-minus":"ekmapplf_tracking-icon-square-plus"}`,style:{filter:"invert(100%) sepia(100%) saturate(0%) hue-rotate(187deg) brightness(105%) contrast(103%)"}}),a.jsx("span",{children:"Chú giải bản đồ"})]}),a.jsx("div",{className:`ekmapplf_tracking-legend-body ${d?"open":""}`,style:{maxHeight:d?"none":"0"},children:a.jsx(j,{mapConfig:m,onCheck:c})})]})})]})}function N(){return a.jsx(D,{})}export{N as default};
