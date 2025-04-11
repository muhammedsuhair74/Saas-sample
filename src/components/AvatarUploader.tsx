"use client";

import { useUploadThing } from "@/lib/uploadingClient";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function AvatarUploader({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const { startUpload, isUploading } = useUploadThing("avatarUploader");

  const handleUpload = async () => {
    if (!file) return;
    console.log("Uploading file:", file);
    const res = await startUpload([file]);
    console.log("Upload response:", res);
    if (res && res[0]?.serverData?.uploadedUrl) {
      onUpload(res[0].serverData.uploadedUrl);
    } else {
      toast.error("Upload failed.");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button disabled={!file || isUploading} onClick={handleUpload}>
        {isUploading ? "Uploading..." : "Upload Avatar"}
      </Button>
    </div>
  );
}
