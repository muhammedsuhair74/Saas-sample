"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing"; // adjust if your path is different
import Image from "next/image";

export function AvatarUploader({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center space-y-4">
      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Avatar preview"
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
      )}

      <UploadButton
        endpoint="avatarUploader"
        onClientUploadComplete={(res) => {
          if (res && res[0]) {
            onUpload(res[0].url); // Call parent callback
          }
        }}
        onUploadError={(error) => {
          console.error("Upload error", error);
        }}
        onBeforeUploadBegin={(files) => {
          const file = files[0];
          if (file) {
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
          }
          return files;
        }}
      />
    </div>
  );
}
