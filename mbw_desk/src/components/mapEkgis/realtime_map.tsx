import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'

export function MapEkgisRealTime() {
    var a = {
        "container": "ek-history",
        "center": [105, 17],
        "zoom": 4,
        "projectId": "6556e471178a1db24ac1a711"
        , "apiKey": 'w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc'
        
    }

    
    return (
        <>
            <Helmet>
                <script >
                    {` 
                    console.log("history");
                    
                    var liveMap = new ekmapplf_tracking.Realtime_map(${JSON.stringify(a)});
                    liveMap.on('onload', (event)=>{
                        console.log(event.positons);
                   })
                   var popup;
                   liveMap.on('onfocus', (event)=>{
                       var map = liveMap.getMap();
                       var features = event.data;
                       console.log(features);
                       if (popup) popup.remove();
                       popup = new maplibregl.Popup()
                           .setLngLat(features.geometry.coordinates)
                           .setHTML(
                               "<span>+features.properties.name+</span>"
                           )
                           .setOffset([0,-25])
                           .addTo(map);
                   })
                   liveMap.setStatus(online = 50, offline = 10);
                   var element = document.createElement('điv');
                    element.className = 'map-legend';
                    element.innerHTML = " <h2>Chú giải bản đồ</h2><ul><li><span class='legend-icon' style='background-color: red;'></span> Địa điểm A</li><li><span class='legend-icon' style='background-color: blue;'></span> Địa điểm B</li>         </ul>"           
                liveMap.setNote(element);
                    `
                    }
                </script>
            </Helmet>
            <div id={"ek-history"} className='h-full w-full relative'>
            </div>
        </>
    )
}
