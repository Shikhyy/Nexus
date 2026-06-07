import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXUS — Human-AI Co-Evolution Engine",
  description: "NEXUS continuously maps, analyzes, and closes the capability gaps between your workforce and the rapidly accelerating demands of the AI market. Built with Azure AI, AutoGen, and Semantic Kernel.",
  keywords: ["AI", "capability mapping", "enterprise", "AutoGen", "Azure AI", "Microsoft"],
};

import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--color-parchment)]">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
