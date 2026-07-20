"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bone, Activity, Dumbbell, Stethoscope, Zap, HeartPulse } from 'lucide-react';

const services = [
  {
    num: '01',
    icon: Activity,
    title: 'Manual Therapy',
    desc: 'Hands-on techniques to mobilize joints, reduce pain, and restore natural movement.',
  },
  {
    num: '02',
    icon: Bone,
    title: 'Orthopedic Rehab',
    desc: 'Expert care for bones, joints, muscles and recovering from severe sports injuries.',
  },
  {
    num: '03',
    icon: HeartPulse,
    title: "Post-Surgical Care",
    desc: 'Specialized guided recovery programs to help you bounce back safely after surgery.',
  },
  {
    num: '04',
    icon: Zap,
    title: 'Sports Recovery',
    desc: 'High-performance recovery plans tailored for athletes and active individuals.',
  },
  {
    num: '05',
    icon: Dumbbell,
    title: 'Strength & Conditioning',
    desc: 'Targeted clinical exercises to rebuild muscle strength and prevent future injury.',
  },
];

export function MedicalServices() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden font-sans"
      style={{ background: 'linear-gradient(135deg, #f0fdf9 0%, #f0f7ff 40%, #e8f4ff 70%, #ecfdf5 100%)' }}
    >
      {/* ── Green-blue ambient gradient orbs ── */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(30,111,255,0.15) 0%, transparent 70%)' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(14,165,233,0.3) 0%, transparent 70%)' }}
      />

      {/* ── Left decorative physio image ── */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[220px] h-[420px] pointer-events-none hidden lg:block" style={{ opacity: 0.07 }}>
        <img
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=400"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(0) contrast(1.2)' }}
        />
      </div>

      {/* ── Right decorative physio image ── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[220px] h-[420px] pointer-events-none hidden lg:block" style={{ opacity: 0.07 }}>
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-left"
          style={{ filter: 'saturate(0) contrast(1.2)' }}
        />
      </div>
      <div className="container mx-auto px-6 lg:px-12 max-w-[1600px] relative z-10">

        {/* Section header area */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-20">
          <div>
            <h2 className="text-4xl lg:text-6xl font-medium text-[#0D1421] tracking-tight flex items-baseline gap-4">
              Our medical<br />services
              <span className="text-sm font-normal text-[#8896A8] tracking-normal relative -top-6">[ What you get ]</span>
            </h2>
          </div>
          <div className="max-w-xs mt-6 lg:mt-0 text-right">
            <p className="text-sm text-[#8896A8] leading-relaxed mb-2">
              We provide a full range of medical services — from consultation to diagnosis and treatment.
            </p>
            <Link href="/treatments" className="text-sm font-semibold text-[#1E6FFF] hover:underline">See all →</Link>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-fr">
          
          {/* Card 01 */}
          <ServiceCard service={services[0]} />

          {/* Brand Blue Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1E6FFF] to-[#3b82f6] rounded-[2rem] p-8 lg:p-10 text-white relative overflow-hidden shadow-[0_20px_40px_rgba(30,111,255,0.2)] flex flex-col justify-center min-h-[320px]"
          >
            {/* Decorative circles */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute top-10 -right-10 w-32 h-32 bg-[#10B981]/20 rounded-full blur-xl" />
            <div className="absolute bottom-1/4 right-1/4 w-12 h-12 border-4 border-white/20 rounded-full" />
            <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-white/20 rounded-full" />
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full blur-sm" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-light tracking-tight mb-6">
                Healing<span className="font-bold">Motion</span>
              </h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-[200px]">
                From consultation and diagnosis to treatment with care and attention to detail.
              </p>
            </div>
          </motion.div>

          {/* Card 02 */}
          <ServiceCard service={services[1]} />

          {/* Card 03 */}
          <ServiceCard service={services[2]} />

          {/* Card 04 */}
          <ServiceCard service={services[3]} />

          {/* Card 05 */}
          <ServiceCard service={services[4]} />

          {/* Spanning Photo Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-2 rounded-[2rem] overflow-hidden relative min-h-[320px]"
          >
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1200&h=800" 
              alt="Physiotherapy treatment" 
              className="w-full h-full object-cover"
            />
            {/* Faint blue overlay to match brand */}
            <div className="absolute inset-0 bg-[#1E6FFF]/10 mix-blend-multiply pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: any }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white hover:bg-[#1E6FFF] rounded-[2rem] p-8 lg:p-10 border border-[#E8ECF4] hover:border-[#1E6FFF] shadow-sm hover:shadow-[0_20px_40px_rgba(30,111,255,0.2)] transition-all duration-300 relative flex flex-col justify-between min-h-[320px] cursor-pointer"
    >
      <div>
        {/* Giant faint number */}
        <div className="text-[80px] lg:text-[100px] font-black text-[#F1F5F9] group-hover:text-white/10 leading-none absolute top-4 left-6 pointer-events-none select-none transition-colors duration-300">
          {service.num}
        </div>
        
        {/* Content sits above number */}
        <div className="relative z-10 pt-16">
          <div className="flex items-center gap-3 mb-4">
            <Icon className="w-5 h-5 text-[#4A5568] group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
            <h4 className="font-bold text-xl text-[#0D1421] group-hover:text-white tracking-tight transition-colors duration-300">{service.title}</h4>
          </div>
          <p className="text-sm text-[#8896A8] group-hover:text-white/80 leading-relaxed max-w-[220px] ml-8 transition-colors duration-300">
            {service.desc}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between mt-8 ml-8">
        <Link href="/book" className="text-xs font-semibold text-[#1E6FFF] group-hover:text-white hover:underline transition-colors duration-300">
          Make an appointment
        </Link>
        <Link href="/treatments" className="text-xs font-semibold text-[#8896A8] group-hover:text-white/70 hover:text-[#0D1421] group-hover:hover:text-white underline underline-offset-4 decoration-[#E8ECF4] group-hover:decoration-white/30 transition-all duration-300">
          Price
        </Link>
      </div>
    </motion.div>
  );
}
