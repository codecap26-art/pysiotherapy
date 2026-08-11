// ─────────────────────────────────────────────────────────────────────────────
// lib/db.ts  —  Client-side Persistent Database Engine for Healing Motion
// ─────────────────────────────────────────────────────────────────────────────

import { User } from './authData';
import { CLINIC_BRANCHES, ClinicBranch } from './clinicData';
import { SPECIALISTS, TREATMENTS } from './bookingData';

export interface DBAppointment {
  id: string;
  bookingRef: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge: number;
  patientGender: string;
  specialistId: string;
  specialistName: string;
  specialistTitle: string;
  specialistImage: string;
  treatmentId: string;
  treatmentName: string;
  treatmentCategory: string;
  clinicId: string;
  clinicName: string;
  clinicAddress: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM"
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  fee: number;
  tax: number;
  totalAmount: number;
  appointmentType: 'in-clinic' | 'home' | 'online';
  painLevel: number; // 1 to 10
  painDuration: string;
  reasonForVisit: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DBClinicalNote {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  symptomsObserved: string;
  treatmentAdministered: string;
  exercisesPrescribed: Array<{
    name: string;
    sets: string;
    reps: string;
    frequency: string;
    notes: string;
  }>;
  recoveryProgress: number; // 0 to 100%
  nextFollowUpDate: string;
  createdAt: string;
}

export interface DBNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'reminder' | 'clinical' | 'system';
  link?: string;
  read: boolean;
  createdAt: string;
}

// ── Initial Seed Data ────────────────────────────────────────────────────────

const INITIAL_APPOINTMENTS: DBAppointment[] = [
  {
    id: 'apt-001',
    bookingRef: 'HM-2026-04821',
    patientId: 'usr-001',
    patientName: 'Rahul Sharma',
    patientPhone: '+91 98765 43210',
    patientEmail: 'rahul@demo.com',
    patientAge: 32,
    patientGender: 'male',
    specialistId: 'sarah-jenkins',
    specialistName: 'Dr. Sarah Jenkins',
    specialistTitle: 'Chief of Physiotherapy & Sports Rehab',
    specialistImage: 'https://images.unsplash.com/photo-1594824813620-21a50a6bf1cf?auto=format&fit=crop&q=80&w=400',
    treatmentId: 'back-pain',
    treatmentName: 'Lower Back & Lumbar Spine Therapy',
    treatmentCategory: 'Spine & Posture Care',
    clinicId: 'clinic-indiranagar',
    clinicName: 'Indiranagar Flagship Centre',
    clinicAddress: '842, 100 Feet Rd, HAL 2nd Stage, Indiranagar',
    date: '2026-08-12',
    timeSlot: '10:00 AM',
    status: 'confirmed',
    fee: 1500,
    tax: 270,
    totalAmount: 1770,
    appointmentType: 'in-clinic',
    painLevel: 6,
    painDuration: '1 - 3 months',
    reasonForVisit: 'Persistent lumbar discomfort after sitting long hours at desk',
    notes: 'Prior MRI shows mild L4-L5 bulge.',
    createdAt: '2026-08-01T10:30:00Z',
    updatedAt: '2026-08-01T10:30:00Z',
  },
  {
    id: 'apt-002',
    bookingRef: 'HM-2026-03912',
    patientId: 'usr-001',
    patientName: 'Rahul Sharma',
    patientPhone: '+91 98765 43210',
    patientEmail: 'rahul@demo.com',
    patientAge: 32,
    patientGender: 'male',
    specialistId: 'sarah-jenkins',
    specialistName: 'Dr. Sarah Jenkins',
    specialistTitle: 'Chief of Physiotherapy & Sports Rehab',
    specialistImage: 'https://images.unsplash.com/photo-1594824813620-21a50a6bf1cf?auto=format&fit=crop&q=80&w=400',
    treatmentId: 'back-pain',
    treatmentName: 'Lower Back & Lumbar Spine Therapy',
    treatmentCategory: 'Spine & Posture Care',
    clinicId: 'clinic-indiranagar',
    clinicName: 'Indiranagar Flagship Centre',
    clinicAddress: '842, 100 Feet Rd, HAL 2nd Stage, Indiranagar',
    date: '2026-07-28',
    timeSlot: '11:00 AM',
    status: 'completed',
    fee: 1500,
    tax: 270,
    totalAmount: 1770,
    appointmentType: 'in-clinic',
    painLevel: 7,
    painDuration: '1 - 3 months',
    reasonForVisit: 'Initial diagnosis and spinal manual therapy',
    notes: 'Mobilization performed. Recommended daily core activations.',
    createdAt: '2026-07-25T09:00:00Z',
    updatedAt: '2026-07-28T12:00:00Z',
  },
  {
    id: 'apt-003',
    bookingRef: 'HM-2026-03204',
    patientId: 'usr-001',
    patientName: 'Rahul Sharma',
    patientPhone: '+91 98765 43210',
    patientEmail: 'rahul@demo.com',
    patientAge: 32,
    patientGender: 'male',
    specialistId: 'elena-rodriguez',
    specialistName: 'Dr. Elena Rodriguez',
    specialistTitle: 'Senior Sports & ACL Specialist',
    specialistImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    treatmentId: 'knee-rehab',
    treatmentName: 'Knee Joint & Ligament Rehabilitation',
    treatmentCategory: 'Sports Rehabilitation',
    clinicId: 'clinic-koramangala',
    clinicName: 'Koramangala Sports & Rehab Hub',
    clinicAddress: '4th Block, 80 Feet Road, Koramangala',
    date: '2026-07-15',
    timeSlot: '04:30 PM',
    status: 'completed',
    fee: 1800,
    tax: 324,
    totalAmount: 2124,
    appointmentType: 'in-clinic',
    painLevel: 4,
    painDuration: 'Over 6 months',
    reasonForVisit: 'Right knee patellofemoral tracking assessment',
    notes: 'Good progress with VMO strengthening.',
    createdAt: '2026-07-10T14:20:00Z',
    updatedAt: '2026-07-15T17:30:00Z',
  },
  {
    id: 'apt-004',
    bookingRef: 'HM-2026-05001',
    patientId: 'usr-002',
    patientName: 'Priya Mehta',
    patientPhone: '+91 98111 22334',
    patientEmail: 'priya.m@example.com',
    patientAge: 29,
    patientGender: 'female',
    specialistId: 'sarah-jenkins',
    specialistName: 'Dr. Sarah Jenkins',
    specialistTitle: 'Chief of Physiotherapy & Sports Rehab',
    specialistImage: 'https://images.unsplash.com/photo-1594824813620-21a50a6bf1cf?auto=format&fit=crop&q=80&w=400',
    treatmentId: 'neck-pain',
    treatmentName: 'Cervical Spine & Postural Correction',
    treatmentCategory: 'Spine & Posture Care',
    clinicId: 'clinic-indiranagar',
    clinicName: 'Indiranagar Flagship Centre',
    clinicAddress: '842, 100 Feet Rd, HAL 2nd Stage, Indiranagar',
    date: '2026-08-10',
    timeSlot: '02:00 PM',
    status: 'confirmed',
    fee: 1400,
    tax: 252,
    totalAmount: 1652,
    appointmentType: 'in-clinic',
    painLevel: 5,
    painDuration: '2 - 4 weeks',
    reasonForVisit: 'Tech neck and upper trapezius stiffness',
    createdAt: '2026-08-05T11:00:00Z',
    updatedAt: '2026-08-05T11:00:00Z',
  },
  {
    id: 'apt-005',
    bookingRef: 'HM-2026-05018',
    patientId: 'usr-003',
    patientName: 'Arjun Nair',
    patientPhone: '+91 98450 99887',
    patientEmail: 'arjun.nair@example.com',
    patientAge: 26,
    patientGender: 'male',
    specialistId: 'sarah-jenkins',
    specialistName: 'Dr. Sarah Jenkins',
    specialistTitle: 'Chief of Physiotherapy & Sports Rehab',
    specialistImage: 'https://images.unsplash.com/photo-1594824813620-21a50a6bf1cf?auto=format&fit=crop&q=80&w=400',
    treatmentId: 'sports-injury',
    treatmentName: 'Advanced Athletic Recovery & Screening',
    treatmentCategory: 'Sports Rehabilitation',
    clinicId: 'clinic-indiranagar',
    clinicName: 'Indiranagar Flagship Centre',
    clinicAddress: '842, 100 Feet Rd, HAL 2nd Stage, Indiranagar',
    date: '2026-08-10',
    timeSlot: '03:30 PM',
    status: 'pending',
    fee: 2000,
    tax: 360,
    totalAmount: 2360,
    appointmentType: 'in-clinic',
    painLevel: 8,
    painDuration: '< 1 week',
    reasonForVisit: 'Acute hamstring strain during football match',
    createdAt: '2026-08-07T16:45:00Z',
    updatedAt: '2026-08-07T16:45:00Z',
  },
];

const INITIAL_CLINICAL_NOTES: DBClinicalNote[] = [
  {
    id: 'note-001',
    appointmentId: 'apt-002',
    patientId: 'usr-001',
    doctorId: 'sarah-jenkins',
    doctorName: 'Dr. Sarah Jenkins',
    date: '2026-07-28',
    diagnosis: 'Lumbar Strain with mild radicular irritation without neurological deficits.',
    symptomsObserved: 'Tenderness at L4-L5 paraspinal region. Restricted lumbar flexion (40 deg) with pain.',
    treatmentAdministered: 'Grade II Lumbar Mobilization, Ultrasound therapy 1.5W/cm2 for 8 mins, dry needling to gluteus medius.',
    exercisesPrescribed: [
      { name: 'Cat-Camel Stretch', sets: '2 sets', reps: '10 reps', frequency: 'Twice daily', notes: 'Move within pain-free range' },
      { name: 'Bird Dog Activation', sets: '3 sets', reps: '8 reps per side', frequency: 'Once daily', notes: 'Hold 3s at top, keep pelvis neutral' },
      { name: 'Glute Bridge with Resistance Band', sets: '3 sets', reps: '12 reps', frequency: 'Daily', notes: 'Squeeze glutes at top' },
    ],
    recoveryProgress: 65,
    nextFollowUpDate: '2026-08-12',
    createdAt: '2026-07-28T12:15:00Z',
  },
];

const INITIAL_NOTIFICATIONS: DBNotification[] = [
  {
    id: 'notif-001',
    userId: 'usr-001',
    title: 'Upcoming Appointment Confirmed',
    message: 'Your session with Dr. Sarah Jenkins is scheduled for Wednesday, Aug 12 at 10:00 AM.',
    type: 'booking',
    link: '/dashboard/appointments',
    read: false,
    createdAt: '2026-08-01T10:31:00Z',
  },
  {
    id: 'notif-002',
    userId: 'usr-001',
    title: 'New Clinical Notes Added',
    message: 'Dr. Sarah Jenkins updated your recovery progress (65%) and added 3 home exercise routines.',
    type: 'clinical',
    link: '/dashboard/medical-history',
    read: false,
    createdAt: '2026-07-28T12:20:00Z',
  },
  {
    id: 'notif-003',
    userId: 'usr-doctor-sarah',
    title: 'New Patient Booking Pending',
    message: 'Arjun Nair booked a Sports Injury session for Aug 10, 03:30 PM.',
    type: 'booking',
    link: '/dashboard/therapist',
    read: false,
    createdAt: '2026-08-07T16:45:00Z',
  },
];

// ── Database Helper Functions ────────────────────────────────────────────────

const STORAGE_KEYS = {
  APPOINTMENTS: 'hm-db-appointments',
  CLINICAL_NOTES: 'hm-db-clinical-notes',
  NOTIFICATIONS: 'hm-db-notifications',
};

function getStorage<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw);
  } catch {
    return defaultVal;
  }
}

function setStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing to storage:', e);
  }
}

// ── Exported Database API ───────────────────────────────────────────────────

export const db = {
  // Appointments
  getAppointments(): DBAppointment[] {
    return getStorage<DBAppointment[]>(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
  },

  getAppointmentsByPatient(patientId: string): DBAppointment[] {
    return this.getAppointments().filter((a) => a.patientId === patientId || a.patientEmail === patientId);
  },

  getAppointmentsByDoctor(doctorId: string): DBAppointment[] {
    // Only exact match on specialistId — no fuzzy/hardcoded fallbacks
    return this.getAppointments().filter((a) => a.specialistId === doctorId);
  },

  getAppointmentById(id: string): DBAppointment | undefined {
    return this.getAppointments().find((a) => a.id === id || a.bookingRef === id);
  },

  createAppointment(data: Omit<DBAppointment, 'id' | 'bookingRef' | 'createdAt' | 'updatedAt'>): DBAppointment {
    const appointments = this.getAppointments();
    const randDigits = Math.floor(10000 + Math.random() * 90000);
    const newAppointment: DBAppointment = {
      ...data,
      id: `apt-${Date.now()}`,
      bookingRef: `HM-2026-${randDigits}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newAppointment, ...appointments];
    setStorage(STORAGE_KEYS.APPOINTMENTS, updated);

    // Create confirmation notification for patient
    this.createNotification({
      userId: data.patientId,
      title: 'Appointment Booked Successfully',
      message: `Your booking (${newAppointment.bookingRef}) with ${data.specialistName} on ${data.date} at ${data.timeSlot} is confirmed!`,
      type: 'booking',
      link: '/dashboard/appointments',
    });

    // Create notification for the actual booked doctor using their real specialist ID
    if (data.specialistId) {
      this.createNotification({
        userId: data.specialistId,
        title: 'New Appointment Request',
        message: `${data.patientName} booked ${data.treatmentName} on ${data.date} at ${data.timeSlot}.`,
        type: 'booking',
        link: '/dashboard/therapist',
      });
    }

    return newAppointment;
  },

  updateAppointmentStatus(id: string, status: DBAppointment['status']): DBAppointment | null {
    const appointments = this.getAppointments();
    const idx = appointments.findIndex((a) => a.id === id || a.bookingRef === id);
    if (idx === -1) return null;

    appointments[idx] = {
      ...appointments[idx],
      status,
      updatedAt: new Date().toISOString(),
    };
    setStorage(STORAGE_KEYS.APPOINTMENTS, appointments);

    // Notify patient about status change
    this.createNotification({
      userId: appointments[idx].patientId,
      title: `Appointment ${status.toUpperCase()}`,
      message: `Your appointment with ${appointments[idx].specialistName} on ${appointments[idx].date} has been marked as ${status}.`,
      type: 'booking',
      link: '/dashboard/appointments',
    });

    return appointments[idx];
  },

  rescheduleAppointment(id: string, date: string, timeSlot: string): DBAppointment | null {
    const appointments = this.getAppointments();
    const idx = appointments.findIndex((a) => a.id === id || a.bookingRef === id);
    if (idx === -1) return null;

    appointments[idx] = {
      ...appointments[idx],
      date,
      timeSlot,
      status: 'rescheduled',
      updatedAt: new Date().toISOString(),
    };
    setStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
    return appointments[idx];
  },

  // Clinical Notes
  getClinicalNotes(): DBClinicalNote[] {
    return getStorage<DBClinicalNote[]>(STORAGE_KEYS.CLINICAL_NOTES, INITIAL_CLINICAL_NOTES);
  },

  getClinicalNotesByPatient(patientId: string): DBClinicalNote[] {
    return this.getClinicalNotes().filter((n) => n.patientId === patientId);
  },

  createClinicalNote(data: Omit<DBClinicalNote, 'id' | 'createdAt'>): DBClinicalNote {
    const notes = this.getClinicalNotes();
    const newNote: DBClinicalNote = {
      ...data,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newNote, ...notes];
    setStorage(STORAGE_KEYS.CLINICAL_NOTES, updated);

    // Notify patient
    this.createNotification({
      userId: data.patientId,
      title: 'New Clinical Notes & Exercise Prescribed',
      message: `${data.doctorName} recorded your session notes and assigned ${data.exercisesPrescribed.length} recovery exercises.`,
      type: 'clinical',
      link: '/dashboard/medical-history',
    });

    return newNote;
  },

  // Notifications
  getNotifications(userId?: string): DBNotification[] {
    const notifs = getStorage<DBNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    if (!userId) return notifs;
    // Strict filter — only return this user's own notifications
    return notifs.filter((n) => n.userId === userId);
  },

  createNotification(data: Omit<DBNotification, 'id' | 'read' | 'createdAt'>): DBNotification {
    const notifs = getStorage<DBNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const newNotif: DBNotification = {
      ...data,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [newNotif, ...notifs];
    setStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
    return newNotif;
  },

  markNotificationRead(id: string): void {
    const notifs = this.getNotifications();
    const updated = notifs.map((n) => (n.id === id ? { ...n, read: true } : n));
    setStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  },

  markAllNotificationsRead(userId?: string): void {
    const notifs = this.getNotifications();
    const updated = notifs.map((n) => (!userId || n.userId === userId ? { ...n, read: true } : n));
    setStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  },
};
