import "./globals.css";

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { Toaster } from "@/shared/components/ui/sonner";

import { GoogleProvider } from "./providers/google-provider";
import { QueryProvider } from "./providers/query-provider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "Levin API — генератор API для практики и разработки",
    template: "%s | Levin API",
  },
  description: "Генератор API для практики и разработки",
  openGraph: {
    siteName: "Levin API",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <QueryProvider>
          <GoogleProvider>{children}</GoogleProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
