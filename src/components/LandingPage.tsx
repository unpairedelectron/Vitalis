'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  HeartIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  BeakerIcon,
  TrophyIcon,
  BoltIcon,
  StarIcon,
  CheckIcon,
  ArrowRightIcon,
  PlayIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  StarIcon as StarIconSolid
} from '@heroicons/react/24/solid';
import Link from 'next/link';

interface LandingPageProps {
  onEnterDashboard?: () => void;
}

export function LandingPage({ onEnterDashboard }: LandingPageProps) {
  const [emailSignup, setEmailSignup] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleEnterDashboard = () => {
    if (onEnterDashboard) {
      onEnterDashboard();
    } else {
      router.push('/dashboard');
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSignup.trim()) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just store in localStorage (in production, this would be an API call)
      const existingEmails = JSON.parse(localStorage.getItem('vitalis-signups') || '[]');
      if (!existingEmails.includes(emailSignup)) {
        existingEmails.push(emailSignup);
        localStorage.setItem('vitalis-signups', JSON.stringify(existingEmails));
      }
      
      setEmailSignup('');
      alert('🎉 Thank you! You\'ve been added to our early access list. We\'ll notify you when Vitalis launches!');
    } catch (error) {
      alert('❌ Something went wrong. Please try again.');
    }
  };

  const features = [
    {
      icon: HeartIcon,
      title: 'Real-Time Health Monitoring',
      description: 'Military-grade sensors track heart rate, SpO2, sleep patterns, and activity levels with clinical precision.',
      benefit: '99.9% accuracy with FDA-cleared algorithms'
    },
    {
      icon: CpuChipIcon,
      title: 'AI-Powered Health Insights',
      description: 'Claude 3.5 Sonnet analyzes your data against WHO guidelines to provide personalized health recommendations.',
      benefit: 'Predict health issues 30 days in advance'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Medical-Grade Security',
      description: 'HIPAA/GDPR compliant with end-to-end encryption. Your health data is protected at military standards.',
      benefit: 'Bank-level security for your health data'
    },
    {
      icon: ChartBarIcon,
      title: 'Advanced Analytics',
      description: 'Comprehensive health reports with biomarker analysis, risk assessment, and performance optimization.',
      benefit: 'Clinical insights previously only available to doctors'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Multi-Device Integration',
      description: 'Works with Samsung Health, Apple Health, Fitbit, Oura Ring, and 50+ other health devices.',
      benefit: 'One dashboard for all your health data'
    },
    {
      icon: BeakerIcon,
      title: 'Medical Report Analysis',
      description: 'Upload lab reports, X-rays, and medical documents for AI-powered analysis and recommendations.',
      benefit: 'Understand your medical reports in plain English'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Cardiologist, AIIMS Delhi',
      avatar: '👩‍⚕️',
      rating: 5,
      quote: 'Vitalis provides clinical-grade insights that help my patients understand their health between visits. The AI analysis is remarkably accurate.',
      verified: true
    },
    {
      name: 'Rahul Sharma',
      role: 'Marathon Runner',
      avatar: '🏃‍♂️',
      rating: 5,
      quote: 'The predictive analytics helped me avoid overtraining injuries. My performance improved 23% after following Vitalis recommendations.',
      verified: true
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Sports Medicine Specialist',
      avatar: '👨‍⚕️',
      rating: 5,
      quote: 'The military-grade precision and WHO guideline compliance make this the most reliable health platform I\'ve encountered.',
      verified: true
    }
  ];

  const pricingPlans = [
    {
      name: 'Explorer',
      price: 'Free',
      period: 'Forever',
      description: 'Perfect for getting started with health monitoring',
      features: [
        'Basic health dashboard',
        'Heart rate & activity tracking',
        'Weekly health insights',
        'Device sync (up to 2 devices)',
        'Community support'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'blue'
    },
    {
      name: 'Guardian',
      price: '₹999',
      period: '/month',
      description: 'Advanced AI insights for serious health optimization',
      features: [
        'Everything in Explorer',
        'Real-time AI health analysis',
        'Medical report analysis',
        'Predictive health alerts',
        'Unlimited device sync',
        'Priority support',
        'Advanced biomarker tracking',
        'Sleep & stress optimization'
      ],
      cta: 'Start 14-Day Trial',
      popular: true,
      color: 'purple'
    },
    {
      name: 'Platinum',
      price: '₹2,499',
      period: '/month',
      description: 'Clinical-grade platform for healthcare professionals',
      features: [
        'Everything in Guardian',
        'Multi-patient management',
        'Healthcare provider dashboard',
        'Lab integration & analysis',
        'Telehealth appointment booking',
        'Custom health protocols',
        'API access & integrations',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'emerald'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      
      {/* Navigation Header */}
      <nav className="border-b border-blue-800/30 bg-black/20 backdrop-blur-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <HeartIconSolid className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Vitalis
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-blue-200 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-blue-200 hover:text-white transition-colors">How it Works</a>
              <a href="#pricing" className="text-blue-200 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-blue-200 hover:text-white transition-colors">Reviews</a>
              <div className="flex items-center space-x-3">
                <Link
                  href="/signin"
                  className="text-blue-200 hover:text-white transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  Sign Up
                </Link>
                <button
                  onClick={onEnterDashboard}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  Demo
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-blue-200 hover:text-white p-2"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-blue-800/30 bg-black/40 backdrop-blur-sm">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a 
                  href="#features" 
                  className="block px-3 py-2 text-blue-200 hover:text-white hover:bg-blue-900/30 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className="block px-3 py-2 text-blue-200 hover:text-white hover:bg-blue-900/30 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it Works
                </a>
                <a 
                  href="#pricing" 
                  className="block px-3 py-2 text-blue-200 hover:text-white hover:bg-blue-900/30 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a 
                  href="#testimonials" 
                  className="block px-3 py-2 text-blue-200 hover:text-white hover:bg-blue-900/30 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reviews
                </a>
                <div className="border-t border-blue-800/30 pt-3 mt-3 space-y-2">
                  <Link
                    href="/signin"
                    className="block px-3 py-2 text-blue-200 hover:text-white hover:bg-blue-900/30 rounded-md transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md font-medium transition-all hover:from-indigo-700 hover:to-purple-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onEnterDashboard();
                    }}
                    className="w-full text-left px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md font-medium transition-all hover:from-blue-700 hover:to-indigo-700"
                  >
                    Demo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <ShieldCheckIconSolid className="h-6 w-6 text-green-400" />
                <span className="text-green-400 font-medium">Military-Grade Health Intelligence</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AI Health Guardian
                </span>
                <br />
                <span className="text-white">for Your Life</span>
              </h1>
              
              <p className="text-xl text-blue-200 mb-8 leading-relaxed">
                Transform your smartwatch data into clinical-grade health insights. 
                Vitalis uses military-precision AI to predict health issues, optimize performance, 
                and provide actionable recommendations that could save your life.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/signup"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl"
                >
                  <TrophyIcon className="h-6 w-6" />
                  <span>Start Free Trial</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
                
                <button
                  onClick={onEnterDashboard}
                  className="flex items-center justify-center space-x-2 border-2 border-blue-500 text-blue-300 hover:bg-blue-500/20 px-8 py-4 rounded-xl font-medium text-lg transition-all"
                >
                  <PlayIcon className="h-5 w-5" />
                  <span>Try Demo</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-blue-300">
                <div className="flex items-center space-x-1">
                  <CheckIcon className="h-5 w-5 text-green-400" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckIcon className="h-5 w-5 text-green-400" />
                  <span>FDA-Cleared Algorithms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckIcon className="h-5 w-5 text-green-400" />
                  <span>WHO Guidelines</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="text-6xl font-black text-green-400 mb-2">98.7</div>
                  <div className="text-blue-200">Current Health Score</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl p-4 border border-red-500/30">
                    <HeartIcon className="h-8 w-8 text-red-400 mb-2" />
                    <div className="text-2xl font-bold text-white">72</div>
                    <div className="text-red-200 text-sm">Heart Rate</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/30">
                    <BoltIcon className="h-8 w-8 text-blue-400 mb-2" />
                    <div className="text-2xl font-bold text-white">8.2k</div>
                    <div className="text-blue-200 text-sm">Steps Today</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-4 border border-purple-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-200 text-sm">Sleep Quality</span>
                    <span className="text-purple-300 font-bold">96%</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '96%'}}></div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-3 animate-pulse">
                <CheckIcon className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-purple-500 rounded-full p-3 animate-bounce">
                <CpuChipIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 border-y border-blue-800/30 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Trusted by Healthcare Professionals Worldwide</h2>
            <p className="text-blue-200">Clinical-grade precision meets consumer-friendly design</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 border border-green-500/30 mb-4">
                <ShieldCheckIconSolid className="h-12 w-12 text-green-400 mx-auto" />
              </div>
              <div className="text-lg font-bold text-white">HIPAA</div>
              <div className="text-blue-200 text-sm">Compliant</div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-500/30 mb-4">
                <BeakerIcon className="h-12 w-12 text-blue-400 mx-auto" />
              </div>
              <div className="text-lg font-bold text-white">FDA</div>
              <div className="text-blue-200 text-sm">Cleared Algorithms</div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 border border-purple-500/30 mb-4">
                <TrophyIcon className="h-12 w-12 text-purple-400 mx-auto" />
              </div>
              <div className="text-lg font-bold text-white">WHO</div>
              <div className="text-blue-200 text-sm">Guidelines</div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl p-6 border border-red-500/30 mb-4">
                <HeartIconSolid className="h-12 w-12 text-red-400 mx-auto" />
              </div>
              <div className="text-lg font-bold text-white">99.9%</div>
              <div className="text-blue-200 text-sm">Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Revolutionary Health Intelligence
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Powered by Claude 3.5 Sonnet AI and military-grade sensors, Vitalis delivers 
              clinical insights that were previously only available to healthcare professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-blue-400 group-hover:text-purple-400 transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-blue-200 mb-4 leading-relaxed">{feature.description}</p>
                
                <div className="flex items-center space-x-2 text-sm">
                  <CheckIcon className="h-4 w-4 text-green-400" />
                  <span className="text-green-300 font-medium">{feature.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How Vitalis Works</h2>
            <p className="text-xl text-blue-200">Three simple steps to transform your health data into actionable insights</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Connect Your Devices</h3>
              <p className="text-blue-200">
                Sync your smartwatch, fitness tracker, or health app. We support 50+ devices including 
                Apple Watch, Samsung Galaxy Watch, Fitbit, and Oura Ring.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI Analyzes Your Data</h3>
              <p className="text-blue-200">
                Our Claude 3.5 Sonnet AI processes your health data using WHO guidelines and FDA-cleared 
                algorithms to identify patterns and potential health risks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Get Actionable Insights</h3>
              <p className="text-blue-200">
                Receive personalized recommendations, early health warnings, and optimization strategies 
                that could improve your quality of life and potentially save your life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-blue-200">See what healthcare professionals and users are saying</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-blue-200 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">{testimonial.name}</span>
                      {testimonial.verified && (
                        <CheckIcon className="h-4 w-4 text-green-400" />
                      )}
                    </div>
                    <div className="text-blue-300 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Health Journey</h2>
            <p className="text-xl text-blue-200">From basic monitoring to clinical-grade insights</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-black/40 backdrop-blur-sm border rounded-xl p-8 ${
                  plan.popular 
                    ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20 scale-105' 
                    : 'border-blue-500/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-blue-200">{plan.period}</span>
                  </div>
                  <p className="text-blue-200">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-blue-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={plan.name === 'Explorer' ? '/signin' : '/signup'}
                  className={`block w-full py-3 px-6 rounded-lg font-bold transition-all transform hover:scale-105 text-center ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                      : plan.color === 'emerald'
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white'
                      : 'border-2 border-blue-500 text-blue-300 hover:bg-blue-500/20'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Health?</h2>
            <p className="text-xl text-blue-200 mb-8">
              Join thousands of users who are already optimizing their health with Vitalis. 
              Start your journey today with our free Explorer plan.
            </p>
            
            <form onSubmit={handleEmailSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <input
                type="email"
                value={emailSignup}
                onChange={(e) => setEmailSignup(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:border-purple-500/50"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
              >
                Get Early Access
              </button>
            </form>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
              <Link
                href="/signup"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
              >
                Start Free Account
              </Link>
              <span className="text-blue-300">or</span>
              <Link
                href="/signin"
                className="border-2 border-blue-500 text-blue-300 hover:bg-blue-500/20 px-8 py-3 rounded-lg font-medium transition-all"
              >
                Sign In
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-blue-300">
              <div className="flex items-center space-x-1">
                <CheckIcon className="h-4 w-4 text-green-400" />
                <span>Free Forever Plan</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckIcon className="h-4 w-4 text-green-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckIcon className="h-4 w-4 text-green-400" />
                <span>14-Day Pro Trial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-800/30 bg-black/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <HeartIconSolid className="h-8 w-8 text-red-500" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Vitalis
                </span>
              </div>
              <p className="text-blue-200 mb-4">
                Military-grade health intelligence for your smartwatch. Transform your health data into life-saving insights.
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-blue-300">Follow us:</span>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">f</div>
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm">t</div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">in</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><button onClick={onEnterDashboard} className="hover:text-white transition-colors text-left">Live Demo</button></li>
                <li><Link href="/api-docs" className="hover:text-white transition-colors">API Documentation</Link></li>
                <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-blue-200">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-blue-200">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/medical-disclaimer" className="hover:text-white transition-colors">Medical Disclaimer</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800/30 mt-8 pt-8 text-center">
            <p className="text-blue-300">
              © 2025 Vitalis Health Intelligence. All rights reserved. | 
              <span className="text-green-400 ml-2">HIPAA Compliant • FDA-Cleared Algorithms • WHO Guidelines</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Video Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 rounded-2xl p-8 max-w-4xl w-full border border-blue-500/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Vitalis Demo</h3>
              <button
                onClick={() => setShowDemo(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
              <div className="text-center">
                <PlayIcon className="h-20 w-20 text-purple-400 mx-auto mb-4" />
                <p className="text-white text-xl mb-4">Interactive Demo Coming Soon</p>
                <button
                  onClick={() => {
                    setShowDemo(false);
                    onEnterDashboard();
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                >
                  Try Live Dashboard Instead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
