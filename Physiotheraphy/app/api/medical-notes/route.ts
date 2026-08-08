import { NextRequest, NextResponse } from 'next/server';
import { serverDb } from '@/lib/serverDb';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('patientId') || undefined;

    const notes = serverDb.getClinicalNotes(patientId);

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
    const body = await req.json();
    const {
      appointmentId,
      patientId,
      doctorId,
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

    const newNote = serverDb.addClinicalNote({
      appointmentId: appointmentId || `apt-${Date.now()}`,
      patientId,
      doctorId: doctorId || 'usr-doctor-sarah',
      doctorName: doctorName || 'Dr. Sarah Jenkins',
      date: date || new Date().toISOString().split('T')[0],
      diagnosis,
      symptomsObserved: symptomsObserved || '',
      treatmentAdministered: treatmentAdministered || '',
      exercisesPrescribed: exercisesPrescribed || [],
      recoveryProgress: Number(recoveryProgress) || 50,
      nextFollowUpDate: nextFollowUpDate || '',
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
      /* ignore */
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
