"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, Calendar, 
  Settings, LogOut, Menu, X, Activity, DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Derive role from URL for this demo (e.g., /dashboard/patient -> patient)
  const role = pathname?.split('/')[2] || 'patient';

  const NAV_ITEMS = {
    patient: [
      { name: 'My Recovery', href: '/dashboard/patient', icon: Activity },
      { name: 'Appointments', href: '#', icon: Calendar },
      { name: 'Settings', href: '#', icon: Settings },
    ],
    therapist: [
      { name: 'Schedule', href: '/dashboard/therapist', icon: Calendar },
      { name: 'Patients', href: '#', icon: Users },
      { name: 'Settings', href: '#', icon: Settings },
    ],
    admin: [
      { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
      { name: 'Therapists', href: '#', icon: Users },
      { name: 'Revenue', href: '#', icon: DollarSign },
      { name: 'Settings', href: '#', icon: Settings },
    ],
  };

  const navLinks = NAV_ITEMS[role as keyof typeof NAV_ITEMS] || NAV_ITEMS.patient;

  return (
    <div className="min-h-screen bg-[#FAFBFF] pt-20 flex">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#2563EB] text-white rounded-full flex items-center justify-center shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed md:sticky top-20 left-0 z-40 w-[280px] h-[calc(100vh-80px)] bg-white border-r border-gray-100 flex flex-col pt-6 pb-8"
          >
            <div className="px-6 mb-8">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Portal</h2>
              <p className="text-[#0D1421] font-bold text-xl capitalize">{role} Dashboard</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-50 text-[#2563EB]' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="px-4 mt-auto">
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 w-full transition-colors">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
