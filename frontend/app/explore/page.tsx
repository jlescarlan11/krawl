import AppLayout from '@/components/AppLayout';
import { LuSearch } from 'react-icons/lu';

export default function ExplorePage() {
  return (
    <AppLayout showBottomNav={true}>
      <div className="container mx-auto px-4 py-8 h-full overflow-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-verde-100 rounded-full flex items-center justify-center">
            <LuSearch size={32} className="text-verde-700" />
          </div>
          <h1 className="heading-2 mb-4">Explore Gems</h1>
          <p className="body-base text-neutral-600">
            Discover authentic Filipino culture through community-sourced local gems.
          </p>
          <p className="body-sm text-neutral-500 mt-4">
            This page will feature a searchable list of all gems with filters and sorting options.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

