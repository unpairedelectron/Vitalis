'use client';

import React from 'react';
import { 
  ShieldCheckIcon,
  LockClosedIcon,
  EyeSlashIcon,
  DocumentTextIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      
      {/* Navigation */}
      <nav className="border-b border-blue-800/30 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors">
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Back to Home</span>
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
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-blue-200 text-lg">Last updated: July 30, 2025</p>
          
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-5 w-5 text-green-400" />
              <span className="text-green-300">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <LockClosedIcon className="h-5 w-5 text-blue-400" />
              <span className="text-blue-300">End-to-End Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <EyeSlashIcon className="h-5 w-5 text-purple-400" />
              <span className="text-purple-300">Zero-Knowledge Architecture</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <DocumentTextIcon className="h-6 w-6 text-blue-400" />
              <span>1. Information We Collect</span>
            </h2>
            <div className="text-blue-200 space-y-4">
              <h3 className="text-lg font-semibold text-white">Health Data</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Heart rate, blood pressure, and other vital signs from connected devices</li>
                <li>Sleep patterns, activity levels, and exercise data</li>
                <li>Medical reports and documents you choose to upload</li>
                <li>Health metrics from Samsung Health, Apple Health, Fitbit, Oura Ring</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-white mt-6">Account Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email address and basic profile information</li>
                <li>Device connectivity and synchronization preferences</li>
                <li>Usage analytics to improve our AI algorithms</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <div className="text-blue-200 space-y-2">
              <p><strong className="text-white">AI Health Analysis:</strong> Generate personalized health insights and recommendations</p>
              <p><strong className="text-white">Medical Report Processing:</strong> Analyze uploaded medical documents for health trends</p>
              <p><strong className="text-white">Predictive Modeling:</strong> Identify potential health risks and optimization opportunities</p>
              <p><strong className="text-white">Platform Improvement:</strong> Enhance AI accuracy and user experience (anonymized data only)</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Protection & Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-2">HIPAA Compliance</h3>
                <p className="text-green-200 text-sm">All health data handling meets HIPAA standards for medical information protection</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">End-to-End Encryption</h3>
                <p className="text-blue-200 text-sm">AES-256 encryption for data in transit and at rest</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Zero-Knowledge</h3>
                <p className="text-purple-200 text-sm">We cannot access your raw health data without your explicit consent</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-300 mb-2">SOC 2 Compliance</h3>
                <p className="text-orange-200 text-sm">Independently audited security controls and procedures</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing & Third Parties</h2>
            <div className="text-blue-200 space-y-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-300 mb-2">❌ We NEVER Share</h3>
                <ul className="list-disc list-inside space-y-1 text-red-200 text-sm">
                  <li>Your personal health data with advertisers or marketers</li>
                  <li>Individual health records with insurance companies</li>
                  <li>Identifiable information with research institutions</li>
                </ul>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-2">✅ Limited Sharing (With Your Consent)</h3>
                <ul className="list-disc list-inside space-y-1 text-green-200 text-sm">
                  <li>Healthcare providers you designate</li>
                  <li>Emergency contacts during critical health alerts</li>
                  <li>Anonymized, aggregated data for medical research</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights & Control</h2>
            <div className="text-blue-200 space-y-3">
              <p><strong className="text-white">Access:</strong> Download all your health data in standard formats</p>
              <p><strong className="text-white">Portability:</strong> Export your data to other platforms</p>
              <p><strong className="text-white">Deletion:</strong> Permanently delete your account and all associated data</p>
              <p><strong className="text-white">Correction:</strong> Update or correct any inaccurate information</p>
              <p><strong className="text-white">Consent Withdrawal:</strong> Revoke permissions for data processing at any time</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
            <div className="text-blue-200 space-y-2">
              <p><strong className="text-white">Active Accounts:</strong> Health data retained for AI analysis and trend tracking</p>
              <p><strong className="text-white">Inactive Accounts:</strong> Data automatically deleted after 2 years of inactivity</p>
              <p><strong className="text-white">Account Deletion:</strong> All data permanently deleted within 30 days</p>
              <p><strong className="text-white">Legal Requirements:</strong> Some data may be retained longer if required by law</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. International Data Transfers</h2>
            <div className="text-blue-200">
              <p>Your health data is processed in secure data centers located in:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                <li>India (primary) - compliant with Indian medical data regulations</li>
                <li>European Union - GDPR compliant processing</li>
                <li>United States - HIPAA compliant with adequate safeguards</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
            <div className="text-blue-200">
              <p>Vitalis is not intended for children under 13. We do not knowingly collect personal information from children under 13. For users aged 13-17, parental consent is required.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-200 mb-2">For privacy-related questions or requests:</p>
              <div className="space-y-1 text-blue-300">
                <p><strong>Email:</strong> privacy@vitalis.health</p>
                <p><strong>Phone:</strong> +91-11-4567-8900</p>
                <p><strong>Address:</strong> Vitalis Health Intelligence Pvt. Ltd., Delhi, India</p>
                <p><strong>Data Protection Officer:</strong> dpo@vitalis.health</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Policy Updates</h2>
            <div className="text-blue-200">
              <p>We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or through the app. Your continued use of Vitalis after such notifications constitutes acceptance of the updated policy.</p>
            </div>
          </section>

        </div>

        {/* Footer Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">Questions About Your Privacy?</h3>
            <p className="text-blue-200 mb-6">Our privacy team is here to help you understand how we protect your health data.</p>
            <a 
              href="mailto:privacy@vitalis.health"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 inline-block"
            >
              Contact Privacy Team
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
