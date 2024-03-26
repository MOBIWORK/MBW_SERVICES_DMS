import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'


interface historyProps {
    projectId: string,
    objectId: string,
    from_time: string,
    to_time: string
}
export function MapEkgisHistory({objectId='655824e13a62d46bf149dced',projectId= '6556e471178a1db24ac1a711',from_time= '2024-03-13T00:00:00',
to_time= '2024-03-14T00:00:00'}:historyProps) {
    var a = {
        "container": "ek-history",
        center: [105, 17],
        zoom: 4,
        projectId,
        objectId,
        from_time,
        to_time,
        apiKey: 'w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc',
    }


    return (
        <>
            <Helmet>
                <script >
                    {` 
                    console.log("history");
                    
                    var historyMap = new ekmapplf_tracking.locationHistory(${JSON.stringify(a)});
                    historyMap.on('onload', (event)=>{
                        console.log(event.positons);
                   })
                   var popup;
                   historyMap.on('onfocus', (event)=>{
                       var map = historyMap.getMap();
                       var features = event.data;
                       if (popup) popup.remove();
                       popup = new maplibregl.Popup()
                           .setLngLat(features.geometry.coordinates)
                           .setHTML(
                               "<span>+features.properties.coordinates+</span>"
                           )
                           .setOffset([0,-25])
                           .addTo(map);
                   })
                   var element = document.createElement('div');
                    element.className = 'map-legend';
                    element.innerHTML = " <h2>Chú giải bản đồ</h2><ul><li><span class='legend-icon' style='background-color: red;'></span> Địa điểm A</li><li><span class='legend-icon' style='background-color: blue;'></span> Địa điểm B</li>         </ul>"           
                    historyMap.setNote(element);
                    `
                    }
                </script>
            </Helmet>
            <div id={"ek-history"} className='h-full w-full relative'>
            </div>
        </>
    )
}
