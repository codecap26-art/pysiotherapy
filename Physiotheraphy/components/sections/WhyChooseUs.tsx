"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { value: '10+', label: 'Years Experience', color: 'text-[#1E6FFF]' },
  { value: '15', label: 'Expert Therapists', color: 'text-[#10B981]' },
  { value: '95%', label: 'Recovery Rate', color: 'text-[#1E6FFF]' },
  { value: '9.8', label: 'Patient Rating', color: 'text-[#10B981]' },
];

const whyUs = [
  {
    num: '01',
    title: 'Personalized Treatment',
    desc: 'Every plan is custom-tailored to your specific condition, lifestyle, and recovery goals.',
  },
  {
    num: '02',
    title: 'Advanced Technology',
    desc: 'We use the latest therapeutic equipment including ultrasound, laser therapy, and digital diagnostics.',
  },
  {
    num: '03',
    title: 'Expert Specialists',
    desc: 'Our therapists are certified professionals with 10+ years of clinical experience each.',
  },
  {
    num: '04',
    title: 'Proven Results',
    desc: '95% of our patients achieve their recovery targets within the estimated timeline.',
  },
];

export function WhyChooseUs() {
  return (
    <>
      {/* Stats banner */}
      <section className="bg-gradient-to-r from-[#10B981] to-[#1E6FFF] py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-5xl font-black mb-1">{s.value}</p>
                <p className="text-sm text-white/70 uppercase tracking-widest font-semibold">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Left: image & floating cards */}
            <motion.div
              className="flex-1 relative min-h-[500px]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Main rounded image */}
              <div className="relative w-[85%] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=700&h=900"
                  alt="Physiotherapy session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 85vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1421]/40 to-transparent" />
              </div>

              {/* Floating stats card */}
              <motion.div
                className="absolute -right-4 top-10 z-20 bg-white rounded-2xl shadow-xl p-5 border border-[#E8ECF4] min-w-[160px]"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <p className="text-3xl font-black text-[#1E6FFF]">10+</p>
                <p className="text-xs text-[#4A5568] font-semibold mt-1">Years of Excellence</p>
              </motion.div>

              {/* Floating success card */}
              <motion.div
                className="absolute -right-4 bottom-20 z-20 bg-gradient-to-br from-[#10B981] to-[#1E6FFF] rounded-2xl shadow-xl p-5 min-w-[180px]"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              >
                <p className="text-3xl font-black text-white">95%</p>
                <p className="text-xs text-white/80 font-semibold mt-1">Recovery Success Rate</p>
              </motion.div>

              {/* Second doctor image */}
              <div className="absolute bottom-0 right-12 w-[48%] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400&h=530"
                  alt="Doctor"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </motion.div>

            {/* Right: reasons list */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#EFF5FF] text-[#1E6FFF] text-xs font-bold tracking-widest uppercase mb-5">
                Why Choose Us
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-[#0D1421] tracking-tight leading-tight mb-4">
                Why patients choose <span className="text-[#1E6FFF]">Healing Motion</span>
              </h2>
              <p className="text-[#4A5568] text-lg leading-relaxed mb-12 max-w-lg">
                We believe every person deserves expert care that is both clinically proven and
                deeply compassionate. Here is what sets us apart.
              </p>

              <div className="flex flex-col gap-8">
                {whyUs.map((item, i) => (
                  <motion.div
                    key={item.num}
                    className="flex gap-5 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#1E6FFF] flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:scale-105 transition-transform">
                      {item.num}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0D1421] text-lg mb-1">{item.title}</h4>
                      <p className="text-[#4A5568] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12">
                <button className="px-8 py-4 bg-[#1E6FFF] text-white font-semibold rounded-2xl shadow-[0_8px_30px_rgba(30,111,255,0.35)] hover:bg-[#1558D6] transition-colors">
                  Meet Our Specialists →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
