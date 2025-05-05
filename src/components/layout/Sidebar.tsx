// src/components/Sidebar.tsx
"use client";

import { cn } from "@/lib/utils";
import { Activity, Home, Settings, User } from "lucide-react"; // Add Activity icon
import { useSession } from "next-auth/react"; // Import useSession
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserAvatar from "../avatar";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/workout-log", label: "Log Workout", icon: Activity }, // New Workout Log link
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Activity }, // New Leaderboard link
];

export default function Sidebar() {
  const { data: session } = useSession(); // Get session data using useSession hook
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r hidden md:block   dark:bg-zinc-900 text-black dark:text-white dark:shadow-lg dark:shadow-black/40">
      <div className="p-6 font-bold text-xl">🚀 My SaaS</div>
      <nav className="flex flex-col space-y-2 px-4">
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
        {session?.user?.avatarUrl && (
          <UserAvatar avatarUrl={session.user.avatarUrl} /> // Display user's avatar
        )}
      </nav>
    </aside>
  );
}
