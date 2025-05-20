// src/app/api/workouts/stats/route.ts
import { authOptions } from "@/lib/auth"; // adjust path as per your project
import { prisma } from "@/lib/prisma";
import { format, startOfDay, startOfMonth, subDays } from "date-fns";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") || "daily"; // daily, weekly, monthly
  const workoutType = searchParams.get("workoutType") || undefined;

  let startDate: Date;
  const today = new Date();

  switch (range) {
    case "weekly":
      startDate = subDays(today, 6); // last 7 days including today
      break;
    case "monthly":
      startDate = startOfMonth(today);
      break;
    default:
      startDate = startOfDay(today);
  }

  const filters: any = {
    userId: session.user.id,
    hour: {
      gte: startDate,
    },
  };

  if (workoutType) {
    filters.workoutType = workoutType;
  }

  const data = await prisma.workout.findMany({
    where: filters,
    orderBy: { hour: "asc" },
  });

  // Group by date
  const grouped: Record<string, number> = {};
  data.forEach(({ hour, reps }) => {
    const key = format(hour, range === "daily" ? "HH:00" : "yyyy-MM-dd");
    grouped[key] = (grouped[key] || 0) + reps;
  });

  return NextResponse.json(grouped);
}
