import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/lib/uploadthing";
// console.log("SECRET:", process.env.UPLOADTHING_SECRET);
// console.log("APP_ID:", process.env.UPLOADTHING_APP_ID);

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
