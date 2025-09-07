import React from "react";
import RoomClient from "./RoomClient";

export default function RoomPage({ params }: { params: any }) {
  // params may be a Promise in this Next.js version; unwrap with React.use()
  const p = React.use(params) as any;
  const id = p?.id;

  return (
    <main style={{ height: "100vh", width: "100%" }}>
      <RoomClient roomId={id} />
    </main>
  );
}
