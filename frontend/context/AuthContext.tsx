'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as auth from '@/lib/auth';
import { config } from '@/lib/config/env';

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

  // Proactive token refresh - check if token expires soon and refresh it
  useEffect(() => {
    if (!token) return;

    const isTokenExpiringSoon = (jwtToken: string): boolean => {
      try {
        const payload = JSON.parse(atob(jwtToken.split('.')[1]));
        const expiry = payload.exp * 1000; // Convert to milliseconds
        const now = Date.now();
        const timeUntilExpiry = expiry - now;
        
        // Refresh if expires in less than 5 minutes
        return timeUntilExpiry < 5 * 60 * 1000;
      } catch {
        return true; // If we can't parse, assume expired
      }
    };

    const refreshTokenProactively = async () => {
      if (isTokenExpiringSoon(token)) {
        console.log('Token expiring soon, refreshing proactively...');
        try {
          const basePath = config.api.getBasePath();
          const response = await fetch(`${basePath}/auth/refresh`, {
            method: 'POST',
            credentials: 'include', // Send HttpOnly cookie
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            const newToken = data.token;
            const newUser = { 
              id: data.userId, 
              email: data.email, 
              username: data.username 
            };
            
            // Update state and storage
            setToken(newToken);
            setUser(newUser);
            
            const payload = JSON.stringify({ token: newToken, user: newUser });
            const storage = window.localStorage.getItem('auth') ? window.localStorage : window.sessionStorage;
            storage.setItem('auth', payload);
            
            console.log('Token refreshed proactively');
          }
        } catch (error) {
          console.error('Proactive token refresh failed:', error);
        }
      }
    };

    // Check every minute
    const interval = setInterval(refreshTokenProactively, 60 * 1000);
    refreshTokenProactively(); // Initial check

    return () => clearInterval(interval);
  }, [token]);

  const setSession = (t: string, u: auth.User, remember?: boolean) => {
    setToken(t);
    setUser(u);
    const payload = JSON.stringify({ token: t, user: u });
    if (remember) {
      // Persist across browser sessions
      window.localStorage.setItem('auth', payload);
      window.sessionStorage.removeItem('auth');
    } else {
      // Store in sessionStorage only (clears when tab closes)
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
