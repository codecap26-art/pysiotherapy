'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { formatPrice } from '@/lib/bookingData';
import { getTreatmentById } from '@/lib/services/treatmentService';
import { getSpecialistById } from '@/lib/services/specialistService';
import { getClinicById } from '@/lib/services/clinicService';
import { 
  Calendar, Clock, MapPin, Stethoscope, Activity, ShieldCheck, CheckCircle2, Loader2, AlertCircle, LogIn 
} from 'lucide-react';

export default function Step8Summary() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { 
    treatmentId, specialistId, clinicId, date, timeSlot,
    painLevel, painDuration, reasonForVisit, appointmentType,
    confirmBooking 
  } = useBookingStore();

  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [treatment, setTreatment] = useState<any>(null);
  const [specialist, setSpecialist] = useState<any>(null);
  const [clinic, setClinic] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      if (treatmentId && specialistId && clinicId) {
        const [t, s, c] = await Promise.all([
          getTreatmentById(treatmentId),
          getSpecialistById(specialistId),
          getClinicById(clinicId)
        ]);
        setTreatment(t);
        setSpecialist(s);
        setClinic(c);
      }
      setDataLoading(false);
    }
    loadData();
  }, [treatmentId, specialistId, clinicId]);

  if (dataLoading) {
    return <div className="p-8 text-center text-slate-500">Loading summary...</div>;
  }

  const fee = treatment?.base_fee || 1500;
  const tax = Math.round(fee * 0.18);
  const totalAmount = fee + tax;

  const handleConfirm = async () => {
    if (!agreeTerms) return;

    if (!user) {
      // Redirect to login with a return URL to continue booking
      router.push('/auth/login?redirect=/book');
      return;
    }

    setLoading(true);

    try {
      const newBooking = await confirmBooking(user);
      if (newBooking) {
        router.push(`/book/success?id=${newBooking.id}`);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6"
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#1E6FFF] bg-[#EFF5FF] px-3 py-1 rounded-full">
          Step 8 of 8
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0D1421] mt-3">
          Review & Confirm Appointment
        </h2>
        <p className="text-[#64748B] text-sm mt-1">
          Review your clinical schedule details below. No advance payment needed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Treatment & Specialist */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#E8ECF4] shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#0D1421] flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#1E6FFF]" />
              Clinical Consultation Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="text-[11px] font-bold text-[#8896A8] uppercase tracking-wider">Treatment</div>
                <div className="text-base font-bold text-[#0D1421] mt-1">{treatment?.name || 'Physiotherapy'}</div>
                <div className="text-xs text-[#1E6FFF] font-medium mt-0.5">45 mins duration</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="text-[11px] font-bold text-[#8896A8] uppercase tracking-wider">Assigned Therapist</div>
                <div className="text-base font-bold text-[#0D1421] mt-1">{specialist?.full_name || 'Specialist'}</div>
                <div className="text-xs text-[#64748B] font-medium mt-0.5">{specialist?.title || 'Physiotherapist'}</div>
              </div>
            </div>

            {/* Clinic & Timing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="text-[11px] font-bold text-[#8896A8] uppercase tracking-wider">Clinic Branch</div>
                <div className="text-sm font-bold text-[#0D1421] mt-1">{clinic?.name}</div>
                <div className="text-xs text-[#64748B] mt-0.5">{clinic?.address}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="text-[11px] font-bold text-[#8896A8] uppercase tracking-wider">Schedule & Date</div>
                <div className="text-sm font-bold text-[#0D1421] mt-1">{date}</div>
                <div className="text-xs text-[#10B981] font-semibold mt-0.5">{timeSlot} ({appointmentType})</div>
              </div>
            </div>

            {/* Symptoms summary */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-[#64748B] space-y-1">
              <div className="font-bold text-[#0D1421] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Pain Assessment Summary
              </div>
              <p>
                <strong>Pain Severity:</strong> {painLevel}/10 • <strong>Duration:</strong> {painDuration}
              </p>
              {reasonForVisit && (
                <p>
                  <strong>Primary Concern:</strong> {reasonForVisit}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Price Breakdown & Confirmation */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border-2 border-[#E8ECF4] shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#0D1421]">Payment & Fee Summary</h3>

            <div className="space-y-2.5 text-xs text-[#64748B] border-b border-gray-100 pb-4">
              <div className="flex justify-between">
                <span>Clinical Consultation Fee</span>
                <span className="font-bold text-[#0D1421]">{formatPrice(fee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Healthcare GST (18%)</span>
                <span className="font-bold text-[#0D1421]">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-[#10B981] font-semibold">
                <span>Online Booking Discount</span>
                <span>FREE (₹0)</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-base font-extrabold text-[#0D1421]">
              <span>Total Payable at Clinic</span>
              <span className="text-xl text-[#1E6FFF]">{formatPrice(totalAmount)}</span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero cancellation fee up to 2 hours before session.</span>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-[#64748B] cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#1E6FFF] focus:ring-[#1E6FFF]"
              />
              <span>I confirm the appointment details and agree to Healing Motion clinic policies.</span>
            </label>

            {!user && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>You must be logged in to confirm your appointment.</span>
              </div>
            )}

            <button
              onClick={handleConfirm}
              disabled={loading || !agreeTerms || dataLoading}
              className="w-full py-4 px-6 rounded-2xl bg-[#1E6FFF] text-white font-bold text-sm shadow-[0_4px_16px_rgba(30,111,255,0.3)] hover:bg-[#1558D6] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{user ? 'Confirming Booking...' : 'Redirecting...'}</span>
                </>
              ) : !user ? (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login or Register to Confirm</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm Appointment</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
