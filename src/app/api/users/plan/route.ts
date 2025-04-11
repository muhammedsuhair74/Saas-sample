import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        Subscription: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    const plan = user?.Subscription[0]?.plan || "free";

    return NextResponse.json({ plan });
  } catch (error) {
    console.error("[PLAN_ERROR]", error);
    return NextResponse.json(
      { message: "Error fetching plan" },
      { status: 500 }
    );
  }
}
