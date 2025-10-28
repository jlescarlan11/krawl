import AppLayout from '@/components/AppLayout';
import MapArea from '@/components/MapArea';

export default function Home() {
  return (
    <AppLayout showBottomNav={true}>
      <MapArea />
    </AppLayout>
  );
}
