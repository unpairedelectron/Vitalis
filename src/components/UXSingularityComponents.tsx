/**
 * UX SINGULARITY COMPONENTS LIBRARY
 * Military-Grade Precision Components for Vitalis
 */

import React, { useState } from 'react';
import { 
  HeartIcon, 
  BoltIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// ══════════════════════════════════════════════════════════════════════
// CHART CARD COMPONENT
// ══════════════════════════════════════════════════════════════════════
interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════
// STATS CARD COMPONENT
// ══════════════════════════════════════════════════════════════════════
interface StatsCardProps {
  title: string;
  color: string;
  children: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, color, children }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════
// STAT ITEM COMPONENT
// ══════════════════════════════════════════════════════════════════════
interface StatItemProps {
  label: string;
  value: string;
  status?: boolean;
}

export const StatItem: React.FC<StatItemProps> = ({ label, value, status = false }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm font-medium ${status ? 'text-emerald-600' : 'text-gray-900'}`}>
        {value}
      </span>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════
// ZONE BAR COMPONENT
// ══════════════════════════════════════════════════════════════════════
interface ZoneBarProps {
  label: string;
  percentage: number;
  color: string;
}

export const ZoneBar: React.FC<ZoneBarProps> = ({ label, percentage, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium text-gray-900">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${colorClasses[color as keyof typeof colorClasses]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════
// INSIGHT CARD COMPONENT
// ══════════════════════════════════════════════════════════════════════
interface InsightCardProps {
  insight: {
    type: string;
    message: string;
    severity: string;
    icon: string;
  };
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const severityColors = {
    high: 'border-red-200 bg-red-50 text-red-800',
    medium: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    low: 'border-green-200 bg-green-50 text-green-800'
  };

  return (
    <div className={`p-4 rounded-xl border ${severityColors[insight.severity as keyof typeof severityColors]}`}>
      <div className="flex items-start space-x-3">
        <span className="text-2xl">{insight.icon}</span>
        <div>
          <h4 className="font-semibold text-sm">{insight.type}</h4>
          <p className="text-sm mt-1 opacity-90">{insight.message}</p>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════
// MILITANT ACTION BUTTON - UX SINGULARITY ENHANCED
// ══════════════════════════════════════════════════════════════════════
interface MilitantActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
  verb?: string;
}

export const MilitantActionButton: React.FC<MilitantActionButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  icon: Icon,
  verb
}) => {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 shadow-md hover:shadow-lg',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl',
    success: 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl'
  };

  return (
    <button
      className={`${variantClasses[variant]} ${className} px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center space-x-2`}
      onClick={onClick}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{children}</span>
    </button>
  );
};

// ══════════════════════════════════════════════════════════════════════
// BIOMETRIC METRIC CARD - UX SINGULARITY ENHANCED
// ══════════════════════════════════════════════════════════════════════
interface BiometricMetricCardProps {
  title: string;
  value: number | string;
  unit: string;
  status: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  biometricSync?: boolean;
  streakCount?: number;
}

export const BiometricMetricCard: React.FC<BiometricMetricCardProps> = ({ 
  title, 
  value, 
  unit, 
  status, 
  change, 
  icon: Icon, 
  color, 
  biometricSync = false,
  streakCount = 0
}) => {
  const colorSchemes = {
    rose: 'from-rose-400 to-red-500',
    purple: 'from-purple-400 to-indigo-500',
    blue: 'from-blue-400 to-cyan-500',
    green: 'from-emerald-400 to-green-500',
    orange: 'from-orange-400 to-amber-500'
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 relative overflow-hidden">
      {/* Biometric Pulse Animation */}
      {biometricSync && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl opacity-50 animate-pulse" />
      )}

      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${colorSchemes[color as keyof typeof colorSchemes]} shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        
        {/* Streak Counter */}
        {streakCount > 0 && (
          <div className="flex items-center space-x-1 px-2 py-1 bg-orange-100 rounded-full">
            <span className="text-xs font-bold text-orange-700">{streakCount}d</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</h3>
        
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          <span className="text-sm font-medium text-gray-500">{unit}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            status === 'excellent' ? 'bg-emerald-100 text-emerald-700' :
            status === 'good' ? 'bg-blue-100 text-blue-700' :
            status === 'fair' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {status.toUpperCase()}
          </span>
          
          <div className={`flex items-center space-x-1 ${change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {change >= 0 ? (
              <ArrowTrendingUpIcon className="h-4 w-4" />
            ) : (
              <ArrowTrendingDownIcon className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        </div>
      </div>

      {/* Biometric Sync Indicator */}
      {biometricSync && (
        <div className="absolute bottom-2 right-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
};
