'use client';

import { AuthGuard } from '@/components/AuthGuard';
import ProfileSettings from '@/components/ProfileSettings';

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileSettings />
    </AuthGuard>
  );
}
