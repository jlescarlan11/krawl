import Link from 'next/link';
import { LuSearch, LuMenu, LuMapPin, LuRoute } from 'react-icons/lu';

export default function Header() {
  return (
    <header className="bg-verde-500 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <LuMapPin size={24} className="text-clay-300" />
          <span>Krawl</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link 
            href="/explore" 
            className="flex items-center gap-2 hover:text-sand-200 transition-colors duration-150"
          >
            <LuSearch size={18} />
            <span className="text-sm font-medium">Explore</span>
          </Link>
          <Link 
            href="/krawls" 
            className="flex items-center gap-2 hover:text-sand-200 transition-colors duration-150"
          >
            <LuRoute size={18} />
            <span className="text-sm font-medium">Krawls</span>
          </Link>
        </nav>
        
        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Login Button */}
          <button className="hidden md:block px-4 py-2 rounded-md border-2 border-white hover:bg-white hover:text-verde-700 transition-all duration-150 text-sm font-medium">
            Login
          </button>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 hover:bg-verde-700 rounded-md transition-colors duration-150">
            <LuMenu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

