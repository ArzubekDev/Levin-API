import { Settings, UserRound } from "lucide-react";

export type TUserNavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

export const USER_NAV_ITEMS: TUserNavItem[] = [
  {
    label: "Profile",
    href: "/profile",
    icon: <UserRound />,
    disabled: true,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings />,
    disabled: true,
  },
];
