'use client';

import React, { useState } from 'react';
import { 
  QuestionMarkCircleIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CogIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function HelpCenterPage() {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: QuestionMarkCircleIcon },
    { id: 'devices', name: 'Device Setup', icon: DevicePhoneMobileIcon },
    { id: 'analytics', name: 'Health Analytics', icon: ChartBarIcon },
    { id: 'privacy', name: 'Privacy & Security', icon: ShieldCheckIcon },
    { id: 'account', name: 'Account Settings', icon: CogIcon },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: ExclamationTriangleIcon }
  ];

  const faqs: FAQItem[] = [
    // Getting Started
    {
      category: 'getting-started',
      question: 'What is Vitalis and how does it work?',
      answer: 'Vitalis is a military-grade health intelligence platform that aggregates data from your wearable devices (Apple Watch, Samsung Galaxy Watch, Fitbit, Oura Ring) and uses AI to provide clinical-level health insights. Our Claude 3.5 Sonnet AI analyzes your health patterns against WHO guidelines to give you personalized recommendations.'
    },
    {
      category: 'getting-started',
      question: 'How do I get started with Vitalis?',
      answer: 'Simply sign up for a free account, connect your wearable devices or health apps, and Vitalis will automatically start analyzing your data. You can upgrade to Guardian or Platinum plans for advanced AI features and medical report analysis.'
    },
    {
      category: 'getting-started',
      question: 'What health devices does Vitalis support?',
      answer: 'Vitalis supports 50+ devices including Apple Watch, Samsung Galaxy Watch, Fitbit, Oura Ring, Xiaomi Mi Band, Fire-Boltt watches, and health platforms like Samsung Health, Apple Health, Google Fit. We continuously add support for new devices.'
    },

    // Device Setup
    {
      category: 'devices',
      question: 'How do I connect my Apple Watch?',
      answer: 'Go to Device Manager in your dashboard, select "Apple Health", and follow the authorization prompts. Vitalis will sync your heart rate, activity, sleep, and other health metrics automatically. Make sure your iPhone has the latest iOS version.'
    },
    {
      category: 'devices',
      question: 'Why isn\'t my Samsung Galaxy Watch syncing?',
      answer: 'Ensure Samsung Health is installed and permissions are granted. In Vitalis, go to Device Manager > Samsung Health > Reconnect. If issues persist, try logging out and back into Samsung Health, then reconnect to Vitalis.'
    },
    {
      category: 'devices',
      question: 'Can I connect multiple devices at once?',
      answer: 'Yes! Vitalis can aggregate data from multiple devices simultaneously. This provides more comprehensive health insights. For example, you can use an Apple Watch for heart rate and an Oura Ring for sleep tracking.'
    },

    // Health Analytics
    {
      category: 'analytics',
      question: 'How accurate are Vitalis health insights?',
      answer: 'Our AI uses FDA-cleared algorithms with 99.9% accuracy for core metrics. We follow WHO guidelines and clinical standards. However, Vitalis is not a medical device - always consult healthcare professionals for medical decisions.'
    },
    {
      category: 'analytics',
      question: 'What does my Health Score mean?',
      answer: 'Your Health Score (0-100) combines multiple factors: heart rate variability, sleep quality, activity levels, stress indicators, and trend analysis. 90+ is excellent, 70-89 is good, 50-69 needs attention, below 50 requires immediate focus.'
    },
    {
      category: 'analytics',
      question: 'How does medical report analysis work?',
      answer: 'Upload PDF/image files of lab reports, X-rays, or medical documents. Our Omni-Medical Analysis Protocol extracts data using OCR and AI, then provides plain-English explanations, trend analysis, and recommendations based on clinical guidelines.'
    },

    // Privacy & Security
    {
      category: 'privacy',
      question: 'How secure is my health data?',
      answer: 'Vitalis uses military-grade security: AES-256 encryption, HIPAA compliance, SOC 2 certification, and zero-knowledge architecture. We never share your personal health data with advertisers or third parties without explicit consent.'
    },
    {
      category: 'privacy',
      question: 'Can I delete my data?',
      answer: 'Yes, you have complete control. You can delete specific health records, export all your data, or permanently delete your entire account. Data deletion is irreversible and completed within 30 days.'
    },
    {
      category: 'privacy',
      question: 'Do you share data with insurance companies?',
      answer: 'Never. We do not share individual health data with insurance companies, employers, or advertisers. We may share anonymized, aggregated research data only with your explicit consent.'
    },

    // Account Settings
    {
      category: 'account',
      question: 'How do I upgrade my plan?',
      answer: 'Go to Account Settings > Billing, select Guardian or Platinum plan, and complete payment. Upgrades are immediate with pro-rated billing. You get a 14-day free trial for first-time upgrades.'
    },
    {
      category: 'account',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, cancel anytime in Account Settings > Billing. You\'ll retain premium features until your billing period ends, then automatically downgrade to the free Explorer plan. No cancellation fees.'
    },
    {
      category: 'account',
      question: 'How do I change my emergency contacts?',
      answer: 'In Account Settings > Emergency Contacts, add up to 3 contacts who will be notified of critical health alerts. Include phone numbers and relationship. Test notifications to ensure they work properly.'
    },

    // Troubleshooting
    {
      category: 'troubleshooting',
      question: 'Why am I not receiving health alerts?',
      answer: 'Check notification settings in your device and Vitalis app. Ensure "Critical Health Alerts" is enabled. For iOS, check Settings > Notifications > Vitalis. For Android, check App Settings > Notifications.'
    },
    {
      category: 'troubleshooting',
      question: 'My data isn\'t syncing - what should I do?',
      answer: 'Try these steps: 1) Check internet connection, 2) Force close and reopen the app, 3) Disconnect and reconnect your device in Device Manager, 4) Restart your phone/watch, 5) Contact support if issues persist.'
    },
    {
      category: 'troubleshooting',
      question: 'How do I contact customer support?',
      answer: 'Email support@vitalis.health for general inquiries, or privacy@vitalis.health for privacy questions. Premium users get priority support with 24-hour response times. Include your account email and detailed description of the issue.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => faq.category === activeCategory);

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
                  Vitalis Help Center
                </span>
              </div>
            </div>
            
            <Link 
              href="/dashboard"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
            >
              Launch Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              How can we help?
            </span>
          </h1>
          <p className="text-xl text-blue-200 mb-8">
            Find answers to common questions about Vitalis health monitoring, device setup, and features.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full px-6 py-4 rounded-xl bg-black/50 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:border-purple-500/50 text-lg"
              />
              <QuestionMarkCircleIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 border border-green-500/30 text-center">
              <DevicePhoneMobileIcon className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Device Setup</h3>
              <p className="text-green-200 text-sm mb-4">Connect your smartwatch or fitness tracker</p>
              <button 
                onClick={() => setActiveCategory('devices')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Get Started
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 border border-purple-500/30 text-center">
              <ChartBarIcon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Understanding Insights</h3>
              <p className="text-purple-200 text-sm mb-4">Learn about your health analytics</p>
              <button 
                onClick={() => setActiveCategory('analytics')}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Learn More
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-500/30 text-center">
              <ShieldCheckIcon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Privacy & Security</h3>
              <p className="text-blue-200 text-sm mb-4">Your data protection questions</p>
              <button 
                onClick={() => setActiveCategory('privacy')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-white mb-6">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-200 hover:bg-blue-700/30 hover:text-white'
                    }`}
                  >
                    <category.icon className="h-5 w-5" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-white mb-6">
                {categories.find(cat => cat.id === activeCategory)?.name} FAQs
              </h2>
              
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div key={index} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-700/20 transition-colors"
                    >
                      <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
                      {expandedFAQ === index ? (
                        <ChevronDownIcon className="h-5 w-5 text-blue-400 flex-shrink-0" />
                      ) : (
                        <ChevronRightIcon className="h-5 w-5 text-blue-400 flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedFAQ === index && (
                      <div className="px-6 pb-6">
                        <p className="text-blue-200 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold text-white mb-4">Still Need Help?</h2>
            <p className="text-xl text-blue-200 mb-8">
              Our support team is here to help you get the most out of Vitalis
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Email Support</h3>
                <p className="text-blue-200 text-sm mb-4">Get help via email</p>
                <a 
                  href="mailto:support@vitalis.health"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block"
                >
                  Send Email
                </a>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Priority Support</h3>
                <p className="text-purple-200 text-sm mb-4">24-hour response for premium users</p>
                <Link
                  href="/#pricing"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block"
                >
                  Upgrade Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
