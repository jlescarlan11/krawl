'use client';

import { Toaster as SonnerToaster } from 'sonner';

export default function Toaster() {
  return (
    <SonnerToaster 
      position="top-center"
      toastOptions={{
        style: {
          background: 'var(--color-background-secondary)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
        },
        className: 'sonner-toast',
      }}
    />
  );
}