import prisma from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";
import { NextResponse } from "next/server";

// GET /api/charts/daily?date=2025-05-13
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    const start = startOfDay(new Date(date));
    const end = endOfDay(new Date(date));

    // Fetch all workouts for the day
    const workouts = await prisma.workout.findMany({
      where: {
        hour: {
          gte: start,
          lte: end,
        },
      },
    });

    // Group data by hour and workout type
    const grouped: Record<string, Record<string, number>> = {};

    workouts.forEach((workout) => {
      const hour = new Date(workout.hour).getHours().toString(); // 0–23
      if (!grouped[hour]) grouped[hour] = {};
      if (!grouped[hour][workout.workoutType]) grouped[hour][workout.workoutType] = 0;

      grouped[hour][workout.workoutType] += workout.reps;
    });

    // Normalize to return all 24 hours and all workout types
    const hours = Array.from({ length: 24 }, (_, i) => i.toString());
    const workoutTypes = ["pushups", "squat", "plank", "situp"];

    const result = hours.map((hour) => {
      const data = { hour: `${hour}:00` } as Record<string, any>;

      workoutTypes.forEach((type) => {
        data[type] = grouped[hour]?.[type] ?? 0;
      });

      return data;
    });
    console.log("daily");

    console.log(result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching daily chart data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
