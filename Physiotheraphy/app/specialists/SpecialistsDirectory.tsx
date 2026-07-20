'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, ChevronRight, MessageSquare, ArrowRight,
  Search, Calendar, Heart, Award, GraduationCap,
  CheckCircle2, UserCircle2
} from 'lucide-react';
import { FadeUp } from '@/lib/animations';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SPECIALISTS, Specialist } from '@/lib/data/specialists';
import { SpecialistModal } from '@/components/ui/SpecialistModal';
import { FilterBar } from '@/components/ui/FilterBar';

// ─── Card animation variants ─────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,
             transition: { type: 'spring', stiffness: 260, damping: 26 } },
};

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl border border-[#E8ECF4] overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-[#F1F5F9]" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-[#F1F5F9] rounded-full w-3/4" />
        <div className="h-3 bg-[#F1F5F9] rounded-full w-1/2" />
        <div className="h-6 bg-[#F1F5F9] rounded-full w-1/3 mt-4" />
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="h-10 bg-[#F1F5F9] rounded-xl" />
          <div className="h-10 bg-[#F1F5F9] rounded-xl" />
        </div>
        <div className="h-3 bg-[#F1F5F9] rounded-full w-full mt-2" />
        <div className="h-3 bg-[#F1F5F9] rounded-full w-5/6" />
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="h-11 bg-[#F1F5F9] rounded-xl" />
          <div className="h-11 bg-[#F1F5F9] rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ─── Doctor Card ──────────────────────────────────────────────────────────────
const DoctorCard = React.memo(function DoctorCard({
  s,
  isFavorite,
  onToggleFavorite,
  onViewProfile,
  index,
}: {
  s: Specialist;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: number) => void;
  onViewProfile: (s: Specialist) => void;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      key={s.id}
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: (index % 6) * 0.07 }}   /* stagger within each page */
      className="group bg-white rounded-3xl border border-[#E8ECF4] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-[transform,box-shadow] duration-500 cursor-pointer flex flex-col h-full relative"
      onClick={() => onViewProfile(s)}
    >
      {/* Gradient top accent on hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1E6FFF] via-[#06B6D4] to-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Favorite Button */}
      <button
        onClick={(e) => onToggleFavorite(e, s.id)}
        aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
        className={`absolute top-4 right-4 p-2.5 rounded-full z-20 transition-all duration-300 shadow-sm backdrop-blur-md border ${
          isFavorite
            ? 'bg-red-500 border-red-500 text-white'
            : 'bg-white/80 border-white/60 text-[#8896A8] hover:text-red-500 hover:bg-white'
        }`}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      {/* Telehealth Badge */}
      {s.onlineConsultationAvailable && (
        <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md rounded-full py-1.5 px-3 flex items-center gap-2 border border-white/20 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Telehealth</span>
        </div>
      )}

      {/* Photo */}
      <div className="w-full h-64 relative overflow-hidden bg-[#F8FAFC] shrink-0">
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EFF5FF] to-[#F0FDFF]">
            <UserCircle2 className="w-20 h-20 text-[#1E6FFF]/30" />
            <p className="text-xs text-[#8896A8] mt-2 font-medium">{s.name}</p>
          </div>
        ) : (
          <Image
            src={s.image}
            alt={`Portrait of ${s.name}`}
            fill
            className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2 gap-2">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-[#0D1421] leading-tight group-hover:text-[#1E6FFF] transition-colors truncate">{s.name}</h2>
            <p className="text-[#8896A8] font-medium text-xs mt-0.5 truncate">{s.qualifications[0]}</p>
          </div>
          <div className="flex items-center gap-1 bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#E8ECF4] shrink-0">
            <Star className="w-3.5 h-3.5 text-[#10B981] fill-current" />
            <span className="text-[#0D1421] font-bold text-sm">{s.rating}</span>
          </div>
        </div>

        <Badge variant={s.roleVariant} className="mb-4 w-fit px-3 py-1 text-xs">{s.designation}</Badge>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-[#E8ECF4]/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1E6FFF]/10 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-[#1E6FFF]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0D1421]">{s.yearsExperience} Yrs</p>
              <p className="text-[10px] text-[#8896A8]">Experience</p>
            </div>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4 text-[#10B981]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#0D1421] truncate">{s.degrees[0].split('from')[0].trim()}</p>
              <p className="text-[10px] text-[#8896A8]">Degree</p>
            </div>
          </div>
        </div>

        <p className="text-[#4A5568] text-xs leading-relaxed flex-1 mb-5 line-clamp-3">{s.biography}</p>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 mt-auto">
          <a
            href={`/book?doctorId=${s.id}&doctorName=${encodeURIComponent(s.name)}&doctorDesignation=${encodeURIComponent(s.designation)}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 bg-gradient-to-r from-[#1E6FFF] to-[#06B6D4] hover:from-[#1558D6] hover:to-[#0891B2] text-white rounded-xl font-bold text-xs transition-all shadow-[0_4px_12px_rgba(30,111,255,0.25)] hover:shadow-[0_6px_16px_rgba(30,111,255,0.4)] overflow-hidden relative group/btn"
          >
            <span className="relative z-10 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Book Now</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          </a>
          <button
            onClick={(e) => { e.stopPropagation(); onViewProfile(s); }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 bg-white border border-[#E8ECF4] hover:border-[#1E6FFF]/50 hover:bg-[#F0F5FF] text-[#0D1421] hover:text-[#1E6FFF] rounded-xl font-bold text-xs transition-all"
          >
            View Profile <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

// ─── Main Directory ───────────────────────────────────────────────────────────
export function SpecialistsDirectory() {
  const [activeSpecialty, setActiveSpecialty] = useState('All');
  const [activeExperience, setActiveExperience] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Highest Rated');
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Responsive cards-per-page
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768)       setCardsPerPage(2);
      else if (window.innerWidth < 1024) setCardsPerPage(4);
      else                               setCardsPerPage(6);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFavorite = useCallback((e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }, []);

  const filteredAndSortedSpecialists = useMemo(() => {
    let result = [...SPECIALISTS];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.designation.toLowerCase().includes(q) ||
        s.clinicalSpecializations.some(spec => spec.toLowerCase().includes(q))
      );
    }

    if (activeSpecialty !== 'All') {
      result = result.filter(s => {
        const d = s.designation.toLowerCase();
        const spec = activeSpecialty.toLowerCase();
        if (spec === 'sports'         && d.includes('sports'))       return true;
        if (spec === 'orthopedic'     && d.includes('orthopedic'))   return true;
        if (spec === 'neurological'   && d.includes('neurological')) return true;
        if (spec === 'pediatric'      && d.includes('pediatric'))    return true;
        if (spec === 'cardiopulmonary'&& d.includes('cardiopulmonary')) return true;
        if (spec === "women's health" && d.includes("women's health")) return true;
        if (spec === 'geriatric'      && d.includes('geriatric'))    return true;
        if (spec === 'chronic pain'   && d.includes('chronic pain')) return true;
        return s.clinicalSpecializations.some(c => c.toLowerCase().includes(spec));
      });
    }

    if (activeExperience !== 'All') {
      if      (activeExperience === '0-5 Years')  result = result.filter(s => s.yearsExperience <= 5);
      else if (activeExperience === '5-10 Years') result = result.filter(s => s.yearsExperience > 5 && s.yearsExperience <= 10);
      else if (activeExperience === '10+ Years')  result = result.filter(s => s.yearsExperience > 10);
    }

    if      (sortOption === 'Highest Rated')   result.sort((a, b) => b.rating - a.rating);
    else if (sortOption === 'Most Experience') result.sort((a, b) => b.yearsExperience - a.yearsExperience);
    else if (sortOption === 'Alphabetical')    result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [searchQuery, activeSpecialty, activeExperience, sortOption]);

  // Derived state — safe slice, always bounded
  const visibleSpecialists = filteredAndSortedSpecialists.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedSpecialists.length;
  const allLoaded = !hasMore && filteredAndSortedSpecialists.length > 0;

  // ── Load More with skeleton delay ──────────────────────────────────────────
  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    // Brief synthetic delay so skeletons are visible
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + cardsPerPage, filteredAndSortedSpecialists.length));
      setIsLoadingMore(false);
    }, 600);
  }, [cardsPerPage, filteredAndSortedSpecialists.length]);

  // Reset when filters change — also cancel any pending load
  React.useEffect(() => {
    setIsLoadingMore(false);
    setVisibleCount(cardsPerPage);
  }, [searchQuery, activeSpecialty, activeExperience, sortOption, cardsPerPage]);

  return (
    <>
      <div className="bg-[#FAFBFF] min-h-screen">

        {/* Hero */}
        <div className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D1421] mb-6 tracking-tight">
                Our Elite Specialists
              </h1>
              <p className="text-[#4A5568] text-lg md:text-xl">
                Discover world-class physiotherapists dedicated to your recovery journey.
                Filter by specialty, experience, and book a consultation instantly.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeSpecialty={activeSpecialty}
          onSpecialtyChange={setActiveSpecialty}
          activeExperience={activeExperience}
          onExperienceChange={setActiveExperience}
          sortOption={sortOption}
          onSortChange={setSortOption}
          resultCount={filteredAndSortedSpecialists.length}
        />

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-8">

          {/* ── Empty state ── */}
          {filteredAndSortedSpecialists.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#E8ECF4] p-16 text-center max-w-2xl mx-auto shadow-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-[#1E6FFF]/10 to-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-[#1E6FFF]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0D1421] mb-3">No specialists match your criteria</h3>
              <p className="text-[#4A5568] text-lg mb-8">Try adjusting your filters or searching for a different condition.</p>
              <Button
                onClick={() => { setSearchQuery(''); setActiveSpecialty('All'); setActiveExperience('All'); }}
                className="bg-[#1E6FFF] hover:bg-[#1558D6] text-white px-8"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-10">

              {/*
                ── FIX: Replace StaggerContainer (viewport once:true) with
                   AnimatePresence + per-card motion.div.
                   Each card has its own `initial/animate` lifecycle,
                   so newly added cards ALWAYS animate in regardless of scroll
                   position or how many times "Load More" is clicked.
              */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {visibleSpecialists.map((s, index) => (
                    <DoctorCard
                      key={`specialist-${s.id}`}
                      s={s}
                      isFavorite={favorites.includes(s.id)}
                      onToggleFavorite={toggleFavorite}
                      onViewProfile={setSelectedSpecialist}
                      index={index}
                    />
                  ))}
                </AnimatePresence>

                {/* ── Skeleton cards during load ── */}
                {isLoadingMore && Array.from({ length: Math.min(cardsPerPage, filteredAndSortedSpecialists.length - visibleCount) }).map((_, i) => (
                  <SkeletonCard key={`skeleton-${i}`} />
                ))}
              </div>

              {/* ── Load More / All Loaded ── */}
              <div className="flex flex-col items-center gap-4 pt-4">
                <AnimatePresence mode="wait">
                  {hasMore && !isLoadingMore && (
                    <motion.button
                      key="load-more"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onClick={handleLoadMore}
                      className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white border border-[#E8ECF4] hover:border-[#1E6FFF] hover:bg-[#F0F5FF] text-[#0D1421] hover:text-[#1E6FFF] font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                      Load More Specialists
                      <ArrowRight className="w-4 h-4 rotate-90 text-[#8896A8] group-hover:text-[#1E6FFF] group-hover:translate-y-0.5 transition-all" />
                    </motion.button>
                  )}

                  {isLoadingMore && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 text-sm font-medium text-[#8896A8]"
                    >
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <div key={i} className="w-2 h-2 rounded-full bg-[#1E6FFF]" style={{ animation: `bounce 0.8s ${i * 0.15}s infinite alternate` }} />
                        ))}
                      </div>
                      Loading more specialists…
                    </motion.div>
                  )}

                  {allLoaded && (
                    <motion.div
                      key="all-loaded"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center gap-3 text-center"
                    >
                      <div className="flex items-center gap-2 px-6 py-3 bg-[#DCFCE7] border border-[#BBF7D0] rounded-full text-[#15803D] font-semibold text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        You've reached the end of our specialist directory
                      </div>
                      <p className="text-xs text-[#8896A8]">
                        Showing all {filteredAndSortedSpecialists.length} specialists
                        {activeSpecialty !== 'All' ? ` in ${activeSpecialty}` : ''}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* AI Matchmaker CTA */}
        <section className="border-t border-[#E8ECF4] bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#1E6FFF]/5 to-[#10B981]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E6FFF]/10 text-[#1E6FFF] font-bold text-sm mb-6">
                  <MessageSquare className="w-4 h-4" /> AI Matchmaker
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0D1421] mb-5 tracking-tight">Unsure who fits your specific needs?</h2>
                <p className="text-[#4A5568] text-lg mb-8 leading-relaxed">Describe your injury, symptoms, or goals, and our intelligent matching system will instantly recommend the ideal specialist.</p>
                <div className="space-y-4 mb-8">
                  <div className="bg-[#F8FAFC] border border-[#E8ECF4] rounded-2xl p-4 shadow-sm w-11/12">
                    <p className="text-sm text-[#4A5568]">"I have lower back pain after running and it shoots down my leg. Who should I see?"</p>
                  </div>
                  <div className="bg-[#DCFCE7] border border-[#BBF7D0] rounded-2xl p-4 shadow-sm w-11/12 ml-auto">
                    <p className="text-sm text-[#15803D] font-medium">"I highly recommend Dr. Sarah Jenkins or Julian Foster for lumbar disc issues and running mechanics."</p>
                  </div>
                </div>
                <Button className="bg-[#0D1421] hover:bg-[#1A2536] text-white px-8 h-12 rounded-xl text-base shadow-lg">
                  Start AI Matching Now
                </Button>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="bg-[#FAFBFF] border border-[#E8ECF4] rounded-3xl p-8 lg:p-12 shadow-md text-center">
                <h3 className="text-2xl font-bold text-[#0D1421] mb-4">Ready to start your journey?</h3>
                <p className="text-[#4A5568] mb-8">Book an initial assessment today and take the first step toward a pain-free life.</p>
                <a href="/book" className="inline-flex items-center justify-center gap-2 h-14 w-full bg-gradient-to-r from-[#1E6FFF] to-[#06B6D4] hover:from-[#1558D6] hover:to-[#0891B2] text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Book Appointment <ArrowRight className="w-5 h-5" />
                </a>
                <p className="mt-4 text-sm text-[#8896A8]">Or call us at <a href="tel:+15550123" className="text-[#1E6FFF] font-bold">1-555-0123</a></p>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>

      <SpecialistModal
        isOpen={selectedSpecialist !== null}
        onClose={() => setSelectedSpecialist(null)}
        specialist={selectedSpecialist}
      />
    </>
  );
}
