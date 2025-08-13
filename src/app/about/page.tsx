'use client';

import React from 'react';
import { 
  HeartIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  TrophyIcon,
  BeakerIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Chief Medical Officer',
      avatar: '👩‍⚕️',
      bio: 'Former AIIMS Delhi cardiologist with 15 years experience in preventive medicine and digital health.',
      credentials: 'MD Cardiology, AIIMS • Fellow, American College of Cardiology'
    },
    {
      name: 'Arjun Patel',
      role: 'AI/ML Engineering Lead',
      avatar: '👨‍💻',
      bio: 'Ex-Google AI researcher specializing in healthcare ML and Claude 3.5 Sonnet integration.',
      credentials: 'PhD Computer Science, IIT Bombay • Google AI Research Alumni'
    },
    {
      name: 'Dr. Sarah Johnson',
      role: 'Clinical Research Director',
      avatar: '👩‍🔬',
      bio: 'Leading researcher in wearable health technology and FDA regulatory compliance.',
      credentials: 'MD/PhD Johns Hopkins • 50+ peer-reviewed publications'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Company Founded',
      description: 'Started with a vision to democratize clinical-grade health insights'
    },
    {
      year: '2024',
      title: 'FDA Algorithm Approval',
      description: 'Received FDA clearance for our heart rate variability algorithms'
    },
    {
      year: '2024',
      title: 'HIPAA Certification',
      description: 'Achieved full HIPAA compliance for medical data handling'
    },
    {
      year: '2025',
      title: 'AI Platform Launch',
      description: 'Launched Claude 3.5 Sonnet powered health analysis platform'
    }
  ];

  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Medical Precision',
      description: 'Every algorithm meets clinical standards with FDA-cleared accuracy'
    },
    {
      icon: CpuChipIcon,
      title: 'AI Innovation',
      description: 'Cutting-edge AI technology making healthcare insights accessible to everyone'
    },
    {
      icon: HeartIcon,
      title: 'Patient First',
      description: 'Your health and privacy are our top priorities in everything we build'
    },
    {
      icon: TrophyIcon,
      title: 'Excellence',
      description: 'Military-grade standards in security, accuracy, and user experience'
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
                  Vitalis
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
          <h1 className="text-4xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About Vitalis
            </span>
          </h1>
          <p className="text-xl text-blue-200 leading-relaxed">
            We're on a mission to democratize clinical-grade health insights through military-precision AI technology, 
            making advanced healthcare analytics accessible to everyone with a smartwatch.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
                <TrophyIcon className="h-8 w-8 text-yellow-400" />
                <span>Our Mission</span>
              </h2>
              <p className="text-blue-200 text-lg leading-relaxed">
                To transform everyday smartwatch data into life-saving medical insights using AI technology 
                that meets the highest clinical standards. We believe everyone deserves access to the same 
                quality of health analysis that was previously only available to healthcare professionals.
              </p>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
                <BeakerIcon className="h-8 w-8 text-purple-400" />
                <span>Our Vision</span>
              </h2>
              <p className="text-blue-200 text-lg leading-relaxed">
                A world where preventive healthcare is powered by intelligent analysis of personal health data, 
                where potential health issues are detected weeks before symptoms appear, and where every person 
                has a personal AI health guardian watching over their wellbeing 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-blue-200">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 text-center">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-blue-200">World-class experts in medicine, AI, and healthcare technology</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <div className="text-blue-400 font-medium mb-4">{member.role}</div>
                <p className="text-blue-200 mb-4 leading-relaxed">{member.bio}</p>
                <div className="text-sm text-blue-300 bg-blue-500/10 rounded-lg p-3">
                  {member.credentials}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-blue-200">Key milestones in our mission to revolutionize healthcare</p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                  </div>
                  <p className="text-blue-200 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold text-white mb-4">Join Our Mission</h2>
            <p className="text-xl text-blue-200 mb-8">
              Be part of the healthcare revolution. Start your journey with Vitalis today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
              >
                Try Live Demo
              </Link>
              <Link 
                href="/#pricing"
                className="border-2 border-blue-500 text-blue-300 hover:bg-blue-500/20 px-8 py-4 rounded-xl font-medium text-lg transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
