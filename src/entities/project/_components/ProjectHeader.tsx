import { Badge } from "@/shared/components/ui/badge";

interface ProjectHeaderProps {
  name: string;
  delay: number;
  errorRate: number;
  defaultLimit: number;
}

export function ProjectHeader({ name, delay, errorRate, defaultLimit }: ProjectHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline" className="border-slate-700 text-slate-400">
            Задержка: {delay} мс
          </Badge>
          <Badge variant="outline" className="border-slate-700 text-slate-400">
            Ошибки: {errorRate}%
          </Badge>
          <Badge variant="outline" className="border-slate-700 text-slate-400">
            По умолчанию: {defaultLimit} записей
          </Badge>
        </div>
      </div>
    </header>
  );
}
