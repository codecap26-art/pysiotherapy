"use client";

import React, { useState } from 'react';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { format, addDays, isSameDay } from 'date-fns';
import { ArrowRight, Sun, Sunset, Moon, CalendarDays } from 'lucide-react';

const generateNext14Days = () => {
  const dates = [];
  for (let i = 1; i <= 14; i++) {
    // Skip Sundays (0) for demo
    const date = addDays(new Date(), i);
    if (date.getDay() !== 0) {
      dates.push(date);
    }
  }
  return dates;
};

const MOCK_SLOTS = {
  morning: ['09:00 AM', '10:00 AM', '11:00 AM'],
  afternoon: ['12:30 PM', '02:00 PM', '03:30 PM'],
  evening: ['05:00 PM', '06:00 PM', '07:30 PM'],
};

export default function Step5DateTime() {
  const { date, timeSlot, setDateTime, nextStep } = useBookingStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(date ? new Date(date) : null);
  const [selectedTime, setSelectedTime] = useState<string | null>(timeSlot);

  const availableDates = React.useMemo(() => generateNext14Days(), []);

  const handleDateSelect = (d: Date) => {
    setSelectedDate(d);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (t: string) => {
    setSelectedTime(t);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setDateTime(selectedDate.toISOString(), selectedTime);
      nextStep();
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D1421] mb-2">Select Date & Time</h2>
        <p className="text-[#8896A8]">Choose an available slot that works for you.</p>
      </div>

      {/* Date Selector */}
      <div className="mb-10">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          Available Dates
        </h3>
        
        <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar snap-x">
          {availableDates.map((d, idx) => {
            const isSelected = selectedDate ? isSameDay(selectedDate, d) : false;
            
            return (
              <button
                key={idx}
                onClick={() => handleDateSelect(d)}
                className={`snap-start shrink-0 flex flex-col items-center justify-center w-20 h-24 rounded-2xl border-2 transition-all duration-300 ${
                  isSelected 
                    ? 'border-[#2563EB] bg-[#2563EB] text-white shadow-[0_8px_20px_rgba(37,99,235,0.2)]' 
                    : 'border-gray-100 bg-white text-[#0D1421] hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                <span className={`text-xs font-semibold uppercase ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                  {format(d, 'EEE')}
                </span>
                <span className="text-2xl font-bold mt-1 mb-0.5">{format(d, 'd')}</span>
                <span className={`text-[10px] font-medium ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                  {format(d, 'MMM')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate ? (
        <div className="space-y-6 mb-12 animate-in slide-in-from-bottom-4 duration-500">
          {/* Morning */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              Morning
            </h3>
            <div className="flex flex-wrap gap-3">
              {MOCK_SLOTS.morning.map(t => (
                <button
                  key={t}
                  onClick={() => handleTimeSelect(t)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-300 ${
                    selectedTime === t
                      ? 'border-[#06B6D4] bg-[#06B6D4] text-white shadow-[0_4px_15px_rgba(6,182,212,0.3)]'
                      : 'border-gray-100 bg-white text-[#0D1421] hover:border-[#06B6D4]/30'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Afternoon */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sun className="w-4 h-4 text-orange-500" />
              Afternoon
            </h3>
            <div className="flex flex-wrap gap-3">
              {MOCK_SLOTS.afternoon.map(t => (
                <button
                  key={t}
                  onClick={() => handleTimeSelect(t)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-300 ${
                    selectedTime === t
                      ? 'border-[#06B6D4] bg-[#06B6D4] text-white shadow-[0_4px_15px_rgba(6,182,212,0.3)]'
                      : 'border-gray-100 bg-white text-[#0D1421] hover:border-[#06B6D4]/30'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Evening */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-500" />
              Evening
            </h3>
            <div className="flex flex-wrap gap-3">
              {MOCK_SLOTS.evening.map(t => (
                <button
                  key={t}
                  onClick={() => handleTimeSelect(t)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-300 ${
                    selectedTime === t
                      ? 'border-[#06B6D4] bg-[#06B6D4] text-white shadow-[0_4px_15px_rgba(6,182,212,0.3)]'
                      : 'border-gray-100 bg-white text-[#0D1421] hover:border-[#06B6D4]/30'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mb-12">
          <CalendarDays className="w-10 h-10 text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">Please select a date to view available time slots.</p>
        </div>
      )}

      <div className="mt-auto flex justify-end pt-6 border-t border-gray-100">
        <button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-[#2563EB] disabled:shadow-none"
        >
          Enter Patient Details
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
