'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import { useSidebar } from '@/context/SidebarContext';

type AuthScaffoldProps = {
  heading: string;
  subheading?: string;
  children: React.ReactNode;
};

export default function AuthScaffold({ heading, subheading, children }: AuthScaffoldProps) {
  const { isExpanded } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Fixed, always visible on desktop */}
      <Sidebar />
      
      {/* Main Content Area - Shifts with sidebar */}
      <main 
        className={`
          min-h-screen
          transition-all duration-300 ease-in-out
          pb-16 md:pb-0
          ${isExpanded ? 'md:ml-80' : 'md:ml-16'}
        `}
      >
        <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-6 py-10 lg:grid-cols-2">
          <div className="block text-center lg:text-left">
            <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
              <img src="/krawl-icon-color.svg" alt="Krawl" className="h-8 w-8" />
              <span className="text-xl font-semibold text-neutral-800">Krawl</span>
            </div>

            <h1 className="heading-1">{heading}</h1>
            {subheading ? (
              <p className="mt-4 text-neutral-600">{subheading}</p>
            ) : null}
          </div>

          <div className="flex items-center justify-center">
            {children}
          </div>
        </div>
      </main>
      
      {/* Bottom Navigation - Mobile only */}
      <BottomNav />
    </div>
  );
}


