'use client';

import React from 'react';
import { 
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  ArrowLeftIcon,
  UserGroupIcon,
  SparklesIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior AI/ML Engineer',
      department: 'Engineering',
      location: 'Delhi, India / Remote',
      type: 'Full-time',
      salary: '₹25-40L',
      description: 'Lead development of our Claude 3.5 Sonnet integration and health analytics algorithms.',
      requirements: [
        '5+ years in ML/AI development',
        'Experience with healthcare data',
        'Python, TensorFlow, PyTorch',
        'PhD in Computer Science preferred'
      ]
    },
    {
      title: 'Clinical Data Scientist',
      department: 'Medical Affairs',
      location: 'Mumbai, India',
      type: 'Full-time',
      salary: '₹20-30L',
      description: 'Analyze health data patterns and ensure clinical accuracy of our AI insights.',
      requirements: [
        'MD or PhD in Medical field',
        'Experience with clinical research',
        'Statistical analysis expertise',
        'Knowledge of WHO/FDA guidelines'
      ]
    },
    {
      title: 'DevOps Engineer (HIPAA)',
      department: 'Infrastructure',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹18-25L',
      description: 'Maintain our HIPAA-compliant infrastructure and ensure 99.9% uptime.',
      requirements: [
        '4+ years DevOps experience',
        'HIPAA compliance knowledge',
        'AWS/Azure expertise',
        'Kubernetes, Docker'
      ]
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Delhi, India / Remote',
      type: 'Full-time',
      salary: '₹15-22L',
      description: 'Design intuitive interfaces for complex health data visualization.',
      requirements: [
        '3+ years in product design',
        'Healthcare UX experience',
        'Figma, Sketch proficiency',
        'Understanding of accessibility'
      ]
    },
    {
      title: 'Flutter Developer',
      department: 'Mobile',
      location: 'Remote',
      type: 'Contract',
      salary: '₹12-18L',
      description: 'Build our cross-platform mobile app for health monitoring.',
      requirements: [
        '3+ years Flutter development',
        'Health app experience',
        'BLE integration knowledge',
        'Firebase, REST APIs'
      ]
    },
    {
      title: 'Marketing Manager',
      department: 'Growth',
      location: 'Delhi, India',
      type: 'Full-time',
      salary: '₹12-18L',
      description: 'Drive user acquisition and brand awareness in the health tech space.',
      requirements: [
        '4+ years in B2C marketing',
        'Health tech experience',
        'Digital marketing expertise',
        'Data-driven approach'
      ]
    }
  ];

  const benefits = [
    {
      icon: CurrencyRupeeIcon,
      title: 'Competitive Salary',
      description: 'Top-tier compensation with equity participation and annual bonuses'
    },
    {
      icon: SparklesIcon,
      title: 'Health Benefits',
      description: 'Premium medical insurance for you and family, plus free Vitalis Pro'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Growth Opportunities',
      description: 'Learning budget, conference attendance, and career development programs'
    },
    {
      icon: UserGroupIcon,
      title: 'Remote Flexibility',
      description: 'Hybrid work model with flexible hours and work-from-anywhere options'
    }
  ];

  const departments = [
    { name: 'Engineering', count: 8, color: 'blue' },
    { name: 'Medical Affairs', count: 4, color: 'green' },
    { name: 'Design', count: 3, color: 'purple' },
    { name: 'Growth', count: 2, color: 'orange' }
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
                  Vitalis Careers
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
              Join Our Mission
            </span>
          </h1>
          <p className="text-xl text-blue-200 leading-relaxed mb-8">
            Help us revolutionize healthcare by making clinical-grade health insights accessible to everyone. 
            Work with cutting-edge AI technology and make a real impact on millions of lives.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">{dept.count}</div>
                <div className="text-blue-200 text-sm">Open {dept.name} Roles</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why Work at Vitalis?</h2>
            <p className="text-xl text-blue-200">We offer world-class benefits and a mission-driven culture</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 text-center">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-xl text-blue-200">Find your perfect role in revolutionizing healthcare</p>
          </div>
          
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{position.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-blue-300">
                          <div className="flex items-center space-x-1">
                            <BriefcaseIcon className="h-4 w-4" />
                            <span>{position.department}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPinIcon className="h-4 w-4" />
                            <span>{position.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ClockIcon className="h-4 w-4" />
                            <span>{position.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CurrencyRupeeIcon className="h-4 w-4" />
                            <span>{position.salary}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-blue-200 mb-4 leading-relaxed">{position.description}</p>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-blue-200">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 lg:mt-0 lg:ml-8">
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 w-full lg:w-auto">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Hiring Process</h2>
            <p className="text-xl text-blue-200">Transparent and efficient - we respect your time</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Application</h3>
              <p className="text-blue-200 text-sm">Submit your resume and cover letter</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Screening</h3>
              <p className="text-blue-200 text-sm">Initial call with our talent team</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Technical</h3>
              <p className="text-blue-200 text-sm">Technical interview & practical exercise</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Final</h3>
              <p className="text-blue-200 text-sm">Team fit & leadership discussion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Make an Impact?</h2>
            <p className="text-xl text-blue-200 mb-8">
              Join us in building the future of healthcare technology. Your code, designs, and ideas 
              will directly impact millions of lives worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:careers@vitalis.health"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
              >
                Send Your Resume
              </a>
              <Link 
                href="/about"
                className="border-2 border-blue-500 text-blue-300 hover:bg-blue-500/20 px-8 py-4 rounded-xl font-medium text-lg transition-all"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
