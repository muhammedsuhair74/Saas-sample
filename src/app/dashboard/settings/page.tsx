"use client";

import AvatarUploader from "@/components/settings/AvatarUploader";
import { toast } from "react-toastify";

export default function SettingsPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-semibold">Profile Settings</h1>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">Update your avatar</p>

        <AvatarUploader
          onUpload={async (url) => {
            await fetch("/api/user/avatar", {
              method: "POST",
              body: JSON.stringify({ url }),
            });
            toast.success("Avatar updated!");
          }}
        />
      </div>
    </div>
  );
}
