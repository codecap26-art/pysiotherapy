'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { 
  Activity, Dumbbell, Brain, Baby, HeartHandshake, ShieldCheck, Bone, ChevronRight 
} from 'lucide-react';

export const TREATMENT_CATEGORIES = [
  {
    id: 'Orthopedic Rehabilitation',
    title: 'Orthopedic & Joint Care',
    desc: 'Targeted therapy for arthritis, joint pain, fractures, and pre/post-operative orthopedic recovery.',
    icon: Bone,
    color: 'from-blue-500 to-indigo-600',
    count: '6 treatments',
  },
  {
    id: 'Sports Rehabilitation',
    title: 'Sports Rehabilitation',
    desc: 'High-performance recovery for ACL/meniscus injuries, rotator cuff tears, sprains, and athletic screening.',
    icon: Dumbbell,
    color: 'from-emerald-500 to-teal-600',
    count: '5 treatments',
  },
  {
    id: 'Spine & Posture Care',
    title: 'Spine & Posture Care',
    desc: 'Specialized protocols for sciatica, herniated discs, chronic lower back pain, neck stiffness, and ergonomics.',
    icon: Activity,
    color: 'from-sky-500 to-blue-600',
    count: '4 treatments',
  },
  {
    id: 'Neurological Rehabilitation',
    title: 'Neurological Rehabilitation',
    desc: 'Restorative neuromuscular therapy for stroke recovery, Parkinson’s, spinal cord conditions, and balance disorders.',
    icon: Brain,
    color: 'from-purple-500 to-indigo-600',
    count: '4 treatments',
  },
  {
    id: 'Geriatric & Mobility Care',
    title: 'Geriatric & Mobility Care',
    desc: 'Gentle mobility, fall prevention, balance training, and functional independence for seniors.',
    icon: HeartHandshake,
    color: 'from-amber-500 to-orange-600',
    count: '3 treatments',
  },
  {
    id: 'Pediatric Physiotherapy',
    title: 'Pediatric Physiotherapy',
    desc: 'Developmental motor milestones, pediatric sports rehab, postural correction, and sensory integration.',
    icon: Baby,
    color: 'from-rose-500 to-pink-600',
    count: '3 treatments',
  },
];

export default function Step1Category() {
  const { categoryId, setCategory } = useBookingStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6"
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#1E6FFF] bg-[#EFF5FF] px-3 py-1 rounded-full">
          Step 1 of 8
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0D1421] mt-3">
          Select Treatment Category
        </h2>
        <p className="text-[#64748B] text-sm mt-1">
          Choose the clinical specialty matching your condition or recovery goal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TREATMENT_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = categoryId === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`group relative p-6 rounded-3xl cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#1E6FFF] shadow-[0_8px_30px_rgba(30,111,255,0.14)] ring-4 ring-[#1E6FFF]/10'
                  : 'bg-white border-[#E8ECF4] hover:border-[#1E6FFF]/50 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#64748B]">
                    {cat.count}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0D1421] group-hover:text-[#1E6FFF] transition-colors mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  {cat.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] text-xs font-bold text-[#1E6FFF]">
                <span>{isSelected ? 'Selected' : 'Choose Category'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
