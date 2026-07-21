"use client";

import React, { useEffect, useState } from 'react';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Step1Treatment from './steps/Step1Treatment';
import Step2TreatmentDetails from './steps/Step2TreatmentDetails';
import Step3Specialist from './steps/Step3Specialist';
import Step4Type from './steps/Step4Type';
import Step5DateTime from './steps/Step5DateTime';
import Step6PatientInfo from './steps/Step6PatientInfo';
import Step7MedicalForm from './steps/Step7MedicalForm';
import Step8Summary from './steps/Step8Summary';
import Step9Review from './steps/Step9Review';
import Step10Payment from './steps/Step10Payment';

const STEPS = [
  { id: 1, name: 'Treatment' },
  { id: 2, name: 'Details' },
  { id: 3, name: 'Specialist' },
  { id: 4, name: 'Type' },
  { id: 5, name: 'Date & Time' },
  { id: 6, name: 'Patient Info' },
  { id: 7, name: 'Medical Form' },
  { id: 8, name: 'Summary' },
  { id: 9, name: 'Review' },
  { id: 10, name: 'Payment' },
];

export default function BookingWizard() {
  const { currentStep, prevStep, nextStep } = useBookingStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for persisted store
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAFBFF] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#2563EB]/30 border-t-[#2563EB] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFF] pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sticky Progress Indicator */}
        <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 mb-8">
          <div className="flex items-center justify-between md:hidden mb-4">
            <span className="font-semibold text-gray-900">Step {currentStep} of 10</span>
            <span className="text-sm text-[#2563EB] font-medium">{STEPS[currentStep - 1].name}</span>
          </div>
          
          <div className="hidden md:flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full -z-10">
              <motion.div 
                className="h-full bg-[#2563EB] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            
            {STEPS.map((step) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                      isCompleted ? 'bg-[#2563EB] text-white' : 
                      isCurrent ? 'bg-white border-2 border-[#2563EB] text-[#2563EB]' : 
                      'bg-white border-2 border-gray-200 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`text-xs font-medium whitespace-nowrap ${isCurrent ? 'text-[#2563EB]' : 'text-gray-500'}`}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Back Button */}
        {currentStep > 1 && currentStep < 10 && (
          <button 
            onClick={prevStep}
            className="flex items-center gap-2 text-gray-500 hover:text-[#2563EB] font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}

        {/* Wizard Content */}
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 md:p-10 min-h-[600px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
                {currentStep === 1 && <Step1Treatment />}
                {currentStep === 2 && <Step2TreatmentDetails />}
                {currentStep === 3 && <Step3Specialist />}
                {currentStep === 4 && <Step4Type />}
                {currentStep === 5 && <Step5DateTime />}
                {currentStep === 6 && <Step6PatientInfo />}
                {currentStep === 7 && <Step7MedicalForm />}
                {currentStep === 8 && <Step8Summary />}
                {currentStep === 9 && <Step9Review />}
                {currentStep === 10 && <Step10Payment />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
