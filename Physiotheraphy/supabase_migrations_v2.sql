-- ==============================================================================
-- HEALING MOTION PHYSIOTHERAPY — RELATIONAL DATABASE MIGRATION V2
-- Copy this ENTIRE script, paste it into your Supabase SQL Editor, and click "RUN".
-- ==============================================================================

-- 1. Drop existing tables if they exist to start clean (Approved by user as data is mock)
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.treatment_progress CASCADE;
DROP TABLE IF EXISTS public.treatment_exercises CASCADE;
DROP TABLE IF EXISTS public.medical_notes CASCADE;
DROP TABLE IF EXISTS public.treatment_sessions CASCADE;
DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.patient_treatments CASCADE;
DROP TABLE IF EXISTS public.clinics CASCADE;
DROP TABLE IF EXISTS public.treatments CASCADE;
DROP TABLE IF EXISTS public.specialists CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- 2. Create Base Tables
CREATE TABLE public.users (
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

CREATE TABLE public.clinics (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT,
  contact_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.treatments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  base_fee NUMERIC NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.specialists (
  id TEXT PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  specialization TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Core Relational Tables
CREATE TABLE public.patient_treatments (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  doctor_id TEXT NOT NULL REFERENCES public.specialists(id) ON DELETE CASCADE,
  treatment_id TEXT NOT NULL REFERENCES public.treatments(id) ON DELETE CASCADE,
  clinic_id TEXT NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  start_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  goals TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (patient_id, doctor_id, treatment_id) -- A patient has one active treatment plan per doctor per treatment type
);

CREATE TABLE public.appointments (
  id TEXT PRIMARY KEY,
  booking_ref TEXT UNIQUE NOT NULL,
  patient_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  specialist_id TEXT NOT NULL REFERENCES public.specialists(id) ON DELETE CASCADE,
  treatment_id TEXT NOT NULL REFERENCES public.treatments(id) ON DELETE CASCADE,
  clinic_id TEXT NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  pain_level INTEGER CHECK (pain_level >= 1 AND pain_level <= 10),
  pain_area TEXT,
  medical_notes TEXT,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'completed', 'cancelled', 'rescheduled', 'no_show')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.treatment_sessions (
  id TEXT PRIMARY KEY,
  patient_treatment_id TEXT NOT NULL REFERENCES public.patient_treatments(id) ON DELETE CASCADE,
  appointment_id TEXT REFERENCES public.appointments(id) ON DELETE SET NULL,
  session_number INTEGER NOT NULL,
  session_date DATE NOT NULL,
  pain_level INTEGER CHECK (pain_level >= 1 AND pain_level <= 10),
  mobility_score INTEGER,
  observations TEXT,
  treatment_given TEXT,
  doctor_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.medical_notes (
  id TEXT PRIMARY KEY,
  patient_treatment_id TEXT NOT NULL REFERENCES public.patient_treatments(id) ON DELETE CASCADE,
  patient_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  doctor_id TEXT NOT NULL REFERENCES public.specialists(id) ON DELETE CASCADE,
  appointment_id TEXT REFERENCES public.appointments(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  diagnosis TEXT NOT NULL,
  notes TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.treatment_exercises (
  id TEXT PRIMARY KEY,
  patient_treatment_id TEXT NOT NULL REFERENCES public.patient_treatments(id) ON DELETE CASCADE,
  assigned_by TEXT NOT NULL REFERENCES public.specialists(id) ON DELETE CASCADE,
  exercise_name TEXT NOT NULL,
  description TEXT,
  sets TEXT,
  repetitions TEXT,
  frequency TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.treatment_progress (
  id TEXT PRIMARY KEY,
  patient_treatment_id TEXT NOT NULL REFERENCES public.patient_treatments(id) ON DELETE CASCADE,
  session_id TEXT REFERENCES public.treatment_sessions(id) ON DELETE SET NULL,
  pain_level INTEGER CHECK (pain_level >= 1 AND pain_level <= 10),
  mobility_score INTEGER,
  progress_percentage INTEGER NOT NULL CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  notes TEXT,
  recorded_by TEXT NOT NULL REFERENCES public.specialists(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'reminder' CHECK (type IN ('booking', 'reminder', 'clinical', 'system', 'alert', 'update')),
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Indexes for performance
CREATE INDEX idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX idx_appointments_specialist_id ON public.appointments(specialist_id);
CREATE INDEX idx_appointments_date ON public.appointments(date);
CREATE INDEX idx_patient_treatments_patient_id ON public.patient_treatments(patient_id);
CREATE INDEX idx_patient_treatments_doctor_id ON public.patient_treatments(doctor_id);
CREATE INDEX idx_treatment_sessions_pt_id ON public.treatment_sessions(patient_treatment_id);
CREATE INDEX idx_medical_notes_pt_id ON public.medical_notes(patient_treatment_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);

-- 5. Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatment_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatment_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Temporarily bypass RLS for development (Full Permissive)
-- Note: Replace with strict policies before production
CREATE POLICY "Enable all access" ON public.users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.clinics FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.treatments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.specialists FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.patient_treatments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.appointments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.treatment_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.medical_notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.treatment_exercises FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.treatment_progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.notifications FOR ALL USING (true) WITH CHECK (true);

-- 6. Initial Seed Data
-- Users
INSERT INTO public.users (id, email, first_name, last_name, role, phone, age, gender) VALUES
('usr-001', 'rahul@demo.com', 'Rahul', 'Sharma', 'patient', '+91 98765 43210', 32, 'male'),
('usr-002', 'anita@demo.com', 'Anita', 'Desai', 'patient', '+91 98111 22334', 45, 'female'),
('sarah-jenkins', 'sarah.jenkins@healingmotion.com', 'Sarah', 'Jenkins', 'doctor', '+91 98765 11223', 38, 'female'),
('elena-rodriguez', 'elena.rodriguez@healingmotion.com', 'Elena', 'Rodriguez', 'doctor', '+91 98765 44556', 42, 'female'),
('usr-admin', 'admin@healingmotion.com', 'System', 'Admin', 'admin', '+91 98765 99999', 40, 'other');

-- Clinics
INSERT INTO public.clinics (id, name, address, city, contact_number) VALUES
('clinic-indiranagar', 'Indiranagar Flagship Centre', '842, 100 Feet Rd, HAL 2nd Stage, Indiranagar', 'Bangalore', '+91 80 4123 4567'),
('clinic-koramangala', 'Koramangala Sports & Rehab Hub', '4th Block, 80 Feet Road, Koramangala', 'Bangalore', '+91 80 4123 8901');

-- Treatments
INSERT INTO public.treatments (id, name, category, description, base_fee) VALUES
('back-pain', 'Lower Back & Lumbar Spine Therapy', 'Spine & Posture Care', 'Comprehensive therapy for lower back pain, sciatica, and disc herniation.', 1500),
('neck-pain', 'Cervical Spine & Tech-Neck Protocol', 'Spine & Posture Care', 'Targeted treatment for neck pain, stiffness, and postural correction.', 1400),
('knee-rehab', 'Knee Joint & Ligament Rehabilitation', 'Sports Rehabilitation', 'Post-operative and conservative management for knee injuries.', 1800),
('sports-injury', 'Advanced Athletic Recovery & Screening', 'Sports Rehabilitation', 'Sport-specific rehab protocols for athletes.', 2000),
('frozen-shoulder', 'Adhesive Capsulitis / Frozen Shoulder Protocol', 'Orthopedic Rehabilitation', 'Restoring mobility and reducing pain in the shoulder joint.', 1600);

-- Specialists
INSERT INTO public.specialists (id, title, specialization, bio, image_url) VALUES
('sarah-jenkins', 'Chief of Physiotherapy & Sports Rehab', 'Spine & Posture Care', 'Expert in spinal manual therapy and postural correction.', 'https://images.unsplash.com/photo-1594824813620-21a50a6bf1cf'),
('elena-rodriguez', 'Senior Sports & ACL Specialist', 'Sports Rehabilitation', 'Specialized in ACL reconstruction recovery and athletic screening.', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2');
