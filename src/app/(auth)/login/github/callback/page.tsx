"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

import { validateGitHubOAuthState } from "@/features/auth/lib/github-oauth";
import { completeSignIn } from "@/features/auth/lib/session-actions";
import { signInWithGitHub } from "@/features/auth/lib/sign-in-providers";

function GitHubCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const error = searchParams.get("error");
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (error) {
      alert("GitHub sign-in was cancelled");
      router.replace("/login");
      return;
    }

    if (!code || !validateGitHubOAuthState(state)) {
      alert("Invalid GitHub OAuth response");
      router.replace("/login");
      return;
    }

    void (async () => {
      try {
        const data = await signInWithGitHub(code);
        await completeSignIn(data.token, queryClient);
        router.replace("/dashboard");
      } catch (signInError) {
        console.error("GitHub login failed:", signInError);
        alert("GitHub sign-in failed");
        router.replace("/login");
      }
    })();
  }, [queryClient, router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-white">
      <div className="flex items-center gap-3 text-slate-400">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Signing in with GitHub...</span>
      </div>
    </div>
  );
}

export default function GitHubCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      }
    >
      <GitHubCallbackContent />
    </Suspense>
  );
}
