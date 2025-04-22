import { createUploadthing, type FileRouter } from "uploadthing/server";
const f = createUploadthing();

export const ourFileRouter = {
  avatarUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {
      console.log("file is", file);
      try {
        // console.log("userId is asd", metadata?.userId);

        // // Update user's avatarUrl in database
        // const uploadStatus = await prisma.user.update({
        //   where: { id: metadata?.userId },
        //   data: { avatarUrl: file.url },
        // });

        // if (!uploadStatus) {
        //   throw new Error("Failed to upload avatar");
        // }

        console.log("✅ Upload complete and DB updated");
        return { uploadedUrl: file.url };
      } catch (error) {
        console.error("❌ Error in onUploadComplete:", error);
        throw error;
      }
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
