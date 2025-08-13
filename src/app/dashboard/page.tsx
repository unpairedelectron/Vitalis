'use client';

import { HealthDashboardPremiumClean } from '@/components/HealthDashboardPremiumClean';
import { AuthGuard } from '@/components/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <HealthDashboardPremiumClean userId="demo-user-001" isDemoMode={false} />
    </AuthGuard>
  );
}
