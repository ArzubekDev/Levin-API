import { Container } from "@/shared/ui/Container";
import { DocsContent } from "./DocsContent";
import { DocsSidebar } from "./DocsSidebar";

export function Docs() {
  return (
    <div className="relative z-10 min-h-screen bg-slate-950 text-white py-24">
      <Container className="flex gap-12">
        <DocsSidebar />
        <DocsContent />
      </Container>
    </div>
  );
}
