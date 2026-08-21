import type { Metadata } from "next";

import { ComingSoon } from "@/shared/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Real API — Скоро в доступе",
  description:
    "Интеграция и эмуляция реальных внешних API сервисов. Раздел находится в разработке и скоро будет доступен.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RealApiPage() {
  return <ComingSoon />;
}
