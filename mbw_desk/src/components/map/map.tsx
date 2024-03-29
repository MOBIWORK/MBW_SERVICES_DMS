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
import { locationType } from "../../types/location";

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
  {locations}: {locations: locationType[]}
) {
  const [isFullscreen, setIsFullscreen] = useState(false);
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
            latitude={point.lat}
            longitude={point.long}
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