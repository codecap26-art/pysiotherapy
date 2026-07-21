import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AGE_GROUPS, CONDITIONS, AgeGroupSlug } from '@/lib/conditionData';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight } from 'lucide-react';
import { BodyDiagram } from '@/components/ui/BodyDiagram';

export default function AgeGroupPage({ params }: { params: { 'age-group': string } }) {
  const ageGroupSlug = params['age-group'] as AgeGroupSlug;
  const group = AGE_GROUPS.find(g => g.id === ageGroupSlug);
  
  if (!group) {
    notFound();
  }

  const groupConditions = CONDITIONS.filter(c => c.ageGroups.includes(ageGroupSlug));

  return (
    <main className="min-h-screen bg-[#FAFBFF] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16">
          <Link href="/conditions" className="text-sm font-semibold text-[#8896A8] hover:text-[var(--color-primary)] transition-colors mb-6 inline-block">
            ← Back to All Conditions
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
              {/* Note: Icon rendering dynamically requires a mapping or using the string, simplified for now */}
              <span className="text-2xl font-bold">{group.title.charAt(0)}</span>
            </div>
            <div>
              <Badge variant="primary" className="mb-2">{group.ageRange}</Badge>
              <h1 className="text-3xl md:text-5xl font-black text-[#0D1421] tracking-tight mb-4">
                {group.title}
              </h1>
              <p className="text-[#4A5568] text-lg max-w-3xl leading-relaxed">
                {group.description}
              </p>
            </div>
          </div>
        </div>

        {/* Conditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupConditions.map(condition => (
            <Link 
              key={condition.id} 
              href={`/conditions/${group.id}/${condition.slug}`}
              className="group bg-white rounded-3xl p-6 border border-[#E8ECF4] shadow-sm hover:shadow-xl hover:border-[var(--color-primary)]/30 transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#FAFBFF] rounded-xl p-3 border border-[#E8ECF4]">
                  <BodyDiagram affectedArea={condition.affectedArea} className="w-12 h-12" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FAFBFF] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors text-[#8896A8]">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0D1421] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {condition.name}
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed flex-grow">
                {condition.shortDesc}
              </p>
            </Link>
          ))}
        </div>

        {groupConditions.length === 0 && (
          <div className="text-center py-20 text-[#8896A8]">
            No specific conditions listed for this age group yet.
          </div>
        )}

      </div>
    </main>
  );
}
