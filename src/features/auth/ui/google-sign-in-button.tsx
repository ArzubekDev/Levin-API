"use client";

import type { CredentialResponse } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import { oauthButtonClassName } from "@/features/auth/ui/oauth-button-styles";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface GoogleSignInButtonProps {
  onSuccess: (response: CredentialResponse) => void;
  onError?: () => void;
  className?: string;
}

export function GoogleSignInButton({ onSuccess, onError, className }: GoogleSignInButtonProps) {
  return (
    <div className="relative h-11 w-full">
      <Button
        type="button"
        variant="outline"
        size="lg"
        tabIndex={-1}
        aria-hidden
        className={cn(oauthButtonClassName, "pointer-events-none", className)}
      >
        <FcGoogle className="size-4" />
        Войти через Google
      </Button>

      <div
        className="opacity-hit absolute inset-0 z-10 overflow-hidden [&_iframe]:size-full [&>div]:size-full [&>div>div]:mx-auto [&>div>div]:size-full"
        aria-label="Войти через Google"
      >
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          theme="outline"
          size="large"
          text="continue_with"
          shape="rectangular"
          width={320}
        />
      </div>
    </div>
  );
}
