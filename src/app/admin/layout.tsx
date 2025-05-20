import { AuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { authOptions } from "../../lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions as AuthOptions);

  // Protect route - only allow admin users
  if (!session || session.user?.email !== "asd@saas.com") {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      {children}
    </div>
  );
}
