"use client";
import { useEffect, useState } from "react";

// export const metadata = {
//   title: "User Dashboard | SaaS Platform",
//   description: "Manage your subscriptions and payments on the SaaS platform.",
// };

export default function Dashboard() {
  const [status, setStatus] = useState("Not Subscribed");

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await fetch("/api/stripe/status");
      const data = await response.json();
      setStatus(data.status || "Not Subscribed");
    };

    fetchStatus();
  }, []);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <p>Subscription Status: {status}</p>
    </div>
  );
}
