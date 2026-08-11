import { NextRequest, NextResponse } from 'next/server';
import { serverDb } from '@/lib/serverDb';

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

    // Get appointments for the specific specialist
    const appointments = serverDb.getAppointments({ specialistId });

    // Find slots that are booked on the specific date and not cancelled
    const bookedSlots = appointments
      .filter((apt) => apt.date === date && apt.status !== 'cancelled')
      .map((apt) => apt.timeSlot);

    return NextResponse.json({
      success: true,
      bookedSlots,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
