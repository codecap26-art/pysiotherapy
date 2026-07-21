"use client";

import React from 'react';
import { Users, DollarSign, Calendar, Activity, ArrowUpRight, FileSpreadsheet, Settings } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0D1421] mb-2">Clinic Overview</h1>
          <p className="text-[#4A5568]">System administration and revenue analytics.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 flex items-center gap-2 shadow-sm">
            <FileSpreadsheet className="w-4 h-4 text-green-600" /> Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB]">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +12.5% <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Monthly Revenue</h3>
          <span className="text-3xl font-black text-[#0D1421] mt-1">₹4,25,000</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#06B6D4]">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +5% <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Appointments</h3>
          <span className="text-3xl font-black text-[#0D1421] mt-1">342</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Active Patients</h3>
          <span className="text-3xl font-black text-[#0D1421] mt-1">1,204</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Staff Utilization</h3>
          <span className="text-3xl font-black text-[#0D1421] mt-1">84%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Quick Actions & Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-[#0D1421] mb-6">System Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gray-100 hover:border-[#2563EB]/50 hover:shadow-md transition-all cursor-pointer group flex items-start gap-4">
                <div className="bg-blue-50 text-[#2563EB] p-3 rounded-lg group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1421]">Therapist Profiles</h4>
                  <p className="text-xs text-gray-500 mt-1">Add staff, edit bios, manage availability.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-100 hover:border-teal-500/50 hover:shadow-md transition-all cursor-pointer group flex items-start gap-4">
                <div className="bg-teal-50 text-teal-600 p-3 rounded-lg group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1421]">Dynamic Pricing</h4>
                  <p className="text-xs text-gray-500 mt-1">Configure treatment and specialist fees.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-100 hover:border-purple-500/50 hover:shadow-md transition-all cursor-pointer group flex items-start gap-4">
                <div className="bg-purple-50 text-purple-600 p-3 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1421]">Patient Records</h4>
                  <p className="text-xs text-gray-500 mt-1">Access central database of medical intake forms.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-100 hover:border-orange-500/50 hover:shadow-md transition-all cursor-pointer group flex items-start gap-4">
                <div className="bg-orange-50 text-orange-500 p-3 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1421]">Slot & Holiday Config</h4>
                  <p className="text-xs text-gray-500 mt-1">Manage global calendar and block dates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recent Appointments Awaiting Approval */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#FAFBFF]">
              <h2 className="text-lg font-bold text-[#0D1421]">Awaiting Approval</h2>
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">3 New</span>
            </div>
            
            <div className="divide-y divide-gray-100">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[#0D1421] text-sm">New Online Consult</h4>
                    <span className="text-xs font-semibold text-[#06B6D4]">₹1200</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Req by: Jane Doe (Oct 25, 4:00 PM)</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 bg-[#2563EB] text-white text-xs font-bold rounded-lg hover:bg-[#1D4ED8] transition-colors">Approve</button>
                    <button className="flex-1 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">Deny</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
