import { Button } from '@/shared/components/ui/button';
import { Container } from '@/shared/ui/Container';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const Home = () => {
  return (
    <section className="relative z-10 pt-24 pb-16">
      <Container className="text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-400">
          <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
          Free for juniors and pet projects
        </div>

        <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Build Mock APIs
          <br />
          <span className="bg-linear-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            in 30 seconds
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
          Don&apos;t wait for the backend. Describe a JSON Schema — get a ready REST endpoint with
          fake data, delays, and errors for realistic testing.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/generate">
            <Button size="lg" className="cursor-pointer bg-blue-600 px-8 text-white hover:bg-blue-700">
              Generate API
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
          <Link href="/docs">
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Documentation
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
