import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  avatarUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {
      try {
        console.log("✅ Upload complete — file:", file);
        return { uploadedUrl: file.url }; // We may need to use 'file.key' depending on your UploadThing version
      } catch (error) {
        console.error("❌ Error in onUploadComplete:", error);
        throw error;
      }
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
