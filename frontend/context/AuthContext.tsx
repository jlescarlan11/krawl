'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as auth from '@/lib/auth';

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
    const persisted =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('auth') || window.sessionStorage.getItem('auth')
        : null;
    if (persisted) {
      try {
        const { token: t, user: u } = JSON.parse(persisted);
        setToken(t);
        setUser(u);
      } catch {}
    }
  }, []);

  const setSession = (t: string, u: auth.User, remember?: boolean) => {
    setToken(t);
    setUser(u);
    const payload = JSON.stringify({ token: t, user: u });
    if (remember) {
      window.localStorage.setItem('auth', payload);
      window.sessionStorage.removeItem('auth');
    } else {
      window.sessionStorage.setItem('auth', payload);
      window.localStorage.removeItem('auth');
    }
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
      window.localStorage.removeItem('auth');
      window.sessionStorage.removeItem('auth');
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
