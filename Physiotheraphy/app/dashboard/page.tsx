'use client';
import { useState } from 'react';
import { MOCK_SESSIONS, MOCK_UPCOMING, MOCK_INVOICES, SPECIALISTS, TREATMENTS, formatPrice } from '@/lib/bookingData';

const TABS = ['Upcoming', 'History', 'Recovery', 'Exercises', 'Reports', 'Invoices', 'Messages'];

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#0D1421' }}>{value}</div>
        <div style={{ fontSize: 12, color: '#8896A8', fontWeight: 600 }}>{label}</div>
      </div>
    </div>
  );
}

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  const colors: Record<string, { bg: string; text: string }> = {
    green: { bg: 'var(--color-accent-light)', text: '#065F46' },
    blue: { bg: 'var(--color-primary-muted)', text: '#1E40AF' },
    yellow: { bg: '#FEF3C7', text: '#92400E' },
    red: { bg: '#FEE2E2', text: '#991B1B' },
  };
  const c = colors[color] ?? colors.blue;
  return <span style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>{children}</span>;
}

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const patientName = 'Rahul Sharma';

  return (
    <div style={{ background: '#FAFBFF', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,var(--color-primary) 0%,#3B82F6 50%,var(--color-accent) 100%)', padding: '40px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: '0 0 6px', fontWeight: 600 }}>Patient Dashboard</p>
              <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: '-0.03em' }}>Welcome back, {patientName} 👋</h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: '8px 0 0', fontSize: 14 }}>Your recovery is progressing well. Next session in 5 days.</p>
            </div>
            <a href="/book" style={{ padding: '12px 24px', background: '#fff', color: 'var(--color-primary)', borderRadius: 14, fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
              + Book New Appointment
            </a>
          </div>
          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14, marginTop: 28 }}>
            {[
              { icon: '📅', label: 'Total Sessions', value: '3', color: 'var(--color-primary)' },
              { icon: '✅', label: 'Sessions Completed', value: '3', color: 'var(--color-accent)' },
              { icon: '🔄', label: 'Upcoming', value: '1', color: '#F59E0B' },
              { icon: '📈', label: 'Recovery Progress', value: '58%', color: '#7C3AED' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: '16px 20px', border: '1px solid rgba(255,255,255,0.25)' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '-24px auto 0', padding: '0 24px 60px' }}>
        {/* Tabs */}
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #E8ECF4', padding: '6px', display: 'flex', gap: 4, marginBottom: 24, overflowX: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '8px 18px', borderRadius: 12, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              background: activeTab === tab ? 'var(--color-primary)' : 'transparent',
              color: activeTab === tab ? '#fff' : '#6B7280',
              fontWeight: 600, fontSize: 13, transition: 'all 0.2s',
            }}>{tab}</button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Upcoming' && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0D1421', margin: '0 0 16px' }}>Upcoming Appointments</h2>
            {MOCK_UPCOMING.map(apt => (
              <div key={apt.id} style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24, marginBottom: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>📅</div>
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: '#0D1421' }}>{apt.treatment}</span>
                        <Badge color="green">Confirmed</Badge>
                      </div>
                      <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>with {apt.therapist} · {apt.type}</div>
                      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#4A5568' }}>
                        <span>📅 {new Date(apt.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span>🕐 {apt.time}</span>
                        <span>📍 Koramangala Clinic</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-primary)' }}>{formatPrice(apt.fee)}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid #E8ECF4', background: '#fff', color: '#4A5568', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Reschedule</button>
                      <button style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid #FEE2E2', background: '#FEF2F2', color: '#DC2626', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 16, padding: '14px 16px', background: '#F0FDF4', borderRadius: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 16 }}>💡</span>
                  <span style={{ fontSize: 12, color: '#065F46', fontWeight: 600 }}>Reminder: Please bring your ID and previous MRI reports. Wear comfortable clothing.</span>
                </div>
              </div>
            ))}
            <div style={{ background: 'linear-gradient(135deg,#EFF6FF,#F0FDF4)', borderRadius: 20, padding: 24, textAlign: 'center', border: '2px dashed #BFDBFE' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>➕</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0D1421', marginBottom: 6 }}>Need another session?</div>
              <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 16px' }}>Book a follow-up or start a new treatment</p>
              <a href="/book" style={{ display: 'inline-block', padding: '10px 24px', background: 'var(--color-primary)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>Book Now</a>
            </div>
          </div>
        )}

        {activeTab === 'History' && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0D1421', margin: '0 0 16px' }}>Session History</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {MOCK_SESSIONS.map(session => (
                <div key={session.id} style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, background: '#EFF6FF', color: 'var(--color-primary)', padding: '3px 10px', borderRadius: 999 }}>Session {session.session}</span>
                        <Badge color="green">Completed</Badge>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#0D1421' }}>{session.treatment}</div>
                      <div style={{ fontSize: 12, color: '#8896A8' }}>with {session.therapist} · {new Date(session.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: '#8896A8', fontWeight: 600, marginBottom: 2 }}>Pain</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: session.painScore > 6 ? '#DC2626' : session.painScore > 3 ? '#F59E0B' : 'var(--color-accent)' }}>{session.painScore}/10</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: '#8896A8', fontWeight: 600, marginBottom: 2 }}>Mobility</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-accent)' }}>{session.mobilityScore}%</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: '#8896A8', fontWeight: 600, marginBottom: 2 }}>Progress</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-primary)' }}>{session.progress}%</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: '#FAFBFF', borderRadius: 14, padding: 16, marginBottom: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 6 }}>Therapist Notes</div>
                    <div style={{ fontSize: 13, color: '#0D1421', lineHeight: 1.6 }}>{session.notes}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 8 }}>Home Exercise Program</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {session.exercises.map(ex => (
                        <span key={ex} style={{ background: '#EFF6FF', color: 'var(--color-primary)', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999 }}>💪 {ex}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Recovery' && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0D1421', margin: '0 0 16px' }}>Recovery Progress</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0D1421', marginBottom: 16 }}>Overall Recovery</div>
                <div style={{ position: 'relative', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 120 120" style={{ width: 140, height: 140, transform: 'rotate(-90deg)' }}>
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#F1F5F9" strokeWidth="12" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-primary)" strokeWidth="12" strokeDasharray={`${2 * Math.PI * 50 * 0.58} ${2 * Math.PI * 50}`} strokeLinecap="round" />
                  </svg>
                  <div style={{ position: 'absolute', textAlign: 'center' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-primary)' }}>58%</div>
                    <div style={{ fontSize: 10, color: '#8896A8', fontWeight: 600 }}>Recovered</div>
                  </div>
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0D1421', marginBottom: 16 }}>Recovery Metrics</div>
                {[
                  { label: 'Pain Reduction', from: 8, to: 4, pct: 50, color: 'var(--color-accent)' },
                  { label: 'Mobility', from: 40, to: 70, pct: 70, color: 'var(--color-primary)' },
                  { label: 'Strength', from: 0, to: 45, pct: 45, color: '#7C3AED' },
                ].map(m => (
                  <div key={m.label} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                      <span style={{ fontWeight: 600, color: '#4A5568' }}>{m.label}</span>
                      <span style={{ fontWeight: 700, color: m.color }}>{m.pct}%</span>
                    </div>
                    <div style={{ height: 8, background: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${m.pct}%`, background: m.color, borderRadius: 99, transition: 'width 1s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0D1421', marginBottom: 20 }}>Session Progress Timeline</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {MOCK_SESSIONS.map((s, i) => (
                  <div key={s.id} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', paddingBottom: i < MOCK_SESSIONS.length - 1 ? 20 : 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#EFF6FF', border: '3px solid var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: 'var(--color-primary)' }}>{s.session}</div>
                      {i < MOCK_SESSIONS.length - 1 && <div style={{ width: 2, height: 20, background: '#E8ECF4', marginTop: 4 }} />}
                    </div>
                    <div style={{ background: '#FAFBFF', borderRadius: 14, padding: '14px 18px', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0D1421' }}>Session {s.session} — {new Date(s.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary)' }}>{s.progress}% recovered</span>
                      </div>
                      <div style={{ height: 4, background: '#E8ECF4', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${s.progress}%`, background: 'linear-gradient(90deg,var(--color-primary),var(--color-accent))', borderRadius: 99 }} />
                      </div>
                      <div style={{ fontSize: 11, color: '#8896A8', marginTop: 6 }}>Pain: {s.painScore}/10 → Mobility: {s.mobilityScore}%</div>
                    </div>
                  </div>
                ))}
                {/* Upcoming */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', paddingTop: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F1F5F9', border: '3px dashed #E8ECF4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#8896A8', flexShrink: 0 }}>4</div>
                  <div style={{ background: '#F8FAFF', borderRadius: 14, padding: '14px 18px', flex: 1, border: '2px dashed #E8ECF4' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#8896A8' }}>Session 4 — Upcoming</div>
                    <div style={{ fontSize: 11, color: '#8896A8', marginTop: 4 }}>Jul 25, 2026 · 10:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Exercises' && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0D1421', margin: '0 0 16px' }}>Your Exercise Programme</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
              {[
                { name: 'Pelvic Tilts', sets: '3 × 15', freq: 'Daily', icon: '🔄', color: '#EFF6FF', done: true },
                { name: 'Cat-Cow Stretch', sets: '3 × 10', freq: 'Daily', icon: '🐱', color: '#F0FDF4', done: true },
                { name: 'Bird-Dog', sets: '3 × 12', freq: 'Daily', icon: '🦅', color: '#FFF7ED', done: false },
                { name: 'Dead Bug', sets: '3 × 10', freq: 'Every other day', icon: '🐛', color: '#F5F3FF', done: false },
                { name: 'Hip Hinge', sets: '3 × 15', freq: 'Daily', icon: '🏋️', color: '#FFF1F2', done: true },
                { name: "McGill's Big 3", sets: '3 × 30s', freq: 'Daily', icon: '💪', color: '#ECFDF5', done: false },
              ].map(ex => (
                <div key={ex.name} style={{ background: '#fff', borderRadius: 18, border: `2px solid ${ex.done ? 'var(--color-accent-light)' : '#E8ECF4'}`, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: ex.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{ex.icon}</div>
                    <span style={{ fontSize: 11, fontWeight: 700, background: ex.done ? 'var(--color-accent-light)' : '#F1F5F9', color: ex.done ? '#065F46' : '#8896A8', padding: '3px 10px', borderRadius: 999 }}>
                      {ex.done ? '✓ Done today' : 'To do'}
                    </span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0D1421', marginBottom: 4 }}>{ex.name}</div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>{ex.sets} · {ex.freq}</div>
                  <button style={{ width: '100%', padding: '8px 0', borderRadius: 10, border: 'none', background: ex.done ? '#F0FDF4' : 'var(--color-primary)', color: ex.done ? 'var(--color-accent-hover)' : '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                    {ex.done ? '✓ Completed' : 'Mark as Done'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Invoices' && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0D1421', margin: '0 0 16px' }}>Invoices & Payments</h2>
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1fr', gap: 0, background: '#F8FAFF', padding: '12px 20px', borderBottom: '1px solid #E8ECF4' }}>
                {['Invoice', 'Treatment', 'Therapist', 'Date', 'Amount'].map(h => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 700, color: '#8896A8', letterSpacing: '0.05em' }}>{h}</div>
                ))}
              </div>
              {MOCK_INVOICES.map(inv => (
                <div key={inv.id} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1fr', gap: 0, padding: '16px 20px', borderBottom: '1px solid #F9FAFB', alignItems: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary)' }}>{inv.id}</div>
                  <div style={{ fontSize: 13, color: '#0D1421', fontWeight: 600 }}>{inv.treatment}</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{inv.therapist}</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{new Date(inv.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#0D1421' }}>{formatPrice(inv.amount)}</span>
                    <Badge color="green">Paid</Badge>
                  </div>
                </div>
              ))}
              <div style={{ padding: '16px 20px', background: '#F8FAFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0D1421' }}>Total Paid</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-primary)' }}>{formatPrice(MOCK_INVOICES.reduce((a, b) => a + b.amount, 0))}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Messages' && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0D1421', margin: '0 0 16px' }}>Messages from Your Therapist</h2>
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { from: 'Dr. Sarah Jenkins', time: '2 days ago', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80', msg: 'Hi Rahul! Great work in your last session. Your lumbar flexion has improved significantly. Keep doing the pelvic tilts daily — they are making a real difference! See you on the 25th. 💪' },
                  { from: 'Healing Motion Team', time: '5 days ago', avatar: '', msg: '🔔 Appointment Reminder: Your session with Dr. Sarah Jenkins is on 25 July at 10:00 AM. Please arrive 10 minutes early and bring comfortable clothing.' },
                ].map((msg, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    {msg.avatar ? (
                      <img src={msg.avatar} alt={msg.from} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🏥</div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0D1421' }}>{msg.from}</span>
                        <span style={{ fontSize: 11, color: '#8896A8' }}>{msg.time}</span>
                      </div>
                      <div style={{ background: '#F8FAFF', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#4A5568', lineHeight: 1.6 }}>{msg.msg}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
                <input placeholder="Type a message..." style={{ flex: 1, padding: '10px 16px', borderRadius: 12, border: '1.5px solid #E8ECF4', fontSize: 13, outline: 'none', background: '#FAFBFF' }} />
                <button style={{ padding: '10px 20px', borderRadius: 12, background: 'var(--color-primary)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Send →</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Reports' && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0D1421', margin: '0 0 16px' }}>Medical Reports</h2>
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24 }}>
              {[
                { name: 'Lumbar MRI Report', date: 'Jun 10, 2026', size: '3.2 MB', type: 'MRI', icon: '🧲' },
                { name: 'X-Ray — Lumbar Spine', date: 'Jun 10, 2026', size: '1.8 MB', type: 'X-Ray', icon: '☢️' },
                { name: 'Referral Letter — Dr. Mehta', date: 'Jun 12, 2026', size: '0.4 MB', type: 'PDF', icon: '📄' },
              ].map(r => (
                <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #F9FAFB' }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{r.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0D1421' }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: '#8896A8' }}>{r.date} · {r.size} · {r.type}</div>
                    </div>
                  </div>
                  <button style={{ padding: '6px 14px', borderRadius: 10, border: '1px solid #E8ECF4', background: '#fff', color: 'var(--color-primary)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Download</button>
                </div>
              ))}
              <div style={{ marginTop: 20, border: '2px dashed #BFDBFE', borderRadius: 14, padding: 20, textAlign: 'center', background: '#F8FAFF', cursor: 'pointer' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>📎</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-primary)' }}>Upload new report</div>
                <div style={{ fontSize: 11, color: '#8896A8' }}>PDF, JPG, PNG, DICOM — max 10MB</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

