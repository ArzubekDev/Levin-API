import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { Container } from "@/shared/ui/Container";

import { DocsContent } from "./DocsContent";
import { DocsSidebar } from "./DocsSidebar";
import { DocsSidebarMobile } from "./DocsSidebarMobile";

export function Docs() {
  return (
    <div className="relative z-10 min-h-screen bg-slate-950 pt-16 text-white sm:pt-24">
      <Container className="flex flex-col">
        <Breadcrumbs />
        <div className="flex h-[calc(100vh-166px)] flex-col md:flex-row md:gap-8">
          <DocsSidebarMobile />
          <DocsSidebar />
          <DocsContent />
        </div>
      </Container>
    </div>
  );
}
