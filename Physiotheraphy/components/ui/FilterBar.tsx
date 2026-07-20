'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Search, X, ChevronDown, ChevronLeft, ChevronRight,
  SlidersHorizontal, Star, Clock, ArrowUpDown, Activity,
  Brain, Dumbbell, Baby, Heart, Users, Stethoscope, Bone,
  Layers3, Check
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface FilterChip {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface DropdownOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  activeSpecialty: string;
  onSpecialtyChange: (v: string) => void;
  activeExperience: string;
  onExperienceChange: (v: string) => void;
  sortOption: string;
  onSortChange: (v: string) => void;
  resultCount: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SPECIALTIES: FilterChip[] = [
  { id: 'All',               label: 'All Specialists',  icon: <Layers3 className="w-3.5 h-3.5" /> },
  { id: 'Orthopedic',        label: 'Orthopedic',       icon: <Bone className="w-3.5 h-3.5" /> },
  { id: 'Neurological',      label: 'Neurological',     icon: <Brain className="w-3.5 h-3.5" /> },
  { id: 'Sports',            label: 'Sports',           icon: <Dumbbell className="w-3.5 h-3.5" /> },
  { id: 'Pediatric',         label: 'Pediatric',        icon: <Baby className="w-3.5 h-3.5" /> },
  { id: 'Cardiopulmonary',   label: 'Cardiopulmonary',  icon: <Heart className="w-3.5 h-3.5" /> },
  { id: 'Women\'s Health',   label: "Women's Health",   icon: <Users className="w-3.5 h-3.5" /> },
  { id: 'Geriatric',         label: 'Geriatric',        icon: <Stethoscope className="w-3.5 h-3.5" /> },
  { id: 'Chronic Pain',      label: 'Pain Management',  icon: <Activity className="w-3.5 h-3.5" /> },
];

const EXPERIENCE_OPTIONS: DropdownOption[] = [
  { value: 'All',       label: 'All Experience' },
  { value: '0-5 Years', label: '0–5 Years' },
  { value: '5-10 Years',label: '5–10 Years' },
  { value: '10+ Years', label: '10+ Years' },
];

const SORT_OPTIONS: DropdownOption[] = [
  { value: 'Highest Rated',  label: 'Highest Rated' },
  { value: 'Most Experience',label: 'Most Experience' },
  { value: 'Alphabetical',   label: 'A → Z' },
];

// ─── Dropdown component ───────────────────────────────────────────────────────

function PremiumDropdown({
  value,
  options,
  onChange,
  icon,
  placeholder,
}: {
  value: string;
  options: DropdownOption[];
  onChange: (v: string) => void;
  icon: React.ReactNode;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(p => !p)}
        className={`
          group h-10 px-4 inline-flex items-center gap-2 rounded-full border text-sm font-semibold
          whitespace-nowrap transition-all duration-200
          ${open
            ? 'bg-[#1E6FFF] text-white border-[#1E6FFF] shadow-[0_4px_16px_rgba(30,111,255,0.25)]'
            : 'bg-white text-[#4A5568] border-[#E8ECF4] hover:border-[#1E6FFF]/50 hover:text-[#1E6FFF] hover:bg-[#F0F5FF]'
          }
        `}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`${open ? 'text-white/80' : 'text-[#8896A8] group-hover:text-[#1E6FFF]'} transition-colors`}>
          {icon}
        </span>
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180 opacity-80' : 'opacity-60'}`} />
      </button>

      {/* Dropdown panel */}
      <div className={`
        absolute top-[calc(100%+8px)] right-0 z-50 min-w-[170px] bg-white rounded-2xl border border-[#E8ECF4]
        shadow-[0_20px_60px_-10px_rgba(0,0,0,0.12),0_4px_12px_-4px_rgba(0,0,0,0.06)]
        overflow-hidden transition-all duration-200 origin-top
        ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
      `}>
        <div className="p-1.5">
          {options.map(opt => (
            <button
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`
                w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-150
                ${value === opt.value
                  ? 'bg-[#1E6FFF]/8 text-[#1E6FFF] font-semibold'
                  : 'text-[#4A5568] hover:bg-[#F8FAFC] hover:text-[#0D1421]'
                }
              `}
            >
              {opt.label}
              {value === opt.value && <Check className="w-3.5 h-3.5 text-[#1E6FFF] shrink-0" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main FilterBar ───────────────────────────────────────────────────────────

export function FilterBar({
  searchQuery, onSearchChange,
  activeSpecialty, onSpecialtyChange,
  activeExperience, onExperienceChange,
  sortOption, onSortChange,
  resultCount,
}: FilterBarProps) {
  const chipsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Track active filters count badge
  useEffect(() => {
    let count = 0;
    if (activeSpecialty !== 'All') count++;
    if (activeExperience !== 'All') count++;
    if (sortOption !== 'Highest Rated') count++;
    if (searchQuery) count++;
    setActiveFiltersCount(count);
  }, [activeSpecialty, activeExperience, sortOption, searchQuery]);

  // Scroll shadow tracking for chip carousel
  const updateScrollState = useCallback(() => {
    const el = chipsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = chipsRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', updateScrollState); ro.disconnect(); };
  }, [updateScrollState]);

  const scrollChips = (dir: 'left' | 'right') => {
    chipsRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  const clearAll = () => {
    onSearchChange('');
    onSpecialtyChange('All');
    onExperienceChange('All');
    onSortChange('Highest Rated');
    searchRef.current?.focus();
  };

  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <div className="sticky top-0 z-40">
      {/* ─── Main Bar ─────────────────────────────────────────────────────── */}
      <div className="bg-white/90 backdrop-blur-2xl border-b border-[#E8ECF4] shadow-[0_1px_0_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Desktop Row ── */}
          <div className="hidden md:flex items-center gap-3 h-[68px]">

            {/* Search */}
            <div className="relative w-64 lg:w-72 xl:w-80 shrink-0 group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8] group-focus-within:text-[#1E6FFF] transition-colors pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Search doctors, conditions…"
                className="filter-search-input w-full h-10 bg-[#F8FAFC] border border-[#E8ECF4] rounded-full pl-9 pr-9 text-sm font-medium text-[#0D1421] placeholder:text-[#B0BAC9] transition-all duration-200 focus:outline-none focus:bg-white focus:border-[#1E6FFF] focus:shadow-[0_0_0_3px_rgba(30,111,255,0.12),0_2px_8px_rgba(30,111,255,0.08)]"
              />
              {searchQuery && (
                <button
                  onClick={() => { onSearchChange(''); searchRef.current?.focus(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-[#E8ECF4] text-[#8896A8] hover:bg-[#1E6FFF] hover:text-white transition-all duration-150"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-[#E8ECF4] shrink-0" />

            {/* Chip Carousel with scroll shadows */}
            <div className="relative flex-1 min-w-0 flex items-center">
              {/* Left shadow + arrow */}
              <div className={`absolute left-0 top-0 bottom-0 z-10 flex items-center transition-opacity duration-200 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <button onClick={() => scrollChips('left')} className="relative z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#E8ECF4] shadow-sm text-[#4A5568] hover:border-[#1E6FFF] hover:text-[#1E6FFF] transition-all ml-1">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Chips scroll container */}
              <div
                ref={chipsRef}
                className="flex items-center gap-2 overflow-x-auto chips-no-scrollbar scroll-smooth px-1 py-1"
              >
                {SPECIALTIES.map(chip => {
                  const isActive = activeSpecialty === chip.id;
                  return (
                    <button
                      key={chip.id}
                      onClick={() => onSpecialtyChange(chip.id)}
                      className={`
                        filter-chip relative shrink-0 inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-sm font-semibold
                        border transition-all duration-200 overflow-hidden
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FFF]/40
                        ${isActive
                          ? 'bg-gradient-to-r from-[#1E6FFF] to-[#06B6D4] text-white border-transparent shadow-[0_4px_12px_rgba(30,111,255,0.3)]'
                          : 'bg-white text-[#4A5568] border-[#E8ECF4] hover:border-[#1E6FFF]/40 hover:text-[#1E6FFF] hover:bg-[#F0F5FF]'
                        }
                      `}
                      aria-pressed={isActive}
                    >
                      {/* Ripple element */}
                      <span className="chip-ripple absolute inset-0 pointer-events-none" />
                      <span className={isActive ? 'text-white/80' : 'text-[#8896A8]'}>{chip.icon}</span>
                      <span className="whitespace-nowrap">{chip.label}</span>
                      {isActive && (
                        <span className="w-4 h-4 inline-flex items-center justify-center bg-white/20 rounded-full ml-0.5">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right shadow + arrow */}
              <div className={`absolute right-0 top-0 bottom-0 z-10 flex items-center transition-opacity duration-200 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                <button onClick={() => scrollChips('right')} className="relative z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#E8ECF4] shadow-sm text-[#4A5568] hover:border-[#1E6FFF] hover:text-[#1E6FFF] transition-all mr-1">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-[#E8ECF4] shrink-0" />

            {/* Dropdowns */}
            <div className="flex items-center gap-2 shrink-0">
              <PremiumDropdown
                value={activeExperience}
                options={EXPERIENCE_OPTIONS}
                onChange={onExperienceChange}
                icon={<Clock className="w-3.5 h-3.5" />}
                placeholder="Experience"
              />
              <PremiumDropdown
                value={sortOption}
                options={SORT_OPTIONS}
                onChange={onSortChange}
                icon={<ArrowUpDown className="w-3.5 h-3.5" />}
                placeholder="Sort by"
              />
            </div>

            {/* Clear all – only when filters active */}
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="shrink-0 h-9 px-3 inline-flex items-center gap-1.5 rounded-full text-xs font-semibold text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] transition-all duration-200"
              >
                <X className="w-3 h-3" /> Clear ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* ── Mobile Row ── */}
          <div className="flex md:hidden items-center gap-2 h-[60px]">
            {/* Search – full width */}
            <div className="relative flex-1 group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A8] group-focus-within:text-[#1E6FFF] transition-colors pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Search doctors…"
                className="w-full h-10 bg-[#F8FAFC] border border-[#E8ECF4] rounded-full pl-9 pr-8 text-sm font-medium text-[#0D1421] placeholder:text-[#B0BAC9] transition-all focus:outline-none focus:bg-white focus:border-[#1E6FFF] focus:shadow-[0_0_0_3px_rgba(30,111,255,0.12)]"
              />
              {searchQuery && (
                <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-[#E8ECF4] text-[#8896A8] hover:bg-[#1E6FFF] hover:text-white transition-all">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Filters toggle button */}
            <button
              onClick={() => setIsMobileFiltersOpen(p => !p)}
              className={`
                shrink-0 h-10 w-10 flex items-center justify-center rounded-full border transition-all duration-200 relative
                ${isMobileFiltersOpen
                  ? 'bg-[#1E6FFF] text-white border-[#1E6FFF] shadow-[0_4px_12px_rgba(30,111,255,0.3)]'
                  : 'bg-white text-[#4A5568] border-[#E8ECF4] hover:border-[#1E6FFF]/50 hover:text-[#1E6FFF]'
                }
              `}
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1E6FFF] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Filters Drawer ── */}
      <div className={`
        md:hidden bg-white border-b border-[#E8ECF4] shadow-md overflow-hidden transition-all duration-300 ease-in-out
        ${isMobileFiltersOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="max-w-7xl mx-auto px-4 pb-5 pt-4 space-y-4">
          {/* Category chips – wrapping grid on mobile */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#8896A8] mb-2.5">Specialty</p>
            <div className="flex flex-wrap gap-2">
              {SPECIALTIES.map(chip => {
                const isActive = activeSpecialty === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => onSpecialtyChange(chip.id)}
                    className={`
                      inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-sm font-semibold border transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-[#1E6FFF] to-[#06B6D4] text-white border-transparent shadow-[0_3px_10px_rgba(30,111,255,0.25)]'
                        : 'bg-white text-[#4A5568] border-[#E8ECF4] hover:border-[#1E6FFF]/40 hover:text-[#1E6FFF]'
                      }
                    `}
                  >
                    <span className={isActive ? 'text-white/80' : 'text-[#8896A8]'}>{chip.icon}</span>
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience + Sort – side by side */}
          <div className="flex gap-3">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#8896A8] mb-2">Experience</p>
              <select
                value={activeExperience}
                onChange={e => onExperienceChange(e.target.value)}
                className="w-full h-10 bg-[#F8FAFC] border border-[#E8ECF4] rounded-xl px-3 text-sm font-medium focus:outline-none focus:border-[#1E6FFF] focus:ring-2 focus:ring-[#1E6FFF]/20 transition-all"
              >
                {EXPERIENCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#8896A8] mb-2">Sort By</p>
              <select
                value={sortOption}
                onChange={e => onSortChange(e.target.value)}
                className="w-full h-10 bg-[#F8FAFC] border border-[#E8ECF4] rounded-xl px-3 text-sm font-medium focus:outline-none focus:border-[#1E6FFF] focus:ring-2 focus:ring-[#1E6FFF]/20 transition-all"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Clear / Apply */}
          <div className="flex gap-2">
            {hasActiveFilters && (
              <button onClick={clearAll} className="flex-1 h-9 rounded-xl border border-[#E8ECF4] text-sm font-semibold text-[#DC2626] bg-[#FEF2F2] hover:bg-[#DC2626] hover:text-white transition-all duration-200">
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="flex-1 h-9 rounded-xl bg-[#1E6FFF] text-white text-sm font-semibold hover:bg-[#1558D6] transition-all duration-200"
            >
              Show {resultCount} Results
            </button>
          </div>
        </div>
      </div>

      {/* ── Results row ── */}
      <div className="bg-[#FAFBFF] border-b border-[#E8ECF4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
          <p className="text-xs font-semibold text-[#8896A8]">
            <span className="text-[#1E6FFF] font-bold text-sm">{resultCount}</span>
            {' '}specialist{resultCount !== 1 ? 's' : ''} found
            {activeSpecialty !== 'All' && <span className="text-[#4A5568]"> in <span className="font-bold text-[#0D1421]">{activeSpecialty}</span></span>}
          </p>
          {hasActiveFilters && (
            <button onClick={clearAll} className="text-xs font-semibold text-[#8896A8] hover:text-[#1E6FFF] transition-colors flex items-center gap-1">
              <X className="w-3 h-3" /> Reset filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
