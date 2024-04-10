import React, { useRef, useState, useEffect } from 'react';
import { Button, Flex, Select, Checkbox } from "antd";
import { PauseOutlined, CaretRightOutlined, RetweetOutlined } from '@ant-design/icons';
import rhumbBearing from '@turf/rhumb-bearing';

const MapControl = ({ map, HistoryData, options, isAnimate }) => {
    // console.log(map);
    // console.log(HistoryData);

    const [animationState, setAnimationState] = useState({
        isAnimating: isAnimate,
        animationSpeed: 0.1,
        isFollowing: true
    });
    const lastTimestamp = useRef(null);
    const animationID = useRef(null);

    let _map_Container = map.getContainer();
    let _options = options;

    useEffect(() => {
        const animateLineAndPoint = async (timestamp) => {
            const elapsed = timestamp - lastTimestamp.current;

            if (elapsed > (1000 / (60 * animationState.animationSpeed))) {
                lastTimestamp.current = timestamp;

                const Navigationline = await map.getSource(`ek-tracking-his-${_map_Container.id}-navigation-line-source`)._data;
                const NavigationPoint = await map.getSource(`ek-tracking-his-${_map_Container.id}-navigation-point-source`)._data;

                if (Navigationline.features[0].geometry.coordinates.length === HistoryData.length) {
                    //loop
                    Navigationline.features[0].geometry.coordinates = [HistoryData[0].coordinates];
                    NavigationPoint.features[0].geometry.coordinates = HistoryData[0].coordinates;
                } else {
                    //add
                    let index = Navigationline.features[0].geometry.coordinates.length;

                    Navigationline.features[0].geometry.coordinates = HistoryData.slice(0, index + 1).map(data => data.coordinates);
                    map.getSource(`ek-tracking-his-${_map_Container.id}-navigation-line-source`).setData(Navigationline);

                    NavigationPoint.features[0].geometry.coordinates = HistoryData[index].coordinates;
                    const bearing = rhumbBearing(
                        HistoryData[index - 1].coordinates,
                        HistoryData[index].coordinates
                    );
                    NavigationPoint.features[0].properties.bearing = bearing;
                    map.getSource(`ek-tracking-his-${_map_Container.id}-navigation-point-source`).setData(NavigationPoint);
                }

                if (animationState.isFollowing) {
                    map.easeTo({
                        center: NavigationPoint.features[0].geometry.coordinates,
                        bearing: NavigationPoint.features[0].properties.bearing ? NavigationPoint.features[0].properties.bearing : 0,
                        zoom: 15,
                        pitch: 60,
                    })
                }
            }
            animationID.current = requestAnimationFrame(animateLineAndPoint);
        };

        if (animationState.isAnimating) {
            map.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-color', '#b5b5b5');
            map.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-opacity', 0.6);
            animateLineAndPoint()
        } else {
            map.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-color', _options.lineCorlor);
            map.setPaintProperty(`ek-tracking-his-${_map_Container.id}-LineString`, 'line-opacity', _options.lineOpacity);
        }

        return () => {
            cancelAnimationFrame(animationID.current);
        };
    }, [map, animationState]);


    const startAnimation = () => {
        setAnimationState({ ...animationState, isAnimating: true });
    };

    const stopAnimation = () => {
        setAnimationState({ ...animationState, isAnimating: false });
    };

    const restartAnimation = () => {
        var NavigationPoint = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'Point',
                        'coordinates': HistoryData[0].coordinates
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
                        'coordinates': [HistoryData[0].coordinates]
                    }
                }
            ]
        };
        map.getSource(`ek-tracking-his-${_map_Container.id}-navigation-line-source`).setData(Navigationline);
        map.getSource(`ek-tracking-his-${_map_Container.id}-navigation-point-source`).setData(NavigationPoint);
        if (animationState.isFollowing) {
            map.easeTo({
                center: NavigationPoint.features[0].geometry.coordinates,
                bearing: NavigationPoint.features[0].properties.bearing ? NavigationPoint.features[0].properties.bearing : 0,
                zoom: 15,
                pitch: 60
            })
        }
    };

    const handleSpeedChange = (value) => {
        setAnimationState({ ...animationState, animationSpeed: parseFloat(value) });
    };

    const handleFollowChange = () => {
        setAnimationState({ ...animationState, isFollowing: !animationState.isFollowing });
    };

    return (
        <div id='ekmapplf_tracking_control' className='ekmapplf_tracking-map-control'>
            <Flex gap="small" align="center" style={{ marginBottom: '10px' }}>
                <Button icon={<CaretRightOutlined />} onClick={startAnimation} disabled={animationState.isAnimating} />
                <Button icon={<PauseOutlined />} onClick={stopAnimation} disabled={!animationState.isAnimating} />
                <Button icon={<RetweetOutlined />} onClick={restartAnimation}></Button>
                <Select
                    defaultValue={animationState.animationSpeed}
                    style={{ width: '75px' }}
                    onChange={handleSpeedChange}
                    options={[
                        { value: 0.05, label: '0.5x' },
                        { value: 0.1, label: '1x' },
                        { value: 0.2, label: '2x' },
                        { value: 0.5, label: '5x' },
                        { value: 10, label: '10x' },
                    ]}
                />
            </Flex>
            <Checkbox onChange={handleFollowChange} checked={animationState.isFollowing}>Theo dõi</Checkbox>
        </div>
    );
};

export default MapControl;
