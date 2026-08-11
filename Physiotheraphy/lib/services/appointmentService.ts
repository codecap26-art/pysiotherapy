import { supabase } from '../supabase';
import { getSpecialistById } from './specialistService';
import { getClinicById } from './clinicService';
import { getTreatmentById } from './treatmentService';

export async function createAppointment(data: any) {
  // First ensure there's a patient_treatment link
  const { data: ptData, error: ptError } = await supabase
    .from('patient_treatments')
    .select('id')
    .eq('patient_id', data.patient_id)
    .eq('doctor_id', data.specialist_id)
    .eq('treatment_id', data.treatment_id)
    .maybeSingle();

  if (ptError) {
    console.error('Error finding patient treatment:', ptError);
    return null;
  }

  // If no pt link exists, create one
  if (!ptData) {
    const { error: insertPtError } = await supabase
      .from('patient_treatments')
      .insert({
        id: `pt-${Date.now()}`,
        patient_id: data.patient_id,
        doctor_id: data.specialist_id,
        treatment_id: data.treatment_id,
        clinic_id: data.clinic_id,
        start_date: data.date,
        status: 'active',
        progress_percentage: 0
      });
      
    if (insertPtError) {
       console.error('Error creating patient treatment:', insertPtError);
    }
  }

  const { data: aptData, error: aptError } = await supabase
    .from('appointments')
    .insert(data)
    .select()
    .single();

  if (aptError) {
    console.error('Error creating appointment:', aptError);
    return null;
  }

  // Generate notification for doctor
  await supabase.from('notifications').insert({
    id: `notif-${Date.now()}`,
    user_id: data.specialist_id,
    title: 'New Appointment Booking',
    message: `You have a new booking on ${data.date} at ${data.time_slot}.`,
    type: 'booking',
    link: '/therapist/appointments',
    read: false
  });

  return aptData;
}

export async function getAppointments(filters?: { patient_id?: string; specialist_id?: string }) {
  let query = supabase.from('appointments').select('*').order('date', { ascending: false });
  
  if (filters?.patient_id) {
    query = query.eq('patient_id', filters.patient_id);
  }
  if (filters?.specialist_id) {
    query = query.eq('specialist_id', filters.specialist_id);
  }
  
  const { data, error } = await query;
  if (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
  return data;
}

export async function updateAppointmentStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from('appointments')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating appointment:', error);
    return null;
  }
  return data;
}
