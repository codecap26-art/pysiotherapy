// ─────────────────────────────────────────────────────────────────────────────
// lib/authHeaders.ts  —  Client-side helper to attach auth token to API calls
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get the auth token stored by Zustand (useAuthStore) in localStorage.
 * This is the same token that gets persisted under the 'hm-auth-storage' key.
 */
export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('hm-auth-storage');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.token || null;
  } catch {
    return null;
  }
}

/**
 * Returns headers including the Authorization bearer token for API requests.
 * Usage: fetch('/api/...', { headers: getAuthHeaders() })
 */
export function getAuthHeaders(): HeadersInit {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Returns just the Authorization header object (without Content-Type).
 */
export function getBearerHeader(): Record<string, string> {
  const token = getStoredToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

/**
 * Parse the token payload to get user info (client-side only).
 */
export function parseTokenPayload(token: string): {
  sub: string;
  email: string;
  name: string;
  role: string;
} | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1]));
  } catch {
    return null;
  }
}
