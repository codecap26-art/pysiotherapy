import { Metadata } from 'next';
import React from 'react';
import MeetingRoomWrapper from '@/components/online-meet/MeetingRoomWrapper';

export const metadata: Metadata = {
  title: 'Online Consultation | Healing Motion',
  description: 'Join your secure video consultation.',
};

export default async function MeetPage({ params }: { params: { roomId: string } }) {
  const resolvedParams = await params;

  return (
    <main className="min-h-screen bg-[#0D1421]">
      <MeetingRoomWrapper roomId={resolvedParams.roomId} />
    </main>
  );
}
