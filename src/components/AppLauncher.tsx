// Google-style App Launcher Component
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Squares2X2Icon,
  XMarkIcon,
  HeartIcon,
  ChartBarIcon,
  BeakerIcon,
  BoltIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  DocumentTextIcon,
  UserGroupIcon,
  MapIcon,
  CameraIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  CloudIcon,
  CogIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  BookOpenIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  AcademicCapIcon,
  NewspaperIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';

interface AppLauncherProps {
  className?: string;
}

interface VitalisApp {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgGradient: string;
  route?: string;
  isExternal?: boolean;
  url?: string;
  comingSoon?: boolean;
}

export function AppLauncher({ className = '' }: AppLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('health');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const healthApps: VitalisApp[] = [
    {
      id: 'dashboard',
      name: 'Health Dashboard',
      description: 'Real-time health monitoring',
      icon: ChartBarIcon,
      color: 'text-blue-400',
      bgGradient: 'from-blue-500/20 to-blue-600/20',
      route: '/dashboard'
    },
    {
      id: 'clinical',
      name: 'Clinical Analysis',
      description: 'Medical-grade analytics',
      icon: HeartIcon,
      color: 'text-red-400',
      bgGradient: 'from-red-500/20 to-red-600/20',
      route: '/dashboard?tab=clinical'
    },
    {
      id: 'oracle',
      name: 'Health Oracle',
      description: 'AI health insights',
      icon: CpuChipIcon,
      color: 'text-purple-400',
      bgGradient: 'from-purple-500/20 to-purple-600/20',
      route: '/dashboard?feature=oracle'
    },
    {
      id: 'neural-twin',
      name: 'Neural Twin',
      description: 'Digital health twin',
      icon: BoltIcon,
      color: 'text-amber-400',
      bgGradient: 'from-amber-500/20 to-amber-600/20',
      route: '/dashboard?feature=neural-twin'
    },
    {
      id: 'biomarkers',
      name: 'Biomarkers',
      description: 'Lab results analysis',
      icon: BeakerIcon,
      color: 'text-emerald-400',
      bgGradient: 'from-emerald-500/20 to-emerald-600/20',
      route: '/dashboard?tab=biomarkers'
    },
    {
      id: 'compliance',
      name: 'WHO Guidelines',
      description: 'Health compliance tracking',
      icon: ShieldCheckIcon,
      color: 'text-green-400',
      bgGradient: 'from-green-500/20 to-green-600/20',
      route: '/dashboard?tab=guidelines'
    },
    {
      id: 'reports',
      name: 'Medical Reports',
      description: 'AI-powered report analysis',
      icon: DocumentTextIcon,
      color: 'text-indigo-400',
      bgGradient: 'from-indigo-500/20 to-indigo-600/20',
      route: '/dashboard?tab=reports'
    },
    {
      id: 'community',
      name: 'Health Community',
      description: 'Connect with others',
      icon: UserGroupIcon,
      color: 'text-pink-400',
      bgGradient: 'from-pink-500/20 to-pink-600/20',
      comingSoon: true
    }
  ];

  const googleApps: VitalisApp[] = [
    {
      id: 'maps',
      name: 'Maps',
      description: 'Find workout locations',
      icon: MapIcon,
      color: 'text-green-400',
      bgGradient: 'from-green-500/20 to-green-600/20',
      isExternal: true,
      url: 'https://maps.google.com'
    },
    {
      id: 'photos',
      name: 'Photos',
      description: 'Progress photos',
      icon: CameraIcon,
      color: 'text-blue-400',
      bgGradient: 'from-blue-500/20 to-blue-600/20',
      isExternal: true,
      url: 'https://photos.google.com'
    },
    {
      id: 'calendar',
      name: 'Calendar',
      description: 'Health appointments',
      icon: CalendarIcon,
      color: 'text-indigo-400',
      bgGradient: 'from-indigo-500/20 to-indigo-600/20',
      isExternal: true,
      url: 'https://calendar.google.com'
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Health communications',
      icon: ChatBubbleLeftRightIcon,
      color: 'text-red-400',
      bgGradient: 'from-red-500/20 to-red-600/20',
      isExternal: true,
      url: 'https://gmail.com'
    },
    {
      id: 'drive',
      name: 'Drive',
      description: 'Health documents',
      icon: CloudIcon,
      color: 'text-yellow-400',
      bgGradient: 'from-yellow-500/20 to-yellow-600/20',
      isExternal: true,
      url: 'https://drive.google.com'
    },
    {
      id: 'search',
      name: 'Search',
      description: 'Health information',
      icon: MagnifyingGlassIcon,
      color: 'text-gray-400',
      bgGradient: 'from-gray-500/20 to-gray-600/20',
      isExternal: true,
      url: 'https://google.com'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      description: 'Workout videos',
      icon: PlayIcon,
      color: 'text-red-500',
      bgGradient: 'from-red-500/20 to-red-600/20',
      isExternal: true,
      url: 'https://youtube.com'
    },
    {
      id: 'scholar',
      name: 'Scholar',
      description: 'Health research',
      icon: AcademicCapIcon,
      color: 'text-blue-500',
      bgGradient: 'from-blue-500/20 to-blue-600/20',
      isExternal: true,
      url: 'https://scholar.google.com'
    }
  ];

  const toolsApps: VitalisApp[] = [
    {
      id: 'settings',
      name: 'Settings',
      description: 'App preferences',
      icon: CogIcon,
      color: 'text-gray-400',
      bgGradient: 'from-gray-500/20 to-gray-600/20',
      route: '/settings'
    },
    {
      id: 'news',
      name: 'Health News',
      description: 'Latest health updates',
      icon: NewspaperIcon,
      color: 'text-orange-400',
      bgGradient: 'from-orange-500/20 to-orange-600/20',
      comingSoon: true
    },
    {
      id: 'music',
      name: 'Workout Music',
      description: 'Fitness playlists',
      icon: MusicalNoteIcon,
      color: 'text-green-400',
      bgGradient: 'from-green-500/20 to-green-600/20',
      comingSoon: true
    },
    {
      id: 'shopping',
      name: 'Health Store',
      description: 'Supplements & gear',
      icon: ShoppingCartIcon,
      color: 'text-purple-400',
      bgGradient: 'from-purple-500/20 to-purple-600/20',
      comingSoon: true
    },
    {
      id: 'finance',
      name: 'Health Finance',
      description: 'Medical expenses',
      icon: BanknotesIcon,
      color: 'text-emerald-400',
      bgGradient: 'from-emerald-500/20 to-emerald-600/20',
      comingSoon: true
    },
    {
      id: 'books',
      name: 'Health Library',
      description: 'Educational resources',
      icon: BookOpenIcon,
      color: 'text-indigo-400',
      bgGradient: 'from-indigo-500/20 to-indigo-600/20',
      comingSoon: true
    }
  ];

  const categories = [
    { id: 'health', label: 'Vitalis Health', apps: healthApps },
    { id: 'google', label: 'Google Apps', apps: googleApps },
    { id: 'tools', label: 'Tools & More', apps: toolsApps }
  ];

  const currentCategory = categories.find(cat => cat.id === activeCategory);

  const handleAppClick = (app: VitalisApp) => {
    if (app.comingSoon) {
      alert(`${app.name} is coming soon!`);
      return;
    }

    if (app.isExternal && app.url) {
      window.open(app.url, '_blank');
    } else if (app.route) {
      window.location.href = app.route;
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* App Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="premium-button p-2 rounded-xl bg-gradient-to-r from-gray-800/60 to-gray-700/60 hover:from-gray-700/80 hover:to-gray-600/80 border border-gray-600/30 transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:scale-105"
        title="Vitalis Apps"
      >
        <Squares2X2Icon className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="launcher-dropdown absolute top-full right-0 mt-2 w-96 glass-morphism border border-gray-600/30 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-600/30 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Squares2X2Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Vitalis Apps</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-gray-700/50 transition-colors group"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex border-b border-gray-600/30">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/30'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Apps Grid */}
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-3 gap-3">
              {currentCategory?.apps.map((app, index) => {
                const IconComponent = app.icon;
                return (
                  <button
                    key={app.id}
                    onClick={() => handleAppClick(app)}
                    className={`grid-item app-icon relative group p-4 rounded-xl bg-gradient-to-br ${app.bgGradient} border border-gray-600/20 hover:border-gray-500/40 transition-all duration-300 text-center transform hover:scale-105 hover:shadow-xl ${
                      app.comingSoon ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg premium-button'
                    }`}
                    disabled={app.comingSoon}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Coming Soon Badge */}
                    {app.comingSoon && (
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-orange-500 text-xs text-black font-bold px-1.5 py-0.5 rounded-full shadow-md animate-pulse">
                        Soon
                      </div>
                    )}
                    
                    {/* App Icon */}
                    <div className="flex justify-center mb-2">
                      <div className="relative">
                        <IconComponent className={`h-8 w-8 ${app.color} group-hover:scale-110 transition-transform duration-300`} />
                        <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                      </div>
                    </div>
                    
                    {/* App Info */}
                    <div className="text-xs">
                      <div className="font-medium text-white mb-1 group-hover:text-blue-200 transition-colors">{app.name}</div>
                      <div className="text-gray-400 leading-tight group-hover:text-gray-300 transition-colors">{app.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-600/30 bg-gradient-to-r from-gray-800/30 to-gray-700/30">
            <div className="text-xs text-gray-400 text-center">
              <span className="inline-flex items-center space-x-2">
                <span>Vitalis Health Platform</span>
                <span>•</span>
                <span className="text-blue-400 font-medium">{currentCategory?.apps.length} apps available</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppLauncher;
