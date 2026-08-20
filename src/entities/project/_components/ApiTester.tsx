"use client";

import { Check, Copy, Play } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { AnimatedBoltIcon } from "@/shared/ui/AnimatedBoltIcon";

import { ResponseViewer } from "./ResponseViewer";

interface ApiConsoleProps {
  apiUrl: string;
  defaultLimit: number;
  limitOverride: string;
  onLimitChange: (val: string) => void;
  copied: boolean;
  onCopy: () => void;
  isTesting: boolean;
  onTest: () => void;
  testResponse: string | null;
  responseStatus: number | null;
  responseExpanded: boolean;
  onResponseExpandedChange: (expanded: boolean) => void;
}

export function ApiTester({
  apiUrl,
  defaultLimit,
  limitOverride,
  onLimitChange,
  copied,
  onCopy,
  isTesting,
  onTest,
  testResponse,
  responseStatus,
  responseExpanded,
  onResponseExpandedChange,
}: ApiConsoleProps) {
  return (
    <section className="mb-6 space-y-4 rounded-2xl border-slate-800/80 sm:border sm:bg-slate-900/50 sm:p-6">
      <div className="space-y-2">
        <Label className="text-slate-400">URL эндпоинта</Label>
        <div className="flex items-center gap-2">
          <code className="flex-1 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80 p-3 font-mono text-sm text-emerald-400">
            {apiUrl}
          </code>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer border-slate-700"
            onClick={onCopy}
            aria-label="Скопировать URL эндпоинта"
          >
            {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
          </Button>
        </div>
      </div>

      <div className="flex justify-between gap-3 sm:flex-row sm:items-end">
        <div className="space-y-2 sm:w-40">
          <Label htmlFor="limit">Лимит</Label>
          <Input
            id="limit"
            type="number"
            min={1}
            max={100}
            placeholder={String(defaultLimit)}
            value={limitOverride}
            onChange={(e) => onLimitChange(e.target.value)}
            className="h-10 border-slate-700 bg-slate-950/60"
          />
        </div>
        <Button
          onClick={onTest}
          disabled={isTesting}
          className="h-10 cursor-pointer bg-blue-600 hover:bg-blue-500"
        >
          {isTesting ? (
            <>
              <AnimatedBoltIcon variant="loader" className="mr-2 size-4" />
              Тестовый запрос
            </>
          ) : (
            <>
              <Play className="mr-2 size-4" />
              Тестовый запрос
            </>
          )}
        </Button>
      </div>

      {testResponse && (
        <ResponseViewer
          response={testResponse}
          status={responseStatus}
          isExpanded={responseExpanded}
          onExpandedChange={onResponseExpandedChange}
        />
      )}
    </section>
  );
}
