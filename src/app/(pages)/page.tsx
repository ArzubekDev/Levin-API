import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Zap, Shield, Code2 } from "lucide-react";
import { LightningBackground } from "@/shared/components/lightning-background";

export default function HomePage() {
  return (
    <div className="min-h-screen text-white overflow-hidden">
      <LightningBackground />
      {/* Background glow */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-sm">
              L
            </div>
            <span className="font-semibold text-lg tracking-tight">Levin API</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="text-sm text-slate-400 hover:text-white transition-colors">
              Документация
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Войти
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Начать
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Бесплатно для джунов и pet-проектов
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Создавай Mock API
            <br />
            <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              за 30 секунд
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Не жди бэкендера. Опиши JSON Schema — получи готовый REST endpoint 
            с фейковыми данными, задержками и ошибками для реалистичного тестирования.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Создать API
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                Документация
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Code Preview */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-slate-800/50 bg-slate-900/40 backdrop-blur-sm shadow-[0_0_60px_-15px_rgba(59,130,246,0.25)]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/50">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
              <span className="ml-2 text-xs text-slate-500 font-mono">endpoint</span>
            </div>
            <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
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
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Zap className="h-5 w-5 text-blue-400" />}
              title="Zero-code"
              description="Вставь JSON Schema — получи готовый endpoint. Не нужно писать бэкенд."
            />
            <FeatureCard 
              icon={<Shield className="h-5 w-5 text-indigo-400" />}
              title="Реалистично"
              description="Настраивай задержки, случайные ошибки и пагинацию. Как настоящий сервер."
            />
            <FeatureCard 
              icon={<Code2 className="h-5 w-5 text-blue-400" />}
              title="Для практики"
              description="Идеально для джунов. Тренируй fetch, axios, TanStack Query без боевого API."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-slate-500">
          <span>© 2026 Levin API</span>
          <span>Сделано с Next.js + NestJS</span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-800/50 bg-slate-900/40 backdrop-blur-sm p-6 hover:border-slate-700 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
