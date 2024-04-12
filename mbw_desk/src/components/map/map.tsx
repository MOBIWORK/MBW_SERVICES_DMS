import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import extend from 'xtend';
import bbox from '@turf/bbox';

import './map.css';
import MapLegend from './maplegend';
import Animate_And_Controls from './animate'
import { center } from '@turf/turf';

const ekmapplf = window.ekmapplf;

function HistoryMap({ options }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const segmentData = useRef([]);
    const [showControls, setShowControls] = useState(false);

    const defaultOptions = {
        center: [105, 17],
        zoom: 4.5,
        pageNumber: 1,
        pageSize: 5000,
        icon: {
            track: 'https://files.ekgis.vn/sdks/tracking/assets/custom_marker.png',
            navigation: 'https://files.ekgis.vn/sdks/tracking/assets/arrow.png',
            checkin: 'https://files.ekgis.vn/sdks/tracking/assets/check-icon.png',
            start: 'https://files.ekgis.vn/sdks/tracking/assets/start-icon.png',
            end: 'https://files.ekgis.vn/sdks/tracking/assets/end-icon.png',
            stop: 'https://files.ekgis.vn/sdks/tracking/assets/stop-icon.png',
        },
        route: {
            visible: true,
            lineCorlor: '#01579B',
            lineWidth: 4,
            lineOpacity: 0.8,
        },
        animation: {
            follow: true,
            animate: true,
        }
    };
    const _options = extend({}, defaultOptions, options);
    if (_options.apiKey === "" || !_options.apiKey) throw new Error("Parameter apiKey not valid");
    if (_options.projectId === "" || !_options.projectId) throw new Error("Parameter projectId not valid");
    if (_options.objectId === "" || !_options.objectId) throw new Error("Parameter objectId not valid");
    if (_options.from_time === "" || !_options.from_time) throw new Error("Parameter from_time not valid");
    if (_options.to_time === "" || !_options.to_time) throw new Error("Parameter to_time not valid");


    useEffect(() => {
        const initializeMap = () => {
            try {
                var _popup;
                map.current = new maplibregl.Map({
                    container: mapContainer.current,
                    center: _options.center,
                    zoom: _options.zoom,
                    minZoom: 1,
                });
                var _map = map.current;
                // console.log(_map);
                const _map_Container = _map.getContainer();

                // _map.setPadding({ top: 100, bottom: 100, left: 250, right: 70 });
                _map.setPadding({ top: 100, bottom: 100, left: 100, right: 100 });

                new ekmapplf.VectorBaseMap('OSM:Bright', _options.apiKey).addTo(_map);

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
                _map.addControl(basemap, 'bottom-left');
                basemap.on('changeBaseLayer', async function (response) {
                    await new ekmapplf.VectorBaseMap(response.layer, _options.apiKey).addTo(_map);
                    setTimeout(() => {
                        setMap(_options.from_time, _options.to_time, _options.pageNumber, _options.pageSize);
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
                        _map.easeTo({ pitch: 60 });
                        _map.setLayoutProperty('building-3d', 'visibility', 'visible');
                    } else {
                        _map.easeTo({ pitch: 0 });
                        _map.setLayoutProperty('building-3d', 'visibility', 'none');
                    }
                });
                _map.addControl(btn3D, 'bottom-right');

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

                _map.addControl(new maplibregl.FullscreenControl(), 'bottom-right');

                _map.on('load', () => {
                    try {
                        setMap(_options.from_time, _options.to_time, _options.pageNumber, _options.pageSize);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                });

                const setMap = async (from_time, to_time, pageNumber, pageSize) => {
                    let dataHistory = await getData(from_time, to_time, pageNumber, pageSize);
                    await initDataToMap(dataHistory);
                    segmentData.current = await preAnimation(dataHistory);
                    // console.log(dataHistory);
                    if (dataHistory.length && dataHistory[0].coordinates) _map.easeTo({ center: dataHistory[0].coordinates, duration: 100, zoom: 15 })
                    setTimeout(() => setShowControls(true), 500);
                }


                //Data
                const getData = async (from_time, to_time, pageNumber, pageSize) => {
                    let url = `https://api.ekgis.vn/v2/tracking/locationHistory/summary/${_options.projectId}/${_options.objectId}?api_key=${_options.apiKey}&from_time=${from_time}&to_time=${to_time}`;
                    const response = await fetch(url);
                    const Data = await response.json();
                    // console.log(Data);
                    var arrData = Data.details
                    return arrData;
                };


                //Map
                const initDataToMap = (data) => {
                    let LineSource = {
                        "type": "FeatureCollection",
                        "features": []
                    };
                    let CheckSource = {
                        'type': 'FeatureCollection',
                        'features': []
                    };
                    let TrackSource = {
                        'type': 'FeatureCollection',
                        'features': []
                    };
                    data.forEach(item => {
                        const feature = {
                            type: "Feature",
                            properties: item.type !== "move" ? item : {},
                            geometry: item.type === "move" ? item.route.geometry : {
                                type: "Point",
                                coordinates: item.coordinates
                            }
                        };
                        item.type === "move" ? LineSource.features.push(feature) :
                            item.type === "checkin" ? CheckSource.features.push(feature) : TrackSource.features.push(feature);
                    });

                    setLine(LineSource);
                    setPoints(CheckSource, TrackSource);
                    if (data.length) {
                        var boundbox = bbox(LineSource);
                        _map.fitBounds(boundbox, { padding: 100, maxZoom: 14, duration: 1000 });
                    }
                    // drawPath();
                    // addCar();
                }
                const setLine = (LineSource) => {
                    try {
                        if (!_map.getImage('icon_arrow')) {
                            var svg_arrow = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.2901 9.1698L7.70015 3.0698C4.95015 1.6198 1.96015 4.5498 3.35015 7.3298L4.97015 10.5698C5.42015 11.4698 5.42015 12.5298 4.97015 13.4298L3.35015 16.6698C1.96015 19.4498 4.95015 22.3698 7.70015 20.9298L19.2901 14.8298C21.5701 13.6298 21.5701 10.3698 19.2901 9.1698Z" stroke="#292D32" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="#e50027"/></svg>';
                            var icon_arrow = new Image();
                            icon_arrow.onload = function () {
                                if (!_map.hasImage('icon_arrow'))
                                    _map.addImage('icon_arrow', icon_arrow);
                            };
                            icon_arrow.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svg_arrow);
                        }

                        if (_map.getSource(`ek-tracking-his-${_map_Container.id}-line-source`)) {
                            _map.getSource(`ek-tracking-his-${_map_Container.id}-line-source`).setData(LineSource)
                        } else {
                            _map.addSource(`ek-tracking-his-${_map_Container.id}-line-source`, {
                                'type': 'geojson',
                                'data': LineSource,
                            });

                            _map.addLayer({
                                'id': `ek-tracking-his-${_map_Container.id}-LineString`,
                                'type': 'line',
                                'source': `ek-tracking-his-${_map_Container.id}-line-source`,
                                'layout': {
                                    'line-join': 'round',
                                    'line-cap': 'round',
                                    'visibility': _options.route.visible ? 'visible' : 'none',
                                },
                                'paint': {
                                    'line-color': _options.route.lineCorlor,
                                    'line-width': _options.route.lineWidth,
                                    'line-opacity': _options.route.lineOpacity
                                },
                                'filter': ['==', '$type', 'LineString']
                            });

                            _map.addLayer({
                                'id': `ek-tracking-his-${_map_Container.id}-LineString-arrow`,
                                'type': 'symbol',
                                'source': `ek-tracking-his-${_map_Container.id}-line-source`,
                                'layout': {
                                    'symbol-placement': 'line',
                                    'icon-ignore-placement': true,
                                    'symbol-spacing': 100,
                                    'icon-image': 'icon_arrow',
                                    'icon-size': {
                                        "stops": [
                                            [
                                                13,
                                                0.35
                                            ],
                                            [
                                                16,
                                                0.5
                                            ],
                                            [
                                                18,
                                                0.625
                                            ],
                                            [
                                                21,
                                                0.75
                                            ]
                                        ]
                                    }
                                }
                            });
                        }
                    } catch (error) {
                        console.error("Error setLine:", error);
                    }
                };
                const setPoints = async (CheckSource, TrackSource) => {
                    try {
                        if (!_map.getImage('marker-start')) {
                            const iconCheckin = await _map.loadImage(_options.icon.start);
                            _map.addImage('marker-start', iconCheckin.data)
                        }
                        if (!_map.getImage('marker-end')) {
                            const iconCheckin = await _map.loadImage(_options.icon.end);
                            _map.addImage('marker-end', iconCheckin.data)
                        }
                        if (!_map.getImage('marker-check')) {
                            const iconCheckin = await _map.loadImage(_options.icon.checkin);
                            _map.addImage('marker-check', iconCheckin.data)
                        }
                        if (!_map.getImage('marker-stop')) {
                            const iconStop = await _map.loadImage(_options.icon.stop);
                            _map.addImage('marker-stop', iconStop.data)
                        }

                        if (_map.getSource(`ek-tracking-his-${_map_Container.id}-track-source`)) {
                            _map.getSource(`ek-tracking-his-${_map_Container.id}-track-source`).setData(TrackSource)
                        } else {
                            _map.addSource(`ek-tracking-his-${_map_Container.id}-track-source`, {
                                'type': 'geojson',
                                'data': TrackSource,
                            });

                            _map.addLayer({
                                'id': `ek-tracking-his-${_map_Container.id}-track-point`,
                                'type': 'symbol',
                                'source': `ek-tracking-his-${_map_Container.id}-track-source`,
                                "layout": {
                                    "icon-image": [
                                        "match",
                                        ["get", "type"],
                                        "start", "marker-start",
                                        "end", "marker-end",
                                        "marker-stop"
                                    ],
                                    "icon-overlap": "cooperative",
                                    "icon-anchor": "bottom",
                                    "icon-size": 0.7,
                                    "icon-offset": [
                                        "case",
                                        ["==", ["get", "type"], "start"], ["literal", [20, 5]],
                                        ["==", ["get", "type"], "end"], ["literal", [20, 5]],
                                        ["literal", [0, 0]]
                                    ]
                                },
                                // "filter": ["any",
                                //     ["==", "type", "start"],
                                //     ["==", "type", "end"],
                                //     ["==", "type", "stop"]
                                // ]
                            });

                            _map.on('mouseenter', `ek-tracking-his-${_map_Container.id}-track-point`, (e) => {
                                _map.getCanvas().style.cursor = 'pointer';
                                const bbox = [
                                    [e.point.x - 5, e.point.y - 5],
                                    [e.point.x + 5, e.point.y + 5],
                                ];
                                const selectedFeatures = _map.queryRenderedFeatures(bbox, {
                                    layers: [`ek-tracking-his-${_map_Container.id}-track-point`],
                                });
                                let features = selectedFeatures[0]

                                let color = `default`;
                                if (features.properties.type != 'stop') color = features.properties.type;

                                if (_popup) _popup.remove();
                                _popup = new maplibregl.Popup({ className: 'ek-tracking-his-popup', closeButton: false, anchor: 'bottom', })
                                    .setLngLat(features.geometry.coordinates)
                                    .setHTML(`
                                        <div class="ek-tracking-his-popup-info">
                                            <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-marker ekmapplf_tracking-icon-${color}-color"></span>
                                            <span>${features.properties.address}</span>
                                        </div>
                                        ${features.properties.type !== 'stop' ? `
                                            <div class="ek-tracking-his-popup-info">
                                                <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-clock ekmapplf_tracking-icon-${color}-color"></span>
                                                <span>${formatTimestamp(features.properties.timestamp)}</span>
                                            </div>` : `
                                            <div class="ek-tracking-his-popup-info">
                                                <span class="ek-tracking-his-popup-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" fill="#51CF66"/>
                                                    </svg>
                                                </span>
                                                <span>${formatTimestamp(features.properties.startTime)}</span>
                                            </div>
                                            ${features.properties.endTime !== '' ? `
                                                <div class="ek-tracking-his-popup-info">
                                                    <span class="ek-tracking-his-popup-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" fill="#FF6B6B"/>
                                                        </svg>
                                                    </span>
                                                    <span>${formatTimestamp(features.properties.endTime)}</span>
                                                </div>` : ``} `}
                                    `)
                                    .setOffset([0, -20])
                                    .addTo(_map);
                            });
                            _map.on('mouseleave', `ek-tracking-his-${_map_Container.id}-track-point`, () => {
                                _map.getCanvas().style.cursor = '';
                                if (_popup) _popup.remove();
                            })
                        }

                        if (_map.getSource(`ek-tracking-his-${_map_Container.id}-check-source`)) {
                            _map.getSource(`ek-tracking-his-${_map_Container.id}-check-source`).setData(CheckSource)
                        } else {
                            _map.addSource(`ek-tracking-his-${_map_Container.id}-check-source`, {
                                'type': 'geojson',
                                'data': CheckSource,
                                'cluster': true,
                                'clusterMaxZoom': 14,
                                'clusterRadius': 50
                            });

                            _map.addLayer({
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
                            _map.addLayer({
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
                            _map.addLayer({
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

                            _map.on('mouseenter', `ek-tracking-his-${_map_Container.id}-check-clusters`, () => {
                                _map.getCanvas().style.cursor = 'pointer';
                            });
                            _map.on('mouseleave', `ek-tracking-his-${_map_Container.id}-check-clusters`, () => {
                                _map.getCanvas().style.cursor = '';
                            });
                            _map.on('click', `ek-tracking-his-${_map_Container.id}-check-clusters`, async (e) => {
                                const features = _map.queryRenderedFeatures(e.point, {
                                    layers: [`ek-tracking-his-${_map_Container.id}-check-clusters`]
                                });
                                const clusterId = features[0].properties.cluster_id;
                                const zoom = await _map.getSource(`ek-tracking-his-${_map_Container.id}-check-source`).getClusterExpansionZoom(clusterId);
                                _map.easeTo({
                                    center: features[0].geometry.coordinates,
                                    zoom: zoom,
                                });
                            });

                            _map.on('mouseenter', `ek-tracking-his-${_map_Container.id}-check-point`, (e) => {
                                _map.getCanvas().style.cursor = 'pointer';
                                const bbox = [
                                    [e.point.x - 5, e.point.y - 5],
                                    [e.point.x + 5, e.point.y + 5],
                                ];
                                const selectedFeatures = _map.queryRenderedFeatures(bbox, {
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
                                    <span>${formatTimestamp(selectedFeatures[0].properties.startTime)}</span>
                                </div>
                                ${selectedFeatures[0].properties.endTime != '' ? `
                                    <div class="ek-tracking-his-popup-info">
                                        <span class="ek-tracking-his-popup-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" fill="#FF6B6B"/></svg>
                                        </span>
                                        <span>${formatTimestamp(selectedFeatures[0].properties.endTime)}</span>
                                    </div>`: ``}
                                `
                                    )
                                    .setOffset([0, -20])
                                    .addTo(_map);
                            });
                            _map.on('mouseleave', `ek-tracking-his-${_map_Container.id}-check-point`, () => {
                                _map.getCanvas().style.cursor = '';
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
                // const setNavigation = async (Data) => {
                //     try {
                //         let coords=[]
                //         Data.forEach(item => {
                //             if (item.type === "move") {
                //                 coords = coords.concat(item.route.geometry.coordinates);
                //             }
                //         });

                //         if (!_map.getImage('marker-navigation')) {
                //             const iconNavigation = await _map.loadImage(_options.icon.navigation);
                //             _map.addImage('marker-navigation', iconNavigation.data)
                //         }

                //         var NavigationPoint = {
                //             'type': 'FeatureCollection',
                //             'features': [
                //                 {
                //                     'type': 'Feature',
                //                     'properties': {},
                //                     'geometry': {
                //                         'type': 'Point',
                //                         'coordinates': coords[0]
                //                     }
                //                 }
                //             ]
                //         };
                //         var Navigationline = {
                //             'type': 'FeatureCollection',
                //             'features': [
                //                 {
                //                     'type': 'Feature',
                //                     'geometry': {
                //                         'type': 'LineString',
                //                         'coordinates': [coords[0]]
                //                     }
                //                 }
                //             ]
                //         };

                //         if (!_map.getSource(`ek-tracking-his-${_map_Container.id}-navigation-line-source`)) {
                //             _map.addSource(`ek-tracking-his-${_map_Container.id}-navigation-line-source`, {
                //                 'type': 'geojson',
                //                 'data': Navigationline
                //             });
                //             _map.addLayer({
                //                 'id': `ek-tracking-his-${_map_Container.id}-navigation-line-animation`,
                //                 'source': `ek-tracking-his-${_map_Container.id}-navigation-line-source`,
                //                 'type': 'line',
                //                 'layout': {
                //                     'line-cap': 'round',
                //                     'line-join': 'round'
                //                 },
                //                 'paint': {
                //                     'line-color': _options.route.lineCorlor,
                //                     'line-width': _options.route.lineWidth,
                //                     'line-opacity': 0.8
                //                 }
                //             });
                //         } else {
                //             _map.getSource(`ek-tracking-his-${_map_Container.id}-navigation-line-source`).setData(Navigationline)
                //         }

                //         if (!_map.getSource(`ek-tracking-his-${_map_Container.id}-navigation-point-source`)) {
                //             _map.addSource(`ek-tracking-his-${_map_Container.id}-navigation-point-source`, {
                //                 'type': 'geojson',
                //                 'data': NavigationPoint
                //             });
                //             _map.addLayer({
                //                 'id': `ek-tracking-his-${_map_Container.id}-navigation-point-animation`,
                //                 'source': `ek-tracking-his-${_map_Container.id}-navigation-point-source`,
                //                 'type': 'symbol',
                //                 'layout': {
                //                     'icon-image': 'marker-navigation',
                //                     'icon-rotate': ['get', 'bearing'],
                //                     'icon-rotation-alignment': 'map',
                //                     'icon-allow-overlap': true,
                //                     'icon-overlap': 'always',
                //                     'icon-ignore-placement': true,
                //                     'icon-size': 0.7,
                //                 }
                //             });
                //         } else {
                //             _map.getSource(`ek-tracking-his-${_map_Container.id}-navigation-point-source`).setData(NavigationPoint)
                //         }
                //     } catch (error) {
                //         console.error("Error setNavigation:", error);
                //     }
                // };


                //Map

                // function drawPath() {
                //     var fcLocationHistory = {
                //         "type": "FeatureCollection",
                //         "features": []
                //     };

                //     if (!_map.getSource('LocationHistory')) {
                //         _map.addSource('LocationHistory', {
                //             'type': 'geojson',
                //             'data': fcLocationHistory
                //         });
                //         _map.addLayer({
                //             'id': 'LocationHistory',
                //             'type': 'line',
                //             'source': 'LocationHistory',
                //             'layout': {
                //                 'line-cap': 'round',
                //                 'line-join': 'round'
                //             },
                //             'paint': {
                //                 'line-color': _options.route.lineCorlor,
                //                 'line-width': _options.route.lineWidth,
                //                 'line-opacity': _options.route.lineOpacity
                //             },
                //         });
                //     } else
                //         _map.getSource('LocationHistory').setData(fcLocationHistory);
                // }
                // async function addCar() {
                //     if (!_map.getImage('marker-navigation')) {
                //         const iconNavigation = await _map.loadImage(_options.icon.navigation);
                //         _map.addImage('marker-navigation', iconNavigation.data)
                //     }

                //     var locationMarker = {
                //         "type": "FeatureCollection",
                //         "features": []
                //     };

                //     if (!_map.getSource('locationMarker')) {
                //         _map.addSource('locationMarker', {
                //             'type': 'geojson',
                //             'data': locationMarker
                //         });

                //         _map.addLayer({
                //             'id': 'locationMarker',
                //             'source': 'locationMarker',
                //             'type': 'symbol',
                //             'layout': {
                //                 "icon-size": 0.7,
                //                 "icon-offset": [0, -10],
                //                 "icon-allow-overlap": true,
                //                 "icon-image": 'marker-navigation',
                //                 "icon-rotate": ["get", "bearing"],
                //                 "icon-rotation-alignment": "map",
                //                 'icon-overlap': 'always',
                //                 'icon-ignore-placement': true,
                //             }
                //         });
                //     } else
                //         _map.getSource('locationMarker').setData(locationMarker);
                // }
                const preAnimation = async (Data) => {
                    var gpxData, segmentData, summaryData

                    var fc = {
                        type: "FeatureCollection",
                        features: []
                    };

                    Data.forEach(data => {
                        if (data.type === 'move') {
                            for (let i = 0; i < data.route.locations.length; i++) {
                                let location = data.route.locations[i];
                                let point = {
                                    'type': 'Feature',
                                    'properties': {
                                        time: location.timestamp,
                                        ele: 0,
                                        speed: location.speed,
                                        // odometer: data.odometer,
                                    },
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': location.coordinates
                                    }
                                };
                                fc.features.push(point);
                            }
                        } else if (data.type === 'stop' || data.type === 'checkin') {
                            let point = {
                                'type': 'Feature',
                                'properties': {
                                    time: data.timestamp,
                                    ele: 0,
                                    speed: -1,
                                    // odometer: 0,
                                },
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': data.coordinates
                                }
                            };
                            fc.features.push(point);
                        }
                    });

                    gpxData = parseGpxData(fc);
                    segmentData = computeData(gpxData);
                    // summaryData = computeHighlights(segmentData);

                    // console.log('gpxData', gpxData);
                    // console.log('segmentData', segmentData);
                    // console.log('summaryData', summaryData);

                    return segmentData
                    //Data
                    function parseGpxData(fc) {
                        var result = {
                            segments: [],
                            id: options.objectId
                        };
                        let segments = [];
                        result.segments.push(segments);

                        for (let i = 0; i < fc.features.length; i++) {
                            var feature = fc.features[i];
                            let trkpt = {
                                loc: feature.geometry.coordinates,
                                time: new Date(feature.properties.time).getTime(),
                                ele: feature.properties.ele,
                            };
                            segments.push(trkpt);
                        }
                        return result;
                    }
                    function computeData(gpxData) {
                        const result = [];

                        for (let i = 0; i < gpxData.segments.length; i++) {
                            const segment = gpxData.segments[i];

                            for (let j = 1; j < segment.length; j++) {
                                const locData1 = segment[j - 1];
                                const locData2 = segment[j];
                                var time1 = locData1.time;
                                var time2 = locData2.time;
                                var loc1Time = new Date(time1);
                                var loc2Time = new Date(time2);
                                let d = 0;

                                if (loc1Time.getDate() === loc2Time.getDate() && loc1Time.getMonth() === loc2Time.getMonth() && loc1Time.getFullYear() === loc2Time.getFullYear()) {
                                    d = getSegDistance(locData1.loc[1], locData1.loc[0], locData2.loc[1], locData2.loc[0], locData1.ele, locData2.ele);
                                }

                                const tsegment = {
                                    computed: {
                                        distance: d
                                    },
                                    loc1: locData1,
                                    loc2: locData2
                                };

                                if (locData1.ele && locData2.ele) {
                                    tsegment.computed.ele = locData2.ele;
                                }

                                if (locData1.time && locData2.time) {
                                    const { speed, time } = getSegSpeed(d, locData1.time, locData2.time);
                                    const filteredSpeed = speed;

                                    tsegment.computed.speed = speed;
                                    tsegment.computed.time = time;
                                    tsegment.computed.filteredSpeed = filteredSpeed;
                                }

                                if (locData1.temp && locData2.temp) tsegment.computed.temp = (locData1.temp + locData2.temp) / 2;

                                if (locData2.hr) tsegment.computed.hr = locData2.hr;

                                if (locData2.cad) tsegment.computed.cad = locData2.cad;

                                if (tsegment.computed.speed) result.push(tsegment);
                            }
                        };

                        return result;
                    }
                    function getSegDistance(lat1, lon1, lat2, lon2, ele1, ele2) {
                        const R = 6371e3; // meters
                        const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
                        const φ2 = (lat2 * Math.PI) / 180;
                        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
                        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

                        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        let d = R * c; // in meters

                        if (ele1 !== undefined && ele2 !== undefined) {
                            const Δh = ele2 - ele1;

                            if (Δh !== 0) {
                                d = Math.sqrt(Math.pow(d, 2) + Math.pow(Δh, 2));
                            }
                        }

                        return d;
                    }
                    function getSegSpeed(d, time1, time2) {
                        const Δt = time2 / 1000 - time1 / 1000; // Time in seconds
                        const v = d / Δt; // Speed in m/s
                        const kph = v * 3.6; // Speed in km/h

                        return {
                            speed: kph,
                            time: Δt,
                        };
                    }
                    function computeHighlights(segmentData) {
                        let result = {};

                        result.distance = 0;

                        for (let i = 0; i < segmentData.length; i++) {
                            const seg = segmentData[i].computed;
                            let sseg;

                            if (segmentData[i - 1]) sseg = segmentData[i - 1].computed;

                            result.distance += seg.distance;

                            if (seg.ele) {
                                result.maxEle = result.maxEle || 0;
                                result.minEle = result.minEle || 0;
                                result.gainEle = result.gainEle || 0;
                                result.totEle = result.totEle || 0;

                                if (seg.ele > result.maxEle) result.maxEle = seg.ele;
                                if (seg.ele < result.minEle) result.minEle = seg.ele;

                                if (sseg && sseg.ele) {
                                    let eleDiff = seg.ele - sseg.ele;

                                    if (eleDiff > 0) {
                                        result.gainEle += eleDiff;
                                        result.totEle += eleDiff;
                                    } else if (eleDiff < 0) {
                                        result.totEle += eleDiff;
                                    }
                                }
                            }

                            if (seg.time) {
                                result.totalTime = result.totalTime || 0;
                                result.totalTime += seg.time;

                                if (seg.speed && seg.filteredSpeed) {
                                    result.avgSpeed = result.avgSpeed || 0;
                                    result.avgMovingSpeed = result.avgMovingSpeed || 0;
                                    result.movingTime = result.movingTime || 0;
                                    result.maxSpeed = result.maxSpeed || 0;

                                    result.avgSpeed += seg.speed * seg.time;

                                    if (seg.speed > 5) {
                                        result.avgMovingSpeed += seg.speed * seg.time;
                                        result.movingTime += seg.time;
                                    }

                                    if (seg.filteredSpeed > result.maxSpeed && seg.filteredSpeed < 200) {
                                        result.maxSpeed = seg.filteredSpeed;
                                        result.maxSpeedIndex = i;
                                    }
                                }

                                if (seg.temp) {
                                    result.avgTemp = result.avgTemp || 0;
                                    result.maxTemp = result.maxTemp || 0;

                                    result.avgTemp += seg.temp * seg.time;

                                    if (seg.temp > result.maxTemp) {
                                        result.maxTemp = seg.temp;
                                    }
                                }

                                if (seg.hr) {
                                    result.avgHr = result.avgHr || 0;
                                    result.maxHr = result.maxHr || 0;

                                    result.avgHr += seg.hr * seg.time;

                                    if (seg.hr > result.maxHr) {
                                        result.maxHr = seg.hr;
                                        result.maxHrIndex = i;
                                    }
                                }

                                if (seg.cad) {
                                    result.avgCad = result.avgCad || 0;
                                    result.maxCad = result.maxCad || 0;

                                    result.avgCad += seg.cad * seg.time;

                                    if (seg.cad > result.maxCad) {
                                        result.maxCad = seg.cad;
                                        result.maxCadIndex = i;
                                    }
                                }
                            }
                        }

                        if (result.totalTime) {
                            result.avgSpeed = result.avgSpeed || 0;
                            result.avgCad = result.avgCad || 0;
                            result.avgHr = result.avgHr || 0;
                            result.avgTemp = result.avgTemp || 0;

                            result.avgSpeed /= result.totalTime;
                            result.avgCad /= result.totalTime;
                            result.avgHr /= result.totalTime;
                            result.avgTemp /= result.totalTime;

                            result.totalTime /= 3600;
                        }

                        if (result.movingTime) {
                            result.avgMovingSpeed = result.avgMovingSpeed || 0;
                            result.avgMovingSpeed /= result.movingTime;
                            result.movingTime /= 3600;
                        }

                        return result;
                    }

                    // drawPath();
                    // addCar();
                }

                function drawPath() {
                    var fcLocationHistory = {
                        "type": "FeatureCollection",
                        "features": []
                    };

                    if (!_map.getSource('LocationHistory')) {
                        _map.addSource('LocationHistory', {
                            'type': 'geojson',
                            'data': fcLocationHistory
                        });
                        _map.addLayer({
                            'id': 'LocationHistory',
                            'type': 'line',
                            'source': 'LocationHistory',
                            'layout': {
                                'line-cap': 'round',
                                'line-join': 'round'
                            },
                            'paint': {
                                'line-color': _options.route.lineCorlor,
                                'line-width': _options.route.lineWidth,
                                'line-opacity': _options.route.lineOpacity
                            },
                        });
                    } else
                        _map.getSource('LocationHistory').setData(fcLocationHistory);
                }
                async function addCar() {
                    if (!_map.getImage('marker-navigation')) {
                        const iconNavigation = await _map.loadImage(_options.icon.navigation);
                        _map.addImage('marker-navigation', iconNavigation.data)
                    }

                    var locationMarker = {
                        "type": "FeatureCollection",
                        "features": []
                    };

                    if (!_map.getSource('locationMarker')) {
                        _map.addSource('locationMarker', {
                            'type': 'geojson',
                            'data': locationMarker
                        });

                        _map.addLayer({
                            'id': 'locationMarker',
                            'source': 'locationMarker',
                            'type': 'symbol',
                            'layout': {
                                "icon-size": 0.7,
                                "icon-offset": [0, -10],
                                "icon-allow-overlap": true,
                                "icon-image": 'marker-navigation',
                                "icon-rotate": ["get", "bearing"],
                                "icon-rotation-alignment": "map",
                                'icon-overlap': 'always',
                                'icon-ignore-placement': true,
                            }
                        });
                    } else
                        _map.getSource('locationMarker').setData(locationMarker);
                }

                const visibleRouteLayer = (visible) => {
                    _map.setLayoutProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'visibility', visible);
                }

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
            {/* {showControls && <Animate_And_Controls map={map.current} HistoryData={HistoryData.current} options={_options} />} */}
            {showControls && <Animate_And_Controls map={map.current} segmentData={segmentData.current} options={_options} />}
            <MapLegend />
        </div>
    );
}

export default HistoryMap;
