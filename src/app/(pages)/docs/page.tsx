import type { Metadata } from "next";

import { Docs } from "@/widgets/docs";

export const metadata: Metadata = {
  title: "Документация",
  description:
    "Узнайте, как использовать Levin API для быстрого создания мок-энпоинтов, настройки JSON Schema и эмуляции REST API.",
};

export default function DocsPage() {
  return <Docs />;
}
