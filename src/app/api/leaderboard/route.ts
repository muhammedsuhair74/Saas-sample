import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const hour = searchParams.get("hour");
    const workoutType = searchParams.get("workoutType");
    const filter: any = {};

    // Apply date/hour filtering
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);

      filter.hour = {
        gte: start,
        lt: end,
      };

      if (hour) {
        const hourInt = parseInt(hour);
        const specificStart = new Date(start.setHours(hourInt, 0, 0, 0));
        const specificEnd = new Date(start.setHours(hourInt + 1, 0, 0, 0));
        filter.hour = {
          gte: specificStart,
          lt: specificEnd,
        };
      }
    }

    // Apply workoutType filter if provided
    if (workoutType) {
      filter.workoutType = workoutType;
    }

    // If any filter is applied, use groupBy
    if (Object.keys(filter).length > 0) {
      const leaderboard = await prisma.workout.groupBy({
        by: ["userId", "workoutType"],
        where: filter,
        _sum: {
          reps: true,
        },
        orderBy: {
          _sum: {
            reps: "desc",
          },
        },
      });

      // Transform the data to include user details
      const leaderboardWithUsers = await Promise.all(
        leaderboard.map(async (entry) => {
          const user = await prisma.user.findUnique({
            where: { id: entry.userId },
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true,
            },
          });
          return {
            ...entry,
            user,
          };
        })
      );

      return NextResponse.json({ leaderboard: leaderboardWithUsers });
    }

    // Default full leaderboard (no filter applied)
    const leaderboard = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        workouts: {
          select: {
            reps: true,
            workoutType: true,
            hour: true,
          },
        },
      },
    });

    const ranked = leaderboard
      .map((user) => ({
        ...user,
        totalWorkouts: user.workouts.reduce((sum, w) => sum + w.reps, 0),
      }))
      .sort((a, b) => b.totalWorkouts - a.totalWorkouts);

    return NextResponse.json({ leaderboard: ranked });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Failed to load leaderboard" }, { status: 500 });
  }
}
