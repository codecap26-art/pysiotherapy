"use client";

import React from 'react';
import Image from 'next/image';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { TREATMENTS } from '@/lib/bookingData';
import { Clock, Activity, Target, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Step2TreatmentDetails() {
  const { treatmentId, nextStep } = useBookingStore();
  
  const treatment = TREATMENTS.find(t => t.id === treatmentId);

  if (!treatment) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-red-500 mb-4 font-medium">Missing booking details. Please restart your booking.</p>
        <button onClick={() => useBookingStore.getState().resetBooking()} className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700">
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Left Column: Image and Highlights */}
        <div className="space-y-6">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={treatment.image}
              alt={treatment.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-100 flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Duration</p>
                <p className="text-[#0D1421] font-medium">{treatment.duration}</p>
              </div>
            </div>
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-100 flex items-start gap-3">
              <Activity className="w-5 h-5 text-[#06B6D4] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Sessions</p>
                <p className="text-[#0D1421] font-medium">{treatment.sessions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col">
          <div className="inline-block px-3 py-1 bg-[#E0F2FE] text-[#2563EB] text-xs font-bold uppercase tracking-wider rounded-full self-start mb-4">
            Treatment Details
          </div>
          
          <h2 className="text-3xl font-bold text-[#0D1421] mb-4">{treatment.name}</h2>
          <p className="text-[#4A5568] text-lg leading-relaxed mb-8">
            {treatment.fullDesc}
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-[#0D1421] mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#06B6D4]" />
                Conditions Treated
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {treatment.conditions.map((condition, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[#4A5568]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    {condition}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0D1421] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#06B6D4]" />
                Expected Outcomes
              </h3>
              <ul className="space-y-2">
                {treatment.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#4A5568] bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
                    <span className="font-bold text-[#2563EB] shrink-0">{idx + 1}.</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex justify-end pt-6 border-t border-gray-100">
        <button
          onClick={nextStep}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] hover:-translate-y-0.5 transition-all"
        >
          Choose a Specialist
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
