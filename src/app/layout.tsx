import "./globals.css";

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";

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

export const metadata: Metadata = {
  title: {
    default: "Генератор REST API для практики и разработки",
    template: "%s | Levin API",
  },
  description:
    "Быстрое создание фейковых JSON эндпоинтов без бэкенда. Идеально для frontend-разработчиков и тестирования UI.",
  openGraph: {
    title: "Levin API — Генератор REST API для практики и разработки",
    description:
      "Быстрое создание фейковых JSON эндпоинтов без бэкенда. Идеально для frontend-разработчиков и тестирования UI.",
    siteName: "Levin API",
    type: "website",
    url: "https://levin-mock-api.vercel.app",
    images: [
      {
        url: "https://levin-mock-api.vercel.app/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Levin API Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Levin API — Генератор REST API для практики и разработки",
    description:
      "Быстрое создание фейковых JSON эндпоинтов без бэкенда. Идеально для frontend-разработчиков и тестирования UI.",
    images: ["https://levin-mock-api.vercel.app/og.jpg"],
  },
  keywords: [
    "Levin API",
    "генератор API",
    "REST API генератор",
    "mock API generator",
    "создать фейковый API",
    "REST API mock",
    "JSON Schema",
    "CRUD API",
    "fake REST API",
    "API для разработчиков",
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  verification: {
    google: "atbLR5scqz35Rs6futsoklRkAlFAE20GkjTfbla_qyw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Levin API",
    url: "https://levin-mock-api.vercel.app",
  };
  return (
    <html lang="ru" className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Script id="schema-org" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>
        <QueryProvider>
          <GoogleProvider>{children}</GoogleProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
