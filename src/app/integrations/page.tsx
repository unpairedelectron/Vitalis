'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  DevicePhoneMobileIcon,
  CloudIcon,
  CpuChipIcon,
  HeartIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BoltIcon,
  CheckCircleIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartIconSolid 
} from '@heroicons/react/24/solid';
import DeviceManager from '@/components/DeviceManagerNew';

export default function IntegrationsPage() {
  const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    // Get current user from session/localStorage
    const userId = localStorage.getItem('userId') || 'demo-user';
    setCurrentUser({ id: userId });
  }, []);
  const deviceCategories = [
    {
      title: "Smartwatches",
      icon: DevicePhoneMobileIcon,
      color: "blue",
      devices: [
        { name: "Apple Watch", status: "✅ Fully Supported", logo: "🍎" },
        { name: "Samsung Galaxy Watch", status: "✅ Fully Supported", logo: "📱" },
        { name: "Fitbit Versa/Sense", status: "✅ Fully Supported", logo: "⌚" },
        { name: "Garmin Forerunner", status: "✅ Fully Supported", logo: "🏃" },
        { name: "Amazfit GTR", status: "✅ Fully Supported", logo: "⚡" },
        { name: "Huawei Watch GT", status: "✅ Fully Supported", logo: "📶" }
      ]
    },
    {
      title: "Fitness Trackers",
      icon: BoltIcon,
      color: "green",
      devices: [
        { name: "Fitbit Charge", status: "✅ Fully Supported", logo: "💪" },
        { name: "Xiaomi Mi Band", status: "✅ Fully Supported", logo: "🎯" },
        { name: "Fire-Boltt Ninja", status: "✅ Fully Supported", logo: "🔥" },
        { name: "boAt Xtend", status: "✅ Fully Supported", logo: "🚢" },
        { name: "Noise ColorFit", status: "✅ Fully Supported", logo: "🎨" },
        { name: "Fastrack Reflex", status: "⚠️ Basic Support", logo: "⏰" }
      ]
    },
    {
      title: "Health Rings",
      icon: HeartIcon,
      color: "purple",
      devices: [
        { name: "Oura Ring", status: "✅ Fully Supported", logo: "💍" },
        { name: "Motiv Ring", status: "⚠️ Basic Support", logo: "⭕" },
        { name: "Circular Ring", status: "🔄 Coming Soon", logo: "🔵" }
      ]
    },
    {
      title: "Health Platforms",
      icon: CloudIcon,
      color: "cyan",
      devices: [
        { name: "Apple Health", status: "✅ Fully Supported", logo: "🍎" },
        { name: "Samsung Health", status: "✅ Fully Supported", logo: "📱" },
        { name: "Google Fit", status: "✅ Fully Supported", logo: "🔍" },
        { name: "Fitbit App", status: "✅ Fully Supported", logo: "📊" },
        { name: "Garmin Connect", status: "✅ Fully Supported", logo: "🛰️" },
        { name: "Strava", status: "⚠️ Basic Support", logo: "🏃" }
      ]
    }
  ];

  const medicalDevices = [
    { name: "Blood Pressure Monitors", status: "✅ Supported", logo: "🩺" },
    { name: "Blood Glucose Meters", status: "✅ Supported", logo: "💉" },
    { name: "Smart Scales", status: "✅ Supported", logo: "⚖️" },
    { name: "Pulse Oximeters", status: "✅ Supported", logo: "🫁" },
    { name: "ECG Monitors", status: "✅ Supported", logo: "💓" },
    { name: "Sleep Trackers", status: "✅ Supported", logo: "😴" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-blue-800/30 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center">
            <CpuChipIcon className="h-8 w-8 text-purple-500 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Device Integrations
            </h1>
          </div>
          <p className="text-xl text-blue-200 mt-4">
            Connect 50+ health devices and platforms to Vitalis for comprehensive health intelligence
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Integration Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl p-6 border border-blue-600/30 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
            <div className="text-blue-100">Supported Devices</div>
          </div>
          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-green-600/30 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
            <div className="text-green-100">Sync Accuracy</div>
          </div>
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-600/30 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">&lt;5s</div>
            <div className="text-purple-100">Real-Time Sync</div>
          </div>
          <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl p-6 border border-orange-600/30 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
            <div className="text-orange-100">Continuous Monitoring</div>
          </div>
        </div>

        {/* Device Categories */}
        {deviceCategories.map((category, index) => (
          <div key={index} className="mb-12">
            <div className="flex items-center mb-6">
              <category.icon className={`h-8 w-8 text-${category.color}-400 mr-3`} />
              <h2 className="text-2xl font-bold text-white">{category.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.devices.map((device, deviceIndex) => (
                <div
                  key={deviceIndex}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30 hover:border-blue-600/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{device.logo}</div>
                    <div className="text-sm">
                      {device.status.includes('✅') && (
                        <span className="text-green-400 font-medium">{device.status}</span>
                      )}
                      {device.status.includes('⚠️') && (
                        <span className="text-yellow-400 font-medium">{device.status}</span>
                      )}
                      {device.status.includes('🔄') && (
                        <span className="text-blue-400 font-medium">{device.status}</span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{device.name}</h3>
                  
                  <div className="space-y-2 text-sm text-blue-200">
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
                      Heart Rate Monitoring
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
                      Activity Tracking
                    </div>
                    {device.status.includes('✅') && (
                      <>
                        <div className="flex items-center">
                          <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
                          Sleep Analysis
                        </div>
                        <div className="flex items-center">
                          <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
                          Real-time Sync
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Medical Devices */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <ShieldCheckIcon className="h-8 w-8 text-red-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Medical Grade Devices</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicalDevices.map((device, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-xl p-6 border border-red-600/30 hover:border-red-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{device.logo}</div>
                  <span className="text-green-400 font-medium text-sm">{device.status}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{device.name}</h3>
                <p className="text-red-100 text-sm">
                  Clinical-grade accuracy with FDA-cleared algorithms for medical data analysis
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Process */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-blue-800/30 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">How Device Integration Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Connect</h3>
              <p className="text-blue-200">
                Authorize Vitalis to access your device data through secure OAuth connections
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sync</h3>
              <p className="text-blue-200">
                Real-time data synchronization with military-grade encryption and validation
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-400">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Analyze</h3>
              <p className="text-blue-200">
                AI-powered analysis provides clinical insights and personalized recommendations
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise Integrations */}
        <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-xl p-8 border border-purple-600/30 mb-12">
          <div className="flex items-start">
            <CpuChipIcon className="h-8 w-8 text-purple-400 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-purple-300 mb-4">Enterprise & Healthcare Integrations</h2>
              <p className="text-purple-100 mb-6">
                Seamlessly integrate Vitalis with your existing healthcare systems and enterprise platforms.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white">Electronic Health Records (EHR)</h3>
                  <ul className="space-y-2 text-purple-100">
                    <li className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
                      Epic MyChart Integration
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
                      Cerner PowerChart Integration
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
                      FHIR API Compatibility
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white">Enterprise Platforms</h3>
                  <ul className="space-y-2 text-purple-100">
                    <li className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
                      Microsoft 365 Health
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
                      Salesforce Health Cloud
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
                      Custom API Integrations
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Device Manager Component */}
        {currentUser && (
          <div className="mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-blue-800/30">
              <div className="flex items-center mb-6">
                <DevicePhoneMobileIcon className="h-8 w-8 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">My Connected Devices</h2>
              </div>
              <div className="bg-white rounded-lg">
                <DeviceManager userId={currentUser.id} />
              </div>
            </div>
          </div>
        )}

        {/* Request Integration */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Don't See Your Device?</h3>
          <p className="text-blue-200 mb-6">
            We're constantly adding new device integrations. Request support for your device and 
            we'll prioritize it based on user demand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              Request Integration
            </Link>
            <Link
              href="/api-docs"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all border border-purple-600/30"
            >
              View API Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
