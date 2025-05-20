"use client";

import { Button } from "@/components/ui/button"; // or use native button if not using shadcn
import { useState } from "react";

export default function BadgeUpdateTrigger() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const triggerBadgeUpdate = async () => {
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/badges/update", {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to update badges");

      const data = await res.json();
      setStatus(data.message || "Badges updated successfully!");
    } catch (error) {
      setStatus("Failed to update badges");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 space-y-2">
      <Button onClick={triggerBadgeUpdate} disabled={loading}>
        {loading ? "Updating..." : "Run Badge Assignment"}
      </Button>
      {status && <p className="text-sm text-gray-600">{status}</p>}
    </div>
  );
}
