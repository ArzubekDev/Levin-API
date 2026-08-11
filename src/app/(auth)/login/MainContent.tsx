"use client";

import type { CredentialResponse } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  completeSignIn,
  DEFAULT_AUTHENTICATED_ROUTE,
  GitHubSignInButton,
  GoogleSignInButton,
  signInWithGoogle,
} from "@/features/auth";
import { Logo } from "@/shared/components/logo";

export function MainContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const handleAuthSuccess = async (token: string) => {
    await completeSignIn(token, queryClient);
    const nextPath = searchParams.get("next");
    router.replace(nextPath?.startsWith("/") ? nextPath : DEFAULT_AUTHENTICATED_ROUTE);
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const data = await signInWithGoogle(credentialResponse.credential!);
      await handleAuthSuccess(data.token);
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google sign-in failed");
    }
  };

  return (
    <div className="relative z-10 mt-8 flex min-h-[calc(100vh-var(--layout-header-height))] items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-md">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[1.35rem] bg-linear-to-b from-blue-500/20 via-transparent to-indigo-500/10 blur-sm"
        />
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/45 shadow-[0_0_60px_-15px_rgba(59,130,246,0.28)] backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-400/40 to-transparent" />
          <div className="space-y-8 p-8 sm:p-10">
            <div className="space-y-5 text-center">
              <div className="flex justify-center">
                <Logo href="/" showText={false} className="scale-110" />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/50 px-3 py-1 text-xs text-slate-400">
                  <Sparkles className="size-3 text-blue-400" />
                  Secure OAuth 2.0
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Welcome to <span className="gradient-text">Levin API</span>
                </h1>
                <p className="text-sm leading-relaxed text-slate-400">
                  Sign in to create mock endpoints, manage projects, and test your frontend faster.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <GoogleSignInButton
                onSuccess={handleGoogleSuccess}
                onError={() => alert("Google OAuth error")}
              />
              <GitHubSignInButton />
            </div>

            <p className="text-center text-xs leading-relaxed text-slate-500">
              By continuing, you agree to our terms of service.
              <br />
              Need help?{" "}
              <Link
                href="/docs"
                className="text-slate-400 underline-offset-4 hover:text-white hover:underline"
              >
                Read the docs
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
