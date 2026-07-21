"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Star, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col">

      {/* ─── BACKGROUND: white left → gradient right ─── */}
      <div className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(110deg, #ffffff 0%, #e8f0ff 20%, #4f8ef7 42%, #1E6FFF 58%, #0ea5e9 75%, #10B981 100%)',
        }}
      />
      {/* Dot grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #1E6FFF 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Bottom fade to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-0 bg-gradient-to-b from-transparent to-[#f0fdf9]" />

      {/* ─── NAVBAR AREA spacer ─── */}
      <div className="h-16 shrink-0" />

      {/* ─── CONTENT ROW ─── */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-stretch w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-20">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          className="flex-1 flex flex-col justify-center pt-10 pb-8 lg:py-0 pr-0 lg:pr-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Small top label */}
          <p className="text-[#4A5568] text-sm font-medium mb-3 tracking-wide">
            Medicine with meaning. Design with care.<br />
            <span className="text-[#8896A8]">Where innovation meets compassion.</span>
          </p>

          {/* Giant headline */}
          <h1 className="text-[clamp(52px,7vw,108px)] font-black text-[#0D1421] leading-[0.88] tracking-tighter mb-4">
            Healing<br />Motion
          </h1>
          <h2 className="text-[clamp(26px,3.5vw,56px)] font-bold text-[#1E6FFF] tracking-tight leading-none mb-6">
            Physiotherapy
          </h2>

          <p className="text-[#4A5568] text-sm xl:text-base leading-relaxed max-w-xs mb-8">
            We treat all symptoms. We care about each person and provide the best recovery center experience.
          </p>

          {/* Book now button */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <button className="px-6 py-3 bg-[#1E6FFF] text-white font-bold rounded-2xl text-sm shadow-[0_8px_30px_rgba(30,111,255,0.4)] hover:bg-[#1558D6] transition-all">
              Book Consultation →
            </button>
            <button className="px-6 py-3 border-2 border-[#E8ECF4] text-[#0D1421] font-semibold rounded-2xl text-sm hover:bg-white/50 transition-all backdrop-blur-sm">
              View Availability
            </button>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 pt-6 border-t border-[#E8ECF4]">
            {[
              { val: '10+', label: 'Years Exp' },
              { val: '20+', label: 'Specialists' },
              { val: '100%', label: 'Reliability' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-[#0D1421]">{s.val}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#8896A8] font-semibold mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CENTER DOCTOR IMAGE ── */}
        <motion.div
          className="hidden md:flex flex-col items-center justify-end z-20 shrink-0 self-end"
          style={{ width: 'clamp(280px, 32vw, 500px)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {/* Transparent image used exactly as it is */}
          <div className="relative w-full h-full scale-110 origin-bottom" style={{ height: 'clamp(440px, 75vh, 760px)' }}>
            <Image
              src="/images/doctor_removed_bg.png"
              alt="Doctor"
              fill
              className="object-cover object-top drop-shadow-xl"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div
          className="flex-1 flex flex-col justify-center pt-8 pb-10 lg:py-0 pl-0 lg:pl-10 xl:pl-16"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Top label */}
          <p className="text-white/70 text-sm font-medium mb-6 lg:text-right">
            Innovative Interface. Maximum<br />
            <span className="text-white/50">Caring. Every element has a</span><br />
            <span className="text-white/50">role to make you feel better.</span>
          </p>

          {/* Main right tagline */}
          <h3 className="text-white font-bold text-xl xl:text-3xl leading-snug mb-8">
            With Advanced<br />Technologies
          </h3>

          {/* Innovation Clinic Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 xl:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.15)] relative overflow-hidden mb-5">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs leading-none">Healing Motion</p>
                  <p className="text-white/50 text-[10px]">With Advanced Technologies</p>
                </div>
              </div>

              <h4 className="text-white font-black text-2xl xl:text-3xl leading-none tracking-tight mb-2">
                Innovation<br />Clinic
              </h4>
              <p className="text-white/60 text-xs leading-relaxed mb-4 max-w-[180px]">
                We treat all symptoms. We care and provide the best center.
              </p>

              <button className="px-4 py-1.5 bg-white text-[#1E6FFF] font-bold rounded-xl text-xs shadow-lg hover:bg-blue-50 transition-colors">
                Book Now →
              </button>

              {/* Mini stats */}
              <div className="flex gap-5 mt-5 pt-4 border-t border-white/15">
                {[{ v: '10+', l: 'Years' }, { v: '20+', l: 'Experts' }, { v: '100%', l: 'Success' }].map(s => (
                  <div key={s.l}>
                    <p className="text-white font-black text-xl leading-none">{s.v}</p>
                    <p className="text-white/50 text-[9px] uppercase tracking-widest mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Two floating badge cards */}
          <div className="flex gap-3">
            {/* Reliability */}
            <motion.div
              className="flex-1 bg-white rounded-2xl p-4 shadow-xl border border-[#E8ECF4]"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <div className="w-7 h-7 rounded-xl bg-[#EFF5FF] flex items-center justify-center mb-2">
                <ShieldCheck className="w-4 h-4 text-[#1E6FFF]" />
              </div>
              <p className="text-[#0D1421] font-bold text-xs">Reliability</p>
              <div className="flex text-yellow-400 mt-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              className="flex-1 bg-white rounded-2xl p-4 shadow-xl border border-[#E8ECF4]"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
            >
              <div className="w-7 h-7 rounded-xl bg-[#D1FAE5] flex items-center justify-center mb-2">
                <TrendingUp className="w-4 h-4 text-[#10B981]" />
              </div>
              <p className="text-[#0D1421] font-bold text-xs">Experience</p>
              <p className="text-[#10B981] font-black text-lg leading-none mt-1">10+</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
