import React, { useRef, useState, useEffect } from 'react';
import { Button, Flex, Select, Checkbox } from "antd";
import { PauseOutlined, CaretRightOutlined, RetweetOutlined, XFilled } from '@ant-design/icons';
import * as turf from "@turf/turf";

const Animate_And_Controls = ({ map, segmentData, options, animID, timeoutID }) => {
    // console.log(map);
    // console.log(segmentData);

    const animationID = useRef(null);
    const timeout = useRef(null);
    const [isFollow, setFollow] = useState(options.animation.follow)
    const [isAnimation, setAnimation] = useState(options.animation.animate)
    const [animationSpeed, setanimationSpeed] = useState(10);
    const [isReplay, setReplay] = useState(true)
    const listSpeeds = [
        { value: 1, label: 'x1' },
        { value: 2, label: 'x2' },
        { value: 5, label: 'x5' },
        { value: 10, label: 'x10' },
        { value: 20, label: 'x20' },
        { value: 100, label: 'x100' },
    ]

    var lastBearing = 0;
    var _map_Container = map.getContainer();
    // var gpxData, segmentData, summaryData
    var currentIndex = 0;
    var alongPath = [];

    function loadData() {
        //     var fc = {
        //         type: "FeatureCollection",
        //         features: []
        //     };

        //     HistoryData.forEach(data => {
        //         if (data.type === 'move') {
        //             for (let i = 0; i < data.route.locations.length; i++) {
        //                 let location = data.route.locations[i];
        //                 let point = {
        //                     'type': 'Feature',
        //                     'properties': {
        //                         time: location.timestamp,
        //                         ele: 0,
        //                         speed: location.speed,
        //                         // odometer: data.odometer,
        //                     },
        //                     'geometry': {
        //                         'type': 'Point',
        //                         'coordinates': location.coordinates
        //                     }
        //                 };
        //                 fc.features.push(point);
        //             }
        //         } else if (data.type === 'stop' || data.type === 'checkin') {
        //             let point = {
        //                 'type': 'Feature',
        //                 'properties': {
        //                     time: data.timestamp,
        //                     ele: 0,
        //                     speed: -1,
        //                     // odometer: 0,
        //                 },
        //                 'geometry': {
        //                     'type': 'Point',
        //                     'coordinates': data.coordinates
        //                 }
        //             };
        //             fc.features.push(point);
        //         }
        //     });


        //     gpxData = parseGpxData(fc);
        //     segmentData = computeData(gpxData);
        //     summaryData = computeHighlights(segmentData);

        //     console.log(fc);
        //     console.log('gpxData', gpxData);
        //     console.log('segmentData', segmentData);
        //     console.log('summaryData', summaryData);
        // drawPath();
        // addCar();
    }


    // //Data
    // function parseGpxData(fc) {
    //     var result = {
    //         segments: [],
    //         id: options.objectId
    //     };
    //     let segments = [];
    //     result.segments.push(segments);

    //     for (let i = 0; i < fc.features.length; i++) {
    //         var feature = fc.features[i];
    //         let trkpt = {
    //             loc: feature.geometry.coordinates,
    //             time: new Date(feature.properties.time).getTime(),
    //             ele: feature.properties.ele,
    //         };
    //         segments.push(trkpt);
    //     }
    //     return result;
    // }
    // function computeData(gpxData) {
    //     const result = [];

    //     for (let i = 0; i < gpxData.segments.length; i++) {
    //         const segment = gpxData.segments[i];

    //         for (let j = 1; j < segment.length; j++) {
    //             const locData1 = segment[j - 1];
    //             const locData2 = segment[j];
    //             var time1 = locData1.time;
    //             var time2 = locData2.time;
    //             var loc1Time = new Date(time1);
    //             var loc2Time = new Date(time2);
    //             let d = 0;

    //             if (loc1Time.getDate() === loc2Time.getDate() && loc1Time.getMonth() === loc2Time.getMonth() && loc1Time.getFullYear() === loc2Time.getFullYear()) {
    //                 d = getSegDistance(locData1.loc[1], locData1.loc[0], locData2.loc[1], locData2.loc[0], locData1.ele, locData2.ele);
    //             }

    //             const tsegment = {
    //                 computed: {
    //                     distance: d
    //                 },
    //                 loc1: locData1,
    //                 loc2: locData2
    //             };

    //             if (locData1.ele && locData2.ele) {
    //                 tsegment.computed.ele = locData2.ele;
    //             }

    //             if (locData1.time && locData2.time) {
    //                 const { speed, time } = getSegSpeed(d, locData1.time, locData2.time);
    //                 const filteredSpeed = speed;

    //                 tsegment.computed.speed = speed;
    //                 tsegment.computed.time = time;
    //                 tsegment.computed.filteredSpeed = filteredSpeed;
    //             }

    //             if (locData1.temp && locData2.temp) tsegment.computed.temp = (locData1.temp + locData2.temp) / 2;

    //             if (locData2.hr) tsegment.computed.hr = locData2.hr;

    //             if (locData2.cad) tsegment.computed.cad = locData2.cad;

    //             if (tsegment.computed.speed) result.push(tsegment);
    //         }
    //     };

    //     return result;
    // }
    // function getSegDistance(lat1, lon1, lat2, lon2, ele1, ele2) {
    //     const R = 6371e3; // meters
    //     const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    //     const φ2 = (lat2 * Math.PI) / 180;
    //     const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    //     const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    //     const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     let d = R * c; // in meters

    //     if (ele1 !== undefined && ele2 !== undefined) {
    //         const Δh = ele2 - ele1;

    //         if (Δh !== 0) {
    //             d = Math.sqrt(Math.pow(d, 2) + Math.pow(Δh, 2));
    //         }
    //     }

    //     return d;
    // }
    // function getSegSpeed(d, time1, time2) {
    //     const Δt = time2 / 1000 - time1 / 1000; // Time in seconds
    //     const v = d / Δt; // Speed in m/s
    //     const kph = v * 3.6; // Speed in km/h

    //     return {
    //         speed: kph,
    //         time: Δt,
    //     };
    // }
    // function computeHighlights(segmentData) {
    //     let result = {};

    //     result.distance = 0;

    //     for (let i = 0; i < segmentData.length; i++) {
    //         const seg = segmentData[i].computed;
    //         let sseg;

    //         if (segmentData[i - 1]) sseg = segmentData[i - 1].computed;

    //         result.distance += seg.distance;

    //         if (seg.ele) {
    //             result.maxEle = result.maxEle || 0;
    //             result.minEle = result.minEle || 0;
    //             result.gainEle = result.gainEle || 0;
    //             result.totEle = result.totEle || 0;

    //             if (seg.ele > result.maxEle) result.maxEle = seg.ele;
    //             if (seg.ele < result.minEle) result.minEle = seg.ele;

    //             if (sseg && sseg.ele) {
    //                 let eleDiff = seg.ele - sseg.ele;

    //                 if (eleDiff > 0) {
    //                     result.gainEle += eleDiff;
    //                     result.totEle += eleDiff;
    //                 } else if (eleDiff < 0) {
    //                     result.totEle += eleDiff;
    //                 }
    //             }
    //         }

    //         if (seg.time) {
    //             result.totalTime = result.totalTime || 0;
    //             result.totalTime += seg.time;

    //             if (seg.speed && seg.filteredSpeed) {
    //                 result.avgSpeed = result.avgSpeed || 0;
    //                 result.avgMovingSpeed = result.avgMovingSpeed || 0;
    //                 result.movingTime = result.movingTime || 0;
    //                 result.maxSpeed = result.maxSpeed || 0;

    //                 result.avgSpeed += seg.speed * seg.time;

    //                 if (seg.speed > 5) {
    //                     result.avgMovingSpeed += seg.speed * seg.time;
    //                     result.movingTime += seg.time;
    //                 }

    //                 if (seg.filteredSpeed > result.maxSpeed && seg.filteredSpeed < 200) {
    //                     result.maxSpeed = seg.filteredSpeed;
    //                     result.maxSpeedIndex = i;
    //                 }
    //             }

    //             if (seg.temp) {
    //                 result.avgTemp = result.avgTemp || 0;
    //                 result.maxTemp = result.maxTemp || 0;

    //                 result.avgTemp += seg.temp * seg.time;

    //                 if (seg.temp > result.maxTemp) {
    //                     result.maxTemp = seg.temp;
    //                 }
    //             }

    //             if (seg.hr) {
    //                 result.avgHr = result.avgHr || 0;
    //                 result.maxHr = result.maxHr || 0;

    //                 result.avgHr += seg.hr * seg.time;

    //                 if (seg.hr > result.maxHr) {
    //                     result.maxHr = seg.hr;
    //                     result.maxHrIndex = i;
    //                 }
    //             }

    //             if (seg.cad) {
    //                 result.avgCad = result.avgCad || 0;
    //                 result.maxCad = result.maxCad || 0;

    //                 result.avgCad += seg.cad * seg.time;

    //                 if (seg.cad > result.maxCad) {
    //                     result.maxCad = seg.cad;
    //                     result.maxCadIndex = i;
    //                 }
    //             }
    //         }
    //     }

    //     if (result.totalTime) {
    //         result.avgSpeed = result.avgSpeed || 0;
    //         result.avgCad = result.avgCad || 0;
    //         result.avgHr = result.avgHr || 0;
    //         result.avgTemp = result.avgTemp || 0;

    //         result.avgSpeed /= result.totalTime;
    //         result.avgCad /= result.totalTime;
    //         result.avgHr /= result.totalTime;
    //         result.avgTemp /= result.totalTime;

    //         result.totalTime /= 3600;
    //     }

    //     if (result.movingTime) {
    //         result.avgMovingSpeed = result.avgMovingSpeed || 0;
    //         result.avgMovingSpeed /= result.movingTime;
    //         result.movingTime /= 3600;
    //     }

    //     return result;
    // }

    // function drawPath() {
    //     var fcLocationHistory = {
    //         "type": "FeatureCollection",
    //         "features": []
    //     };

    //     console.log(map);
    //     if (map.getSource('LocationHistory')) {
    //         map.getSource('LocationHistory').setData(fcLocationHistory);
    //     } else {
    //         map.addSource('LocationHistory', {
    //             'type': 'geojson',
    //             'data': fcLocationHistory
    //         });
    //         map.addLayer({
    //             'id': 'LocationHistory',
    //             'type': 'line',
    //             'source': 'LocationHistory',
    //             'layout': {
    //                 'line-cap': 'round',
    //                 'line-join': 'round'
    //             },
    //             'paint': {
    //                 'line-color': options.route.lineCorlor,
    //                 'line-width': options.route.lineWidth,
    //                 'line-opacity': options.route.lineOpacity
    //             },
    //         });
    //     }



    // }
    // async function addCar() {
    //     if (!map.getImage('marker-navigation')) {
    //         const iconNavigation = await map.loadImage(options.icon.navigation);
    //         map.addImage('marker-navigation', iconNavigation.data)
    //     }

    //     var locationMarker = {
    //         "type": "FeatureCollection",
    //         "features": []
    //     };

    //     console.log(map.getSource('locationMarker'));
    //     if (!map.getSource('locationMarker')) {
    //         map.addSource('locationMarker', {
    //             'type': 'geojson',
    //             'data': locationMarker
    //         });

    //         map.addLayer({
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
    //         map.getSource('locationMarker').setData(locationMarker);
    // }

    // loadData();

    function animate(i, speedData) {
        if (!map) {
            StopAnimation();
            return;
        }
        currentIndex = i;
        if (i == 0) {
            alongPath = [];
            // drawPath();
            // addCar();
            if (map.getSource('LocationHistory')) {
                map.getSource('LocationHistory').setData({
                    'type': 'FeatureCollection',
                    'features': []
                })
            }
        }
        const e = speedData[i];
        // console.log(i);
        if (!e) {
            currentIndex = i - 1;
            return;
        }
        if (e.computed.time) {
            let timeoutFrame = (e.computed.time * 1000) / animationSpeed;
            if (e.computed.speed) {
                var start;
                var firstPoint;
                function frame(time) {
                    if (!start) {
                        firstPoint = e.loc1.loc;
                        start = time;
                    }
                    const animationPhase = (time - start) / ((Number(e.computed.time?.toString()) * 1000) / animationSpeed);
                    if (animationPhase > 1 || !isAnimation) {
                        return;
                    }

                    var path = turf.lineString([e.loc1.loc, e.loc2.loc]);
                    var pathDistance = turf.lineDistance(path);
                    var alongPathFrame = turf.along(path, pathDistance * animationPhase)
                        .geometry.coordinates;
                    var bearing = turf.bearing(
                        turf.point(firstPoint),
                        turf.point(alongPathFrame)
                    );

                    if (firstPoint[0] !== alongPathFrame[0] && firstPoint[1] !== alongPathFrame[1]) {
                        lastBearing = bearing;
                    }
                    firstPoint = alongPathFrame;

                    if (isFollow) {
                        map.panTo(alongPathFrame, { animate: true, essential: true, curve: 1.42, duration: 100, pitch: 60, bearing: lastBearing })
                    }
                    if (map.getSource('locationMarker')) {
                        map.getSource("locationMarker").setData({
                            type: "FeatureCollection",
                            features: [turf.point(alongPathFrame, { bearing: lastBearing })]
                        })
                    }
                    alongPath = alongPath.concat([alongPathFrame]);

                    if (alongPath.length > 1)
                        if (map.getSource('LocationHistory')) {
                            map.getSource("LocationHistory").setData({
                                type: "FeatureCollection",
                                features: [turf.lineString(alongPath)]
                            })
                        }
                    animationID.current = requestAnimationFrame(frame);
                }
                animationID.current = requestAnimationFrame(frame);
                animID(animationID.current);
            }
            i++;
            if (isReplay && i == speedData.length) i = 0;
            timeout.current = setTimeout(animate.bind(this), timeoutFrame, i, speedData);
            timeoutID(timeout.current);
        }
    }

    useEffect(() => {
        if (isAnimation) {
            // loadData();
            // if (segmentData[0].computed.time)
            //     timeout.current = setTimeout(animate.bind(this), (segmentData[0].computed.time * 1000) / animationSpeed, currentIndex, segmentData);
            animate(currentIndex, segmentData)
            map.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-color', '#b5b5b5');
            map.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-opacity', 0.5);
            map.setLayoutProperty(`ek-tracking-his-${_map_Container.id}-LineString-arrow`, 'visibility', 'none');
            map.setLayoutProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'visibility', 'none');
            map.setLayoutProperty(`locationMarker`, 'visibility', 'visible');
            map.setLayoutProperty(`LocationHistory`, 'visibility', 'visible');
        } else {
            clearTimeout(timeout.current);
            map.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-color', options.route.lineCorlor);
            map.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-opacity', options.route.lineOpacity);
            map.setLayoutProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'visibility', 'visible');
            map.setLayoutProperty(`ek-tracking-his-${_map_Container.id}-LineString-arrow`, 'visibility', 'visible');
            map.setLayoutProperty(`locationMarker`, 'visibility', 'none');
            map.setLayoutProperty(`LocationHistory`, 'visibility', 'none');
        };


        return () => {
            if (animationID.current) cancelAnimationFrame(animationID.current);
            if (timeout.current) clearTimeout(timeout.current);
        };
    }, [map, segmentData, options, isFollow, isAnimation, animationSpeed]);


    const toggleAnimation = () => {
        setAnimation(!isAnimation);
    };

    const replayAnimation = () => {
        setReplay(!isReplay);
    };

    const StopAnimation = () => {
        setAnimation(false);
        currentIndex = 0;
    };

    const handleSpeedChange = (value) => {
        setanimationSpeed(value);
    };

    const handleFollowChange = (value) => {
        if (value.target.checked) map.setZoom(17);
        setFollow(!isFollow);
    };

    return (
        <div id='ekmapplf_tracking_control' className='ekmapplf_tracking-map-control'>
            <Flex gap="small" align="center" justify="center" style={{ marginBottom: '10px' }}>
                <Button icon={<CaretRightOutlined />} disabled={isAnimation} onClick={toggleAnimation} />
                <Button icon={<PauseOutlined />} disabled={!isAnimation} onClick={toggleAnimation} />
                {/* <Button icon={!isAnimation ? <CaretRightOutlined /> : <PauseOutlined />} onClick={toggleAnimation} /> */}
                {/* <Button icon={<XFilled />} onClick={StopAnimation} ></Button> */}
                {/* <Button type={isReplay ? 'primary' : 'default'} icon={<RetweetOutlined />} onClick={replayAnimation}></Button> */}
                <Select
                    defaultValue={animationSpeed}
                    style={{ width: '75px' }}
                    onChange={handleSpeedChange}
                    options={listSpeeds}
                />
            </Flex>
            <Checkbox onChange={handleFollowChange} checked={isFollow}>Theo dõi lộ trình</Checkbox>
        </div>
    );
};

export default Animate_And_Controls;