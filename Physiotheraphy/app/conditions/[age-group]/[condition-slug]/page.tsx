import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AGE_GROUPS, CONDITIONS, AgeGroupSlug } from '@/lib/conditionData';
import { BodyDiagram } from '@/components/ui/BodyDiagram';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { SPECIALISTS } from '@/lib/bookingData';

export default function ConditionDeepDivePage({ params }: { params: { 'age-group': string, 'condition-slug': string } }) {
  const ageGroupSlug = params['age-group'] as AgeGroupSlug;
  const conditionSlug = params['condition-slug'];
  
  const group = AGE_GROUPS.find(g => g.id === ageGroupSlug);
  const condition = CONDITIONS.find(c => c.slug === conditionSlug && c.ageGroups.includes(ageGroupSlug));
  
  if (!group || !condition) {
    notFound();
  }

  // Find related specialists (simplified to just match any specialist for now, ideally match tags/specializations)
  // Since we don't have exact condition mapping in SPECIALISTS yet, we'll just show top 2 specialists
  const relatedSpecialists = SPECIALISTS.slice(0, 2);

  // Find related conditions in the same age group
  const relatedConditions = CONDITIONS.filter(c => c.id !== condition.id && c.ageGroups.includes(ageGroupSlug)).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FAFBFF] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumbs */}
        <div className="mb-10 text-sm font-semibold text-[#8896A8]">
          <Link href="/conditions" className="hover:text-[var(--color-primary)] transition-colors">Conditions</Link>
          <span className="mx-2">/</span>
          <Link href={`/conditions/${group.id}`} className="hover:text-[var(--color-primary)] transition-colors">{group.title}</Link>
          <span className="mx-2">/</span>
          <span className="text-[#0D1421]">{condition.name}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <h1 className="text-3xl md:text-5xl font-black text-[#0D1421] tracking-tight mb-6">
              {condition.name}
            </h1>
            <p className="text-xl text-[#4A5568] leading-relaxed mb-12">
              {condition.whatItIs}
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-[#0D1421] mb-6">Common Symptoms</h2>
                <ul className="space-y-3">
                  {condition.symptoms.map((sym, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[#4A5568]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-2.5 shrink-0" />
                      <span className="leading-relaxed">{sym}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#0D1421] mb-6">Common Causes</h2>
                <ul className="space-y-3">
                  {condition.causes.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[#4A5568]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2.5 shrink-0" />
                      <span className="leading-relaxed">{cause}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white rounded-3xl p-8 border border-[#E8ECF4] shadow-sm">
                <h2 className="text-2xl font-bold text-[#0D1421] mb-4">How Physiotherapy Helps</h2>
                <p className="text-[#4A5568] leading-relaxed mb-6">
                  {condition.howWeHelp}
                </p>
                <div className="flex items-center gap-3 text-[var(--color-primary)] bg-[var(--color-primary-light)] p-4 rounded-xl border border-[#BFDBFE]">
                  <Clock className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-semibold">Typical Timeline: {condition.timeline}</span>
                </div>
              </section>

              {condition.urgentSymptoms.length > 0 && (
                <section className="bg-red-50 rounded-3xl p-8 border border-red-100">
                  <div className="flex items-center gap-3 text-red-600 mb-4">
                    <AlertTriangle className="w-6 h-6 shrink-0" />
                    <h2 className="text-xl font-bold">When to see a specialist urgently</h2>
                  </div>
                  <ul className="space-y-3">
                    {condition.urgentSymptoms.map((sym, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-red-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 shrink-0" />
                        <span className="leading-relaxed font-medium">{sym}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-red-600/70 mt-4 font-semibold uppercase tracking-wider">
                    If you experience these, seek immediate medical attention.
                  </p>
                </section>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Visual Diagram */}
            <div className="bg-white rounded-3xl p-8 border border-[#E8ECF4] shadow-sm flex flex-col items-center text-center">
              <Badge variant="primary" className="mb-6">Affected Area</Badge>
              <div className="w-full flex justify-center mb-6">
                <BodyDiagram affectedArea={condition.affectedArea} className="w-48 max-w-full" />
              </div>
              <p className="text-sm text-[#8896A8] font-medium uppercase tracking-wider">
                {condition.affectedArea.replace('-', ' ')}
              </p>
            </div>

            {/* Related Specialists */}
            <div className="bg-[#0D1421] rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Specialists for {condition.name}</h3>
              <div className="space-y-4 mb-6">
                {relatedSpecialists.map(spec => (
                  <div key={spec.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10">
                    <img src={spec.image} alt={spec.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                    <div>
                      <p className="font-bold text-sm">{spec.name}</p>
                      <p className="text-xs text-white/60 line-clamp-1">{spec.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                href={`/book?condition=${condition.id}`}
                className="block w-full py-3 bg-[var(--color-primary)] hover:bg-primary-hover text-white text-center font-bold rounded-xl transition-colors shadow-lg"
              >
                Book with a Specialist
              </Link>
            </div>

            {/* Related Conditions */}
            {relatedConditions.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-[#E8ECF4] shadow-sm">
                <h3 className="text-lg font-bold text-[#0D1421] mb-4">Related Conditions</h3>
                <div className="space-y-3">
                  {relatedConditions.map(rc => (
                    <Link 
                      key={rc.id} 
                      href={`/conditions/${group.id}/${rc.slug}`}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-[#FAFBFF] transition-colors border border-transparent hover:border-[#E8ECF4]"
                    >
                      <span className="text-sm font-semibold text-[#4A5568] group-hover:text-[var(--color-primary)] transition-colors">
                        {rc.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#8896A8] group-hover:text-[var(--color-primary)]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[#E8ECF4] text-center">
          <p className="text-sm text-[#8896A8] max-w-3xl mx-auto italic">
            Disclaimer: The information on this page is for general educational purposes and does not constitute a medical diagnosis. 
            Please consult a qualified physiotherapist or medical professional for a proper assessment of your specific condition.
          </p>
        </div>

      </div>
    </main>
  );
}
