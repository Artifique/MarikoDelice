"use client";

import React from "react";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageLoader } from "@/components/ui/PageLoader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { useIsHydrated } from "@/lib/hooks";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isHydrated = useIsHydrated();

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${playfair.variable} ${dmsans.variable} font-dmsans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {isHydrated ? (
            <>
              <PageLoader />
              <ScrollProgress />
              {children}
            </>
          ) : (
            <div className="fixed inset-0 bg-white flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
