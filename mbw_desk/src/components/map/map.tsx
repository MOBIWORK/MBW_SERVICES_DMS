import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import extend from 'xtend';
import bbox from '@turf/bbox';
import { Flex } from "antd";

import './map.css';
import MapLegend from './maplegend';
import Animate_And_Controls from './animate'

const ekmapplf = window.ekmapplf;

function HistoryMap({ options, onLoad, HistoryIndex }) {
    const mapContainer = useRef(null);
    const map = useState(null);
    const [HisMap, setHisMap] = useState(null);
    const [Controls, setControls] = useState({
        ready: false,
        Data: [],
        options: null
    });
    const [Stage, setStage] = useState({
        date: null,
        time: null,
        speed: 0
    });
    const HistoryData = useRef(null);
    const GpxData = useRef(null);
    const [Animation, setAnimation] = useState(false);
    const popupHis = useRef(null);

    const defaultOptions = {
        center: [105, 17],
        zoom: 5,
        pageNumber: 1,
        pageSize: 5000,
        icon: {
            arrow : '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.2901 9.1698L7.70015 3.0698C4.95015 1.6198 1.96015 4.5498 3.35015 7.3298L4.97015 10.5698C5.42015 11.4698 5.42015 12.5298 4.97015 13.4298L3.35015 16.6698C1.96015 19.4498 4.95015 22.3698 7.70015 20.9298L19.2901 14.8298C21.5701 13.6298 21.5701 10.3698 19.2901 9.1698Z" stroke="#292D32" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="#F5222D"/></svg>',
            navigation: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="26px" height="32px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"><g><path style="opacity:0.998" fill="#43c5fb" d="M 16.5,9.5 C 17.1052,14.0317 18.7719,18.0317 21.5,21.5C 22.0081,24.1761 22.1747,26.8428 22,29.5C 21.3292,28.7476 20.4959,28.4142 19.5,28.5C 18.0085,25.3657 15.5085,23.3657 12,22.5C 10.2509,22.7483 9.41755,23.7483 9.5,25.5C 6.83333,26.5 4.16667,27.5 1.5,28.5C 2.95475,22.6465 5.12141,16.9799 8,11.5C 8.56704,8.83228 9.06704,6.16562 9.5,3.5C 10.4674,2.19376 11.8007,1.52709 13.5,1.5C 13.7329,4.54176 14.7329,7.20843 16.5,9.5 Z"/></g><g><path style="opacity:0.357" fill="#bfe2ee" d="M 16.5,9.5 C 14.7329,7.20843 13.7329,4.54176 13.5,1.5C 11.8007,1.52709 10.4674,2.19376 9.5,3.5C 9.5,2.5 9.5,1.5 9.5,0.5C 11.1667,0.5 12.8333,0.5 14.5,0.5C 15.4608,3.42607 16.1274,6.42607 16.5,9.5 Z"/></g><g><path style="opacity:0.224" fill="#afdcf1" d="M 16.5,9.5 C 19.2367,12.9831 20.9034,16.9831 21.5,21.5C 18.7719,18.0317 17.1052,14.0317 16.5,9.5 Z"/></g><g><path style="opacity:0.306" fill="#c2e3f4" d="M 9.5,3.5 C 9.06704,6.16562 8.56704,8.83228 8,11.5C 5.12141,16.9799 2.95475,22.6465 1.5,28.5C 4.16667,27.5 6.83333,26.5 9.5,25.5C 7.68383,27.1366 5.68383,28.6366 3.5,30C 2.07153,30.5791 0.738195,30.4124 -0.5,29.5C -0.5,28.1667 -0.5,26.8333 -0.5,25.5C 2.83333,18.1667 6.16667,10.8333 9.5,3.5 Z"/></g><g><path style="opacity:0.831" fill="#ade2fd" d="M 19.5,28.5 C 16.6277,27.4744 14.1277,25.8077 12,23.5C 11.2917,24.3805 10.4584,25.0472 9.5,25.5C 9.41755,23.7483 10.2509,22.7483 12,22.5C 15.5085,23.3657 18.0085,25.3657 19.5,28.5 Z"/></g><g><path style="opacity:0.047" fill="#c4e9f7" d="M 21.5,21.5 C 23.4725,24.0836 24.4725,27.0836 24.5,30.5C 22.302,30.8799 20.6354,30.2132 19.5,28.5C 20.4959,28.4142 21.3292,28.7476 22,29.5C 22.1747,26.8428 22.0081,24.1761 21.5,21.5 Z"/></g></svg>`,
            start: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="44px" height="44px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd">
            <g><path style="opacity:1" fill="#2ac560" d="M 23.5,7.5 C 23.6107,8.11742 23.944,8.61742 24.5,9C 28.2255,9.75991 31.8922,9.59324 35.5,8.5C 37.0616,15.4204 36.7283,22.0871 34.5,28.5C 30.1311,28.5328 25.7978,28.1995 21.5,27.5C 21.4226,26.2502 20.756,25.4169 19.5,25C 16.633,24.1993 13.9664,24.3659 11.5,25.5C 10.5,25.5 9.5,25.5 8.5,25.5C 7.67618,29.3123 7.17618,33.3123 7,37.5C 6.50016,26.8385 6.3335,16.1719 6.5,5.5C 12.4855,2.62241 18.1522,3.28908 23.5,7.5 Z"/></g>
            <g><path style="opacity:0.73" fill="#8fd8a8" d="M 34.5,28.5 C 36.7283,22.0871 37.0616,15.4204 35.5,8.5C 31.8922,9.59324 28.2255,9.75991 24.5,9C 23.944,8.61742 23.6107,8.11742 23.5,7.5C 28.4839,8.45762 33.3172,8.45762 38,7.5C 37.5937,14.5348 37.427,21.5348 37.5,28.5C 36.5,28.5 35.5,28.5 34.5,28.5 Z"/></g>
            <g><path style="opacity:0.627" fill="#81d09f" d="M 6.5,5.5 C 6.3335,16.1719 6.50016,26.8385 7,37.5C 7.17618,33.3123 7.67618,29.3123 8.5,25.5C 8.5,30.1667 8.5,34.8333 8.5,39.5C 7.17793,39.67 6.01127,39.3366 5,38.5C 4.83333,36.6667 4.66667,34.8333 4.5,33C 5.71694,24.656 5.71694,16.3226 4.5,8C 4.68423,6.62439 5.35089,5.79106 6.5,5.5 Z"/></g>
            <g><path style="opacity:1" fill="#9be0b2" d="M 11.5,25.5 C 13.9664,24.3659 16.633,24.1993 19.5,25C 20.756,25.4169 21.4226,26.2502 21.5,27.5C 18.3652,25.9767 15.0318,25.31 11.5,25.5 Z"/></g>
            <g><path style="opacity:0.975" fill="#5dc982" d="M 21.5,27.5 C 25.7978,28.1995 30.1311,28.5328 34.5,28.5C 33.036,29.1599 31.3693,29.4932 29.5,29.5C 26.5143,29.6183 23.8476,28.9517 21.5,27.5 Z"/></g>
            </svg>`,
            end: `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="44" height="44">
            <path d="M0 0 C1.06 -0.01 2.12 -0.03 3.21 -0.04 C6.18 0.19 7.6 0.85 10.19 2.19 C12.45 2.24 12.45 2.24 14.75 2 C17.14 1.96 17.14 1.96 19.19 2.19 C20.94 4.06 20.94 4.06 22.19 7.19 C22.62 7.97 23.05 8.76 23.5 9.57 C27.28 16.45 27.28 16.45 26.83 20 C26.62 20.72 26.41 21.44 26.19 22.19 C24.6 22.24 23.02 22.28 21.44 22.31 C20.56 22.34 19.67 22.36 18.77 22.38 C16.04 22.18 14.57 21.45 12.19 20.19 C8.47 19.99 5.73 20.01 2.19 21.19 C3.53 25.46 4.87 29.55 6.88 33.56 C8.19 36.19 8.19 36.19 8.19 39.19 C7.2 39.19 6.21 39.19 5.19 39.19 C3.24 35.23 1.3 31.26 -0.63 27.29 C-1.29 25.95 -1.94 24.6 -2.6 23.26 C-6.15 16.03 -9.53 8.93 -11.81 1.19 C-10.61 1.22 -10.61 1.22 -9.38 1.25 C-6.07 1.17 -3.67 0.02 0 0 Z M4.19 3.19 C4.52 4.18 4.85 5.17 5.19 6.19 C6.18 5.86 7.17 5.53 8.19 5.19 C6.87 4.53 5.55 3.87 4.19 3.19 Z M-4.81 3.19 C-5.8 3.68 -5.8 3.68 -6.81 4.19 C-6.48 5.51 -6.15 6.83 -5.81 8.19 C-4.49 7.53 -3.17 6.87 -1.81 6.19 C-2.8 5.2 -3.79 4.21 -4.81 3.19 Z M16.19 5.19 C15.86 5.85 15.53 6.51 15.19 7.19 C15.52 7.85 15.85 8.51 16.19 9.19 C17.18 9.19 18.17 9.19 19.19 9.19 C18.86 7.87 18.53 6.55 18.19 5.19 C17.53 5.19 16.87 5.19 16.19 5.19 Z M0.19 7.19 C0.52 8.51 0.85 9.83 1.19 11.19 C2.84 11.19 4.49 11.19 6.19 11.19 C5.53 9.87 4.87 8.55 4.19 7.19 C2.87 7.19 1.55 7.19 0.19 7.19 Z M12.19 10.19 C12.52 11.18 12.85 12.17 13.19 13.19 C15.2 13.92 15.2 13.92 17.19 14.19 C16.86 12.87 16.53 11.55 16.19 10.19 C14.87 10.19 13.55 10.19 12.19 10.19 Z M9.19 13.19 C9.52 14.18 9.85 15.17 10.19 16.19 C12.2 16.92 12.2 16.92 14.19 17.19 C13.53 15.87 12.87 14.55 12.19 13.19 C11.2 13.19 10.21 13.19 9.19 13.19 Z M0.19 13.19 C-0.8 13.68 -0.8 13.68 -1.81 14.19 C-1.48 15.84 -1.15 17.49 -0.81 19.19 C0.51 18.2 1.83 17.21 3.19 16.19 C2.2 15.2 1.21 14.21 0.19 13.19 Z M20.19 15.19 C20.52 16.84 20.85 18.49 21.19 20.19 C22.18 19.53 23.17 18.87 24.19 18.19 C23.53 17.2 22.87 16.21 22.19 15.19 C21.53 15.19 20.87 15.19 20.19 15.19 Z " fill="#f85631" transform="translate(14.8125,2.8125)"/>
            <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C3.33 2.98 3.66 4.96 4 7 C2.35 7 0.7 7 -1 7 C-0.67 8.65 -0.34 10.3 0 12 C-1.32 12 -2.64 12 -4 12 C-4.66 10.35 -5.32 8.7 -6 7 C-5.01 6.67 -4.02 6.34 -3 6 C-2.88 5.2 -2.75 4.39 -2.62 3.56 C-2.42 2.72 -2.21 1.87 -2 1 C-1.34 0.67 -0.68 0.34 0 0 Z " fill="#f85631" transform="translate(35,11)"/>
            <path d="M0 0 C1.53 0.09 3.05 0.25 4.56 0.44 C5.8 0.59 5.8 0.59 7.07 0.75 C7.7 0.83 8.34 0.91 9 1 C8.01 1.5 8.01 1.5 7 2 C7.33 3.32 7.66 4.64 8 6 C5.69 6 3.38 6 1 6 C1 4.68 1 3.36 1 2 C0.34 1.67 -0.32 1.34 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z " fill="#f85631" transform="translate(11,3)"/>
            <path d="M0 0 C1.65 0 3.3 0 5 0 C5.33 1.65 5.66 3.3 6 5 C5.01 5.66 4.02 6.32 3 7 C2.01 6.67 1.02 6.34 0 6 C0 4.02 0 2.04 0 0 Z " fill="#f85631" transform="translate(17,15)"/>
            <path d="M0 0 C2.64 0.33 5.28 0.66 8 1 C7.01 1.5 7.01 1.5 6 2 C6.33 3.32 6.66 4.64 7 6 C2.32 4.52 2.32 4.52 0.69 1.88 C0.46 1.26 0.23 0.64 0 0 Z " fill="#f85631" transform="translate(23,6)"/>
            <path d="M0 0 C5.75 0.75 5.75 0.75 8 3 C7.34 4.32 6.68 5.64 6 7 C5.55 6.5 5.09 6.01 4.62 5.5 C3.12 3.77 3.12 3.77 1 4 C0.67 2.68 0.34 1.36 0 0 Z " fill="#f85631" transform="translate(17,3)"/>
            <path d="M0 0 C2.47 0.49 2.47 0.49 5 1 C5 1.99 5 2.98 5 4 C3.35 4 1.7 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="#f85631" transform="translate(10,13)"/>
            <path d="M0 0 C2.31 0 4.62 0 7 0 C6.01 0.33 5.02 0.66 4 1 C4 1.99 4 2.98 4 4 C2.68 3.67 1.36 3.34 0 3 C0 2.01 0 1.02 0 0 Z " fill="#f85631" transform="translate(13,4)"/>
            </svg>`,
            stop: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="44" height="44" viewBox="0 0 44 44" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,44.000000) scale(0.100000,-0.100000)" fill="#1877f2" stroke="none">
            <path d="M167 426 c-21 -8 -47 -22 -57 -31 -52 -47 -65 -145 -27 -206 28 -46 130 -178 137 -178 7 0 109 132 137 178 79 125 -52 287 -190 237z m113 -51 c68 -35 78 -132 21 -189 -27 -26 -39 -31 -81 -31 -42 0 -54 5 -80 30 -101 101 14 255 140 190z"/>
            <path d="M179 345 c-31 -17 -52 -60 -43 -89 27 -88 141 -88 168 1 9 29 -16 76 -49 91 -33 15 -44 15 -76 -3z m77 -13 c6 -4 13 -15 17 -25 7 -20 -24 -57 -48 -57 -9 0 -15 -9 -15 -25 0 -16 -6 -25 -15 -25 -12 0 -15 14 -15 70 l0 70 33 0 c17 0 37 -4 43 -8z"/>
            <path d="M210 300 c0 -5 7 -10 15 -10 8 0 15 5 15 10 0 6 -7 10 -15 10 -8 0 -15 -4 -15 -10z"/>
            </g>
            </svg>`,
            checkin: `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" version="1.1"><path d="M 17.914 0.925 C 7.822 4.105, 2.825 16.279, 8.075 24.892 C 11.082 29.823, 21.074 42, 22.114 42 C 23.040 42, 30.499 32.779, 35.250 25.761 C 41.903 15.934, 35.857 2.432, 24 0.639 C 22.075 0.348, 19.336 0.476, 17.914 0.925 M 15.763 6.565 C 12.329 8.429, 10 12.833, 10 17.465 C 10 22.258, 15.051 27.839, 20.118 28.644 C 29.846 30.189, 37.077 19.852, 32.483 10.967 C 29.655 5.498, 21.625 3.384, 15.763 6.565 M 18.213 8.507 C 16.072 9.437, 14.410 11.167, 13.449 13.467 C 12.148 16.582, 12.148 17.418, 13.451 20.536 C 16.686 28.281, 27.314 28.281, 30.549 20.536 C 32.613 15.597, 30.525 10.535, 25.568 8.464 C 21.451 6.744, 22.281 6.739, 18.213 8.507 M 19.389 11.430 C 18.393 14.025, 19.788 16.169, 22.246 15.820 C 25.450 15.365, 25.450 10.635, 22.246 10.180 C 20.893 9.988, 19.750 10.488, 19.389 11.430 M 18.223 18.557 C 15.300 20.604, 15.411 22.411, 18.547 23.839 C 22.085 25.452, 23.420 25.304, 26.139 23 L 28.500 21 26.139 19 C 23.301 16.595, 21.192 16.477, 18.223 18.557" stroke="none" fill="#f85631" fill-rule="evenodd"/></svg>`,
        },
        route: {
            visible: true,
            lineCorlor: '#29b55c',
            lineWidth: 6.5,
            lineOpacity: 0.85,
        },
        animation: {
            follow: true,
            animate: false,
        }
    };
    const _options = extend({}, defaultOptions, options);

    const initializeMap = () => {
        try {
            if (map.current) {
                map.current.remove();
            }
            map.current = new maplibregl.Map({
                container: mapContainer.current,
                center: _options.center,
                zoom: _options.zoom,
                minZoom: 1,
            });
            var _map = map.current;
            setHisMap(_map)
            // console.log(_map);
            const _map_Container = _map.getContainer();

            // _map.setPadding({ top: 100, bottom: 100, left: 250, right: 70 });
            _map.setPadding({ top: 100, bottom: 100, left: 100, right: 100 });

            new ekmapplf.VectorBaseMap('OSM:Night', _options.apiKey).addTo(_map);

            var basemap = new ekmapplf.control.BaseMap({
                id: 'ekmapplf_tracking_ctrl_basemap_' + _map_Container.id,
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
            basemap.on('changeBaseLayer', async function (response) {
                setAnimation(false)
                new ekmapplf.VectorBaseMap(response.layer, _options.apiKey).addTo(_map);
                setTimeout(async () => {
                    await setMap(_options.from_time, _options.to_time, _options.pageNumber, _options.pageSize);
                }, 1000)
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

            _map.addControl(new maplibregl.FullscreenControl(), 'top-right');


            _map.on('load', () => {
                try {
                    if ((!_options.objectId || _options.objectId === '' || _options.objectId === 'null') ||
                        (!_options.from_time || _options.from_time === '' || _options.from_time === 'null') ||
                        (!_options.to_time || _options.to_time === '' || _options.to_time === 'null')) {
                        onLoad(null);
                        return
                    }
                    setMap(_options.from_time, _options.to_time, _options.pageNumber, _options.pageSize);
                } catch (error) {
                    console.error('Error:', error);
                }
            });

            const setMap = async (from_time, to_time, pageNumber, pageSize) => {
                setAnimation(false)
                let detailsHis = await getData(from_time, to_time, pageNumber, pageSize);
                await initDataToMap(detailsHis);
                let segmentData = await preAnimation(detailsHis);
                GpxData.current = segmentData;
                if (detailsHis.length && detailsHis[0].coordinates && _options.animation.animate)
                    _map.easeTo({ center: detailsHis[0].coordinates, duration: 100, zoom: 16 })
                setTimeout(() => {
                    setControls({
                        ready: true,
                        Data: segmentData,
                        options: _options
                    })
                    // setAnimation(true)
                }, 300)
            }


            //Data
            const getData = async (from_time, to_time, pageNumber, pageSize) => {
                if (!HistoryData.current) {
                    let url = `https://api.ekgis.vn/v2/tracking/locationHistory/summary/${_options.projectId}/${_options.objectId}?api_key=${_options.apiKey}&from_time=${from_time}&to_time=${to_time}`;
                    // let url = `http://localhost:3050/v2/summary/${_options.projectId}/${_options.objectId}?api_key=${_options.apiKey}&from_time=${from_time}&to_time=${to_time}`;
                    const response = await fetch(url);
                    const Data = await response.json();
                    HistoryData.current = Data || null
                    onLoad(HistoryData.current)
                }
                return HistoryData.current.details || [];
            };


            //Map
            const initDataToMap = async (data) => {
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
                    if (item.type === "move") {
                        if (item.route.geometry.coordinates.length === 0) {
                            let coords = item.route.locations.map(item => item.coordinates)
                            LineSource.features.push({
                                type: "Feature",
                                geometry: {
                                    type: "LineString",
                                    coordinates: coords
                                }
                            })
                        } else
                            LineSource.features.push(feature)
                    } else {
                        if (item.type === "checkin") CheckSource.features.push(feature)
                        else TrackSource.features.push(feature);
                    }
                });
                // console.log(LineSource);
                // console.log(CheckSource);
                // console.log(TrackSource);
                // console.log(LineSource);
                if (LineSource.features.length) {
                    var boundbox = bbox(LineSource);
                    _map.fitBounds(boundbox, { maxZoom: 16, duration: 1000 });
                }
                await setLine(LineSource);
                await setPoints(CheckSource, TrackSource);
                await drawPath();
                await addCar();
            }
            const setLine = (LineSource) => {
                try {
                    if (!_map.getImage('icon_arrow')) {
                        var icon_arrow = new Image();
                        icon_arrow.onload = function () {
                            if (!_map.hasImage('icon_arrow'))
                                _map.addImage('icon_arrow', icon_arrow);
                        };
                        icon_arrow.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(_options.icon.arrow);
                    }

                    if (_map.getSource(`ek-tracking-his-line-source`)) {
                        _map.getSource(`ek-tracking-his-line-source`).setData(LineSource)
                    } else {
                        _map.addSource(`ek-tracking-his-line-source`, {
                            'type': 'geojson',
                            'data': LineSource,
                        });

                        _map.addLayer({
                            'id': `ek-tracking-his-LineString`,
                            'type': 'line',
                            'source': `ek-tracking-his-line-source`,
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
                            'id': `ek-tracking-his-LineString-arrow`,
                            'type': 'symbol',
                            'source': `ek-tracking-his-line-source`,
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
                                },
                            },
                            'paint': {
                                'icon-opacity': 0.9
                            }
                        });
                    }
                } catch (error) {
                    console.error("Error setLine:", error);
                }
            };
            const setPoints = async (CheckSource, TrackSource) => {
                try {
                    if (!_map.getImage('marker_start')) {
                        var marker_start = new Image();
                        marker_start.onload = function () {
                            if (!_map.hasImage('marker_start'))
                            _map.addImage('marker_start', marker_start);
                        };
                        marker_start.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(_options.icon.start);
                    }
                    if (!_map.getImage('marker_end') ) {
                        var marker_end = new Image();
                        marker_end.onload = function () {
                            if (!_map.hasImage('marker_end'))
                            _map.addImage('marker_end', marker_end);
                        };
                        marker_end.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(_options.icon.end);
                    }
                    if (!_map.getImage('marker_check')) {
                        var marker_check = new Image();
                        marker_check.onload = function () {
                            if (!_map.hasImage('marker_check'))
                            _map.addImage('marker_check', marker_check);
                        };
                        marker_check.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(_options.icon.checkin);
                    }
                    if (!_map.getImage('marker_stop')) {
                        var marker_stop = new Image();
                        marker_stop.onload = function () {
                            if (!_map.hasImage('marker_stop'))
                            _map.addImage('marker_stop', marker_stop);
                        };
                        marker_stop.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(_options.icon.stop);
                    }

                    if (_map.getSource(`ek-tracking-his-track-source`)) {
                        _map.getSource(`ek-tracking-his-track-source`).setData(TrackSource)
                    } else {
                        _map.addSource(`ek-tracking-his-track-source`, {
                            'type': 'geojson',
                            'data': TrackSource,
                        });

                        _map.addLayer({
                            'id': `ek-tracking-his-track-point`,
                            'type': 'symbol',
                            'source': `ek-tracking-his-track-source`,
                            "layout": {
                                "icon-image": [
                                    "match",
                                    ["get", "type"],
                                    "start", "marker_start",
                                    "end", "marker_end",
                                    "marker_stop"
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

                        _map.on('mouseenter', `ek-tracking-his-track-point`, (e) => {
                            _map.getCanvas().style.cursor = 'pointer';
                            const bbox = [
                                [e.point.x - 5, e.point.y - 5],
                                [e.point.x + 5, e.point.y + 5],
                            ];
                            const selectedFeatures = _map.queryRenderedFeatures(bbox, {
                                layers: [`ek-tracking-his-track-point`],
                            });
                            let features = selectedFeatures[0]

                            let color = `default`;
                            if (features.properties.type !== 'stop') color = features.properties.type;

                            if (popupHis.current) popupHis.current.remove();
                            popupHis.current = new maplibregl.Popup({ className: 'ek-tracking-his-popup', closeButton: false, anchor: 'bottom', })
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
                                .setOffset([5, -20])
                                .addTo(_map)
                        });
                        _map.on('mouseleave', `ek-tracking-his-track-point`, () => {
                            _map.getCanvas().style.cursor = '';
                            if (popupHis.current) popupHis.current.remove();
                        })
                    }

                    if (_map.getSource(`ek-tracking-his-check-source`)) {
                        _map.getSource(`ek-tracking-his-check-source`).setData(CheckSource)
                    } else {
                        _map.addSource(`ek-tracking-his-check-source`, {
                            'type': 'geojson',
                            'data': CheckSource,
                            'cluster': true,
                            'clusterMaxZoom': 14,
                            'clusterRadius': 50
                        });

                        _map.addLayer({
                            id: `ek-tracking-his-check-clusters`,
                            type: 'circle',
                            source: `ek-tracking-his-check-source`,
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
                            id: `ek-tracking-his-check-cluster-count`,
                            type: 'symbol',
                            source: `ek-tracking-his-check-source`,
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
                            'id': `ek-tracking-his-check-point`,
                            'type': 'symbol',
                            'source': `ek-tracking-his-check-source`,
                            'layout': {
                                'icon-image': 'marker_check',
                                'icon-overlap': 'always',
                                'icon-anchor': 'bottom',
                                'icon-size': 0.7,
                            },
                            'filter': [
                                'all',
                                ['!has', 'point_count'],
                            ]
                        });

                        _map.on('mouseenter', `ek-tracking-his-check-clusters`, () => {
                            _map.getCanvas().style.cursor = 'pointer';
                        });
                        _map.on('mouseleave', `ek-tracking-his-check-clusters`, () => {
                            _map.getCanvas().style.cursor = '';
                        });
                        _map.on('click', `ek-tracking-his-check-clusters`, async (e) => {
                            const features = _map.queryRenderedFeatures(e.point, {
                                layers: [`ek-tracking-his-check-clusters`]
                            });
                            const clusterId = features[0].properties.cluster_id;
                            const zoom = await _map.getSource(`ek-tracking-his-check-source`).getClusterExpansionZoom(clusterId);
                            _map.easeTo({
                                center: features[0].geometry.coordinates,
                                zoom: zoom,
                            });
                        });

                        _map.on('mouseenter', `ek-tracking-his-check-point`, (e) => {
                            _map.getCanvas().style.cursor = 'pointer';
                            const bbox = [
                                [e.point.x - 5, e.point.y - 5],
                                [e.point.x + 5, e.point.y + 5],
                            ];
                            const selectedFeatures = _map.queryRenderedFeatures(bbox, {
                                layers: [`ek-tracking-his-check-point`],
                            });
                            if (popupHis.current) popupHis.current.remove();
                            popupHis.current = new maplibregl.Popup({ className: 'ek-tracking-his-popup', closeButton: false, anchor: 'bottom', })
                                .setLngLat(selectedFeatures[0].geometry.coordinates)
                                .setHTML(`
                                <div class="ek-tracking-his-popup-info">
                                    <span style="font-weight:600">${selectedFeatures[0].properties.storeName}</span>
                                </div>
                                <div class="ek-tracking-his-popup-info">
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
                                `)
                                .setOffset([0, -20])
                                .addTo(_map);
                        });
                        _map.on('mouseleave', `ek-tracking-his-check-point`, () => {
                            _map.getCanvas().style.cursor = '';
                            if (popupHis.current) popupHis.current.remove();
                        })
                    }

                } catch (error) {
                    console.error("Error setPoints:", error);
                }
            };
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
                        'filter': ['==', '$type', 'LineString']
                    });
                } else
                    _map.getSource('LocationHistory').setData(fcLocationHistory);
            }
            async function addCar() {
                if (!_map.getImage('marker_navigation')) {
                    var marker_navigation = new Image();
                    marker_navigation.onload = function () {
                        if (!_map.hasImage('marker_navigation'))
                        _map.addImage('marker_navigation', marker_navigation);
                    };
                    marker_navigation.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(_options.icon.navigation);
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
                            "icon-image": 'marker_navigation',
                            "icon-rotate": ["get", "bearing"],
                            "icon-rotation-alignment": "map",
                            'icon-overlap': 'always',
                            'icon-ignore-placement': true,
                        }
                    });
                } else
                    _map.getSource('locationMarker').setData(locationMarker);
            }

        } catch (error) {
            console.error('Error initializing map:', error);
        };
    };

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
                    if (new Date(location.timestamp).getTime() >= new Date(data.startTime).getTime()
                        && new Date(location.timestamp).getTime() <= new Date(data.endTime).getTime()) {
                        let point = {
                            'type': 'Feature',
                            'properties': {
                                time: location.timestamp,
                                ele: 0,
                                type: data.type
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': location.coordinates
                            }
                        };
                        fc.features.push(point);
                    }
                }
            } else if (data.type === 'stop' || data.type === 'checkin') {
                let pointStart = {
                    'type': 'Feature',
                    'properties': {
                        time: data.startTime,
                        ele: 0,
                        type: data.type
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': data.coordinates
                    }
                };
                let pointEnd = {
                    'type': 'Feature',
                    'properties': {
                        time: data.endTime,
                        ele: 0,
                        type: data.type
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': data.coordinates
                    }
                };
                fc.features.push(pointStart, pointEnd);
            } else {
                let point = {
                    'type': 'Feature',
                    'properties': {
                        time: data.timestamp,
                        ele: 0,
                        type: data.type
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

        // console.log('fc', fc);
        // console.log('gpxData', gpxData);
        // console.log('segmentData', segmentData);
        // console.log('summaryData', summaryData);

        return segmentData || []


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
                    if (locData1.time && locData2.time && (locData1.time !== locData2.time)) {
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
            const v = (d / Δt) || 0; // Speed in m/s
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
    }

    useEffect(() => {
        // if (!Animation) setAnimation(true)
        setStage({
            date: null,
            time: null,
            speed: 0
        })
        setControls({
            ready: false,
            Data: [],
            options: null
        })
        HistoryData.current = null;
        GpxData.current = null;
        setHisMap(null)
        initializeMap();
        return () => {
            if (popupHis.current) popupHis.current.remove();
            if (map.current) map.current.remove();
        };
    }, [options]);

    useEffect(() => {
        setAnimation(null)
        if (HistoryIndex !== null) {
            if (!HistoryData.current) return
            const HisDetails = HistoryData.current.details;
            const detail = HisDetails[HistoryIndex]
            if (!detail) return;
            if (detail.type === 'move') {
                setTimeout(async () => {
                    HisMap.setPaintProperty(`ek-tracking-his-LineString`, 'line-color', '#b5b5b5');
                    HisMap.setPaintProperty(`ek-tracking-his-LineString`, 'line-opacity', 0.5);
                    HisMap.setLayoutProperty(`ek-tracking-his-LineString-arrow`, 'visibility', 'none');

                    var fcRouteHistory = {
                        type: "Feature",
                        geometry: detail.route.geometry
                    }

                    if (detail.route.geometry.coordinates.length === 0) {
                        let coords = detail.route.locations.map(item => item.coordinates)
                        fcRouteHistory.geometry = {
                            type: "LineString",
                            coordinates: coords
                        }
                    }

                    if (!HisMap.getImage('icon_arrow') && !HisMap.hasImage('icon_arrow')) {
                        var svg_arrow = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.2901 9.1698L7.70015 3.0698C4.95015 1.6198 1.96015 4.5498 3.35015 7.3298L4.97015 10.5698C5.42015 11.4698 5.42015 12.5298 4.97015 13.4298L3.35015 16.6698C1.96015 19.4498 4.95015 22.3698 7.70015 20.9298L19.2901 14.8298C21.5701 13.6298 21.5701 10.3698 19.2901 9.1698Z" stroke="#292D32" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="#e50027"/></svg>';
                        var icon_arrow = new Image();
                        icon_arrow.onload = function () {
                            if (!HisMap.hasImage('icon_arrow'))
                                HisMap.addImage('icon_arrow', icon_arrow);
                        };
                        icon_arrow.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svg_arrow);
                    }
                    if (!HisMap.getSource('RouteHistory')) {
                        HisMap.addSource('RouteHistory', {
                            'type': 'geojson',
                            'data': fcRouteHistory
                        });
                        HisMap.addLayer({
                            'id': 'RouteHistory',
                            'type': 'line',
                            'source': 'RouteHistory',
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
                        HisMap.addLayer({
                            'id': `RouteHistory-arrow`,
                            'type': 'symbol',
                            'source': `RouteHistory`,
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
                    } else HisMap.getSource('RouteHistory').setData(fcRouteHistory);

                    var boundbox = bbox(fcRouteHistory);
                    HisMap.fitBounds(boundbox, { padding: 100, maxZoom: 17, duration: 1000 });

                    var gpx = await preAnimation([detail])
                    setTimeout(() => {
                        setControls({
                            ready: true,
                            Data: gpx,
                            options: _options
                        })
                    }, 200)

                    // HisMap.on('click', () => {
                    //     removeLayer();
                    //     HisMap.on('off', removeLayer());
                    // })

                }, 300)
            } else if (detail.type === 'start' || detail.type === 'end' || detail.type === 'stop' || detail.type === 'checkin') {
                HisMap.setPaintProperty(`ek-tracking-his-LineString`, 'line-color', '#b5b5b5');
                HisMap.setPaintProperty(`ek-tracking-his-LineString`, 'line-opacity', 0.5);
                HisMap.setLayoutProperty(`ek-tracking-his-LineString-arrow`, 'visibility', 'none');
                HisMap.easeTo({ center: detail.coordinates, duration: 100, zoom: 17, bearing: 0 })

                var html;
                if (detail.type === 'start' || detail.type === 'end') {
                    let color = `default`;
                    if (detail.type != 'stop') color = detail.type;
                    html = `<div class="ek-tracking-his-popup-info">
                                <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-marker ekmapplf_tracking-icon-${color}-color"></span>
                                <span>${detail.address}</span>
                            </div>
                            ${detail.type !== 'stop' ? `
                            <div class="ek-tracking-his-popup-info">
                                <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-clock ekmapplf_tracking-icon-${color}-color"></span>
                                <span>${formatTimestamp(detail.timestamp)}</span>
                            </div>` : `
                            <div class="ek-tracking-his-popup-info">
                                <span class="ek-tracking-his-popup-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" fill="#51CF66"/>
                                    </svg>
                                </span>
                                <span>${formatTimestamp(detail.startTime)}</span>
                            </div>
                            ${detail.endTime !== '' ? `
                                <div class="ek-tracking-his-popup-info">
                                    <span class="ek-tracking-his-popup-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" fill="#FF6B6B"/>
                                        </svg>
                                    </span>
                                    <span>${formatTimestamp(detail.endTime)}</span>
                                </div>` : ``} `} `
                }

                if (detail.type === 'stop' || detail.type === 'checkin') {
                    html = `${detail.type === 'checkin' ? `
                            <div class="ek-tracking-his-popup-info">
                                <span style="font-weight:600">${detail.storeName}</span>
                            </div>`: ``}
                            <div class="ek-tracking-his-popup-info">
                                <span class="ek-tracking-his-popup-icon ekmapplf_tracking-icon-marker ekmapplf_tracking-icon-default-color"></span>
                                <span>${detail.address}</span>
                            </div>
                            <div class="ek-tracking-his-popup-info">
                                <span class="ek-tracking-his-popup-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" fill="#51CF66"/></svg>
                                </span>
                                <span>${formatTimestamp(detail.startTime)}</span>
                            </div>
                            ${detail.endTime != '' ? `
                            <div class="ek-tracking-his-popup-info">
                                <span class="ek-tracking-his-popup-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" fill="#FF6B6B"/></svg>
                                </span>
                                <span>${formatTimestamp(detail.endTime)}</span>
                            </div>`: ``}`
                }
                popupHis.current = new maplibregl.Popup({ className: 'ek-tracking-his-popup', closeButton: true, anchor: 'bottom', focusAfterOpen: false })
                    .setLngLat(detail.coordinates)
                    .setHTML(html)
                    .setOffset([0, -20])
                    .addTo(HisMap)
                // popupHis.current.on('close', () => {
                //     HistoryIndex = null;
                //     removeLayer();
                // })
            }
        } else {
            if (GpxData.current)
                setControls({
                    ready: true,
                    Data: GpxData.current,
                    options: _options
                })
        }

        // function removeLayer() {
        //     setAnimation(false)
        //     if (popupHis.current) popupHis.current.remove();
        //     if (HisMap) {
        //         HisMap.setPaintProperty(`ek-tracking-his-LineString`, 'line-color', _options.route.lineCorlor);
        //         HisMap.setPaintProperty(`ek-tracking-his-LineString`, 'line-opacity', _options.route.lineOpacity);
        //         HisMap.setLayoutProperty(`ek-tracking-his-LineString-arrow`, 'visibility', 'visible');
        //         if (HisMap.getSource(`RouteHistory`)) {
        //             HisMap.removeLayer(`RouteHistory`)
        //             HisMap.removeLayer(`RouteHistory-arrow`)
        //             HisMap.removeSource(`RouteHistory`)
        //         }
        //     }
        //     if (GpxData.current)
        //         setControls({
        //             ready: true,
        //             Data: GpxData.current,
        //             options: _options
        //         })
        // }

        return () => {
            try {
                // removeLayer()
                if (popupHis.current) popupHis.current.remove();
                if (HisMap) {
                    HisMap.setPaintProperty(`ek-tracking-his-LineString`, 'line-color', _options.route.lineCorlor);
                    HisMap.setPaintProperty(`ek-tracking-his-LineString`, 'line-opacity', _options.route.lineOpacity);
                    HisMap.setLayoutProperty(`ek-tracking-his-LineString-arrow`, 'visibility', 'visible');
                    if (HisMap.getSource(`RouteHistory`)) {
                        HisMap.removeLayer(`RouteHistory`)
                        HisMap.removeLayer(`RouteHistory-arrow`)
                        HisMap.removeSource(`RouteHistory`)
                    }
                }
            } catch (ex) {
                console.log(ex);
            }
        };
    }, [HistoryIndex])

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

    const setInfo = (data) => {
        // console.log('info', data);
        if (data) {
            const date = new Date(data.loc1.time);
            date.setHours(date.getHours());
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const formattedDate = `${day}/${month}/${year}`;
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

            setStage({
                date: formattedDate,
                time: formattedTime,
                speed: Math.ceil(data.computed.speed * 10) / 10
            })
        } else {
            setStage({
                date: null,
                time: null,
                speed: 0
            })
        }
    }

    return (<>
        <div ref={mapContainer} id='ekmap-tracking-his-map'>
            {Controls.ready !== false && <Animate_And_Controls map={HisMap} segmentData={Controls.Data} options={Controls.options} Animation={Animation} currentInfo={setInfo} />}
            <MapLegend />
            {(Stage.date !== null && Stage.time !== null) && <div className='ekmapplf_tracking-map-legend-his'>
                <Flex vertical="true" align="center" justify='center' wrap='wrap' style={{ 'width': '50%', 'fontWeight': 600, 'textAlign': 'center', 'borderRight': '1px solid' }}>
                    <span style={{ 'color': 'rgb(132, 132, 132)' }}>{Stage.date}</span>
                    <span style={{ 'color': 'rgb(68, 68, 68)' }}>{Stage.time}</span>
                </Flex>
                <Flex vertical="true" align="center" justify='center' wrap='wrap' style={{ 'width': '49%', 'fontWeight': 600, 'textAlign': 'center', }}>
                    <span style={{ 'color': 'rgb(132, 132, 132)' }}>Tốc độ</span>
                    <span style={{ 'color': 'rgb(54, 153, 255)' }}>{Stage.speed} km/h</span>
                </Flex>
            </div>}
        </div>
    </>);
}

export default HistoryMap;