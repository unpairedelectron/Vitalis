import React from 'react';
import { motion } from 'framer-motion';

// Mobile-optimized dashboard layout
export const MobileDashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
    {/* Mobile Header */}
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">Vitalis</h1>
          </div>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Content */}
    <main className="pb-20">
      {children}
    </main>

    {/* Mobile Bottom Navigation */}
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-5 py-2">
        {[
          { icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z', label: 'Dashboard' },
          { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', label: 'Health' },
          { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Vitals' },
          { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Reports' },
          { icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Profile' }
        ].map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center py-2 px-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  </div>
);

// Mobile-optimized card component
export const MobileCard: React.FC<{
  title: string;
  value: string | number | React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  color?: 'blue' | 'green' | 'red' | 'yellow';
  className?: string;
  children?: React.ReactNode;
}> = ({ title, value, subtitle, icon, trend, color = 'blue', className = '', children }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600'
  };

  const trendIcons = {
    up: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    down: 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6',
    stable: 'M5 12h14'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</h3>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</span>
            {trend && (
              <div className={`flex items-center text-xs font-medium ${
                trend === 'up' ? 'text-green-600' : 
                trend === 'down' ? 'text-red-600' : 
                'text-slate-500'
              }`}>
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={trendIcons[trend]} />
                </svg>
                {subtitle}
              </div>
            )}
          </div>
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center text-white`}>
            {icon}
          </div>
        )}
      </div>
      {children}
    </motion.div>
  );
};

// Mobile chart wrapper
export const MobileChart: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = '' }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 ${className}`}>
    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">{title}</h3>
    <div className="w-full overflow-x-auto">
      {children}
    </div>
  </div>
);

// Mobile stats grid
export const MobileStatsGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
    {children}
  </div>
);

// Mobile list component
export const MobileList: React.FC<{
  title: string;
  items: Array<{
    id: string;
    title: string;
    subtitle: string;
    value?: string;
    icon?: React.ReactNode;
    action?: () => void;
  }>;
  className?: string;
}> = ({ title, items, className = '' }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden ${className}`}>
    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
    </div>
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {items.map((item) => (
        <motion.div
          key={item.id}
          whileTap={{ scale: 0.98 }}
          onClick={item.action}
          className={`px-4 py-3 flex items-center space-x-3 ${item.action ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50' : ''}`}
        >
          {item.icon && (
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              {item.icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
              {item.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {item.subtitle}
            </p>
          </div>
          {item.value && (
            <div className="flex-shrink-0 text-sm font-semibold text-slate-900 dark:text-slate-100">
              {item.value}
            </div>
          )}
          {item.action && (
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  </div>
);

// Mobile quick actions
export const MobileQuickActions: React.FC<{
  actions: Array<{
    id: string;
    title: string;
    icon: React.ReactNode;
    color: 'blue' | 'green' | 'red' | 'yellow';
    action: () => void;
  }>;
}> = ({ actions }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600'
  };

  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {actions.map((action) => (
        <motion.button
          key={action.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={action.action}
          className={`bg-gradient-to-r ${colorClasses[action.color]} text-white rounded-xl p-4 flex flex-col items-center space-y-2`}
        >
          <div className="w-8 h-8">
            {action.icon}
          </div>
          <span className="text-sm font-medium text-center">{action.title}</span>
        </motion.button>
      ))}
    </div>
  );
};

// Responsive breakpoint hook
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

// Responsive component wrapper
export const ResponsiveWrapper: React.FC<{
  mobile: React.ReactNode;
  tablet?: React.ReactNode;
  desktop: React.ReactNode;
}> = ({ mobile, tablet, desktop }) => {
  const breakpoint = useResponsive();

  if (breakpoint === 'mobile') return <>{mobile}</>;
  if (breakpoint === 'tablet') return <>{tablet || mobile}</>;
  return <>{desktop}</>;
};
