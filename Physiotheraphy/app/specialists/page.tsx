import type { Metadata } from 'next';
import Image from 'next/image';
import { Star, ChevronRight, MessageSquare, ArrowRight, Filter } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '@/lib/animations';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'Clinical Specialists' };

const SPECIALISTS = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins, DPT',
    role: 'Lead Orthopedic Specialist',
    roleVariant: 'primary' as const,
    rating: 4.9,
    description: 'Specializing in post-operative knee and hip recovery, helping patients regain full mobility and strength safely.',
    tags: ['Orthopedic', 'Post-Op'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    reviews: 86,
  },
  {
    id: 2,
    name: 'Marcus Thorne, PT',
    role: 'Neurological Specialist',
    roleVariant: 'warning' as const,
    rating: 4.8,
    description: 'Expertise in spinal cord injury recovery and gait retraining, utilizing advanced neuro-rehab techniques.',
    tags: ['Neurological'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    reviews: 71,
  },
  {
    id: 3,
    name: 'Dr. Elena Rodriguez',
    role: 'Sports Performance Lab',
    roleVariant: 'accent' as const,
    rating: 5.0,
    description: 'Combining biomechanical analysis with elite sports conditioning to keep athletes at their peak performance.',
    tags: ['Sports Injury', 'Performance'],
    image: 'https://images.unsplash.com/photo-1594824432258-c0b5de3c7e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    reviews: 128,
  },
  {
    id: 4,
    name: 'David Chen, MScPT',
    role: 'Chronic Pain Specialist',
    roleVariant: 'danger' as const,
    rating: 4.7,
    description: 'Holistic approach to managing long-term musculoskeletal conditions and reducing reliance on pain medication.',
    tags: ['Chronic Pain', 'Manual Therapy'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    reviews: 59,
  },
];

const SPECIALTY_FILTERS = ['Orthopedic', 'Neurological', 'Sports Injury', 'Post-Op', 'Pediatric'];
const EXPERIENCE_FILTERS = ['0-5 Years', '5-10 Years', '10+ Years'];
const AVAILABILITY_FILTERS = ['Today', 'This Week', 'Virtual Only'];

function FilterGroup({ title, items, active }: { title: string; items: string[]; active?: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-[#8896A8] mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
              item === active
                ? 'bg-[#1E6FFF] text-white border-[#1E6FFF] shadow-[0_2px_8px_rgba(30,111,255,0.3)]'
                : 'bg-white border-[#E8ECF4] text-[#4A5568] hover:border-[#1E6FFF]/40 hover:text-[#1E6FFF]'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SpecialistsPage() {
  return (
    <div className="bg-[#FAFBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-4">
            {/* Filter Card */}
            <div className="bg-white rounded-2xl border border-[#E8ECF4] p-6 shadow-[var(--shadow-sm)]">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-4 h-4 text-[#1E6FFF]" />
                <span className="font-bold text-sm text-[#0D1421]">Filter Specialists</span>
              </div>
              <FilterGroup title="Specialty" items={SPECIALTY_FILTERS} active="Orthopedic" />
              <FilterGroup title="Experience" items={EXPERIENCE_FILTERS} active="5-10 Years" />
              <FilterGroup title="Availability" items={AVAILABILITY_FILTERS} active="Today" />
            </div>

            {/* AI Matchmaker */}
            <div className="bg-[#0D1421] rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#1E6FFF]/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-lg font-bold mb-2 relative z-10">Unsure who fits your goals?</h3>
              <p className="text-[#8896A8] text-sm mb-5 leading-relaxed relative z-10">
                Let our AI matchmaker find the perfect specialist for your recovery path.
              </p>

              <div className="space-y-2.5 mb-5 relative z-10">
                <div className="bg-white/10 rounded-xl p-3 text-xs leading-relaxed backdrop-blur-sm border border-white/10">
                  {"\"I have lower back pain after running. Who should I see?\""}
                </div>
                <div className="bg-[#10B981]/20 border border-[#10B981]/30 rounded-xl p-3 text-xs leading-relaxed text-[#6EE7B7] ml-4">
                  {"\"I recommend Dr. Aria or Sarah — both specialize in sports-related spinal recovery.\""}
                </div>
              </div>

              <Button variant="secondary" size="sm" className="w-full !bg-white !text-[#1E6FFF] relative z-10" leftIcon={<MessageSquare className="w-4 h-4" />}>
                Start Matching
              </Button>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">
            {/* Header row */}
            <FadeUp>
              <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#0D1421] mb-2 tracking-tight">
                    Clinical Specialists
                  </h1>
                  <p className="text-[#4A5568]">Our multidisciplinary team of licensed therapists.</p>
                </div>
                <div className="flex items-center gap-3 bg-white border border-[#E8ECF4] rounded-xl px-4 py-2.5 text-sm shadow-[var(--shadow-sm)] shrink-0">
                  <span className="font-bold text-[#1E6FFF]">12</span>
                  <span className="text-[#4A5568] border-r border-[#E8ECF4] pr-3">Specialists</span>
                  <button className="flex items-center gap-1.5 text-[#4A5568] hover:text-[#0D1421] transition-colors pl-1">
                    <Filter className="w-4 h-4" />
                    Sort by Rating
                  </button>
                </div>
              </div>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {SPECIALISTS.map((s) => (
                <StaggerItem key={s.id}>
                  <div className="bg-white rounded-2xl border border-[#E8ECF4] p-5 flex gap-5 group hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300">
                    {/* Photo */}
                    <div className="w-28 h-32 sm:w-32 sm:h-40 rounded-xl overflow-hidden relative shrink-0">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="128px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h2 className="text-base font-bold text-[#0D1421] leading-tight">{s.name}</h2>
                        <div className="flex items-center gap-1 text-[#10B981] font-bold text-sm shrink-0">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {s.rating}
                        </div>
                      </div>

                      <Badge variant={s.roleVariant} className="mb-3 w-fit">{s.role}</Badge>

                      <p className="text-[#4A5568] text-xs leading-relaxed flex-1 mb-4 line-clamp-3">
                        {s.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-[#8896A8]">
                          <span className="font-semibold text-[#4A5568]">{s.reviews}</span> reviews
                        </div>
                        <button className="flex items-center gap-1 text-[#1E6FFF] font-semibold text-xs group/btn hover:gap-2 transition-all">
                          View Profile
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Pagination */}
            <FadeUp delay={0.2}>
              <div className="mt-10 flex justify-center items-center gap-2">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold border transition-all ${
                      p === 1
                        ? 'bg-[#1E6FFF] text-white border-[#1E6FFF] shadow-[0_4px_12px_rgba(30,111,255,0.3)]'
                        : 'bg-white text-[#4A5568] border-[#E8ECF4] hover:border-[#1E6FFF]/40 hover:text-[#1E6FFF]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-[#E8ECF4] py-20 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div>
              <h2 className="text-4xl font-bold text-[#0D1421] mb-5 tracking-tight">Ready to start your journey?</h2>
              <p className="text-[#4A5568] text-lg mb-8 leading-relaxed">
                Book an initial assessment today and we&apos;ll pair you with the best-fit specialist for your specific injury and recovery goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/book" className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[#1E6FFF] hover:bg-[#1558D6] text-white rounded-xl font-semibold text-base transition-colors shadow-[0_4px_16px_rgba(30,111,255,0.3)]">Book Online <ArrowRight className="ml-1 w-5 h-5" /></a>
                <a href="tel:+15550123" className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white border border-[#E8ECF4] hover:bg-[#F8FAFC] text-[#0D1421] rounded-xl font-semibold text-base transition-colors">Call Clinic</a>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="bg-[#F8FAFC] rounded-3xl border border-[#E8ECF4] p-8 shadow-[var(--shadow-md)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] flex items-center justify-center text-[#10B981]">
                  <ArrowRight className="w-5 h-5 -rotate-45" />
                </div>
                <h3 className="text-xl font-bold text-[#0D1421]">Recovery Momentum</h3>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-[#0D1421]">Healing Path Completion</span>
                <span className="font-bold text-[#10B981]">82% Avg. Success</span>
              </div>
              <div className="h-2 bg-[#E8ECF4] rounded-full overflow-hidden mb-8">
                <div className="h-full w-[82%] shimmer-bar rounded-full" />
              </div>

              <blockquote className="text-[#4A5568] text-sm leading-relaxed border-l-2 border-[#10B981] pl-4">
                {"\"The therapists at Healing Motion didn't just fix my back, they gave me the tools to stay active for years.\""}
                <footer className="mt-2 font-semibold text-[#0D1421]">— James W.</footer>
              </blockquote>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
