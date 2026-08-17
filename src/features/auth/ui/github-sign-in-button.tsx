"use client";

import { FaGithub } from "react-icons/fa6";
import { toast } from "sonner";

import { buildGitHubAuthorizeUrl } from "@/features/auth/lib/github-oauth";
import { oauthButtonClassName } from "@/features/auth/ui/oauth-button-styles";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface GitHubSignInButtonProps {
  className?: string;
}

export function GitHubSignInButton({ className }: GitHubSignInButtonProps) {
  const handleSignIn = () => {
    try {
      window.location.assign(buildGitHubAuthorizeUrl());
    } catch (error) {
      console.error("GitHub OAuth is not configured:", error);
      toast.error("Вход через GitHub не настроен");
    }
  };

  return (
    <Button
      type="button"
      size="lg"
      variant="outline"
      className={cn(oauthButtonClassName, className)}
      onClick={handleSignIn}
    >
      <FaGithub className="size-4" />
      Войти через GitHub
    </Button>
  );
}
