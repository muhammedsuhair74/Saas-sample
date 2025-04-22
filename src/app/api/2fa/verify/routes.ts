import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  const { code } = await req.json();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const tokenRecord = await prisma.twoFactorToken.findFirst({
    where: {
      userId: user.id,
      token: code,
      // expiresAt: {
      //   gte: new Date(),
      // },
    },
  });

  if (!tokenRecord) {
    return NextResponse.json(
      { message: "Invalid or expired code." },
      { status: 400 }
    );
  }

  // await prisma.user.update({
  //   where: { id: user.id },
  //   data: { isTwoFactorEnabled: true },
  // });

  await prisma.twoFactorToken.delete({
    where: { id: tokenRecord.id },
  });

  return NextResponse.json({ message: "2FA enabled successfully." });
}
