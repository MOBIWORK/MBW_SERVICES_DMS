import React, { useState } from 'react';

function MapLegend() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleLegend = () => {
        setIsOpen(!isOpen);
    };

    const options = {
        iconOnline: 'https://files.ekgis.vn/sdks/tracking/assets/check-icon.png',
        iconOffline: 'https://files.ekgis.vn/sdks/tracking/assets/offline-marker.png',
    };

    return (
        <div id='ekmapplf_tracking_legend' className='ekmapplf_tracking-map-legend'>
            <div className='ekmapplf_tracking-legend-title' onClick={toggleLegend}>
                <span className={`icon ${isOpen ? 'ekmapplf_tracking-icon-square-minus' : 'ekmapplf_tracking-icon-square-plus'}`} style={{ filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(187deg) brightness(105%) contrast(103%)' }}></span>
                <span>Chú giải bản đồ</span>
            </div>
            <div className={`ekmapplf_tracking-legend-body ${isOpen ? 'open' : ''}`} style={{ maxHeight: isOpen ? 'none' : '0' }}>
                <ul>
                    <li>
                        <span className='ekmapplf_tracking-legend-icon' style={{ backgroundImage: `url(${options.iconOnline})` }}></span>
                        Vị trí nhân viên Online
                    </li>
                    <li>
                        <span className='ekmapplf_tracking-legend-icon' style={{ backgroundImage: `url(${options.iconOffline})` }}></span>
                        Vị trí nhân viên Offline
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default MapLegend;