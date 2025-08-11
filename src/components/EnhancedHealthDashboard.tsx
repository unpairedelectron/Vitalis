'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HealthDashboardPremium } from './HealthDashboardPremium';
import { RealTimeVitals, StaticHealthStats } from './RealTimeVitals';
import { 
  PageTransition, 
  FadeInCard, 
  StaggerContainer, 
  StaggerItem,
  LoadingSpinner 
} from './ui/Animations';
import { DashboardSkeleton } from './ui/Skeleton';
import { EnhancedErrorBoundary, ToastContainer, Toast } from './ui/ErrorHandling';
import { 
  MobileDashboard, 
  MobileStatsGrid, 
  MobileList, 
  MobileQuickActions,
  ResponsiveWrapper,
  useResponsive 
} from './ui/MobileComponents';
import { demoHealthMetrics } from '../lib/demoData';

interface EnhancedDashboardProps {
  userId: string;
}

export const EnhancedHealthDashboard: React.FC<EnhancedDashboardProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const breakpoint = useResponsive();

  // Simulate loading - only runs once
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Demo toast notifications - only runs once
  useEffect(() => {
    const timer = setTimeout(() => {
      addToast({
        id: Date.now().toString(),
        type: 'success',
        title: 'Health Data Synced',
        message: 'All devices synchronized successfully',
        duration: 3000
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const addToast = (toast: Omit<Toast, 'id'> & { id: string }) => {
    setToasts(prev => [...prev, toast]);
    if (toast.duration) {
      setTimeout(() => removeToast(toast.id), toast.duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Mobile version
  const MobileVersion = () => (
    <MobileDashboard>
      <PageTransition>
        {/* Real-time Vitals - Updates independently */}
        <div className="p-4">
          <RealTimeVitals layout="grid" />
        </div>

        {/* Quick Actions */}
        <MobileQuickActions
          actions={[
            {
              id: 'sync',
              title: 'Sync Devices',
              color: 'blue',
              icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                </svg>
              ),
              action: () => addToast({
                id: Date.now().toString(),
                type: 'info',
                title: 'Syncing...',
                message: 'Updating data from all devices'
              })
            },
            {
              id: 'emergency',
              title: 'Emergency',
              color: 'red',
              icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              ),
              action: () => addToast({
                id: Date.now().toString(),
                type: 'error',
                title: 'Emergency Protocol',
                message: 'Emergency contacts have been notified'
              })
            },
            {
              id: 'report',
              title: 'Generate Report',
              color: 'green',
              icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                </svg>
              ),
              action: () => addToast({
                id: Date.now().toString(),
                type: 'success',
                title: 'Report Generated',
                message: 'Your weekly health report is ready'
              })
            },
            {
              id: 'insights',
              title: 'AI Insights',
              color: 'yellow',
              icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ),
              action: () => addToast({
                id: Date.now().toString(),
                type: 'info',
                title: 'AI Analysis',
                message: 'New health insights available'
              })
            }
          ]}
        />

        {/* Recent Activities */}
        <div className="p-4">
          <MobileList
            title="Recent Activities"
            items={demoHealthMetrics.exerciseMetrics.recentWorkouts.map(workout => ({
              id: workout.id.toString(),
              title: workout.type,
              subtitle: `${workout.duration} min • ${workout.calories} cal`,
              value: workout.intensity,
              icon: (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🏃‍♂️</span>
                </div>
              )
            }))}
          />
        </div>

        {/* Device Status */}
        <div className="p-4">
          <MobileList
            title="Connected Devices"
            items={demoHealthMetrics.deviceStatus.map(device => ({
              id: device.id,
              title: device.name,
              subtitle: `Last sync: ${new Date(device.lastSync).toLocaleTimeString()}`,
              value: `${device.batteryLevel}%`,
              icon: (
                <div className={`w-2 h-2 rounded-full ${device.status === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`} />
              )
            }))}
          />
        </div>
      </PageTransition>
    </MobileDashboard>
  );

  // Desktop version with enhanced animations
  const DesktopVersion = () => (
    <PageTransition>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Enhanced Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40"
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
                >
                  <span className="text-white font-bold text-lg">V</span>
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Vitalis Health Intelligence
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Real-time health monitoring • Last sync: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 dark:text-green-300 text-sm font-medium">
                    All Systems Optimal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <div className="p-6">
          <StaggerContainer>
            {/* Real-time Vitals Row - Updates independently */}
            <StaggerItem>
              <FadeInCard delay={0.1}>
                <RealTimeVitals />
              </FadeInCard>
            </StaggerItem>

            {/* Static Health Stats - No updates */}
            <StaggerItem>
              <FadeInCard delay={0.3} className="mt-8">
                <StaticHealthStats />
              </FadeInCard>
            </StaggerItem>

            {/* Main Dashboard - Static after initial load */}
            <StaggerItem>
              <FadeInCard delay={0.5} className="mt-8">
                <HealthDashboardPremium userId={userId} />
              </FadeInCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  );

  return (
    <EnhancedErrorBoundary>
      <ResponsiveWrapper
        mobile={<MobileVersion />}
        desktop={<DesktopVersion />}
      />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </EnhancedErrorBoundary>
  );
};
