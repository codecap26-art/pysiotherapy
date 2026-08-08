'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#D1FAE5] flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-[#10B981]" />
        </div>
        <h1 className="text-2xl font-black text-[#0D1421] tracking-tight mb-2">
          Check Your Email
        </h1>
        <p className="text-[#8896A8] text-sm mb-6 max-w-sm mx-auto">
          We&apos;ve sent a password reset link to{' '}
          <span className="font-bold text-[#0D1421]">{email}</span>. Please
          check your inbox and spam folder.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => setSent(false)}
            className="w-full px-6 py-3.5 bg-white border-2 border-[#E8ECF4] text-[#4A5568] text-sm font-semibold rounded-2xl hover:border-[#CDD6E8] transition-all"
          >
            Try a different email
          </button>
          <Link
            href="/auth/login"
            className="block w-full px-6 py-3.5 bg-gradient-to-r from-[#1E6FFF] to-[#3B82F6] text-white text-sm font-bold rounded-2xl text-center shadow-[0_8px_24px_rgba(30,111,255,0.3)]"
          >
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link
        href="/auth/login"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8896A8] hover:text-[#1E6FFF] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Sign In
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#0D1421] tracking-tight mb-2">
          Forgot Password?
        </h1>
        <p className="text-[#8896A8] text-sm">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fp-email" className="block text-xs font-bold text-[#4A5568] mb-1.5 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8]" />
            <input
              id="fp-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-[#E8ECF4] bg-white text-sm text-[#0D1421] placeholder:text-[#C0C9D6] focus:border-[#1E6FFF] focus:ring-4 focus:ring-[#1E6FFF]/10 outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !email}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#1E6FFF] to-[#3B82F6] text-white text-sm font-bold rounded-2xl shadow-[0_8px_24px_rgba(30,111,255,0.3)] hover:shadow-[0_12px_32px_rgba(30,111,255,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Send Reset Link
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
