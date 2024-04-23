import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import extend from 'xtend';
import bbox from '@turf/bbox';

import './map_realtime.css';
import MapLegend from './maplegend_realtime';

const ekmapplf = window.ekmapplf;

function RealtimeMap({ options, onClickPopup, status }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const intervalIdRef = useRef(null);

    const markers = useRef({});
    const markersOnScreen = useRef({});

    const defaultOptions = {
        center: [105, 17],
        zoom: 4.5,
        reloadTime: 60000,
        iconOnline: 'https://files.ekgis.vn/sdks/tracking/assets/check-icon.png',
        iconOffline: 'https://files.ekgis.vn/sdks/tracking/assets/offline-marker.png',
    };
    const _options = extend({}, defaultOptions, options);

    const initializeMap = async () => {
        try {
            map.current = new maplibregl.Map({
                container: mapContainer.current,
                center: _options.center,
                zoom: _options.zoom,
                minZoom: 1,
                pitch: 30,
            });

            var _map = map.current;
            // console.log(_map);
            _map.setPadding({ top: 100, bottom: 100, left: 100, right: 100 });

            new ekmapplf.VectorBaseMap('OSM:Bright', _options.apiKey).addTo(_map);

            var basemap = new ekmapplf.control.BaseMap({
                id: 'ekmapplf_tracking_ctrl_basemap',
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
            _map.addControl(btn3D, 'top-right');

            _map.addControl(new maplibregl.FullscreenControl(), 'top-right');

            _map.on('load', async () => {
                try {
                    let fc = await setMap();
                    if (fc.features.length) {
                        let bounds = bbox(fc);
                        _map.fitBounds(bounds, { padding: 100, maxZoom: 14, duration: 1000 });
                    }

                    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
                    intervalIdRef.current = setInterval(() => {
                        loadMap(_options.objectId);
                    }, 60000);
                } catch (error) {
                    console.error('Error:', error);
                }
            });

            const setMap = async () => {
                const getAllObjs = async () => {
                    let url = `https://api.ekgis.vn/tracking/${_options.projectId}/objects?api_key=${_options.apiKey}`;
                    let response = await fetch(url);
                    let responseData = await response.json();
                    return responseData.results.objects.map(item => item._id) || [];
                }
                if (!_options.objectId) _options.objectId = await getAllObjs(_options.projectId);
                return await loadMap(_options.objectId);
            }

            const loadMap = async (objectIds) => {
                if (!Array.isArray(objectIds)) return;

                const getLastPos = async (objectId) => {
                    try {
                        const urlTracking = `https://api.ekgis.vn/v2/tracking/locationHistory/position/${_options.projectId}/${objectId}/lastest?api_key=${_options.apiKey}`;
                        const urlCheckin = `https://api.ekgis.vn/v1/checkin/${_options.projectId}/${objectId}/lastcheckin?api_key=${_options.apiKey}`;
                        const responseTracking = await fetch(urlTracking);
                        const responseCheckin = await fetch(urlCheckin);
                        const DataTracking = await responseTracking.json();
                        const DataCheckin = await responseCheckin.json();
                        if (!DataTracking.position && !DataCheckin.length) {
                            return {
                                '_id': DataTracking.summary._id,
                                'name': DataTracking.summary.name,
                                'status': 'offline',
                            };
                        }
                        const TrackTimestamp = DataTracking.position ? Date.parse(DataTracking.position.timestamp) : 0;
                        const CheckinTimestamp = DataCheckin.length ? Date.parse(DataCheckin[0].timestamp) : 0;
                        const isTracking = TrackTimestamp > CheckinTimestamp;
                        var timestamp = isTracking ? TrackTimestamp : CheckinTimestamp

                        if (isToday(timestamp)) {
                            var status = 'offline'
                            const coords = isTracking ? [DataTracking.position.coords.longitude, DataTracking.position.coords.latitude] : DataCheckin[0].coordinates.split(',').map(coord => parseFloat(coord));
                            const address = await reverseGeocode(coords);

                            if (isTracking) {
                                if (Date.parse(new Date()) - timestamp <= 600 * 1000) status = 'online';
                            } else {
                                if (DataCheckin[0].timestamp.time_checkout == '') status = 'online'
                                else if (Date.parse(new Date()) - Date.parse(DataCheckin[0].timestamp.time_checkout) <= 600 * 1000) status = 'online';
                            }
                            return {
                                '_id': DataTracking.summary._id,
                                'name': DataTracking.summary.name,
                                'type': isTracking ? 'tracking' : 'checkin',
                                'position': isTracking ? DataTracking.position : DataCheckin[0],
                                'coordinates': coords,
                                'address': address,
                                'status': status,
                                'timestamp': timestamp
                            };
                        } else return {
                            '_id': DataTracking.summary._id,
                            'name': DataTracking.summary.name,
                            'status': 'offline',
                        };

                        function isToday(timestamp) {
                            const todayTimestamp = new Date().setHours(0, 0, 0, 0);
                            const dateTimestamp = new Date(timestamp).setHours(0, 0, 0, 0);
                            return dateTimestamp === todayTimestamp;
                        }

                    } catch (error) {
                        console.error('Error getting last position:', error);
                        throw error;
                    }
                };

                var DataObjs = await Promise.all(objectIds.map(item => getLastPos(item).catch(error => null)));
                DataObjs = DataObjs.filter(item => item !== null);
                // console.log(DataObjs);
                const statusCount = DataObjs.reduce((acc, cur) => {
                    if (cur.status === "offline") {
                        acc.offline++;
                    } else if (cur.status === "online") {
                        acc.online++;
                    }
                    return acc;
                }, { offline: 0, online: 0 });
                status(statusCount);
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
                    async function updateMarkers() {;
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
                                        onClickPopup({ _id: props._id, name: props.name })
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
