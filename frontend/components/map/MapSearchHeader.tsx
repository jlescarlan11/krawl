import { LuSearch, LuUtensils, LuMapPin, LuLandmark, LuCamera } from 'react-icons/lu';

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
      </div>
    </header>
  );
}