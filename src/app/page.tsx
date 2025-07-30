'use client';

import React, { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { HealthDashboard } from '@/components/HealthDashboard';

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleEnterDashboard = () => {
    setShowDashboard(true);
  };

  const handleBackToLanding = () => {
    setShowDashboard(false);
  };

  if (showDashboard) {
    return <HealthDashboard userId="demo-user-001" onBackToLanding={handleBackToLanding} />;
  }

  return <LandingPage onEnterDashboard={handleEnterDashboard} />;
}
