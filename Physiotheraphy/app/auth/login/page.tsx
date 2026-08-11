'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2, Stethoscope, User, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { simulateGoogleLogin, DEMO_USERS } from '@/lib/authData';
import { authenticateUser } from '@/lib/authService';

export default function LoginPage() {
  const router = useRouter();
  const { login, redirectAfterLogin } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleFill = (userType: 'patient' | 'doctor' | 'admin') => {
    setError('');
    if (userType === 'patient') {
      setEmail('rahul@demo.com');
      setPassword('Demo@1234');
    } else if (userType === 'doctor') {
      setEmail('sarah.jenkins@healingmotion.com');
      setPassword('Doctor@1234');
    } else {
      setEmail('admin@healingmotion.com');
      setPassword('Admin@1234');
    }
  };

  const processSuccessfulLogin = (user: any, token: string) => {
    login(user, token);

    // If it's a doctor/therapist, ALWAYS go to therapist dashboard regardless of redirect intent
    if (user.role === 'therapist' || user.role === 'doctor') {
      router.push('/therapist');
    } else if (user.role === 'admin') {
      router.push('/admin');
    } else if (redirectAfterLogin) {
      router.push(redirectAfterLogin);
    } else {
      router.push('/dashboard');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    const result = await authenticateUser({ email, password });

    if (result.success && result.user && result.token) {
      processSuccessfulLogin(result.user, result.token);
    } else {
      setError(result.error || 'Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 800));

    const result = simulateGoogleLogin('patient');
    if (result.success && result.user && result.token) {
      processSuccessfulLogin(result.user, result.token);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#0D1421] tracking-tight mb-2">
          Welcome to Healing Motion
        </h1>
        <p className="text-[#8896A8] text-sm">
          Sign in to access your clinical dashboard, manage recovery, or book appointments.
        </p>
      </div>

      {/* Quick Demo Role Switcher */}
      <div className="mb-6 p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-2 flex items-center justify-between">
          <span>⚡ One-Click Demo Logins</span>
          <span className="text-[10px] text-[#1E6FFF] font-medium">Click to pre-fill</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleRoleFill('patient')}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#CBD5E1] text-[#0D1421] hover:border-[#1E6FFF] hover:text-[#1E6FFF] transition-all shadow-xs"
          >
            <User className="w-3.5 h-3.5 text-[#10B981]" />
            Patient
          </button>
          <button
            type="button"
            onClick={() => handleRoleFill('doctor')}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#CBD5E1] text-[#0D1421] hover:border-[#1E6FFF] hover:text-[#1E6FFF] transition-all shadow-xs"
          >
            <Stethoscope className="w-3.5 h-3.5 text-[#1E6FFF]" />
            Doctor
          </button>
          <button
            type="button"
            onClick={() => handleRoleFill('admin')}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#CBD5E1] text-[#0D1421] hover:border-[#1E6FFF] hover:text-[#1E6FFF] transition-all shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#7C3AED]" />
            Admin
          </button>
        </div>
      </div>

      {/* Google Sign-In */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-[#E8ECF4] rounded-2xl text-sm font-semibold text-[#0D1421] hover:border-[#CDD6E8] hover:shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 my-5">
        <div className="flex-1 h-px bg-[#E8ECF4]" />
        <span className="text-xs font-semibold text-[#8896A8] uppercase tracking-widest">or email</span>
        <div className="flex-1 h-px bg-[#E8ECF4]" />
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="login-email" className="block text-xs font-bold text-[#4A5568] mb-1.5 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8]" />
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-[#E8ECF4] bg-white text-sm text-[#0D1421] placeholder:text-[#C0C9D6] focus:border-[#1E6FFF] focus:ring-4 focus:ring-[#1E6FFF]/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider">
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs font-semibold text-[#1E6FFF] hover:text-[#1558D6] transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8]" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-11 pr-12 py-3.5 rounded-2xl border-2 border-[#E8ECF4] bg-white text-sm text-[#0D1421] placeholder:text-[#C0C9D6] focus:border-[#1E6FFF] focus:ring-4 focus:ring-[#1E6FFF]/10 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8896A8] hover:text-[#0D1421] transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600"
          >
            {error}
          </motion.div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#1E6FFF] text-white font-bold text-sm shadow-[0_4px_16px_rgba(30,111,255,0.3)] hover:bg-[#1558D6] hover:shadow-[0_6px_24px_rgba(30,111,255,0.4)] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-[#8896A8]">
          Don&apos;t have an account yet?{' '}
          <Link
            href="/auth/register"
            className="font-bold text-[#1E6FFF] hover:text-[#1558D6] transition-colors"
          >
            Create Patient Account
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
