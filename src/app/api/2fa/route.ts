import { authOptions } from "@/lib/auth";
import { sendTwoFactorTokenEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import { randomInt } from "crypto";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = String(randomInt(100_000, 999_999));
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10); // 10 mins

  // Store token in DB
  await prisma.twoFactorToken.create({
    data: {
      userId: session.user.id,
      token,
      expiresAt,
    },
  });

  // Send token via email
  await sendTwoFactorTokenEmail(session.user.email, token);

  return NextResponse.json({ success: true });
}
