import { supabase } from '../supabase';

export async function getTreatments() {
  const { data, error } = await supabase
    .from('treatments')
    .select('*')
    .order('category');
    
  if (error) {
    console.error('Error fetching treatments:', error);
    return [];
  }
  return data;
}

export async function getTreatmentById(id: string) {
  const { data, error } = await supabase
    .from('treatments')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching treatment ${id}:`, error);
    return null;
  }
  return data;
}

export async function getTreatmentsByCategory() {
  const treatments = await getTreatments();
  const categorized = treatments.reduce((acc, treatment) => {
    if (!acc[treatment.category]) {
      acc[treatment.category] = [];
    }
    acc[treatment.category].push(treatment);
    return acc;
  }, {} as Record<string, typeof treatments>);
  
  return categorized;
}
