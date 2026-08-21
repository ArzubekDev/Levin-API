export const HEADER_NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Docs",
    href: "/docs",
  },
  {
    label: "Real API",
    href: "/real-api",
  },
  {
    label: "Mock API",
    href: "/mock-api",
  },
  {
    label: "Statistics",
    href: "/stats",
  },
] as const;

export const HEADER_MOBILE_NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  ...HEADER_NAV_ITEMS,
] as const;
