import React, { useRef, useState, useEffect } from 'react';
import { Button, Flex, Select, Checkbox, Tooltip } from "antd";
import { PauseOutlined, CaretRightOutlined, RetweetOutlined, BorderOutlined  } from '@ant-design/icons';
import * as turf from "@turf/turf";

const Animate_And_Controls = ({ _map, segmentData, options, currentInfo }) => {
    const animationID = useRef(null);
    const timeout = useRef(null);
    const [isFollow, setFollow] = useState(options.animation.follow)
    const [isAnimation, setAnimation] = useState(false)
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
    const [isTabActive, setTabActive] = useState(true);
    const lastBearing = useRef(0);
    const currentIndex = useRef(0);
    const alongPath = useRef([]);
    const map = useRef(_map);
    var _map_Container = map.current.getContainer();

    // console.log(map.current);
    // console.log(segmentData);

    function animate(i, speedData) {
        currentIndex.current = i;

        const e = speedData[i];
        if (!e) {
            if (isReplay) {
                currentIndex.current = 0;
                alongPath.current = [];
                try {
                    if (map.current && map.current.getSource('LocationHistory'))
                        map.current.getSource('LocationHistory').setData({
                            'type': 'FeatureCollection',
                            'features': []
                        })
                } catch (ex) {
                    setAnimation(false)
                    console.log(ex);
                }
                if (segmentData.length && segmentData[0].computed.time)
                    timeout.current = setTimeout(animate.bind(this), 1000, currentIndex.current, segmentData);
            } else {
                currentIndex.current = i - 1;
                StopAnimation();
            };
            currentInfo(speedData[currentIndex.current]);
            return;
        }
        currentInfo(e)
        if (e.computed.time) {
            let timeoutFrame = (e.computed.time * 1000) / animationSpeed;
            if (e.computed.speed) {
                var start, firstPoint;
                function frame(time) {
                    if (!start) {
                        firstPoint = e.loc1.loc;
                        start = time;
                    }
                    const animationPhase = (time - start) / ((Number(e.computed.time?.toString()) * 1000) / animationSpeed);
                    if (animationPhase > 1 || !isAnimation) return;

                    var path = turf.lineString([e.loc1.loc, e.loc2.loc]);
                    var pathDistance = turf.lineDistance(path);
                    var alongPathFrame = turf.along(path, pathDistance * animationPhase)
                        .geometry.coordinates;
                    var bearing = turf.bearing(
                        turf.point(firstPoint),
                        turf.point(alongPathFrame)
                    );

                    if (firstPoint[0] !== alongPathFrame[0] && firstPoint[1] !== alongPathFrame[1]) lastBearing.current = bearing;
                    firstPoint = alongPathFrame;

                    alongPath.current = alongPath.current.concat([alongPathFrame]);

                    try {
                        if (map.current && isFollow)
                            map.current.panTo(alongPathFrame, { animate: true, essential: true, curve: 1.42, duration: 100, pitch: 60, bearing: lastBearing.current })

                        if (map.current && map.current.getSource('locationMarker'))
                            map.current.getSource("locationMarker").setData({
                                type: "FeatureCollection",
                                features: [turf.point(alongPathFrame, { bearing: lastBearing.current })]
                            })

                        if (map.current && alongPath.current.length > 1)
                            if (map.current.getSource('LocationHistory'))
                                map.current.getSource("LocationHistory").setData({
                                    type: "FeatureCollection",
                                    features: [turf.lineString(alongPath.current)]
                                })

                        animationID.current = window.requestAnimationFrame(frame);
                    } catch (ex) {
                        setAnimation(false)
                        console.log(ex);
                    }
                }
                animationID.current = window.requestAnimationFrame(frame);
            }
            i++;
            alongPath.current = speedData.slice(0, i).map(gpx => gpx.loc1.loc)
            timeout.current = setTimeout(animate.bind(this), timeoutFrame, i, speedData)
        }
    }

    useEffect(() => {
        // console.log(isAnimation);
        setAnimation(false)
        if (animationID.current) cancelAnimationFrame(animationID.current);
        if (timeout.current) clearTimeout(timeout.current);
        currentIndex.current = 0;
        if (!segmentData.length) return
        if (options.animation.animate) setAnimation(true)
    }, [_map, segmentData, options])

    useEffect(() => {
        if (isAnimation) {
            if (currentIndex.current === 0) {
                alongPath.current = [];
                map.current.getSource('LocationHistory').setData({
                    'type': 'FeatureCollection',
                    'features': []
                })
            }
            if (segmentData.length && segmentData[0].computed.time) {
                timeout.current = setTimeout(animate.bind(this), 500, currentIndex.current, segmentData);
                // timeout.current = setTimeout(animate.bind(this), 300, currentIndex.current, segmentData);
            }
            try {
                map.current.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-color', '#b5b5b5');
                map.current.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-opacity', 0.5);
                map.current.setLayoutProperty(`ek-tracking-his-${_map_Container.id}-LineString-arrow`, 'visibility', 'none');
                map.current.setLayoutProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'visibility', 'none');
                map.current.setLayoutProperty(`locationMarker`, 'visibility', 'visible');
                map.current.setLayoutProperty(`LocationHistory`, 'visibility', 'visible');
            } catch (ex) {
                console.log(ex);
            }
        } else {
            currentInfo(null);
            if (animationID.current) cancelAnimationFrame(animationID.current);
            try {
                map.current.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-color', options.route.lineCorlor);
                map.current.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-opacity', options.route.lineOpacity);
                map.current.setLayoutProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'visibility', 'visible');
                map.current.setLayoutProperty(`ek-tracking-his-${_map_Container.id}-LineString-arrow`, 'visibility', 'visible');
                map.current.setLayoutProperty(`locationMarker`, 'visibility', 'none');
                map.current.setLayoutProperty(`LocationHistory`, 'visibility', 'none');
            } catch (ex) {
                console.log(ex);
            }
        };

        return () => {
            if (animationID.current) cancelAnimationFrame(animationID.current);
            if (timeout.current) clearTimeout(timeout.current);
        };
    }, [isAnimation, animationSpeed, isFollow, isReplay]);

    const [currentAnimation, setCurrentAnimation] = useState(options.animation.animate);
    useEffect(() => {
        const handleVisibilityChange = () => {
            setTabActive(document.visibilityState === 'visible');
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);
    useEffect(() => {
        if (isTabActive) {
            if (currentAnimation === options.animation.animate) setAnimation(true);
            else setAnimation(false);
        } else {
            setCurrentAnimation(isAnimation);
            setAnimation(false);
        }
    }, [isTabActive]);

    const handleSpeedChange = (value) => {
        setanimationSpeed(value);
    };

    const handleFollowChange = (value) => {
        if (value.target.checked) map.current.setZoom(17);
        setFollow(!isFollow);
    };

    const StartAnimation = () => {
        setAnimation(true)
    };

    const PauseAnimation = () => {
        setAnimation(false)
    }

    const StopAnimation = () => {
        PauseAnimation()
        try {
            map.current.getSource("locationMarker").setData({
                type: "FeatureCollection",
                features: []
            })
            map.current.getSource('LocationHistory').setData({
                'type': 'FeatureCollection',
                'features': []
            })
            map.current.panTo(segmentData[0].loc1.loc);
        } catch (ex) {
            console.log(ex);
        }
        currentIndex.current = 0;
    };

    const ReplayAnimation = () => {
        setReplay(!isReplay);
    };

    return (
        <div id='ekmapplf_tracking_control' className='ekmapplf_tracking-map-control'>
            <Flex gap="small" align="center" justify="center">
                <Tooltip title="Play">
                    <Button icon={<CaretRightOutlined />} disabled={isAnimation} onClick={StartAnimation} />
                </Tooltip>
                <Tooltip title="Pause">
                    <Button icon={<PauseOutlined />} disabled={!isAnimation} onClick={PauseAnimation} />
                </Tooltip>
                <Tooltip title="Stop">
                    <Button icon={<BorderOutlined  />} onClick={StopAnimation} ></Button>
                </Tooltip>
                <Tooltip title="Replay">
                    <Button type={isReplay ? 'primary' : 'default'} icon={<RetweetOutlined />} onClick={ReplayAnimation}></Button>
                </Tooltip>
                <Tooltip title="Speed">
                    <Select
                        defaultValue={animationSpeed}
                        style={{ width: '75px' }}
                        onChange={handleSpeedChange}
                        options={listSpeeds}
                    />
                </Tooltip>
                <Checkbox onChange={handleFollowChange} checked={isFollow}>Theo dõi lộ trình</Checkbox>
            </Flex>
        </div>
    );
};

export default Animate_And_Controls;