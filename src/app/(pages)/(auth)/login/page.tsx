"use client";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { api, setAccessToken, User } from "@/shared/lib/api";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { FaGithub } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleAuthSuccess = async (token: string) => {
    setAccessToken(token);
    await queryClient.resetQueries({ queryKey: ["me"] });
    await queryClient.resetQueries({ queryKey: ["projects"] });
    router.replace("/dashboard");
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const data = await api.post<{ token: string; user: User }>("/auth/google", {
        credential: credentialResponse.credential,
      });
      await handleAuthSuccess(data.token);
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Ошибка входа через Google");
    }
  };

  const handleDevLogin = async () => {
    try {
      const data = await api.post<{ token: string; user: User }>("/auth/dev-login", {});
      await handleAuthSuccess(data.token);
    } catch (error) {
      console.error("Dev login failed:", error);
      alert("Dev login недоступен. Проверьте, что бэкенд запущен.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">MockGen</CardTitle>
          <CardDescription className="text-slate-400">
            Войдите, чтобы создавать Mock API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert("Ошибка Google OAuth")}
              theme="filled_black"
              size="large"
              text="signin_with"
              shape="rectangular"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">или</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            onClick={() => alert("GitHub OAuth будет добавлен позже")}
          >
            <FaGithub className="mr-2 h-4 w-4" />
            Войти через GitHub
          </Button>

          {/* Временная кнопка для теста */}
          <Button
            variant="ghost"
            className="w-full text-slate-500 hover:text-slate-300"
            onClick={handleDevLogin}
          >
            Dev Login (тест)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
