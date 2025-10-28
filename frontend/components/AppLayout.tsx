'use client';

import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export default function AppLayout({ children, showBottomNav = false }: AppLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="h-screen bg-background">
      {/* Sidebar - Fixed, always visible on desktop */}
      <Sidebar 
        isExpanded={sidebarExpanded} 
        onToggle={() => setSidebarExpanded(!sidebarExpanded)} 
      />
      
      {/* Main Content Area - Adjusts based on sidebar */}
      <main 
        className={`
          h-full overflow-hidden
          transition-all duration-300 ease-in-out
          ${sidebarExpanded ? 'md:ml-80' : 'md:ml-16'}
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

