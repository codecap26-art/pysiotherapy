"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { ArrowRight, UserCircle } from 'lucide-react';

const patientSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  age: z.string().min(1, 'Age is required'),
  gender: z.string().min(1, 'Gender is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Full address is required'),
  occupation: z.string().optional(),
  emergencyContact: z.string().min(10, 'Emergency contact is required'),
  preferredLanguage: z.string().optional(),
  referralSource: z.string().optional(),
});

type PatientFormValues = z.infer<typeof patientSchema>;

export default function Step6PatientInfo() {
  const { patientInfo, setPatientInfo, nextStep } = useBookingStore();

  const { register, handleSubmit, formState: { errors } } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: patientInfo || {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      occupation: '',
      emergencyContact: '',
      preferredLanguage: 'English',
      referralSource: '',
    },
  });

  const onSubmit = (data: PatientFormValues) => {
    setPatientInfo(data);
    nextStep();
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D1421] mb-2">Patient Information</h2>
        <p className="text-[#8896A8]">Please provide your contact and personal details.</p>
      </div>

      <form id="patient-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-12 flex-1 overflow-y-auto pr-2">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">First Name *</label>
            <input 
              {...register('firstName')} 
              className={`w-full px-4 py-3 rounded-xl border ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
              placeholder="John"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name *</label>
            <input 
              {...register('lastName')} 
              className={`w-full px-4 py-3 rounded-xl border ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
              placeholder="Doe"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Age *</label>
            <input 
              type="number"
              {...register('age')} 
              className={`w-full px-4 py-3 rounded-xl border ${errors.age ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
              placeholder="32"
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Gender *</label>
            <select 
              {...register('gender')} 
              className={`w-full px-4 py-3 rounded-xl border ${errors.gender ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all bg-white`}
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
            <input 
              {...register('phone')} 
              className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
              placeholder="+91 9876543210"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
            <input 
              type="email"
              {...register('email')} 
              className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Emergency Contact *</label>
            <input 
              {...register('emergencyContact')} 
              className={`w-full px-4 py-3 rounded-xl border ${errors.emergencyContact ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
              placeholder="+91 9876543210 (Spouse/Parent)"
            />
            {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Address *</label>
          <textarea 
            {...register('address')} 
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#2563EB] focus:ring-[#2563EB]'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all resize-none`}
            placeholder="Apt, Street, City, ZIP"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>
      </form>

      <div className="mt-auto flex justify-end pt-6 border-t border-gray-100">
        <button
          form="patient-form"
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] hover:-translate-y-0.5 transition-all"
        >
          Medical Intake Form
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
