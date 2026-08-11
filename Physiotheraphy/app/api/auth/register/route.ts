import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, age, gender, password, role } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (firstName, lastName, email, password)' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Create user in Supabase Auth
    const { data: supaUser, error: supaErr } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: password,
      options: {
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone ? phone.trim() : '',
          role: role || 'patient',
        },
      },
    });

    if (supaErr || !supaUser.user) {
       return NextResponse.json(
        { success: false, error: supaErr?.message || 'Registration failed.' },
        { status: 400 }
      );
    }

    // 2. Insert into public.users table
    const { error: insertErr } = await supabase.from('users').upsert([
      {
        id: supaUser.user.id,
        email: normalizedEmail,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone ? phone.trim() : null,
        age: Number(age) || null,
        gender: gender || null,
        role: role || 'patient',
      },
    ]);

    if (insertErr) {
       console.error("Error inserting user profile:", insertErr);
    }

    // 3. Welcome Notification
    await supabase.from('notifications').insert({
      id: `notif-${Date.now()}`,
      user_id: supaUser.user.id,
      title: 'Welcome to Healing Motion!',
      message: `Welcome, ${firstName}! Your account has been registered.`,
      type: 'system',
      link: '/dashboard',
      read: false,
    });

    const userObj = {
      id: supaUser.user.id,
      email: normalizedEmail,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone ? phone.trim() : '',
      age: Number(age) || null,
      gender: gender || 'prefer-not-to-say',
      avatar: '',
      role: role || 'patient',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      user: userObj,
      token: supaUser.session?.access_token || 'pending_verification',
      message: 'Account created successfully.',
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
