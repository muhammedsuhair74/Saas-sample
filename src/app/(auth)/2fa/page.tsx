"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function TwoFactorPage() {
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await fetch("/api//2fa", {
      method: "POST",
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("2FA verified!");
      router.push("/dashboard");
    } else {
      toast.error(data.message || "Invalid code");
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-24 space-y-4 p-6 border rounded shadow-sm"
    >
      <h2 className="text-2xl font-bold">Two-Factor Authentication</h2>
      <Input
        type="text"
        placeholder="Enter your 6-digit code"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        required
      />
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
}
