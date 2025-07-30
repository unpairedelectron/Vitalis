import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, CalendarIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';

const blogPosts = [
  {
    id: 1,
    title: "The Future of Personalized Medicine: How AI is Revolutionizing Healthcare",
    excerpt: "Discover how artificial intelligence and machine learning are transforming personalized healthcare, from predictive analytics to precision medicine.",
    author: "Dr. Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["AI", "Healthcare", "Innovation"],
    image: "🧬"
  },
  {
    id: 2,
    title: "Understanding Your Heart Rate Variability: A Complete Guide",
    excerpt: "Learn how HRV can reveal insights about your stress levels, recovery, and overall health status using military-grade precision.",
    author: "Dr. Michael Chen",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["HRV", "Heart Health", "Monitoring"],
    image: "❤️"
  },
  {
    id: 3,
    title: "Sleep Optimization: Military Techniques for Better Recovery",
    excerpt: "Discover evidence-based sleep strategies used by elite military units to optimize recovery and cognitive performance.",
    author: "Captain James Miller",
    date: "2024-01-05",
    readTime: "6 min read",
    tags: ["Sleep", "Recovery", "Performance"],
    image: "😴"
  },
  {
    id: 4,
    title: "Integrating Multiple Health Devices: A Developer's Guide",
    excerpt: "Technical insights on how Vitalis aggregates data from Samsung Health, Apple Health, Fitbit, and Oura Ring into unified insights.",
    author: "Rahul Sharma",
    date: "2023-12-28",
    readTime: "15 min read",
    tags: ["Integration", "API", "Development"],
    image: "🔗"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-blue-800/30 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Vitalis Health Blog
          </h1>
          <p className="text-xl text-blue-200 mt-4">
            Expert insights on health technology, medical research, and wellness optimization
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30 hover:border-blue-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{post.image}</div>
              
              <div className="flex items-center text-sm text-blue-300 mb-3">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span className="mr-4">{post.date}</span>
                <UserIcon className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                {post.title}
              </h2>

              <p className="text-blue-100 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-600/30 text-blue-200"
                    >
                      <TagIcon className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-blue-300">{post.readTime}</span>
              </div>

              <button className="mt-4 text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Read More →
              </button>
            </article>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-blue-800/30">
            <h3 className="text-2xl font-bold text-white mb-4">More Articles Coming Soon</h3>
            <p className="text-blue-200 mb-6">
              Subscribe to our newsletter to get notified when we publish new health insights and research findings.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-blue-600/30 rounded-l-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-r-lg hover:from-blue-700 hover:to-indigo-700 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
