import { NextRequest, NextResponse } from 'next/server';
import { serverDb } from '@/lib/serverDb';
import { supabase } from '@/lib/supabase';
import { testSupabaseConnection } from '@/lib/supabaseService';

export async function GET() {
  try {
    const stats = serverDb.getStats();
    const supaConnection = await testSupabaseConnection();

    return NextResponse.json({
      success: true,
      stats,
      supabase: supaConnection,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'sync-supabase') {
      const data = serverDb.read();
      const results: { usersSynced: number; appointmentsSynced: number; notesSynced: number; errors: string[] } = {
        usersSynced: 0,
        appointmentsSynced: 0,
        notesSynced: 0,
        errors: [],
      };

      // 1. Sync users
      for (const u of data.users) {
        try {
          const role = u.role === 'therapist' ? 'doctor' : u.role;
          const { error } = await supabase.from('users').upsert({
            id: u.id,
            email: u.email,
            first_name: u.firstName,
            last_name: u.lastName,
            phone: u.phone || null,
            role: role,
            age: u.age || null,
            gender: u.gender || null,
          }, { onConflict: 'id' });

          if (!error) results.usersSynced++;
          else results.errors.push(`User ${u.email}: ${error.message}`);
        } catch (err: any) {
          results.errors.push(`User ${u.email}: ${err.message}`);
        }
      }

      // 2. Sync appointments
      for (const apt of data.appointments) {
        try {
          const { error } = await supabase.from('appointments').upsert({
            id: apt.id,
            booking_ref: apt.bookingRef,
            patient_id: apt.patientId,
            patient_name: apt.patientName,
            patient_email: apt.patientEmail,
            patient_phone: apt.patientPhone,
            specialist_id: apt.specialistId,
            specialist_name: apt.specialistName,
            treatment_id: apt.treatmentId,
            treatment_name: apt.treatmentName,
            clinic_id: apt.clinicId,
            clinic_name: apt.clinicName,
            date: apt.date,
            time_slot: apt.timeSlot,
            pain_level: apt.painLevel,
            pain_area: apt.reasonForVisit,
            medical_notes: apt.notes,
            total_amount: apt.totalAmount,
            status: apt.status,
          }, { onConflict: 'booking_ref' });

          if (!error) results.appointmentsSynced++;
          else results.errors.push(`Appointment ${apt.bookingRef}: ${error.message}`);
        } catch (err: any) {
          results.errors.push(`Appointment ${apt.bookingRef}: ${err.message}`);
        }
      }

      // 3. Sync notes
      for (const note of data.clinicalNotes) {
        try {
          const { error } = await supabase.from('medical_notes').upsert({
            id: note.id,
            patient_id: note.patientId,
            doctor_id: note.doctorId,
            doctor_name: note.doctorName,
            date: note.date,
            diagnosis: note.diagnosis,
            notes: `${note.symptomsObserved}\n${note.treatmentAdministered}`,
            exercises: note.exercisesPrescribed,
          });

          if (!error) results.notesSynced++;
          else results.errors.push(`Note ${note.id}: ${error.message}`);
        } catch (err: any) {
          results.errors.push(`Note ${note.id}: ${err.message}`);
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Sync completed',
        results,
      });
    }

    if (action === 'reseed') {
      const freshData = serverDb.resetToSeed();
      return NextResponse.json({
        success: true,
        message: 'Database successfully re-seeded with default clinical records and demo accounts.',
        stats: {
          users: freshData.users.length,
          appointments: freshData.appointments.length,
          notes: freshData.clinicalNotes.length,
        },
      });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
