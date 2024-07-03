import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import TabSwitcher from "./TabSwitcher";

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const initialCenter = {
  lat: 43.238949,
  lng: 76.889709,
};

const Map = ({ centers, tab, setTab }) => {
  const [map, setMap] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);

  useEffect(() => {
    if (tab === 0 && map) {
      map.setCenter(initialCenter);
      map.setZoom(10);
    }
  }, [tab, map]);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleCenterClick = (center) => {
    setSelectedCenter(center);
    if (map) {
      map.panTo({
        lat: parseFloat(center.latitude),
        lng: parseFloat(center.longitude),
      });
      map.setZoom(15);
    }
  };

  return (
    <div className="relative w-full h-[80vh] mt-5">
      <TabSwitcher tab={tab} setTab={setTab} />
      <LoadScript googleMapsApiKey="AIzaSyAoeJsYR20gUXEXBtXDM49xoNYByvFAbZg">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            selectedCenter
              ? {
                  lat: parseFloat(selectedCenter.latitude),
                  lng: parseFloat(selectedCenter.longitude),
                }
              : initialCenter
          }
          zoom={10}
          onLoad={onLoad}
          className="w-full h-full"
        >
          {centers.map((center) => (
            <Marker
              key={center.id}
              position={{
                lat: parseFloat(center.latitude),
                lng: parseFloat(center.longitude),
              }}
              title={center.city}
              icon={{
                url:
                  selectedCenter && selectedCenter.id === center.id
                    ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    : "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      <div className="absolute top-0 right-0 w-72 h-full bg-white shadow-lg p-4 overflow-y-auto mt-16">
        {centers.map((center) => (
          <div
            key={center.id}
            className={`border p-4 rounded-lg cursor-pointer ${
              selectedCenter && selectedCenter.id === center.id
                ? "bg-gray-200"
                : ""
            }`}
            onClick={() => handleCenterClick(center)}
          >
            <h3 className="text-lg font-semibold">{center.city}</h3>
            <p className="text-gray-700">{center.address}</p>
            <p className="text-gray-700">{center.phone_number}</p>
            <p className="text-gray-700">
              {center.time_open} - {center.time_close}
            </p>
            <a href={center.website_link} className="text-blue-500">
              Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
