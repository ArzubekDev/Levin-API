import { Container } from "@/shared/ui/Container";

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-(--layout-border-subtle) py-8">
      <Container className="flex items-center justify-between text-sm text-slate-500">
        <span>© {new Date().getFullYear()} Levin API</span>
        <span>Built with NextJS & NestJS</span>
      </Container>
    </footer>
  );
};
