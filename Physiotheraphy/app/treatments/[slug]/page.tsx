import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TREATMENTS } from '@/lib/data/treatments';
import { 
  ArrowLeft, Calendar, CheckCircle2, Clock, ShieldCheck, 
  Activity, Award, Sparkles, ChevronRight, Stethoscope, HeartPulse, UserCheck 
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TREATMENTS.map((t) => ({
    slug: t.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const treatment = TREATMENTS.find((t) => t.id === slug);
  if (!treatment) return { title: 'Treatment Not Found' };

  return {
    title: `${treatment.title} | Healing Motion Physiotherapy`,
    description: treatment.shortDescription,
  };
}

export default async function TreatmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const treatment = TREATMENTS.find((t) => t.id === slug);

  if (!treatment) {
    notFound();
  }

  // Related treatments in same category
  const relatedTreatments = TREATMENTS.filter(
    (t) => t.category === treatment.category && t.id !== treatment.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAFBFF] text-[#0D1421] pb-24">
      {/* Top Breadcrumbs */}
      <div className="bg-white border-b border-[#E8ECF4]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-4 flex items-center gap-2 text-sm text-[#64748B]">
          <Link href="/" className="hover:text-[#1E6FFF] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-[#CBD5E1]" />
          <Link href="/treatments" className="hover:text-[#1E6FFF] transition-colors">Treatments</Link>
          <ChevronRight className="w-4 h-4 text-[#CBD5E1]" />
          <span className="font-semibold text-[#0D1421] truncate">{treatment.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-white to-[#EFF5FF]/40 border-b border-[#E8ECF4] py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF5FF] border border-[#D0E2FF] text-[#1E6FFF] text-xs font-bold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" />
                {treatment.category}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-[#0D1421] leading-tight tracking-tight">
                {treatment.title}
              </h1>

              <p className="text-lg text-[#4A5568] leading-relaxed">
                {treatment.shortDescription}
              </p>

              {/* Badges Bar */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E8ECF4]/80">
                <div className="p-4 rounded-2xl bg-white border border-[#E8ECF4] shadow-sm">
                  <div className="text-2xl font-black text-[#10B981]">{treatment.successRate}%</div>
                  <div className="text-xs text-[#64748B] font-medium mt-0.5">Success Rate</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E8ECF4] shadow-sm">
                  <div className="text-sm font-black text-[#0D1421] mt-1">{treatment.recoveryTimeline}</div>
                  <div className="text-xs text-[#64748B] font-medium mt-0.5">Avg. Timeline</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E8ECF4] shadow-sm">
                  <div className="text-sm font-black text-[#1E6FFF] mt-1">{treatment.sessionsExpected}</div>
                  <div className="text-xs text-[#64748B] font-medium mt-0.5">Recommended</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#1E6FFF] text-white font-bold text-base shadow-lg shadow-[#1E6FFF]/25 hover:bg-[#1558D6] hover:scale-[1.02] active:scale-100 transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  Book This Treatment
                </Link>
                <Link
                  href="/treatments"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-[#E8ECF4] text-[#0D1421] font-bold text-base hover:bg-[#F8FAFC] transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  All Treatments
                </Link>
              </div>
            </div>

            {/* Right: Treatment Image Card */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src={treatment.image}
                  alt={treatment.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#6EE7B7]">
                    <ShieldCheck className="w-4 h-4" />
                    Clinical Evidence-Based Protocol
                  </div>
                  <div className="text-sm text-white/90 font-medium">
                    {treatment.successRateDetail}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left 2 Cols: Clinical Breakdown */}
          <div className="lg:col-span-2 space-y-10">
            {/* Condition Overview */}
            <section className="bg-white p-8 rounded-3xl border border-[#E8ECF4] shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-[#0D1421] flex items-center gap-3">
                <Stethoscope className="w-6 h-6 text-[#1E6FFF]" />
                Clinical Overview
              </h2>
              <p className="text-[#4A5568] leading-relaxed text-base">
                {treatment.conditionDescription}
              </p>
            </section>

            {/* Symptoms & Causes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Symptoms */}
              <div className="bg-white p-6 rounded-3xl border border-[#E8ECF4] shadow-sm space-y-4">
                <h3 className="text-lg font-black text-[#0D1421] flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-[#EF4444]" />
                  Common Symptoms
                </h3>
                <ul className="space-y-2.5">
                  {treatment.symptoms.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#4A5568]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Causes */}
              <div className="bg-white p-6 rounded-3xl border border-[#E8ECF4] shadow-sm space-y-4">
                <h3 className="text-lg font-black text-[#0D1421] flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#F59E0B]" />
                  Common Causes
                </h3>
                <ul className="space-y-2.5">
                  {treatment.commonCauses.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#4A5568]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Techniques Used */}
            <section className="bg-white p-8 rounded-3xl border border-[#E8ECF4] shadow-sm space-y-6">
              <h2 className="text-2xl font-black text-[#0D1421] flex items-center gap-3">
                <Award className="w-6 h-6 text-[#1E6FFF]" />
                Therapy Techniques Applied
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {treatment.treatmentTechniques.map((tech, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#EFF5FF] text-[#1E6FFF] flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-bold text-[#0D1421]">{tech}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section className="bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] p-8 rounded-3xl border border-[#A7F3D0] space-y-4">
              <h2 className="text-2xl font-black text-[#065F46] flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#10B981]" />
                Patient Benefits & Outcomes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {treatment.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                    <span className="text-sm font-semibold text-[#065F46]">{b}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Col: Sticky Sidebar */}
          <div className="space-y-6">
            {/* Quick Action Card */}
            <div className="sticky top-24 bg-white p-6 rounded-3xl border-2 border-[#1E6FFF]/20 shadow-xl space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#8896A8]">
                  Consultation Details
                </div>
                <div className="text-2xl font-black text-[#0D1421] mt-1">
                  {treatment.title}
                </div>
                <div className="text-sm text-[#10B981] font-semibold mt-1">
                  ● Available for Booking Today
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#E8ECF4] text-sm text-[#4A5568]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8896A8]" />
                    Session Duration
                  </span>
                  <span className="font-bold text-[#0D1421]">45 - 60 mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#8896A8]" />
                    Specialist Level
                  </span>
                  <span className="font-bold text-[#0D1421]">Senior PT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#8896A8]" />
                    Insurance
                  </span>
                  <span className="font-bold text-[#10B981]">Claimable</span>
                </div>
              </div>

              <Link
                href="/book"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#1E6FFF] text-white font-bold text-base shadow-lg shadow-[#1E6FFF]/25 hover:bg-[#1558D6] transition-all"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Link>

              <p className="text-center text-xs text-[#8896A8]">
                No advance charges. Free cancellation up to 2 hours before session.
              </p>
            </div>

            {/* Related Treatments */}
            {relatedTreatments.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-[#E8ECF4] shadow-sm space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#8896A8]">
                  More in {treatment.category}
                </h4>
                <div className="space-y-3">
                  {relatedTreatments.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/treatments/${rel.id}`}
                      className="block p-3 rounded-2xl bg-[#F8FAFC] border border-[#E8ECF4] hover:border-[#1E6FFF]/50 hover:bg-white transition-all group"
                    >
                      <div className="text-sm font-bold text-[#0D1421] group-hover:text-[#1E6FFF] transition-colors">
                        {rel.title}
                      </div>
                      <div className="text-xs text-[#64748B] mt-0.5">
                        {rel.recoveryTimeline} • {rel.successRate}% success
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
