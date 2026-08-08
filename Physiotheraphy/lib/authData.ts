// ─────────────────────────────────────────────────────────────────────────────
// lib/authData.ts  —  Mock auth data, demo accounts & utilities
// ─────────────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  avatar: string;
  role: 'patient' | 'therapist' | 'admin';
  emergencyContact: string;
  medicalConditions: string;
  allergies: string;
  preferredLanguage: string;
  createdAt: string;
  emailVerified: boolean;
  // Doctor/Therapist specific metadata
  specialization?: string;
  licenseNumber?: string;
  clinicBranchId?: string;
  title?: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  password: string;
  role?: 'patient' | 'therapist' | 'admin';
}

export interface LoginInput {
  email: string;
  password: string;
}

// ── Demo User Accounts ────────────────────────────────────────────────────────

export const DEMO_USERS: (User & { password: string })[] = [
  {
    id: 'usr-001',
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul@demo.com',
    phone: '+91 98765 43210',
    age: 32,
    gender: 'male',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    role: 'patient',
    emergencyContact: 'Priya Sharma — +91 98765 43211',
    medicalConditions: 'Mild lumbar disc herniation (L4-L5)',
    allergies: 'None',
    preferredLanguage: 'English',
    createdAt: '2026-06-01T10:00:00Z',
    emailVerified: true,
    password: 'Demo@1234',
  },
  {
    id: 'usr-doctor-sarah',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 'sarah.jenkins@healingmotion.com',
    phone: '+91 98111 54321',
    age: 38,
    gender: 'female',
    avatar: 'https://images.unsplash.com/photo-1594824813620-21a50a6bf1cf?auto=format&fit=crop&q=80&w=300',
    role: 'therapist',
    emergencyContact: '+91 98111 00000',
    medicalConditions: 'None',
    allergies: 'None',
    preferredLanguage: 'English',
    createdAt: '2025-03-15T08:00:00Z',
    emailVerified: true,
    password: 'Doctor@1234',
    title: 'Dr. Sarah Jenkins, PT, DPT',
    specialization: 'Chief of Physiotherapy & Sports Rehab',
    licenseNumber: 'KA-PT-2018-9482',
    clinicBranchId: 'clinic-indiranagar',
  },
  {
    id: 'usr-admin',
    firstName: 'System',
    lastName: 'Administrator',
    email: 'admin@healingmotion.com',
    phone: '+91 90000 00001',
    age: 42,
    gender: 'male',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    role: 'admin',
    emergencyContact: '+91 90000 99999',
    medicalConditions: 'None',
    allergies: 'None',
    preferredLanguage: 'English',
    createdAt: '2025-01-01T00:00:00Z',
    emailVerified: true,
    password: 'Admin@1234',
  },
];

// ── In-Memory & LocalStorage User DB ──────────────────────────────────────────

const USER_DB_KEY = 'hm-users-db';

function getStoredUsers(): (User & { password: string })[] {
  if (typeof window === 'undefined') return DEMO_USERS;
  try {
    const raw = localStorage.getItem(USER_DB_KEY);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(USER_DB_KEY, JSON.stringify(DEMO_USERS));
  } catch {
    /* ignore */
  }
  return DEMO_USERS;
}

function saveUsers(users: (User & { password: string })[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_DB_KEY, JSON.stringify(users));
  }
}

// ── Auth Simulation Functions ───────────────────────────────────────────────

export function simulateLogin(input: LoginInput): {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
} {
  const users = getStoredUsers();
  const normalizedEmail = input.email.trim().toLowerCase();
  const found = users.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === input.password
  );

  if (!found) {
    // Check if email exists with wrong password
    const emailExists = users.some((u) => u.email.toLowerCase() === normalizedEmail);
    if (emailExists) {
      return { success: false, error: 'Incorrect password. Try "Demo@1234", "Doctor@1234", or "Admin@1234".' };
    }
    return { success: false, error: 'No account found with this email address. Please sign up.' };
  }

  // Create JWT-like token payload
  const { password: _, ...user } = found;
  const token = generateToken(user);

  return { success: true, user, token };
}

export function simulateRegister(input: RegisterInput): {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
} {
  const users = getStoredUsers();
  const normalizedEmail = input.email.trim().toLowerCase();

  if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    return { success: false, error: 'An account with this email address already exists. Please log in.' };
  }

  const newUser: User & { password: string } = {
    id: `usr-${Date.now()}`,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: normalizedEmail,
    phone: input.phone.trim(),
    age: input.age,
    gender: input.gender,
    avatar: '',
    role: input.role || 'patient',
    emergencyContact: '',
    medicalConditions: '',
    allergies: '',
    preferredLanguage: 'English',
    createdAt: new Date().toISOString(),
    emailVerified: false,
    password: input.password,
  };

  users.push(newUser);
  saveUsers(users);

  const { password: _, ...user } = newUser;
  const token = generateToken(user);

  return { success: true, user, token };
}

export function simulateGoogleLogin(role: 'patient' | 'therapist' | 'admin' = 'patient'): {
  success: boolean;
  user: User;
  token: string;
} {
  const users = getStoredUsers();
  const googleEmail = role === 'therapist' ? 'sarah.jenkins@healingmotion.com' : role === 'admin' ? 'admin@healingmotion.com' : 'rahul@demo.com';
  const existing = users.find((u) => u.email === googleEmail);

  if (existing) {
    const { password: _, ...user } = existing;
    return { success: true, user, token: generateToken(user) };
  }

  const defaultUser = DEMO_USERS[0];
  const { password: _, ...user } = defaultUser;
  return { success: true, user, token: generateToken(user) };
}

export function generateToken(user: User): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    })
  );
  const signature = btoa('hm_mock_signature_' + user.id);
  return `${header}.${payload}.${signature}`;
}

export function getPasswordStrength(password: string): {
  score: number; // 0-4
  label: 'Too Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
} {
  if (!password) return { score: 0, label: 'Too Weak', color: '#E2E8F0' };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const map = [
    { label: 'Too Weak' as const, color: '#EF4444' },
    { label: 'Weak' as const, color: '#F97316' },
    { label: 'Fair' as const, color: '#FBBF24' },
    { label: 'Good' as const, color: '#3B82F6' },
    { label: 'Strong' as const, color: '#10B981' },
  ];

  return { score, ...map[score] };
}
