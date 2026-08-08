'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function Step5Date() {
  const { date: selectedDate, setDate } = useBookingStore();

  // Generate next 21 days from today
  const today = new Date();
  const days = Array.from({ length: 21 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const dateString = d.toISOString().split('T')[0];
    const isSunday = d.getDay() === 0;
    return {
      dateObj: d,
      dateString,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      isSunday,
      isToday: i === 0,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6"
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#1E6FFF] bg-[#EFF5FF] px-3 py-1 rounded-full">
          Step 5 of 8
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0D1421] mt-3">
          Select Appointment Date
        </h2>
        <p className="text-[#64748B] text-sm mt-1">
          Pick your preferred day for the initial clinical consultation and physical assessment.
        </p>
      </div>

      {/* Date Grid */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#E8ECF4] shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#1E6FFF]" />
            <span className="text-base font-bold text-[#0D1421]">Available Clinical Slots</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-[#10B981]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Available
            </div>
            <div className="flex items-center gap-1.5 text-[#94A3B8]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" /> Sunday Limited
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {days.map((d) => {
            const isSelected = selectedDate === d.dateString;

            return (
              <button
                key={d.dateString}
                type="button"
                onClick={() => setDate(d.dateString)}
                className={`group relative p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 border-2 text-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E6FFF] border-[#1E6FFF] text-white shadow-[0_8px_20px_rgba(30,111,255,0.3)] scale-105'
                    : 'bg-white border-[#E8ECF4] hover:border-[#1E6FFF]/50 hover:bg-[#F8FAFC] text-[#0D1421]'
                }`}
              >
                {d.isToday && (
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full mb-1 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-[#1E6FFF]'
                    }`}
                  >
                    Today
                  </span>
                )}
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isSelected ? 'text-white/80' : 'text-[#64748B]'
                  }`}
                >
                  {d.dayName}
                </span>
                <span
                  className={`text-2xl font-black my-1 ${
                    isSelected ? 'text-white' : 'text-[#0D1421]'
                  }`}
                >
                  {d.dayNumber}
                </span>
                <span
                  className={`text-[11px] font-medium ${
                    isSelected ? 'text-white/80' : 'text-[#8896A8]'
                  }`}
                >
                  {d.monthName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
