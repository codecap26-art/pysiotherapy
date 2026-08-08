import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/serverDb';

export async function GET() {
  try {
    const rawUsers = serverDb.getUsers();
    // Strip passwords before returning
    const users = rawUsers.map(({ password: _, ...safeUser }) => safeUser);

    return NextResponse.json({
      success: true,
      users,
      total: users.length,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
