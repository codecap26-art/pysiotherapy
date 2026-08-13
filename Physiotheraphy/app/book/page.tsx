'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import AuthGuard from '@/components/auth/AuthGuard';
import { CheckCircle2, ArrowLeft, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Step1Category from './steps/Step1Category';
import Step2Treatment from './steps/Step2Treatment';
import Step3Clinic from './steps/Step3Clinic';
import Step4Specialist from './steps/Step4Specialist';
import Step5Date from './steps/Step5Date';
import Step6TimeSlot from './steps/Step6TimeSlot';
import Step7PatientInfo from './steps/Step7PatientInfo';
import Step8Summary from './steps/Step8Summary';

const STEPS = [
  { id: 1, name: 'Category' },
  { id: 2, name: 'Treatment' },
  { id: 3, name: 'Clinic' },
  { id: 4, name: 'Specialist' },
  { id: 5, name: 'Date' },
  { id: 6, name: 'Time Slot' },
  { id: 7, name: 'Assessment' },
  { id: 8, name: 'Summary' },
];

export default function BookingWizard() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { currentStep, prevStep, setStep, resetBooking } = useBookingStore();
  const [mounted, setMounted] = useState(false);

  const isInitialMount = React.useRef(true);

  useEffect(() => {
    setMounted(true);
    if (user?.role === 'therapist' || user?.role === 'doctor') {
      router.push('/therapist');
      return;
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (currentStep === 8) {
        resetBooking();
      }
    }
  }, [user, router, currentStep, resetBooking]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAFBFF] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1E6FFF]/30 border-t-[#1E6FFF] rounded-full animate-spin" />
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Category key="step1" />;
      case 2:
        return <Step2Treatment key="step2" />;
      case 3:
        return <Step3Clinic key="step3" />;
      case 4:
        return <Step4Specialist key="step4" />;
      case 5:
        return <Step5Date key="step5" />;
      case 6:
        return <Step6TimeSlot key="step6" />;
      case 7:
        return <Step7PatientInfo key="step7" />;
      case 8:
        return <Step8Summary key="step8" />;
      default:
        return <Step1Category key="step1" />;
    }
  };

  return (
    <AuthGuard redirectUrl="/book">
      <div className="min-h-screen bg-[#FAFBFF] pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] text-xs font-bold text-[#4A5568] hover:text-[#1E6FFF] hover:border-[#1E6FFF] transition-all cursor-pointer shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Step</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={resetBooking}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-[#8896A8] hover:text-red-500 hover:border-red-200 transition-all cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Wizard</span>
            </button>
          </div>

          {/* Sticky Progress Indicator */}
          <div className="sticky top-20 z-30 bg-white rounded-3xl shadow-sm border-2 border-[#E8ECF4] p-4 sm:p-6 mb-8">
            <div className="flex items-center justify-between md:hidden mb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-[#64748B]">
                Step {currentStep} of 8
              </span>
              <span className="text-sm text-[#1E6FFF] font-extrabold">
                {STEPS[currentStep - 1]?.name}
              </span>
            </div>

            {/* Mobile progress line */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden md:hidden mb-1">
              <div
                className="h-full bg-[#1E6FFF] transition-all duration-300"
                style={{ width: `${(currentStep / 8) * 100}%` }}
              />
            </div>

            {/* Desktop step indicators */}
            <div className="hidden md:flex items-center justify-between relative">
              <div className="absolute left-6 right-6 top-[16px] -translate-y-1/2 h-1 bg-slate-100 rounded-full z-0">
                <motion.div
                  className="h-full bg-[#1E6FFF] rounded-full"
                  initial={{ width: '0%' }}
                  animate={{
                    width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </div>

              {STEPS.map((step) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      if (step.id < currentStep) setStep(step.id as any);
                    }}
                    disabled={step.id > currentStep}
                    className="relative z-10 flex flex-col items-center gap-1.5 bg-white px-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                        isCompleted
                          ? 'bg-[#10B981] text-white shadow-xs'
                          : isCurrent
                          ? 'bg-[#1E6FFF] text-white ring-4 ring-[#1E6FFF]/20 scale-110 shadow-xs'
                          : 'bg-white border-2 border-slate-200 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                    </div>
                    <span
                      className={`text-[11px] font-bold tracking-tight whitespace-nowrap ${
                        isCurrent
                          ? 'text-[#1E6FFF]'
                          : isCompleted
                          ? 'text-[#0D1421]'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Content */}
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

        </div>
      </div>
    </AuthGuard>
  );
}
