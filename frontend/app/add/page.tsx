import AppLayout from '@/components/AppLayout';
import { LuPlus } from 'react-icons/lu';

export default function AddPage() {
  return (
    <AppLayout showBottomNav={true}>
      <div className="container mx-auto px-4 py-8 h-full overflow-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-teal-100 rounded-full flex items-center justify-center">
            <LuPlus size={32} className="text-teal-700" />
          </div>
          <h1 className="heading-2 mb-4">Add New Gem</h1>
          <p className="body-base text-neutral-600">
            Share your favorite local spots with the community.
          </p>
          <p className="body-sm text-neutral-500 mt-4">
            This page will feature a form to add new gems including name, location, category, description, and photos.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

