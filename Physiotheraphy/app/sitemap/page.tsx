import React from 'react';
import Link from 'next/link';

export default function SitemapPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-[#0D1421] mb-4">Sitemap</h1>
      <p className="text-[#4A5568] max-w-md mb-8">
        Navigate to any section of Healing Motion Physiotherapy.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="text-[#1E6FFF] hover:underline">Home</Link>
        <Link href="/treatments" className="text-[#1E6FFF] hover:underline">Treatments</Link>
        <Link href="/specialists" className="text-[#1E6FFF] hover:underline">Specialists</Link>
        <Link href="/recovery-timeline" className="text-[#1E6FFF] hover:underline">Recovery Timeline</Link>
        <Link href="/faqs" className="text-[#1E6FFF] hover:underline">FAQs</Link>
        <Link href="/book" className="text-[#1E6FFF] hover:underline">Book Appointment</Link>
      </div>
    </div>
  );
}
