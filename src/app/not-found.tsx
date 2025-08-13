import Link from 'next/link';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8 relative">
          <h1 className="text-6xl font-bold text-gray-200">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist or may have been moved. 
          Let's get you back on track to your health journey.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-gray-500 mb-4">Need help? Try these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/about" className="text-indigo-600 hover:text-indigo-500">About</Link>
            <Link href="/integrations" className="text-indigo-600 hover:text-indigo-500">Integrations</Link>
            <Link href="/api-docs" className="text-indigo-600 hover:text-indigo-500">API Docs</Link>
            <Link href="/help" className="text-indigo-600 hover:text-indigo-500">Help Center</Link>
            <Link href="/contact" className="text-indigo-600 hover:text-indigo-500">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
