import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TREATMENTS } from '@/lib/data/treatments';
import { CATEGORIES } from '@/lib/data/categories';
import { 
  ArrowLeft, Calendar, ShieldCheck, ChevronRight, 
  ExternalLink, CheckCircle2, Award, Sparkles, Filter 
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    categorySlug: c.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.id === categorySlug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.label} Treatments | Healing Motion Physiotherapy`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.id === categorySlug);

  if (!category) {
    notFound();
  }

  // Treatments matching this category
  const matchingTreatments = TREATMENTS.filter((t) =>
    category.treatmentIds.includes(t.id)
  );

  return (
    <div className="min-h-screen bg-[#FAFBFF] text-[#0D1421] pb-24">
      {/* Top Breadcrumbs */}
      <div className="bg-white border-b border-[#E8ECF4]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-4 flex items-center gap-2 text-sm text-[#64748B]">
          <Link href="/" className="hover:text-[#1E6FFF] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-[#CBD5E1]" />
          <Link href="/treatments" className="hover:text-[#1E6FFF] transition-colors">Treatments</Link>
          <ChevronRight className="w-4 h-4 text-[#CBD5E1]" />
          <span className="font-semibold text-[#0D1421]">{category.label}</span>
        </div>
      </div>

      {/* Category Hero */}
      <div className="bg-white border-b border-[#E8ECF4] py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFF5FF] border border-[#D0E2FF] text-[#1E6FFF] text-xs font-bold uppercase tracking-wider">
                Specialized Care Program
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-[#0D1421] tracking-tight flex items-center gap-3">
                <span className="text-4xl sm:text-5xl">{category.emoji}</span>
                {category.label}
              </h1>
              <p className="text-lg text-[#4A5568] leading-relaxed">
                {category.description}
              </p>

              {/* Symptom Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8896A8] mr-2 self-center">
                  Key Focus:
                </span>
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#4A5568]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#1E6FFF] text-white font-bold text-base shadow-lg shadow-[#1E6FFF]/25 hover:bg-[#1558D6] transition-all"
              >
                <Calendar className="w-5 h-5" />
                Book Consultation
              </Link>
              <Link
                href="/treatments"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border border-[#E8ECF4] text-[#0D1421] font-bold text-base hover:bg-[#F8FAFC] transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                All Specializations
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Treatments List */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D1421]">
              Treatments in {category.label}
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Showing {matchingTreatments.length} evidence-based clinical protocols
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matchingTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="bg-white rounded-3xl border border-[#E8ECF4] shadow-sm hover:shadow-xl hover:border-[#1E6FFF]/40 transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={treatment.image}
                  alt={treatment.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#10B981] shadow-sm">
                  {treatment.successRate}% Success
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#1E6FFF] uppercase tracking-wider">
                    {treatment.category}
                  </div>
                  <h3 className="text-xl font-bold text-[#0D1421] group-hover:text-[#1E6FFF] transition-colors">
                    {treatment.title}
                  </h3>
                  <p className="text-sm text-[#64748B] line-clamp-2 leading-relaxed">
                    {treatment.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8ECF4] space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#8896A8]">
                    <span>Timeline: <strong className="text-[#0D1421]">{treatment.recoveryTimeline}</strong></span>
                    <span>Sessions: <strong className="text-[#0D1421]">{treatment.sessionsExpected}</strong></span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/treatments/${treatment.id}`}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#EFF5FF] text-[#1E6FFF] font-bold text-xs hover:bg-[#1E6FFF] hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Page
                    </Link>

                    <Link
                      href="/book"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#1E6FFF] text-white font-bold text-xs hover:bg-[#1558D6] transition-colors shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
