'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { DBAppointment } from '@/lib/db';
import { formatPrice } from '@/lib/bookingData';
import { getAuthHeaders } from '@/lib/authHeaders';
import { 
  Calendar, Clock, MapPin, PlusCircle, RotateCcw, XCircle, 
  CheckCircle2, AlertCircle, FileText, ChevronRight, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PatientAppointmentsPage() {
  const { user } = useAuthStore();
  const [appointments, setAppointments] = useState<DBAppointment[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [selectedForReschedule, setSelectedForReschedule] = useState<DBAppointment | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('10:00 AM');
  const [actionSuccess, setActionSuccess] = useState('');

  const refreshList = async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/appointments', {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.appointments)) {
          setAppointments(json.appointments);
        }
      }
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    }
  };

  useEffect(() => {
    refreshList();
  }, [user]);

  const handleCancelAppointment = async (id: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await fetch('/api/appointments', {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify({ id, status: 'cancelled' }),
        });
      } catch {}
      refreshList();
      setActionSuccess('Appointment cancelled successfully.');
      setTimeout(() => setActionSuccess(''), 4000);
    }
  };

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForReschedule || !newDate) return;

    try {
      await fetch('/api/appointments', {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id: selectedForReschedule.id, status: 'rescheduled' }),
      });
    } catch {}

    setSelectedForReschedule(null);
    refreshList();
    setActionSuccess('Appointment rescheduled successfully.');
    setTimeout(() => setActionSuccess(''), 4000);
  };

  const filtered = appointments.filter((a) => {
    if (activeTab === 'upcoming') return a.status === 'confirmed' || a.status === 'pending' || a.status === 'rescheduled';
    if (activeTab === 'completed') return a.status === 'completed';
    if (activeTab === 'cancelled') return a.status === 'cancelled';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D1421] tracking-tight">
            My Appointments
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Manage your scheduled clinical consultations, past therapy sessions, and booking changes.
          </p>
        </div>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1E6FFF] text-white font-bold text-xs shadow-md hover:bg-[#1558D6] transition-all self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book New Session</span>
        </Link>
      </div>

      {actionSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionSuccess}</span>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-[#F1F5F9] rounded-2xl w-fit">
        {(['upcoming', 'completed', 'cancelled', 'all'] as const).map((tab) => (
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
            {tab} ({
              appointments.filter((a) => {
                if (tab === 'upcoming') return a.status === 'confirmed' || a.status === 'pending' || a.status === 'rescheduled';
                if (tab === 'completed') return a.status === 'completed';
                if (tab === 'cancelled') return a.status === 'cancelled';
                return true;
              }).length
            })
          </button>
        ))}
      </div>

      {/* Appointment Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-[#E8ECF4] p-12 text-center">
          <Calendar className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#0D1421] mb-1">No appointments in this view</h3>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto mb-6">
            You do not have any {activeTab} therapy consultations at the moment.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E6FFF] text-white rounded-xl text-xs font-bold hover:bg-[#1558D6]"
          >
            <PlusCircle className="w-4 h-4" /> Book an Appointment
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((apt) => {
            const isUpcoming = apt.status === 'confirmed' || apt.status === 'pending' || apt.status === 'rescheduled';

            return (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border-2 border-[#E8ECF4] p-4 sm:p-5 shadow-xs hover:border-[#BFDBFE] transition-all flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
              >
                {/* Time & Date Block */}
                <div className="w-20 text-center shrink-0 border-b sm:border-b-0 sm:border-r border-gray-100 pb-3 sm:pb-0 sm:pr-4">
                  <div className="text-sm font-black text-[#0D1421]">{apt.timeSlot}</div>
                  <div className="text-[10px] font-bold text-[#8896A8] mt-0.5">{apt.date}</div>
                </div>

                {/* Status Indicator Line (Desktop) */}
                <div className={`hidden sm:block w-1 h-10 rounded-full shrink-0 ${
                  apt.status === 'confirmed' ? 'bg-[#1E6FFF]' : 
                  apt.status === 'completed' ? 'bg-[#10B981]' : 
                  apt.status === 'cancelled' ? 'bg-rose-500' : 'bg-amber-500'
                }`} />

                {/* Main Content */}
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#1E6FFF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      {apt.bookingRef}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      apt.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : apt.status === 'cancelled'
                        ? 'bg-rose-100 text-rose-800'
                        : apt.status === 'rescheduled'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-[#1E6FFF]'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#0D1421]">{apt.treatmentName}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                    <span className="font-semibold text-[#0D1421]">Dr. {apt.specialistName?.replace('Dr. ', '')}</span>
                    <span>•</span>
                    <span className="truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#10B981]" />
                      {apt.clinicName}
                    </span>
                  </div>
                </div>

                {/* Right Actions / Price */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-[#0D1421]">{formatPrice(apt.totalAmount)}</div>
                  </div>

                  {isUpcoming && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        title="Reschedule"
                        onClick={() => {
                          setSelectedForReschedule(apt);
                          setNewDate(apt.date);
                          setNewTime(apt.timeSlot);
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#1E6FFF] hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Cancel"
                        onClick={() => handleCancelAppointment(apt.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Reschedule Modal */}
      <AnimatePresence>
        {selectedForReschedule && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#0D1421]">Reschedule Session</h3>
                <button
                  type="button"
                  onClick={() => setSelectedForReschedule(null)}
                  className="p-1 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-[#64748B] mb-4">
                Rescheduling <strong>{selectedForReschedule.treatmentName}</strong> with {selectedForReschedule.specialistName}.
              </p>

              <form onSubmit={handleRescheduleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
                    New Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-[#E8ECF4] text-sm text-[#0D1421] outline-none focus:border-[#1E6FFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-[#E8ECF4] text-sm text-[#0D1421] outline-none focus:border-[#1E6FFF]"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedForReschedule(null)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-xs text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-[#1E6FFF] text-white font-bold text-xs hover:bg-[#1558D6]"
                  >
                    Confirm Change
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
