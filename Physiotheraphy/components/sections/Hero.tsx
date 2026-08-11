"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Star, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const STATS = [
  { value: '10+', label: 'Years Experience' },
  { value: '15', label: 'Expert Therapists' },
  { value: '95%', label: 'Recovery Rate' },
  { value: '9.8', label: 'Patient Rating' },
];

export function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between">

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

      {/* ─── NAVBAR AREA spacer ─── */}
      <div className="h-20 shrink-0" />

      {/* ─── CONTENT ROW ─── */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center w-full max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 gap-4 lg:gap-4 xl:gap-6">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          className="flex-1 max-w-[550px] xl:max-w-[600px] flex flex-col justify-center pt-12 pb-10 lg:py-0 pr-0 lg:pr-2 xl:pr-4 z-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Small top label */}
          <p className="text-[#4A5568] text-base lg:text-lg font-medium mb-4 tracking-wide">
            Medicine with meaning. Design with care.<br />
            <span className="text-[#8896A8]">Where innovation meets compassion.</span>
          </p>

          {/* Giant headline */}
          <h1 className="text-[clamp(56px,7vw,110px)] font-black text-[#0D1421] leading-[0.9] tracking-tighter mb-4">
            Healing<br />Motion
          </h1>
          <h2 className="text-[clamp(28px,4vw,60px)] font-bold text-[#1E6FFF] tracking-tight leading-none mb-6">
            Physiotherapy
          </h2>

          <p className="text-[#4A5568] text-base lg:text-xl leading-relaxed max-w-lg mb-8">
            We treat all symptoms. We care about each person and provide the best recovery center experience.
          </p>

          {/* Book now button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button className="px-8 py-4 bg-[#1E6FFF] text-white font-bold rounded-2xl text-base shadow-[0_8px_30px_rgba(30,111,255,0.4)] hover:bg-[#1558D6] transition-all">
              Book Consultation →
            </button>
            <button className="px-8 py-4 border-2 border-[#E8ECF4] text-[#0D1421] font-semibold rounded-2xl text-base hover:bg-white/50 transition-all backdrop-blur-sm">
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
                <p className="text-3xl lg:text-4xl font-black text-[#0D1421]">{s.val}</p>
                <p className="text-xs lg:text-sm uppercase tracking-widest text-[#8896A8] font-bold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CENTER DOCTOR IMAGE ── */}
        <motion.div
          className="hidden md:flex flex-col items-center justify-end z-20 shrink-0 self-end -mb-10 lg:-mb-16 pointer-events-none -mx-8 lg:-mx-16 xl:-mx-28"
          style={{ width: 'clamp(500px, 58vw, 900px)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <div
            className="relative w-full h-full origin-bottom"
            style={{ height: 'clamp(600px, 92vh, 1000px)' }}
          >
            <Image
              src="/images/ChatGPT Image Aug 11, 2026, 09_38_53 AM.png"
              alt="Doctor"
              fill
              className="object-contain object-bottom drop-shadow-2xl scale-[1.10]"
              sizes="(max-width: 768px) 100vw, 1000px"
              priority
            />
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div
          className="flex-1 max-w-[420px] xl:max-w-[480px] flex flex-col justify-center pt-10 pb-12 lg:py-0 pl-0 lg:pl-4 z-10"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Top label */}
          <p className="text-white/80 text-sm xl:text-base font-medium mb-6 lg:text-right">
            Innovative Interface. Maximum<br />
            <span className="text-white/60">Caring. Every element has a</span><br />
            <span className="text-white/60">role to make you feel better.</span>
          </p>

          {/* Main right tagline */}
          <h3 className="text-white font-bold text-2xl xl:text-4xl leading-snug mb-8">
            With Advanced<br />Technologies
          </h3>

          {/* Innovation Clinic Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 xl:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] relative overflow-hidden mb-6">
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm xl:text-base leading-none mb-1">Healing Motion</p>
                  <p className="text-white/60 text-xs xl:text-sm">With Advanced Technologies</p>
                </div>
              </div>

              <h4 className="text-white font-black text-3xl xl:text-5xl leading-none tracking-tight mb-4">
                Innovation<br />Clinic
              </h4>
              <p className="text-white/80 text-sm xl:text-base leading-relaxed mb-6 max-w-[240px]">
                We treat all symptoms. We care and provide the best center.
              </p>

              <button className="px-5 py-2.5 bg-white text-[#1E6FFF] font-bold rounded-xl text-sm xl:text-base shadow-lg hover:bg-blue-50 transition-colors">
                Book Now →
              </button>

              {/* Mini stats */}
              <div className="flex gap-6 mt-6 pt-5 border-t border-white/15">
                {[{ v: '10+', l: 'Years' }, { v: '20+', l: 'Experts' }, { v: '100%', l: 'Success' }].map(s => (
                  <div key={s.l}>
                    <p className="text-white font-black text-2xl xl:text-3xl leading-none">{s.v}</p>
                    <p className="text-white/60 text-xs uppercase tracking-widest mt-1.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Two badge cards */}
          <div className="flex gap-4">
            {/* Reliability */}
            <div className="flex-1 bg-white rounded-3xl p-5 shadow-xl border border-[#E8ECF4]">
              <div className="w-10 h-10 rounded-xl bg-[#EFF5FF] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 text-[#1E6FFF]" />
              </div>
              <p className="text-[#0D1421] font-bold text-sm xl:text-base mb-1">Reliability</p>
              <div className="flex text-yellow-400 mt-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </div>

            {/* Experience */}
            <div className="flex-1 bg-white rounded-3xl p-5 shadow-xl border border-[#E8ECF4]">
              <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
              </div>
              <p className="text-[#0D1421] font-bold text-sm xl:text-base mb-1">Experience</p>
              <p className="text-[#10B981] font-black text-2xl xl:text-3xl leading-none mt-1">10+</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── INTEGRATED STATS ROW ─── */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-10 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl p-6 lg:p-8 backdrop-blur-md border bg-white/15 border-white/25 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.03]"
            >
              <p className="text-4xl md:text-6xl font-black mb-2 tracking-tight text-white">
                {s.value}
              </p>
              <p className="text-sm md:text-base uppercase tracking-widest font-bold text-white/90">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── 1-WAVELENGTH CURVE AT BOTTOM OF HERO MERGED INTO NEXT SECTION ─── */}
      <div className="relative w-full overflow-hidden leading-none z-10 pointer-events-none -mb-[1px]">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 md:h-16 lg:h-20 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C240,56 480,56 720,30 C960,4 1200,4 1440,30 L1440,60 L0,60 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

    </section>
  );
}
