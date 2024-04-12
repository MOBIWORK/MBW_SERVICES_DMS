import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import extend from 'xtend';
import bbox from '@turf/bbox';

import './map.css';
import MapLegend from './maplegend';
import Animate from './animate'

const ekmapplf = window.ekmapplf;

function HistoryMap({ options }) {
    const mapContainer = useRef(null);
    const mapHistoryEmployee = useRef(null);
    const HistoryData = useRef(null);
    const [showControls, setShowControls] = useState(false);

    const defaultOptions = {
        center: [105, 17],
        zoom: 4.5,
        pageNumber: 1,
        pageSize: 5000,
        iconTrack: '/public/assets/custom_marker.png',
        iconNavigation: '/public/assets/arrow.png',
        iconCheckin: '/public/assets/check-icon.png',
        iconStart: '/public/assets/start-icon.png',
        iconEnd: '/public/assets/end-icon.png',
        iconStop: '/public/assets/stop-icon.png',
        showRoute: true,
        lineCorlor: '#01579B',
        lineWidth: 5,
        lineOpacity: 0.8,
        routeNavigation: false,
        isFollow: false,
        animateRoute: true,
    };
    const _options = extend({}, defaultOptions, options);
    if (_options.apiKey === "" || !_options.apiKey) throw new Error("Parameter apiKey not valid");
    if (_options.projectId === "" || !_options.projectId) throw new Error("Parameter projectId not valid");
    if (_options.objectId === "" || !_options.objectId) throw new Error("Parameter objectId not valid");
    if (_options.from_time === "" || !_options.from_time) throw new Error("Parameter from_time not valid");
    if (_options.to_time === "" || !_options.to_time) throw new Error("Parameter to_time not valid");
    if (_options.markerImage) _options.iconTrack = _options.markerImage;
    
    useEffect(() => {
        const initializeMap = async () => {
            try {
                var _popup;
                mapHistoryEmployee.current = new maplibregl.Map({
                    container: mapContainer.current,
                    center: _options.center,
                    zoom: _options.zoom,
                    minZoom: 1,
                });
                var _mapHistoryEmployee = mapHistoryEmployee.current;
                // console.log(_map);
                const _map_Container = _mapHistoryEmployee.getContainer();

                // _map.setPadding({ top: 100, bottom: 100, left: 250, right: 70 });
                _mapHistoryEmployee.setPadding({ top: 100, bottom: 100, left: 100, right: 100 });

                new ekmapplf.VectorBaseMap('OSM:Bright', _options.apiKey).addTo(_mapHistoryEmployee);

                var basemap = new ekmapplf.control.BaseMap({
                    id: 'ekmapplf_tracking_ctrl_basemap_' + _map_Container.id,
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
                            id: "OSM:Gray",
                            title: 'Bản đồ nền Xám',
                            thumbnail: "https://docs.ekgis.vn/assets/xam-map.png",
                            width: "50px",
                            height: "50px"
                        },
                        {
                            id: "OSM:Night",
                            title: 'Bản đồ nền Đêm',
                            thumbnail: "https://docs.ekgis.vn/assets/dem-map.png",
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
                _mapHistoryEmployee.addControl(basemap, 'bottom-left');
                basemap.on('changeBaseLayer', async function (response) {
                    await new ekmapplf.VectorBaseMap(response.layer, _options.apiKey).addTo(_mapHistoryEmployee);
                    setTimeout(() => {
                        setMap(_options.from_time, _options.to_time, _options.pageNumber, _options.pageSize);
                    }, 500)
                });

                _mapHistoryEmployee.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');

                // bản đồ 3D
                var is3DMap = false;
                if (_mapHistoryEmployee.getPitch() > 0) is3DMap = true;
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
                        _mapHistoryEmployee.easeTo({ pitch: 60 });
                        _mapHistoryEmployee.setLayoutProperty('building-3d', 'visibility', 'visible');
                    } else {
                        _mapHistoryEmployee.easeTo({ pitch: 0 });
                        _mapHistoryEmployee.setLayoutProperty('building-3d', 'visibility', 'none');
                    }
                });
                _mapHistoryEmployee.addControl(btn3D, 'bottom-right');

                // Layer
                // let btnLayer = new ekmapplf.control.Button({
                //     className: 'btn-ctl-group ekmapplf_tracking-layer-control',
                //     icon: 'none',
                //     tooltip: 'Lớp bản đồ'
                // })
                // btnLayer.on('click', (btn) => {
                //     var controlPanel = _map_Container.querySelector('.ekmapplf_tracking-layer-control-panel');
                //     if (!controlPanel) {
                //         var checkboxRoute = document.createElement('input');
                //         checkboxRoute.type = 'checkbox';
                //         checkboxRoute.style.margin = '5px';
                //         checkboxRoute.checked = _options.showRoute ? true : false;

                //         var labelRoute = document.createElement('label');
                //         labelRoute.className = 'label-layer';
                //         labelRoute.appendChild(document.createTextNode('Tuyến đường di chuyển'));
                //         labelRoute.insertBefore(checkboxRoute, labelRoute.firstChild);

                //         var panel = document.createElement('div');
                //         panel.className = 'ekmapplf_tracking-layer-control-panel';
                //         panel.appendChild(labelRoute);

                //         checkboxRoute.addEventListener('change', function (event) {
                //             if (event.target.checked) {
                //                 visibleRouteLayer('visible')
                //             } else {
                //                 visibleRouteLayer('none')
                //             }
                //         });

                //         panel.addEventListener('mouseleave', function (event) {
                //             if (panel.style.display === 'block') {
                //                 panel.style.display = 'none';
                //             }
                //         });

                //         _map_Container.appendChild(panel);
                //     } else {
                //         if (controlPanel.style.display === 'block') {
                //             controlPanel.style.display = 'none';
                //         } else {
                //             controlPanel.style.display = 'block';
                //         }
                //     }
                // })
                // _map.addControl(btnLayer, 'bottom-right');

                _mapHistoryEmployee.addControl(new maplibregl.FullscreenControl(), 'bottom-right');

                _mapHistoryEmployee.on('load', async () => {
                    try {
                        await setMap(_options.from_time, _options.to_time, _options.pageNumber, _options.pageSize);
                        setTimeout(() => setShowControls(true), 2000);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                });

                const setMap = async (from_time, to_time, pageNumber, pageSize) => {
                    let urlTracking = `https://api.ekgis.vn/v2/tracking/locationHistory/positions/${_options.projectId}/${_options.objectId}?api_key=${_options.apiKey}&from_time=${from_time}&to_time=${to_time}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
                    const responseTracking = await fetch(urlTracking);
                    const TrackingData = await responseTracking.json();
                    const Tracking_history = TrackingData.positions.map(position => {
                        let coordinates = [position.coords.longitude ? position.coords.longitude : 0, position.coords.latitude ? position.coords.latitude : 0];
                        return {
                            'type': 'tracking',
                            'activity': position.activity,
                            'uuid': position.uuid,
                            'timestamp': position.timestamp,
                            'coordinates': coordinates,
                            'ext': position.extras,
                            'accuracy': position.coords.accuracy,
                            'battery': position.battery,
                            'coords': position.coords,
                            'geofence': position.geofence,
                            'event': position.event,
                            'is_moving': position.is_moving,
                            'odometer': position.odometer,
                        }
                    })
                    let urlCheckin = `https://api.ekgis.vn/v1/checkin/${_options.projectId}/${_options.objectId}?api_key=${_options.apiKey}&fromdate=${from_time}&todate=${to_time}`
                    const responseCheckin = await fetch(urlCheckin);
                    const checkinData = await responseCheckin.json();
                    const Checkin_history = await Promise.all(checkinData.map(async position => {
                        let coordinates = position.coordinates.split(',').map(coord => parseFloat(coord));
                        let address = position.address ? position.address : await reverseGeocode(coordinates);
                        return {
                            'type': 'checkin',
                            'address': address,
                            'activity': position.activity,
                            'uuid': position.uuid,
                            'timestamp': position.timestamp,
                            'coordinates': coordinates,
                            'ext': position.ext,
                            'accuracy': position.accuracy,
                            'battery_checkin': position.battery_checkin,
                            'battery_checkout': position.battery_checkout,
                            'time_checkout': position.time_checkout,
                            'time_checkin': position.time_checkin,
                        };
                    }));

                    const arrData = [...Tracking_history, ...Checkin_history];
                    arrData.sort((a, b) => {
                        const timestampA = new Date(a.timestamp).getTime();
                        const timestampB = new Date(b.timestamp).getTime();
                        return timestampA - timestampB;
                    });

                    //fake
                    arrData[20] = {
                        type: 'stop',
                        coordinates: [105.7269843, 21.0402668],
                    }

                    arrData[137] = {
                        type: 'checkin',
                        address: 'Tạp hóa AAA',
                        coordinates: [105.758936, 21.0394517],
                        time_checkin: "2024-03-23T00:12:35.000Z",
                        time_checkout: "2024-03-23T00:12:35.000Z",
                    }

                    arrData[200] = {
                        type: 'stop',
                        coordinates: [105.7663929, 21.0445813],
                    }

                    arrData[285] = {
                        type: 'checkin',
                        address: 'Cửa hàng BBB',
                        coordinates: [105.7787887, 21.055104],
                        time_checkin: "2024-03-23T00:28:20.000Z",
                        time_checkout: "2024-03-23T00:28:20.000Z",
                    }

                    arrData[288] = {
                        type: 'stop',
                        coordinates: [105.7783295, 21.0534917],
                    }

                    HistoryData.current = arrData;
                    //Map
                    let LineSource = {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "type": "LineString",
                                "coordinates": arrData.map(data => data.coordinates)
                            }
                        }]
                    };
                    let CheckSource = {
                        'type': 'FeatureCollection',
                        'features': arrData
                            .filter(data => data.type === 'checkin')
                            .map((data, index) => ({
                                'type': 'Feature',
                                'properties': {
                                    'step': index + 1,
                                    ...data
                                },
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': data.coordinates
                                }
                            })),
                    };
                    let TrackSource = {
                        'type': 'FeatureCollection',
                        'features': await Promise.all(
                            arrData.map(async (data, index) => {
                                if (index === 0 || index === arrData.length - 1) {
                                    data.address = data.address ? data.address : await reverseGeocode(data.coordinates);
                                }
                                return {
                                    'type': 'Feature',
                                    'properties': {
                                        'step': index + 1,
                                        ...data
                                    },
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': data.coordinates
                                    }
                                };
                            })
                        )
                    };
                    await setLine(LineSource);
                    await setPoints(CheckSource, TrackSource);
                    await setNavigation(LineSource, TrackSource);

                    if (!arrData.length) return;
                    var boundbox = bbox(LineSource);
                    _mapHistoryEmployee.fitBounds(boundbox, { padding: 100, maxZoom: 14, duration: 1500 });
                    return arrData;
                };

                const setLine = (LineSource) => {
                    try {
                        if (_mapHistoryEmployee.getSource(`ek-tracking-his-${_map_Container.id}-line-source`)) {
                            _mapHistoryEmployee.getSource(`ek-tracking-his-${_map_Container.id}-line-source`).setData(LineSource)
                        } else {
                            _mapHistoryEmployee.addSource(`ek-tracking-his-${_map_Container.id}-line-source`, {
                                'type': 'geojson',
                                'data': LineSource,
                            });

                            _mapHistoryEmployee.addLayer({
                                'id': `ek-tracking-his-${_map_Container.id}-LineString`,
                                'type': 'line',
                                'source': `ek-tracking-his-${_map_Container.id}-line-source`,
                                'layout': {
                                    'line-join': 'round',
                                    'line-cap': 'round',
                                    'visibility': _options.showRoute ? 'visible' : 'none',
                                },
                                'paint': {
                                    'line-color': _options.lineCorlor,
                                    'line-width': _options.lineWidth,
                                    'line-opacity': _options.lineOpacity
                                },
                                'filter': ['==', '$type', 'LineString']
                            });
                        }
                    } catch (error) {
                        console.error("Error setLine:", error);
                    }
                };

                const setPoints = async (CheckSource, TrackSource) => {
                    console.log(_mapHistoryEmployee);
                    try {
                        if (!_mapHistoryEmployee.getImage('marker-start')) {
                            const iconCheckin = await _mapHistoryEmployee.loadImage(_options.iconStart);
                            console.log(iconCheckin);
                            _mapHistoryEmployee.addImage('marker-start', iconCheckin.data)
                        }
                        if (!_mapHistoryEmployee.getImage('marker-end')) {
                            const iconCheckin = await _mapHistoryEmployee.loadImage(_options.iconEnd);
                            _mapHistoryEmployee.addImage('marker-end', iconCheckin.data)
                        }
                        if (!_mapHistoryEmployee.getImage('marker-check')) {
                            const iconCheckin = await _mapHistoryEmployee.loadImage(_options.iconCheckin);
                            _mapHistoryEmployee.addImage('marker-check', iconCheckin.data)
                        }
                        if (!_mapHistoryEmployee.getImage('marker-stop')) {
                            const iconStop = await _mapHistoryEmployee.loadImage(_options.iconStop);
                            _mapHistoryEmployee.addImage('marker-stop', iconStop.data)
                        }

                        if (_mapHistoryEmployee.getSource(`ek-tracking-his-${_map_Container.id}-track-source`)) {
                            _mapHistoryEmployee.getSource(`ek-tracking-his-${_map_Container.id}-track-source`).setData(TrackSource)
                        } else {
                            _mapHistoryEmployee.addSource(`ek-tracking-his-${_map_Container.id}-track-source`, {
                                'type': 'geojson',
                                'data': TrackSource,
                            });

                            _mapHistoryEmployee.addLayer({
                                'id': `ek-tracking-his-${_map_Container.id}-track-point-start`,
                                'type': 'symbol',
                                'source': `ek-tracking-his-${_map_Container.id}-track-source`,
                                'layout': {
                                    'icon-image': 'marker-start',
                                    'icon-overlap': 'cooperative',
                                    'icon-anchor': 'bottom',
                                    'icon-size': 0.7,
                                    'icon-offset': [20, 5],
                                },
                                'filter': ['==', 'step', 1],
                            });
                            _mapHistoryEmployee.addLayer({
                                'id': `ek-tracking-his-${_map_Container.id}-track-point-end`,
                                'type': 'symbol',
                                'source': `ek-tracking-his-${_map_Container.id}-track-source`,
                                'layout': {
                                    'icon-image': 'marker-end',
                                    'icon-overlap': 'cooperative',
                                    'icon-anchor': 'bottom',
                                    'icon-size': 0.7,
                                    'icon-offset': [20, 5]
                                },
                                'filter': ['==', 'step', TrackSource.features.length],
                            });
                            _mapHistoryEmployee.addLayer({
                                'id': `ek-tracking-his-${_map_Container.id}-track-point-stop`,
                                'type': 'symbol',
                                'source': `ek-tracking-his-${_map_Container.id}-track-source`,
                                'layout': {
                                    'icon-image': 'marker-stop',
                                    'icon-overlap': 'cooperative',
                                    'icon-anchor': 'bottom',
                                    'icon-size': 0.7,
                                },
                                'filter': ['==', 'type', 'stop'],
                            });

                            _mapHistoryEmployee.on('mouseenter', `ek-tracking-his-${_map_Container.id}-track-point-start`, (e) => {
                                _mapHistoryEmployee.getCanvas().style.cursor = 'pointer';
                                const bbox = [
                                    [e.point.x - 5, e.point.y - 5],
                                    [e.point.x + 5, e.point.y + 5],
                                ];
                                const selectedFeatures = _mapHistoryEmployee.queryRenderedFeatures(bbox, {
                                    layers: [`ek-tracking-his-${_map_Container.id}-track-point-start`],
                                });
                                if (_popup) _popup.remove();
                                _popup = new maplibregl.Popup({ className: 'ek-tracking-his-popup', closeButton: false, anchor: 'bottom', })
                                    .setLngLat(selectedFeatures[0].geometry.coordinates)
                                    .setHTML(
                                        `<div class="ek-tracking-his-popup-info">
                                            <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-marker ekmapplf_tracking-icon-start-color"></span>
                                            <span>${selectedFeatures[0].properties.address}</span>
                                        </div>
                                        ${selectedFeatures[0].properties.timestamp != '' ? `
                                        <div class="ek-tracking-his-popup-info">
                                            <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-clock ekmapplf_tracking-icon-start-color"></span>
                                            <span>${formatTimestamp(selectedFeatures[0].properties.timestamp)}</span>
                                        </div>`: ``}`
                                    )
                                    .setOffset([0, -20])
                                    .addTo(_mapHistoryEmployee);
                            });
                            _mapHistoryEmployee.on('mouseleave', `ek-tracking-his-${_map_Container.id}-track-point-start`, () => {
                                _mapHistoryEmployee.getCanvas().style.cursor = '';
                                if (_popup) _popup.remove();
                            })

                            _mapHistoryEmployee.on('mouseenter', `ek-tracking-his-${_map_Container.id}-track-point-end`, (e) => {
                                _mapHistoryEmployee.getCanvas().style.cursor = 'pointer';
                                const bbox = [
                                    [e.point.x - 5, e.point.y - 5],
                                    [e.point.x + 5, e.point.y + 5],
                                ];
                                const selectedFeatures = _mapHistoryEmployee.queryRenderedFeatures(bbox, {
                                    layers: [`ek-tracking-his-${_map_Container.id}-track-point-end`],
                                });
                                if (_popup) _popup.remove();
                                _popup = new maplibregl.Popup({ className: 'ek-tracking-his-popup', closeButton: false, anchor: 'bottom', })
                                    .setLngLat(selectedFeatures[0].geometry.coordinates)
                                    .setHTML(
                                        `<div class="ek-tracking-his-popup-info">
                                    <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-marker ekmapplf_tracking-icon-end-color"></span>
                                    <span>${selectedFeatures[0].properties.address}</span>
                                </div>
                                ${selectedFeatures[0].properties.timestamp != '' ? `
                                    <div class="ek-tracking-his-popup-info">
                                        <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-clock ekmapplf_tracking-icon-end-color"></span>
                                        <span>${formatTimestamp(selectedFeatures[0].properties.timestamp)}</span>
                                    </div>`: ``}
                                `
                                    )
                                    .setOffset([0, -20])
                                    .addTo(_mapHistoryEmployee);
                            });
                            _mapHistoryEmployee.on('mouseleave', `ek-tracking-his-${_map_Container.id}-track-point-end`, () => {
                                _mapHistoryEmployee.getCanvas().style.cursor = '';
                                if (_popup) _popup.remove();
                            })
                        }

                        if (_mapHistoryEmployee.getSource(`ek-tracking-his-${_map_Container.id}-check-source`)) {
                            _mapHistoryEmployee.getSource(`ek-tracking-his-${_map_Container.id}-check-source`).setData(CheckSource)
                        } else {
                            _mapHistoryEmployee.addSource(`ek-tracking-his-${_map_Container.id}-check-source`, {
                                'type': 'geojson',
                                'data': CheckSource,
                                'cluster': true,
                                'clusterMaxZoom': 14,
                                'clusterRadius': 50
                            });

                            _mapHistoryEmployee.addLayer({
                                id: `ek-tracking-his-${_map_Container.id}-check-clusters`,
                                type: 'circle',
                                source: `ek-tracking-his-${_map_Container.id}-check-source`,
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
                                },
                                filter: [
                                    'all',
                                    ['has', 'point_count'],
                                ]
                            });
                            _mapHistoryEmployee.addLayer({
                                id: `ek-tracking-his-${_map_Container.id}-check-cluster-count`,
                                type: 'symbol',
                                source: `ek-tracking-his-${_map_Container.id}-check-source`,
                                layout: {
                                    'text-field': '{point_count_abbreviated}',
                                    'text-size': 12
                                },
                                filter: [
                                    'all',
                                    ['has', 'point_count'],
                                ]
                            });
                            _mapHistoryEmployee.addLayer({
                                'id': `ek-tracking-his-${_map_Container.id}-check-point`,
                                'type': 'symbol',
                                'source': `ek-tracking-his-${_map_Container.id}-check-source`,
                                'layout': {
                                    'icon-image': 'marker-check',
                                    'icon-overlap': 'always',
                                    'icon-anchor': 'bottom',
                                    'icon-size': 0.7,
                                },
                                'filter': [
                                    'all',
                                    ['!has', 'point_count'],
                                ]
                            });

                            _mapHistoryEmployee.on('mouseenter', `ek-tracking-his-${_map_Container.id}-check-clusters`, () => {
                                _mapHistoryEmployee.getCanvas().style.cursor = 'pointer';
                            });
                            _mapHistoryEmployee.on('mouseleave', `ek-tracking-his-${_map_Container.id}-check-clusters`, () => {
                                _mapHistoryEmployee.getCanvas().style.cursor = '';
                            });
                            _mapHistoryEmployee.on('click', `ek-tracking-his-${_map_Container.id}-check-clusters`, async (e) => {
                                const features = _mapHistoryEmployee.queryRenderedFeatures(e.point, {
                                    layers: [`ek-tracking-his-${_map_Container.id}-check-clusters`]
                                });
                                const clusterId = features[0].properties.cluster_id;
                                const zoom = await _mapHistoryEmployee.getSource(`ek-tracking-his-${_map_Container.id}-check-source`).getClusterExpansionZoom(clusterId);
                                _mapHistoryEmployee.easeTo({
                                    center: features[0].geometry.coordinates,
                                    zoom: zoom,
                                });
                            });

                            _mapHistoryEmployee.on('mouseenter', `ek-tracking-his-${_map_Container.id}-check-point`, (e) => {
                                _mapHistoryEmployee.getCanvas().style.cursor = 'pointer';
                                const bbox = [
                                    [e.point.x - 5, e.point.y - 5],
                                    [e.point.x + 5, e.point.y + 5],
                                ];
                                const selectedFeatures = _mapHistoryEmployee.queryRenderedFeatures(bbox, {
                                    layers: [`ek-tracking-his-${_map_Container.id}-check-point`],
                                });
                                if (_popup) _popup.remove();
                                _popup = new maplibregl.Popup({ className: 'ek-tracking-his-popup', closeButton: false, anchor: 'bottom', })
                                    .setLngLat(selectedFeatures[0].geometry.coordinates)
                                    .setHTML(
                                        `<div class="ek-tracking-his-popup-info">
                                    <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-marker ekmapplf_tracking-icon-default-color"></span>
                                    <span>${selectedFeatures[0].properties.address}</span>
                                </div>
                                <div class="ek-tracking-his-popup-info">
                                    <span class="ek-tracking-his-popup-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" fill="#51CF66"/></svg>
                                    </span>
                                    <span>${formatTimestamp(selectedFeatures[0].properties.time_checkin)}</span>
                                </div>
                                ${selectedFeatures[0].properties.time_checkout != '' ? `
                                    <div class="ek-tracking-his-popup-info">
                                        <span class="ek-tracking-his-popup-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" fill="#FF6B6B"/></svg>
                                        </span>
                                        <span>${formatTimestamp(selectedFeatures[0].properties.time_checkout)}</span>
                                    </div>`: ``}
                                `
                                    )
                                    .setOffset([0, -20])
                                    .addTo(_mapHistoryEmployee);
                            });
                            _mapHistoryEmployee.on('mouseleave', `ek-tracking-his-${_map_Container.id}-check-point`, () => {
                                _mapHistoryEmployee.getCanvas().style.cursor = '';
                                if (_popup) _popup.remove();
                            })
                        }

                        function formatTimestamp(timestamp) {
                            if (timestamp || timestamp != '') {
                                const dateObj = new Date(timestamp);
                                const formatter = new Intl.DateTimeFormat('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    timeZone: 'Asia/Ho_Chi_Minh'
                                });
                                return formatter.format(dateObj);
                            } else return 'Không có thông tin';
                        }
                    } catch (error) {
                        console.error("Error setPoints:", error);
                    }
                };

                const setNavigation = async () => {
                    try {
                        let LineSource = await _mapHistoryEmployee.getSource(`ek-tracking-his-${_map_Container.id}-line-source`)._data;
                        if (!_mapHistoryEmployee.getImage('marker-navigation')) {
                            const iconNavigation = await _mapHistoryEmployee.loadImage(_options.iconNavigation);
                            _mapHistoryEmployee.addImage('marker-navigation', iconNavigation.data)
                        }

                        if (!_mapHistoryEmployee.getImage('marker-stop')) {
                            const iconStop = await _mapHistoryEmployee.loadImage(_options.iconStop);
                            _mapHistoryEmployee.addImage('marker-stop', iconStop.data)
                        }

                        var NavigationPoint = {
                            'type': 'FeatureCollection',
                            'features': [
                                {
                                    'type': 'Feature',
                                    'properties': {},
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': LineSource.features[0].geometry.coordinates[0]
                                    }
                                }
                            ]
                        };
                        var Navigationline = {
                            'type': 'FeatureCollection',
                            'features': [
                                {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'LineString',
                                        'coordinates': [LineSource.features[0].geometry.coordinates[0]]
                                    }
                                }
                            ]
                        };
                        // var StopPoint = {
                        //     'type': 'FeatureCollection',
                        //     'features': []
                        // };

                        if (_mapHistoryEmployee.getSource(`ek-tracking-his-${_map_Container.id}-navigation-line-source`)) {
                            _mapHistoryEmployee.getSource(`ek-tracking-his-${_map_Container.id}-navigation-line-source`).setData(Navigationline)
                        } else {
                            _mapHistoryEmployee.addSource(`ek-tracking-his-${_map_Container.id}-navigation-line-source`, {
                                'type': 'geojson',
                                'data': Navigationline
                            });
                            _mapHistoryEmployee.addLayer({
                                'id': `ek-tracking-his-${_map_Container.id}-navigation-line-animation`,
                                'source': `ek-tracking-his-${_map_Container.id}-navigation-line-source`,
                                'type': 'line',
                                'layout': {
                                    'line-cap': 'round',
                                    'line-join': 'round'
                                },
                                'paint': {
                                    'line-color': _options.lineCorlor,
                                    'line-width': _options.lineWidth,
                                    'line-opacity': 0.8
                                }
                            });
                        }

                        if (_mapHistoryEmployee.getSource(`ek-tracking-his-${_map_Container.id}-navigation-point-source`)) {
                            _mapHistoryEmployee.getSource(`ek-tracking-his-${_map_Container.id}-navigation-point-source`).setData(NavigationPoint)
                        } else {
                            _mapHistoryEmployee.addSource(`ek-tracking-his-${_map_Container.id}-navigation-point-source`, {
                                'type': 'geojson',
                                'data': NavigationPoint
                            });
                            _mapHistoryEmployee.addLayer({
                                'id': `ek-tracking-his-${_map_Container.id}-navigation-point-animation`,
                                'source': `ek-tracking-his-${_map_Container.id}-navigation-point-source`,
                                'type': 'symbol',
                                'layout': {
                                    'icon-image': 'marker-navigation',
                                    'icon-rotate': ['get', 'bearing'],
                                    'icon-rotation-alignment': 'map',
                                    'icon-allow-overlap': true,
                                    'icon-overlap': 'always',
                                    'icon-ignore-placement': true,
                                    'icon-size': 0.8,
                                }
                            });
                        }

                        // if (_map.getSource(`ek-tracking-his-${_map_Container.id}-navigation-stop-point-source`)) {
                        //     _map.getSource(`ek-tracking-his-${_map_Container.id}-navigation-stop-point-source`).setData(StopPoint)
                        // } else {
                        //     _map.addSource(`ek-tracking-his-${_map_Container.id}-navigation-stop-point-source`, {
                        //         'type': 'geojson',
                        //         'data': StopPoint
                        //     });
                        //     _map.addLayer({
                        //         'id': `ek-tracking-his-${_map_Container.id}-navigation-stop-point`,
                        //         'source': `ek-tracking-his-${_map_Container.id}-navigation-stop-point-source`,
                        //         'type': 'symbol',
                        //         'layout': {
                        //             'icon-image': 'marker-stop',
                        //             'icon-allow-overlap': true,
                        //             'icon-overlap': 'always',
                        //             'icon-anchor': 'bottom',
                        //             'icon-size': 0.8,
                        //         }
                        //     });
                        // }
                    } catch (error) {
                        console.error("Error setNavigation:", error);
                    }

                };

                const visibleRouteLayer = (visible) => {
                    _mapHistoryEmployee.setLayoutProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'visibility', visible);
                }

                const reverseGeocode = async (position) => {
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
            } catch (error) {
                console.error('Error initializing map:', error);
            };
        };

        initializeMap();

        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, [options]);

    return (
        <div ref={mapContainer} id='ekmap-tracking-his-map'>
            {showControls && <Animate map={map.current} HistoryData={HistoryData.current} options={_options} isAnimate={_options.animateRoute} />}
            <MapLegend />
        </div>
    );
}

export default HistoryMap;
