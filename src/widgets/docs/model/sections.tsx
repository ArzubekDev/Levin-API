import type { ReactNode } from "react";

export type DocsSection = {
  id: string;
  group: string;
  title: string;
  label: string;
  content: ReactNode;
};

export type DocsSidebarGroup = {
  title: string;
  items: { label: string; href: string; id: string }[];
};

export const DOC_SECTIONS: DocsSection[] = [
  {
    id: "overview",
    group: "GETTING STARTED",
    title: "Overview",
    label: "Overview",
    content: (
      <p className="mb-4 leading-relaxed text-slate-400">
        Levin API lets you create fake REST APIs from JSON Schema. Perfect for frontend developers
        who need to test UI before the backend is ready.
      </p>
    ),
  },
  {
    id: "quickstart",
    group: "GETTING STARTED",
    title: "Quick start",
    label: "Quick start",
    content: (
      <ol className="list-inside list-decimal space-y-4 text-slate-400">
        <li>Sign in with Google or GitHub</li>
        <li>Create a project with a JSON Schema</li>
        <li>Copy the endpoint URL</li>
        <li>Use it in your application</li>
      </ol>
    ),
  },
  {
    id: "schema",
    group: "GETTING STARTED",
    title: "JSON Schema",
    label: "JSON Schema",
    content: (
      <>
        <p className="mb-4 text-slate-400">Example schema for generating users:</p>
        <pre className="glass overflow-x-auto rounded-lg p-4 font-mono text-sm text-slate-300">
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
      </>
    ),
  },
  {
    id: "create",
    group: "API",
    title: "Create project",
    label: "Create project",
    content: (
      <p className="leading-relaxed text-slate-400">
        Create a project from the dashboard, provide a JSON Schema, and get a ready mock endpoint.
      </p>
    ),
  },
  {
    id: "mock",
    group: "API",
    title: "Mock endpoint",
    label: "Mock endpoint",
    content: (
      <p className="leading-relaxed text-slate-400">
        Each project exposes a REST endpoint that returns fake data based on your schema.
      </p>
    ),
  },
  {
    id: "params",
    group: "API",
    title: "Parameters",
    label: "Parameters",
    content: (
      <p className="leading-relaxed text-slate-400">
        Configure delay and error rate to simulate realistic network conditions while testing.
      </p>
    ),
  },
];

export function getSidebarGroups(sections: DocsSection[] = DOC_SECTIONS): DocsSidebarGroup[] {
  const groupsMap = new Map<string, DocsSidebarGroup>();

  for (const section of sections) {
    if (!groupsMap.has(section.group)) {
      groupsMap.set(section.group, { title: section.group, items: [] });
    }
    groupsMap.get(section.group)?.items.push({
      label: section.label,
      href: `#${section.id}`,
      id: section.id,
    });
  }

  return Array.from(groupsMap.values());
}
