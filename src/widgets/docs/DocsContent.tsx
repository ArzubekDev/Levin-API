import { Separator } from "@/shared/components/ui/separator";

import { DOC_SECTIONS } from "./model/sections";

export function DocsContent() {
  return (
    <div
      id="docs-content-scroll"
      className="min-h-0 w-full flex-1 scrollbar-thin overflow-y-auto rounded-r-xl border-slate-800 md:p-8 lg:border lg:bg-slate-900 lg:p-6"
    >
      <header className="mb-2 sm:mb-10">
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-white md:text-4xl lg:text-3xl">
          Документация
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-400 md:text-lg">
          Подробный гид по Levin API для начинающих: от первого входа и JSON Schema до публичного
          mock endpoint, delay, ошибок и примеров на fetch / axios / React Query.
        </p>
      </header>

      {DOC_SECTIONS.map((section, index) => (
        <div key={section.id}>
          {index > 0 && <Separator className="my-4 bg-slate-800 lg:my-10" />}
          <section id={section.id} className="mb-4 scroll-mt-28 lg:mb-14">
            <h2 className="gradient-text mb-5 text-xl font-semibold md:text-3xl lg:text-2xl">
              {section.title}
            </h2>
            <p className="text-sm leading-relaxed text-slate-400 md:text-lg">{section.content}</p>
          </section>
        </div>
      ))}
    </div>
  );
}
