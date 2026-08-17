import { Database, Gauge, Timer, TriangleAlert } from "lucide-react";
import { type ReactNode } from "react";

import { Button } from "@/shared/components/ui/button";
import { Slider } from "@/shared/components/ui/slider";
import { AnimatedBoltIcon } from "@/shared/ui/AnimatedBoltIcon";

type MockSidebarProps = {
  delay: number;
  setDelay: (value: number) => void;
  errorRate: number;
  setErrorRate: (value: number) => void;
  defaultLimit: number;
  setDefaultLimit: (value: number) => void;
  name: string;
  isPending: boolean;
};

function SettingRow({
  icon,
  label,
  valueLabel,
  children,
}: {
  icon: ReactNode;
  label: string;
  valueLabel: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-slate-800/80 bg-slate-950/40 px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span className="text-blue-400/90">{icon}</span>
          {label}
        </div>
        <span className="font-mono text-sm text-slate-200">{valueLabel}</span>
      </div>
      {children}
    </div>
  );
}

export function MockSidebar({
  delay,
  setDelay,
  errorRate,
  setErrorRate,
  defaultLimit,
  setDefaultLimit,
  name,
  isPending,
}: MockSidebarProps) {
  return (
    <div className="space-y-4">
      <section className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 md:p-6">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
            Поведение ответа
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Применяется ко всем mock-запросам этого проекта.
          </p>
        </div>

        <SettingRow
          icon={<Timer className="size-4" />}
          label="Задержка ответа"
          valueLabel={`${delay} мс`}
        >
          <Slider
            value={delay}
            onValueChange={(value) => setDelay(typeof value === "number" ? value : value[0])}
            min={0}
            max={5000}
            step={100}
            className="mt-1"
          />
          <div className="flex justify-between text-[11px] text-slate-600">
            <span>0</span>
            <span>5с</span>
          </div>
        </SettingRow>

        <SettingRow
          icon={<TriangleAlert className="size-4" />}
          label="Частота ошибок"
          valueLabel={`${errorRate}%`}
        >
          <Slider
            value={errorRate}
            onValueChange={(value) => setErrorRate(typeof value === "number" ? value : value[0])}
            min={0}
            max={50}
            step={1}
            className="mt-1"
          />
          <div className="flex justify-between text-[11px] text-slate-600">
            <span>всегда OK</span>
            <span>50% ошибок</span>
          </div>
        </SettingRow>

        <SettingRow
          icon={<Database className="size-4" />}
          label="Записей по умолчанию"
          valueLabel={`${defaultLimit}`}
        >
          <Slider
            value={defaultLimit}
            onValueChange={(value) => setDefaultLimit(typeof value === "number" ? value : value[0])}
            min={1}
            max={100}
            step={1}
            className="mt-1"
          />
          <div className="flex items-center gap-2 pt-1">
            <Gauge className="size-3.5 text-slate-600" />
            <p className="text-[11px] leading-snug text-slate-500">
              Используется, если клиент не указал <code className="text-slate-400">?limit=</code>.
              Макс. 100.
            </p>
          </div>
        </SettingRow>
      </section>

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full cursor-pointer rounded-xl bg-blue-600 text-base font-medium hover:bg-blue-500"
        disabled={isPending || !name.trim()}
      >
        {isPending && <AnimatedBoltIcon variant="loader" className="mr-2 size-4" />} Создать Mock
        API
      </Button>
    </div>
  );
}
