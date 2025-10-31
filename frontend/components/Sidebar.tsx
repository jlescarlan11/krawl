'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LuMapPin, LuSearch, LuRoute, LuUser, LuSettings, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '/', label: 'Map', icon: LuMapPin },
  { href: '/explore', label: 'Explore Gems', icon: LuSearch },
  { href: '/krawls', label: 'Krawls', icon: LuRoute },
];

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isExpanded, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  // Get display name: prefer username, fallback to name or email
  const displayName = user?.username || user?.name || user?.email || 'Guest User';
  const displaySubtext = isAuthenticated 
    ? (user?.email || '')
    : 'Sign in to save progress';
  
  // Get avatar initials
  const getAvatarText = () => {
    if (!isAuthenticated) return 'GU';
    const text = user?.username || user?.name || user?.email || '';
    return text.slice(0, 2).toUpperCase();
  };

  return (
    <aside 
      className={`
        hidden md:flex
        fixed left-0 top-0 bottom-0 z-30
        bg-white border-r border-neutral-200 
        flex-col
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-80' : 'w-16'}
      `}
    >
      {/* Header Section with Toggle - Aligned with main header */}
      {isExpanded ? (
        <div className="h-[72px] px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <Image
                src="/krawl-icon-color.svg"
                alt="Krawl Logo"
                width={40}
                height={40}
                className="w-8 h-8"
                priority
              />
            </div>
            <span className="text-xl font-bold text-neutral-900 whitespace-nowrap">Krawl</span>
          </Link>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-neutral-100 rounded-md transition-colors flex-shrink-0"
            aria-label="Collapse sidebar"
          >
            <LuChevronLeft size={20} className="text-neutral-700" />
          </button>
        </div>
      ) : (
        <div className="h-[72px] px-2 flex flex-col items-center justify-center gap-1 group">
          <button 
            onClick={onToggle}
            className="flex items-center justify-center relative w-10 h-10"
            aria-label="Expand sidebar"
          >
            {/* Logo - shown by default, fades out on hover */}
            <Image
              src="/krawl-icon-color.svg"
              alt="Krawl Logo"
              width={32}
              height={32}
              className="w-8 h-8 absolute transition-all duration-300 ease-in-out transform group-hover:-rotate-90 group-hover:opacity-0 group-hover:scale-75"
              priority
            />
            {/* Expand icon - hidden by default, fades in on hover */}
            <div className="absolute opacity-0 transition-all ease-in-out transform rotate-90 scale-75 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100 duration-300">
              <LuChevronRight size={24} className="text-verde-600" />
            </div>
          </button>
        </div>
      )}
        
      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className={`${isExpanded ? 'px-4' : 'px-2'} space-y-1`}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                title={!isExpanded ? item.label : undefined}
                className={`
                  flex items-center rounded-md
                  transition-colors duration-150
                  ${isExpanded ? 'gap-3 px-2 py-2.5' : 'justify-center p-2.5'}
                  ${isActive 
                    ? 'bg-verde-100 text-verde-700 font-medium' 
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                  }
                `}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isExpanded && <span className="text-sm whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </div>
          
        {/* Quick Stats - Only show when expanded */}
        {isExpanded && (
          <div className="px-4 mt-6">
              <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wide !mb-4">
                Your Activity
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Saved Gems</span>
                  <span className="font-medium text-neutral-900">0</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Your Krawls</span>
                  <span className="font-medium text-neutral-900">0</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Contributions</span>
                  <span className="font-medium text-neutral-900">0</span>
                </div>
              </div>
            </div>
        )}
      </nav>
        
      {/* Bottom Section - User Profile */}
      <div className={`${isExpanded ? 'px-4 py-4' : 'px-2 py-2'}`}>
        {isExpanded ? (
          <Link
            href={isAuthenticated ? "/profile" : "/login"}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-100 transition-colors"
          >
            <div className="w-10 h-10 bg-sand-300 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sand-900">
              {getAvatarText()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                {displayName}
              </p>
              <p className="text-xs text-neutral-500 truncate">{displaySubtext}</p>
            </div>
            {isAuthenticated && (
              <LuSettings size={18} className="text-neutral-400 flex-shrink-0" />
            )}
          </Link>
        ) : (
          <Link
            href={isAuthenticated ? "/profile" : "/login"}
            title={isAuthenticated ? displayName : "Profile"}
            className="flex items-center justify-center rounded-md hover:bg-neutral-100 transition-colors"
          >
            <div className="w-10 h-10 bg-sand-300 rounded-full flex items-center justify-center font-semibold text-sand-900">
              {getAvatarText()}
            </div>
          </Link>
        )}
      </div>
    </aside>
  );
}
