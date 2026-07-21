"use client";

import React from 'react';
import { Calendar as CalendarIcon, Clock, Users, User, Check, X, FileEdit, Plus, Search } from 'lucide-react';

export default function TherapistDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0D1421] mb-2">Dr. Rajesh Sharma</h1>
          <p className="text-[#4A5568]">Here is your schedule for today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" /> Date Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Today's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0D1421]">Today's Appointments (8)</h2>
              <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg text-sm text-gray-500">
                <Search className="w-4 h-4 mr-2" />
                <input type="text" placeholder="Search patient..." className="bg-transparent outline-none w-32" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {/* Patient Row 1 - Active */}
              <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-blue-50/50 transition-colors border-l-4 border-[#2563EB]">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-[#E0F2FE] text-[#2563EB] rounded-full flex items-center justify-center font-bold text-lg">
                    JD
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0D1421]">John Doe</h4>
                    <p className="text-sm text-gray-500">Shoulder Rehab (Session 4/10)</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs font-semibold text-[#2563EB]">
                        <Clock className="w-3 h-3" /> 10:00 AM - 11:00 AM
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-[#1D4ED8] flex items-center justify-center gap-2">
                    <FileEdit className="w-4 h-4" /> Start Session
                  </button>
                </div>
              </div>

              {/* Patient Row 2 - Upcoming */}
              <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-50 transition-colors border-l-4 border-transparent">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-bold text-lg">
                    SA
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0D1421]">Sarah Anderson</h4>
                    <p className="text-sm text-gray-500">Initial Assessment - Back Pain</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs font-semibold text-gray-500">
                        <Clock className="w-3 h-3" /> 11:30 AM - 12:15 PM
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded font-semibold">New Patient</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <button className="px-3 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">
                    View Intake Form
                  </button>
                </div>
              </div>

               {/* Patient Row 3 - Completed */}
               <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between opacity-60 border-l-4 border-green-500 bg-gray-50">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-lg">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0D1421] line-through">Mike Ross</h4>
                    <p className="text-sm text-gray-500">Knee Osteoarthritis</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs font-semibold text-gray-500">
                        <Clock className="w-3 h-3" /> 09:00 AM - 09:45 AM
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <span className="text-sm font-bold text-green-600">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Stats & Patient Preview */}
        <div className="space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
              <p className="text-sm text-gray-500 font-medium mb-1">Total Patients</p>
              <p className="text-2xl font-black text-[#0D1421]">142</p>
            </div>
            <div className="bg-[#2563EB] p-5 rounded-2xl shadow-sm text-center text-white">
              <p className="text-sm text-blue-100 font-medium mb-1">Completed</p>
              <p className="text-2xl font-black">1/8</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
            <h3 className="font-bold text-lg text-[#0D1421] mb-4">Add Patient Note</h3>
            <textarea 
              rows={4}
              placeholder="Quick observation for current session..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2563EB] resize-none mb-4"
            />
            <button className="w-full py-2.5 bg-gray-100 text-[#2563EB] font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Save Note
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
