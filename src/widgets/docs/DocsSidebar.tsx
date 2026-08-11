"use client";

import { useMemo } from "react";

import { useActiveSection } from "@/shared/hooks/use-active-section";
import { cn } from "@/shared/lib/utils";

import { DOC_SECTIONS, getSidebarGroups } from "./model/sections";

export function DocsSidebar() {
  const sidebarGroups = useMemo(() => getSidebarGroups(DOC_SECTIONS), []);
  const sectionIds = useMemo(() => DOC_SECTIONS.map((s) => s.id), []);

  const { activeId, handleSelect } = useActiveSection(sectionIds, DOC_SECTIONS[0]?.id);

  return (
    <aside className="hidden h-[calc(100vh-166px)] w-72 shrink-0 scrollbar-thin overflow-y-auto rounded-l-xl border-y border-l border-slate-800 bg-slate-900 p-4 md:block lg:w-84">
      <nav className="space-y-8">
        {sidebarGroups.map((group) => (
          <div key={group.title}>
            <h4 className="mb-3 text-xs font-semibold tracking-wide text-slate-500">
              {group.title}
            </h4>
            <ul className="space-y-1 border-l border-slate-800 pl-2">
              {group.items.map((item) => {
                const isActive = activeId === item.id;

                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={() => handleSelect(item.id)}
                      className={cn(
                        "block rounded-md px-3 py-1.5 text-sm transition-all duration-200",
                        isActive
                          ? "-ml-2.25 border-l-2 border-blue-500 bg-blue-500/10 font-medium text-blue-400"
                          : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
