"use client";

import { DocsSidebarNav } from "./DocsSidebarNav";

export function DocsSidebar() {
  return (
    <aside className="hidden h-full w-72 shrink-0 scrollbar-thin overflow-y-auto rounded-l-xl border-y border-l border-slate-800 bg-slate-900 p-4 md:block lg:w-84">
      <DocsSidebarNav />
    </aside>
  );
}
