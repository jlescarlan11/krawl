'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { useSidebar } from '@/context/SidebarContext';

interface AppLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  fixedLayout?: boolean; // For map page - content stays fixed, header moves
}

export default function AppLayout({ children, showBottomNav = false, fixedLayout = false }: AppLayoutProps) {
  const { isExpanded } = useSidebar();

  return (
    <div className="h-screen bg-background">
      {/* Sidebar - Fixed, always visible on desktop */}
      <Sidebar />
      
      {/* Main Content Area - Shifts with sidebar unless fixedLayout is true */}
      <main 
        className={`
          h-full overflow-hidden
          ${showBottomNav ? 'pb-16 md:pb-0' : ''}
          ${fixedLayout 
            ? '' 
            : `transition-all duration-300 ease-in-out ${isExpanded ? 'md:ml-80' : 'md:ml-16'}`
          }
        `}
      >
        {children}
      </main>
      
      {/* Bottom Navigation - Mobile only */}
      {showBottomNav && <BottomNav />}
    </div>
  );
}

