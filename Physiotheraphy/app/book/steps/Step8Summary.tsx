"use client";

import React from 'react';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { TREATMENTS, SPECIALISTS } from '@/lib/bookingData';
import { ArrowRight, Receipt, PlusCircle, MinusCircle, ShieldCheck } from 'lucide-react';

export default function Step8Summary() {
  const { treatmentId, specialistId, appointmentType, nextStep } = useBookingStore();
  
  const treatment = TREATMENTS.find(t => t.id === treatmentId);
  const specialist = SPECIALISTS.find(s => s.id === specialistId);

  if (!treatment || !specialist || !appointmentType) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-red-500 mb-4 font-medium">Missing booking details. Please restart your booking.</p>
        <button onClick={() => useBookingStore.getState().resetBooking()} className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700">
          Start Over
        </button>
      </div>
    );
  }

  // @ts-ignore
  const basePrice = ((specialist.pricing as any)?.[appointmentType] || treatment.startingPrice) as number;
  const taxes = Math.round(basePrice * 0.18); // 18% GST mock
  const total = basePrice + taxes;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D1421] mb-2">Price Summary</h2>
        <p className="text-[#8896A8]">Transparent pricing with no hidden costs.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden mb-8">
        <div className="bg-[#F8FAFC] p-6 border-b border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#E0F2FE] flex items-center justify-center">
            <Receipt className="w-6 h-6 text-[#2563EB]" />
          </div>
          <div>
            <h3 className="font-bold text-[#0D1421] text-lg">Itemized Breakdown</h3>
            <p className="text-sm text-gray-500">Booking Reference: #{Math.floor(Math.random() * 1000000)}</p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-center pb-6 border-b border-gray-100">
            <div>
              <p className="font-bold text-[#0D1421]">{treatment.name}</p>
              <p className="text-sm text-gray-500 capitalize">{appointmentType} Appointment</p>
            </div>
            <span className="font-semibold text-[#0D1421]">₹{basePrice}</span>
          </div>

          <div className="flex justify-between items-center pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-gray-400" />
              <p className="text-[#4A5568]">Taxes & Fees (18% GST)</p>
            </div>
            <span className="font-semibold text-[#0D1421]">₹{taxes}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="text-xl font-bold text-[#0D1421]">Grand Total</p>
              <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3 h-3" />
                Secure Payment
              </p>
            </div>
            <span className="text-3xl font-black text-[#2563EB]">₹{total}</span>
          </div>
        </div>
      </div>

      <div className="mt-auto flex justify-end pt-6">
        <button
          onClick={nextStep}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] hover:-translate-y-0.5 transition-all w-full md:w-auto justify-center"
        >
          Review Booking
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
