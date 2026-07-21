"use client";

import React from 'react';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { TREATMENTS, SPECIALISTS } from '@/lib/bookingData';
import { ArrowRight, Edit2, Calendar, User, FileText, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function Step9Review() {
  const { 
    treatmentId, specialistId, appointmentType, 
    date, timeSlot, patientInfo, medicalInfo, 
    setStep, nextStep 
  } = useBookingStore();
  
  const treatment = TREATMENTS.find(t => t.id === treatmentId);
  const specialist = SPECIALISTS.find(s => s.id === specialistId);

  if (!treatment || !specialist || !patientInfo || !medicalInfo) {
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
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D1421] mb-2">Review Your Booking</h2>
        <p className="text-[#8896A8]">Please double-check your details before proceeding to payment.</p>
      </div>

      <div className="space-y-6 mb-12 flex-1 overflow-y-auto pr-2">
        
        {/* Appointment Details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-[#0D1421] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#2563EB]" />
              Appointment Details
            </h3>
            <button onClick={() => setStep(1)} className="text-sm font-medium text-[#2563EB] hover:underline flex items-center gap-1">
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div>
              <span className="text-gray-500 block mb-1">Treatment</span>
              <span className="font-semibold text-gray-900">{treatment.name}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Specialist</span>
              <span className="font-semibold text-gray-900">{specialist.name}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Date & Time</span>
              <span className="font-semibold text-gray-900">
                {date ? format(new Date(date), 'MMMM d, yyyy') : ''} at {timeSlot}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Type</span>
              <span className="font-semibold text-gray-900 capitalize">{appointmentType}</span>
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-[#0D1421] flex items-center gap-2">
              <User className="w-5 h-5 text-[#06B6D4]" />
              Patient Information
            </h3>
            <button onClick={() => setStep(6)} className="text-sm font-medium text-[#2563EB] hover:underline flex items-center gap-1">
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div>
              <span className="text-gray-500 block mb-1">Name</span>
              <span className="font-semibold text-gray-900">{patientInfo.firstName} {patientInfo.lastName}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Contact</span>
              <span className="font-semibold text-gray-900">{patientInfo.phone}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-gray-500 block mb-1">Address</span>
              <span className="font-semibold text-gray-900">{patientInfo.address}</span>
            </div>
          </div>
        </div>

        {/* Medical Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-[#0D1421] flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              Medical Summary
            </h3>
            <button onClick={() => setStep(7)} className="text-sm font-medium text-[#2563EB] hover:underline flex items-center gap-1">
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-gray-500 block mb-1">Primary Complaint</span>
              <span className="font-semibold text-gray-900">{medicalInfo.primaryComplaint}</span>
            </div>
            <div className="flex gap-8">
              <div>
                <span className="text-gray-500 block mb-1">Pain Area</span>
                <span className="font-semibold text-gray-900">{medicalInfo.painArea}</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Pain Level</span>
                <span className="font-bold text-orange-500">{medicalInfo.painLevel}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex justify-end pt-6 border-t border-gray-100">
        <button
          onClick={nextStep}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] hover:-translate-y-0.5 transition-all"
        >
          Proceed to Payment
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
