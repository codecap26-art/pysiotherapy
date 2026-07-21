"use client";

import React from 'react';
import { Calendar, Activity, CheckCircle, Clock, FileText, ChevronRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { StartMeetingButton } from '@/components/online-meet/StartMeetingButton';

export default function PatientDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0D1421] mb-2">Welcome back, John!</h1>
        <p className="text-[#4A5568]">Here is your recovery progress and upcoming schedule.</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB]">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full">On Track</span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Recovery Progress</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-3xl font-black text-[#0D1421]">65%</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#2563EB] h-full w-[65%] rounded-full" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#06B6D4]">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Completed Sessions</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-3xl font-black text-[#0D1421]">4</span>
            <span className="text-gray-400 font-medium pb-1">/ 10</span>
          </div>
          <p className="text-sm text-gray-500 mt-4">Next session in 2 days</p>
        </div>

        <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-2xl p-6 shadow-md text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
          <div className="mb-4 relative z-10">
            <h3 className="font-bold text-lg mb-1">Book Follow-up</h3>
            <p className="text-blue-100 text-sm">Schedule your next session with Dr. Sharma.</p>
          </div>
          <button className="relative z-10 w-full py-3 bg-white text-[#2563EB] font-bold rounded-xl shadow-sm hover:bg-blue-50 transition-colors">
            Book Appointment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Upcoming & History */}
        <div className="lg:col-span-2 space-y-8">
          
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0D1421]">Upcoming Appointments</h2>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-[#2563EB]/30 transition-colors">
              <div className="flex flex-col items-center justify-center bg-blue-50 text-[#2563EB] rounded-xl w-16 h-16 shrink-0">
                <span className="text-xs font-bold uppercase">Oct</span>
                <span className="text-xl font-black">24</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0D1421] text-lg">Shoulder Rehabilitation</h4>
                <p className="text-sm text-gray-500 mt-1">Dr. Rajesh Sharma • 10:00 AM</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-[#E0F2FE] text-[#2563EB] rounded-md">
                    <Clock className="w-3 h-3" /> 60 min
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md">
                    Online Consultation
                  </span>
                  <StartMeetingButton roomName="shoulder-rehab-session-4" buttonText="Join Doctor Online Meet" />
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                <button className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  Reschedule
                </button>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0D1421]">Treatment History</h2>
              <button className="text-sm font-medium text-[#2563EB] hover:underline flex items-center">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              {[1, 2, 3].map((item, idx) => (
                <div key={item} className={`p-5 flex items-center justify-between ${idx !== 2 ? 'border-b border-gray-100' : ''}`}>
                  <div>
                    <h4 className="font-bold text-[#0D1421]">Session {4 - idx}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">Oct {20 - (idx * 3)}, 2023</p>
                  </div>
                  <button className="text-sm font-medium text-[#2563EB] flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100">
                    <FileText className="w-4 h-4" /> Notes
                  </button>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Exercises & Messages */}
        <div className="space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-[#0D1421] mb-4">Home Exercises</h2>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h4 className="font-bold text-[#0D1421] mb-1">Rotator Cuff Strengthening</h4>
                <p className="text-xs text-gray-500 mb-3">2 sets of 15 reps • Daily</p>
                <div className="w-full h-32 bg-gray-100 rounded-xl relative overflow-hidden flex items-center justify-center cursor-pointer group">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-[#2563EB] border-b-4 border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
              <button className="w-full py-3 text-sm font-semibold text-[#2563EB] hover:bg-gray-50 transition-colors">
                View All Exercises
              </button>
            </div>
          </section>

          <section>
            <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#E0F2FE] text-[#2563EB] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1421]">Message Therapist</h4>
                  <p className="text-xs text-gray-500">Replies usually within 2 hours</p>
                </div>
              </div>
              <button className="w-full py-2.5 bg-white border border-gray-200 font-semibold text-gray-700 rounded-xl shadow-sm hover:border-[#2563EB] hover:text-[#2563EB] transition-colors">
                Open Chat
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
