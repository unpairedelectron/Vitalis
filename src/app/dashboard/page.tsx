'use client';

import { HealthDashboardPremium } from '@/components/HealthDashboardPremium';
import { AuthGuard } from '@/components/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <HealthDashboardPremium userId="demo-user-001" />
    </AuthGuard>
  );
}
