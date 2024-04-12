import React, { useState, useRef, useEffect, ReactNode } from "react";
import ReactMapGL, {
  Source,
  Layer,
  MapboxMap,
  Marker
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import "@maptiler/geocoding-control/style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { MartLocation } from "..";
import { locationType } from "../../types/location";
import mapboxgl from "mapbox-gl";

interface Location {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  // Các trường khác trong đối tượng kết quả tìm kiếm
}


export function Mapcustom(
  {locations,focusLocation}: {locations: locationType[],focusLocation?:locationType}
) {
  const mapRef = useRef<MapboxMap | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (mapRef.current && locations.length > 0) {
      console.log("map",mapRef.current);
      
      const bounds = locations.reduce(
        (bounds, point) => bounds.extend([point.long, point.lat]),
        new mapboxgl.LngLatBounds()
      );

      if (!bounds.isEmpty()) {
        console.log("not empty");
        
        const [minLng, minLat] = bounds.getSouthWest().toArray();
        const [maxLng, maxLat] = bounds.getNorthEast().toArray();
        mapRef.current.setZoom(4)
        mapRef.current.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding: 100, maxZoom: 14, duration: 1500 });
      }
      if(focusLocation){
        mapRef.current.easeTo({
          center: [focusLocation.long,focusLocation.lat],
          zoom: 14
        })
      }


    }


  }, [locations,focusLocation]);
  return (
    <div
      className={
        isFullscreen
          ? "fixed top-0 right-0 bottom-0 left-0 z-[9999]"
          : "w-full h-full relative"
      }
    >
      <ReactMapGL
        ref={mapRef}
        mapLib={maplibregl}
        style={{ width: "100%", height: " 100%", position: "relative" }}
        mapStyle={`https://api.ekgis.vn/v2/mapstyles/style/osmplus/standard/style.json?api_key=wtpM0U1ZmE2s87LEZNSHf63Osc1a2sboaozCQNsy`}
        // {...focusLocation && {center: [focusLocation.long,focusLocation.lat]}}
      >

        {/* Các điểm mốc */}
        {locations.map((point,index) => (
          <Marker
            key={point.customer_name}
            latitude={point.lat}
            longitude={point.long}
            offsetLeft={-20}
            offsetTop={-10}
          >

            <MartLocation des={`${index+1}.${point?.customer_name}`} />
          </Marker>
        ))}
        {/* ve duong di giua cac diem */}
        <Source
          id="lines"
          type="geojson"
          data={
            {
              'type': 'FeatureCollection',
              'features': [
                {
                  'type': 'Feature',
                  'properties': {
                    'color': '#F7455D' // red
                  },
                  'geometry': {
                    'type': 'LineString',
                    'coordinates':locations.map(location=> [location.long,location.lat])
                  }
                }
              ]
            }
          }
        >
          <Layer
            id="lines"
            type="line"
            paint={{
              'line-color': ['get', 'color'],
              'line-width': 3
            }}
          />
        </Source>

      </ReactMapGL>
    </div>
  );
}