'use client';

import React from 'react';
import Link from 'next/link';
import { Activity } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFBFF] flex">
      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] relative overflow-hidden bg-gradient-to-br from-[#1E6FFF] via-[#3B82F6] to-[#10B981] flex-col justify-between p-10">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-20 right-0 w-96 h-96 rounded-full bg-white/15 blur-3xl" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tight text-white">
              Healing Motion
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
              Physiotherapy
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl xl:text-4xl font-black text-white leading-tight tracking-tight">
            Your Recovery
            <br />
            Journey Starts Here
          </h2>
          <p className="text-white/80 text-base leading-relaxed max-w-sm">
            Join thousands of patients who have regained their mobility and
            quality of life with our expert physiotherapy team.
          </p>

          {/* Trust indicators */}
          <div className="flex gap-8 pt-4">
            {[
              { value: '15K+', label: 'Patients Treated' },
              { value: '4.9★', label: 'Average Rating' },
              { value: '98%', label: 'Recovery Rate' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-white/60 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom testimonial */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
          <p className="text-white/90 text-sm italic leading-relaxed">
            &ldquo;After my ACL surgery, Healing Motion got me back on the field in 9 months.
            The online booking made scheduling effortless.&rdquo;
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
              AK
            </div>
            <div>
              <div className="text-white text-xs font-bold">Arjun Kapoor</div>
              <div className="text-white/60 text-[10px]">ACL Rehabilitation Patient</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — auth content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile logo bar */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-[#E8ECF4]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#10B981] to-[#1E6FFF] flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-black text-[#0D1421]">Healing Motion</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[#4A5568] hover:text-[#1E6FFF] transition-colors"
          >
            ← Back to site
          </Link>
        </div>

        {/* Content area */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
