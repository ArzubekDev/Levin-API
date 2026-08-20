"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";

import { DocsSidebarNav } from "./DocsSidebarNav";

export function DocsSidebarMobile() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group shrink-0 border-y border-slate-800 md:hidden"
    >
      <CollapsibleTrigger className="flex w-full cursor-pointer items-center gap-2 py-3 text-sm text-slate-200 outline-none">
        <ChevronRight className="size-4 text-slate-400 transition-transform duration-200 group-data-open:rotate-90" />
        Меню
      </CollapsibleTrigger>
      <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
        <div className="max-h-[min(60vh,28rem)] scrollbar-thin overflow-y-auto pb-4">
          <DocsSidebarNav onNavigate={() => setOpen(false)} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
