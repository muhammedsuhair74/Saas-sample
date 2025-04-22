"use client";

import { cn } from "@/lib/utils";
import { Home, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserAvatar from "../avatar";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ user }: { user: User }) => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r hidden md:block">
      <div className="p-6 font-bold text-xl">🚀 My SaaS</div>
      <nav className="flex flex-col space-y-2 px-4 justify-between h-[90%]">
        <div>
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                pathname === href
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
        <UserAvatar avatarUrl={user.avatarUrl} />
      </nav>
    </aside>
  );
};

export default Sidebar;
