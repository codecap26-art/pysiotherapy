'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { getClinics } from '@/lib/services/clinicService';
import { 
  MapPin, Navigation, Clock, Star, Car, Accessibility, Check, ChevronRight 
} from 'lucide-react';

export default function Step3Clinic() {
  const { clinicId, setClinic } = useBookingStore();
  const [clinics, setClinics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getClinics();
      setClinics(data || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
     return <div className="p-8 text-center text-slate-500">Loading clinics...</div>;
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
          Step 3 of 8
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0D1421] mt-3">
          Select Clinic Branch
        </h2>
        <p className="text-[#64748B] text-sm mt-1">
          Choose the most convenient Healing Motion clinical center for your in-person visit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clinics.map((clinic) => {
          const isSelected = clinicId === clinic.id;
          
          // Fallback visuals for demo purposes (schema is simplified)
          const tagline = "Premium Physiotherapy Hub";
          const rating = 4.9;
          const reviewsCount = 120;
          const distanceKm = "3.2";
          const publicTransit = "Near Metro";
          const hours = "8:00 AM - 8:00 PM";
          const parking = true;
          const wheelchairAccessible = true;
          const amenities = ["Free Wi-Fi", "Coffee Bar"];

          return (
            <div
              key={clinic.id}
              onClick={() => setClinic(clinic.id)}
              className={`group relative p-6 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#1E6FFF] shadow-[0_8px_30px_rgba(30,111,255,0.14)] ring-4 ring-[#1E6FFF]/10'
                  : 'bg-white border-[#E8ECF4] hover:border-[#1E6FFF]/50 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-[#0D1421] group-hover:text-[#1E6FFF] transition-colors">
                        {clinic.name}
                      </h3>
                    </div>
                    <p className="text-xs font-medium text-[#1E6FFF]">
                      {tagline}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-bold text-amber-700 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {rating} ({reviewsCount})
                  </div>
                </div>

                {/* Address & distance */}
                <div className="space-y-2 mt-4 text-xs text-[#64748B]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#1E6FFF] shrink-0 mt-0.5" />
                    <span>{clinic.address}, {clinic.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span className="font-semibold text-[#0D1421]">{distanceKm} km away</span>
                    <span>• {publicTransit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8896A8] shrink-0" />
                    <span>{hours}</span>
                  </div>
                </div>

                {/* Badges & Amenities */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {parking && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                      <Car className="w-3 h-3 text-[#1E6FFF]" /> Valet Parking
                    </span>
                  )}
                  {wheelchairAccessible && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg">
                      <Accessibility className="w-3 h-3" /> Wheelchair Accessible
                    </span>
                  )}
                  {amenities.slice(0, 2).map((a) => (
                    <span
                      key={a}
                      className="text-[11px] font-medium bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] px-2.5 py-1 rounded-lg"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 mt-5 border-t border-[#F1F5F9] text-xs font-bold text-[#1E6FFF]">
                <span>{isSelected ? '✓ Clinic Selected' : 'Choose This Branch'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
