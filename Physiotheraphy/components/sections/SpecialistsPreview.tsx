'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SPECIALISTS } from '@/lib/bookingData';
import { Badge } from '@/components/ui/Badge';
import { Star, MapPin } from 'lucide-react';

export function SpecialistsPreview() {
  const topSpecialists = SPECIALISTS.slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <Badge variant="primary" className="mb-4">Our Experts</Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#0D1421]">Meet Our Specialists</h2>
          </div>
          <Link href="/specialists" className="px-6 py-3 bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-all whitespace-nowrap">
            View All Specialists →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topSpecialists.map((spec, idx) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl border border-[#E8ECF4] shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image src={spec.image} alt={spec.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex items-center gap-1 bg-white/90 backdrop-blur text-[#0D1421] text-xs font-bold px-2 py-1 rounded-md mb-2 w-max">
                    <Star className="w-3 h-3 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                    {spec.rating} ({spec.reviews})
                  </div>
                  <h3 className="text-xl font-bold text-white">{spec.name}</h3>
                  <p className="text-white/80 text-sm">{spec.title}</p>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {spec.specializations.slice(0, 3).map(specialty => (
                    <span key={specialty} className="bg-[#F8FAFC] text-[#4A5568] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border border-[#E8ECF4]">
                      {specialty}
                    </span>
                  ))}
                </div>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-6 line-clamp-3">
                  {spec.bio}
                </p>
                <div className="mt-auto pt-4 border-t border-[#E8ECF4] flex justify-between items-center">
                  <div className="text-xs text-[#8896A8] font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> In-Clinic & Home
                  </div>
                  <Link href={`/book?specialist=${spec.id}`} className="text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors">
                    Book →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
