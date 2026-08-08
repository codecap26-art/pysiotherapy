import { NextRequest, NextResponse } from 'next/server';
import { serverDb } from '@/lib/serverDb';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('patientId') || undefined;
    const specialistId = searchParams.get('specialistId') || undefined;

    const appointments = serverDb.getAppointments({ patientId, specialistId });

    return NextResponse.json({
      success: true,
      appointments,
      total: appointments.length,
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
      patientId,
      patientName,
      patientPhone,
      patientEmail,
      patientAge,
      patientGender,
      specialistId,
      specialistName,
      specialistTitle,
      specialistImage,
      treatmentId,
      treatmentName,
      treatmentCategory,
      clinicId,
      clinicName,
      clinicAddress,
      date,
      timeSlot,
      fee,
      tax,
      totalAmount,
      appointmentType,
      painLevel,
      painDuration,
      reasonForVisit,
      notes,
    } = body;

    if (!patientName || !treatmentName || !date || !timeSlot) {
      return NextResponse.json(
        { success: false, error: 'Missing required appointment fields (patientName, treatmentName, date, timeSlot)' },
        { status: 400 }
      );
    }

    const saved = serverDb.addAppointment({
      patientId: patientId || `usr-${Date.now()}`,
      patientName,
      patientPhone: patientPhone || '',
      patientEmail: patientEmail || '',
      patientAge: Number(patientAge) || 30,
      patientGender: patientGender || 'prefer-not-to-say',
      specialistId: specialistId || 'sarah-jenkins',
      specialistName: specialistName || 'Dr. Sarah Jenkins',
      specialistTitle: specialistTitle || 'Senior Physiotherapist',
      specialistImage: specialistImage || 'https://images.unsplash.com/photo-1594824813620-21a50a6bf1cf?auto=format&fit=crop&q=80&w=400',
      treatmentId: treatmentId || 'general-pt',
      treatmentName,
      treatmentCategory: treatmentCategory || 'Physical Therapy',
      clinicId: clinicId || 'clinic-indiranagar',
      clinicName: clinicName || 'Indiranagar Flagship Centre',
      clinicAddress: clinicAddress || 'Indiranagar, Bangalore',
      date,
      timeSlot,
      status: 'confirmed',
      fee: Number(fee) || 1500,
      tax: Number(tax) || 270,
      totalAmount: Number(totalAmount) || 1770,
      appointmentType: appointmentType || 'in-clinic',
      painLevel: Number(painLevel) || 5,
      painDuration: painDuration || '1 - 3 months',
      reasonForVisit: reasonForVisit || '',
      notes: notes || '',
    });

    // 1. Sync to Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const isSupabaseConfigured =
      supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes('your-project-id') &&
      !supabaseKey.includes('your-anon');

    if (isSupabaseConfigured) {
      try {
        await supabase.from('appointments').insert([
          {
            id: saved.id,
            booking_ref: saved.bookingRef,
            patient_id: saved.patientId,
            patient_name: saved.patientName,
            patient_email: saved.patientEmail,
            patient_phone: saved.patientPhone,
            specialist_id: saved.specialistId,
            specialist_name: saved.specialistName,
            treatment_id: saved.treatmentId,
            treatment_name: saved.treatmentName,
            clinic_id: saved.clinicId,
            clinic_name: saved.clinicName,
            date: saved.date,
            time_slot: saved.timeSlot,
            pain_level: saved.painLevel,
            pain_area: saved.reasonForVisit,
            medical_notes: saved.notes,
            total_amount: saved.totalAmount,
            status: saved.status,
          },
        ]);
      } catch (e) {
        console.warn('Supabase appointment sync skipped:', e);
      }
    }

    return NextResponse.json({
      success: true,
      appointment: saved,
      message: 'Appointment successfully created and persisted in database.',
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Appointment ID and status are required' }, { status: 400 });
    }

    const updated = serverDb.updateAppointmentStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Appointment not found' }, { status: 404 });
    }

    // Sync to Supabase
    try {
      await supabase.from('appointments').update({ status }).eq('id', id);
    } catch {
      /* ignore */
    }

    return NextResponse.json({
      success: true,
      appointment: updated,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
