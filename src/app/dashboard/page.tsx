import { HealthDashboard } from '@/components/HealthDashboard';
import { AuthGuard } from '@/components/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <HealthDashboard userId="demo-user-001" />
    </AuthGuard>
  );
}
