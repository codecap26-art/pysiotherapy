'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { Sun, CloudSun, Moon, Clock, Check } from 'lucide-react';

const TIME_PERIODS = [
  {
    title: 'Morning Slots',
    range: '8:00 AM – 12:00 PM',
    icon: Sun,
    color: 'text-amber-500 bg-amber-50',
    slots: ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '11:30 AM'],
  },
  {
    title: 'Afternoon Slots',
    range: '12:00 PM – 4:00 PM',
    icon: CloudSun,
    color: 'text-sky-500 bg-sky-50',
    slots: ['12:30 PM', '01:30 PM', '02:00 PM', '03:00 PM', '03:30 PM'],
  },
  {
    title: 'Evening Slots',
    range: '4:00 PM – 8:00 PM',
    icon: Moon,
    color: 'text-indigo-500 bg-indigo-50',
    slots: ['04:30 PM', '05:00 PM', '06:00 PM', '07:00 PM', '07:30 PM'],
  },
];

export default function Step6TimeSlot() {
  const { timeSlot: selectedSlot, setTimeSlot, date, specialistId } = useBookingStore();
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date || !specialistId) return;

    const fetchAvailability = async () => {
      try {
        const res = await fetch(`/api/appointments/availability?date=${date}&specialistId=${specialistId}`);
        const data = await res.json();
        if (data.success && data.bookedSlots) {
          setBookedSlots(data.bookedSlots);
          // If selected slot just got booked by someone else, reset selection
          if (selectedSlot && data.bookedSlots.includes(selectedSlot)) {
            setTimeSlot('');
          }
        }
      } catch (err) {
        console.error('Failed to fetch availability:', err);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchAvailability();

    // Poll every 5 seconds for real-time updates
    const interval = setInterval(fetchAvailability, 5000);
    return () => clearInterval(interval);
  }, [date, specialistId, selectedSlot, setTimeSlot]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6"
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#1E6FFF] bg-[#EFF5FF] px-3 py-1 rounded-full">
          Step 6 of 8
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0D1421] mt-3">
          Select Appointment Time
        </h2>
        <p className="text-[#64748B] text-sm mt-1">
          {date ? `Available clinical consultation slots for ${date}.` : 'Choose a time slot for your session.'}
        </p>
      </div>

      <div className="space-y-6">
        {TIME_PERIODS.map((period) => {
          const Icon = period.icon;

          return (
            <div
              key={period.title}
              className="bg-white p-6 rounded-3xl border-2 border-[#E8ECF4] shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${period.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0D1421]">{period.title}</h3>
                  <p className="text-xs text-[#8896A8]">{period.range}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {period.slots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  const isBooked = bookedSlots.includes(slot);

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isBooked}
                      onClick={() => !isBooked && setTimeSlot(slot)}
                      className={`group py-3 px-4 rounded-2xl flex items-center justify-center gap-2 border-2 font-bold text-xs sm:text-sm transition-all duration-200 ${
                        isBooked
                          ? 'bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                          : isSelected
                          ? 'bg-[#1E6FFF] border-[#1E6FFF] text-white shadow-[0_4px_16px_rgba(30,111,255,0.3)] cursor-pointer'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#1E6FFF]/50 hover:bg-white text-[#0D1421] cursor-pointer'
                      }`}
                    >
                      <Clock className={`w-4 h-4 ${isSelected ? 'text-white' : isBooked ? 'text-gray-300' : 'text-[#8896A8]'}`} />
                      <span className={isBooked ? 'line-through' : ''}>{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
