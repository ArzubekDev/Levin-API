import { Separator } from "@/shared/components/ui/separator";

import { DOC_SECTIONS } from "./model/sections";

export function DocsContent() {
  return (
    <div className="h-[calc(100vh-166px)] w-full flex-1 scrollbar-thin overflow-y-auto rounded-r-xl border border-slate-800 bg-slate-900 p-6 md:p-8">
      <header className="mb-10">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Документация
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          Подробный гид по Levin API для начинающих: от первого входа и JSON Schema до публичного
          mock endpoint, delay, ошибок и примеров на fetch / axios / React Query.
        </p>
      </header>

      {DOC_SECTIONS.map((section, index) => (
        <div key={section.id}>
          {index > 0 && <Separator className="my-10 bg-slate-800" />}
          <section id={section.id} className="mb-14 scroll-mt-28">
            <h2 className="gradient-text mb-5 text-2xl font-semibold md:text-3xl">
              {section.title}
            </h2>
            {section.content}
          </section>
        </div>
      ))}
    </div>
  );
}
