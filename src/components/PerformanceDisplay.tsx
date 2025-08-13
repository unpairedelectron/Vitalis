import React from 'react';

interface PerformanceDisplayProps {
  show?: boolean;
}

export const PerformanceDisplay: React.FC<PerformanceDisplayProps> = ({ show = false }) => {
  // Mock metrics for display purposes
  const metrics = {
    loadTime: 1250,
    renderTime: 16.7,
    memoryUsage: 45.2,
    interactionTime: 8.3
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs space-y-1 z-50">
      <div>Load: {metrics.loadTime.toFixed(0)}ms</div>
      <div>Render: {metrics.renderTime.toFixed(1)}ms</div>
      <div>Memory: {metrics.memoryUsage.toFixed(1)}MB</div>
      <div>Interaction: {metrics.interactionTime.toFixed(1)}ms</div>
    </div>
  );
};
