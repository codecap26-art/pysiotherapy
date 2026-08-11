import { supabase } from '../supabase';

export async function getClinics() {
  const { data, error } = await supabase
    .from('clinics')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('Error fetching clinics:', error);
    return [];
  }
  return data;
}

export async function getClinicById(id: string) {
  const { data, error } = await supabase
    .from('clinics')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching clinic ${id}:`, error);
    return null;
  }
  return data;
}
