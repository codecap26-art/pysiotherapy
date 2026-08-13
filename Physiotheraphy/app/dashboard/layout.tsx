'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, Calendar, Settings, LogOut, Menu, X, Activity, 
  FileText, Bell, User as UserIcon, ShieldCheck, Stethoscope, PlusCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/store/useAuthStore';
import AuthGuard from '@/components/auth/AuthGuard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const isTherapist = user?.role === 'therapist' || user?.role === 'doctor' || pathname?.includes('/therapist');

  const PATIENT_NAV = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Appointments', href: '/dashboard/appointments', icon: Calendar },
    { name: 'Medical History & Exercises', href: '/dashboard/medical-history', icon: FileText },
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { name: 'My Profile', href: '/dashboard/profile', icon: UserIcon },
  ];

  const THERAPIST_NAV = [
    { name: 'Clinical Schedule', href: '/therapist', icon: Calendar },
    { name: 'Patient Consultations', href: '/therapist', icon: Users },
    { name: 'Prescribe Exercises', href: '/therapist', icon: Activity },
    { name: 'Notifications', href: '/therapist', icon: Bell },
    { name: 'Doctor Profile', href: '/therapist', icon: Stethoscope },
  ];

  const navLinks = isTherapist ? THERAPIST_NAV : PATIENT_NAV;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FAFBFF] pt-24 lg:pt-28 flex">
        {/* Mobile Sidebar Toggle Button */}
        <button 
          type="button"
          className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1E6FFF] text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30" 
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed md:sticky top-20 left-0 z-40 w-[270px] h-[calc(100vh-80px)] bg-white border-r border-[#E8ECF4] flex flex-col pt-6 pb-6 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}>
          {/* User Profile Card */}
          <div className="px-5 pb-5 mb-3 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#EFF5FF] border border-[#BFDBFE] flex items-center justify-center font-black text-[#1E6FFF] text-base shrink-0 overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span>{user?.firstName?.[0] || 'U'}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-[#0D1421] truncate">
                    {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
                  </p>
                </div>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5 ${
                  user?.role === 'therapist' || user?.role === 'doctor'
                    ? 'bg-blue-100 text-[#1E6FFF]' 
                    : user?.role === 'admin' 
                    ? 'bg-purple-100 text-[#7C3AED]' 
                    : 'bg-emerald-100 text-[#10B981]'
                }`}>
                  {user?.role === 'therapist' || user?.role === 'doctor' ? 'Doctor / Therapist' : user?.role === 'admin' ? 'System Admin' : 'Patient'}
                </span>
              </div>
            </div>

            {/* Quick Action Button */}
            {!isTherapist ? (
              <Link
                href="/book"
                onClick={() => setSidebarOpen(false)}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-[#1E6FFF] hover:bg-[#1558D6] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Book New Session</span>
              </Link>
            ) : (
              <div className="mt-4 p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl text-[11px] font-semibold text-[#1E6FFF]">
                Clinic Active: Indiranagar Flagship
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-[#EFF5FF] text-[#1E6FFF] shadow-xs' 
                      : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0D1421]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1E6FFF]' : 'text-[#8896A8]'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sign Out Button */}
          <div className="px-3 pt-3 border-t border-[#F1F5F9] mt-auto">
            <button 
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 w-full transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl overflow-x-hidden">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
