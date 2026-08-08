'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Loader2, ShieldAlert } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('patient' | 'therapist' | 'admin')[];
  redirectUrl?: string;
}

export default function AuthGuard({
  children,
  allowedRoles,
  redirectUrl,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, setRedirectUrl } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!isAuthenticated || !user) {
      setRedirectUrl(redirectUrl || pathname);
      router.push(`/auth/login?redirect=${encodeURIComponent(redirectUrl || pathname)}`);
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Role unauthorized: redirect to user's proper portal
      if (user.role === 'therapist') {
        router.push('/dashboard/therapist');
      } else if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [mounted, isAuthenticated, user, allowedRoles, router, pathname, redirectUrl, setRedirectUrl]);

  if (!mounted || !isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#FAFBFF]">
        <div className="w-12 h-12 rounded-2xl bg-[#EFF5FF] border border-[#BFDBFE] flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-[#1E6FFF] animate-spin" />
        </div>
        <p className="text-sm font-medium text-[#64748B]">Verifying medical portal access...</p>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#FAFBFF] p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-[#0D1421]">Access Restricted</h2>
        <p className="text-sm text-[#64748B] max-w-md">
          This portal requires specific credentials. Redirecting to your assigned dashboard...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
