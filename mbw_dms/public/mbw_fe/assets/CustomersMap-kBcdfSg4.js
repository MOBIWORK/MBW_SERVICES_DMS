import{W as a,a0 as f,aS as d,L as c,bG as E}from"./index-lvht3I1V.js";import{H as F}from"./header-page-fHhjxqjW.js";function z(){const[u,y]=a.useState(""),[l,_]=a.useState([]),[p,x]=a.useState([]),e=a.useRef(null),[m,b]=a.useState(!1),[g,k]=a.useState(!0),v=()=>{b(!m)},C=()=>{k(!g),w()},w=()=>{const r=g?"none":"visible";e.current.getStyle().layers.forEach(t=>{t.id.includes("customer")&&e.current.setLayoutProperty(t.id,"visibility",r)})};a.useEffect(()=>{S()},[]),a.useEffect(()=>{u!=null&&u!=""&&j()},[u]),a.useEffect(()=>{N()},[p]),a.useEffect(()=>{B()},[l]);const S=async()=>{let r=await f.get("/api/method/mbw_dms.api.vgm.map_customer.get_config_api");y(r.result)},L=async()=>{let r=await f.get("/api/method/mbw_dms.api.vgm.map_customer.get_config_map?type_industry=fertilizer_store");console.log(r),_(r.result)},M=async()=>{let r=await f.get("/api/method/mbw_dms.api.selling.customer.get_customer_has_location");r.message=="Thành công"&&x(r.result)},j=()=>{e.current=new d.Map({container:"map",center:[108.485,16.449],zoom:5.43}),new ekmapplf.VectorBaseMap("OSM:Bright",u).addTo(e.current);var r=new ekmapplf.control.BaseMap({id:"basemap_control",baseLayers:[{id:"OSM:Bright",title:"Bản đồ nền Sáng",thumbnail:"https://docs.ekgis.vn/assets/map-sang.png",width:"50px",height:"50px"},{id:"OSM:Standard",title:"Bản đồ nền Tiêu chuẩn",thumbnail:"https://docs.ekgis.vn/assets/map-chuan.png",width:"50px",height:"50px"},{id:"OSM:Night",title:"Bản đồ nền Đêm",thumbnail:"https://docs.ekgis.vn/assets/dem-map.png",width:"50px",height:"50px"}]});e.current.addControl(r,"bottom-left"),r.on("changeBaseLayer",async function(i){await new ekmapplf.VectorBaseMap(i.layer,u).addTo(e.current)}),e.current.addControl(new d.NavigationControl({visualizePitch:!0}),"bottom-right");var t=!1;e.current.getPitch()>0?t=!0:t=!1;var o="maplibregl-terrain2d-control",s="Hiển thị 2D";t||(o="maplibregl-terrain3d-control",s="Bản đồ 3D");let n=new ekmapplf.control.Button({className:"btn-ctl-group "+o,icon:"none",tooltip:s});n.on("click",i=>{t=!t,t?(i._div.className=i._div.className.replaceAll("maplibregl-terrain3d-control","maplibregl-terrain2d-control"),i._div.title="Hiển thị 2D"):(i._div.className=i._div.className.replaceAll("maplibregl-terrain2d-control","maplibregl-terrain3d-control"),i._div.title="Hiển thị 3D"),t?(e.current.easeTo({pitch:60}),e.current.setLayoutProperty("building-3d","visibility","visible")):(e.current.easeTo({pitch:0}),e.current.setLayoutProperty("building-3d","visibility","none"))}),e.current.addControl(n,"bottom-right"),e.current.addControl(new d.FullscreenControl,"top-right"),e.current.on("load",async()=>{await L(),M()})},B=()=>{for(let r=0;r<l.length;r++)if(l[r].visible){let t=l[r].sources,o=l[r].layers;for(let s in t)e.current.getSource(s)||e.current.addSource(s,t[s]);for(let s=0;s<o.length;s++)e.current.getLayer(o[s].id)||e.current.addLayer(o[s])}},N=async()=>{let r={type:"FeatureCollection",features:[]};for(let t=0;t<p.length;t++){let o=JSON.parse(p[t].customer_location_primary),s={type:"Feature",geometry:{type:"Point",coordinates:[o.long,o.lat]},properties:p[t]};r.features.push(s)}if(e.current!=null&&e.current.isStyleLoaded())if(e.current.getSource("customer_clus"))e.current.getSource("customer_clus").setData(r);else{if(!e.current.getImage("marker-customer")){const t=await e.current.loadImage("https://sfademo.mbwcloud.com/files/check-icon.png");e.current.addImage("marker-customer",t.data)}e.current.addSource("customer_clus",{type:"geojson",data:r,cluster:!0,clusterRadius:12}),e.current.addLayer({id:"customer_clus-cluster",type:"circle",source:"customer_clus",maxzoom:16,filter:["has","point_count"],paint:{"circle-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-radius":12,"circle-stroke-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-stroke-opacity":.7,"circle-stroke-width":5}}),e.current.addLayer({id:"customer_clus-cluster-count",type:"symbol",source:"customer_clus",filter:["has","point_count"],layout:{"text-field":"{point_count}","text-size":12}}),e.current.on("mouseenter","customer_clus-uncluster",()=>{e.current.getCanvas().style.cursor="pointer"}),e.current.on("mouseleave","customer_clus-uncluster",()=>{e.current.getCanvas().style.cursor=""}),e.current.on("click","customer_clus-cluster",async t=>{const o=e.current.queryRenderedFeatures(t.point,{layers:["customer_clus-cluster"]}),s=o[0].properties.cluster_id,n=await e.current.getSource("customer_clus-cluster").getClusterExpansionZoom(s);e.current.easeTo({center:o[0].geometry.coordinates,zoom:n+.01})}),e.current.addLayer({id:"customer_clus-uncluster",type:"symbol",source:"customer_clus",filter:["!",["has","point_count"]],layout:{"icon-image":"marker-customer","icon-allow-overlap":!0,"icon-size":{stops:[[15,.7],[18,1]]}}}),e.current.addLayer({id:"customer_clus-title",type:"symbol",source:"customer_clus",filter:["!",["has","point_count"]],layout:{"text-field":["get","customer_name"],"text-font":["Roboto Medium"],"text-size":{stops:[[12,10],[13,11],[14,11],[15,11.5],[16,12.5],[20,16]]},"text-anchor":"top","text-max-width":9,"text-offset":[0,1.5],"text-padding":5},paint:{"text-color":"#ff5532","text-halo-color":"#ffffff","text-halo-width":1,"text-halo-blur":.5}}),e.current.on("click","customer_clus-uncluster",function(t){var o=t.features[0].geometry.coordinates.slice(),s=t.features[0].properties,n=`
                <div class="customer-popup-info">
                    <b>${s.customer_name}</b>
                </div>
            `;s.customer_primary_address!=null&&s.customer_primary_address!=""&&(n+=`
                <div class="customer-popup-info">
                    <span class="customer-popup-icon customer-icon-marker customer-icon-default-color"></span>
                    <span>${s.customer_primary_address}</span>
                </div>`),s.customer_primary_contact!=null&&s.customer_primary_contact!=""&&(n+=`
                <div class="customer-popup-info">
                    <span class="customer-popup-icon customer-icon-phone customer-icon-default-color"></span>
                    <span>${s.customer_primary_contact}</span>
                </div>`),new d.Popup().setLngLat(o).setHTML(n).addTo(e.current)})}},[h,D]=a.useState([]);return a.useEffect(()=>{D(l.map(r=>r.visible))},[l]),a.useEffect(()=>{console.log(h,"defaulCheckbox")},[h]),c.jsxs(c.Fragment,{children:[c.jsx(F,{title:"Bản đồ khách hàng"}),c.jsx("div",{id:"map",style:{width:"100%",height:"80vh",borderRadius:"20px"},children:c.jsxs("div",{id:"ekmapplf_tracking_legend",className:"ekmapplf_tracking-map-legend",children:[c.jsxs("div",{className:"ekmapplf_tracking-legend-title",onClick:v,children:[c.jsx("span",{className:`icon ${m?"ekmapplf_tracking-icon-square-minus":"ekmapplf_tracking-icon-square-plus"}`,style:{filter:"invert(100%) sepia(100%) saturate(0%) hue-rotate(187deg) brightness(105%) contrast(103%)"}}),c.jsx("span",{children:"Chú giải bản đồ"})]}),c.jsx("div",{className:`ekmapplf_tracking-legend-body ${m?"open":""}`,style:{maxHeight:m?"none":"0"},children:c.jsx("ul",{children:c.jsxs("li",{children:[c.jsx(E,{checked:g,onChange:C}),c.jsx("span",{className:"ekmapplf_tracking-legend-icon",style:{backgroundImage:"url('/checking.png')"}}),"Vị trí khách hàng"]})})})]})})]})}function I(){return c.jsx(z,{})}export{I as default};
