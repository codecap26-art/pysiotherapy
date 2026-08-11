import { supabase } from '../supabase';

export async function getPatientTreatments(patientId: string) {
  const { data, error } = await supabase
    .from('patient_treatments')
    .select(`
      *,
      doctor:doctor_id(
        users:id(first_name, last_name, email)
      ),
      treatment:treatment_id(*),
      clinic:clinic_id(*)
    `)
    .eq('patient_id', patientId)
    .order('start_date', { ascending: false });
    
  if (error) {
    console.error('Error fetching patient treatments:', error);
    return [];
  }
  
  return data;
}

export async function getTreatmentSessions(patientTreatmentId: string) {
  const { data, error } = await supabase
    .from('treatment_sessions')
    .select('*')
    .eq('patient_treatment_id', patientTreatmentId)
    .order('session_date', { ascending: false });
    
  if (error) {
    console.error('Error fetching sessions:', error);
    return [];
  }
  return data;
}

export async function getTreatmentExercises(patientTreatmentId: string) {
  const { data, error } = await supabase
    .from('treatment_exercises')
    .select('*')
    .eq('patient_treatment_id', patientTreatmentId);
    
  if (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
  return data;
}

export async function updateProgress(patientTreatmentId: string, percentage: number) {
  const { data, error } = await supabase
    .from('patient_treatments')
    .update({ progress_percentage: percentage, updated_at: new Date().toISOString() })
    .eq('id', patientTreatmentId)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating progress:', error);
    return null;
  }
  return data;
}
