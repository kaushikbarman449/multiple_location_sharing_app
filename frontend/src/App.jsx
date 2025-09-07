"use client";

import React, { useEffect, useState, Suspense } from "react";

// Lazy-load the map implementation (which imports leaflet/react-leaflet).
const MapInner = React.lazy(() => import("./MapInner"));

export default function App({ roomId }) {
  const [position, setPosition] = useState(null);
  const [users, setUsers] = useState({});
  const [ws, setWs] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    // prefer stored name from landing page
    const storedName = localStorage.getItem("userName");
    const entered =
      storedName || window.prompt("Enter your name:", "") || "Anonymous";
    setName(entered);
    // if no stored name, save it for future visits
    if (!storedName) localStorage.setItem("userName", entered);

    // build websocket url
    const host = window.location.hostname || "localhost";
    const port = 8000;
    const room = roomId || window.location.pathname.split("/").pop();
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${protocol}://${host}:${port}/join-room/${room}`;

    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      // send name to server
      socket.send(JSON.stringify({ type: "set_name", name: entered }));
      // send initial location if available
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            socket.send(
              JSON.stringify({ type: "location_update", coords, name: entered })
            );
          },
          () => {},
          { enableHighAccuracy: true }
        );
      }
    };

    socket.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.type === "locations") setUsers(data.users || {});
      } catch (e) {
        console.error("Invalid ws message", e);
      }
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!ws) return;
    // watch position and send updates
    let watcher = null;
    if (navigator.geolocation) {
      watcher = navigator.geolocation.watchPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setPosition([coords.lat, coords.lng]);
          try {
            ws.send(JSON.stringify({ type: "location_update", coords, name }));
          } catch (e) {
            // ignore
          }
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    }
    return () => {
      if (watcher && navigator.geolocation)
        navigator.geolocation.clearWatch(watcher);
    };
  }, [ws, name]);

  return (
    <Suspense fallback={<div style={{ height: "100vh" }} /> }>
      <MapInner users={users} position={position} />
    </Suspense>
  );
}
