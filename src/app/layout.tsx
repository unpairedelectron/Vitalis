import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vitalis - AI Health Guardian",
  description: "Advanced AI-powered medical report analysis and health monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
