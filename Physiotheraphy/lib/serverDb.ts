import fs from 'fs';
import path from 'path';
import { User, DEMO_USERS } from './authData';
import { DBAppointment, DBClinicalNote, DBNotification } from './db';

export interface DatabaseSchema {
  users: (User & { password?: string })[];
  appointments: DBAppointment[];
  clinicalNotes: DBClinicalNote[];
  notifications: DBNotification[];
  lastUpdated: string;
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'database.json');

// ── Initial Seed Data ────────────────────────────────────────────────────────
function getInitialSeedData(): DatabaseSchema {
  const initialAppointments: DBAppointment[] = [
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
      treatmentId: 'neck-pain',
      treatmentName: 'Cervical Spine & Tech-Neck Protocol',
      treatmentCategory: 'Spine & Posture Care',
      clinicId: 'clinic-indiranagar',
      clinicName: 'Indiranagar Flagship Centre',
      clinicAddress: '842, 100 Feet Rd, HAL 2nd Stage, Indiranagar',
      date: '2026-07-20',
      timeSlot: '02:00 PM',
      status: 'completed',
      fee: 1500,
      tax: 270,
      totalAmount: 1770,
      appointmentType: 'in-clinic',
      painLevel: 7,
      painDuration: '> 6 months',
      reasonForVisit: 'Severe neck stiffness and headaches radiating to upper traps',
      notes: 'Manual cervical traction applied. 60% relief post-session.',
      createdAt: '2026-07-15T09:00:00Z',
      updatedAt: '2026-07-20T15:00:00Z',
    },
    {
      id: 'apt-003',
      bookingRef: 'HM-2026-05110',
      patientId: 'usr-002',
      patientName: 'Anita Desai',
      patientPhone: '+91 98111 22334',
      patientEmail: 'anita.desai@example.com',
      patientAge: 45,
      patientGender: 'female',
      specialistId: 'sarah-jenkins',
      specialistName: 'Dr. Sarah Jenkins',
      specialistTitle: 'Chief of Physiotherapy & Sports Rehab',
      specialistImage: 'https://images.unsplash.com/photo-1594824813620-21a50a6bf1cf?auto=format&fit=crop&q=80&w=400',
      treatmentId: 'frozen-shoulder',
      treatmentName: 'Adhesive Capsulitis / Frozen Shoulder Protocol',
      treatmentCategory: 'Orthopedic Rehabilitation',
      clinicId: 'clinic-indiranagar',
      clinicName: 'Indiranagar Flagship Centre',
      clinicAddress: '842, 100 Feet Rd, HAL 2nd Stage, Indiranagar',
      date: '2026-08-14',
      timeSlot: '11:30 AM',
      status: 'pending',
      fee: 1600,
      tax: 288,
      totalAmount: 1888,
      appointmentType: 'in-clinic',
      painLevel: 8,
      painDuration: '3 - 6 months',
      reasonForVisit: 'Limited shoulder abduction and night pain',
      createdAt: '2026-08-05T14:20:00Z',
      updatedAt: '2026-08-05T14:20:00Z',
    },
  ];

  const initialNotes: DBClinicalNote[] = [
    {
      id: 'note-001',
      appointmentId: 'apt-002',
      patientId: 'usr-001',
      doctorId: 'usr-doctor-sarah',
      doctorName: 'Dr. Sarah Jenkins',
      date: '2026-07-20',
      diagnosis: 'Cervicalgia with upper trapezius trigger points and mild C5-C6 facet arthropathy.',
      symptomsObserved: 'Restricted cervical rotation to right (45°), tenderness over suboccipital muscles, posture showing 3cm forward head translation.',
      treatmentAdministered: 'Cervical mobilization Grade II, myofascial release of suboccipital & sternocleidomastoid, therapeutic ultrasound 1.5W/cm².',
      exercisesPrescribed: [
        { name: 'Chin Tucks', sets: '3', reps: '10 reps (5-sec hold)', frequency: '3 times daily', notes: 'Keep eyes level; do not tilt head down' },
        { name: 'Scapular Retractions', sets: '3', reps: '15 reps', frequency: 'Twice daily', notes: 'Squeeze shoulder blades without shrugging' },
        { name: 'Upper Trap Stretch', sets: '2', reps: '30-sec hold each side', frequency: 'As needed', notes: 'Gentle pull, zero sharp pain' },
      ],
      recoveryProgress: 60,
      nextFollowUpDate: '2026-08-12',
      createdAt: '2026-07-20T15:00:00Z',
    },
  ];

  const initialNotifications: DBNotification[] = [
    {
      id: 'notif-001',
      userId: 'usr-001',
      title: 'Upcoming Appointment Reminder',
      message: 'Your Lower Back Therapy session with Dr. Sarah Jenkins is scheduled for Aug 12 at 10:00 AM.',
      type: 'reminder',
      link: '/dashboard/appointments',
      read: false,
      createdAt: '2026-08-06T08:00:00Z',
    },
    {
      id: 'notif-002',
      userId: 'usr-001',
      title: 'Clinical Summary Updated',
      message: 'Dr. Sarah Jenkins added new home exercise guidance to your recovery plan.',
      type: 'clinical',
      link: '/dashboard/medical-history',
      read: false,
      createdAt: '2026-07-20T16:00:00Z',
    },
    {
      id: 'notif-003',
      userId: 'usr-doctor-sarah',
      title: 'New Patient Booking',
      message: 'Anita Desai has booked an Adhesive Capsulitis session for Aug 14 at 11:30 AM.',
      type: 'booking',
      link: '/dashboard/therapist',
      read: false,
      createdAt: '2026-08-05T14:21:00Z',
    },
  ];

  return {
    users: [...DEMO_USERS],
    appointments: initialAppointments,
    clinicalNotes: initialNotes,
    notifications: initialNotifications,
    lastUpdated: new Date().toISOString(),
  };
}

// ── Database Engine ──────────────────────────────────────────────────────────

export class ServerDatabase {
  private static instance: ServerDatabase;

  private constructor() {
    this.ensureInitialized();
  }

  public static getInstance(): ServerDatabase {
    if (!ServerDatabase.instance) {
      ServerDatabase.instance = new ServerDatabase();
    }
    return ServerDatabase.instance;
  }

  private ensureInitialized(): void {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      if (!fs.existsSync(DB_FILE)) {
        const seed = getInitialSeedData();
        fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2), 'utf-8');
      }
    } catch (err) {
      console.error('Failed to initialize server database:', err);
    }
  }

  public read(): DatabaseSchema {
    this.ensureInitialized();
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading database file, resetting to seed:', err);
      const seed = getInitialSeedData();
      this.write(seed);
      return seed;
    }
  }

  public write(data: DatabaseSchema): void {
    this.ensureInitialized();
    try {
      data.lastUpdated = new Date().toISOString();
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing database file:', err);
    }
  }

  // ── User Methods ──
  public getUsers(): (User & { password?: string })[] {
    return this.read().users;
  }

  public findUserByEmail(email: string): (User & { password?: string }) | undefined {
    const users = this.getUsers();
    return users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  }

  public findUserById(id: string): (User & { password?: string }) | undefined {
    const users = this.getUsers();
    return users.find((u) => u.id === id);
  }

  public addUser(user: User & { password?: string }): User {
    const data = this.read();
    const existingIndex = data.users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
    
    if (existingIndex >= 0) {
      data.users[existingIndex] = { ...data.users[existingIndex], ...user };
    } else {
      data.users.push(user);
    }
    
    this.write(data);
    const { password: _, ...safeUser } = user;
    return safeUser as User;
  }

  public updateUser(id: string, updates: Partial<User>): User | null {
    const data = this.read();
    const index = data.users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    data.users[index] = { ...data.users[index], ...updates };
    this.write(data);

    const { password: _, ...safeUser } = data.users[index];
    return safeUser as User;
  }

  // ── Appointment Methods ──
  public getAppointments(filter?: { patientId?: string; specialistId?: string }): DBAppointment[] {
    const { appointments } = this.read();
    if (!filter) return appointments;

    return appointments.filter((a) => {
      if (filter.patientId && a.patientId !== filter.patientId) return false;
      if (filter.specialistId && a.specialistId !== filter.specialistId) return false;
      return true;
    });
  }

  public addAppointment(appointmentData: Omit<DBAppointment, 'id' | 'bookingRef' | 'createdAt' | 'updatedAt'>): DBAppointment {
    const data = this.read();
    const refNum = Math.floor(10000 + Math.random() * 90000);
    const year = new Date().getFullYear();
    const newAppointment: DBAppointment = {
      ...appointmentData,
      id: `apt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      bookingRef: `HM-${year}-${refNum}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.appointments.unshift(newAppointment);
    this.write(data);

    // Auto-create notification for patient
    this.addNotification({
      userId: newAppointment.patientId,
      title: 'Appointment Confirmed',
      message: `Your appointment for ${newAppointment.treatmentName} with ${newAppointment.specialistName} on ${newAppointment.date} at ${newAppointment.timeSlot} has been scheduled.`,
      type: 'booking',
      link: '/dashboard/appointments',
      read: false,
    });

    // Auto-create notification for the actual booked doctor (using their real specialist/user ID)
    if (newAppointment.specialistId) {
      this.addNotification({
        userId: newAppointment.specialistId,
        title: 'New Appointment Request',
        message: `New booking: ${newAppointment.patientName} requested ${newAppointment.treatmentName} on ${newAppointment.date} at ${newAppointment.timeSlot}. Status: ${newAppointment.status}.`,
        type: 'booking',
        link: '/dashboard/therapist',
        read: false,
      });
    }

    return newAppointment;
  }

  public updateAppointmentStatus(id: string, status: DBAppointment['status']): DBAppointment | null {
    const data = this.read();
    const index = data.appointments.findIndex((a) => a.id === id);
    if (index === -1) return null;

    data.appointments[index].status = status;
    data.appointments[index].updatedAt = new Date().toISOString();
    this.write(data);

    return data.appointments[index];
  }

  // ── Clinical Notes ──
  public getClinicalNotes(patientId?: string): DBClinicalNote[] {
    const { clinicalNotes } = this.read();
    if (!patientId) return clinicalNotes;
    return clinicalNotes.filter((n) => n.patientId === patientId);
  }

  public addClinicalNote(noteData: Omit<DBClinicalNote, 'id' | 'createdAt'>): DBClinicalNote {
    const data = this.read();
    const newNote: DBClinicalNote = {
      ...noteData,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    data.clinicalNotes.unshift(newNote);
    this.write(data);

    return newNote;
  }

  // ── Notifications ──
  public getNotifications(userId: string): DBNotification[] {
    const { notifications } = this.read();
    return notifications.filter((n) => n.userId === userId);
  }

  public addNotification(notifData: Omit<DBNotification, 'id' | 'createdAt'>): DBNotification {
    const data = this.read();
    const newNotif: DBNotification = {
      ...notifData,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
    };

    data.notifications.unshift(newNotif);
    this.write(data);

    return newNotif;
  }

  public markNotificationAsRead(id: string): boolean {
    const data = this.read();
    const notif = data.notifications.find((n) => n.id === id);
    if (!notif) return false;

    notif.read = true;
    this.write(data);
    return true;
  }

  // ── Stats ──
  public getStats() {
    const data = this.read();
    return {
      usersCount: data.users.length,
      appointmentsCount: data.appointments.length,
      clinicalNotesCount: data.clinicalNotes.length,
      notificationsCount: data.notifications.length,
      lastUpdated: data.lastUpdated,
      dbPath: DB_FILE,
      dbExists: fs.existsSync(DB_FILE),
    };
  }

  public resetToSeed(): DatabaseSchema {
    const seed = getInitialSeedData();
    this.write(seed);
    return seed;
  }
}

export const serverDb = ServerDatabase.getInstance();
