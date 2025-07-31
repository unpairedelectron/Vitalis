'use client';

import { useState, useEffect } from 'react';

interface ChartWrapperProps {
  children: React.ReactNode;
  height?: number;
}

export function ChartWrapper({ children, height = 320 }: ChartWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-800/50 rounded-lg"
        style={{ height: `${height}px` }}
      >
        <div className="text-gray-400">Loading chart...</div>
      </div>
    );
  }

  return <>{children}</>;
}
