'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { 
  Activity, AlertCircle, FileText, Clock, Building2, Home, Video, ArrowRight 
} from 'lucide-react';

const DURATION_OPTIONS = [
  'Less than 1 week',
  '1 to 4 weeks',
  '1 to 3 months',
  '3 to 6 months',
  'More than 6 months',
];

const PAIN_LABELS: Record<number, { text: string; color: string; desc: string }> = {
  1: { text: 'Minimal', color: 'text-emerald-500', desc: 'Barely noticeable tightness' },
  2: { text: 'Mild', color: 'text-emerald-600', desc: 'Mild discomfort with specific movements' },
  3: { text: 'Uncomfortable', color: 'text-teal-600', desc: 'Noticeable during daily activities' },
  4: { text: 'Moderate', color: 'text-amber-500', desc: 'Distracting, limits heavy work' },
  5: { text: 'Moderate+', color: 'text-amber-600', desc: 'Constant ache, affects posture' },
  6: { text: 'Intense', color: 'text-orange-500', desc: 'Affects concentration & sleep' },
  7: { text: 'Very Intense', color: 'text-orange-600', desc: 'Significantly restricts mobility' },
  8: { text: 'Severe', color: 'text-rose-500', desc: 'Severe disability, requires assistance' },
  9: { text: 'Very Severe', color: 'text-rose-600', desc: 'Excruciating, cannot bear weight' },
  10: { text: 'Critical', color: 'text-red-700', desc: 'Emergency level pain' },
};

export default function Step7PatientInfo() {
  const { user } = useAuthStore();
  const { 
    painLevel, painDuration, reasonForVisit, notes, appointmentType,
    setPainAssessment, setAppointmentType, nextStep 
  } = useBookingStore();

  const [currentPain, setCurrentPain] = useState(painLevel || 5);
  const [currentDuration, setCurrentDuration] = useState(painDuration || '1 to 3 months');
  const [currentReason, setCurrentReason] = useState(reasonForVisit || '');
  const [currentNotes, setCurrentNotes] = useState(notes || '');
  const [currentType, setCurrentType] = useState<'in-clinic' | 'home' | 'online'>(appointmentType || 'in-clinic');

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentType(currentType);
    setPainAssessment(currentPain, currentDuration, currentReason, currentNotes);
    nextStep();
  };

  const painInfo = PAIN_LABELS[currentPain] || PAIN_LABELS[5];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6"
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#1E6FFF] bg-[#EFF5FF] px-3 py-1 rounded-full">
          Step 7 of 8
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0D1421] mt-3">
          Patient Symptoms & Assessment
        </h2>
        <p className="text-[#64748B] text-sm mt-1">
          Help your therapist prepare personalized clinical protocols prior to your session.
        </p>
      </div>

      <form onSubmit={handleSaveAndContinue} className="space-y-6">
        {/* Patient identity card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#EFF5FF] border border-[#BFDBFE] flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1E6FFF]">Patient Profile</div>
            <div className="text-sm font-black text-[#0D1421] mt-0.5">
              {user ? `${user.firstName} ${user.lastName}` : 'Guest Patient'} • {user?.age || 30} yrs ({user?.gender || 'N/A'})
            </div>
            <div className="text-xs text-[#64748B]">{user?.email} • {user?.phone}</div>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-white rounded-xl text-[#1E6FFF] border border-[#BFDBFE]">
            Verified Account
          </span>
        </div>

        {/* Visit Modality / Type */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#E8ECF4] shadow-sm space-y-4">
          <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider">
            Consultation Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'in-clinic', title: 'In-Clinic Visit', desc: 'At chosen physical centre', icon: Building2 },
              { id: 'home', title: 'Home Physiotherapy', desc: 'Therapist visits your home', icon: Home },
              { id: 'online', title: 'Tele-Rehab Video', desc: 'HD 1-on-1 virtual call', icon: Video },
            ].map((item) => {
              const Icon = item.icon;
              const isSel = currentType === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setCurrentType(item.id as any)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSel
                      ? 'border-[#1E6FFF] bg-blue-50/50 shadow-xs'
                      : 'border-[#E2E8F0] bg-white hover:border-[#1E6FFF]/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${isSel ? 'text-[#1E6FFF]' : 'text-[#64748B]'}`} />
                    <span className="text-sm font-bold text-[#0D1421]">{item.title}</span>
                  </div>
                  <p className="text-xs text-[#64748B]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pain Level Slider */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#E8ECF4] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#1E6FFF]" />
              <label className="text-sm font-bold text-[#0D1421]">
                Current Pain Level (VAS Scale: 1 – 10)
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#0D1421]">{currentPain}/10</span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 ${painInfo.color}`}>
                {painInfo.text}
              </span>
            </div>
          </div>

          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={currentPain}
            onChange={(e) => setCurrentPain(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1E6FFF]"
          />

          <div className="flex justify-between text-[11px] font-semibold text-[#8896A8] px-1">
            <span>1 (Mild)</span>
            <span>3 (Uncomfortable)</span>
            <span>5 (Moderate)</span>
            <span>7 (Intense)</span>
            <span>10 (Severe)</span>
          </div>

          <p className="text-xs text-[#64748B] bg-[#F8FAFC] p-3 rounded-xl border border-gray-100">
            <strong>Clinical Indicator:</strong> {painInfo.desc}
          </p>
        </div>

        {/* Symptom Duration */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#E8ECF4] shadow-sm space-y-3">
          <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider">
            How long have you experienced these symptoms?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {DURATION_OPTIONS.map((dur) => {
              const isSel = currentDuration === dur;
              return (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setCurrentDuration(dur)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border-2 transition-all cursor-pointer ${
                    isSel
                      ? 'bg-[#1E6FFF] border-[#1E6FFF] text-white'
                      : 'bg-white border-[#E2E8F0] text-[#475569] hover:border-[#1E6FFF]/40'
                  }`}
                >
                  {dur}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reason for Visit */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#E8ECF4] shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-2">
              Primary Reason for Consultation / Target Area
            </label>
            <input
              type="text"
              required
              value={currentReason}
              onChange={(e) => setCurrentReason(e.target.value)}
              placeholder="e.g., Lower back stiffness after workout, knee clicking during squats"
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#E8ECF4] bg-white text-sm text-[#0D1421] placeholder:text-[#94A3B8] focus:border-[#1E6FFF] focus:ring-4 focus:ring-[#1E6FFF]/10 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-2">
              Additional Medical Notes & Past Surgeries (Optional)
            </label>
            <textarea
              rows={3}
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              placeholder="Mention any existing X-rays, MRI scans, medications, or specific requests..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-[#E8ECF4] bg-white text-sm text-[#0D1421] placeholder:text-[#94A3B8] focus:border-[#1E6FFF] focus:ring-4 focus:ring-[#1E6FFF]/10 outline-none resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-2xl bg-[#1E6FFF] text-white font-bold text-base shadow-[0_4px_16px_rgba(30,111,255,0.3)] hover:bg-[#1558D6] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue to Booking Summary</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
}
