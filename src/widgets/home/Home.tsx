import Link from "next/link";

import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/shared/ui/Container";

export const Home = () => {
  return (
    <section className="relative z-10 pt-24 pb-16">
      <Container className="text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-400">
          <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
          Free for juniors and pet projects
        </div>

        <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Real & Mock APIs
          <br />
          <span className="bg-linear-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            in 30 seconds
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
          Don&apos;t wait for the backend. Get a{" "}
          <span className="text-slate-200">mock endpoint</span> with fake data for quick testing, or
          a <span className="text-slate-200">real REST API</span> with full CRUD for your next pet
          project.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/docs"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-40 rounded-sm bg-blue-600 text-white hover:bg-blue-500",
            )}
          >
            EXPLORE NOW
          </Link>
          <Link
            href="/mock-api"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "w-40 rounded-sm border-slate-700 bg-transparent text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-white",
            )}
          >
            GET STARTED
          </Link>
        </div>
      </Container>
    </section>
  );
};
