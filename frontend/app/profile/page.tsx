import AppLayout from '@/components/AppLayout';
import { LuUser } from 'react-icons/lu';

export default function ProfilePage() {
  return (
    <AppLayout showBottomNav={true}>
      <div className="container mx-auto px-4 py-8 h-full overflow-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-sand-200 rounded-full flex items-center justify-center">
            <LuUser size={32} className="text-sand-800" />
          </div>
          <h1 className="heading-2 mb-4">User Profile</h1>
          <p className="body-base text-neutral-600">
            Manage your account, saved gems, and created krawls.
          </p>
          <p className="body-sm text-neutral-500 mt-4">
            This page will display user profile information, stats, saved gems, created krawls, and account settings.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

