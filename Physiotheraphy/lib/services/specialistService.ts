import { supabase } from '../supabase';

export async function getSpecialists() {
  const { data, error } = await supabase
    .from('specialists')
    .select(`
      *,
      users!inner (
        first_name,
        last_name,
        email,
        phone
      )
    `);
    
  if (error) {
    console.error('Error fetching specialists with join (trying fallback):', error);
    // Fallback: fetch without join
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('specialists')
      .select('*');
      
    if (fallbackError) {
      console.error('Error fetching specialists fallback:', fallbackError);
      return [];
    }
    
    return fallbackData.map((spec: any) => ({
      ...spec,
      first_name: 'Dr.',
      last_name: 'Specialist',
      full_name: 'Dr. Specialist',
    }));
  }
  
  return data.map((spec: any) => ({
    ...spec,
    first_name: spec.users?.first_name,
    last_name: spec.users?.last_name,
    full_name: `${spec.users?.first_name} ${spec.users?.last_name}`,
    email: spec.users?.email,
    phone: spec.users?.phone,
  }));
}

export async function getSpecialistById(id: string) {
  const { data, error } = await supabase
    .from('specialists')
    .select(`
      *,
      users!inner (
        first_name,
        last_name,
        email,
        phone
      )
    `)
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching specialist ${id} with join (trying fallback):`, error);
    
    // Fallback: fetch without join
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('specialists')
      .select('*')
      .eq('id', id)
      .single();
      
    if (fallbackError) {
      console.error(`Error fetching specialist ${id} fallback:`, fallbackError);
      return null;
    }
    
    return {
      ...fallbackData,
      first_name: 'Dr.',
      last_name: 'Specialist',
      full_name: 'Dr. Specialist',
    };
  }
  
  return {
    ...data,
    first_name: data.users?.first_name,
    last_name: data.users?.last_name,
    full_name: `${data.users?.first_name} ${data.users?.last_name}`,
    email: data.users?.email,
    phone: data.users?.phone,
  };
}
