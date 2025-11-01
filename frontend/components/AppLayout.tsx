'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { useSidebar } from '@/context/SidebarContext';

interface AppLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export default function AppLayout({ children, showBottomNav = false }: AppLayoutProps) {
  const { isExpanded } = useSidebar();

  return (
    <div className="h-screen bg-background">
      {/* Sidebar - Fixed, always visible on desktop */}
      <Sidebar />
      
      {/* Main Content Area - Adjusts based on sidebar */}
      <main 
        className={`
          h-full overflow-hidden
          transition-all duration-300 ease-in-out
          ${isExpanded ? 'md:ml-80' : 'md:ml-16'}
          ${showBottomNav ? 'pb-16 md:pb-0' : ''}
        `}
      >
        {children}
      </main>
      
      {/* Bottom Navigation - Mobile only */}
      {showBottomNav && <BottomNav />}
    </div>
  );
}

