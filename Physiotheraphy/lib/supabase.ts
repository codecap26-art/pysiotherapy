import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project-id') &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('your-anon')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
          phone: string;
          avatar_url?: string;
          age?: number;
          gender?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          first_name: string;
          last_name: string;
          role?: 'patient' | 'doctor' | 'admin';
          phone?: string;
          avatar_url?: string;
          age?: number;
          gender?: string;
          created_at?: string;
        };
        Update: {
          email?: string;
          first_name?: string;
          last_name?: string;
          role?: 'patient' | 'doctor' | 'admin';
          phone?: string;
          avatar_url?: string;
          age?: number;
          gender?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          booking_ref: string;
          patient_id: string;
          patient_name: string;
          patient_email: string;
          patient_phone: string;
          specialist_id: string;
          specialist_name: string;
          treatment_id: string;
          treatment_name: string;
          clinic_id: string;
          clinic_name: string;
          date: string;
          time_slot: string;
          pain_level: number;
          pain_area?: string;
          medical_notes?: string;
          total_amount: number;
          status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          booking_ref: string;
          patient_id: string;
          patient_name: string;
          patient_email: string;
          patient_phone: string;
          specialist_id: string;
          specialist_name: string;
          treatment_id: string;
          treatment_name: string;
          clinic_id: string;
          clinic_name: string;
          date: string;
          time_slot: string;
          pain_level?: number;
          pain_area?: string;
          medical_notes?: string;
          total_amount: number;
          status?: 'confirmed' | 'pending' | 'completed' | 'cancelled';
          created_at?: string;
        };
        Update: {
          status?: 'confirmed' | 'pending' | 'completed' | 'cancelled';
          date?: string;
          time_slot?: string;
          medical_notes?: string;
        };
      };
      medical_notes: {
        Row: {
          id: string;
          patient_id: string;
          doctor_id: string;
          doctor_name: string;
          date: string;
          diagnosis: string;
          notes: string;
          exercises: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          doctor_id: string;
          doctor_name: string;
          date: string;
          diagnosis: string;
          notes: string;
          exercises?: string[];
          created_at?: string;
        };
        Update: {
          diagnosis?: string;
          notes?: string;
          exercises?: string[];
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: 'reminder' | 'update' | 'alert';
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type?: 'reminder' | 'update' | 'alert';
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
