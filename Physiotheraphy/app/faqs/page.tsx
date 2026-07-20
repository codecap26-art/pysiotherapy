'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeUp, StaggerContainer, StaggerItem } from '@/lib/animations';


const FAQS = [
  {
    q: 'How soon can I start?',
    a: 'We typically have availability within 24–48 hours for initial assessments. Virtual appointments can often be scheduled the same day. Use our online booking system or call us directly.'
  },
  {
    q: "Do I need a doctor's referral?",
    a: "In most cases, no. As direct access providers, you can come straight to us for an assessment. However, your specific insurance provider may require a referral for coverage — we recommend checking with them first."
  },
  {
    q: 'Is physiotherapy painful?',
    a: "While some therapeutic techniques may cause mild, temporary discomfort as we mobilize tissues, physiotherapy should not be intensely painful. Your comfort is our priority and we adjust every session to your tolerance."
  },
  {
    q: 'What should I wear to my appointment?',
    a: 'Please wear comfortable, loose-fitting athletic clothing that allows easy access to the area we are treating. Athletic shoes are recommended. Avoid tight jeans or clothing that restricts movement.'
  },
  {
    q: 'How long does each session last?',
    a: 'Initial assessments typically last 60 minutes. Standard follow-up sessions range from 45 to 60 minutes depending on your customized treatment plan.'
  },
  {
    q: 'Do you accept insurance?',
    a: 'Yes, we are in-network with most major insurance providers. We will verify your benefits during your first visit so there are no surprises. We also offer direct billing.'
  }
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
        open ? 'border-[#1E6FFF]/30 shadow-[0_0_0_4px_rgba(30,111,255,0.06)]' : 'border-[#E8ECF4] hover:border-[#CDD6E8]'
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className={`font-semibold text-sm transition-colors ${open ? 'text-[#1E6FFF]' : 'text-[#0D1421]'}`}>
          {q}
        </span>
        <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
          open ? 'bg-[#EFF5FF] text-[#1E6FFF]' : 'bg-[#F8FAFC] text-[#8896A8]'
        }`}>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm text-[#4A5568] leading-relaxed border-t border-[#E8ECF4] pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQsPage() {
  return (
    <div className="bg-[#FAFBFF] min-h-screen">
      {/* Header */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EFF5FF] border border-[#BFDBFE] rounded-full text-xs font-semibold text-[#1E6FFF] mb-6">
            Patient Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D1421] mb-5 tracking-[-0.04em]">
            Frequently Asked<br />
            <span className="bg-gradient-to-r from-[#1E6FFF] to-[#4F9DFF] bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-lg text-[#4A5568] max-w-xl mx-auto leading-relaxed">
            Everything you need to know about your recovery journey, billing, and what to expect at Healing Motion.
          </p>
        </FadeUp>
      </section>

      {/* FAQ List */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <StaggerContainer className="space-y-3">
          {FAQS.map((faq, i) => (
            <StaggerItem key={i}>
              <FAQItem {...faq} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <FadeUp>
          <div className="bg-white border border-[#E8ECF4] rounded-3xl p-8 md:p-10 text-center shadow-[var(--shadow-md)]">
            <div className="w-12 h-12 bg-[#EFF5FF] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E6FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-[#0D1421] mb-2 tracking-tight">Still have questions?</h2>
            <p className="text-[#4A5568] text-sm mb-7 max-w-xs mx-auto">
              Our patient coordinators are available Monday–Friday, 8am to 6pm to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href="/book" className="inline-flex items-center justify-center gap-2 h-10 px-4 bg-[#1E6FFF] hover:bg-[#1558D6] text-white rounded-xl font-semibold text-sm transition-colors">Book an Appointment <ArrowRight className="ml-1 w-4 h-4" /></a>
              <a href="tel:+15550123" className="inline-flex items-center justify-center gap-2 h-10 px-4 bg-white border border-[#E8ECF4] hover:bg-[#F8FAFC] text-[#0D1421] rounded-xl font-semibold text-sm transition-colors">Call +1-555-0123</a>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
