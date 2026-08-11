import { NextRequest, NextResponse } from 'next/server';
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

    // DEMO BYPASS: If they use a demo password, bypass Supabase Auth and just fetch their profile
    let finalUserId = '';
    let finalToken = '';

    const isDemoPassword = ['Demo@1234', 'Doctor@1234', 'Admin@1234'].includes(password);
    
    if (isDemoPassword) {
      // For demo, just find the user by email in public.users
      const { data: demoUser, error: demoErr } = await supabase
        .from('users')
        .select('id, role, first_name, last_name')
        .eq('email', normalizedEmail)
        .single();
        
      if (demoErr || !demoUser) {
        return NextResponse.json(
          { success: false, error: 'Demo user not found in database.' },
          { status: 404 }
        );
      }
      
      finalUserId = demoUser.id;
      // Generate a simple mock JWT so tokenParser.ts can read it
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(
        JSON.stringify({
          sub: demoUser.id,
          email: normalizedEmail,
          name: `${demoUser.first_name} ${demoUser.last_name}`,
          role: demoUser.role,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
        })
      );
      finalToken = `${header}.${payload}.mock_signature_${demoUser.id}`;
      
    } else {
      // STANDARD SUPABASE AUTH
      const { data: supaAuth, error: supaErr } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password,
      });

      if (supaErr || !supaAuth.user) {
         return NextResponse.json(
          { success: false, error: supaErr?.message || 'Invalid login credentials.' },
          { status: 401 }
        );
      }
      finalUserId = supaAuth.user.id;
      finalToken = supaAuth.session?.access_token || '';
    }

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', finalUserId)
      .single();

    if (!profile) {
       return NextResponse.json(
        { success: false, error: 'User profile not found in database.' },
        { status: 404 }
      );
    }

    const userObj = {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      phone: profile.phone || '',
      age: profile.age || 30,
      gender: profile.gender || 'prefer-not-to-say',
      avatar: profile.avatar_url || '',
      role: profile.role,
      createdAt: profile.created_at,
    };

    return NextResponse.json({
      success: true,
      user: userObj,
      token: finalToken,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
