'use client';

import { useEffect } from 'react';

export default function RegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('✅ SW registered:', registration);
          })
          .catch((error) => {
            console.error('❌ SW registration failed:', error);
          });
      });
    }
  }, []);

  return null;
}

