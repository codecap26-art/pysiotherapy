'use client';

import dynamic from 'next/dynamic';

const MeetingRoom = dynamic(() => import('./MeetingRoom'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen w-full bg-[#0D1421] text-white">
      <div className="animate-spin w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full" />
      <span className="ml-3 font-semibold">Loading Meeting Environment...</span>
    </div>
  )
});

export default function MeetingRoomWrapper({ roomId }: { roomId: string }) {
  return <MeetingRoom roomId={roomId} />;
}
