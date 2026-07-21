'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AGE_GROUPS } from '@/lib/conditionData';
import { Badge } from '@/components/ui/Badge';
import { Baby, Activity, PersonStanding, Accessibility, ArrowRight } from 'lucide-react';

const ICON_MAP: any = {
  Baby,
  Activity,
  PersonStanding,
  Accessibility,
};

export function AgeWiseConditions() {
  return (
    <section className="py-24 bg-[#FAFBFF]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Specialized Care</Badge>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-[#0D1421]">Care for Every Stage of Life</h2>
          <p className="text-lg text-[#4A5568] max-w-2xl mx-auto">
            From pediatric development to geriatric mobility, our specialized treatments are tailored to the unique physiological needs of your age group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {AGE_GROUPS.map((group, index) => {
            const IconComponent = ICON_MAP[group.icon] || Activity;
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={`/conditions/${group.id}`} className="group block h-full">
                  <div className="bg-white rounded-3xl p-8 border border-[#E8ECF4] shadow-sm hover:shadow-xl hover:border-[var(--color-primary)]/30 transition-all duration-300 h-full flex flex-col">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-[#0D1421] mb-1">{group.title}</h3>
                      <p className="text-sm font-semibold text-[var(--color-accent)]">{group.ageRange}</p>
                    </div>
                    
                    <p className="text-[#6B7280] text-sm leading-relaxed mb-8 flex-grow">
                      {group.description}
                    </p>
                    
                    <div className="flex items-center text-[var(--color-primary)] font-semibold text-sm group-hover:gap-3 transition-all">
                      Explore Conditions <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
