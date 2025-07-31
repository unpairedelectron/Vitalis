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
      <body className="antialiased font-sans">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
