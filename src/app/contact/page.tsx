'use client';

import React, { useState } from 'react';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  LifebuoyIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@vitalis.health',
      response: '24 hours',
      color: 'blue'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available in dashboard',
      response: 'Instant',
      color: 'green'
    },
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Speak with an expert',
      contact: '+91-11-4567-8900',
      response: 'Business hours',
      color: 'purple'
    },
    {
      icon: LifebuoyIcon,
      title: 'Emergency Support',
      description: 'Critical health alerts',
      contact: '+91-11-4567-8911',
      response: '24/7',
      color: 'red'
    }
  ];

  const offices = [
    {
      city: 'Delhi',
      address: 'Connaught Place, New Delhi 110001',
      type: 'Headquarters',
      timezone: 'IST',
      teams: ['Engineering', 'Medical Affairs', 'Leadership']
    },
    {
      city: 'Mumbai',
      address: 'Bandra Kurla Complex, Mumbai 400051',
      type: 'Clinical Research',
      timezone: 'IST',
      teams: ['Clinical Data', 'Research', 'Regulatory Affairs']
    },
    {
      city: 'Bangalore',
      address: 'Electronic City, Bangalore 560100',
      type: 'Development Center',
      timezone: 'IST',
      teams: ['DevOps', 'Infrastructure', 'Security']
    }
  ];

  const supportCategories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'medical', label: 'Medical Questions' },
    { value: 'privacy', label: 'Privacy & Security' },
    { value: 'partnership', label: 'Business Partnership' },
    { value: 'press', label: 'Press & Media' },
    { value: 'careers', label: 'Career Opportunities' }
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
                  Contact Vitalis
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
          <h1 className="text-4xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          <p className="text-xl text-blue-200 leading-relaxed">
            Have questions about Vitalis? Need technical support? Want to partner with us? 
            We're here to help you on your health journey.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className={`bg-black/40 backdrop-blur-sm border border-${method.color}-500/30 rounded-xl p-6 text-center hover:border-${method.color}-400/50 transition-all`}>
                <div className={`bg-gradient-to-br from-${method.color}-500/20 to-${method.color}-600/20 rounded-xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className={`h-8 w-8 text-${method.color}-400`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{method.title}</h3>
                <p className="text-blue-200 text-sm mb-3">{method.description}</p>
                <div className={`text-${method.color}-300 font-medium text-sm mb-1`}>{method.contact}</div>
                <div className="text-blue-300 text-xs">Response: {method.response}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Send Us a Message</h2>
            <p className="text-xl text-blue-200">We'll get back to you within 24 hours</p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:border-purple-500/50"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:border-purple-500/50"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="category" className="block text-white font-medium mb-2">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white focus:outline-none focus:border-purple-500/50"
                >
                  {supportCategories.map((category) => (
                    <option key={category.value} value={category.value} className="bg-slate-800">
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-white font-medium mb-2">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:border-purple-500/50"
                  placeholder="Brief description of your inquiry"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-white font-medium mb-2">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:border-purple-500/50 resize-none"
                placeholder="Please provide details about your inquiry..."
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Offices</h2>
            <p className="text-xl text-blue-200">Visit us at any of our locations across India</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <BuildingOfficeIcon className="h-8 w-8 text-blue-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{office.city}</h3>
                    <div className="text-blue-300 text-sm">{office.type}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPinIcon className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div className="text-blue-200 text-sm">{office.address}</div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-blue-400" />
                    <div className="text-blue-200 text-sm">Timezone: {office.timezone}</div>
                  </div>
                  
                  <div>
                    <div className="text-white font-medium text-sm mb-1">Teams:</div>
                    <div className="flex flex-wrap gap-1">
                      {office.teams.map((team, teamIndex) => (
                        <span key={teamIndex} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                          {team}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-12 border border-blue-500/30">
            <h2 className="text-4xl font-bold text-white mb-4">Need Quick Answers?</h2>
            <p className="text-xl text-blue-200 mb-8">
              Check our comprehensive help center before reaching out - you might find your answer instantly!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/help"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
              >
                Visit Help Center
              </Link>
              <Link 
                href="/dashboard"
                className="border-2 border-blue-500 text-blue-300 hover:bg-blue-500/20 px-8 py-4 rounded-xl font-medium text-lg transition-all"
              >
                Try Live Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
