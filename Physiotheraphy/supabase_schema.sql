-- ==============================================================================
-- HEALING MOTION PHYSIOTHERAPY — SUPABASE DATABASE SCHEMA
-- Copy and paste this script into your Supabase SQL Editor and click "Run".
-- ==============================================================================

-- 1. Users / Profiles Table
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin')),
  phone TEXT,
  avatar_url TEXT,
  age INTEGER,
  gender TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  booking_ref TEXT UNIQUE NOT NULL,
  patient_id TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  patient_phone TEXT,
  specialist_id TEXT NOT NULL,
  specialist_name TEXT NOT NULL,
  treatment_id TEXT NOT NULL,
  treatment_name TEXT NOT NULL,
  clinic_id TEXT NOT NULL,
  clinic_name TEXT NOT NULL,
  date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  pain_level INTEGER DEFAULT 5,
  pain_area TEXT,
  medical_notes TEXT,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Medical / SOAP Notes Table
CREATE TABLE IF NOT EXISTS public.medical_notes (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  doctor_id TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  date TEXT NOT NULL,
  diagnosis TEXT NOT NULL,
  notes TEXT NOT NULL,
  exercises JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'reminder' CHECK (type IN ('reminder', 'update', 'alert')),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) with permissive access for the web app
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Allow public / anon read and write access for development & authenticated sessions
CREATE POLICY "Allow all read users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow all insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update users" ON public.users FOR UPDATE USING (true);

CREATE POLICY "Allow all read appointments" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Allow all insert appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update appointments" ON public.appointments FOR UPDATE USING (true);
CREATE POLICY "Allow all delete appointments" ON public.appointments FOR DELETE USING (true);

CREATE POLICY "Allow all read medical_notes" ON public.medical_notes FOR SELECT USING (true);
CREATE POLICY "Allow all insert medical_notes" ON public.medical_notes FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all read notifications" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Allow all insert notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update notifications" ON public.notifications FOR UPDATE USING (true);
