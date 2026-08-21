import type { Metadata } from "next";

import { MockApi } from "@/features/mock-api";

export const metadata: Metadata = {
  title: "Мок API Генератор",
  description:
    "Создавайте гибкие и настраиваемые REST API мок-эндпоинты в пару кликов. Удобная эмуляция ответов сервера для тестирования и фронтенд-разработки.",
  openGraph: {
    title: "Мок API Генератор | Levin API",
    description:
      "Быстрое создание кастомных REST API эндпоинтов для фронтенд-разработчиков и тестировщиков.",
  },
};
export default function MockApiPage() {
  return <MockApi />;
}
