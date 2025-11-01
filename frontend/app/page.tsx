import AppLayout from '@/components/AppLayout';
import ErrorBoundary from '@/components/ErrorBoundary';
import MapWrapper from '@/components/MapWrapper';

export default function Home() {
  return (
   <ErrorBoundary>
      <AppLayout showBottomNav={true} fixedLayout={true}>
        <MapWrapper />
      </AppLayout>
    </ErrorBoundary>
  );
}
