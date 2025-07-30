'use client';

import React, { useState } from 'react';
import { HealthDashboard } from '@/components/HealthDashboard';
import { LandingPage } from '@/components/LandingPage';

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <HealthDashboard userId="demo-user-001" onBackToLanding={() => setShowDashboard(false)} />;
  }

  return <LandingPage onEnterDashboard={() => setShowDashboard(true)} />;
}
