/**
 * Authentication utilities test suite
 * Tests for password-based authentication system
 *
 * TO USE: Copy this file to src/lib/__tests__/auth.test.ts in the
 * feature/technical-documentation-system branch
 */

import { isAuthenticated, authenticate, logout, getAuthStatus } from '../auth';
import { cookies } from 'next/headers';

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('Authentication Module', () => {
  let mockCookieStore: {
    get: jest.Mock;
    set: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(() => {
    // Reset mocks before each test
    mockCookieStore = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
  });

  describe('isAuthenticated', () => {
    it('should return false when no cookie exists', async () => {
      mockCookieStore.get.mockReturnValue(undefined);

      const result = await isAuthenticated();

      expect(result).toBe(false);
      expect(mockCookieStore.get).toHaveBeenCalledWith('tech_docs_auth');
    });

    it('should return false when session is expired', async () => {
      const expiredSession = {
        authenticated: true,
        expiresAt: Date.now() - 1000, // expired 1 second ago
      };
      mockCookieStore.get.mockReturnValue({
        value: JSON.stringify(expiredSession),
      });

      const result = await isAuthenticated();

      expect(result).toBe(false);
    });

    it('should return true when session is valid', async () => {
      const validSession = {
        authenticated: true,
        expiresAt: Date.now() + 1000000, // expires in future
      };
      mockCookieStore.get.mockReturnValue({
        value: JSON.stringify(validSession),
      });

      const result = await isAuthenticated();

      expect(result).toBe(true);
    });

    it('should return false when cookie contains invalid JSON', async () => {
      mockCookieStore.get.mockReturnValue({
        value: 'invalid-json',
      });

      const result = await isAuthenticated();

      expect(result).toBe(false);
    });
  });

  describe('authenticate', () => {
    it('should return false for incorrect password', async () => {
      const result = await authenticate('wrong-password');

      expect(result).toBe(false);
      expect(mockCookieStore.set).not.toHaveBeenCalled();
    });

    it('should return true and set cookie for correct password', async () => {
      const result = await authenticate('test-password');

      expect(result).toBe(true);
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        'tech_docs_auth',
        expect.stringContaining('"authenticated":true'),
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
        })
      );
    });

    it('should create session with correct expiration time', async () => {
      await authenticate('test-password');

      const setCall = mockCookieStore.set.mock.calls[0];
      const sessionString = setCall[1];
      const session = JSON.parse(sessionString);

      expect(session.expiresAt).toBeGreaterThan(Date.now());
      // Check expiration is approximately 7 days in future (with 1 minute tolerance)
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
      expect(session.expiresAt).toBeLessThanOrEqual(Date.now() + sevenDaysInMs + 60000);
    });
  });

  describe('logout', () => {
    it('should delete the authentication cookie', async () => {
      await logout();

      expect(mockCookieStore.delete).toHaveBeenCalledWith('tech_docs_auth');
    });
  });

  describe('getAuthStatus', () => {
    it('should return authenticated: false when not authenticated', async () => {
      mockCookieStore.get.mockReturnValue(undefined);

      const result = await getAuthStatus();

      expect(result).toEqual({ authenticated: false });
    });

    it('should return authenticated: true when authenticated', async () => {
      const validSession = {
        authenticated: true,
        expiresAt: Date.now() + 1000000,
      };
      mockCookieStore.get.mockReturnValue({
        value: JSON.stringify(validSession),
      });

      const result = await getAuthStatus();

      expect(result).toEqual({ authenticated: true });
    });
  });
});
