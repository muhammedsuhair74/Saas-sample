import { NextResponse } from "next/server";
import { startOfMonth, endOfMonth } from "date-fns";
import prisma from "@/lib/prisma";

// GET /api/charts/monthly?date=2025-05-01
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    // Start of the month
    const start = startOfMonth(new Date(date));
    const end = endOfMonth(new Date(date));

    // Fetch all workouts for the month
    const workouts = await prisma.workout.findMany({
      where: {
        hour: {
          gte: start,
          lte: end,
        },
      },
    });

    // Group data by day and workout type
    const grouped: Record<string, Record<string, number>> = {};

    workouts.forEach((workout) => {
      const day = new Date(workout.hour).getDate().toString(); // 1-31 (Days of month)
      if (!grouped[day]) grouped[day] = {};
      if (!grouped[day][workout.workoutType]) grouped[day][workout.workoutType] = 0;

      grouped[day][workout.workoutType] += workout.reps;
    });

    // Normalize to return all days of the month and all workout types
    const days = Array.from({ length: new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate() }, (_, i) => (i + 1).toString());
    const workoutTypes = ["pushups", "squat", "plank", "situp"];

    const result = days.map((day) => {
      const data = { day: `Day ${day}` } as Record<string, any>;

      workoutTypes.forEach((type) => {
        data[type] = grouped[day]?.[type] ?? 0;
      });

      return data;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching monthly chart data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
