import React, { useRef, useEffect, LegacyRef } from 'react';
import maplibregl from 'maplibre-gl';
import extend from 'xtend';
import bbox from '@turf/bbox';
import './map_realtime.css';
import MapLegend from './maplegend_realtime';
import { functionType } from '@/types/dashboard';


interface RealtimeProp {
    options: any, onClickPopup: functionType, status:functionType 
}
const ekmapplf = window.ekmapplf;

function RealtimeMap({ options, onClickPopup, status }:RealtimeProp) {
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);
    const intervalIdRef = useRef(null);

    const markers = useRef({});
    const markersOnScreen = useRef({});

    const defaultOptions = {
        center: [105, 17],
        zoom: 4.5,
        bounds: [
            [82.79, 1.10], // Southwest coordinates
            [132.63, 35.75] // Northeast coordinates
        ],
        pitch: 30,
        reloadTime: 60000,
        stopTime: 600,
    };
    const _options = extend({}, defaultOptions, options);
    if (_options.apiKey === "" || !_options.apiKey) throw new Error("apiKey is required");
    
    const initializeMap = async () => {
        try {
            map.current = new maplibregl.Map({
                container: mapContainer.current,
                center: _options.center,
                zoom: _options.zoom,
                minZoom: 1,
                pitch: _options.pitch,
                maxBounds: _options.bounds
            });

            var _map:any = map.current;
            // console.log(_map);
            _map.setPadding({ top: 100, bottom: 100, left: 100, right: 100 });

            new ekmapplf.VectorBaseMap('OSM:Night', _options.apiKey).addTo(_map);

            var basemap = new ekmapplf.control.BaseMap({
                id: 'ekmapplf_tracking_ctrl_basemap',
                baseLayers: [
                    {
                        id: "OSM:Night",
                        title: 'Bản đồ nền Đêm',
                        thumbnail: "https://docs.ekgis.vn/assets/dem-map.png",
                        width: "50px",
                        height: "50px"
                    },
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
                        id: "OSM:Gray",
                        title: 'Bản đồ nền Xám',
                        thumbnail: "https://docs.ekgis.vn/assets/xam-map.png",
                        width: "50px",
                        height: "50px"
                    },
                    {
                        id: "OSM:Dark",
                        title: 'Bản đồ nền Đêm xanh coban',
                        thumbnail: "https://docs.ekgis.vn/assets/xanhcoban-map.png",
                        width: "50px",
                        height: "50px"
                    },
                    {
                        id: "OSM:Pencil",
                        title: 'Bản đồ nền Bút chì',
                        thumbnail: "https://docs.ekgis.vn/assets/chi-map.png",
                        width: "50px",
                        height: "50px"
                    },
                    {
                        id: "OSM:Pirates",
                        title: 'Bản đồ nền Cổ điển',
                        thumbnail: "https://docs.ekgis.vn/assets/dien-map.png",
                        width: "50px",
                        height: "50px"
                    },
                    {
                        id: "OSM:Wood",
                        title: 'Bản đồ nền Gỗ',
                        thumbnail: "https://docs.ekgis.vn/assets/go-map.png",
                        width: "50px",
                        height: "50px"
                    },
                ],
            });
            _map.addControl(basemap, 'bottom-left');
            basemap.on('changeBaseLayer', async function (response:any) {
                await new ekmapplf.VectorBaseMap(response.layer, _options.apiKey).addTo(_map);
                setTimeout(() => {
                    setMap();
                }, 500)
            });

            _map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');

            // bản đồ 3D
            var is3DMap = false;
            if (_map.getPitch() > 0) is3DMap = true;
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
            btn3D.on('click', (btn:any) => {
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
                    _map.easeTo({ pitch: 60 });
                    _map.setLayoutProperty('building-3d', 'visibility', 'visible');
                } else {
                    _map.easeTo({ pitch: 0 });
                    _map.setLayoutProperty('building-3d', 'visibility', 'none');
                }
            });
            _map.addControl(btn3D, 'bottom-right');

            _map.addControl(new maplibregl.FullscreenControl(), 'top-right');

            _map.on('load', async () => {
                try {
                    let fc = await setMap();
                    if (fc && fc.features.length) {
                        let bounds = bbox(fc);
                        _map.fitBounds(bounds, { padding: 100, maxZoom: 14, duration: 1000 });
                    }

                    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
                    intervalIdRef.current = setInterval(() => {
                        loadMap(_options.objectId);
                    }, 10000);
                } catch (error) {
                    console.error('Error:', error);
                }
            });

            const setMap = async () => {
                if (!_options.objectId) _options.objectId = null;
                if (Array.isArray(_options.objectId) && _options.objectId.length === 0) return;
                return await loadMap(_options.objectId);
            }

            const loadMap = async (objectIds:any) => {
                // load map => gọi dịch vụ nhân viên onl/off
                var DataObjs = await getLastPos(objectIds)
                // DataObjs = DataObjs.filter(item => item !== null);
                // console.log(DataObjs);
                const statusCount = DataObjs.reduce((acc, cur) => {
                    if (cur.status === "offline") {
                        acc.offline++;
                    } else if (cur.status === "online") {
                        acc.online++;
                    }
                    return acc;
                }, { online: 0, offline: 0 });
                if (status) status(statusCount);

                const FeatureCollection = {
                    'type': 'FeatureCollection',
                    'features': await Promise.all(DataObjs.map((data) => {
                        if (data.type) {
                            return {
                                'type': 'Feature',
                                'properties': data,
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': data.coordinates
                                }
                            };
                        } else return null;
                    })).then(features => features.filter(feature => feature !== null))
                };
                // console.log(FeatureCollection);

                if (_map.getSource(`ek-tracking-live-source`)) {
                    _map.getSource(`ek-tracking-live-source`).setData(FeatureCollection);
                } else {
                    _map.addSource(`ek-tracking-live-source`, {
                        'type': 'geojson',
                        'data': FeatureCollection,
                        'cluster': true,
                        'clusterMaxZoom': 14,
                        'clusterRadius': 55
                    });

                    //cluster
                    _map.addLayer({
                        id: `ek-tracking-live-clusters`,
                        type: 'circle',
                        source: `ek-tracking-live-source`,
                        // filter: ['has', 'point_count'],
                        filter: ['==', 'cluster', true],
                        paint: {
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
                    _map.addLayer({
                        id: `ek-tracking-live-cluster-count`,
                        type: 'symbol',
                        source: `ek-tracking-live-source`,
                        // filter: ['has', 'point_count'],
                        filter: ['==', 'cluster', true],
                        layout: {
                            'text-field': '{point_count_abbreviated}',
                            'text-size': 12
                        }
                    });

                    _map.on('mouseenter', `ek-tracking-live-clusters`, () => {
                        _map.getCanvas().style.cursor = 'pointer';
                    });
                    _map.on('mouseleave', `ek-tracking-live-clusters`, () => {
                        _map.getCanvas().style.cursor = '';
                    });
                    _map.on('click', `ek-tracking-live-clusters`, async (e) => {
                        const features = _map.queryRenderedFeatures(e.point, {
                            layers: [`ek-tracking-live-clusters`]
                        });
                        const clusterId = features[0].properties.cluster_id;
                        const zoom = await _map.getSource(`ek-tracking-live-source`).getClusterExpansionZoom(clusterId);
                        _map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom + 0.01,
                        });
                    });

                    //uncluster
                    async function updateMarkers() {
                        const newMarkers = {};
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
                                    <div class="marker-img-${props.status === 'online' ? 'online' : 'offline'}"></div>`;
                                marker.setLngLat(coords);
                            } else {
                                const el = document.createElement('div');
                                el.className = 'marker-employee';
                                el.innerHTML = `
                                    <div class="marker-name">${props.name}</div>
                                    <div class="marker-img-${props.status === 'online' ? 'online' : 'offline'}"></div>`;
                                let popup = new maplibregl.Popup({ offset: [0, -27], closeButton: false })
                                    .setHTML(
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
                                        `)
                                popup.on('open', () => {
                                    el.querySelector('.marker-name').style.display = 'none';
                                    popup.getElement().querySelector('.show-his').addEventListener('click', () => {
                                        if (onClickPopup) onClickPopup({ _id: props._id, name: props.name })
                                    })
                                })
                                popup.on('close', () => {
                                    el.querySelector('.marker-name').style.removeProperty('display');
                                })
                                marker = markers.current[id] = new maplibregl.Marker({ element: el, anchor: 'bottom' })
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

                    _map.on('data', (e) => {
                        if (e.sourceId !== `ek-tracking-live-source` || !e.isSourceLoaded) return;
                        _map.on('move', updateMarkers);
                        _map.on('moveend', updateMarkers);
                        updateMarkers();
                    });
                }
                return FeatureCollection;
            }
            // xử lý request nhân viên onl/off
            async function getLastPos(objectIds:any) {
                try {
                    console.log(typeof objectIds,objectIds);
                    
                    var str_ids = objectIds === null ? 'null' : objectIds.toString().replaceAll(',', ';');
                    const urlTracking = `https://api.ekgis.vn/v2/tracking/locationHistory/position/${_options.projectId}/latest/${str_ids}?api_key=${_options.apiKey}`;
                    const urlCheckin = `https://api.ekgis.vn/v1/checkin/${_options.projectId}/latest/${str_ids}?api_key=${_options.apiKey}`;

                    const [responseTracking, responseCheckin] = await Promise.all([
                        fetch(urlTracking),
                        fetch(urlCheckin)
                    ]);

                    
                    const DataTracking = await responseTracking.json();
                    const DataCheckin = await responseCheckin.json();
                    
                    console.log("responseTracking, responseCheckin",DataTracking, DataCheckin)
                    let obj2Map:any = {};
                    DataTracking.forEach((item:any) => {
                        obj2Map[item.object._id] = item;
                    });

                    let mergedArray = DataCheckin.map((item1:any) => ({
                        object: item1.object,
                        position: obj2Map[item1.object._id] ? obj2Map[item1.object._id].position : null,
                        checkin: item1.checkin
                    }));

                    var results = []
                    for (const item of mergedArray) {
                        if (!item.position && !item.checkin) {
                            results.push({
                                '_id': item.object._id,
                                'name': item.object.name,
                                'status': 'offline',
                            });
                        } else {
                            const TrackTimestamp = item.position ? Date.parse(item.position.timestamp) : 0;
                            const CheckinTimestamp = item.checkin ? Date.parse(item.checkin.timestamp) : 0;
                            const isTracking = TrackTimestamp > CheckinTimestamp;
                            const timestamp = isTracking ? TrackTimestamp : CheckinTimestamp;
                            const today = await isToday(timestamp);

                            if (today) {
                                var status = 'offline';
                                const coords = isTracking ? [item.position.coords.longitude, item.position.coords.latitude] : item.checkin.coordinates.split(',').map(coord => parseFloat(coord));
                                const address = await reverseGeocode(coords);

                                if (isTracking) {
                                    if (Date.parse(new Date()) - timestamp <= (_options.stopTime * 1000)) status = 'online';
                                } else {
                                    if (item.checkin.time_checkout == '') status = 'online';
                                    else if (Date.parse(new Date()) - Date.parse(item.checkin.time_checkout) <= (_options.stopTime * 1000)) status = 'online';
                                }
                                results.push({
                                    '_id': item.object._id,
                                    'name': item.object.name,
                                    'type': isTracking ? 'tracking' : 'checkin',
                                    'position': isTracking ? item.position : item.checkin,
                                    'coordinates': coords,
                                    'address': address,
                                    'status': status,
                                    'timestamp': timestamp
                                });
                            } else {
                                results.push({
                                    '_id': item.object._id,
                                    'name': item.object.name,
                                    'status': 'offline',
                                });
                            }
                        }
                    }
                    return results;
                } catch (error) {
                    console.error('Error getting last position:', error);
                    throw error;
                }
            };

            async function reverseGeocode(position) {
                return new Promise((resolve, reject) => {
                    const param = {
                        'point.lon': position[0],
                        'point.lat': position[1],
                    };
                    const geocoding = new ekmapplf.service.Geocoding(_options.apiKey);
                    geocoding.reverse(param, (error, response) => {
                        if (error) {
                            reject('Không có thông tin');
                        } else {
                            const address = response.results.length > 0 ? response.results[0].formatted_address : 'Không có thông tin';
                            resolve(address);
                        }
                    });
                });
            };

            function isToday(timestamp) {
                const timeZone = "Asia/Saigon"
                const date = new Date(timestamp).toLocaleDateString('en-US', { timeZone: timeZone });
                const today = new Date().toLocaleDateString('en-US', { timeZone: timeZone });
                return date === today;
            }

        } catch (error) {
            console.error('Error initializing map:', error);
        };
    };

    useEffect(() => {

        initializeMap();

        return () => {
            if (map.current) map.current.remove();
            if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        };
    }, [options]);

    return (
        <div ref={mapContainer} id='ekmap-tracking-realtime'>
            <MapLegend />
        </div>
    );
}

export default RealtimeMap;
