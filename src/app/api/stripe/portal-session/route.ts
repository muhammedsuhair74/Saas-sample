import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import stripe  from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!dbUser?.stripeCustomerId) {
    return NextResponse.json({ error: "No Stripe Customer ID" }, { status: 400 });
  }

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: dbUser.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  });

  return NextResponse.json({ url: stripeSession.url });
}
