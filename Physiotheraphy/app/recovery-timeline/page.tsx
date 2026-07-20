import type { Metadata } from 'next';
import Image from 'next/image';
import { ChevronDown, ArrowRight, Calendar } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '@/lib/animations';
import { Badge } from '@/components/ui/Badge';


export const metadata: Metadata = { title: 'Recovery Timeline' };

const STEPS = [
  { id: 1, label: '1. Assessment', active: true },
  { id: 2, label: '2. Restoration', active: false },
  { id: 3, label: '3. Strengthening', active: false },
];

const FAQS = [
  { q: 'How soon can I start?', a: 'We typically have availability within 24–48 hours for initial assessments. Virtual appointments can often be scheduled the same day.' },
  { q: "Do I need a doctor's referral?", a: 'In most cases, no. As direct access providers, you can come straight to us. Your insurance provider may require a referral for coverage.' },
  { q: 'Is physiotherapy painful?', a: 'While some techniques may cause mild, temporary discomfort, physiotherapy should not be intensely painful. Your comfort is our priority.' },
];

export default function RecoveryTimelinePage() {
  return (
    <div className="bg-[#FAFBFF]">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <FadeUp>
          <Badge variant="accent" className="mb-6">Your Path to Wellness</Badge>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D1421] mb-6 tracking-[-0.04em]">
            The Roadmap to<br />
            <span className="bg-gradient-to-r from-[#1E6FFF] to-[#4F9DFF] bg-clip-text text-transparent">Full Mobility</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-lg text-[#4A5568] max-w-2xl mx-auto leading-relaxed">
            Recovery is not a straight line, but a guided journey. Follow our evidence-based protocol designed to return you to peak performance safely and efficiently.
          </p>
        </FadeUp>

        {/* Timeline steps */}
        <FadeUp delay={0.15}>
          <div className="mt-16 flex justify-between items-center relative max-w-3xl mx-auto">
            {/* Track */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-[#E8ECF4] rounded-full -z-10" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-1.5 bg-[#10B981] shimmer-bar rounded-full -z-10" />

            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-3">
                <div className={`
                  px-5 py-2 rounded-full text-sm font-semibold transition-all
                  ${step.active
                    ? 'bg-[#1E6FFF] text-white shadow-[0_4px_16px_rgba(30,111,255,0.35)]'
                    : 'bg-white border border-[#E8ECF4] text-[#8896A8]'
                  }
                `}>
                  {step.label}
                </div>
                <div className={`w-3 h-3 rounded-full ${step.active ? 'bg-[#10B981] ring-4 ring-[#10B981]/20' : 'bg-[#E8ECF4]'}`} />
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Assessment Deep Dive */}
      <section className="bg-white border-y border-[#E8ECF4] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div>
              <div className="inline-flex items-center gap-2 text-[#1E6FFF] font-bold text-xs uppercase tracking-widest mb-6 bg-[#EFF5FF] px-3 py-1.5 rounded-full border border-[#BFDBFE]">
                <Calendar className="w-3.5 h-3.5" />
                Days 1 – 7
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0D1421] mb-6 tracking-tight">
                Comprehensive Clinical Assessment
              </h2>
              <p className="text-[#4A5568] mb-10 leading-relaxed">
                Our experts utilize advanced biomechanical analysis and diagnostic imaging to pinpoint the root cause of your discomfort. We don&apos;t just treat symptoms — we understand mechanics.
              </p>

              <div className="space-y-3">
                {['Biomechanical Mapping', 'Functional Movement Screening'].map((item) => (
                  <div key={item} className="flex items-center gap-4 bg-[#F8FAFC] px-5 py-4 rounded-xl border border-[#E8ECF4]">
                    <div className="w-1 h-6 bg-[#1E6FFF] rounded-full" />
                    <span className="font-semibold text-[#0D1421] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative h-[460px] w-full rounded-3xl overflow-hidden shadow-[0_24px_64px_-12px_rgba(0,0,0,0.15)]">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Physiotherapist assisting a patient during assessment"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gradient overlay badge */}
              <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#10B981] flex items-center justify-center text-white shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0D1421]">82% Avg. Healing Path Completion</div>
                    <div className="text-xs text-[#4A5568]">Based on 1,200+ patients</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0D1421] mb-3 tracking-tight">
              Common Questions
            </h2>
            <p className="text-center text-[#8896A8] mb-12">Everything you need to know before you begin.</p>
          </FadeUp>

          <StaggerContainer className="space-y-3">
            {FAQS.map((faq, i) => (
              <StaggerItem key={i}>
                <div className="bg-white border border-[#E8ECF4] rounded-2xl overflow-hidden group hover:border-[#BFDBFE] transition-colors">
                  <button className="w-full flex justify-between items-center px-6 py-5 text-left">
                    <span className="font-semibold text-[#0D1421] text-sm group-hover:text-[#1E6FFF] transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown className="w-5 h-5 text-[#8896A8] shrink-0 ml-4 group-hover:text-[#1E6FFF] transition-colors" />
                  </button>
                  {/* Show answer for first one as demo */}
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

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <FadeUp>
          <div className="bg-[#0D1421] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            {/* Glow blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E6FFF]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <h2 className="relative text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
              Ready to start your journey?
            </h2>
            <p className="relative text-[#8896A8] mb-10 max-w-xl mx-auto text-lg">
              Every recovery begins with a single step. Book your initial assessment today and let our specialists build your custom roadmap.
            </p>
            <div className="relative flex flex-col sm:flex-row justify-center gap-4">
              <a href="/book" className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[#1E6FFF] hover:bg-[#1558D6] text-white rounded-xl font-semibold text-base transition-colors shadow-[0_4px_16px_rgba(30,111,255,0.3)]">Book Now <ArrowRight className="ml-1 w-5 h-5" /></a>
              <a href="/specialists" className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-xl font-semibold text-base transition-colors">View Our Specialists</a>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
