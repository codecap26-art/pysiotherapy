"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  StreamVideo,
  StreamVideoClient,
  User,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  CallParticipantsList,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

interface MeetingRoomProps {
  roomId: string;
}

export default function MeetingRoom({ roomId }: MeetingRoomProps) {
  const router = useRouter();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Generate a random user ID for this demo
    // In a real app, you would get this from your authentication system
    const userId = `user_${Math.random().toString(36).substring(2, 9)}`;
    const userName = `Guest ${userId.substring(5)}`;

    const initMeeting = async () => {
      try {
        // Fetch token from our API route
        const response = await fetch('/api/meet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, name: userName }),
        });

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          return;
        }

        const { token, apiKey } = data;

        if (apiKey === 'placeholder_key') {
          setError("Stream API keys are missing in .env.local. Please add your keys to start a real video call.");
          return;
        }

        const user: User = { id: userId, name: userName };
        
        // Initialize Stream Video Client
        const streamClient = new StreamVideoClient({ apiKey, user, token });
        
        // Initialize Call
        // Using 'default' call type for standard meetings
        const streamCall = streamClient.call('default', roomId);
        
        // Join the call immediately
        await streamCall.join({ create: true });
        
        setClient(streamClient);
        setCall(streamCall);
      } catch (err) {
        console.error("Failed to initialize meeting:", err);
        setError("Failed to connect to the meeting server. Please check your connection.");
      }
    };

    initMeeting();

    return () => {
      if (call) call.leave();
      if (client) client.disconnectUser();
    };
  }, [roomId]);

  const handleLeaveCall = () => {
    router.push('/');
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D1421] text-white p-6">
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-md text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Connection Error</h2>
          <p className="text-white/70 text-sm mb-6">{error}</p>
          <button 
            onClick={handleLeaveCall}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-semibold"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!client || !call) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D1421] text-white">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p className="text-white/60 font-medium">Connecting to secure room...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#0D1421]">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <StreamTheme className="h-full">
            <div className="flex flex-col h-full w-full">
              {/* Header / Room Info */}
              <div className="px-6 py-4 flex items-center justify-between bg-black/40 backdrop-blur-md absolute top-0 w-full z-10 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <h1 className="font-semibold text-white">Clinical Consultation</h1>
                  <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded-md hidden sm:inline-block">
                    Room: {roomId}
                  </span>
                </div>
              </div>

              {/* Main Call UI */}
              <div className="flex-1 pt-16 relative">
                <SpeakerLayout participantsBarPosition="bottom" />
              </div>

              {/* Call Controls */}
              <div className="p-4 bg-black/60 backdrop-blur-xl border-t border-white/10 relative z-20">
                <CallControls onLeave={handleLeaveCall} />
              </div>
            </div>
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    </div>
  );
}
