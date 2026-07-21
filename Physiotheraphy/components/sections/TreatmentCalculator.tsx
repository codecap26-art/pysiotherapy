"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Activity, Clock, Calendar } from 'lucide-react';

const painAreas = ['Neck', 'Back', 'Shoulder', 'Knee', 'Joints', 'Sports Injury', 'Post-Surgery'];
const severities = ['Mild', 'Moderate', 'Severe', 'Chronic'];

export function TreatmentCalculator() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({ area: '', severity: '' });
  const [calculating, setCalculating] = useState(false);

  const handleSelectArea = (area: string) => {
    setSelections({ ...selections, area });
    setStep(2);
  };

  const handleSelectSeverity = (severity: string) => {
    setSelections({ ...selections, severity });
    setStep(3);
    setCalculating(true);
    setTimeout(() => {
      setCalculating(false);
      setStep(4);
    }, 1500);
  };

  const reset = () => {
    setSelections({ area: '', severity: '' });
    setStep(1);
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto bg-white border border-[#E8ECF4] shadow-xl relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#EFF5FF] to-transparent rounded-full blur-3xl opacity-50 -z-10" />
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[#0D1421] mb-2">Treatment Duration Calculator</h3>
        <p className="text-[#4A5568]">Get an estimated recovery timeline tailored to your condition.</p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-4"
          >
            <p className="font-medium text-[#0D1421] mb-2">Step 1: Where is your pain located?</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {painAreas.map(area => (
                <button
                  key={area}
                  onClick={() => handleSelectArea(area)}
                  className="px-4 py-3 rounded-xl border border-[#E8ECF4] text-sm font-semibold text-[#4A5568] hover:border-[#1E6FFF] hover:bg-[#EFF5FF] hover:text-[#1E6FFF] transition-all"
                >
                  {area}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-4"
          >
            <p className="font-medium text-[#0D1421] mb-2">Step 2: How severe is the pain?</p>
            <div className="grid grid-cols-2 gap-3">
              {severities.map(severity => (
                <button
                  key={severity}
                  onClick={() => handleSelectSeverity(severity)}
                  className="px-4 py-4 rounded-xl border border-[#E8ECF4] text-center hover:border-[#1E6FFF] hover:bg-[#EFF5FF] transition-all"
                >
                  <span className="block font-semibold text-[#0D1421] mb-1">{severity}</span>
                </button>
              ))}
            </div>
            <Button variant="ghost" className="mt-4 self-center" onClick={() => setStep(1)}>
              Back
            </Button>
          </motion.div>
        )}

        {step === 3 && calculating && (
          <motion.div
            key="calculating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 gap-4"
          >
            <div className="w-16 h-16 border-4 border-[#EFF5FF] border-t-[#1E6FFF] rounded-full animate-spin"></div>
            <p className="text-[#4A5568] font-medium animate-pulse">Analyzing clinical data...</p>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D1FAE5] text-[#10B981] mb-6">
              <Activity className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#0D1421] mb-2">Estimated Recovery Plan</h4>
            <div className="bg-[#FAFBFF] rounded-xl p-6 mb-6 inline-flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between border-b border-[#E8ECF4] pb-4">
                <span className="text-[#4A5568]">Condition:</span>
                <span className="font-semibold text-[#0D1421]">{selections.severity} {selections.area}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E8ECF4] pb-4">
                <span className="flex items-center gap-2 text-[#4A5568]"><Calendar className="w-4 h-4"/> Timeline:</span>
                <span className="font-semibold text-[#1E6FFF]">4 - 6 Weeks</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#4A5568]"><Clock className="w-4 h-4"/> Sessions:</span>
                <span className="font-semibold text-[#0D1421]">8 - 12 Sessions</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => alert('Booking logic here')}>Book Initial Assessment</Button>
              <Button variant="outline" onClick={reset}>Recalculate</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Disclaimer */}
      <div className="mt-8 pt-5 border-t border-[#E8ECF4] flex flex-col items-center justify-center gap-3 text-center text-[#4A5568]">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#10B981]/10">
            <svg className="w-4 h-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xs font-medium">
            Trusted by over <span className="font-bold text-[#0D1421]">10,000+</span> patients for their recovery journey.
          </p>
        </div>
        <p className="text-[10px] text-gray-400 max-w-sm leading-tight">
          *Disclaimer: This calculator provides an estimate only. A precise recovery timeline cannot be determined without a direct clinical consultation.
        </p>
      </div>
    </Card>
  );
}
