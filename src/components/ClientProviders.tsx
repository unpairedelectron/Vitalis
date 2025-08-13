'use client';

import { UserProvider } from "@/contexts/UserContext";
import { ToastProvider } from "@/contexts/ToastContext";
import UXSingularityProvider from "./UXSingularityProvider";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <UserProvider>
        <UXSingularityProvider />
        {children}
      </UserProvider>
    </ToastProvider>
  );
}
