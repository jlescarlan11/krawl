'use client';

import Link from 'next/link';
import { LuSearch, LuUtensils, LuMapPin, LuLandmark, LuCamera } from 'react-icons/lu';
import { useAuth } from '@/context/AuthContext';

const categories = [
  { id: 'food', label: 'Food & Drink', icon: LuUtensils },
  { id: 'landmarks', label: 'Landmarks', icon: LuLandmark },
  { id: 'hidden-gems', label: 'Hidden Gems', icon: LuMapPin },
  { id: 'photo-spots', label: 'Photo Spots', icon: LuCamera },
];

interface MapSearchHeaderProps {
  onSearch?: (query: string) => void;
  onCategorySelect?: (categoryId: string) => void;
}

export function MapSearchHeader({ onSearch, onCategorySelect }: MapSearchHeaderProps) {
  const { user, isAuthenticated } = useAuth();

  // Get display name: prefer username, fallback to name or email
  const displayName = user?.username || user?.name || user?.email || 'Guest User';
  
  // Get avatar initials
  const getAvatarText = () => {
    if (!isAuthenticated) return 'Login';
    const text = user?.username || user?.name || user?.email || '';
    return text.slice(0, 2).toUpperCase();
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-[1000] h-[72px]">
      <div className="flex items-center gap-3 px-4 h-full">
        <div className="flex-1 max-w-2xl relative">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 z-10" size={20} />
          <input
            type="text"
            placeholder="Search gems, krawls, locations..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-verde-500 focus:border-transparent bg-white/80 backdrop-blur-md border border-white/40 shadow-lg hover:bg-white/90 transition-all"
          />
        </div>
        
        <div className="hidden lg:flex items-center gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                title={category.label}
                onClick={() => onCategorySelect?.(category.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 backdrop-blur-md border border/white/40 hover:bg-verde-100/80 hover:border-verde-400/60 hover:text-verde-700 transition-all text-sm font-medium text-neutral-700 shadow-lg"
              >
                <Icon size={16} />
                <span className="hidden xl:inline">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Profile Avatar / Login Button */}
        <Link
          href={isAuthenticated ? "/profile" : "/login"}
          title={isAuthenticated ? displayName : "Login"}
          className={`flex items-center justify-center rounded-full shadow-lg backdrop-blur-md font-semibold flex-shrink-0 transition-colors ${
            isAuthenticated
              ? 'w-10 h-10 bg-sand-300 hover:bg-sand-400 text-sand-900'
              : 'px-4 py-2 bg-verde-600 hover:bg-verde-700 text-white text-sm'
          }`}
        >
          {getAvatarText()}
        </Link>
      </div>
    </header>
  );
}