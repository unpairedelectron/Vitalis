'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LandingPage } from '@/components/LandingPage';
import { HealthDashboard } from '@/components/HealthDashboard';
import { HealthDashboardSimple } from '@/components/HealthDashboardSimple';
import { HealthDashboardStable } from '@/components/HealthDashboardStable';
import { HealthDashboardClean } from '@/components/HealthDashboardClean';
import { HealthDashboardPremium } from '@/components/HealthDashboardPremium';

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
    return <HealthDashboardPremium userId="demo-user-001" onBackToLanding={handleBackToLanding} />;
  }

  return <LandingPage onEnterDashboard={handleEnterDashboard} />;
}
