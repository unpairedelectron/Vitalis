import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

// Force dynamic rendering for all pages to avoid build issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Vitalis - AI Health Guardian | Military-Grade Smartwatch Analytics",
  description: "Transform your smartwatch data into clinical-grade health insights. AI-powered health monitoring with military precision for Samsung Health, Apple Health, Fitbit & Oura Ring.",
  keywords: "health monitoring, smartwatch analytics, AI health insights, medical report analysis, HIPAA compliant, FDA cleared algorithms, WHO guidelines",
  authors: [{ name: "Vitalis Health Intelligence" }],
  creator: "Vitalis Health Intelligence",
  publisher: "Vitalis Health Intelligence",
  openGraph: {
    title: "Vitalis - AI Health Guardian",
    description: "Military-grade smartwatch wellness analytics with AI-powered insights",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalis - AI Health Guardian",
    description: "Military-grade smartwatch wellness analytics with AI-powered insights",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans circadian-adaptive">
        <ClientProviders>
          {children}
        </ClientProviders>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize UX Singularity Engine
              if (typeof window !== 'undefined') {
                window.addEventListener('DOMContentLoaded', async () => {
                  try {
                    const { default: UXSingularityEngine } = await import('/src/lib/ux-singularity.ts');
                    window.uxSingularity = new UXSingularityEngine();
                  } catch (error) {
                    console.warn('UX Singularity Engine failed to load:', error);
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
