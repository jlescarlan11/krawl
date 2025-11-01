'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SidebarContextType {
  isExpanded: boolean;
  toggleSidebar: () => void;
  setIsExpanded: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const SIDEBAR_STATE_KEY = 'krawl-sidebar-expanded';

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage after component mounts (client-side only)
  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_STATE_KEY);
    if (saved !== null) {
      setIsExpanded(saved === 'true');
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever the state changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(SIDEBAR_STATE_KEY, String(isExpanded));
    }
  }, [isExpanded, isHydrated]);

  const toggleSidebar = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar, setIsExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

