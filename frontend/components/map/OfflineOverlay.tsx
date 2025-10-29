import Link from 'next/link';
import { LuWifiOff } from 'react-icons/lu';

export function OfflineOverlay() {
  return (
    <div className="absolute inset-0 z-[999] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="max-w-md w-full mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <LuWifiOff className="w-10 h-10 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Map Unavailable Offline
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Map tiles require an internet connection to load. Only areas you've previously viewed while online will be cached.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 text-left">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
            💡 To use maps offline:
          </h3>
          <ol className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-decimal list-inside">
            <li>Connect to the internet</li>
            <li>Navigate around your favorite areas on the map</li>
            <li>Map tiles will be cached for 30 days</li>
            <li>Those areas will work offline next time!</li>
          </ol>
        </div>

        <div className="space-y-3">
          <Link
            href="/krawls"
            className="block w-full bg-gradient-to-r from-verde-500 to-verde-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-verde-600 hover:to-verde-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View Saved Krawls
          </Link>
          <Link
            href="/explore"
            className="block w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
          >
            Browse Gems
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
          Offline Mode
        </div>
      </div>
    </div>
  );
}