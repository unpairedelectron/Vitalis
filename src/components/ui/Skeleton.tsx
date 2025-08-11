import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  animated?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = 'md',
  animated = true
}) => {
  const roundedClass = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }[rounded];

  return (
    <div
      className={`
        bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 
        dark:from-slate-700 dark:via-slate-600 dark:to-slate-700
        ${animated ? 'animate-pulse' : ''}
        ${width} ${height} ${roundedClass} ${className}
      `}
    />
  );
};

// Specialized skeleton components for different content types
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton width="w-12" height="h-12" rounded="full" />
      <div className="flex-1">
        <Skeleton width="w-3/4" height="h-4" className="mb-2" />
        <Skeleton width="w-1/2" height="h-3" />
      </div>
    </div>
    <div className="space-y-3">
      <Skeleton height="h-6" />
      <Skeleton width="w-5/6" height="h-4" />
      <Skeleton width="w-4/6" height="h-4" />
    </div>
  </div>
);

export const ChartSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 ${className}`}>
    <div className="flex justify-between items-center mb-6">
      <Skeleton width="w-48" height="h-6" />
      <Skeleton width="w-24" height="h-8" rounded="md" />
    </div>
    <div className="relative">
      {/* Chart area */}
      <div className="h-64 flex items-end space-x-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <Skeleton 
              height={`h-${Math.floor(Math.random() * 48) + 16}`} 
              className="mb-2" 
            />
            <Skeleton width="w-full" height="h-3" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number; className?: string }> = ({ 
  rows = 5, 
  className = '' 
}) => (
  <div className={`bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden ${className}`}>
    {/* Header */}
    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex space-x-4">
        <Skeleton width="w-1/4" height="h-4" />
        <Skeleton width="w-1/4" height="h-4" />
        <Skeleton width="w-1/4" height="h-4" />
        <Skeleton width="w-1/4" height="h-4" />
      </div>
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="p-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
        <div className="flex space-x-4">
          <Skeleton width="w-1/4" height="h-4" />
          <Skeleton width="w-1/4" height="h-4" />
          <Skeleton width="w-1/4" height="h-4" />
          <Skeleton width="w-1/4" height="h-4" />
        </div>
      </div>
    ))}
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
    {/* Header */}
    <div className="mb-8">
      <Skeleton width="w-72" height="h-8" className="mb-2" />
      <Skeleton width="w-96" height="h-5" />
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>

    {/* Charts Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>

    {/* Table */}
    <TableSkeleton />
  </div>
);
