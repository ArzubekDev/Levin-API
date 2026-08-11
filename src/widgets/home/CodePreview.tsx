import { Container } from "@/shared/ui/Container";

export const CodePreview = () => {
  return (
    <section className="relative z-10 pb-24">
      <Container>
        <div className="overflow-hidden rounded-xl border border-slate-800/50 bg-slate-900/40 shadow-[0_0_60px_-15px_rgba(59,130,246,0.25)] backdrop-blur-sm">
          <div className="flex items-center gap-2 border-b border-slate-800/50 px-4 py-3">
            <div className="size-3 rounded-full bg-red-500/20" />
            <div className="size-3 rounded-full bg-yellow-500/20" />
            <div className="size-3 rounded-full bg-green-500/20" />
            <span className="ml-2 font-mono text-xs text-slate-500">endpoint</span>
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
            <code>
              <span className="text-slate-500">{`// GET /api/a7k9m2p/users`}</span>
              {"\n"}
              <span className="text-purple-400">{"{"}</span>
              {"\n  "}
              <span className="text-blue-400">&quot;data&quot;</span>
              <span className="text-slate-300">: </span>
              <span className="text-yellow-300">[</span>
              {"\n    "}
              <span className="text-yellow-300">{"{"}</span>
              {"\n      "}
              <span className="text-blue-400">&quot;id&quot;</span>
              <span className="text-slate-300">: </span>
              <span className="text-green-400">515</span>
              <span className="text-slate-300">,</span>
              {"\n      "}
              <span className="text-blue-400">&quot;name&quot;</span>
              <span className="text-slate-300">: </span>
              <span className="text-green-300">&quot;Katelyn Friesen&quot;</span>
              <span className="text-slate-300">,</span>
              {"\n      "}
              <span className="text-blue-400">&quot;email&quot;</span>
              <span className="text-slate-300">: </span>
              <span className="text-green-300">&quot;katelyn@example.com&quot;</span>
              <span className="text-slate-300">,</span>
              {"\n      "}
              <span className="text-blue-400">&quot;role&quot;</span>
              <span className="text-slate-300">: </span>
              <span className="text-green-300">&quot;admin&quot;</span>
              {"\n    "}
              <span className="text-yellow-300">{"}"}</span>
              {"\n  "}
              <span className="text-yellow-300">]</span>
              <span className="text-slate-300">,</span>
              {"\n  "}
              <span className="text-blue-400">&quot;meta&quot;</span>
              <span className="text-slate-300">: </span>
              <span className="text-yellow-300">{"{"}</span>
              <span className="text-green-400"> count: 20 </span>
              <span className="text-yellow-300">{"}"}</span>
              {"\n"}
              <span className="text-purple-400">{"}"}</span>
            </code>
          </pre>
        </div>
      </Container>
    </section>
  );
};
