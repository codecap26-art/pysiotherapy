import { NextRequest, NextResponse } from 'next/server';
import { serverDb } from '@/lib/serverDb';
import { generateToken, User } from '@/lib/authData';
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

    // Check if user already exists in server database
    const existing = serverDb.findUserByEmail(normalizedEmail);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email address already exists. Please log in.' },
        { status: 409 }
      );
    }

    const userId = `usr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const userRole = role || 'patient';

    const newUser: User & { password: string } = {
      id: userId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      phone: phone ? phone.trim() : '',
      age: Number(age) || 30,
      gender: gender || 'prefer-not-to-say',
      avatar: '',
      role: userRole,
      emergencyContact: '',
      medicalConditions: '',
      allergies: '',
      preferredLanguage: 'English',
      createdAt: new Date().toISOString(),
      emailVerified: true,
      password: password,
    };

    // 1. Try syncing with Supabase Auth & public.users table if active
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const isSupabaseConfigured =
      supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes('your-project-id') &&
      !supabaseKey.includes('your-anon');

    if (isSupabaseConfigured) {
      try {
        const { data: supaUser, error: supaErr } = await supabase.auth.signUp({
          email: normalizedEmail,
          password: password,
          options: {
            data: {
              first_name: newUser.firstName,
              last_name: newUser.lastName,
              phone: newUser.phone,
              role: newUser.role,
            },
          },
        });

        if (!supaErr && supaUser.user) {
          newUser.id = supaUser.user.id;
          await supabase.from('users').upsert([
            {
              id: supaUser.user.id,
              email: normalizedEmail,
              first_name: newUser.firstName,
              last_name: newUser.lastName,
              phone: newUser.phone,
              age: newUser.age,
              gender: newUser.gender,
              role: newUser.role,
            },
          ]);
        }
      } catch (e) {
        console.warn('Supabase sync skipped during registration:', e);
      }
    }

    // 2. Persist in Server Database
    const safeUser = serverDb.addUser(newUser);

    // 3. Welcome Notification
    serverDb.addNotification({
      userId: safeUser.id,
      title: 'Welcome to Healing Motion!',
      message: `Welcome, ${safeUser.firstName}! Your account has been registered in the database. You can now book physiotherapy consultations.`,
      type: 'system',
      link: '/dashboard',
      read: false,
    });

    const token = generateToken(safeUser);

    return NextResponse.json({
      success: true,
      user: safeUser,
      token,
      message: 'Account created and saved in database successfully.',
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
