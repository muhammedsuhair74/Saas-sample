"use client";

import Image from "next/image";

type BadgeType =
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "WEEKLY_STREAK"
  | "MONTHLY_STREAK";

type WorkoutType = "Pushups" | "Squats" ;
// type WorkoutType = "Pushups" | "Squats" | "Plank" | "Situps";


interface Badge {
  id: string;
  type: BadgeType;
  workoutType: WorkoutType;
  createdAt: Date;
}

export default function UserBadges({ badges }: { badges: Badge[] }) {
  const badgeMap: Record<WorkoutType, string> = {
    Pushups: "/badges/pushup.jpeg",
    Squats: "/badges/squat.jpeg",
    // Plank: "/badges/plank.jpeg",
    // Situps: "/badges/situp.jpeg",
  };

  const getBadgeLabel = (type: BadgeType) => {
    switch (type) {
      case "DAILY":
        return "Daily Topper";
      case "WEEKLY":
        return "Weekly Topper";
      case "MONTHLY":
        return "Monthly Topper";
      case "WEEKLY_STREAK":
        return "3x Weekly Champion";
      case "MONTHLY_STREAK":
        return "3x Monthly Champion";
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="flex flex-col items-center gap-1 text-center"
          title={`${getBadgeLabel(badge.type)} - ${badge.workoutType}`}
        >
          <div className="w-12 h-12 rounded-full border bg-white shadow">
            <Image
              src={
                badge.type.includes("STREAK")
                  ? "/badges/special.png"
                  : badgeMap[badge.workoutType]
              }
              alt={badge.workoutType}
              width={48}
              height={48}
              className="object-contain w-full h-full"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {getBadgeLabel(badge.type)}
          </p>
        </div>
      ))}
    </div>
  );
}
