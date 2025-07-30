import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  ShieldCheckIcon, 
  LockClosedIcon, 
  EyeSlashIcon, 
  KeyIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function SecurityPage() {
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
            <ShieldCheckIcon className="h-8 w-8 text-emerald-500 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Security & Privacy
            </h1>
          </div>
          <p className="text-xl text-blue-200 mt-4">
            Military-grade security protecting your most sensitive health data
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Security Overview */}
        <div className="bg-emerald-900/20 border border-emerald-600/30 rounded-xl p-8 mb-12">
          <div className="flex items-start">
            <CheckBadgeIcon className="h-8 w-8 text-emerald-400 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-emerald-300 mb-4">Bank-Level Security Standards</h2>
              <p className="text-emerald-100 text-lg">
                Vitalis employs military-grade encryption and follows the highest security standards used by 
                financial institutions and healthcare organizations to protect your sensitive health data.
              </p>
            </div>
          </div>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          
          {/* End-to-End Encryption */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <LockClosedIcon className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">End-to-End Encryption</h3>
            <p className="text-blue-100 mb-4">
              All health data is encrypted using AES-256 encryption both in transit and at rest. 
              Only you can decrypt and access your personal health information.
            </p>
            <div className="bg-blue-900/30 rounded-lg p-3">
              <p className="text-blue-200 text-sm font-medium">✓ AES-256 encryption standard</p>
              <p className="text-blue-200 text-sm font-medium">✓ Zero-knowledge architecture</p>
            </div>
          </div>

          {/* HIPAA Compliance */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <ShieldCheckIcon className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">HIPAA/GDPR Compliant</h3>
            <p className="text-blue-100 mb-4">
              Full compliance with healthcare privacy regulations including HIPAA (US), 
              GDPR (EU), and Personal Data Protection Act (India).
            </p>
            <div className="bg-purple-900/30 rounded-lg p-3">
              <p className="text-purple-200 text-sm font-medium">✓ Regular compliance audits</p>
              <p className="text-purple-200 text-sm font-medium">✓ Data residency options</p>
            </div>
          </div>

          {/* Secure Infrastructure */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <CloudIcon className="h-12 w-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Secure Cloud Infrastructure</h3>
            <p className="text-blue-100 mb-4">
              Hosted on AWS/Azure with SOC 2 Type II certified data centers. 
              Multi-region backup and disaster recovery protocols.
            </p>
            <div className="bg-emerald-900/30 rounded-lg p-3">
              <p className="text-emerald-200 text-sm font-medium">✓ 99.99% uptime guarantee</p>
              <p className="text-emerald-200 text-sm font-medium">✓ Real-time monitoring</p>
            </div>
          </div>

          {/* Device Security */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <DevicePhoneMobileIcon className="h-12 w-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Device-Level Security</h3>
            <p className="text-blue-100 mb-4">
              Biometric authentication, device fingerprinting, and secure key storage 
              protect access even if your device is compromised.
            </p>
            <div className="bg-cyan-900/30 rounded-lg p-3">
              <p className="text-cyan-200 text-sm font-medium">✓ Biometric authentication</p>
              <p className="text-cyan-200 text-sm font-medium">✓ Hardware security modules</p>
            </div>
          </div>

          {/* Access Controls */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <KeyIcon className="h-12 w-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Advanced Access Controls</h3>
            <p className="text-blue-100 mb-4">
              Multi-factor authentication, role-based access control, and granular 
              permissions ensure only authorized access to your data.
            </p>
            <div className="bg-yellow-900/30 rounded-lg p-3">
              <p className="text-yellow-200 text-sm font-medium">✓ Multi-factor authentication</p>
              <p className="text-yellow-200 text-sm font-medium">✓ Session management</p>
            </div>
          </div>

          {/* Privacy by Design */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <EyeSlashIcon className="h-12 w-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Privacy by Design</h3>
            <p className="text-blue-100 mb-4">
              Data minimization, anonymization, and local processing ensure your 
              privacy is protected at every stage of data handling.
            </p>
            <div className="bg-indigo-900/30 rounded-lg p-3">
              <p className="text-indigo-200 text-sm font-medium">✓ Local data processing</p>
              <p className="text-indigo-200 text-sm font-medium">✓ Data anonymization</p>
            </div>
          </div>
        </div>

        {/* Security Certifications */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-blue-800/30 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Security Certifications & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheckIcon className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="font-bold text-white">SOC 2 Type II</h3>
              <p className="text-blue-200 text-sm">Security & Availability</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheckIcon className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="font-bold text-white">HIPAA Compliant</h3>
              <p className="text-blue-200 text-sm">Healthcare Privacy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckBadgeIcon className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white">GDPR Compliant</h3>
              <p className="text-blue-200 text-sm">European Privacy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <LockClosedIcon className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="font-bold text-white">ISO 27001</h3>
              <p className="text-blue-200 text-sm">Information Security</p>
            </div>
          </div>
        </div>

        {/* Data Protection Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-blue-800/30">
            <h3 className="text-xl font-bold text-white mb-4">Data Protection Measures</h3>
            <div className="space-y-3">
              <div className="flex items-center text-blue-100">
                <CheckBadgeIcon className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                <span>Data encrypted at rest using AES-256</span>
              </div>
              <div className="flex items-center text-blue-100">
                <CheckBadgeIcon className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                <span>TLS 1.3 encryption for data in transit</span>
              </div>
              <div className="flex items-center text-blue-100">
                <CheckBadgeIcon className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                <span>Regular security audits and penetration testing</span>
              </div>
              <div className="flex items-center text-blue-100">
                <CheckBadgeIcon className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                <span>24/7 security monitoring and incident response</span>
              </div>
              <div className="flex items-center text-blue-100">
                <CheckBadgeIcon className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                <span>Automated backup and disaster recovery</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-blue-800/30">
            <h3 className="text-xl font-bold text-white mb-4">Privacy Controls</h3>
            <div className="space-y-3">
              <div className="flex items-center text-blue-100">
                <CheckBadgeIcon className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                <span>Granular privacy settings and controls</span>
              </div>
              <div className="flex items-center text-blue-100">
                <CheckBadgeIcon className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                <span>Right to data portability and deletion</span>
              </div>
              <div className="flex items-center text-blue-100">
                <CheckBadgeIcon className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                <span>Transparent data usage and sharing policies</span>
              </div>
              <div className="flex items-center text-blue-100">
                <CheckBadgeIcon className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                <span>Optional data sharing with explicit consent</span>
              </div>
              <div className="flex items-center text-blue-100">
                <CheckBadgeIcon className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                <span>Anonymous analytics with no personal data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Incident Reporting */}
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-8 mb-8">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-yellow-300 mb-3">Security Incident Reporting</h3>
              <p className="text-yellow-100 mb-4">
                If you discover a security vulnerability or have concerns about the security of your data, 
                please report it immediately to our security team.
              </p>
              <div className="bg-yellow-900/30 rounded-lg p-4">
                <p className="text-yellow-200 font-medium">Security Contact: security@vitalis.health</p>
                <p className="text-yellow-200 text-sm mt-1">
                  We typically respond to security reports within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Security Team */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Questions About Security?</h3>
          <p className="text-blue-200 mb-6">
            Our security team is available to answer any questions about how we protect your health data.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
          >
            Contact Security Team
          </Link>
        </div>
      </div>
    </div>
  );
}
