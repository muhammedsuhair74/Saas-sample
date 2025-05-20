import prisma from "@/lib/prisma";
import { BadgeType, WorkoutType } from "@prisma/client";
import { endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { getBadgeValue } from "./utils";

// utility to set a badge, removing old ones of the same type/workout
async function assignBadge(
  userId: string,
  type: BadgeType,
  workoutType: WorkoutType,
  reps: number
) {
  console.log("assigning badge", userId, type, workoutType);
  // Remove existing badge for this type/workout
  await prisma.badge.deleteMany({
    where: {
      userId,
      badgeType: type,
      workoutType: workoutType.toLowerCase(),
    },
  });

  const badgeValue = getBadgeValue(type);

  // Create new badge
  await prisma.badge.create({
    data: {
      userId,
      value: badgeValue,
      badgeType: type,
      workoutType: workoutType.toLowerCase(),
      reps: reps,
      isPermanent: badgeValue > 0,
    },
  });
}

export async function assignBadgesAfterWorkout(workout: {
  userId: string;
  reps: number;
  hour: Date;
  workoutType: WorkoutType;
}) {
  const { userId, hour, workoutType, reps } = workout;
  console.log("assigning badges after workout", userId, hour, workoutType);

  // 1. Daily Topper
  const dailyTopper = await prisma.workout.groupBy({
    by: ["userId"],
    where: {
      workoutType,
      hour: {
        gte: startOfDay(hour),
        lte: endOfDay(hour),
      },
    },
    _sum: { reps: true },
    orderBy: { _sum: { reps: "desc" } },
    take: 1,
  });

  if (dailyTopper[0]?.userId === userId) {
    // Remove DAILY badges from other users for this workout type and day
    await prisma.badge.deleteMany({
      where: {
        badgeType: "DAILY",
        workoutType: workoutType.toLowerCase(),
      },
    });
    await assignBadge(userId, "DAILY", workoutType, reps);
  }

  // 2. Weekly Topper
  const weeklyTopper = await prisma.workout.aggregate({
    where: {
      workoutType,
      hour: {
        gte: startOfWeek(hour),
        lte: endOfWeek(hour),
      },
    },
    _max: {
      reps: true,
      userId: true,
    },
  });
  console.log("weeklyTopper", weeklyTopper);

  if (weeklyTopper?._max?.reps && weeklyTopper._max.reps < reps) {
    // Remove WEEKLY badges from other users for this workout type and week
    await prisma.badge.deleteMany({
      where: {
        badgeType: "WEEKLY",
        workoutType: workoutType.toLowerCase(),
      },
    });
    await assignBadge(userId, "WEEKLY", workoutType, reps);

    // 2.a Check for 3-week streak
    const last3WeeksTop = await Promise.all(
      Array.from({ length: 3 }).map((_, i) => {
        const weekDate = new Date(hour);
        weekDate.setDate(weekDate.getDate() - i * 7);
        return prisma.workout.groupBy({
          by: ["userId"],
          where: {
            workoutType: workoutType.toLowerCase(),
            userId,
            hour: {
              gte: startOfWeek(weekDate),
              lte: endOfWeek(weekDate),
            },
          },
          _sum: { reps: true },
          orderBy: { _sum: { reps: "desc" } },
          take: 1,
        });
      })
    );
    console.log("last3WeeksTop", last3WeeksTop);

    const streak = last3WeeksTop.every((r) => r[0]?.userId === userId);
    if (streak) {
      const exists = await prisma.badge.findFirst({
        where: {
          userId,
          badgeType: "WEEKLY_STREAK",
          workoutType: workoutType.toLowerCase(),
        },
        select: {
          id: true,
          userId: true,
          workoutType: true,
          badgeType: true,
          awardedAt: true,
          isPermanent: true,
        },
      });
      if (!exists) {
        const badgeValue = getBadgeValue("WEEKLY_STREAK");
        await prisma.badge.create({
          data: {
            userId,
            reps,
            value: badgeValue,
            badgeType: "WEEKLY_STREAK",
            isPermanent: badgeValue > 0,
            workoutType: workoutType.toLowerCase(),
          },
        });
      }
    }
  }

  // 3. Monthly Topper
  const monthlyTopper = await prisma.workout.aggregate({
    where: {
      workoutType,
      hour: {
        gte: startOfMonth(hour),
        lte: endOfMonth(hour),
      },
    },
    _max: {
      reps: true,
      userId: true,
    },
  });
  console.log("monthlyTopper", monthlyTopper);
  if (monthlyTopper?._max?.reps && monthlyTopper._max.reps < reps) {
    // Remove MONTHLY badges from other users for this workout type and month
    await prisma.badge.deleteMany({
      where: {
        badgeType: "MONTHLY",
        workoutType: workoutType.toLowerCase(),
      },
    });
    await assignBadge(userId, "MONTHLY", workoutType, reps);

    // 3.a Check for 3-month streak
    const last3MonthsTop = await Promise.all(
      Array.from({ length: 3 }).map((_, i) => {
        const monthDate = new Date(hour);
        monthDate.setMonth(monthDate.getMonth() - i);
        return prisma.workout.groupBy({
          by: ["userId"],
          where: {
            workoutType: workoutType.toLowerCase(),
            hour: {
              gte: startOfMonth(monthDate),
              lte: endOfMonth(monthDate),
            },
          },
          _sum: {
            reps: true
          },
          orderBy: {
            _sum: {
              reps: "desc"
            }
          },
          take: 1
        });
      })
    );

    console.log("last3MonthsTop", last3MonthsTop);
    const streak = last3MonthsTop.every((r) => r[0]?.userId === userId);
    if (streak) {
      const exists = await prisma.badge.findFirst({
        where: {
          userId,
          badgeType: "MONTHLY_STREAK",
          workoutType: workoutType.toLowerCase(),
        },
        select: {
          id: true,
          userId: true,
          workoutType: true,
          badgeType: true,
          awardedAt: true,
          isPermanent: true,
        },
      });
      if (!exists) {
        const badgeValue = getBadgeValue("MONTHLY_STREAK");
        await prisma.badge.create({
          data: {
            userId,
            reps,
            value: badgeValue,
            badgeType: "MONTHLY_STREAK",
            isPermanent: badgeValue > 0,
            workoutType: workoutType.toLowerCase(),
          },
        });
      }
    }
  }
}
