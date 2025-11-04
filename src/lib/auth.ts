/**
 * Authentication utilities for protected routes
 * Uses simple password-based authentication for technical documentation
 * Can be replaced with WorkOS or other OAuth providers later
 */

import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'tech_docs_auth';
const AUTH_PASSWORD = process.env.TECH_DOCS_PASSWORD || 'changeme';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface AuthSession {
  authenticated: boolean;
  expiresAt: number;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
  
  if (!authCookie) {
    return false;
  }

  try {
    const session: AuthSession = JSON.parse(authCookie.value);
    
    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      return false;
    }
    
    return session.authenticated;
  } catch {
    return false;
  }
}

/**
 * Verify password and create session
 */
export async function authenticate(password: string): Promise<boolean> {
  if (password !== AUTH_PASSWORD) {
    return false;
  }

  const session: AuthSession = {
    authenticated: true,
    expiresAt: Date.now() + (COOKIE_MAX_AGE * 1000),
  };

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  return true;
}

/**
 * Clear authentication session
 */
export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

/**
 * Get authentication status for client components
 */
export async function getAuthStatus(): Promise<{ authenticated: boolean }> {
  const authenticated = await isAuthenticated();
  return { authenticated };
}
