"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AutToggle({ isEnabled }: { isEnabled: boolean }) {
  const [is2FAEnabled, setIs2FAEnabled] = useState(isEnabled);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setLoading(true);
    try {
      const res = await fetch("/api/2fa/enable-2fa", {
        method: "POST",
        body: JSON.stringify({ enable: checked }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to update 2FA status");

      if (checked) {
        toast.info("Verification code sent. Please check your email.");
      } else {
        toast.success("Two-Factor Authentication disabled.");
      }

      setIs2FAEnabled(checked);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="2fa-toggle" className="mr-2">
          Enable Two-Factor Authentication
        </Label>
        <Switch
          id="2fa-toggle"
          checked={is2FAEnabled}
          disabled={loading}
          onCheckedChange={handleToggle}
        />
      </div>
    </div>
  );
}
