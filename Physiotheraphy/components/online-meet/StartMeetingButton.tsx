"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Video } from 'lucide-react';

export function StartMeetingButton({ 
  className = "", 
  buttonText = "Start Video Consultation",
  roomName
}: { 
  className?: string;
  buttonText?: string;
  roomName?: string;
}) {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  const startMeeting = () => {
    setIsStarting(true);
    // Generate a random room ID or use the provided roomName
    const roomId = roomName || Math.random().toString(36).substring(2, 11);
    
    // In a real app, you might want to save this room to a database first
    // For this demo, we just navigate to the dynamically created room
    router.push(`/meet/${roomId}`);
  };

  return (
    <button
      onClick={startMeeting}
      disabled={isStarting}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1E6FFF] text-white font-semibold rounded-2xl shadow-[0_8px_30px_rgba(30,111,255,0.4)] hover:bg-[#1558D6] transition-all disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      <Video className="w-5 h-5" />
      {isStarting ? "Creating Room..." : buttonText}
    </button>
  );
}
