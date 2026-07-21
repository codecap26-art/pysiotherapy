import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface BookingState {
  currentStep: BookingStep;
  treatmentId: string | null;
  specialistId: string | null;
  appointmentType: 'initial' | 'followup' | 'home' | 'online' | 'emergency' | null;
  date: string | null;
  timeSlot: string | null;
  patientInfo: {
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
    occupation: string;
    emergencyContact: string;
    preferredLanguage: string;
    referralSource: string;
  } | null;
  medicalInfo: {
    primaryComplaint: string;
    painArea: string;
    painLevel: number;
    painDuration: string;
    pastInjuries: string;
    currentMedication: string;
    allergies: string;
    medicalHistory: string;
    chronicConditions: string;
    activityLevel: string;
    occupationalRisk: string;
    recoveryGoals: string;
  } | null;
  
  // Actions
  setStep: (step: BookingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setTreatment: (id: string) => void;
  setSpecialist: (id: string) => void;
  setAppointmentType: (type: 'initial' | 'followup' | 'home' | 'online' | 'emergency') => void;
  setDateTime: (date: string, timeSlot: string) => void;
  setPatientInfo: (info: any) => void;
  setMedicalInfo: (info: any) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      treatmentId: null,
      specialistId: null,
      appointmentType: null,
      date: null,
      timeSlot: null,
      patientInfo: null,
      medicalInfo: null,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 10) as BookingStep })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) as BookingStep })),
      
      setTreatment: (id) => set({ treatmentId: id }),
      setSpecialist: (id) => set({ specialistId: id }),
      setAppointmentType: (type) => set({ appointmentType: type }),
      setDateTime: (date, timeSlot) => set({ date, timeSlot }),
      setPatientInfo: (info) => set({ patientInfo: info }),
      setMedicalInfo: (info) => set({ medicalInfo: info }),
      
      resetBooking: () => set({
        currentStep: 1,
        treatmentId: null,
        specialistId: null,
        appointmentType: null,
        date: null,
        timeSlot: null,
        patientInfo: null,
        medicalInfo: null,
      }),
    }),
    {
      name: 'physio-booking-storage', // unique name
      storage: createJSONStorage(() => localStorage),
    }
  )
);
