'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─── milestone data ──────────────────────────────────────────── */
const MILESTONES = [
  {
    id: 'assessment',
    phase: 'Phase 01',
    title: 'Assessment & Mapping',
    subtitle: 'Understanding Your Body',
    description:
      'Advanced biomechanical analysis and diagnostic imaging pinpoints the exact root cause. We map your pain, posture, and movement to build a precise clinical picture.',
    processHighlights: [
      'Comprehensive physical evaluation',
      'Diagnostic imaging review',
      'Custom treatment roadmap creation'
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    tags: ['Biomechanical Mapping', 'Movement Screening', 'Pain Diagnostics'],
    days: 'Days 1 – 7',
    color: '#0066FF',
    glow: 'rgba(0,102,255,0.35)',
    lightBg: 'rgba(0,102,255,0.08)',
    border: 'rgba(0,102,255,0.22)',
    side: 'right' as const,
    iconPath:
      'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2m-6 9 2 2 4-4',
  },
  {
    id: 'restoration',
    phase: 'Phase 02',
    title: 'Restoration & Relief',
    subtitle: 'Reclaim Pain-Free Movement',
    description:
      'Hands-on manual therapy and targeted exercises restore lost range of motion and reduce inflammation. Every session is precisely calibrated to your progress.',
    processHighlights: [
      'Targeted manual therapy',
      'Inflammation reduction',
      'Progressive mobility exercises'
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-a1c371ce616e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    tags: ['Manual Therapy', 'Mobility Training', 'Pain Relief'],
    days: 'Weeks 2 – 6',
    color: '#AA00FF',
    glow: 'rgba(170,0,255,0.35)',
    lightBg: 'rgba(170,0,255,0.08)',
    border: 'rgba(170,0,255,0.22)',
    side: 'left' as const,
    iconPath:
      'M4.5 12.75l6 6 9-13.5',
  },
  {
    id: 'strengthening',
    phase: 'Phase 03',
    title: 'Strengthening & Prevention',
    subtitle: 'Build Lasting Resilience',
    description:
      'Progressive strength protocols and neuromuscular re-education build the foundation to prevent recurrence. You leave not just healed — but stronger than before.',
    processHighlights: [
      'Neuromuscular re-education',
      'Functional load training',
      'Long-term maintenance planning'
    ],
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    tags: ['Strength Training', 'Injury Prevention', 'Peak Performance'],
    days: 'Weeks 6 – 12',
    color: '#00C853',
    glow: 'rgba(0,200,83,0.35)',
    lightBg: 'rgba(0,200,83,0.08)',
    border: 'rgba(0,200,83,0.22)',
    side: 'right' as const,
    cta: true,
    iconPath:
      'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
  },
] as const;

/* ─── SVG thread path ─────────────────────────────────────────── */
// ViewBox: 0 0 120 900 — thick straight vertical line
const PATH_D = 'M 60 40 L 60 860';

// Precise node positions matching the path at each milestone
const NODE_XY = [
  { x: 60, y: 220 },   // Phase 01 — Assessment
  { x: 60, y: 440 },   // Phase 02 — Restoration
  { x: 60, y: 660 },   // Phase 03 — Strengthening
];

// At what global scroll progress each milestone "arrives"
// Phase layout: each phase occupies ~1/3 of total scroll
const PHASE_START = [0.05, 0.38, 0.70];

/* ─── smooth lerp ─────────────────────────────────────────────── */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

// Phase-local progress: 0→1 within each phase window
function phaseLocalProgress(global: number, phaseIdx: number): number {
  const start = PHASE_START[phaseIdx];
  const end = phaseIdx < 2 ? PHASE_START[phaseIdx + 1] : 1.0;
  return clamp((global - start) / (end - start), 0, 1);
}

/* ═══ RecoveryJourney Component ══════════════════════════════════ */
export default function RecoveryJourney() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const rawRef       = useRef(0);
  const smoothRef    = useRef(0);
  const rafRef       = useRef<number>(0);
  const pathRef      = useRef<SVGPathElement>(null);

  const [progress, setProgress]     = useState(0);
  const [pathLen,  setPathLen]      = useState(820);

  /* measure SVG path length once */
  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  /* scroll → raw progress */
  const handleScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect  = el.getBoundingClientRect();
    const total = el.offsetHeight - window.innerHeight;
    rawRef.current = clamp(-rect.top / total, 0, 1);
  }, []);

  /* RAF: smooth lerp toward raw progress */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const animate = () => {
      const next = rawRef.current;
      const prev = smoothRef.current;
      const s = prev + (next - prev) * 0.072; // silky easing factor
      smoothRef.current = s;
      if (Math.abs(s - prev) > 0.00005) setProgress(s);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  /* derived values */
  const threadDrawn  = pathLen * clamp(progress / 0.92, 0, 1); // full draw by 92% scroll
  const dashOffset   = pathLen - threadDrawn;

  // Which phase is "active" (showing its full card)
  const activePhase = progress >= PHASE_START[2] ? 2
                    : progress >= PHASE_START[1] ? 1
                    : 0;

  // Whether each node is lit
  const nodeActive = MILESTONES.map((_, i) => progress >= PHASE_START[i] - 0.02);

  return (
    <section
      id="recovery-journey"
      className="relative"
      style={{ background: '#FAFAF8' }}
    >
      {/* ── ambient background for header ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, #EBF4FF 0%, #FAFAF8 30%)' }}>
          {/* soft organic shapes from image */}
          <div style={{
            position:'absolute', width: '80%', height: '80%', borderRadius:'50%',
            background:'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
            top:'-10%', left:'-20%',
          }}/>
          <div style={{
            position:'absolute', width: '70%', height: '70%', borderRadius:'50%',
            background:'radial-gradient(circle, rgba(219,234,254,0.6) 0%, transparent 70%)',
            top:'20%', right:'-20%',
          }}/>
        </div>

        {/* ── floating icons (bg decoration) ── */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{ overflow: 'hidden' }}>
          {/* Top Left: Heartbeat */}
          <div style={{ position: 'absolute', top: '15%', left: '15%', width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(30,111,255,0.1)', border: '1px solid rgba(255,255,255,0.8)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>
          </div>
          {/* Bottom Left: Walk/Stretch */}
          <div style={{ position: 'absolute', top: '45%', left: '12%', width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(30,111,255,0.1)', border: '1px solid rgba(255,255,255,0.8)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 12 6-2 6 2"/><path d="M12 14v-4"/></svg>
          </div>
          {/* Top Right: Medical Cross */}
          <div style={{ position: 'absolute', top: '18%', right: '16%', width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(30,111,255,0.1)', border: '1px solid rgba(255,255,255,0.8)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#3B82F6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
          </div>
          {/* Bottom Right: Run */}
          <div style={{ position: 'absolute', top: '42%', right: '14%', width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(30,111,255,0.1)', border: '1px solid rgba(255,255,255,0.8)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16v-2.38C4 11.5 7.97 10.5 12 10.5s8 1 8 3.12V16"/><path d="M12 10.5c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3Z"/><path d="M12 10.5v10"/><path d="M8 20.5h8"/></svg>
          </div>
        </div>

        {/* ── page header (NON-STICKY) ── */}
        <div className="relative z-10 pt-16 pb-12 text-center px-6 flex flex-col items-center">
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'6px 16px', borderRadius:999,
            background:'rgba(16, 185, 129, 0.1)', // Light green
            marginBottom:16,
          }}>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:'0.05em', color:'#059669' }}>
              Your Path to Wellness
            </span>
          </div>

          <h2 style={{
            fontSize:'clamp(32px, 5vw, 56px)', fontWeight:800,
            letterSpacing:'-0.03em', lineHeight:1.15, color:'#111827', margin:0,
            maxWidth: 800,
          }}>
            The Roadmap to <br/>
            <span style={{ color: '#1D4ED8' }}>
              Full Mobility
            </span>
          </h2>
          <p style={{ marginTop:16, color:'#4B5563', fontSize:15, lineHeight:1.6, maxWidth: 650 }}>
            Recovery is not a straight line, but a guided journey. Follow our evidence-based protocol designed to return you to peak performance safely and efficiently.
          </p>

          {/* ── Stats Banner ── */}
          <div style={{
            marginTop: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32,
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            borderRadius: 24, padding: '16px 40px',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
            border: '1px solid rgba(255,255,255,1)',
            zIndex: 20
          }}>
            {/* Stat 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#111827', lineHeight: 1.1 }}>1,200+</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280' }}>Patients Helped</div>
              </div>
            </div>
            {/* Stat 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#111827', lineHeight: 1.1 }}>98%</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280' }}>Recovery Rate</div>
              </div>
            </div>
            {/* Stat 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#111827', lineHeight: 1.1 }}>15+</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280' }}>Specialists</div>
              </div>
            </div>
            {/* Stat 4 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#111827', lineHeight: 1.1 }}>24/7</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280' }}>Support</div>
              </div>
            </div>
          </div>
        </div>

      {/* ══ SCROLL-JACKED TIMELINE AREA ══ */}
      <div ref={sectionRef} style={{ minHeight: '550vh', position: 'relative' }}>
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

          {/* phase progress bar (top strip instead of bottom for visibility) */}
          <div style={{
            position:'absolute', top:0, left:0, right:0, height:4,
            background:'#F1F5F9', zIndex:20,
          }}>
            <div style={{
              height:'100%',
              width:`${progress * 100}%`,
              background:'linear-gradient(90deg, #1E6FFF, #8B5CF6, #10B981)',
              transition:'width 0.05s linear',
              boxShadow:'0 0 8px rgba(30,111,255,0.4)',
            }}/>
          </div>

          {/* ══ THREE-COLUMN LAYOUT: Card | Thread | Card ══ */}
          <div
            className="relative flex-1 flex items-stretch justify-center"
            style={{ padding:'0 24px', gap:0, overflow:'hidden' }}
          >
            {/* ── LEFT CARD COLUMN ── (Restoration — Phase 02) */}
            <div style={{ flex:'0 0 38%', position:'relative' }}>
              <div style={{
                position: 'absolute', top: '48.8%', right: 32, left: 0,
                transform: 'translateY(-50%)', display: 'flex', justifyContent: 'flex-end',
                zIndex: activePhase === 1 ? 10 : 1
              }}>
                <PhaseCard
                  milestone={MILESTONES[1]}
                  phaseIdx={1}
                  activePhase={activePhase}
                  localProgress={phaseLocalProgress(progress, 1)}
                />
              </div>
            </div>

            {/* ── CENTER TIMELINE (SVG Thread) ── */}
            <div style={{
              flex:'0 0 24%', display:'flex', justifyContent:'center', alignItems:'stretch',
              position:'relative', height:'100%', padding:'16px 0',
            }}>
              {/* Ambient glow around active node */}
              <div style={{
                position:'absolute',
                top: `${activePhase === 0 ? 24.4 : activePhase === 1 ? 48.8 : 73.3}%`,
                left:'50%', transform:'translate(-50%, -50%)',
                width: 140, height: 140, borderRadius:'50%',
                background: `radial-gradient(circle, ${MILESTONES[activePhase].glow} 0%, transparent 60%)`,
                transition: 'top 0.8s cubic-bezier(0.23,1,0.32,1), background 0.5s ease',
                pointerEvents:'none', zIndex: 0,
              }}/>

              <svg
                viewBox="0 0 120 900"
                preserveAspectRatio="xMidYMid meet"
                style={{ width:'auto', maxWidth:110, height:'100%', overflow:'visible', zIndex: 1 }}
                aria-hidden
              >
                <defs>
                  <linearGradient id="rj-thread" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#1E6FFF"/>
                    <stop offset="50%"  stopColor="#8B5CF6"/>
                    <stop offset="100%" stopColor="#10B981"/>
                  </linearGradient>
                  <filter id="rj-glow" x="-60%" y="-20%" width="220%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <filter id="rj-nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {/* base track */}
                <path d={PATH_D} fill="none" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round"/>

                {/* animated color draw */}
                <path
                  ref={pathRef}
                  d={PATH_D}
                  fill="none"
                  stroke="url(#rj-thread)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  filter="url(#rj-glow)"
                  style={{
                    strokeDasharray: pathLen,
                    strokeDashoffset: dashOffset,
                    transition: 'stroke-dashoffset 0.04s linear',
                  }}
                />

                {/* silk sheen */}
                <path
                  d={PATH_D}
                  fill="none"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: pathLen,
                    strokeDashoffset: dashOffset,
                    transition: 'stroke-dashoffset 0.04s linear',
                  }}
                />

                {/* milestone nodes */}
                {NODE_XY.map((node, i) => {
                  const m   = MILESTONES[i];
                  const lit = nodeActive[i];
                  const r   = i === 0 ? 7 : i === 1 ? 9 : 11;
                  return (
                    <g key={m.id} transform={`translate(${node.x},${node.y})`}>
                      {/* ripple */}
                      {lit && (
                        <circle
                          r={r + 14}
                          fill={m.color}
                          opacity={0.12}
                          style={{ animation: 'rjRipple 2.2s ease-out infinite' }}
                        />
                      )}
                      {lit && <circle r={r + 6} fill={m.color} opacity={0.16}/>}
                      <circle
                        r={r}
                        fill={lit ? m.color : '#E2E8F0'}
                        filter={lit ? 'url(#rj-nodeGlow)' : undefined}
                        style={{ transition:'fill 0.5s ease' }}
                      />
                      <circle r={r * 0.42} fill="white" opacity={0.9}/>

                      {/* phase label below node */}
                      <text
                        y={r + 14}
                        textAnchor="middle"
                        style={{
                          fontSize:7, fontWeight:700, fill: lit ? m.color : '#B0BAC8',
                          letterSpacing:'0.04em', transition:'fill 0.5s ease',
                          fontFamily:'Inter, sans-serif',
                        }}
                      >
                        {m.phase}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* ── RIGHT CARD COLUMN ── (Assessment Phase 01 + Strengthening Phase 03) */}
            <div style={{ flex:'0 0 38%', position:'relative' }}>
              <div style={{
                position: 'absolute', top: '24.4%', left: 32, right: 0,
                transform: 'translateY(-50%)', display: 'flex', justifyContent: 'flex-start',
                zIndex: activePhase === 0 ? 10 : 1
              }}>
                <PhaseCard
                  milestone={MILESTONES[0]}
                  phaseIdx={0}
                  activePhase={activePhase}
                  localProgress={phaseLocalProgress(progress, 0)}
                />
              </div>
              <div style={{
                position: 'absolute', top: '73.3%', left: 32, right: 0,
                transform: 'translateY(-50%)', display: 'flex', justifyContent: 'flex-start',
                zIndex: activePhase === 2 ? 10 : 1
              }}>
                <PhaseCard
                  milestone={MILESTONES[2]}
                  phaseIdx={2}
                  activePhase={activePhase}
                  localProgress={phaseLocalProgress(progress, 2)}
                />
              </div>
            </div>
          </div>

          {/* ── scroll progress pill indicator (far right) ── */}
          <div style={{
            position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
            display:'flex', flexDirection:'column', alignItems:'center', gap:6, zIndex:30,
          }}>
            {MILESTONES.map((m, i) => (
              <div
                key={m.id}
                style={{
                  width:4, borderRadius:99,
                  height: nodeActive[i] ? 28 : 8,
                  background: nodeActive[i] ? m.color : '#CBD5E1',
                  boxShadow: nodeActive[i] ? `0 0 10px ${m.glow}` : 'none',
                  transition:'height 0.5s cubic-bezier(0.23,1,0.32,1), background 0.4s ease, box-shadow 0.4s ease',
                }}
              />
            ))}
          </div>

          {/* ── scroll hint (fades out after 5%) ── */}
          <div style={{
            position:'absolute', bottom:20, left:'50%', transform:'translateX(-50%)',
            opacity: progress < 0.04 ? 1 : 0,
            transition:'opacity 0.5s ease',
            display:'flex', flexDirection:'column', alignItems:'center', gap:6, zIndex:30,
          }}>
            <span style={{ fontSize:10, color:'#94A3B8', letterSpacing:'0.12em', textTransform:'uppercase', fontWeight:600 }}>
              Scroll to explore
            </span>
            <div style={{
              width:20, height:32, borderRadius:10,
              border:'2px solid #CBD5E1', display:'flex', alignItems:'flex-start',
              justifyContent:'center', paddingTop:5,
            }}>
              <div style={{ width:4, height:8, borderRadius:2, background:'#1E6FFF', animation:'rjDot 1.6s ease-in-out infinite' }}/>
            </div>
          </div>{/* end scroll hint */}
        </div>{/* end sticky */}
      </div>{/* end sectionRef */}

      {/* keyframes */}
      <style>{`
        @keyframes rjRipple {
          0%   { transform: scale(1);   opacity: 0.15; }
          70%  { transform: scale(2.4); opacity: 0;    }
          100% { transform: scale(2.4); opacity: 0;    }
        }
        @keyframes rjDot {
          0%, 100% { transform: translateY(0px);  opacity: 1;   }
          50%       { transform: translateY(9px);  opacity: 0.3; }
        }
        @keyframes rjSlideRight {
          from { opacity: 0; transform: translateX(20px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0)    scale(1);    }
        }
        @keyframes rjSlideLeft {
          from { opacity: 0; transform: translateX(-20px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0)     scale(1);    }
        }
        @keyframes rjCollapse {
          from { opacity: 1; max-height: 400px; }
          to   { opacity: 0.7; max-height: 64px; }
        }
      `}</style>
    </section>
  );
}

/* ═══ PhaseCard sub-component ════════════════════════════════════ */
interface PhaseCardProps {
  milestone: typeof MILESTONES[number];
  phaseIdx: number;
  activePhase: number;
  localProgress: number; // 0→1 within this phase's scroll window
}

function PhaseCard({ milestone: m, phaseIdx, activePhase, localProgress }: PhaseCardProps) {
  const isActive    = activePhase === phaseIdx;
  const isCompleted = activePhase > phaseIdx;
  const isPending   = activePhase < phaseIdx;

  if (isPending) return null;

  /* ── Completed → mini chip ── */
  if (isCompleted) {
    return (
      <div style={{
        display:'flex', alignItems:'center', gap:10,
        padding:'8px 14px', borderRadius:14,
        background:'rgba(255,255,255,0.85)',
        backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
        border:`1px solid ${m.border}`,
        boxShadow:`0 2px 12px -4px ${m.glow}`,
        maxWidth: 300,
      }}>
        <div style={{
          width:26, height:26, borderRadius:'50%',
          background: m.color, display:'flex', alignItems:'center', justifyContent:'center',
          flexShrink:0,
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize:9, fontWeight:700, color: m.color, letterSpacing:'0.08em', textTransform:'uppercase' }}>{m.phase}</div>
          <div style={{ fontSize:12, fontWeight:700, color:'#0D1421' }}>{m.title} ✓</div>
        </div>
      </div>
    );
  }

  /* ── Active → full premium card ── */
  const cardEnter = localProgress > 0.05;

  return (
    <div style={{
      width:'100%',
      maxWidth: 340,
      maxHeight: 'calc(100vh - 120px)',
      overflowY: 'auto',
      borderRadius:22,
      padding:20,
      background:'rgba(255,255,255,0.92)',
      backdropFilter:'blur(24px)',
      WebkitBackdropFilter:'blur(24px)',
      border:`1.5px solid ${cardEnter ? m.color + '50' : 'rgba(230,234,240,0.8)'}`,
      boxShadow: cardEnter
        ? `0 20px 60px -12px ${m.glow}, 0 4px 16px -4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)`
        : '0 4px 24px -8px rgba(0,0,0,0.08)',
      opacity: cardEnter ? 1 : 0,
      transform: cardEnter ? 'translateY(0) scale(1)' : `translateY(16px) scale(0.96)`,
      transition: 'opacity 0.65s cubic-bezier(0.23,1,0.32,1), transform 0.65s cubic-bezier(0.23,1,0.32,1), border-color 0.4s ease, box-shadow 0.4s ease',
      position:'relative',
      scrollbarWidth: 'none',
    }}>

      {/* top shimmer line */}
      <div style={{
        position:'absolute', top:0, left:'20%', right:'20%', height:'1.5px',
        background:`linear-gradient(90deg, transparent, ${m.color}, transparent)`,
        opacity: cardEnter ? 0.8 : 0,
        transition:'opacity 0.5s 0.2s ease',
        borderRadius:99,
        pointerEvents:'none',
      }}/>

      {/* ── Card header ── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
        <span style={{
          padding:'4px 10px', borderRadius:99,
          background: m.lightBg,
          border:`1px solid ${m.border}`,
          color: m.color,
          fontSize:9, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase',
        }}>
          {m.phase}
        </span>

        <div style={{
          width:36, height:36, borderRadius:12,
          background: m.lightBg,
          border:`1px solid ${m.border}`,
          display:'flex', alignItems:'center', justifyContent:'center',
          transform: cardEnter ? 'rotate(0deg) scale(1)' : 'rotate(-20deg) scale(0.8)',
          transition:'transform 0.7s 0.15s cubic-bezier(0.23,1,0.32,1)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke={m.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={m.iconPath}/>
          </svg>
        </div>
      </div>

      {/* ── Title block ── */}
      <h3 style={{ fontSize:18, fontWeight:800, color:'#0D1421', margin:'0 0 3px', letterSpacing:'-0.03em' }}>
        {m.title}
      </h3>
      <p style={{ fontSize:12, fontWeight:600, color: m.color, margin:'0 0 10px' }}>
        {m.subtitle}
      </p>

      {/* ── Image ── */}
      {'image' in m && (
        <div style={{
          width: '100%', height: 120, borderRadius: 12, overflow: 'hidden',
          marginBottom: 10,
          border: `1px solid rgba(0,0,0,0.05)`,
        }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image src={m.image} alt={m.title} fill style={{ objectFit: 'cover' }} sizes="300px" />
          </div>
        </div>
      )}

      {/* ── Description ── */}
      <p style={{ fontSize:12, color:'#4A5568', lineHeight:1.65, margin:'0 0 10px' }}>
        {m.description}
      </p>

      {/* ── Highlights ── */}
      {'processHighlights' in m && (
        <ul style={{ margin: '0 0 12px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {m.processHighlights.map((highlight, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 11, color: '#4A5568', lineHeight: 1.5 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="2.5" strokeLinecap="round" style={{ marginTop: 2, flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {highlight}
            </li>
          ))}
        </ul>
      )}

      {/* ── Tags ── */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:12 }}>
        {m.tags.map(tag => (
          <span key={tag} style={{
            padding:'3px 8px', borderRadius:99,
            background: m.lightBg,
            border:`1px solid ${m.border}`,
            color: m.color,
            fontSize:10, fontWeight:600,
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* ── Footer ── */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        paddingTop:10, borderTop:`1px solid ${m.border}`,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
          </svg>
          <span style={{ fontSize:11, fontWeight:700, color:'#64748B' }}>{m.days}</span>
        </div>

        {'cta' in m && m.cta ? (
          <Link href="/book" style={{
            display:'inline-flex', alignItems:'center', gap:5,
            padding:'7px 14px', borderRadius:10,
            background:`linear-gradient(135deg, ${m.color}, #059669)`,
            color:'white', fontSize:12, fontWeight:700,
            textDecoration:'none',
            boxShadow:`0 4px 18px ${m.glow}`,
            transition:'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${m.glow}`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 18px ${m.glow}`;
          }}>
            Start Recovery
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        ) : (
          <div style={{
            display:'flex', alignItems:'center', gap:4,
            padding:'5px 10px', borderRadius:8,
            background: m.lightBg, border:`1px solid ${m.border}`,
          }}>
            <div style={{ width:5, height:5, borderRadius:'50%', background: m.color }}/>
            <span style={{ fontSize:10, fontWeight:600, color: m.color }}>In Progress</span>
          </div>
        )}
      </div>
    </div>
  );
}
