import { Container } from "@/shared/ui/Container";

import { stats } from "../model/stats-data";
import { StatPlaceholder } from "./StatsPlaceholder";

export default function StatsSection() {
  return (
    <section className="relative z-10 pb-24">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-800/50 bg-slate-900/40 p-6 backdrop-blur-sm"
            >
              <StatPlaceholder />
              <h3 className="mt-4 font-semibold text-white">{stat.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
