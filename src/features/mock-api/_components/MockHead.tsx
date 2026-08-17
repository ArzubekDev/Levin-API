import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

type MockProjectNameProps = {
  name: string;
  setName: (value: string) => void;
};

export const MockHead = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Новый <span className="gradient-text">Mock API</span>
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
        Опишите ресурсы в JSON Schema, настройте задержку и ошибки, выберите, сколько записей
        возвращать по умолчанию.
      </p>
    </div>
  );
};

export const MockProjectName = ({ name, setName }: MockProjectNameProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="project-name">
        Название API <span className="text-red-400">*</span>
      </Label>
      <Input
        id="project-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Users"
        className="h-10 border-slate-700 bg-slate-950/60"
        required
      />
    </div>
  );
};
