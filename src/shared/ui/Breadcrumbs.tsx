"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items?: BreadcrumbItem[];
  labels?: Record<string, string>;
  home?: BreadcrumbItem | false;
  separator?: ReactNode;
  className?: string;
};

const DEFAULT_LABELS: Record<string, string> = {
  docs: "Документация",
  dashboard: "Дашборд",
  projects: "Проекты",
  project: "Проект",
  new: "Новый",
  login: "Вход",
};

function formatSegment(segment: string, labels: Record<string, string>) {
  if (labels[segment]) return labels[segment];

  if (/^[0-9a-f-]{8,}$/i.test(segment)) return segment;

  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildItemsFromPath(
  pathname: string,
  labels: Record<string, string>,
  home?: BreadcrumbItem | false,
): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [];

  if (home !== false) {
    items.push(home ?? { label: "Главная", href: "/" });
  }

  let href = "";
  segments.forEach((segment, index) => {
    href += `/${segment}`;
    const isLast = index === segments.length - 1;
    items.push({
      label: formatSegment(segment, labels),
      href: isLast ? undefined : href,
    });
  });

  return items;
}

export function Breadcrumbs({ items, labels, home, separator, className }: BreadcrumbsProps) {
  const pathname = usePathname();
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const crumbs = items ?? buildItemsFromPath(pathname, mergedLabels, home);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 &&
                (separator ?? (
                  <ChevronRight className="size-3.5 shrink-0 text-slate-600" aria-hidden />
                ))}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(isLast && "font-medium text-slate-200")}
                >
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-slate-200">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
