"use client";
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { multiBrandNetworkStyle } from "./mapStyles";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function CustomMap({ lat, lng }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  const mapOptions = {
    styles: multiBrandNetworkStyle,
    disableDefaultUI: true,
  };

  const center = { lat, lng };

  // Define a custom marker icon using an SVG path
  const markerIcon = {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    fillColor: "#ff0000",
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 1.5,
    anchor: new window.google.maps.Point(12, 24),

  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      options={mapOptions}
    >
      <Marker position={center} icon={markerIcon} />
    </GoogleMap>
  );
}
