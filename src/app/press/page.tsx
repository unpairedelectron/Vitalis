'use client';

import React from 'react';
import { 
  NewspaperIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  TrophyIcon,
  UsersIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function PressPage() {
  const pressReleases = [
    {
      date: 'July 25, 2025',
      headline: 'Vitalis Secures ₹150 Crore Series A Funding to Revolutionize AI-Powered Healthcare',
      summary: 'Leading healthcare technology company Vitalis raises significant funding to expand its military-grade health intelligence platform across India and Southeast Asia.',
      category: 'Funding',
      readTime: '3 min read'
    },
    {
      date: 'June 15, 2025',
      headline: 'Vitalis Partners with AIIMS Delhi for Clinical Validation of AI Health Algorithms',
      summary: 'Strategic partnership with India\'s premier medical institution will validate Vitalis\'s AI-powered health insights against clinical standards.',
      category: 'Partnership',
      readTime: '4 min read'
    },
    {
      date: 'May 30, 2025',
      headline: 'Vitalis Achieves HIPAA Compliance and FDA Algorithm Clearance',
      summary: 'Company becomes first Indian health-tech startup to achieve both HIPAA compliance and FDA clearance for heart rate variability algorithms.',
      category: 'Regulatory',
      readTime: '2 min read'
    },
    {
      date: 'April 18, 2025',
      headline: 'Vitalis Launches Claude 3.5 Sonnet Integration for Advanced Medical Report Analysis',
      summary: 'New AI-powered feature can analyze complex medical reports and provide plain-English explanations within seconds.',
      category: 'Product',
      readTime: '5 min read'
    }
  ];

  const mediaKit = [
    {
      title: 'Company Logo Pack',
      description: 'High-resolution logos in various formats',
      format: 'PNG, SVG, EPS',
      size: '2.4 MB'
    },
    {
      title: 'Executive Photos',
      description: 'Professional headshots of leadership team',
      format: 'JPG, PNG',
      size: '8.1 MB'
    },
    {
      title: 'Product Screenshots',
      description: 'Dashboard and mobile app screenshots',
      format: 'PNG, JPG',
      size: '12.3 MB'
    },
    {
      title: 'Company Fact Sheet',
      description: 'Key statistics and company information',
      format: 'PDF',
      size: '1.2 MB'
    }
  ];

  const companyStats = [
    { number: '2M+', label: 'Active Users', description: 'Across India and Southeast Asia' },
    { number: '50+', label: 'Device Integrations', description: 'Apple, Samsung, Fitbit, Oura' },
    { number: '99.9%', label: 'Algorithm Accuracy', description: 'FDA-cleared precision' },
    { number: '24/7', label: 'Health Monitoring', description: 'Continuous AI analysis' }
  ];

  const awards = [
    {
      year: '2025',
      award: 'Best AI Innovation in Healthcare',
      organization: 'India Digital Health Awards',
      description: 'Recognized for breakthrough in democratizing clinical-grade health insights'
    },
    {
      year: '2025',
      award: 'Startup of the Year - HealthTech',
      organization: 'Economic Times Startup Awards',
      description: 'Leading innovation in artificial intelligence for preventive healthcare'
    },
    {
      year: '2024',
      award: 'Most Promising HealthTech Startup',
      organization: 'NASSCOM Deep Tech Awards',
      description: 'Excellence in deep technology application for healthcare solutions'
    }
  ];

  const executiveTeam = [
    {
      name: 'Dr. Priya Sharma',
      title: 'Chief Executive Officer & Co-Founder',
      bio: 'Former AIIMS Delhi cardiologist with 15 years in preventive medicine. Led digital health initiatives at Apollo Hospitals.',
      image: '👩‍⚕️'
    },
    {
      name: 'Arjun Patel',
      title: 'Chief Technology Officer & Co-Founder',
      bio: 'Ex-Google AI researcher with PhD from IIT Bombay. Previously led ML teams at Microsoft Healthcare.',
      image: '👨‍💻'
    },
    {
      name: 'Dr. Sarah Johnson',
      title: 'Chief Medical Officer',
      bio: 'MD/PhD from Johns Hopkins with 50+ peer-reviewed publications in wearable health technology.',
      image: '👩‍🔬'
    }
  ];

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
                  Vitalis Press
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
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Press & Media
            </span>
          </h1>
          <p className="text-xl text-blue-200 leading-relaxed mb-8">
            Latest news, updates, and resources about Vitalis's mission to democratize 
            clinical-grade health insights through AI technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:press@vitalis.health"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
            >
              Media Inquiries
            </a>
            <button className="border-2 border-blue-500 text-blue-300 hover:bg-blue-500/20 px-6 py-3 rounded-lg font-medium transition-all">
              Download Media Kit
            </button>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyStats.map((stat, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-blue-300 mb-1">{stat.label}</div>
                <div className="text-blue-200 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Latest Press Releases</h2>
            <p className="text-xl text-blue-200">Stay updated with our latest announcements</p>
          </div>
          
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 hover:border-purple-500/50 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2 text-blue-300">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="text-sm">{release.date}</span>
                      </div>
                      <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs font-medium">
                        {release.category}
                      </span>
                      <span className="text-blue-300 text-xs">{release.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 hover:text-blue-300 transition-colors cursor-pointer">
                      {release.headline}
                    </h3>
                    
                    <p className="text-blue-200 leading-relaxed">{release.summary}</p>
                  </div>
                  
                  <div className="mt-6 lg:mt-0 lg:ml-8">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
                      Read Full Release
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Executive Leadership</h2>
            <p className="text-xl text-blue-200">Meet the visionaries behind Vitalis</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {executiveTeam.map((exec, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">{exec.image}</div>
                <h3 className="text-xl font-bold text-white mb-2">{exec.name}</h3>
                <div className="text-blue-400 font-medium mb-4">{exec.title}</div>
                <p className="text-blue-200 text-sm leading-relaxed">{exec.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Awards & Recognition</h2>
            <p className="text-xl text-blue-200">Industry recognition for our innovation</p>
          </div>
          
          <div className="space-y-6">
            {awards.map((award, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl p-4 flex-shrink-0">
                    <TrophyIcon className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                        {award.year}
                      </span>
                      <h3 className="text-xl font-bold text-white">{award.award}</h3>
                    </div>
                    <div className="text-blue-300 font-medium mb-2">{award.organization}</div>
                    <p className="text-blue-200">{award.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Media Kit</h2>
            <p className="text-xl text-blue-200">Download assets for your coverage</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((item, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <ArrowDownTrayIcon className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-blue-200 text-sm mb-3">{item.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-300">{item.format}</span>
                  <span className="text-blue-300">{item.size}</span>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-2 rounded-lg font-medium transition-all">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold text-white mb-4">Media Contact</h2>
            <p className="text-xl text-blue-200 mb-8">
              For press inquiries, interviews, or additional information
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Press Relations</h3>
                <p className="text-blue-200 mb-1">press@vitalis.health</p>
                <p className="text-blue-300 text-sm">Response within 24 hours</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Executive Interviews</h3>
                <p className="text-blue-200 mb-1">media@vitalis.health</p>
                <p className="text-blue-300 text-sm">Leadership team availability</p>
              </div>
            </div>
            
            <a 
              href="mailto:press@vitalis.health"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 inline-block"
            >
              Contact Press Team
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
