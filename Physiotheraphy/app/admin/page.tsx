'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AuthGuard from '@/components/auth/AuthGuard';
import { DBAppointment } from '@/lib/db';
import { CLINIC_BRANCHES } from '@/lib/clinicData';
import { SPECIALISTS, TREATMENTS, formatPrice } from '@/lib/bookingData';
import { 
  Building2, Users, Calendar, DollarSign, Settings, Search, CheckCircle2, 
  XCircle, Clock, Plus, ShieldCheck, Stethoscope, Activity, MapPin, ArrowRight,
  Database, RefreshCw, Server, Check, AlertCircle, ExternalLink, UserCheck, Lock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getAppointments } from '@/lib/supabaseService';

const TABS = ['Overview', 'Appointments', 'Users & Accounts', 'Database & Supabase', 'Doctors', 'Clinics', 'Revenue'];

interface DBUserSafe {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'patient' | 'therapist' | 'admin';
  age: number;
  gender: string;
  createdAt: string;
  emailVerified: boolean;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [appointments, setAppointments] = useState<DBAppointment[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<DBUserSafe[]>([]);
  const [dbStats, setDbStats] = useState<any>(null);
  const [supaStatus, setSupaStatus] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isReseeding, setIsReseeding] = useState(false);

  const fetchAllData = async () => {
    try {
      // 1. Fetch appointments
      const apts = await getAppointments();
      setAppointments(apts);

      // 2. Fetch registered users from Server DB
      const usersRes = await fetch('/api/auth/users');
      if (usersRes.ok) {
        const usersJson = await usersRes.json();
        if (usersJson.success && Array.isArray(usersJson.users)) {
          setRegisteredUsers(usersJson.users);
        }
      }

      // 3. Fetch DB and Supabase Status
      const statusRes = await fetch('/api/db/status');
      if (statusRes.ok) {
        const statusJson = await statusRes.json();
        if (statusJson.success) {
          setDbStats(statusJson.stats);
          setSupaStatus(statusJson.supabase);
        }
      }
    } catch (e) {
      console.warn('Error fetching admin data:', e);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleUpdateStatus = async (id: string, status: DBAppointment['status']) => {
    try {
      await fetch('/api/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchAllData();
      setToastMessage(`Appointment status updated to ${status.toUpperCase()}.`);
      setTimeout(() => setToastMessage(''), 4000);
    } catch {
      setToastMessage('Failed to update status.');
    }
  };

  const handleSyncSupabase = async () => {
    setIsSyncing(true);
    setToastMessage('');
    try {
      const res = await fetch('/api/db/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync-supabase' }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(`✅ Synced with Supabase! (${data.results?.usersSynced || 0} users, ${data.results?.appointmentsSynced || 0} appointments)`);
      } else {
        setToastMessage(`⚠️ Sync response: ${data.error || 'Check Supabase connection in .env.local'}`);
      }
      fetchAllData();
    } catch {
      setToastMessage('Failed to sync to Supabase.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setToastMessage(''), 5000);
    }
  };

  const handleReseedDb = async () => {
    if (!confirm('Re-seed database with default demo accounts and rich mock data?')) return;
    setIsReseeding(true);
    try {
      const res = await fetch('/api/db/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reseed' }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage('✅ Database successfully re-seeded with mock clinical records.');
        fetchAllData();
      }
    } catch {
      setToastMessage('Failed to reseed database.');
    } finally {
      setIsReseeding(false);
      setTimeout(() => setToastMessage(''), 5000);
    }
  };

  const totalRevenue = appointments
    .filter((a) => a.status === 'completed')
    .reduce((sum, a) => sum + a.totalAmount, 0);

  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const completedCount = appointments.filter((a) => a.status === 'completed').length;

  const filteredAppointments = appointments.filter((a) =>
    a.patientName.toLowerCase().includes(search.toLowerCase()) ||
    a.specialistName.toLowerCase().includes(search.toLowerCase()) ||
    a.treatmentName.toLowerCase().includes(search.toLowerCase()) ||
    a.bookingRef.toLowerCase().includes(search.toLowerCase())
  );

  const filteredUsers = registeredUsers.filter((u) =>
    u.firstName.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.lastName.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <AuthGuard allowedRoles={['admin']}>
      <div className="min-h-screen bg-[#FAFBFF] pt-20 pb-16">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0D1421] px-6 sm:px-10 py-10 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Practice Administration
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" /> Persistent DB Active
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Healing Motion Admin Command Center
              </h1>
              <p className="text-slate-300 text-sm mt-1">
                Manage persistent database records, registered accounts, appointments, and Supabase synchronization.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchAllData}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all border border-white/20 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Data</span>
              </button>
              <Link
                href="/book"
                className="px-4 py-2.5 bg-[#1E6FFF] hover:bg-[#1558D6] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>New Booking</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-slate-300 font-semibold">Registered Users</div>
              <div className="text-xl font-black text-white mt-1">{registeredUsers.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-slate-300 font-semibold">Total Bookings</div>
              <div className="text-xl font-black text-white mt-1">{appointments.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-slate-300 font-semibold">Pending Approvals</div>
              <div className="text-xl font-black text-amber-400 mt-1">{pendingCount}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-slate-300 font-semibold">Confirmed Sessions</div>
              <div className="text-xl font-black text-emerald-400 mt-1">{confirmedCount}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-slate-300 font-semibold">Revenue Collected</div>
              <div className="text-xl font-black text-emerald-400 mt-1">{formatPrice(totalRevenue)}</div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="max-w-7xl mx-auto px-6 mt-6">
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="flex overflow-x-auto gap-2 border-b border-[#E8ECF4] pb-3 scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-[#1E6FFF] text-white shadow-md'
                    : 'bg-white text-[#64748B] hover:text-[#0D1421] border border-[#E8ECF4]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
          {/* Tab 1: Overview */}
          {activeTab === 'Overview' && (
            <div className="space-y-8">
              {/* Quick Actions Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-[#E8ECF4] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E6FFF] flex items-center justify-center font-bold">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0D1421]">Server Database Storage</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Persistent JSON database on server disk with auto-sync and portable multi-user account storage.
                  </p>
                  <button
                    onClick={() => setActiveTab('Database & Supabase')}
                    className="text-xs font-bold text-[#1E6FFF] hover:underline flex items-center gap-1"
                  >
                    View Database Health <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-[#E8ECF4] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0D1421]">User Accounts & Roles</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {registeredUsers.length} total registered accounts (Patients, Doctors, Administrators) saved in database.
                  </p>
                  <button
                    onClick={() => setActiveTab('Users & Accounts')}
                    className="text-xs font-bold text-[#1E6FFF] hover:underline flex items-center gap-1"
                  >
                    Manage Users <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-[#E8ECF4] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0D1421]">Patient Consultations</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {appointments.length} clinical bookings across Indiranagar, Koramangala, and HSR Layout branches.
                  </p>
                  <button
                    onClick={() => setActiveTab('Appointments')}
                    className="text-xs font-bold text-[#1E6FFF] hover:underline flex items-center gap-1"
                  >
                    Review Schedule <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Recent Appointments */}
              <div className="bg-white rounded-3xl border border-[#E8ECF4] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#0D1421]">Recent Clinical Appointments</h3>
                    <p className="text-xs text-[#64748B]">Real-time patient bookings saved in database</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('Appointments')}
                    className="text-xs font-bold text-[#1E6FFF] hover:underline flex items-center gap-1"
                  >
                    View All ({appointments.length}) <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E8ECF4] text-[#8896A8] font-bold uppercase tracking-wider">
                        <th className="pb-3">Ref ID</th>
                        <th className="pb-3">Patient</th>
                        <th className="pb-3">Treatment</th>
                        <th className="pb-3">Doctor</th>
                        <th className="pb-3">Date & Slot</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {appointments.slice(0, 5).map((apt) => (
                        <tr key={apt.id} className="hover:bg-[#F8FAFC]">
                          <td className="py-3 font-mono font-bold text-[#1E6FFF]">{apt.bookingRef}</td>
                          <td className="py-3 font-semibold text-[#0D1421]">{apt.patientName}</td>
                          <td className="py-3 text-[#4A5568]">{apt.treatmentName}</td>
                          <td className="py-3 text-[#4A5568]">{apt.specialistName}</td>
                          <td className="py-3 text-[#64748B]">{apt.date} • {apt.timeSlot}</td>
                          <td className="py-3 font-bold text-[#0D1421]">{formatPrice(apt.totalAmount)}</td>
                          <td className="py-3">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                              apt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                              apt.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                              apt.status === 'completed' ? 'bg-blue-50 text-blue-700' :
                              'bg-rose-50 text-rose-700'
                            }`}>
                              {apt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Appointments */}
          {activeTab === 'Appointments' && (
            <div className="bg-white rounded-3xl border border-[#E8ECF4] p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0D1421]">Appointment Management</h3>
                  <p className="text-xs text-[#64748B]">Verify, approve, or reschedule patient bookings</p>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-[#8896A8] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by patient, ref, doctor..."
                    className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E8ECF4] rounded-xl text-xs focus:bg-white focus:border-[#1E6FFF] outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8ECF4] text-[#8896A8] font-bold uppercase tracking-wider">
                      <th className="pb-3">Ref ID</th>
                      <th className="pb-3">Patient</th>
                      <th className="pb-3">Contact</th>
                      <th className="pb-3">Treatment</th>
                      <th className="pb-3">Doctor</th>
                      <th className="pb-3">Date & Time</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-[#F8FAFC]">
                        <td className="py-3 font-mono font-bold text-[#1E6FFF]">{apt.bookingRef}</td>
                        <td className="py-3">
                          <div className="font-bold text-[#0D1421]">{apt.patientName}</div>
                          <div className="text-[11px] text-[#8896A8]">{apt.patientAge}y • {apt.patientGender}</div>
                        </td>
                        <td className="py-3">
                          <div className="text-[#0D1421]">{apt.patientPhone}</div>
                          <div className="text-[11px] text-[#8896A8]">{apt.patientEmail}</div>
                        </td>
                        <td className="py-3 text-[#4A5568]">{apt.treatmentName}</td>
                        <td className="py-3 text-[#4A5568]">{apt.specialistName}</td>
                        <td className="py-3 text-[#64748B]">
                          <div>{apt.date}</div>
                          <div className="font-semibold text-[#0D1421]">{apt.timeSlot}</div>
                        </td>
                        <td className="py-3">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                            apt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                            apt.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                            apt.status === 'completed' ? 'bg-blue-50 text-blue-700' :
                            'bg-rose-50 text-rose-700'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {apt.status === 'pending' && (
                              <button
                                onClick={() => handleUpdateStatus(apt.id, 'confirmed')}
                                className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-[11px] font-bold"
                                title="Confirm Appointment"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {apt.status === 'confirmed' && (
                              <button
                                onClick={() => handleUpdateStatus(apt.id, 'completed')}
                                className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-[11px] font-bold"
                              >
                                Mark Done
                              </button>
                            )}
                            {apt.status !== 'cancelled' && (
                              <button
                                onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                                className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-[11px] font-bold"
                                title="Cancel"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Users & Registered Accounts */}
          {activeTab === 'Users & Accounts' && (
            <div className="bg-white rounded-3xl border border-[#E8ECF4] p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0D1421]">Registered Users & Patient Accounts</h3>
                  <p className="text-xs text-[#64748B]">All accounts stored in persistent database & authenticated with passwords</p>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-[#8896A8] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search by name, email, role..."
                    className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E8ECF4] rounded-xl text-xs focus:bg-white focus:border-[#1E6FFF] outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8ECF4] text-[#8896A8] font-bold uppercase tracking-wider">
                      <th className="pb-3">User ID</th>
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Email Address</th>
                      <th className="pb-3">Phone</th>
                      <th className="pb-3">Role</th>
                      <th className="pb-3">Age / Gender</th>
                      <th className="pb-3">Registered At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-[#F8FAFC]">
                        <td className="py-3 font-mono font-bold text-[#8896A8] text-[11px]">{u.id}</td>
                        <td className="py-3 font-bold text-[#0D1421]">{u.firstName} {u.lastName}</td>
                        <td className="py-3 font-semibold text-[#1E6FFF]">{u.email}</td>
                        <td className="py-3 text-[#4A5568]">{u.phone || '—'}</td>
                        <td className="py-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                            u.role === 'therapist' ? 'bg-blue-100 text-blue-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 text-[#64748B]">
                          {u.age ? `${u.age}y` : '—'} • {u.gender || '—'}
                        </td>
                        <td className="py-3 text-[#8896A8] text-[11px]">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 4: Database & Supabase */}
          {activeTab === 'Database & Supabase' && (
            <div className="space-y-6">
              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Server DB Card */}
                <div className="bg-white p-6 rounded-3xl border-2 border-blue-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Server className="w-5 h-5 text-[#1E6FFF]" />
                      <h3 className="text-base font-bold text-[#0D1421]">Server Database Engine</h3>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                      ● Active & Persistent
                    </span>
                  </div>

                  <div className="text-xs text-[#4A5568] space-y-1 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E8ECF4]">
                    <p><strong>Storage Path:</strong> <code>data/database.json</code></p>
                    <p><strong>Registered Accounts:</strong> {dbStats?.usersCount || registeredUsers.length}</p>
                    <p><strong>Appointments Stored:</strong> {dbStats?.appointmentsCount || appointments.length}</p>
                    <p><strong>Clinical SOAP Notes:</strong> {dbStats?.clinicalNotesCount || 1}</p>
                    <p><strong>Last Updated:</strong> {dbStats?.lastUpdated ? new Date(dbStats.lastUpdated).toLocaleString() : 'Just now'}</p>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={handleReseedDb}
                      disabled={isReseeding}
                      className="px-4 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0D1421] text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isReseeding ? 'animate-spin' : ''}`} />
                      <span>Re-seed Mock Data</span>
                    </button>
                  </div>
                </div>

                {/* Supabase Status Card */}
                <div className="bg-white p-6 rounded-3xl border-2 border-emerald-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-base font-bold text-[#0D1421]">Supabase Cloud Sync</h3>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      supaStatus?.connected ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {supaStatus?.connected ? '● Connected' : '○ Standby / Local Mode'}
                    </span>
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {supaStatus?.message || 'Syncs all patient registrations, appointments, and medical records to your Supabase PostgreSQL tables.'}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleSyncSupabase}
                      disabled={isSyncing}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>{isSyncing ? 'Syncing...' : 'Sync All Data to Supabase Now'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Clinics */}
          {activeTab === 'Clinics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CLINIC_BRANCHES.map((clinic) => (
                <div key={clinic.id} className="bg-white rounded-3xl border border-[#E8ECF4] p-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#0D1421]">{clinic.name}</h3>
                      <p className="text-xs text-[#1E6FFF] font-semibold">{clinic.tagline}</p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
                      ★ {clinic.rating} ({clinic.reviewsCount})
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#64748B]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#1E6FFF]" />
                      <span>{clinic.address}, {clinic.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#8896A8]" />
                      <span>{clinic.hours}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {clinic.amenities.map((a) => (
                      <span key={a} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 6: Specialists */}
          {activeTab === 'Doctors' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SPECIALISTS.map((doc) => (
                <div key={doc.id} className="bg-white rounded-3xl border border-[#E8ECF4] p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <Image src={doc.image} alt={doc.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0D1421]">{doc.name}</h4>
                      <p className="text-[11px] text-[#1E6FFF]">{doc.title}</p>
                    </div>
                  </div>
                  <div className="text-xs text-[#64748B] space-y-1">
                    <p><strong>Experience:</strong> {doc.experience} Years</p>
                    <p><strong>Qualifications:</strong> {doc.qualifications}</p>
                    <p><strong>Rating:</strong> ★ {doc.rating} ({doc.reviews} reviews)</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 7: Revenue */}
          {activeTab === 'Revenue' && (
            <div className="bg-white rounded-3xl border border-[#E8ECF4] p-8 space-y-6">
              <h3 className="text-lg font-bold text-[#0D1421]">Financial Analytics & Collections</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="text-xs text-emerald-800 font-bold uppercase">Realized Revenue</div>
                  <div className="text-2xl font-black text-emerald-700 mt-1">{formatPrice(totalRevenue)}</div>
                </div>
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
                  <div className="text-xs text-blue-800 font-bold uppercase">Projected Pipeline</div>
                  <div className="text-2xl font-black text-[#1E6FFF] mt-1">
                    {formatPrice(appointments.reduce((sum, a) => sum + a.totalAmount, 0))}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200">
                  <div className="text-xs text-purple-800 font-bold uppercase">Tax Remittance (18% GST)</div>
                  <div className="text-2xl font-black text-purple-700 mt-1">
                    {formatPrice(Math.round(totalRevenue * 0.18))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
