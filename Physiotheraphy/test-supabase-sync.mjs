import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || envVars.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

console.log('Connecting to Supabase at:', supabaseUrl);
console.log('Using Key starting with:', supabaseKey ? supabaseKey.slice(0, 15) + '...' : 'NONE');

const supabase = createClient(supabaseUrl, supabaseKey);

// Read database.json
const dbPath = path.resolve(process.cwd(), 'data', 'database.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

async function runSync() {
  console.log(`Found ${dbData.users.length} users, ${dbData.appointments.length} appointments, ${dbData.clinicalNotes.length} notes.`);

  // 1. Users
  for (const u of dbData.users) {
    const role = u.role === 'therapist' ? 'doctor' : u.role;
    const { data, error } = await supabase.from('users').upsert({
      id: u.id,
      email: u.email,
      first_name: u.firstName,
      last_name: u.lastName,
      phone: u.phone || null,
      role: role,
      age: u.age || null,
      gender: u.gender || null,
    }, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Error syncing user ${u.email}:`, error);
    } else {
      console.log(`✅ Synced user ${u.email} (${u.firstName} ${u.lastName})`);
    }
  }

  // 2. Appointments
  for (const apt of dbData.appointments) {
    const { data, error } = await supabase.from('appointments').upsert({
      id: apt.id,
      booking_ref: apt.bookingRef,
      patient_id: apt.patientId,
      patient_name: apt.patientName,
      patient_email: apt.patientEmail,
      patient_phone: apt.patientPhone || null,
      specialist_id: apt.specialistId,
      specialist_name: apt.specialistName,
      treatment_id: apt.treatmentId,
      treatment_name: apt.treatmentName,
      clinic_id: apt.clinicId,
      clinic_name: apt.clinicName,
      date: apt.date,
      time_slot: apt.timeSlot,
      pain_level: apt.painLevel || 5,
      pain_area: apt.reasonForVisit || null,
      medical_notes: apt.notes || null,
      total_amount: apt.totalAmount || 1500,
      status: apt.status || 'confirmed',
    }, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Error syncing appointment ${apt.bookingRef}:`, error);
    } else {
      console.log(`✅ Synced appointment ${apt.bookingRef} (${apt.patientName})`);
    }
  }

  // 3. Medical notes
  for (const note of dbData.clinicalNotes) {
    const { data, error } = await supabase.from('medical_notes').upsert({
      id: note.id,
      patient_id: note.patientId,
      doctor_id: note.doctorId,
      doctor_name: note.doctorName,
      date: note.date,
      diagnosis: note.diagnosis,
      notes: `${note.symptomsObserved || ''}\n${note.treatmentAdministered || ''}`,
      exercises: note.exercisesPrescribed || [],
    }, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Error syncing note ${note.id}:`, error);
    } else {
      console.log(`✅ Synced clinical note ${note.id} for ${note.patientId}`);
    }
  }

  // Check count in Supabase
  const { data: usersCount, error: countErr } = await supabase.from('users').select('*');
  console.log(`\n🎉 Query users table in Supabase returned:`, usersCount ? `${usersCount.length} rows` : countErr);
}

runSync();
