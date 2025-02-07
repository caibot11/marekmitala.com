"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface MinimalMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  mapStyles?: google.maps.MapTypeStyle[]; // Snazzy Maps JSON array if you want a custom style
}

export default function MinimalMap({
  lat,
  lng,
  zoom = 8,
  mapStyles,
}: MinimalMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).google && mapRef.current) {
      const center = new google.maps.LatLng(lat, lng);

      const mapOptions: google.maps.MapOptions = {
        center,
        zoom,
        disableDefaultUI: true, // remove zoom/satellite UI
      };

      if (mapStyles) {
        mapOptions.styles = mapStyles;
      }

      new google.maps.Map(mapRef.current, mapOptions);
    }
  }, [lat, lng, zoom, mapStyles]);

  return (
    <>
      {/* Loads Google Maps JS w/ your API key before rendering the map */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        strategy="beforeInteractive"
      />
      {/* The map container */}
      <div
        ref={mapRef}
        style={{ width: "100%", height: "600px", backgroundColor: "#eee" }}
      />
    </>
  );
}
