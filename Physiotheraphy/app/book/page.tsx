'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { User, Phone, ChevronDown, Sun, Sunset, Headphones, PhoneCall, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeUp } from '@/lib/animations';
import { Button } from '@/components/ui/Button';

const STEPS = ['Details', 'Availability', 'Confirm'];

export default function BookAppointmentPage() {
  const [timeWindow, setTimeWindow] = useState<'morning' | 'afternoon'>('afternoon');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="bg-[#FAFBFF] min-h-screen py-16 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#1E6FFF]/6 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#10B981]/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Progress header */}
        <FadeUp>
          <div className="mb-10">
            <div className="flex justify-between items-end mb-5">
              <h1 className="text-2xl font-bold text-[#1E6FFF] tracking-tight">Request Appointment</h1>
              <span className="text-xs font-semibold text-[#8896A8]">Step 1 of 3: Details</span>
            </div>

            <div className="h-1 bg-[#E8ECF4] rounded-full mb-4 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-[#10B981] rounded-full shimmer-bar"
                initial={{ width: 0 }}
                animate={{ width: '33.33%' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              />
            </div>

            <div className="flex justify-between">
              {STEPS.map((step, i) => (
                <span
                  key={step}
                  className={`text-xs font-semibold ${i === 0 ? 'text-[#1E6FFF]' : 'text-[#CDD6E8]'}`}
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Form card */}
        <FadeUp delay={0.1}>
          <div className="bg-white rounded-3xl border border-[#E8ECF4] shadow-[0_16px_64px_-12px_rgba(0,0,0,0.08)] p-8 md:p-10 mb-6">
            <h2 className="text-2xl font-bold text-[#0D1421] mb-1 tracking-tight">Patient Information</h2>
            <p className="text-[#8896A8] text-sm mb-8">Please provide your basic information to help us prepare for your visit.</p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-[#0D1421] uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8]" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3.5 bg-[#F8FAFC] border border-[#E8ECF4] rounded-xl text-[#0D1421] text-sm placeholder:text-[#CDD6E8] focus:outline-none focus:border-[#1E6FFF] focus:bg-white focus:ring-4 focus:ring-[#1E6FFF]/10 transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-[#0D1421] uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8]" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-11 pr-4 py-3.5 bg-[#F8FAFC] border border-[#E8ECF4] rounded-xl text-[#0D1421] text-sm placeholder:text-[#CDD6E8] focus:outline-none focus:border-[#1E6FFF] focus:bg-white focus:ring-4 focus:ring-[#1E6FFF]/10 transition-all"
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-xs font-bold text-[#0D1421] uppercase tracking-wider mb-2">
                  Reason for Visit
                </label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14h6"/><path d="M12 17v-6"/></svg>
                  <select className="w-full pl-11 pr-10 py-3.5 bg-[#F8FAFC] border border-[#E8ECF4] rounded-xl text-[#0D1421] text-sm appearance-none cursor-pointer focus:outline-none focus:border-[#1E6FFF] focus:bg-white focus:ring-4 focus:ring-[#1E6FFF]/10 transition-all">
                    <option value="" disabled>Select an option</option>
                    <option value="evaluation">Initial Evaluation</option>
                    <option value="followup">Follow-up Appointment</option>
                    <option value="postop">Post-Op Rehab</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8] pointer-events-none" />
                </div>
              </div>

              {/* Time Window */}
              <div>
                <label className="block text-xs font-bold text-[#0D1421] uppercase tracking-wider mb-3">
                  Preferred Time Window
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['morning', 'afternoon'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTimeWindow(t)}
                      className={`
                        flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all duration-150
                        ${timeWindow === t
                          ? 'border-[#1E6FFF] bg-[#EFF5FF] text-[#1E6FFF] shadow-[0_0_0_4px_rgba(30,111,255,0.1)]'
                          : 'border-[#E8ECF4] bg-white text-[#4A5568] hover:border-[#BFDBFE] hover:bg-[#F8FAFC]'
                        }
                      `}
                    >
                      {t === 'morning' ? <Sun className="w-4 h-4" /> : <Sunset className="w-4 h-4" />}
                      {t === 'morning' ? 'Morning' : 'Afternoon'}
                      {timeWindow === t && <Check className="w-3.5 h-3.5 ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="accent"
                size="lg"
                className="w-full mt-2"
                isLoading={isLoading}
                onClick={handleSubmit}
              >
                Next Step
              </Button>

              <p className="text-center text-xs text-[#8896A8]">
                By clicking Next, you agree to our{' '}
                <Link href="/privacy" className="text-[#1E6FFF] hover:underline">
                  Privacy Policy
                </Link>{' '}
                regarding your medical data.
              </p>
            </form>
          </div>
        </FadeUp>

        {/* Contact strip */}
        <FadeUp delay={0.2}>
          <div className="bg-white border border-[#E8ECF4] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[var(--shadow-sm)]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#EFF5FF] rounded-xl flex items-center justify-center text-[#1E6FFF] shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#0D1421] text-sm">Prefer to speak with us directly?</p>
                <p className="text-[#8896A8] text-xs">Our coordinators are available Mon-Fri, 8am – 6pm.</p>
              </div>
            </div>
            <a href="tel:+15550123" className="flex items-center gap-2 text-[#1E6FFF] font-bold text-lg hover:text-[#1558D6] transition-colors shrink-0">
              <PhoneCall className="w-5 h-5" />
              +1-555-0123
            </a>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
