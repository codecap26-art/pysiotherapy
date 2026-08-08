import { supabase } from './supabase';
import { db, DBAppointment, DBClinicalNote } from './db';

export interface ConnectionStatus {
  connected: boolean;
  message: string;
  tablesAvailable?: {
    users: boolean;
    appointments: boolean;
    medical_notes: boolean;
    notifications: boolean;
  };
}

/**
 * Test whether Supabase URL and Key are active and reachable.
 */
export async function testSupabaseConnection(): Promise<ConnectionStatus> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes('your-project-id') || key.includes('your-anon') || url.includes('your-project-ref')) {
    return {
      connected: false,
      message: 'Supabase credentials not yet configured in .env.local. Running in local persistent database mode (data/database.json).',
    };
  }

  try {
    const { error: usersErr } = await supabase.from('users').select('id').limit(1);
    const { error: aptErr } = await supabase.from('appointments').select('id').limit(1);
    const { error: notesErr } = await supabase.from('medical_notes').select('id').limit(1);
    const { error: notifErr } = await supabase.from('notifications').select('id').limit(1);

    const tablesAvailable = {
      users: !usersErr,
      appointments: !aptErr,
      medical_notes: !notesErr,
      notifications: !notifErr,
    };

    const hasAnyTable = !usersErr || !aptErr || !notesErr || !notifErr;

    if (hasAnyTable) {
      return {
        connected: true,
        message: 'Successfully connected to Supabase database!',
        tablesAvailable,
      };
    } else {
      return {
        connected: true,
        message: 'Connected to Supabase project, but tables need to be created. Please run the SQL schema in supabase_schema.sql.',
        tablesAvailable,
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      message: `Failed to connect to Supabase: ${errorMsg}`,
    };
  }
}

/**
 * Push an appointment to Server Database + Supabase with local DB fallback.
 */
export async function saveAppointment(
  data: Omit<DBAppointment, 'id' | 'bookingRef' | 'createdAt' | 'updatedAt'>
): Promise<DBAppointment> {
  // Always update local cache immediately for responsive UI
  const localSaved = db.createAppointment(data);

  try {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.appointment) {
        return json.appointment;
      }
    }
  } catch (err) {
    console.warn('API save appointment error, fallback to local instance:', err);
  }

  return localSaved;
}

/**
 * Get appointments from Server Database or fallback to local DB.
 */
export async function getAppointments(userId?: string): Promise<DBAppointment[]> {
  try {
    const url = userId ? `/api/appointments?patientId=${encodeURIComponent(userId)}` : '/api/appointments';
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.appointments)) {
        return json.appointments;
      }
    }
  } catch {
    /* Fallback to local DB */
  }

  return userId ? db.getAppointmentsByPatient(userId) : db.getAppointments();
}

/**
 * Save clinical SOAP note to Server Database + Supabase.
 */
export async function saveClinicalNote(
  noteData: Omit<DBClinicalNote, 'id' | 'createdAt'>
): Promise<DBClinicalNote> {
  const localSaved = db.createClinicalNote(noteData);

  try {
    const res = await fetch('/api/medical-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.note) {
        return json.note;
      }
    }
  } catch (err) {
    console.warn('API note sync skipped:', err);
  }

  return localSaved;
}

/**
 * Trigger 1-Click Sync of all Server Database records to Supabase.
 */
export async function seedSupabaseWithMockData(): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    const res = await fetch('/api/db/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sync-supabase' }),
    });

    const data = await res.json();
    if (data.success && data.results) {
      const total = (data.results.usersSynced || 0) + (data.results.appointmentsSynced || 0) + (data.results.notesSynced || 0);
      return { success: true, count: total };
    }

    return { success: false, count: 0, error: data.error || 'Sync request failed' };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, count: 0, error: errorMsg };
  }
}
