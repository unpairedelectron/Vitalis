'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import { 
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  ArrowLeftIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export default function SettingsPage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p>Please sign in to view settings</p>
          <Link href="/signin" className="text-purple-400 hover:text-purple-300 mt-2 inline-block">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <HeartIconSolid className="h-8 w-8 text-red-500" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Vitalis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-blue-200">Manage your security, privacy, and app preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Security Settings */}
          <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center mb-4">
              <KeyIcon className="h-6 w-6 text-purple-400 mr-3" />
              <h2 className="text-xl font-bold text-white">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Change Password</p>
                  <p className="text-blue-300 text-sm">Update your account password</p>
                </div>
                <button className="bg-purple-600/20 border border-purple-500/30 text-purple-300 px-3 py-1 rounded text-sm opacity-50 cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Two-Factor Authentication</p>
                  <p className="text-blue-300 text-sm">Add extra security to your account</p>
                </div>
                <button className="bg-purple-600/20 border border-purple-500/30 text-purple-300 px-3 py-1 rounded text-sm opacity-50 cursor-not-allowed">
                  Enable
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center mb-4">
              <BellIcon className="h-6 w-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-bold text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Health Alerts</p>
                  <p className="text-blue-300 text-sm">Critical health notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer opacity-50">
                  <input type="checkbox" checked className="sr-only peer" disabled />
                  <div className="w-11 h-6 bg-green-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Weekly Reports</p>
                  <p className="text-blue-300 text-sm">Health summary emails</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer opacity-50">
                  <input type="checkbox" checked className="sr-only peer" disabled />
                  <div className="w-11 h-6 bg-blue-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center mb-4">
              <ShieldCheckIcon className="h-6 w-6 text-green-400 mr-3" />
              <h2 className="text-xl font-bold text-white">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Data Sharing</p>
                  <p className="text-blue-300 text-sm">Share anonymous health data for research</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer opacity-50">
                  <input type="checkbox" className="sr-only peer" disabled />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Analytics</p>
                  <p className="text-blue-300 text-sm">Help improve Vitalis with usage data</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer opacity-50">
                  <input type="checkbox" checked className="sr-only peer" disabled />
                  <div className="w-11 h-6 bg-blue-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Device Management */}
          <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center mb-4">
              <DevicePhoneMobileIcon className="h-6 w-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-bold text-white">Connected Devices</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Apple Watch</p>
                  <p className="text-green-400 text-sm">● Connected</p>
                </div>
                <button className="text-red-400 hover:text-red-300 text-sm opacity-50 cursor-not-allowed">
                  Disconnect
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Samsung Galaxy Watch</p>
                  <p className="text-blue-400 text-sm">○ Available</p>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm opacity-50 cursor-not-allowed">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
          <h3 className="font-semibold text-yellow-200 mb-2">🚧 Settings Under Development</h3>
          <p className="text-yellow-200 text-sm">
            Advanced settings, device management, and preference controls are currently being built. 
            Full functionality will be available in upcoming releases as we continue to enhance your Vitalis experience.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex space-x-4">
          <Link
            href="/profile"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
          >
            Edit Profile
          </Link>
          <Link
            href="/dashboard"
            className="bg-black/50 border border-blue-500/30 hover:bg-blue-500/20 text-blue-200 px-6 py-3 rounded-lg font-medium transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
