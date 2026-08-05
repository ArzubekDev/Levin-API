import { Separator } from "@/shared/components/ui/separator";
import { Logo } from "@/shared/components/logo";
import { Container } from "@/shared/ui/Container";
import Link from "next/link";

const sidebarItems = [
  {
    title: "GETTING STARTED",
    items: [
      { label: "Overview", href: "#overview" },
      { label: "Quick start", href: "#quickstart" },
      { label: "JSON Schema", href: "#schema" },
    ]
  },
  {
    title: "API",
    items: [
      { label: "Create project", href: "#create" },
      { label: "Mock endpoint", href: "#mock" },
      { label: "Parameters", href: "#params" },
    ]
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-(--layout-border-subtle) sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl">
        <Container className="h-14 flex items-center justify-between">
          <Logo size="sm" />
          <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white">
            Dashboard →
          </Link>
        </Container>
      </nav>

      <Container className="py-8 flex gap-12">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="sticky top-24">
            {sidebarItems.map((section) => (
              <div key={section.title} className="mb-8">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <a 
                        href={item.href}
                        className="block px-3 py-1.5 text-sm text-slate-400 hover:text-white rounded-md hover:bg-slate-800/50 transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-slate-400 mb-10 text-lg">
            Complete guide to creating and using Mock APIs.
          </p>

          <section id="overview" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 gradient-text">Overview</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Levin API lets you create fake REST APIs from JSON Schema. 
              Perfect for frontend developers who need to test UI before the backend is ready.
            </p>
          </section>

          <Separator className="bg-slate-800 my-8" />

          <section id="quickstart" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 gradient-text">Quick start</h2>
            <ol className="space-y-4 text-slate-400 list-decimal list-inside">
              <li>Sign in with Google or GitHub</li>
              <li>Create a project with a JSON Schema</li>
              <li>Copy the endpoint URL</li>
              <li>Use it in your application</li>
            </ol>
          </section>

          <Separator className="bg-slate-800 my-8" />

          <section id="schema" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 gradient-text">JSON Schema</h2>
            <p className="text-slate-400 mb-4">Example schema for generating users:</p>
            <pre className="glass rounded-lg p-4 overflow-x-auto font-mono text-sm text-slate-300">
{`{
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string", "faker": "person.fullName" },
    "email": { "type": "string", "faker": "internet.email" },
    "role": { "type": "string", "enum": ["admin", "user"] }
  }
}`}
            </pre>
          </section>
        </main>
      </Container>
    </div>
  );
}
