"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/shared/components/ui/button";

interface NotFoundStateProps {
  title?: string;
  backUrl?: string;
  buttonText?: string;
}

export function NotFoundState({
  title = "Страница не найдена",
  backUrl = "/",
  buttonText = "На главную",
}: NotFoundStateProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950 p-8 text-white">
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-xl font-medium text-slate-300">{title}</p>
        <Button onClick={() => router.push(backUrl)}>
          <ArrowLeft className="mr-2 size-4" />
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
