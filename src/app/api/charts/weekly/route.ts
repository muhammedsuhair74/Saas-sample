import prisma from "@/lib/prisma";
import { getDayOfWeek } from "@/utils/date";
import { endOfWeek, startOfWeek } from "date-fns";
import { NextResponse } from "next/server";

// GET /api/charts/weekly?date=2025-05-01
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    // Start of the week
    const start = startOfWeek(new Date(date).setHours(0, 0, 0, 0));
    const end = endOfWeek(new Date(date));

    console.log("start", start);
    console.log("end", end);
    // Fetch all workouts for the week
    const workouts = await prisma.workout.findMany({
      where: {
        hour: {
          gte: start,
          lte: end,
        },
      },
    });
    console.log("workouts", workouts);

    // Group data by day and workout type
    const grouped: Record<string, Record<string, number>> = {};

    workouts.forEach((workout) => {
      const day = getDayOfWeek(workout.hour); // 1-7 (Week days)
      if (!grouped[day]) grouped[day] = {};
      if (!grouped[day][workout.workoutType]) grouped[day][workout.workoutType] = 0;

      grouped[day][workout.workoutType] += workout.reps;
    });

    console.log("grouped", grouped);
    // Normalize to return 7 days and all workout types
    const days = Array.from({ length: 7 }, (_, i) => (i + 1).toString());

    console.log("days", days);
    const workoutTypes = ["pushups", "squat", "plank", "situp"];

    const result = days.map((day) => {
      const data = { day: `Day ${day}` } as Record<string, any>;

      workoutTypes.forEach((type) => {
        data[type] = grouped[day]?.[type] ?? 0;
      });

      return data;
    });

    console.log(start, end);

    console.log("result");
    console.log(result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching weekly chart data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
