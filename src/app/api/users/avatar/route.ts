import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("UploadThing Route Init:", {
    secret: process.env.UPLOADTHING_SECRET,
    appId: process.env.UPLOADTHING_APP_ID,
  });
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { url, userId } = await req.json();
  console.log("url is aaa", url);

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: url },
    });

    return NextResponse.json({ message: "Avatar updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating avatar" },
      { status: 500 }
    );
  }
}
