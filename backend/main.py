from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
import uvicorn

app = FastAPI()

# Allow CORS so frontend can connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory room storage: { room_id: { user_id: {"lat": float, "lng": float, "ws": WebSocket, "name": str } } }
rooms: Dict[str, Dict] = {}


async def broadcast_locations(room_id: str):
    if room_id not in rooms:
        return
    users_data = {}
    for uid, u in rooms[room_id].items():
        if u.get("lat") is not None and u.get("lng") is not None:
            users_data[uid] = {"lat": u["lat"],
                               "lng": u["lng"], "name": u.get("name")}
    message = {"type": "locations", "users": users_data}
    for u in list(rooms[room_id].values()):
        try:
            await u["ws"].send_json(message)
        except Exception:
            pass


@app.websocket("/join-room/{room_id}")
async def join_room(websocket: WebSocket, room_id: str):
    await websocket.accept()
    user_id = str(id(websocket))  # Unique user identifier for this connection

    if room_id not in rooms:
        rooms[room_id] = {}

    rooms[room_id][user_id] = {"ws": websocket,
                               "lat": None, "lng": None, "name": None}

    try:
        while True:
            data = await websocket.receive_json()
            # allow clients to set their name separately or send it with location updates
            if data.get("type") == "set_name":
                rooms[room_id][user_id]["name"] = data.get("name")
                await broadcast_locations(room_id)
            elif data.get("type") == "location_update":
                coords = data.get("coords", {})
                if "lat" in coords and "lng" in coords:
                    rooms[room_id][user_id]["lat"] = coords["lat"]
                    rooms[room_id][user_id]["lng"] = coords["lng"]
                # optional: accept name in location update
                if data.get("name"):
                    rooms[room_id][user_id]["name"] = data.get("name")
                await broadcast_locations(room_id)
    except WebSocketDisconnect:
        del rooms[room_id][user_id]
        await broadcast_locations(room_id)
        if not rooms[room_id]:
            del rooms[room_id]  # Clean up empty room

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
