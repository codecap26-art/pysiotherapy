'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { db, DBAppointment, DBClinicalNote } from '@/lib/db';
import { 
  Calendar, Clock, MapPin, Activity, CheckCircle2, ArrowRight, PlusCircle, 
  FileText, TrendingUp, AlertCircle, Dumbbell, ShieldCheck, Heart, Sparkles 
} from 'lucide-react';

import { getAppointments } from '@/lib/supabaseService';

export default function PatientDashboardOverview() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [appointments, setAppointments] = useState<DBAppointment[]>([]);
  const [clinicalNotes, setClinicalNotes] = useState<DBClinicalNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'therapist') {
      router.push('/dashboard/therapist');
      return;
    } else if (user?.role === 'admin') {
      router.push('/admin');
      return;
    }

    const loadData = async () => {
      if (user) {
        const userNotes = db.getClinicalNotesByPatient(user.id);
        setClinicalNotes(userNotes);
        const userApts = await getAppointments(user.id);
        setAppointments(userApts);
      }
      setLoading(false);
    };

    loadData();
  }, [user, router]);

  const upcomingApt = appointments.find((a) => a.status === 'confirmed' || a.status === 'pending');
  const completedCount = appointments.filter((a) => a.status === 'completed').length;
  const latestNote = clinicalNotes[0];
  const recoveryProgress = latestNote?.recoveryProgress || 65;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#1E6FFF]/30 border-t-[#1E6FFF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E6FFF] via-[#2563EB] to-[#1D4ED8] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Patient Recovery Portal
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
            Welcome back, {user?.firstName || 'Patient'}!
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Your rehabilitation journey is <strong className="text-white">{recoveryProgress}% complete</strong>. Stay consistent with your daily home exercises.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-[#1E6FFF] font-bold text-xs shadow-md hover:bg-blue-50 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Book Follow-up Session</span>
            </Link>
            <Link
              href="/dashboard/medical-history"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white font-bold text-xs hover:bg-white/25 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Exercise Plan</span>
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial from-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border-2 border-[#E8ECF4] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-[#0D1421]">{recoveryProgress}%</div>
          <div className="text-xs font-semibold text-[#64748B] mt-0.5">Mobility Recovery</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border-2 border-[#E8ECF4] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1E6FFF] flex items-center justify-center mb-3">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-[#0D1421]">{completedCount}</div>
          <div className="text-xs font-semibold text-[#64748B] mt-0.5">Sessions Completed</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border-2 border-[#E8ECF4] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mb-3">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-[#0D1421]">
            {latestNote?.exercisesPrescribed?.length || 3}
          </div>
          <div className="text-xs font-semibold text-[#64748B] mt-0.5">Active Home Exercises</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border-2 border-[#E8ECF4] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Activity className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-[#0D1421]">
            {upcomingApt?.painLevel || 6}/10
          </div>
          <div className="text-xs font-semibold text-[#64748B] mt-0.5">VAS Pain Index</div>
        </div>
      </div>

      {/* Main Grid: Next Appointment & Exercises */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Appointment Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#E8ECF4] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#1E6FFF]" />
                <h2 className="text-lg font-bold text-[#0D1421]">Next Scheduled Session</h2>
              </div>
              {upcomingApt && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-[#1E6FFF]">
                  {upcomingApt.status.toUpperCase()}
                </span>
              )}
            </div>

            {upcomingApt ? (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-[#0D1421]">{upcomingApt.treatmentName}</h3>
                      <p className="text-xs text-[#1E6FFF] font-semibold">{upcomingApt.specialistName} • {upcomingApt.specialistTitle}</p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-slate-700 self-start sm:self-auto">
                      Ref: {upcomingApt.bookingRef}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#64748B]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#1E6FFF]" />
                      <span>{upcomingApt.date} at {upcomingApt.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#10B981]" />
                      <span className="truncate">{upcomingApt.clinicName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    href="/dashboard/appointments"
                    className="text-xs font-bold text-[#1E6FFF] hover:text-[#1558D6] flex items-center gap-1"
                  >
                    <span>Manage all appointments</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-[#64748B] mb-4">No upcoming appointments scheduled.</p>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E6FFF] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#1558D6]"
                >
                  <PlusCircle className="w-4 h-4" /> Book an Appointment
                </Link>
              </div>
            )}
          </div>

          {/* Prescribed Exercises Preview */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#E8ECF4] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-[#10B981]" />
                <h2 className="text-lg font-bold text-[#0D1421]">Prescribed Home Program</h2>
              </div>
              <Link
                href="/dashboard/medical-history"
                className="text-xs font-bold text-[#1E6FFF] hover:underline"
              >
                View Full Details
              </Link>
            </div>

            <div className="space-y-3">
              {(latestNote?.exercisesPrescribed || [
                { name: 'Cat-Camel Spine Mobilization', sets: '2 sets', reps: '10 reps', frequency: 'Twice daily', notes: 'Maintain fluid breathing' },
                { name: 'Bird Dog Core Activation', sets: '3 sets', reps: '8 reps per side', frequency: 'Daily', notes: 'Hold 3s at top' },
                { name: 'Glute Bridge with Band', sets: '3 sets', reps: '12 reps', frequency: 'Daily', notes: 'Squeeze glutes at top' },
              ]).map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-bold text-[#0D1421]">{ex.name}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">
                      {ex.sets} • {ex.reps} • {ex.frequency}
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Doctor Notes & Care Team */}
        <div className="space-y-6">
          {/* Doctor Consultation Summary */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#E8ECF4] shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1E6FFF]" />
              <h3 className="text-base font-bold text-[#0D1421]">Clinical Diagnosis</h3>
            </div>

            <div className="p-4 rounded-2xl bg-[#EFF5FF] border border-[#BFDBFE] text-xs space-y-2">
              <div className="font-bold text-[#1E6FFF]">
                {latestNote?.doctorName || 'Dr. Sarah Jenkins'}
              </div>
              <p className="text-[#0D1421] font-medium leading-relaxed">
                {latestNote?.diagnosis || 'Mild lumbar disc irritation without neurological deficit. Showing progressive improvement in range of motion.'}
              </p>
              <div className="text-[11px] text-[#64748B] pt-1">
                Last updated: {latestNote?.date || 'Jul 28, 2026'}
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Please avoid heavy deadlifts or prolonged slouching without lumbar roll.</span>
            </div>
          </div>

          {/* Need help support */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#E8ECF4] shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E6FFF] mx-auto flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-[#0D1421]">Need Clinical Support?</h4>
            <p className="text-xs text-[#64748B]">
              Have an urgent symptom flare-up or need to speak with your assigned therapist?
            </p>
            <a
              href="tel:+918041234567"
              className="inline-block w-full py-2.5 px-4 rounded-xl bg-[#0D1421] text-white text-xs font-bold hover:bg-slate-800 transition-all"
            >
              Call Clinic Desk: +91 80 4123 4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
