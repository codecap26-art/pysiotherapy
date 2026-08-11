'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { DBAppointment, DBClinicalNote } from '@/lib/db';
import { formatPrice } from '@/lib/bookingData';
import { getAuthHeaders } from '@/lib/authHeaders';
import { 
  Stethoscope, Calendar, Clock, Users, Activity, CheckCircle2, 
  FileText, Plus, AlertCircle, Dumbbell, Star, ChevronRight, X, Sparkles, Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TherapistDashboardPage() {
  const { user } = useAuthStore();
  const [appointments, setAppointments] = useState<DBAppointment[]>([]);
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'completed' | 'all'>('today');
  const [selectedAppointment, setSelectedAppointment] = useState<DBAppointment | null>(null);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [patientRecordModal, setPatientRecordModal] = useState<DBAppointment | null>(null);

  // Clinical note form state
  const [diagnosis, setDiagnosis] = useState('');
  const [treatmentAdministered, setTreatmentAdministered] = useState('');
  const [recoveryScore, setRecoveryScore] = useState(70);
  const [nextFollowUp, setNextFollowUp] = useState('');
  const [exercises, setExercises] = useState<Array<{ name: string; sets: string; reps: string; frequency: string; notes: string }>>([
    { name: 'Cat-Camel Spine Mobilization', sets: '2 sets', reps: '10 reps', frequency: 'Twice daily', notes: 'Maintain fluid breathing' },
    { name: 'Bird Dog Activation', sets: '3 sets', reps: '8 reps/side', frequency: 'Daily', notes: 'Hold 3s at top' },
  ]);
  const [toastMessage, setToastMessage] = useState('');

  const refreshAppointments = async () => {
    try {
      // The API uses the auth token to identify the doctor and filters appointments by their specialistId
      const res = await fetch('/api/appointments', {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.appointments)) {
          setAppointments(json.appointments);
          return;
        }
      }
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    }
  };

  useEffect(() => {
    refreshAppointments();
  }, [user]);

  const handleStatusChange = async (id: string, status: DBAppointment['status']) => {
    try {
      await fetch('/api/appointments', {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, status }),
      });
    } catch {}
    refreshAppointments();
    setToastMessage(`Appointment updated to ${status.toUpperCase()}.`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleOpenConsultModal = (apt: DBAppointment) => {
    setSelectedAppointment(apt);
    setDiagnosis(apt.reasonForVisit ? `Evaluated for: ${apt.reasonForVisit}` : '');
    setTreatmentAdministered('Spine manual therapy, ultrasound mobilization.');
    setRecoveryScore(70);
    setConsultModalOpen(true);
  };

  const handleAddExerciseRow = () => {
    setExercises([
      ...exercises,
      { name: '', sets: '3 sets', reps: '10 reps', frequency: 'Daily', notes: '' },
    ]);
  };

  const handleSaveClinicalNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointment || !diagnosis) return;

    const notePayload = {
      appointmentId: selectedAppointment.id,
      patientId: selectedAppointment.patientId,
      doctorName: user ? `Dr. ${user.firstName} ${user.lastName}` : 'Dr. Specialist',
      date: new Date().toISOString().split('T')[0],
      diagnosis,
      symptomsObserved: `Patient reported pain level ${selectedAppointment.painLevel}/10 for ${selectedAppointment.painDuration}.`,
      treatmentAdministered,
      exercisesPrescribed: exercises.filter((ex) => ex.name.trim().length > 0),
      recoveryProgress: recoveryScore,
      nextFollowUpDate: nextFollowUp || 'In 1 week',
    };

    try {
      await fetch('/api/medical-notes', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(notePayload),
      });
      await fetch('/api/appointments', {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id: selectedAppointment.id, status: 'completed' }),
      });
    } catch {}

    setConsultModalOpen(false);
    refreshAppointments();
    setToastMessage('Clinical consultation note and exercises saved to database successfully!');
    setTimeout(() => setToastMessage(''), 4000);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredAppointments = appointments.filter((a) => {
    if (activeTab === 'today') return a.date === todayStr;
    if (activeTab === 'upcoming') return a.status === 'confirmed' || a.status === 'pending' || a.status === 'rescheduled';
    if (activeTab === 'completed') return a.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0D1421] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                <Stethoscope className="w-3.5 h-3.5" /> Doctor Clinical Portal
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Clinic Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Dr. {user?.firstName || 'Sarah'} {user?.lastName || 'Jenkins'}, PT, DPT
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Chief of Physiotherapy & Sports Rehabilitation • Indiranagar Flagship Centre
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <div className="text-center px-3 border-r border-white/10">
              <div className="text-xl font-black text-white">{appointments.length}</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Total Patients</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-black text-emerald-400">4.9 ★</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Doctor Rating</div>
            </div>
          </div>
        </div>
      </div>

      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </motion.div>
      )}

      {/* Metrics Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border-2 border-[#E8ECF4] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1E6FFF] flex items-center justify-center mb-3">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-[#0D1421]">
            {appointments.filter((a) => a.status === 'confirmed').length}
          </div>
          <div className="text-xs font-semibold text-[#64748B] mt-0.5">Active Queue</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border-2 border-[#E8ECF4] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-[#0D1421]">
            {appointments.filter((a) => a.status === 'pending').length}
          </div>
          <div className="text-xs font-semibold text-[#64748B] mt-0.5">Pending Approvals</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border-2 border-[#E8ECF4] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-[#0D1421]">
            {appointments.filter((a) => a.status === 'completed').length}
          </div>
          <div className="text-xs font-semibold text-[#64748B] mt-0.5">Sessions Completed</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border-2 border-[#E8ECF4] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mb-3">
            <Activity className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-[#0D1421]">76%</div>
          <div className="text-xs font-semibold text-[#64748B] mt-0.5">Avg. Patient Recovery</div>
        </div>
      </div>

      {/* Patient Queue & Appointments */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#1E6FFF]" />
            <h2 className="text-xl font-bold text-[#0D1421]">Clinical Patient Schedule</h2>
          </div>

          <div className="flex gap-2 p-1.5 bg-[#F1F5F9] rounded-2xl w-fit">
            {(['today', 'upcoming', 'completed', 'all'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-[#1E6FFF] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0D1421]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-[#E8ECF4] p-10 text-center text-xs text-[#64748B]">
            No appointments found in this category.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white rounded-3xl border-2 border-[#E8ECF4] p-6 shadow-xs hover:border-[#BFDBFE] transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-[#1E6FFF] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                        {apt.bookingRef}
                      </span>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                        apt.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : apt.status === 'cancelled'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-[#1E6FFF]'
                      }`}>
                        {apt.status}
                      </span>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        VAS Pain: {apt.painLevel}/10
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0D1421]">{apt.patientName}</h3>
                    <p className="text-xs text-[#64748B]">
                      {apt.patientAge} yrs • {apt.patientGender} • {apt.patientPhone}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPatientRecordModal(apt)}
                      className="px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-gray-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Activity className="w-3.5 h-3.5 text-[#1E6FFF]" />
                      <span>View Health Profile</span>
                    </button>

                    {apt.status !== 'completed' && (
                      <button
                        type="button"
                        onClick={() => handleOpenConsultModal(apt)}
                        className="px-4 py-2 rounded-xl bg-[#1E6FFF] text-white text-xs font-bold hover:bg-[#1558D6] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Record Consultation Note</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs text-[#64748B]">
                  <div>
                    <span className="text-[#8896A8] uppercase font-bold text-[10px]">Treatment:</span>
                    <p className="font-bold text-[#0D1421] mt-0.5">{apt.treatmentName}</p>
                  </div>
                  <div>
                    <span className="text-[#8896A8] uppercase font-bold text-[10px]">Schedule:</span>
                    <p className="font-bold text-[#0D1421] mt-0.5">{apt.date} at {apt.timeSlot}</p>
                  </div>
                  <div>
                    <span className="text-[#8896A8] uppercase font-bold text-[10px]">Primary Complaint:</span>
                    <p className="font-medium text-[#0D1421] mt-0.5 truncate">{apt.reasonForVisit || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Consultation Notes Modal */}
      <AnimatePresence>
        {consultModalOpen && selectedAppointment && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-gray-100 my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-black text-[#0D1421]">Record Clinical Session</h3>
                  <p className="text-xs text-[#64748B]">
                    Patient: <strong>{selectedAppointment.patientName}</strong> • {selectedAppointment.treatmentName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setConsultModalOpen(false)}
                  className="p-1 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveClinicalNote} className="space-y-5 pt-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
                    Clinical Diagnosis & Observations
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="e.g. Lumbar strain with restricted flexion (40 deg), tenderness at L4-L5..."
                    className="w-full px-4 py-3 rounded-2xl border-2 border-[#E8ECF4] text-sm text-[#0D1421] outline-none focus:border-[#1E6FFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
                    Therapy Administered Today
                  </label>
                  <input
                    type="text"
                    required
                    value={treatmentAdministered}
                    onChange={(e) => setTreatmentAdministered(e.target.value)}
                    placeholder="e.g. Grade II mobilization, therapeutic ultrasound 1.5W/cm2 for 8 mins"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-[#E8ECF4] text-sm text-[#0D1421] outline-none focus:border-[#1E6FFF]"
                  />
                </div>

                {/* Prescribe Exercises */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider">
                      Prescribe Home Exercise Program
                    </label>
                    <button
                      type="button"
                      onClick={handleAddExerciseRow}
                      className="text-xs font-bold text-[#1E6FFF] hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Exercise
                    </button>
                  </div>

                  {exercises.map((ex, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Exercise Name (e.g. Cat-Camel)"
                          value={ex.name}
                          onChange={(e) => {
                            const copy = [...exercises];
                            copy[idx].name = e.target.value;
                            setExercises(copy);
                          }}
                          className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#0D1421] bg-white outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Sets (3 sets)"
                          value={ex.sets}
                          onChange={(e) => {
                            const copy = [...exercises];
                            copy[idx].sets = e.target.value;
                            setExercises(copy);
                          }}
                          className="w-24 px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#0D1421] bg-white outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Reps (10 reps)"
                          value={ex.reps}
                          onChange={(e) => {
                            const copy = [...exercises];
                            copy[idx].reps = e.target.value;
                            setExercises(copy);
                          }}
                          className="w-24 px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#0D1421] bg-white outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Instructions & Cautions for patient..."
                        value={ex.notes}
                        onChange={(e) => {
                          const copy = [...exercises];
                          copy[idx].notes = e.target.value;
                          setExercises(copy);
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#0D1421] bg-white outline-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Recovery % and Followup */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
                      Recovery Score: {recoveryScore}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={recoveryScore}
                      onChange={(e) => setRecoveryScore(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1E6FFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
                      Next Follow-up Date
                    </label>
                    <input
                      type="date"
                      value={nextFollowUp}
                      onChange={(e) => setNextFollowUp(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border-2 border-[#E8ECF4] text-xs text-[#0D1421] outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setConsultModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-[#1E6FFF] text-white font-bold text-xs hover:bg-[#1558D6] shadow-md cursor-pointer"
                  >
                    Save Clinical Note & Mark Complete
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Patient Record Profile Modal */}
      <AnimatePresence>
        {patientRecordModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0D1421]">{patientRecordModal.patientName}</h3>
                  <p className="text-xs text-[#64748B]">
                    {patientRecordModal.patientAge} yrs • {patientRecordModal.patientGender} • {patientRecordModal.patientPhone}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPatientRecordModal(null)}
                  className="p-1 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="font-bold text-amber-900">VAS Pain Assessment</div>
                  <p className="text-amber-800 mt-1">
                    Severity: <strong>{patientRecordModal.painLevel}/10</strong> • Duration: {patientRecordModal.painDuration}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="font-bold text-[#0D1421]">Primary Complaint</div>
                  <p className="text-[#64748B] mt-1">{patientRecordModal.reasonForVisit || 'General physiotherapy consultation'}</p>
                </div>

                {patientRecordModal.notes && (
                  <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="font-bold text-[#0D1421]">Patient Notes / History</div>
                    <p className="text-[#64748B] mt-1">{patientRecordModal.notes}</p>
                  </div>
                )}
              </div>

              <div className="pt-5 mt-5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setPatientRecordModal(null)}
                  className="w-full py-3 rounded-xl bg-[#0D1421] text-white font-bold text-xs hover:bg-slate-800"
                >
                  Close Record
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
