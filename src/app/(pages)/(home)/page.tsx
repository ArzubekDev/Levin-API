import { Button } from "@/shared/components/ui/button";
import { Container } from "@/shared/ui/Container";
import { ArrowRight, Code2, Shield, Zap } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden text-white">
      {/* Hero */}
      <section className="relative z-10 pt-24 pb-16">
        <Container className="text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-400">
            <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
            Free for juniors and pet projects
          </div>
          
          <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Build Mock APIs
          <br />
            <span className="bg-linear-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">in 30 seconds</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
            Don&apos;t wait for the backend. Describe a JSON Schema — get a ready REST endpoint 
            with fake data, delays, and errors for realistic testing.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="bg-blue-600 px-8 text-white hover:bg-blue-700">
                Create API
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                Documentation
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Code Preview */}
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

      {/* Features */}
      <section className="relative z-10 pb-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard 
              icon={<Zap className="size-5 text-blue-400" />}
              title="Zero-code"
              description="Paste a JSON Schema — get a ready endpoint. No backend code required."
            />
            <FeatureCard 
              icon={<Shield className="size-5 text-indigo-400" />}
              title="Realistic"
              description="Configure delays, random errors, and pagination. Just like a real server."
            />
            <FeatureCard 
              icon={<Code2 className="size-5 text-blue-400" />}
              title="For practice"
              description="Perfect for juniors. Practice fetch, axios, and TanStack Query without a production API."
            />
          </div>
        </Container>
      </section>
      {/* Footer */}
      <footer className="relative z-10 border-t border-(--layout-border-subtle) py-8">
        <Container className="flex items-center justify-between text-sm text-slate-500">
          <span>© 2026 Levin API</span>
          <span>Built with Next.js + NestJS</span>
        </Container>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-800/50 bg-slate-900/40 p-6 backdrop-blur-sm transition-colors hover:border-slate-700">
      <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-slate-800">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}
