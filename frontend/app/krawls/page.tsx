import AppLayout from '@/components/AppLayout';
import { LuRoute } from 'react-icons/lu';

export default function KrawlsPage() {
  return (
    <AppLayout showBottomNav={true}>
      <div className="container mx-auto px-4 py-8 h-full overflow-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-clay-100 rounded-full flex items-center justify-center">
            <LuRoute size={32} className="text-clay-700" />
          </div>
          <h1 className="heading-2 mb-4">Browse Krawls</h1>
          <p className="body-base text-neutral-600">
            Follow curated trails of local gems created by the community.
          </p>
          <p className="body-sm text-neutral-500 mt-4">
            This page will display a list of available Krawls with previews and download options for offline use.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

