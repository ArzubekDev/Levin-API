"use client";

import { Suspense } from "react";

import { MainContent } from "./MainContent";

function LoginFallback() {
  return (
    <div className="relative z-10 flex min-h-[calc(100vh-var(--layout-header-height))] items-center justify-center">
      <div className="size-8 animate-pulse rounded-full bg-slate-800" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <MainContent />
    </Suspense>
  );
}
