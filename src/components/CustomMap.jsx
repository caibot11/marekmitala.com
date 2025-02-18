"use client";
import React from "react";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
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

  const center = { lat, lng };

  // Keep your code-based styling
  const mapOptions = {
    styles: multiBrandNetworkStyle,
    disableDefaultUI: true,
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      options={mapOptions}
    >
      <OverlayView
        position={center}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        {/* Reference the SVG from the public folder */}
        <img
          src="/images/map-marker-svgrepo-com.svg"
          alt="Custom Marker"
          style={{
            // Center the bottom tip of the marker at the lat/lng coordinate
            transform: "translate(-50%, -100%)",
            cursor: "pointer",
            width: "32px",  // Adjust width/height as needed
            height: "32px",
          }}
        />
      </OverlayView>
    </GoogleMap>
  );
}
