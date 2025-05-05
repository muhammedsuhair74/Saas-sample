import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log(session);
    console.log("\n \n");
    const { workoutType, reps, date } = await req.json();
    console.log(workoutType, reps, date);
    if (!workoutType || !reps || reps < 1) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const currentHour = new Date();
    currentHour.setMinutes(0, 0, 0); // Round down to the start of the hour

    // Upsert based on unique constraint (userId, hour, name)
    const workout = await prisma.workout.upsert({
      where: {
        userId_hour_workoutType: {
          userId: session.user.id,
          hour: currentHour, // must be a Date object
          workoutType: workoutType,
        },
      },
      update: {
        reps: { increment: reps },
      },
      create: {
        userId: session.user.id,
        hour: currentHour,
        workoutType: workoutType,
        reps: reps,
      },
    });

    return NextResponse.json({ success: true, workout });
  } catch (error) {
    console.error("Workout log error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
