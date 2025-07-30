'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CheckCircleIcon,
  ArrowRightIcon,
  HeartIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export default function SignUpSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Get user email from localStorage (set during signup)
    const signupEmail = localStorage.getItem('vitalis_signup_email');
    if (signupEmail) {
      setUserEmail(signupEmail);
      localStorage.removeItem('vitalis_signup_email'); // Clean up
    }

    // Auto-redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/signin');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleContinueToSignIn = () => {
    router.push('/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-6">
            <HeartIconSolid className="h-10 w-10 text-red-500" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Vitalis
            </span>
          </Link>
        </div>

        {/* Success Card */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 shadow-2xl mb-6">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-10 w-10 text-green-400" />
          </div>
          
          {/* Success Message */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-3">
              🎉 Welcome to Vitalis!
            </h1>
            <p className="text-blue-200 text-lg mb-2">
              Your account has been created successfully
            </p>
            {userEmail && (
              <p className="text-blue-300 text-sm">
                Confirmation sent to <span className="text-white font-medium">{userEmail}</span>
              </p>
            )}
          </div>

          {/* Features Preview */}
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mb-6">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <SparklesIcon className="h-5 w-5 mr-2 text-purple-400" />
              What's Next?
            </h3>
            <div className="space-y-2 text-sm text-blue-200">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span>Connect your smartwatch or fitness tracker</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <span>Get your first AI health insights</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span>Upload medical reports for analysis</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinueToSignIn}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center mb-4"
          >
            <span>Continue to Sign In</span>
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>

          {/* Auto-redirect Notice */}
          <p className="text-blue-300 text-sm">
            Automatically redirecting in {countdown} seconds...
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center text-sm text-green-200">
            <ShieldCheckIcon className="h-4 w-4 mr-2" />
            <span>Your health data is protected by military-grade encryption</span>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="block text-purple-400 hover:text-purple-300 text-sm transition-colors"
          >
            ← Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-4 text-xs text-blue-300">
            <Link href="/help" className="hover:text-blue-200">Help Center</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-blue-200">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-blue-200">Terms</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
