import { User, RegisterInput, LoginInput, DEMO_USERS, generateToken } from './authData';
import { db } from './db';

const USER_DB_KEY = 'hm-users-db';

export function getStoredUsers(): (User & { password: string })[] {
  if (typeof window === 'undefined') return DEMO_USERS;
  try {
    const raw = localStorage.getItem(USER_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    localStorage.setItem(USER_DB_KEY, JSON.stringify(DEMO_USERS));
  } catch {
    /* ignore */
  }
  return DEMO_USERS;
}

export function saveStoredUsers(users: (User & { password: string })[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_DB_KEY, JSON.stringify(users));
  }
}

export interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

/**
 * Universal Login: Communicates with Server Database API & Supabase
 */
export async function authenticateUser(input: LoginInput): Promise<AuthResult> {
  const normalizedEmail = input.email.trim().toLowerCase();
  const password = input.password;

  // 1. Try Server Database API endpoint
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalizedEmail, password }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.user && data.token) {
        // Cache user locally for instant subsequent loads
        const localUsers = getStoredUsers();
        if (!localUsers.some((u) => u.email.toLowerCase() === normalizedEmail)) {
          localUsers.push({ ...data.user, password });
          saveStoredUsers(localUsers);
        }
        return { success: true, user: data.user, token: data.token };
      }
    } else {
      const errData = await res.json().catch(() => ({}));
      if (errData.error && res.status !== 404) {
        return { success: false, error: errData.error };
      }
    }
  } catch (apiErr) {
    console.warn('API login call failed, checking local database:', apiErr);
  }

  // 2. Fallback check for Local Storage Cache
  const users = getStoredUsers();
  const found = users.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );

  if (found) {
    const { password: _, ...user } = found;
    const token = generateToken(user);
    return { success: true, user, token };
  }

  const emailExists = users.some((u) => u.email.toLowerCase() === normalizedEmail);
  if (emailExists) {
    return {
      success: false,
      error: 'Invalid password. Please check your password and try again.',
    };
  }

  return {
    success: false,
    error: 'No account found with this email address. Please create an account first.',
  };
}

/**
 * Universal Register: Persists new user in Server Database, Supabase & local cache
 */
export async function registerNewUser(input: RegisterInput): Promise<AuthResult> {
  const normalizedEmail = input.email.trim().toLowerCase();

  // 1. Save to Server Database via API
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: input.firstName,
        lastName: input.lastName,
        email: normalizedEmail,
        phone: input.phone,
        age: input.age,
        gender: input.gender,
        password: input.password,
        role: input.role || 'patient',
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.user && data.token) {
        // Also cache locally
        const users = getStoredUsers();
        users.push({ ...data.user, password: input.password });
        saveStoredUsers(users);

        return { success: true, user: data.user, token: data.token };
      }
    } else {
      const errData = await res.json().catch(() => ({}));
      if (errData.error) {
        return { success: false, error: errData.error };
      }
    }
  } catch (apiErr) {
    console.warn('API register call error, creating in local cache:', apiErr);
  }

  // 2. Fallback offline registration
  const users = getStoredUsers();
  if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    return {
      success: false,
      error: 'An account with this email address already exists. Please log in.',
    };
  }

  const userId = `usr-${Date.now()}`;
  const newUser: User & { password: string } = {
    id: userId,
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
  saveStoredUsers(users);

  db.createNotification({
    userId: newUser.id,
    title: 'Welcome to Healing Motion!',
    message: `Hello ${newUser.firstName}, your account has been created. You can now book appointments and track recovery.`,
    type: 'system',
    link: '/dashboard',
  });

  const { password: _, ...user } = newUser;
  const token = generateToken(user);

  return { success: true, user, token };
}
