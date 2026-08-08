"use client";

import React, { useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Calendar, Phone, Clock, Users, TrendingUp,
  Bone, Activity, Brain, Baby, HeartPulse, ShieldCheck,
  Star, ChevronDown, CheckCircle2, XCircle, Languages,
  Zap, Target, Smile, Award, ChevronRight, MapPin, Search,
  Filter, Sparkles, X, Info, ExternalLink
} from "lucide-react";
import { TREATMENTS, TreatmentData } from "@/lib/data/treatments";
import { SPECIALISTS } from "@/lib/data/specialists";
import { TreatmentModal } from "@/components/ui/TreatmentModal";
import { CATEGORIES, CategoryConfig } from "@/lib/data/categories";

/* ─── Animation Variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

/* ══════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#FAFBFF]">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #fafbff 50%, #f0fff8 100%)" }}
        />
        <div
          className="absolute top-[-120px] right-[-80px] w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute bottom-[-80px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #d1fae5 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div className="absolute inset-0 bg-grid opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-8 py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-screen lg:min-h-0 lg:py-32">
          {/* Left */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col gap-8">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EFF5FF] border border-[#DBEAFE] w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-[#1E6FFF] animate-pulse" />
              <span className="text-[#1E6FFF] text-sm font-semibold tracking-wide">Evidence-Based Care</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-[clamp(40px,5.5vw,64px)] font-black text-[#0D1421] leading-[1.05] tracking-tight"
            >
              Find the Right<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #1E6FFF, #10B981)" }}
              >
                Treatment
              </span>{" "}
              for Your<br />Recovery
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-[18px] text-[#4A5568] leading-relaxed max-w-[480px]">
              Every treatment plan at Healing Motion is evidence-based, personalized to your condition,
              and guided by board-certified physiotherapists dedicated to your complete recovery.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <a
                href="#treatments"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E6FFF] text-white font-bold rounded-2xl text-[16px] shadow-[0_8px_30px_rgba(30,111,255,0.35)] hover:bg-[#1558D6] hover:scale-[1.02] active:scale-100 transition-all duration-200"
              >
                <Filter className="w-5 h-5" />
                Explore Treatments
              </a>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0D1421] font-bold rounded-2xl text-[16px] border border-[#E8ECF4] shadow-sm hover:border-[#1E6FFF] hover:text-[#1E6FFF] hover:scale-[1.02] active:scale-100 transition-all duration-200"
              >
                <Calendar className="w-5 h-5" />
                Book Consultation
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E8ECF4]">
              {[
                { val: "10+", label: "Years of Excellence" },
                { val: "20+", label: "Specialists" },
                { val: "95%", label: "Success Rate" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black text-[#0D1421]">{s.val}</p>
                  <p className="text-[13px] text-[#8896A8] font-medium mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[520px] h-[560px] rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(30,111,255,0.12)] bg-gradient-to-br from-[#EFF5FF] to-[#F0FDF9]">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=900"
                alt="Physiotherapy session"
                fill
                className="object-cover object-center"
                sizes="520px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1421]/30 via-transparent to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute top-8 -left-6 bg-white rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.10)] border border-[#E8ECF4] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EFF5FF] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#1E6FFF]" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#0D1421]">Evidence-Based</p>
                <p className="text-[11px] text-[#8896A8]">All specialized treatments</p>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              className="absolute bottom-12 -right-6 bg-white rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.10)] border border-[#E8ECF4] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#0D1421]">95% Recovery Rate</p>
                <p className="text-[11px] text-[#8896A8]">Across all programs</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 2 — TREATMENT CATEGORIES (INTERACTIVE)
══════════════════════════════════════════ */
interface CategoriesSectionProps {
  selectedCategory: string;
  selectedTag: string | null;
  onSelectCategory: (categoryId: string, tag?: string) => void;
}

function CategoriesSection({
  selectedCategory,
  selectedTag,
  onSelectCategory,
}: CategoriesSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleCardClick = (catId: string) => {
    onSelectCategory(catId);
    const target = document.getElementById("treatments");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTagClick = (e: React.MouseEvent, catId: string, item: string) => {
    e.stopPropagation();
    onSelectCategory(catId, item);
    const target = document.getElementById("treatments");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-2xl mb-16"
        >
          <p className="text-[#1E6FFF] font-semibold text-sm tracking-wider uppercase mb-3">
            Specializations
          </p>
          <h2 className="text-[40px] font-black text-[#0D1421] leading-tight tracking-tight mb-4">
            Treatment Categories
          </h2>
          <p className="text-[18px] text-[#4A5568] leading-relaxed">
            Click any category or symptom below to instantly view all corresponding clinical treatment protocols.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <motion.div
                key={cat.id}
                onClick={() => handleCardClick(cat.id)}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={i}
                whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
                className={`group relative bg-white rounded-[24px] p-8 flex flex-col gap-5 cursor-pointer transition-all duration-300 shadow-[0_2px_14px_rgba(0,0,0,0.04)] ${
                  isSelected
                    ? "border-2 border-[#1E6FFF] ring-4 ring-[#1E6FFF]/10 shadow-[0_12px_32px_rgba(30,111,255,0.12)]"
                    : "border border-[#E8ECF4] hover:border-[#1E6FFF]/40"
                }`}
              >
                {/* Active Indicator Badge */}
                {isSelected && (
                  <div className="absolute -top-3 right-6 bg-[#1E6FFF] text-white text-[11px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Selected Category
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xs"
                    style={{ backgroundColor: cat.bg }}
                  >
                    {cat.emoji}
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? "bg-[#1E6FFF] border-[#1E6FFF] text-white"
                        : "border-[#E8ECF4] group-hover:bg-[#1E6FFF] group-hover:border-[#1E6FFF] text-[#8896A8] group-hover:text-white"
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-[22px] font-bold text-[#0D1421] mb-2 tracking-tight">
                    {cat.label}
                  </h3>
                  <p className="text-[13px] text-[#64748B] mb-4 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => {
                      const isTagSelected = isSelected && selectedTag === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={(e) => handleTagClick(e, cat.id, item)}
                          className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-all duration-150 ${
                            isTagSelected
                              ? "bg-[#1E6FFF] text-white shadow-xs scale-105"
                              : "hover:scale-105 active:scale-95"
                          }`}
                          style={{
                            backgroundColor: isTagSelected ? cat.color : cat.bg,
                            color: isTagSelected ? "#ffffff" : cat.color,
                          }}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F8FAFC] mt-auto flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#8896A8]">
                    {cat.treatmentIds.length} Protocols
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/treatments/category/${cat.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-bold text-[#64748B] hover:text-[#1E6FFF] flex items-center gap-1 bg-[#F1F5F9] hover:bg-[#EFF5FF] px-2.5 py-1 rounded-lg transition-colors"
                      title="Open dedicated category page"
                    >
                      <ExternalLink className="w-3 h-3" /> Dedicated Page
                    </Link>

                    <span
                      className="text-xs font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform"
                      style={{ color: cat.color }}
                    >
                      Filter <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 3 — DYNAMIC SEPARATED TREATMENTS SECTION
══════════════════════════════════════════ */
const DIFF_MAP = [
  { label: "Mild", color: "#10B981" },
  { label: "Moderate", color: "#F59E0B" },
  { label: "Intensive", color: "#EF4444" },
];

function TreatmentCard({
  t,
  index,
  inView,
  onOpenModal,
}: {
  t: TreatmentData;
  index: number;
  inView: boolean;
  onOpenModal: (t: TreatmentData) => void;
}) {
  const diff = DIFF_MAP[index % 3];

  return (
    <motion.div
      layout
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      exit={{ opacity: 0, scale: 0.95 }}
      custom={index}
      className="group flex flex-col bg-white rounded-[24px] overflow-hidden border border-[#E8ECF4] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(30,111,255,0.10)] hover:border-[#1E6FFF]/30 transition-all duration-300"
    >
      <div className="relative w-full overflow-hidden bg-[#F8FAFC]" style={{ paddingBottom: "68%" }}>
        <Image
          src={t.image}
          alt={t.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1421]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[11px] font-bold text-[#1E6FFF] uppercase tracking-wider shadow-sm">
            {t.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span
            className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur"
            style={{
              color: diff.color,
              border: `1px solid ${diff.color}44`,
            }}
          >
            {diff.label}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="text-[20px] font-bold text-[#0D1421] leading-tight tracking-tight group-hover:text-[#1E6FFF] transition-colors duration-200 mb-2">
            {t.title}
          </h3>
          <p className="text-[14px] text-[#4A5568] leading-relaxed line-clamp-2">
            {t.shortDescription}
          </p>
        </div>

        {/* Symptoms / Tags */}
        <div className="flex flex-wrap gap-1.5">
          {t.symptoms.slice(0, 3).map((sym) => (
            <span
              key={sym}
              className="text-[11px] font-medium bg-[#F1F5F9] text-[#475569] px-2.5 py-0.5 rounded-md"
            >
              {sym}
            </span>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-[#F1F5F9] my-auto">
          {[
            { icon: <Clock className="w-4 h-4 text-[#1E6FFF]" />, label: "Recovery", val: t.recoveryTimeline },
            { icon: <Activity className="w-4 h-4 text-[#1E6FFF]" />, label: "Sessions", val: t.sessionsExpected },
            { icon: <TrendingUp className="w-4 h-4 text-[#10B981]" />, label: "Success Rate", val: `${t.successRate}%` },
            { icon: <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />, label: "Protocol", val: "Evidence-Based" },
          ].map((m) => (
            <div key={m.label} className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">{m.icon}</span>
              <div>
                <p className="text-[10px] text-[#8896A8] font-bold uppercase tracking-wider">{m.label}</p>
                <p className="text-[12px] text-[#0D1421] font-semibold truncate">{m.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-1.5 pt-2">
          <button
            type="button"
            onClick={() => onOpenModal(t)}
            className="py-2.5 px-2 bg-[#F8FAFC] border border-[#E2E8F0] text-[#0D1421] text-xs font-bold rounded-xl hover:bg-[#EFF5FF] hover:text-[#1E6FFF] hover:border-[#1E6FFF]/30 transition-colors flex items-center justify-center gap-1"
          >
            <Info className="w-3.5 h-3.5" /> Details
          </button>
          
          <Link
            href={`/treatments/${t.id}`}
            className="py-2.5 px-2 bg-[#EFF5FF] border border-[#D0E2FF] text-[#1E6FFF] text-xs font-bold rounded-xl hover:bg-[#1E6FFF] hover:text-white transition-all flex items-center justify-center gap-1"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Full Page
          </Link>

          <Link
            href={`/book?treatment=${t.id}`}
            className="py-2.5 px-2 bg-[#1E6FFF] text-white text-xs font-bold rounded-xl hover:bg-[#1558D6] shadow-[0_4px_14px_rgba(30,111,255,0.25)] transition-all flex items-center justify-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5" /> Book
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

interface DynamicTreatmentsSectionProps {
  selectedCategory: string;
  selectedTag: string | null;
  searchQuery: string;
  onSelectCategory: (categoryId: string, tag?: string) => void;
  onSelectTag: (tag: string | null) => void;
  onSearchChange: (q: string) => void;
  onOpenModal: (t: TreatmentData) => void;
}

function DynamicTreatmentsSection({
  selectedCategory,
  selectedTag,
  searchQuery,
  onSelectCategory,
  onSelectTag,
  onSearchChange,
  onOpenModal,
}: DynamicTreatmentsSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  // Filtered Treatments Calculation
  const filteredTreatments = useMemo(() => {
    return TREATMENTS.filter((t) => {
      // 1. Category filter
      if (selectedCategory !== "all") {
        const catObj = CATEGORIES.find((c) => c.id === selectedCategory);
        if (catObj && !catObj.treatmentIds.includes(t.id)) {
          return false;
        }
      }

      // 2. Sub-tag / Symptom filter
      if (selectedTag) {
        const tagLower = selectedTag.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(tagLower);
        const matchesSymptoms = t.symptoms.some((s) => s.toLowerCase().includes(tagLower));
        const matchesCondition = t.conditionDescription.toLowerCase().includes(tagLower);
        const matchesTechniques = t.treatmentTechniques.some((tech) => tech.toLowerCase().includes(tagLower));
        const matchesBenefits = t.benefits.some((b) => b.toLowerCase().includes(tagLower));
        if (!matchesTitle && !matchesSymptoms && !matchesCondition && !matchesTechniques && !matchesBenefits) {
          return false;
        }
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.symptoms.some((s) => s.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  return (
    <section id="treatments" ref={ref} className="py-24 lg:py-32 bg-[#FAFBFF] border-t border-[#EEF2F6]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF5FF] text-[#1E6FFF] text-xs font-bold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" /> Filtered Treatment Protocols
              </div>

              {activeCategoryObj && (
                <Link
                  href={`/treatments/category/${activeCategoryObj.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D0E2FF] text-[#1E6FFF] text-xs font-bold hover:bg-[#1E6FFF] hover:text-white transition-colors shadow-xs"
                >
                  <ExternalLink className="w-3 h-3" /> Open In Dedicated Page
                </Link>
              )}
            </div>
            <h2 className="text-[40px] font-black text-[#0D1421] leading-tight tracking-tight">
              {activeCategoryObj ? `${activeCategoryObj.label} Treatments` : "All Specialized Treatments"}
            </h2>
            <p className="text-[17px] text-[#4A5568] mt-2 max-w-xl">
              {activeCategoryObj
                ? activeCategoryObj.description
                : "Explore our comprehensive clinical catalog tailored to your recovery goals."}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search treatments, symptoms..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-2xl text-sm text-[#0D1421] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#1E6FFF] focus:ring-2 focus:ring-[#1E6FFF]/15 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#0D1421]"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className={`px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
              selectedCategory === "all"
                ? "bg-[#1E6FFF] text-white shadow-[0_4px_16px_rgba(30,111,255,0.3)]"
                : "bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#1E6FFF]/40 hover:text-[#0D1421]"
            }`}
          >
            <span>✨</span> All Specializations
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === "all" ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"
              }`}
            >
              {TREATMENTS.length}
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#0D1421] text-white shadow-md"
                    : "bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#1E6FFF]/40 hover:text-[#0D1421]"
                }`}
              >
                <span>{cat.emoji}</span> {cat.label}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"
                  }`}
                >
                  {cat.treatmentIds.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Sub-Tags Filter Row */}
        {activeCategoryObj && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2 mb-8 p-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs"
          >
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#1E6FFF]" /> Specific Symptoms:
            </span>
            <button
              type="button"
              onClick={() => onSelectTag(null)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                !selectedTag
                  ? "bg-[#1E6FFF] text-white shadow-xs"
                  : "bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9]"
              }`}
            >
              All {activeCategoryObj.label}
            </button>
            {activeCategoryObj.items.map((item) => {
              const isTagActive = selectedTag === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSelectTag(isTagActive ? null : item)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isTagActive
                      ? "bg-[#1E6FFF] text-white shadow-xs"
                      : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                  }`}
                >
                  {item}
                </button>
              );
            })}

            {(selectedCategory !== "all" || selectedTag || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  onSelectCategory("all");
                  onSelectTag(null);
                  onSearchChange("");
                }}
                className="ml-auto text-xs font-bold text-[#EF4444] hover:underline flex items-center gap-1 px-2 py-1"
              >
                <X className="w-3.5 h-3.5" /> Clear Filters
              </button>
            )}
          </motion.div>
        )}

        {/* Results Counter / Banner */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-semibold text-[#64748B]">
            Showing <strong className="text-[#0D1421]">{filteredTreatments.length}</strong> treatment{filteredTreatments.length !== 1 ? "s" : ""}
            {selectedTag ? ` matching "${selectedTag}"` : ""}
            {searchQuery ? ` matching query "${searchQuery}"` : ""}
          </p>
        </div>

        {/* Treatments Grid */}
        {filteredTreatments.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence>
              {filteredTreatments.map((t, i) => (
                <TreatmentCard
                  key={t.id}
                  t={t}
                  index={i}
                  inView={inView}
                  onOpenModal={onOpenModal}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8ECF4] p-8 max-w-xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#EFF5FF] text-[#1E6FFF] flex items-center justify-center mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-[#0D1421] mb-2">No matching treatments found</h3>
            <p className="text-sm text-[#64748B] mb-6">
              Try adjusting your symptom tag or clearing search keywords to view all treatments.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory("all");
                onSelectTag(null);
                onSearchChange("");
              }}
              className="px-6 py-2.5 bg-[#1E6FFF] text-white font-bold text-sm rounded-xl shadow-md hover:bg-[#1558D6] transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 4 — WHY PHYSIOTHERAPY
══════════════════════════════════════════ */
function WhyPhysioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const without = [
    "Pain worsens over time",
    "Reduced mobility & flexibility",
    "Prolonged recovery period",
    "Higher risk of surgery",
    "Dependency on pain medication",
  ];
  const withPhysio = [
    "Significant pain reduction",
    "Restored full mobility",
    "Faster, safer recovery",
    "Improved quality of life",
    "Long-term prevention",
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-[#1E6FFF] font-semibold text-sm tracking-wider uppercase mb-3">
            The Evidence
          </p>
          <h2 className="text-[40px] font-black text-[#0D1421] leading-tight tracking-tight mb-4">
            Why Choose Physiotherapy?
          </h2>
          <p className="text-[18px] text-[#4A5568] leading-relaxed">
            The difference between ignoring pain and taking action with expert care.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-[24px] border border-[#FEE2E2] p-8 shadow-[0_4px_24px_rgba(239,68,68,0.05)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#FEF2F2] flex items-center justify-center">
                <XCircle className="w-5 h-5 text-[#EF4444]" />
              </div>
              <h3 className="text-[22px] font-bold text-[#0D1421]">Without Physiotherapy</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {without.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
                  <span className="text-[16px] text-[#4A5568]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-[24px] border border-[#A7F3D0] p-8 shadow-[0_4px_24px_rgba(16,185,129,0.08)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#ECFDF5] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              </div>
              <h3 className="text-[22px] font-bold text-[#0D1421]">With Physiotherapy</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {withPhysio.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <span className="text-[16px] text-[#4A5568]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 5 — CHOOSE BY CONDITION
══════════════════════════════════════════ */
const CONDITIONS = [
  { name: "Neck Pain", category: "orthopedic", tag: "Joint Pain" },
  { name: "Back Pain", category: "orthopedic", tag: "Joint Pain" },
  { name: "Knee Pain", category: "orthopedic", tag: "Joint Pain" },
  { name: "Shoulder Pain", category: "orthopedic", tag: "Frozen Shoulder" },
  { name: "Sciatica", category: "orthopedic", tag: "Joint Pain" },
  { name: "ACL Tear", category: "sports-injury", tag: "ACL Tear" },
  { name: "Tennis Elbow", category: "sports-injury", tag: "Sprain" },
  { name: "Stroke Rehab", category: "neurological", tag: "Stroke Rehab" },
  { name: "Parkinson's", category: "neurological", tag: "Parkinson's" },
  { name: "Balance Disorders", category: "geriatric", tag: "Balance" },
  { name: "Pediatric Motor Skills", category: "pediatric", tag: "Motor Skills" },
  { name: "Posture Correction", category: "pediatric", tag: "Posture" },
];

function ConditionsSection({
  onSelectCondition,
}: {
  onSelectCondition: (category: string, tag: string) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#FAFBFF]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-[#1E6FFF] font-semibold text-sm tracking-wider uppercase mb-3">
            Quick Diagnostic Filters
          </p>
          <h2 className="text-[40px] font-black text-[#0D1421] leading-tight tracking-tight mb-4">
            Choose by Condition
          </h2>
          <p className="text-[18px] text-[#4A5568] leading-relaxed">
            Select your specific diagnosis or symptom to instantly highlight the exact rehabilitation program.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto"
        >
          {CONDITIONS.map((cond, i) => (
            <motion.button
              key={cond.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectCondition(cond.category, cond.tag)}
              className="px-6 py-3 rounded-2xl text-[15px] font-semibold border bg-white text-[#0D1421] border-[#E8ECF4] hover:border-[#1E6FFF] hover:text-[#1E6FFF] hover:shadow-sm transition-all duration-200"
            >
              {cond.name}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 6 — SPECIALISTS
══════════════════════════════════════════ */
function SpecialistsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const specialists = SPECIALISTS.slice(0, 4);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-[#1E6FFF] font-semibold text-sm tracking-wider uppercase mb-3">Our Team</p>
            <h2 className="text-[40px] font-black text-[#0D1421] leading-tight tracking-tight">Meet the Specialists</h2>
          </div>
          <Link
            href="/specialists"
            className="inline-flex items-center gap-2 text-[#1E6FFF] font-semibold text-[16px] hover:gap-3 transition-all duration-200"
          >
            View all specialists <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists.map((sp, i) => (
            <motion.div
              key={sp.id}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-[24px] overflow-hidden border border-[#E8ECF4] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(30,111,255,0.08)] transition-all duration-300"
            >
              <div className="relative w-full overflow-hidden bg-[#F8FAFC]" style={{ paddingBottom: "100%" }}>
                <Image
                  src={sp.image}
                  alt={sp.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  sizes="300px"
                />
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div>
                  <h4 className="text-[17px] font-bold text-[#0D1421] leading-snug">{sp.name}</h4>
                  <p className="text-[13px] text-[#1E6FFF] font-semibold mt-0.5">{sp.designation}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s < Math.round(sp.rating) ? "text-yellow-400 fill-yellow-400" : "text-[#E8ECF4] fill-[#E8ECF4]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[13px] font-semibold text-[#0D1421]">{sp.rating}</span>
                  <span className="text-[12px] text-[#8896A8]">({sp.reviews})</span>
                </div>
                <div className="flex flex-wrap gap-2 text-[12px]">
                  <span className="flex items-center gap-1 text-[#4A5568]">
                    <Award className="w-3.5 h-3.5 text-[#F59E0B]" /> {sp.yearsExperience}yr exp
                  </span>
                  <span className="flex items-center gap-1 text-[#4A5568]">
                    <Languages className="w-3.5 h-3.5 text-[#1E6FFF]" /> {sp.languages[0]}
                  </span>
                </div>
                <Link
                  href="/book"
                  className="mt-1 w-full py-2.5 text-center bg-[#EFF5FF] text-[#1E6FFF] font-bold rounded-xl text-[14px] hover:bg-[#1E6FFF] hover:text-white transition-all duration-200"
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 7 — TESTIMONIALS
══════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    name: "Ravi Sharma",
    condition: "ACL Rehabilitation",
    recovery: 96,
    rating: 5,
    quote:
      "After my ACL surgery, I was worried I'd never play cricket again. Within 7 months of treatment, I was back on the field — stronger than ever.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    before: "Severe instability",
    after: "Full return to sport",
  },
  {
    name: "Priya Menon",
    condition: "Frozen Shoulder",
    recovery: 88,
    rating: 5,
    quote:
      "Couldn't lift my arm above my shoulder for months. Three months of dedicated therapy completely restored my mobility. Now I swim every morning without pain.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
    before: "30° range of motion",
    after: "Full range restored",
  },
  {
    name: "Arun Nair",
    condition: "Stroke Rehabilitation",
    recovery: 82,
    rating: 5,
    quote:
      "The neurological rehab program gave my father his life back. He went from needing a wheelchair to walking independently in 6 months.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    before: "Wheelchair dependent",
    after: "Walking independently",
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#FAFBFF]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-[#1E6FFF] font-semibold text-sm tracking-wider uppercase mb-3">Patient Stories</p>
          <h2 className="text-[40px] font-black text-[#0D1421] leading-tight tracking-tight mb-4">Real Patient Results</h2>
          <p className="text-[18px] text-[#4A5568] leading-relaxed">Hear directly from patients who transformed their health at Healing Motion.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              className="bg-white rounded-[24px] border border-[#E8ECF4] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col gap-6"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#FEF2F2] rounded-2xl p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#EF4444] mb-1">Before</p>
                  <p className="text-[13px] font-semibold text-[#0D1421]">{t.before}</p>
                </div>
                <div className="bg-[#ECFDF5] rounded-2xl p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] mb-1">After</p>
                  <p className="text-[13px] font-semibold text-[#0D1421]">{t.after}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[13px] font-semibold text-[#4A5568]">Recovery Progress</span>
                  <span className="text-[15px] font-black text-[#10B981]">{t.recovery}%</span>
                </div>
                <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #1E6FFF, #10B981)" }}
                    initial={{ width: "0%" }}
                    animate={inView ? { width: `${t.recovery}%` } : { width: "0%" }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: "easeOut" }}
                  />
                </div>
              </div>
              <p className="text-[15px] text-[#4A5568] leading-relaxed italic flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#F1F5F9]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#0D1421]">{t.name}</p>
                  <p className="text-[13px] text-[#1E6FFF] font-medium">{t.condition}</p>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 8 — FAQ
══════════════════════════════════════════ */
const FAQS = [
  {
    q: "How many sessions will I need?",
    a: "The number of sessions varies by condition severity. Most acute conditions resolve in 6–12 sessions, while chronic or post-surgical cases may require 15–30+ sessions. Your therapist will set a clear plan at your first assessment.",
  },
  {
    q: "Is physiotherapy covered by insurance?",
    a: "Yes, most physiotherapy treatments are covered under standard health insurance plans. We work with all major insurers and can assist you with pre-authorization and claim submissions.",
  },
  {
    q: "What should I bring to my first appointment?",
    a: "Bring any prior investigation reports (X-rays, MRI, blood tests), your list of current medications, comfortable clothing, and your insurance card if applicable.",
  },
  {
    q: "Can I book online consultations?",
    a: "Yes, we offer secure video consultations for follow-up sessions, progress reviews, and initial screenings. Select 'Online' when booking to schedule a video appointment.",
  },
  {
    q: "How quickly will I feel results?",
    a: "Many patients report meaningful pain reduction within the first 2–4 sessions. Full recovery timelines depend on the condition, but our success rate across all programs exceeds 90%.",
  },
  {
    q: "Do you treat children and elderly patients?",
    a: "Absolutely. We have dedicated specialists for pediatric physiotherapy and geriatric care, with age-appropriate assessment tools and treatment techniques.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-[#1E6FFF] font-semibold text-sm tracking-wider uppercase mb-3">Support</p>
          <h2 className="text-[40px] font-black text-[#0D1421] leading-tight tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[18px] text-[#4A5568] leading-relaxed">
            Everything you need to know before starting your treatment journey.
          </p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="max-w-3xl mx-auto flex flex-col gap-4"
        >
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`rounded-[20px] border bg-white overflow-hidden transition-all duration-300 ${
                open === i
                  ? "border-[#1E6FFF] shadow-[0_4px_24px_rgba(30,111,255,0.10)]"
                  : "border-[#E8ECF4] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
              >
                <span className="text-[17px] font-bold text-[#0D1421]">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    open === i ? "bg-[#1E6FFF]" : "bg-[#F1F5F9]"
                  }`}
                >
                  <ChevronDown className={`w-4 h-4 ${open === i ? "text-white" : "text-[#4A5568]"}`} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-7 pb-6">
                      <p className="text-[16px] text-[#4A5568] leading-relaxed border-t border-[#F1F5F9] pt-4">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 9 — CTA
══════════════════════════════════════════ */
function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(135deg, #1E6FFF 0%, #0ea5e9 50%, #10B981 100%)" }}
      />
      <div className="absolute inset-0 z-0 opacity-10 bg-grid" />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto flex flex-col items-center gap-8"
        >
          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center">
            <HeartPulse className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-tight tracking-tight">
            Ready to Start<br />Your Recovery?
          </h2>
          <p className="text-[18px] text-white/80 leading-relaxed max-w-xl">
            Take the first step today. Our specialists are ready to build a personalized plan just for you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#1E6FFF] font-black rounded-2xl text-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:scale-[1.03] active:scale-100 transition-all duration-200"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white/15 backdrop-blur text-white font-bold rounded-2xl text-[16px] border border-white/30 hover:bg-white/25 hover:scale-[1.03] active:scale-100 transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              Call Clinic
            </a>
          </div>
          <div className="flex flex-wrap gap-6 justify-center mt-4">
            {[
              { icon: <MapPin className="w-4 h-4" />, text: "3 Locations Available" },
              { icon: <Clock className="w-4 h-4" />, text: "Mon – Sat, 8 AM – 8 PM" },
              { icon: <ShieldCheck className="w-4 h-4" />, text: "Insurance Accepted" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/80 text-[15px] font-medium">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE WRAPPER WITH FILTER STATE
══════════════════════════════════════════ */
export default function TreatmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalTreatment, setModalTreatment] = useState<TreatmentData | null>(null);

  const handleSelectCategory = (categoryId: string, tag?: string) => {
    setSelectedCategory(categoryId);
    setSelectedTag(tag || null);
  };

  const handleSelectCondition = (categoryId: string, tag: string) => {
    setSelectedCategory(categoryId);
    setSelectedTag(tag);
    const target = document.getElementById("treatments");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFBFF]">
      <HeroSection />
      <CategoriesSection
        selectedCategory={selectedCategory}
        selectedTag={selectedTag}
        onSelectCategory={handleSelectCategory}
      />
      <DynamicTreatmentsSection
        selectedCategory={selectedCategory}
        selectedTag={selectedTag}
        searchQuery={searchQuery}
        onSelectCategory={handleSelectCategory}
        onSelectTag={setSelectedTag}
        onSearchChange={setSearchQuery}
        onOpenModal={setModalTreatment}
      />
      <WhyPhysioSection />
      <ConditionsSection onSelectCondition={handleSelectCondition} />
      <SpecialistsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />

      {/* Interactive Detail Modal */}
      <TreatmentModal
        treatment={modalTreatment}
        isOpen={!!modalTreatment}
        onClose={() => setModalTreatment(null)}
      />
    </main>
  );
}
