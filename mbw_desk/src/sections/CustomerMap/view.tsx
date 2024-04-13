import { useEffect, useRef, useState } from "react";
import { HeaderPage } from "../../components";
import maplibregl from "maplibre-gl";
import { AxiosService } from "../../services/server";
import "./map_customer.css"

declare var ekmapplf: any;

interface TypeCustomer {
    name: string;
    customer_name: string;
    customer_code: string;
    customer_type: string;
    customer_group: string;
    territory: string;
    customer_primary_contact: string | null;
    customer_primary_address: string | null;
    customer_location_primary: string;
}

function CustomerMapView() {
    const [apiKey, setApiKey] = useState('');
    const [mapConfig, setMapConfig] = useState([]);
    const [lstCustomer, setLstCustomer] = useState<TypeCustomer[]>([]);
    const map = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleLegend = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        getConfigApi();
        getConfigMap();
        getLstCustomer();
    }, []);
    useEffect(() => {
        if (apiKey != null && apiKey !== '') {
            renderMap();
        }
    }, [apiKey, mapConfig, lstCustomer]);

    const getConfigApi = async () => {
        let res = await AxiosService.get('/api/method/mbw_dms.api.vgm.map_customer.get_config_api');
        setApiKey(res.result)
        
    }
    const getConfigMap = async () => {
        let res = await AxiosService.get('/api/method/map_customers.api.vgm.map_customer.get_config_map?type_industry=fertilizer_store');
        setMapConfig(res.result)
    }
    const getLstCustomer = async () => {
        let res = await AxiosService.get('/api/method/mbw_dms.api.selling.customer.get_customer_has_location');
        if (res.message == "Thành công") {
            setLstCustomer(res.result);
        }
        // setLstCustomer([
        //     {
        //         "name": "A Lâm",
        //         "customer_name": "A Lâm",
        //         "customer_code": "BH0123111115",
        //         "customer_type": "Company",
        //         "customer_group": "Commercial",
        //         "territory": "Vietnam",
        //         "customer_primary_contact": "0124587961",
        //         "customer_primary_address": "538 Xuân Đỉnh,Phường Xuân Đỉnh,Quận Tây Hồ,Thành phố Hà Nội,Vietnam",
        //         "customer_location_primary": "{\"long\": 105.7894042, \"lat\": 21.0725648}"
        //     },{
        //         "name": "A Phương",
        //         "customer_name": "A Phương",
        //         "customer_code": "BH0120235252",
        //         "customer_type": "Individual",
        //         "customer_group": "Commercial",
        //         "territory": "Vietnam",
        //         "customer_primary_contact": "0124587961",
        //         "customer_primary_address": "538 Xuân Đỉnh,Phường Xuân Đỉnh,Quận Tây Hồ,Thành phố Hà Nội,Vietnam",
        //         "customer_location_primary": "{\"long\": 105.7883842, \"lat\": 21.0760971}"
        //     },{
        //         "name": "A Toản",
        //         "customer_name": "A Toản",
        //         "customer_code": "BH0050608072022",
        //         "customer_type": "Individual",
        //         "customer_group": "Commercial",
        //         "territory": "Vietnam",
        //         "customer_primary_contact": "0981265412",
        //         "customer_primary_address": "408 Trần Cung,Phường Cổ Nhuế 2,Quận Cầu Giấy,Thành phố Hà Nội,Vietnam",
        //         "customer_location_primary": "{\"long\": 105.7855697, \"lat\": 21.0555955}"
        //     },{
        //         "name": "Anh Bính",
        //         "customer_name": "Anh Bính",
        //         "customer_code": "BH0120235262",
        //         "customer_type": "Individual",
        //         "customer_group": "Commercial",
        //         "territory": "Vietnam",
        //         "customer_primary_contact": "0981264567",
        //         "customer_primary_address": "440 Cổ Nhuế,Phường Cổ Nhuế 2,Quận Bắc Từ Liêm,Thành phố Hà Nội,Vietnam",
        //         "customer_location_primary": "{\"long\": 105.7781418, \"lat\": 21.069679}"
        //     },{
        //         "name": "Anh Ân",
        //         "customer_name": "Anh Ân",
        //         "customer_code": "BH113",
        //         "customer_type": "Company",
        //         "customer_group": "Commercial",
        //         "territory": "Vietnam",
        //         "customer_primary_contact": "0234635454",
        //         "customer_primary_address": "48 hùng vương,Phường Quán Thánh,Quận Ba Đình,Thành phố Hà Nội,Vietnam",
        //         "customer_location_primary": "{\"long\": 105.8341849, \"lat\": 21.0319976}"
        //     }
        // ])
    }
    const renderMap = () => {
        if(map.current == null ){
            map.current = new maplibregl.Map({
                container: 'map',
                center: [108.485, 16.449],
                zoom: 5.43
            });
            let mapOSMBright = new ekmapplf.VectorBaseMap(
                'OSM:Bright',
                apiKey
            ).addTo(map.current);
            var basemap = new ekmapplf.control.BaseMap({
                id: 'basemap_control',
                baseLayers: [
                    {
                        id: "OSM:Bright",
                        title: 'Bản đồ nền Sáng',
                        thumbnail: "https://docs.ekgis.vn/assets/map-sang.png",
                        width: "50px",
                        height: "50px"
                    },
                    {
                        id: "OSM:Standard",
                        title: 'Bản đồ nền Tiêu chuẩn',
                        thumbnail: "https://docs.ekgis.vn/assets/map-chuan.png",
                        width: "50px",
                        height: "50px"
                    },
                    {
                        id: "OSM:Night",
                        title: 'Bản đồ nền Đêm',
                        thumbnail: "https://docs.ekgis.vn/assets/dem-map.png",
                        width: "50px",
                        height: "50px"
                    }
                ],
            });
            map.current.addControl(basemap, 'bottom-left');
            basemap.on('changeBaseLayer', async function (response) {
                await new ekmapplf.VectorBaseMap(response.layer, apiKey).addTo(map.current);
            });
            map.current.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');
            var is3DMap = false;
            if (map.current.getPitch() > 0) is3DMap = true;
            else is3DMap = false;
            var cl = 'maplibregl-terrain2d-control';
            var tl = 'Hiển thị 2D'
            if (!is3DMap) {
                cl = 'maplibregl-terrain3d-control';
                tl = 'Bản đồ 3D'
            }
            let btn3D = new ekmapplf.control.Button({
                className: 'btn-ctl-group ' + cl,
                icon: 'none',
                tooltip: tl
            });
            btn3D.on('click', (btn) => {
                is3DMap = !is3DMap;
                if (is3DMap) {
                    btn._div.className = btn._div.className.replaceAll(
                        'maplibregl-terrain3d-control',
                        'maplibregl-terrain2d-control'
                    );
                    btn._div.title = "Hiển thị 2D";
                }
                else {
                    btn._div.className = btn._div.className.replaceAll(
                        'maplibregl-terrain2d-control',
                        'maplibregl-terrain3d-control'
                    );
                    btn._div.title = "Hiển thị 3D";
                }
                if (is3DMap) {
                    map.current.easeTo({ pitch: 60 });
                    map.current.setLayoutProperty('building-3d', 'visibility', 'visible');
                } else {
                    map.current.easeTo({ pitch: 0 });
                    map.current.setLayoutProperty('building-3d', 'visibility', 'none');
                }
            });
            map.current.addControl(btn3D, 'bottom-right');
            map.current.addControl(new maplibregl.FullscreenControl(), 'top-right');
            map.current.on('load', async () => {
                addLayerIndustry();
                renderClusterMap();
            });
        }else{
            if(map.current.isStyleLoaded()){
                addLayerIndustry();
                renderClusterMap();
            }else{
                map.current.on('load', async () => {
                    addLayerIndustry();
                    renderClusterMap();
                });
            }
            
        }
    }
    const addLayerIndustry = () => {
        for (let i = 0; i < mapConfig.length; i++) {
            if (mapConfig[i]["visible"]) {
                let sources = mapConfig[i]["sources"];
                let layers = mapConfig[i]["layers"];
                for (let propertySource in sources) {
                    if (!map.current.getSource(propertySource)) map.current.addSource(propertySource, sources[propertySource]);
                }
                for (let j = 0; j < layers.length; j++) {
                    if (!map.current.getLayer(layers[j].id)) {
                        map.current.addLayer(layers[j]);
                    }
                }
            }
        }
    }
    const renderClusterMap = async () => {  
        let dataGeo = {
            'type': "FeatureCollection",
            'features': []
        }
        for (let i = 0; i < lstCustomer.length; i++) {
            let lngLat = JSON.parse(lstCustomer[i].customer_location_primary)
            let feature = {
                'type': "Feature",
                'geometry': {
                    'type': "Point",
                    'coordinates': [lngLat.long, lngLat.lat]
                },
                'properties': lstCustomer[i]
            }
            dataGeo.features.push(feature);
        }
        if(map.current.getSource('customer_clus')){
            map.current.getSource('customer_clus').setData(dataGeo);
        }else{
            if(!map.current.getImage('marker-customer')){
                const iconCustomer = await map.current.loadImage("/public/check-icon.png");
                map.current.addImage('marker-customer', iconCustomer.data);
            }
            map.current.addSource('customer_clus', {
                'type': "geojson",
                'data': dataGeo,
                'cluster': true,
                'clusterRadius': 12
            })
            map.current.addLayer({
                'id': 'customer_clus-cluster',
                'type': 'circle',
                'source': "customer_clus",
                'maxzoom': 16,
                'filter': ['has', 'point_count'],
                'paint': {
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#90D667',
                        10,
                        '#EFCD41',
                        50,
                        '#FF0012'
                    ],
                    'circle-radius': 12,
                    'circle-stroke-color': [
                        'step',
                        ['get', 'point_count'],
                        '#90D667',
                        10,
                        '#EFCD41',
                        50,
                        '#FF0012'
                    ],
                    'circle-stroke-opacity': 0.7,
                    'circle-stroke-width': 5
                }
            });
            map.current.addLayer({
                id: 'customer_clus-cluster-count',
                type: 'symbol',
                'source': "customer_clus",
                'filter': ['has', 'point_count'],
                'layout': {
                    'text-field': '{point_count}', 'text-size': 12
                }
            });
            map.current.on('mouseenter', `customer_clus-uncluster`, () => {
                map.current.getCanvas().style.cursor = 'pointer';
            });
            map.current.on('mouseleave', `customer_clus-uncluster`, () => {
                map.current.getCanvas().style.cursor = '';
            });
            map.current.on('click', `customer_clus-cluster`, async (e) => {
                const features = map.current.queryRenderedFeatures(e.point, {
                    layers: [`customer_clus-cluster`]
                });
                const clusterId = features[0].properties.cluster_id;
                const zoom = await map.current.getSource(`customer_clus-cluster`).getClusterExpansionZoom(clusterId);
                map.current.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom + 0.01,
                });
            });
            map.current.addLayer({
                'id': 'customer_clus-uncluster',
                'type': 'symbol',
                'source': "customer_clus",
                'filter': ['!', ['has', 'point_count']],
                'layout': {
                    'icon-image': 'marker-customer',
                    'icon-allow-overlap': true,
                    'icon-size': {
                      'stops': [
                        [15, 0.7],
                        [18, 1]
                      ]
                    }
                  }
            });
            map.current.addLayer({
                'id': 'customer_clus-title',
                'type': 'symbol',
                'source': "customer_clus",
                'filter': ['!', ['has', 'point_count']],
                'layout': {
                    'text-field': ['get', 'customer_name'],
                    'text-font': ["Roboto Medium"],
                    'text-size': {
                      'stops': [
                        [12, 10],
                        [13, 11],
                        [14, 11],
                        [15, 11.5],
                        [16, 12.5],
                        [20, 16]
                      ]
                    },
                    'text-anchor': "top",
                    'text-max-width': 9,
                    'text-offset': [0, 1.5],
                    'text-padding': 5
                  },
                  'paint': {
                    'text-color': "#ff5532",
                    'text-halo-color': "#ffffff",
                    'text-halo-width': 1,
                    'text-halo-blur': 0.5
                  }
            });
            console.log(map.current);

            map.current.on('click', 'customer_clus-uncluster', function (e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var properties = e.features[0].properties;
                var popupContent = `
                <div class="customer-popup-info">
                    <b>${properties.customer_name}</b>
                </div>
            `;
            if(properties.customer_primary_address != null && properties.customer_primary_address != ""){
                popupContent += `
                <div class="customer-popup-info">
                    <span class="customer-popup-icon customer-icon-marker customer-icon-default-color"></span>
                    <span>${properties.customer_primary_address}</span>
                </div>`;
            }
            if(properties.customer_primary_contact != null && properties.customer_primary_contact != ""){
                popupContent += `
                <div class="customer-popup-info">
                    <span class="customer-popup-icon customer-icon-phone customer-icon-default-color"></span>
                    <span>${properties.customer_primary_contact}</span>
                </div>`;
            }
                new maplibregl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(popupContent)
                    .addTo(map.current);
            });
        }
    }
   
    return (
        <>
            <HeaderPage title="Bản đồ khách hàng" />
            <div id="map" style={{ width: "100%", height: "80vh", borderRadius: "20px" }}>
                <div id='ekmapplf_tracking_legend' className='ekmapplf_tracking-map-legend'>
                <div className='ekmapplf_tracking-legend-title' onClick={toggleLegend}>
                    <span className={`icon ${isOpen ? 'ekmapplf_tracking-icon-square-minus' : 'ekmapplf_tracking-icon-square-plus'}`} style={{ filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(187deg) brightness(105%) contrast(103%)' }}></span>
                    <span>Chú giải bản đồ</span>
                </div>
                <div className={`ekmapplf_tracking-legend-body ${isOpen ? 'open' : ''}`} style={{ maxHeight: isOpen ? 'none' : '0' }}>
                    <ul>
                        <li>
                            <span className='ekmapplf_tracking-legend-icon' style={{ backgroundImage: `url('/checking.png')` }}></span>
                            Vị trí khách hàng
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </>
    )
}

export default CustomerMapView
