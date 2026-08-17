"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { projectKeys } from "@/entities/project/model/project-keys";
import { authKeys } from "@/features/auth";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { fetchClient } from "@/shared/lib/fetch-client";
import { cn } from "@/shared/lib/utils";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { Container } from "@/shared/ui/Container";
import { PageGlow } from "@/shared/ui/PageGlow";

import { DEFAULT_SCHEMA } from "../model/consts";
import { MockHead, MockProjectName } from "./MockHead";
import { MockSidebar } from "./MockSidebar";

interface CreateProjectInput {
  name: string;
  schemaJson: Record<string, unknown>;
  delay: number;
  errorRate: number;
  defaultLimit: number;
}

export function MockApi() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [schemaText, setSchemaText] = useState(JSON.stringify(DEFAULT_SCHEMA, null, 2));
  const [delay, setDelay] = useState(0);
  const [errorRate, setErrorRate] = useState(0);
  const [defaultLimit, setDefaultLimit] = useState(20);

  const createMutation = useMutation({
    mutationFn: (data: CreateProjectInput) => fetchClient.post("/projects", data),
    onSuccess: async () => {
      toast.success("Проект создан");
      await queryClient.invalidateQueries({ queryKey: authKeys.all });
      await queryClient.invalidateQueries({ queryKey: projectKeys.all });
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Не удалось создать проект");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const schemaJson = JSON.parse(schemaText) as Record<string, unknown>;
      createMutation.mutate({
        name: name.trim(),
        schemaJson,
        delay,
        errorRate,
        defaultLimit,
      });
    } catch {
      toast.error("Некорректный JSON в схеме");
    }
  };

  return (
    <section className="relative min-h-screen bg-slate-950 pt-24 pb-16 text-white">
      <PageGlow />

      <Container className="relative z-10">
        <Breadcrumbs />

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
        >
          <MockHead />

          <aside className="space-y-4 lg:sticky lg:top-24 lg:row-span-2 lg:self-start">
            <MockProjectName name={name} setName={setName} />
            <MockSidebar
              delay={delay}
              setDelay={setDelay}
              errorRate={errorRate}
              setErrorRate={setErrorRate}
              defaultLimit={defaultLimit}
              setDefaultLimit={setDefaultLimit}
              name={name}
              isPending={createMutation.isPending}
            />
          </aside>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 md:p-6">
            <div className="space-y-2">
              <div className="flex items-end justify-between gap-3">
                <Label htmlFor="schema-json">JSON Schema</Label>
                <span className="text-xs text-slate-500">ключ = имя ресурса в URL</span>
              </div>
              <Textarea
                id="schema-json"
                value={schemaText}
                onChange={(e) => setSchemaText(e.target.value)}
                spellCheck={false}
                className={cn(
                  "min-h-100 border-slate-700 bg-slate-950/70 font-mono text-sm leading-relaxed text-slate-200",
                  "focus-visible:border-blue-500/50",
                )}
                required
              />
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
}
