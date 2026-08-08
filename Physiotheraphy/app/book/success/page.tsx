'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { db, DBAppointment } from '@/lib/db';
import { 
  CheckCircle, Calendar, Clock, MapPin, Stethoscope, ArrowRight, Home, Download, ShieldCheck, Activity 
} from 'lucide-react';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('id');
  const [appointment, setAppointment] = useState<DBAppointment | null>(null);

  useEffect(() => {
    if (appointmentId) {
      const found = db.getAppointmentById(appointmentId);
      if (found) setAppointment(found);
    } else {
      const all = db.getAppointments();
      if (all.length > 0) setAppointment(all[0]);
    }
  }, [appointmentId]);

  return (
    <div className="min-h-screen bg-[#FAFBFF] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border-2 border-[#E8ECF4] p-6 sm:p-10 shadow-lg text-center"
        >
          {/* Green Check Icon */}
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 border-2 border-emerald-200 mx-auto flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
            <CheckCircle className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#10B981] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Booking Confirmed
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-[#0D1421] mt-3 mb-2">
            You&apos;re All Set for Recovery!
          </h1>
          <p className="text-sm text-[#64748B] max-w-md mx-auto mb-6">
            Your appointment has been registered with Healing Motion. A confirmation message with clinical directions has been sent.
          </p>

          {/* Reference Card */}
          {appointment && (
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-left space-y-4 mb-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div>
                  <div className="text-[11px] font-bold text-[#8896A8] uppercase tracking-wider">Booking Reference</div>
                  <div className="text-base font-black text-[#1E6FFF]">{appointment.bookingRef}</div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  {appointment.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[#8896A8] font-medium">Treatment</div>
                  <div className="font-bold text-[#0D1421] mt-0.5">{appointment.treatmentName}</div>
                </div>
                <div>
                  <div className="text-[#8896A8] font-medium">Doctor</div>
                  <div className="font-bold text-[#0D1421] mt-0.5">{appointment.specialistName}</div>
                </div>
                <div>
                  <div className="text-[#8896A8] font-medium">Date & Time</div>
                  <div className="font-bold text-[#0D1421] mt-0.5">{appointment.date} at {appointment.timeSlot}</div>
                </div>
                <div>
                  <div className="text-[#8896A8] font-medium">Clinic Centre</div>
                  <div className="font-bold text-[#0D1421] mt-0.5">{appointment.clinicName}</div>
                </div>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard/appointments"
              className="py-3.5 px-6 rounded-2xl bg-[#1E6FFF] text-white font-bold text-sm shadow-md hover:bg-[#1558D6] transition-all flex items-center justify-center gap-2"
            >
              <span>View in Patient Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/book"
              className="py-3.5 px-6 rounded-2xl bg-white border-2 border-[#E8ECF4] text-[#0D1421] font-bold text-sm hover:border-[#1E6FFF] hover:text-[#1E6FFF] transition-all flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4" />
              <span>Book Another Session</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFBFF] flex items-center justify-center">Loading booking confirmation...</div>}>
      <BookingSuccessContent />
    </Suspense>
  );
}
