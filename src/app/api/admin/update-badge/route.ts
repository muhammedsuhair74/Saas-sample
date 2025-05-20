import prisma from "@/lib/prisma";
import { BadgeType } from "@prisma/client";
import { endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek, subMonths, subWeeks } from "date-fns";
import { NextResponse } from "next/server";

export async function POST() {
  const now = new Date();

  // 🏅 Define ranges
  const dateRanges = {
    DAILY: { start: startOfDay(now), end: endOfDay(now) },
    WEEKLY: { start: startOfWeek(now), end: endOfWeek(now) },
    MONTHLY: { start: startOfMonth(now), end: endOfMonth(now) },
  };

  // 🧮 Helper to get top user in range
  const getTopUser = async (start: Date, end: Date) => {
    const top = await prisma.workout.groupBy({
      by: ["userId"],
      where: { hour: { gte: start, lte: end } },
      _sum: { reps: true },
      orderBy: { _sum: { reps: "desc" } },
      take: 1,
    });
    return top[0]?.userId || null;
  };

  const badgeOps = [];

  for (const [type, range] of Object.entries(dateRanges)) {
    const userId = await getTopUser(range.start, range.end);

    if (userId) {
      // Remove existing badge of that type
      await prisma.badge.deleteMany({
        where: { badgeType: type as BadgeType, NOT: { userId } },
      });

      // Upsert badge for current top user
      badgeOps.push(
        prisma.badge.upsert({
          where: {
            id: (await prisma.badge.findFirst({
              where: { userId, badgeType: type as BadgeType }
            }))?.id || '',
          },
          update: { awardedAt: now },
          create: { userId, badgeType: type as BadgeType, awardedAt: now },
        })
      );
    }
  }

  // Special badge logic for streaks
  const handleStreak = async (type: "WEEKLY_STREAK" | "MONTHLY_STREAK") => {
    const period = type === "WEEKLY_STREAK" ? 3 : 3;
    const compareFn = type === "WEEKLY_STREAK" ? subWeeks : subMonths;

    const pastPeriods = Array.from({ length: period }, (_, i) => {
      const d = compareFn(now, i);
      return {
        start: type === "WEEKLY_STREAK" ? startOfWeek(d) : startOfMonth(d),
        end: type === "WEEKLY_STREAK" ? endOfWeek(d) : endOfMonth(d),
      };
    });

    const winners: string[] = [];

    for (const period of pastPeriods) {
      const top = await getTopUser(period.start, period.end);
      if (top) winners.push(top);
    }

    const consistentUser = winners.every((u) => u === winners[0]) ? winners[0] : null;

    if (consistentUser) {
      const existing = await prisma.badge.findFirst({
        where: { userId: consistentUser, badgeType: type },
      });

      if (!existing) {
        badgeOps.push(
          prisma.badge.create({
            data: { userId: consistentUser, badgeType: type, reps: 0 },
          })
        );
      }
    }
  };

  await handleStreak("WEEKLY_STREAK");
  await handleStreak("MONTHLY_STREAK");

  await prisma.$transaction(badgeOps);

  return NextResponse.json({ success: true, message: "Badges assigned." });
}
