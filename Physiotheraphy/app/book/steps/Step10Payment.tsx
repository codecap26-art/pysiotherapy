"use client";

import React, { useState } from 'react';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { TREATMENTS, SPECIALISTS } from '@/lib/bookingData';
import { ArrowRight, Lock, CreditCard, CheckCircle, CalendarDays, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Step10Payment() {
  const { treatmentId, specialistId, appointmentType, date, timeSlot, resetBooking } = useBookingStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const treatment = TREATMENTS.find(t => t.id === treatmentId);
  const specialist = SPECIALISTS.find(s => s.id === specialistId);

  if (!treatment || !specialist || !appointmentType) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-red-500 mb-4 font-medium">Missing booking details. Please restart your booking.</p>
        <button onClick={resetBooking} className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700">
          Start Over
        </button>
      </div>
    );
  }

  // @ts-ignore
  const basePrice = (specialist.pricing?.[appointmentType] || treatment.startingPrice) as number;
  const total = basePrice + Math.round(basePrice * 0.18);

  const handlePayment = () => {
    setIsProcessing(true);
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full animate-in zoom-in-95 duration-500 text-center py-10">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-12 h-12" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-[#0D1421] mb-2">Booking Confirmed!</h2>
        <p className="text-[#8896A8] mb-8 max-w-md">
          Your appointment for {treatment.name} with {specialist.name} has been successfully booked.
        </p>

        <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-6 w-full max-w-md text-left mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Booking ID</span>
            <span className="font-bold text-[#0D1421]">#PHY-{Math.floor(Math.random() * 1000000)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <CalendarDays className="w-4 h-4" /> Date & Time
            </span>
            <span className="font-bold text-[#0D1421]">
              {date ? format(new Date(date), 'MMM d') : ''}, {timeSlot}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Location
            </span>
            <span className="font-bold text-[#0D1421]">
              {appointmentType === 'home' ? 'Your Residence' : appointmentType === 'online' ? 'Video Call' : 'Main Clinic'}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Link 
            href="/dashboard/patient"
            onClick={resetBooking}
            className="px-6 py-3 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1D4ED8] transition-colors"
          >
            Go to Dashboard
          </Link>
          <button 
            onClick={resetBooking}
            className="px-6 py-3 bg-white text-[#2563EB] border border-[#2563EB] font-semibold rounded-xl hover:bg-blue-50 transition-colors"
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-md mx-auto w-full">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D1421] mb-2">Secure Payment</h2>
        <p className="text-[#8896A8]">Complete your booking of <span className="font-bold text-gray-800">₹{total}</span></p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 space-y-6">
        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-[#2563EB]" />
            <span className="font-semibold text-blue-900">Credit / Debit Card</span>
          </div>
          <div className="w-4 h-4 rounded-full border-[5px] border-[#2563EB] bg-white" />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Card Number</label>
            <input 
              type="text" 
              placeholder="4111 1111 1111 1111"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB] outline-none focus:ring-2 focus:ring-opacity-20 transition-all font-mono"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Expiry</label>
              <input 
                type="text" 
                placeholder="MM/YY"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB] outline-none focus:ring-2 focus:ring-opacity-20 transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">CVV</label>
              <input 
                type="password" 
                placeholder="•••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB] outline-none focus:ring-2 focus:ring-opacity-20 transition-all font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Cardholder Name</label>
            <input 
              type="text" 
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB] outline-none focus:ring-2 focus:ring-opacity-20 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
          <Lock className="w-3 h-3 text-green-600" />
          Payments are secure and encrypted.
        </div>
      </div>

      <div className="mt-auto">
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="flex items-center justify-center gap-2 w-full py-4 bg-[#2563EB] text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Pay ₹{total} & Confirm
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
