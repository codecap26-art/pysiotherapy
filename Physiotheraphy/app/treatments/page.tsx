"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { TREATMENTS, TreatmentCategory, TreatmentData } from '@/lib/data/treatments';
import { TreatmentModal } from '@/components/ui/TreatmentModal';

const FILTERS = ['All Treatments', 'Physical Therapy', 'Post-Operative Rehabilitation', 'Sports Injury', 'Neurological Rehabilitation', 'Orthopedic Rehabilitation'];

export default function TreatmentsPage() {
  const [activeFilter, setActiveFilter] = useState('All Treatments');
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentData | null>(null);

  const filteredTreatments = TREATMENTS.filter(t => 
    activeFilter === 'All Treatments' ? true : t.category === activeFilter
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">

      {/* ── TOP-LEFT triangle ── */}
      <div className="absolute left-0 top-0 w-[420px] h-[420px] pointer-events-none overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=700"
          alt="" aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ opacity: 0.5 }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.80) 0%, rgba(14,165,233,0.55) 55%, transparent 100%)' }}
        />
      </div>

      {/* ── TOP-RIGHT triangle ── */}
      <div className="absolute right-0 top-0 w-[420px] h-[420px] pointer-events-none overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=700"
          alt="" aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.5 }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(225deg, rgba(30,111,255,0.80) 0%, rgba(14,165,233,0.55) 55%, transparent 100%)' }}
        />
      </div>

      {/* ── BOTTOM-LEFT triangle ── */}
      <div className="absolute left-0 bottom-0 w-[420px] h-[420px] pointer-events-none overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=700"
          alt="" aria-hidden="true"
          className="w-full h-full object-cover object-top"
          style={{ opacity: 0.5 }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(315deg, rgba(16,185,129,0.80) 0%, rgba(14,165,233,0.55) 55%, transparent 100%)' }}
        />
      </div>

      {/* ── BOTTOM-RIGHT triangle ── */}
      <div className="absolute right-0 bottom-0 w-[420px] h-[420px] pointer-events-none overflow-hidden"
        style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=700"
          alt="" aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.5 }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(45deg, rgba(30,111,255,0.80) 0%, rgba(16,185,129,0.55) 55%, transparent 100%)' }}
        />
      </div>


      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center relative z-10">

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0D1421] mb-6 tracking-tight">
          Specialized <span className="bg-gradient-to-r from-[#1E6FFF] to-[#10B981] bg-clip-text text-transparent">Treatments</span>
        </h1>
        <p className="text-lg md:text-xl text-[#4A5568] max-w-2xl mx-auto leading-relaxed mb-12">
          Evidence-based clinical protocols designed to restore movement, alleviate pain, and build long-term resilience. Select a category below to explore our services.
        </p>

        {/* Dynamic Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200
                  ${isActive
                    ? 'bg-[#1E6FFF] text-white border-[#1E6FFF] shadow-md shadow-[#1E6FFF]/20'
                    : 'bg-white border-[#E8ECF4] text-[#4A5568] hover:border-[#1E6FFF]/40 hover:bg-[#EFF5FF] hover:text-[#1E6FFF]'
                  }
                `}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      {/* Dynamic Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredTreatments.map((t) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={t.id}
              >
                <div 
                  className="bg-white rounded-3xl border border-[#E8ECF4] overflow-hidden flex flex-col h-full group hover:shadow-xl hover:border-[#BFDBFE] transition-all cursor-pointer"
                  onClick={() => setSelectedTreatment(t)}
                >
                  <div className="relative h-60 overflow-hidden bg-[#FAFBFF]">
                    <Image
                      src={t.image}
                      alt={t.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-7 flex-1 flex flex-col">
                    <div className="mb-4 inline-flex items-center px-3 py-1 bg-[#EFF5FF] text-[#1E6FFF] text-xs font-bold rounded-lg self-start">
                      {t.category}
                    </div>
                    <h3 className="text-xl font-bold text-[#0D1421] mb-3">{t.title}</h3>
                    <p className="text-[#4A5568] text-sm leading-relaxed flex-1 mb-6">
                      {t.shortDescription}
                    </p>

                    <div className="flex items-center justify-between text-sm font-semibold text-[#1E6FFF] pt-5 border-t border-[#E8ECF4]">
                      View Full Details
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTreatments.length === 0 && (
          <div className="text-center py-20 text-[#8896A8]">
            No treatments found for this category.
          </div>
        )}
      </section>

      <TreatmentModal
        treatment={selectedTreatment}
        isOpen={!!selectedTreatment}
        onClose={() => setSelectedTreatment(null)}
      />

    </div>
  );
}
