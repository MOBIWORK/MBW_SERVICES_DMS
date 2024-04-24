import React, { useRef, useState, useEffect } from 'react';
import { Button, Flex, Select, Checkbox, Tooltip } from "antd";
import { PauseOutlined, CaretRightOutlined, RetweetOutlined, BorderOutlined } from '@ant-design/icons';
import * as turf from "@turf/turf";

const Animate_And_Controls = ({ map, segmentData, options, currentInfo, Animation }) => {
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
    // const map = useRef(map);

    // console.log(map);
    // console.log(segmentData);

    function animate(i, speedData) {
        currentIndex.current = i;

        const e = speedData[i];
        if (!e) {
            if (isReplay) {
                currentIndex.current = 0;
                alongPath.current = [];
                try {
                    if (map && map.getSource('LocationHistory'))
                        map.getSource('LocationHistory').setData({
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
                        if (map && isFollow)
                            map.panTo(alongPathFrame, { animate: true, essential: true, curve: 1.42, duration: 100, pitch: 60, bearing: lastBearing.current })

                        if (map && map.getSource('locationMarker'))
                            map.getSource("locationMarker").setData({
                                type: "FeatureCollection",
                                features: [turf.point(alongPathFrame, { bearing: lastBearing.current })]
                            })

                        if (map && alongPath.current.length > 1)
                            if (map.getSource('LocationHistory'))
                                map.getSource("LocationHistory").setData({
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
        // if (options.animation.animate) setAnimation(true)
    }, [segmentData, options])

    useEffect(() => {
        if (Animation === true) StartAnimation(true)
        if (Animation === false) PauseAnimation(false)
        if (Animation === null) StopAnimation()
    }, [Animation]);

    useEffect(() => {
        if (isAnimation) {
            if (currentIndex.current === 0) {
                alongPath.current = [];
                map.getSource('LocationHistory').setData({
                    'type': 'FeatureCollection',
                    'features': []
                })
                if (segmentData.length) map.panTo(segmentData[0].loc1.loc)
                // if (isFollow) map.setZoom(17);
            }
            if (segmentData.length && segmentData[0].computed.time) {
                timeout.current = setTimeout(animate.bind(this), 500, currentIndex.current, segmentData);
                // timeout.current = setTimeout(animate.bind(this), 300, currentIndex.current, segmentData);
            }
            try {
                map.setPaintProperty(`ek-tracking-his-LineString`, 'line-color', '#b5b5b5');
                map.setPaintProperty(`ek-tracking-his-LineString`, 'line-opacity', 0.4);
                map.setLayoutProperty(`ek-tracking-his-LineString-arrow`, 'visibility', 'none');
                // map.setLayoutProperty(`ek-tracking-his-LineString`, 'visibility', 'none');
                map.setLayoutProperty(`locationMarker`, 'visibility', 'visible');
                map.setLayoutProperty(`LocationHistory`, 'visibility', 'visible');
                if (map.getSource(`RouteHistory`)) {
                    map.removeLayer(`RouteHistory`)
                    map.removeLayer(`RouteHistory-arrow`)
                    map.removeSource(`RouteHistory`)
                }
            } catch (ex) {
                console.log(ex);
            }
        } else {
            currentInfo(null);
            if (animationID.current) cancelAnimationFrame(animationID.current);
            try {
                map.setPaintProperty(`ek-tracking-his-LineString`, 'line-color', options.route.lineCorlor);
                map.setPaintProperty(`ek-tracking-his-LineString`, 'line-opacity', options.route.lineOpacity);
                map.setLayoutProperty(`ek-tracking-his-LineString`, 'visibility', 'visible');
                // map.setLayoutProperty(`ek-tracking-his-LineString-arrow`, 'visibility', 'visible');
                map.setLayoutProperty(`locationMarker`, 'visibility', 'none');
                map.setLayoutProperty(`LocationHistory`, 'visibility', 'none');
            } catch (ex) {
                console.log(ex);
            }
        };

        return () => {
            if (animationID.current) cancelAnimationFrame(animationID.current);
            if (timeout.current) clearTimeout(timeout.current);
        };
    }, [isAnimation, animationSpeed, isFollow, isReplay]);

    const [currentAnimation, setCurrentAnimation] = useState(null);
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
            if (currentAnimation && currentAnimation === true) setAnimation(true);
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
        if (value.target.checked) map.setZoom(17);
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
            if (map) {
                map.getSource("locationMarker").setData({
                    type: "FeatureCollection",
                    features: []
                })
                map.getSource('LocationHistory').setData({
                    'type': 'FeatureCollection',
                    'features': []
                })
                if (segmentData.length) map.panTo(segmentData[0].loc1.loc);
            }
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
                    <Button icon={<BorderOutlined />} onClick={StopAnimation} ></Button>
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