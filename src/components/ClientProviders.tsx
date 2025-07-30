'use client';

import { UserProvider } from "@/contexts/UserContext";
import { ToastProvider } from "@/contexts/ToastContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </ToastProvider>
  );
}
