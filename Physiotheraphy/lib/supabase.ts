import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'placeholder-anon-key';

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project-id') &&
    !supabaseAnonKey.includes('placeholder')
);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          role: 'patient' | 'doctor' | 'admin';
          phone: string | null;
          avatar_url: string | null;
          age: number | null;
          gender: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          role?: 'patient' | 'doctor' | 'admin';
          phone?: string | null;
          avatar_url?: string | null;
          age?: number | null;
          gender?: string | null;
          created_at?: string;
        };
        Update: {
          email?: string;
          first_name?: string;
          last_name?: string;
          role?: 'patient' | 'doctor' | 'admin';
          phone?: string | null;
          avatar_url?: string | null;
          age?: number | null;
          gender?: string | null;
        };
      };
      clinics: {
        Row: {
          id: string;
          name: string;
          address: string;
          city: string | null;
          contact_number: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          address: string;
          city?: string | null;
          contact_number?: string | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          address?: string;
          city?: string | null;
          contact_number?: string | null;
        };
      };
      treatments: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string | null;
          base_fee: number;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          category: string;
          description?: string | null;
          base_fee: number;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          category?: string;
          description?: string | null;
          base_fee?: number;
          image_url?: string | null;
        };
      };
      specialists: {
        Row: {
          id: string;
          title: string;
          specialization: string;
          bio: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          title: string;
          specialization: string;
          bio?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          title?: string;
          specialization?: string;
          bio?: string | null;
          image_url?: string | null;
        };
      };
      patient_treatments: {
        Row: {
          id: string;
          patient_id: string;
          doctor_id: string;
          treatment_id: string;
          clinic_id: string;
          start_date: string;
          status: 'active' | 'completed' | 'paused';
          progress_percentage: number;
          goals: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          patient_id: string;
          doctor_id: string;
          treatment_id: string;
          clinic_id: string;
          start_date?: string;
          status?: 'active' | 'completed' | 'paused';
          progress_percentage?: number;
          goals?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: 'active' | 'completed' | 'paused';
          progress_percentage?: number;
          goals?: string | null;
          updated_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          booking_ref: string;
          patient_id: string;
          specialist_id: string;
          treatment_id: string;
          clinic_id: string;
          date: string;
          time_slot: string;
          pain_level: number | null;
          pain_area: string | null;
          medical_notes: string | null;
          total_amount: number;
          status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          booking_ref: string;
          patient_id: string;
          specialist_id: string;
          treatment_id: string;
          clinic_id: string;
          date: string;
          time_slot: string;
          pain_level?: number | null;
          pain_area?: string | null;
          medical_notes?: string | null;
          total_amount: number;
          status?: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          date?: string;
          time_slot?: string;
          pain_level?: number | null;
          pain_area?: string | null;
          medical_notes?: string | null;
          status?: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show';
          updated_at?: string;
        };
      };
      treatment_sessions: {
        Row: {
          id: string;
          patient_treatment_id: string;
          appointment_id: string | null;
          session_number: number;
          session_date: string;
          pain_level: number | null;
          mobility_score: number | null;
          observations: string | null;
          treatment_given: string | null;
          doctor_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          patient_treatment_id: string;
          appointment_id?: string | null;
          session_number: number;
          session_date: string;
          pain_level?: number | null;
          mobility_score?: number | null;
          observations?: string | null;
          treatment_given?: string | null;
          doctor_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          pain_level?: number | null;
          mobility_score?: number | null;
          observations?: string | null;
          treatment_given?: string | null;
          doctor_notes?: string | null;
          updated_at?: string;
        };
      };
      medical_notes: {
        Row: {
          id: string;
          patient_treatment_id: string;
          patient_id: string;
          doctor_id: string;
          appointment_id: string | null;
          date: string;
          diagnosis: string;
          notes: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          patient_treatment_id: string;
          patient_id: string;
          doctor_id: string;
          appointment_id?: string | null;
          date: string;
          diagnosis: string;
          notes: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          diagnosis?: string;
          notes?: string;
          updated_at?: string;
        };
      };
      treatment_exercises: {
        Row: {
          id: string;
          patient_treatment_id: string;
          assigned_by: string;
          exercise_name: string;
          description: string | null;
          sets: string | null;
          repetitions: string | null;
          frequency: string | null;
          notes: string | null;
          status: 'active' | 'completed' | 'paused';
          created_at: string;
        };
        Insert: {
          id: string;
          patient_treatment_id: string;
          assigned_by: string;
          exercise_name: string;
          description?: string | null;
          sets?: string | null;
          repetitions?: string | null;
          frequency?: string | null;
          notes?: string | null;
          status?: 'active' | 'completed' | 'paused';
          created_at?: string;
        };
        Update: {
          status?: 'active' | 'completed' | 'paused';
          notes?: string | null;
        };
      };
      treatment_progress: {
        Row: {
          id: string;
          patient_treatment_id: string;
          session_id: string | null;
          pain_level: number | null;
          mobility_score: number | null;
          progress_percentage: number;
          notes: string | null;
          recorded_by: string;
          created_at: string;
        };
        Insert: {
          id: string;
          patient_treatment_id: string;
          session_id?: string | null;
          pain_level?: number | null;
          mobility_score?: number | null;
          progress_percentage: number;
          notes?: string | null;
          recorded_by: string;
          created_at?: string;
        };
        Update: {
          pain_level?: number | null;
          mobility_score?: number | null;
          progress_percentage?: number;
          notes?: string | null;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: 'booking' | 'reminder' | 'clinical' | 'system' | 'alert' | 'update';
          link: string | null;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type?: 'booking' | 'reminder' | 'clinical' | 'system' | 'alert' | 'update';
          link?: string | null;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          read?: boolean;
        };
      };
    };
  };
};
