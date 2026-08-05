import { Separator } from "@/shared/components/ui/separator";
import { DOC_SECTIONS } from "./model/sections";

export function DocsContent() {
  return (
    <main className="max-w-2xl flex-1">
      <h1 className="mb-4 text-4xl font-bold">Documentation</h1>
      <p className="mb-10 text-lg text-slate-400">
        Complete guide to creating and using Mock APIs.
      </p>

      {DOC_SECTIONS.map((section, index) => (
        <div key={section.id}>
          {index > 0 && <Separator className="my-8 bg-slate-800" />}
          <section id={section.id} className="mb-12">
            <h2 className="gradient-text mb-4 text-2xl font-semibold">{section.title}</h2>
            {section.content}
          </section>
        </div>
      ))}
    </main>
  );
}
