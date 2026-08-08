import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DBAppointment } from '@/lib/db';
import { saveAppointment } from '@/lib/supabaseService';
import { TREATMENTS, SPECIALISTS } from '@/lib/bookingData';
import { CLINIC_BRANCHES } from '@/lib/clinicData';

export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface BookingState {
  currentStep: BookingStep;
  categoryId: string | null;
  treatmentId: string | null;
  clinicId: string | null;
  specialistId: string | null;
  appointmentType: 'in-clinic' | 'home' | 'online';
  date: string | null;
  timeSlot: string | null;
  painLevel: number;
  painDuration: string;
  reasonForVisit: string;
  notes: string;
  confirmedBooking: DBAppointment | null;

  // Actions
  setStep: (step: BookingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCategory: (categoryId: string) => void;
  setTreatment: (treatmentId: string) => void;
  setClinic: (clinicId: string) => void;
  setSpecialist: (specialistId: string) => void;
  setAppointmentType: (type: 'in-clinic' | 'home' | 'online') => void;
  setDate: (date: string) => void;
  setTimeSlot: (timeSlot: string) => void;
  setPainAssessment: (painLevel: number, painDuration: string, reason: string, notes?: string) => void;
  confirmBooking: (patientUser: any) => Promise<DBAppointment | null>;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      categoryId: null,
      treatmentId: null,
      clinicId: null,
      specialistId: null,
      appointmentType: 'in-clinic',
      date: null,
      timeSlot: null,
      painLevel: 5,
      painDuration: '1 - 3 months',
      reasonForVisit: '',
      notes: '',
      confirmedBooking: null,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 8) as BookingStep,
        })),
      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1) as BookingStep,
        })),

      setCategory: (categoryId) =>
        set({ categoryId, treatmentId: null, currentStep: 2 }),

      setTreatment: (treatmentId) =>
        set({ treatmentId, currentStep: 3 }),

      setClinic: (clinicId) =>
        set({ clinicId, currentStep: 4 }),

      setSpecialist: (specialistId) =>
        set({ specialistId, currentStep: 5 }),

      setAppointmentType: (type) => set({ appointmentType: type }),

      setDate: (date) => set({ date, currentStep: 6 }),

      setTimeSlot: (timeSlot) => set({ timeSlot, currentStep: 7 }),

      setPainAssessment: (painLevel, painDuration, reason, notes = '') =>
        set({ painLevel, painDuration, reasonForVisit: reason, notes }),

      confirmBooking: async (patientUser: any) => {
        const state = get();
        if (!state.treatmentId || !state.specialistId || !state.clinicId || !state.date || !state.timeSlot) {
          return null;
        }

        const treatment = TREATMENTS.find((t) => t.id === state.treatmentId);
        const specialist = SPECIALISTS.find((s) => s.id === state.specialistId);
        const clinic = CLINIC_BRANCHES.find((c) => c.id === state.clinicId);

        const fee = treatment?.startingPrice || 1500;
        const tax = Math.round(fee * 0.18);
        const totalAmount = fee + tax;

        const newAppointment = await saveAppointment({
          patientId: patientUser?.id || 'usr-guest',
          patientName: `${patientUser?.firstName || 'Patient'} ${patientUser?.lastName || ''}`.trim(),
          patientPhone: patientUser?.phone || '+91 98765 00000',
          patientEmail: patientUser?.email || 'patient@example.com',
          patientAge: patientUser?.age || 30,
          patientGender: patientUser?.gender || 'prefer-not-to-say',
          specialistId: specialist?.id || state.specialistId,
          specialistName: specialist?.name || 'Dr. Sarah Jenkins',
          specialistTitle: specialist?.title || 'Physiotherapist',
          specialistImage: specialist?.image || '',
          treatmentId: treatment?.id || state.treatmentId,
          treatmentName: treatment?.name || 'Physiotherapy Consultation',
          treatmentCategory: state.categoryId || 'General Physiotherapy',
          clinicId: clinic?.id || state.clinicId,
          clinicName: clinic?.name || 'Healing Motion Centre',
          clinicAddress: clinic?.address || 'Bengaluru',
          date: state.date,
          timeSlot: state.timeSlot,
          status: 'confirmed',
          fee,
          tax,
          totalAmount,
          appointmentType: state.appointmentType,
          painLevel: state.painLevel,
          painDuration: state.painDuration,
          reasonForVisit: state.reasonForVisit || 'General physiotherapy consultation',
          notes: state.notes,
        });

        set({ confirmedBooking: newAppointment });
        return newAppointment;
      },

      resetBooking: () =>
        set({
          currentStep: 1,
          categoryId: null,
          treatmentId: null,
          clinicId: null,
          specialistId: null,
          appointmentType: 'in-clinic',
          date: null,
          timeSlot: null,
          painLevel: 5,
          painDuration: '1 - 3 months',
          reasonForVisit: '',
          notes: '',
          confirmedBooking: null,
        }),
    }),
    {
      name: 'hm-booking-storage-v2',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
