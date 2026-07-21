"use client";

import React from 'react';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { TREATMENTS, SPECIALISTS } from '@/lib/bookingData';
import { Stethoscope, Repeat, Home, Video, AlertCircle, Check, ArrowRight } from 'lucide-react';

const APPOINTMENT_TYPES = [
  { id: 'initial', label: 'Initial Assessment', icon: Stethoscope, desc: 'Comprehensive first-time evaluation and treatment plan.' },
  { id: 'followup', label: 'Follow-up Session', icon: Repeat, desc: 'Standard treatment session for ongoing recovery.' },
  { id: 'home', label: 'Home Visit', icon: Home, desc: 'Our specialist travels to your residence.' },
  { id: 'online', label: 'Online Consultation', icon: Video, desc: 'Secure video call for advice and guided exercises.' },
  { id: 'emergency', label: 'Emergency Consult', icon: AlertCircle, desc: 'Priority booking for acute pain or recent injury.' },
];

export default function Step4Type() {
  const { treatmentId, specialistId, appointmentType, setAppointmentType, nextStep } = useBookingStore();
  
  const treatment = TREATMENTS.find(t => t.id === treatmentId);
  const specialist = SPECIALISTS.find(s => s.id === specialistId);

  if (!treatment || !specialist) {
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
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D1421] mb-2">Select Appointment Type</h2>
        <p className="text-[#8896A8]">Pricing is customized based on your selected specialist ({specialist.name}).</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {APPOINTMENT_TYPES.map((type) => {
          const isSelected = appointmentType === type.id;
          const Icon = type.icon;
          // @ts-ignore
          const price = ((specialist.pricing as any)?.[type.id] || treatment.startingPrice) as number;

          return (
            <div
              key={type.id}
              onClick={() => setAppointmentType(type.id as any)}
              className={`group relative flex flex-col p-5 bg-white rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                isSelected 
                  ? 'border-[#2563EB] shadow-[0_8px_30px_rgba(37,99,235,0.15)] ring-4 ring-[#2563EB]/10' 
                  : 'border-gray-100 shadow-sm hover:shadow-md hover:border-[#2563EB]/50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${isSelected ? 'bg-[#2563EB] text-white' : 'bg-[#F8FAFC] text-[#2563EB]'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-transparent border border-gray-200'
                }`}>
                  <Check className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#0D1421] mb-1">{type.label}</h3>
              <p className="text-xs text-[#8896A8] mb-4 flex-1">{type.desc}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fee</span>
                <span className="text-lg font-bold text-[#06B6D4]">₹{price}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex justify-end pt-6 border-t border-gray-100">
        <button
          onClick={nextStep}
          disabled={!appointmentType}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-[#2563EB] disabled:shadow-none"
        >
          Choose Date & Time
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
