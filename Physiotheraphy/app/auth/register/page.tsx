'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Eye, EyeOff, Mail, Lock, User, Phone, Hash, ArrowRight, Loader2, Check,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { simulateGoogleLogin, getPasswordStrength } from '@/lib/authData';
import { registerNewUser } from '@/lib/authService';

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
] as const;

export default function RegisterPage() {
  const router = useRouter();
  const { login, redirectAfterLogin } = useAuthStore();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '' as '' | 'male' | 'female' | 'other' | 'prefer-not-to-say',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordStrength = getPasswordStrength(form.password);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.age || !form.gender || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (isNaN(Number(form.age)) || Number(form.age) < 1 || Number(form.age) > 120) {
      setError('Please enter a valid age.');
      return;
    }

    setLoading(true);

    const result = await registerNewUser({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      age: Number(form.age),
      gender: form.gender as 'male' | 'female' | 'other' | 'prefer-not-to-say',
      password: form.password,
    });

    if (result.success && result.user && result.token) {
      login(result.user, result.token);
      router.push(redirectAfterLogin || '/dashboard');
    } else {
      setError(result.error || 'Registration failed');
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1000));

    const result = simulateGoogleLogin();
    if (result.success && result.user && result.token) {
      login(result.user, result.token);
      router.push(redirectAfterLogin || '/dashboard');
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
          Create Account
        </h1>
        <p className="text-[#8896A8] text-sm">
          Join Healing Motion to book appointments and track your recovery.
        </p>
      </div>

      {/* Google Sign-Up */}
      <button
        onClick={handleGoogleSignUp}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-[#E8ECF4] rounded-2xl text-sm font-semibold text-[#0D1421] hover:border-[#CDD6E8] hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Sign up with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 my-5">
        <div className="flex-1 h-px bg-[#E8ECF4]" />
        <span className="text-xs font-semibold text-[#8896A8] uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-[#E8ECF4]" />
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="reg-firstName" className="block text-[10px] font-bold text-[#4A5568] mb-1 uppercase tracking-wider">First Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8]" />
              <input
                id="reg-firstName"
                type="text"
                value={form.firstName}
                onChange={(e) => update('firstName', e.target.value)}
                placeholder="First name"
                className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-[#E8ECF4] bg-white text-sm text-[#0D1421] placeholder:text-[#C0C9D6] focus:border-[#1E6FFF] focus:ring-4 focus:ring-[#1E6FFF]/10 outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <label htmlFor="reg-lastName" className="block text-[10px] font-bold text-[#4A5568] mb-1 uppercase tracking-wider">Last Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8]" />
              <input
                id="reg-lastName"
                type="text"
                value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
                placeholder="Last name"
                className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-[#E8ECF4] bg-white text-sm text-[#0D1421] placeholder:text-[#C0C9D6] focus:border-[#1E6FFF] focus:ring-4 focus:ring-[#1E6FFF]/10 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="reg-email" className="block text-[10px] font-bold text-[#4A5568] mb-1 uppercase tracking-wider">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8]" />
            <input
              id="reg-email"
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-[#E8ECF4] bg-white text-sm text-[#0D1421] placeholder:text-[#C0C9D6] focus:border-[#1E6FFF] focus:ring-4 focus:ring-[#1E6FFF]/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* Phone + Age */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label htmlFor="reg-phone" className="block text-[10px] font-bold text-[#4A5568] mb-1 uppercase tracking-wider">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8]" />
              <input
                id="reg-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-[#E8ECF4] bg-white text-sm text-[#0D1421] placeholder:text-[#C0C9D6] focus:border-[#1E6FFF] focus:ring-4 focus:ring-[#1E6FFF]/10 outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <label htmlFor="reg-age" className="block text-[10px] font-bold text-[#4A5568] mb-1 uppercase tracking-wider">Age</label>
            <div className="relative">
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8]" />
              <input
                id="reg-age"
                type="number"
                min={1}
                max={120}
                value={form.age}
                onChange={(e) => update('age', e.target.value)}
                placeholder="Age"
                className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-[#E8ECF4] bg-white text-sm text-[#0D1421] placeholder:text-[#C0C9D6] focus:border-[#1E6FFF] focus:ring-4 focus:ring-[#1E6FFF]/10 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-[10px] font-bold text-[#4A5568] mb-1.5 uppercase tracking-wider">Gender</label>
          <div className="grid grid-cols-4 gap-2">
            {GENDER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update('gender', opt.value)}
                className={`px-2 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all ${
                  form.gender === opt.value
                    ? 'border-[#1E6FFF] bg-[#EFF6FF] text-[#1E6FFF]'
                    : 'border-[#E8ECF4] bg-white text-[#4A5568] hover:border-[#CDD6E8]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="reg-password" className="block text-[10px] font-bold text-[#4A5568] mb-1 uppercase tracking-wider">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8]" />
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              placeholder="Min 8 characters"
              className="w-full pl-10 pr-12 py-3 rounded-xl border-2 border-[#E8ECF4] bg-white text-sm text-[#0D1421] placeholder:text-[#C0C9D6] focus:border-[#1E6FFF] focus:ring-4 focus:ring-[#1E6FFF]/10 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8896A8] hover:text-[#4A5568] transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {/* Strength bar */}
          {form.password && (
            <div className="mt-1.5 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: passwordStrength.color }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-[10px] font-bold" style={{ color: passwordStrength.color }}>
                {passwordStrength.label}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="reg-confirm" className="block text-[10px] font-bold text-[#4A5568] mb-1 uppercase tracking-wider">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8]" />
            <input
              id="reg-confirm"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => update('confirmPassword', e.target.value)}
              placeholder="Re-enter password"
              className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-[#E8ECF4] bg-white text-sm text-[#0D1421] placeholder:text-[#C0C9D6] focus:border-[#1E6FFF] focus:ring-4 focus:ring-[#1E6FFF]/10 outline-none transition-all"
            />
            {form.confirmPassword && form.password === form.confirmPassword && (
              <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981]" />
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm font-medium"
          >
            {error}
          </motion.div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#1E6FFF] to-[#3B82F6] text-white text-sm font-bold rounded-2xl shadow-[0_8px_24px_rgba(30,111,255,0.3)] hover:shadow-[0_12px_32px_rgba(30,111,255,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Login link */}
      <p className="mt-5 text-center text-sm text-[#8896A8]">
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="font-bold text-[#1E6FFF] hover:text-[#1558D6] transition-colors"
        >
          Sign In
        </Link>
      </p>
    </motion.div>
  );
}
