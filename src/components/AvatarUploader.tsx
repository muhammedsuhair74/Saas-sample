"use client";

import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadingClient";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
export default function AvatarUploader({
  userId,
  previousImage,
}: // onUpload,
{
  userId: string;
  previousImage?: string;
  // onUpload: (url: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const { startUpload, isUploading } = useUploadThing("avatarUploader", {});

  const onUpload = async (url: string) => {
    const response = await fetch("/api/users/avatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        userId, // Include userId in the request
      }),
    });

    if (response.ok) {
      toast.success("Avatar updated!");
    } else {
      toast.error("Failed to update avatar.");
    }
  };

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
    <div className="flex flex-col gap-3 justify-center items-center ">
      {!file && previousImage && (
        <Image
          className="w-20 h-20 rounded-full"
          src={previousImage}
          alt="Avatar"
          width={100}
          height={100}
        />
      )}
      {file && (
        <Image
          className="w-20 h-20 rounded-full"
          src={URL.createObjectURL(file)}
          alt="Avatar"
          width={100}
          height={100}
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button
        className={`${
          !file || isUploading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500"
        } text-white px-4 py-2 rounded-md`}
        disabled={!file || isUploading}
        onClick={handleUpload}
      >
        {isUploading ? "Uploading..." : "Upload Avatar"}
      </Button>
    </div>
  );
}
