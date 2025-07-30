'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  EnvelopeIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (email) {
        setIsSubmitted(true);
      } else {
        setError('Please enter your email address');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <HeartIconSolid className="h-10 w-10 text-red-500" />
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Vitalis
              </span>
            </Link>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 shadow-2xl">
            <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-8 w-8 text-green-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">Check Your Email</h1>
            <p className="text-blue-200 mb-6">
              We've sent a password reset link to <span className="text-white font-medium">{email}</span>
            </p>
            
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-blue-200 text-sm">
                <strong className="text-blue-100">Didn't receive the email?</strong><br/>
                Check your spam folder or try again in a few minutes.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg"
              >
                Send Another Email
              </button>
              
              <Link
                href="/signin"
                className="block w-full bg-black/50 border border-blue-500/30 hover:bg-blue-500/20 text-blue-200 py-3 rounded-lg font-medium transition-all text-center"
              >
                Back to Sign In
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <HeartIconSolid className="h-10 w-10 text-red-500" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Vitalis
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Reset Your Password</h1>
          <p className="text-blue-200">Enter your email and we'll send you a reset link</p>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3 text-red-200 text-sm flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-200 text-sm">
                <strong className="text-yellow-100">Security Notice:</strong> For your protection, we'll only send reset links to verified email addresses associated with Vitalis accounts.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-bold transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending Reset Link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>

            <div className="text-center">
              <Link
                href="/signin"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center text-sm text-blue-300">
            <ShieldCheckIcon className="h-4 w-4 mr-1" />
            <span>All password resets are logged for security</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
