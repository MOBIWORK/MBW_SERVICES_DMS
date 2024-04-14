import{W as i,a0 as h,aS as d,L as c}from"./index-U-ZTVs3o.js";import{H as L}from"./header-page-eZT8Y34Q.js";function j(){const[l,_]=i.useState(""),[u,y]=i.useState([]),[p,v]=i.useState([]),e=i.useRef(null),[m,x]=i.useState(!1),k=()=>{x(!m)};i.useEffect(()=>{b(),w(),C()},[]),i.useEffect(()=>{l!=null&&l!==""&&S()},[l,u,p]);const b=async()=>{let s=await h.get("/api/method/mbw_dms.api.vgm.map_customer.get_config_api");_(s.result)},w=async()=>{let s=await h.get("/api/method/mbw_dms.api.vgm.map_customer.get_config_map?type_industry=fertilizer_store");y(s.result)},C=async()=>{let s=await h.get("/api/method/mbw_dms.api.selling.customer.get_customer_has_location");s.message=="Thành công"&&v(s.result)},S=()=>{if(e.current==null){e.current=new d.Map({container:"map",center:[108.485,16.449],zoom:5.43}),new ekmapplf.VectorBaseMap("OSM:Bright",l).addTo(e.current);var s=new ekmapplf.control.BaseMap({id:"basemap_control",baseLayers:[{id:"OSM:Bright",title:"Bản đồ nền Sáng",thumbnail:"https://docs.ekgis.vn/assets/map-sang.png",width:"50px",height:"50px"},{id:"OSM:Standard",title:"Bản đồ nền Tiêu chuẩn",thumbnail:"https://docs.ekgis.vn/assets/map-chuan.png",width:"50px",height:"50px"},{id:"OSM:Night",title:"Bản đồ nền Đêm",thumbnail:"https://docs.ekgis.vn/assets/dem-map.png",width:"50px",height:"50px"}]});e.current.addControl(s,"bottom-left"),s.on("changeBaseLayer",async function(a){await new ekmapplf.VectorBaseMap(a.layer,l).addTo(e.current)}),e.current.addControl(new d.NavigationControl({visualizePitch:!0}),"bottom-right");var r=!1;e.current.getPitch()>0?r=!0:r=!1;var o="maplibregl-terrain2d-control",t="Hiển thị 2D";r||(o="maplibregl-terrain3d-control",t="Bản đồ 3D");let n=new ekmapplf.control.Button({className:"btn-ctl-group "+o,icon:"none",tooltip:t});n.on("click",a=>{r=!r,r?(a._div.className=a._div.className.replaceAll("maplibregl-terrain3d-control","maplibregl-terrain2d-control"),a._div.title="Hiển thị 2D"):(a._div.className=a._div.className.replaceAll("maplibregl-terrain2d-control","maplibregl-terrain3d-control"),a._div.title="Hiển thị 3D"),r?(e.current.easeTo({pitch:60}),e.current.setLayoutProperty("building-3d","visibility","visible")):(e.current.easeTo({pitch:0}),e.current.setLayoutProperty("building-3d","visibility","none"))}),e.current.addControl(n,"bottom-right"),e.current.addControl(new d.FullscreenControl,"top-right"),e.current.on("load",async()=>{g(),f()})}else e.current.isStyleLoaded()?(g(),f()):e.current.on("load",async()=>{g(),f()})},g=()=>{for(let s=0;s<u.length;s++)if(u[s].visible){let r=u[s].sources,o=u[s].layers;for(let t in r)e.current.getSource(t)||e.current.addSource(t,r[t]);for(let t=0;t<o.length;t++)e.current.getLayer(o[t].id)||e.current.addLayer(o[t])}},f=async()=>{let s={type:"FeatureCollection",features:[]};for(let r=0;r<p.length;r++){let o=JSON.parse(p[r].customer_location_primary),t={type:"Feature",geometry:{type:"Point",coordinates:[o.long,o.lat]},properties:p[r]};s.features.push(t)}if(e.current.getSource("customer_clus"))e.current.getSource("customer_clus").setData(s);else{if(!e.current.getImage("marker-customer")){const r=await e.current.loadImage("https://sfademo.mbwcloud.com/files/check-icon.png");e.current.addImage("marker-customer",r.data)}e.current.addSource("customer_clus",{type:"geojson",data:s,cluster:!0,clusterRadius:12}),e.current.addLayer({id:"customer_clus-cluster",type:"circle",source:"customer_clus",maxzoom:16,filter:["has","point_count"],paint:{"circle-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-radius":12,"circle-stroke-color":["step",["get","point_count"],"#90D667",10,"#EFCD41",50,"#FF0012"],"circle-stroke-opacity":.7,"circle-stroke-width":5}}),e.current.addLayer({id:"customer_clus-cluster-count",type:"symbol",source:"customer_clus",filter:["has","point_count"],layout:{"text-field":"{point_count}","text-size":12}}),e.current.on("mouseenter","customer_clus-uncluster",()=>{e.current.getCanvas().style.cursor="pointer"}),e.current.on("mouseleave","customer_clus-uncluster",()=>{e.current.getCanvas().style.cursor=""}),e.current.on("click","customer_clus-cluster",async r=>{const o=e.current.queryRenderedFeatures(r.point,{layers:["customer_clus-cluster"]}),t=o[0].properties.cluster_id,n=await e.current.getSource("customer_clus-cluster").getClusterExpansionZoom(t);e.current.easeTo({center:o[0].geometry.coordinates,zoom:n+.01})}),e.current.addLayer({id:"customer_clus-uncluster",type:"symbol",source:"customer_clus",filter:["!",["has","point_count"]],layout:{"icon-image":"marker-customer","icon-allow-overlap":!0,"icon-size":{stops:[[15,.7],[18,1]]}}}),e.current.addLayer({id:"customer_clus-title",type:"symbol",source:"customer_clus",filter:["!",["has","point_count"]],layout:{"text-field":["get","customer_name"],"text-font":["Roboto Medium"],"text-size":{stops:[[12,10],[13,11],[14,11],[15,11.5],[16,12.5],[20,16]]},"text-anchor":"top","text-max-width":9,"text-offset":[0,1.5],"text-padding":5},paint:{"text-color":"#ff5532","text-halo-color":"#ffffff","text-halo-width":1,"text-halo-blur":.5}}),e.current.on("click","customer_clus-uncluster",function(r){var o=r.features[0].geometry.coordinates.slice(),t=r.features[0].properties,n=`
                <div class="customer-popup-info">
                    <b>${t.customer_name}</b>
                </div>
            `;t.customer_primary_address!=null&&t.customer_primary_address!=""&&(n+=`
                <div class="customer-popup-info">
                    <span class="customer-popup-icon customer-icon-marker customer-icon-default-color"></span>
                    <span>${t.customer_primary_address}</span>
                </div>`),t.customer_primary_contact!=null&&t.customer_primary_contact!=""&&(n+=`
                <div class="customer-popup-info">
                    <span class="customer-popup-icon customer-icon-phone customer-icon-default-color"></span>
                    <span>${t.customer_primary_contact}</span>
                </div>`),new d.Popup().setLngLat(o).setHTML(n).addTo(e.current)})}};return c.jsxs(c.Fragment,{children:[c.jsx(L,{title:"Bản đồ khách hàng"}),c.jsx("div",{id:"map",style:{width:"100%",height:"80vh",borderRadius:"20px"},children:c.jsxs("div",{id:"ekmapplf_tracking_legend",className:"ekmapplf_tracking-map-legend",children:[c.jsxs("div",{className:"ekmapplf_tracking-legend-title",onClick:k,children:[c.jsx("span",{className:`icon ${m?"ekmapplf_tracking-icon-square-minus":"ekmapplf_tracking-icon-square-plus"}`,style:{filter:"invert(100%) sepia(100%) saturate(0%) hue-rotate(187deg) brightness(105%) contrast(103%)"}}),c.jsx("span",{children:"Chú giải bản đồ"})]}),c.jsx("div",{className:`ekmapplf_tracking-legend-body ${m?"open":""}`,style:{maxHeight:m?"none":"0"},children:c.jsx("ul",{children:c.jsxs("li",{children:[c.jsx("span",{className:"ekmapplf_tracking-legend-icon",style:{backgroundImage:"url('/checking.png')"}}),"Vị trí khách hàng"]})})})]})})]})}function F(){return c.jsx(j,{})}export{F as default};
