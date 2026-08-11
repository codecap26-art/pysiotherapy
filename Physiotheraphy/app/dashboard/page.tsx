'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { DBAppointment, DBClinicalNote } from '@/lib/db';
import { getAuthHeaders } from '@/lib/authHeaders';
import { getAppointments } from '@/lib/supabaseService';
import { 
  Calendar, Clock, MapPin, Activity, CheckCircle2, ArrowRight, PlusCircle, 
  FileText, TrendingUp, AlertCircle, Dumbbell, ShieldCheck, Heart, Sparkles 
} from 'lucide-react';

export default function PatientDashboardOverview() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [appointments, setAppointments] = useState<DBAppointment[]>([]);
  const [clinicalNotes, setClinicalNotes] = useState<DBClinicalNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'therapist' || user?.role === 'doctor') {
      router.push('/dashboard/therapist');
      return;
    } else if (user?.role === 'admin') {
      router.push('/admin');
      return;
    }

    const loadData = async () => {
      if (user) {
        // Fetch clinical notes from server API with auth token
        try {
          const notesRes = await fetch('/api/medical-notes', {
            headers: getAuthHeaders(),
          });
          if (notesRes.ok) {
            const notesJson = await notesRes.json();
            if (notesJson.success && Array.isArray(notesJson.notes)) {
              setClinicalNotes(notesJson.notes);
            }
          }
        } catch (err) {
          console.error('Failed to fetch clinical notes:', err);
        }

        // Fetch appointments from server API with auth token
        try {
          const aptsRes = await fetch('/api/appointments', {
            headers: getAuthHeaders(),
          });
          if (aptsRes.ok) {
            const aptsJson = await aptsRes.json();
            if (aptsJson.success && Array.isArray(aptsJson.appointments)) {
              setAppointments(aptsJson.appointments);
            }
          }
        } catch {
          // fallback to supabaseService which also tries the API
          const userApts = await getAppointments(user.id);
          setAppointments(userApts);
        }
      }
      setLoading(false);
    };

    loadData();
  }, [user, router]);

  const upcomingApt = appointments.find((a) => a.status === 'confirmed' || a.status === 'pending');
  const completedCount = appointments.filter((a) => a.status === 'completed').length;
  const latestNote = clinicalNotes[0];
  const recoveryProgress = latestNote?.recoveryProgress ?? null;
  const prescribedExercises = latestNote?.exercisesPrescribed || [];

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

                <div className="flex items-center justify-between pt-2 mt-4 border-t border-gray-100 pt-4">
                  <Link
                    href={`/meet/${upcomingApt.id}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#1E6FFF] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#1558D6] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
                    Join Video Call
                  </Link>

                  <Link
                    href="/dashboard/appointments"
                    className="text-xs font-bold text-[#1E6FFF] hover:text-[#1558D6] flex items-center gap-1"
                  >
                    <span>Manage all</span>
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
              {prescribedExercises.length > 0 && (
                <Link
                  href="/dashboard/medical-history"
                  className="text-xs font-bold text-[#1E6FFF] hover:underline"
                >
                  View Full Details
                </Link>
              )}
            </div>

            {prescribedExercises.length > 0 ? (
              <div className="space-y-3">
                {prescribedExercises.map((ex, idx) => (
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
            ) : (
              <div className="text-center py-8">
                <Dumbbell className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                <p className="text-sm text-[#64748B] mb-1">No exercises prescribed yet.</p>
                <p className="text-xs text-[#94A3B8]">Your therapist will add a home program after your first consultation.</p>
              </div>
            )}
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

            {latestNote ? (
              <>
                <div className="p-4 rounded-2xl bg-[#EFF5FF] border border-[#BFDBFE] text-xs space-y-2">
                  <div className="font-bold text-[#1E6FFF]">{latestNote.doctorName}</div>
                  <p className="text-[#0D1421] font-medium leading-relaxed">{latestNote.diagnosis}</p>
                  <div className="text-[11px] text-[#64748B] pt-1">Last updated: {latestNote.date}</div>
                </div>
                {latestNote.symptomsObserved && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{latestNote.symptomsObserved}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                <p className="text-sm text-[#64748B] mb-1">No clinical notes yet.</p>
                <p className="text-xs text-[#94A3B8]">Your diagnosis will appear here after your first consultation.</p>
              </div>
            )}
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
