"use client";

import type { CredentialResponse } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  completeSignIn,
  DEFAULT_AUTHENTICATED_ROUTE,
  GitHubSignInButton,
  GoogleSignInButton,
  signInWithGoogle,
} from "@/features/auth";
import { getSafeNextPath } from "@/features/auth/lib/safe-next-path";
import { Logo } from "@/shared/ui/Logo";

export function MainContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const handleAuthSuccess = async () => {
    await completeSignIn(queryClient);
    router.replace(getSafeNextPath(searchParams.get("next"), DEFAULT_AUTHENTICATED_ROUTE));
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      await signInWithGoogle(credentialResponse.credential!);
      await handleAuthSuccess();
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Не удалось войти через Google");
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
                  Безопасный OAuth 2.0
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Добро пожаловать в <span className="gradient-text">Levin API</span>
                </h1>
                <p className="text-sm leading-relaxed text-slate-400">
                  Войдите, чтобы создавать mock-эндпоинты, управлять проектами и быстрее тестировать
                  фронтенд.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <GoogleSignInButton
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Ошибка Google OAuth")}
              />
              <GitHubSignInButton />
            </div>

            <p className="text-center text-xs leading-relaxed text-slate-500">
              Продолжая, вы соглашаетесь с условиями использования.
              <br />
              Нужна помощь?{" "}
              <Link
                href="/docs"
                className="text-slate-400 underline-offset-4 hover:text-white hover:underline"
              >
                Читать документацию
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
