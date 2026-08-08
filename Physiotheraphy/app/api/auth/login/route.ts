import { NextRequest, NextResponse } from 'next/server';
import { serverDb } from '@/lib/serverDb';
import { generateToken, User } from '@/lib/authData';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Try Supabase Auth if credentials configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const isSupabaseConfigured =
      supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes('your-project-id') &&
      !supabaseKey.includes('your-anon');

    if (isSupabaseConfigured) {
      try {
        const { data: supaAuth, error: supaErr } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: password,
        });

        if (!supaErr && supaAuth.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('email', normalizedEmail)
            .maybeSingle();

          const supaUserObj: User = {
            id: supaAuth.user.id,
            email: supaAuth.user.email || normalizedEmail,
            firstName: profile?.first_name || supaAuth.user.user_metadata?.first_name || 'User',
            lastName: profile?.last_name || supaAuth.user.user_metadata?.last_name || '',
            phone: profile?.phone || supaAuth.user.user_metadata?.phone || '',
            age: profile?.age || 30,
            gender: profile?.gender || 'prefer-not-to-say',
            avatar: profile?.avatar_url || '',
            role: (profile?.role || supaAuth.user.user_metadata?.role || 'patient') as 'patient' | 'therapist' | 'admin',
            emergencyContact: '',
            medicalConditions: '',
            allergies: '',
            preferredLanguage: 'English',
            createdAt: supaAuth.user.created_at || new Date().toISOString(),
            emailVerified: true,
          };

          // Save to local server DB as well for cache/sync
          serverDb.addUser(supaUserObj);

          const token = supaAuth.session?.access_token || generateToken(supaUserObj);
          return NextResponse.json({
            success: true,
            user: supaUserObj,
            token,
          });
        }
      } catch (e) {
        console.warn('Supabase login check skipped:', e);
      }
    }

    // 2. Authenticate against Server Database
    const user = serverDb.findUserByEmail(normalizedEmail);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'No account found with this email address. Please register first.' },
        { status: 404 }
      );
    }

    if (user.password && user.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Incorrect password. Please verify your credentials and try again.' },
        { status: 401 }
      );
    }

    const { password: _, ...safeUser } = user;
    const token = generateToken(safeUser as User);

    return NextResponse.json({
      success: true,
      user: safeUser,
      token,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
