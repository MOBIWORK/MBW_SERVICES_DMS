import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import extend from 'xtend';
import bbox from '@turf/bbox';

import './map_realtime.css';
import MapLegend from './maplegend_realtime';

const ekmapplf = window.ekmapplf;

function RealtimeMap({ options, onClickPopup }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const intervalIdRef = useRef(null);

    const defaultOptions = {
        center: [105, 17],
        zoom: 4.5,
        reloadTime: 60000,
        iconTrack: '/public/assets/custom_marker.png',
        iconNavigation: '/public/assets/arrow.png',
        iconCheckin: '/public/assets/check-icon.png',
        iconStart: '/public/assets/start-icon.png',
        iconEnd: '/public/assets/end-icon.png',
        iconStop: '/public/assets/stop-icon.png',
    };
    const _options = extend({}, defaultOptions, options);
    if (_options.apiKey == "" || !_options.apiKey) throw new Error("Parameter apiKey not valid");
    if (_options.projectId == "" || !_options.projectId) throw new Error("Parameter projectId not valid");
    if (_options.objectId && !Array.isArray(_options.objectId)) throw new Error("Parameter objectId not valid");

    useEffect(() => {
        const initializeMap = async () => {
            try {
                var _popup;
                map.current = new maplibregl.Map({
                    container: mapContainer.current,
                    center: _options.center,
                    zoom: _options.zoom,
                    minZoom: 1,
                    pitch: 30,
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
                _map.addControl(btn3D, 'bottom-right');

                _map.addControl(new maplibregl.FullscreenControl(), 'bottom-right');

                _map.on('load', async () => {
                    try {
                        let fc = await setMap();
                        let bounds = bbox(fc);
                        _map.fitBounds(bounds, { padding: 100, maxZoom: 14, duration: 1500 });

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

                    let objectIds = _options.objectId ? _options.objectId : await getAllObjs(_options.projectId);
                    _options.objectId = objectIds;
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
                                };
                            }
                            const TrackTimestamp = DataTracking.position ? Date.parse(DataTracking.position.timestamp) : 0;
                            const CheckinTimestamp = DataCheckin.length ? Date.parse(DataCheckin[0].timestamp) : 0;
                            const isTracking = TrackTimestamp > CheckinTimestamp;
                            const coords = isTracking ? [DataTracking.position.coords.longitude, DataTracking.position.coords.latitude] : DataCheckin[0].coordinates.split(',').map(coord => parseFloat(coord));
                            const address = await reverseGeocode(coords);
                            return {
                                '_id': DataTracking.summary._id,
                                'name': DataTracking.summary.name,
                                'type': isTracking ? 'tracking' : 'checkin',
                                'position': isTracking ? DataTracking.position : DataCheckin[0],
                                'coordinates': coords,
                                'address': address,
                            };
                        } catch (error) {
                            console.error('Error getting last position:', error);
                            throw error;
                        }
                    };
                    const DataObjs = await Promise.all(objectIds.map(item => getLastPos(item).catch(error => null)));
                    // console.log(DataObjs);
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
                    if (!_map.getImage('marker-track')) {
                        const markerTrack = await _map.loadImage(_options.iconTrack);
                        _map.addImage('marker-track', markerTrack.data)
                    }
                    if (!_map.getImage('marker-checkin')) {
                        const markerCheckin = await _map.loadImage(_options.iconCheckin);
                        _map.addImage('marker-checkin', markerCheckin.data)
                    }

                    if (_map.getSource(`ek-tracking-live-${_map_Container.id}-source`)) {
                        _map.getSource(`ek-tracking-live-${_map_Container.id}-source`).setData(FeatureCollection);
                    } else {
                        _map.addSource(`ek-tracking-live-${_map_Container.id}-source`, {
                            'type': 'geojson',
                            'data': FeatureCollection,
                            'cluster': true,
                            'clusterMaxZoom': 14,
                            'clusterRadius': 55
                        });

                        //cluster
                        _map.addLayer({
                            id: `ek-tracking-live-${_map_Container.id}-clusters`,
                            type: 'circle',
                            source: `ek-tracking-live-${_map_Container.id}-source`,
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
                            id: `ek-tracking-live-${_map_Container.id}-cluster-count`,
                            type: 'symbol',
                            source: `ek-tracking-live-${_map_Container.id}-source`,
                            // filter: ['has', 'point_count'],
                            filter: ['==', 'cluster', true],
                            layout: {
                                'text-field': '{point_count_abbreviated}',
                                'text-size': 12
                            }
                        });

                        _map.on('mouseenter', `ek-tracking-live-${_map_Container.id}-clusters`, () => {
                            _map.getCanvas().style.cursor = 'pointer';
                        });
                        _map.on('mouseleave', `ek-tracking-live-${_map_Container.id}-clusters`, () => {
                            _map.getCanvas().style.cursor = '';
                        });
                        _map.on('click', `ek-tracking-live-${_map_Container.id}-clusters`, async (e) => {
                            const features = _map.queryRenderedFeatures(e.point, {
                                layers: [`ek-tracking-live-${_map_Container.id}-clusters`]
                            });
                            const clusterId = features[0].properties.cluster_id;
                            const zoom = await _map.getSource(`ek-tracking-live-${_map_Container.id}-source`).getClusterExpansionZoom(clusterId);
                            _map.easeTo({
                                center: features[0].geometry.coordinates,
                                zoom: zoom + 0.01,
                            });
                        });

                        //uncluster
                        const markers = {};
                        let markersOnScreen = {};
                        async function updateMarkers() {
                            const newMarkers = {};
                            const features = _map.querySourceFeatures(`ek-tracking-live-${_map_Container.id}-source`);
                            for (let i = 0; i < features.length; i++) {
                                const coords = features[i].geometry.coordinates;
                                const props = features[i].properties;
                                if (props.cluster) continue;
                                const id = props._id;
                                let marker = markers[id];
                                if (!marker) {
                                    const el = document.createElement('div');
                                    el.className = 'marker-employee';
                                    el.innerHTML = `
                                        <div class="marker-name">${props.name}</div>
                                        <div class="marker-img"></div>`;
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
                                            onClickPopup(props._id)
                                        })
                                    })
                                    popup.on('close', () => {
                                        el.querySelector('.marker-name').style.removeProperty('display');
                                    })
                                    marker = markers[id] = new maplibregl.Marker({ element: el, anchor: 'bottom' })
                                        .setPopup(popup)
                                        .setLngLat(coords);

                                }
                                newMarkers[id] = marker;

                                if (markersOnScreen[id]) marker.addTo(_map);
                            }

                            for (let id in markersOnScreen) {
                                if (!newMarkers[id]) markersOnScreen[id].remove();
                            }
                            markersOnScreen = newMarkers;
                        }

                        _map.on('data', (e) => {
                            if (e.sourceId !== `ek-tracking-live-${_map_Container.id}-source` || !e.isSourceLoaded) return;
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
