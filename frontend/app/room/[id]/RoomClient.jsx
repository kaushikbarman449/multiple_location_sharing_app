"use client";

import dynamic from "next/dynamic";

// Load the map app only on the client to avoid server-side Leaflet errors
const MapApp = dynamic(() => import("../../../src/App"), { ssr: false });

export default function RoomClient({ roomId }) {
  return <MapApp roomId={roomId} />;
}
