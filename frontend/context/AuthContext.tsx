'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as auth from '@/lib/auth';
import { getAuthData, setAuthData, clearAuthData } from '@/lib/auth/storage';
import { refreshTokenIfNeeded } from '@/lib/auth/token';
import { AUTH_CONSTANTS } from '@/lib/constants';

type AuthState = {
  user: auth.User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setSession: (token: string, user: auth.User, remember?: boolean) => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<auth.User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load persisted session
  useEffect(() => {
    const authData = getAuthData();
    if (authData) {
      setToken(authData.token);
      setUser(authData.user);
    }
  }, []);

  // Proactive token refresh - check if token expires soon and refresh it
  useEffect(() => {
    if (!token) return;

    const refreshTokenProactively = async () => {
      await refreshTokenIfNeeded();
      
      // Update state from storage after refresh (if it happened)
      const authData = getAuthData();
      if (authData && authData.token !== token) {
        setToken(authData.token);
        setUser(authData.user);
      }
    };

    // Check every minute
    const interval = setInterval(refreshTokenProactively, AUTH_CONSTANTS.TOKEN_CHECK_INTERVAL_MS);
    refreshTokenProactively(); // Initial check

    return () => clearInterval(interval);
  }, [token]);

  const setSession = (t: string, u: auth.User, remember?: boolean) => {
    setToken(t);
    setUser(u);
    setAuthData(t, u, remember ?? false);
  };

  const loginFn = async (email: string, password: string, remember?: boolean) => {
    const res = await auth.login({ email, password });
    setSession(res.token, res.user, remember);
  };

  const signupFn = async (username: string, email: string, password: string) => {
    const res = await auth.register({ username, email, password });
    setSession(res.token, res.user, true); // Persist to localStorage on signup per acceptance criteria
  };

  const logoutFn = async () => {
    try {
      await auth.logout();
    } finally {
      setToken(null);
      setUser(null);
      clearAuthData();
    }
  };

  const value = useMemo<AuthState>(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      login: loginFn,
      signup: signupFn, 
      logout: logoutFn,
      setSession,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
