import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { plan } = await req.json();

  if (!["free", "pro", "team"].includes(plan)) {
    return NextResponse.json({ message: "Invalid plan" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { Subscription: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const latestSubscription = user.Subscription[0]; // assuming latest is first

    if (latestSubscription) {
      // Update existing subscription
      await prisma.subscription.update({
        where: { id: latestSubscription.id },
        data: {
          plan,
          updatedAt: new Date(),
        },
      });
    } else {
      // Or create a new one
      await prisma.subscription.create({
        data: {
          userId: user.id,
          plan,
          status: "active",
        },
      });
    }

    return NextResponse.json({ message: "Plan updated" });
  } catch (error) {
    console.error("[CHANGE_PLAN_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
