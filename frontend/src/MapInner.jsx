"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ensure Leaflet default icons load from CDN to avoid route-relative 404s
try {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
} catch (e) {
  // ignore if running in an environment without window
}

export default function MapInner({ users, position }) {
  return (
    <MapContainer
      center={position || [20.5937, 78.9629]}
      zoom={position ? 15 : 5}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {Object.entries(users).map(([uid, u]) => {
        if (u.lat == null || u.lng == null) return null;
        return (
          <Marker key={uid} position={[u.lat, u.lng]}>
            <Tooltip permanent>{u.name || "Anon"}</Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
