'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { SpecialistsPreview } from '@/components/sections/SpecialistsPreview';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, HeartPulse, Activity, Target } from 'lucide-react';
import Image from 'next/image';

// Simple Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', label }: { end: number, suffix?: string, label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black text-[var(--color-primary)] mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm font-semibold text-[#4A5568] uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

export default function AboutPage() {
  const values = [
    { icon: Target, title: 'Personalized Plans', desc: 'Every treatment plan is custom-tailored to your specific condition, lifestyle, and recovery goals.' },
    { icon: Activity, title: 'Evidence-Based', desc: 'We only use techniques and technologies that are clinically proven to accelerate healing.' },
    { icon: HeartPulse, title: 'Compassionate Care', desc: 'We treat people, not just symptoms. We listen, educate, and empower you throughout your journey.' },
    { icon: ShieldCheck, title: 'Home & Clinic Options', desc: 'Flexible care that fits your life, whether in our state-of-the-art facility or your living room.' },
  ];

  return (
    <main className="min-h-screen bg-white pt-24 pb-0 text-[#0D1421]">
      
      {/* Intro & Mission */}
      <section className="px-6 mb-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-6">Our Story</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              Restoring movement,<br />rebuilding lives.
            </h1>
            <p className="text-lg text-[#4A5568] leading-relaxed mb-6">
              Founded in [PLACEHOLDER_YEAR], Healing Motion Physiotherapy was born from a simple belief: everyone deserves a life free from pain and physical limitations. 
            </p>
            <p className="text-lg text-[#4A5568] leading-relaxed mb-8">
              What started as a small two-room clinic has grown into a comprehensive rehabilitation center. We are driven by a commitment to personalized, evidence-based care, ensuring that every patient receives the exact treatment they need to return to their optimal self.
            </p>
            <div className="p-6 bg-[#FAFBFF] border border-[#E8ECF4] rounded-2xl border-l-4 border-l-[var(--color-primary)]">
              <p className="text-xl font-bold italic text-[#0D1421]">
                "Our mission is to bridge the gap between injury and optimal performance through expert, compassionate care."
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <Image 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" 
              alt="Physiotherapist treating a patient" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="bg-[#FAFBFF] border-y border-[#E8ECF4] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <AnimatedCounter end={10} suffix="+" label="Years in Practice" />
            <AnimatedCounter end={5000} suffix="+" label="Patients Treated" />
            <AnimatedCounter end={15} suffix="" label="Specialists on Staff" />
            <AnimatedCounter end={98} suffix="%" label="Patient Satisfaction" />
          </div>
        </div>
      </section>

      {/* Credentials (Placeholders) */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-sm font-bold text-[#8896A8] uppercase tracking-widest mb-10">
          Licensed, Certified & Accredited by
        </h3>
        <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale">
          {/* Using text as placeholder logos for now */}
          <div className="font-black text-2xl">[ACCREDITATION_1]</div>
          <div className="font-black text-2xl">[ACCREDITATION_2]</div>
          <div className="font-black text-2xl">[ACCREDITATION_3]</div>
          <div className="font-black text-2xl">[ACCREDITATION_4]</div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0D1421] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">The Healing Motion Difference</h2>
            <p className="text-lg text-[#8896A8] max-w-2xl mx-auto">
              We hold ourselves to the highest clinical standards so you can focus entirely on your recovery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/20 text-[#60A5FA] flex items-center justify-center mb-6">
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-[#94A3B8] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Description */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <Badge variant="primary" className="mb-4">Our Facility</Badge>
        <h2 className="text-3xl font-black tracking-tight mb-6 text-[#0D1421]">State-of-the-Art Recovery Space</h2>
        <p className="text-lg text-[#4A5568] leading-relaxed">
          Our clinic is equipped with the latest diagnostic and therapeutic technologies in a bright, modern, and sanitized environment. We provide private treatment rooms for manual therapy and consultations, as well as a fully equipped rehabilitation gym for guided exercise and strength training.
        </p>
      </section>

      {/* Team Teaser */}
      <div className="-mt-16">
        <SpecialistsPreview />
      </div>

      {/* CTA */}
      <section className="py-24 bg-[var(--color-primary)] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Ready to start your recovery?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Our specialists are here to help you regain your mobility and live pain-free.
          </p>
          <div className="flex justify-center">
            <Link href="/book" className="px-8 py-4 bg-white text-[var(--color-primary)] font-bold rounded-2xl text-lg shadow-xl hover:bg-primary-light border border-primary-muted transition-colors">
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
