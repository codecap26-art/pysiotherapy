-- ==============================================================================
-- HEALING MOTION PHYSIOTHERAPY — COMPLETE SUPABASE DATABASE SETUP & SEED
-- Copy this ENTIRE script, paste it into your Supabase SQL Editor, and click "RUN".
-- ==============================================================================

-- 1. Clean previous tables if they had UUID column types
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.medical_notes CASCADE;
DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- 2. Create Users Table (Supports custom string IDs & roles)
CREATE TABLE public.users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'therapist', 'admin')),
  phone TEXT,
  avatar_url TEXT,
  age INTEGER,
  gender TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Appointments Table
CREATE TABLE public.appointments (
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

-- 4. Create Medical / SOAP Clinical Notes Table
CREATE TABLE public.medical_notes (
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

-- 5. Create Notifications Table
CREATE TABLE public.notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'reminder' CHECK (type IN ('reminder', 'update', 'alert')),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS) with full permissive access for development and app integration
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all read users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow all insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update users" ON public.users FOR UPDATE USING (true);
CREATE POLICY "Allow all delete users" ON public.users FOR DELETE USING (true);

CREATE POLICY "Allow all read appointments" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Allow all insert appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update appointments" ON public.appointments FOR UPDATE USING (true);
CREATE POLICY "Allow all delete appointments" ON public.appointments FOR DELETE USING (true);

CREATE POLICY "Allow all read medical_notes" ON public.medical_notes FOR SELECT USING (true);
CREATE POLICY "Allow all insert medical_notes" ON public.medical_notes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update medical_notes" ON public.medical_notes FOR UPDATE USING (true);
CREATE POLICY "Allow all delete medical_notes" ON public.medical_notes FOR DELETE USING (true);

CREATE POLICY "Allow all read notifications" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Allow all insert notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update notifications" ON public.notifications FOR UPDATE USING (true);
CREATE POLICY "Allow all delete notifications" ON public.notifications FOR DELETE USING (true);

-- 7. Insert Initial Mock Clinical Data & Demo Users
INSERT INTO public.users (id, email, first_name, last_name, role, phone, age, gender) VALUES
('usr-001', 'rahul@demo.com', 'Rahul', 'Sharma', 'patient', '+91 98765 43210', 32, 'male'),
('usr-doctor-sarah', 'sarah.jenkins@healingmotion.com', 'Sarah', 'Jenkins', 'doctor', '+91 98765 11223', 38, 'female'),
('usr-admin', 'admin@healingmotion.com', 'System', 'Admin', 'admin', '+91 98765 99999', 40, 'other')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.appointments (id, booking_ref, patient_id, patient_name, patient_email, patient_phone, specialist_id, specialist_name, treatment_id, treatment_name, clinic_id, clinic_name, date, time_slot, pain_level, pain_area, medical_notes, total_amount, status) VALUES
('apt-001', 'HM-2026-04821', 'usr-001', 'Rahul Sharma', 'rahul@demo.com', '+91 98765 43210', 'usr-doctor-sarah', 'Dr. Sarah Jenkins', 'post-op-rehab', 'Post-Op Knee Rehabilitation', 'indiranagar', 'Indiranagar Flagship Centre', '2026-08-10', '10:00 AM', 6, 'Right ACL Reconstruction - Week 3', 'ACL reconstruction recovery. Post-operative swelling managed.', 2200, 'confirmed'),
('apt-002', 'HM-2026-03912', 'usr-001', 'Rahul Sharma', 'rahul@demo.com', '+91 98765 43210', 'usr-doctor-sarah', 'Dr. Sarah Jenkins', 'sports-physio', 'Advanced Sports Therapy', 'indiranagar', 'Indiranagar Flagship Centre', '2026-08-14', '02:30 PM', 4, 'Lower Back Stiffness', 'Follow-up consultation.', 1800, 'confirmed'),
('apt-003', 'HM-2026-05110', 'usr-001', 'Rahul Sharma', 'rahul@demo.com', '+91 98765 43210', 'usr-doctor-sarah', 'Dr. Sarah Jenkins', 'dry-needling', 'Dry Needling & Myofascial Release', 'koramangala', 'Koramangala Premium Clinic', '2026-07-28', '11:00 AM', 7, 'Neck spasm & trigger points', 'Initial dry needling session complete. Patient reported 40% immediate relief.', 2500, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.medical_notes (id, patient_id, doctor_id, doctor_name, date, diagnosis, notes, exercises) VALUES
('note-001', 'usr-001', 'usr-doctor-sarah', 'Dr. Sarah Jenkins', '2026-08-01', 'Post-Op ACL Reconstruction (Right Knee) - Subacute Stage', 'Symptoms: Mild joint effusion, 0-95 deg flexion. Treatment: Patellar mobilization, isometric quad sets, neuromuscular re-education.', '[{"name":"Prone Hang Knee Extension","sets":"3 sets","reps":"10 min","frequency":"Daily","notes":"Gentle gravity stretch"},{"name":"Quad Sets with Towel Roll","sets":"3 sets","reps":"15 reps","frequency":"Twice daily","notes":"Hold contraction 5 seconds"}]'::jsonb)
ON CONFLICT (id) DO NOTHING;
