import { Settings, UserRound } from "lucide-react";

type TUserNavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export const USER_NAV_ITEMS: TUserNavItem[] = [
  {
    label: "Profile",
    href: "/profile",
    icon: <UserRound />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings />,
  },
];
