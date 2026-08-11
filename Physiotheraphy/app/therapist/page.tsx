'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SPECIALISTS, MOCK_SESSIONS, formatPrice } from '@/lib/bookingData';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { DBAppointment } from '@/lib/db';

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  confirmed: { bg: 'var(--color-accent-light)', text: '#065F46', label: 'Confirmed' },
  'in-progress': { bg: 'var(--color-primary-muted)', text: '#1E40AF', label: 'In Progress' },
  pending: { bg: '#FEF3C7', text: '#92400E', label: 'Pending' },
  break: { bg: '#F3F4F6', text: '#4B5563', label: 'Break' },
  completed: { bg: '#F0FDF4', text: '#166534', label: 'Completed' },
};

const TABS = ['Schedule', 'Patients', 'Notes', 'Analytics'];

export default function TherapistDashboard() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Schedule');
  const [selectedSession, setSelectedSession] = useState<DBAppointment | null>(null);
  const [noteText, setNoteText] = useState('');
  const [mounted, setMounted] = useState(false);
  const [appointments, setAppointments] = useState<DBAppointment[]>([]);

  const specialist = user || SPECIALISTS[0]; // Fallback if not logged in for demo

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch('/api/appointments', {
          headers: {
            'Authorization': `Bearer ${user?.token || ''}`,
          }
        });
        const data = await res.json();
        if (data.success && data.appointments) {
          // Sort by date and time (rough sort for demo)
          const sorted = data.appointments.sort((a: DBAppointment, b: DBAppointment) => {
            if (a.date !== b.date) return a.date.localeCompare(b.date);
            return a.timeSlot.localeCompare(b.timeSlot);
          });
          setAppointments(sorted);
        }
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
      }
    };

    fetchAppointments();
    
    // Poll for real-time updates
    const interval = setInterval(fetchAppointments, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const handleJoinCall = (appointmentId: string) => {
    router.push(`/meet/${appointmentId}`);
  };

  return (
    <div style={{ background: '#FAFBFF', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#0F172A 0%,#1E40AF 100%)', padding: '36px 24px 52px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <img src={specialist.avatar || specialist.image || 'https://images.unsplash.com/photo-1594824813620-21a50a6bf1cf?w=400&q=80'} alt={specialist.name || specialist.firstName} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />
              <div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, margin: '0 0 4px', fontWeight: 600 }}>Therapist Dashboard</p>
                <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 800, margin: 0, letterSpacing: '-0.03em' }}>
                  {specialist.firstName ? `Dr. ${specialist.firstName} ${specialist.lastName}` : specialist.name}
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', margin: '4px 0 0', fontSize: 13 }}>{specialist.qualifications || 'Senior Physiotherapist'}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '8px 16px', color: '#fff', fontSize: 13, fontWeight: 600 }}>
                📅 {mounted ? new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Loading date...'}
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginTop: 28 }}>
            {[
              { icon: '👥', label: "Today's Patients", value: appointments.length.toString() },
              { icon: '✅', label: 'Sessions Done', value: appointments.filter(a => a.status === 'completed').length.toString() },
              { icon: '⏳', label: 'Remaining', value: appointments.filter(a => a.status === 'confirmed').length.toString() },
              { icon: '💰', label: "Total Revenue", value: formatPrice(appointments.reduce((sum, a) => sum + (a.totalAmount || 0), 0)) },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '16px 20px', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '-20px auto 0', padding: '0 24px 60px' }}>
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

        {activeTab === 'Schedule' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
            {/* Schedule list */}
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0D1421', margin: '0 0 14px' }}>Appointments Schedule</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {appointments.length === 0 && (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#6B7280' }}>
                    No appointments booked yet.
                  </div>
                )}
                {appointments.map(session => {
                  const sc = statusConfig[session.status] || statusConfig.pending;
                  return (
                    <div key={session.id} onClick={() => setSelectedSession(session)} style={{
                      background: '#fff', borderRadius: 16, border: `2px solid ${selectedSession?.id === session.id ? 'var(--color-primary)' : '#E8ECF4'}`,
                      padding: '14px 18px', cursor: 'pointer',
                      boxShadow: selectedSession?.id === session.id ? '0 4px 20px rgba(30,111,255,0.12)' : 'none',
                      display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s',
                    }}>
                      <div style={{ width: 64, textAlign: 'center', flexShrink: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#0D1421' }}>{session.timeSlot}</div>
                        <div style={{ fontSize: 10, color: '#8896A8' }}>{session.date}</div>
                      </div>
                      <div style={{ width: 3, height: 36, background: session.status === 'confirmed' ? 'var(--color-accent)' : '#F59E0B', borderRadius: 99, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#0D1421', marginBottom: 2 }}>{session.patientName}</div>
                        <div style={{ fontSize: 11, color: '#6B7280' }}>{session.treatmentName} · {session.appointmentType}</div>
                      </div>
                      <span style={{ background: sc.bg, color: sc.text, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999, flexShrink: 0 }}>{sc.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Session detail panel */}
            <div>
              {selectedSession ? (
                <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8ECF4', padding: 24, position: 'sticky', top: 80 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#0D1421', marginBottom: 4 }}>{selectedSession.patientName}</div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>{selectedSession.treatmentName} · {selectedSession.appointmentType}</div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>🕐 {selectedSession.timeSlot} on {selectedSession.date}</div>
                  </div>
                  
                  {/* Join Video Call Button for Online Consultations */}
                  <div style={{ marginBottom: 20 }}>
                    <button 
                      onClick={() => handleJoinCall(selectedSession.id)}
                      style={{ width: '100%', padding: '12px 0', borderRadius: 12, border: 'none', background: '#1E6FFF', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(30,111,255,0.3)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
                      Join Video Call
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                    {[
                      { label: 'Pain Level', val: `${selectedSession.painLevel}/10`, color: '#F59E0B' },
                      { label: 'Pain Duration', val: selectedSession.painDuration, color: 'var(--color-accent)' },
                    ].map(s => (
                      <div key={s.label} style={{ background: '#F8FAFF', borderRadius: 12, padding: '10px 12px' }}>
                        <div style={{ fontSize: 9, color: '#8896A8', fontWeight: 700, marginBottom: 3 }}>{s.label}</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#4A5568', display: 'block', marginBottom: 8 }}>Session Notes</label>
                    <textarea value={noteText} onChange={e => setNoteText(e.target.value)} rows={4} placeholder="Enter session observations, treatment applied, patient response..."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1.5px solid #E8ECF4', fontSize: 13, resize: 'vertical', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button style={{ flex: 1, padding: '10px 0', borderRadius: 12, border: 'none', background: '#F0FDF4', color: 'var(--color-accent-hover)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>✓ Mark Complete</button>
                    <button style={{ flex: 1, padding: '10px 0', borderRadius: 12, border: 'none', background: 'var(--color-primary)', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Save Notes</button>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#F8FAFF', borderRadius: 20, border: '2px dashed #E8ECF4', padding: 40, textAlign: 'center' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>👆</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#8896A8' }}>Select an appointment to view details</div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'Patients' && (
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0D1421', margin: '0 0 16px' }}>Patient Profiles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {appointments.map(session => (
                <div key={session.id} style={{ background: '#fff', borderRadius: 18, border: '1px solid #E8ECF4', padding: 20 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,var(--color-primary),var(--color-accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#fff', fontWeight: 800 }}>
                      {session.patientName[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0D1421' }}>{session.patientName}</div>
                      <div style={{ fontSize: 11, color: '#8896A8' }}>{session.treatmentName}</div>
                    </div>
                  </div>
                  {[
                    { l: 'Appointment', v: `${session.date} at ${session.timeSlot}` },
                    { l: 'Type', v: session.appointmentType },
                    { l: 'Status', v: session.status },
                  ].map(r => (
                    <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F9FAFB', fontSize: 12 }}>
                      <span style={{ color: '#8896A8', fontWeight: 600 }}>{r.l}</span>
                      <span style={{ color: '#0D1421', fontWeight: 600 }}>{r.v}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                    <button style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: '1px solid #E8ECF4', background: '#fff', color: '#4A5568', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>View History</button>
                    <button style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', background: '#EFF6FF', color: 'var(--color-primary)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Add Note</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Analytics' && (
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0D1421', margin: '0 0 16px' }}>My Performance Analytics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'Total Appointments', val: appointments.length.toString(), icon: '📅', color: 'var(--color-primary)', trend: 'This period' },
                { label: 'Revenue Generated', val: formatPrice(appointments.reduce((sum, a) => sum + (a.totalAmount || 0), 0)), icon: '💰', color: '#F59E0B', trend: 'Total' },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', borderRadius: 18, border: '1px solid #E8ECF4', padding: 20 }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.val}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#4A5568' }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-accent)', marginTop: 4, fontWeight: 600 }}>{s.trend}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Notes' && (
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0D1421', margin: '0 0 16px' }}>Session Notes & Records</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {MOCK_SESSIONS.map(s => (
                <div key={s.id} style={{ background: '#fff', borderRadius: 18, border: '1px solid #E8ECF4', padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0D1421' }}>Rahul Sharma · Session {s.session}</div>
                      <div style={{ fontSize: 12, color: '#8896A8' }}>{s.treatment} · {new Date(s.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 9, color: '#8896A8', fontWeight: 600 }}>PAIN</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#DC2626' }}>{s.painScore}/10</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 9, color: '#8896A8', fontWeight: 600 }}>MOBILITY</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-accent)' }}>{s.mobilityScore}%</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: '#FAFBFF', borderRadius: 12, padding: 14, fontSize: 13, color: '#4A5568', lineHeight: 1.6, marginBottom: 12 }}>{s.notes}</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {s.exercises.map(ex => (
                      <span key={ex} style={{ background: '#EFF6FF', color: 'var(--color-primary)', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999 }}>{ex}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

