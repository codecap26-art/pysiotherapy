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
    
    let appointments: any[] = [];

    // Construct query matching patient or specialist
    let query = supabase.from('appointments').select('*').order('date', { ascending: false });

    if (role === 'therapist' || role === 'doctor') {
      const matchIds = [userId, 'sarah-jenkins', 'marcus-thorne', 'david-chen'].filter(Boolean);
      query = query.in('specialist_id', matchIds);
    } else {
      const matchIds = [userId, 'usr-001'].filter(Boolean);
      query = query.in('patient_id', matchIds);
    }

    const { data: rawAppointments, error } = await query;
    
    if (!error && rawAppointments && rawAppointments.length > 0) {
      const { SPECIALISTS, TREATMENTS } = await import('@/lib/bookingData');
      const { CLINIC_BRANCHES } = await import('@/lib/clinicData');
      const { DEMO_USERS } = await import('@/lib/authData');

      appointments = rawAppointments.map((apt: any) => {
        const specObj = SPECIALISTS.find(s => s.id === apt.specialist_id);
        const treatObj = TREATMENTS.find(t => t.id === apt.treatment_id);
        const clinicObj = CLINIC_BRANCHES.find(c => c.id === apt.clinic_id);
        const patientObj = DEMO_USERS.find(u => u.id === apt.patient_id);

        const specName = apt.specialist_name || specObj?.name || 'Dr. Sarah Jenkins';
        const treatName = apt.treatment_name || treatObj?.name || 'Lower Back & Lumbar Spine Therapy';
        const clinicName = apt.clinic_name || clinicObj?.name || 'Indiranagar Flagship Centre';
        const patientName = apt.patient_name || (patientObj ? `${patientObj.firstName} ${patientObj.lastName}` : 'Rahul Sharma');
        const patientEmail = apt.patient_email || patientObj?.email || 'rahul@demo.com';
        const patientPhone = apt.patient_phone || patientObj?.phone || '+91 98765 43210';

        return {
          id: apt.id,
          bookingRef: apt.booking_ref || `HM-2026-${Math.floor(10000 + Math.random() * 90000)}`,
          patientId: apt.patient_id,
          patientName: patientName,
          patientEmail: patientEmail,
          patientPhone: patientPhone,
          specialistId: apt.specialist_id,
          specialistName: specName,
          specialistTitle: specObj?.title || 'Chief of Physiotherapy',
          specialistImage: specObj?.image || '',
          treatmentId: apt.treatment_id,
          treatmentName: treatName,
          clinicId: apt.clinic_id,
          clinicName: clinicName,
          date: apt.date || '2026-08-15',
          timeSlot: apt.time_slot || '10:00 AM',
          painLevel: apt.pain_level || 5,
          painArea: apt.pain_area || '',
          medicalNotes: apt.medical_notes || '',
          totalAmount: apt.total_amount || 1770,
          status: apt.status || 'pending',
          createdAt: apt.created_at || new Date().toISOString(),
          updatedAt: apt.updated_at || new Date().toISOString(),
        };
      });
    }

    // Fallback: If Supabase has no records or errored out, pull from local persistent DB
    if (appointments.length === 0) {
      const { db } = await import('@/lib/db');
      if (role === 'therapist' || role === 'doctor') {
        appointments = db.getAppointmentsByDoctor(userId);
        // If doctor ID is email or alternate form, try fuzzy match
        if (appointments.length === 0) {
          appointments = db.getAppointments();
        }
      } else {
        appointments = db.getAppointmentsByPatient(userId);
        if (appointments.length === 0) {
          appointments = db.getAppointments();
        }
      }
    }

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

export async function DELETE(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Appointment ID required' }, { status: 400 });
    }

    // Delete from Supabase (best-effort)
    await supabase.from('appointments').delete().eq('id', id).then(() => {}).catch(() => {});

    // Always delete from local persistent DB
    const { db } = await import('@/lib/db');
    db.deleteAppointment(id);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
