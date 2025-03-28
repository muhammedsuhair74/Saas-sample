import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Dashboard from "../dashboard/page";
import { authOptions } from "../../lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Protect route - only allow admin users
  if (!session || session.user?.email !== "admin@example.com") {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      {children}
    </div>
  );
}
