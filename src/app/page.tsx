'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LandingPage } from '@/components/LandingPage';
import { HealthDashboardPremiumClean } from '@/components/HealthDashboardPremiumClean';

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);
  const router = useRouter();

  const handleEnterDashboard = () => {
    setShowDashboard(true);
  };

  const handleBackToLanding = () => {
    setShowDashboard(false);
  };

  if (showDashboard) {
    // Production-ready dashboard with debug elements removed
    return <HealthDashboardPremiumClean userId="demo-user-001" onBackToLanding={handleBackToLanding} isDemoMode={false} />;
  }

  return <LandingPage onEnterDashboard={handleEnterDashboard} />;
}
