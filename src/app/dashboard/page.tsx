'use client';

import { EnhancedHealthDashboard } from '@/components/EnhancedHealthDashboard';
import { AuthGuard } from '@/components/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <EnhancedHealthDashboard userId="demo-user-001" />
    </AuthGuard>
  );
}
