"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { v4 as uuidv4 } from "uuid";

export default function LandingPage() {
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const navigateToApp = (newRoomId) => {
    window.location.href = `/room/${newRoomId}`;
  };

  const createRoom = () => {
    if (!name.trim()) return alert("Enter your name first!");
    setIsCreating(true);
    const newRoomId = uuidv4().slice(0, 6);
    localStorage.setItem("userName", name.trim());
    localStorage.setItem("roomId", newRoomId);

    setTimeout(() => {
      navigateToApp(newRoomId);
      setIsCreating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary blob animations */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Additional smaller floating elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-float"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-float animation-delay-2000"></div>

        {/* Floating particles */}
        <div className="particles">
          <div className="particle w-2 h-2" style={{ top: "10%" }}></div>
          <div className="particle w-1 h-1" style={{ top: "20%" }}></div>
          <div className="particle w-3 h-3" style={{ top: "30%" }}></div>
          <div className="particle w-1.5 h-1.5" style={{ top: "40%" }}></div>
          <div className="particle w-2 h-2" style={{ top: "50%" }}></div>
          <div className="particle w-1 h-1" style={{ top: "60%" }}></div>
          <div className="particle w-2.5 h-2.5" style={{ top: "70%" }}></div>
          <div className="particle w-1 h-1" style={{ top: "80%" }}></div>
          <div className="particle w-2 h-2" style={{ top: "90%" }}></div>
        </div>
      </div>

      <Card className="w-full max-w-md mx-auto glass-effect shadow-2xl border-0 animate-fade-in-up relative z-10">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow animate-float">
              <span className="text-2xl">📍</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 text-balance">
              Share Your Location
            </h1>
            <p className="text-gray-600 text-pretty">
              Create a room and share your live location with friends
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                maxLength={10}
                onKeyPress={(e) => e.key === "Enter" && createRoom()}
              />
            </div>

            <Button
              onClick={createRoom}
              disabled={!name.trim() || isCreating}
              className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:opacity-50 animate-gradient"
            >
              {isCreating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Room...
                </div>
              ) : (
                "Create Room"
              )}
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Your location will be shared with room members
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
