"use client";

import React from 'react';
import Image from 'next/image';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { SPECIALISTS } from '@/lib/bookingData';
import { Check, Star, ArrowRight, Award } from 'lucide-react';

export default function Step3Specialist() {
  const { specialistId, setSpecialist, nextStep } = useBookingStore();

  const handleSelect = (id: string) => {
    setSpecialist(id);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D1421] mb-2">Choose your Specialist</h2>
        <p className="text-[#8896A8]">Select a physiotherapist that best fits your needs and schedule.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {SPECIALISTS.map((specialist) => {
          const isSelected = specialistId === specialist.id;

          return (
            <div
              key={specialist.id}
              onClick={() => handleSelect(specialist.id)}
              className={`group relative flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                isSelected 
                  ? 'border-[#2563EB] shadow-[0_8px_30px_rgba(37,99,235,0.15)] ring-4 ring-[#2563EB]/10' 
                  : 'border-gray-100 shadow-sm hover:shadow-md hover:border-gray-300'
              }`}
            >
              <div className="relative w-full sm:w-40 h-48 sm:h-auto shrink-0 bg-gray-100">
                <Image
                  src={specialist.image}
                  alt={specialist.name}
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="p-5 flex flex-col flex-1 relative">
                {/* Selection Indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-transparent group-hover:border-gray-300 border border-transparent'
                }`}>
                  <Check className="w-4 h-4" />
                </div>

                <div className="pr-8 mb-2">
                  <h3 className="text-lg font-bold text-[#0D1421]">{specialist.name}</h3>
                  <p className="text-sm text-[#2563EB] font-medium">{specialist.title}</p>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-[#0D1421]">{specialist.rating}</span>
                  <span className="text-xs text-gray-500">({specialist.reviews} reviews)</span>
                </div>

                <div className="flex items-start gap-2 mb-4">
                  <Award className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 line-clamp-2">{specialist.qualifications}</p>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Experience</span>
                    <span className="text-sm font-semibold text-[#0D1421]">{specialist.experience} Years</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Starts at</span>
                    <span className="text-sm font-semibold text-[#2563EB]">₹{(specialist.pricing as any)?.initial || 1000}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex justify-end pt-6 border-t border-gray-100">
        <button
          onClick={nextStep}
          disabled={!specialistId}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-[#2563EB] disabled:shadow-none"
        >
          Select Appointment Type
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
