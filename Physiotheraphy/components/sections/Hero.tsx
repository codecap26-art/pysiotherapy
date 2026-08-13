"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Star, TrendingUp, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden">

      {/* ─── BACKGROUND GRADIENT ─── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(115deg, #a4cafd 0%, #3b82f6 28%, #1d4ed8 52%, #0284c7 78%, #06b6d4 100%)',
        }}
      />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ─── MAIN 3-COLUMN CONTENT ROW AT 100% ZOOM ─── */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-14 gap-6 lg:gap-6 xl:gap-8 pb-4">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          className="flex-1 max-w-[480px] xl:max-w-[520px] flex flex-col justify-center py-2 z-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow */}
          <p className="text-[12px] xl:text-[13px] font-bold uppercase tracking-[0.18em] text-white/80 mb-2.5">
            Modern Physiotherapy • Human-Centered Care
          </p>

          {/* Headline */}
          <h1 className="text-[48px] sm:text-[64px] xl:text-[76px] font-black text-[#0D1421] leading-[0.94] tracking-tight mb-1.5">
            Healing<br />Motion
          </h1>
          <h2 className="text-[32px] sm:text-[44px] xl:text-[50px] font-black text-[#1E6FFF] tracking-tight leading-none mb-4">
            Physiotherapy
          </h2>

          <p className="text-[14px] xl:text-[16px] text-[#2c3e50] font-medium leading-[1.5] max-w-[420px] mb-6">
            Personalized physiotherapy designed around your movement, recovery, and long-term wellbeing.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-6 xl:mb-8">
            <button className="px-6 py-3.5 bg-[#1E6FFF] text-white font-extrabold rounded-2xl text-sm shadow-[0_8px_25px_rgba(30,111,255,0.4)] hover:bg-[#1558D6] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
              Book Consultation →
            </button>
            <button className="px-6 py-3.5 bg-white/40 border border-white/60 text-[#0D1421] font-bold rounded-2xl text-sm hover:bg-white/60 hover:scale-[1.02] active:scale-[0.98] transition-all backdrop-blur-md cursor-pointer">
              View Availability
            </button>
          </div>

          {/* Left Stats Row */}
          <div className="flex items-center gap-6 sm:gap-8 pt-4 border-t border-white/30">
            {[
              { val: '10+', label: 'Years Exp' },
              { val: '20+', label: 'Specialists' },
              { val: '100%', label: 'Reliability' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl xl:text-3xl font-black text-[#0D1421] leading-none">{s.val}</p>
                <p className="text-[10px] xl:text-[11px] uppercase tracking-widest text-[#475569] font-bold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CENTER DOCTOR IMAGE ── */}
        <motion.div
          className="relative flex flex-col items-center justify-end z-20 shrink-0 self-end pointer-events-none mx-auto w-full max-w-[380px] lg:max-w-[460px] xl:max-w-[520px] h-[480px] sm:h-[540px] lg:h-[600px] xl:h-[660px] -mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative w-full h-full">
            {/* Ambient soft highlight behind doctor */}
            <div className="absolute inset-0 bg-white/25 blur-[60px] rounded-full top-1/4 scale-95" />
            
            <Image
              src="/images/ChatGPT Image Aug 11, 2026, 09_38_53 AM.png"
              alt="Doctor"
              fill
              className="object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.14)]"
              sizes="(max-width: 1024px) 60vw, 35vw"
              priority
            />
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div
          className="flex-1 max-w-[380px] xl:max-w-[430px] flex flex-col justify-center py-2 z-10"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Top Info Tagline */}
          <p className="text-white/90 text-xs xl:text-sm font-semibold leading-relaxed mb-2.5">
            Innovative Interface. Maximum Caring.<br />
            <span className="text-white/75">Every element has a role to make you feel better.</span>
          </p>

          {/* Section Subheading */}
          <h3 className="text-white font-extrabold text-2xl xl:text-3xl leading-snug mb-4 tracking-tight">
            With Advanced<br />Technologies
          </h3>

          {/* Innovation Clinic Card */}
          <div className="bg-white/15 backdrop-blur-2xl border border-white/30 rounded-3xl p-4 sm:p-5 xl:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] relative overflow-hidden mb-4">
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/10 rounded-full pointer-events-none" />

            <div className="relative z-10">
              {/* Header Badge */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs leading-none mb-0.5">Healing Motion</p>
                  <p className="text-white/70 text-[10px]">With Advanced Technologies</p>
                </div>
              </div>

              <h4 className="text-white font-black text-2xl sm:text-3xl xl:text-4xl leading-tight tracking-tight mb-2">
                Innovation<br />Clinic
              </h4>
              <p className="text-white/85 text-xs leading-relaxed mb-4 max-w-[220px]">
                We treat all symptoms. We care and provide the best center.
              </p>

              <button className="px-5 py-2 bg-white text-[#1E6FFF] font-extrabold rounded-full text-xs shadow-md hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
                Book Now →
              </button>

              {/* Card Mini Stats */}
              <div className="flex items-center gap-5 mt-4 pt-3 border-t border-white/20">
                {[{ v: '10+', l: 'Years' }, { v: '20+', l: 'Experts' }, { v: '100%', l: 'Success' }].map(s => (
                  <div key={s.l}>
                    <p className="text-white font-black text-lg xl:text-xl leading-none">{s.v}</p>
                    <p className="text-white/70 text-[9px] uppercase tracking-widest mt-1 font-bold">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row Feature Badges */}
          <div className="flex items-center gap-3 relative">
            {/* Reliability Card */}
            <div className="flex-1 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/80">
              <div className="w-7 h-7 rounded-lg bg-[#EFF5FF] flex items-center justify-center mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E6FFF]" />
              </div>
              <p className="text-[#0D1421] font-bold text-[11px] mb-0.5">Reliability</p>
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
            </div>

            {/* Experience Card */}
            <div className="flex-1 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/80">
              <div className="w-7 h-7 rounded-lg bg-[#D1FAE5] flex items-center justify-center mb-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
              </div>
              <p className="text-[#0D1421] font-bold text-[11px] mb-0.5">Experience</p>
              <p className="text-[#10B981] font-black text-lg leading-none">10+</p>
            </div>

            {/* Floating Chat Circle */}
            <button
              aria-label="Contact support"
              className="w-10 h-10 rounded-full bg-[#1E6FFF] text-white flex items-center justify-center shadow-lg hover:bg-[#1558D6] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

      </div>

      {/* ─── 1-WAVELENGTH DEEP GLASSY WAVE SEAMLESS TRANSITION ─── */}
      <div className="relative w-full overflow-hidden leading-none z-20 pointer-events-none -mb-[1px] mt-8">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-24 lg:h-32 block relative z-10"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGlassHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Translucent Frosted Glass Wave Layer */}
          <path
            d="M0,45 C360,115 720,-15 1080,115 1440,45 L1440,120 L0,120 Z"
            fill="rgba(255, 255, 255, 0.28)"
          />

          {/* Main 1-Wavelength Sine Curve transitioning into white body below */}
          <path
            d="M0,58 C360,128 720,-2 1080,128 1440,58 L1440,120 L0,120 Z"
            fill="#ffffff"
          />

          {/* Glowing Glass Top Edge Highlight */}
          <path
            d="M0,58 C360,128 720,-2 1080,128 1440,58"
            stroke="url(#waveGlassHighlight)"
            strokeWidth="3.5"
            fill="none"
          />
        </svg>
      </div>

    </section>
  );
}


