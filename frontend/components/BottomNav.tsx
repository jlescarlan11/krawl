'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuMap, LuSearch, LuPlus, LuRoute, LuUser } from 'react-icons/lu';

const navItems = [
  { href: '/', label: 'Map', icon: LuMap },
  { href: '/explore', label: 'Explore', icon: LuSearch },
  { href: '/add', label: 'Add', icon: LuPlus },
  { href: '/krawls', label: 'Krawls', icon: LuRoute },
  { href: '/profile', label: 'Profile', icon: LuUser },
];

export default function BottomNav() {
  const pathname = usePathname();
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-150 rounded-md ${
                isActive
                  ? 'text-verde-700 bg-verde-100'
                  : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Icon size={22} className="mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

