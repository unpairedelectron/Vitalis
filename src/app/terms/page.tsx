'use client';

import React from 'react';
import { 
  DocumentTextIcon,
  ShieldExclamationIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function TermsOfServicePage() {
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
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-blue-200 text-lg">Last updated: July 30, 2025</p>
        </div>

        {/* Medical Disclaimer Alert */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-red-300 mb-2">Important Medical Disclaimer</h3>
              <p className="text-red-200">
                Vitalis is a health monitoring tool and does not provide medical advice, diagnosis, or treatment. 
                Always consult with qualified healthcare professionals for medical decisions. 
                In case of medical emergencies, contact your local emergency services immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <DocumentTextIcon className="h-6 w-6 text-blue-400" />
              <span>1. Acceptance of Terms</span>
            </h2>
            <div className="text-blue-200 space-y-4">
              <p>
                By accessing or using Vitalis ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
                If you disagree with any part of these terms, you may not access the Service.
              </p>
              <p>
                These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
            <div className="text-blue-200 space-y-4">
              <p>
                Vitalis is a health intelligence platform that aggregates data from wearable devices and health apps 
                to provide AI-powered health insights, trend analysis, and wellness recommendations.
              </p>
              <p><strong className="text-white">Our Service includes:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Real-time health monitoring and analysis</li>
                <li>AI-powered health insights and recommendations</li>
                <li>Medical report analysis and interpretation</li>
                <li>Health trend tracking and predictive analytics</li>
                <li>Integration with popular wearable devices and health platforms</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Medical Disclaimer & Limitations</h2>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-300 mb-4">Important Medical Information</h3>
              <div className="text-orange-200 space-y-3 text-sm">
                <p><strong>Not Medical Advice:</strong> Vitalis does not provide medical advice, diagnosis, or treatment recommendations.</p>
                <p><strong>Not FDA Approved:</strong> While we use FDA-cleared algorithms, the overall platform is not FDA approved as a medical device.</p>
                <p><strong>Emergency Situations:</strong> Do not rely on Vitalis for medical emergencies. Contact emergency services immediately.</p>
                <p><strong>Healthcare Professional Consultation:</strong> Always consult qualified healthcare professionals for medical decisions.</p>
                <p><strong>Accuracy Limitations:</strong> While we strive for accuracy, health data and insights may contain errors or limitations.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. User Accounts & Responsibilities</h2>
            <div className="text-blue-200 space-y-4">
              <h3 className="text-lg font-semibold text-white">Account Creation</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You must be at least 13 years old to use Vitalis</li>
                <li>Users under 18 require parental consent</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-white mt-6">User Responsibilities</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the Service only for lawful purposes</li>
                <li>Do not share account access with others</li>
                <li>Report any security breaches immediately</li>
                <li>Ensure accuracy of health data you provide</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Health Data & Privacy</h2>
            <div className="text-blue-200 space-y-4">
              <p>
                Your health data is subject to our Privacy Policy, which forms part of these Terms. 
                By using Vitalis, you consent to our collection, use, and processing of your health information 
                as described in our Privacy Policy.
              </p>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Key Privacy Points</h3>
                <ul className="list-disc list-inside space-y-1 text-blue-200 text-sm">
                  <li>HIPAA-compliant data handling</li>
                  <li>End-to-end encryption for sensitive data</li>
                  <li>No sharing with third parties without consent</li>
                  <li>Right to data portability and deletion</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Subscription Plans & Billing</h2>
            <div className="text-blue-200 space-y-4">
              <h3 className="text-lg font-semibold text-white">Free Plan</h3>
              <p>Basic features available at no cost with limitations on analysis depth and data retention.</p>
              
              <h3 className="text-lg font-semibold text-white">Paid Plans</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Billed monthly or annually as selected</li>
                <li>Automatic renewal unless cancelled</li>
                <li>Pro-rated refunds for annual plans (first 30 days)</li>
                <li>No refunds for monthly subscriptions</li>
                <li>Prices subject to change with 30 days notice</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
            <div className="text-blue-200 space-y-4">
              <p>
                The Service and its original content, features, and functionality are owned by Vitalis Health Intelligence 
                and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <h3 className="text-lg font-semibold text-white">Your Content</h3>
              <p>
                You retain ownership of health data you provide. By using our Service, you grant us a limited license 
                to process your data to provide AI analysis and insights.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Prohibited Uses</h2>
            <div className="text-blue-200">
              <p>You agree not to use the Service:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>For any unlawful purpose or to solicit unlawful activity</li>
                <li>To violate any applicable laws or regulations</li>
                <li>To transmit or procure sending of advertising or promotional material</li>
                <li>To impersonate or attempt to impersonate another person</li>
                <li>To engage in any other conduct that restricts or inhibits use by others</li>
                <li>To attempt to reverse engineer our AI algorithms</li>
                <li>To use the Service for medical diagnosis or treatment decisions</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <div className="text-red-200 space-y-3">
                <p className="font-semibold text-red-300">IMPORTANT LIABILITY LIMITATIONS:</p>
                <p>
                  TO THE FULLEST EXTENT PERMITTED BY LAW, VITALIS SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, 
                  DATA, USE, OR OTHER INTANGIBLE LOSSES.
                </p>
                <p>
                  OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES SHALL NOT EXCEED THE AMOUNT YOU PAID TO US 
                  IN THE 12 MONTHS PRECEDING THE CLAIM.
                </p>
                <p>
                  WE MAKE NO WARRANTIES ABOUT THE ACCURACY, RELIABILITY, OR MEDICAL EFFICACY OF HEALTH INSIGHTS.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
            <div className="text-blue-200 space-y-4">
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice, 
                for any reason, including breach of Terms.
              </p>
              <p>
                You may terminate your account at any time through your account settings or by contacting us.
              </p>
              <p>
                Upon termination, your right to use the Service will cease immediately, and your data will be 
                handled according to our Privacy Policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
            <div className="text-blue-200">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, 
                without regard to conflict of law provisions.
              </p>
              <p className="mt-3">
                Any disputes shall be resolved exclusively in the courts of Delhi, India.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
            <div className="text-blue-200">
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of significant changes 
                via email or through the Service. Your continued use constitutes acceptance of the modified Terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-200 mb-3">For questions about these Terms:</p>
              <div className="space-y-1 text-blue-300">
                <p><strong>Company:</strong> Vitalis Health Intelligence Pvt. Ltd.</p>
                <p><strong>Email:</strong> legal@vitalis.health</p>
                <p><strong>Phone:</strong> +91-11-4567-8900</p>
                <p><strong>Address:</strong> New Delhi, India</p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Health Journey?</h3>
            <p className="text-blue-200 mb-6">By using Vitalis, you agree to these Terms of Service and our Privacy Policy.</p>
            <Link 
              href="/dashboard"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 inline-block"
            >
              Start Using Vitalis
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
