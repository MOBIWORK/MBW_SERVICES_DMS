import React, { useState, useRef, useEffect, ReactNode } from "react";
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  Source,
  Layer,
  GeolocateControl,
  Marker
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import "@maptiler/geocoding-control/style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { MartLocation } from "..";
import { location } from "../../types/location";

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
  {locations}: {locations: location[]}
) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const route = [
    { id: 1, latitude: 21.0285, longitude: 105.8542 },
    { id: 2, latitude: 21.0278, longitude: 105.8352 },
    { id: 3, latitude: 21.0285, longitude: 105.8523 }
  ]
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  return (
    <div
      className={
        isFullscreen
          ? "fixed top-0 right-0 bottom-0 left-0 z-[9999]"
          : "w-full h-full relative"
      }
    >
      <ReactMapGL
        mapLib={maplibregl}
        style={{ width: "100%", height: " 100%", position: "relative" }}
        mapStyle={`https://api.ekgis.vn/v2/mapstyles/style/osmplus/standard/style.json?api_key=wtpM0U1ZmE2s87LEZNSHf63Osc1a2sboaozCQNsy`}
      >

        {/* Các điểm mốc */}
        {locations.map(point => (
          <Marker
            key={point.customer_name}
            latitude={point.latitude}
            longitude={point.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >

            <MartLocation des={point?.customer_name} />
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
                    'coordinates':locations.map(location=> [location.longitude,location.latitude])
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