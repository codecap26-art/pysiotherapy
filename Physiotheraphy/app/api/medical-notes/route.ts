import { NextRequest, NextResponse } from 'next/server';
import { serverDb } from '@/lib/serverDb';
import { supabase } from '@/lib/supabase';
import { getAuthUser } from '@/lib/tokenParser';

export async function GET(req: NextRequest) {
  try {
    // Authorize: extract userId from token
    const authUser = getAuthUser(req);

    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    let notes;
    if (authUser.role === 'admin') {
      notes = serverDb.getClinicalNotes();
    } else if (authUser.role === 'therapist' || authUser.role === 'doctor') {
      // Doctors see notes they authored
      const allNotes = serverDb.getClinicalNotes();
      notes = allNotes.filter((n) => n.doctorId === authUser.userId);
    } else {
      // Patients see only their own notes
      notes = serverDb.getClinicalNotes(authUser.userId);
    }

    return NextResponse.json({
      success: true,
      notes,
      total: notes.length,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Authorize: only doctors/admins can add clinical notes
    const authUser = getAuthUser(req);

    if (!authUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (authUser.role !== 'therapist' && authUser.role !== 'doctor' && authUser.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden. Only doctors can create clinical notes.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      appointmentId,
      patientId,
      doctorName,
      date,
      diagnosis,
      symptomsObserved,
      treatmentAdministered,
      exercisesPrescribed,
      recoveryProgress,
      nextFollowUpDate,
    } = body;

    if (!patientId || !diagnosis) {
      return NextResponse.json(
        { success: false, error: 'Patient ID and diagnosis are required' },
        { status: 400 }
      );
    }

    // Use authenticated doctor's ID — never trust the body's doctorId
    const newNote = serverDb.addClinicalNote({
      appointmentId: appointmentId || `apt-${Date.now()}`,
      patientId,
      doctorId: authUser.userId,
      doctorName: doctorName || 'Dr. Specialist',
      date: date || new Date().toISOString().split('T')[0],
      diagnosis,
      symptomsObserved: symptomsObserved || '',
      treatmentAdministered: treatmentAdministered || '',
      exercisesPrescribed: exercisesPrescribed || [],
      recoveryProgress: Number(recoveryProgress) || 50,
      nextFollowUpDate: nextFollowUpDate || '',
    });

    // Notify patient about new clinical note
    serverDb.addNotification({
      userId: patientId,
      title: 'Clinical Notes Updated',
      message: `${doctorName || 'Your doctor'} has updated your clinical notes and exercise plan.`,
      type: 'reminder',
      link: '/dashboard/medical-history',
      read: false,
    });

    // Sync to Supabase if configured
    try {
      await supabase.from('medical_notes').insert([
        {
          id: newNote.id,
          patient_id: newNote.patientId,
          doctor_id: newNote.doctorId,
          doctor_name: newNote.doctorName,
          date: newNote.date,
          diagnosis: newNote.diagnosis,
          notes: `${newNote.symptomsObserved}\n${newNote.treatmentAdministered}`,
          exercises: newNote.exercisesPrescribed,
        },
      ]);
    } catch {
      /* ignore Supabase sync failures */
    }

    return NextResponse.json({
      success: true,
      note: newNote,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
