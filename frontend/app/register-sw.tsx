'use client';

import { useEffect, useState } from 'react';

/**
 * Service Worker Registration Component
 * Handles SW registration, updates, and lifecycle events
 */
export default function RegisterServiceWorker() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      console.warn('⚠️ Service Worker not supported');
      return;
    }

    // DEVELOPMENT MODE: Unregister all service workers
    const isDevelopment = process.env.NODE_ENV === 'development' || 
                          window.location.hostname === 'localhost' ||
                          window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
      console.log('🔧 DEV MODE: Unregistering all service workers...');
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
          console.log('✅ Service Worker unregistered');
        });
      });
      return; // Don't register in development
    }

    let registration: ServiceWorkerRegistration;

    const registerServiceWorker = async () => {
      try {
        registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('✅ Service Worker registered:', registration.scope);

        // Check for updates every hour
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('🔄 New Service Worker installing...');

          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              console.log('📝 SW state changed:', newWorker.state);

              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available
                console.log('🎉 New Service Worker available!');
                setWaitingWorker(newWorker);
                setShowUpdatePrompt(true);
              }
            });
          }
        });

        // Handle controller change (when new SW takes over)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('🔄 Service Worker controller changed');
          // Reload the page to get the new content
          window.location.reload();
        });

        // Check if there's a waiting worker already
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
          setShowUpdatePrompt(true);
        }

      } catch (error) {
        console.error('❌ Service Worker registration failed:', error);
      }
    };

    // Register on load
    if (document.readyState === 'complete') {
      registerServiceWorker();
    } else {
      window.addEventListener('load', registerServiceWorker);
    }

    return () => {
      window.removeEventListener('load', registerServiceWorker);
    };
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      // Tell the waiting service worker to skip waiting and activate
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setShowUpdatePrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowUpdatePrompt(false);
  };

  if (!showUpdatePrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Update Available
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A new version of Krawl is available. Update now for the latest features and improvements.
            </p>

            {/* Actions */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Update Now
              </button>
              <button
                onClick={handleDismiss}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

