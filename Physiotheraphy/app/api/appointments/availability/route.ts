import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get('date');
    const specialistId = searchParams.get('specialistId');

    if (!date || !specialistId) {
      return NextResponse.json(
        { success: false, error: 'Missing date or specialistId parameters' },
        { status: 400 }
      );
    }

    // Query Supabase for appointments for this specialist on this date
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('time_slot')
      .eq('specialist_id', specialistId)
      .eq('date', date)
      .neq('status', 'cancelled');

    if (error) {
      console.error('Error fetching availability:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Extract just the time slots that are booked
    const bookedSlots = appointments.map((apt) => apt.time_slot);

    return NextResponse.json({
      success: true,
      bookedSlots,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
