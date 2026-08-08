'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { TREATMENTS, formatPrice } from '@/lib/bookingData';
import { Clock, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function Step2Treatment() {
  const { categoryId, treatmentId, setTreatment } = useBookingStore();

  // If a category was chosen, map or show all treatments
  const displayedTreatments = TREATMENTS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6"
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#1E6FFF] bg-[#EFF5FF] px-3 py-1 rounded-full">
          Step 2 of 8
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0D1421] mt-3">
          Choose Specific Treatment
        </h2>
        <p className="text-[#64748B] text-sm mt-1">
          Select the treatment protocol best tailored to your symptoms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedTreatments.map((t) => {
          const isSelected = treatmentId === t.id;

          return (
            <div
              key={t.id}
              onClick={() => setTreatment(t.id)}
              className={`group relative p-6 rounded-3xl cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#1E6FFF] shadow-[0_8px_30px_rgba(30,111,255,0.14)] ring-4 ring-[#1E6FFF]/10'
                  : 'bg-white border-[#E8ECF4] hover:border-[#1E6FFF]/50 hover:shadow-md'
              }`}
            >
              {t.popular && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#EFF5FF] text-[#1E6FFF] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#BFDBFE]">
                  <Sparkles className="w-3 h-3" />
                  Popular
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-[#0D1421] group-hover:text-[#1E6FFF] transition-colors mb-2 pr-16">
                  {t.name}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  {t.shortDesc}
                </p>

                <div className="flex items-center gap-4 text-xs font-semibold text-[#475569] mb-4">
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-[#1E6FFF]" />
                    {t.duration}
                  </div>
                  <div className="text-sm font-bold text-[#0D1421]">
                    {formatPrice(t.startingPrice)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {t.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#64748B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] text-xs font-bold text-[#1E6FFF]">
                <span>{isSelected ? '✓ Selected' : 'Select Treatment'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
