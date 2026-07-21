"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TREATMENTS, TreatmentCategory, TreatmentData } from '@/lib/data/treatments';
import { TreatmentModal } from '@/components/ui/TreatmentModal';

const FILTERS = [
  'All Treatments',
  'Physical Therapy',
  'Sports Injury',
  'Post-Operative Rehabilitation',
  'Neurological Rehabilitation',
  'Orthopedic Rehabilitation',
  'Pediatric Physiotherapy',
  "Women's Health",
  'Geriatric Care',
  'Spine Care'
];

export default function TreatmentsPage() {
  const [activeFilter, setActiveFilter] = useState('All Treatments');
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentData | null>(null);

  const filteredTreatments = TREATMENTS.filter(t => 
    activeFilter === 'All Treatments' ? true : t.category === activeFilter
  );

  return (
    <div className="min-h-screen bg-white">
      {/* ── Background Abstract Accents ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#E0F2FE]/40 to-transparent rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/4" />
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#DBEAFE]/40 to-transparent rounded-full blur-3xl opacity-60 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        {/* ── HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-[#0D1421] tracking-tight mb-6"
          >
            Specialized Treatments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-[#4A5568] leading-relaxed"
          >
            Evidence-based rehabilitation programs designed to reduce pain, restore mobility, improve strength, and help patients return to their daily activities safely.
          </motion.p>
        </div>

        {/* ── CATEGORY FILTERS ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {FILTERS.map((filter, index) => {
            const isActive = activeFilter === filter;
            return (
              <motion.button
                key={filter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md border ${
                  isActive 
                    ? 'text-white border-transparent shadow-[0_4px_12px_rgba(37,99,235,0.3)]' 
                    : 'text-[#4A5568] bg-white/60 border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] hover:text-[#0D1421]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-[#2563EB] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </motion.button>
            );
          })}
        </div>

        {/* ── TREATMENT CARDS GRID ── */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTreatments.map((treatment) => (
              <motion.div
                key={treatment.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="group flex flex-col bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.1)] border border-[#F1F5F9] overflow-hidden transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative w-full h-[240px] overflow-hidden bg-[#F8FAFC]">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Accent Gradient Overlay (subtle) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-md text-[#06B6D4] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                      {treatment.category}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col flex-1 p-6 md:p-8">
                  <h3 className="text-xl font-bold text-[#0D1421] mb-3 group-hover:text-[#2563EB] transition-colors duration-300">
                    {treatment.title}
                  </h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed mb-8 flex-1">
                    {treatment.shortDescription}
                  </p>
                  
                  {/* Learn More Button */}
                  <button
                    onClick={() => setSelectedTreatment(treatment)}
                    className="mt-auto inline-flex items-center gap-2 text-[#2563EB] font-semibold text-sm group/btn hover:text-[#1D4ED8] transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State Fallback */}
        {filteredTreatments.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[#8896A8] text-lg">No treatments found for this category.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTreatment && (
          <TreatmentModal 
            treatment={selectedTreatment} 
            isOpen={true}
            onClose={() => setSelectedTreatment(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
