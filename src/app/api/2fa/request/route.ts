import prisma from "@/lib/prisma";
import { randomInt } from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const code = randomInt(100_000, 999_999).toString(); // 6-digit token
  const expiresAt = new Date(Date.now() + 1 * 60 * 1000); // expires in 5 minutes

  await prisma.twoFactorToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  await prisma.twoFactorToken.create({
    data: {
      userId: user.id,
      token: code,
      expiresAt,
    },
  });

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: user.email,
    subject: "Your 2FA Verification Code",
    html: `<p>Your verification code is: <strong>${code}</strong></p>`,
  });

  return NextResponse.json({ message: "Verification code sent." });
}
