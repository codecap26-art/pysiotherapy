import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DBAppointment } from '@/lib/db';
import { TREATMENTS, SPECIALISTS } from '@/lib/bookingData';
import { CLINIC_BRANCHES } from '@/lib/clinicData';
import { getAuthHeaders } from '@/lib/authHeaders';

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

        const fee = 1500; // Will be derived dynamically in real app, assuming 1500 for now or fetch base fee
        const tax = Math.round(fee * 0.18);
        const totalAmount = fee + tax;
        const refNum = Math.floor(10000 + Math.random() * 90000);

        try {
          const specObj = SPECIALISTS.find(s => s.id === state.specialistId);
          const treatObj = TREATMENTS.find(t => t.id === state.treatmentId);
          const clinicObj = CLINIC_BRANCHES.find(c => c.id === state.clinicId);

          const appointmentData = {
            id: `apt-${Date.now()}`,
            booking_ref: `HM-2026-${refNum}`,
            patient_id: patientUser.id,
            patient_name: `${patientUser.firstName} ${patientUser.lastName}`,
            patient_email: patientUser.email,
            patient_phone: patientUser.phone || '',
            specialist_id: state.specialistId,
            specialist_name: specObj?.name || 'Dr. Sarah Jenkins',
            specialist_title: specObj?.title || 'Chief of Physiotherapy',
            specialist_image: specObj?.image || '',
            treatment_id: state.treatmentId,
            treatment_name: treatObj?.name || 'Physiotherapy Consultation',
            treatment_category: treatObj?.tags?.[0] || 'Physical Rehabilitation',
            clinic_id: state.clinicId,
            clinic_name: clinicObj?.name || 'Healing Motion Centre',
            clinic_address: clinicObj?.address || 'Main Clinic Centre',
            date: state.date,
            time_slot: state.timeSlot,
            pain_level: state.painLevel,
            pain_area: state.reasonForVisit || 'General Pain Assessment',
            medical_notes: state.notes || '',
            total_amount: totalAmount,
            status: 'pending'
          };

          // Use the appointment service which also ensures a patient_treatment link
          const { createAppointment } = await import('@/lib/services/appointmentService');
          const savedAppointment = await createAppointment(appointmentData);

          if (savedAppointment) {
             set({ confirmedBooking: savedAppointment });
             return savedAppointment;
          }
        } catch (err) {
          console.error('Booking error:', err);
        }

        return null;
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
