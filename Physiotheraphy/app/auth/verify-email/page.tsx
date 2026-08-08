'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MailCheck, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function VerifyEmailPage() {
  const { user, updateProfile } = useAuthStore();
  const [resending, setResending] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);
  const [verified, setVerified] = useState(user?.emailVerified || false);

  const handleResend = async () => {
    setResending(true);
    await new Promise((r) => setTimeout(r, 800));
    setResending(false);
    setSentMessage(true);
    setTimeout(() => setSentMessage(false), 4000);
  };

  const handleSimulateVerify = () => {
    updateProfile({ emailVerified: true });
    setVerified(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <div className="w-16 h-16 rounded-3xl bg-[#EFF5FF] border border-[#BFDBFE] mx-auto flex items-center justify-center mb-6 text-[#1E6FFF]">
        {verified ? (
          <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
        ) : (
          <MailCheck className="w-8 h-8" />
        )}
      </div>

      <h1 className="text-2xl font-black text-[#0D1421] mb-2">
        {verified ? 'Email Verified Successfully!' : 'Verify Your Email Address'}
      </h1>

      <p className="text-sm text-[#8896A8] max-w-sm mx-auto mb-6">
        {verified
          ? 'Your account is fully activated. You can now access your patient portal and schedule clinical appointments.'
          : `We've sent a verification link to ${user?.email || 'your email'}. Please check your inbox and confirm your address.`}
      </p>

      {sentMessage && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-700">
          ✓ Verification email sent again. Check your spam folder if not found.
        </div>
      )}

      <div className="space-y-3 max-w-xs mx-auto">
        {!verified ? (
          <>
            <button
              onClick={handleSimulateVerify}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#1E6FFF] text-white font-bold text-sm shadow-[0_4px_16px_rgba(30,111,255,0.3)] hover:bg-[#1558D6] transition-all flex items-center justify-center gap-2"
            >
              Simulate Instant Verification
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleResend}
              disabled={resending}
              className="w-full py-3 px-6 rounded-2xl bg-white border border-[#E2E8F0] text-[#4A5568] font-semibold text-xs hover:bg-[#F8FAFC] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
              Resend Verification Email
            </button>
          </>
        ) : (
          <Link
            href="/dashboard"
            className="w-full inline-flex py-3.5 px-6 rounded-2xl bg-[#10B981] text-white font-bold text-sm shadow-[0_4px_16px_rgba(16,185,129,0.3)] hover:bg-[#059669] transition-all items-center justify-center gap-2"
          >
            Go to Patient Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
