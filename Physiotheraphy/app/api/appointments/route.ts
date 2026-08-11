import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAuthUser } from '@/lib/tokenParser';

export async function GET(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);

    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    const { userId, role } = authUser;
    
    let query = supabase.from('appointments').select('*').order('date', { ascending: false });

    if (role === 'therapist' || role === 'doctor') {
      query = query.eq('specialist_id', userId);
    } else if (role === 'patient') {
      query = query.eq('patient_id', userId);
    }

    const { data: rawAppointments, error } = await query;
    
    if (error) {
       console.error("Supabase API Error:", error);
       return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const appointments = (rawAppointments || []).map((apt: any) => ({
      id: apt.id,
      bookingRef: apt.booking_ref,
      patientId: apt.patient_id,
      patientName: apt.patient_name,
      patientEmail: apt.patient_email,
      patientPhone: apt.patient_phone,
      specialistId: apt.specialist_id,
      specialistName: apt.specialist_name,
      treatmentId: apt.treatment_id,
      treatmentName: apt.treatment_name,
      clinicId: apt.clinic_id,
      clinicName: apt.clinic_name,
      date: apt.date,
      timeSlot: apt.time_slot,
      painLevel: apt.pain_level,
      painArea: apt.pain_area,
      medicalNotes: apt.medical_notes,
      totalAmount: apt.total_amount,
      status: apt.status,
      createdAt: apt.created_at,
      updatedAt: apt.updated_at,
    }));

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

export async function PATCH(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Appointment ID and status are required' }, { status: 400 });
    }

    const { data: appointment } = await supabase.from('appointments').select('*').eq('id', id).single();
    if (!appointment) {
      return NextResponse.json({ success: false, error: 'Appointment not found' }, { status: 404 });
    }

    const isOwner = appointment.patient_id === authUser.userId;
    const isDoctor = authUser.role === 'therapist' || authUser.role === 'doctor';
    const isAdmin = authUser.role === 'admin';
    const isAssignedDoctor = isDoctor && appointment.specialist_id === authUser.userId;

    if (!isOwner && !isAdmin && !isAssignedDoctor) {
      return NextResponse.json(
        { success: false, error: 'Forbidden. You do not have access to this appointment.' },
        { status: 403 }
      );
    }

    const { data: updated, error } = await supabase
      .from('appointments')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
       return NextResponse.json({ success: false, error: error.message }, { status: 500 });
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
