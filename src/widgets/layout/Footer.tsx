import { Container } from "@/shared/ui/Container";

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-(--layout-border-subtle) py-8">
      <Container className="flex items-center justify-between text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Levin API</p>
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100"
          >
            Next.js
          </a>{" "}
          &{" "}
          <a
            href="https://nestjs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-400"
          >
            NestJS
          </a>
        </p>
      </Container>
    </footer>
  );
};
