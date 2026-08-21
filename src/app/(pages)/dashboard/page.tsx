import type { Metadata } from "next";

import { Dashboard } from "@/widgets/dashboard";

export const metadata: Metadata = {
  title: "Панель управления",
  description: "Управление вашими мок-эндпоинтами, просмотр ключей API и истории запросов.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <Dashboard />;
}
