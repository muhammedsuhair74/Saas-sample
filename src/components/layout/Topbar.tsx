"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { ThemeToggle } from "../theme-toggle";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b shadow-sm">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <ThemeToggle />
      <div className="flex items-center gap-4">
        {session?.user && (
          <>
            <span className="text-sm text-muted-foreground">
              Signed in as <strong>{session.user.email}</strong>
            </span>
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
