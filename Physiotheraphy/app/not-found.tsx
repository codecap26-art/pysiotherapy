'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Stethoscope, Calendar, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#FAFBFF] px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full text-center space-y-8"
      >
        {/* Badge & Graphic */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFF5FF] border border-[#D0E2FF] text-[#1E6FFF] text-xs font-bold uppercase tracking-wider">
          Error 404 • Page Not Found
        </div>

        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-black text-[#0D1421]/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-2xl md:text-3xl font-black text-[#0D1421]">
              Oops! Page not found
            </p>
          </div>
        </div>

        <p className="text-[#64748B] text-base md:text-lg max-w-md mx-auto">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E8ECF4] shadow-sm hover:shadow-md hover:border-[#1E6FFF]/40 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EFF5FF] text-[#1E6FFF] flex items-center justify-center group-hover:bg-[#1E6FFF] group-hover:text-white transition-colors">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0D1421]">Home Page</div>
              <div className="text-xs text-[#64748B]">Back to main overview</div>
            </div>
          </Link>

          <Link
            href="/treatments"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E8ECF4] shadow-sm hover:shadow-md hover:border-[#1E6FFF]/40 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EFF5FF] text-[#1E6FFF] flex items-center justify-center group-hover:bg-[#1E6FFF] group-hover:text-white transition-colors">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0D1421]">Treatments</div>
              <div className="text-xs text-[#64748B]">Explore clinical protocols</div>
            </div>
          </Link>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E6FFF] text-white font-bold text-sm shadow-lg shadow-[#1E6FFF]/20 hover:bg-[#1557cc] hover:shadow-xl transition-all"
          >
            <Calendar className="w-4 h-4" />
            Book Consultation
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E8ECF4] text-[#0D1421] font-bold text-sm hover:bg-[#F8FAFC] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
