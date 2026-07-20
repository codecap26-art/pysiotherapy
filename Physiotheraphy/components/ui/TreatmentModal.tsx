"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Clock, Calendar, Activity } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { TreatmentData } from '@/lib/data/treatments';

interface TreatmentModalProps {
  treatment: TreatmentData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TreatmentModal({ treatment, isOpen, onClose }: TreatmentModalProps) {
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && treatment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0D1421]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header / Image Area */}
            <div className="relative h-64 md:h-72 w-full shrink-0">
              <img src={treatment.image} alt={treatment.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1421] to-transparent opacity-90" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <Badge variant="accent" className="mb-3 backdrop-blur-md bg-white/20 border-white/30 text-white">
                  {treatment.category}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{treatment.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-white/80">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> {treatment.sessionsExpected}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {treatment.recoveryTimeline}</span>
                  <span className="flex items-center gap-1.5 text-[#10B981]"><CheckCircle2 className="w-4 h-4"/> {treatment.successRate}% Success</span>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 md:p-8 flex-1 custom-scrollbar">
              <div className="grid md:grid-cols-3 gap-10">
                
                {/* Main Content (Left 2/3) */}
                <div className="md:col-span-2 space-y-8">
                  <section>
                    <h3 className="text-xl font-bold text-[#0D1421] mb-3 flex items-center gap-2">
                      <Activity className="text-[#1E6FFF] w-5 h-5"/> Overview
                    </h3>
                    <p className="text-[#4A5568] leading-relaxed">{treatment.conditionDescription}</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-[#0D1421] mb-4">Common Symptoms</h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {treatment.symptoms.map((sym, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#4A5568]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1E6FFF] mt-2 shrink-0"/>
                          {sym}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-[#0D1421] mb-4">Treatment Techniques</h3>
                    <div className="flex flex-wrap gap-2">
                      {treatment.treatmentTechniques.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 bg-[#F0F5FF] text-[#1E6FFF] text-sm font-semibold rounded-lg border border-[#BFDBFE]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Sidebar (Right 1/3) */}
                <div className="space-y-6">
                  <div className="bg-[#FAFBFF] border border-[#E8ECF4] rounded-2xl p-5">
                    <h4 className="font-bold text-[#0D1421] mb-3">Expected Benefits</h4>
                    <ul className="space-y-3">
                      {treatment.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#4A5568]">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0"/>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-[#EFF5FF] border border-[#BFDBFE] rounded-2xl p-5">
                    <h4 className="font-bold text-[#1E6FFF] mb-2">Book Assessment</h4>
                    <p className="text-sm text-[#4A5568] mb-4">
                      {treatment.successRateDetail} Schedule your initial assessment to begin recovery.
                    </p>
                    <Button className="w-full">Request Appointment</Button>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
