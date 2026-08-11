// ─────────────────────────────────────────────────────────────────────────────
// lib/tokenParser.ts  —  Server-side token utilities for API route authorization
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest } from 'next/server';

export interface ParsedToken {
  sub: string;      // user ID
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Parse the base64-encoded JWT payload from the app's token format.
 * Token format: base64(header).base64(payload).base64(signature)
 */
export function parseToken(token: string): ParsedToken | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = Buffer.from(parts[1], 'base64').toString('utf-8');
    return JSON.parse(payload) as ParsedToken;
  } catch {
    return null;
  }
}

/**
 * Extract and parse the bearer token from the Authorization header.
 * Returns null if missing or malformed.
 */
export function getTokenFromRequest(req: NextRequest): ParsedToken | null {
  const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  return parseToken(token);
}

/**
 * Get the authenticated user ID from the request's Authorization header.
 * Returns null if the token is missing or invalid.
 */
export function getAuthUserId(req: NextRequest): string | null {
  const parsed = getTokenFromRequest(req);
  return parsed?.sub || null;
}

/**
 * Get the authenticated user's role from the request.
 */
export function getAuthUserRole(req: NextRequest): string | null {
  const parsed = getTokenFromRequest(req);
  return parsed?.role || null;
}

/**
 * Get both userId and role from the request token.
 */
export function getAuthUser(req: NextRequest): { userId: string; role: string } | null {
  const parsed = getTokenFromRequest(req);
  if (!parsed?.sub) return null;
  return { userId: parsed.sub, role: parsed.role || 'patient' };
}
