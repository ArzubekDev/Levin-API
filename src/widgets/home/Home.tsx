import Link from "next/link";

import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/shared/ui/Container";

export const Home = () => {
  return (
    <section className="relative z-10 pt-18 pb-16 sm:pt-24">
      <Container className="text-center">
        <div className="mb-0 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-400 sm:mb-8">
          <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
          Free for juniors and pet projects
        </div>

        <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Real & Mock APIs
          <br />
          <span className="bg-linear-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            in 30 seconds
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-lg">
          Don&apos;t wait for the backend. Get a{" "}
          <span className="text-slate-200">mock endpoint</span> with fake data for quick testing, or
          a <span className="text-slate-200">real REST API</span> with full CRUD for your next pet
          project.
        </p>

        <div className="mx-auto flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <Link
            href="/docs"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 cursor-pointer bg-blue-600 px-6 text-white hover:bg-blue-500",
            )}
          >
            Explore now
          </Link>
          <Link
            href="/mock-api"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-11 cursor-pointer border-slate-700 bg-transparent px-6 text-slate-200 hover:border-slate-500 hover:bg-slate-800 hover:text-white",
            )}
          >
            Get started
          </Link>
        </div>
      </Container>
    </section>
  );
};
