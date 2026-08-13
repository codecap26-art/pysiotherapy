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
      // For demo, first try finding user in Supabase public.users
      const { data: demoUser } = await supabase
        .from('users')
        .select('id, role, first_name, last_name')
        .eq('email', normalizedEmail)
        .single();

      let targetId = demoUser?.id;
      let targetRole = demoUser?.role;
      let targetName = demoUser ? `${demoUser.first_name} ${demoUser.last_name}` : '';

      // If not in Supabase, fallback to local DEMO_USERS list
      if (!demoUser) {
        const { DEMO_USERS } = await import('@/lib/authData');
        const fallbackDemo = DEMO_USERS.find(u => u.email.toLowerCase() === normalizedEmail);
        if (fallbackDemo) {
          targetId = fallbackDemo.id;
          targetRole = fallbackDemo.role;
          targetName = `${fallbackDemo.firstName} ${fallbackDemo.lastName}`;

          const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
          const payload = btoa(
            JSON.stringify({
              sub: fallbackDemo.id,
              email: normalizedEmail,
              name: targetName,
              role: fallbackDemo.role,
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
            })
          );
          const mockToken = `${header}.${payload}.mock_signature_${fallbackDemo.id}`;

          const { password: _, ...cleanUser } = fallbackDemo;
          return NextResponse.json({
            success: true,
            user: cleanUser,
            token: mockToken,
          });
        }

        return NextResponse.json(
          { success: false, error: 'Demo user account not found.' },
          { status: 404 }
        );
      }
      
      finalUserId = targetId!;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(
        JSON.stringify({
          sub: targetId,
          email: normalizedEmail,
          name: targetName,
          role: targetRole,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
        })
      );
      finalToken = `${header}.${payload}.mock_signature_${targetId}`;
      
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
