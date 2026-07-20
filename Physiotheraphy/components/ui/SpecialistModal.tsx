'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Calendar, Mail, MapPin, Award, BookOpen, GraduationCap, Users, Clock, Languages, ArrowRight } from 'lucide-react';
import { Specialist } from '@/lib/data/specialists';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface SpecialistModalProps {
  isOpen: boolean;
  onClose: () => void;
  specialist: Specialist | null;
}

export function SpecialistModal({ isOpen, onClose, specialist }: SpecialistModalProps) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!specialist) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0D1421]/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#FAFBFF] w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col pointer-events-auto border border-[#E8ECF4]"
            >
              {/* Header / Hero Section */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E6FFF] via-[#06B6D4] to-[#10B981] opacity-10" />
                <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center border-b border-[#E8ECF4]/50">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full text-[#8896A8] hover:text-[#0D1421] hover:bg-[#F8FAFC] transition-colors shadow-sm border border-[#E8ECF4]"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden relative shrink-0 border-4 border-white shadow-md">
                    <Image
                      src={specialist.image}
                      alt={specialist.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-8 sm:pr-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#0D1421]">{specialist.name}</h2>
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-[#10B981]/10 rounded-full">
                        <Star className="w-4 h-4 text-[#10B981] fill-current" />
                        <span className="text-[#10B981] font-bold text-sm">{specialist.rating}</span>
                      </div>
                    </div>
                    <Badge variant={specialist.roleVariant} className="mb-4 text-sm px-3 py-1">
                      {specialist.designation}
                    </Badge>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#4A5568]">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#1E6FFF]" />
                        <span className="font-semibold">{specialist.yearsExperience} Years Experience</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#1E6FFF]" />
                        <span className="font-semibold">{specialist.patientsTreated} Patients</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10 custom-scrollbar">
                
                {/* Quote */}
                <blockquote className="text-lg sm:text-xl text-[#0D1421] font-medium leading-relaxed italic border-l-4 border-[#1E6FFF] pl-5">
                  {specialist.quote}
                </blockquote>

                {/* Biography */}
                <section>
                  <h3 className="text-lg font-bold text-[#0D1421] mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#10B981]" />
                    Biography
                  </h3>
                  <p className="text-[#4A5568] leading-relaxed text-sm sm:text-base">
                    {specialist.biography}
                  </p>
                </section>

                <div className="grid sm:grid-cols-2 gap-8">
                  {/* Credentials */}
                  <section className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[#8896A8] mb-4 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" /> Education
                      </h3>
                      <ul className="space-y-2">
                        {specialist.degrees.map((deg, i) => (
                          <li key={i} className="text-[#0D1421] text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1E6FFF] shrink-0 mt-1.5" />
                            {deg}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[#8896A8] mb-4 flex items-center gap-2">
                        <Award className="w-4 h-4" /> Certifications
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {specialist.certifications.map((cert, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white border border-[#E8ECF4] rounded-lg text-xs font-semibold text-[#4A5568] shadow-sm">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Expertise */}
                  <section className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[#8896A8] mb-4">Conditions Treated</h3>
                      <div className="flex flex-wrap gap-2">
                        {specialist.conditionsTreated.map((cond, i) => (
                          <span key={i} className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E8ECF4] rounded-full text-xs font-medium text-[#4A5568]">
                            {cond}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[#8896A8] mb-4 flex items-center gap-2">
                        <Languages className="w-4 h-4" /> Languages
                      </h3>
                      <p className="text-[#0D1421] text-sm font-medium">
                        {specialist.languages.join(', ')}
                      </p>
                    </div>
                  </section>
                </div>

                {/* Availability Info */}
                <section className="bg-white rounded-2xl border border-[#E8ECF4] p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E8ECF4] flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-[#4A5568]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0D1421]">Consultation Hours</h4>
                        <p className="text-xs text-[#4A5568]">{specialist.consultationAvailability}</p>
                      </div>
                    </div>
                    {specialist.onlineConsultationAvailable && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#D1FAE5] text-[#10B981] rounded-full text-xs font-bold border border-[#10B981]/20">
                        <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                        Telehealth Available
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Sticky Action Footer */}
              <div className="shrink-0 p-5 border-t border-[#E8ECF4] bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm font-bold text-[#0D1421]">Ready to start recovery?</p>
                  <p className="text-xs text-[#8896A8]">Book your initial assessment today.</p>
                </div>
                <div className="flex w-full sm:w-auto gap-3">
                  <Button variant="outline" className="flex-1 sm:flex-none justify-center" onClick={onClose}>
                    Close
                  </Button>
                  <a href="/book" className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 h-10 px-6 bg-[#1E6FFF] hover:bg-[#1558D6] text-white rounded-xl font-semibold text-sm transition-colors shadow-[0_4px_16px_rgba(30,111,255,0.3)]">
                    Book Consultation <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
