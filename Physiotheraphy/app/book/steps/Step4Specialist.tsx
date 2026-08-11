'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { getSpecialists } from '@/lib/services/specialistService';
import { Star, Award, Calendar, Check, ChevronRight, Sparkles } from 'lucide-react';

export default function Step4Specialist() {
  const { specialistId, setSpecialist } = useBookingStore();
  const [specialists, setSpecialists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getSpecialists();
      setSpecialists(data || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading specialists...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6"
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#1E6FFF] bg-[#EFF5FF] px-3 py-1 rounded-full">
          Step 4 of 8
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0D1421] mt-3">
          Select Physiotherapist
        </h2>
        <p className="text-[#64748B] text-sm mt-1">
          Our certified clinical therapists are leaders in rehabilitative medicine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialists.length === 0 ? (
          <div className="col-span-full p-8 text-center text-[#64748B] bg-white rounded-3xl border-2 border-dashed border-[#E8ECF4]">
            <p className="text-lg font-bold text-[#0D1421] mb-2">No Specialists Available</p>
            <p>We couldn't find any specialists matching your criteria at this time.</p>
          </div>
        ) : (
          specialists.map((doc) => {
            const isSelected = specialistId === doc.id;
            
            // Fallbacks for demo schema
            const image = doc.image_url || `https://ui-avatars.com/api/?name=${doc.first_name}+${doc.last_name}&background=1E6FFF&color=fff`;
            const rating = 4.9;
            const reviews = 120;
            const experience = 10;
            const qualifications = "PT, DPT";
            const specializations = [doc.specialization, "Rehabilitation"];

            return (
              <div
                key={doc.id}
                onClick={() => setSpecialist(doc.id)}
                className={`group relative p-6 rounded-3xl cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#1E6FFF] shadow-[0_8px_30px_rgba(30,111,255,0.14)] ring-4 ring-[#1E6FFF]/10'
                    : 'bg-white border-[#E8ECF4] hover:border-[#1E6FFF]/50 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Doctor Avatar & Rating */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-xs">
                      <Image
                        src={image}
                        alt={doc.full_name || 'Specialist'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#0D1421] group-hover:text-[#1E6FFF] transition-colors leading-tight">
                        {doc.full_name || 'Dr. Specialist'}
                      </h3>
                      <p className="text-xs text-[#1E6FFF] font-semibold mt-0.5">
                        {doc.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {rating}
                        </div>
                        <span className="text-[11px] text-[#8896A8]">({reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Experience & Qualifications */}
                  <div className="space-y-2 text-xs text-[#64748B] mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>{experience} Years Experience • {qualifications}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#1E6FFF]" />
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                        Available Today
                      </span>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {specializations.slice(0, 2).map((spec) => (
                      <span
                        key={spec}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] text-xs font-bold text-[#1E6FFF]">
                  <span>{isSelected ? '✓ Specialist Selected' : 'Choose Specialist'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
