import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { Container } from "@/shared/ui/Container";

import { DocsContent } from "./DocsContent";
import { DocsSidebar } from "./DocsSidebar";

export function Docs() {
  return (
    <div className="relative z-10 min-h-screen bg-slate-950 pt-24 text-white">
      <Container className="flex flex-col">
        <Breadcrumbs />
        <div className="flex gap-8">
          <DocsSidebar />
          <DocsContent />
        </div>
      </Container>
    </div>
  );
}
