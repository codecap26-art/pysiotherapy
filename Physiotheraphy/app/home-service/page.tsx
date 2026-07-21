'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, MapPin, CheckCircle, Clock, HeartPulse, Accessibility, Briefcase, CalendarCheck, FileText, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';

export default function HomeServicePage() {
  const whoItsFor = [
    { icon: Activity, title: 'Post-Surgery Recovery', desc: 'When traveling to a clinic is unsafe or uncomfortable during the crucial early weeks of rehab.' },
    { icon: Accessibility, title: 'Seniors & Limited Mobility', desc: 'Maintain independence with fall prevention and balance training right in your own living space.' },
    { icon: Briefcase, title: 'Busy Professionals', desc: 'Maximize your time. Get expert treatment at your home office without the commute.' },
    { icon: HeartPulse, title: 'Chronic Conditions', desc: 'Consistent, long-term management of neurological or rheumatological conditions in a familiar environment.' },
  ];

  const steps = [
    { id: 1, title: 'Book Online', desc: 'Select "Home Visit" and choose your preferred time.' },
    { id: 2, title: 'Confirm & Schedule', desc: 'Our team verifies your location and confirms the appointment.' },
    { id: 3, title: 'Therapist Arrival', desc: 'Your specialist arrives fully equipped with a portable table.' },
    { id: 4, title: 'Personalized Session', desc: 'Receive a full 45-60 minute assessment and treatment.' },
    { id: 5, title: 'Follow-up Plan', desc: 'Get your digital exercise program and progress notes.' },
  ];

  const included = [
    'Comprehensive initial assessment and diagnosis',
    'Portable, sanitized treatment table brought to you',
    'Specialized equipment (resistance bands, massage tools)',
    'Full 45-60 minute undivided 1-on-1 attention',
    'Digital home exercise program access',
    'Direct communication with your therapist'
  ];

  const faqs = [
    { id: 'hs1', question: 'Do I need to provide any equipment?', answer: 'No, our physiotherapists bring everything required for your treatment, including a portable treatment table, sanitized linens, and therapeutic tools. We just need a clear space of about 6x6 feet.' },
    { id: 'hs2', question: 'Is the treatment quality the same as in-clinic?', answer: 'Yes. Our home-visit therapists are the exact same highly qualified specialists you would see in our clinic. The assessment, manual therapy, and exercise prescription meet our strict clinical standards.' },
    { id: 'hs3', question: 'Can I claim home visits on my insurance?', answer: 'Most extended health insurance plans cover home physiotherapy just like in-clinic visits. You will receive a detailed receipt with the therapist\'s license number for reimbursement. Travel surcharges may not be covered.' }
  ];

  return (
    <main className="min-h-screen bg-[#FAFBFF] pt-24 pb-0 text-[#0D1421]">
      
      {/* 1. Hero Band */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-6">At-Home Physiotherapy</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              Expert Physiotherapy, at Your Doorstep.
            </h1>
            <p className="text-lg text-[#4A5568] leading-relaxed mb-8">
              Skip the commute and the waiting room. We bring our fully-equipped, clinical-grade physiotherapy directly to your home or office.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/book?type=home" className="px-8 py-4 bg-[var(--color-primary)] hover:bg-primary-hover text-white font-bold rounded-2xl transition-colors shadow-[0_8px_30px_rgba(30,111,255,0.4)] text-center">
                Book a Home Visit
              </Link>
              <a href="tel:+15550123" className="px-8 py-4 bg-white text-[#0D1421] font-bold rounded-2xl border border-[#E8ECF4] hover:bg-[#F8FAFC] transition-colors text-center shadow-sm">
                Call Us: [PLACEHOLDER_PHONE]
              </a>
            </div>

            {/* Trust Row */}
            <div className="flex flex-wrap gap-6 border-t border-[#E8ECF4] pt-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#4A5568]">
                <ShieldCheck className="w-4 h-4 text-[var(--color-accent)]" /> Licensed Therapists
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#4A5568]">
                <Activity className="w-4 h-4 text-[var(--color-accent)]" /> Own Equipment Brought
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#4A5568]">
                <CheckCircle className="w-4 h-4 text-[var(--color-accent)]" /> Safe & Hygienic
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <Image 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" 
              alt="Physiotherapist setting up at home" 
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Who it's for */}
      <section className="bg-[#0D1421] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Who is this for?</h2>
            <p className="text-lg text-[#8896A8] max-w-2xl mx-auto">
              Home visits are ideal when mobility, time, or comfort makes traveling to a clinic difficult.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whoItsFor.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/20 text-[#60A5FA] flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How it works (Step Diagram) */}
      <section className="py-24 bg-white border-b border-[#E8ECF4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#0D1421] mb-4">How it works</h2>
            <p className="text-lg text-[#4A5568] max-w-2xl mx-auto">A seamless process from booking to your first at-home session.</p>
          </div>

          <div className="relative">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-[#E8ECF4] -z-10" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6">
              {steps.map((step, i) => (
                <div key={i} className="relative flex flex-col items-center lg:text-center text-left lg:items-center flex-row lg:flex-col gap-6 lg:gap-0">
                  <div className="w-14 h-14 rounded-full bg-[#FAFBFF] border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-black text-xl flex items-center justify-center shrink-0 shadow-sm lg:mb-6 bg-white z-10">
                    {step.id}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0D1421] text-lg mb-2">{step.title}</h4>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FAFBFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* 4. What's included */}
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#0D1421] mb-8">What's Included</h2>
              <div className="bg-white rounded-3xl p-8 border border-[#E8ECF4] shadow-sm space-y-4">
                {included.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                    <span className="text-[#4A5568] font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* 7. Safety & Hygiene */}
              <div className="mt-8 bg-[var(--color-primary-light)] rounded-3xl p-8 border border-[#BFDBFE]">
                <div className="flex items-center gap-3 text-[var(--color-primary)] mb-4">
                  <ShieldCheck className="w-6 h-6" />
                  <h3 className="font-bold text-lg">Strict Hygiene Protocols</h3>
                </div>
                <p className="text-[#4A5568] text-sm leading-relaxed">
                  Your safety is paramount. All therapists undergo daily health screenings, sanitize their hands and equipment immediately before entering your home, and utilize fresh, clean linens for every patient.
                </p>
              </div>
            </div>

            {/* 5. Coverage Area & Pricing */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-[#E8ECF4] shadow-sm text-center">
                <MapPin className="w-10 h-10 text-[var(--color-primary)] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0D1421] mb-4">Coverage Area</h3>
                <div className="w-full h-40 bg-[#E8ECF4] rounded-2xl mb-6 flex items-center justify-center border border-[var(--color-border-strong)] overflow-hidden">
                  <span className="text-sm font-semibold text-[#8896A8]">[MAP_PLACEHOLDER - Serviceable Zones]</span>
                </div>
                <p className="text-[#4A5568] text-sm leading-relaxed">
                  We currently serve [PLACEHOLDER_CITY] and select surrounding suburbs. Contact us to confirm coverage in your specific area.
                </p>
              </div>

              {/* Pricing Note */}
              <div className="bg-white rounded-3xl p-8 border border-[#E8ECF4] shadow-sm flex gap-4 items-start">
                <FileText className="w-6 h-6 text-[var(--color-primary)] shrink-0" />
                <div>
                  <h3 className="font-bold text-[#0D1421] text-lg mb-2">Transparent Pricing</h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed mb-4">
                    Home visits include a standard travel surcharge to cover transportation and setup time. There are no hidden fees.
                  </p>
                  <p className="text-[#0D1421] font-bold text-sm">
                    Contact us for specific home-visit pricing in your area.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FAQ Mini-block */}
      <section className="py-24 bg-white border-t border-[#E8ECF4]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight text-[#0D1421] mb-4">Home Visit FAQs</h2>
          </div>
          <Accordion items={faqs.map(item => ({ id: item.id, title: item.question, content: item.answer }))} allowMultiple={false} />
          <div className="text-center mt-8">
            <Link href="/faq" className="text-[var(--color-primary)] font-bold hover:underline">View All FAQs →</Link>
          </div>
        </div>
      </section>

      {/* 9. Closing CTA */}
      <section className="py-24 bg-[var(--color-primary)] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Experience care that comes to you.</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Book your home visit today and start your recovery in the comfort of your own space.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/book?type=home" className="px-8 py-4 bg-white text-[var(--color-primary)] font-bold rounded-2xl text-lg shadow-xl hover:bg-[#F8FAFC] transition-colors">
              Book a Home Visit
            </Link>
            <a href="tel:+15550123" className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl text-lg border border-white/20 hover:bg-white/20 transition-colors">
              Call Us: [PLACEHOLDER_PHONE]
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
