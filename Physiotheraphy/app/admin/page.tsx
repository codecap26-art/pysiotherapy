'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SPECIALISTS, TREATMENTS, formatPrice } from '@/lib/bookingData';

const TABS = ['Overview', 'Appointments', 'Specialists', 'Revenue', 'Settings'];

const allAppointments = [
  { id: 'HM-2026-04821', patient: 'Rahul Sharma', therapist: 'Dr. Sarah Jenkins', treatment: 'Back Pain Therapy', date: '2026-07-25', time: '10:00 AM', status: 'confirmed', fee: 1000 },
  { id: 'HM-2026-04820', patient: 'Priya Mehta', therapist: 'Dr. Sarah Jenkins', treatment: 'Knee Rehabilitation', date: '2026-07-25', time: '10:00 AM', status: 'confirmed', fee: 1700 },
  { id: 'HM-2026-04819', patient: 'Arjun Nair', therapist: 'Dr. Elena Rodriguez', treatment: 'ACL Rehabilitation', date: '2026-07-24', time: '11:00 AM', status: 'completed', fee: 2500 },
  { id: 'HM-2026-04818', patient: 'Kavitha Reddy', therapist: 'Marcus Thorne', treatment: 'Stroke Rehabilitation', date: '2026-07-24', time: '2:00 PM', status: 'completed', fee: 2200 },
  { id: 'HM-2026-04817', patient: 'Suresh Patel', therapist: 'David Chen', treatment: 'Sciatica Treatment', date: '2026-07-23', time: '3:30 PM', status: 'cancelled', fee: 1400 },
  { id: 'HM-2026-04816', patient: 'Deepika Singh', therapist: 'Jessica Wong', treatment: "Women's Health Physio", date: '2026-07-23', time: '4:00 PM', status: 'pending', fee: 1500 },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  confirmed: { bg: 'var(--color-primary-muted)', text: '#1E40AF' },
  completed: { bg: 'var(--color-accent-light)', text: '#065F46' },
  cancelled: { bg: '#FEE2E2', text: '#991B1B' },
  pending: { bg: '#FEF3C7', text: '#92400E' },
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalRevenue = allAppointments.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.fee, 0);
  const pending = allAppointments.filter(a => a.status === 'pending').length;
  const confirmed = allAppointments.filter(a => a.status === 'confirmed').length;
  const completed = allAppointments.filter(a => a.status === 'completed').length;

  const filtered = allAppointments.filter(a =>
    a.patient.toLowerCase().includes(search.toLowerCase()) ||
    a.therapist.toLowerCase().includes(search.toLowerCase()) ||
    a.treatment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#FAFBFF', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E3A5F)', padding: '36px 24px 52px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: '0 0 6px', fontWeight: 600, letterSpacing: '0.1em' }}>HEALING MOTION · ADMIN</p>
              <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: '-0.03em' }}>Admin Dashboard</h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', margin: '6px 0 0', fontSize: 13 }}>
                {mounted ? new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Loading date...'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                📊 Export Report
              </button>
              <button style={{ padding: '10px 20px', borderRadius: 12, border: 'none', background: 'var(--color-primary)', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                + Add Specialist
              </button>
            </div>
          </div>
          {/* KPI Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 14, marginTop: 28 }}>
            {[
              { icon: '💰', label: 'Total Revenue', value: formatPrice(totalRevenue), color: 'var(--color-accent)' },
              { icon: '📅', label: 'Total Bookings', value: String(allAppointments.length), color: 'var(--color-primary)' },
              { icon: '✅', label: 'Completed', value: String(completed), color: 'var(--color-accent)' },
              { icon: '⏳', label: 'Pending', value: String(pending), color: '#F59E0B' },
              { icon: '🔵', label: 'Confirmed', value: String(confirmed), color: 'var(--color-primary)' },
              { icon: '👥', label: 'Specialists', value: String(SPECIALISTS.length), color: '#7C3AED' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', borderRadius: 16, padding: '16px 18px', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '-20px auto 0', padding: '0 24px 60px' }}>
        {/* Tabs */}
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #E8ECF4', padding: '6px', display: 'flex', gap: 4, marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '8px 20px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: activeTab === tab ? '#0F172A' : 'transparent',
              color: activeTab === tab ? '#fff' : '#6B7280',
              fontWeight: 600, fontSize: 13, transition: 'all 0.2s',
            }}>{tab}</button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
              {/* Recent appointments */}
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0D1421', marginBottom: 16 }}>Recent Appointments</div>
                {allAppointments.slice(0, 5).map(apt => {
                  const sc = statusColors[apt.status];
                  return (
                    <div key={apt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F9FAFB' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#0D1421' }}>{apt.patient}</div>
                        <div style={{ fontSize: 11, color: '#8896A8' }}>{apt.treatment} · {apt.therapist}</div>
                        <div style={{ fontSize: 11, color: '#8896A8' }}>{apt.date} · {apt.time}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#0D1421' }}>{formatPrice(apt.fee)}</span>
                        <span style={{ background: sc.bg, color: sc.text, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>{apt.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Specialist summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0D1421', marginBottom: 16 }}>Active Specialists</div>
                  {SPECIALISTS.slice(0, 4).map(s => (
                    <div key={s.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F9FAFB' }}>
                      <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0 }}>
                        <Image src={s.image} alt={s.name} fill style={{ borderRadius: '50%', objectFit: 'cover' }} sizes="36px" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#0D1421' }}>{s.name}</div>
                        <div style={{ fontSize: 10, color: '#8896A8' }}>{s.specializations[0]}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#F59E0B' }}>⭐ {s.rating}</div>
                        <div style={{ fontSize: 10, color: '#8896A8' }}>{s.reviews} reviews</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'linear-gradient(135deg,#EFF6FF,#F0FDF4)', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0D1421', marginBottom: 12 }}>Quick Actions</div>
                  {[
                    { label: 'Approve Pending', icon: '✅', color: 'var(--color-accent)' },
                    { label: 'Manage Holidays', icon: '📅', color: 'var(--color-primary)' },
                    { label: 'Configure Pricing', icon: '💰', color: '#7C3AED' },
                    { label: 'Send Reminders', icon: '🔔', color: '#F59E0B' },
                  ].map(a => (
                    <button key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid #E8ECF4', background: '#fff', cursor: 'pointer', marginBottom: 8, fontSize: 13, fontWeight: 600, color: '#0D1421' }}>
                      <span style={{ fontSize: 16 }}>{a.icon}</span> {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0D1421', margin: 0 }}>All Appointments</h2>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patient, therapist, treatment..."
                style={{ padding: '8px 16px', borderRadius: 12, border: '1.5px solid #E8ECF4', fontSize: 13, outline: 'none', width: 280 }} />
            </div>
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1.5fr 1fr 1fr 1fr 0.8fr', background: '#F8FAFF', padding: '12px 20px', borderBottom: '1px solid #E8ECF4' }}>
                {['Booking ID', 'Patient', 'Treatment', 'Therapist', 'Date', 'Fee', 'Status'].map(h => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#8896A8', letterSpacing: '0.05em' }}>{h}</div>
                ))}
              </div>
              {filtered.map(apt => {
                const sc = statusColors[apt.status];
                return (
                  <div key={apt.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1.5fr 1fr 1fr 1fr 0.8fr', padding: '14px 20px', borderBottom: '1px solid #F9FAFB', alignItems: 'center' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-primary)' }}>{apt.id}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#0D1421' }}>{apt.patient}</div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>{apt.treatment}</div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>{apt.therapist.split(' ').slice(-1)[0]}</div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>{apt.date}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#0D1421' }}>{formatPrice(apt.fee)}</div>
                    <span style={{ background: sc.bg, color: sc.text, fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 999, textTransform: 'capitalize' }}>{apt.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'Specialists' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0D1421', margin: 0 }}>Manage Specialists</h2>
              <button style={{ padding: '10px 20px', borderRadius: 12, border: 'none', background: 'var(--color-primary)', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>+ Add Specialist</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 16 }}>
              {SPECIALISTS.map(s => (
                <div key={s.id} style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 20 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{ position: 'relative', width: 56, height: 56 }}>
                      <Image src={s.image} alt={s.name} fill style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid #EFF6FF' }} sizes="56px" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#0D1421' }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: '#8896A8', fontWeight: 600 }}>{s.title}</div>
                      <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                        {s.specializations.slice(0, 2).map(spec => (
                          <span key={spec} style={{ fontSize: 9, fontWeight: 700, color: '#7C3AED', background: '#F5F3FF', padding: '2px 7px', borderRadius: 999 }}>{spec}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#F59E0B' }}>⭐ {s.rating}</div>
                      <div style={{ fontSize: 10, color: '#8896A8' }}>{s.reviews} reviews</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                    {[
                      { l: 'Experience', v: `${s.experience} years` },
                      { l: 'Next Available', v: s.nextAvailable },
                    ].map(r => (
                      <div key={r.l} style={{ background: '#F8FAFF', borderRadius: 10, padding: '8px 10px' }}>
                        <div style={{ fontSize: 9, color: '#8896A8', fontWeight: 600, marginBottom: 2 }}>{r.l}</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#0D1421' }}>{r.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: '#8896A8', marginBottom: 14 }}>
                    🗓 Available: {s.availability.join(', ')}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: '1px solid #E8ECF4', background: '#fff', color: '#4A5568', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>✏️ Edit</button>
                    <button style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', background: '#EFF6FF', color: 'var(--color-primary)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>📅 Availability</button>
                    <button style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', background: '#FEF2F2', color: '#DC2626', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>🗑 Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Revenue' && (
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0D1421', margin: '0 0 20px' }}>Revenue Analytics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'Total Revenue (July)', value: formatPrice(47800), trend: '+18% vs June', color: 'var(--color-accent)' },
                { label: 'Avg Booking Value', value: formatPrice(1590), trend: '+5% vs June', color: 'var(--color-primary)' },
                { label: 'Revenue / Specialist', value: formatPrice(7967), trend: 'Best: Dr. Rodriguez', color: '#7C3AED' },
                { label: 'Outstanding', value: formatPrice(2500), trend: '2 pending invoices', color: '#F59E0B' },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', borderRadius: 18, border: '1px solid #E8ECF4', padding: 20 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#4A5568', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-accent)', fontWeight: 600 }}>{s.trend}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0D1421', marginBottom: 20 }}>Revenue by Specialist</div>
                {[
                  { name: 'Dr. Elena Rodriguez', revenue: 12500, pct: 100 },
                  { name: 'Dr. Sarah Jenkins', revenue: 10800, pct: 86 },
                  { name: 'Dr. James Carter', revenue: 8200, pct: 66 },
                  { name: 'Marcus Thorne', revenue: 7400, pct: 59 },
                  { name: 'David Chen', revenue: 5600, pct: 45 },
                  { name: 'Jessica Wong', revenue: 3300, pct: 26 },
                ].map(r => (
                  <div key={r.name} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 12 }}>
                      <span style={{ fontWeight: 600, color: '#4A5568' }}>{r.name}</span>
                      <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{formatPrice(r.revenue)}</span>
                    </div>
                    <div style={{ height: 8, background: '#F1F5F9', borderRadius: 99 }}>
                      <div style={{ height: '100%', width: `${r.pct}%`, background: 'linear-gradient(90deg,var(--color-primary),var(--color-accent))', borderRadius: 99 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0D1421', marginBottom: 20 }}>Revenue by Treatment</div>
                {[
                  { name: 'ACL Rehabilitation', revenue: 11200, pct: 100 },
                  { name: 'Knee Rehabilitation', revenue: 8600, pct: 77 },
                  { name: 'Post-Surgery Rehab', revenue: 7400, pct: 66 },
                  { name: 'Stroke Rehabilitation', revenue: 6800, pct: 61 },
                  { name: 'Back Pain Therapy', revenue: 5600, pct: 50 },
                  { name: 'Sports Injury', revenue: 4200, pct: 38 },
                ].map(r => (
                  <div key={r.name} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 12 }}>
                      <span style={{ fontWeight: 600, color: '#4A5568' }}>{r.name}</span>
                      <span style={{ fontWeight: 800, color: '#7C3AED' }}>{formatPrice(r.revenue)}</span>
                    </div>
                    <div style={{ height: 8, background: '#F1F5F9', borderRadius: 99 }}>
                      <div style={{ height: '100%', width: `${r.pct}%`, background: 'linear-gradient(90deg,#7C3AED,var(--color-primary))', borderRadius: 99 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0D1421', margin: '0 0 20px' }}>System Settings</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { title: 'Clinic Information', icon: '🏥', fields: ['Clinic Name', 'Address', 'Phone', 'Email', 'GST Number'] },
                { title: 'Appointment Settings', icon: '📅', fields: ['Slot Duration (min)', 'Buffer Time (min)', 'Max Advance Booking (days)', 'Cancellation Policy', 'Reminder Lead Time'] },
                { title: 'Payment Settings', icon: '💰', fields: ['Currency', 'GST Rate (%)', 'Payment Methods', 'Invoice Footer Text', 'Late Payment Fee'] },
                { title: 'Notification Settings', icon: '🔔', fields: ['Email Notifications', 'SMS Notifications', 'WhatsApp', 'Booking Reminder (24hr)', 'Booking Reminder (2hr)'] },
              ].map(section => (
                <div key={section.title} style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
                    <span style={{ fontSize: 20 }}>{section.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0D1421' }}>{section.title}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {section.fields.map(field => (
                      <div key={field}>
                        <label style={{ fontSize: 11, fontWeight: 600, color: '#8896A8', display: 'block', marginBottom: 4 }}>{field}</label>
                        <input placeholder={`Enter ${field.toLowerCase()}...`} style={{ width: '100%', padding: '8px 12px', borderRadius: 10, border: '1.5px solid #E8ECF4', fontSize: 12, outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    ))}
                  </div>
                  <button style={{ marginTop: 16, width: '100%', padding: '10px 0', borderRadius: 12, border: 'none', background: 'var(--color-primary)', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Save Settings</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

