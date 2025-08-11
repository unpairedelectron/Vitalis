import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { PulsingVital, AnimatedCounter } from './ui/Animations';
import { MobileCard } from './ui/MobileComponents';
import { simulateRealTimeData } from '../lib/demoData';

// Memoized vital sign component to prevent unnecessary re-renders
const VitalSign = memo<{
  title: string;
  value: number | string | React.ReactNode;
  subtitle: string;
  trend: 'up' | 'down' | 'stable';
  color: 'red' | 'green' | 'blue' | 'yellow';
  icon: React.ReactNode;
  isPulsing?: boolean;
  className?: string;
}>(({ title, value, subtitle, trend, color, icon, isPulsing = false, className = '' }) => {
  return (
    <MobileCard
      title={title}
      value={value}
      subtitle={subtitle}
      trend={trend}
      color={color}
      icon={isPulsing ? <PulsingVital isActive={true} color={color}>{icon}</PulsingVital> : icon}
      className={className}
    />
  );
});

VitalSign.displayName = 'VitalSign';

// Separate component for real-time vitals that updates independently
export const RealTimeVitals: React.FC<{
  className?: string;
  layout?: 'grid' | 'horizontal';
}> = memo(({ className = '', layout = 'grid' }) => {
  const [vitals, setVitals] = useState(simulateRealTimeData());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Only update vitals data, not the entire dashboard
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(simulateRealTimeData());
      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds instead of 3

    return () => clearInterval(interval);
  }, []);

  const gridClasses = layout === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-4 gap-6' 
    : 'flex flex-wrap gap-4';

  return (
    <div className={`${gridClasses} ${className}`}>
      <motion.div
        key={`hr-${vitals.heartRate}`} // Key forces re-animation on value change
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <VitalSign
          title="Heart Rate"
          value={vitals.heartRate}
          subtitle={`${Math.round(vitals.heartRate * 0.85)} avg`}
          trend="stable"
          color="red"
          isPulsing={true}
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          }
          className="h-full"
        />
      </motion.div>

      <motion.div
        key={`spo2-${vitals.bloodOxygen}`}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <VitalSign
          title="Blood Oxygen"
          value={<AnimatedCounter value={vitals.bloodOxygen} suffix="%" duration={1} />}
          subtitle="Optimal Range"
          trend="stable"
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          }
          className="h-full"
        />
      </motion.div>

      <VitalSign
        title="Sleep Score"
        value={<AnimatedCounter value={89} duration={1} />}
        subtitle="Excellent"
        trend="up"
        color="green"
        icon={
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
          </svg>
        }
        className="h-full"
      />

      <motion.div
        key={`stress-${vitals.stress}`}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <VitalSign
          title="Stress Level"
          value={<AnimatedCounter value={vitals.stress} suffix="%" duration={1} />}
          subtitle={vitals.stress < 30 ? "Low" : vitals.stress < 60 ? "Medium" : "High"}
          trend={vitals.stress < 30 ? "down" : "stable"}
          color="yellow"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          }
          className="h-full"
        />
      </motion.div>

      {/* Last updated indicator */}
      <div className="col-span-full flex justify-center mt-2">
        <motion.div
          key={lastUpdate.getTime()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live • Updated {lastUpdate.toLocaleTimeString()}</span>
        </motion.div>
      </div>
    </div>
  );
});

RealTimeVitals.displayName = 'RealTimeVitals';

// Static health stats component (doesn't update)
export const StaticHealthStats = memo<{
  className?: string;
}>(({ className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      <VitalSign
        title="VO2 Max"
        value="52.3"
        subtitle="85th Percentile"
        trend="up"
        color="green"
        icon={
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        }
        className="h-full"
      />
      
      <VitalSign
        title="Weekly Goal"
        value="165/150"
        subtitle="Minutes Exercise"
        trend="up"
        color="blue"
        icon={
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        }
        className="h-full"
      />
      
      <VitalSign
        title="Risk Score"
        value="15/100"
        subtitle="Very Low Risk"
        trend="down"
        color="green"
        icon={
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        }
        className="h-full"
      />
    </div>
  );
});

StaticHealthStats.displayName = 'StaticHealthStats';
