import React, { useRef, useState, useEffect } from 'react';
import { Button, Flex, Select, Checkbox } from "antd";
import { PauseOutlined, CaretRightOutlined, RetweetOutlined, XFilled, CloseSquareFilled } from '@ant-design/icons';
import * as turf from "@turf/turf";

const Animate_And_Controls = ({ map, segmentData, options, currentInfo }) => {
    // console.log(map);
    // console.log(segmentData);

    const animationID = useRef(null);
    const timeout = useRef(null);
    const [isFollow, setFollow] = useState(options.animation.follow)
    const [isAnimation, setAnimation] = useState(true)
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
    var currentIndex = 0;
    var alongPath = [];

    // function loadData() {
    //     drawPath();
    //     addCar();
    // }
    // function drawPath() {
    //     var fcLocationHistory = {
    //         "type": "FeatureCollection",
    //         "features": []
    //     };
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
        currentIndex = i;
        if (i == 0) {
            alongPath = [];
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
            currentInfo(speedData[currentIndex])
            return;
        }
        currentInfo(speedData[currentIndex])
        if (e.computed.time) {
            let timeoutFrame = (e.computed.time * 1000) / animationSpeed;
            if (e.computed.speed) {
                var start;
                var firstPoint;
                function frame(time) {
                    // console.log(map);
                    // console.log('frame', time);
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
                    try {
                        if (map && isFollow) {
                            map.panTo(alongPathFrame, { animate: true, essential: true, curve: 1.42, duration: 100, pitch: 60, bearing: lastBearing })
                        }
                        if (map && map.getSource('locationMarker')) {
                            map.getSource("locationMarker").setData({
                                type: "FeatureCollection",
                                features: [turf.point(alongPathFrame, { bearing: lastBearing })]
                            })
                        }
                        alongPath = alongPath.concat([alongPathFrame]);

                        if (map && alongPath.length > 1)
                            if (map.getSource('LocationHistory')) {
                                map.getSource("LocationHistory").setData({
                                    type: "FeatureCollection",
                                    features: [turf.lineString(alongPath)]
                                })
                            }
                        // animation(frame);
                        animationID.current = requestAnimationFrame(frame);
                        map.animation_current = animationID.current
                    } catch (ex) {
                        console.log(ex)
                    }
                }
                // animation(frame);
                animationID.current = requestAnimationFrame(frame);
                map.animation_current = animationID.current
                // animID(animationID.current);
            }
            i++;
            if (isReplay && i === speedData.length) i = 0;
            timeout.current = setTimeout(animate.bind(this), timeoutFrame, i, speedData)
            map.timeout_current = timeout.current
        }
    }

    useEffect(() => {
        // setAnimation(false)
        if (animationID.current) cancelAnimationFrame(animationID.current);
        if (timeout.current) clearTimeout(timeout.current);
    }, [map, options, segmentData])

    useEffect(() => {
        // if (!isAnimation) setAnimation(true);
        // console.log(options.animation);
        // console.log(isAnimation);

        if (animationID.current) cancelAnimationFrame(animationID.current);
        if (timeout.current) clearTimeout(timeout.current);

        if (isAnimation) {
            currentIndex = 0;
            if (segmentData.length && segmentData[0].computed.time) {
                timeout.current = setTimeout(animate.bind(this), (segmentData[0].computed.time * 1000) / animationSpeed, currentIndex, segmentData);
                map.timeout_current = timeout.current
            }
            map.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-color', '#b5b5b5');
            map.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-opacity', 0.5);
            map.setLayoutProperty(`ek-tracking-his-${_map_Container.id}-LineString-arrow`, 'visibility', 'none');
            map.setLayoutProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'visibility', 'none');
            map.setLayoutProperty(`locationMarker`, 'visibility', 'visible');
            map.setLayoutProperty(`LocationHistory`, 'visibility', 'visible');
        } else {
            currentInfo(null)
            if (animationID.current) cancelAnimationFrame(animationID.current);
            if (timeout.current) clearTimeout(timeout.current);
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
    }, [isFollow, isAnimation, animationSpeed]);


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
            <Flex gap="small" align="center" justify="center">
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
                <Checkbox onChange={handleFollowChange} checked={isFollow}>Theo dõi lộ trình</Checkbox>
            </Flex>
        </div>
    );
};

export default Animate_And_Controls;