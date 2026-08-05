import type { ReactNode } from "react";

import { Container } from "@/shared/ui/Container";
import { Code2, Shield, Zap } from "lucide-react";

const FeatureCards = () => {
  return (
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
  )
}

export default FeatureCards

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