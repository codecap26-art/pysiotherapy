"use client";

import React from 'react';
import Image from 'next/image';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { TREATMENTS } from '@/lib/bookingData';
import { Check, ArrowRight } from 'lucide-react';

export default function Step1Treatment() {
  const { treatmentId, setTreatment, nextStep } = useBookingStore();

  const handleSelect = (id: string) => {
    setTreatment(id);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D1421] mb-2">What would you like us to treat?</h2>
        <p className="text-[#8896A8]">Select a treatment area to proceed with your booking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {TREATMENTS.map((treatment) => {
          const isSelected = treatmentId === treatment.id;

          return (
            <div
              key={treatment.id}
              onClick={() => handleSelect(treatment.id)}
              className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                isSelected 
                  ? 'border-[#2563EB] shadow-[0_8px_30px_rgba(37,99,235,0.15)] ring-4 ring-[#2563EB]/10' 
                  : 'border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-gray-200'
              }`}
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={treatment.image}
                  alt={treatment.name}
                  fill
                  className={`object-cover transition-transform duration-500 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                
                {/* Selection Indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-[#2563EB] text-white' : 'bg-white/30 backdrop-blur-sm border border-white/50 text-transparent'
                }`}>
                  <Check className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg leading-tight">{treatment.name}</h3>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-sm text-[#4A5568] line-clamp-2 mb-4">
                  {treatment.shortDesc}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Starting at</span>
                    <span className="text-[#0D1421] font-bold">₹{treatment.startingPrice}</span>
                  </div>
                  <span className="text-[#06B6D4] text-sm font-semibold">{treatment.duration}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex justify-end pt-6 border-t border-gray-100">
        <button
          onClick={nextStep}
          disabled={!treatmentId}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-[#2563EB] disabled:shadow-none"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
