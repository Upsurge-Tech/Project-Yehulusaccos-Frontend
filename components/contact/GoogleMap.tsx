"use client";
import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  
  const lat = 7.050384829407225
  const lng = 38.47354272883577

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map, Marker } = await loader.load().then(() => google.maps);

      const position = { lat, lng };
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
      const marker = new Marker({ map, position });
    };

    initMap();
  }, [lat, lng]);

  return (
    <div className="w-full mx-auto h-[500px]">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
