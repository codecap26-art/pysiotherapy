import type { Metadata } from 'next';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '@/lib/animations';
import { ScrollThreeThread } from '@/components/sections/ScrollThreeThread';

export const metadata: Metadata = { title: 'Recovery Timeline' };

const FAQS = [
  {
    q: 'How soon can I start?',
    a: 'We typically have availability within 24–48 hours for initial assessments. Virtual appointments can often be scheduled the same day.',
  },
  {
    q: "Do I need a doctor's referral?",
    a: 'In most cases, no. As direct access providers, you can come straight to us. Your insurance provider may require a referral for coverage.',
  },
  {
    q: 'Is physiotherapy painful?',
    a: 'While some techniques may cause mild, temporary discomfort, physiotherapy should not be intensely painful. Your comfort is our priority.',
  },
];

export default function RecoveryTimelinePage() {
  return (
    <div className="bg-[#FAFAF8]">
      {/* ── 3D Scroll Thread Animation ── */}
      <ScrollThreeThread />

      {/* ── FAQs ── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0D1421] mb-3 tracking-tight">
              Common Questions
            </h2>
            <p className="text-center text-[#8896A8] mb-12">
              Everything you need to know before you begin.
            </p>
          </FadeUp>

          <StaggerContainer className="space-y-3">
            {FAQS.map((faq, i) => (
              <StaggerItem key={i}>
                <div className="bg-[#FAFBFF] border border-[#E8ECF4] rounded-2xl overflow-hidden group hover:border-[#BFDBFE] transition-colors">
                  <button className="w-full flex justify-between items-center px-6 py-5 text-left">
                    <span className="font-semibold text-[#0D1421] text-sm group-hover:text-[#1E6FFF] transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown className="w-5 h-5 text-[#8896A8] shrink-0 ml-4 group-hover:text-[#1E6FFF] transition-colors" />
                  </button>
                  {i === 0 && (
                    <div className="px-6 pb-5 text-sm text-[#4A5568] leading-relaxed border-t border-[#E8ECF4] pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <FadeUp>
          <div className="bg-[#0D1421] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E6FFF]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <h2 className="relative text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
              Ready to start your journey?
            </h2>
            <p className="relative text-[#8896A8] mb-10 max-w-xl mx-auto text-lg">
              Every recovery begins with a single step. Book your initial assessment today and
              let our specialists build your custom roadmap.
            </p>
            <div className="relative flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/book"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[#1E6FFF] hover:bg-[#1558D6] text-white rounded-xl font-semibold text-base transition-colors shadow-[0_4px_16px_rgba(30,111,255,0.3)]"
              >
                Book Now <ArrowRight className="ml-1 w-5 h-5" />
              </a>
              <a
                href="/specialists"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-xl font-semibold text-base transition-colors"
              >
                View Our Specialists
              </a>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
