import { Separator } from "@/shared/components/ui/separator";
import Link from "next/link";

const sidebarItems = [
  {
    title: "НАЧАЛО РАБОТЫ",
    items: [
      { label: "Обзор", href: "#overview" },
      { label: "Быстрый старт", href: "#quickstart" },
      { label: "JSON Schema", href: "#schema" },
    ]
  },
  {
    title: "API",
    items: [
      { label: "Создание проекта", href: "#create" },
      { label: "Mock endpoint", href: "#mock" },
      { label: "Параметры", href: "#params" },
    ]
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800/50 sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-xs">
              L
            </div>
            <span className="font-semibold">Levin API</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white">
            Dashboard →
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-12">
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
          <h1 className="text-4xl font-bold mb-4">Документация</h1>
          <p className="text-slate-400 mb-10 text-lg">
            Полное руководство по созданию и использованию Mock API.
          </p>

          <section id="overview" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 gradient-text">Обзор</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Levin API позволяет создавать фейковые REST API на основе JSON Schema. 
              Идеально для frontend-разработчиков, которым нужно тестировать UI до готовности бэкенда.
            </p>
          </section>

          <Separator className="bg-slate-800 my-8" />

          <section id="quickstart" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 gradient-text">Быстрый старт</h2>
            <ol className="space-y-4 text-slate-400 list-decimal list-inside">
              <li>Войдите через Google или GitHub</li>
              <li>Создайте проект с JSON Schema</li>
              <li>Скопируйте endpoint URL</li>
              <li>Используйте в своём приложении</li>
            </ol>
          </section>

          <Separator className="bg-slate-800 my-8" />

          <section id="schema" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 gradient-text">JSON Schema</h2>
            <p className="text-slate-400 mb-4">Пример схемы для генерации пользователей:</p>
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
      </div>
    </div>
  );
}
