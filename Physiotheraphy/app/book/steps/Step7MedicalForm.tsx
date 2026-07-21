"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { ArrowRight, UploadCloud } from 'lucide-react';

const medicalSchema = z.object({
  primaryComplaint: z.string().min(5, 'Please describe your primary complaint'),
  painArea: z.string().min(2, 'Pain area is required'),
  painLevel: z.number().min(1).max(10),
  painDuration: z.string().min(1, 'Please select duration'),
  pastInjuries: z.string().optional(),
  currentMedication: z.string().optional(),
  allergies: z.string().optional(),
  medicalHistory: z.string().optional(),
  chronicConditions: z.string().optional(),
  activityLevel: z.string().min(1, 'Activity level is required'),
  occupationalRisk: z.string().optional(),
  recoveryGoals: z.string().min(5, 'Please share your recovery goals'),
});

type MedicalFormValues = z.infer<typeof medicalSchema>;

export default function Step7MedicalForm() {
  const { medicalInfo, setMedicalInfo, nextStep } = useBookingStore();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<MedicalFormValues>({
    resolver: zodResolver(medicalSchema),
    defaultValues: medicalInfo || {
      primaryComplaint: '',
      painArea: '',
      painLevel: 5,
      painDuration: '',
      pastInjuries: '',
      currentMedication: '',
      allergies: '',
      medicalHistory: '',
      chronicConditions: '',
      activityLevel: '',
      occupationalRisk: '',
      recoveryGoals: '',
    },
  });

  const painLevel = watch('painLevel');

  const onSubmit = (data: MedicalFormValues) => {
    setMedicalInfo(data);
    nextStep();
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D1421] mb-2">Medical Questionnaire</h2>
        <p className="text-[#8896A8]">Help our specialists prepare for your session by providing some context.</p>
      </div>

      <form id="medical-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-12 flex-1 overflow-y-auto pr-2">
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Primary Complaint / Reason for Visit *</label>
          <textarea 
            {...register('primaryComplaint')} 
            rows={2}
            className={`w-full px-4 py-3 rounded-xl border ${errors.primaryComplaint ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all resize-none`}
            placeholder="E.g., Sharp pain in my lower back when bending..."
          />
          {errors.primaryComplaint && <p className="text-red-500 text-xs mt-1">{errors.primaryComplaint.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Pain Area *</label>
            <input 
              {...register('painArea')} 
              className={`w-full px-4 py-3 rounded-xl border ${errors.painArea ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
              placeholder="Lower back, right shoulder..."
            />
            {errors.painArea && <p className="text-red-500 text-xs mt-1">{errors.painArea.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">How long have you had this pain? *</label>
            <select 
              {...register('painDuration')} 
              className={`w-full px-4 py-3 rounded-xl border ${errors.painDuration ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all bg-white`}
            >
              <option value="">Select duration...</option>
              <option value="Less than a week">Less than a week</option>
              <option value="1-4 weeks">1-4 weeks</option>
              <option value="1-6 months">1-6 months</option>
              <option value="More than 6 months">More than 6 months</option>
            </select>
            {errors.painDuration && <p className="text-red-500 text-xs mt-1">{errors.painDuration.message}</p>}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-semibold text-gray-700">Pain Level (1-10) *</label>
            <span className={`font-bold text-lg ${painLevel > 7 ? 'text-red-500' : painLevel > 4 ? 'text-orange-500' : 'text-green-500'}`}>
              {painLevel}
            </span>
          </div>
          <input 
            type="range"
            min="1"
            max="10"
            {...register('painLevel', { valueAsNumber: true })} 
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
            <span>Mild</span>
            <span>Moderate</span>
            <span>Severe</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Past Surgeries / Injuries (Optional)</label>
            <input 
              {...register('pastInjuries')} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB] outline-none focus:ring-2 focus:ring-opacity-20 transition-all"
              placeholder="E.g., ACL repair in 2018"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Current Medications (Optional)</label>
            <input 
              {...register('currentMedication')} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB] outline-none focus:ring-2 focus:ring-opacity-20 transition-all"
              placeholder="Ibuprofen, etc."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Activity Level *</label>
          <select 
            {...register('activityLevel')} 
            className={`w-full px-4 py-3 rounded-xl border ${errors.activityLevel ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all bg-white`}
          >
            <option value="">Select activity level...</option>
            <option value="Sedentary (desk job, little exercise)">Sedentary (desk job, little exercise)</option>
            <option value="Lightly Active (light exercise 1-3 days/week)">Lightly Active (light exercise 1-3 days/week)</option>
            <option value="Moderately Active (moderate exercise 3-5 days/week)">Moderately Active (moderate exercise 3-5 days/week)</option>
            <option value="Very Active (hard exercise 6-7 days/week)">Very Active (hard exercise 6-7 days/week)</option>
          </select>
          {errors.activityLevel && <p className="text-red-500 text-xs mt-1">{errors.activityLevel.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Recovery Goals *</label>
          <textarea 
            {...register('recoveryGoals')} 
            rows={2}
            className={`w-full px-4 py-3 rounded-xl border ${errors.recoveryGoals ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all resize-none`}
            placeholder="I want to be able to run 5k without pain..."
          />
          {errors.recoveryGoals && <p className="text-red-500 text-xs mt-1">{errors.recoveryGoals.message}</p>}
        </div>

        {/* File Upload Stub */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Reports (MRI, X-Ray) - Optional</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#2563EB] transition-colors mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-[#0D1421]">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max. 10MB)</p>
          </div>
        </div>

      </form>

      <div className="mt-auto flex justify-end pt-6 border-t border-gray-100">
        <button
          form="medical-form"
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] hover:-translate-y-0.5 transition-all"
        >
          Review Summary
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
