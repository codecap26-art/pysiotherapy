'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { db, DBClinicalNote } from '@/lib/db';
import { 
  FileText, Dumbbell, Activity, CheckCircle2, AlertCircle, Heart, Stethoscope, Sparkles 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MedicalHistoryPage() {
  const { user } = useAuthStore();
  const [clinicalNotes, setClinicalNotes] = useState<DBClinicalNote[]>([]);

  useEffect(() => {
    if (user) {
      setClinicalNotes(db.getClinicalNotesByPatient(user.id));
    }
  }, [user]);

  const latestNote = clinicalNotes[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0D1421] tracking-tight">
          Medical History & Rehabilitation Plans
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          Review clinical assessments, doctor consultation notes, and active home exercise programs.
        </p>
      </div>

      {/* Patient Health Summary Card */}
      <div className="bg-white rounded-3xl border-2 border-[#E8ECF4] p-6 sm:p-7 shadow-xs">
        <h2 className="text-base font-bold text-[#0D1421] flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-rose-500" />
          Patient Medical Profile
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[#8896A8] font-bold uppercase tracking-wider text-[10px]">Documented Condition</span>
            <p className="text-sm font-bold text-[#0D1421] mt-1">
              {user?.medicalConditions || 'Mild Lumbar Disc Strain (L4-L5)'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[#8896A8] font-bold uppercase tracking-wider text-[10px]">Allergies</span>
            <p className="text-sm font-bold text-[#0D1421] mt-1">
              {user?.allergies || 'No known allergies (NKDA)'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[#8896A8] font-bold uppercase tracking-wider text-[10px]">Emergency Contact</span>
            <p className="text-sm font-bold text-[#0D1421] mt-1">
              {user?.emergencyContact || '+91 98765 43211 (Priya S)'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[#8896A8] font-bold uppercase tracking-wider text-[10px]">Overall Recovery</span>
            <p className="text-sm font-black text-[#10B981] mt-1">
              {latestNote?.recoveryProgress || 65}% Improvement
            </p>
          </div>
        </div>
      </div>

      {/* Active Home Exercises */}
      <div className="bg-white rounded-3xl border-2 border-[#E8ECF4] p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-[#10B981]" />
            <h2 className="text-lg font-bold text-[#0D1421]">Prescribed Home Exercises</h2>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            Active Program
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {(latestNote?.exercisesPrescribed || [
            { name: 'Cat-Camel Spine Mobilization', sets: '2 sets', reps: '10 reps', frequency: 'Twice daily', notes: 'Maintain fluid breathing and avoid pain pinch.' },
            { name: 'Bird Dog Core Activation', sets: '3 sets', reps: '8 reps / side', frequency: 'Once daily', notes: 'Hold 3 seconds at top with flat neutral spine.' },
            { name: 'Glute Bridge with Resistance Band', sets: '3 sets', reps: '12 reps', frequency: 'Daily', notes: 'Squeeze glute muscles for 2 seconds at peak.' },
          ]).map((ex, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#1E6FFF] bg-blue-50 px-2 py-0.5 rounded-md">
                  Exercise #{idx + 1}
                </span>
                <span className="text-[11px] font-semibold text-[#10B981] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Assigned
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#0D1421]">{ex.name}</h3>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#64748B]">
                <div className="bg-white p-2 rounded-xl border border-gray-100">
                  <div className="text-[10px] text-[#8896A8] uppercase">Target</div>
                  <div className="font-bold text-[#0D1421]">{ex.sets} • {ex.reps}</div>
                </div>
                <div className="bg-white p-2 rounded-xl border border-gray-100">
                  <div className="text-[10px] text-[#8896A8] uppercase">Frequency</div>
                  <div className="font-bold text-[#0D1421]">{ex.frequency}</div>
                </div>
              </div>

              <p className="text-[11px] text-[#64748B] italic bg-white p-2.5 rounded-xl border border-gray-100">
                &ldquo;{ex.notes}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Consultation Records */}
      <div className="bg-white rounded-3xl border-2 border-[#E8ECF4] p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#1E6FFF]" />
          <h2 className="text-lg font-bold text-[#0D1421]">Doctor Clinical Notes & History</h2>
        </div>

        {clinicalNotes.length === 0 ? (
          <p className="text-xs text-[#64748B]">No clinical notes recorded yet.</p>
        ) : (
          <div className="space-y-4">
            {clinicalNotes.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200">
                  <div>
                    <div className="text-sm font-bold text-[#0D1421] flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-[#1E6FFF]" />
                      {note.doctorName}
                    </div>
                    <div className="text-xs text-[#64748B]">Consultation Date: {note.date}</div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full self-start sm:self-auto">
                    Recovery Score: {note.recoveryProgress}%
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-[#0D1421]">Clinical Diagnosis:</span>
                    <p className="text-[#475569] mt-0.5">{note.diagnosis}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#0D1421]">Therapy Administered:</span>
                    <p className="text-[#475569] mt-0.5">{note.treatmentAdministered}</p>
                  </div>
                  {note.nextFollowUpDate && (
                    <div className="pt-2 text-[#1E6FFF] font-semibold">
                      Recommended Next Follow-up: {note.nextFollowUpDate}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
